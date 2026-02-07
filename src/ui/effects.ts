/**
 * Street Fighter-like visual effects
 */

// Floating damage number
export function showDamageNumber(container: HTMLElement, value: number | string, color: string, x: number, y: number) {
  const el = document.createElement('div');
  el.className = 'damage-number';
  el.textContent = String(value);
  el.style.color = color;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  container.appendChild(el);
  setTimeout(() => el.remove(), 800);
}

// Hit spark effect
export function showHitSpark(container: HTMLElement, x: number, y: number, type: 'perfect' | 'great' | 'good' | 'miss') {
  const el = document.createElement('div');
  el.className = `hit-spark hit-spark-${type}`;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  const labels: Record<string, string> = {
    perfect: 'PERFECT!!',
    great: 'GREAT!',
    good: 'GOOD',
    miss: 'MISS...',
  };
  el.textContent = labels[type];
  container.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

// Combo counter pop
export function animateCombo(comboEl: HTMLElement) {
  comboEl.classList.remove('combo-pop');
  // Force reflow
  void comboEl.offsetWidth;
  comboEl.classList.add('combo-pop');
}

// Screen shake
export function screenShake(container: HTMLElement, intensity: number = 5) {
  container.classList.add('screen-shake');
  container.style.setProperty('--shake-intensity', `${intensity}px`);
  setTimeout(() => container.classList.remove('screen-shake'), 300);
}

// Flash effect on the enemy
export function flashEnemy(enemyEl: HTMLElement, color: string) {
  enemyEl.style.boxShadow = `0 0 30px ${color}, 0 0 60px ${color}`;
  setTimeout(() => {
    enemyEl.style.boxShadow = '';
  }, 200);
}

// Skill button press animation
export function animateButton(btn: HTMLElement) {
  btn.classList.add('btn-pressed');
  setTimeout(() => btn.classList.remove('btn-pressed'), 150);
}
