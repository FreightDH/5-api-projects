import '../scss/style.scss';
import * as menuFunctions from './files/burger.js';
import { getWeather } from './weather/getWeather.js';

function start() {
  const input = document.getElementById('input');
  const searchButton = document.getElementById('btn');

  searchButton.addEventListener('click', () => getWeather(input.value));
  input.addEventListener('change', () => getWeather(input.value));
  menuFunctions.menuInit();
  menuFunctions.findActiveLink();
}

window.addEventListener('load', start);
