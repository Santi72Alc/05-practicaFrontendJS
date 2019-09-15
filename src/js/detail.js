import api from './api.js';
import { renderQuotes } from './quotes.js';

const { getBeerDetail } = api();

const detailTemplate = ({ beerId, name, image, description, firstBrewed }) => `
  <div class="detail-section">
    <header id="${beerId}">
      <div class="title-section">
        <h1>(Ref. ${beerId} - ${name}</h1>
      </div>
      <div class="image-container">
        <img src="${image ? image : '/src/images/default.png'}" />
      </div>
    </header>
    <div class="content">
      <p>${description}</p>
      <p><i>Brewed since: ${firstBrewed}</i></p>
    </div>
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
    console.error(err);
  }
};

export default renderDetail;
