import DatePicker from "@/components/DatePicker";
import SearchInput from "@/components/SearchInput";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

type RecentTransactionData = {
  icon?: any;
  company: string;
  date: string;
  amount: string;
};

async function getRecentTransactionData() {
  // await delay(2000);
  const response = await fetch(process.env.URL + "/api/recent-transaction", {
    method: "GET",
    cache: "no-store",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return [];
}

export default async function Table() {
  const data = await getRecentTransactionData();
  return (
    <div className="overflow-x-hidden overflow-y-hidden rounded-md shadow-lg dark:bg-dark bg-gray-50">
      <div className="flex items-center justify-between flex-grow px-2 py-3 my-3 space-x-2 xs:pr-5">
        <h4 className="px-2 py-2 font-bold tracking-tight text-center md:text-lg xs:text-lg xs:text-bold whitespace-nowrap sm:mx-auto xs:mx-auto md:mx-0">
          Recent Transactions
        </h4>
        <div className="hidden min-w-fit md:block">
          <DatePicker />
        </div>
        <div className="hidden w-2/5 md:block">
          <SearchInput />
        </div>
      </div>
      <div className="flex w-full ">
        <div className="w-1/2 px-1 mx-auto mb-3 md:hidden">
          <DatePicker />
        </div>
        <div className="w-1/2 px-1 mx-auto md:hidden">
          <SearchInput />
        </div>
      </div>

      <div className="px-4 rounded-md xs:px-1 sm:px-6 lg:px-8">
        <div className="flow-root mt-8">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-x-hidden">
                <table className="min-w-full divide-y divide-gray-300">
                  <tbody>
                    {data.map((item: RecentTransactionData) => (
                      <tr key={item.company}>
                        <td className="py-3 pl-4 pr-3 whitespace-nowrap sm:py-2 sm:pl-0">
                          <div className="flex items-center">
                            <div className="px-4 xs:px-0 sm:px-2">
                              {item.icon === "" ? (
                                <div className="ml-6"></div>
                              ) : (
                                <div className="rounded-full">
                                  <ArrowDownCircleIcon className="w-6 h-6" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div
                                className={`font-medium dark:text-gray-100 xs:text-xs text-sm sm:text-base`}
                              >
                                {item.company}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-500 whitespace-nowrap xs:px-1 xs:text-xs sm:py-2">
                          <div className="text-sm xs:text-xs sm:text-base">
                            {item.date}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-300 whitespace-nowrap xs:px-1 sm:py-2">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 xs:text-xs text-sm font-medium sm:text-base`}
                          >
                            {item.amount}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="pb-5 text-center">
              <button className="px-4 py-1 font-medium text-white bg-green-500 rounded-lg hover:bg-green-700">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
