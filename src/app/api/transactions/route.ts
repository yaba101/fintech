import { urlEndpoints } from "@/endpoint/urlEndpoint";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { fromDate, toDate } = requestBody;

    const response = await fetch(
      `${process.env.BASE_URL}/${urlEndpoints["transaction"]}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const remoteData = await response.json();

    const filteredTransactions = remoteData?.[0].recentTransactions.filter(
      (transaction: { transactionDate: string | number | Date }) => {
        const transactionDate = new Date(transaction.transactionDate);

        return (
          (!fromDate || transactionDate >= new Date(fromDate)) &&
          (!toDate || transactionDate <= new Date(toDate))
        );
      },
    );

    const jsonResponse = NextResponse.json({
      recentTransactions: filteredTransactions,
      succeeded: true,
    });

    jsonResponse.cookies.set({
      name: "transactions",
      value: JSON.stringify(filteredTransactions),
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
