<template>
  <Header>
    <Input />
  </Header>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import Input from './components/Input.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Input,
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  margin: 0 auto;
  padding: 10px;
}
#app > * {
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 0;
  padding: 10px;
}
</style>