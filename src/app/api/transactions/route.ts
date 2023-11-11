import transactions from "../../../../data/transactions.json";

export async function POST(req: Request) {
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

    return new Response(
      JSON.stringify({
        recentTransactions: filteredTransactions,
        succeeded: true,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error parsing JSON from request body:", error);

    return new Response("Error parsing JSON from request body", {
      status: 400,
    });
  }
}
