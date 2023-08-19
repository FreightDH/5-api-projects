// МОДУЛИ БЛОКИРОВКИ ПРОКРУТКИ
export let bodyLockStatus = true;

export const unlockBody = (delay = 300) => {
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

export const lockBody = (delay = 300) => {
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

export const bodyLockToggle = (delay = 300) => {
  if (document.documentElement.classList.contains('lock')) {
    unlockBody(delay);
  } else {
    lockBody(delay);
  }
};
//----------------------------------------------------------------------
// ДРУГОЕ

// ГЕНЕРАЦИЯ СЛУЧАЙНОГО ЧИСЛА, ВКЛЮЧАЯ MIN и MAX
export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
//----------------------------------------------------------------------
