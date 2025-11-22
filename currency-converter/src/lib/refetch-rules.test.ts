import { describe, it, expect } from 'vitest';
import { DateTime } from 'luxon';
import { shouldRefetch } from './refetch-rules';

const ZONE = 'Europe/Prague';

describe('shouldRefetch based on storage content', () => {
  it('returns true if no data', () => {
    expect(shouldRefetch(undefined)).toBe(true);
  });

  it('returns false before cutoff (Morning), even if data is from yesterday', () => {
    const now = DateTime.fromISO('2025-11-22T10:00:00', { zone: ZONE });

    const dataDate = '2025-11-21';

    expect(shouldRefetch(dataDate, now)).toBe(false);
  });

  it('returns true after cutoff, if data is yesterday', () => {
    const now = DateTime.fromISO('2025-11-22T16:00:00', { zone: ZONE });

    const dataDate = '2025-11-21';

    expect(shouldRefetch(dataDate, now)).toBe(true);
  });

  it('returns false after cutoff, if data is today', () => {
    const now = DateTime.fromISO('2025-11-22T16:00:00', { zone: ZONE });

    const dataDate = '2025-11-22';

    expect(shouldRefetch(dataDate, now)).toBe(false);
  });
});
