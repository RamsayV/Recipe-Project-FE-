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
      data: {
        contributor:{
          name: '',
          _id: '',
        }
      },
    }),
    mounted() {
      const route = useRoute();
      fetch(`${process.env.VUE_APP_BACKEND_API}/AllContributors/${route.params.id}`)
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
  background-color: #ffebcd; /* Creamy background color */
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
}

.page-title {
  font-size: 2.5em;
  color: #ff7f50; /* Coral color */
  margin-bottom: 20px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

.profile-info {
  background-color: #ffffff; 
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1); 
  display: inline-block;
  max-width: 500px;
  width: 100%;
}

.user-name {
  font-size: 2em;
  color: #ff7f50; /* Coral color */
  margin-bottom: 10px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

.recipe-section-title {
  font-size: 1.75em;
  color: #ff7f50; /* Coral color */
  margin-top: 20px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

/* Recipe List Styles */
.recipe-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.recipe-item {
  margin: 15px 0;
}

.recipe-link {
  color: #ff7f50; /* Coral color */
  text-decoration: none;
  font-weight: bold;
  font-size: 1.25em;
  transition: color 0.3s;
}

.recipe-link:hover {
  color: #e46d45; /* Darker Coral on hover */
}
</style>