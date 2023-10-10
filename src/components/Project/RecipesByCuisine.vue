<template>
    <div class="recipes-by-cuisine">
      <h1 class="page-title">Recipes by Cuisine</h1>
  
      <!-- Display the list of cuisines as buttons or links -->
      <div class="cuisine-buttons">
        <button @click="fetchRecipesByCuisine('All')">All Cuisines</button>
        <button v-for="cuisine in cuisines" :key="cuisine" @click="fetchRecipesByCuisine(cuisine)">
          {{ cuisine }}
        </button>
      </div>
  
      <div class="recipe-list">
        <div v-for="recipe in recipes" :key="recipe._id" class="recipe-item">
          <!-- Display recipe details as needed -->
          <router-link :to="'/AllRecipes/' + recipe._id" class="recipe-link">
            <h1 class="recipe-title">{{ recipe.title }}</h1>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RecipesByCuisine',
    data: () => ({
      error: '',
      cuisines: [], // Initialize cuisines as an empty array
      recipes: [],
    }),
    mounted() {
      // Fetch the list of cuisines from the backend when the component is mounted
      fetch('http://localhost:4000/AllCuisines')
        .then((response) => response.json())
        .then((result) => {
          this.cuisines = result;
        })
        .catch((error) => {
          this.error = 'Error fetching data: ' + error;
        });
    },
    methods: {
      fetchRecipesByCuisine(cuisine) {
        // Fetch recipes by cuisine from the backend
        // You can use 'All' to fetch all recipes regardless of cuisine
        fetch(`http://localhost:4000/RecipesByCuisine/${cuisine}`)
          .then((response) => response.json())
          .then((result) => {
            this.recipes = result;
          })
          .catch((error) => {
            this.error = 'Error fetching data: ' + error;
          });
      },
    },
  };
  </script>
  