async function handleSearch(app) {
  const value = app.searchField.value;

  if (value.trim() === "") {
    app.searchField.placeholder = "please enter a city";
    return;
  }

  try {
    await app.getWeather(value);
    app.searchField.value = "";
  } catch (err) {
    alert(`Error: Could not find a city with the name ${value}`);
  }
}

// init-funktion som sätter upp alla lyssnare
export function initSearch(app) {
  const field = app.searchField;
  const button = app.searchBtn;

  field.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      await handleSearch(app);
    }
  });

  button.addEventListener("click", () => {
    handleSearch(app);
  });
}
