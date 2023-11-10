import { DatePickerWithRange } from "@/components/DatePicker";
import SearchInput from "@/components/SearchInput";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

type RecentTransactionData = {
  icon?: any;
  company: string;
  date: string;
  amount: string;
};

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getRecentTransactionData = async (url: string) => {
  try {
    await delay(2000);
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error while fetching data:", error);
    return [];
  }
};

export default async function Table() {
  const data = await getRecentTransactionData(
    `${process.env.URL}/api/recent-transaction`,
  );
  return (
    <div className="overflow-x-hidden overflow-y-hidden rounded-md bg-gray-50 shadow-lg dark:bg-dark">
      <div className="my-3 flex flex-grow items-center justify-between space-x-2 px-2 py-3 xs:pr-5">
        <h4 className="xs:text-bold whitespace-nowrap px-2 py-2 text-center font-bold tracking-tight xs:mx-auto xs:text-lg sm:mx-auto md:text-xl lg:mx-0">
          Recent Transactions
        </h4>
        <div className="hidden min-w-fit xl:block">
          <DatePickerWithRange />
        </div>
        <div className="hidden w-2/5 xl:block">
          <SearchInput placeholder="search for transaction" />
        </div>
      </div>
      <div className="flex w-full xs:flex-col sm:flex-row ">
        <div className="mx-auto mb-3 px-1 xs:w-5/6 sm:w-1/2 xl:hidden">
          <DatePickerWithRange />
        </div>
        <div className="mx-auto px-1 xs:w-5/6 sm:w-1/2 xl:hidden">
          <SearchInput placeholder="search for transaction" />
        </div>
      </div>

      <div className="rounded-md px-4 xs:px-1 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-x-hidden">
                <table className="min-w-full divide-y divide-gray-300">
                  <tbody>
                    {data.map((item: RecentTransactionData) => (
                      <tr key={item.company}>
                        <td className="whitespace-nowrap py-3 pl-4 pr-3 sm:py-2 sm:pl-0">
                          <div className="flex items-center">
                            <div className="px-4 xs:px-0 sm:px-2">
                              {item.icon === "" ? (
                                <div className="ml-6"></div>
                              ) : (
                                <div className="rounded-full">
                                  <ArrowDownCircleIcon className="h-6 w-6" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div
                                className={`font-medium dark:text-gray-100 xs:text-xs sm:text-sm md:text-base   `}
                              >
                                <span className="xs:text-xs md:text-sm xl:text-base 2xl:text-lg">
                                  {item.company}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="s whitespace-nowrap px-3 py-3 text-gray-500 xs:px-1 xs:text-xs sm:py-2">
                          <div className="xs:text-xs md:text-sm xl:text-base 2xl:text-lg">
                            {item.date}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-gray-300 xs:px-1 sm:py-2">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 font-medium xs:text-xs md:text-sm xl:text-base 2xl:text-lg `}
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
            <div className="mx-auto w-1/3 py-6">
              <button className="w-full whitespace-nowrap rounded-lg bg-[#27674a] px-4 py-2 text-center font-medium text-white hover:bg-green-700">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
