const mockWeather = require(mock_weather.js);

const apiKey = "DIN_API_KEY_HÄR";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (city === "") return (result.textContent = "Skriv in en stad!");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=sv`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Staden hittades inte");
    const data = await res.json();

    result.innerHTML = `
      <h2>${data.name}</h2>
      <p>🌡️ ${data.main.temp} °C</p>
    
      <p>☁️ ${data.weather[0].description}</p>
    `;
  } catch (err) {
    result.textContent = err.message;
  }
});

const checkbox = document.getElementById("unitSwitch"); // Hämtar checkbox-elementet från HTML med id "unitSwitch"
function convertTemperature(temperature) {
  // Skapar en funktion som konverterar temperatur mellan Celsius och Fahrenheit

  let fahrenheit = checkbox.checked; // Kontrollerar om checkboxen är markerad; true om markerad, false annars
  if (fahrenheit) {
    // Om checkboxen är markerad

    return Math.round((((temperature - 32) * 5) / 9) * 10) / 10; // Konvertera från Fahrenheit till Celsius och runda till en decimal // Formeln: (F - 32) * 5/9
  } else {
    // Om checkboxen inte är markerad (inputen är i Celsius)
    return Math.round(((temperature * 9) / 5 + 32) * 10) / 10; // Konvertera från Celsius till Fahrenheit och runda till en decimal // Formeln: C * 9/5 + 32
  }
}