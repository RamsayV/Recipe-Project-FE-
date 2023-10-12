<template>
  <div class="recipe-builder-container">
    <h1 class="page-title">Recipe Builder</h1>
    <div class="recipe-form-container">
      <form @submit.prevent="searchRecipes" class="recipe-form">
        <label for="ingredients" class="form-label">Enter Ingredients:</label>
        <input type="text" id="ingredients" v-model="ingredientInput" class="form-input" />
        <button type="submit" class="form-button">Search Recipes</button>
      </form>
    </div>
    <div class="recipe-list-container">
      <ul v-if="recipes.length > 0" class="recipe-list">
        <li v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
          <h2 @click="fetchRecipeInformation(recipe.id)" class="recipe-title">{{ recipe.title }}</h2>
          <img :src="recipe.image" alt="Recipe Image" class="recipe-image">
          <p class="recipe-ingredient-count">Ingredients you have: {{ recipe.usedIngredientCount }}</p>
          <p class="recipe-ingredient-count">Ingredients you need to buy: {{ recipe.missedIngredientCount }}</p>
        </li>
      </ul>
      <p v-else class="no-recipes">No recipes found.</p>
    </div>
    <div v-if="selectedRecipe" class="selected-recipe-container">
      <h2 class="selected-recipe-title">{{ selectedRecipe.title }}</h2>
      <p class="selected-recipe-instructions">Instructions:</p>
      <p class="selected-recipe-instructions">{{ selectedRecipe.instructions }}</p>
      <p class="selected-recipe-instructions">Ingredients:</p>
      <ul v-if="selectedRecipe.analyzedInstructions && selectedRecipe.analyzedInstructions.length > 0"
        class="selected-recipe-ingredients">
        <li v-for="step in selectedRecipe.analyzedInstructions[0].steps" :key="step.number">
          {{ step.step }}
          <ul class="ingredient-list">
            <li v-for="ingredient in step.ingredients" :key="ingredient.id">
              {{ ingredient.name }}
            </li>
          </ul>
        </li>
      </ul>
      <p v-else>No analyzed instructions available for this recipe.</p>
    </div>
    <div v-else>
      <p>No recipe selected.</p>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      ingredientInput: '',
      recipes: [],
      selectedRecipe: null,
    };
  },
  methods: {
    async searchRecipes() {
      const apiUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${encodeURIComponent(this.ingredientInput)}&number=5&ignorePantry=true&ranking=1`;

      const headers = {
        'X-RapidAPI-Key': '8f8641a7c6msh0e089e319a502cep174f40jsn27b4a9b3976c',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      };

      try {
        const response = await fetch(apiUrl, { method: 'GET', headers });
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const result = await response.json();
        this.recipes = result;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchRecipeInformation(recipeId) {
      const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '8f8641a7c6msh0e089e319a502cep174f40jsn27b4a9b3976c',
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const result = await response.json();
        this.selectedRecipe = result; // Assign the detailed recipe information
      } catch (error) {
        console.error(error);
      }
    },
  }
}
</script>
<style scoped>
/* Recipe Builder Page Styles */
.recipe-builder-container {
  text-align: center;
  padding: 20px;
  background-color: #f8f8f8;
}

.page-title {
  font-size: 36px;
  color: #ff8c42;
  margin-bottom: 20px;
}

.recipe-form-container {
  margin: 20px 0;
}

.form-label {
  font-size: 16px;
  color: #333;
}

.form-input {
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

.form-button {
  font-size: 16px;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ff8c42;
  color: #fff;
  cursor: pointer;
}

.recipe-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.recipe-list {
  list-style: none;
  padding: 0;
}

.recipe-item {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  transition: transform 0.2s;
  margin: 10px;
  width: 300px;
  text-align: left;
}

.recipe-item:hover {
  transform: translateY(-5px);
}

.recipe-title {
  font-size: 24px;
  color: #333;
  cursor: pointer;
}

.recipe-image {
  max-height: 200px;
  border-radius: 5px;
  overflow: hidden;
}

.recipe-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-ingredient-count {
  font-size: 16px;
  color: #888;
  margin-top: 10px;
}

.no-recipes {
  font-size: 16px;
  color: #888;
}

.selected-recipe-container {
  text-align: left;
}

.selected-recipe-title {
  font-size: 28px;
  color: #333;
  margin-top: 20px;
}

.selected-recipe-instructions {
  font-size: 20px;
  color: #333;
  margin-top: 10px;
}

.selected-recipe-ingredients {
  list-style: none;
  padding: 0;
}

.ingredient-list {
  list-style: disc;
  margin-left: 20px;
  font-size: 16px;
  color: #555;
}
</style>