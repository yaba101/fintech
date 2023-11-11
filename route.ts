import transactions from "../../../../data/";

export async function GET() {
  return Response.json(transactions);
}
