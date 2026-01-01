import { calculateFee } from "./fee";

/**
 * Calculates the net amount the user will actually receive after deducting the trading fee.
 *
 * This function determines how much asset (BTC for BUY, USDT for SELL) the user receives
 * after the exchange fee has been applied.
 *
 * - **BUY order**: You pay with USDT and receive BTC. The fee is deducted from the BTC you receive.
 *   → receive = amount - fee (where fee = amount × FEE_RATE)
 * - **SELL order**: You sell BTC and receive USDT. The fee is deducted from the USDT you receive.
 *   → receive = total - fee (where fee = total × FEE_RATE)
 *
 * If the relevant input (`amount` for BUY, `total` for SELL) is missing or not a number,
 * the function returns 0.
 *
 * @param side - The side of the order: "BUY" or "SELL"
 * @param amount - The gross amount of BTC (used for BUY orders – before fee deduction)
 * @param total - The gross total in USDT (used for SELL orders – before fee deduction)
 *
 * @returns The net amount the user receives after fee:
 *          - BTC amount for BUY orders
 *          - USDT amount for SELL orders
 *          Returns 0 if input is invalid or missing.
 *
 * @example
 * // Assuming FEE_RATE = 0.015 (1.5%)
 * calculateReceive("BUY", 0.1);        // returns ~0.0985  → you receive 0.0985 BTC after fee
 * calculateReceive("SELL", undefined, 1000); // returns 985 → you receive 985 USDT after fee
 * calculateReceive("BUY");            // returns 0
 */
export const calculateReceive = (
  side: "BUY" | "SELL",
  amount?: number,
  total?: number
): number => {
  const fee = calculateFee(side, amount, total);

  if (side === "BUY") {
    return typeof amount === "number" ? amount - fee : 0;
  }

  if (side === "SELL") {
    return typeof total === "number" ? total - fee : 0;
  }

  return 0;
};