<template>
  <div class="app">
    <div class="board">
      <div class="button" @click="handleSortClick">{{ isAsc ? 'desc' : 'asc' }}</div>
      <div class="tips">
        {{ gameStatus }}
      </div>
      <BoardView :boardContent="boardContent" :itemClick="handleItemClick" />
      <div class="button" @click="handleRestartClick">restart</div>
    </div>
    <div class="history">
      <div class="btn-row" v-for="(_, key) in historyBoards" :key="key">
        <div class="idx">{{ `${key + 1}. ` }}</div>
        <div class="button" @click="handleHisClick(key)">{{ setHistoryBtn(key) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BoardView from './view/BoardView.vue'

import type { PlayerType } from './types'
type BoardType = PlayerType[]

const historyBoards = ref<BoardType[]>([Array(9).fill(null)])

// 当前的index
const curIdx = ref(0)

const isAsc = ref(true)

// history button的内容
const setHistoryBtn = (key: number) => {
  return key === curIdx.value
    ? `You are at move #${isAsc.value ? key : historyBoards.value.length - key - 1}`
    : `Go to ${(key === 0 && isAsc.value) || (key === historyBoards.value.length - 1 && !isAsc.value) ? 'game start' : 'move #' + (isAsc.value ? key : historyBoards.value.length - key - 1)}`
}

// 当前的board数组
const boardContent = computed(() => {
  return historyBoards.value[curIdx.value]
})
// odd => "O" even => "X"
const curPlayer = computed<Exclude<PlayerType, null>>(() =>
  (isAsc.value ? curIdx.value : historyBoards.value.length - curIdx.value - 1) % 2 ? 'O' : 'X',
)
// 计算winner
const winner = computed(() => calcWinner(boardContent.value, curPlayer.value === 'X' ? 'O' : 'X'))
// 游戏是否结束
const isGameOver = computed(() => boardContent.value.every((c) => c !== null))
// tips内容
const gameStatus = computed(() => {
  if (winner.value) {
    return `The Winner is: ${winner.value}`
  } else if (isGameOver.value) {
    return `Game Over, Please Click the Restart Button`
  } else {
    return `The Next Player is: ${curPlayer.value}`
  }
})

const handleSortClick = () => {
  isAsc.value = !isAsc.value
  historyBoards.value = [...historyBoards.value].reverse()
  curIdx.value = historyBoards.value.length - curIdx.value - 1
}

// 落子事件
const handleItemClick = (index: number) => {
  // 如果有值 不能再点击赋值
  if (boardContent.value[index] || winner.value) return

  const curBoard = [...boardContent.value]
  curBoard[index] = curPlayer.value
  // slice的区间在desc的时候应该是不同的
  if (isAsc.value) {
    historyBoards.value = [...historyBoards.value.slice(0, curIdx.value + 1), curBoard]
    curIdx.value++
  } else {
    historyBoards.value = [
      curBoard,
      ...historyBoards.value.slice(curIdx.value, historyBoards.value.length),
    ]
    curIdx.value = 0
  }
}
// restart事件
const handleRestartClick = () => {
  historyBoards.value = [Array(9).fill(null)]
  curIdx.value = 0
}

// 处理右侧history click
const handleHisClick = (idx: number) => {
  // computed readonly
  // boardContent.value = historyBoards.value[idx]
  curIdx.value = idx
}

// 计算当前是否有获胜者
const calcWinner = (board: BoardType, player: Exclude<PlayerType, null>) => {
  const winnerTypes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  return winnerTypes.some(
    ([a, b, c]) => board[a] === player && board[b] === player && board[c] === player,
  )
    ? player
    : null
}
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .board {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tips {
      font-weight: bold;
      margin: 10px 0;
    }
  }
  .history {
    margin-left: 20px;
    .idx {
      font-size: 20px;
      font-weight: bold;
      margin-right: 6px;
    }
    .btn-row {
      display: flex;
      align-items: end;
      margin-bottom: 6px;
    }
  }
}
.button {
  padding: 0 20px;
  border: none;
  border-radius: 10px;
  text-align: center;
  line-height: 40px;
  background-color: #de6767;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
.button:hover {
  background-color: #c55a5a;
}
</style>
