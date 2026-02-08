import { allCourses } from '../game/courses';
import { allSkills } from '../game/skills';
import type { Course, GameState, Skill, NoteResult } from '../game/types';
import {
  createGameState,
  noteProgress,
  tapSkill,
  processMisses,
  setPosition,
  isGameOver,
  getGrade,
  getAccuracy,
} from '../game/engine';
import {
  showDamageNumber,
  showHitSpark,
  animateCombo,
  screenShake,
} from './effects';

let app: HTMLElement;
let gameState: GameState | null = null;
let animFrameId: number = 0;
let countdownTimer: number = 0;

export function initApp(root: HTMLElement) {
  app = root;
  showTitleScreen();
}

// ========================
// Title Screen
// ========================
function showTitleScreen() {
  cancelAnimationFrame(animFrameId);
  app.innerHTML = `
    <div class="screen title-screen">
      <div class="title-bg">
        <h1 class="game-title">
          <span class="title-sub">FF14</span>
          <span class="title-main">モンク道場</span>
        </h1>
        <p class="title-tagline">〜 リズムでスキル回し特訓 〜</p>
        <div class="title-monk-icon">🥊</div>
        <button class="btn-start" id="btn-start">おけいこ はじめる</button>
        <p class="title-credit">Tap to the rhythm and master the Monk rotation!</p>
      </div>
    </div>
  `;
  document.getElementById('btn-start')!.addEventListener('click', showCourseSelect);
}

// ========================
// Course Select Screen
// ========================
function showCourseSelect() {
  const coursesHtml = allCourses.map(course => `
    <div class="course-card" data-course-id="${course.id}">
      <div class="course-icon">${course.icon}</div>
      <div class="course-info">
        <h3 class="course-name">${course.nameJa}</h3>
        <p class="course-desc">${course.descriptionJa}</p>
        <div class="course-difficulty">
          ${'★'.repeat(course.difficulty)}${'☆'.repeat(5 - course.difficulty)}
        </div>
        <div class="course-steps">${course.rotation.length} ステップ</div>
      </div>
    </div>
  `).join('');

  app.innerHTML = `
    <div class="screen course-screen">
      <h2 class="screen-title">コース選択</h2>
      <div class="course-list">
        ${coursesHtml}
      </div>
      <button class="btn-back" id="btn-back">← 戻る</button>
    </div>
  `;

  document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => {
      const courseId = (card as HTMLElement).dataset.courseId!;
      const course = allCourses.find(c => c.id === courseId)!;
      startGame(course);
    });
  });

  document.getElementById('btn-back')!.addEventListener('click', showTitleScreen);
}

// ========================
// Game Screen - Rhythm Action
// ========================
function startGame(course: Course) {
  gameState = createGameState(course);
  renderGameScreen();
  startCountdown();
}

function startCountdown() {
  if (!gameState) return;
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  let count = 3;
  countdownEl.textContent = String(count);
  countdownEl.classList.add('countdown-active');

  countdownTimer = window.setInterval(() => {
    count--;
    if (count > 0) {
      countdownEl.textContent = String(count);
      countdownEl.classList.remove('countdown-pop');
      void countdownEl.offsetWidth;
      countdownEl.classList.add('countdown-pop');
    } else if (count === 0) {
      countdownEl.textContent = 'GO!';
      countdownEl.classList.remove('countdown-pop');
      void countdownEl.offsetWidth;
      countdownEl.classList.add('countdown-pop');
    } else {
      clearInterval(countdownTimer);
      countdownEl.classList.remove('countdown-active');
      countdownEl.style.display = 'none';
      if (gameState) {
        gameState = { ...gameState, running: true, startTime: performance.now() };
        startGameLoop();
      }
    }
  }, 800);
}

function renderGameScreen() {
  if (!gameState) return;
  cancelAnimationFrame(animFrameId);

  const skillButtons = getSkillButtons(gameState.course);

  app.innerHTML = `
    <div class="screen game-screen" id="game-container">
      <!-- Top HUD -->
      <div class="hud">
        <div class="hud-score">
          <span class="label">SCORE</span>
          <span class="value" id="score-value">0</span>
        </div>
        <div class="hud-combo" id="combo-display">
          <span class="combo-count" id="combo-count">0</span>
          <span class="combo-label">COMBO</span>
        </div>
      </div>

      <!-- Note lane -->
      <div class="note-lane" id="note-lane">
        <div class="hit-line" id="hit-line"></div>
        <div class="note-container" id="note-container"></div>
      </div>

      <!-- Timing feedback area -->
      <div class="timing-feedback" id="timing-feedback"></div>

      <!-- Position toggle -->
      <div class="position-toggle" id="position-toggle">
        <button class="pos-btn pos-rear selected" data-pos="rear" id="pos-rear">
          <span class="pos-label">背面</span>
          <span class="pos-sub">REAR</span>
        </button>
        <div class="pos-indicator" id="pos-indicator">🐱</div>
        <button class="pos-btn pos-flank" data-pos="flank" id="pos-flank">
          <span class="pos-label">側面</span>
          <span class="pos-sub">FLANK</span>
        </button>
      </div>

      <!-- Skill buttons -->
      <div class="skill-bar rhythm-bar" id="skill-bar">
        ${skillButtons.map(s => `
          <button class="skill-btn rhythm-skill-btn" data-skill-id="${s.id}"
                  style="border-color: ${s.color}">
            <span class="skill-btn-icon">${s.icon}</span>
            <span class="skill-btn-name">${s.nameJa}</span>
            ${s.position ? `<span class="skill-btn-pos">${s.position === 'rear' ? '背' : '側'}</span>` : ''}
          </button>
        `).join('')}
      </div>

      <!-- Countdown overlay -->
      <div class="countdown-overlay" id="countdown">3</div>

      <!-- Effects layer -->
      <div class="effects-layer" id="effects-layer"></div>
    </div>
  `;

  bindRhythmEvents();
}

