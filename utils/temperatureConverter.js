
// -------------------- convertCelsiusToFahrenheit --------------------
function convertCelsiusToFahrenheit(c) { 
  return Math.round((c * 9/5 + 32) * 10) / 10;
}

// -------------------- convertFahrenheitToCelsius --------------------
function convertFahrenheitToCelsius(f) {
  return Math.round(((f - 32) * 5/9) * 10) / 10;
}

// -------------------- variabler till converter-functions --------------------
let checkboxStatus = false;

// -------------------- temperaturConverter --------------------
export function temperatureConverter(temperature) {

  if(checkboxStatus){
    return convertCelsiusToFahrenheit(temperature);
  } else {
    return convertFahrenheitToCelsius(temperature);
  };
};

// -------------------- unitConverter --------------------
export function unitConverter(unit) {

  if(checkboxStatus){
    checkboxStatus = false;
    return '℃';
  } else {
    checkboxStatus = true;
    return  '℉';
  };
};