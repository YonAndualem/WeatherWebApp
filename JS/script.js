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
function getWeatherDetails(name, lat, lon, country, state) {
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${api_key}`;

    let AIR_POLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;

    let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    fetch(AIR_POLLUTION_API_URL).then(res => res.json()).then(data => {
        let { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = data.list[0].components;
        aqiCard.innerHTML = `
            <div class="card-head">
                <p>Air Quality Index</p>
                <p class="air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].main.aqi - 1]}</p>
            </div>
            <div class="air-indices">
                <div class="item">
                    <p>PM2.5</p>
                    <h2>${pm2_5}</h2>
                </div>
                <div class="item">
                    <p>PM10</p>
                    <h2>${pm10}</h2>
                </div>
                <div class="item">
                    <p>SO2</p>
                    <h2>${so2}</h2>
                </div>
                <div class="item">
                    <p>CO</p>
                    <h2>${co}</h2>
                </div>
                <div class="item">
                    <p>NO</p>
                    <h2>${no}</h2>
                </div>
                <div class="item">
                    <p>NO2</p>
                    <h2>${no2}</h2>
                </div>
                <div class="item">
                    <p>NH3</p>
                    <h2>${nh3}</h2>
                </div>
                <div class="item">
                    <p>O3</p>
                    <h2>${o3}</h2>
                </div>
            </div>
            `;
    }).catch(() => {
        showModal("Oops! Failed to fetch air pollution details.");
        return;
    });




    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        let date = new Date();
        currentWeatherCard.innerHTML = `
        <div class="current-weather">
            <div class="details">
                <p>Now</p>
                <h2>${(data.main.temp - 273.15).toFixed(1)}&deg;C</h2>
                <p>${data.weather[0].description}</p>
            </div>
            <div class="weather-icon">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
            </div>
        </div>
        <hr>
        <div class="card-footer">
            <p>
                <i class="fa-light fa-calendar"></i>${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}
            </p>
            <p>
                <i class="fa-light fa-location-dot"></i>${name}, ${country}
            </p>
        </div>
        `;
        let { sunrise, sunset } = data.sys,
            { timezone, visibility } = data,
            { humidity, pressure, feels_like } = data.main,
            { speed } = data.wind;
        sRiseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm A'),
            sSetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm A');
        sunriseCard.innerHTML = `
            <div class="card-head">
                <p>Sunrise & Sunset</p>
            </div>
            <div class="sunrise-sunset">
                <div class="item">
                    <div class="icon">
                        <i class="fa-light fa-sunrise fa-4x"></i>
                    </div>
                    <div>
                        <p>Sunrise</p>
                        <h2>${sRiseTime}</h2>
                    </div>
                </div>
                <div class="item">
                    <div class="icon">
                        <i class="fa-light fa-sunset fa-4x"></i>
                    </div>
                    <div>
                        <p>Sunset</p>
                        <h2>${sSetTime}</h2>
                    </div>
                </div>
                <div class="item" id="current-time">
                    <div class="icon">
                        <i class="fa-light fa-clock fa-4x"></i>
                    </div>
                    <div>
                        <p>Current Time</p>
                        <h2><span id="local-time"></span></h2>
                    </div>
                </div>
            </div>
        `;
        humidityval.innerText = `${humidity}%`;
        pressureval.innerText = `${pressure} hPa`;
        visibilityval.innerText = `${visibility / 1000} km`;
        windSpeedval.innerText = `${speed} m/s`;
        feelsval.innerText = `${(feels_like - 273.15).toFixed(1)}\u00B0C`;
        seaval.innerText = `${data.main.sea_level}  MASL`;
    }).catch(() => {
        showModal("Oops! Failed to fetch weather details for this city.");
        return;
    });

    fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
        let hourlyForecast = data.list;
        hourlyForecastCard.innerHTML = ``;
        for (i = 0; i <= 7; i++) {
            let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
            let hr = hrForecastDate.getHours();
            let a = 'PM';
            if (hr < 12) a = 'AM';
            if (hr == 0) hr = 12;
            if (hr > 12) hr -= 12;
            hourlyForecastCard.innerHTML += `
            <div class="card">
                <p>${hr} ${a}</p>
                <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png" alt="">
                <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(1)}&deg;C</p>
            </div>
            `;
        }
        let uniqueForecastDates = [];
        let fiveDaysForecast = data.list.filter(forecast => {
            let forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDates.includes(forecastDate)) {
                return uniqueForecastDates.push(forecastDate);
            }
        });
        fiveDaysForecastCard.innerHTML = "";
        for (i = 1; i < fiveDaysForecast.length; i++) {
            let date = new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastCard.innerHTML += `
            <div class="forecast-item">
                <div class="icon-wrapper">
                    <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png" alt="">
                    <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(1)}&deg;C</span>
                </div>
                <p>${date.getDate()} ${months[date.getMonth()]}</p>
                <p>${days[date.getDay()]}</p>
            </div>
            `;
        }
    });
}

function getCityCoordinates() {
    let cityName = cityInput.value.trim();
    cityInput.value = "";
    if (!cityName) return;
    let GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;

    fetch(GEOCODING_API_URL)
        .then((res) => res.json())
        .then((data) => {
            let { name, lat, lon, country, state } = data[0];
            getWeatherDetails(name, lat, lon, country, state);
        })
        .catch(() => {
            showModal("Oops! City not found.");
            return;
        });
}

function getUserCoordinates() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            let { latitude, longitude } = position.coords;
            let REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;

            fetch(REVERSE_GEOCODING_URL)
                .then((res) => res.json())
                .then((data) => {
                    let { name, country, state } = data[0];
                    getWeatherDetails(name, latitude, longitude, country, state);
                })
                .catch(() => {
                    showModal("Oops! Failed to fetch Location Details.");
                    return;
                });
        },
        (error) => {
            if (error.code == error.PERMISSION_DENIED) {
                showModal("Location access denined! Please allow access to continue.");
                return;
            }
        }
    );
}

function showModal(message, callback) {
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    const closeBtn = document.getElementsByClassName("close")[0];

    modalMessage.textContent = message;
    modal.style.display = "block";

    closeBtn.onclick = function () {
        modal.style.display = "none";
        if (callback) callback();
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            if (callback) callback();
        }
    };

    setTimeout(function () {
      modal.style.display = "none";
      if (callback) callback();
    }, 3000);
}

searchBtn.addEventListener("click", getCityCoordinates);
locationBtn.addEventListener("click", getUserCoordinates);
cityInput.addEventListener(
    "keyup",
    (e) => e.key === "Enter" && getCityCoordinates()
);
window.addEventListener("load", getUserCoordinates);
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Determine AM or PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert 24-hour time to 12-hour time
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;

    document.getElementById("local-time").textContent = currentTime;
}

// Update the time immediately and then every second
updateTime();
setInterval(updateTime, 1000);
