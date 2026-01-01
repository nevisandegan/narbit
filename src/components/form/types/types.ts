export type OrderSide = "BUY" | "SELL";

export type Field = "price" | "amount" | "total";

export interface OrderValues {
  price: number;
  amount: number;
  total: number;
  slider?: number
}

export interface EngineContext {
  side: OrderSide;
  lastUpdatedField: Field | "slider";
  sliderPercent?: number;
}
