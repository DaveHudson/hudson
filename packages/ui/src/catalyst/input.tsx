import { Input as HeadlessInput, type InputProps as HeadlessInputProps } from "@headlessui/react";
import { clsx } from "clsx";

const dateTypes = ["date", "datetime-local", "month", "time", "week"];
type DateType = (typeof dateTypes)[number];

export function Input({
  className,
  ...props
}: {
  type?: "email" | "number" | "password" | "search" | "tel" | "text" | "url" | DateType;
} & HeadlessInputProps) {
  return (
    <span
      data-slot="control"
      className={clsx([
        className,

        // Basic layout
        "ui-relative ui-block ui-w-full",

        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        "before:ui-absolute before:ui-inset-px before:ui-rounded-[calc(theme(borderRadius.lg)-1px)] before:ui-bg-white before:ui-shadow",

        // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        "dark:before:ui-hidden",

        // Focus ring
        "after:ui-pointer-events-none after:ui-absolute after:ui-inset-0 after:ui-rounded-lg after:ui-ring-inset after:ui-ring-transparent sm:after:focus-within:ui-ring-2 sm:after:focus-within:ui-ring-blue-500",

        // Disabled state
        "has-[[data-disabled]]:ui-opacity-50 before:has-[[data-disabled]]:ui-bg-zinc-950/5 before:has-[[data-disabled]]:ui-shadow-none",

        // Invalid state
        "before:has-[[data-invalid]]:ui-shadow-red-500/10",
      ])}
    >
      <HeadlessInput
        className={clsx([
          // Date classes
          props.type &&
            dateTypes.includes(props.type) && [
              "[&::-webkit-datetime-edit-fields-wrapper]:ui-p-0",
              "[&::-webkit-date-and-time-value]:ui-min-h-[1.5em]",
              "[&::-webkit-datetime-edit]:ui-inline-flex",
              "[&::-webkit-datetime-edit]:ui-p-0",
              "[&::-webkit-datetime-edit-year-field]:ui-p-0",
              "[&::-webkit-datetime-edit-month-field]:ui-p-0",
              "[&::-webkit-datetime-edit-day-field]:ui-p-0",
              "[&::-webkit-datetime-edit-hour-field]:ui-p-0",
              "[&::-webkit-datetime-edit-minute-field]:ui-p-0",
              "[&::-webkit-datetime-edit-second-field]:ui-p-0",
              "[&::-webkit-datetime-edit-millisecond-field]:ui-p-0",
              "[&::-webkit-datetime-edit-meridiem-field]:ui-p-0",
            ],

          // Basic layout
          "ui-relative ui-block ui-w-full ui-appearance-none ui-rounded-lg ui-px-[calc(theme(spacing[3.5])-1px)] ui-py-[calc(theme(spacing[2.5])-1px)] sm:ui-px-[calc(theme(spacing[3])-1px)] sm:ui-py-[calc(theme(spacing[1.5])-1px)]",

          // Typography
          "ui-text-base/6 ui-text-zinc-950 placeholder:ui-text-zinc-500 sm:ui-text-sm/6 dark:ui-text-white",

          // Border
          "ui-border ui-border-zinc-950/10 data-[hover]:ui-border-zinc-950/20 dark:ui-border-white/10 dark:data-[hover]:ui-border-white/20",

          // Background color
          "ui-bg-transparent dark:ui-bg-white/5",

          // Hide default focus styles
          "focus:ui-outline-none",

          // Invalid state
          "data-[invalid]:ui-border-red-500 data-[invalid]:data-[hover]:ui-border-red-500 data-[invalid]:dark:ui-border-red-500 data-[invalid]:data-[hover]:dark:ui-border-red-500",

          // Disabled state
          "data-[disabled]:ui-border-zinc-950/20 dark:data-[hover]:data-[disabled]:ui-border-white/15 data-[disabled]:dark:ui-border-white/15 data-[disabled]:dark:ui-bg-white/[2.5%]",
        ])}
        {...props}
      />
    </span>
  );
}
