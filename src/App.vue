<template>
  <div class="app">
    <div class="board">
      <div class="button" @click="handleSortClick">{{ isAsc ? 'desc' : 'asc' }}</div>
      <div class="tips">
        {{ gameStatus }}
      </div>
      <BoardView
        :winLine="curWinLocation"
        :boardContent="boardContent"
        :itemClick="handleItemClick"
      />
      <div class="button" @click="handleRestartClick">restart</div>
    </div>
    <div class="history">
      <div class="btn-row" v-for="(_, key) in historyBoards" :key="key">
        <div class="idx">{{ `${key + 1}. ` }}</div>
        <div class="button" @click="() => handleHisClick(key)">
          {{ setHistoryBtn(key) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BoardView from './view/BoardView.vue'

import type { PlayerType, BoardType, LocType } from './types/index'
import { WINNER_LINES } from './constants'

const historyBoards = ref<BoardType[]>([Array(9).fill(null)])
const curWinLocation = ref<LocType | null>(null)
// 当前的index
const curIdx = ref(0)
const isAsc = ref(true)
// curIdx不在当前的位置上则标色消失
const winIdx = ref<number | null>(null)
const rowCol = ref<(number[] | null)[]>([null])

// 当前的board数组
const boardContent = computed(() => {
  return historyBoards.value[curIdx.value]
})
// odd => "O" even => "X"
const curPlayer = computed<Exclude<PlayerType, null>>(() =>
  (isAsc.value ? curIdx.value : historyBoards.value.length - curIdx.value - 1) % 2 ? 'O' : 'X',
)

// 计算当前是否有获胜者
const calcWinner = (board: BoardType) => {
  for (const [a, b, c] of WINNER_LINES) {
    if (board[a] && board[b] === board[a] && board[c] === board[a]) {
      curWinLocation.value = [a, b, c] as LocType
      winIdx.value = curIdx.value
      return board[a]
    }
  }
  return null
}
// 计算winner
const winner = computed(() => calcWinner(boardContent.value))

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
// 落子事件
const handleItemClick = (index: number, row: number, col: number) => {
  // 如果有值 不能再点击赋值
  if (boardContent.value[index] || winner.value) return
  const curBoard = [...boardContent.value]
  curBoard[index] = curPlayer.value
  rowCol.value = [...rowCol.value, [row, col]]

  // slice的区间在desc的时候应该是不同的
  if (isAsc.value) {
    historyBoards.value = [...historyBoards.value.slice(0, curIdx.value + 1), curBoard]
    curIdx.value++
  } else {
    historyBoards.value = [curBoard, ...historyBoards.value.slice(curIdx.value)]
    curIdx.value = 0
  }
}

// history button的内容
const setHistoryBtn = (key: number) => {
  const moveNumber = isAsc.value ? key : historyBoards.value.length - key - 1
  const position = rowCol.value[key]
  const positionText = position ? `(${position[0]}, ${position[1]})` : ''

  // 当前步骤的显示逻辑
  if (key === curIdx.value) {
    return `You are at move #${moveNumber}${positionText}`
  }
  // 判断是否是游戏开始的位置
  const isGameStart = isAsc.value ? key === 0 : key === historyBoards.value.length - 1
  return `Go to ${isGameStart ? 'game start' : `move #${moveNumber}`}${positionText}`
}

const handleSortClick = () => {
  isAsc.value = !isAsc.value
  historyBoards.value = [...historyBoards.value].reverse()
  curIdx.value = historyBoards.value.length - curIdx.value - 1
}

// 处理右侧history click
const handleHisClick = (idx: number) => {
  if (idx !== winIdx.value) {
    curWinLocation.value = null
  }
  curIdx.value = idx
}

// restart事件
const handleRestartClick = () => {
  historyBoards.value = [Array(9).fill(null)]
  curIdx.value = 0
  curWinLocation.value = null
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
