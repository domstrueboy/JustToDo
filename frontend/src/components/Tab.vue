<template>
  <li
    class="tab"
    :title="tab.description"
  >
    <RouterLink
      :to="`/list/${ tab.id }`"
      class="tab__link"
    >
      {{ tab.title }}
    </RouterLink>
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
.tab__link {
  text-decoration: none;
  display: block;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  color: white;
  background: var(--main-bg);
  opacity: .3;
  transition: .3s;
}
.tab__link:visited {
  color: white;
}
.router-link-active {
  opacity: 1;
}
</style>
