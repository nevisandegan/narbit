import { MOCK_BALANCE } from "../order-form/config";

export const checkBalance = (
  side: "BUY" | "SELL",
  amount?: number,
  total?: number
) => {
  if (side === "BUY") return (total ?? 0) <= MOCK_BALANCE.USDT;
  if (side === "SELL") return (amount ?? 0) <= MOCK_BALANCE.BTC;
  return true;
};
