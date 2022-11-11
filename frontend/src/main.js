import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'
import VueSimpleAlert from "vue3-simple-alert-next";

const app = createApp(App);

app.use(router);
app.use(VueSimpleAlert);
app.mount('#app');
