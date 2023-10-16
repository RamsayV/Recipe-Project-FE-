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
  background-color: #ffebcd; /* Adopted creamy background color */
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
}

.page-title {
  font-size: 2.5em;
  color: #ff7f50; /* Adopted coral color */
  margin-bottom: 20px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

.contributor-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
}

.contributor-item {
  background-color: #ffffff; 
  border-radius: 10px; 
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1); 
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s; /* Slightly faster transition */
}

.contributor-item:hover {
  transform: scale(1.05); 
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
}

.contributor-link {
  text-decoration: none;
}

.contributor-name {
  font-size: 1.75em;
  color: #ff7f50; /* Maintained coral color for names */
  margin: 0; /* Overriding margin */
}

/* If the .mainView class is utilized within this component, align styling aesthetic */
.mainView {
  background-color: #ffebcd; /* Same background color */
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>