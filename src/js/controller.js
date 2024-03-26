import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    // Retrieve the current hash id
    const id = window.location.hash.slice(1);
    console.log(id);

    // If there is no hash id
    if (!id) return;

    // Render the spinner while the recipe is being fetched
    recipeView.renderSpinner();

    // Loading the recipe
    await model.loadRecipe(id);

    // Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // Retrieve the query from the search box
    const query = searchView.getQuery();
    console.log(query);

    // If there is search input id
    if (!query) return;

    // Render the spinner while the search result is being fetched
    resultsView.renderSpinner();

    // Loading the results
    await model.loadSearchResults(query);

    // Rendering the results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
    searchView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerRender(controlSearchResults);
};

init();
