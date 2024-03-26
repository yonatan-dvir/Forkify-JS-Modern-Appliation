import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // Retrieve the current hash id
    const id = window.location.hash.slice(1);
    // If there is no hash id
    if (!id) return;

    // Render the spinner while the recipe is being fetched
    recipeView.renderSpinner();

    console.log(id);
    // Else start loading the recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);

    //Rendering recipe
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
