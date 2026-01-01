import React from "react";
import { Controller } from "react-hook-form";
import { calculateFee } from "./engine/fee";
import { calculateReceive } from "./engine/receive";
import { useOrderForm } from "./order-form/useOrderForm";
import { DECIMALS, FEE_RATE, MOCK_BALANCE } from "./order-form/config";
import { checkBalance } from "./engine/balance";
import { useWatch } from "react-hook-form";
import { sanitizeInput } from "../../utils/sanitize-input";

const OrderForm: React.FC = () => {
  const { form, side, setSide, applyIntent } = useOrderForm();
  const { control, handleSubmit, formState } = form;

  const onSubmit = (data: any) => {
    console.log("submit:", data);
  };

  const priceError = formState.errors.price;
  const amountError = formState.errors.amount;
  const totalError = formState.errors.total;

  const amount = useWatch({ control, name: "amount" }) || 0;
  const total = useWatch({ control, name: "total" }) || 0;
  const slider = useWatch({ control, name: "slider" }) || 0;

  const fee = calculateFee(side, +amount, +total);
  const receive = calculateReceive(side, +amount, +total);

  const sufficientBalance = checkBalance(side, amount, total);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
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

      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="price" className="block font-semibold">
            قیمت واحد
          </label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="قیمت واحد را وارد کنید"
                onChange={(e) => {
                  let value = e.target.value;
                  value = sanitizeInput(value, DECIMALS.USDT);
                  e.target.value = value;
                  field.onChange(value);
                  applyIntent("price");
                }}
                className="border p-2 w-full rounded"
              />
            )}
          />
          <p className="text-red-600 text-[.75rem]">
            {priceError && priceError.message}
          </p>
        </div>

        <div>
          <label htmlFor="amount" className="block font-semibold">
            مقدار
          </label>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="مقدار را وارد کنید"
                onChange={(e) => {
                  let value = e.target.value;
                  value = sanitizeInput(value, DECIMALS.BTC);
                  e.target.value = value;
                  field.onChange(value);
                  applyIntent("amount");
                }}
                className="border p-2 w-full rounded"
              />
            )}
          />
          <p className="text-red-600 text-[.75rem]">
            {amountError && amountError.message}
          </p>
        </div>

        <div className="my-3">
          <Controller
            name="slider"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="range"
                min={0}
                max={100}
                value={slider}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  field.onChange(value);
                  applyIntent("slider");
                }}
                className="w-full"
              />
            )}
          />
          <div className="text-right">{slider}%</div>
        </div>

        <div>
          <label htmlFor="total" className="block font-semibold">
            مبلغ کل سفارش
          </label>
          <Controller
            name="total"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="مبلغ کل سفارش"
                onChange={(e) => {
                  let value = e.target.value;
                  value = sanitizeInput(value, DECIMALS.USDT);
                  e.target.value = value;
                  field.onChange(value);
                  applyIntent("total");
                }}
                className="border p-2 w-full rounded"
              />
            )}
          />
          <p className="text-red-600 text-[.75rem]">
            {totalError && totalError.message}
          </p>
        </div>
      </div>

      <div className="mt-2 p-2 bg-gray-50 rounded space-y-1">
        <p>
          موجودی:{" "}
          <span className="font-semibold text-gray-500">
            {side === "SELL"
              ? `BTC ${MOCK_BALANCE.BTC}`
              : `USDT ${MOCK_BALANCE.USDT}`}
          </span>
        </p>
        <p>
          کارمزد ({FEE_RATE * 100}%):{" "}
          <span className="font-semibold text-red-500">
            {fee.toFixed(side === "BUY" ? DECIMALS.BTC : DECIMALS.USDT)}{" "}
            {side === "BUY" ? "BTC" : "USDT"}
          </span>
        </p>
        <p>
          دریافتی شما:
          <span className="font-semibold text-green-600">
            {receive.toFixed(side === "BUY" ? DECIMALS.BTC : DECIMALS.USDT)}{" "}
            {side === "BUY" ? "BTC" : "USDT"}
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
