import type { Meta, StoryObj } from "@storybook/react";
import { Availability } from "./availability";
import { Availability as AvailabilityEnum } from "../../../../apps/cv-ai-chat/src/app/utils/availability";

const meta = {
  title: "UI/Chat/Availability",
  component: Availability,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Availability>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: AvailabilityEnum.SpecificDate,
  },
};
