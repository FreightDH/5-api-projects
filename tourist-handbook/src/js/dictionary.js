import '../scss/style.scss';
import * as menuFunctions from './files/burger.js';
import { getDefinition } from './dictionary/getDefinition.js';

function start() {
  const input = document.getElementById('input');
  const searchButton = document.getElementById('btn');

  searchButton.addEventListener('click', () => getDefinition(input.value));
  input.addEventListener('change', () => getDefinition(input.value));
  menuFunctions.menuInit();
  menuFunctions.findActiveLink();
}

window.addEventListener('load', start);
