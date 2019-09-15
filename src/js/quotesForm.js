import api, { API_URL } from './api.js';
// import * from './moment.js';
// const date = moment.moment();
// const QUOTES_API = 'https://quotes-api-keepcoding.herokuapp.com/api/v1';

const { createQuote } = api(API_URL);


// response -> { quote, date }
export const quoteTemplate = ({ comment, dateComment }) => {
  const date = new Date(dateComment);
  const dateString = 
    `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}
    -${date.getHours()}:${date.getMinutes()}`;
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

  quotesForm.addEventListener('submit', async evt => {
    evt.preventDefault();
    try {
      if (quotesInput.validity.valid) {
        // const id = window.location.pathname.split('/detail/')[1]
        await createQuote(id, quotesInput.value);
        // const dateToSave = new Date();
        const commentToSave = {
          comment: quotesInput.value,
          dateComment: Date.now(),
        };
        console.log('Respuesta: ', commentToSave);
        quotesList.innerHTML += quoteTemplate(commentToSave);
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
      console.error(err);
      // handleError();
    }
  });
};

export default addQuoteListener;
