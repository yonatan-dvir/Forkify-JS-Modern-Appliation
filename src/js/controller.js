import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlRecipes = async function () {
  try {
    // Retrieve the current hash id
    const id = window.location.hash.slice(1);

    // If there is no hash id
    if (!id) return;

    // Render the spinner while the recipe is being fetched
    recipeView.renderSpinner();

    // Update the results view to mark selected result
    resultsView.update(model.getSearchResultsPage(1));

    // Loading the recipe
    await model.loadRecipe(id);

    // Rendering the recipe
    recipeView.render(model.state.recipe);

    console.log(model.state.recipe);
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
    resultsView.render(model.getSearchResultsPage(1));

    // Rendering the initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    searchView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // Rendering the new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Rendering the new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (currentServings) {
  // Update the recipe servings
  model.updateServings(currentServings);
  // Render the recipe with the new values
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Update the recipe bookmark
  model.addBookmark(model.state.recipe);
  // Render the recipe with the new bookmark filled
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerRenderUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
};

init();
