import { createCordinatesURL, createTemperatureURL } from "./suvxUrls.js";
import { weatherCodes } from "../utils/weatherCodes.js";

export async function getWeatherFromCity(city) {
   const response = await fetch(createCordinatesURL(city));
   if (!response.ok) {
      throw new Error(console.log("Got HTTP-error ", response.status));
      }
   const data = await response.json();

   let latitude = data.lat;
   let longitude = data.lon;
   let cityName = data.city;

   return await getTemperatureFromCoordinates(latitude, longitude, cityName)
}

async function getTemperatureFromCoordinates(lat, lon, city) {
   const response = await fetch(createTemperatureURL(lat, lon));
   if (!response.ok)
      throw new Error(console.log("Got HTTP-error ", response.status));
   const data = await response.json();

   let date = data.updatedAt.split("T")[0]

   let time = data.updatedAt.split("T")[1]
   let code = +data.weather_code

   return {
      city: city,
      temperature: data.tempC,
      weather: weatherCodes[code].description,
      icon: weatherCodes[code].icon,
      time: time,
      date: date,
      //timeZone: data.timezone
   }
}
