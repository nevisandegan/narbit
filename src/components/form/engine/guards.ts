export const isValidNumber = (value?: number) => Number.isFinite(value);


export const canDivide = (a?: number, b?: number) =>
  isValidNumber(a) && isValidNumber(b) && b !== 0;
