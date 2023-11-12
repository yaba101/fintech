import StatsSkeleton from "./StatsSkeleton";

const CashActivitySkeleton = () => {
  return (
    <>
      <StatsSkeleton />
      <div className="my-3 animate-pulse rounded-md bg-gray-50 p-4 shadow-md dark:bg-dark dark:text-gray-100">
        <div className="border-bottom flex justify-between">
          <div className="flex items-center">
            <div className="mb-2 h-4 w-20 rounded bg-gray-300" />
          </div>
          <div className="h-4 w-20 rounded bg-gray-300" />
        </div>

        {/* Placeholder for the HalfDonutChart */}
        <div className="mb-16 h-40 w-full rounded bg-gray-300 " />
        {/* <div className="relative w-48 h-24 overflow-hidden bg-gray-200 rounded-full animate-pulse"></div> */}

        <div className="-mt-28 mb-3 flex justify-between">
          <div className="ml-4 flex items-center">
            <div className="mr-2 h-4 w-4 rounded-full bg-gray-300" />
            <div className="h-4 w-20 rounded bg-gray-300" />
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 rounded-full bg-gray-300" />
            <div className="h-4 w-20 rounded bg-gray-300" />
          </div>
        </div>
        <div className="mb-6 ml-6 flex justify-between">
          <div className="h-4 w-10 bg-gray-300" />
          <div className="h-4 w-10 bg-gray-300" />
        </div>

        <div className="mx-auto mb-3 h-10 w-32 rounded bg-gray-300" />
      </div>
    </>
  );
};

export default CashActivitySkeleton;
