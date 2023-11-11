import assetDebt from "../../../../data/asset-debt.json";
type ResponseData = {
  lable: string;
  values: number[];
};
export async function GET() {
  return Response.json(assetDebt);
}
