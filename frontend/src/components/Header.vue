<template>
  <header>
    <Nav />
    <Input />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Input from './Input.vue';
import Nav from './Nav.vue';

export default defineComponent({
  name: 'Header',
  components: {
    Input,
    Nav,
  },
});
</script>

<style scoped>
  header {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
