export async function getCountryInfo(country) {
  const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
  const result = document.querySelector('.content__result');

  try {
    const res = await fetch(url);
    const data = await res.json();

    result.innerHTML = `
    <div class="result__image"><img src="${data[0].flags.svg}" alt="flag" /></div>
    <h2 class="result__country">${data[0].name.common}</h2>
    <ul class="result__info">
      <li class="info__item"><span>Столица:</span> ${data[0].capital[0]}</li>
      <li class="info__item"><span>Континент:</span> ${data[0].continents[0]}</li>
      <li class="info__item"><span>Население:</span> ${data[0].population}</li>
      <li class="info__item"><span>Валюта:</span> ${data[0].currencies[Object.keys(data[0].currencies)].name} - ${
        Object.keys(data[0].currencies)[0]
      }</li>
      <li class="info__item"><span>Основной язык:</span> ${Object.values(data[0].languages)
        .toString()
        .split(',')
        .join(', ')}</li>
    </ul>
    `;
  } catch (error) {
    if (country.length == 0) {
      result.innerHTML = `<h3>Поле ввода не может быть пустым!</h3>`;
    } else {
      result.innerHTML = `<h3>Ошибка! Страна не найдена!.</h3>`;
    }
  }
}
