<template>
  <div class="board-item" @click="handleItemClick">
    <span class="content">{{ content }}</span>
  </div>
</template>

<script setup lang="ts">
import type { PlayerType } from '@/types';
interface IProps {
  content: PlayerType
}
const { content } = defineProps<IProps>()
const emit = defineEmits<{
  clickItem: []
}>()

const handleItemClick = () => {
  emit('clickItem')
}
</script>

<style lang="less" scoped>
.board-item {
  width: 60px;
  height: 60px;
  border: 3px solid #aaa;
  border-radius: 5px;
  text-align: center;
  line-height: 60px;
  .content {
    font-size: 30px;
    font-weight: bold;
  }
}
</style>
