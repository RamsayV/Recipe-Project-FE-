<template>
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
        });
      },
      handleLogOut: function () {
        googleLogout();
        this.$cookies.remove('user_session');
        this.isLoggedIn = false;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Login Page Styles */
  .login-container {
    text-align: center;
    padding: 20px;
    background-color: #fff; /* Set your desired background color */
  }
  
  .page-title {
    font-size: 28px;
    color: #ff8c42; /* Set title color */
    margin-bottom: 20px;
  }
  
  .user-info {
    background-color: #f5f5f5; /* Set user info background color */
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
  }
  
  .user-info h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .login-form {
    background-color: #fff; /* Set login form background color */
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
  }
  </style>