// ui.js

// const data = [1, 2, 3, 4];

// const multiplicar = value =>
//   item => item * value;

// const multiplicarPor2 = multiplicar(2);
// const multiplicarPor5 = multiplicar(5);

// const result = data.map(multiplicarPor5);

// console.log(result);

// const logo = document.querySelector('#navbar .navbar-logo');

const loader = document.querySelector('#loader');
const detailSection = document.querySelector('#detailSection');
const header = document.querySelector('#header');

export const showQuotesForm = () => {
  detailSection.style.display = `
    <div id="detail" class="detail-content"></div>
    <div class="quotes-list">
      <h2>Quotes</h2>
      <div id="quoteList">
      </div>
    </div>
    <form id="quote-form" class="quote-form" novalidate>
      <div class="quote-input">
        <label for="quote">Quote of this beer</label>
        <input id="quote" required placeholder="Add your quote" class="input primary" type="text">
      </div>
      <button type="submit" class="button primary">Add quote</button>
    </form>
  `;
}

export const hideQuotesForm = () => { 
  detailSection.style.display = '';
}

// const displayElement = selector => display => {
//   const elemento = document.querySelector(elemento);
//   elemento.style.display = display;
// };

// const handleform = displayElement('#detailSection');

// handleform('block')

export const toggle = elemento => (removeClass, addClass) => {
  elemento.classList.remove(removeClass);
  elemento.classList.add(addClass);
};

export const toggleClass = (elemento, toggleClass) => {
  elemento.classList.toggle(toggleClass);
};

export const renderLoader = toggle(loader);

// const NOMBRE = 'nombre';

// export default NOMBRE;
// module.exports = { toggle };

// const handleLogoClassName = toggle(logo);

//setTimeout(() => handleNavBar('no-search', 'search'), 1000);

// handleLogoClassName('asd', 'test-class');
