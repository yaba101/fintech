const AddAccountCard = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return (
    <div className="my-3 overflow-hidden rounded border bg-gray-50 shadow-lg dark:border-gray-900 dark:bg-dark">
      <div className="px-6 py-4">
        <div className="mb-2 text-center text-xl font-bold antialiased">
          Account Summary
        </div>
        <div className="mx-auto my-6 w-3/4">
          <div className="my-5 ">
            <div className="flex justify-between">
              <span className="antialiased md:text-lg">Savings</span>
              <span className="text-sm font-medium antialiased md:text-lg">
                $597.39
              </span>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between">
              <span className="antialiased md:text-lg">Checking</span>
              <span className="text-sm font-medium antialiased md:text-lg">
                $15,595
              </span>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between">
              <span className="antialiased md:text-lg">Investment</span>
              <span className="text-sm font-medium antialiased md:text-lg">
                $129.15
              </span>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-3/4 justify-between space-x-3">
          <button className="whitespace-nowrap rounded-lg bg-[#27674a] px-4 py-1 text-sm font-medium text-white hover:bg-[#133425]">
            View All
          </button>
          <button className="whitespace-nowrap rounded-lg bg-[#5e54e6] px-4 py-1 text-sm font-medium text-white hover:bg-[#4941b3]">
            Add Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAccountCard;
