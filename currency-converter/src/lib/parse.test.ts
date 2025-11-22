import { describe, it, expect } from 'vitest';
import { parseExchangeRateData } from './cnb-api-connector';

const TEST_DATA = `21 Nov 2025 #226
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|13.565
Brazil|real|1|BRL|3.916
Bulgaria|lev|1|BGN|12.395
Canada|dollar|1|CAD|14.941` as const;

describe('parseExchangeRatesData', () => {
  it('should parse exchange rates data', () => {
    const result = parseExchangeRateData(TEST_DATA);

    expect(result.dateIso).toBe('2025-11-21');

    const aud = result.rates.find(r => r.code === 'AUD');

    expect(aud).toBeDefined();
    expect(aud?.rate).toBe(13.565);

    expect(result.rates.length).toBe(4);
  });

  it('throws on empty or header-only data', () => {
    expect(() => parseExchangeRateData("20 Nov2025 #225\nHeader")).toThrow();
    expect(() => parseExchangeRateData("")).toThrow();
  })
});
