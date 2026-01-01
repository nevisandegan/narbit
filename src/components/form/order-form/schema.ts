import * as yup from "yup";
import { DECIMALS } from "./config";
import type { OrderValues } from "../engine/types";

export const defaultValues = {
    price: undefined,
    amount: undefined,
    total: undefined,
    slider: 0
} as unknown as OrderValues;


export const validation = yup.object({
    price: yup
        .number()
        .transform((value, originalValue) => {
            const num = Number(originalValue);
            return isNaN(num) ? undefined : num;
        })
        .required("قیمت الزامی است")
        .min(87510.22, "حداقل قیمت ۸۷,۵۱۰.۲۲")
        .max(88373.72, "حداکثر قیمت ۸۸,۳۷۳.۷۲")
        .test(
            "decimals",
            `حداکثر ${DECIMALS.USDT} رقم اعشار مجاز است`,
            (value) => {
                if (value === undefined) return true;
                const decimals = value.toString().split(".")[1];
                return !decimals || decimals.length <= DECIMALS.USDT;
            }
        ),

    amount: yup
        .number()
        .transform((value, originalValue) => {
            const num = Number(originalValue);
            return isNaN(num) ? undefined : num;
        })
        .required("مقدار الزامی است")
        .min(0.000001, "حداقل مقدار ۰.۰۰۰۰۰۱")
        .max(10, "حداکثر مقدار ۱۰")
        .test(
            "decimals",
            `حداکثر ${DECIMALS.BTC} رقم اعشار مجاز است`,
            (value) => {
                if (value === undefined) return true;
                const decimals = value.toString().split(".")[1];
                return !decimals || decimals.length <= DECIMALS.BTC;
            }
        ),

    total: yup
        .number()
        .transform((_, originalValue) => {
            const num = Number(originalValue);
            return isNaN(num) ? undefined : num;
        })
        .required("مبلغ کل الزامی است")
        .min(0, "مبلغ باید مثبت باشد")
        .test(
            "decimals",
            `حداکثر ${DECIMALS.USDT} رقم اعشار مجاز است`,
            (value) => {
                if (value === undefined) return true;
                const decimals = value.toString().split(".")[1];
                return !decimals || decimals.length <= DECIMALS.USDT;
            }
        ),
});
