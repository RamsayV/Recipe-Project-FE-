<template>
    <div>
      <div>
        <label for="minProtein">Minimum Protein (g):</label>
        <input type="number" v-model="minProtein" id="minProtein" />
      </div>
      <div>
        <label for="minVitaminC">Minimum Vitamin C (mg):</label>
        <input type="number" v-model="minVitaminC" id="minVitaminC" />
      </div>
      <button @click="fetchData">Find Recipes</button>
      <div v-if="isLoading">Loading...</div>
      <div v-else>
        <ul>
          <li v-for="recipe in recipes" :key="recipe.id">
            <div>
              <img :src="recipe.image" alt="Recipe Image" />
            </div>
            <div>
              <h3 @click="toggleRecipeDetails(recipe.id)">{{ recipe.title }}</h3>
              <transition name="fade">
                <div v-if="recipe.showDetails">
                  <h4>Ingredients:</h4>
                  <ul>
                    <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
                  </ul>
                  <h4>Instructions:</h4>
                  <p>{{ recipe.instructions }}</p>
                </div>
              </transition>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        recipes: [],
        isLoading: false,
        minProtein: 0,
        minVitaminC: 0,
      };
    },
    methods: {
      async fetchData() {
        this.isLoading = true;
        const url = this.buildApiUrl();
        const headers = {
          'X-RapidAPI-Key': '8f8641a7c6msh0e089e319a502cep174f40jsn27b4a9b3976c',
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        };
  
        try {
          const response = await fetch(url, { method: 'GET', headers });
          const result = await response.json();
          this.recipes = result.map((recipe) => ({
            ...recipe,
            showDetails: false, // Initially, recipe details are hidden
            ingredients: [],    // Store ingredients
            instructions: '',   // Store instructions
          }));
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      },
      buildApiUrl() {
        const baseUrl =
          'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients?limitLicense=false';
  
        const queryParams = [
          `minProtein=${this.minProtein}`,
          `minVitaminC=${this.minVitaminC}`,
        ];
  
        return `${baseUrl}&${queryParams.join('&')}`;
      },
      async toggleRecipeDetails(recipeId) {
        const recipe = this.recipes.find((r) => r.id === recipeId);
        if (recipe) {
          if (!recipe.showDetails) {
            // Fetch detailed recipe information when details are not shown
            const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`;
            const headers = {
              'X-RapidAPI-Key': '8f8641a7c6msh0e089e319a502cep174f40jsn27b4a9b3976c',
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            };
  
            try {
              const response = await fetch(url, { method: 'GET', headers });
              const result = await response.json();
              recipe.ingredients = result.extendedIngredients.map((ingredient) => ingredient.original);
              recipe.instructions = result.instructions;
            } catch (error) {
              console.error(error);
            }
          }
  
          // Toggle the display of recipe details
          recipe.showDetails = !recipe.showDetails;
        }
      },
    },
  };
  </script>
  
  <style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  