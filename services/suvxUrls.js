export function createCordinatesURL(city) {
   return `http://kontoret.onvo.se:10380/api/v1/geo?city=${city}`
}

export function createTemperatureURL(lat, lon){
    return `http://kontoret.onvo.se:10380/api/v1/weather?lat=${lat}&lon=${lon}`
}
