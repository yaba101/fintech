"use client";
import { DatePickerWithRange } from "@/components/DatePicker";
import SearchInput from "@/components/SearchInput";
import { urlEndpoints } from "@/endpoint/urlEndpoint";
import { formatCurrency } from "@/utils/moneyFormat";
import { getRecentTransactionData } from "@/utils/tableUtils";
import { endOfMonth, format, startOfMonth } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import TableSkeleton from "./skeleton/TableSkeleton";

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

export default function Table() {
  const currentDate = new Date();

  const today = new Date();
  const dayOfWeek = today.getDay();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayOfWeek);

  const endDate = new Date(today);
  endDate.setDate(today.getDate() + (6 - dayOfWeek));

  const [selectedFromDate, setSelectedFromDate] = useState<Date>(startDate);
  const [selectedToDate, setSelectedToDate] = useState<Date>(endDate);

  const [currentData, setCurrentData] = useState({
    recentTransactions: [],
    succeeded: true,
  });

  const [loading, setLoading] = useState(true);

  const handleMonthSelect = (fromDate: Date, toDate: Date) => {
    setSelectedFromDate(fromDate);
    setSelectedToDate(toDate);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const url = process.env.NEXT_PUBLIC_BASE_URL;
        const fromDate = format(new Date(selectedFromDate), "yyyy-MM-dd");
        const toDate = format(new Date(selectedToDate), "yyyy-MM-dd");
        const data = await getRecentTransactionData(
          `${url}/${urlEndpoints["transaction"]}`,
          {
            fromDate: fromDate,
            toDate: toDate,
          }
        );
        setCurrentData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedFromDate, selectedToDate]);

  return (
    <div className="overflow-x-hidden overflow-y-hidden rounded-md bg-gray-50 shadow-lg dark:bg-dark">
      {loading ? (
        <TableSkeleton />
      ) : !currentData.succeeded ? (
        <p className="mx-auto text-center h-96 flex justify-center items-center text-gray-500">
          Error occured. Try again.
        </p>
      ) : (
        <>
          <div className="my-3 flex flex-grow items-center justify-between space-x-2 px-2 py-3 xs:pr-5">
            <h4 className="xs:text-bold whitespace-nowrap px-2 py-2 text-center font-bold tracking-tight xs:mx-auto xs:text-lg sm:mx-auto md:text-xl lg:mx-0">
              Recent Transactions
            </h4>
            <div className="hidden min-w-fit px-1.5 xl:block">
              <DatePickerWithRange onSelect={handleMonthSelect} />
            </div>
            <div className="hidden w-2/5 xl:block">
              <SearchInput placeholder="search for transaction" />
            </div>
          </div>
          <div className="flex w-full flex-row px-1.5 ">
            <div className="mx-auto mb-3 px-1 xs:w-5/6 sm:w-1/2 xl:hidden">
              <DatePickerWithRange onSelect={handleMonthSelect} />
            </div>
            <div className="mx-auto px-1 xs:w-5/6 sm:w-3/4 xl:hidden">
              <SearchInput placeholder="search for transaction" />
            </div>
          </div>
          {currentData.recentTransactions.length === 0 ? (
            <p className="mx-auto text-center h-96 flex justify-center items-center text-gray-500">
              No data available
            </p>
          ) : (
            <div className="rounded-md px-4 xs:px-1 sm:px-6 lg:px-8">
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-x-hidden">
                      <table className="min-w-full divide-y divide-gray-300">
                        <tbody>
                          {currentData.recentTransactions
                            .slice(0, 5)
                            .map((item: RecentTransaction) => (
                              <tr key={item.transactionName}>
                                <td className="whitespace-nowrap py-3 pl-4 pr-3 sm:py-2 sm:pl-0">
                                  <div className="flex items-center">
                                    <div className="px-4 xs:px-0 sm:px-2">
                                      {item.personalFinanceCategoryIconUrl ==
                                      null ? (
                                        <div className=" rounded-full bg-gray-400  dark:bg-gray-100 xs:ml-1 xs:h-4 xs:w-4 sm:ml-6 sm:h-8 sm:w-8"></div>
                                      ) : (
                                        <Image
                                          src={
                                            item.personalFinanceCategoryIconUrl
                                          }
                                          alt="Icon"
                                          width={20}
                                          height={20}
                                          className="rounded-full xs:ml-1 xs:h-4 xs:w-4 sm:ml-6 sm:h-8 sm:w-8"
                                        />
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
                                <td className="whitespace-nowrap px-3 py-3 text-gray-500 dark:text-gray-100 xs:px-1 xs:text-xs sm:py-2">
                                  <div className="xs:text-[0.575rem] sm:text-xs md:text-sm xl:text-base 2xl:text-lg">
                                    {item.transactionDate}
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-3 text-gray-600 dark:text-gray-100 xs:px-1 sm:py-2">
                                  <span
                                    className={`inline-flex items-center rounded-md px-2 py-1 font-medium xs:text-[0.575rem] sm:text-xs md:text-sm xl:text-base 2xl:text-lg `}
                                  >
                                    ${formatCurrency(item.amount)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="mx-auto w-1/3 py-6">
                    <button className="w-full whitespace-nowrap rounded-lg bg-[#27674a] px-4 py-2 text-center font-medium text-white hover:bg-green-700 xs:text-xs sm:text-sm">
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
