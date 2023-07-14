import '../scss/style.scss';
import * as myFunctions from './files/functions.js';
import * as menuFunctions from './files/burger.js';
import { createCard } from './pokemon/createCard.js';

// Проверка поддержки webp, добавление класса webp или no-webp для HTML
myFunctions.isWebp();
// Модуль для работы с меню-бургер
// menuFunctions.menuInit();

function start() {
  const card = document.getElementById('card');
  const URL = ' https://pokeapi.co/api/v2/pokemon/';
  let id = myFunctions.getRandomNumber(1, 150);
  const finalUrl = URL + id;

  fetch(finalUrl)
    .then((res) => res.json())
    .then((data) => {
      createCard(card, data);
    })
    .catch((error) => console.error(error));
}

const button = document.getElementById('btn');
button.addEventListener('click', start);
window.addEventListener('load', start);
menuFunctions.menuInit();
menuFunctions.findActiveLink();
