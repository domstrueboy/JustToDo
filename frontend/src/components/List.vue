<template>
  <h1>{{ list.title }}</h1>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore, mapMutations } from 'vuex';

export default defineComponent({
  name: 'List',
  setup() {
    const store = useStore();

    return {
      list: computed(() => store.state.lists[store.state.currentList]),
    };
  },
  methods: {
    ...mapMutations(['setCurrentListId']),
  },
});
</script>

<style scoped>

</style>
