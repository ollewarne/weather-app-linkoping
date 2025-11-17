import { TimeDisplay } from "./clock/clock-Class.js";

const globalClock = new TimeDisplay("global-update-time", "Senast uppdaterad:");  

export function startAutoUpdate(target, intervalMs = 900000) {

  async function tick() {

    if (typeof target.updateWeatherCard === "function") {
      await target.updateWeatherCard();
    }

    globalClock.show();
  }

  tick();                            

  const id = setInterval(tick, intervalMs);  

  return id;                         
}
