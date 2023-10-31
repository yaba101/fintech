import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchInput() {
  return (
    <div className="w-full">
      <label htmlFor="desktop-search" className="sr-only">
        Search
      </label>
      <div className="relative dark:text-white dark:focus-within:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md">
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="desktop-search"
          className="block w-full rounded-md sm:text-xs border-0 py-1.5 pl-2 dark:text-white text-gray-800 dark:placeholder:text-white dark:focus:text-gray-200 focus:ring-0 focus:placeholder:text-gray-500  sm:leading-6 shadow-lg dark:bg-dark"
          placeholder="Search For"
          type="search"
          name="search"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        />
      </div>
    </div>
  );
}

export function SearchInputSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-8 w-48 bg-gray-300 rounded-md mx-auto"></div>
    </div>
  );
}
