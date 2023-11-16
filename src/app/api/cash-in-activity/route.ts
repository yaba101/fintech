import { NextRequest, NextResponse } from "next/server";
import cashInActivity from "../../../../data/cash-in-activity.json";

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { fromDate, toDate } = requestBody;

    const filteredCashInActivity = cashInActivity.filter((activity) => {
      const activityDate = new Date(activity.activityDate);

      return (
        (!fromDate || activityDate >= new Date(fromDate)) &&
        (!toDate || activityDate <= new Date(toDate))
      );
    });

    const sortedCashInActivity = filteredCashInActivity.sort(
      (a, b) => b.sum - a.sum,
    );

    const fourIncomeCategories = sortedCashInActivity.slice(0, 4);

    const totalIncome = fourIncomeCategories.reduce(
      (total, category) => total + category.sum,
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

    const response = NextResponse.json(responseObject);

    response.cookies.set({
      name: "cashInActivity",
      value: JSON.stringify(filteredCashInActivity),
      maxAge: 60 * 60,
      path: "/dashboard",
    });
    return response;
  } catch (error) {
    console.error("Error parsing JSON from request body:", error);

    return new Response("Error parsing JSON from request body", {
      status: 400,
    });
  }
}
