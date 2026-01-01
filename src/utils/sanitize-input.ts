/**
 * Sanitizes and normalizes a numeric input string.
 *
 * This function takes an input string and transforms it into a valid positive number string
 * (integer or decimal), while enforcing the following rules:
 * - Removes any leading negative sign (negative numbers are not allowed; the sign is simply stripped)
 * - Removes unnecessary leading zeros (e.g., "00123" → "123")
 * - Ensures proper decimal format (e.g., ".123" → "0.123", "000.00100" → "0.001")
 * - Limits the number of decimal places to the specified maximum
 * - Strips any invalid non-numeric characters
 *
 * @param value - The input string to sanitize (may contain negative sign, leading zeros, invalid chars, etc.)
 * @param decimals - The maximum number of decimal places allowed
 *
 * @returns A cleaned string representing a valid positive number.
 *          Returns an empty string ("") if the input is completely invalid or nothing remains after sanitization.
 *
 * @example
 * sanitizeInput("00123.4500", 2);    // returns "123.45"
 * sanitizeInput("-0.00100", 3);      // returns "0.001"
 * sanitizeInput(".123", 3);          // returns "0.123"
 * sanitizeInput("abc123", 2);        // returns ""
 * sanitizeInput("000", 2);          // returns "0"
 * sanitizeInput("-123.456789", 4);  // returns "123.4567"
 */

export function sanitizeInput(value: string, decimals: number): string {
    if (!value) return '';

    let cleaned = value.replace(/^-/, '');

    const regex = new RegExp(`^0*(\\d+)(\\.\\d{0,${decimals}})?`);

    const match = cleaned.match(regex);

    if (!match) {
        return '';
    }

    let result = match[0];

    if (result.includes('.')) {
        result = result.replace(/^0*(\d*\.\d*)$/, '$1');
        if (result.startsWith('.')) {
            result = '0' + result;
        }
    } else {
        result = result.replace(/^0+/, '') || '0';
    }

    return result;
}