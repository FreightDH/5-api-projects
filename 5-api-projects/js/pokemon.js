(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            const webP = new Image;
            webP.onload = webP.onerror = () => {
                callback(webP.height === 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((support => {
            const className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
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
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
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
        const activeLink = menuLinks.find((link => link.textContent === pageTitle.slice(0, pageTitle.indexOf("(") - 1)));
        menuLinks.forEach((link => link.parentElement.classList.remove("active")));
        if (activeLink) activeLink.parentElement.classList.add("active");
    }
    const typeColor = {
        bug: "#26de81",
        dragon: "#ffeaa7",
        electric: "#fed330",
        fairy: "#FF0069",
        fighting: "#30336b",
        fire: "#f0932b",
        flying: "#81ecec",
        grass: "#00b894",
        ground: "#EFB549",
        ghost: "#a55eea",
        ice: "#74b9ff",
        normal: "#95afc0",
        poison: "#6c5ce7",
        psychic: "#a29bfe",
        rock: "#2d3436",
        water: "#0190FF"
    };
    function createCard(card, data) {
        const hpStat = data.stats[0].base_stat;
        const attackStat = data.stats[1].base_stat;
        const defenceStat = data.stats[2].base_stat;
        const speedStat = data.stats[5].base_stat;
        const name = data.name[0].toUpperCase() + data.name.slice(1);
        const imgSrc = data.sprites.other.dream_world.front_default;
        const types = data.types;
        const themeColor = typeColor[data.types[0].type.name];
        card.innerHTML = `\n    <div class="card__body">\n      <p class="card__health"><span>HP</span>${hpStat}</p>\n      <div class="card__image"><img src='${imgSrc}' alt="pokemon"></div>\n      <h2 class="card__name">${name}</h2>\n      <ul class="card__types"></ul>\n      <ul class="card__stats">\n        <li class="stats__item">\n          <h3 class="item__stat">${attackStat}</h3>\n          <p class="item__name">Attack</p>\n        </li>\n        <li class="stats__item">\n          <h3 class="item__stat">${defenceStat}</h3>\n          <p class="item__name">Defense</p>\n        </li>\n        <li class="stats__item">\n          <h3 class="item__stat">${speedStat}</h3>\n          <p class="item__name">Speed</p>\n        </li>\n      </ul>\n    </div>\n  `;
        types.forEach((item => {
            const li = document.createElement("li");
            li.classList.add("types__item");
            li.textContent = item.type.name;
            document.querySelector(".card__types").appendChild(li);
        }));
        card.style.background = `radial-gradient(circle at 50% 0%, ${themeColor} 36%, #ffffff 36%)`;
        card.querySelectorAll(".types__item").forEach((typeColor => {
            typeColor.style.backgroundColor = themeColor;
        }));
    }
    isWebp();
    function start() {
        const card = document.getElementById("card");
        const URL = " https://pokeapi.co/api/v2/pokemon/";
        let id = getRandomNumber(1, 150);
        const finalUrl = URL + id;
        fetch(finalUrl).then((res => res.json())).then((data => {
            createCard(card, data);
        })).catch((error => console.error(error)));
    }
    const pokemon_button = document.getElementById("btn");
    pokemon_button.addEventListener("click", start);
    window.addEventListener("load", start);
    menuInit();
    findActiveLink();
})();