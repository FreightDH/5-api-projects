export async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=241a6c975817c3a04916e8babb8a5626&units=metric`;
  const result = document.querySelector('.content__result');

  try {
    const res = await fetch(url);
    const data = await res.json();

    result.innerHTML = `
    <i class="result__icon owf owf-${data.weather[0].id}"></i>
    <ul class="result__info">
      <li class="info__item"><span>Температура:</span> ${data.main.temp.toFixed(0)}°C</li>
      <li class="info__item"><span>Описание:</span> ${data.weather[0].description}</li>
      <li class="info__item"><span>Скорость ветра:</span>  ${data.wind.speed.toFixed(0)} м/с</li>
      <li class="info__item"><span>Влажность:</span>  ${data.main.humidity}%</li>
    </ul>
    `;
  } catch (error) {
    if (city.length == 0) {
      result.innerHTML = `<h3>Поле ввода не может быть пустым!</h3>`;
    } else {
      result.innerHTML = `<h2 class="error">Ошибка! Город не найден!</h2>`;
    }
  }
}
