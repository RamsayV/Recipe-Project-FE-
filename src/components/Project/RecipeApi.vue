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
    <div>
      <ul v-if="recipes.length > 0">
        <li v-for="recipe in recipes" :key="recipe.id">
          <h2 @click="fetchRecipeInformation(recipe.id)">{{ recipe.title }}</h2>
          <div>
            <img :src="recipe.image" alt="Recipe Image" />
          </div>
          <p>Ingredients you have: {{ recipe.usedIngredientCount }}</p>
          <p>Ingredients you need to buy: {{ recipe.missedIngredientCount }}</p>
        </li>
      </ul>
      <p v-else class="no-recipes">No recipes found.</p>
    </div>
    <div v-if="selectedRecipe" class="selected-recipe">
      <h2>{{ selectedRecipe.title }}</h2>
      <p><strong>Ingredients:</strong></p>
      <ul>
        <li v-for="step in selectedRecipe.analyzedInstructions[0].steps" :key="step.number">
          {{ step.step }}
          <ul class="ingredient-list">
            <li v-for="ingredient in step.ingredients" :key="ingredient.id">
              {{ ingredient.name }}
            </li>
          </ul>
        </li>
      </ul>
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
/* Page & Component Container */
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Input & Form Styles */
label,
input,
button {
  font-size: 1em;
  margin-bottom: 10px;
}

input {
  background-color: #f8f8f8; 
  border: 1px solid #ff7f50; 
  border-radius: 5px;
  padding: 8px 12px;
  color: #333;
  width: 200px;
}

button {
  background-color: #ff7f50; 
  border: none;
  border-radius: 5px;
  color: #fff; 
  padding: 10px 20px;
  cursor: pointer;
}

/* List & Item Styles */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

/* Image Styles */
img {
  max-width: 100%;
  border-radius: 5px;
}

/* Heading & Text Styles */
h1,
h2,
h3,
h4 {
  color: #ff7f50; 
  margin-bottom: 10px;
}

p {
  color: #555;
  margin: 5px 0;
}

/* Instructions & Ingredients in a unified format */
li span.ingredient {
  color: #ff7f50; 
  font-style: italic;
}

li span.instruction {
  color: #555;
}

/* Selected Recipe Styles */
div.selected-recipe {
  background-color: #f8f8f8; 
  border: 1px solid #ff7f50; 
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  width: 80%;
  max-width: 600px;
}

.selected-recipe h2 {
  font-size: 1.5em;
  border-bottom: 2px solid #ff7f50;
  padding-bottom: 10px;
}

.selected-recipe p {
  margin: 15px 0;
}

.selected-recipe ul {
  margin-left: 20px;
}

.selected-recipe li {
  margin-bottom: 10px;
}

.selected-recipe ul ul li {
  color: #ff7f50;
  font-style: italic;
}
</style>