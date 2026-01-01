import { FEE_RATE } from "../order-form/config";

/**
 * Calculates the trading fee for a BUY or SELL order based on the configured fee rate.
 *
 * The fee is calculated differently depending on the order side:
 * - **BUY**: Fee is charged on the received amount of BTC → `amount * FEE_RATE`
 * - **SELL**: Fee is charged on the received total in USDT → `total * FEE_RATE`
 *
 * This reflects common exchange behavior where the fee is deducted from the asset you receive.
 *
 * If the relevant parameter (`amount` for BUY, `total` for SELL) is undefined or not a number,
 * the fee returned is 0.
 *
 * @param side - The side of the order: "BUY" or "SELL"
 * @param amount - The quantity of BTC (used for BUY orders – the amount you receive after fee)
 * @param total - The total value in USDT (used for SELL orders – the amount you receive after fee)
 *
 * @returns The calculated fee amount (in BTC for BUY, in USDT for SELL), or 0 if input is invalid/missing.
 *
 * @example
 * calculateFee("BUY", 0.1);     // returns 0.0015  → 1.5% of 0.1 BTC
 * calculateFee("SELL", undefined, 1000); // returns 15     → 1.5% of 1000 USDT
 * calculateFee("BUY");          // returns 0
 */

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
