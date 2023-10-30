// Import the data from the JSON file
import cashInData from "../../../../data/cashIn.json";
import type { NextApiRequest, NextApiResponse } from "next";
type ResponseData = {
  color: string;
  title: string;
};
export async function GET(req: NextApiRequest) {
  return Response.json(cashInData);
}
