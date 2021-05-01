import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import storeObj from './store';
import App from './App.vue';
import List from './components/List.vue';

interface IPath {
  path: string;
}

interface ITo {
  params: Record<string, string>;
}

const store = createStore(storeObj);

const routes = [
  {
    path: '/',
    component: List,
    redirect(): IPath {
      return { path: `/list/${store.state.currentListId}` };
    },
  },
  {
    path: '/list/:listId',
    component: List,
    beforeEnter(to: ITo): IPath | boolean {
      const id = to.params.listId;
      if (!store.state.lists[id]) {
        console.log(!store.state.lists[id]);
        return false;
      }
      return { path: `/list/${store.state.currentListId}` };
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
