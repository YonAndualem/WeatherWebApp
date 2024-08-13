let cityInput = document.getElementById("city-input"),
    searchBtn = document.getElementById("searchBtn"),
    locationBtn = document.getElementById("locationBtn"),
    api_key = "1cdfa4a7950a8dab18f719d896c0b3a2";
(currentWeatherCard = document.querySelectorAll(".weather-left .card")[0]),
    (fiveDaysForecastCard = document.querySelector(".day-forecast")),
    (aqiCard = document.querySelectorAll(".highlights .card")[0]),
    (sunriseCard = document.querySelectorAll(".highlights .card")[1]),
    (humidityval = document.getElementById("humidityval")),
    (pressureval = document.getElementById("pressureval")),
    (visibilityval = document.getElementById("visibilityval")),
    (windSpeedval = document.getElementById("windSpeedval")),
    (feelsval = document.getElementById("feelsval")),
    (seaval = document.getElementById("seaLevelval")),
    (hourlyForecastCard = document.querySelector(".hourly-forecast")),
    (aqiList = ["Good", "Fair", "Moderate", "Poor", "Very Poor"]);

//Functions
//Weather Details
//City Coordinates
//User Coordinates

searchBtn.addEventListener("click", getCityCoordinates);
locationBtn.addEventListener("click", getUserCoordinates);
cityInput.addEventListener(
    "keyup",
    (e) => e.key === "Enter" && getCityCoordinates()
);
window.addEventListener("load", getUserCoordinates);