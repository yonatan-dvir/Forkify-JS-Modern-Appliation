import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';
import Fraction from 'fractional';
import View from './View.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  addHandlerRender(handler) {
    // Listen to both load and hashchange and call controlRecipes when one of them occurs
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  // Listen to the servings buttons clicks
  addHandlerRenderUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      console.log(btn);
      if (!btn) return;

      const updateTo = +btn.dataset.servings;
      if (updateTo > 0) {
        handler(updateTo);
      }
    });
  }

  // Listen to the bookmark button clicks
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      console.log('ffojno');
      handler();
    });
  }

  // Generate an html element of the recipe content
  _generateMarkup() {
    const currentServings = this._data.servings;
    return `
      <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button data-servings=${
            currentServings - 1
          } class="btn--tiny btn--update-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button data-servings=${
            currentServings + 1
          } class="btn--tiny btn--update-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${this._data.ingredients
          .map(ingredient => this._generateMarkupIngredient(ingredient))
          .join('')}
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">1000</div>
          <div class="recipe__description">
            <span class="recipe__unit">g</span>
            pasta
          </div>
        </li>

        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">0.5</div>
          <div class="recipe__description">
            <span class="recipe__unit">cup</span>
            ricotta cheese
          </div>
        </li>
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;
  }

  _generateMarkupIngredient(ingredient) {
    return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ingredient.quantity
        ? new Fraction.Fraction(ingredient.quantity).toString()
        : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ingredient.unit}</span>
      ${ingredient.description}
    </div>
  </li>`;
  }
}

export default new RecipeView();
