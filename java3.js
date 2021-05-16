let timeNow = new Date();

let hourNow = document.querySelector("#current-time");

let hour = timeNow.getHours();
if (hour < 10) {
  hour = `0 ${hour}`;
}
let minute = timeNow.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[timeNow.getDay()];

hourNow.innerHTML = `${day}, ${hour}:${minute}`;


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "166250c85e8d3dfc0b7a447a4106a883";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function citySearch(event) {
  event.preventDefault();
  let cityImput = document.querySelector("#city-input");
  let city = document.querySelector("#city-id");
  city.innerHTML = cityImput.value;
}

let changeCity = document.querySelector("#city-form");
changeCity.addEventListener("submit", citySearch);


 

function showTemperature(response){

  console.log(response.data);

  let temperature= Math.round(response.data.main.temp);
  let cityTemp= response.data.name;
  let cityId= document.querySelector("#city-id");
  let realTemp= document.querySelector("#temp-display");
  let humidityElement= document.querySelector("#humidity");
  let windElement= document.querySelector("#wind-speed");
  let iconElement= document.querySelector("#icon-weather");
  let descriptionElement= document.querySelector("#description-weather");


  realTemp.innerHTML= `${temperature}`;
  humidityElement.innerHTML= response.data.main.humidity;
  windElement.innerHTML= response.data.wind.speed;
  descriptionElement.innerHTML= response.data.weather[0].description;
  cityId.innerHTML= `${cityTemp}`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  

 celsiusTemperature = response.data.main.temp;

 getForecast(response.data.coord);
  
}
let apiKey = "166250c85e8d3dfc0b7a447a4106a883";



function searchCity(event) {
  event.preventDefault();
  let units= "metric";
  let cityInput = document.querySelector("#city-input");
  let cityD= document.querySelector("#city-id");
  cityD.innerHTML= `${cityInput.value}`;
  let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${units}&appid=${apiKey}`;
  
  axios.get(apiUrl).then(showTemperature);
  
}


let searchBtn= document.querySelector("#search");

searchBtn.addEventListener("click", searchCity);

let cityForm= document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

function positionNow(position){
  let units= "metric";
  let apiKey= "166250c85e8d3dfc0b7a447a4106a883";
  let latitude = position.coords.latitude;
  let longitude= position.coords.longitude;
  let apiUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}


  navigator.geolocation.getCurrentPosition(positionNow);


let weatherNow = document.querySelector("#your-location");
weatherNow.addEventListener("click", positionNow);