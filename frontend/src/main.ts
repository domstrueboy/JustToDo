import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import TodoPage from './pages/TodoPage.vue'
import AboutPage from './pages/AboutPage.vue'

const routes = [
  { path: '/', component: TodoPage },
  { path: '/about', component: AboutPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')
