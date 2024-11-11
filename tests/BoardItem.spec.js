import { describe, expect, it } from 'vitest'
import  { mount } from '@vue/test-utils'
import BoardItem from '../src/components/BoardItem.vue'

describe('BoardItem', () => {
  it('should render the content correctly', () => {
    const wrapper = mount(BoardItem, {
      props: {
        content: 'X',
      },
    })
    expect(wrapper.find('.content').text()).toBe('X')

    wrapper.setProps({ content: 'O' })
    expect(wrapper.find('.content').text()).toBe('O')

    wrapper.setProps({ content: null })
    expect(wrapper.find('.content').text()).toBe('')
  })

  it('should emit a click event when clicked', () => {
    const wrapper = mount(BoardItem, {
      props: {
        content: 'X',
      },
    })

    wrapper.trigger('click')
    expect(wrapper.emitted('clickItem')).toBeTruthy()
    expect(wrapper.emitted('clickItem')?.length).toBe(1)
  })

  it('should apply correct styles based on content', () => {
    const wrapper = mount(BoardItem, {
      props: {
        content: 'X',
      },
    })
    expect(wrapper.classes()).toContain('board-item')
    expect(wrapper.classes()).not.toContain('occupied')

    wrapper.setProps({ content: 'O' })
    expect(wrapper.classes()).toContain('occupied')
  })
})
