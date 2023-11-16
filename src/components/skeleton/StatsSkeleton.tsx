function StatsSkeleton() {
  return (
    <div className="flex flex-grow animate-pulse items-end justify-between space-x-6 rounded-lg border bg-gray-50 px-3 py-4 shadow-lg dark:border-gray-900 dark:bg-dark">
      <div className="flex items-center gap-3">
        <div className="hidden rounded-lg bg-gray-300 p-3 dark:bg-gray-900 xs:h-10 xs:w-10 sm:block md:h-16 md:w-16"></div>
        <div className="space-y-2">
          <p className="h-4 w-24 whitespace-nowrap bg-gray-300 text-sm dark:text-gray-400 sm:text-xs "></p>
          <p className="h-6 w-20 bg-gray-300 text-lg font-medium dark:text-gray-200"></p>
        </div>
      </div>
      <div className="flex h-6 w-14 gap-1 rounded bg-gray-300 bg-opacity-40 py-0.5"></div>
    </div>
  );
}

export default StatsSkeleton;
