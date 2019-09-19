// beers.js
import { toggleClass, renderLoader } from './ui.js';
import api from './api.js';

const templateBeer = ({ principal, beerId, name, image, description,  brewersTips, firstBrewed }) => `
  <a href="/beers/${beerId}">
    <div class="card ${principal ? 'principal' : 'secondary close'}">
      <header class="card-header">
        <h2>(Ref. ${beerId}) - ${name}</h2>
      </header>
      <div class="card-content">
        <div class="card-content-image">
          <img src="${image ? image : '/src/images/default.jpg'}">
        </div>
        <div class="card-content-text">
          <p><em>* Description</em><br>
          ${description}</p>
          <p>First Brewed: ${firstBrewed}</p>
          <hr>
          <p><em>* Brewers tips</em><br>
          ${brewersTips}</p>
        </div>
      </div>
    </div>
  </a>
`;


const renderBeers = (element, beers) => {
  const htmlBeers = beers.slice(0, 10).map((beer, index) => {
    // if (index < 1) {
    //   return templateBeer({ ...beer, principal: true });
    // }
    return templateBeer({ ...beer, principal: false });
  }).join('');
  element.innerHTML = `
    <div class="show-section">
      ${htmlBeers}
    </div>
  `;
  // codigo para manejar los header
  const headers = document.querySelectorAll('.card.secondary .card-header');
  headers.forEach(header => {
    const element = header.parentNode;
    header.addEventListener('click', evt => {
      evt.preventDefault();
      toggleClass(element, 'close');
    });
  });
};

const { getBeers } = api();

const renderBeersDOM = async (searchText, searchDate) => {
  try {
    renderLoader('hide', 'show');
    const mainSection = document.querySelector('main');
    // Text and date filter
    const beers = await getBeers(searchText, searchDate);
    // render beers
    renderBeers(mainSection, beers);
  } catch (err) {
    console.error('Error en renderBeersDOM', err);
  } finally {
    renderLoader('show', 'hide');
  }
};

export { renderBeersDOM };
