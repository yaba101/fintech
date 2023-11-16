"use client";
import { useEffect, useState, useTransition } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange as DatePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";

interface DatePickerWithRangeProps {
  className?: string;
  fromParam: string;
  toParam: string;
}

export function DatePickerWithRange({
  className,
  fromParam,
  toParam,
}: DatePickerWithRangeProps) {
  const [selectedRange, setSelectedRange] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
  });
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get(fromParam);
  const to = searchParams.get(toParam);

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "dd/MM/yy") : "";
  };

  useEffect(() => {
    const fromDate = searchParams.get(fromParam);
    const toDate = searchParams.get(toParam);

    if (fromDate && toDate) {
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        setSelectedRange({
          startDate,
          endDate,
        });
      } else {
        console.error("Invalid date format in URL");
      }
    }
  }, [searchParams, fromParam, toParam]);

  return (
    <div className={cn("grid w-fit gap-2 ", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "mb-0 w-full justify-start bg-transparent p-1 text-left font-normal",
              !selectedRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedRange?.startDate && selectedRange?.endDate ? (
              <>
                <span className="text-xs">
                  {formatDate(selectedRange.startDate)} -{" "}
                  {formatDate(selectedRange.endDate)}
                </span>
                {isPending && (
                  <div role="loading">
                    <svg
                      aria-hidden="true"
                      className="ml-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </>
            ) : (
              <span className="text-sm">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full border border-gray-600 p-0 shadow-2xl shadow-gray-400 dark:shadow-black "
          align="start"
        >
          <DatePicker
            className="dark:bg-gray-200 "
            editableDateInputs={true}
            onChange={(item) => {
              setSelectedRange(item?.selection as any);
              startTransition(() => {
                const currentSearchParams = new URLSearchParams(
                  window.location.search,
                );

                currentSearchParams.set(
                  fromParam,
                  formatDate(item?.selection?.startDate) || "",
                );
                currentSearchParams.set(
                  toParam,
                  formatDate(item?.selection?.endDate) || "",
                );

                router.push(`?${currentSearchParams.toString()}`);
              });
            }}
            moveRangeOnFirstSelection={false}
            ranges={[{ ...selectedRange, key: "selection" } as any]}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
