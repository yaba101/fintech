import { NextResponse } from "next/server";
import assetDebt from "../../../../data/asset-debt.json";
import { formatNumber } from "@/utils/moneyFormat";

export async function POST() {
  const { asset, debt } = assetDebt;

  const formattedAsset = formatNumber(asset);
  const formattedDebt = formatNumber(debt);

  const formattedData = {
    asset: formattedAsset,
    debt: formattedDebt,
    succeeded: true,
  };

  const response = NextResponse.json(formattedData);

  response.cookies.set({
    name: "assetDebt",
    value: JSON.stringify(formattedData),
    maxAge: 60 * 60,
    path: "/dashboard",
  });

  return response;
}
