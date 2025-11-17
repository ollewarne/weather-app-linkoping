import { createCordinatesURL, createTemperatureURL } from "./url.js";
import { weatherCodes } from "../utils/weatherCodes.js";

export async function getWeatherFromCity(city) {
   const response = await fetch(createCordinatesURL(city));
   if (!response.ok)
      throw new Error(console.log("Got HTTP-error ", response.status));
   const data = await response.json();

   let latitude = data.results[0].latitude;
   let longitude = data.results[0].longitude;
   let cityName = data.results[0].name;
   let cityId = data.results[0].id;
   let country = data.results[0].country_code;

   
   return await getTemperatureFromCoordinates(latitude, longitude, cityName, cityId, country)
}

async function getTemperatureFromCoordinates(lat, lon, city, cityId, country) {
   const response = await fetch(createTemperatureURL(lat, lon));
   if (!response.ok)
      throw new Error(console.log("Got HTTP-error ", response.status));
   const data = await response.json();

   let date = data.current.time.split("T")[0]

   let time = data.current.time.split("T")[1]

   return {
      id: 'id:' + cityId,
      city: city,
      country: country,
      temperature: data.current.temperature_2m,
      weather: weatherCodes[data.current.weather_code].description,
      icon: weatherCodes[data.current.weather_code].icon,
      time: time,
      date: date,
      timeZone: data.timezone
   }
}
