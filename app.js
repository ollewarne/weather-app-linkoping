
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
