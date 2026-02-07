export type Position = 'flank' | 'rear';
export type Form = 'opoopo' | 'raptor' | 'coeurl';
export type SkillType = 'gcd' | 'ogcd';

export interface Skill {
  id: string;
  name: string;
  nameJa: string;
  type: SkillType;
  form?: Form;        // GCDs belong to a form
  position?: Position; // positional requirement (GCDs only)
  potency: number;
  positionalBonus: number; // extra potency if positional is correct
  icon: string;        // emoji or text icon
  color: string;       // skill button color
  description: string;
}

export interface RotationStep {
  skillId: string;
  isOgcd: boolean;
  hint?: string;       // coaching hint shown to player
}

export interface Course {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  descriptionJa: string;
  icon: string;
  difficulty: number;  // 1-5
  rotation: RotationStep[];
  loopFrom?: number;   // index to loop back to for repeating rotations
}

export interface StepResult {
  skillId: string;
  positionCorrect: boolean;
  skillCorrect: boolean;
  timing: 'perfect' | 'great' | 'good' | 'miss';
  score: number;
  potency: number;
}

export interface GameState {
  course: Course;
  currentStep: number;
  score: number;
  combo: number;
  maxCombo: number;
  results: StepResult[];
  playerPosition: Position | null;
  phase: 'position' | 'skill' | 'ogcd' | 'result' | 'finished';
  totalSteps: number;
}
