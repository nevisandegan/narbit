import { sanitizeInput } from "../utils/sanitize-input";

describe("sanitizeInput", () => {
    test("Returns an integer without change", () => {
        expect(sanitizeInput("123", 2)).toBe("123");
    });

    test("Limits decimals to the allowed number", () => {
        expect(sanitizeInput("123.456", 2)).toBe("123.45");
    });

    test("Allows full decimal places up to the 'decimals' limit", () => {
        expect(sanitizeInput("1.234567", 6)).toBe("1.234567");
    });

    test("Truncates extra decimals", () => {
        expect(sanitizeInput("1.234567", 2)).toBe("1.23");
    });

    test("Removes leading zero from the number", () => {
        expect(sanitizeInput("05", 2)).toBe("5");
    });

    test("Preserves 0.x", () => {
        expect(sanitizeInput("0.5", 2)).toBe("0.5");
    });

    test("Converts 00.x to 0.x", () => {
        expect(sanitizeInput("00.25", 2)).toBe("0.25");
    });

    test("Returns an empty string for invalid input", () => {
        expect(sanitizeInput("abc", 2)).toBe("");
    });

    test("Accepts a number with a decimal point but no decimals", () => {
        expect(sanitizeInput("12.", 2)).toBe("12.");
    });
});
