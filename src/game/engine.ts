import type { GameState, Course, StepResult, Position } from './types';
import { allSkills } from './skills';

export function createGameState(course: Course): GameState {
  const firstStep = course.rotation[0];
  const firstSkill = allSkills[firstStep.skillId];
  return {
    course,
    currentStep: 0,
    score: 0,
    combo: 0,
    maxCombo: 0,
    results: [],
    playerPosition: null,
    phase: getPhaseForStep(firstStep, firstSkill),
    totalSteps: course.rotation.length,
  };
}

function getPhaseForStep(step: { skillId: string; isOgcd: boolean }, skill: { position?: Position }): GameState['phase'] {
  if (step.isOgcd) return 'ogcd';
  if (skill.position) return 'position';
  return 'skill'; // GCD without positional → skip position selection
}

export function getCurrentStep(state: GameState) {
  if (state.currentStep >= state.course.rotation.length) return null;
  const step = state.course.rotation[state.currentStep];
  const skill = allSkills[step.skillId];
  return { step, skill };
}

export function setPlayerPosition(state: GameState, position: Position): GameState {
  if (state.phase !== 'position') return state;
  return {
    ...state,
    playerPosition: position,
    phase: 'skill',
  };
}

export function executeSkill(state: GameState, skillId: string): GameState {
  const current = getCurrentStep(state);
  if (!current) return { ...state, phase: 'finished' };

  const { step, skill } = current;
  const isOgcd = step.isOgcd;

  // Check if player is in correct phase
  if (isOgcd && state.phase !== 'ogcd') return state;
  if (!isOgcd && state.phase !== 'skill') return state;

  const skillCorrect = skillId === step.skillId;
  let positionCorrect = true;
  let potency = 0;

  if (!isOgcd && skill.position) {
    positionCorrect = state.playerPosition === skill.position;
    potency = skill.potency + (positionCorrect ? skill.positionalBonus : 0);
  } else {
    potency = skill.potency;
  }

  // Calculate timing rating based on correctness
  let timing: StepResult['timing'];
  if (skillCorrect && positionCorrect) {
    timing = 'perfect';
  } else if (skillCorrect) {
    timing = 'great';
  } else {
    timing = 'miss';
  }

  // Score calculation
  let stepScore = 0;
  if (timing === 'perfect') {
    stepScore = 1000;
  } else if (timing === 'great') {
    stepScore = 600;
  }

  // Combo multiplier
  const newCombo = timing !== 'miss' ? state.combo + 1 : 0;
  const comboMultiplier = 1 + Math.min(newCombo, 20) * 0.1;
  stepScore = Math.floor(stepScore * comboMultiplier);

  const result: StepResult = {
    skillId: skillCorrect ? step.skillId : skillId,
    positionCorrect,
    skillCorrect,
    timing,
    score: stepScore,
    potency,
  };

  const nextStepIndex = state.currentStep + 1;
  const isFinished = nextStepIndex >= state.course.rotation.length;

  let nextPhase: GameState['phase'];
  if (isFinished) {
    nextPhase = 'finished';
  } else {
    const nextStep = state.course.rotation[nextStepIndex];
    const nextSkill = allSkills[nextStep.skillId];
    nextPhase = getPhaseForStep(nextStep, nextSkill);
  }

  return {
    ...state,
    currentStep: nextStepIndex,
    score: state.score + stepScore,
    combo: newCombo,
    maxCombo: Math.max(state.maxCombo, newCombo),
    results: [...state.results, result],
    playerPosition: null,
    phase: nextPhase,
  };
}

export function getGrade(state: GameState): { grade: string; color: string } {
  const ratio = state.score / (state.totalSteps * 1000);

  if (ratio >= 1.5) return { grade: 'S', color: '#ffd700' };
  if (ratio >= 1.2) return { grade: 'A', color: '#ff6644' };
  if (ratio >= 0.9) return { grade: 'B', color: '#44aaff' };
  if (ratio >= 0.6) return { grade: 'C', color: '#44cc44' };
  return { grade: 'D', color: '#888888' };
}

export function getAccuracy(state: GameState): {
  perfect: number;
  great: number;
  good: number;
  miss: number;
  positionalRate: number;
} {
  const results = state.results;
  const perfect = results.filter(r => r.timing === 'perfect').length;
  const great = results.filter(r => r.timing === 'great').length;
  const good = results.filter(r => r.timing === 'good').length;
  const miss = results.filter(r => r.timing === 'miss').length;

  const gcdResults = results.filter((_, i) => !state.course.rotation[i]?.isOgcd);
  const correctPositionals = gcdResults.filter(r => r.positionCorrect).length;
  const positionalRate = gcdResults.length > 0 ? correctPositionals / gcdResults.length : 1;

  return { perfect, great, good, miss, positionalRate };
}
