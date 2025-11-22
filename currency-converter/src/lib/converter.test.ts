import { describe, it, expect } from 'vitest';
import { convertCzkToForeign } from './converter';
import type { CnbRate } from './types';

const MOCK_RATES: CnbRate[] = [
    {
        country: "EMU",
        currency: "euro",
        amount: 1,
        code: "EUR",
        rate: 25,
        ratePerUnit: 25
    },
    {
        country: "Hungary",
        currency: "forint",
        amount: 100,
        code: "HUF",
        rate: 6.5,
        ratePerUnit: 0.065
    },
] as const;

describe("Converter logic", () => {
    it("converts CZK to EUR 1:1", () => {
        const result = convertCzkToForeign(2500, "EUR", MOCK_RATES);
        expect(result).toBe(2500 / 25);
    });

    it("converts CZK to HUF 1:100", () => {
        const result = convertCzkToForeign(6500, "HUF", MOCK_RATES);
        expect(result).toBe(6500 / 0.065);
    });

    it("returns 0 for 0 input", () => {
        const result = convertCzkToForeign(0, "EUR", MOCK_RATES);
        expect(result).toBe(0);
    });

    it("returns null for negative input", () => {
        const result = convertCzkToForeign(-100, "EUR", MOCK_RATES);
        expect(result).toBeNull();
    });

    it("returns null for unknown currency code", () => {
        const result = convertCzkToForeign(1000, "USD", MOCK_RATES);
        expect(result).toBeNull();
    });
});