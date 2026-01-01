import { calculateAmount, calculatePrice, calculateTotal } from "../components/form/engine/formulas";


describe('Trading Calculations', () => {
    const PRICE = 50000;
    const AMOUNT = 0.02;
    const TOTAL = 1000;

    describe('calculateTotal', () => {
        it('should correctly calculate total from price and amount', () => {
            expect(calculateTotal(PRICE, AMOUNT)).toBe(TOTAL);
            expect(calculateTotal(60000, 0.1)).toBe(6000);
            expect(calculateTotal(12345.67, 0.005)).toBeCloseTo(61.72835, 5);
        });

        it('should handle zero and negative values', () => {
            expect(calculateTotal(PRICE, 0)).toBe(0);
            expect(calculateTotal(0, AMOUNT)).toBe(0);
            expect(calculateTotal(-PRICE, AMOUNT)).toBe(-TOTAL);
        });
    });

    describe('calculateAmount', () => {
        it('should correctly calculate amount from total and price', () => {
            expect(calculateAmount(TOTAL, PRICE)).toBe(AMOUNT);
            expect(calculateAmount(6000, 60000)).toBe(0.1);
            expect(calculateAmount(61.72835, 12345.67)).toBeCloseTo(0.005, 6);
        });

        it('should handle edge cases', () => {
            expect(calculateAmount(0, PRICE)).toBe(0);
            expect(calculateAmount(TOTAL, 0)).toBe(Infinity);
            expect(() => calculateAmount(TOTAL, 0)).not.toThrow();
        });

        it('should handle negative values', () => {
            expect(calculateAmount(-TOTAL, PRICE)).toBe(-AMOUNT);
        });
    });

    describe('calculatePrice', () => {
        it('should correctly calculate price from total and amount', () => {
            expect(calculatePrice(TOTAL, AMOUNT)).toBe(PRICE);
            expect(calculatePrice(6000, 0.1)).toBe(60000);
            expect(calculatePrice(61.72835, 0.005)).toBeCloseTo(12345.67, 2);
        });

        it('should handle edge cases', () => {
            expect(calculatePrice(0, AMOUNT)).toBe(0);
            expect(calculatePrice(TOTAL, 0)).toBe(Infinity);
            expect(calculatePrice(-TOTAL, AMOUNT)).toBe(-PRICE);
        });
    });

    it('should maintain mathematical consistency across all functions', () => {
        const total = calculateTotal(PRICE, AMOUNT);
        const amountBack = calculateAmount(total, PRICE);
        const priceBack = calculatePrice(total, AMOUNT);

        expect(amountBack).toBeCloseTo(AMOUNT, 10);
        expect(priceBack).toBeCloseTo(PRICE, 10);
    });
});