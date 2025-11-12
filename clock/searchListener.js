import { showClock } from './clock-init.js';
import { startClockRefresh } from './clock-refresh.js';

let stopClock = null;

export function initSearchListener(buttonId = 'search-button') {
  const btn = document.getElementById(buttonId);
  if (!btn) return console.warn('Kunde inte hitta sökknappen.');

  btn.addEventListener('click', () => {
    console.log('Sökknappen trycktes på!');
    showClock();                

    if (stopClock) stopClock(); 
    stopClock = startClockRefresh(); 
  });
}
