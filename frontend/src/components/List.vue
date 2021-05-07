<template>
  <main>
    <h1>{{ list.title }}</h1>
    <p>{{ list.description ?? 'NO' }}</p>
    <ul>
      <TodoItem
        v-for="item in list.items"
        :key="item.id"
        :item="item"
        @remove-todo-item="onRemoveTodoItem(item.id)"
      />
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import TodoItem from './TodoItem.vue';

export default defineComponent({
  name: 'List',
  components: {
    TodoItem,
  },
  setup() {
    const store = useStore();
    return {
      list: computed(() => store.state.lists[store.state.currentListId]),
      onRemoveTodoItem: (id: string) => {
        store.commit('removeTodoItem', { id });
      },
    };
  },
});
</script>

<style scoped>
main {
  width: 100%;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
