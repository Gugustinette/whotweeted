/**
 * Vue configuration
 */
import { createApp } from 'vue'
// Pinia
import { createPinia } from 'pinia'
// Axios
import axios from "axios";
// Router
import router from "./router/router";

/**
 * Axios configuration
 */
axios.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  axios.defaults.baseURL = "http://localhost:9001"; // Rest API base URL
  axios.interceptors.response.use(undefined, function (err) {
    // Intercept all errors
    return new Promise(function (resolve, reject) {
      if (err.response.status === 419) {
        // Authentication expired -> redirect to login (expired token)
        console.log("Token expired");
        alert("Token expired");
      } else {
        // Other error -> reject
        reject(err);
      }
    });
  });

// Import style and app
import './style.css'
import App from './App.vue'

// Create pinia and app
const pinia = createPinia()
const app = createApp(App)

// Configure app
app.use(router)
app.use(pinia)
app.mount('#app')
