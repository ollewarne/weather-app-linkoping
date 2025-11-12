// kl.js
export class Kl {
  constructor({
    elementId = 'clock',           // vart klockan ska visas
    timeZone  = 'Europe/Stockholm',// svensk tid
    label     = 'Klockan är',      // text före tiden
  } = {}) {
    this.elementId = elementId;    // ID på DOM-elementet
    this.timeZone  = timeZone;     // tidszon
    this.label     = label;        // rubrik/etikett
    this.time      = null;         // aktuell tid (värde lagras här)
    this.timerId   = null;         // intervallets id (lagras här)
  }
}
