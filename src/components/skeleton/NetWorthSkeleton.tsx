const NetWorthCardSkeleton = () => {
  return (
    <div
      className="mx-auto mb-3 animate-pulse overflow-hidden rounded-lg border border-gray-900 shadow-lg"
      style={{ background: "#1d1d41" }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-4">
        <div className="mb-4 h-4 w-24 rounded bg-gray-500 " />
        <div className="mb-4 h-8 w-32 rounded bg-gray-400" />
      </div>
      <div className="py-2 text-center">
        <div className="mx-auto h-10 w-24 rounded bg-gray-500"></div>{" "}
        {/* Button Skeleton */}
      </div>
    </div>
  );
};

export default NetWorthCardSkeleton;
