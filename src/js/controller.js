import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import AddRecipe from './views/addRecipe.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import bookmarksView from './views/bookmarksView.js';
import addRecipe from './views/addRecipe.js';

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

    // Update the bookmarks view to mark selected result
    bookmarksView.update(model.state.bookmarks);

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
  // Add or remove a bookmark
  if (!model.state.recipe.bookmarked) {
    // Update the recipe bookmark
    model.addBookmark(model.state.recipe);
  } else if (model.state.recipe.bookmarked) {
    console.log(model.state.recipe.bookmarked);
    // Update the recipe bookmark
    model.deleteBookmark(model.state.recipe.id);
  }

  // Update the recipe view with the bookmark icon filled/not filled
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
  } catch (err) {
    addRecipe.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerRenderUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipe._addHandlerUpload(controlAddRecipe);
};

init();
