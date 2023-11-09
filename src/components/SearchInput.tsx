import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchInput() {
  return (
    <div className="">
      <label htmlFor="desktop-search" className="sr-only">
        Search
      </label>
      <div className="relative rounded-md border border-gray-300 dark:border-gray-700 dark:text-white dark:focus-within:text-gray-300">
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="desktop-search"
          className="block w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-md border-0 py-1.5 pl-2 text-gray-800 antialiased shadow-lg focus:ring-0 focus:placeholder:text-gray-500 dark:bg-dark dark:text-white dark:placeholder:text-white dark:focus:text-gray-200  sm:text-sm sm:leading-6 md:text-lg"
          placeholder="Search For"
          type="search"
          name="search"
        />
      </div>
    </div>
  );
}
