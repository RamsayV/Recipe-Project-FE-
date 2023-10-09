<template>
  <div class="recipe-card">
    <h1 class="page-title">Recipe</h1>
    <div class="recipe-details">
      <h1 class="recipe-title">{{ recipes?.recipe?.title }}</h1>
      <p class="recipe-ingredients">{{ recipes?.recipe?.ingredients }}</p>
      <p class="recipe-instructions">{{ recipes?.recipe?.instructions }}</p>
      <img class="recipe-image" :src="recipes?.contributor?.recipes[0]?.image" alt="Recipe Image">
      <router-link :to="'/AllContributors/' + recipes?.contributor?._id" class="contributor-link">
        <h1 class="contributor-name">{{ recipes?.contributor?.name }}</h1>
      </router-link>
    </div>
    <div class="recipe-actions">
      <button @click="deleteRecipe" class="btn btn-danger">Delete Recipe</button>
      <router-link :to="`/recipe/edit/${id}`" class="edit-link">
        <button class="btn btn-primary">Edit Recipe</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  name: 'SingleRecipe',
  data: () => ({
    error: '',
    recipes: {},
    id: '',
    
  }),
  mounted() {
    const route = useRoute();
    fetch(`http://localhost:4000/AllRecipes/${route.params.id}`)
      .then((response) => response.json())
      .then((result) => {
        this.recipes = result;
        // this.image = result.recipes.image 
        console.log(result.contributor.recipes[0].image );
        this.id = route.params.id;
        console.log(result);
      })
      .catch((error) => {
        this.error = 'Error fetching data: ' + error;
      });
  },
  methods: {
    deleteRecipe: function () {
      console.log(this.id);
      fetch(`http://localhost:4000/AllRecipes/${this.id}`, {
        method: "DELETE"
      })
        .then(() => {
          this.$router.replace({ name: 'AllRecipes' });
        });
    }
  }
};
</script>

<style scoped>
/* Recipe Card Styles */
.recipe-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  /* Set your desired background color */
  padding: 20px;
}

.page-title {
  font-size: 28px;
  color: #ff8c42;
  /* Set title color */
  margin-bottom: 20px;
}

.recipe-details {
  background-color: #f5f5f5;
  /* Set recipe details background color */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
}

.recipe-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.recipe-ingredients {
  font-size: 16px;
  margin-bottom: 10px;
}

.recipe-instructions {
  font-size: 16px;
  margin-bottom: 10px;
}

.recipe-date {
  font-size: 14px;
  color: #888;
}

.contributor-link {
  text-decoration: none;
}

.contributor-name {
  font-size: 18px;
  color: #ff8c42;
  /* Set contributor name color */
}

.recipe-actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 10px;
}

.btn-primary {
  background-color: #ff8c42;
  /* Set primary button background color */
  color: #fff;
  /* Set primary button text color */
}

.btn-danger {
  background-color: #ff6b0f;
  /* Set danger button background color */
  color: #fff;
  /* Set danger button text color */
}

.recipe-image {
  max-width: 100%;
  /* Ensure the image fits within its container */
  border-radius: 5px;
  /* Add rounded corners */
  margin-top: 20px;
  /* Add spacing above the image */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  /* Add a subtle shadow */
}</style>