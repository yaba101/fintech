import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchInput() {
  return (
    <div className="">
      <label htmlFor="desktop-search" className="sr-only">
        Search
      </label>
      <div className="relative border border-gray-300 rounded-md dark:text-white dark:focus-within:text-gray-300 dark:border-gray-700">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />
        </div>
        <input
          id="desktop-search"
          className="block w-full whitespace-nowrap overflow-hidden text-ellipsis rounded-md sm:text-xs border-0 py-1.5 pl-2 dark:text-white text-gray-800 dark:placeholder:text-white dark:focus:text-gray-200 focus:ring-0 focus:placeholder:text-gray-500  sm:leading-6 shadow-lg dark:bg-dark"
          placeholder="Search For"
          type="search"
          name="search"
        />
      </div>
    </div>
  );
}
