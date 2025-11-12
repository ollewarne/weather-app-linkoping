import { showClock } from './clock-init.js';
import { startClockRefresh } from './clock-refresh.js';

let stopClock = null; // håller stop-funktionen mellan klick

export function initSearchListener(buttonId = 'search-button') {
  const btn = document.getElementById(buttonId);
  if (!btn) return console.warn('Kunde inte hitta sökknappen.');

  btn.addEventListener('click', () => {
    console.log('Sökknappen trycktes på!');
    showClock();                 // bygg/visa klockan

    if (stopClock) stopClock();  // stoppa ev. tidigare intervall
    stopClock = startClockRefresh(); // starta uppdatering var 10s
  });
}
