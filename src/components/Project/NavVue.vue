<template>
    <div class="mainView">
      <div>
        <router-link to="/" custom v-slot="{ navigate }">
          <button @click="navigate" class="nav-link" role="link">
            HomePage
          </button>
        </router-link>
      </div>
      <div>
        <router-link to="/AllRecipes" custom v-slot="{ navigate }">
          <button @click="navigate" class="nav-link" role="link">
            Discover Recipes
          </button>
        </router-link>
      </div>
      <div>
        <router-link to="/addrecipe" custom v-slot="{ navigate }">
          <button @click="navigate" class="nav-link" role="link">
            Add Your Own Recipes !
          </button>
        </router-link>
      </div>
      <div v-if="isLoggedIn">
        <button @click="handleLogout" class="nav-link">
          Logout
        </button>
      </div>
      <div v-else>
        <router-link to="/login" custom v-slot="{ navigate }">
          <button @click="navigate" class="nav-link" role="link">
            Login
          </button>
        </router-link>
      </div>
    </div>
  </template>
  <script>
  import { googleLogout } from 'vue3-google-login'
  
  export default {
      name: 'NavVue',
      data: () => ({
          isLoggedIn: false
      }),
      mounted() {
          if (this.$cookies.isKey('user_session')) {
              this.isLoggedIn = true
          }
      },
      methods: {
          handleLogout: function(){
              googleLogout()
              this.$cookies.remove('user_session')
              this.isLoggedIn = false
          }
      }
  }
  </script>
  <style>
.mainView {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #e9e1e1; /* Set your desired background color */
  padding: 10px;
}

.nav-link {
  background-color: #ff8c42; /* Set your desired background color for links */
  color: white; /* Set the text color for links */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
}

.nav-link:hover {
  background-color: #ff6b0f; /* Set the hover background color for links */
}

/* Add more styles as needed */
</style>
