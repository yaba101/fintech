const SummaryCardSkeleton = async () => {
  // await delay(7000);
  return (
    <div className="my-3 animate-pulse overflow-hidden rounded-md shadow-lg dark:bg-dark bg-slate-50">
      <div className="px-6 py-4">
        <div className="mx-auto mb-2 h-6 w-48 rounded bg-gray-400 text-center text-xl font-bold"></div>
        <div className="my-6">
          <div className="my-5">
            <div className="flex justify-between space-x-3">
              <div className="h-4 w-40 rounded bg-gray-400"></div>
              <div className="h-4 w-20 rounded bg-gray-400"></div>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between space-x-3">
              <div className="h-4 w-40 rounded bg-gray-400"></div>
              <div className="h-4 w-20 rounded bg-gray-400"></div>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between space-x-3">
              <div className="h-4 w-40 rounded bg-gray-400"></div>
              <div className="h-4 w-20 rounded bg-gray-400"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-between space-x-3">
          <div className="mx-auto h-10 w-24 rounded bg-green-400"></div>
          <div className="mx-auto h-10 w-28 rounded bg-violet-400"></div>
        </div>
      </div>
    </div>
  );
};
export default SummaryCardSkeleton;
