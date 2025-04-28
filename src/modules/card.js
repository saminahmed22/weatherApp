import { format } from 'date-fns';

const card = document.querySelector('.card');
const cardList = document.querySelector('.cards');

function renderCards(daysObj) {
  cardList.textContent = '';
  for (let i = 0; i <= 5; i += 1) {
    const {
      datetime,
      humidity,
      precipprob,
      windspeed,
      pressure,
      visibility,
      uvindex,
      feelslike,
    } = daysObj[i];

    const cloneCard = card.cloneNode(true);
    cloneCard.removeAttribute('id');

    const dateTag = cloneCard.querySelector('.cardDate');
    const formattedDate = format(datetime, 'MMMM do, yyyy');
    dateTag.textContent = formattedDate;

    cloneCard.querySelector('#humidityValue').textContent = `${humidity}%`;
    cloneCard.querySelector('#precipprobValue').textContent = `${precipprob}%`;
    cloneCard.querySelector('#windSpeedValue').textContent =
      `${windspeed} km/h`;
    cloneCard.querySelector('#pressureValue').textContent = `${pressure} hPa`;
    cloneCard.querySelector('#visibilityValue').textContent =
      `${visibility} km`;
    cloneCard.querySelector('#uvIndexValue').textContent = `${uvindex}`;
    cloneCard.querySelector('#feelsLikeValue').textContent = `${feelslike}°C`;

    cardList.appendChild(cloneCard);
  }
}
// April 20th, 2025
export default renderCards;
