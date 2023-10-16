<template>
    <div class="footer-nav">
      <div class="nav-item">
        <router-link to="/SingleContributor" custom v-slot="{ navigate }">
          <button @click="navigate" class="nav-link" role="link">
            Standout Users
          </button>
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/AboutUs" custom v-slot="{ navigate }">
          <button @click="navigate" class="nav-link" role="link">
            About Us
          </button>
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/JoinTheTeam" custom v-slot="{ navigate }">
          <button @click="navigate" class="nav-link" role="link">
            Join the Team
          </button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FooterVue',
    data: () => ({
      error: '',
    }),
  }
  </script>
  
  <style>
  .footer-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #e9e1e1; /* Set your desired background color */
    padding: 10px;
  }
  
  .nav-item {
    text-align: center;
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
  </style>