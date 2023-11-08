import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from '/src/router/router'
import store from "/src/store/store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import api from "./axios/api.js";

const app = createApp(App)

app.provide('$api',api)

app.use(router).use(store).use(ElementPlus).mount('#app')