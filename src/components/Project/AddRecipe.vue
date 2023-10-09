<template>
  <div class="template-container">
    <h1>Create A Recipe!</h1>
    <p><input v-model="recipe.title" type="text" placeholder="Recipe Title"><br></p>
    <p><textarea v-model="recipe.ingredients" placeholder="Ingredients"></textarea><br></p>
    <p><textarea v-model="recipe.instructions" placeholder="Method"></textarea><br></p>
    <p><input v-model="recipe.date" type="text" name="date" placeholder=" Date"></p>
    <p><input v-model="recipe.contributor" type="text" placeholder="User Profile"><br></p>
    <p><input v-model="recipe.imageURL" type="text" placeholder="Image URL"><br></p>
    <img :src="recipe.imageURL" alt="Recipe Image">
    <p><button v-on:click="AddRecipe">Add a Recipe!</button></p>
    <p><router-link :to="'/AllRecipes'" class="router-link">Show All Recipes</router-link></p>
    <p><router-link :to="'/'" class="router-link">Home</router-link></p>
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
      contributor: '',
      imageURL: '' // Add imageURL to the recipe object
    }
  }),
  methods: {
  AddRecipe: function () {
    

    console.log(`New recipe ${this.recipe.title} - ${this.recipe.ingredients} - ${this.recipe.instructions} - ${this.recipe.date} - ${this.recipe.contributor} - ${this.recipe.imageURL}`);
    
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
        contributor: this.recipe.contributor,
        image: this.recipe.imageURL
      })
    })
    .then(res => {
      console.log(res.status)
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
img {
  max-width: 100%; /* Ensure the image fits within its container */
  display: block; /* Remove default inline alignment */
  margin: 10px auto; /* Center the image horizontally with some spacing */
  border: 1px solid #ccc; /* Add a border for better separation */
  border-radius: 5px; /* Add rounded corners */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
}
textarea {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #555;
  resize: vertical; /* Allow vertical resizing */
}

/* Add focus styles for textarea */
textarea:focus {
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.7);
}
.router-link {
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
  transition: background-color 0.3s;
  background-color: #f39c12; /* Orange background color */
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

/* Add hover effect to router links */
.router-link:hover {
  background-color: #d35400; /* Darker orange color on hover */
}

</style>