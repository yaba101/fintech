import { NextResponse } from "next/server";
import assetDebt from "../../../../data/asset-debt.json";

export async function POST() {
  const response = NextResponse.json(assetDebt);

  response.cookies.set({
    name: "assetDebt",
    value: JSON.stringify(assetDebt),
    maxAge: 60 * 60,
    path: "/dashboard",
  });

  return response;
}
