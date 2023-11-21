import { urlEndpoints } from "@/endpoint/urlEndpoint";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { fromDate, toDate } = requestBody;

    const response = await fetch(
      `${process.env.BASE_URL}/${urlEndpoints["cashInActivity"]}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const remoteData = await response.json();

    const filteredCashInActivity = remoteData.filter(
      (activity: { activityDate: string | number | Date }) => {
        const activityDate = new Date(activity.activityDate);

        return (
          (!fromDate || activityDate >= new Date(fromDate)) &&
          (!toDate || activityDate <= new Date(toDate))
        );
      },
    );

    const sortedCashInActivity = filteredCashInActivity.sort(
      (a: { sum: number }, b: { sum: number }) => b.sum - a.sum,
    );

    const fourIncomeCategories = sortedCashInActivity.slice(0, 4);

    const totalIncome = fourIncomeCategories.reduce(
      (total: any, category: { sum: any }) => total + category.sum,
      0,
    );

    const formattedTotalIncome =
      totalIncome === null || totalIncome === 0
        ? "0.00"
        : totalIncome.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

    const responseObject = {
      totalIncome: formattedTotalIncome,
      fourIncomeCategories,
      succeeded: true,
    };

    const jsonResponse = NextResponse.json(responseObject);

    jsonResponse.cookies.set({
      name: "cashInActivity",
      value: JSON.stringify(filteredCashInActivity),
      maxAge: 60 * 60,
      path: "/dashboard",
    });

    return jsonResponse;
  } catch (error) {
    console.error("Error fetching or processing data:", error);

    return new Response("Error fetching or processing data", {
      status: 500,
    });
  }
}
