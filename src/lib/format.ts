/** "2026-03" → "Mar 2026" */
export function formatMonth(date: string) {
  const [y, m] = date.split("-").map(Number);
  return new Date(y, m - 1).toLocaleString("en-US", { month: "short", year: "numeric" });
}