function getSkillButtons(course: Course): Skill[] {
  // Collect unique skills from the course rotation
  const skillIds = new Set<string>();
  course.rotation.forEach(step => skillIds.add(step.skillId));

  const gcdList: Skill[] = [];
  const ogcdList: Skill[] = [];
  skillIds.forEach(id => {
    const skill = allSkills[id];
    if (skill) {
      if (skill.type === 'gcd') gcdList.push(skill);
      else ogcdList.push(skill);
    }
  });

  // Return GCDs first, then oGCDs
  return [...gcdList, ...ogcdList];
}

function bindRhythmEvents() {
  // Position buttons
  document.querySelectorAll('.pos-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!gameState) return;
      const pos = (btn as HTMLElement).dataset.pos as 'flank' | 'rear';
      gameState = setPosition(gameState, pos);
      updatePositionUI();
    });
  });

  // Skill buttons
  document.querySelectorAll('.rhythm-skill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!gameState || !gameState.running) return;
      const skillId = (btn as HTMLElement).dataset.skillId!;
      handleSkillTap(skillId);
    });

    // Add visual feedback
    btn.addEventListener('touchstart', () => {
      (btn as HTMLElement).classList.add('btn-pressed');
    }, { passive: true });
    btn.addEventListener('touchend', () => {
      (btn as HTMLElement).classList.remove('btn-pressed');
    }, { passive: true });
  });
}

function updatePositionUI() {
  if (!gameState) return;
  const rearBtn = document.getElementById('pos-rear');
  const flankBtn = document.getElementById('pos-flank');
  const indicator = document.getElementById('pos-indicator');
  if (!rearBtn || !flankBtn || !indicator) return;

  rearBtn.classList.toggle('selected', gameState.playerPosition === 'rear');
  flankBtn.classList.toggle('selected', gameState.playerPosition === 'flank');
  indicator.style.transform = gameState.playerPosition === 'flank' ? 'translateX(30px)' : 'translateX(-30px)';
}

function handleSkillTap(skillId: string) {
  if (!gameState || !gameState.running) return;
  const now = performance.now();

  const result = tapSkill(gameState, skillId, now);
  gameState = result.state;

  if (result.result) {
    showTimingFeedback(result.result);
    showRhythmEffects(result.result);
    updateHUD();
  }

  if (isGameOver(gameState)) {
    cancelAnimationFrame(animFrameId);
    setTimeout(() => showResultScreen(), 800);
  }
}

function showTimingFeedback(result: NoteResult) {
  const el = document.getElementById('timing-feedback');
  if (!el) return;

  const labels: Record<string, { text: string; cls: string }> = {
    perfect: { text: 'PERFECT!!', cls: 'fb-perfect' },
    great: { text: 'GREAT!', cls: 'fb-great' },
    good: { text: 'GOOD', cls: 'fb-good' },
    miss: { text: 'MISS...', cls: 'fb-miss' },
  };

  const info = labels[result.timing];
  el.textContent = info.text;
  el.className = 'timing-feedback ' + info.cls;
  // Re-trigger animation
  el.classList.remove('fb-animate');
  void el.offsetWidth;
  el.classList.add('fb-animate');

  // Show positional result if applicable
  const skill = allSkills[result.skillId];
  if (skill?.position && result.timing !== 'miss') {
    const posEl = document.createElement('div');
    posEl.className = result.positionCorrect ? 'pos-feedback pos-ok' : 'pos-feedback pos-ng';
    posEl.textContent = result.positionCorrect ? '方向OK!' : '方向NG...';
    el.appendChild(posEl);
  }
}

function showRhythmEffects(result: NoteResult) {
  const container = document.getElementById('effects-layer');
  const gameContainer = document.getElementById('game-container');
  const comboDisplay = document.getElementById('combo-display');
  if (!container || !gameContainer) return;

  const hitLine = document.getElementById('hit-line');
  if (!hitLine) return;

  const hitRect = hitLine.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const cx = hitRect.left - containerRect.left + hitRect.width / 2;
  const cy = hitRect.top - containerRect.top + hitRect.height / 2;

  // Hit spark at the hit line
  showHitSpark(container, cx, cy, result.timing);

  // Score popup
  if (result.score > 0) {
    showDamageNumber(container, `+${result.score}`, '#c4a1ff', cx + 40, cy - 20);
  }

  // Screen shake
  if (result.timing === 'perfect') {
    screenShake(gameContainer, 4);
  } else if (result.timing === 'great') {
    screenShake(gameContainer, 2);
  }

  // Combo pop
  if (comboDisplay) {
    animateCombo(comboDisplay);
  }
}

