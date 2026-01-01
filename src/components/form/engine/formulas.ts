/**
 * Calculates the total cost (in quote currency, e.g., USDT) from price and amount.
 *
 * @param price - The price per unit (e.g., BTC price in USDT)
 * @param amount - The quantity of base asset (e.g., amount of BTC)
 * @returns The total value: price × amount
 *
 * @example
 * calculateTotal(50000, 0.02); // returns 1000 (spending 1000 USDT to buy 0.02 BTC at 50,000 USDT/BTC)
 */
export const calculateTotal = (price: number, amount: number): number =>
    price * amount;

/**
 * Calculates the amount of base asset (e.g., BTC) that can be bought with a given total.
 *
 * @param total - The total cost in quote currency (e.g., USDT)
 * @param price - The current price per unit
 * @returns The amount: total ÷ price
 *
 * @example
 * calculateAmount(1000, 50000); // returns 0.02 (you can buy 0.02 BTC with 1000 USDT)
 */
export const calculateAmount = (total: number, price: number): number =>
    total / price;

/**
 * Calculates the effective price per unit from total cost and amount.
 *
 * @param total - The total cost in quote currency
 * @param amount - The quantity of base asset
 * @returns The price: total ÷ amount
 *
 * @example
 * calculatePrice(1000, 0.02); // returns 50000 (average price paid)
 */
export const calculatePrice = (total: number, amount: number): number =>
    total / amount;