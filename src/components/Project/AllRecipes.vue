<template>
  <div class="recipes-container">
    <h1 class="page-title">Delicious Recipes</h1>
    <div class="filter-container">
      <label for="cuisinefilter" class="filter-label">Filter By Cuisine</label>
      <select id="cuisinefilter" v-model="selectedcuisine" class="filter-select">
        <option value="">All Cuisines</option>
        <option v-for="cuisine in uniquecuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
      </select>
    </div>
    <div class="recipe-list">
      <div v-for="recipe in filteredrecipes" :key="recipe.id" class="recipe-item">
        <router-link :to="'/AllRecipes/' + recipe._id" class="recipe-link">
          <h2 class="recipe-title">{{ recipe.title }}</h2>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllRecipes',
  data: () => ({
    error: '',
    recipes: [],
    selectedcuisine: '',
  }),
  mounted() {
    fetch('http://localhost:4000/Allrecipes')
      .then((response) => response.json())
      .then((result) => {
        this.recipes = result;
      })
      .catch((error) => {
        this.error = 'Error fetching data: ' + error;
      });
  },
  computed: {
    uniquecuisines() {
      return Array.from(new Set(this.recipes.map(recipe => recipe.cuisine)));
    },
    filteredrecipes() {
      if (this.selectedcuisine) {
        return this.recipes.filter(recipe => recipe.cuisine === this.selectedcuisine);
      } else {
        return this.recipes;
      }
    },
  },
};
</script>

<style scoped>
/* Page Styles */
.recipes-container {
  text-align: center;
  padding: 20px;
  background-color: #ffebcd; /* Creamy background color */
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
}

.page-title {
  font-size: 2.5em;
  color: #ff7f50; /* Coral color */
  margin-bottom: 20px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

/* Filter Styles */
.filter-container {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-label {
  font-size: 1.25em;
  color: #ff7f50; /* Maintain color consistency */
  margin-right: 10px;
}

.filter-select {
  font-size: 1em;
  background-color: #ffffff;
  border: 1px solid #ff7f50; /* Border color consistent with label */
  border-radius: 5px;
  padding: 8px 12px;
  color: #333;
  cursor: pointer;
}

/* Recipes List Styles */
.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
}

.recipe-item {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.recipe-item:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
}

/* Recipe Link Styles */
.recipe-link {
  text-decoration: none;
}

.recipe-title {
  font-size: 1.75em;
  color: #ff7f50; /* Coral color for titles */
  margin: 0;
}
</style>