import type { CnbRate } from './types';

function convertCzkToForeign(
  czkAmount: number,
  targetCode: string,
  rates: CnbRate[],
): number | null {
  if (czkAmount < 0) return null;

  const target = rates.find(rate => rate.code === targetCode);

  if (!target) return null;
  if (target.ratePerUnit === 0) return null;

  const foreignAmount = czkAmount / target.ratePerUnit;
  return foreignAmount;
}

function formatCurrency(amount: number, code: string): string {
  return `${amount.toFixed(2)} ${code}`;
}

export { convertCzkToForeign, formatCurrency };
