import { useQuery } from '@tanstack/react-query';
import { fetchExchangeRates, parseExchangeRateData } from '../lib/cnb-api-connector';
import type { ExchangeRatesData, ExchangeRatesDataSerializable } from '../lib/types';
import { DateTime } from 'luxon';

const exchangeRatesQueryKey = ['exchange-rates'] as const;

function useExchangeRatesQuery() {
  return useQuery({
    queryKey: exchangeRatesQueryKey,
    queryFn: async () => {
      const text = await fetchExchangeRates();
      return parseExchangeRateData(text);
    },
    select: (data: ExchangeRatesDataSerializable): ExchangeRatesData => {
      return {
        date: DateTime.fromISO(data.dateIso),
        rates: data.rates,
      };
    },
  });
}

export default useExchangeRatesQuery;
export { exchangeRatesQueryKey };
