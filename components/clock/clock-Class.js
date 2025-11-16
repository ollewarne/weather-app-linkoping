export class TimeDisplay {
  constructor(elementId, label = '') {
    this.elementId = elementId;
    // sparar vilket HTML-element klockan ska skriva till

    this.label = label;
    // sparar en eventuell text som ska stå före tiden, t.ex. "Senast uppdaterad:"
  }

  // Visar aktuell tid i elementet
  show() {
    const el = document.getElementById(this.elementId);
    // hämtar HTML-elementet där tiden ska visas

    if (!el) return;
    // om elementet inte finns → avsluta funktionen

    const now = new Date().toLocaleTimeString('sv-SE', {
      hour:   '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    // skapar en sträng med nuvarande tid (svensk format)

    el.textContent = this.label
      ? `${this.label} ${now}`
      : now;
    // skriver ut:
    // - "label + tid" OM label finns
    // - annars bara själva tiden
  }
}