function updateHUD() {
  if (!gameState) return;
  const scoreEl = document.getElementById('score-value');
  const comboEl = document.getElementById('combo-count');
  if (scoreEl) scoreEl.textContent = gameState.score.toLocaleString();
  if (comboEl) comboEl.textContent = String(gameState.combo);
}

// ========================
// Game Loop
// ========================
function startGameLoop() {
  function tick() {
    if (!gameState || !gameState.running) return;
    const now = performance.now();

    // Process auto-misses
    const missResult = processMisses(gameState, now);
    if (missResult.missed) {
      gameState = missResult.state;
      updateHUD();
      showTimingFeedback({ skillId: '', timing: 'miss', positionCorrect: false, score: 0 });
    }

    // Render notes
    renderNotes(now);

    // Check game over
    if (isGameOver(gameState)) {
      cancelAnimationFrame(animFrameId);
      setTimeout(() => showResultScreen(), 800);
      return;
    }

    animFrameId = requestAnimationFrame(tick);
  }

  animFrameId = requestAnimationFrame(tick);
}

function renderNotes(now: number) {
  if (!gameState) return;
  const container = document.getElementById('note-container');
  const lane = document.getElementById('note-lane');
  if (!container || !lane) return;

  const laneWidth = lane.clientWidth;

  // Clear old notes
  container.innerHTML = '';

  // Render visible notes
  const visibleRange = 6; // show up to 6 notes ahead
  const start = gameState.activeNote;
  const end = Math.min(start + visibleRange, gameState.totalNotes);

  for (let i = start; i < end; i++) {
    const progress = noteProgress(gameState, i, now);
    if (progress < 0) continue; // not yet visible
    if (progress > 1.2) continue; // already past

    const step = gameState.course.rotation[i];
    const skill = allSkills[step.skillId];
    if (!skill) continue;

    // Note position: progress 0 = right edge, 1 = hit line (15% from left)
    const hitLinePos = 0.15;
    const xPct = hitLinePos + (1 - progress) * (1 - hitLinePos);
    const xPx = xPct * laneWidth;

    const note = document.createElement('div');
    note.className = `note ${step.isOgcd ? 'note-ogcd' : 'note-gcd'} ${i === start ? 'note-active' : ''}`;
    note.style.left = `${xPx}px`;
    note.style.borderColor = skill.color;

    // Flash when near hit line
    if (progress > 0.85 && progress < 1.15) {
      note.classList.add('note-ready');
    }

    note.innerHTML = `
      <span class="note-icon">${skill.icon}</span>
      <span class="note-name">${skill.nameJa}</span>
      ${skill.position ? `<span class="note-pos ${skill.position === 'rear' ? 'note-pos-rear' : 'note-pos-flank'}">${skill.position === 'rear' ? '背' : '側'}</span>` : ''}
      ${step.isOgcd ? '<span class="note-ogcd-badge">oGCD</span>' : ''}
    `;

    container.appendChild(note);
  }
}

// ========================
// Result Screen
// ========================
function showResultScreen() {
  if (!gameState) return;
  cancelAnimationFrame(animFrameId);

  const { grade, color } = getGrade(gameState);
  const accuracy = getAccuracy(gameState);
  const positionalPercent = Math.round(accuracy.positionalRate * 100);

  app.innerHTML = `
    <div class="screen result-screen">
      <h2 class="result-title">結果発表</h2>

      <div class="result-grade" style="color: ${color}">
        <span class="grade-letter">${grade}</span>
        <span class="grade-label">RANK</span>
      </div>

      <div class="result-score">
        <span class="result-score-value">${gameState.score.toLocaleString()}</span>
        <span class="result-score-label">TOTAL SCORE</span>
      </div>

      <div class="result-stats">
        <div class="stat-row">
          <span class="stat-label">最大コンボ</span>
          <span class="stat-value">${gameState.maxCombo}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">PERFECT</span>
          <span class="stat-value perfect-color">${accuracy.perfect}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">GREAT</span>
          <span class="stat-value great-color">${accuracy.great}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">GOOD</span>
          <span class="stat-value">${accuracy.good}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">MISS</span>
          <span class="stat-value miss-color">${accuracy.miss}</span>
        </div>
        <div class="stat-row stat-positional">
          <span class="stat-label">ポジショナル成功率</span>
          <span class="stat-value ${positionalPercent === 100 ? 'perfect-color' : ''}">${positionalPercent}%</span>
        </div>
      </div>

      <div class="result-buttons">
        <button class="btn-retry" id="btn-retry">もう一度</button>
        <button class="btn-back" id="btn-courses">コース選択へ</button>
      </div>
    </div>
  `;

  document.getElementById('btn-retry')!.addEventListener('click', () => {
    startGame(gameState!.course);
  });

  document.getElementById('btn-courses')!.addEventListener('click', showCourseSelect);
}
