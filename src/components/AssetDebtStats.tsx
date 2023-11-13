import React from "react";
import Stats from "./Stats";
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import { z } from "zod";
import delay from "@/utils/delay";

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
    await delay(5000);
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

const AssetDebtStats = async () => {
  const { asset, debt } = await getData(`${process.env.URL}/api/asset-debt`);

  return (
    <>
      <Stats
        title="Total Assets"
        icon={
          <ArrowDownLeftIcon className="text-gray-100 dark:text-gray-100 xs:h-4 xs:w-4 md:h-8 md:w-8 lg:h-5 lg:w-5 xl:h-8 xl:w-8" />
        }
        iconBgColor="bg-[#27674a]"
        textBgColor="bg-green-400"
        textColor="text-emerald-400"
        amount={asset}
        signIcon={
          <PlusIcon className="text-green-600 dark:text-green-600 xs:h-4 xs:w-2 md:h-5 md:w-3" />
        }
      />
      <Stats
        icon={
          <ArrowUpRightIcon className="text-gray-100 dark:text-gray-100 xs:h-4 xs:w-4 md:h-8 md:w-8 lg:h-5 lg:w-5 xl:h-8 xl:w-8" />
        }
        title="Total Debt"
        iconBgColor="bg-red-600"
        textBgColor="bg-red-400"
        textColor="text-red-400"
        amount={debt}
        signIcon={
          <MinusIcon className="text-red-600 dark:text-red-600 xs:h-4 xs:w-2 md:h-5 md:w-3" />
        }
      />
    </>
  );
};

export default AssetDebtStats;
