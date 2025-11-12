export class Kl {
  constructor({
    elementId = 'clock',          
    timeZone  = 'Europe/Stockholm',
    label     = 'Klockan är',    
  } = {}) {
    this.elementId = elementId;   
    this.timeZone  = timeZone;     
    this.label     = label;        
    this.time      = null;        
    this.timerId   = null;        
  }
}
