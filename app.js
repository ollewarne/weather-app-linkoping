import { getWeatherFromCity } from "./services/meteo.js";
import { TemperatureConverter } from './utils/temperature.js';
import { Weather } from "./compnents/weatherClass.js";
import { initSearchListener } from '.components/clock/searchListener.js';

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
    theWeather.changeUnit(TemperatureConverter.cToF, theWeather.temperature, "f")

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


let tempC 
let tempF

// Function to modify Display-text
function returnDisplayText(data) {
  let unit = '<i class="ri-celsius-line"></i>';
  let temp = data.temperature;
  tempC = temp;

  if (checkbox.checked) {
    unit = '<i class="ri-fahrenheit-line"></i>';
    temp = TemperatureConverter.cToF(data.temperature);
    tempF = temp;
  }


  return `<p>Idag klockan ${data.time} i ${data.city} är det ${data.weather} med en temperatur på <span id="display-temp">${temp}</span> <span id="display-unit">${unit}</span> grader.</p>`
}

// Toggle temp
const checkbox = document.getElementById("unitSwitch"); // Hämtar checkbox-elementet från HTML med id "unitSwitch"


// Växla C ↔ F när knappen byts
checkbox.addEventListener('change', () => {
  if (typeof tempC !== 'number') return; // inget värde ännu

  const showF  = checkbox.checked;                   // true = F
  const newVal = showF
  ? TemperatureConverter.cToF(tempC)  // C → F
  : tempC;                            // C

  // Löptext
  const displayTemp = document.getElementById('display-temp');
  const displayUnit = document.getElementById('display-unit');
  displayTemp.textContent = newVal;
  displayUnit.innerHTML = showF
    ? '<i class="ri-fahrenheit-line"></i>'
    : '<i class="ri-celsius-line"></i>';

  // Första boxen
  const boxTemp  = document.getElementById('temp');
  const unitType = document.getElementById('unit');
  const unitDesc = document.getElementById('toggle-scale');
  boxTemp.textContent = newVal;
  unitType.innerHTML  = showF
    ? '<i class="ri-fahrenheit-line"></i>'
    : '<i class="ri-celsius-line"></i>';
  unitDesc.textContent = showF ? 'Fahrenheit' : 'Celsius';

  console.log(`Växlat till ${showF ? 'Fahrenheit' : 'Celsius'}: ${newVal}`);
});

// ------------- ADD 2 WATCHLIST

const add2watchlist = document.getElementById('add-2-watchlist');

add2watchlist.addEventListener('click', () => {
  theWeather.addToWatchlist()
})


