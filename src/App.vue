<template>
<header>
  <NavVue />
</header>
<main>
 <router-view :key="$route.path" />
</main>
<footer></footer>
</template>

<script>
import NavVue from './components/Project/NavVue.vue'

export default {
  name: 'App',
  components: {
    NavVue
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}
</style>
