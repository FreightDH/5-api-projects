import { bodyLockStatus, bodyLockToggle, lockBody, unlockBody } from './functions.js';

// МЕНЮ-БУРГЕР
export function menuInit() {
  if (document.querySelector('.menu__icon')) {
    document.addEventListener('click', function (event) {
      if (bodyLockStatus && event.target.closest('.menu__icon')) {
        bodyLockToggle();
        document.documentElement.classList.toggle('menu-open');
        document.querySelector('.menu__body').classList.toggle('menu-open');
      }
      if (bodyLockStatus && event.target.closest('.menu__link')) {
        unlockBody();
        document.documentElement.classList.remove('menu-open');
        document.querySelector('.menu__body').classList.remove('menu-open');
      }
      if (bodyLockStatus && !event.target.closest('.menu__link')) {
        unlockBody();
        document.documentElement.classList.remove('menu-open');
        document.querySelector('.menu__body').classList.remove('menu-open');
      }
    });
  }
}

export function menuOpen() {
  lockBody();
  document.documentElement.classList.add('menu-open');
  document.querySelector('.menu__body').classList.add('menu-open');
}

export function menuClose() {
  unlockBody();
  document.documentElement.classList.remove('menu-open');
  document.querySelector('.menu__body').classList.remove('menu-open');
}

export function findActiveLink() {
  const menuLinks = Array.from(document.querySelectorAll('.menu__link'));
  const pageTitle = document.querySelector('h1').textContent;
  const activeLink = menuLinks.find((link) => link.textContent === pageTitle.slice(0, pageTitle.indexOf('(') - 1));

  menuLinks.forEach((link) => link.parentElement.classList.remove('active'));
  if (activeLink) activeLink.parentElement.classList.add('active');
}
//----------------------------------------------------------------------
