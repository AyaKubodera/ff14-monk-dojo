export type Position = 'flank' | 'rear';
export type Form = 'opoopo' | 'raptor' | 'coeurl';
export type SkillType = 'gcd' | 'ogcd';

export interface Skill {
  id: string;
  name: string;
  nameJa: string;
  type: SkillType;
  form?: Form;
  position?: Position;
  potency: number;
  positionalBonus: number;
  icon: string;
  color: string;
  description: string;
}

export interface RotationStep {
  skillId: string;
  isOgcd: boolean;
  hint?: string;
}

export interface Course {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  descriptionJa: string;
  icon: string;
  difficulty: number;
  rotation: RotationStep[];
}

export type Timing = 'perfect' | 'great' | 'good' | 'miss';

export interface NoteResult {
  skillId: string;
  timing: Timing;
  positionCorrect: boolean;
  score: number;
}

/** Runtime state for the rhythm game */
export interface GameState {
  course: Course;
  /** Currently active note index (next to hit) */
  activeNote: number;
  score: number;
  combo: number;
  maxCombo: number;
  results: NoteResult[];
  /** Player's current position (flank or rear) */
  playerPosition: Position;
  /** Is the game running? */
  running: boolean;
  /** Timestamp when game started */
  startTime: number;
  /** BPM-like: ms per note */
  noteInterval: number;
  totalNotes: number;
}
