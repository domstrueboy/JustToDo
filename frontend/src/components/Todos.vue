<template>
  <h1>{{ todos }}</h1>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Todos',
  setup() {
    const store = useStore();

    return {
      todos: computed(() => store.state.todos.list1),
    };
  },
});
</script>
