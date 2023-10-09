<template>
    <div>
      <h1>Recipe Builder</h1>
      <form @submit.prevent="searchRecipes">
        <label for="ingredients">Enter Ingredients:</label>
        <input type="text" id="ingredients" v-model="ingredientInput" />
        <button type="submit">Search Recipes</button>
      </form>
      <!-- Display recipes here -->
    </div>
    <div>
    <ul v-if="recipes.length > 0">
      <li v-for="recipe in recipes" :key="recipe.id">
        <h2>{{ recipe.title }}</h2>
        <img :src="recipe.image"  alt="Recipe Image" >
        <p>Ingredients you have: {{ recipe.usedIngredientCount}}</p>
        <p> Ingredients you need to buy: {{ recipe.missedIngredientCount }}</p>
      </li>
    </ul>
    <p v-else>No recipes found.</p>
  </div>
  </template>
  <script>
  export default {
    data() {
      return {
        ingredientInput: '',
        recipes: [],
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
    },
  };
  </script>
  