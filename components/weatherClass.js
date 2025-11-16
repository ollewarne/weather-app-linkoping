import { getWeatherFromCity } from "../services/meteo.js";
import { temperatureConverter, unitConverter } from "../utils/temperatureConverter.js";
// =====================================================
import { TimeDisplay } from "./clock/clock-Class.js"; 
import { startAutoUpdate } from "./auto-refresh.js";
// =====================================================

export class Weather {

    constructor(data) {
        this.city = data.city,
        this.temperature = data.temperature,
        this.weather = data.weather,
        this.icon = data.icon,
        this.time = data.time,
        this.date = data.date,
        this.timeZone = data.timezone,
        this.unit = '℃' //DEFAULT 

        this.createWeatherCard();

        //  KLOCK-DEL
        this.clock = new TimeDisplay(this.clockEl.id, 'Senast uppdaterad:');
        // skapar en egen klocka för DETTA kort och kopplar den till kortets clock-div
        // 'Senast uppdaterad:' är texten som ska stå före tiden

        this.intervalId = startAutoUpdate(this, 'updateWeatherCard', 10000);
        // startar en auto-uppdatering för hela kortet (väder + tid)
        // kör updateWeatherCard() direkt första gången
        // och kör den igen var 10:e sekund
        // sparar timer-ID i this.intervalId så vi kan stoppa den senare

        //  SLUT KLOCK-DEL

    }


    createWeatherCard() {
        this.card = document.createElement("div")
        this.card.classList.add("weather-card")
        this.title = document.createElement("h2");
        this.title.innerHTML = `${this.city} ${this.icon}`
        this.paragraph = document.createElement("p")
        this.paragraph.innerHTML = `<span class="temp">${this.temperature}</span><span class="unit">${this.unit}</span> <span class="description">${this.weather}</span>`
        this.card.appendChild(this.title);
        this.card.appendChild(this.paragraph);

        // =====================================================
        // plats för klocktext i kortet
        // =====================================================
        this.clockEl = document.createElement("div");
        this.clockEl.classList.add("updated-time");
        this.clockEl.id = `clock-${this.city}-${Date.now()}`;
        this.card.appendChild(this.clockEl);
        // =====================================================
    }

    async updateWeather() {
        const weatherData = await getWeatherFromCity(this.city);
        this.temperature = weatherData.temperature;
        this.weather = weatherData.weather;
        this.icon = weatherData.icon;
        this.time = weatherData.time;
        this.date = weatherData.date;
    }

    // updateWeatherCard() {
    //     this.updateWeather()
    //     this.createWeatherCard()
    // }
        async updateWeatherCard() {
        //  hämta NY väderdata
        await this.updateWeather();

        //  uppdatera text i kortet
        this.title.innerHTML = `${this.city} ${this.icon}`;

        const temp = this.card.querySelector(".temp");
        temp.textContent = this.temperature;

        const desc = this.card.querySelector(".description");
        desc.textContent = this.weather;

        const unit = this.card.querySelector(".unit");
        unit.textContent = this.unit;

        // =====================================================
        //  säger åt TimeDisplay att visa tid nu
        //    (TimeDisplay sköter Date + format)
        // =====================================================
        if (this.clock) {
            this.clock.show();
        }
        // =====================================================
    }

    changeTemperatureAndUnit() {

        this.temperature = temperatureConverter(this.temperature);
        this.unit = unitConverter(this.unit);

        let temp = this.card.querySelector(".temp");
        temp.textContent = this.temperature;

        let unit = this.card.querySelector(".unit");
        unit.textContent = this.unit;
    };

    addToWatchlist() {
        this.card.addEventListener('click', () => {
            this.removeCardFromWatchlist();
        })
    }

    removeCardFromWatchlist(event) {
        event.target.parentNode.removeChild(this.card)
        // =====================================================
        // här rensar/stänger vi av timern för det här kortet (om den finns)
        // så den inte fortsätter köras i bakgrunden
                if (this.intervalId) {
            clearInterval(this.intervalId);
        // =====================================================
        }
    }
}
