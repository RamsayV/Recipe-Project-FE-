<template>
    <h1>Edit a Recipe</h1>
    <p><input v-model="recipe.title" type="text" placeholder="recipe title"><br></p>
    <p><input v-model="recipe.ingredients" type="text" placeholder="recipe ingredients"><br></p>
    <p><input v-model="recipe.instructions" type="text" placeholder="recipe instructions"><br></p>
    <p><input v-model="recipe.date" type="text" name="date" placeholder="recipe date"></p>
    <p><input v-model="recipe.contributor" type="text" placeholder="recipe author" disabled><br></p>
    <p><button v-on:click="editRecipe">Update Recipe!</button></p>
    <p><button><router-link :to="'/AllRecipes'" >Show All Recipes</router-link></button></p>
    <p><button><router-link :to="'/'" >Home</router-link></button></p>
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
        fetch(`http://localhost:4000/AllRecipes/${route.params.id}`)
            .then((response) => response.json())
            .then((result) => {
                this.recipe = result
                console.log(result);
                this.recipe.title = result.recipe.title;
                this.recipe.date = result.recipe.date
                this.recipe.ingredients = result.recipe.ingredients
                this.recipe.instructions = result.recipe.ingredients
                this.recipe.contributor = result.contributor.name
                this.recipe.id = route.params.id
                console.log(this.recipe);
            })
            .catch((error) => {
                this.error = 'Error fetching data: ' + error;
            });
    },
    methods: {
        editRecipe: function () {
            fetch(`http://localhost:4000/AllRecipes/${this.recipe.id}`, {
                method: "PUT", // Use PUT method to update the book
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