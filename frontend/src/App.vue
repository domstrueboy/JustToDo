<template>
  <Header />
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
  },
});
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');
body {
  margin: 0;
}
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  margin: 0 auto;
}
</style>
