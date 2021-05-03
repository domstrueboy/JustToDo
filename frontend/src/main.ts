import { createApp } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createStore } from 'vuex';
import storeObj from './store/indexStore';
import App from './App.vue';
import List from './components/List.vue';

const store = createStore(storeObj);

const routes: RouteRecordRaw[] = [
  {
    name: 'Main',
    path: '/',
    component: List,
    redirect() {
      const id = store.state.currentListId;
      if (!store.state.lists[id]) { // @TODO move the same code into a function
        const firstId = Object.keys(store.state.lists)[0];
        store.commit('setCurrentListId', firstId);
      }
      return { path: `/list/${id}` };
    },
  },
  {
    name: 'List',
    path: '/list/:listId',
    component: List,
    beforeEnter(to, _, next) {
      const paramsListId = typeof to.params.listId === 'string' ? to.params.listId : to.params.listId[0];
      const id = store.state.lists[paramsListId]
        ? paramsListId
        : store.state.currentListId;
      if (!store.state.lists[id]) { // @TODO move the same code into a function
        const firstId = Object.keys(store.state.lists)[0];
        store.commit('setCurrentListId', firstId);
      }
      next();
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.name === 'List') {
    store.commit('setCurrentListId', to.params.listId);
  }
});

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
