import { getWeatherFromCity } from "./services/meteo.js";
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

    this.searchField.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
          this.getWeather(this.searchField.value);
          this.searchField.value = "";
        }

    })

    this.searchBtn.addEventListener('click', async () => {
        this.getWeather(this.searchField.value);
        this.searchField.value = "";
    })
    this.add2watchlist.addEventListener('click', () => {
        this.saveCityToWatchlist()
    })

    this.watchlist.addEventListener('click', (event) => {
      if(this.storedWeather[event.target.id]){
        delete this.storedWeather[event.target.id];
      };
    })

  } // this is the end... my only friend, the end.

  async getWeather(searchInput) {
    let weatherData = await getWeatherFromCity(searchInput)
    this.currentWeatherSearch = new Weather(weatherData);
    this.placeDomElement(this.currentWeatherSearch.card)
  }

  //TODO: prevent that you can place two dom elements in weather container. The first should be replaced by the new one.
  placeDomElement(element) {
    this.weatherContainer.appendChild(element)
  }

  saveCityToWatchlist() {

    this.storedWeather[this.currentWeatherSearch.cityId] = this.currentWeatherSearch;

    // this.storedWeather.push({[this.currentWeatherSearch.cityId]: this.currentWeatherSearch});
    // this.weatherContainer.removeChild(this.currentWeatherSearch.card);
    this.watchlist.appendChild(this.currentWeatherSearch.card);

    this.currentWeatherSearch.addToWatchlist();

    // this.currentWeatherSearch.card.addEventListener('click', (event) => {
    //   //removjaself! Bombaclat!
    //   this.currentWeatherSearch.removeCardFromWatchlist(event);

    // let index = this.storedWeather.indexOf(this.currentWeatherSearch.city)
    // this.storedWeather.splice(index, 1);
    // console.log(this.storedWeather);
    // })

  }
}

//TODO: implement the temperature-change button

// // Toggle temp
//const checkbox = document.getElementById("unitSwitch"); // Hämtar checkbox-elementet från HTML med id "unitSwitch"
//
//checkbox.addEventListener('change', () => {
//  theWeather.changeTemperatureAndUnit();
//})
