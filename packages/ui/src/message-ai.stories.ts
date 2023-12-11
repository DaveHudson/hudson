import type { Meta, StoryObj } from '@storybook/react';
import  MessageAI  from './message-ai';

const meta = {
  title: 'UI/Chat/MessageAI',
  component: MessageAI,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof MessageAI>;

export default meta;
type Story = StoryObj<typeof meta>;


export const DefaultMessage: Story = {
  args: {
    children: 'This is a default message displayed by MessageAI component.',
  },
};


export const LongMessage: Story = {
  args: {
    children: 'This is a longer example message to demonstrate how the MessageAI component handles more content. It shows the flexibility of the component in displaying varying lengths of text.',
  },
};
