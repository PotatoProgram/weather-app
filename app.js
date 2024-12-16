let searchFormElement = document.querySelector("#search-form");
console.log(searchFormElement);
searchFormElement.addEventListener("submit", handleSearchSubmit);
//default city for app
searchCity("Houston");

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
  let temperature = response.data.temperature.current;
  let temperatureElement = document.querySelector("#temperature");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  capitalize();
  function capitalize() {
    let description = response.data.condition.description;
    description = description
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
    descriptionElement.innerHTML = description;
  }
}

