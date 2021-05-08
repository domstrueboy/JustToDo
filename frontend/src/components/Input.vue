<template>
  <form @submit.prevent="addTodoItem">
    <input
      v-model="input"
      type="text"
    >
    <button>➕</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Input',
  setup() {
    const input = ref('');
    const store = useStore();
    return {
      input,
      addTodoItem: () => {
        store.commit('addTodoItem', { title: input.value });
        input.value = '';
      },
    };
  },
});
</script>

<style scoped>
form {
  display: flex;
}
input {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 0;
  background-color: whitesmoke;
  outline: none;
  padding: 0 20px;
}
button {
  border-radius: 20px;
  min-width: 40px;
  border: 0;
  background-color: red;
  color: white;
  margin-left: 5px;
}
</style>
