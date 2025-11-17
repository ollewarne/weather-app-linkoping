import { getWeatherFromCity } from "../services/meteo.js";
import { temperatureConverter, unitConverter } from "../utils/temperatureConverter.js";
import { TimeDisplay } from "./clock/clock-Class.js"; 
import { startAutoUpdate } from "./auto-refresh.js";

export class Weather {

    constructor(data) {
        this.cityId = data.id,
        this.city = data.city,
        this.country = data.country,
        this.temperature = data.temperature,
        this.weather = data.weather,
        this.icon = data.icon,
        this.time = data.time,
        this.date = data.date,
        this.timeZone = data.timezone,
        this.unit = '℃' //DEFAULT 


        startAutoUpdate(this, 10000); 
        this.createWeatherCard();

    }


    createWeatherCard() {
        this.card = document.createElement("div")
        this.card.id = this.cityId;
        this.card.classList.add("weather-card")

        this.title = document.createElement("h2");
        this.title.innerHTML = `${this.city}, ${this.country}`
        this.paragraph = document.createElement("p")
        //TODO: make this paragraph less horrible
        this.paragraph.innerHTML = `<span class="icon">${this.icon}</span> <span class="temp">${this.temperature}</span><span class="unit">${this.unit}</span> <span class="description">${this.weather}</span><span class="local-time-label">LOCAL TIME?</span>`
        this.card.appendChild(this.title);
        this.card.appendChild(this.paragraph);

        this.clockEl = document.createElement("div");
        this.clockEl.classList.add("updated-time");
        this.clockEl.id = `clock-${this.city}-${Date.now()}`;
        this.card.appendChild(this.clockEl);
    }

    async updateWeather() {
        const weatherData = await getWeatherFromCity(this.city);
        this.temperature = weatherData.temperature;
        this.weather = weatherData.weather;
        this.icon = weatherData.icon;
        this.time = weatherData.time;
        this.date = weatherData.date;
    }

        async updateWeatherCard() {
        await this.updateWeather();

        this.title.innerHTML = `${this.city}, ${this.country}`

        const temp = this.card.querySelector(".temp");
        temp.textContent = this.temperature;

        const desc = this.card.querySelector(".description");
        desc.textContent = this.weather;

        const unit = this.card.querySelector(".unit");
        unit.textContent = this.unit;

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
        this.card.addEventListener('click', (event) => {
            this.removeCardFromWatchlist(event);
        })

        let closeIcon = document.createElement('i');
        closeIcon.classList.add('ri-close-large-line');

        this.card.appendChild(closeIcon);
    }

    removeCardFromWatchlist(event) {
        document.getElementById(event.target.id).remove();
    };

};
