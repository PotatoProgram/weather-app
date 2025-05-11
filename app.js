let searchFormElement = document.querySelector("#search-form");
console.log(searchFormElement);
searchFormElement.addEventListener("submit", handleSearchSubmit);
//default city for app
searchCity("Houston");

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = ""
  
  days.forEach(function (day) {
    forecastHTML += `<div class="col">
            <div class="weatherForecastPreview">
              <div class="forecast-time">${day}</div>
              <canvas width="38" height="38"></canvas>
              <div class="forecast-temperature">
                <span class="forecast-temperature-max">14</span>
                <span class="forecast-temperature-min">18</span>
              </div>
            </div>
          </div>`;
  });
  forecast.innerHTML = forecastHTML;
}

displayForecast();

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value);
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function searchCity(city) {
  //make an api call and update the interface of the page
  let apiKey = "a3o950fc274379347b6a44aft08a3cb0";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiURL);
  //use axios to get weather info
  axios.get(apiURL).then(updateWeatherInfo);
}

function updateWeatherInfo(response) {
  console.log(response.data.condition.description);

  let cityElement = document.querySelector("#selectedCity");

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  capitalize();

  let temperature = response.data.temperature.current;
  let temperatureElement = document.querySelector("#temperature");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  function capitalize() {
    let description = response.data.condition.description;
    description = description
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    descriptionElement.innerHTML = description;
  }

  function formatDate(date) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[date.getDay()];
    let minutes = date.getMinutes();
    let hours = date.getHours();
    return `${day}, ${hours}:${minutes}`;
  }
}
