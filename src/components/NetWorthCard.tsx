import { z } from "zod";

type AssetDebtResponse = {
  asset: number;
  debt: number;
  succeeded: boolean;
};

const AssetDebtResponseSchema = z.object({
  asset: z.number(),
  debt: z.number(),
  succeeded: z.boolean(),
});

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getData = async (url: string): Promise<AssetDebtResponse> => {
  try {
    await delay(2000);
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return AssetDebtResponseSchema.parse(responseData);
  } catch (error) {
    console.error("Error while fetching data:", error);
    return { asset: 0, debt: 0, succeeded: false };
  }
};

const NetWorthCard = async ({
  title,
  buttonText,
}: {
  title: string;
  buttonText: string;
}) => {
  const response = await getData(`${process.env.URL}/api/asset-debt`);
  const netWorth = response.asset - response.debt;

  return (
    <div className="mx-auto mb-3 overflow-hidden rounded-lg border bg-gray-50 py-2 shadow-lg dark:border-gray-900 dark:bg-dark">
      <div className="px-6 py-4 text-center">
        <h4 className="font-semibold antialiased dark:text-gray-300 2xl:text-2xl">
          {title}
        </h4>
        <p className="my-3 text-xl font-semibold antialiased dark:text-gray-50 2xl:text-2xl">
          ${netWorth}
        </p>
      </div>
      <div className="py-2 text-center">
        <button className="rounded-lg bg-[#27674a] px-4 py-2 font-semibold text-white antialiased hover:bg-green-700">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default NetWorthCard;
