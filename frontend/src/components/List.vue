<template>
  <h1>{{ list.title }}</h1>
  <!-- <button @click="count++">
    count is: {{ count }}
  </button> -->
  <p>{{ $route.params.listId ?? 'Default list' }}</p>
</template>

<script lang="ts">
import { /* ref, */ defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'List',
  props: {
    // msg: {
    //   type: String,
    //   required: true,
    // },
  },
  // setup: () => {
  //   const count = ref(0);
  //   return { count };
  // },
  setup() {
    const store = useStore();

    return {
      list: computed(() => store.state.lists[store.state.currentList]),
    };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
