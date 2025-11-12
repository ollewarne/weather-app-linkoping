export function startClockRefresh({
  elementId = 'clock',
  label = 'Klockan är',
  intervalMs = 10000,
} = {}) {
  const el = document.getElementById(elementId);
  if (!el) return () => {};

  function write() {
    const now = new Date().toLocaleTimeString('sv-SE', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    el.textContent = `${label} ${now}`;
  }

  write(); 
  const id = setInterval(write, intervalMs);
  return () => clearInterval(id); 
}
