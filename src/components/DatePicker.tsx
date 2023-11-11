"use client";
import { Calendar as CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import React, { useState } from "react";
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
import { useRouter } from "next/navigation";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
  });
  const router = useRouter();

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "dd/MM/yy") : "";
  };
  console.log({ selectedRange });
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
              console.log("start", item.selection);
              router.push(
                `/?from=${formatDate(
                  item?.selection?.startDate,
                )}&to=${formatDate(item?.selection.endDate)}`,
              );
            }}
            moveRangeOnFirstSelection={false}
            ranges={[{ ...selectedRange, key: "selection" }]}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
