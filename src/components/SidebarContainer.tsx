"use client";
import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, MoonIcon } from "@heroicons/react/24/outline";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import MobileDropdown from "@/components/MobileDropdown";
import {
  LayoutDashboard,
  LockIcon,
  MessageCircle,
  Settings,
  User,
  Wallet2Icon,
  Activity,
  Banknote,
} from "lucide-react";
import SideBarMenu from "@/components/SideBarMenu";
import SidebarItem from "@/components/SideBarItem";
import { SidebarContext } from "@/components/SidebarProvider";

const FirstNavSection = [
  {
    text: "Dashboard",
    active: true,
    icon: LayoutDashboard,
    alert: true,
    href: "#",
  },
  { text: "Account", active: false, icon: User, alert: false, href: "#" },
  { text: "Analytics", active: false, icon: Activity, alert: false, href: "#" },
  {
    text: "My Bill",
    active: false,
    icon: Wallet2Icon,
    alert: false,
    href: "#",
  },
  {
    text: "My Budgets",
    active: false,
    icon: Banknote,
    alert: false,
    href: "#",
  },
  { text: "Settings", active: false, icon: Settings, alert: false, href: "#" },
];

const SecondNavSection = [
  {
    text: "Security",
    active: false,
    icon: LockIcon,
    alert: false,
    href: "#",
  },
  {
    text: "Help Center",
    active: false,
    icon: MessageCircle,
    alert: false,
    href: "#",
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SideBar({ children }: { children?: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isExpanded = false } = useContext(SidebarContext) || {};

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
                <Dialog.Panel className="relative flex flex-1 w-full max-w-xs mr-16">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 flex justify-center w-16 pt-5 left-full">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-col px-6 pb-2 overflow-y-hidden grow gap-y-5 dark:bg-dark bg-slate-50 dark:text-gray-50">
                    <nav className="flex flex-col flex-1">
                      <ul role="list" className="flex flex-col flex-1 gap-y-7">
                        <li>
                          <ul
                            role="list"
                            className="-mx-2 space-y-1 text-gray-800 dark:text-gray-200"
                          >
                            {FirstNavSection.map((item) => (
                              <li key={item.text}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.active
                                      ? " mt-4 bg-indigo-800 text-gray-100"
                                      : "dark:text-gray-200 hover:text-indigo-600 dark:hover:bg-indigo-500  ",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.active
                                        ? "text-gray-300"
                                        : "dark:text-gray-200 text-gray-800 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.text}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <ul role="list" className="-mx-2 space-y-1 ">
                            {SecondNavSection.map((item) => (
                              <li key={item.text}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.active
                                      ? "dark:bg-gray-900 bg-slate-50 text-indigo-600"
                                      : "dark:text-gray-100 text-gray-800 hover:text-indigo-600 dark:hover:bg-gray-500 ",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.active
                                        ? "text-indigo-600"
                                        : "dark:text-gray-200 text-gray-800 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.text}
                                </a>
                              </li>
                            ))}
                            <div className={"flex py-4 "}>
                              <ThemeSwitcher />
                            </div>
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
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 xl:w-42 ">
          <div className="flex min-h-screen w-30  shadow-md shadow-slate-500">
            <SideBarMenu>
              {FirstNavSection.map((item) => (
                <SidebarItem
                  key={item.text}
                  icon={<item.icon size={20} />}
                  alert={item.alert}
                  text={item.text}
                  active={item.active}
                  isExpanded={isExpanded}
                />
              ))}
              <hr className="text-gray-100" />
              {SecondNavSection.map((item) => (
                <SidebarItem
                  key={item.text}
                  icon={<item.icon size={20} />}
                  alert={item.alert}
                  text={item.text}
                  active={item.active}
                  isExpanded={isExpanded}
                />
              ))}
            </SideBarMenu>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center px-4 py-4 bg-white shadow-sm gap-x-6 dark:bg-dark sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon
              className="w-6 h-6 dark:text-gray-200"
              aria-hidden="true"
            />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 dark:text-gray-100">
            Dashboard
          </div>

          <MobileDropdown />
        </div>
        <main
          className={`py-10 ${
            isExpanded ? "lg:pl-40 xl:pl-28" : "lg:pl-10 xl:pl-0"
          } `}
        >
          <div className="px-4 overflow-auto sm:px-6">{children}</div>
        </main>
      </div>
    </>
  );
}
