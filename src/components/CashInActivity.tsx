import { ArrowRightIcon } from "@heroicons/react/20/solid";
import HalfDonutChart from "@/components/HalfPieChart";
import { Button } from "./ui/button";
import { CashInResponseSchema, fetchData } from "@/utils/cashActivitiesUtils";
import Stats from "./Stats";
import { ArrowDownLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { DatePickerWithRange } from "./DatePicker";
import { parse } from "date-fns";

type RequestBody = {
  toDate: Date | null;
  fromDate: Date | null;
};

type CashInResponse = {
  totalIncome: number;
  fourIncomeCategories: { category: string; sum: number }[];
  succeeded: boolean;
};

export default async function CashInActivity({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  const title = "Cash In Activity";
  const url = "/api/cash-in-activity";

  const fromDate = from ? parse(from, "dd/MM/yy", new Date()) : null;
  const toDate = to ? parse(to, "dd/MM/yy", new Date()) : null;

  const requestBody: RequestBody = {
    fromDate,
    toDate,
  };


  const response = await fetchData<CashInResponse>(
    `${process.env.URL}${url}`,
    requestBody,
    CashInResponseSchema,
  );

  const CurrentColors = ["#146f43", "#2d23c2", "#b3a641", "#eb34b4"];
  const isCashIn =
    (response as CashInResponse)?.fourIncomeCategories !== undefined;

  let sortedData: { category: string; sum: number }[] = [];
  if (isCashIn) {
    sortedData = (response as CashInResponse).fourIncomeCategories.sort(
      (a, b) => b.sum - a.sum,
    );
  }

  const top4Data = sortedData.slice(0, 4);

  return (
    <>
      <Stats
        icon={
          <ArrowDownLeftIcon className="w-5 h-5 text-gray-100 dark:text-gray-100 md:h-8 md:w-8 lg:h-5 lg:w-5 xl:h-8 xl:w-8" />
        }
        title="Total Income"
        iconBgColor="bg-[#27674a]"
        textBgColor="bg-green-400"
        textColor="text-emerald-400"
        amount={response?.totalIncome!}
        signIcon={
          <PlusIcon className="font-bold text-green-600 dark:text-green-600 xs:h-4 xs:w-2 md:h-5 md:w-3" />
        }
      />
      <div className="p-4 my-1 border rounded-md shadow-md bg-gray-50 dark:border-gray-900 dark:bg-dark dark:text-gray-100">
        <div className="flex justify-between border-bottom">
          <div className="flex items-center">
            <p className="mb-0 antialiased font-bold capitalize dark:text-gray-100 xl:text-lg 2xl:text-xl">
              {title}
            </p>
          </div>
          <DatePickerWithRange fromParam="cashInFrom" toParam="cashInTo" />
        </div>
        <HalfDonutChart colors={CurrentColors} data={top4Data} />
        <ul className="flex flex-wrap py-3 mb-3 list-none lg:-mx-2 xl:-mx-0">
          {top4Data.map((item, index) => (
            <li key={index} className="w-full">
              {isNaN(item.sum) ? null : (
                <div className="flex p-1 space-x-2">
                  <button
                    className={` h-3 w-3 rounded-full font-medium text-white lg:h-2 lg:w-2 xl:h-3 xl:w-3 ${
                      index > 0 ? "sm:mt-2" : ""
                    }`}
                    style={{ background: CurrentColors[index] }}
                  />
                  <div className="flex space-x-2">
                    <h4 className="text-sm antialiased dark:text-gray-200 lg:text-xs 2xl:text-base">
                      {item.category.toString()}
                    </h4>
                    <h4 className="text-xs antialiased dark:text-gray-400 lg:text-[0.6rem] xl:text-sm">
                      {(
                        (item.sum /
                          sortedData.reduce((acc, item) => acc + item.sum, 0)) *
                        100
                      ).toFixed(2)}
                      %
                    </h4>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="w-3/4 mx-auto">
          <Button variant="outline" className="w-full ">
            <span className="mx-auto text-center whitespace-nowrap lg:text-xs xl:text-sm">
              View All Activity
            </span>
            <ArrowRightIcon className="w-6 h-6 shrink dark:text-gray-100 " />
          </Button>
        </div>
      </div>
    </>
  );
}
