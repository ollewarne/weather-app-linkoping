export class TimeDisplay {
  constructor({
    elementId = 'clock',          
    timeZone  = 'Europe/Stockholm',
    label     = 'The time is',    
  } = {}) {
    this.elementId = elementId;   
    this.timeZone  = timeZone;     
    this.label     = label;        
    this.time      = null;        
    this.timerId   = null;        
  }
}
