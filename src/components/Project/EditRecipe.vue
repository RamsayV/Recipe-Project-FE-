<template>
  <head><input v-model="recipe.date" type="date" name="date" placeholder="Date"></head>
    <div class="template-container">
      <h1>Edit a Recipe</h1>
      <p><input v-model="recipe.title" type="text" placeholder="Recipe Title"><br></p>
      <p><textarea v-model="recipe.ingredients" placeholder="Ingredients"></textarea><br></p>
    <p><textarea v-model="recipe.instructions" placeholder="Method"></textarea><br></p>
      <p><input v-model="recipe.date" type="text" name="date" placeholder="Date"></p>
      <p><input v-model="recipe.contributor" type="text" placeholder="User Profile" disabled><br></p>
      <div class="buttons-container">
    <button v-on:click="editRecipe">Update Recipe!</button>
    <router-link :to="'/AllRecipes'" class="router-link">Show All Recipes</router-link>
</div>
</div>
  </template>
  
  <script>
  import { useRoute } from 'vue-router'
  export default {
    name: 'EditRecipe',
    data: () => ({
      error: '',
      recipe: {
        contributor: '',
        title: '',
        ingredients: '',
        instructions: '',
        date: '',
        id: ''
      }
    }),
    mounted() {
      const route = useRoute()
      fetch(`${process.env.VUE_APP_BACKEND_API}/AllRecipes/${route.params.id}`)
        .then((response) => response.json())
        .then((result) => {
          this.recipe = result
          this.recipe.title = result.recipe.title;
          this.recipe.date = result.recipe.date
          this.recipe.ingredients = result.recipe.ingredients
          this.recipe.instructions = result.recipe.ingredients
          this.recipe.contributor = result.contributor.name
          this.recipe.id = route.params.id
        })
        .catch((error) => {
          this.error = 'Error fetching data: ' + error;
        });
    },
    methods: {
      editRecipe: function () {
        fetch(`${process.env.VUE_APP_BACKEND_API}/AllRecipes/${this.recipe.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: this.recipe.title,
            ingredients: this.recipe.ingredients,
            instructions: this.recipe.instructions,
            date: this.recipe.date
          })
        })
          .then(() => {
            this.$router.replace({ path: `/AllRecipes` })
          })
      }
    }
  }
  </script>
  
  <style scoped>
  h1, p {
  margin-bottom: 20px;
}
body {
  background-color: #e1ab47;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  color: #333;
}

.template-container {
  background-color: #ffebcd;
  padding: 30px;
  font-family: 'Poppins', sans-serif;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5em;
  color: #ff7f50;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

input[type="text"] {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ff7f50;
  border-radius: 5px;
  color: #333;
  font-size: 1em;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button, .router-link {
  background-color: #ff7f50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover, .router-link:hover {
  background-color: #e57365;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(1px);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.router-link {
  text-decoration: none;
  display: inline-block;  /* Ensures padding and dimensions are respected */
}

p {
  margin-bottom: 10px;
}
textarea {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ff7f50;
  border-radius: 5px;
  color: #333;
  font-size: 1em;
  resize: vertical;
}
button:active {
  transform: translateY(1px);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>