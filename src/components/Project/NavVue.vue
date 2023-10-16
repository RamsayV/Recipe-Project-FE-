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
      this.isLoggedIn = this.checklogin()
    }
  },
  methods: {
    handleLogout: function () {
      googleLogout()
      this.$cookies.remove('user_session')
      this.isLoggedIn = false
    },
    checklogin: function () {
      const loginData = this.$cookies.isKey('user_session')
        return Boolean(loginData)
      }
    }
  }

</script>
<style scoped>
.mainView {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #e9e1e1;
  /* Set your desired background color */
  padding: 10px;
}

.nav-link {
  /* Set your desired background color for links */
  color: rgb(97, 90, 90);
  /* Set the text color for links */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
}


#nav-component {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Ensure it's above other page content */
}
</style>