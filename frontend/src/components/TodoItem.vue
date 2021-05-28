<template>
  <li>
    <div class="handler">⚬⚬⚬</div>
    <main :class="item.done ? 'done' : ''">
      <h3
        :contenteditable="!item.done"
        @keydown.enter.prevent="onTitleChange"
      >
        {{ item.title }}
      </h3>
      <p
        v-if="item.description"
        :contenteditable="!item.done"
        @keydown.enter.prevent="onDescriptionChange"
      >
        {{ item.description }}
      </p>
    </main>
    <label>
      <div class="action-button">✔️</div>
      <input
        type="checkbox"
        @change="toggleDone"
      >
    </label>
    <button
      class="action-button"
      @click="$emit('remove-todo-item')"
    >
      ❌
    </button>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CommitOptions, useStore } from 'vuex';
import { TodoItem, ITodoItem } from '../models';

export default defineComponent({
  name: 'TodoItem',
  props: {
    item: {
      type: Object as PropType<ITodoItem>,
      default: new TodoItem({}),
    },
  },
  emits: ['remove-todo-item'],
  setup(props) {
    const store = useStore();
    return {
      toggleDone: () => store.commit('toggleDone', props.item.id),
      onTitleChange: (event: KeyboardEvent) => {
        const target = event?.target as HTMLElement;
        store.commit('editTitle', {
          id: props.item.id,
          newTitle: target.innerText as CommitOptions,
        });
      },
      onDescriptionChange: (event: KeyboardEvent) => {
        const target = event?.target as HTMLElement;
        store.commit('editDescription', {
          id: props.item.id,
          newDesc: target.innerText as CommitOptions,
        });
      },
    };
  },
});
</script>

<style scoped>
.handler {
  position: absolute;
  height: 40px;
  line-height: 40px;
  width: 40px;
  left: -40px;
  text-align: center;
  user-select: none;
  opacity: 0;
  cursor: grab;
}
.handler:hover {
  opacity: 1;
}
.handler:active {
  cursor: grabbing;
}
li {
  display: flex;
  border-top: 1px solid whitesmoke;
  position: relative;
}
main {
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h3, p {
  margin: 0;
  outline: none;
}
p {
  color: gray;
}
label {
  cursor: pointer;
}
input[type="checkbox"] {
  display: none;
}
.done > h3, p {
  text-decoration: line-through;
  color: lightgray;
}
.action-button {
  background: none;
  cursor: pointer;
  border: 0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  user-select: none;
}
.action-button:hover {
  background-color: whitesmoke;
}
</style>
