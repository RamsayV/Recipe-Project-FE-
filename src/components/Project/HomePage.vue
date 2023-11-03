<template>
    <div id="home-page">
        <div class="content-wrap">
            <h1>Recipe Realm</h1>
            <p>Find, create, and share your favorite recipes with our community.</p>
            <div class="nav-buttons">
                <button ><router-link class="btn" :to="'/login'">Login</router-link></button>
                <button><router-link class="btn" :to="'/AllRecipes'">Recipes</router-link></button>
                <button><router-link class="btn" :to="'/AllContributors'">User Profiles</router-link></button>
                <button><router-link class="btn" :to="'/addrecipe'">Add Recipe</router-link></button>
                <button><router-link class="btn" :to="'/recipecreator'">What's in your Fridge?</router-link></button>
                <button><router-link class="btn" :to="'/MealPlanApi'">Customize Your Weekly Meal Plans!</router-link></button>
            </div>
        </div>
    </div>
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
#home-page {
    background-image: url('https://img.freepik.com/premium-photo/ingredients-cooking-food-background-with-herbs-vegetables-top-view-white-background_999431-856.jpg');  
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px);
    font-family: 'Roboto', sans-serif;  
}

.content-wrap {
    text-align: center;
    background-color: #ffebcd; /* Orange with a bit of transparency */
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    max-width: 800px;
}

h1 {
    font-size: 45px;
    margin-bottom: 20px;
    color: #ef6f06;
}

p {
    font-size: 22px;
    margin-bottom: 35px;
    color: #ef6f06;
}

.nav-buttons button {
    background-color: #ff9800;   /* Using the primary orange color */
    color: #fff;   /* White text for better contrast against the orange background */
    padding: 12px 24px;
    margin: 10px;
    border: none;
    border-radius: 50px;   /* Making the buttons more rounded for a pill shape */
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* Providing a subtle shadow for depth */
}

.nav-buttons button:hover {
    transform: translateY(-3px);  /* Creating a slight lift effect on hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);  /* A stronger shadow on hover for more depth */
}

.nav-buttons button:active {
    transform: translateY(1px);   /* Button presses down on active */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  /* Shadow becomes closer to the button when pressed */
}

.nav-buttons button router-link,
.nav-buttons button router-link:visited {
    color: #fff;  /* White link color inside the button */
    transition: color 0.3s;
}

.nav-buttons button router-link:hover {
    color: #f0e5d8;  /* Lighter shade for hover */
}

.btn{
    color: white;
    text-decoration: none;
}
  </style>