import { FEE_RATE } from "../order-form/config";

export const calculateFee = (
  side: "BUY" | "SELL",
  amount?: number,
  total?: number
) => {

  if (side === "BUY") {
    return typeof amount === "number" ? amount * FEE_RATE : 0;
  }
  if (side === "SELL") {
    return typeof total === "number" ? total * FEE_RATE : 0;
  }
  return 0;
};
