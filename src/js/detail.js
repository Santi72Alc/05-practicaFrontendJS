import api from './api.js';

const { getBeerDetail } = api();

const detailTemplate = ({ beerId, name, image, brewersTips }) => `
  <div class="detail-section">
    <header id="${beerId}">
      <div class="title-section">
        <h1>${name}</h1>
      </div>
      <div class="image-container">
        <img src="${image ? image : '/src/images/default.png'}" />
      </div>
    </header>
    <div class="content">
      <p>${brewersTips}</p>
      <p><small>since: ${firstBrewered}</small></p>
    </div>
  </div>
`;

const renderDetail = async id => {
  try {
    const selector = document.querySelector('main');
    const beer = await getBeerDetail(id);
    selector.innerHTML = detailTemplate(beer);
  } catch (err) {
    console.error(err);
  }
};

export default renderDetail;
