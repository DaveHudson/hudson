import { Select as HeadlessSelect, type SelectProps as HeadlessSelectProps } from "@headlessui/react";
import { clsx } from "clsx";

export function Select({ className, multiple, ...props }: HeadlessSelectProps) {
  return (
    <span
      data-slot="control"
      className={clsx([
        className,

        // Basic layout
        "ui-group ui-relative ui-block ui-w-full",

        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        "before:ui-absolute before:ui-inset-px before:ui-rounded-[calc(theme(borderRadius.lg)-1px)] before:ui-bg-white before:ui-shadow",

        // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        "dark:before:ui-hidden",

        // Focus ring
        "after:ui-pointer-events-none after:ui-absolute after:ui-inset-0 after:ui-rounded-lg after:ui-ring-inset after:ui-ring-transparent sm:after:has-[[data-focus]]:ui-ring-2 sm:after:has-[[data-focus]]:ui-ring-sky-600",

        // Disabled state
        "has-[[data-disabled]]:ui-opacity-50 before:has-[[data-disabled]]:ui-bg-zinc-950/5 before:has-[[data-disabled]]:ui-shadow-none",
      ])}
    >
      <HeadlessSelect
        multiple={multiple}
        {...props}
        className={clsx([
          // Basic layout
          "ui-relative ui-block ui-w-full ui-appearance-none ui-rounded-lg ui-py-[calc(theme(spacing[2.5])-1px)] sm:ui-py-[calc(theme(spacing[1.5])-1px)]",

          // Horizontal padding
          multiple
            ? "ui-px-[calc(theme(spacing[3.5])-1px)] sm:ui-px-[calc(theme(spacing.3)-1px)]"
            : "ui-pl-[calc(theme(spacing[3.5])-1px)] ui-pr-[calc(theme(spacing.10)-1px)] sm:ui-pl-[calc(theme(spacing.3)-1px)] sm:ui-pr-[calc(theme(spacing.9)-1px)]",

          // Options (multi-select)
          "[&_optgroup]:ui-font-semibold",

          // Typography
          "ui-text-base/6 ui-text-zinc-950 placeholder:ui-text-zinc-500 sm:ui-text-sm/6 dark:ui-text-white dark:*:ui-text-white",

          // Border
          "ui-border ui-border-zinc-950/10 data-[hover]:ui-border-zinc-950/20 dark:ui-border-white/10 dark:data-[hover]:ui-border-white/20",

          // Background color
          "ui-bg-transparent dark:ui-bg-white/5 dark:*:ui-bg-zinc-800",

          // Hide default focus styles
          "focus:ui-outline-none",

          // Invalid state
          "data-[invalid]:ui-border-red-500 data-[invalid]:data-[hover]:ui-border-red-500 data-[invalid]:dark:ui-border-red-600 data-[invalid]:data-[hover]:dark:ui-border-red-600",

          // Disabled state
          "data-[disabled]:ui-border-zinc-950/20 data-[disabled]:ui-opacity-100 dark:data-[hover]:data-[disabled]:ui-border-white/15 data-[disabled]:dark:ui-border-white/15 data-[disabled]:dark:ui-bg-white/[2.5%]",
        ])}
      />
      {!multiple && (
        <span className="ui-pointer-events-none ui-absolute ui-inset-y-0 ui-right-0 ui-flex ui-items-center ui-pr-2">
          <svg
            className="ui-size-5 ui-stroke-zinc-500 group-has-[[data-disabled]]:ui-stroke-zinc-600 sm:ui-size-4 dark:ui-stroke-zinc-400 forced-colors:ui-stroke-[CanvasText]"
            viewBox="0 0 16 16"
            aria-hidden="true"
            fill="none"
          >
            <path d="M5.75 10.75L8 13L10.25 10.75" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.25 5.25L8 3L5.75 5.25" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </span>
  );
}
