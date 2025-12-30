import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { calculateNextValues } from "../engine/calculate-next";
import type { OrderSide, Field, OrderValues } from "../engine/types";

export function useOrderForm() {
  const form = useForm<OrderValues>({
    mode: "onChange",
    defaultValues: {
      price: undefined,
      amount: undefined,
      total: undefined,
    },
  });

  const { setValue, getValues } = form;

  const [side, setSide] = useState<OrderSide>("BUY");
  const [lastUpdatedField, setLastUpdatedField] = useState<
    Field | "slider" | null
  >(null);
  const [sliderPercent, setSliderPercent] = useState<number>(0);

  const applyIntent = useCallback(
    (field: Field | "slider") => {
      setLastUpdatedField(field);

      const values = getValues();

      const next = calculateNextValues(values, {
        side,
        lastUpdatedField: field,
      });

      (Object.entries(next) as [Field, number][]).forEach(([key, value]) => {
        setValue(key, value, {
          shouldDirty: true,
          shouldTouch: false,
          shouldValidate: false,
        });
      });
    },
    [getValues, setValue, side]
  );

  const applySlider = useCallback(
    (percent: number) => {
      setSliderPercent(percent);
      setLastUpdatedField("slider");

      const values = getValues();

      if (side === "BUY") {
        const maxTotal = 100;
        const total = (percent / 100) * maxTotal;
        setValue("total", total, { shouldDirty: true });
        applyIntent("slider");
      }

      if (side === "SELL") {
        const maxAmount = 1;
        const amount = (percent / 100) * maxAmount;
        setValue("amount", amount, { shouldDirty: true });
        applyIntent("slider");
      }
    },
    [applyIntent, getValues, setValue, side]
  );

  return {
    form,
    side,
    setSide,
    applyIntent,
    sliderPercent,
    applySlider
  };
}
