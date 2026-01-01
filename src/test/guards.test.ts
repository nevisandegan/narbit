import { canDivide, isValidNumber } from "../components/form/engine/guards";

describe('Number Validation Utilities', () => {
    describe('isValidNumber', () => {
        it('should return true for finite numbers', () => {
            expect(isValidNumber(0)).toBe(true);
            expect(isValidNumber(42)).toBe(true);
            expect(isValidNumber(-100)).toBe(true);
            expect(isValidNumber(3.14159)).toBe(true);
            expect(isValidNumber(-0.0001)).toBe(true);
        });

        it('should return false for non-finite numbers', () => {
            expect(isValidNumber(NaN)).toBe(false);
            expect(isValidNumber(Infinity)).toBe(false);
            expect(isValidNumber(-Infinity)).toBe(false);
        });

        it('should return false for non-number or undefined values', () => {
            expect(isValidNumber(undefined)).toBe(false);
            expect(isValidNumber(null as any)).toBe(false);
            expect(isValidNumber('123' as any)).toBe(false);
            expect(isValidNumber({} as any)).toBe(false);
            expect(isValidNumber([] as any)).toBe(false);
        });
    });

    describe('canDivide', () => {
        it('should return true when both numbers are valid and divisor is not zero', () => {
            expect(canDivide(10, 2)).toBe(true);
            expect(canDivide(0, 5)).toBe(true);
            expect(canDivide(-10, -2)).toBe(true);
            expect(canDivide(100.5, 3)).toBe(true);
        });

        it('should return false when divisor is zero', () => {
            expect(canDivide(10, 0)).toBe(false);
            expect(canDivide(0, 0)).toBe(false);
            expect(canDivide(-5, 0)).toBe(false);
        });

        it('should return false when either operand is not a valid finite number', () => {
            expect(canDivide(NaN, 5)).toBe(false);
            expect(canDivide(10, NaN)).toBe(false);
            expect(canDivide(Infinity, 5)).toBe(false);
            expect(canDivide(10, Infinity)).toBe(false);
            expect(canDivide(undefined, 5)).toBe(false);
            expect(canDivide(10, undefined)).toBe(false);
            expect(canDivide(null as any, 5)).toBe(false);
        });

        it('should handle edge cases correctly', () => {
            expect(canDivide(0, 1)).toBe(true);
            expect(canDivide(1, 0.0001)).toBe(true);
            expect(canDivide(-Infinity, 1)).toBe(false);
        });
    });
});