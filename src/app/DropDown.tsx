import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function DropDown() {
  return (
    <Menu as="div" className="inline-block text-center">
      <div>
        <Menu.Button className="inline-flex justify-center gap-x-6  mb-3 rounded-md px-2 text-sm font-semibold dark:text-gray-100 shadow-sm">
          Issac Jacob
          <ChevronDownIcon
            className="-mr-1 h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-100"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-100"
      >
        <Menu.Items className="z-10 w-40 right-0 top-10 origin-top divide-y -mt-20 divide-gray-100 rounded-md dark:bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-2 py-2">
            <Menu.Item>
              {({ active }) => (
                <p
                  className={`text-xs dark:text-gray-900 cursor-pointer font-medium hover:bg-gray-300 ${
                    active ? "text-indigo-600" : "hover:text-indigo-600 "
                  }`}
                >
                  Signed in as
                </p>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <p
                  className={`truncate text-xs font-medium dark:text-gray-600 cursor-pointer hover:bg-gray-300 ${
                    active ? "text-indigo-600" : "hover:text-indigo-600"
                  }`}
                >
                  IssacJacob
                </p>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
