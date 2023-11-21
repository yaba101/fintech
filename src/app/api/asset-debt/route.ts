import { NextResponse } from "next/server";
import { formatCurrency } from "@/utils/moneyFormat";
import { urlEndpoints } from "@/endpoint/urlEndpoint";

export async function POST() {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/${urlEndpoints["assetDebt"]}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    console.log();
    const { asset, debt } = data?.[0];

    const formattedAsset = formatCurrency(asset);
    const formattedDebt = formatCurrency(debt);

    const formattedData = {
      asset: formattedAsset,
      debt: formattedDebt,
      succeeded: true,
    };
    console.log({ formattedData });

    const jsonResponse = NextResponse.json(formattedData);

    jsonResponse.cookies.set({
      name: "assetDebt",
      value: JSON.stringify(formattedData),
      maxAge: 60 * 60,
      path: "/dashboard",
    });

    return jsonResponse;
  } catch (error) {
    console.error("Error fetching data:", error);

    return NextResponse.error();
  }
}
