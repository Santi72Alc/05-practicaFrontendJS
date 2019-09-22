import api from './api.js';
import { renderQuotes } from './quotes.js';
import { showError } from './errors.js';

const { getBeerDetail } = api();

const detailTemplate = ({ beerId, name, image, description, firstBrewed, brewersTips }) => `
  <div class="detail-section">
    <header id="${beerId}">
      <div class="title-section">
        <h1>(Ref. ${beerId}) - ${name}</h1>
      </div>
      <div class="image-container">
        <img src="${image ? image : '/src/images/default.png'}" />
      </div>
      <div class="content">
        <h2>Description</h2>
        <p>${description}</p>
        <p>Brewed since: ${firstBrewed}</p>
        <br>
        <h2>Brewers tips<h2>
        <p>${brewersTips}</p>
      </div>
    </header>
  </div>
`;

const renderDetail = async id => {
  try {
    const selector = document.querySelector('main');
    const [beer] = await Promise.all( [getBeerDetail(id), renderQuotes(id)] );
    // const beer = await getBeerDetail(id);
    // await renderQuotes(id);
    selector.innerHTML = detailTemplate(beer);
  } catch (err) {
    // console.error(err);
    showError(err, 'renderDetail');
  }
};

export default renderDetail;
