// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';
import { Simple } from './Simple';

const meta: Meta<typeof Simple> = {
  component: Simple,
  title: 'Welcome2',
};

export default meta;
type Story = StoryObj<typeof Simple>;

//👇 Throws a type error if the args don't match the component props
export const Simple1: Story = {
  args: {
    // primary: true,
  },
};
