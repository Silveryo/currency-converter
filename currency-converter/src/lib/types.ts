import type { DateTime } from 'luxon';

type CnbRate = {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
  ratePerUnit: number;
};

type ExchangeRatesData = {
  date: DateTime;
  rates: CnbRate[];
};

type ExchangeRatesDataSerializable = {
    dateIso: string;
    rates: CnbRate[];
};

export type { CnbRate, ExchangeRatesData, ExchangeRatesDataSerializable};
