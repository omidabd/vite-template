// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';
import { LargeDividers } from './large-dividers';

const meta: Meta<typeof LargeDividers> = {
  component: LargeDividers,
  title: 'Overflow',
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    padding: {
      type: 'number',
      control: {
        type: 'number',
        min: 0,
        max: 20,
        // step: 100,
      },
    },
    gap: {
      control: {
        type: 'number',
        min: 0,
        max: 50,
        // step: 100,
      },
    },
    minimumVisible: {
      control: {
        type: 'number',
        min: 0,
        max: 20,
        // step: 100,
      },
    },
    overflowDirection: {
      control: 'inline-radio',
      options: ['start', 'end'],
    },
  },
  args: {
    padding: 0,
    gap: 0,
    minimumVisible: 0,
    overflowAxis: 'horizontal',
    overflowDirection: 'end',
  },
};

export default meta;
type Story = StoryObj<typeof LargeDividers>;

//👇 Throws a type error if the args don't match the component props
export const WithDivider2: Story = {};
