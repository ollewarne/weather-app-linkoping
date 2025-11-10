import { getWeatherFromCity } from "../services/meteo.js";
import { getWeatherIcon } from "./getWeatherIcon.js";

export class Weather {

    constructor(data) {
        this.city = data.city,
        this.temperature = data.temperature,
        this.weather = data.weather,
        this.icon = getWeatherIcon(data.weatherCode),
        this.time = data.time,
        this.date = data.date,
        this.timeZone = data.timezone
    }

    createWeatherCard() {
        const weatherContainer = document.getElementById("weather-container")
        let card = document.createElement("div")
        card.classList.add("weather-card")
        card.innerHTML = `<h2>${this.city} ${this.icon}</h2><p><span>${this.temperature}</span><span>${this.weather}</span></p>`
        weatherContainer.replaceChildren("")
        weatherContainer.appendChild(card)
    }

    async updateWeather() {
        const weatherData = await getWeatherFromCity(this.city);
        this.temperature = weatherData.temperature
        this.weather = weatherData.weather
        this.time = weatherData.time
        this.date = weatherData.date
    }

    updateWeatherCard() {
        
    }

    addToWatchlist() {

    }
}
