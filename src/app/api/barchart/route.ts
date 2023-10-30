// Import the data from the JSON file
import groupedBarChartData from "../../../../data/groupedBarChart.json";
import type { NextApiRequest, NextApiResponse } from "next";
type ResponseData = {
  lable: string;
  value: number[];
};
export async function GET(req: NextApiRequest) {
  return Response.json(groupedBarChartData);
}
