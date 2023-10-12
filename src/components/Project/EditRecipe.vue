<template>
  <div class="recipe-edit">
    <h1>Edit a Recipe</h1>
    <p><input v-model="recipe.title" type="text" placeholder="Recipe Title"><br></p>
    <p><input v-model="recipe.ingredients" type="text" placeholder="Recipe Ingredients"><br></p>
    <p><input v-model="recipe.instructions" type="text" placeholder="Recipe Instructions"><br></p>
    <p><input v-model="recipe.date" type="text" name="date" placeholder="Recipe Date"></p>
    <p><input v-model="recipe.contributor" type="text" placeholder="Recipe Author" disabled><br></p>
    <p><button v-on:click="editRecipe">Update Recipe!</button></p>
    <p><router-link :to="'/AllRecipes'" class="router-link">Show All Recipes</router-link></p>
    <p><router-link :to="'/'" class="router-link">Home</router-link></p>
  </div>
</template>
  
<script>
import { useRoute } from 'vue-router'
export default {
  name: 'EditRecipe',
  data: () => ({
    error: '',
    id: '',
    recipe: {
      contributor: '',
      title: '',
      ingredients: '',
      instructions: '',
      date: '',
      // id: ''
    }
  }),
  mounted() {
    const route = useRoute()
    this.id = route.params.id
    fetch(`http://localhost:4000/AllRecipes/${route.params.id}`)
      .then((response) => response.json())
      .then((result) => {
        this.recipe = result
        this.recipe.title = result.recipe.title
        this.recipe.date = result.recipe.date
        this.recipe.ingredients = result.recipe.ingredients
        this.recipe.instructions = result.recipe.instructions
        this.recipe.contributor = result.contributor.name
        // this.recipe.id = route.params.id
      })
      .catch((error) => {
        this.error = 'Error fetching data: ' + error
      })
  },
  methods: {
    editRecipe: function () {
      fetch(`http://localhost:4000/AllRecipes/${this.id}`, {
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
.recipe-edit {
  font-family: 'Georgia', serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 36px;
  color: #e74c3c;
  text-align: center;
  margin-bottom: 20px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #555;
}

button {
  background-color: #f39c12;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #d35400;
}

p:last-child {
  text-align: center;
}

.router-link {
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
  transition: background-color 0.3s;
  background-color: #f39c12;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 10px;
  transition: background-color 0.3s;
  display: inline-block;
  margin-right: 10px;
}

.router-link:hover {
  background-color: #d35400;
}
</style>