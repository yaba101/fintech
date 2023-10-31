"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BuildingStorefrontIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  MoonIcon,
  WalletIcon,
  Cog6ToothIcon,
  LockClosedIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import ColumnContainer from "@/components/ColumnContainer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SideBarDropDown from "@/components/SideBarDropDown";
import MobileDropdown from "@/components/MobileDropdown";

const FirstNavSection = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Account", href: "#", icon: UsersIcon, current: false },
  { name: "Analytics", href: "#", icon: FolderIcon, current: false },
  { name: "My Bill", href: "#", icon: WalletIcon, current: false },
  {
    name: "My Budgets",
    href: "#",
    icon: BuildingStorefrontIcon,
    current: false,
  },
  { name: "Settings", href: "#", icon: Cog6ToothIcon, current: false },
];
const SecondNavSection = [
  {
    name: "Security",
    href: "#",
    icon: LockClosedIcon,
    current: false,
  },
  {
    name: "Help Center",
    href: "#",
    icon: ChatBubbleBottomCenterTextIcon,
    current: false,
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SideBar({ children }: { children?: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80 dark:text-gray-200" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-hidden dark:bg-dark bg-slate-50 dark:text-gray-50 px-6 pb-2">
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul
                            role="list"
                            className="-mx-2 space-y-1 dark:text-gray-200 text-gray-800"
                          >
                            {FirstNavSection.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? " mt-4 bg-gray-800 text-indigo-600"
                                      : "dark:text-gray-200 hover:text-indigo-600 dark:hover:bg-gray-500  ",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-indigo-600"
                                        : "dark:text-gray-200 text-gray-800 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <ul role="list" className="-mx-2 space-y-1 ">
                            {SecondNavSection.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "dark:bg-gray-900 bg-slate-50 text-indigo-600"
                                      : "dark:text-gray-100 text-gray-800 hover:text-indigo-600 dark:hover:bg-gray-500 ",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-indigo-600"
                                        : "dark:text-gray-200 text-gray-800 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                            <li>
                              <a
                                className={
                                  "cursor-pointer dark:text-gray-200 group flex gap-x-2 rounded-md p-2 text-sm leading-6 font-semibold"
                                }
                              >
                                <MoonIcon className="h-6 w-6 shrink-0 dark:text-gray-300" />
                                Dark Mode
                                <ThemeSwitcher />
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-56 lg:flex-col">
          <div className="flex grow flex-col gap-y-2 overflow-y-hidden border-r dark:border-gray-900 shadow-md  rounded-lg dark:text-gray-50 px-6 my-2 dark:bg-dark bg-gray-50">
            <nav className="flex flex-1 flex-col mt-8">
              <ul role="list" className="flex flex-1 flex-col gap-y-3">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {FirstNavSection.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-indigo-600 text-gray-100"
                              : "dark:text-gray-100 hover:text-gray-900 dark:hover:bg-slate-500 hover:bg-gray-300 ",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "dark:text-gray-100 text-gray-900"
                                : "text-gray-400 group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <hr className="text-gray-100" />
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {SecondNavSection.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-indigo-600 text-gray-100"
                              : "dark:text-gray-100 hover:text-gray-800 dark:hover:bg-slate-500 hover:bg-gray-300",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-indigo-600"
                                : "text-gray-400 group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        className={
                          "cursor-pointer dark:text-gray-300 group flex gap-x-2 rounded-md p-2 text-sm leading-6 font-semibold"
                        }
                      >
                        <MoonIcon className="h-6 w-6 shrink-0 text-gray-400" />
                        Dark Mode
                        <ThemeSwitcher />
                      </a>
                    </li>
                    <li>
                      <a
                        className={
                          "cursor-pointer dark:text-gray-300 group mb-2 flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold mt-6"
                        }
                      >
                        <ArrowLeftIcon className="h-6 w-6 shrink-0 text-gray-400 dark:text-gray-400" />
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="mb-4">
                <SideBarDropDown />
              </div>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 dark:bg-dark bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon
              className="h-6 w-6 dark:text-gray-200"
              aria-hidden="true"
            />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 dark:text-gray-100">
            Dashboard
          </div>
          {/* <p
            className={
              "cursor-pointer dark:text-gray-300 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold "
            }
          >
            Issac
          </p> */}
          <MobileDropdown />
        </div>
        <main className="py-10 lg:pl-60 ">
          <div className="px-4 sm:px-6 lg:px-8 overflow-auto">{children}</div>
        </main>
      </div>
    </>
  );
}
