export function formatCurrency(value: number | null): string {
  if (value === null || value === 0) {
    return "0.00";
  } else if (typeof value === "number") {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  } else {
    return "Invalid value";
  }
}
