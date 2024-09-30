// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';
import { MyButton } from './MyButton';

const meta: Meta<typeof MyButton> = {
  component: MyButton,
  title: 'Welcome2',
};

export default meta;
type Story = StoryObj<typeof MyButton>;

//👇 Throws a type error if the args don't match the component props
export const Primary123: Story = {
  args: {
    // primary: true,
  },
};
