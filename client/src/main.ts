import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios";

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

import './style.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
