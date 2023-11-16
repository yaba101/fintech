import { NextRequest, NextResponse } from "next/server";
import cashOutActivity from "../../../../data/cash-out-activity.json";

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { fromDate, toDate } = requestBody;

    const filteredCashOutActivity = cashOutActivity.filter((activity) => {
      const activityDate = new Date(activity.activityDate);

      return (
        (!fromDate || activityDate >= new Date(fromDate)) &&
        (!toDate || activityDate <= new Date(toDate))
      );
    });

    const sortedCashOutActivity = filteredCashOutActivity.sort(
      (a, b) => b.sum - a.sum,
    );

    const fourExpenseCategories = sortedCashOutActivity.slice(0, 4);
    const totalExpense = fourExpenseCategories.reduce(
      (total, category) => total + category.sum,
      0,
    );

    const formattedTotalExpense =
      totalExpense === null || totalExpense === 0
        ? "0.00"
        : totalExpense.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

    const responseObject = {
      totalExpense: formattedTotalExpense,
      fourExpenseCategories,
      succeeded: true,
    };

    const response = NextResponse.json(responseObject);

    response.cookies.set({
      name: "cashOutActivity",
      value: JSON.stringify(filteredCashOutActivity),
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
