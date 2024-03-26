import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  // Clear the previous content and then render the recipe
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    this._clear();
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // clear the parentElement innerHTML
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // Render a spinner while ther page is loading
  renderSpinner() {
    this._clear();
    const markup = `<div class="spinner">
        <svg>
            <use href="${icons}#icon-loader"></use>
        </svg>
        </div>`;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Render an error message
  renderError(message = this._errorMessage) {
    this._clear();
    const markup = `<div class="error">
        <div>
        <svg>
            <use href="${icons}_icon-alert-triangle"></use>
        </svg>
        </div>
        <p>${message}</p>
    </div>`;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Render a message
  renderMessage(message = this._message) {
    this._clear();
    const markup = `<div class="error">
        <div>
        <svg>
            <use href="${icons}_icon-smile"></use>
        </svg>
        </div>
        <p>${message}</p>
    </div>`;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
