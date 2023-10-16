<template>
  <div>
    <div class="input-field">
    <label for="minProtein">Minimum Protein (g):</label>
    <input type="number" v-model="minProtein" id="minProtein" />
  </div>
  <div class="input-field">
    <label for="minVitaminC">Minimum Vitamin C (mg):</label>
    <input type="number" v-model="minVitaminC" id="minVitaminC" />
  </div>
  <div class="input-field">
    <label for="minAlcohol">Minimum Alcohol (g):</label>
    <input type="number" v-model="minAlcohol" id="minAlcohol" />
  </div>
  <div class="input-field">
    <label for="minSodium">Minimum Sodium (mg):</label>
    <input type="number" v-model="minSodium" id="minSodium" />
  </div>
  <div class="input-field">
    <label for="maxFat">Maximum Fat (g):</label>
    <input type="number" v-model="maxFat" id="maxFat" />
  </div>
    <button @click="fetchData">Find Recipes</button>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="recipe in recipes" :key="recipe.id">
          <div>
            <img :src="recipe.image" alt="Recipe Image" />
          </div>
          <div>
            <h3 @click="toggleRecipeDetails(recipe.id)">{{ recipe.title }}</h3>
            <transition name="fade">
              <div v-if="recipe.showDetails">
                <h4>Ingredients:</h4>
                <ul>
                  <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
                </ul>
                <h4>Instructions:</h4>
                <p>{{ recipe.instructions }}</p>
              </div>
            </transition>
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
      minAlcohol: '0',
      minSodium: '0',
      maxFat: '20',
    };
  },
  methods: {
    parseInstructions(instructions) {
      return instructions.split('. ').map((instruction, index) => {
        return `${index + 1}. ${instruction}`;
      });
    },
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
        `minAlcohol=${this.minAlcohol}`,
        `minSodium=${this.minSodium}`,
        `maxFat=${this.maxFat}`,
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

body {
  background-color: #ffebcd;
}
/* Page Styles */
div {
  /* ... Other styles ... */
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Input Styles */
label {
  font-size: 1.25em;
  color: #ff7f50;
  /* Coral color */
  margin-right: 10px;
}

input {
  font-size: 1em;
  background-color: #ffffff;
  border: 1px solid #ff7f50;
  /* Border color consistent with label */
  border-radius: 5px;
  padding: 8px 12px;
  color: #333;
  margin-bottom: 10px;
}

/* Button Styles */
button {
  background-color: #ff7f50;
  /* Coral color */
  border: none;
  border-radius: 5px;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  margin: 20px 0;
}

button:hover {
  background-color: #ff6347;
  /* Darker coral for hover effect */
}

/* List and Item Styles */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}


/* Image Styles */


/* Heading Styles */
h3 {
  font-size: 1.75em;
  color: #ff7f50;
  /* Coral color */
  cursor: pointer;
}

h4 {
  font-size: 1.5em;
  color: #ff7f50;
  /* Coral color */
}

/* Transition Styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.input-field {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

</style>
  