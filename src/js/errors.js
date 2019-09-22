//  errors.js


const templateError = (error, ...locateError) => `
<div>
  <h2>Error en Beer now</h2>
  <p>Error in : ${locateError}<br><em>${error.name}: ${error.message}</em></p>
  <br>
  <p>Press on the title to main page!!</p>
</div>
`

export const showError = (error, ...localteError) => {
  const mainArea = document.querySelector('main');
  mainArea.innerHTML = templateError(error, ...localteError);
}