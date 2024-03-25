export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await response.json();
    // Throw an error in case of trying to fetch to unvalid url
    if (!response.ok) throw new Error(`${data.message}`);
    // Create an easy-ro-read object to the recipe we got
    const { recipe } = data.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    alert(err);
  }
};
