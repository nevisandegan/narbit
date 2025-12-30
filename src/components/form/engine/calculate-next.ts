import type { OrderValues, EngineContext } from "./types";
import { calculateAmount, calculatePrice, calculateTotal } from "./formulas";
import { isValidNumber, canDivide } from "./guards";

export function calculateNextValues(
  values: OrderValues,
  context: EngineContext
): Partial<OrderValues> {
  const { price, amount, total } = values;
  const { lastUpdatedField } = context;

  switch (lastUpdatedField) {
    case "price": {
      if (isValidNumber(amount) && isValidNumber(price)) {
        return { total: calculateTotal(price!, amount!) };
      }
      if (canDivide(total, price)) {
        return { amount: calculateAmount(total!, price!) };
      }
      break;
    }

    case "amount": {
      if (isValidNumber(price) && isValidNumber(amount)) {
        return { total: calculateTotal(price!, amount!) };
      }
      if (canDivide(total, amount)) {
        return { price: calculatePrice(total!, amount!) };
      }
      break;
    }

    case "total": {
      if (canDivide(total, price)) {
        return { amount: calculateAmount(total!, price!) };
      }
      if (canDivide(total, amount)) {
        return { price: calculatePrice(total!, amount!) };
      }
      break;
    }

    default:
      return {};
  }

  return {};
}
