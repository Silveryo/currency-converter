import z from 'zod';

const RateLineSchema = z.tuple([
  z.string(),
  z.string(),
  z.string().transform(v => Number(v)),
  z.string(),
  z.string().transform(v => Number(v)),
]);

export { RateLineSchema };
