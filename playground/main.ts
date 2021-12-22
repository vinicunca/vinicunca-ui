import { createApp } from 'vue';
import { Vinicunca } from '../src';
import App from './App.vue';

const app = createApp(App);
app.use(Vinicunca);
app.mount('#app');
