import { typeColor } from './typeColors.js';

export function createCard(card, data) {
  const hpStat = data.stats[0].base_stat;
  const attackStat = data.stats[1].base_stat;
  const defenceStat = data.stats[2].base_stat;
  const speedStat = data.stats[5].base_stat;
  const name = data.name[0].toUpperCase() + data.name.slice(1);
  const imgSrc = data.sprites.other.dream_world.front_default;
  const types = data.types;
  const themeColor = typeColor[data.types[0].type.name];

  card.innerHTML = `
    <div class="card__body">
      <p class="card__health"><span>HP</span>${hpStat}</p>
      <div class="card__image"><img src='${imgSrc}' alt="pokemon"></div>
      <h2 class="card__name">${name}</h2>
      <ul class="card__types"></ul>
      <ul class="card__stats">
        <li class="stats__item">
          <h3 class="item__stat">${attackStat}</h3>
          <p class="item__name">Attack</p>
        </li>
        <li class="stats__item">
          <h3 class="item__stat">${defenceStat}</h3>
          <p class="item__name">Defense</p>
        </li>
        <li class="stats__item">
          <h3 class="item__stat">${speedStat}</h3>
          <p class="item__name">Speed</p>
        </li>
      </ul>
    </div>
  `;

  types.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('types__item');
    li.textContent = item.type.name;
    document.querySelector('.card__types').appendChild(li);
  });

  card.style.background = `radial-gradient(circle at 50% 0%, ${themeColor} 36%, #ffffff 36%)`;
  card.querySelectorAll('.types__item').forEach((typeColor) => {
    typeColor.style.backgroundColor = themeColor;
  });
}
