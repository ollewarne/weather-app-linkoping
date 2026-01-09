import { setupSuggestions } from "./searchSuggestions.js";

async function searchCities(query) {
  const url =
    `https://geocoding-api.open-meteo.com/v1/search` +
    `?name=${encodeURIComponent(query)}&count=20&language=sv&format=json`;

  const response = await fetch(url);
  if (!response.ok) return [];

  const data = await response.json();
  if (!data.results) return [];

  const results = data.results.map((item) => ({
    name: item.name,
    country: item.country,
    countryCode: item.country_code,
    full: `${item.name}, ${item.country}`,
  }));

  results.sort((a, b) => {
    const aIsSE = a.countryCode === "SE" ? 0 : 1;
    const bIsSE = b.countryCode === "SE" ? 0 : 1;
    if (aIsSE !== bIsSE) return aIsSE - bIsSE;
    return a.name.localeCompare(b.name);
  });

  return results;
}

async function handleSearch(app) {
  let value = app.searchField.value;

  if (value.trim() === "") {
    app.searchField.placeholder = "please enter a city";
    return;
  }

  const commaIndex = value.indexOf(",");
  if (commaIndex !== -1) {
    value = value.slice(0, commaIndex);
  }

  try {
    await app.getWeather(value.trim());
    app.searchField.value = "";
  } catch (err) {
    alert(`Error: Could not find a city with the name ${value}`);
  }
}

export function initSearch(app) {
  const field = app.searchField;
  const button = app.searchBtn;
  const list = document.getElementById("search-suggestions");

  // vår nya suggestions-fil
  setupSuggestions({ field, list, app, searchCities, handleSearch });

  // knapp-klick
  button.addEventListener("click", async () => {
    await handleSearch(app);
  });
}
