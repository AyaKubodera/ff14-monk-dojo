import type { Course } from './types';

/**
 * 基本回し徹底レッスンコース
 * モンクの基本GCD回しを学ぶ。
 * オポオポ → ラプター → クールの3段コンボを繰り返す。
 * 功力システム: 双竜脚/双掌打/破砕拳 で功力を付与 → 猿舞連撃/竜頷正拳撃/虎襲崩拳 で消費
 * 方向指定は虎襲崩拳(側面)と破砕拳(背面)の2つだけ！
 *
 * 回し: 双竜脚 → 双掌打 → 破砕拳(背面) → 猿舞連撃 → 竜頷正拳撃 → 虎襲崩拳(側面) → repeat
 */
export const basicRotationCourse: Course = {
  id: 'basic-rotation',
  name: 'Basic Rotation Mastery',
  nameJa: '基本回し徹底レッスン',
  description: 'Learn the fundamental GCD rotation with proper positionals.',
  descriptionJa: '基本のGCD回しと功力システム、ポジショナルを覚えよう！方向指定は破砕拳(背面)と虎襲崩拳(側面)の2つだけ！',
  icon: '📖',
  difficulty: 1,
  rotation: [
    // Loop 1 - 功力付与フェーズ（双竜脚→双掌打→破砕拳）
    { skillId: 'dragon-kick', isOgcd: false, hint: 'オポオポの型！双竜脚で壱の功力を付与。方向指定なし。' },
    { skillId: 'twin-snakes', isOgcd: false, hint: '疾風の型！双掌打で弐の功力×2を付与。方向指定なし。' },
    { skillId: 'demolish', isOgcd: false, hint: '金剛の型！破砕拳で参の功力×3を付与。【背面】から撃とう！' },
    // Loop 2 - 功力消費フェーズ（猿舞連撃→竜頷正拳撃→虎襲崩拳）
    { skillId: 'leaping-opo', isOgcd: false, hint: 'オポオポの型！猿舞連撃で壱の功力を消費。方向指定なし。' },
    { skillId: 'rising-raptor', isOgcd: false, hint: '疾風の型！竜頷正拳撃で弐の功力を消費。方向指定なし。' },
    { skillId: 'pouncing-coeurl', isOgcd: false, hint: '金剛の型！虎襲崩拳で参の功力を消費。【側面】から撃とう！' },
    // Loop 3 - 復習
    { skillId: 'dragon-kick', isOgcd: false, hint: '2周目！双竜脚で壱の功力を付与。テンポよく！' },
    { skillId: 'twin-snakes', isOgcd: false, hint: '双掌打で弐の功力×2を付与！' },
    { skillId: 'demolish', isOgcd: false, hint: '破砕拳は【背面】！参の功力×3を付与！' },
    { skillId: 'leaping-opo', isOgcd: false, hint: '猿舞連撃！壱の功力で威力アップ！' },
    { skillId: 'rising-raptor', isOgcd: false, hint: '竜頷正拳撃！弐の功力で威力アップ！' },
    { skillId: 'pouncing-coeurl', isOgcd: false, hint: '虎襲崩拳は【側面】！参の功力で威力アップ！完璧！' },
  ],
};

