export async function getDefinition(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const result = document.querySelector('.content__result');

  try {
    const res = await fetch(url);
    const data = await res.json();

    result.innerHTML = `
      <h2 class="result__word">${word}</h2>
      <div class="result__details">
        <p class="details__text">${data[0].meanings[0].partOfSpeech}</p>
        <p class="details__text">${data[0].phonetic || ''}</p>
      </div>
      <p class="result__definition">${data[0].meanings[0].definitions[0].definition}</p>
      <p class="result__example">${data[0].meanings[0].definitions[0].example || ''}</p>
    `;
  } catch (error) {
    if (word.length == 0) {
      result.innerHTML = `<h3>Поле ввода не может быть пустым!</h3>`;
    } else {
      result.innerHTML = `<h2 class="error">Ошибка! Слово не найдено!</h2>`;
    }
  }
}
