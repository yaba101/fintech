export function formatNumber(value: number | null): string {
  if (value === null || value === 0) {
    return "0.00";
  } else {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
