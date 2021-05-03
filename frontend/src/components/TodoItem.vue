<template>
  <li>
    <main>
      <h3 :class="item.done ? 'done' : ''">
        {{ item.title }}
      </h3>
      <p>{{ item.description }}</p>
    </main>
    <label>
      ✔️
      <input
        type="checkbox"
        @change="toggleDone"
      >
    </label>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import { TodoItem, ITodoItem } from '../models';

export default defineComponent({
  name: 'TodoItem',
  props: {
    item: {
      type: Object as PropType<ITodoItem>,
      default: new TodoItem({}),
    },
  },
  setup(props) {
    const store = useStore();
    return {
      toggleDone: () => store.commit('toggleDone', props.item.id),
    };
  },
  data() {
    return {
      done: this.item.done,
    };
  },
});
</script>

<style scoped>
li {
  display: flex;
}
input[type="checkbox"] {
  display: none;
}
.done {
  text-decoration: line-through;
  color: gray;
}
</style>
