import groupedBarChartData from "../../../../data/groupedBarChart.json";
type ResponseData = {
  lable: string;
  values: number[];
};
export async function GET() {
  return Response.json(groupedBarChartData);
}
