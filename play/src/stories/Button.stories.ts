import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { XyButton } from '@xy-ui/core'
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
export const Default: Story = Template.bind({})
export default meta
