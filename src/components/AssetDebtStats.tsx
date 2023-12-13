import Stats from "./Stats";
import { z } from "zod";
import { urlEndpoints } from "@/endpoint/urlEndpoint";
import { Add, Remove, TrendingDown, TrendingUp } from "@mui/icons-material";
import { formatCurrency } from "@/utils/moneyFormat";
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

const AssetDebtStats = async () => {
  const { asset, debt, succeeded } = await getData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${urlEndpoints["assetDebt"]}`
  );
  const formattedAsset = formatCurrency(asset);
  const formattedDebt = formatCurrency(debt);

  return (
    <>
      {!succeeded ? (
        <>
          <div className="flex flex-grow justify-between rounded-lg bg-gray-50 px-4 py-6 shadow-lg dark:bg-dark sm:px-1 sm:py-4 md:py-6">
            <p className=" antialiased text-center mx-auto text-gray-500 sm:text-sm md:text-base">
              Error occured. Try again.
            </p>
          </div>
          <div className="flex flex-grow justify-between rounded-lg bg-gray-50 px-4 py-6 shadow-lg dark:bg-dark sm:px-1 sm:py-4 md:py-6">
            <p className=" antialiased text-center mx-auto text-gray-500  sm:text-sm md:text-base">
              Error occured. Try again.
            </p>
          </div>
        </>
      ) : (
        <>
          <Stats
            title="Total Assets"
            icon={
              <TrendingDown className="text-gray-100 dark:text-gray-100 xs:h-4 xs:w-4 md:h-8 md:w-8 lg:h-5 lg:w-5 xl:h-8 xl:w-8" />
            }
            iconBgColor="bg-[#27674a]"
            textBgColor="bg-green-300"
            textColor="text-green-700 dark:text-green-200"
            amount={formattedAsset}
            signIcon={
              <Add className="text-green-600 dark:text-green-600 xs:h-4 xs:w-2 md:h-5 md:w-3" />
            }
          />
          <Stats
            icon={
              <TrendingUp className="text-gray-100 dark:text-gray-100 xs:h-4 xs:w-4 md:h-8 md:w-8 lg:h-5 lg:w-5 xl:h-8 xl:w-8" />
            }
            title="Total Debt"
            iconBgColor="bg-red-600"
            textBgColor="bg-red-300"
            textColor="text-red-800 dark:text-red-100"
            amount={formattedDebt}
            signIcon={
              <Remove className="text-red-600 dark:text-red-600 xs:h-4 xs:w-2 md:h-5 md:w-3" />
            }
          />
        </>
      )}
    </>
  );
};

export default AssetDebtStats;
