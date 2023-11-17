const SummaryCard = () => {
  return (
    <div className="my-3 overflow-hidden rounded border bg-gray-50 shadow-lg dark:border-gray-900 dark:bg-dark">
      <div className="px-6 py-4">
        <div className="mx-auto mb-2 text-center text-xl font-bold antialiased">
          Account Summary
        </div>
        <div className="mx-auto my-6 w-3/4">
          <div className="my-5 ">
            <div className="flex justify-between">
              <span className="antialiased sm:text-sm md:text-lg lg:text-sm">
                Savings
              </span>
              <span className="text-sm font-medium antialiased sm:text-sm md:text-lg lg:text-sm">
                $597.39
              </span>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between">
              <span className="antialiased sm:text-sm md:text-lg lg:text-sm">
                Checking
              </span>
              <span className="text-sm font-medium antialiased sm:text-sm md:text-lg lg:text-sm">
                $15,595
              </span>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between">
              <span className="antialiased sm:text-sm md:text-lg lg:text-sm">
                Investment
              </span>
              <span className="text-sm font-medium antialiased sm:text-sm md:text-lg lg:text-sm">
                $129.15
              </span>
            </div>
          </div>
          <div className="my-5 ">
            <div className="flex justify-between xs:space-x-2.5">
              <button className="whitespace-nowrap rounded-lg bg-[#27674a] px-2 py-1 text-sm font-medium text-white hover:bg-[#133425]">
                View All
              </button>
              <button className="whitespace-nowrap rounded-lg bg-[#5e54e6] px-2 py-1 text-sm font-medium text-white hover:bg-[#4941b3]">
                Add Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
