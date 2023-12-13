export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === 0 || value === undefined) {
    return "0.00";
  } else if (typeof value === "number") {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  } else {
    return "Invalid value";
  }
}
