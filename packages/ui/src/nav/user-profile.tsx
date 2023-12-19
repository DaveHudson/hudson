import { cn } from "../../lib/utils";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Fragment } from "react";

export default function UserProfile() {
  const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  return (
    <Menu as="div" className="ui-relative">
      <Menu.Button className="ui--m-1.5 ui-flex ui-items-center ui-p-1.5">
        <span className="ui-sr-only">Open user menu</span>
        <img
          className="ui-h-8 ui-w-8 ui-rounded-full ui-bg-gray-50"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <span className="ui-hidden lg:ui-flex lg:ui-items-center">
          <span
            className="ui-ml-4 ui-text-sm ui-font-semibold ui-leading-6 ui-text-gray-900 dark:ui-text-gray-300"
            aria-hidden="true"
          >
            Dave Hudson
          </span>
          <ChevronDownIcon className="ui-ml-2 ui-h-5 ui-w-5 ui-text-gray-400" aria-hidden="true" />
        </span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="ui-absolute ui-right-0 ui-z-10 ui-mt-2.5 ui-w-32 ui-origin-top-right ui-rounded-md ui-py-2 ui-shadow-lg ui-ring-1 ui-ring-gray-900/5 focus:ui-outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  href={item.href}
                  className={cn(
                    active ? "ui-bg-gray-50 dark:ui-bg-gray-700" : "",
                    "ui-block ui-px-3 ui-py-1 ui-text-sm ui-leading-6 ui-text-gray-900 dark:ui-text-gray-300"
                  )}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
