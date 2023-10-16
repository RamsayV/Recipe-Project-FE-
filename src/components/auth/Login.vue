<template>
  <head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"></head>
    <div class="login-container">
      <h1 class="page-title">Login page</h1>
      <div v-if="isLoggedIn" class="user-info">
        <h2>Hello {{ userName }}</h2>
        <button class="btn btn-primary" @click="handleLogOut">Log Out</button>
      </div>
      <div v-else class="login-form">
        <GoogleLogin :callback="callback" />
      </div>
    </div>
  </template>
  
  <script>
  import { decodeCredential, googleLogout } from 'vue3-google-login';
  
  export default {
    name: "LoginForm",
    data: () => ({
      isInit: false,
      isLoggedIn: false,
      userName: ''
    }),
    mounted() {
      if (this.$cookies.isKey('user_session')) {
        this.isLoggedIn = true;
        const userData = decodeCredential(this.$cookies.get('user_session'));
        this.userName = userData.given_name;
      }
    },
    methods: {
      callback: function (response) {
        this.isLoggedIn = true;
        const userData = decodeCredential(response.credential);
        console.log(userData);
        this.userName = userData.given_name;
        this.$cookies.set('user_session', response.credential);
        fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: userData.email
          })
        })
        .then(() => {
          console.log('session saved');
          location.reload()
        });
      },
      handleLogOut: function () {
        googleLogout();
        this.$cookies.remove('user_session');
        this.isLoggedIn = false;
        location.reload()
      }
    }
  };
  </script>
  
  <style scoped>
  /* General Styles */
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; 
    background-color: #ffebcd; /* Creamy background color */
    font-family: 'Poppins', sans-serif;
  }
  
  .page-title {
    font-size: 2.5em;
    color: #ff7f50; /* Coral color */
    margin-bottom: 20px;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  }
  
  /* Logged-in User Styles */
  .user-info {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
  }
  
  .user-info h2 {
    font-size: 2em;
    color: #ff7f50; /* Maintain color consistency */
    margin-bottom: 15px;
  }
  
  /* Login Form Styles */
  .login-form {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
  }
  
  /* Button Styles */
  .btn {
    cursor: pointer;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    background-color: #ffa07a; /* Light Salmon */
    color: #ffffff;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .btn:hover {
    background-color: #ff8c69; /* A bit darker salmon on hover */
    transform: scale(1.05);
  }
  
  .btn-primary {
    background-color: #ffa07a;
  }
  </style>