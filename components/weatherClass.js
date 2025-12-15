import { getTemperatureFromCoordinates } from "../services/meteo.js";

export class Weather {

    next = 0;
    isUpdating = false;

    constructor(data) {
        this.data = data;
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
        this.background = data.picture;

        let time = new Date(this.time);
        time.setMinutes(time.getMinutes() + Math.abs(time.getTimezoneOffset()));
        this.next = time.getTime() + this.interval * 1000;

        this.timer = setInterval(() => {
            const now = Date.now();

            if (now >= this.next && !this.isUpdating) {
                this.updateWeatherCard();
            }
        }, 100);

        this.createWeatherCard();

        this.changeBackground(this.background);
    }


    createWeatherCard() {
        this.card = document.createElement("div")
        this.card.id = this.cityId;
        this.card.classList.add("weather-card")

        this.title = document.createElement("h2");
        this.title.innerHTML = `${this.city}<span class="country-code">, ${this.country}</span>`

        this.paragraph = document.createElement("p")

        this.paragraph.append(
            this.createDomElement('i', this.icon),
            this.createDomElement('span', 'temp', this.temperature),
            this.createDomElement('span', 'unit', this.unit),
            this.createDomElement('span', 'description', this.weather)
        )

        this.card.appendChild(this.title);
        this.card.appendChild(this.paragraph);
    }

    createDomElement(type, elClass, content) {
        const element = document.createElement(type);
        element.classList.add(elClass);
        if (content) {
            element.textContent = content;
        }
        return element;
    }

    async updateWeather() {
        const weatherData = await getTemperatureFromCoordinates(
            this.lat,
            this.lon,
            this.city,
            this.cityId,
            this.country
        );

        if (weatherData) {
            this.temperature = weatherData.temperature;
            this.weather = weatherData.weather;
            this.icon = weatherData.icon;
            this.time = weatherData.time;
            this.interval = weatherData.interval;

            let time = new Date(this.time);
            time.setMinutes(time.getMinutes() + Math.abs(time.getTimezoneOffset()));
            this.next = time.getTime() + (this.interval * 1000);
        }
    }

    async updateWeatherCard() {
        if (this.isUpdating) return;   //  om något redan körs, gör inget

        this.isUpdating = true;        //  markera att vi uppdaterar nu
        try {
            await this.updateWeather();

            const temp = this.card.querySelector(".temp");
            temp.textContent = this.temperature;

            const icon = this.card.querySelector(".icon");
            const oldIcon = [...icon.classList].find(iconClass => iconClass !== "icon");
            if (oldIcon) icon.classList.replace(oldIcon, this.icon);

            const desc = this.card.querySelector(".description");
            desc.textContent = this.weather;

            const unit = this.card.querySelector(".unit");
            unit.textContent = this.unit;

        } finally {
            this.isUpdating = false;     //  klart, nu får nästa köras
        }
    }

    addToWatchlist() {
        this.card.addEventListener('click', (event) => {
            this.removeCardFromWatchlist(event);
        })

        let closeIcon = document.createElement('i');
        closeIcon.classList.add('ri-close-large-line');

        this.card.appendChild(closeIcon);
    }


    removeCardFromWatchlist() {
        this.card.remove();
        // stoppa schemat när kortet tas bort
        if (this.timer) {
            clearInterval(this.timer);
        }
    };

    changeBackground(pictureCode) {

        if (window.matchMedia('(max-width: 640px)').matches) {
            document.body.style.backgroundImage = `url("./images/background_images/${pictureCode}_900.webp")`

        } else if (window.matchMedia('(max-width: 960px)').matches) {
            document.body.style.backgroundImage = `url("./images/background_images/${pictureCode}_2200.webp")`

        } else {
            document.body.style.backgroundImage = `url("./images/background_images/${pictureCode}.jpg")`
        };
    };
};
