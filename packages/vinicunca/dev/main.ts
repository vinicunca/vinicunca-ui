import 'uno.css';

import { createApp } from 'vue';
import Vinicunca from 'vinicunca';

import App from './src/App.vue';

const app = createApp(App);

app.use(Vinicunca).mount('#app');
