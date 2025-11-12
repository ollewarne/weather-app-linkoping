export function getWeatherIcon(code) { 
    switch(code) {
        case 0:  //"Clear sky"
            return '<i class="ri-sun-line"></i>'; // sun
            break;
        case 1:  //"Mainly clear"
            return '<i class="ri-sun-foggy-line"></i>'; // sun foggy
            break;
        case 2: //"Partly cloudy"
            return '<i class="ri-sun-cloudy-line"></i>'; // cloudy sun
            break;
        case 3: //"Overcast"
            return '<i class="fa-solid fa-cloud"></i>';
            break;
        case 45: //"Fog"
            return '<i class="ri-mist-line"></i>';
            break;
        case 48: //"Depositing rime fog"
            return '<i class="ri-snowy-line"></i>';
            break;
        case 51: //"Light drizzle"
        case 56: //"Light freezing drizzle"
        case 61: //"Slight rain"
        case 66: //"Light freezing rain"
            return '<i class="ri-drizzle-line"></i>';
            break;
        case 53: //"Moderate drizzle"
        case 55: //"Dense drizzle"
        case 57: //"Dense freezing drizzle"
        case 67: //"Heavy freezing rain"
        case 80: //"Slight rain showers"
            return '<i class="ri-showers-line"></i>';
            break;
        case 63: //"Moderate rain"
        case 81: // "Moderate rain showers"
            return '<i class="ri-rainy-line"></i>';
            break;
        case 65: //"Heavy rain"
        case 82: // "Violent rain showers"
            return '<i class="ri-heavy-showers-line"></i>';
            break;
        case 71: // "Slight snow fall"
        case 73: //"Moderate snow fall"
            return '<i class="ri-snowy-line"></i>';
            break;
        case 75: // "Heavy snow fall"
        case 77: //"Snow grains"
        case 85: // "Slight snow showers"
        case 86: // "Heavy snow showers"
            return '<i class="ri-snowflake-line"></i>';
            break;
        case 95: //"Thunderstorm (slight or moderate)"
            return '<i class="ri-thunderstorms-line"></i>';
            break;
        case 96: //"Thunderstorm with slight hail"
        case 99: //"Thunderstorm with heavy hail"
            return '<i class="ri-hail-line"></i>';
            break;
        default:
            return '<i class="ri-file-damage-line"></i>';
            break;
    };
};
