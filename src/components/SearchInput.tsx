import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchInput() {
  return (
    <div className="min-w-0 flex-1 px-12 ">
      <div className="mx-auto w-full max-w-xs">
        <label htmlFor="desktop-search" className="sr-only">
          Search
        </label>
        <div className="relative text-white focus-within:text-gray-300">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="desktop-search"
            className="block w-full rounded-md border-0 py-1.5 pl-2  text-white placeholder:text-white focus:bg-white focus:text-gray-200 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6 shadow-lg "
            style={{ background: "#1d1d41" }}
            placeholder="Search For"
            type="search"
            name="search"
          />
        </div>
      </div>
    </div>
  );
}
