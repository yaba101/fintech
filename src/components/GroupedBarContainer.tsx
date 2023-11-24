import GroupedBarChart from "./GroupedBar";
import { z } from "zod";
import { urlEndpoints } from "@/endpoint/urlEndpoint";

type RequestBody = {
  toDate: Date | null;
  fromDate: Date | null;
};

type GroupedBarChart = {
  year: number;
  month: number;
  month_name: string;
  income: number;
  expense: number;
};

type GroupedBarChartResponse = {
  incomeExpense: GroupedBarChart[];
  succeeded: boolean;
};

const RequestBodySchema = z.object({
  toDate: z.date().nullable(),
  fromDate: z.date().nullable(),
});

const GroupedBarChartSchema = z.object({
  year: z.number(),
  month: z.number(),
  month_name: z.string(),
  income: z.number(),
  expense: z.number(),
});

const GroupedBarChartResponseSchema = z.object({
  incomeExpense: z.array(GroupedBarChartSchema),
  succeeded: z.boolean(),
});

const getData = async (url: string, body?: RequestBody) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    // RequestBodySchema.parse(body);
    GroupedBarChartResponseSchema.parse(responseData);

    return responseData as GroupedBarChartResponse;
  } catch (error) {
    console.error("Error while fetching data:", error);
    return { incomeExpense: [], succeeded: false } as GroupedBarChartResponse;
  }
};

const GroupedBarContainer = async () => {
  const data = await getData(
    `${process.env.BASE_URL}/${urlEndpoints["incomeExpense"]}`,
  );

  return <GroupedBarChart data={data} />;
};

export default GroupedBarContainer;
