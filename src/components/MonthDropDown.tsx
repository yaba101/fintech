"use client";
import { Menu, Transition } from "@headlessui/react";
import { ArrowDownward } from "@mui/icons-material";
import { endOfMonth, getMonth, startOfMonth } from "date-fns";
import { Fragment, useRef, useEffect, useState, useTransition } from "react";

interface MonthDropDownProps {
  onSelect: (fromDate: Date, toDate: Date) => void;
}

export default function MonthDropDown({ onSelect }: MonthDropDownProps) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const months = Array.from({ length: 12 }, (_, i) => i);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    getMonth(new Date()),
  );
  const [isPending, startTransition] = useTransition();

  const handleButtonClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setIsOpen(false);

    const newFromDate = new Date();
    newFromDate.setMonth(month, 1);

    const newToDate = new Date();
    newToDate.setFullYear(newFromDate.getFullYear(), month + 1, 0);

    startTransition(() => {
      onSelect(startOfMonth(newFromDate), endOfMonth(newToDate));
    });
  };

  return (
    <div className="">
      <Menu as="div" className="relative">
        <div>
          <Menu.Button
            onClick={handleButtonClick}
            className="inline-flex w-full justify-center rounded-md border border-gray-200 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 dark:bg-transparent dark:text-gray-100"
          >
            {selectedMonth !== null
              ? monthNames[selectedMonth]
              : "Select Month"}
            <ArrowDownward
              className="-mr-1 ml-2 h-5 w-5 text-gray-900 dark:text-gray-200 dark:hover:text-gray-100"
              aria-hidden="true"
            />
            {isPending && (
              <div role="loading">
                <svg
                  aria-hidden="true"
                  className="ml-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          show={isOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute mt-2 max-h-48 w-36 origin-top-right  overflow-y-auto rounded-md border border-gray-300 bg-white  shadow-lg ring-1 ring-black/5 focus:outline-none dark:border-gray-600 dark:bg-dark xs:left-0 xl:right-0">
            {months.map((monthIndex) => (
              <Menu.Item key={monthIndex}>
                {({ active }) => (
                  <button
                    onClick={() => handleMonthChange(monthIndex)}
                    className={`${
                      active
                        ? "bg-gray-600 text-white"
                        : "text-gray-900 dark:text-gray-100"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {monthNames[monthIndex]}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
