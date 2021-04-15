<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
  name: 'FixedTop',
})
</script>

<style scoped>
  div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>