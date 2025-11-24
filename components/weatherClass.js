import { getWeatherFromCity, getTemperatureFromCoordinates } from "../services/meteo.js";
import { temperatureConverter, unitConverter } from "../utils/temperatureConverter.js";

export class Weather {

    next = 0;
    count = 0;
    //delzar
    isUpdating = false;

    constructor(data) {
        this.lat = data.lat;
        this.lon = data.lon;
        this.cityId = data.cityId;
        this.city = data.city;
        this.country = data.country;
        this.temperature = data.temperature;
        this.weather = data.weather;
        this.icon = data.icon;
        this.time = data.time;
        this.interval = data.interval;
        this.timeZone = data.timezone;
        this.unit = data.unit;

        let time = new Date(this.time);
        time.setMinutes(time.getMinutes() + Math.abs(time.getTimezoneOffset()));
        this.next = time.getTime() + this.interval * 1000;

        const delta = this.next - Date.now();
        const nextDate = new Date(this.next);
        console.log(
            `[${this.city}] Nästa auto uppdatering kl ${nextDate.toLocaleTimeString()} ` +
            `(om ${Math.round(delta / 1000)} sekunder)`
        );

        this.timer = setInterval(() => {
            const now = Date.now();

            if (now >= this.next && !this.isUpdating) {
                this.updateWeatherCard();
                this.count++;
            }
        }, 1000);

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
        this.paragraph.innerHTML = `<span class="icon">${this.icon}</span> <span class="temp">${this.temperature}</span><span class="unit">${this.unit}</span> <span class="description">${this.weather}</span><span class="updated-at">LOCAL TIME?</span>`

        this.card.appendChild(this.title);
        this.card.appendChild(this.paragraph);

        this.clockEl = document.createElement("div");
        this.clockEl.classList.add("updated-time");
        this.clockEl.id = `clock-${this.city}-${Date.now()}`;
        this.card.appendChild(this.clockEl);
    }


    async updateWeather() {
        console.log("update weather", this.city)
        const weatherData = await getTemperatureFromCoordinates(this.lat, this.lon, this.city, this.cityId, this.country);
        if (weatherData) {
            this.temperature = weatherData.temperature;
            this.weather = weatherData.weather;
            this.icon = weatherData.icon;
            this.time = weatherData.time;
            this.interval = weatherData.interval;

            let time = new Date(this.time);
            time.setMinutes(time.getMinutes() + Math.abs(time.getTimezoneOffset()));
            this.next = time.getTime() + (this.interval * 1000);

            let now = new Date().getTime();
            let delta = this.next - now;

	    const nextDate = new Date(this.next);
            console.log(
            `[${this.city}] Nästa auto uppdatering kl ${nextDate.toLocaleTimeString()} ` +
            `(om ${Math.round(delta / 1000)} sekunder)`
            );
        }
    }

    async updateWeatherCard() {
        console.log("update weather card");

        if (this.isUpdating) return;   //  om något redan körs, gör inget

        this.isUpdating = true;        //  markera att vi uppdaterar nu
        try {
            await this.updateWeather();

            const temp = this.card.querySelector(".temp");
            temp.textContent = this.temperature;

            const icon = this.card.querySelector(".icon");
            icon.innerHTML = this.icon;

            const desc = this.card.querySelector(".description");
            desc.textContent = this.weather;

            const unit = this.card.querySelector(".unit");
            unit.textContent = this.unit;

            if (this.count > 1) {
                unit.textContent = this.unit + " *";
            }
        } finally {
            this.isUpdating = false;     //  klart, nu får nästa köras
        }
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

        // stoppa schemat när kortet tas bort
        if (this.timer) {
            clearInterval(this.timer);
        }
    };
};
