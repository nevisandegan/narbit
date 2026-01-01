import { calculateFee } from "../components/form/engine/fee";
import { calculateReceive } from "../components/form/engine/receive";

jest.mock('../components/form/engine/fee.ts', () => ({
    calculateFee: jest.fn(),
    FEE_RATE: 0.015,
}));

const mockedCalculateFee = calculateFee as jest.MockedFunction<typeof calculateFee>;

describe('calculateReceive', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('BUY side', () => {
        it('should return net BTC received after deducting fee', () => {
            mockedCalculateFee.mockReturnValue(0.0015);

            expect(calculateReceive("BUY", 0.1)).toBeCloseTo(0.0985, 6);
            expect(mockedCalculateFee).toHaveBeenCalledWith("BUY", 0.1, undefined);
        });



        it('should correctly handle various amounts', () => {
            mockedCalculateFee.mockImplementation((_, amount) =>
                typeof amount === 'number' ? amount * 0.015 : 0
            );

            expect(calculateReceive("BUY", 1)).toBeCloseTo(0.985, 6);
            expect(calculateReceive("BUY", 0.5)).toBeCloseTo(0.4925, 6);
            expect(calculateReceive("BUY", 0)).toBe(0);
        });
    });

    describe('SELL side', () => {
        it('should return net USDT received after deducting fee', () => {
            mockedCalculateFee.mockReturnValue(15);

            expect(calculateReceive("SELL", undefined, 1000)).toBe(985);
            expect(mockedCalculateFee).toHaveBeenCalledWith("SELL", undefined, 1000);
        });

        it('should return 0 when total is undefined or invalid', () => {
            expect(calculateReceive("SELL")).toBe(0);
            expect(calculateReceive("SELL", undefined, undefined)).toBe(0);
        });

        it('should correctly handle various totals', () => {
            mockedCalculateFee.mockImplementation((_, __, total) =>
                typeof total === 'number' ? total * 0.015 : 0
            );

            expect(calculateReceive("SELL", undefined, 5000)).toBe(4925);
            expect(calculateReceive("SELL", undefined, 100)).toBeCloseTo(98.5, 6);
            expect(calculateReceive("SELL", undefined, 0)).toBe(0);
        });
    });

    describe('edge cases', () => {
        it('should return 0 for unknown side', () => {
            expect(calculateReceive("HOLD" as any)).toBe(0);
        });


    });
});