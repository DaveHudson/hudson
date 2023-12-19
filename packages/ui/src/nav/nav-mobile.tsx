import { cn } from "../../lib/utils";
import { Dialog, Transition } from "@headlessui/react";
import { Cog6ToothIcon, RectangleGroupIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment } from "react";
import { NavigationItem } from "./nav-desktop";

export default function NavigationMobile({
  navigation,
  sidebarOpen,
  setSidebarOpen,
}: {
  navigation: NavigationItem[];
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="ui-relative ui-z-50 lg:ui-hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="ui-fixed ui-inset-0 ui-bg-gray-900/80" />
        </Transition.Child>

        <div className="ui-fixed ui-inset-0 ui-flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="ui-relative ui-mr-16 ui-flex ui-w-full ui-max-w-xs ui-flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="ui-absolute ui-left-full ui-top-0 ui-flex ui-w-16 ui-justify-center ui-pt-5">
                  <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                    <span className="ui-sr-only">Close sidebar</span>
                    <XMarkIcon className="ui-h-6 ui-w-6 ui-text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="ui-flex ui-grow ui-flex-col ui-gap-y-5 ui-overflow-y-auto ui-px-6 ui-pb-4 ui-bg-white dark:ui-bg-gray-800">
                <div className="ui-flex ui-h-16 ui-shrink-0 ui-items-center">
                  <RectangleGroupIcon className="ui-h-8 ui-w-auto ui-stroke-sky-600" />
                </div>
                <nav className="ui-flex ui-flex-1 ui-flex-col">
                  <ul role="list" className="ui-flex ui-flex-1 ui-flex-col ui-gap-y-7">
                    <li>
                      <ul role="list" className="ui--mx-2 ui-space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={cn(
                                item.current
                                  ? "ui-bg-gray-50 ui-text-sky-600 dark:ui-text-gray-800 dark:ui-bg-gray-200"
                                  : "ui-text-gray-700 dark:ui-text-gray-300 hover:ui-text-sky-600 hover:ui-bg-gray-50 dark:hover:ui-text-gray-300 dark:hover:ui-bg-gray-700",
                                item.subNav && "ui-ml-4",
                                "ui-group ui-flex ui-gap-x-3 ui-rounded-md ui-p-2 ui-text-sm ui-leading-6 ui-font-semibold"
                              )}
                            >
                              <item.icon
                                className={cn(
                                  item.current ? "ui-text-sky-600" : "ui-text-gray-400 group-hover:ui-text-sky-600",
                                  "ui-h-6 ui-w-6 ui-shrink-0"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="ui-mt-auto">
                      <Link
                        href="/settings"
                        className="ui-group ui--mx-2 ui-flex ui-gap-x-3 ui-rounded-md ui-p-2 ui-text-sm ui-font-semibold ui-leading-6 ui-text-gray-700 dark:ui-text-gray-300 hover:ui-bg-gray-50 hover:ui-text-sky-600 dark:hover:ui-text-gray-300 dark:hover:ui-bg-gray-700"
                      >
                        <Cog6ToothIcon
                          className="ui-h-6 ui-w-6 ui-shrink-0 ui-text-gray-400 group-hover:ui-text-sky-600"
                          aria-hidden="true"
                        />
                        Settings
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
