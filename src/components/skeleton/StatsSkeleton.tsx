const StatsSkeleton = () => {
  return (
    <>
      <article
        className="flex items-end justify-between rounded-lg border border-gray-900 p-3 mx-3 animate-pulse"
        style={{ background: "#1d1d41" }}
      >
        <div className="flex items-center gap-4">
          <div className="h-7 w-7 sm:h-11 sm:w-11 bg-gray-400 rounded-xl" />

          <div>
            <div className="text-sm text-gray-400 bg-gray-400 h-4 sm:h-6 w-20 sm:w-28 rounded mb-3" />

            <div className="text-auto sm:text-lg font-medium text-gray-400 bg-gray-400 h-8 sm:h-11 w-32 sm:w-48 rounded" />
          </div>
        </div>

        <div className="inline-flex gap-2 rounded bg-gray-400 p-1 h-8 sm:h-10 w-16 sm:w-20">
          <div className="h-4 sm:h-6 w-4 sm:w-6 bg-gray-400 rounded" />

          <div className="text-xs sm:text-base font-medium bg-gray-400 h-4 sm:h-6 w-12 sm:w-16" />
        </div>
      </article>
    </>
  );
};
export default StatsSkeleton;
