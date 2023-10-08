<template>
    <div class="template-container">
    <h1>Creat A Recipe!</h1>
    <p><input v-model="recipe.title" type="text" placeholder="recipe title"><br></p>
    <p><input v-model="recipe.ingredients" type="text" placeholder="recipe ingredients"><br></p>
    <p><input v-model="recipe.instructions" type="text" placeholder="recipe instructions"><br></p>
    <p><input v-model="recipe.date" type="text" name="date" placeholder="recipe date"></p>
    <p><input v-model="recipe.contributor" type="text" placeholder="recipe contributor"><br></p>
    <p><button v-on:click="AddRecipe">Add a recipe!</button></p>
    <p><button><router-link :to="'/AllRecipes'">Show All recipes</router-link></button></p>
    <p><button><router-link :to="'/'">Home</router-link></button></p>
</div>
</template>
<script>

export default {
    name: 'AddRecipe',
    data: () => ({
        error: '',
        recipe: {
            title: '',
            ingredients: '',
            instructions: '',
            date: '',
            author: '',
        }
    }),
    methods: {
        AddRecipe: function () {
            console.log(`New recipe ${this.recipe.title} -${this.recipe.ingredients} - ${this.recipe.instructions} -  ${this.recipe.date} - ${this.recipe.contributor}`);
            fetch('http://localhost:4000/AddRecipe', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: this.recipe.title,
                    ingredients: this.recipe.ingredients,
                    instructions: this.recipe.instructions,
                    date: this.recipe.date,
                    contributor: this.recipe.contributor
                })
            })
                .then(res => {
                    console.log(res.status)
                    this.recipe.title = ''
                    this.recipe.ingredients = ''
                    this.recipe.instructions = ''
                    this.recipe.date = ''
                    this.recipe.contributor = ''
                })
        }
    }
}
</script>
<style scoped>
h1 {
  font-family: 'Georgia', serif;
  font-size: 36px;
  color: #e74c3c; /* Reddish color */
  text-align: center;
  margin-bottom: 20px;
}

/* Style input fields */
input[type="text"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #555;
}

/* Style buttons */
button {
  background-color: #f39c12; /* Orange color */
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
  background-color: #d35400; /* Darker orange color on hover */
}

/* Style router links within buttons */
router-link {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
}

/* Add hover effect to router links */
router-link:hover {
  text-decoration: underline;
}

/* Center the buttons */
p:last-child {
  text-align: center;
}

/* Style the container */
.template-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>