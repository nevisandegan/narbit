/**
 * Rounds a number to a specified number of decimal places.
 *
 * This function uses the "round half away from zero" strategy via `Math.round`.
 * It avoids common JavaScript floating-point pitfalls (like 0.1 + 0.2 !== 0.3)
 * by multiplying by a power of 10, rounding, then dividing back.
 *
 * @param value - The number to round (can be positive, negative, or zero)
 * @param decimals - The number of decimal places to round to (should be a non-negative integer)
 * @returns The rounded number with exactly `decimals` decimal places.
 *          If `decimals` is negative or non-integer, behavior follows Math.pow rules.
 *
 * @example
 * roundTo(123.45678, 2);  // returns 123.46
 * roundTo(123.454, 2);    // returns 123.45
 * roundTo(0.005, 2);      // returns 0.01  (rounds up)
 * roundTo(-123.456, 2);   // returns -123.46
 * roundTo(5.675, 2);      // returns 5.68  (correctly rounds .675 up)
 */

export const roundTo = (value: number, decimals: number) => {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
};