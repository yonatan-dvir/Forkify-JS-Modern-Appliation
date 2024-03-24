const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

console.log('first');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const response = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcb34'
    );
    const data = await response.json();
    // Throw an error in case of trying to fetch to unvalid url
    if (!response.ok) throw new Error(`${data.message}`);
    // Create an easy-ro-read object to the recipe we got
    let { recipe } = data.data;
    recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      ingerdeints: recipe.ingerdients,
    };
    console.log(recipe);
  } catch (err) {
    alert(err);
  }
};

showRecipe();
