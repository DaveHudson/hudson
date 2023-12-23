import {
  Description as HeadlessDescription,
  Field as HeadlessField,
  Fieldset as HeadlessFieldset,
  Label as HeadlessLabel,
  Legend as HeadlessLegend,
  type DescriptionProps as HeadlessDescriptionProps,
  type FieldProps as HeadlessFieldProps,
  type FieldsetProps as HeadlessFieldsetProps,
  type LabelProps as HeadlessLabelProps,
  type LegendProps as HeadlessLegendProps,
} from "@headlessui/react";
import clsx from "clsx";
import type React from "react";

export function Fieldset({ className, ...props }: { disabled?: boolean } & HeadlessFieldsetProps) {
  return (
    <HeadlessFieldset
      {...props}
      className={clsx(className, "[&>*+[data-slot=control]]:ui-mt-6 [&>[data-slot=text]]:ui-mt-1")}
    />
  );
}

export function Legend({ ...props }: HeadlessLegendProps) {
  return (
    <HeadlessLegend
      {...props}
      data-slot="legend"
      className={clsx(
        props.className,
        "ui-text-base/6 ui-font-semibold ui-text-zinc-950 data-[disabled]:ui-opacity-50 sm:ui-text-sm/6 dark:ui-text-white"
      )}
    />
  );
}

export function FieldGroup({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div {...props} data-slot="control" className={clsx(className, "space-y-8")} />;
}

export function Field({ className, ...props }: HeadlessFieldProps) {
  return (
    <HeadlessField
      className={clsx(
        className,
        "[&>[data-slot=label]+[data-slot=control]]:ui-mt-3",
        "[&>[data-slot=label]+[data-slot=description]]:ui-mt-1",
        "[&>[data-slot=description]+[data-slot=control]]:ui-mt-3",
        "[&>[data-slot=control]+[data-slot=description]]:ui-mt-3",
        "[&>[data-slot=control]+[data-slot=error]]:ui-mt-3",
        "[&>[data-slot=label]]:ui-font-medium"
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: { className?: string } & HeadlessLabelProps) {
  return (
    <HeadlessLabel
      {...props}
      data-slot="label"
      className={clsx(
        className,
        "ui-select-none ui-text-base/6 ui-text-zinc-950 data-[disabled]:ui-opacity-50 sm:ui-text-sm/6 dark:ui-text-white"
      )}
    />
  );
}

export function Description({
  className,
  disabled,
  ...props
}: { className?: string; disabled?: boolean } & HeadlessDescriptionProps) {
  return (
    <HeadlessDescription
      {...props}
      data-slot="description"
      className={clsx(
        className,
        "ui-text-base/6 ui-text-zinc-500 data-[disabled]:ui-opacity-50 sm:ui-text-sm/6 dark:ui-text-zinc-400"
      )}
    />
  );
}

export function ErrorMessage({
  className,
  disabled,
  ...props
}: { className?: string; disabled?: boolean } & HeadlessDescriptionProps) {
  return (
    <HeadlessDescription
      {...props}
      data-slot="error"
      className={clsx(
        className,
        "ui-text-base/6 ui-text-red-600 data-[disabled]:ui-opacity-50 sm:ui-text-sm/6 dark:ui-text-red-500"
      )}
    />
  );
}
