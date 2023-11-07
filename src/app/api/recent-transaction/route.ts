import recentTransaction from "../../../../data/recentTransaction.json";
type ResponseData = {
  company: string;
  date: string;
  amount: string;
};
export async function GET() {
  return Response.json(recentTransaction);
}
