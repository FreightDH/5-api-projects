import '../scss/style.scss';
import * as myFunctions from './files/functions.js';
import * as menuFunctions from './files/burger.js';
import { getCountryInfo } from './country/getCountryInfo.js';

function start() {
  const input = document.getElementById('input');
  const searchButton = document.getElementById('btn');

  searchButton.addEventListener('click', () => getCountryInfo(input.value));
  input.addEventListener('change', () => getCountryInfo(input.value));
}

window.addEventListener('load', start);
