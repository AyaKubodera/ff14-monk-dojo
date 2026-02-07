import type { Skill } from './types';

// === GCD Skills (Dawntrail era Monk) ===

// Opo-opo Form
export const leapingOpo: Skill = {
  id: 'leaping-opo',
  name: 'Leaping Opo',
  nameJa: 'リーピングオポオポ',
  type: 'gcd',
  form: 'opoopo',
  position: 'rear',
  potency: 260,
  positionalBonus: 50,
  icon: '🦶',
  color: '#e85d3a',
  description: '背面ボーナス。オポオポの型で使用。',
};

export const dragonKick: Skill = {
  id: 'dragon-kick',
  name: 'Dragon Kick',
  nameJa: 'ドラゴンキック',
  type: 'gcd',
  form: 'opoopo',
  position: 'flank',
  potency: 260,
  positionalBonus: 50,
  icon: '🐉',
  color: '#e8a33a',
  description: '側面ボーナス。オポオポの型で使用。',
};

// Raptor Form
export const risingRaptor: Skill = {
  id: 'rising-raptor',
  name: 'Rising Raptor',
  nameJa: 'ライジングラプター',
  type: 'gcd',
  form: 'raptor',
  position: 'rear',
  potency: 260,
  positionalBonus: 50,
  icon: '🦎',
  color: '#3ae85d',
  description: '背面ボーナス。疾風の型で使用。',
};

export const twinSnakes: Skill = {
  id: 'twin-snakes',
  name: 'Twin Snakes',
  nameJa: '双掌打',
  type: 'gcd',
  form: 'raptor',
  position: 'flank',
  potency: 260,
  positionalBonus: 50,
  icon: '🐍',
  color: '#3ae8a3',
  description: '側面ボーナス。疾風の型で使用。',
};

// Coeurl Form
export const pouncingCoeurl: Skill = {
  id: 'pouncing-coeurl',
  name: 'Pouncing Coeurl',
  nameJa: 'ポウンシングクール',
  type: 'gcd',
  form: 'coeurl',
  position: 'flank',
  potency: 260,
  positionalBonus: 50,
  icon: '🐆',
  color: '#3a5de8',
  description: '側面ボーナス。金剛の型で使用。',
};

export const demolish: Skill = {
  id: 'demolish',
  name: 'Demolish',
  nameJa: '破砕拳',
  type: 'gcd',
  form: 'coeurl',
  position: 'rear',
  potency: 260,
  positionalBonus: 50,
  icon: '💥',
  color: '#a33ae8',
  description: '背面ボーナス。金剛の型で使用。',
};

// === oGCD Skills ===

export const riddleOfFire: Skill = {
  id: 'riddle-of-fire',
  name: 'Riddle of Fire',
  nameJa: '紅蓮の極意',
  type: 'ogcd',
  potency: 0,
  positionalBonus: 0,
  icon: '🔥',
  color: '#ff4444',
  description: 'ダメージ15%アップバフ。開幕で即使用。',
};

export const brotherhood: Skill = {
  id: 'brotherhood',
  name: 'Brotherhood',
  nameJa: '桃園結義',
  type: 'ogcd',
  potency: 0,
  positionalBonus: 0,
  icon: '🤝',
  color: '#ff8844',
  description: 'PTメンバーのダメージアップ。',
};

export const perfectBalance: Skill = {
  id: 'perfect-balance',
  name: 'Perfect Balance',
  nameJa: '踏鳴',
  type: 'ogcd',
  potency: 0,
  positionalBonus: 0,
  icon: '⚖️',
  color: '#ffcc44',
  description: '型の制約を無視して任意のWSを使用可能。',
};

export const theForb: Skill = {
  id: 'the-forbidden-chakra',
  name: 'The Forbidden Chakra',
  nameJa: '陰陽闘気斬',
  type: 'ogcd',
  potency: 400,
  positionalBonus: 0,
  icon: '☯️',
  color: '#44ccff',
  description: 'チャクラ5スタックで使用。高威力oGCD。',
};

export const riddleOfWind: Skill = {
  id: 'riddle-of-wind',
  name: 'Riddle of Wind',
  nameJa: '疾風の極意',
  type: 'ogcd',
  potency: 0,
  positionalBonus: 0,
  icon: '🌪️',
  color: '#44ff88',
  description: 'オートアタック速度アップ。',
};

export const elixirBurst: Skill = {
  id: 'elixir-burst',
  name: 'Elixir Burst',
  nameJa: '蒼気砲',
  type: 'ogcd',
  potency: 800,
  positionalBonus: 0,
  icon: '💎',
  color: '#4488ff',
  description: '闘魂旋風脚の後に使用可能。高威力oGCD。',
};

export const firesReply: Skill = {
  id: 'fires-reply',
  name: "Fire's Reply",
  nameJa: '業火の型',
  type: 'ogcd',
  potency: 900,
  positionalBonus: 0,
  icon: '🌋',
  color: '#ff2222',
  description: '紅蓮の極意の効果中に使用可能。',
};

export const windsReply: Skill = {
  id: 'winds-reply',
  name: "Wind's Reply",
  nameJa: '疾風の型',
  type: 'ogcd',
  potency: 900,
  positionalBonus: 0,
  icon: '🌀',
  color: '#22ff88',
  description: '疾風の極意の効果中に使用可能。',
};

export const elixirField: Skill = {
  id: 'elixir-field',
  name: 'Elixir Field',
  nameJa: '蒼気法',
  type: 'ogcd',
  potency: 600,
  positionalBonus: 0,
  icon: '🟢',
  color: '#22ccaa',
  description: '闘魂旋風脚から派生。範囲攻撃。',
};

export const risingPhoenix: Skill = {
  id: 'rising-phoenix',
  name: 'Rising Phoenix',
  nameJa: '鳳凰の舞',
  type: 'ogcd',
  potency: 700,
  positionalBonus: 0,
  icon: '🦅',
  color: '#ff6622',
  description: '紅蓮の鳳凰から派生。範囲攻撃。',
};

export const phantomRush: Skill = {
  id: 'phantom-rush',
  name: 'Phantom Rush',
  nameJa: '夢幻闘舞',
  type: 'ogcd',
  potency: 1150,
  positionalBonus: 0,
  icon: '👻',
  color: '#cc44ff',
  description: '闘魂旋風脚→鳳凰の舞→夢幻闘舞。最強フィニッシュ。',
};

// Skill registry
export const allSkills: Record<string, Skill> = {
  'leaping-opo': leapingOpo,
  'dragon-kick': dragonKick,
  'rising-raptor': risingRaptor,
  'twin-snakes': twinSnakes,
  'pouncing-coeurl': pouncingCoeurl,
  'demolish': demolish,
  'riddle-of-fire': riddleOfFire,
  'brotherhood': brotherhood,
  'perfect-balance': perfectBalance,
  'the-forbidden-chakra': theForb,
  'riddle-of-wind': riddleOfWind,
  'elixir-burst': elixirBurst,
  'fires-reply': firesReply,
  'winds-reply': windsReply,
  'elixir-field': elixirField,
  'rising-phoenix': risingPhoenix,
  'phantom-rush': phantomRush,
};

// GCD skills only (for positional practice)
export const gcdSkills: Skill[] = [
  leapingOpo, dragonKick,
  risingRaptor, twinSnakes,
  pouncingCoeurl, demolish,
];

// oGCD skills
export const ogcdSkills: Skill[] = [
  riddleOfFire, brotherhood, perfectBalance,
  theForb, riddleOfWind, elixirBurst,
  firesReply, windsReply,
  elixirField, risingPhoenix, phantomRush,
];
