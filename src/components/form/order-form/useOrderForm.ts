import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { calculateNextValues } from "../engine/calculate-next";
import type { Field, OrderSide, OrderValues } from "../types/types";
import { validation, defaultValues } from "./schema";

export function useOrderForm() {
  const form = useForm<OrderValues>({
    mode: "onSubmit",
    resolver: yupResolver(validation),
    defaultValues,
  });

  const { setValue, getValues } = form;

  const [side, setSide] = useState<OrderSide>("BUY");
  const [lastUpdatedField, setLastUpdatedField] = useState<
    Field | "slider" | null
  >(null);

  const applyIntent = useCallback(
    (field: Field | "slider") => {
      setLastUpdatedField(field);

      const values = getValues();

      const next = calculateNextValues(values, {
        side,
        lastUpdatedField: field,
        sliderPercent: field === "slider" ? values.slider : undefined,
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

  return {
    form,
    side,
    setSide,
    applyIntent,
  };
}
