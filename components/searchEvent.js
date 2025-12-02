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

  // PRIORITERA SVERIGE
  results.sort((a, b) => {
    const aIsSE = a.countryCode === "SE" ? 0 : 1;
    const bIsSE = b.countryCode === "SE" ? 0 : 1;

    // 1. svenska städer först
    if (aIsSE !== bIsSE) return aIsSE - bIsSE;

    // 2. annars vanlig alfabetisk sortering
    return a.name.localeCompare(b.name);
  });

  return results;
}

// Kör själva vädersökningen i appen
async function handleSearch(app) {
  let value = app.searchField.value;

  if (value.trim() === "") {
    app.searchField.placeholder = "please enter a city";
    return;
  }

  // ta bara själva stadsnamnet före första kommat
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


// Sätt upp lyssnare och autocomplete
export function initSearch(app) {
  const field = app.searchField;
  const button = app.searchBtn;
  const list = document.getElementById("search-suggestions");

  function hideList() {
    list.innerHTML = "";
    list.hidden = true;
  }

  // Bygg listan med förslag
  async function updateSuggestions() {
    const value = field.value.trim();

    if (value.length < 3) {
      hideList();
      return;
    }

    const results = await searchCities(value);

    list.innerHTML = "";
    if (results.length === 0) {
      hideList();
      return;
    }

    results.forEach((city) => {
      const li = document.createElement("li");
      li.textContent = city.full;
      li.classList.add("search-suggestions__item");
      li.addEventListener("click", async () => {
        field.value = city.full;
        hideList();
        await handleSearch(app);
      });
      list.appendChild(li);
    });

    list.hidden = false;
  }

  // Autocomplete vid skrivning
  field.addEventListener("input", () => {
    updateSuggestions();
  });

  // Enter startar sök
  field.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      hideList();
      await handleSearch(app);
    } else if (event.key === "Escape") {
      hideList();
    }
  });

  // Klick på knapp
  button.addEventListener("click", async () => {
    hideList();
    await handleSearch(app);
  });

  // Stäng listan om man klickar utanför
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-wrapper")) {
      hideList();
    }
  });
}
