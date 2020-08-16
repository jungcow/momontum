const weather = document.querySelector('.js-weather');

const COORDS = 'coords';
const API_KEY = '334cd9b9b546976710a978cc55cc4c89';

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then((response) => response.json())
    .then((json) => {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @${place}`;
    });
}

function saveCoords(obj) {
  localStorage.setItem(COORDS, JSON.stringify(obj));
}


function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  }
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function error() {
  console.log('nope!');
}

function getCoords() {
  navigator.geolocation.getCurrentPosition(success, error);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (!loadedCoords) {
    getCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    console.log(parsedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();