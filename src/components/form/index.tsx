// components/OrderForm.tsx
import React from "react";
import { calculateFee } from "./engine/fee";
import { calculateReceive } from "./engine/receive";
import { useOrderForm } from "./order-form/useOrderForm";
import { DECIMALS, FEE_RATE, MOCK_BALANCE } from "./order-form/config";


const OrderForm: React.FC = () => {
  const { form, side, setSide, applyIntent, applySlider, sliderPercent } = useOrderForm();
  const { register, handleSubmit, getValues } = form;

  const onSubmit = (data: any) => {
    console.log("Submitting order:", data);
  };

  const values = getValues();
  const fee = calculateFee(side, values.amount, values.total);
  const receive = calculateReceive(side, values.amount, values.total);

  const sufficientBalance =
    side === "BUY"
      ? (values.total ?? 0) <= MOCK_BALANCE.USDT
      : (values.amount ?? 0) <= MOCK_BALANCE.BTC;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
      {/* ===== Order Side Toggle ===== */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setSide("BUY")}
          className={`px-4 py-2 cursor-pointer rounded-xl ${
            side === "BUY" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          خرید
        </button>
        <button
          type="button"
          onClick={() => setSide("SELL")}
          className={`px-4 py-2 cursor-pointer rounded-xl ${
            side === "SELL" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          فروش
        </button>
      </div>

      {/* ===== Inputs ===== */}
      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="price" className="block font-semibold">قیمت واحد</label>
          <input
            id="price"
            type="text"
            placeholder="قیمت واحد را وارد کنید"
            {...register("price", {
              onChange: (e) => {
                // decimal guard برای USDT
                const value = e.target.value;
                const regex = new RegExp(`^(\\d+)(\\.\\d{0,${DECIMALS.USDT}})?`);
                const match = value.match(regex);
                e.target.value = match ? match[0] : "";
                applyIntent("price");
              },
            })}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block font-semibold">مقدار</label>
          <input
            id="amount"
            type="text"
            placeholder="مقدار را وارد کنید"
            {...register("amount", {
              onChange: (e) => {
                // decimal guard برای BTC
                const value = e.target.value;
                const regex = new RegExp(`^(\\d+)(\\.\\d{0,${DECIMALS.BTC}})?`);
                const match = value.match(regex);
                e.target.value = match ? match[0] : "";
                applyIntent("amount");
              },
            })}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* ===== Slider ===== */}
        <div className="my-3">
          <input
            type="range"
            min={0}
            max={100}
            value={sliderPercent}
            onChange={(e) => applySlider(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right">{sliderPercent}%</div>
        </div>

        <div>
          <label htmlFor="total" className="block font-semibold">مبلغ کل سفارش</label>
          <input
            id="total"
            type="text"
            placeholder="مبلغ کل سفارش"
            {...register("total", {
              onChange: (e) => {
                const value = e.target.value;
                const regex = new RegExp(`^(\\d+)(\\.\\d{0,${DECIMALS.USDT}})?`);
                const match = value.match(regex);
                e.target.value = match ? match[0] : "";
                applyIntent("total");
              },
            })}
            className="border p-2 w-full rounded"
          />
        </div>
      </div>

    
      <div className="mt-2 p-2 bg-gray-50 rounded space-y-1">
        <p>
          کارمزد ({FEE_RATE * 100}%):{" "}
          <span className="font-semibold text-red-500">
            {fee.toFixed(side === "BUY" ? DECIMALS.BTC : DECIMALS.USDT)} {side === "BUY" ? "BTC" : "USDT"}
          </span>
        </p>
        <p>
          دریافتی شما:{" "}
          <span className="font-semibold text-green-600">
            {receive.toFixed(side === "BUY" ? DECIMALS.BTC : DECIMALS.USDT)} {side === "BUY" ? "BTC" : "USDT"}
          </span>
        </p>
        {!sufficientBalance && (
          <p className="text-red-500">موجودی کافی نیست!</p>
        )}
      </div>

    
      <button
        type="submit"
        disabled={!sufficientBalance}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 disabled:bg-gray-300"
      >
        {side === "BUY" ? "خرید بیت کوین" : "فروش بیت کوین"}
      </button>
    </form>
  );
};

export default OrderForm;
