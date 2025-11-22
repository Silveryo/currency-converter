import useExchangeRatesQuery from '../hooks/useExchangeRatesQuery';
import ListArea from '../components/list-area';
import PageLayout from '../components/layout';
import Card from '../components/card';
import ConverterArea from '../components/converter-area';
import { useState } from 'react';
import InputGroup from '../components/input-group';
import ResultBox from '../components/result-box';
import { convertCzkToForeign, formatCurrency } from '../lib/converter';

function ExchangeComposition() {
  const { data, isSuccess } = useExchangeRatesQuery();

  const [conversionAmount, setConversionAmount] = useState<string>('1000');
  const [targetCode, setTargetCode] = useState<string>('EUR');

  // can also create an error component if we expect some network issue.
  if (!isSuccess || !data) return <div>Loading rates...</div>;

  const conversionResult = !isNaN(parseFloat(conversionAmount))
    ? convertCzkToForeign(Number(conversionAmount), targetCode, data.rates)
    : null;

  return (
    <PageLayout>
      <ListArea>
        <h2>Exchange Rates</h2>
        <p>Valid for: {data?.date.toFormat('dd MMM yyyy')}</p>
        {data.rates.map(rate => (
          <Card key={rate.code}>
            <strong>{rate.code}</strong> {rate.country}
            <div>
              1 {rate.code} = {rate.ratePerUnit.toFixed(3)} CZK
            </div>
          </Card>
        ))}
      </ListArea>

      <ConverterArea>
        <Card>
          <h3>Super fast converter</h3>
          <InputGroup>
            <label htmlFor="czk-amount">Amount (CZK)</label>
            <input
              id="czk-amount"
              name="czk-amount"
              inputMode="decimal"
              type="number"
              value={conversionAmount}
              onChange={e => setConversionAmount(e.target.value)}
            ></input>
          </InputGroup>
          <InputGroup>
            <label htmlFor="currency-select"></label>
            <select
              id="currency-select"
              name="currency-select"
              value={targetCode}
              onChange={e => setTargetCode(e.target.value)}
            >
              {data.rates.map(rate => (
                <option key={rate.code} value={rate.code}>
                  {rate.code} - {rate.currency}
                </option>
              ))}
            </select>
          </InputGroup>

          {conversionResult !== null && (
            <ResultBox>{formatCurrency(conversionResult, targetCode)}</ResultBox>
          )}
        </Card>
      </ConverterArea>
    </PageLayout>
  );
}

export default ExchangeComposition;
