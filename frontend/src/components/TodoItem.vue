<template>
  <li>{{ item.title }}</li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TodoItem, ITodoItem } from '../models';

export default defineComponent({
  name: 'TodoItem',
  props: {
    item: {
      type: Object as PropType<ITodoItem>,
      default: new TodoItem({}),
    },
  },
});
</script>

<style scoped>

</style>
