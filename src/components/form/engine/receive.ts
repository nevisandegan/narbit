import { calculateFee } from "./fee";

export const calculateReceive = (
  side: "BUY" | "SELL",
  amount?: number,
  total?: number
) => {
  const fee = calculateFee(side, amount, total);

  if (side === "BUY") {
    return typeof amount === "number" ? amount - fee : 0;
  }

  if (side === "SELL") {
    return typeof total === "number" ? total - fee : 0;
  }

  return 0;
};
