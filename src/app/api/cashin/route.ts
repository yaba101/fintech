import cashInData from "../../../../data/cashIn.json";
type ResponseData = {
  value: string;
  title: string;
};
export async function GET() {
  return Response.json(cashInData);
}
