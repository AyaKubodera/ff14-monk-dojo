import { allCourses } from '../game/courses';
import { gcdSkills, ogcdSkills } from '../game/skills';
import type { Course, GameState, Skill } from '../game/types';
import {
  createGameState,
  getCurrentStep,
  setPlayerPosition,
  executeSkill,
  getGrade,
  getAccuracy,
} from '../game/engine';
import {
  showDamageNumber,
  showHitSpark,
  animateCombo,
  screenShake,
  flashEnemy,
} from './effects';

let app: HTMLElement;
let gameState: GameState | null = null;

export function initApp(root: HTMLElement) {
  app = root;
  showTitleScreen();
}

// ========================
// Title Screen
// ========================
function showTitleScreen() {
  app.innerHTML = `
    <div class="screen title-screen">
      <div class="title-bg">
        <h1 class="game-title">
          <span class="title-sub">FF14</span>
          <span class="title-main">モンク道場</span>
        </h1>
        <p class="title-tagline">〜 スキル回し特訓 〜</p>
        <div class="title-monk-icon">🐱</div>
        <button class="btn-start" id="btn-start">おけいこ はじめる</button>
        <p class="title-credit">Tap to master the Monk rotation!</p>
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
// Game Screen
// ========================
function startGame(course: Course) {
  gameState = createGameState(course);
  renderGameScreen();
}

function renderGameScreen() {
  if (!gameState) return;
  const current = getCurrentStep(gameState);
  if (!current || gameState.phase === 'finished') {
    showResultScreen();
    return;
  }

  const { step, skill } = current;
  const isOgcd = step.isOgcd;
  const progress = (gameState.currentStep / gameState.totalSteps) * 100;

  // Determine which skills to show as buttons
  let availableSkills: Skill[];
  if (isOgcd) {
    // Show relevant oGCDs + some distractors
    availableSkills = getOgcdChoices(skill);
  } else {
    availableSkills = gcdSkills;
  }

  const positionPhase = gameState.phase === 'position';
  const skillPhase = gameState.phase === 'skill';
  const ogcdPhase = gameState.phase === 'ogcd';

  // Position indicator text
  let positionGuide = '';
  if (skill.position) {
    positionGuide = skill.position === 'rear' ? '背面(Rear)' : '側面(Flank)';
  }

  // Form display
  const formNames: Record<string, string> = {
    opoopo: 'オポオポの型',
    raptor: '疾風の型',
    coeurl: '金剛の型',
  };

  app.innerHTML = `
    <div class="screen game-screen" id="game-container">
      <!-- Top HUD -->
      <div class="hud">
        <div class="hud-score">
          <span class="label">SCORE</span>
          <span class="value" id="score-value">${gameState.score.toLocaleString()}</span>
        </div>
        <div class="hud-combo" id="combo-display">
          <span class="combo-count">${gameState.combo}</span>
          <span class="combo-label">COMBO</span>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progress}%"></div>
        <span class="progress-text">${gameState.currentStep + 1} / ${gameState.totalSteps}</span>
      </div>

      <!-- Current skill instruction -->
      <div class="instruction-area">
        ${!isOgcd && skill.form ? `<div class="form-badge form-${skill.form}">${formNames[skill.form]}</div>` : ''}
        <div class="skill-prompt ${isOgcd ? 'ogcd-prompt' : ''}">
          <span class="skill-icon-large">${skill.icon}</span>
          <span class="skill-name-large">${skill.nameJa}</span>
        </div>
        ${!isOgcd && positionGuide ? `<div class="position-guide">→ ${positionGuide} ←</div>` : ''}
        <div class="hint-text">${step.hint || ''}</div>
      </div>

      <!-- Enemy & Position Area -->
      ${!isOgcd && positionPhase ? `
      <div class="battle-area">
        <div class="position-zone zone-flank-left zone-active ${gameState.playerPosition === 'flank' ? 'zone-selected' : ''}"
             data-position="flank">
          <span class="zone-label">側面</span>
          <span class="zone-sublabel">FLANK</span>
        </div>
        <div class="enemy" id="enemy">
          <div class="enemy-body">
            <div class="enemy-face">🌸</div>
            <div class="enemy-name">もくじん</div>
          </div>
          <div class="enemy-front-indicator">▲ まえ</div>
        </div>
        <div class="position-zone zone-flank-right zone-active ${gameState.playerPosition === 'flank' ? 'zone-selected' : ''}"
             data-position="flank">
          <span class="zone-label">側面</span>
          <span class="zone-sublabel">FLANK</span>
        </div>
      </div>
      <div class="rear-zone-row">
        <div class="position-zone zone-rear zone-active ${gameState.playerPosition === 'rear' ? 'zone-selected' : ''}"
             data-position="rear">
          <span class="zone-label">背面</span>
          <span class="zone-sublabel">REAR</span>
        </div>
      </div>
      ` : `
      <div class="battle-area ogcd-battle">
        <div class="enemy" id="enemy">
          <div class="enemy-body">
            <div class="enemy-face">🌸</div>
            <div class="enemy-name">もくじん</div>
          </div>
        </div>
      </div>
      `}

      <!-- Phase instruction -->
      <div class="phase-instruction">
        ${positionPhase ? '<span class="phase-text blink">⬆ ポジションを選択！ ⬆</span>' : ''}
        ${skillPhase ? '<span class="phase-text blink">⬇ スキルをタップ！ ⬇</span>' : ''}
        ${ogcdPhase ? '<span class="phase-text blink ogcd-text">⬇ oGCDをタップ！ ⬇</span>' : ''}
      </div>

      <!-- Skill Buttons -->
      <div class="skill-bar ${isOgcd ? 'ogcd-bar' : 'gcd-bar'}">
        ${availableSkills.map(s => `
          <button class="skill-btn ${s.id === skill.id ? '' : ''}"
                  data-skill-id="${s.id}"
                  style="background: ${s.color}20; border-color: ${s.color}"
                  ${!skillPhase && !ogcdPhase ? 'disabled' : ''}>
            <span class="skill-btn-icon">${s.icon}</span>
            <span class="skill-btn-name">${s.nameJa}</span>
            ${s.position ? `<span class="skill-btn-pos">${s.position === 'rear' ? '背' : '側'}</span>` : ''}
          </button>
        `).join('')}
      </div>

      <!-- Effects container -->
      <div class="effects-layer" id="effects-layer"></div>
    </div>
  `;

  // Bind events
  bindGameEvents();
}

function getOgcdChoices(correctSkill: Skill): Skill[] {
  // Always include the correct skill + 2-3 distractors
  const choices = [correctSkill];
  const others = ogcdSkills.filter(s => s.id !== correctSkill.id);
  // Shuffle and pick 3
  const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
  choices.push(...shuffled);
  // Shuffle the final list
  return choices.sort(() => Math.random() - 0.5);
}

function bindGameEvents() {
  // Position zones
  document.querySelectorAll('.position-zone').forEach(zone => {
    zone.addEventListener('click', () => {
      if (!gameState || gameState.phase !== 'position') return;
      const position = (zone as HTMLElement).dataset.position as 'flank' | 'rear';
      gameState = setPlayerPosition(gameState, position);
      renderGameScreen();
    });
  });

  // Skill buttons
  document.querySelectorAll('.skill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!gameState) return;
      if (gameState.phase !== 'skill' && gameState.phase !== 'ogcd') return;

      const skillId = (btn as HTMLElement).dataset.skillId!;
      const current = getCurrentStep(gameState);
      if (!current) return;

      const oldState = { ...gameState };
      gameState = executeSkill(gameState, skillId);

      // Show effects
      const lastResult = gameState.results[gameState.results.length - 1];
      if (lastResult) {
        showEffects(lastResult, oldState);
      }

      // Small delay before rendering next step
      setTimeout(() => {
        renderGameScreen();
      }, 400);
    });
  });
}

function showEffects(result: { timing: string; score: number; positionCorrect: boolean; potency: number }, _oldState: GameState) {
  const container = document.getElementById('effects-layer');
  const enemy = document.getElementById('enemy');
  const comboDisplay = document.getElementById('combo-display');
  const gameContainer = document.getElementById('game-container');

  if (!container || !enemy || !gameContainer) return;

  const enemyRect = enemy.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const cx = enemyRect.left - containerRect.left + enemyRect.width / 2;
  const cy = enemyRect.top - containerRect.top + enemyRect.height / 2;

  // Hit spark
  showHitSpark(container, cx, cy, result.timing as any);

  // Damage number
  if (result.potency > 0) {
    const dmgColor = result.timing === 'perfect' ? '#ff8fb1' : result.timing === 'great' ? '#c4a1ff' : '#b8a9cc';
    showDamageNumber(container, result.potency, dmgColor, cx + (Math.random() - 0.5) * 40, cy - 30);
  }

  // Score popup
  if (result.score > 0) {
    showDamageNumber(container, `+${result.score}`, '#c4a1ff', cx + 60, cy - 10);
  }

  // Screen shake on perfect/great
  if (result.timing === 'perfect') {
    screenShake(gameContainer, 4);
    flashEnemy(enemy, '#ff8fb1');
  } else if (result.timing === 'great') {
    screenShake(gameContainer, 2);
    flashEnemy(enemy, '#c4a1ff');
  } else if (result.timing === 'miss') {
    flashEnemy(enemy, '#ff7b9c');
  }

  // Combo animation
  if (comboDisplay) {
    animateCombo(comboDisplay);
  }
}

// ========================
// Result Screen
// ========================
function showResultScreen() {
  if (!gameState) return;

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
