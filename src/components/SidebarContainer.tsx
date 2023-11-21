"use client";
import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import MobileDropdown from "@/components/MobileDropdown";
import SideBarMenu from "@/components/SideBarMenu";
import SidebarItem from "@/components/SideBarItem";
import { SidebarContext } from "@/components/SidebarProvider";
import {
  Dashboard,
  AccountCircle,
  Analytics,
  AccountBalanceWallet,
  AccountBalance,
  Settings,
  Security,
  HelpCenter,
  MenuOpen,
  Close,
} from "@mui/icons-material";
import { cn } from "@/lib/utils";

const FirstNavSection = [
  {
    text: "Dashboard",
    active: true,
    icon: Dashboard,
    alert: true,
    href: "/dashboard",
  },
  {
    text: "Account",
    active: false,
    icon: AccountCircle,
    alert: false,
    href: "/account",
  },
  {
    text: "Analytics",
    active: false,
    icon: Analytics,
    alert: false,
    href: "/analytics",
  },
  {
    text: "My Bill",
    active: false,
    icon: AccountBalanceWallet,
    alert: false,
    href: "/my-bill",
  },
  {
    text: "My Budgets",
    active: false,
    icon: AccountBalance,
    alert: false,
    href: "/my-budgets",
  },
  {
    text: "Settings",
    active: false,
    icon: Settings,
    alert: false,
    href: "/settings",
  },
];

const SecondNavSection = [
  {
    text: "Security",
    active: false,
    icon: Security,
    alert: false,
    href: "/security",
  },
  {
    text: "Help Center",
    active: false,
    icon: HelpCenter,
    alert: false,
    href: "/help-center",
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
            className="relative z-50 xl:hidden"
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
                        <Close
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-hidden bg-slate-50 px-6 pb-2 dark:bg-dark dark:text-gray-50">
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul
                            role="list"
                            className="-mx-2 space-y-1 text-gray-800 dark:text-gray-200"
                          >
                            {FirstNavSection.map((item) => (
                              <li key={item.text}>
                                <a
                                  href={item.href}
                                  className={cn(
                                    item.active
                                      ? " mt-4 bg-indigo-800 text-gray-100"
                                      : "hover:text-indigo-600 dark:text-gray-200 dark:hover:bg-indigo-500  ",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                  )}
                                >
                                  <item.icon
                                    className={cn(
                                      item.active
                                        ? "text-gray-300"
                                        : "text-gray-800 group-hover:text-indigo-600 dark:text-gray-200",
                                      "h-6 w-6 shrink-0",
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
                                      ? "bg-slate-50 text-indigo-600 dark:bg-gray-900"
                                      : "text-gray-800 hover:text-indigo-600 dark:text-gray-100 dark:hover:bg-gray-500 ",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.active
                                        ? "text-indigo-600"
                                        : "text-gray-800 group-hover:text-indigo-600 dark:text-gray-200",
                                      "h-6 w-6 shrink-0",
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
        <div className="xl:w-42 hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-64 ">
          <div className="w-30 flex min-h-screen shadow-md shadow-slate-500">
            <SideBarMenu>
              {FirstNavSection.map((item) => (
                <SidebarItem
                  key={item.text}
                  icon={<item.icon />}
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
                  icon={<item.icon />}
                  alert={item.alert}
                  text={item.text}
                  active={item.active}
                  isExpanded={isExpanded}
                />
              ))}
            </SideBarMenu>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm dark:bg-dark sm:px-6 xl:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 xl:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuOpen
              className="h-6 w-6 dark:text-gray-200"
              aria-hidden="true"
            />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 dark:text-gray-100">
            Dashboard
          </div>

          <MobileDropdown />
        </div>
        <main className={`py-10 ${isExpanded ? " xl:pl-28" : " xl:pl-0"} `}>
          <div className="overflow-auto px-4 xs:px-1 sm:px-2 md:px-4">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
