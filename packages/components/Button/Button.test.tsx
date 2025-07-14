import { describe, it, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import type { ButtonType, ButtonSize } from './type'

import Icon from '../Icon'
import XyButton from './Button.vue'
import XyButtonGroup from './ButtonGroup.vue'

describe('XyButton.vue', () => {
  const onClick = vi.fn()
  test('basic button', async () => {
    const wrapper = mount(() => (
      <XyButton type="primary" {...{ onClick }}>
        button content
      </XyButton>
    ))

    // class
    expect(wrapper.classes()).toContain('xy-button--primary')

    // slot
    expect(wrapper.get('button').text()).toBe('button content')

    // events
    await wrapper.get('button').trigger('click')
    expect(onClick).toHaveBeenCalledOnce()
  })

  test('disabled button', async () => {
    const wrapper = mount(() => (
      <XyButton disabled {...{ onClick }}>
        disabled button
      </XyButton>
    ))

    // class
    expect(wrapper.classes()).toContain('is-disabled')

    // attrs
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeTruthy()

    // events
    await wrapper.get('button').trigger('click')
    expect(onClick).toHaveBeenCalledOnce()
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  test('loading button', () => {
    const wrapper = mount(XyButton, {
      props: {
        loading: true,
      },
      slots: {
        default: 'loading button',
      },
      global: {
        stubs: ['XyIcon'],
      },
    })

    // class
    expect(wrapper.classes()).toContain('is-loading')

    // attrs
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeTruthy()

    // events
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')

    // icon
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
  })

  test('icon button', () => {
    const wrapper = mount(XyButton, {
      props: {
        icon: 'arrow-up',
      },
      slots: {
        default: 'icon button',
      },
      global: {
        stubs: ['XyIcon'],
      },
    })

    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })

  // Props: type
  it('should has the correct type class when type prop is set', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info']
    types.forEach((type) => {
      const wrapper = mount(XyButton, {
        props: { type: type as ButtonType },
      })
      expect(wrapper.classes()).toContain(`xy-button--${type}`)
    })
  })

  // Props: size
  it('should has the correct size class when size prop is set', () => {
    const sizes = ['large', 'default', 'small']
    sizes.forEach((size) => {
      const wrapper = mount(XyButton, {
        props: { size: size as ButtonSize },
      })
      expect(wrapper.classes()).toContain(`xy-button--${size}`)
    })
  })

  // Props: plain, round, circle
  it.each([
    ['plain', 'is-plain'],
    ['round', 'is-round'],
    ['circle', 'is-circle'],
    ['disabled', 'is-disabled'],
    ['loading', 'is-loading'],
  ])(
    'should has the correct class when prop %s is set to true',
    (prop, className) => {
      const wrapper = mount(XyButton, {
        props: { [prop]: true },
        global: {
          stubs: ['XyIcon'],
        },
      })
      expect(wrapper.classes()).toContain(className)
    },
  )

  it('should has the correct native type attribute when native-type prop is set', () => {
    const wrapper = mount(XyButton, {
      props: { nativeType: 'submit' },
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect((wrapper.element as any).type).toBe('submit')
  })

  // Test the click event with and without throttle
  it.each([
    ['withoutThrottle', false],
    ['withThrottle', true],
  ])('emits click event %s', async (_, useThrottle) => {
    const clickSpy = vi.fn()
    const wrapper = mount(() => (
      <XyButton
        onClick={clickSpy}
        {...{
          useThrottle,
          throttleDuration: 400,
        }}
      />
    ))

    await wrapper.get('button').trigger('click')
    expect(clickSpy).toHaveBeenCalled()
  })

  // Props: tag
  it('should renders the custom tag when tag prop is set', () => {
    const wrapper = mount(XyButton, {
      props: { tag: 'a' },
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
  })

  // Events: click
  it('should emits a click event when the button is clicked', async () => {
    const wrapper = mount(XyButton, {})
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toHaveLength(1)
  })

  // Exception Handling: loading state
  it('should display loading icon and not emit click event when button is loading', async () => {
    const wrapper = mount(XyButton, {
      props: { loading: true },
      global: {
        stubs: ['XyIcon'],
      },
    })
    const iconElement = wrapper.findComponent(Icon)

    expect(wrapper.find('.loading-icon').exists()).toBe(true)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})

describe('ButtonGroup.vue', () => {
  test('basic button group', async () => {
    const wrapper = mount(() => (
      <XyButtonGroup>
        <XyButton>button 1</XyButton>
        <XyButton>button 2</XyButton>
      </XyButtonGroup>
    ))

    expect(wrapper.classes()).toContain('xy-button-group')
  })

  test('button group size', () => {
    const sizes = ['large', 'default', 'small']
    sizes.forEach((size) => {
      const wrapper = mount(() => (
        <XyButtonGroup size={size as any}>
          <XyButton>button 1</XyButton>
          <XyButton>button 2</XyButton>
        </XyButtonGroup>
      ))

      const buttonWrapper = wrapper.findComponent(XyButton)
      expect(buttonWrapper.classes()).toContain(`xy-button--${size}`)
    })
  })

  test('button group type', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info']
    types.forEach((type) => {
      const wrapper = mount(() => (
        <XyButtonGroup type={type as any}>
          <XyButton>button 1</XyButton>
          <XyButton>button 2</XyButton>
        </XyButtonGroup>
      ))

      const buttonWrapper = wrapper.findComponent(XyButton)
      expect(buttonWrapper.classes()).toContain(`xy-button--${type}`)
    })
  })

  test('button group disabled', () => {
    const wrapper = mount(() => (
      <XyButtonGroup disabled>
        <XyButton>button 1</XyButton>
        <XyButton>button 2</XyButton>
      </XyButtonGroup>
    ))

    const buttonWrapper = wrapper.findComponent(XyButton)
    expect(buttonWrapper.classes()).toContain(`is-disabled`)
  })
})
