import { calculateNextValues } from "../components/form/engine/calculate-next";
import { MOCK_BALANCE } from "../components/form/order-form/config";
import { EngineContext, OrderValues } from "../components/form/types/types";



describe("calculateNextValues", () => {


    test("BUY: when price changes, total is recalculated", () => {
        const values: Partial<OrderValues> = {
            price: 40_000,
            amount: 0.02,
        };

        const context: EngineContext = {
            lastUpdatedField: "price",
            side: "BUY",
        };

        const result = calculateNextValues(values, context);

        expect(result.total).toBe(800);
    });

    test("BUY: when amount changes, total is recalculated", () => {
        const values: Partial<OrderValues> = {
            amount: 0.01,
            price: 50_000,
        };

        const context: EngineContext = {
            lastUpdatedField: "amount",
            side: "BUY",
        };

        const result = calculateNextValues(values, context);

        expect(result.total).toBe(500);
    });

    test("BUY: slider updates total and amount", () => {
        const values: Partial<OrderValues> = {
            price: 50_000,
        };

        const context: EngineContext = {
            lastUpdatedField: "slider",
            side: "BUY",
            sliderPercent: 50,
        };

        const result = calculateNextValues(values, context);

        const expectedTotal = MOCK_BALANCE.USDT * 0.5;
        const expectedAmount = expectedTotal / 50_000;

        expect(result.total).toBe(expectedTotal);
        expect(result.amount).toBe(expectedAmount);
    });


    test("BUY: exceeding balance resets slider to 0", () => {
        const values: Partial<OrderValues> = {
            total: MOCK_BALANCE.USDT + 1,
            price: 50_000,
        };

        const context: EngineContext = {
            lastUpdatedField: "total",
            side: "BUY",
        };

        const result = calculateNextValues(values, context);

        expect(result.slider).toBe(0);
    });

    /* =========================
       SELL SIDE
       ========================= */

    test("SELL: when amount changes, total and slider are calculated", () => {
        const values: Partial<OrderValues> = {
            amount: 0.5,
            price: 40_000,
        };

        const context: EngineContext = {
            lastUpdatedField: "amount",
            side: "SELL",
        };

        const result = calculateNextValues(values, context);

        expect(result.total).toBe(20_000);
        expect(result.slider).toBe(
            Math.round((0.5 / MOCK_BALANCE.BTC) * 100)
        );
    });

    test("SELL: slider updates amount and total", () => {
        const values: Partial<OrderValues> = {
            price: 30_000,
        };

        const context: EngineContext = {
            lastUpdatedField: "slider",
            side: "SELL",
            sliderPercent: 25,
        };

        const result = calculateNextValues(values, context);

        expect(result.amount).toBe(MOCK_BALANCE.BTC * 0.25);
        expect(result.total).toBe(result.amount! * 30_000);
    });

    test("SELL: exceeding BTC balance resets slider to 0", () => {
        const values: Partial<OrderValues> = {
            amount: MOCK_BALANCE.BTC + 0.01,
            price: 30_000,
        };

        const context: EngineContext = {
            lastUpdatedField: "amount",
            side: "SELL",
        };

        const result = calculateNextValues(values, context);

        expect(result.slider).toBe(0);
    });
});
