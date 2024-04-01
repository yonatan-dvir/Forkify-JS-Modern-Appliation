import icons from 'url:../../img/icons.svg';
import View from './View.js';

class AddRecipe extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    // Listen to the open button clicks
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    // Listen to the close button clicks
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerUpload(handler) {
    // Listen to the upload button clicks
    this._parentElement.addEventListener('submit', function (e) {
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  // Generate an html element of the pagination
  _generateMarkup() {
    return ``;
  }
}

export default new AddRecipe();
