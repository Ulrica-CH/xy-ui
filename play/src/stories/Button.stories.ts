import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { XyButton } from '@xy-ui/core'
import { fn, within, userEvent, expect } from '@storybook/test'
const meta = {
  component: XyButton,
  title: 'Example/XyButton',
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['primary', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'default', 'large'],
    },
    plain: {
      control: {
        type: 'boolean',
      },
    },
    icon: {
      control: { type: 'text' },
    },
    loading: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    round: {
      control: {
        type: 'boolean',
      },
    },
    circle: {
      control: {
        type: 'boolean',
      },
    },
    content: {
      control: { type: 'text' },
    },
    args: { onClick: fn() },
  },
} satisfies Meta<typeof XyButton>
type Story = StoryObj<typeof meta>
const Template = (args: any) => ({
  components: { XyButton },
  setup() {
    return { args }
  },
  template: `<div style="padding: 20px">
<XyButton v-bind="args">${args.content || 'Button'}</XyButton>
</div>`,
})

export const Primary: Story = Template.bind({})
Primary.args = { content: 'cs', type: 'primary' } as any
// export const Default: Story = Template.bind({})
export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: 'text' },
    },
  },
  args: {
    type: 'default',
    content: 'Button',
    onClick: fn(),
  },
  render: (args) => ({
    components: { XyButton },
    setup() {
      const handleClick = () => {}
      return { args, handleClick }
    },
    template: `<xy-button @click="handleClick" v-bind="args">{{args.content}}</xy-button>`,
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step('click button', async () => {
      await userEvent.tripleClick(canvas.getByRole('button'))
    })

    await expect(args.onClick).toHaveBeenCalled()
  },
}
export default meta
