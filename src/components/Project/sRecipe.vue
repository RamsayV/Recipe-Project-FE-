<template>
    <head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"></head>
      <div class="recipe-card">
      <h1 class="page-title">Recipe</h1>
      <div class="recipe-details">
        <h1 class="recipe-title">{{ recipes?.recipe?.title }}</h1>
        <div class="recipe-ingredients">
          <h2>Ingredients:</h2>
          <ul>
            <li v-for="(ingredient, index) in splitIngredients" :key="index">
              {{ ingredient }}
            </li>
          </ul>
        </div>
        <div class="recipe-instructions">
          <h2>Instructions:</h2>
          <ol>
            <li v-for="(instruction, index) in splitInstructions" :key="index">
              {{ instruction }}
            </li>
          </ol>
        </div>
        <img class="recipe-image" :src="recipes?.contributor?.recipes[0]?.image" alt="Recipe Image">
        <router-link :to="'/AllContributors/' + recipes?.contributor?._id" class="contributor-link">
          <h1 class="contributor-name">{{ recipes?.contributor?.name }}</h1>
        </router-link>
      </div>
      <div class="button-container">
      <div v-if="recipes?.recipe?.user === userEmail" class="recipe-actions">
        <button @click="deleteRecipe" class="common-btn btn-danger">Delete Recipe</button>
        <router-link :to="`/recipe/edit/${id}`" class="edit-link">
          <button class="common-btn btn-primary">Edit Recipe</button>
        </router-link>
        <router-link :to="`/AllRecipes/:id/addreview`" class="review-link">
          <button class="btn btn-primary">Review Recipe</button>
        </router-link>
      </div>
    </div>
</div>
</template>
<script>
import { useRoute } from 'vue-router';
import { decodeCredential } from 'vue3-google-login';
export default {
  name: 'SingleRecipe',
  data: () => ({
    error: '',
    recipes: {},
    id: '',
    userName: '',
    userEmail: '',
  }),
  computed: {
    splitInstructions() {
      const instructions = this.recipes?.recipe?.instructions || '';
      return instructions.split(/\d+\./).filter(item => item.trim() !== '');
    },
    splitIngredients() {
      const ingredients = this.recipes?.recipe?.ingredients || '';
      return ingredients.split('\n').filter(item => item.trim() !== '');
    }
  },
  mounted() {
    if (this.$cookies.isKey('user_session')) {
      this.isLoggedIn = true;
      const userData = decodeCredential(this.$cookies.get('user_session'));
      this.userName = userData.given_name;
      this.userEmail = userData.email;
    }
    const route = useRoute();
    if (this.$cookies.isKey('user_session')) {
      this.isLoggedIn = true;
      const userData = decodeCredential(this.$cookies.get('user_session'));
      this.userName = userData.given_name;
      this.userEmail = userData.email
    }
    console.log(route.params.id);
    fetch(`${VUE_APP_BACKEND_API}/AllRecipes/${route.params.id}`)
      .then((response) => response.json())
      // console.log('something');})
      .then((result) => {
        this.recipes = result;
        this.id = route.params.id;
    })
      .catch((error) => {
        this.error = 'Error fetching data: ' + error;
        console.log(this.error);
      });
  },
  methods: {
    deleteRecipe: function () {
      fetch(`${VUE_APP_BACKEND_API}/AllRecipes/${this.id}`, {
        method: "DELETE"
      })
        .then(() => {
          this.$router.replace({ name: 'AllRecipes' });
        });
    },
    share: function () {
      if (navigator.share) {
        navigator.share({
          text: "Checkout this recipe! It's perfect for us.",
          url: '',
          title: 'Recipe Real'
        });
      } else {
        navigator.clipboard.writeText('url');

    }
    }
  }
}
</script>

<style scoped>
/* General Styles */
body {
  margin: 0;
  font-family: 'Arial', sans-serif; /* Readable font selection */
}
h1 {
  font-family: 'Poppins', sans-serif;  /* Recommended: Import Google Fonts */
  font-size: 2.5em;
  color: #2c3e50;  /* Dark slate color for elegance */
  font-weight: 600;  /* Semi-bold weight for a modern look */
  letter-spacing: 1px;  /* Slight spacing between letters */
  text-transform: uppercase;  /* Capitalizing text for a structured appearance */
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);  /* Subtle shadow for depth */
}

/* Full Page Recipe Card */
.recipe-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:  #ffebcd;
  padding: 20px;
  border-radius: 0; /* Full width means no visible border-radius */
  margin: 0; /* No margin for full-width */
  min-height: 100vh; /* Full viewport height */
}

.page-title {
  color: #e67e22;  /* Giving a distinct color for page title */
  margin-bottom: 15px;
}

/* Recipe Details Styling */
.recipe-details {
  width: 100%; /* Utilize full width */
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  text-align: left;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recipe-title,
.contributor-name {
  font-size: 26px;
  font-weight: bold;
  color: #333;
}

.recipe-ingredients,
.recipe-instructions {
  font-size: 18px;
  margin-bottom: 20px;
  color: #444;
}

.recipe-ingredients ul,
.recipe-instructions ol {
  margin-left: 20px;
  padding-left: 0;
  color: #555;
}

/* Contributor Styling */
.contributor-link {
  text-decoration: none;
}

.contributor-name {
  color: #ff8c42;
}

/* Button Styling */
.button-container {
  display: flex;
  justify-content: center; /* Ensure everything is centered */
  align-items: center;
  width: 100%;
}

.recipe-actions {
  display: flex;
  justify-content: space-between; /* Evenly space-out buttons */
  align-items: center;
  width: 50%; /* Adjust width to your preference */
}

.common-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 10px;
  
}

.btn-primary {
  background-color: #e63400;
  color: #fff;
}

.btn-primary:hover {
  background-color: #ff6b0f;
}

.btn-danger {
  background-color: #e63400;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c62900;
}

/* Image Styling */
.recipe-image {
  max-width: 100%;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>