import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import App from './App.vue';

import routes from './routes';
import storeObj from './store';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const store = createStore(storeObj);

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
