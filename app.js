import { getWeatherFromCity } from "./services/meteo.js";
import { TemperatureConverter } from './temperature.js';

const searchField = document.getElementById('search-field');
const searchBtn = document.getElementById('search-button');

const displayText = document.getElementById('display-text');

// LYSSNARE Searchfield = key down & click
searchField.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    let searchValue = searchField.value;
    searchField.value = '';

    let weatherData = await getWeatherFromCity(searchValue)

    displayText.innerHTML = returnDisplayText(weatherData);
    addBoxData(weatherData);
  }

});

searchBtn.addEventListener('click', async (event) => {
  let searchValue = searchField.value;
  searchField.value = '';

  let weatherData = await getWeatherFromCity(searchValue)
  displayText.innerHTML = returnDisplayText(weatherData);
  addBoxData(weatherData);
});


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


// Function to modify Boxes
function addBoxData(data) {
  // FIRST box
  const tempEl = document.getElementById('temp');
  const unitType = document.getElementById('unit');
  const unitDescription = document.getElementById('toggle-scale');

  let unit = '<i class="ri-celsius-line"></i>';
  let shownTemp = data.temperature; // bas: Celsius
  unitDescription.textContent = 'Celsius';

  if (checkbox.checked) {
    unit = '<i class="ri-fahrenheit-line"></i>';
    unitDescription.textContent = 'Fahrenheit';
    shownTemp = TemperatureConverter.cToF(data.temperature); // C → F
  }

  tempEl.textContent = shownTemp;
  unitType.innerHTML = unit;

  // MIDDLE box
  const weather = document.getElementById('weather');
  weather.textContent = data.weather;

  // LAST box
  const time = document.getElementById('time');
  time.textContent = data.time;

  const location = document.getElementById('location');
  location.textContent = data.city;
}




// Toggle temp
const checkbox = document.getElementById("unitSwitch"); // Hämtar checkbox-elementet från HTML med id "unitSwitch"

/*



checkbox.addEventListener('change', () => {
  const displayTemp = document.getElementById('display-temp');
  const displayUnit = document.getElementById('display-unit');

  displayTemp.textContent = convertTemperature(tempC);
  displayUnit.innerHTML = '<i class="ri-fahrenheit-line"></i>';
} )


*/









// TEMPERATURE UNIT CONVERT (c/f)


// function convertTemperature(temperature) {
//   // Skapar en funktion som konverterar temperatur mellan Celsius och Fahrenheit

//   let fahrenheit = checkbox.checked; // Kontrollerar om checkboxen är markerad; true om markerad, false annars
//   if (!fahrenheit) {
//     // Om checkboxen är markerad

//     return Math.round(((temperature - 32) * 5 / 9) * 10) / 10; // Konvertera från Fahrenheit till Celsius och runda till en decimal // Formeln: (F - 32) * 5/9
//   } else {
//     // Om checkboxen inte är markerad (inputen är i Celsius)
//     return Math.round((temperature * (9 / 5) + 32) * 10) / 10; // Konvertera från Celsius till Fahrenheit och runda till en decimal // Formeln: C * 9/5 + 32
//   }
// }

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
