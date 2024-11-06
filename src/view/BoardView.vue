<template>
  <!-- 指令可以直接写在组件上, 但是事件不可以 -->
  <div class="board">
    <div class="board-row" v-for="i in 3" :key="i">
      <BoardItem
        v-for="j in 3"
        :key="(i - 1) * 3 + j"
        :content="boardContent[(i - 1) * 3 + j - 1]"
        @click-item="handleItemClick((i - 1) * 3 + j - 1)"
      />
    </div>
    <div class="button" @click="handleRestartClick">restart</div>
  </div>
</template>

<script setup lang="ts">
import BoardItem from '@/components/BoardItem.vue'
import { ref } from 'vue'
const boardContent = ref(Array(9).fill(null))
const isX = ref(true)

const handleItemClick = (index: number) => {
  // 如果有值 不能再点击赋值
  if (boardContent.value[index]) return
  boardContent.value[index] = isX.value ? 'X' : 'O'
  isX.value = !isX.value
}
const handleRestartClick = () => {
  boardContent.value = Array(9).fill(null)
}

type CType = 'X' | 'O'
// 计算当前是否有获胜者
const calcWinner = (board: (string | null)[], currentC: CType) => {
  const winnerType = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
}
</script>

<style lang="less" scoped>
.board {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .board-row {
    display: flex;
  }
  .button {
    width: 100px;
    height: 40px;
    margin-top: 30px;
    border: 1px solid;
    border-radius: 10px;
    line-height: 40px;
    background-color: #de6767;
    color: #fff;
    cursor: pointer;
  }
}
</style>
