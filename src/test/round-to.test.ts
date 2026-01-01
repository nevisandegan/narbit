import { roundTo } from "../components/form/engine/round-to";

describe('roundTo', () => {
    it('should correctly round to specified decimal places', () => {
        expect(roundTo(123.45678, 2)).toBe(123.46);
        expect(roundTo(123.453, 2)).toBe(123.45);
        expect(roundTo(123.455, 2)).toBe(123.46);
        expect(roundTo(99.995, 2)).toBe(100.00);
    });

    it('should handle rounding at exactly 0.5 correctly (round half away from zero)', () => {
        expect(roundTo(1.225, 2)).toBe(1.23);
        expect(roundTo(1.224, 2)).toBe(1.22);
        expect(roundTo(-1.225, 2)).toBe(-1.23);
        expect(roundTo(-1.224, 2)).toBe(-1.22);
    });

    it('should work with zero and negative decimals', () => {
        expect(roundTo(123.456, 0)).toBe(123);
        expect(roundTo(123.567, 0)).toBe(124);
        expect(roundTo(123.456, 1)).toBe(123.5);
    });

    it('should handle edge cases and special numbers', () => {
        expect(roundTo(0, 5)).toBe(0);
        expect(roundTo(NaN, 2)).toBe(NaN);
        expect(roundTo(Infinity, 2)).toBe(Infinity);
        expect(roundTo(-Infinity, 2)).toBe(-Infinity);
    });

    it('should avoid floating-point precision issues', () => {
        expect(roundTo(5.675, 2)).toBe(5.68);
        expect(roundTo(2.675, 2)).toBe(2.68);

        expect(roundTo(0.1 + 0.2, 1)).toBe(0.3);
    });

    it('should work with large numbers and high decimal places', () => {
        expect(roundTo(123456.789123456, 4)).toBe(123456.7891);
        expect(roundTo(123456.789123456, 6)).toBe(123456.789123);
    });
});