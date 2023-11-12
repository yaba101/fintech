function StatsSkeleton() {
  return (
    <div className="flex flex-grow items-end justify-between space-x-6 rounded-lg border dark:border-gray-900 shadow-lg py-4 px-3 dark:bg-dark bg-gray-50 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="hidden rounded-lg bg-gray-300 p-3 dark:bg-gray-900 sm:block w-16 h-16"></div>
        <div className="space-y-2">
          <p className="text-sm sm:text-xs dark:text-gray-400 whitespace-nowrap bg-gray-300 w-24 h-4 "></p>
          <p className="text-lg font-medium dark:text-gray-200 bg-gray-300 w-20 h-6"></p>
        </div>
      </div>
      <div className="flex gap-1 rounded py-0.5 bg-gray-300 bg-opacity-40 w-14 h-6"></div>
    </div>
  );
}

export default StatsSkeleton;
