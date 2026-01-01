import toFaPercent from "../utils/to-fa-number";

describe('toFaPercent', () => {
    it('should format positive integers correctly with Persian digits and percent sign', () => {
        expect(toFaPercent(0)).toBe('۰٪');
        expect(toFaPercent(5)).toBe('۵٪');
        expect(toFaPercent(42)).toBe('۴۲٪');
        expect(toFaPercent(100)).toBe('۱۰۰٪');
    });

    it('should format large numbers with thousands separators in Persian', () => {
        expect(toFaPercent(1234)).toBe('۱٬۲۳۴٪');
        expect(toFaPercent(9876543)).toBe('۹٬۸۷۶٬۵۴۳٪');
    });

    it('should work with zero correctly', () => {
        expect(toFaPercent(0)).toBe('۰٪');
    });

});