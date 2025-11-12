import { Kl } from './clock-klass.js';

export function showClock() {
  const clock = new Kl({ elementId: 'clock' });
  const el = document.getElementById(clock.elementId);
  if (!el) return;

  const now = new Date().toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  clock.time = now;
  el.textContent = `${clock.label} ${now}`;
  console.log('Klockan visas:', now);
}


