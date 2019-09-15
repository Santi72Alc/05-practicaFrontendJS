// routes.js
import { renderBeersDOM } from './beers.js';
import { hideFilter, showFilter } from './navbar.js';
import { showQuotesForm, hideQuotesForm } from './ui.js';
import renderDetail from './detail.js';
import addQuoteListener from './quotesForm.js';

// main page
page('/', () => {
  console.log('Home page');
  showFilter();
  hideQuotesForm();
  renderBeersDOM();
});

// detail page
page('/beers/:beerId', ctx => {
  console.log('Detail');
  const { params: { beerId } } = ctx;
  hideFilter();
  showQuotesForm();
  renderDetail(beerId);
  addQuoteListener(beerId);
});

page();
