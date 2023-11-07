import cashOutData from "../../../../data/cashout.json";
type ResponseData = {
  value: string;
  title: string;
};
export async function GET() {
  return Response.json(cashOutData);
}
