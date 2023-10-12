<template>
    <div class="home-page">
      <h1>HomePage</h1>
      <ul class="button-list">
        <li>
          <button><router-link :to="'/login'" class="router-link">Login</router-link></button>
        </li>
        <li>
          <button><router-link :to="'/AllRecipes'" class="router-link">Recipes</router-link></button>
        </li>
        <li>
          <button><router-link :to="'/AllContributors'" class="router-link">User Profiles</router-link></button>
        </li>
        <li>
          <button><router-link :to="'/addrecipe'" class="router-link">Add Recipe</router-link></button>
        </li>
        <li>
          <button><router-link :to="'/recipecreator'" class="router-link">What's in your Fridge?</router-link></button>
        </li>
        <li>
          <button><router-link :to="'/MealPlanApi'" class="router-link">Customize Your Weekly Meal Plans!</router-link></button>
        </li>
      </ul>
    </div>
  </template>
  <script>
  export default {
    name: 'HomePage',
    data: () => ({
      error: '',
    }),
  }
  </script>
  <style scoped>
  .home-page {
    font-family: 'Arial', sans-serif;
    background-color: #f9f5ed;
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    font-size: 32px;
    color: #5c2d91;
    margin-bottom: 20px;
  }
  
  /* Style the navigation buttons */
  button {
    background-color: #f39c12;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin: 10px;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #d35400;
  }
  
  /* Style the router links within buttons */
  .router-link {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
  }
  
  /* Add hover effect to router links */
  .router-link:hover {
    text-decoration: underline;
  }
  
  /* Style the button containers (paragraphs) */
  p {
    text-align: center;
  }
  .button-list {
  list-style-type: none; /* Remove bullet points */
  padding: 0; /* Remove default padding */
}

.button-list li {
  margin: 10px; /* Add spacing between list items */
}
  </style>