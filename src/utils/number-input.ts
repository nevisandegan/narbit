// utils/input/number-input.ts
export function sanitizeInput(value: string, decimals: number): string {
    const regex = new RegExp(`^(0{0,1}\\d+)(\\.\\d{0,${decimals}})?`);
    const match = value.match(regex);

    if (match) {
        value = match[0];
    }

    if (value.startsWith("0") && !value.startsWith("0.") && value.length > 1) {
        value = value.slice(1);
    }

    return value;
}
