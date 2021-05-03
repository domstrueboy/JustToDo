<template>
  <form @submit.prevent="addTodoItem">
    <input
      v-model="input"
      type="text"
    >
    <button>+</button>
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

</style>
