"use client";
import { useEffect, useState } from "react";
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
              "w-full justify-start bg-transparent text-left font-normal",
              !selectedRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedRange?.startDate && selectedRange?.endDate ? (
              <>
                {formatDate(selectedRange.startDate)} -{" "}
                {formatDate(selectedRange.endDate)}
              </>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full border border-gray-600 p-0 shadow-2xl shadow-gray-400 dark:shadow-black "
          align="start"
        >
          <DatePicker
            editableDateInputs={true}
            onChange={(item) => {
              setSelectedRange(item?.selection as any);

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
            }}
            moveRangeOnFirstSelection={false}
            ranges={[{ ...selectedRange, key: "selection" } as any]}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
