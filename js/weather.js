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
  async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=241a6c975817c3a04916e8babb8a5626&units=metric`;
    const result = document.querySelector('.content__result');
    try {
      const res = await fetch(url);
      const data = await res.json();
      result.innerHTML = `\n    <i class="result__icon owf owf-${
        data.weather[0].id
      }"></i>\n    <ul class="result__info">\n      <li class="info__item"><span>Температура:</span> ${data.main.temp.toFixed(
        0,
      )}°C</li>\n      <li class="info__item"><span>Описание:</span> ${
        data.weather[0].description
      }</li>\n      <li class="info__item"><span>Скорость ветра:</span>  ${data.wind.speed.toFixed(
        0,
      )} м/с</li>\n      <li class="info__item"><span>Влажность:</span>  ${data.main.humidity}%</li>\n    </ul>\n    `;
    } catch (error) {
      if (city.length == 0) result.innerHTML = `<h3>Поле ввода не может быть пустым!</h3>`;
      else result.innerHTML = `<h2 class="error">Ошибка! Город не найден!</h2>`;
    }
  }
  function start() {
    const input = document.getElementById('input');
    const searchButton = document.getElementById('btn');
    searchButton.addEventListener('click', () => getWeather(input.value));
    input.addEventListener('change', () => getWeather(input.value));
    menuInit();
    findActiveLink();
  }
  window.addEventListener('load', start);
})();
