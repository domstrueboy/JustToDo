<template>
  <TodoPage msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TodoPage from './pages/TodoPage.vue'
import AboutPage from './pages/AboutPage.vue'

const routes = [
  { path: '/', component: TodoPage },
  { path: '/about', component: AboutPage },
]

export default defineComponent({
  name: 'App',
  components: {
    TodoPage,
    AboutPage,
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>