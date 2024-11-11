import { describe, expect, it } from 'vitest'
import BoardView from '../src/view/BoardView.vue'
import { mount } from '@vue/test-utils'

describe('BoardView', () => {
  it('should initialize the board with empty cells', () => {
    const wrapper = mount(Board)
    expect(wrapper.vm.boardContent).toEqual(Array(9).fill(null))
  })

  it('should update the board when a cell is clicked', () => {
    const wrapper = mount(BoardView)
    wrapper.vm.handleItemClick(0)
    expect(wrapper.vm.boardContent[0]).toBe('X')
    wrapper.vm.handleItemClick(1)
    expect(wrapper.vm.boardContent[1]).toBe('O')
  })

  it('should not allow a player to click on an occupied cell', () => {
    const wrapper = mount(BoardView)
    wrapper.vm.handleItemClick(0)
    expect(wrapper.vm.boardContent[0]).toBe('X')
    wrapper.vm.handleItemClick(0)
    expect(wrapper.vm.boardContent[0]).toBe('X')
  })

  it('should detect a winner', () => {
    const wrapper = mount(BoardView)
    wrapper.vm.boardContent = ['X', 'X', 'X', null, null, null, null, null, null]
    expect(wrapper.vm.winner).toBe('X')

    wrapper.vm.boardContent = ['O', 'O', 'O', null, null, null, null, null, null]
    expect(wrapper.vm.winner).toBe('O')

    wrapper.vm.boardContent = ['X', 'O', 'X', 'O', 'X', 'O', 'X', null, null]
    expect(wrapper.vm.winner).toBeNull()
  })

  it('should detect a tie', () => {
    const wrapper = mount(BoardView)
    wrapper.vm.boardContent = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'X']
    expect(wrapper.vm.isGameOver).toBe(true)
    expect(wrapper.vm.winner).toBeNull()
  })

  it('should reset the game', () => {
    const wrapper = mount(BoardView)
    wrapper.vm.handleItemClick(0)
    wrapper.vm.handleItemClick(1)
    wrapper.vm.handleRestartClick()
    expect(wrapper.vm.boardContent).toEqual(Array(9).fill(null))
    expect(wrapper.vm.currentPlayer).toBe('X')
  })
})
