<template>
    <h1>HomePage</h1>
    <p><button><router-link :to="'/login'">Login</router-link></button></p>
    <p><button><router-link :to="'/AllRecipes'">Recipes</router-link></button></p>
    <p><button><router-link :to="'/AllContributors'">User Profiles</router-link></button></p>
    <p><button><router-link :to="'/addrecipe'">Add Recipe</router-link></button></p>
    <p><button><router-link :to="'/recipecreator'">What's in your Fridge?</router-link></button></p>
</template>
<script>

export default {
    name: 'HomePage',
    data: () => ({
        error: '',
    }),
}
</script>
<style scoped>
h1 {
    font-size: 32px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
}

/* Style the navigation buttons */
button {
    
    background-color: none;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    margin: 10px;
}

button:hover {
    background-color: #ff8c42;
}

/* Style the router links within buttons */
router-link {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
}

/* Add hover effect to router links */
router-link:hover {
    text-decoration: underline;
}

/* Style the button containers (paragraphs) */
p {
    text-align: center;
}
</style>