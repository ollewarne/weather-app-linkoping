import { getWeatherFromCity } from "./services/meteo.js";
import { Weather } from "./components/weatherClass.js";
import { initSearchListener } from './components/clock/searchListener.js';

initSearchListener(); // aktiverar lyssnaren

const searchField = document.getElementById('search-field');
const searchBtn = document.getElementById('search-button');

const displayText = document.getElementById('display-text');

const weatherArray = [];

// LYSSNARE Searchfield = key down & click
let theWeather


searchField.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    let searchValue = searchField.value;
    searchField.value = '';

    let weatherData = await getWeatherFromCity(searchValue)
    theWeather = new Weather(weatherData)

    weatherArray.push({[theWeather.city]: theWeather});
    console.log(weatherArray)
    theWeather.createWeatherCard()
  

    //hidden text for screen readers
    displayText.innerHTML = returnDisplayText(weatherData);
  }

});

//searchBtn.addEventListener('click', async (event) => {
//  let searchValue = searchField.value;
//  searchField.value = '';
//
//  let weatherData = await getWeatherFromCity(searchValue)
//  displayText.innerHTML = returnDisplayText(weatherData);
//  addBoxData(weatherData);
//});



// // Toggle temp
const checkbox = document.getElementById("unitSwitch"); // Hämtar checkbox-elementet från HTML med id "unitSwitch"

checkbox.addEventListener('change', () => {
  theWeather.changeTemperatureAndUnit();
})



// ------------- ADD 2 WATCHLIST

const add2watchlist = document.getElementById('add-2-watchlist');

add2watchlist.addEventListener('click', () => {
  theWeather.addToWatchlist()
})


