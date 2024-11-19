<template>
  <div class="board-item" :class="{ winBoard: isWinningCell }" @click="handleItemClick">
    <span class="content">{{ content }}</span>
  </div>
</template>

<script setup lang="ts">
import type { PlayerType } from '@/types'
interface IProps {
  content: PlayerType
  isWinningCell: boolean
}
const { content, isWinningCell } = defineProps<IProps>()
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

  &.win-board {
    background-color: #de6767;
    color: #fff;
  }
}
</style>
