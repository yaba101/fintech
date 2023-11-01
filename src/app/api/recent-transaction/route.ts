// Import the data from the JSON file
import recentTransaction from "../../../../data/recentTransaction.json";
import type { NextApiRequest, NextApiResponse } from "next";
type ResponseData = {
  company: string;
  date: string;
  amount: string;
};
export async function GET(req: NextApiRequest) {
  return Response.json(recentTransaction);
}
