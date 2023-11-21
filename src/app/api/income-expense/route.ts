import { urlEndpoints } from "@/endpoint/urlEndpoint";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/${urlEndpoints["incomeExpense"]}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const remoteData = await response.json();

    const jsonResponse = NextResponse.json(remoteData[0]);

    jsonResponse.cookies.set({
      name: "incomeExpense",
      value: JSON.stringify(remoteData),
      maxAge: 60 * 60,
      path: "/dashboard",
    });

    return jsonResponse;
  } catch (error) {
    console.error("Error fetching or processing data:", error);

    return new Response("Error fetching or processing data", {
      status: 500,
    });
  }
}
