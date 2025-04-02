import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

//Vue.config.productionTip = false;

const app = createApp(App); // Create the app instance
app.use(router); // Use the router
app.mount('#app'); // Mount the app
