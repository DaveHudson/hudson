import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type SelectItem = {
  id: Number;
  name: string;
};

export function Select({
  label,
  labelHidden = false,
  items,
  onChange,
}: {
  label: string;
  labelHidden?: boolean;
  items: SelectItem[];
  onChange: (item: SelectItem) => void;
}) {
  const [selected, setSelected] = useState(items[0]);

  const handleSelect = (item: SelectItem) => {
    setSelected(item);
    onChange(item);
  };

  return (
    <Listbox value={selected} onChange={handleSelect}>
      {({ open }) => (
        <>
          <Listbox.Label
            hidden={labelHidden}
            className={`ui-block ui-text-sm ui-font-medium ui-leading-6 !dark:ui-text-gray-900`}
          >
            {label}
          </Listbox.Label>
          <div className="ui-relative ui-mt-2">
            <Listbox.Button className="ui-relative ui-w-full ui-cursor-default ui-rounded-md !dark:ui-bg-white ui-py-1.5 ui-pl-3 ui-pr-10 ui-text-left !dark:ui-text-gray-900 ui-shadow-sm ui-ring-1 ui-ring-inset ui-ring-gray-300 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-sky-600 sm:ui-text-sm sm:ui-leading-6">
              <span className="ui-block ui-truncate">{selected.name}</span>
              <span className="ui-pointer-events-none ui-absolute ui-inset-y-0 ui-right-0 ui-flex ui-items-center ui-pr-2">
                <ChevronUpDownIcon className="ui-h-5 ui-w-5 ui-text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="ui-absolute ui-z-10 ui-mt-1 ui-max-h-60 ui-w-full ui-overflow-auto ui-rounded-md !dark:ui-bg-white ui-py-1 ui-text-base ui-shadow-lg ui-ring-1 ui-ring-black ui-ring-opacity-5 focus:ui-outline-none sm:ui-text-sm">
                {items.map((item) => (
                  <Listbox.Option
                    key={item.id.toString()}
                    className={({ active }) =>
                      classNames(
                        active ? "ui-bg-sky-600 !dark:ui-text-white" : "!dark:ui-text-gray-900",
                        "ui-relative ui-cursor-default ui-select-none ui-py-2 ui-pl-8 ui-pr-4"
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "ui-font-semibold" : "ui-font-normal",
                            "ui-block ui-truncate"
                          )}
                        >
                          {item.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "ui-text-white" : "ui-text-sky-600",
                              "ui-absolute ui-inset-y-0 ui-left-0 ui-flex ui-items-center ui-pl-1.5"
                            )}
                          >
                            <CheckIcon className="ui-h-5 ui-w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
