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
        const watchlist = document.getElementById("watch-list")

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
