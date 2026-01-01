import { DECIMALS, MOCK_BALANCE } from "../order-form/config";
import { calculateAmount, calculatePrice, calculateTotal } from "./formulas";
import { canDivide } from "./guards";
import { roundTo } from "./round-to";
import type { EngineContext, OrderValues } from "../types/types";


/**
 * Calculates the next state of order form fields based on the last updated field.
 *
 * This is the core calculation engine for a trading order form (BUY/SELL BTC-USDT).
 * When the user changes one field (price, amount, total, or slider), this function
 * automatically updates the dependent fields while respecting:
 * - Precision rules (DECIMALS.BTC and DECIMALS.USDT)
 * - Balance limits (slider resets to 0 if exceeding available balance)
 * - Safe division (using canDivide guard)
 * - Proper rounding
 *
 * The function is pure and returns only the fields that should be updated.
 *
 * @param values - Current values of the order form { price?, amount?, total? }
 * @param context - Context containing:
 *   - lastUpdatedField: which field triggered the calculation ("price" | "amount" | "total" | "slider")
 *   - side: "BUY" or "SELL"
 *   - sliderPercent?: percentage from slider (0-100) when slider is the trigger
 *
 * @returns Partial<OrderValues> containing only the fields that need to be updated.
 *          May include: price, amount, total, slider
 *
 * @example
 * // User types a new total on BUY side
 * calculateNextValues(
 *   { total: 500 },
 *   { lastUpdatedField: "total", side: "BUY", price: 50000 }
 * );
 * // → { amount: 0.01, slider: 50 } (assuming MOCK_BALANCE.USDT = 1000)
 */

export function calculateNextValues(
  values: Partial<OrderValues>,
  context: EngineContext
): Partial<OrderValues> {
  const { price, amount, total } = values;
  const { lastUpdatedField, side, sliderPercent } = context;

  let next: Partial<OrderValues> = {};

  const calculateSlider = () => {
    if (side === "BUY") {
      const totalValue = next.total ?? total ?? 0;
      next.slider = totalValue > MOCK_BALANCE.USDT
        ? 0
        : roundTo((totalValue / MOCK_BALANCE.USDT) * 100, 0);
    }

    if (side === "SELL") {
      const amountValue = next.amount ?? amount ?? 0;
      next.slider = amountValue > MOCK_BALANCE.BTC
        ? 0
        : roundTo((amountValue / MOCK_BALANCE.BTC) * 100, 0);
    }
  };

  switch (lastUpdatedField) {
    case "total":
      next.total = total;
      if (canDivide(+total!, +price!)) {
        next.amount = roundTo(calculateAmount(total!, price!), DECIMALS.BTC);
      } else if (amount && canDivide(+total!, +amount)) {
        next.price = roundTo(calculatePrice(total!, amount!), DECIMALS.USDT);
      }
      calculateSlider();
      break;

    case "price":
      next.price = price;
      if (amount && price) {
        next.total = roundTo(calculateTotal(price!, amount!), DECIMALS.USDT);
      } else if (total && price && canDivide(+total, +price)) {
        next.amount = roundTo(calculateAmount(total!, price!), DECIMALS.BTC);
      }
      calculateSlider();
      break;

    case "amount":
      next.amount = amount;
      if (amount && price) {
        next.total = roundTo(calculateTotal(price!, amount!), DECIMALS.USDT);
      } else if (amount && total && canDivide(+total, +amount)) {
        next.price = roundTo(calculatePrice(total!, amount!), DECIMALS.USDT);
      }
      calculateSlider();
      break;

    case "slider":
      const sliderPercentValue = sliderPercent ?? 0;

      if (side === "BUY") {
        const totalValue = roundTo((sliderPercentValue / 100) * MOCK_BALANCE.USDT, DECIMALS.USDT);
        next.total = totalValue;
        if (price) {
          next.amount = roundTo(totalValue / price!, DECIMALS.BTC);
        }
      }

      if (side === "SELL") {
        const amountValue = roundTo((sliderPercentValue / 100) * MOCK_BALANCE.BTC, DECIMALS.BTC);
        next.amount = amountValue;
        if (price) {
          next.total = roundTo(amountValue * price!, DECIMALS.USDT);
        }
      }
      break;
  }

  return next;
}
