<template>
    <div class="all-contributors">
      <h1 class="page-title"> Standout Users </h1>
      <div class="contributor-list">
        <div v-for="contributor in contributors" :key="contributor._id" class="contributor-item">
          <router-link :to="'/AllContributors/' + contributor._id" class="contributor-link">
            <h1 class="contributor-name">{{ contributor.name }}</h1>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AllContributors',
    data: () => ({
      error: '',
      contributors: [],
    }),
    mounted() {
      fetch('http://localhost:4000/AllContributors')
        .then((response) => response.json())
        .then((result) => {
          this.contributors = result;
        })
        .catch((error) => {
          this.error = 'Error fetching data: ' + error;
        });
    },
  };
  </script>
  
  <style scoped>
  /* All Contributors Page Styles */
  .all-contributors {
    text-align: center;
    padding: 20px;
    background-color: #fff; /* Set your desired background color */
  }
  
  .page-title {
    font-size: 28px;
    color: #ff8c42; /* Set title color */
    margin-bottom: 20px;
  }
  
  .contributor-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Responsive grid layout */
    grid-gap: 20px;
    justify-items: center;
  }
  
  .contributor-item {
    background-color: #f5f5f5; /* Set contributor item background color */
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    text-align: center;
    transition: transform 0.2s;
  }
  
  .contributor-item:hover {
    transform: translateY(-5px); /* Add a slight hover effect */
  }
  
  .contributor-link {
    text-decoration: none;
  }
  
  .contributor-name {
    font-size: 20px;
    color: #ff8c42; /* Set contributor name color */
    margin-top: 10px;
  }
  
  /* Styles that consider NavVue */
  .mainView {
    background-color: #fff; /* Set background color of the main navigation */
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  </style>