import { DateTime } from 'luxon';
import type { CnbRate, ExchangeRatesDataSerializable } from './types';
import { RateLineSchema } from './schema';

const CNB_RESOURCE_ADDRESS =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

const CNB_DATA_SEPARATOR = '|';

async function fetchExchangeRates(): Promise<string> {
  const response = await fetch(CNB_RESOURCE_ADDRESS);

  if (!response.ok) {
    throw new Error(`CNB API Error: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

function parseExchangeRateData(raw: string): ExchangeRatesDataSerializable {
  const lines = raw.trim().split(/\r?\n/);

  if (lines.length < 3) {
    throw new Error('Invalid data format');
  }

  const dateLine = lines[0];
  const matchDateRegex = /^(\d{1,2}\s+\w+\s+\d{4})/;
  const dateMatch = dateLine.match(matchDateRegex);

  if (!dateMatch) {
    throw new Error('Invalid date format');
  }

  const dt = DateTime.fromFormat(dateMatch[1], 'd LLL yyyy');
  if (!dt.isValid) throw new Error('Invalid date string in header');

  const rates: CnbRate[] = [];

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(CNB_DATA_SEPARATOR);

    const result = RateLineSchema.safeParse(parts);

    if (!result.success) {
      // log parsing error to sentry or other channel to notify devs. This will be of type z.ZodError<[string, string, number, string, number]>
      continue;
    }

    const [country, currency, amount, code, rate] = result.data;

    rates.push({
      country,
      currency,
      amount,
      code,
      rate,
      ratePerUnit: rate / amount,
    });
  }

  return {
    dateIso: dt.toISODate(),
    rates,
  }
}

export { fetchExchangeRates, parseExchangeRateData };
