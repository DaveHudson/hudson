import type { Meta, StoryObj } from '@storybook/react';
import  MessageUser  from './message-user';

const meta = {
  title: 'UI/Chat/MessageUser',
  component: MessageUser,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof MessageUser>;

export default meta;
type Story = StoryObj<typeof meta>;


export const DefaultMessage: Story = {
  args: {
    children: 'This is a default message displayed by MessageUsercomponent.',
  },
};


export const LongMessage: Story = {
  args: {
    children: 'This is a longer example message to demonstrate how the MessageUser component handles more content. It shows the flexibility of the component in displaying varying lengths of text.',
  },
};
