import { urlEndpoints } from "@/endpoint/urlEndpoint";
import { formatCurrency } from "@/utils/moneyFormat";
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

const getData = async (url: string): Promise<AssetDebtResponse> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) {
      return {
        asset: "0.00" as unknown as number,
        debt: "0.00" as unknown as number,
        succeeded: false,
      };
    }

    const responseData = await response.json();
    return AssetDebtResponseSchema.parse(responseData);
  } catch (error) {
    console.error("Error occured. Try again.:", error);
    return {
      asset: "0.00" as unknown as number,
      debt: "0.00" as unknown as number,
      succeeded: false,
    };
  }
};

const NetWorthCard = async ({
  title,
  buttonText,
}: {
  title: string;
  buttonText: string;
}) => {
  const { asset, debt, succeeded } = await getData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${urlEndpoints["assetDebt"]}`
  );
  const netWorth = (asset || 0) - (debt || 0);
  const formattedNetWorth = formatCurrency(netWorth);

  return (
    <div className="mx-auto mb-3 overflow-hidden rounded-lg border bg-gray-50 py-2 shadow-lg dark:border-gray-900 dark:bg-dark">
      <div className="px-6 py-4 text-center">
        {!succeeded ? (
          <p className="mx-auto text-center text-gray-500">
            Error occured. Try again.
          </p>
        ) : (
          <>
            <h4 className="font-semibold antialiased dark:text-gray-300 2xl:text-2xl">
              {title}
            </h4>
            <p className="my-3 text-xl font-semibold antialiased dark:text-gray-50 2xl:text-2xl">
              ${formattedNetWorth}
            </p>
          </>
        )}
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
