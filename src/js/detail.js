import api from './api.js';

const { getShowDetail } = api();

const detailTemplate = ({ id, name, image, summary }) => `
  <div class="detail-section">
    <header id="${id}">
      <div class="title-section">
        <h1>${name}</h1>
      </div>
      <div class="image-container">
        <img src="${image ? image.original : '/src/images/defaultImage.png'}" />
      </div>
    </header>
    <div class="content">
      ${summary}
    </div>
  </div>
`;

const renderDetail = async id => {
  try {
    const selector = document.querySelector('main');
    const show = await getShowDetail(id);
    selector.innerHTML = detailTemplate(show);
  } catch (err) {
    console.error(err);
  }
};

export default renderDetail;
