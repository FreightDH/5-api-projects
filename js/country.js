(() => {
    "use strict";
    let bodyLockStatus = true;
    const functions_unlockBody = (delay = 300) => {
        const body = document.querySelector("body");
        if (bodyLockStatus) {
            const lockPadding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((() => {
                bodyLockStatus = true;
            }), delay);
        }
    };
    const functions_lockBody = (delay = 300) => {
        const body = document.querySelector("body");
        if (bodyLockStatus) {
            const lockPadding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = `${window.innerWidth - document.querySelector(".wrapper").offsetWidth}px`;
            }
            body.style.paddingRight = `${window.innerWidth - document.querySelector(".wrapper").offsetWidth}px`;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((() => {
                bodyLockStatus = true;
            }), delay);
        }
    };
    const bodyLockToggle = (delay = 300) => {
        if (document.documentElement.classList.contains("lock")) functions_unlockBody(delay); else functions_lockBody(delay);
    };
    function menuInit() {
        if (document.querySelector(".menu__icon")) document.addEventListener("click", (function(event) {
            if (bodyLockStatus && event.target.closest(".menu__icon")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
                document.querySelector(".menu__body").classList.toggle("menu-open");
            }
            if (bodyLockStatus && event.target.closest(".menu__link")) {
                functions_unlockBody();
                document.documentElement.classList.remove("menu-open");
                document.querySelector(".menu__body").classList.remove("menu-open");
            }
            if (bodyLockStatus && !event.target.closest(".menu__link")) {
                functions_unlockBody();
                document.documentElement.classList.remove("menu-open");
                document.querySelector(".menu__body").classList.remove("menu-open");
            }
        }));
    }
    function findActiveLink() {
        const menuLinks = Array.from(document.querySelectorAll(".menu__link"));
        const pageTitle = document.querySelector("h1").textContent;
        const activeLink = menuLinks.find((link => link.textContent === pageTitle));
        menuLinks.forEach((link => link.parentElement.classList.remove("active")));
        if (activeLink) activeLink.parentElement.classList.add("active");
    }
    async function getCountryInfo(country) {
        const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
        const result = document.querySelector(".content__result");
        try {
            const res = await fetch(url);
            const data = await res.json();
            result.innerHTML = `\n    <div class="result__image"><img src="${data[0].flags.svg}" alt="flag" /></div>\n    <h2 class="result__country">${data[0].name.common}</h2>\n    <ul class="result__info">\n      <li class="info__item"><span>Столица:</span> ${data[0].capital[0]}</li>\n      <li class="info__item"><span>Континент:</span> ${data[0].continents[0]}</li>\n      <li class="info__item"><span>Население:</span> ${data[0].population}</li>\n      <li class="info__item"><span>Валюта:</span> ${data[0].currencies[Object.keys(data[0].currencies)].name} - ${Object.keys(data[0].currencies)[0]}</li>\n      <li class="info__item"><span>Основной язык:</span> ${Object.values(data[0].languages).toString().split(",").join(", ")}</li>\n    </ul>\n    `;
        } catch (error) {
            if (country.length == 0) result.innerHTML = `<h3>The input field cannot be empty</h3>`; else result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
        }
    }
    function start() {
        const input = document.getElementById("input");
        const searchButton = document.getElementById("btn");
        searchButton.addEventListener("click", (() => getCountryInfo(input.value)));
        input.addEventListener("change", (() => getCountryInfo(input.value)));
        menuInit();
        findActiveLink();
    }
    window.addEventListener("load", start);
})();