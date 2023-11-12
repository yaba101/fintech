import { NextRequest, NextResponse } from "next/server";
import transactions from "../../../../data/transactions.json";

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { fromDate, toDate } = requestBody;

    const filteredTransactions = transactions.recentTransactions.filter(
      (transaction) => {
        const transactionDate = new Date(transaction.transactionDate);

        return (
          (!fromDate || transactionDate >= new Date(fromDate)) &&
          (!toDate || transactionDate <= new Date(toDate))
        );
      },
    );

    const response = NextResponse.json({
      recentTransactions: filteredTransactions,
      succeeded: true,
    });

    response.cookies.set({
      name: "transactions",
      value: JSON.stringify(filteredTransactions),
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
