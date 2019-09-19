import api, { API_URL } from './api.js';
// const QUOTES_API = 'https://quotes-api-keepcoding.herokuapp.com/api/v1';

const { createQuote } = api(API_URL);
const localStorage = window.localStorage;

// response -> { quote, date }
export const quoteTemplate = ({ comment, dateComment }) => {
  const date = new Date(dateComment);
  const day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
  const month = date.getMonth()+1 < 10 ? '0'+date.getMonth()+1 : date.getMonth()+1;
  const hour = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
  const dateString = 
  `${day}/${month}/${date.getFullYear()}
  - ${hour}:${minutes}`;
  return `
    <div class="list-item">
    <p>${comment}</p>
    <span>${dateString}</span>
    </div>
    `;
}
  
const addQuoteListener = id => {
  const quotesForm = document.querySelector('#quote-form');
  const quotesInput = document.querySelector('#quote');
  const quotesList = document.querySelector('#quoteList');
  // const storageInput = document.querySelector('#checkSave')

  quotesForm.addEventListener('submit', async evt => {
    evt.preventDefault();
    try {
      if (quotesInput.validity.valid) {
        // const id = window.location.pathname.split('/detail/')[1]
        await createQuote(id, quotesInput.value);
        // const dateComment = (new Date()).toJSON();
        const commentToShow = {
          comment: quotesInput.value,
          // dateComment: dateComment,
        };
        // if (storageInput.checked) {
        //   console.log(`Grabado : ${dateComment}`);
        //   localStorage.setItem(dateComment.slice(0,19), quotesInput.value);
        // }
        quotesList.innerHTML += quoteTemplate(commentToShow);

        // Cleaning the comment input
        quotesInput.value = '';
        quotesInput.focus();
        // 1. Caso :)
        // {"id":"1","quote":"comentario kevin","date":"2019-09-10T19:34:24.817Z"}
        // pintar(response))
        // 2.Caso :(
        // { "success": true }
        // pintar(quotesInput.value))
        // 3. Caso
        // const detail = await getQuote(id);
        // pintar(detail))
      }
    } catch (err) {
      console.error('Eror adding comment', err);
      // handleError();
    }
  });
};

export default addQuoteListener;
