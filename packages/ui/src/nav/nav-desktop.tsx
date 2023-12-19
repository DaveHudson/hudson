import { cn } from "../../lib/utils";
import Link from "next/link";
import { Cog6ToothIcon, RectangleGroupIcon } from "@heroicons/react/24/outline";

// TODO: Duplicated in navigation.tsx
export type NavigationItem = {
  name: string;
  href: string;
  subNav?: boolean;
  icon: any;
  current: boolean;
};

export default function NavigationDesktop({ navigation }: { navigation: NavigationItem[] }) {
  return (
    <div className="ui-hidden lg:ui-fixed lg:ui-inset-y-0 lg:ui-z-50 lg:ui-flex lg:ui-w-72 lg:ui-flex-col">
      <div className="ui-flex ui-grow ui-flex-col ui-gap-y-5 ui-overflow-y-auto ui-border-r ui-border-gray-200 dark:ui-border-gray-700 ui-px-6 ui-pb-4">
        <div className="ui-flex ui-h-16 ui-shrink-0 ui-items-center">
          <RectangleGroupIcon className="h-8 w-auto stroke-sky-600" />
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
                          ? "ui-bg-gray-50 ui-text-sky-600"
                          : "ui-text-gray-700 dark:ui-text-gray-300 hover:ui-text-sky-600 hover:ui-bg-gray-50 dark:hoveui-text-gray-300 dark:hover:ui-bg-gray-700",
                        item.subNav && "ml-4",
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
    </div>
  );
}
