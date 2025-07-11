import { describe, test, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import type { ButtonType, ButtonSize } from './types'
import Button from './Button.vue'
describe('Button.vue', () => {
  test('basic button', async () => {
    const wrapper = mount(() => <Button type="primary">button content</Button>)
    // class
    expect(wrapper.classes()).toContain('xy-button--primary')
    // slot
    expect(wrapper.get('button').text()).toBe('button content')
    // events
    await wrapper.get('button').trigger('click')
  })
  // Props: type
  it('should has the correct type class when type prop is set', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info']
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type: type as ButtonType },
      })
      expect(wrapper.classes()).toContain(`xy-button--${type}`)
    })
  })

  // Props: size
  it('should has the correct size class when size prop is set', () => {
    const sizes = ['large', 'default', 'small']
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as ButtonSize },
      })
      expect(wrapper.classes()).toContain(`xy-button--${size}`)
    })
  })
})
