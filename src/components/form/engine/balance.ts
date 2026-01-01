import { MOCK_BALANCE } from "../order-form/config";


/**
 * Checks whether a trade order can be placed based on available mock balance.
 *
 * This utility function determines if there is sufficient balance to execute
 * a BUY or SELL order in a mocked environment.
 *
 * - For **BUY** orders: checks if the total cost (in USDT) does not exceed available USDT balance.
 * - For **SELL** orders: checks if the amount of BTC to sell does not exceed available BTC balance.
 *
 * If `amount` or `total` is undefined, it is treated as 0 (safe for optional inputs).
 *
 * @param side - The side of the order: "BUY" for buying BTC with USDT, "SELL" for selling BTC.
 * @param amount - The quantity of BTC involved in the trade (used for SELL orders).
 * @param total - The total cost in USDT (used for BUY orders).
 *
 * @returns `true` if the balance is sufficient for the operation, `false` otherwise.
 *          Always returns `true` for invalid/unknown `side` (defensive fallback).
 *
 * @example
 * checkBalance("BUY", undefined, 50);   // true  → 50 USDT ≤ 100 USDT
 * checkBalance("BUY", undefined, 150);  // false → not enough USDT
 * checkBalance("SELL", 0.5);            // true  → 0.5 BTC ≤ 1 BTC
 * checkBalance("SELL", 2);              // false → not enough BTC
 */


export const checkBalance = (
  side: "BUY" | "SELL",
  amount?: number,
  total?: number
) => {
  if (side === "BUY") return (total ?? 0) <= MOCK_BALANCE.USDT;
  if (side === "SELL") return (amount ?? 0) <= MOCK_BALANCE.BTC;
  return true;
};
