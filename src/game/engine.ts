import type { GameState, Course, NoteResult, Timing, Position } from './types';
import { allSkills } from './skills';

const NOTE_INTERVAL_MS = 1800; // time between notes
const PERFECT_WINDOW = 80;  // ±ms
const GREAT_WINDOW = 160;
const GOOD_WINDOW = 280;

export function createGameState(course: Course): GameState {
  return {
    course,
    activeNote: 0,
    score: 0,
    combo: 0,
    maxCombo: 0,
    results: [],
    playerPosition: 'rear',
    running: false,
    startTime: 0,
    noteInterval: NOTE_INTERVAL_MS,
    totalNotes: course.rotation.length,
  };
}

/** Returns the ideal hit time for a given note index */
export function noteHitTime(state: GameState, index: number): number {
  // First note at 2s, then every noteInterval
  return state.startTime + 2000 + index * state.noteInterval;
}

/** How far along (0..1) a note is in its travel. 1 = at hit line. >1 = past. */
export function noteProgress(state: GameState, index: number, now: number): number {
  const hitTime = noteHitTime(state, index);
  const travelDuration = state.noteInterval * 3; // notes visible for 3 beats
  const elapsed = now - (hitTime - travelDuration);
  return elapsed / travelDuration;
}

/** Judge timing based on how close the tap is to the ideal hit time */
export function judgeTiming(state: GameState, noteIndex: number, now: number): Timing {
  const hitTime = noteHitTime(state, noteIndex);
  const diff = Math.abs(now - hitTime);
  if (diff <= PERFECT_WINDOW) return 'perfect';
  if (diff <= GREAT_WINDOW) return 'great';
  if (diff <= GOOD_WINDOW) return 'good';
  return 'miss';
}

/** Check if a note has been missed (passed too far) */
export function isNoteMissed(state: GameState, noteIndex: number, now: number): boolean {
  const hitTime = noteHitTime(state, noteIndex);
  return now > hitTime + GOOD_WINDOW + 50;
}

/** Process a tap on a skill */
export function tapSkill(state: GameState, skillId: string, now: number): { state: GameState; result: NoteResult | null } {
  if (!state.running || state.activeNote >= state.totalNotes) {
    return { state, result: null };
  }

  const step = state.course.rotation[state.activeNote];
  const skill = allSkills[step.skillId];
  const timing = judgeTiming(state, state.activeNote, now);

  // Wrong skill = miss
  const skillCorrect = skillId === step.skillId;
  const finalTiming: Timing = skillCorrect ? timing : 'miss';

  // Positional check
  let positionCorrect = true;
  if (skill.position) {
    positionCorrect = state.playerPosition === skill.position;
  }

  // Score
  let score = 0;
  if (finalTiming === 'perfect') score = positionCorrect ? 1000 : 700;
  else if (finalTiming === 'great') score = positionCorrect ? 800 : 550;
  else if (finalTiming === 'good') score = positionCorrect ? 500 : 350;

  const newCombo = finalTiming !== 'miss' ? state.combo + 1 : 0;
  const comboBonus = 1 + Math.min(newCombo, 30) * 0.05;
  score = Math.floor(score * comboBonus);

  const result: NoteResult = {
    skillId: skillCorrect ? step.skillId : skillId,
    timing: finalTiming,
    positionCorrect,
    score,
  };

  return {
    state: {
      ...state,
      activeNote: state.activeNote + 1,
      score: state.score + score,
      combo: newCombo,
      maxCombo: Math.max(state.maxCombo, newCombo),
      results: [...state.results, result],
    },
    result,
  };
}

/** Auto-miss notes that have passed */
export function processMisses(state: GameState, now: number): { state: GameState; missed: boolean } {
  let newState = state;
  let missed = false;
  while (newState.activeNote < newState.totalNotes && isNoteMissed(newState, newState.activeNote, now)) {
    const step = newState.course.rotation[newState.activeNote];
    const result: NoteResult = {
      skillId: step.skillId,
      timing: 'miss',
      positionCorrect: false,
      score: 0,
    };
    newState = {
      ...newState,
      activeNote: newState.activeNote + 1,
      combo: 0,
      results: [...newState.results, result],
    };
    missed = true;
  }
  return { state: newState, missed };
}

export function setPosition(state: GameState, pos: Position): GameState {
  return { ...state, playerPosition: pos };
}

export function isGameOver(state: GameState): boolean {
  return state.activeNote >= state.totalNotes;
}

export function getGrade(state: GameState): { grade: string; color: string } {
  const maxScore = state.totalNotes * 1000 * 2.5;
  const ratio = state.score / maxScore;
  if (ratio >= 0.45) return { grade: 'S', color: '#ff8fb1' };
  if (ratio >= 0.35) return { grade: 'A', color: '#c4a1ff' };
  if (ratio >= 0.25) return { grade: 'B', color: '#a1d4ff' };
  if (ratio >= 0.15) return { grade: 'C', color: '#a1ffd4' };
  return { grade: 'D', color: '#b8a9cc' };
}

export function getAccuracy(state: GameState) {
  const r = state.results;
  return {
    perfect: r.filter(x => x.timing === 'perfect').length,
    great: r.filter(x => x.timing === 'great').length,
    good: r.filter(x => x.timing === 'good').length,
    miss: r.filter(x => x.timing === 'miss').length,
    positionalRate: (() => {
      const posSteps = state.course.rotation
        .map((step, i) => ({ step, result: r[i] }))
        .filter(({ step }) => allSkills[step.skillId]?.position);
      if (posSteps.length === 0) return 1;
      return posSteps.filter(({ result }) => result?.positionCorrect).length / posSteps.length;
    })(),
  };
}
