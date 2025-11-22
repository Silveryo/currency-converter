import useExchangeRatesQuery from '../hooks/useExchangeRatesQuery';
import ListArea from '../components/list-area';
import PageLayout from '../components/layout';
import Card from '../components/card';
import ConverterArea from '../components/converter-area';
import { useState } from 'react';
import InputGroup from '../components/input-group';
import ResultBox from '../components/result-box';

function ExchangeComposition() {
  const { data, isSuccess } = useExchangeRatesQuery();

  const [conversionAmount, setConversionAmount] = useState<string>('1000');
  const [targetCode, setTargetCode] = useState<string>('EUR');

  // can also create an error component if we expect some network issue.
  if (!isSuccess || !data) return <div>Loading rates...</div>;

  const conversionResult = 0;
  //   const conversionResult = !isNaN(conversionAmount) ? convert

  return (
    <PageLayout>
      <ListArea>
        <h2>Exchange Rates</h2>
        <p>Valid for: {data?.date.toFormat('dd MM yyyy')}</p>
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
            <label></label>
            <input></input>
          </InputGroup>
          <InputGroup>
            <label></label>
            <select></select>
          </InputGroup>

          {conversionResult !== null && <ResultBox></ResultBox>}
        </Card>
      </ConverterArea>
    </PageLayout>
  );
}

export default ExchangeComposition;
