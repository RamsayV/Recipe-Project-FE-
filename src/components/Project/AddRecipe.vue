<template>
  <head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"></head>
  <div class="template-container">
    <h1>Create A Recipe!</h1>
    <p><input v-model="recipe.cuisine" type="text" placeholder="Recipe cuisine"><br></p>
    <p><input v-model="recipe.title" type="text" placeholder="Recipe Title"><br></p>
    <p><textarea v-model="recipe.ingredients" placeholder="Ingredients"></textarea><br></p>
    <p><textarea v-model="recipe.instructions" placeholder="Method"></textarea><br></p>
    <p><input v-model="recipe.date" type="text" name="date" placeholder=" Date"></p>
    <p><input v-model="recipe.contributor" type="text" placeholder="User Profile"><br></p>
    <p><input v-model="recipe.imageURL" type="text" placeholder="Image URL"><br></p>
    <img :src="recipe.imageURL" alt="Recipe Image">
    <div class="buttons-container">
      <button v-on:click="AddRecipe">Add a Recipe!</button>
      <router-link :to="'/AllRecipes'" class="router-link">Show All Recipes</router-link>
    </div>
  </div>
</template>

<script>
import { decodeCredential} from 'vue3-google-login';
export default {
  name: 'AddRecipe',
  data: () => ({
    error: '',
    recipe: {
      cuisine: '',
      title: '',
      ingredients: '',
      instructions: '',
      date: '',
      contributor: '',
      imageURL: '' ,
      userEmail: '',
      
    }
  }),
  mounted() {
      if (this.$cookies.isKey('user_session')) {
        this.isLoggedIn = true;
        const userData = decodeCredential(this.$cookies.get('user_session'));
        this.userName = userData.given_name;
        this.userEmail = userData.email
      }
    },
  methods: {
  AddRecipe: function () {
    

    console.log(`New recipe ${this.recipe.cuisine} - ${this.recipe.title} - ${this.recipe.ingredients} - ${this.recipe.instructions} - ${this.recipe.date} - ${this.recipe.contributor} - ${this.recipe.imageURL}`);
    
    fetch(`${process.env.VUE_APP_BACKEND_API}/AddRecipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cuisine: this.recipe.cuisine,
        title: this.recipe.title,
        ingredients: this.recipe.ingredients,
        instructions: this.recipe.instructions,
        date: this.recipe.date,
        contributor: this.recipe.contributor,
        image: this.recipe.imageURL,
        email: this.userEmail
      })
    })
    .then(res => {
      console.log(res.status)
      this.recipe.cuisine = ''
      this.recipe.title = ''
      this.recipe.ingredients = ''
      this.recipe.instructions = ''
      this.recipe.date = ''
      this.recipe.contributor = ''
      this.recipe.imageURL = ''
    })
  }
}
}

</script>
<style scoped>

body {
  background-color: #e1ab47; /* Darker cream/wheat background color */
  margin: 0; /* Remove default margin */
  font-family: 'Poppins', sans-serif; /* Consistent font family */
  color: #333; /* General text color */
}

.template-container {
  background-color: #ffebcd; /* Cream background color */
  padding: 30px;
  font-family: 'Poppins', sans-serif;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

/* Heading Style */
h1 {
  font-size: 2.5em;
  color: #ff7f50; /* Coral color */
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* Input and Textarea Styles */
input[type="text"],
textarea {
  width: calc(100% - 20px); /* Full width minus padding */
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ff7f50;
  border-radius: 5px;
  color: #333;
  font-size: 1em;
}

textarea {
  min-height: 100px; /* Set a minimum height for better user experience */
  resize: vertical; /* Enable vertical resizing */
}
.buttons-container {
  display: flex;
  justify-content: space-between; /* Evenly space the children */
  align-items: center; /* Vertically center the children */
  margin-top: 20px;
}
/* Button Style */
button {
  background-color: #ff7f50; /* Coral color */
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #e57365; /* Slightly lighter coral on hover */
  transform: translateY(-2px); /* Subtle lift on hover */
}

/* Image Style */
img {
  max-width: 100%; /* Ensure it fits */
  margin: 10px 0;
  border-radius: 5px; /* Round the corners */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

/* Router Links */
.router-link {
  background-color: #ff7f50; /* Consistent color scheme */
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none; /* Remove underlines */
  font-size: 1em;
  transition: background-color 0.3s, transform 0.3s;
}

.router-link:hover {
  background-color: #e57365; /* Lighten on hover */
  transform: translateY(-2px); /* Lift for visual feedback */
}

/* Paragraph Styling */
p {
  margin-bottom: 10px; /* Add a bit of space below paragraphs */
}
</style>