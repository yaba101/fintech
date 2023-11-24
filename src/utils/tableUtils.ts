import { z } from "zod";

const RecentTransactionSchema = z.object({
  transactionDate: z.string(),
  amount: z.number(),
  merchant: z.string(),
  transactionName: z.string(),
  category: z.string(),
  personalFinanceCategory: z.string(),
  personalFinanceCategoryIconUrl: z.string().nullable(),
});

const RecentTransactionResponseSchema = z.object({
  recentTransactions: z.array(RecentTransactionSchema),
});

export const getRecentTransactionData = async (
  url: RequestInfo,
  body?: { toDate: any; fromDate: any },
) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    RecentTransactionResponseSchema.parse(data);
    return { recentTransactions: data.recentTransactions, succeeded: true };
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {
      recentTransactions: [],
      succeeded: false,
    };
  }
};
