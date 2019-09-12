
import { toggleClass, renderLoader } from './ui.js';
import api from './api.js';

const templateBeer = ({ principal, beerId, name, image, description }) => `
  <a href="/beers/${beerId}">
    <div class="card ${principal ? 'principal' : 'secondary close'}">
      <header class="card-header">
        <h2>${name} <small>(${beerId})</small></h2>
      </header>
      <div class="card-content">
        <div class="card-content-image">
          <img src="${image ? image : '/src/images/default.jpg'}">
        </div>
        <div class="card-content-text">
          <p>${description}</p>
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

const renderBeersDOM = async text => {
  try {
    renderLoader('hide', 'show');
    const mainSection = document.querySelector('main');
    console.log('text :', text);
    const beers = await getBeers(text);
    console.log('Beers -> ', beers);
    renderBeers(mainSection, beers);
  } catch (err) {
    console.error('Error en renderBeersDOM', err);
  } finally {
    renderLoader('show', 'hide');
  }
};

export { renderBeersDOM };
