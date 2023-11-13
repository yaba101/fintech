import { DatePickerWithRange } from "@/components/DatePicker";
import SearchInput from "@/components/SearchInput";
import delay from "@/utils/delay";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { parse } from "date-fns";
import { z } from "zod";

type RecentTransaction = {
  transactionDate: string;
  amount: number;
  merchant: string;
  transactionName: string;
  category: string;
  personalFinanceCategory: string;
  personalFinanceCategoryIconUrl: string | null;
};
type RecentTransactionResponse = {
  recentTransactions: RecentTransaction[];
  succeeded: boolean;
};
type RequestBody = {
  toDate: Date | null;
  fromDate: Date | null;
};

const RecentTransactionSchema = z.object({
  transactionDate: z.string(),
  amount: z.number(),
  merchant: z.string(),
  transactionName: z.string(),
  category: z.string(),
  personalFinanceCategory: z.string(),
  personalFinanceCategoryIconUrl: z.string().nullable(),
});

const RecentTransactionResponseSchema = z.object({
  recentTransactions: z.array(RecentTransactionSchema),
  succeeded: z.boolean(),
});

const RequestBodySchema = z.object({
  toDate: z.date(),
  fromDate: z.date(),
});

const getRecentTransactionData = async (url: string, body?: RequestBody) => {
  try {
    await delay(10000);
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    RecentTransactionResponseSchema.parse(responseData);

    return responseData as RecentTransactionResponse;
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {
      recentTransactions: [],
      succeeded: false,
    } as RecentTransactionResponse;
  }
};

export default async function Table({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  const fromDate = from ? parse(from, "dd/MM/yy", new Date()) : null;
  const toDate = to ? parse(to, "dd/MM/yy", new Date()) : null;

  const requestBody: RequestBody = {
    fromDate,
    toDate,
  };

  const data = await getRecentTransactionData(
    `${process.env.URL}/api/transactions`,
    requestBody,
  );

  return (
    <div className="overflow-x-hidden overflow-y-hidden rounded-md bg-gray-50 shadow-lg dark:bg-dark">
      <div className="my-3 flex flex-grow items-center justify-between space-x-2 px-2 py-3 xs:pr-5">
        <h4 className="xs:text-bold whitespace-nowrap px-2 py-2 text-center font-bold tracking-tight xs:mx-auto xs:text-lg sm:mx-auto md:text-xl lg:mx-0">
          Recent Transactions
        </h4>
        <div className="hidden min-w-fit xl:block">
          <DatePickerWithRange fromParam="transacFrom" toParam="transacTo" />
        </div>
        <div className="hidden w-2/5 xl:block">
          <SearchInput placeholder="search for transaction" />
        </div>
      </div>
      <div className="flex w-full xs:flex-col md:flex-row ">
        <div className="mx-auto mb-3 px-1 xs:w-5/6 sm:w-1/2 xl:hidden">
          <DatePickerWithRange fromParam="transacFrom" toParam="transacTo" />
        </div>
        <div className="mx-auto px-1 xs:w-5/6 sm:w-3/4 xl:hidden">
          <SearchInput placeholder="search for transaction" />
        </div>
      </div>

      <div className="rounded-md px-4 xs:px-1 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-x-hidden">
                {data.recentTransactions.length === 0 ? (
                  <p className="text-center text-gray-500">No data available</p>
                ) : (
                  <table className="min-w-full divide-y divide-gray-300">
                    <tbody>
                      {data.recentTransactions.slice(0, 5).map((item) => (
                        <tr key={item.transactionName}>
                          <td className="whitespace-nowrap py-3 pl-4 pr-3 sm:py-2 sm:pl-0">
                            <div className="flex items-center">
                              <div className="px-4 xs:px-0 sm:px-2">
                                {item.personalFinanceCategoryIconUrl === "" ? (
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
                                  <span className="xs:text-[0.575rem] sm:text-xs md:text-sm xl:text-base">
                                    {item.transactionName}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 text-gray-400 xs:px-1 xs:text-xs sm:py-2">
                            <div className="xs:text-[0.575rem] sm:text-xs md:text-sm xl:text-base 2xl:text-lg">
                              {item.transactionDate}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 text-gray-300 xs:px-1 sm:py-2">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-1 font-medium xs:text-[0.575rem] sm:text-xs md:text-sm xl:text-base 2xl:text-lg `}
                            >
                              ${item.amount}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
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
