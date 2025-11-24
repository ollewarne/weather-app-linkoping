import { createCordinatesURL, createTemperatureURL } from "./url.js";
import { weatherCodes } from "../utils/weatherCodes.js";
import { enqueueRequest } from "./requestQueue.js";


export async function getWeatherFromCity(city) {
   let url = createCordinatesURL(city);

   const response = await enqueueRequest(() => fetch(url));
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


export async function getTemperatureFromCoordinates(lat, lon, city, cityId, country) {

   let url = createTemperatureURL(lat, lon);

   console.log("kört call för " + city);

   const response = await enqueueRequest(() => fetch(url));
   if (!response.ok)
      throw new Error(console.log("Got HTTP-error ", response.status));
   const data = await response.json();

   return {
      lat: lat,
      lon: lon,
      cityId: 'id:' + cityId,
      city: city,
      country: country,
      temperature: data.current.temperature_2m,
      weather: weatherCodes[data.current.weather_code].description,
      icon: weatherCodes[data.current.weather_code].icon,
      unit: data.current_units.temperature_2m,
      time: data.current.time,
      interval: data.current.interval,
      timeZone: data.timezone
   }
}
