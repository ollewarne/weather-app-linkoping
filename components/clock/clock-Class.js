export class TimeDisplay {
  constructor(elementId, label = '') {
    this.elementId = elementId;

    this.label = label;
  }

  show() {
    const el = document.getElementById(this.elementId);

    if (!el) return;


    const now = new Date().toLocaleTimeString('sv-SE', {
      hour:   '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    el.textContent = this.label
      ? `${this.label} ${now}`
      : now;

  }
}
