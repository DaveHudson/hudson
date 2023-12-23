import { Button as HeadlessButton, type ButtonProps as HeadlessButtonProps } from "@headlessui/react";
import { clsx } from "clsx";
import React from "react";
import { Link } from "./link";

let styles = {
  base: [
    // Base
    "ui-relative ui-isolate ui-inline-flex ui-items-center ui-justify-center ui-gap-x-2 ui-rounded-lg ui-border ui-text-base/6 ui-font-semibold",

    // Sizing
    "ui-px-[calc(theme(spacing[3.5])-1px)] ui-py-[calc(theme(spacing[2.5])-1px)] sm:ui-px-[calc(theme(spacing.3)-1px)] sm:ui-py-[calc(theme(spacing[1.5])-1px)] sm:ui-text-sm/6",

    // Focus
    "focus:ui-outline-none data-[focus]:ui-outline data-[focus]:ui-outline-2 data-[focus]:ui-outline-offset-2 data-[focus]:ui-outline-blue-500",

    // Disabled
    "data-[disabled]:ui-opacity-50",

    // Icon
    "[&>[data-slot=icon]]:ui--mx-0.5 [&>[data-slot=icon]]:ui-my-0.5 [&>[data-slot=icon]]:ui-size-5 [&>[data-slot=icon]]:ui-shrink-0 [&>[data-slot=icon]]:ui-text-[--btn-icon] [&>[data-slot=icon]]:sm:ui-my-1 [&>[data-slot=icon]]:sm:ui-size-4 forced-colors:ui-[--btn-icon:ButtonText] forced-colors:data-[hover]:ui-[--btn-icon:ButtonText]",
  ],
  solid: [
    // Optical border, implemented as the button background to avoid corner artifacts
    "ui-border-transparent ui-bg-[--btn-border]",

    // Dark mode: border is rendered on `after` so background is set to button background
    "dark:ui-bg-[--btn-bg]",

    // Button background, implemented as foreground layer to stack on top of pseudo-border layer
    "before:ui-absolute before:ui-inset-0 before:ui--z-10 before:ui-rounded-[calc(theme(borderRadius.lg)-1px)] before:ui-bg-[--btn-bg]",

    // Drop shadow, applied to the inset `before` layer so it blends with the border
    "before:ui-shadow",

    // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
    "dark:before:ui-hidden",

    // Dark mode: Subtle white outline is applied using a border
    "dark:ui-border-white/5",

    // Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
    "after:ui-absolute after:ui-inset-0 after:ui--z-10 after:ui-rounded-[calc(theme(borderRadius.lg)-1px)]",

    // Inner highlight shadow
    "after:ui-shadow-[shadow:inset_0_1px_theme(colors.white/15%)]",

    // White overlay on hover
    "after:data-[active]:ui-bg-[--btn-hover-overlay] after:data-[hover]:ui-bg-[--btn-hover-overlay]",
    // Dark mode: `after` layer expands to cover entire button
    "ui-dark:after:ui--inset-px ui-dark:after:ui-rounded-lg",

    // Disabled
    "ui-before:data-[disabled]:ui-shadow-none ui-after:data-[disabled]:ui-shadow-none",
  ],
  outline: [
    // Base
    "ui-border-zinc-950/10 ui-text-zinc-950 ui-data-[active]:bg-zinc-950/[2.5%] ui-data-[hover]:bg-zinc-950/[2.5%]",

    // Dark mode
    "ui-dark:border-white/15 ui-dark:text-white ui-dark:[--btn-bg:transparent] ui-dark:data-[active]:bg-white/5 ui-dark:data-[hover]:bg-white/5",

    // Icon
    "[--btn-icon:theme(colors.zinc.500)] ui-data-[active]:[--btn-icon:theme(colors.zinc.700)] ui-data-[hover]:[--btn-icon:theme(colors.zinc.700)] ui-dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] ui-dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)]",
  ],
  plain: [
    // Base
    "ui-border-transparent ui-text-zinc-950 ui-data-[active]:bg-zinc-950/5 ui-data-[active]:bg-zinc-950/5",

    // Dark mode
    "ui-data-[hover]:bg-zinc-950/5 ui-dark:text-white ui-dark:data-[active]:bg-white/10 ui-dark:data-[active]:bg-white/10 ui-dark:data-[hover]:bg-white/10",

    // Icon
    "[--btn-icon:theme(colors.zinc.500)] ui-data-[active]:[--btn-icon:theme(colors.zinc.700)] ui-data-[active]:[--btn-icon:theme(colors.zinc.700)] ui-data-[hover]:[--btn-icon:theme(colors.zinc.700)] ui-dark:[--btn-icon:theme(colors.zinc.500)] ui-dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] ui-dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] ui-dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)]",
  ],
  colors: {
    "dark/zinc": [
      "ui-text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]",
      "ui-dark:text-white ui-dark:[--btn-bg:theme(colors.zinc.600)] ui-dark:[--btn-hover-overlay:theme(colors.white/5%)]",
      "[--btn-icon:theme(colors.zinc.400)] ui-data-[active]:[--btn-icon:theme(colors.zinc.300)] ui-data-[hover]:[--btn-icon:theme(colors.zinc.300)]",
    ],
    light: [
      "ui-text-zinc-950 [--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)] ui-data-[active]:[--btn-border:theme(colors.zinc.950/15%)] ui-data-[hover]:[--btn-border:theme(colors.zinc.950/15%)]",
      "ui-dark:text-white ui-dark:[--btn-hover-overlay:theme(colors.white/5%)] ui-dark:[--btn-bg:theme(colors.zinc.800)]",
      "[--btn-icon:theme(colors.zinc.500)] ui-data-[active]:[--btn-icon:theme(colors.zinc.700)] ui-data-[hover]:[--btn-icon:theme(colors.zinc.700)] ui-dark:[--btn-icon:theme(colors.zinc.500)] ui-dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] ui-dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)]",
    ],
    "dark/white": [
      "ui-text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]",
      "ui-dark:text-zinc-950 ui-dark:[--btn-bg:white] ui-dark:[--btn-hover-overlay:theme(colors.zinc.950/2.5%)] ui-dark:[--btn-hover-overlay:theme(colors.zinc.950/5%)]",
      "[--btn-icon:theme(colors.zinc.400)] ui-data-[active]:[--btn-icon:theme(colors.zinc.300)] ui-data-[hover]:[--btn-icon:theme(colors.zinc.300)] ui-dark:[--btn-icon:theme(colors.zinc.500)] ui-dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] ui-dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)]",
    ],
    dark: [
      "ui-text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]",
      "ui-dark:[--btn-hover-overlay:theme(colors.white/5%)] ui-dark:[--btn-bg:theme(colors.zinc.800)]",
      "[--btn-icon:theme(colors.zinc.400)] ui-data-[active]:[--btn-icon:theme(colors.zinc.300)] ui-data-[hover]:[--btn-icon:theme(colors.zinc.300)]",
    ],
    white: [
      "ui-text-zinc-950 [--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)] ui-data-[active]:[--btn-border:theme(colors.zinc.950/15%)] ui-data-[hover]:[--btn-border:theme(colors.zinc.950/15%)]",
      "ui-dark:[--btn-hover-overlay:theme(colors.zinc.950/5%)]",
      "[--btn-icon:theme(colors.zinc.400)] ui-data-[active]:[--btn-icon:theme(colors.zinc.500)] ui-data-[hover]:[--btn-icon:theme(colors.zinc.500)]",
    ],
    zinc: [
      "ui-text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.zinc.600)] [--btn-border:theme(colors.zinc.700/90%)]",
      "ui-dark:[--btn-hover-overlay:theme(colors.white/5%)]",
      "[--btn-icon:theme(colors.zinc.400)] ui-data-[active]:[--btn-icon:theme(colors.zinc.300)] ui-data-[hover]:[--btn-icon:theme(colors.zinc.300)]",
    ],
    indigo: [
      "ui-text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.indigo.500)] [--btn-border:theme(colors.indigo.600/90%)]",
      "[--btn-icon:theme(colors.indigo.300)] ui-data-[active]:[--btn-icon:theme(colors.indigo.200)] ui-data-[hover]:[--btn-icon:theme(colors.indigo.200)]",
    ],
    cyan: [
      "ui-text-cyan-950 [--btn-bg:theme(colors.cyan.300)] [--btn-border:theme(colors.cyan.400/80%)] [--btn-hover-overlay:theme(colors.white/25%)]",
      "[--btn-icon:theme(colors.cyan.500)]",
    ],
    red: [
      "ui-text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.red.600)] [--btn-border:theme(colors.red.700/90%)]",
      "[--btn-icon:theme(colors.red.300)] ui-data-[active]:[--btn-icon:theme(colors.red.200)] ui-data-[hover]:[--btn-icon:theme(colors.red.200)]",
    ],
    orange: [
      "ui-text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.orange.500)] [--btn-border:theme(colors.orange.600/90%)]",
      "[--btn-icon:theme(colors.orange.300)] ui-data-[active]:[--btn-icon:theme(colors.orange.200)] ui-data-[hover]:[--btn-icon:theme(colors.orange.200)]",
    ],
    amber: [
      "ui-text-amber-950 [--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.amber.400)] [--btn-border:theme(colors.amber.500/80%)]",
      "[--btn-icon:theme(colors.amber.600)]",
    ],
    yellow: [
      "ui-text-yellow-950 [--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.yellow.300)] [--btn-border:theme(colors.yellow.400/80%)]",
      "[--btn-icon:theme(colors.yellow.600)] ui-data-[active]:[--btn-icon:theme(colors.yellow.700)] ui-data-[hover]:[--btn-icon:theme(colors.yellow.700)]",
    ],
    lime: [
      "ui-text-lime-950 [--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.lime.300)] [--btn-border:theme(colors.lime.400/80%)]",
      "[--btn-icon:theme(colors.lime.600)] ui-data-[active]:[--btn-icon:theme(colors.lime.700)] ui-data-[hover]:[--btn-icon:theme(colors.lime.700)]",
    ],
    green: [
      "ui-text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.green.600)] [--btn-border:theme(colors.green.700/90%)]",
      "[--btn-icon:theme(colors.white/60%)] ui-data-[active]:[--btn-icon:theme(colors.white/80%)] ui-data-[hover]:[--btn-icon:theme(colors.white/80%)]",
    ],
    emerald: [
      "ui-text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.emerald.600)] [--btn-border:theme(colors.emerald.700/90%)]",
      "[--btn-icon:theme(colors.white/60%)] ui-data-[active]:[--btn-icon:theme(colors.white/80%)] ui-data-[hover]:[--btn-icon:theme(colors.white/80%)]",
    ],
    teal: [
      "ui-text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.teal.600)] [--btn-border:theme(colors.teal.700/90%)]",
      "[--btn-icon:theme(colors.white/60%)] ui-data-[active]:[--btn-icon:theme(colors.white/80%)] ui-data-[hover]:[--btn-icon:theme(colors.white/80%)]",
    ],
    sky: [
      "ui-text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.sky.500)] [--btn-border:theme(colors.sky.600/80%)]",
      "[--btn-icon:theme(colors.white/60%)] ui-data-[active]:[--btn-icon:theme(colors.white/80%)] ui-data-[hover]:[--btn-icon:theme(colors.white/80%)]",
    ],
    blue: [
      "ui-text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.blue.600)] [--btn-border:theme(colors.blue.700/90%)]",
      "[--btn-icon:theme(colors.blue.400)] ui-data-[active]:[--btn-icon:theme(colors.blue.300)] ui-data-[hover]:[--btn-icon:theme(colors.blue.300)]",
    ],
    violet: [
      "ui-text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.violet.500)] [--btn-border:theme(colors.violet.600/90%)]",
      "[--btn-icon:theme(colors.violet.300)] ui-data-[active]:[--btn-icon:theme(colors.violet.200)] ui-data-[hover]:[--btn-icon:theme(colors.violet.200)]",
    ],
    purple: [
      "ui-text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.purple.500)] [--btn-border:theme(colors.purple.600/90%)]",
      "[--btn-icon:theme(colors.purple.300)] ui-data-[active]:[--btn-icon:theme(colors.purple.200)] ui-data-[hover]:[--btn-icon:theme(colors.purple.200)]",
    ],
    fuchsia: [
      "ui-text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.fuchsia.500)] [--btn-border:theme(colors.fuchsia.600/90%)]",
      "[--btn-icon:theme(colors.fuchsia.300)] ui-data-[active]:[--btn-icon:theme(colors.fuchsia.200)] ui-data-[hover]:[--btn-icon:theme(colors.fuchsia.200)]",
    ],
    pink: [
      "ui-text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.pink.500)] [--btn-border:theme(colors.pink.600/90%)]",
      "[--btn-icon:theme(colors.pink.300)] ui-data-[active]:[--btn-icon:theme(colors.pink.200)] ui-data-[hover]:[--btn-icon:theme(colors.pink.200)]",
    ],
    rose: [
      "ui-text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.rose.500)] [--btn-border:theme(colors.rose.600/90%)]",
      "[--btn-icon:theme(colors.rose.300)] ui-data-[active]:[--btn-icon:theme(colors.rose.200)] ui-data-[hover]:[--btn-icon:theme(colors.rose.200)]",
    ],
  },
};

