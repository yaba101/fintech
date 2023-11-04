const AddAccountCard = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return (
    <div className="my-3 overflow-hidden border rounded shadow-lg dark:border-gray-900 dark:bg-dark bg-gray-50">
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold text-center">
          Account Summary
        </div>
        <div className="w-3/4 mx-auto my-6">
          <div className="my-5 ">
            <div className="flex justify-between">
              <span>Savings</span>
              <span className="text-sm font-medium">$597.39</span>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between">
              <span>Checking</span>
              <span className="text-sm font-medium">$15,595</span>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between">
              <span>Investment</span>
              <span className="text-sm font-medium">$129.15</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-3/4 mx-auto space-x-3">
          <button className="bg-[#27674a] hover:bg-[#133425] text-white text-sm font-medium py-1 px-4 rounded-lg whitespace-nowrap">
            View All
          </button>
          <button className="bg-[#5e54e6] hover:bg-[#4941b3] text-white text-sm font-medium py-1 px-4 rounded-lg whitespace-nowrap">
            Add Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAccountCard;

export const SkeletonAddAccountCard = () => {
  return (
    <div
      className="max-w-sm mx-3 my-3 overflow-hidden border border-gray-900 rounded-md shadow-lg animate-pulse"
      style={{ background: "#1d1d41" }}
    >
      <div className="px-6 py-4">
        <div className="w-48 h-6 mx-auto mb-2 text-xl font-bold text-center bg-gray-400 rounded"></div>
        <div className="my-6">
          <div className="my-5">
            <div className="flex justify-between space-x-3">
              <div className="w-40 h-4 bg-gray-400 rounded"></div>
              <div className="w-20 h-4 bg-gray-400 rounded"></div>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between space-x-3">
              <div className="w-40 h-4 bg-gray-400 rounded"></div>
              <div className="w-20 h-4 bg-gray-400 rounded"></div>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between space-x-3">
              <div className="w-40 h-4 bg-gray-400 rounded"></div>
              <div className="w-20 h-4 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-between space-x-3">
          <div className="w-24 h-10 mx-auto bg-green-400 rounded"></div>
          <div className="h-10 mx-auto rounded bg-violet-400 w-28"></div>
        </div>
      </div>
    </div>
  );
};
