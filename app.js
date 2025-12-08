import { getWeatherFromCity, getTemperatureFromCoordinates } from "./services/meteo.js";
import { Weather } from "./components/weatherClass.js";
import { initSearch } from "./components/searchEvent.js"


export class App {
  constructor() {
    this.searchField = document.getElementById('search-field');
    this.searchBtn = document.getElementById('search-button');
    initSearch(this);
    this.weatherContainer = document.getElementById("weather-container")
    this.add2watchlist = document.getElementById('add-2-watchlist');
    this.watchlist = document.getElementById('watchlist');

    this.storedWeather = {};
    this.storageKey = "savedCities";

    this.add2watchlist.addEventListener('click', () => {
      this.saveCityToWatchlist()
    })

    this.watchlist.addEventListener('click', (event) => {
      console.log(this.storedWeather)
      if (this.storedWeather[event.target.id]) {

        delete this.storedWeather[event.target.id];
        localStorage.setItem(this.storageKey, JSON.stringify(this.storedWeather));
      };
    })

    if (localStorage.getItem(this.storageKey)) this.recreateSavedWeatherCards();

  } // this is the end... my only friend, the end.

  async recreateSavedWeatherCards() {
      const localStorageData = JSON.parse(localStorage.getItem(this.storageKey));
      for (let item in localStorageData) {
        await this.getWeather(localStorageData[item].city);
        this.saveCityToWatchlist();
      }
  }

  async getWeather(searchInput) {
    let weatherData = await getWeatherFromCity(searchInput)
    this.currentWeatherSearch = new Weather(weatherData);
    if (this.storedWeather[this.currentWeatherSearch.cityId]) {
      this.storedWeather[this.currentWeatherSearch.cityId].removeCardFromWatchlist();
      delete this.storedWeather[this.currentWeatherSearch.cityId];
      this.saveCityToWatchlist();
      return;
    }
    this.weatherContainer.parentNode.classList.remove('no-show');
    this.placeDomElement(this.currentWeatherSearch.card)
  }

  placeDomElement(element) {
    this.weatherContainer.replaceChildren("")
    this.weatherContainer.appendChild(element)
  }

  saveCityToWatchlist() {
    // limit the amount of saved cities to three and delete the first one added when adding a new one
    if (Object.keys(this.storedWeather).length === 3) {
      const firstItem = Object.keys(this.storedWeather)[0];
      this.storedWeather[firstItem].removeCardFromWatchlist();
      delete this.storedWeather[firstItem];
    }

    this.storedWeather[this.currentWeatherSearch.cityId] = this.currentWeatherSearch;

    this.watchlist.appendChild(this.currentWeatherSearch.card);

    this.currentWeatherSearch.addToWatchlist();

    localStorage.setItem(this.storageKey, JSON.stringify(this.storedWeather));
  }
}
