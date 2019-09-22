import api, { API_URL } from './api.js';
import { quoteTemplate } from './quotesForm.js';
import { showError } from './errors.js';

// const QUOTES_API = 'https://quotes-api-keepcoding.herokuapp.com/api/v1';

const { getQuotes } = api(API_URL);

const renderQuotes = async id => {
  try {
    const quotesList = document.querySelector('#quoteList');
    const quotes = await getQuotes(id);
    const quotesElements = quotes
      .map(quoteTemplate).join('');
    // let quotesElements = '';
    // quotes.forEach( quote => {
    //   console.log(quote);
    //   quotesElements += quoteTemplate( quote );
    // });
    quotesList.innerHTML = quotesElements;
  } catch (err) {
    // console.error(err);
    showError(err, 'renderQuotes');
  }
};

export { renderQuotes };
