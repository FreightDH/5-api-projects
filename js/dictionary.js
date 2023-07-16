(() => {
  'use strict';
  let bodyLockStatus = true;
  const functions_unlockBody = (delay = 300) => {
    const body = document.querySelector('body');
    if (bodyLockStatus) {
      const lockPadding = document.querySelectorAll('[data-lp]');
      setTimeout(() => {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        document.documentElement.classList.remove('lock');
      }, delay);
      bodyLockStatus = false;
      setTimeout(() => {
        bodyLockStatus = true;
      }, delay);
    }
  };
  const functions_lockBody = (delay = 300) => {
    const body = document.querySelector('body');
    if (bodyLockStatus) {
      const lockPadding = document.querySelectorAll('[data-lp]');
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = `${window.innerWidth - document.querySelector('.wrapper').offsetWidth}px`;
      }
      body.style.paddingRight = `${window.innerWidth - document.querySelector('.wrapper').offsetWidth}px`;
      document.documentElement.classList.add('lock');
      bodyLockStatus = false;
      setTimeout(() => {
        bodyLockStatus = true;
      }, delay);
    }
  };
  const bodyLockToggle = (delay = 300) => {
    if (document.documentElement.classList.contains('lock')) functions_unlockBody(delay);
    else functions_lockBody(delay);
  };
  function menuInit() {
    if (document.querySelector('.menu__icon'))
      document.addEventListener('click', function (event) {
        if (bodyLockStatus && event.target.closest('.menu__icon')) {
          bodyLockToggle();
          document.documentElement.classList.toggle('menu-open');
          document.querySelector('.menu__body').classList.toggle('menu-open');
        }
        if (bodyLockStatus && event.target.closest('.menu__link')) {
          functions_unlockBody();
          document.documentElement.classList.remove('menu-open');
          document.querySelector('.menu__body').classList.remove('menu-open');
        }
        if (bodyLockStatus && !event.target.closest('.menu__link')) {
          functions_unlockBody();
          document.documentElement.classList.remove('menu-open');
          document.querySelector('.menu__body').classList.remove('menu-open');
        }
      });
  }
  function findActiveLink() {
    const menuLinks = Array.from(document.querySelectorAll('.menu__link'));
    const pageTitle = document.querySelector('h1').textContent;
    const activeLink = menuLinks.find((link) => link.textContent === pageTitle);
    menuLinks.forEach((link) => link.parentElement.classList.remove('active'));
    if (activeLink) activeLink.parentElement.classList.add('active');
  }
  async function getDefinition(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = document.querySelector('.content__result');
    try {
      const res = await fetch(url);
      const data = await res.json();
      result.innerHTML = `\n      <h2 class="result__word">${word}</h2>\n      <div class="result__details">\n        <p class="details__text">${
        data[0].meanings[0].partOfSpeech
      }</p>\n        <p class="details__text">${
        data[0].phonetic || ''
      }</p>\n      </div>\n      <p class="result__definition">${
        data[0].meanings[0].definitions[0].definition
      }</p>\n      <p class="result__example">${data[0].meanings[0].definitions[0].example || ''}</p>\n    `;
    } catch (error) {
      if (word.length == 0) result.innerHTML = `<h3>Поле ввода не может быть пустым!</h3>`;
      else result.innerHTML = `<h2 class="error">Ошибка! Слово не найдено!</h2>`;
    }
  }
  function start() {
    const input = document.getElementById('input');
    const searchButton = document.getElementById('btn');
    searchButton.addEventListener('click', () => getDefinition(input.value));
    input.addEventListener('change', () => getDefinition(input.value));
    menuInit();
    findActiveLink();
  }
  window.addEventListener('load', start);
})();
