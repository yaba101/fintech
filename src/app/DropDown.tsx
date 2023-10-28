import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown() {
  return (
    <Menu as="div" className="inline-block text-center">
      <div>
        <Menu.Button className="inline-flex justify-center gap-x-6 rounded-md px-2 text-sm font-semibold text-gray-100 shadow-sm ">
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
        <Menu.Items className=" z-10 w-50 right-1/2 transform translate-x-1/2 origin-top divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-2">
            <p className="text-sm">Signed in as</p>
            <p className="truncate text-xs text-gray-900">tom@example.com</p>
          </div>

          <div className="">
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 text-xs"
                        : "text-gray-700",
                      "block w-full px-2 text-left text-xs"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
