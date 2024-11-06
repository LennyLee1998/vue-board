<template>
  <div class="app">
    <BoardView />
  </div>
</template>

<script setup lang="ts">
import BoardView from './view/BoardView.vue'
</script>

<style lang="less" scoped>
  .app {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
