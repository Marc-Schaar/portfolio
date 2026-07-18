export type DeviceTier = 'low' | 'standard';

/**
 * Cheap heuristic, not a benchmark: flags a device as "low" when at least
 * two of three weak signals (touch, few cores, narrow viewport) agree.
 */
export function getDeviceTier(): DeviceTier {
  const signals = [
    window.matchMedia('(pointer: coarse)').matches,
    (navigator.hardwareConcurrency ?? 8) <= 4,
    window.innerWidth < 600,
  ];
  const lowSignals = signals.filter(Boolean).length;
  return lowSignals >= 2 ? 'low' : 'standard';
}
