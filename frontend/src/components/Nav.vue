<template>
  <nav>
    <ul>
      <Tab
        v-for="tab in tabs"
        :key="tab.id"
        :tab="tab"
      />
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import Tab from './Tab.vue';

export default defineComponent({
  name: 'Nav',
  components: {
    Tab,
  },
  setup() {
    const store = useStore();

    return {
      tabs: computed(() => store.getters.getTabs),
    };
  },
});
</script>

<style scoped>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 10px 0;
    display: flex;
  }
  ul > *:not(:first-child) {
    margin-left: 10px;
  }
</style>
