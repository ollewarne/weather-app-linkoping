import { showClock } from './clock-init.js';
import { startClockRefresh } from './clock-refresh.js';

let stopClock = null;

export function initSearchListener(buttonId = 'search-button') {
  const btn = document.getElementById(buttonId);
  if (!btn) return console.warn('Could not find the search button.');

  btn.addEventListener('click', () => {
    // console.log('Search button was clicked!');
    showClock();                

    if (stopClock) stopClock(); 
    stopClock = startClockRefresh(); 
  });
}
