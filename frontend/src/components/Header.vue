<template>
  <header>
    <slot></slot>
  </header>
</template>

<style scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;

    display: flex;
    justify-content: space-around;
    background: tomato;
  }
</style>