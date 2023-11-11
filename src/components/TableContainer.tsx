import { z } from "zod";
import Table from "./Table";

type RecentTransactionData = {
  icon?: any;
  company: string;
  date: string;
  amount: string;
};
type RecentTransaction = {
  transactionDate: string;
  amount: number;
  merchant: string;
  transactionName: string;
  category: string;
  personalFinanceCategory: string;
  personalFinanceCategoryIconUrl: string | null;
};
type RecentTransactionResponse = {
  recentTransactions: RecentTransaction[];
  succeeded: boolean;
};
type RequestBody = {
  toDate: Date | null;
  fromDate: Date | null;
};

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
  succeeded: z.boolean(),
});

const RequestBodySchema = z.object({
  toDate: z.date(),
  fromDate: z.date(),
});

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getRecentTransactionData = async (url: string, body?: RequestBody) => {
  try {
    await delay(2000);
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    RecentTransactionResponseSchema.parse(responseData);

    return responseData as RecentTransactionResponse;
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {
      recentTransactions: [],
      succeeded: false,
    } as RecentTransactionResponse;
  }
};

const TableContainer = async () => {
  return <Table />;
};

export default TableContainer;
