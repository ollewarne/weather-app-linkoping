import { getTemperatureFromCoordinates } from "../services/meteo.js";

export class Weather {

    next = 0;
    //delzar
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
            }
        }, 100);

        this.createWeatherCard();

        this.changeBackground(this.background);
    }


    // REPETATIV, REWRITE???
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


    removeCardFromWatchlist(event) {
        this.card.remove();
        // stoppa schemat när kortet tas bort
        if (this.timer) {
            clearInterval(this.timer);
        }
    };

    changeBackground(pictureCode) {
        // document.body.style.backgroundImage = `url("./images/background_images/${pictureCode}.jpg")`

        document.body.style.backgroundImage = `
            image-set(
                url("./images/background_images/${pictureCode}_800.webp") type("image/webp") 1x,
                url("./images/background_images/${pictureCode}_1400.webp") type("image/webp") 2x,
                url("./images/background_images/${pictureCode}_2000.webp") type("image/webp") 3x,
                url("./images/background_images/${pictureCode}.jpeg") type("image/jpeg") 1x
            )
        `;

    };
};
