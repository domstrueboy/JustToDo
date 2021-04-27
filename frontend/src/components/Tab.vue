<template>
  <li class="tab">
    <RouterLink :to="`/${ tab.id }`">
      {{ tab.title }}
    </RouterLink>
    <p>{{ tab.description }}</p>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ITab } from '../models';

export default defineComponent({
  name: 'Tab',
  props: {
    tab: {
      type: Object as PropType<ITab>,
      required: true,
    },
  },
});
</script>

<style scoped>
.tab {
  background-color: whitesmoke;
}
</style>
