"use client";
import { useState, useEffect, useTransition } from "react";
import { DateRange as DatePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarToday } from "@mui/icons-material";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { format } from "date-fns";

interface DatePickerWithRangeProps {
  className?: string;
  onSelect: (fromDate: Date, toDate: Date) => void;
}

export function DatePickerWithRange({
  className,
  onSelect,
}: DatePickerWithRangeProps) {
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [isPending, startTransition] = useTransition();

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "MMM d, yyyy") : "";
  };

  useEffect(() => {
    setSelectedRange({
      startDate: new Date(),
      endDate: new Date(),
    });
  }, []);

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
            <CalendarToday className="mr-2 h-4 w-4" />
            {selectedRange?.startDate && selectedRange?.endDate ? (
              <>
                <span className="text-xs">
                  {formatDate(selectedRange.startDate)} -{" "}
                  {formatDate(selectedRange.endDate)}
                </span>
                {isPending && (
                  <div role="loading">{/* Loading indicator */}</div>
                )}
              </>
            ) : (
              <>
                <span className="text-xs">
                  {format(new Date(), "MMM d, yyyy")} -{" "}
                  {format(new Date(), "MMM d, yyyy")}
                </span>
                {isPending && (
                  <div role="loading">{/* Loading indicator */}</div>
                )}
              </>
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
                onSelect(
                  item?.selection?.startDate as Date,
                  item?.selection?.endDate as Date,
                );
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
