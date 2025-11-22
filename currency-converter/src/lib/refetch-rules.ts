import { DateTime } from 'luxon';

function shouldRefetch(
  cachedDateIso: string | undefined | null,
  now: DateTime = DateTime.now(),
): boolean {
  // no data -> refetch
  if (!cachedDateIso) return true;

  // let's assume prague zone, docs aren't clear.
  const pragueZone = 'Europe/Prague';
  const current = now.setZone(pragueZone);

  const dataDate = DateTime.fromISO(cachedDateIso, { zone: pragueZone });

  const cutoff = current.set({
    hour: 15,
    minute: 30,
    second: 0,
    millisecond: 0,
  });

  if (current >= cutoff) {
    if (!dataDate.hasSame(current, 'day')) {
      return true;
    }
  }

  return false;
}

export { shouldRefetch };
