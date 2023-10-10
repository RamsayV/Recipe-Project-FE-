<template>
    <div class="recipes-container">
      <h1 class="page-title">Recipes</h1>
      <div>
        <label for="cuisinefilter"> Filter By Cuisine</label>
        <select id="cuisinefilter" v-model="selectedcuisine">
        <option value="">All Cuisines</option>
        <option v-for="cuisine in uniquecuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
        </select>
        <div v-for="recipe in filteredrecipes" :key="recipe.id">
        <h3>{{ recipe.title }}</h3>
        </div>
      </div>
      <div class="recipe-list">
        <div v-for="recipe in recipes" :key="recipe._id" class="recipe-item">
          <router-link :to="'/AllRecipes/' + recipe._id" class="recipe-link">
            <h1 class="recipe-title">{{ recipe.title}}</h1>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AllRecipes',
    data: () => ({
      error: '',
      recipes: [],
      selectedcuisine: ''
    }),
    mounted() {
      fetch('http://localhost:4000/Allrecipes')
        .then((response) => response.json())
        .then((result) => {
          this.recipes = result;
        })
        .catch((error) => {
          this.error = 'Error fetching data: ' + error;
        });
    },
    computed: {
      uniquecuisines(){
        return Array.from(new Set(this.recipes.map(recipe => recipe.cuisine)))
      },
      filteredrecipes(){
        if(this.selectedcuisine){
          return this.recipes.filter(recipe => recipe.cuisine === this.selectedcuisine)
        }else{
          return this.recipes
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Recipes Page Styles */
  .recipes-container {
    text-align: center;
    padding: 20px;
    background-color: #fff; /* Set your desired background color */
  }
  
  .page-title {
    font-size: 28px;
    color: #ff8c42; /* Set title color */
    margin-bottom: 20px;
  }
  
  .recipe-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two columns for recipes */
    grid-gap: 20px;
  }
  
  .recipe-item {
    background-color: #f5f5f5; /* Set recipe item background color */
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 10px;
    transition: transform 0.2s;
  }
  
  .recipe-item:hover {
    transform: translateY(-5px); /* Add a slight hover effect */
  }
  
  .recipe-link {
    text-decoration: none;
    color: #ff8c42; /* Set link color */
  }
  
  .recipe-title {
    font-size: 20px;
    margin-top: 10px;
  }
  
  /* Styles that consider NavVue */
  .mainView {
    background-color: #fff; /* Set background color of the main navigation */
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  </style>