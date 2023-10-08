<template>
    <div class="recipes-container">
      <h1 class="page-title">Recipes</h1>
      <div class="recipe-list">
        <div v-for="recipe in recipes" :key="recipe._id" class="recipe-item">
          <router-link :to="'/AllRecipes/' + recipe._id" class="recipe-link">
            <h1 class="recipe-title">{{ recipe.title }}</h1>
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