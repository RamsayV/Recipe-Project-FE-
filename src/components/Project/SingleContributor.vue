<template>
    <div class="user-profile">
      <h1 class="page-title">User Profile</h1>
      <div v-if="data.contributor" class="profile-info">
        <h2 class="user-name">{{ data.contributor.name }}</h2>
        <h3 class="recipe-section-title">Recipes by this user</h3>
        <ul class="recipe-list">
          <li v-for="recipe in data.contributor.recipes" :key="recipe._id" class="recipe-item">
            <router-link :to="`/AllRecipes/${recipe._id}`" class="recipe-link">{{ recipe.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'UserProfile',
    data: () => ({
      error: '',
      data: {},
    }),
    mounted() {
      const route = useRoute();
      fetch(`http://localhost:4000/AllContributors/${route.params.id}`)
        .then((response) => response.json())
        .then((result) => {
          this.data = result;
        })
        .catch((error) => {
          this.error = 'Error fetching data: ' + error;
        });
    },
  };
  </script>
  
  <style scoped>
  /* User Profile Styles */
  .user-profile {
    text-align: center;
    padding: 20px;
    background-color: #f5f5f5; /* Set your desired background color */
  }
  
  .page-title {
    font-size: 28px;
    color: #ff8c42; /* Set title color */
    margin-bottom: 20px;
  }
  
  .profile-info {
    background-color: #fff; /* Set profile info background color */
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  
  .user-name {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .recipe-section-title {
    font-size: 20px;
    margin-top: 20px;
  }
  
  /* Recipe List Styles */
  .recipe-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .recipe-item {
    margin: 10px 0;
  }
  
  .recipe-link {
    color: #ff8c42; /* Set link color */
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;
  }
  
  .recipe-link:hover {
    color: #ff6b0f; /* Set hover color */
  }
  </style>