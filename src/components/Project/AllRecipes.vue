<template>
  <div class="recipes-container">
    <h1 class="page-title">Delicious Recipes</h1>
    <div class="filter-container">
      <label for="cuisinefilter">Filter By Cuisine</label>
      <select id="cuisinefilter" v-model="selectedcuisine" class="cuisine-filter">
        <option value="">All Cuisines</option>
        <option v-for="cuisine in uniquecuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
      </select>
    </div>
    <div class="recipe-list">
      <div v-for="recipe in filteredrecipes" :key="recipe.id" class="recipe-card">
        <router-link :to="{ path: `/AllRecipes/${recipe._id}`, params: { id: recipe._id }}">
          <div class="recipe-image">
            <img :src="recipe.image" alt="Recipe Image" />
          </div>
          <h2 class="recipe-title">{{ recipe.title }}</h2>
          <p class="recipe-cuisine">{{ recipe.cuisine }}</p>
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
    selectedcuisine: ''
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
      return Array.from(new Set(this.recipes.map(recipe => recipe.cuisine)))
    },
    filteredrecipes() {
      if (this.selectedcuisine) {
        return this.recipes.filter(recipe => recipe.cuisine === this.selectedcuisine)
      } else {
        return this.recipes
      }
    }
  }
};
</script>

<style scoped>
/* Recipes Page Styles */
.recipes-container {
  text-align: center;
  padding: 20px;
  background-color: #f8f8f8;
}

.page-title {
  font-size: 36px;
  color: #ff8c42;
  margin-bottom: 20px;
}

.filter-container {
  margin: 20px 0;
}

.cuisine-filter {
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

.recipe-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}

.recipe-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  transition: transform 0.2s;
}

.recipe-card:hover {
  transform: translateY(-5px);
}

.recipe-link {
  text-decoration: none;
  color: #333;
}

.recipe-image img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

.recipe-title {
  font-size: 24px;
  margin-top: 10px;
}

.recipe-cuisine {
  font-size: 16px;
  color: #888;
  margin-top: 8px;
}
</style>