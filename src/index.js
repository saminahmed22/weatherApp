import './styles.css';
import { format } from 'date-fns';
import renderCards from './modules/card';
import weatherIcon from './modules/weatherIcon';

async function getWeather(target) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${target}?unitGroup=metric&key=DTJTD6H6MTNGYNZA3EG4GL4R4&contentType=json`
  );
  const weatherJSON = await response.json();

  const weatherObj = {
    address: weatherJSON.resolvedAddress,
    description: weatherJSON.currentConditions.conditions,
    temperature: weatherJSON.currentConditions.temp,
    cloudCover: weatherJSON.currentConditions.cloudcover,
    feelsLike: weatherJSON.currentConditions.feelslike,
    humidity: weatherJSON.currentConditions.humidity,
    moonPhase: weatherJSON.currentConditions.moonphase,
    precipProb: weatherJSON.currentConditions.precipprob,
    pressure: weatherJSON.currentConditions.pressure,
    snow: weatherJSON.currentConditions.snow,
    snowDepth: weatherJSON.currentConditions.snowdepth,
    sunrise: weatherJSON.currentConditions.sunrise,
    sunset: weatherJSON.currentConditions.sunset,
    visibility: weatherJSON.currentConditions.visibility,
    windDir: weatherJSON.currentConditions.winddir,
    windSpeed: weatherJSON.currentConditions.windspeed,
    icon: weatherJSON.currentConditions.icon,
    days: weatherJSON.days,
    timeZone: weatherJSON.timezone,
  };
  return weatherObj;
}

function renderWeather(weatherObject) {
  const tempText = document.querySelector('.temp');
  const descText = document.querySelector('.desc');
  const time = document.querySelector('.time');
  const date = document.querySelector('.date');
  const location = document.querySelector('.location');
  const cloudCoverText = document.querySelector('#currentCloudCoverValue');
  const feelsLikeText = document.querySelector('#currentFeelsLikeValue');
  const humidityText = document.querySelector('#currentHumidityValue');
  const moonPhaseText = document.querySelector('#currentMoonPhaseValue');
  const precipProbText = document.querySelector('#currentPrecipProbValue');
  const pressureText = document.querySelector('#currentPressureValue');
  const snowText = document.querySelector('#currentSnowValue');
  const snowDepthText = document.querySelector('#currentSnowDepthValue');
  const sunriseText = document.querySelector('#currentSunriseValue');
  const sunsetText = document.querySelector('#currentSunsetValue');
  const visibilityText = document.querySelector('#currentVisibilityValue');
  const windDirText = document.querySelector('#currentWindDirValue');
  const windSpeedText = document.querySelector('#currentWindSpeedValue');

  tempText.textContent = `${weatherObject.temperature}° Celsius`;
  cloudCoverText.textContent = `${weatherObject.cloudCover}%`;
  feelsLikeText.textContent = `${weatherObject.feelsLike}°C`;
  humidityText.textContent = `${weatherObject.humidity}%`;
  moonPhaseText.textContent = `${weatherObject.moonPhase}`;
  precipProbText.textContent = `${weatherObject.precipProb}%`;
  pressureText.textContent = `${weatherObject.pressure} hPa`;
  snowText.textContent = `${weatherObject.snow} cm`;
  snowDepthText.textContent = `${weatherObject.snowDepth} cm`;
  sunriseText.textContent = `${weatherObject.sunrise}`;
  sunsetText.textContent = `${weatherObject.sunset}`;
  visibilityText.textContent = `${weatherObject.visibility} km`;
  windDirText.textContent = `${weatherObject.windDir}°`;
  windSpeedText.textContent = `${weatherObject.windSpeed} km/h`;

  weatherIcon(weatherObject.icon);
  descText.textContent = weatherObject.description;

  location.textContent = weatherObject.address;

  let currentDate = weatherObject.days[0].datetime;
  currentDate = format(currentDate, 'EEEE, MMMM, dd');

  date.textContent = currentDate;

  function clock() {
    const now = new Date();
    const options = {
      timeZone: `${weatherObject.timeZone}`,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    const dateStr = new Intl.DateTimeFormat('en-US', options).format(now);
    time.textContent = dateStr;
  }
  clock();
}

async function getCurrentLocation() {
  const response = await fetch('https://ipinfo.io/json?token=489436c60f48a3');
  const data = await response.json();
  const { city } = data;
  return city;
}

let customLocaiton;
async function getLocation(location = customLocaiton) {
  if (location) {
    return location;
  }
  const currentLocation = await getCurrentLocation();
  return currentLocation;
}

async function main() {
  const location = await getLocation();
  const weatherObject = await getWeather(location);
  // getBackgroundImage(weatherObject.icon);
  renderWeather(weatherObject, location);
  renderCards(weatherObject.days);
}

main();

const searchbar = document.querySelector('#searchbar');
document.addEventListener('submit', (event) => {
  event.preventDefault();
  if (event.target.matches('#searchForm')) {
    customLocaiton = searchbar.value;
    main();
  }
});

// async function getBackgroundImage(condition) {
//   console.log(condition);
//   const response = await fetch(
//     `https://api.unsplash.com/photos/random?query=${condition}&orientation=landscape&count=1&client_id=:)`
//   );
//   const data = await response.json();

//   const photo = data[0]; // Since it's an array with one item

//   const authorName = photo.user.name;
//   const authorProfile = photo.user.links.html;
//   const authorCredit = document.querySelector('.author');
//   authorCredit.textContent = authorName;
//   authorCredit.setAttribute('href', authorProfile);

//   const imageUrl = photo.urls.full;
//   const body = document.querySelector('body');
//   body.style.backgroundImage = `url('${imageUrl}')`;

//   const photoLink = document.querySelector('.photoLink');
//   photoLink.setAttribute('href', imageUrl);
// }
