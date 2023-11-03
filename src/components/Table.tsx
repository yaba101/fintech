import DatePicker from "@/components/DatePicker";
import SearchInput from "@/components/SearchInput";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

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
    <div className="rounded-md dark:bg-dark bg-gray-50 shadow-lg overflow-x-hidden overflow-y-hidden">
      <div className="flex my-3 py-3 items-center px-2 xs:pr-5 justify-between flex-grow space-x-2">
        <h4 className="tracking-tight md:text-lg xs:text-lg xs:text-bold font-bold text-center whitespace-nowrap px-2 py-2 xs:mx-auto sm:mx-0">
          Recent Transactions
        </h4>
        <div className="min-w-fit hidden md:block">
          <DatePicker />
        </div>
        <div className="min-w-fit hidden md:block">
          <SearchInput />
        </div>
      </div>
      <div className="flex w-4/6 mx-auto md:hidden px-1 mb-3 ">
        <DatePicker />
      </div>
      <div className="flex w-5/6 mx-auto md:hidden px-1  ">
        <SearchInput />
      </div>

      <div className="px-4 xs:px-1 sm:px-6 lg:px-8 rounded-md">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle  sm:px-6 lg:px-8">
              <div className="overflow-x-hidden">
                <table className="min-w-full divide-y divide-gray-300">
                  <tbody>
                    {data.map((item: RecentTransactionData) => (
                      <tr key={item.company}>
                        <td className="whitespace-nowrap py-3 sm:py-2 pl-4 pr-3 sm:pl-0">
                          <div className="flex items-center">
                            <div className="px-4 xs:px-0 sm:px-2">
                              {item.icon === "" ? (
                                <div className="xs:w-6 w-8 sm:w-10 lg:w-6"></div>
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
                        <td className="whitespace-nowrap xs:px-1 px-3 py-3 xs:text-xs sm:py-2 text-sm text-gray-500">
                          <div className="xs:text-xs text-sm sm:text-base">
                            {item.date}
                          </div>
                        </td>
                        <td className="whitespace-nowrap xs:px-1 px-3 py-3 sm:py-2 text-sm text-gray-300">
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
            <div className="text-center pb-5">
              <button className="bg-green-500 hover:bg-green-700 text-white font-medium py-1 px-4 rounded-lg">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
