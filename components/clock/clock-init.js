import { TimeDisplay } from './clock-klass.js';

export function showClock() {
  const clock = new TimeDisplay({ elementId: 'clock' });
  const el = document.getElementById(clock.elementId);
  if (!el) return;

  const now = new Date().toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  clock.time = now;
  el.textContent = `${clock.label} ${now}`;
  // console.log('The clock is displayed:', now);
}


