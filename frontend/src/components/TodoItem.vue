<template>
  <li>
    <main>
      <h3 :class="item.done ? 'done' : ''">
        {{ item.title }}
      </h3>
      <p v-if="item.description">
        {{ item.description }}
      </p>
    </main>
    <label>
      <div>✔️</div>
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
});
</script>

<style scoped>
li {
  display: flex;
  padding: 4px;
  margin-bottom: 4px;
}
main {
  margin-right: auto;
}
h3, p {
  margin: 0;
}
p {
  color: gray;
}
label {
  cursor: pointer;
}
label:hover > div {
  transform: scale(1.1);
}
input[type="checkbox"] {
  display: none;
}
.done {
  text-decoration: line-through;
  color: lightgray;
}
</style>
