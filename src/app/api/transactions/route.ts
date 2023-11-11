import transactions from "../../../../data/transactions.json";

export async function POST() {
  return Response.json(transactions);
}
