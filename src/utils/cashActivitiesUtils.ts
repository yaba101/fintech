import { z, ZodError } from "zod";

type CommonResponse = {
  totalExpense?: number;
  totalIncome?: number;
};

type CashOutResponse = CommonResponse & {
  totalExpense: number;
  fourExpenseCategories: { category: string; sum: number }[];
  succeeded: boolean;
};

type CashInResponse = CommonResponse & {
  totalIncome: number;
  fourIncomeCategories: { category: string; sum: number }[];
  succeeded: boolean;
};

type RequestBody = {
  toDate: Date | null;
  fromDate: Date | null;
};

export const CashOutResponseSchema = z.object({
  totalExpense: z.number(),
  fourExpenseCategories: z.array(
    z.object({
      category: z.string(),
      sum: z.number(),
    }),
  ),
  succeeded: z.boolean(),
});

export const CashInResponseSchema = z.object({
  totalIncome: z.number(),
  fourIncomeCategories: z.array(
    z.object({
      category: z.string(),
      sum: z.number(),
    }),
  ),
  succeeded: z.boolean(),
});

export const RequestBodySchema = z.object({
  toDate: z.date().nullable(),
  fromDate: z.date().nullable(),
});

export const validateResponse = <T>(
  data: unknown,
  schema: z.ZodType<T, any, any>,
): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Error while validating response data:", error.errors);
    } else {
      console.error("Error while validating response data:", error);
    }
    return {} as T;
  }
};

export const fetchData = async <T>(
  url: string,
  body: RequestBody,
  schema: z.ZodType<T, any, any>,
): Promise<T | undefined> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return validateResponse(responseData, schema);
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {} as T;
  }
};
