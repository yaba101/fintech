import assetDebt from "../../../../data/asset-debt.json";

export async function POST() {
  return Response.json(assetDebt);
}
