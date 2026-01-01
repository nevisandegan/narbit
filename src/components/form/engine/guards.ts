/**
 * Checks if a value is a valid finite number.
 *
 * This function safely determines whether the provided value is a proper number
 * (not NaN, Infinity, or -Infinity) and is finite.
 * It returns `false` for `undefined`, `null`, non-numeric types, NaN, or Infinity.
 *
 * @param value - The value to check (typically a number, but can be undefined or other types)
 * @returns `true` if the value is a finite number, `false` otherwise.
 *
 * @example
 * isValidNumber(42);        // true
 * isValidNumber(3.14);      // true
 * isValidNumber(NaN);       // false
 * isValidNumber(Infinity);  // false
 * isValidNumber(undefined); // false
 */
export const isValidNumber = (value?: number): boolean =>
  Number.isFinite(value);

/**
 * Checks whether division of `a` by `b` is safe and valid.
 *
 * This function ensures that both operands are valid finite numbers
 * and that the divisor (`b`) is not zero to prevent division-by-zero errors.
 *
 * @param a - The dividend (numerator)
 * @param b - The divisor (denominator)
 * @returns `true` if both are valid finite numbers and `b` is not zero; otherwise `false`.
 *
 * @example
 * canDivide(10, 2);     // true
 * canDivide(5, 0);      // false (division by zero)
 * canDivide(NaN, 5);    // false
 * canDivide(10, Infinity); // false
 * canDivide(undefined, 5); // false
 */
export const canDivide = (a?: number, b?: number): boolean =>
  isValidNumber(a) && isValidNumber(b) && b !== 0;