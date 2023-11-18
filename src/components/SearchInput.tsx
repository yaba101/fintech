"use client";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchInput({ placeholder }: { placeholder: string }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="">
      <label htmlFor="desktop-search" className="sr-only">
        Search
      </label>
      <div className="relative rounded-md border border-gray-300 dark:border-gray-700 dark:focus-within:text-gray-300">
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 ${
            isFocused ? "xs:hidden" : ""
          }`}
        >
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="desktop-search"
          className="block w-full overflow-hidden whitespace-nowrap rounded-md  border-none py-1.5 pl-2 text-gray-900 antialiased shadow-lg placeholder:text-gray-400 focus:ring-0  focus:placeholder:text-gray-400 dark:bg-dark dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:text-gray-200 xs:placeholder:text-xs sm:text-sm sm:leading-6 sm:placeholder:text-base md:text-lg"
          placeholder={placeholder}
          type="search"
          name="search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
}
