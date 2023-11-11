"use client";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateWithRangePicker = () => {
  function handleSelect(range) {
    console.log(range);
  }
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  return <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />;
};

export default DateWithRangePicker;
