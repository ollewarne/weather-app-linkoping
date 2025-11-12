import { getWeatherFromCity } from "../services/meteo.js";
import { TemperatureConverter } from "../temperature.js";

export class Weather {

    constructor(data) {
        this.city = data.city,
        this.temperature = data.temperature,
        this.weather = data.weather,
        this.icon = data.icon,
        this.time = data.time,
        this.date = data.date,
        this.timeZone = data.timezone,
        this.unitC = '<i class="ri-celsius-line"></i>',
        this.unitF = '<i class="ri-fahrenheit-line"></i>'

        this.weatherContainer = document.getElementById("weather-container")
        this.watchlist = document.getElementById("watchlist")

    }

    createWeatherCard() {
        this.card = document.createElement("div")
        this.card.classList.add("weather-card")
        this.title = document.createElement("h2");
        this.title.innerHTML = `${this.city} ${this.icon}`
        this.paragraph = document.createElement("p")
        this.paragraph.innerHTML = `<span class="temp">${this.temperature}</span><span class="unit">${this.unitC}</span> <span class="description">${this.weather}</span>`
        this.card.appendChild(this.title);
        this.card.appendChild(this.paragraph);
        this.weatherContainer.replaceChildren("")
        this.weatherContainer.appendChild(this.card)
    }

    async updateWeather() {
        const weatherData = await getWeatherFromCity(this.city);
        this.temperature = weatherData.temperature;
        this.weather = weatherData.weather;
        this.icon = weatherData.icon;
        this.time = weatherData.time;
        this.date = weatherData.date;
    }

    updateWeatherCard() {
        this.updateWeather()
        this.createWeatherCard()
    }

    changeUnit(func, temperature, changeToUnit) {
        let temp = this.card.querySelector(".temp");
        temp.textContent = func(temperature);
        let unit = this.card.querySelector(".unit");
        console.log(changeToUnit)
        if (changeToUnit === "f") {
            unit.innerHTML = this.unitF
        } else {
            unit.innerHTML = this.unitC
        }
    }

    addToWatchlist() {
        this.weatherContainer.removeChild(this.card)
        this.watchlist.appendChild(this.card)

        this.card.addEventListener('click', () => {
            this.removeCardFromWatchlist();
        })
    }

    removeCardFromWatchlist() {
        this.watchlist.removeChild(this.card)
    }
}
