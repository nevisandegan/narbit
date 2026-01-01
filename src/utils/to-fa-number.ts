/**
 * Formats a number as a percentage string using Persian (Farsi) numerals and locale conventions.
 *
 * This utility uses the Internationalization API with the "fa-IR" locale to format the number
 * in Eastern Arabic numerals (۰۱۲۳۴۵۶۷۸۹), including proper thousands separators (٬).
 * The percent sign (٪) is appended at the end.
 *
 * The input number is rounded to the nearest integer according to standard rounding rules
 * before formatting (no decimal places are shown).
 *
 * @param value - The numeric value to format as a percentage.
 * @returns A string representing the percentage in Persian digits, e.g., "۴۲٪" for 42.
 *
 * @example
 * toFaPercent(0);     // "۰٪"
 * toFaPercent(42);    // "۴۲٪"
 * toFaPercent(1234);  // "۱٬۲۳۴٪"
 * toFaPercent(100);  // "۱۰۰٪"
 */

const toFaPercent = (value: number) =>
  `${new Intl.NumberFormat("fa-IR").format(value)}٪`;

export default toFaPercent;
