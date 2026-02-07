import type { Course } from './types';

/**
 * 基本回し徹底レッスンコース
 * モンクの基本GCD回しを学ぶ。
 * オポオポ → ラプター → クールの3段コンボを繰り返す。
 * 各スキルのポジショナル（側面/背面）を覚えるのが目標。
 *
 * 回し: DK → TS → Demo → LO → RR → PC → (repeat)
 * 全6スキルのポジショナルを2ループ = 12ステップ
 */
export const basicRotationCourse: Course = {
  id: 'basic-rotation',
  name: 'Basic Rotation Mastery',
  nameJa: '基本回し徹底レッスン',
  description: 'Learn the fundamental GCD rotation with proper positionals.',
  descriptionJa: '基本のGCD回しとポジショナル（側面・背面）を徹底的に覚えよう！',
  icon: '📖',
  difficulty: 1,
  rotation: [
    // Loop 1 - Nadi: Lunar
    { skillId: 'dragon-kick', isOgcd: false, hint: 'オポオポの型！ドラゴンキックは側面(Flank)から！' },
    { skillId: 'twin-snakes', isOgcd: false, hint: '疾風の型！双掌打は側面(Flank)から！' },
    { skillId: 'demolish', isOgcd: false, hint: '金剛の型！破砕拳は背面(Rear)から！' },
    // Loop 2 - Nadi: Solar
    { skillId: 'leaping-opo', isOgcd: false, hint: 'オポオポの型！リーピングオポオポは背面(Rear)から！' },
    { skillId: 'rising-raptor', isOgcd: false, hint: '疾風の型！ライジングラプターは背面(Rear)から！' },
    { skillId: 'pouncing-coeurl', isOgcd: false, hint: '金剛の型！ポウンシングクールは側面(Flank)から！' },
    // Loop 3 repeat
    { skillId: 'dragon-kick', isOgcd: false, hint: 'もう覚えた？ドラゴンキックは側面！' },
    { skillId: 'twin-snakes', isOgcd: false, hint: '双掌打は側面！テンポよく！' },
    { skillId: 'demolish', isOgcd: false, hint: '破砕拳は背面！ここまでが1セット！' },
    { skillId: 'leaping-opo', isOgcd: false, hint: 'リーピングオポオポは背面！' },
    { skillId: 'rising-raptor', isOgcd: false, hint: 'ライジングラプターは背面！' },
    { skillId: 'pouncing-coeurl', isOgcd: false, hint: 'ポウンシングクールは側面！完璧！' },
  ],
};

/**
 * 開幕回しコース
 * モンクの開幕回し（Opener）を学ぶ。
 * oGCDの挟み込み（ウィーブ）を含む実践的な回し。
 *
 * Standard Dawntrail Opener:
 * (Pre-pull) Thunderclap → Dragon Kick → (PB + RoF) →
 * Leaping Opo → (Brotherhood) → Dragon Kick →
 * Leaping Opo → (RoW + Forbidden Chakra) → ...
 */
export const openerCourse: Course = {
  id: 'opener',
  name: 'Opener Course',
  nameJa: '開幕回しコース',
  description: 'Master the Monk opener with oGCD weaving.',
  descriptionJa: '開幕回しをoGCDウィーブ込みで完全マスター！',
  icon: '⚔️',
  difficulty: 3,
  rotation: [
    // Pre-pull: DK starts the fight
    { skillId: 'dragon-kick', isOgcd: false, hint: '開幕！ドラゴンキックでスタート！側面から！' },
    // Weave: Perfect Balance + Riddle of Fire
    { skillId: 'perfect-balance', isOgcd: true, hint: '踏鳴でバランスを崩す！型の制約解除！' },
    { skillId: 'riddle-of-fire', isOgcd: true, hint: '紅蓮の極意！ダメージバフ発動！' },
    // Under PB: Leaping Opo
    { skillId: 'leaping-opo', isOgcd: false, hint: '踏鳴中！リーピングオポオポ！背面から！' },
    // Weave: Brotherhood
    { skillId: 'brotherhood', isOgcd: true, hint: '桃園結義！PT全体バフ！' },
    // Under PB: Dragon Kick
    { skillId: 'dragon-kick', isOgcd: false, hint: '踏鳴中！ドラゴンキック！側面から！' },
    // Under PB: Leaping Opo → Elixir Field
    { skillId: 'leaping-opo', isOgcd: false, hint: '踏鳴中！リーピングオポオポ！背面！' },
    // Weave: Elixir Field (from Formless Fist under PB)
    { skillId: 'elixir-field', isOgcd: true, hint: '蒼気法！闘魂旋風脚から派生！' },
    // Continue rotation
    { skillId: 'twin-snakes', isOgcd: false, hint: '双掌打！側面から！' },
    // Weave: Riddle of Wind
    { skillId: 'riddle-of-wind', isOgcd: true, hint: '疾風の極意！AA速度アップ！' },
    { skillId: 'demolish', isOgcd: false, hint: '破砕拳！背面から！' },
    // Weave: Fire's Reply
    { skillId: 'fires-reply', isOgcd: true, hint: '業火の型！紅蓮の極意バフ中に使う！' },
    // PB #2
    { skillId: 'leaping-opo', isOgcd: false, hint: 'リーピングオポオポ！背面！' },
    { skillId: 'perfect-balance', isOgcd: true, hint: '2回目の踏鳴！' },
    { skillId: 'dragon-kick', isOgcd: false, hint: '踏鳴中！ドラゴンキック！側面！' },
    { skillId: 'leaping-opo', isOgcd: false, hint: '踏鳴中！リーピングオポオポ！背面！' },
    { skillId: 'dragon-kick', isOgcd: false, hint: '踏鳴中！ドラゴンキック！側面！' },
    // Rising Phoenix from PB
    { skillId: 'rising-phoenix', isOgcd: true, hint: '鳳凰の舞！踏鳴フィニッシュ！' },
    // Continue
    { skillId: 'rising-raptor', isOgcd: false, hint: 'ライジングラプター！背面！' },
    { skillId: 'the-forbidden-chakra', isOgcd: true, hint: '陰陽闘気斬！チャクラ消費！' },
    { skillId: 'pouncing-coeurl', isOgcd: false, hint: 'ポウンシングクール！側面！フィニッシュ！' },
    { skillId: 'winds-reply', isOgcd: true, hint: '疾風の型！疾風の極意バフ中に！' },
  ],
};

export const allCourses: Course[] = [basicRotationCourse, openerCourse];
