import icons from 'url:../../img/icons.svg';
import View from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again 😃';
  _message = '';

  // Generate an html element of the results
  _generateMarkup() {
    return this._data
      .map(result => this._generateMarkupResult(result))
      .join('');
  }

  _generateMarkupResult(result) {
    const id = window.location.hash.slice(1);
    console.log(typeof id);
    console.log(result.id);
    return `<li class="preview">
        <a class="preview__link ${
          result.id === id ? 'preview__link--active' : ''
        }" href="#${result.id}">
        <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
        </div>
        </a>
    </li>`;
  }
}

export default new ResultsView();
