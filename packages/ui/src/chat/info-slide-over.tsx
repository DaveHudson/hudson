import { Fragment } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { cn } from "../../lib/utils";

export default function InfoSlideOver({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="ui-relative ui-z-10" onClose={setOpen}>
        <div className="ui-fixed ui-inset-0" />

        <div className="ui-fixed ui-inset-0 ui-overflow-hidden">
          <div className="ui-absolute ui-inset-0 ui-overflow-hidden">
            <div className="ui-pointer-events-none ui-fixed ui-inset-y-16 ui-right-0 ui-flex ui-max-w-full ui-pl-10 sm:ui-pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="ui-pointer-events-auto ui-w-screen ui-max-w-md">
                  <div className="ui-flex ui-h-full ui-flex-col ui-overflow-y-scroll ui-bg-white ui-shadow-xl">
                    <div className="ui-px-4 ui-py-6 sm:ui-px-6">
                      <div className="ui-flex ui-items-start ui-justify-between">
                        <h2
                          id="slide-over-heading"
                          className="ui-text-base ui-font-semibold ui-leading-6 ui-text-gray-900"
                        >
                          Open AI
                        </h2>
                        <div className="ui-ml-3 ui-flex ui-h-7 ui-items-center">
                          <button
                            type="button"
                            className="ui-relative ui-rounded-md ui-bg-white ui-text-gray-400 hover:ui-text-gray-500 focus:ui-ring-2 focus:ui-ring-sky-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="ui-absolute ui--inset-2.5" />
                            <span className="ui-sr-only">Close panel</span>
                            <XMarkIcon className="ui-h-6 ui-w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div>
                      <div className="ui-pb-1 sm:ui-pb-6">
                        <div>
                          <div className="ui-mt-6 ui-px-4 sm:ui-mt-8 sm:ui-flex sm:ui-items-end sm:ui-px-6">
                            <div className="sm:ui-flex-1">
                              <div>
                                <div className="ui-flex ui-items-center">
                                  <h3 className="ui-text-xl ui-font-bold ui-text-gray-900 sm:ui-text-2xl">Chat GPT</h3>
                                  <span className="ui-ml-2.5 ui-inline-block ui-h-2 ui-w-2 ui-flex-shrink-0 ui-rounded-full ui-bg-green-400">
                                    <span className="ui-sr-only">Online</span>
                                  </span>
                                </div>
                                <p className="ui-text-sm ui-text-gray-500">gpt-3.5-turbo-instruct</p>
                              </div>
                              <div className="ui-mt-5 ui-flex ui-flex-wrap ui-space-y-3 sm:ui-space-x-3 sm:ui-space-y-0">
                                <a href="https://openai.com/chatgpt" target="_blank">
                                  <button
                                    type="button"
                                    className="ui-inline-flex ui-w-full ui-flex-shrink-0 ui-items-center ui-justify-center ui-rounded-md !ui-bg-sky-600 ui-px-3 ui-py-2 ui-text-sm ui-font-semibold ui-text-white ui-shadow-sm hover:!ui-bg-sky-500 focus-visible:ui-outline focus-visible:ui-outline-2 focus-visible:ui-outline-offset-2 focus-visible:ui-outline-sky-600 sm:ui-flex-1"
                                  >
                                    Website
                                  </button>
                                </a>
                                <a href="https://platform.openai.com/docs/introduction" target="_blank">
                                  <button
                                    type="button"
                                    className="ui-inline-flex ui-w-full ui-flex-1 ui-items-center ui-justify-center ui-rounded-md ui-bg-white ui-px-3 ui-py-2 ui-text-sm ui-font-semibold ui-text-gray-900 ui-shadow-sm ui-ring-1 ui-ring-inset ui-ring-gray-300 hover:ui-bg-gray-50"
                                  >
                                    Docs
                                  </button>
                                </a>
                                <div className="ui-ml-3 ui-inline-flex sm:ui-ml-0">
                                  <Menu as="div" className="ui-relative ui-inline-block ui-text-left">
                                    <Menu.Button className="ui-relative ui-inline-flex ui-items-center ui-rounded-md ui-bg-white ui-p-2 ui-text-gray-400 ui-shadow-sm ui-ring-1 ui-ring-inset ui-ring-gray-300 hover:ui-bg-gray-50">
                                      <span className="ui-absolute ui--inset-1" />
                                      <span className="ui-sr-only">Open options menu</span>
                                      <EllipsisVerticalIcon className="ui-h-5 ui-w-5" aria-hidden="true" />
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
                                      <Menu.Items className="ui-absolute ui-right-0 ui-z-10 ui-mt-2 ui-w-48 ui-origin-top-right ui-rounded-md ui-bg-white ui-shadow-lg ui-ring-1 ui-ring-black ui-ring-opacity-5 focus:ui-outline-none">
                                        <div className="ui-py-1">
                                          <Menu.Item>
                                            {({ active }) => (
                                              <a
                                                href="#"
                                                className={cn(
                                                  active ? "ui-bg-gray-100 ui-text-gray-900" : "ui-text-gray-700",
                                                  "ui-block ui-px-4 ui-py-2 ui-text-sm"
                                                )}
                                              >
                                                View profile
                                              </a>
                                            )}
                                          </Menu.Item>
                                          <Menu.Item>
                                            {({ active }) => (
                                              <a
                                                href="#"
                                                className={cn(
                                                  active ? "ui-bg-gray-100 ui-text-gray-900" : "ui-text-gray-700",
                                                  "ui-block ui-px-4 ui-py-2 ui-text-sm"
                                                )}
                                              >
                                                Copy profile link
                                              </a>
                                            )}
                                          </Menu.Item>
                                        </div>
                                      </Menu.Items>
                                    </Transition>
                                  </Menu>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ui-px-4 ui-pb-5 ui-pt-5 sm:ui-px-0 sm:ui-pt-0">
                        <dl className="ui-space-y-8 ui-px-4 sm:ui-space-y-6 sm:ui-px-6">
                          <div>
                            <dt className="ui-text-sm ui-font-medium ui-text-gray-500 sm:ui-w-40 sm:ui-flex-shrink-0">
                              Info
                            </dt>
                            <dd className="ui-mt-1 ui-text-sm ui-text-gray-900 sm:ui-col-span-2">
                              <p>Chat with Open AI Chat GPT gpt-3.5-turbo-instruct model.</p>
                            </dd>
                          </div>
                          <div>
                            <dt className="ui-text-sm ui-font-medium ui-text-gray-500 sm:ui-w-40 sm:ui-flex-shrink-0">
                              Prompt
                            </dt>
                            <dd className="ui-mt-1 ui-text-sm ui-text-gray-900 sm:ui-col-span-2">
                              <pre className="ui-whitespace-pre-wrap">
                                You are a helpful assistant. All responses must be succinct and to the point. Current
                                conversation: `{`chat_history`}` User: `{`input`}` AI:
                              </pre>
                            </dd>
                          </div>
                          <div>
                            <dt className="ui-text-sm ui-font-medium ui-text-gray-500 sm:ui-w-40 sm:ui-flex-shrink-0">
                              Temperature
                            </dt>
                            <dd className="ui-mt-1 ui-text-sm ui-text-gray-900 sm:ui-col-span-2">0.8</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