type ButtonProps = (
  | { color?: keyof typeof styles.colors; outline?: never; plain?: never }
  | { color?: never; outline: true; plain?: never }
  | { color?: never; outline?: never; plain: true }
) & { children: React.ReactNode } & (HeadlessButtonProps | React.ComponentPropsWithoutRef<typeof Link>);

export const Button = React.forwardRef(function Button(
  { color, outline, plain, className, children, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  let classes = clsx(
    className,
    "ui-base",
    outline ? "ui-outline" : plain ? "ui-plain" : clsx("ui-solid", styles.colors[color ?? "dark/zinc"])
  );

  return "href" in props ? (
    <Link {...props} className={classes} ref={ref as React.ForwardedRef<HTMLAnchorElement>}>
      <TouchTarget>{children}</TouchTarget>
    </Link>
  ) : (
    <HeadlessButton {...props} className={clsx(classes, "ui-cursor-default")} ref={ref}>
      <TouchTarget>{children}</TouchTarget>
    </HeadlessButton>
  );
});

/* Expand the hit area to at least 44×44px on touch devices */
export function TouchTarget({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <span
        className="ui-absolute ui-left-1/2 ui-top-1/2 ui-size-[max(100%,2.75rem)] ui-translate-x-1/2 ui-translate-y-1/2 [@media(pointer:fine)]:ui-hidden"
        aria-hidden="true"
      />
    </>
  );
}
