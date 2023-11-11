import { ArrowRightIcon } from "@heroicons/react/20/solid";
import HalfDonutChart from "@/components/HalfPieChart";
import { Button } from "./ui/button";
import { z, ZodError } from "zod";
import MonthDropDown from "./MonthDropDown";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

type CommonResponse = {
  totalExpense?: number;
  totalIncome?: number;
};

type CashOutResponse = CommonResponse & {
  totalExpense: number;
  fourExpenseCategories: { category: string; sum: number }[];
  succeeded: boolean;
};

type CashInResponse = CommonResponse & {
  totalIncome: number;
  fourIncomeCategories: { category: string; sum: number }[];
  succeeded: boolean;
};

type RequestBody = {
  toDate: Date;
  fromDate: Date;
};

const CashOutResponseSchema = z.object({
  totalExpense: z.number(),
  fourExpenseCategories: z.array(
    z.object({
      category: z.string(),
      sum: z.number(),
    }),
  ),
  succeeded: z.boolean(),
});

const CashInResponseSchema = z.object({
  totalIncome: z.number(),
  fourIncomeCategories: z.array(
    z.object({
      category: z.string(),
      sum: z.number(),
    }),
  ),
  succeeded: z.boolean(),
});

const RequestBodySchema = z.object({
  toDate: z.date(),
  fromDate: z.date(),
});

const validateResponse = <T,>(
  data: unknown,
  schema: z.ZodType<T, any, any>,
): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Error while validating response data:", error.errors);
    } else {
      console.error("Error while validating response data:", error);
    }
    return {} as T;
  }
};

const fetchData = async <T,>(
  url: string,
  body: RequestBody,
  schema: z.ZodType<T, any, any>,
): Promise<T | undefined> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return validateResponse(responseData, schema);
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {} as T;
  }
};

type ActivityType = "/api/cash-out-activity" | "/api/cash-in-activity";

type ActivityResponseMap = {
  "cash-out-activity": CashOutResponse;
  "cash-in-activity": CashInResponse;
};

export default async function CashActivity<T>({
  title,
  url,
}: {
  title: string;
  url: ActivityType;
}) {
  const currentDate = new Date();
  const fromDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const toDate = currentDate;

  type ResponseType = CommonResponse & (CashOutResponse | CashInResponse);

  let response: ResponseType | undefined;
  if (url === "/api/cash-out-activity") {
    response = await fetchData<CashOutResponse>(
      `${process.env.URL}${url}`,
      { fromDate, toDate },
      CashOutResponseSchema,
    );
  } else if (url === "/api/cash-in-activity") {
    response = await fetchData<CashInResponse>(
      `${process.env.URL}${url}`,
      { fromDate, toDate },
      CashInResponseSchema,
    );
  }
  if (response) {
    Cookies.set("cashActivityResponse", JSON.stringify(response), {
      expires: 30, // 30 days
    });

    console.log(JSON.stringify(response), cookies);
  }
  const CurrentColors = ["#146f43", "#2d23c2", "#b3a641", "#eb34b4"];
  const isCashOut =
    (response as CashOutResponse)?.fourExpenseCategories !== undefined;
  const isCashIn =
    (response as CashInResponse)?.fourIncomeCategories !== undefined;

  let sortedData: { category: string; sum: number }[] = [];
  if (isCashOut) {
    sortedData = (response as CashOutResponse).fourExpenseCategories.sort(
      (a, b) => b.sum - a.sum,
    );
  } else if (isCashIn) {
    sortedData = (response as CashInResponse).fourIncomeCategories.sort(
      (a, b) => b.sum - a.sum,
    );
  }

  const top4Data = sortedData.slice(0, 4);

  return (
    <div className="my-3 rounded-md border bg-gray-50 p-4 shadow-md dark:border-gray-900 dark:bg-dark dark:text-gray-100">
      <div className="border-bottom flex justify-between">
        <div className="flex items-center">
          <p className="mb-0 font-bold capitalize antialiased dark:text-gray-100 xl:text-lg 2xl:text-xl">
            {title}
          </p>
        </div>
        <MonthDropDown />
      </div>
      <HalfDonutChart data={top4Data} />
      <ul className="mb-3 flex list-none flex-wrap py-3 lg:-mx-2 xl:-mx-0">
        {top4Data.map((item, index) => (
          <li key={index} className="w-full">
            {isNaN(item.sum) ? null : (
              <div className="flex space-x-2 p-1">
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

      <div className="mx-auto w-3/4">
        <Button variant="outline" className="w-full ">
          <span className="mx-auto whitespace-nowrap text-center lg:text-xs xl:text-sm">
            View All Activity
          </span>
          <ArrowRightIcon className="h-6 w-6 shrink dark:text-gray-100 " />
        </Button>
      </div>
    </div>
  );
}
