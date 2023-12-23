import { Button as HeadlessButton, type ButtonProps as HeadlessButtonProps } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { TouchTarget } from "./button";
import { Link } from "./link";

let colors = {
  red: "ui-bg-red-500/15 ui-text-red-700 group-data-[hover]:ui-bg-red-500/25 dark:ui-bg-red-500/10 dark:ui-text-red-400 dark:group-data-[hover]:ui-bg-red-500/20",
  orange:
    "ui-bg-orange-500/15 ui-text-orange-700 group-data-[hover]:ui-bg-orange-500/25 dark:ui-bg-orange-500/10 dark:ui-text-orange-400 dark:group-data-[hover]:ui-bg-orange-500/20",
  amber:
    "ui-bg-amber-400/20 ui-text-amber-700 group-data-[hover]:ui-bg-amber-400/30 dark:ui-bg-amber-400/10 dark:ui-text-amber-400 dark:group-data-[hover]:ui-bg-amber-400/15",
  yellow:
    "ui-bg-yellow-400/20 ui-text-yellow-700 group-data-[hover]:ui-bg-yellow-400/30 dark:ui-bg-yellow-400/10 dark:ui-text-yellow-300 dark:group-data-[hover]:ui-bg-yellow-400/15",
  lime: "ui-bg-lime-400/20 ui-text-lime-700 group-data-[hover]:ui-bg-lime-400/30 dark:ui-bg-lime-400/10 dark:ui-text-lime-300 dark:group-data-[hover]:ui-bg-lime-400/15",
  green:
    "ui-bg-green-500/15 ui-text-green-700 group-data-[hover]:ui-bg-green-500/25 dark:ui-bg-green-500/10 dark:ui-text-green-400 dark:group-data-[hover]:ui-bg-green-500/20",
  emerald:
    "ui-bg-emerald-500/15 ui-text-emerald-700 group-data-[hover]:ui-bg-emerald-500/25 dark:ui-bg-emerald-500/10 dark:ui-text-emerald-400 dark:group-data-[hover]:ui-bg-emerald-500/20",
  teal: "ui-bg-teal-500/15 ui-text-teal-700 group-data-[hover]:ui-bg-teal-500/25 dark:ui-bg-teal-500/10 dark:ui-text-teal-300 dark:group-data-[hover]:ui-bg-teal-500/20",
  cyan: "ui-bg-cyan-400/20 ui-text-cyan-700 group-data-[hover]:ui-bg-cyan-400/30 dark:ui-bg-cyan-400/10 dark:ui-text-cyan-300 dark:group-data-[hover]:ui-bg-cyan-400/15",
  sky: "ui-bg-sky-500/15 ui-text-sky-700 group-data-[hover]:ui-bg-sky-500/25 dark:ui-bg-sky-500/10 dark:ui-text-sky-300 dark:group-data-[hover]:ui-bg-sky-500/20",
  blue: "ui-bg-blue-500/15 ui-text-blue-700 group-data-[hover]:ui-bg-blue-500/25 dark:ui-text-blue-400 dark:group-data-[hover]:ui-bg-blue-500/25",
  indigo:
    "ui-bg-indigo-500/15 ui-text-indigo-700 group-data-[hover]:ui-bg-indigo-500/25 dark:ui-text-indigo-400 dark:group-data-[hover]:ui-bg-indigo-500/20",
  violet:
    "ui-bg-violet-500/15 ui-text-violet-700 group-data-[hover]:ui-bg-violet-500/25 dark:ui-text-violet-400 dark:group-data-[hover]:ui-bg-violet-500/20",
  purple:
    "ui-bg-purple-500/15 ui-text-purple-700 group-data-[hover]:ui-bg-purple-500/25 dark:ui-text-purple-400 dark:group-data-[hover]:ui-bg-purple-500/20",
  fuchsia:
    "ui-bg-fuchsia-400/15 ui-text-fuchsia-700 group-data-[hover]:ui-bg-fuchsia-400/25 dark:ui-bg-fuchsia-400/10 dark:ui-text-fuchsia-400 dark:group-data-[hover]:ui-bg-fuchsia-400/20",
  pink: "ui-bg-pink-400/15 ui-text-pink-700 group-data-[hover]:ui-bg-pink-400/25 dark:ui-bg-pink-400/10 dark:ui-text-pink-400 dark:group-data-[hover]:ui-bg-pink-400/20",
  rose: "ui-bg-rose-400/15 ui-text-rose-700 group-data-[hover]:ui-bg-rose-400/25 dark:ui-bg-rose-400/10 dark:ui-text-rose-400 dark:group-data-[hover]:ui-bg-rose-400/20",
  zinc: "ui-bg-zinc-600/10 ui-text-zinc-700 group-data-[hover]:ui-bg-zinc-600/20 dark:ui-bg-white/5 dark:ui-text-zinc-400 dark:group-data-[hover]:ui-bg-white/10",
};

type BadgeProps = { color?: keyof typeof colors };

export function Badge({ color = "zinc", className, ...props }: BadgeProps & React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        "ui-inline-flex ui-items-center ui-gap-x-1.5 ui-rounded-md ui-px-1.5 ui-py-0.5 ui-text-sm/5 ui-font-medium sm:ui-text-xs/5 forced-colors:ui-outline",
        colors[color]
      )}
    />
  );
}

export const BadgeButton = React.forwardRef(function BadgeButton(
  {
    color = "zinc",
    className,
    children,
    ...props
  }: BadgeProps & { children: React.ReactNode } & (HeadlessButtonProps | React.ComponentPropsWithoutRef<typeof Link>),
  ref: React.ForwardedRef<HTMLElement>
) {
  let classes = clsx(
    className,
    "group relative inline-flex rounded-md focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500"
  );

  return "href" in props ? (
    <Link {...props} className={classes} ref={ref as React.ForwardedRef<HTMLAnchorElement>}>
      <TouchTarget>
        <Badge color={color}>{children}</Badge>
      </TouchTarget>
    </Link>
  ) : (
    <HeadlessButton {...props} className={classes} ref={ref}>
      <TouchTarget>
        <Badge color={color}>{children}</Badge>
      </TouchTarget>
    </HeadlessButton>
  );
});
