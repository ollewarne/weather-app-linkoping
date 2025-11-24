import { getWeatherFromCity, getTemperatureFromCoordinates } from "./services/meteo.js";
import { Weather } from "./components/weatherClass.js";

export class App {
  constructor() {
    this.checkbox = document.getElementById("unitSwitch"); // Hämtar checkbox-elementet från HTML med id "unitSwitch"
    this.searchField = document.getElementById('search-field');
    this.searchBtn = document.getElementById('search-button');
    this.weatherContainer = document.getElementById("weather-container")
    this.add2watchlist = document.getElementById('add-2-watchlist');
    this.watchlist = document.getElementById('watchlist');

    //TODO: check to see if the checkbox is checked for temperature conversion and change the url for meteo depending on it.
    this.storedWeather = {};
    this.storageKey = "savedCities";
    this.searchField.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        this.searchEvent()
      }
    })

    this.searchBtn.addEventListener('click', this.searchEvent.bind(this))

    this.add2watchlist.addEventListener('click', () => {
      this.saveCityToWatchlist()
    })

    this.watchlist.addEventListener('click', (event) => {
      if (this.storedWeather[event.target.id]) {
        delete this.storedWeather[event.target.id];
      };
    })

    if (localStorage.getItem(this.storageKey)) {
      //TODO: if there is something in local storage we should recreate it as a class again so we can update the weather
      console.log(JSON.parse(localStorage.getItem(this.storageKey)))
    }

  } // this is the end... my only friend, the end.

  async searchEvent() {
      try {
        if (this.searchField.value.trim() === "") {
          this.searchField.placeholder = "please enter a city"
          return;
        } else {
          await this.getWeather(this.searchField.value);
          this.searchField.value = "";
        }
      } catch (err) {
          alert(`Error: Could not find a city with the name ${this.searchField.value}`)
      }
  }

  async getWeather(searchInput) {
    let weatherData = await getWeatherFromCity(searchInput)
    this.currentWeatherSearch = new Weather(weatherData);
    this.placeDomElement(this.currentWeatherSearch.card)
  }

  placeDomElement(element) {
    this.weatherContainer.replaceChildren("")
    this.weatherContainer.appendChild(element)
  }

  saveCityToWatchlist() {
    // limit the amount of saved cities
    if (Object.keys(this.storedWeather).length === 3) {
      const firstItem = Object.keys(this.storedWeather)[0];
      this.storedWeather[firstItem].card.remove();
      delete this.storedWeather[firstItem];
    }

    this.storedWeather[this.currentWeatherSearch.cityId] = this.currentWeatherSearch;

    this.watchlist.appendChild(this.currentWeatherSearch.card);

    this.currentWeatherSearch.addToWatchlist();


    localStorage.setItem(this.storageKey, JSON.stringify(this.storedWeather));
    console.log(localStorage.getItem(this.storageKey));
  }
}

//TODO: implement the temperature-change button

// // Toggle temp
//const checkbox = document.getElementById("unitSwitch"); // Hämtar checkbox-elementet från HTML med id "unitSwitch"
//
//checkbox.addEventListener('change', () => {
//  theWeather.changeTemperatureAndUnit();
//})
