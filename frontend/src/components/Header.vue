<template>
  <header>
    <input type="text">
    <Nav />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Nav from './Nav.vue';

export default defineComponent({
  name: 'Header',
  components: {
    Nav,
  },
});
</script>

<style scoped>
  header {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: tomato;
  }
</style>
