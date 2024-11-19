<template>
  <!-- 指令可以直接写在组件上, 但是事件不可以 -->
  <div class="board">
    <!--  Vue 中，写在组件标签上的属性会被放到该组件的根节点上。 -->
    <div class="board-row" v-for="row in 3" :key="row">
      <BoardItem
        v-for="col in 3"
        :key="getIndex(row, col)"
        :content="boardContent[getIndex(row, col)]"
        @click-item="() => itemClick(getIndex(row, col), row, col)"
        :is-winning-cell="isWinningCell(row, col)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BoardItem from '@/components/BoardItem.vue'
import type { BoardType, LocType } from '@/types/index'

interface IProps {
  winLine: LocType | null
  boardContent: BoardType
  itemClick: (index: number, row: number, col: number) => void
}
const { boardContent, itemClick, winLine } = defineProps<IProps>()
const getIndex = (row: number, col: number): number => (row - 1) * 3 + col - 1

const isWinningCell = (row: number, col: number) => {
  return !!winLine && Array.isArray(winLine) && winLine.includes(getIndex(row, col))
}
</script>

<style lang="less" scoped>
.board {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  .board-row {
    display: flex;
    gap: 5px;
  }


}
</style>
