<template>
  <div>
    <div class="form-container">
      <label for="minProtein" class="form-label">Minimum Protein (g):</label>
      <input type="number" v-model="minProtein" id="minProtein" class="form-input" />
    </div>
    <div class="form-container">
      <label for="minVitaminC" class="form-label">Minimum Vitamin C (mg):</label>
      <input type="number" v-model="minVitaminC" id="minVitaminC" class="form-input" />
    </div>
    <button @click="fetchData" class="form-button">Find Recipes</button>
    <div v-if="isLoading" class="loading-text">Loading...</div>
    <div v-else>
      <ul class="recipe-list">
        <li v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
          <div class="recipe-item-content">
            <div class="recipe-image-container">
              <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
            </div>
            <div class="recipe-details">
              <h3 @click="toggleRecipeDetails(recipe.id)" class="recipe-title">{{ recipe.title }}</h3>
              <transition name="fade">
                <div v-if="recipe.showDetails" class="recipe-details-container">
                  <h4 class="sub-heading">Ingredients:</h4>
                  <ul class="ingredient-list">
                    <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
                  </ul>
                  <h4 class="sub-heading">Instructions:</h4>
                  <p class="instructions-text">{{ recipe.instructions }}</p>
                </div>
              </transition>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipes: [],
      isLoading: false,
      minProtein: 0,
      minVitaminC: 0,
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      const url = this.buildApiUrl();
      const headers = {
        'X-RapidAPI-Key': '8f8641a7c6msh0e089e319a502cep174f40jsn27b4a9b3976c',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      };

      try {
        const response = await fetch(url, { method: 'GET', headers });
        const result = await response.json();
        this.recipes = result.map((recipe) => ({
          ...recipe,
          showDetails: false, // Initially, recipe details are hidden
          ingredients: [],    // Store ingredients
          instructions: '',   // Store instructions
        }));
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    buildApiUrl() {
      const baseUrl =
        'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients?limitLicense=false';

      const queryParams = [
        `minProtein=${this.minProtein}`,
        `minVitaminC=${this.minVitaminC}`,
      ];

      return `${baseUrl}&${queryParams.join('&')}`;
    },
    async toggleRecipeDetails(recipeId) {
      const recipe = this.recipes.find((r) => r.id === recipeId);
      if (recipe) {
        if (!recipe.showDetails) {
          // Fetch detailed recipe information when details are not shown
          const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`;
          const headers = {
            'X-RapidAPI-Key': '8f8641a7c6msh0e089e319a502cep174f40jsn27b4a9b3976c',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          };

          try {
            const response = await fetch(url, { method: 'GET', headers });
            const result = await response.json();
            recipe.ingredients = result.extendedIngredients.map((ingredient) => ingredient.original);
            recipe.instructions = result.instructions;
          } catch (error) {
            console.error(error);
          }
        }

        // Toggle the display of recipe details
        recipe.showDetails = !recipe.showDetails;
      }
    },
  },
};
</script>
  
<style scoped>
/* Scoped styles for the component */
.form-container {
  margin: 10px 0;
}

.form-label {
  font-size: 16px;
  color: #333;
}

.form-input {
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

.form-button {
  font-size: 16px;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ff8c42;
  color: #fff;
  cursor: pointer;
}

.loading-text {
  font-size: 16px;
  color: #333;
  margin-top: 20px;
}

.recipe-list {
  list-style: none;
  padding: 0;
}

.recipe-item {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  transition: transform 0.2s;
  margin: 10px;
  text-align: left;
}

.recipe-item:hover {
  transform: translateY(-5px);
}

.recipe-item-content {
  display: flex;
  justify-content: space-between;
}

.recipe-image-container {
  width: 30%; /* Adjust as needed */
  display: flex;
  align-items: center;
}

.recipe-image {
  max-width: 100%;
  height: auto;
}

.recipe-details {
  width: 65%; /* Adjust as needed */
  margin-left: 20px; /* Add margin for spacing */
}

.recipe-title {
  font-size: 24px;
  color: #333;
  cursor: pointer;
}

.sub-heading {
  font-size: 20px;
  color: #333;
  margin-top: 10px;
}

.ingredient-list {
  list-style: disc;
  margin-left: 20px;
  font-size: 16px;
  color: #555;
}

instructions-text {
  font-size: 16px;
  color: #333;
}
</style>
  
  