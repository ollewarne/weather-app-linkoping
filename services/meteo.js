import { createCordinatesURL, createTemperatureURL } from "./url.js";
import { weatherCodes } from "../utils/weatherCodes.js";
import { enqueueRequest } from "./requestQueue.js"; 


// let limitList = []; // Tendens att bli först stor? Sparar urlx2 för varje sökning. Återställs vid refresh. 


// setInterval(() => {

//    if (limitList.length > 100) {
//       limitList = [];
//       console.log('List of searched urls - cleared.')
//    }

// }, 3600000);


export async function getWeatherFromCity(city) {
   let url = createCordinatesURL(city);

   // if (limitList[url]) {
   //    let now = new Date().getTime();
   //    let delta = now - limitList[url];

   //    if(delta < 1000) {
   //       console.log('Exceeded limit for api call. Only one fetch allowed per second.');
   //       return null;
   //    };
   // };

  const response = await enqueueRequest(() => fetch(url));
  if (!response.ok)
    throw new Error(console.log("Got HTTP-error ", response.status));
  const data = await response.json();

   // limitList[url] = new Date().getTime();

   let latitude = data.results[0].latitude;
   let longitude = data.results[0].longitude;
   let cityName = data.results[0].name;
   let cityId = data.results[0].id;
   let country = data.results[0].country_code;

   return await getTemperatureFromCoordinates(latitude, longitude, cityName, cityId, country)
}



async function getTemperatureFromCoordinates(lat, lon, city, cityId, country) {

   let url = createTemperatureURL(lat, lon);

   console.log("kört call för " + city);
   // if (limitList[url]) {
   //    let now = new Date().getTime();
   //    let delta = now - limitList[url];

   //    if(delta < 1000) {
   //       console.log('Exceeded limit for api call. Only one fetch allowed per second.');
   //       return null;
   //    };
   // };

  const response = await enqueueRequest(() => fetch(url));
  if (!response.ok)
    throw new Error(console.log("Got HTTP-error ", response.status));
  const data = await response.json();

   // limitList[url] = new Date().getTime();


   return {
      id: 'id:' + cityId,
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
