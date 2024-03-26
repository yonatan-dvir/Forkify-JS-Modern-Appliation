import icons from 'url:../../img/icons.svg';
import View from './View.js';

class searchView extends View {
  _parentElement = document.querySelector('.search__field');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  // Returns the search query
  getQuery() {
    const query = this._parentElement.value;
    this._clearInput();
    return query;
  }

  // Clear the search input
  _clearInput() {
    this._parentElement.value = '';
  }

  addHandlerRender(handler) {
    // Listen to the search button clicks
    document.querySelector('.search__btn').addEventListener('click', handler);
  }
}

export default new searchView();
