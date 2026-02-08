import type { Skill } from './types';

// === GCD Skills (Dawntrail Lv100 Monk) ===
// 7.0では方向指定は虎襲崩拳(側面)と破砕拳(背面)の2つのみ。
// 功力システム: 双竜脚/双掌打/破砕拳 で功力を付与 → 猿舞連撃/竜頷正拳撃/虎襲崩拳 で消費

// Opo-opo Form (オポオポの型)
export const dragonKick: Skill = {
  id: 'dragon-kick',
  name: 'Dragon Kick',
  nameJa: '双竜脚',
  type: 'gcd',
  form: 'opoopo',
  potency: 320,
  positionalBonus: 0,
  icon: '🐉',
  color: '#e8a33a',
  description: 'オポオポの型。壱の功力を付与。方向指定なし。',
};

export const leapingOpo: Skill = {
  id: 'leaping-opo',
  name: 'Leaping Opo',
  nameJa: '猿舞連撃',
  type: 'gcd',
  form: 'opoopo',
  potency: 260,
  positionalBonus: 0,
  icon: '🐵',
  color: '#e85d3a',
  description: 'オポオポの型。壱の功力で威力+100。方向指定なし。',
};

// Raptor Form (疾風の型)
export const twinSnakes: Skill = {
  id: 'twin-snakes',
  name: 'Twin Snakes',
  nameJa: '双掌打',
  type: 'gcd',
  form: 'raptor',
  potency: 280,
  positionalBonus: 0,
  icon: '🐍',
  color: '#3ae8a3',
  description: '疾風の型。弐の功力×2を付与。方向指定なし。',
};

export const risingRaptor: Skill = {
  id: 'rising-raptor',
  name: 'Rising Raptor',
  nameJa: '竜頷正拳撃',
  type: 'gcd',
  form: 'raptor',
  potency: 260,
  positionalBonus: 0,
  icon: '🦎',
  color: '#3ae85d',
  description: '疾風の型。弐の功力で威力+100。方向指定なし。',
};

// Coeurl Form (金剛の型)
export const demolish: Skill = {
  id: 'demolish',
  name: 'Demolish',
  nameJa: '破砕拳',
  type: 'gcd',
  form: 'coeurl',
  position: 'rear',
  potency: 280,
  positionalBonus: 30,
  icon: '💥',
  color: '#a33ae8',
  description: '金剛の型。参の功力×3を付与。【背面】ボーナスあり。',
};

export const pouncingCoeurl: Skill = {
  id: 'pouncing-coeurl',
  name: 'Pouncing Coeurl',
  nameJa: '虎襲崩拳',
  type: 'gcd',
  form: 'coeurl',
  position: 'flank',
  potency: 260,
  positionalBonus: 30,
  icon: '🐆',
  color: '#3a5de8',
  description: '金剛の型。参の功力で威力+100。【側面】ボーナスあり。',
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
  description: '与ダメージ15%アップ（20秒）。乾坤闘気弾が使用可能に。',
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
  description: 'PT全体の与ダメージアップ。120秒リキャスト。',
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
  description: '型の制約を無視して任意のWSを使用可能。必殺技の準備。',
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
  description: 'チャクラ5スタックで使用。高威力アビリティ。',
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
  description: 'AA速度アップ（15秒）。絶空拳が使用可能に。',
};

export const elixirBurst: Skill = {
  id: 'elixir-burst',
  name: 'Elixir Burst',
  nameJa: '真空波',
  type: 'ogcd',
  potency: 800,
  positionalBonus: 0,
  icon: '💎',
  color: '#4488ff',
  description: '同じチャクラ×3で発動。陰の闘気を得る。',
};

export const firesReply: Skill = {
  id: 'fires-reply',
  name: "Fire's Reply",
  nameJa: '乾坤闘気弾',
  type: 'ogcd',
  potency: 900,
  positionalBonus: 0,
  icon: '🌋',
  color: '#ff2222',
  description: '紅蓮の極意の後に使用可能。高威力WS。',
};

export const windsReply: Skill = {
  id: 'winds-reply',
  name: "Wind's Reply",
  nameJa: '絶空拳',
  type: 'ogcd',
  potency: 900,
  positionalBonus: 0,
  icon: '🌀',
  color: '#22ff88',
  description: '疾風の極意の後に使用可能。高威力WS。',
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
  description: '異なるチャクラ×3で発動。陽の闘気を得る。',
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
  description: '陰陽の闘気が揃うと発動。最強フィニッシュ技。',
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
  'rising-phoenix': risingPhoenix,
  'phantom-rush': phantomRush,
};

// GCD skills only (for positional practice)
export const gcdSkills: Skill[] = [
  dragonKick, leapingOpo,
  twinSnakes, risingRaptor,
  demolish, pouncingCoeurl,
];

// oGCD skills
export const ogcdSkills: Skill[] = [
  riddleOfFire, brotherhood, perfectBalance,
  theForb, riddleOfWind, elixirBurst,
  firesReply, windsReply,
  risingPhoenix, phantomRush,
];