/**
 * 開幕回しコース
 * モンクの開幕回し（Opener）を学ぶ。
 * oGCDの挟み込み（ウィーブ）を含む実践的な回し。
 * 踏鳴で型の制約を解除し、同じチャクラ×3 → 真空波(陰の闘気)
 * 異なるチャクラ×3 → 鳳凰の舞(陽の闘気) → 夢幻闘舞へ
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
    // GCD1: 双竜脚 (壱の功力付与)
    { skillId: 'dragon-kick', isOgcd: false, hint: '開幕！双竜脚でスタート！方向指定なし。' },
    // Weave: 踏鳴 + 紅蓮の極意
    { skillId: 'perfect-balance', isOgcd: true, hint: '踏鳴！型の制約解除！' },
    { skillId: 'riddle-of-fire', isOgcd: true, hint: '紅蓮の極意！与ダメージ15%アップ！' },
    // GCD2: 猿舞連撃 (踏鳴中・同じチャクラ)
    { skillId: 'leaping-opo', isOgcd: false, hint: '踏鳴中！猿舞連撃！方向指定なし。' },
    // Weave: 桃園結義
    { skillId: 'brotherhood', isOgcd: true, hint: '桃園結義！PT全体の与ダメアップ！' },
    // GCD3: 双竜脚 (踏鳴中・同じチャクラ)
    { skillId: 'dragon-kick', isOgcd: false, hint: '踏鳴中！双竜脚！同じチャクラで揃える！' },
    // GCD4: 猿舞連撃 (踏鳴中・同じチャクラ×3 → 真空波へ)
    { skillId: 'leaping-opo', isOgcd: false, hint: '踏鳴中！猿舞連撃！同じチャクラ×3完成！' },
    // Weave: 真空波 (陰の闘気獲得)
    { skillId: 'elixir-burst', isOgcd: true, hint: '真空波！同チャクラ×3で発動！陰の闘気を獲得！' },
    // GCD5: 双掌打 (通常回し再開)
    { skillId: 'twin-snakes', isOgcd: false, hint: '双掌打！弐の功力を付与！方向指定なし。' },
    // Weave: 疾風の極意
    { skillId: 'riddle-of-wind', isOgcd: true, hint: '疾風の極意！AA速度アップ！' },
    // GCD6: 破砕拳 (背面)
    { skillId: 'demolish', isOgcd: false, hint: '破砕拳！【背面】から！参の功力×3を付与！' },
    // Weave: 乾坤闘気弾
    { skillId: 'fires-reply', isOgcd: true, hint: '乾坤闘気弾！紅蓮の極意バフ中に使う！' },
    // GCD7: 猿舞連撃
    { skillId: 'leaping-opo', isOgcd: false, hint: '猿舞連撃！壱の功力で威力アップ！' },
    // Weave: 2回目の踏鳴
    { skillId: 'perfect-balance', isOgcd: true, hint: '2回目の踏鳴！異なるチャクラで揃える！' },
    // GCD8: 双竜脚 (踏鳴中)
    { skillId: 'dragon-kick', isOgcd: false, hint: '踏鳴中！双竜脚！' },
    // GCD9: 猿舞連撃 (踏鳴中)
    { skillId: 'leaping-opo', isOgcd: false, hint: '踏鳴中！猿舞連撃！' },
    // GCD10: 双竜脚 (踏鳴中・異なるチャクラ×3)
    { skillId: 'dragon-kick', isOgcd: false, hint: '踏鳴中！双竜脚！異なるチャクラ×3完成！' },
    // Weave: 鳳凰の舞 (陽の闘気獲得)
    { skillId: 'rising-phoenix', isOgcd: true, hint: '鳳凰の舞！異なるチャクラ×3で発動！陽の闘気を獲得！' },
    // GCD11: 竜頷正拳撃
    { skillId: 'rising-raptor', isOgcd: false, hint: '竜頷正拳撃！弐の功力で威力アップ！' },
    // Weave: 陰陽闘気斬
    { skillId: 'the-forbidden-chakra', isOgcd: true, hint: '陰陽闘気斬！チャクラ消費！' },
    // GCD12: 虎襲崩拳 (側面)
    { skillId: 'pouncing-coeurl', isOgcd: false, hint: '虎襲崩拳！【側面】から！参の功力で威力アップ！' },
    // Weave: 絶空拳
    { skillId: 'winds-reply', isOgcd: true, hint: '絶空拳！疾風の極意バフ中に！開幕回し完了！' },
  ],
};

export const allCourses: Course[] = [basicRotationCourse, openerCourse];
