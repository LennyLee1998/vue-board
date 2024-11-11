<template>
  <!-- 指令可以直接写在组件上, 但是事件不可以 -->
  <div class="board">
    <div class="board-row" v-for="row in 3" :key="row">
      <BoardItem
        v-for="col in 3"
        :key="getIndex(row, col)"
        :content="boardContent[getIndex(row, col)]"
        @click-item="itemClick(getIndex(row, col))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { computed, ref } from 'vue'
import BoardItem from '@/components/BoardItem.vue'
import type { PlayerType } from '@/types'

type BoardType = PlayerType[]
interface IProps {
  boardContent: BoardType
  itemClick: (index:number) => void
}
const { boardContent, itemClick } = defineProps<IProps>()
const getIndex = (row: number, col: number): number => (row - 1) * 3 + col - 1

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
