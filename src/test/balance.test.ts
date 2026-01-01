import { checkBalance } from "../components/form/engine/balance";
import { MOCK_BALANCE } from "../components/form/order-form/config";

describe('checkBalance', () => {
    const originalBalance = { ...MOCK_BALANCE };

    afterEach(() => {
        Object.assign(MOCK_BALANCE, originalBalance);
    });

    describe('BUY side', () => {
        it('should allow buy when total is less than or equal to USDT balance', () => {
            expect(checkBalance("BUY", undefined, 100)).toBe(true);
            expect(checkBalance("BUY", undefined, 50)).toBe(true);
            expect(checkBalance("BUY", undefined, 0)).toBe(true);
        });

        it('should reject buy when total exceeds USDT balance', () => {
            expect(checkBalance("BUY", undefined, 101)).toBe(false);
            expect(checkBalance("BUY", undefined, 999)).toBe(false);
        });

        it('should treat undefined total as 0', () => {
            expect(checkBalance("BUY", undefined, undefined)).toBe(true);
            expect(checkBalance("BUY")).toBe(true);
        });
    });

    describe('SELL side', () => {
        it('should allow sell when amount is less than or equal to BTC balance', () => {
            expect(checkBalance("SELL", 1)).toBe(true);
            expect(checkBalance("SELL", 0.5)).toBe(true);
            expect(checkBalance("SELL", 0)).toBe(true);
        });

        it('should reject sell when amount exceeds BTC balance', () => {
            expect(checkBalance("SELL", 1.01)).toBe(false);
            expect(checkBalance("SELL", 10)).toBe(false);
        });

        it('should treat undefined amount as 0', () => {
            expect(checkBalance("SELL", undefined)).toBe(true);
            expect(checkBalance("SELL")).toBe(true);
        });
    });

    describe('edge cases and safety', () => {
        it('should return true for unknown side (defensive behavior)', () => {
            expect(checkBalance("TRADE" as any)).toBe(true);
            expect(checkBalance(null as any)).toBe(true);
        });

        it('should handle negative values safely (should reject)', () => {
            expect(checkBalance("BUY", undefined, -50)).toBe(true);
            expect(checkBalance("SELL", -1)).toBe(true);
        });
    });
});