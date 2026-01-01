import { calculateFee } from "../components/form/engine/fee";
import { FEE_RATE } from "../components/form/order-form/config";

describe('calculateFee', () => {
    const expectedFee = (value: number) => value * FEE_RATE;

    describe('BUY side', () => {
        it('should calculate fee correctly based on received amount (BTC)', () => {
            expect(calculateFee("BUY", 1)).toBeCloseTo(expectedFee(1), 10);
            expect(calculateFee("BUY", 0.5)).toBeCloseTo(expectedFee(0.5), 10);
            expect(calculateFee("BUY", 0.123456)).toBeCloseTo(expectedFee(0.123456), 10);
        });

        it('should return 0 when amount is undefined or not a number', () => {
            expect(calculateFee("BUY")).toBe(0);
            expect(calculateFee("BUY", undefined)).toBe(0);
            expect(calculateFee("BUY", "100" as any)).toBe(0);
        });

        it('should handle zero and negative amounts gracefully', () => {
            expect(calculateFee("BUY", 0)).toBe(0);
            expect(calculateFee("BUY", -1)).toBeCloseTo(expectedFee(-1), 10);
        });
    });

    describe('SELL side', () => {
        it('should calculate fee correctly based on received total (USDT)', () => {
            expect(calculateFee("SELL", undefined, 1000)).toBeCloseTo(expectedFee(1000), 10);
            expect(calculateFee("SELL", undefined, 500.5)).toBeCloseTo(expectedFee(500.5), 10);
            expect(calculateFee("SELL", undefined, 12345.67)).toBeCloseTo(expectedFee(12345.67), 10);
        });

        it('should return 0 when total is undefined or not a number', () => {
            expect(calculateFee("SELL")).toBe(0);
            expect(calculateFee("SELL", undefined, undefined)).toBe(0);
            expect(calculateFee("SELL", undefined, null as any)).toBe(0);
        });

        it('should handle zero and negative totals', () => {
            expect(calculateFee("SELL", undefined, 0)).toBe(0);
            expect(calculateFee("SELL", undefined, -200)).toBeCloseTo(expectedFee(-200), 10);
        });
    });

    describe('edge cases', () => {
        it('should return 0 for unknown side', () => {
            expect(calculateFee("TRADE" as any)).toBe(0);
            expect(calculateFee(null as any)).toBe(0);
        });

        it('should consistently use the defined FEE_RATE', () => {
            expect(FEE_RATE).toBe(0.015);
            expect(calculateFee("BUY", 100)).toBe(1.5);
            expect(calculateFee("SELL", undefined, 10000)).toBe(150);
        });
    });
});