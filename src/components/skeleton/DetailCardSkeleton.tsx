const DetailCardSkeleton = () => {
  return (
    <div className="p-4 shadow-md dark:text-gray-100 border border-gray-900 rounded-md  my-3 animate-pulse dark:bg-dark bg-gray-50">
      <div className="flex justify-between border-bottom">
        <div className="flex items-center">
          <div className="bg-gray-500 h-4 w-20 mb-2 rounded" />
        </div>
        <div className="bg-gray-500 h-4 w-20 rounded" />
      </div>

      {/* Placeholder for the HalfDonutChart */}
      <div className="bg-gray-500 h-40 w-full mb-16 rounded " />
      {/* <div className="w-48 h-24 relative rounded-full overflow-hidden bg-gray-200 animate-pulse"></div> */}

      <div className="flex justify-between -mt-28 mb-3">
        <div className="flex items-center ml-4">
          <div className="bg-gray-500 h-4 w-4 rounded-full mr-2" />
          <div className="bg-gray-500 h-4 w-20 rounded" />
        </div>
        <div className="flex items-center">
          <div className="bg-gray-500 h-4 w-4 rounded-full mr-2" />
          <div className="bg-gray-500 h-4 w-20 rounded" />
        </div>
      </div>
      <div className="flex justify-between mb-6 ml-6">
        <div className="bg-gray-500 h-4 w-10" />
        <div className="bg-gray-500 h-4 w-10" />
      </div>

      <div className="bg-gray-500 h-10 w-32 mx-auto mb-3 rounded" />
    </div>
  );
};

export default DetailCardSkeleton;
