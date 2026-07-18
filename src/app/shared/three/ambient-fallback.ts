import { isWebglAvailable } from './webgl-support';
import { getDeviceTier } from './device-tier';

/**
 * True when a section should render its static blur-image background
 * instead of relying on the shared 3D ambient background -- reduced motion,
 * no WebGL, or a low-end device all fall back to the pre-existing visuals.
 */
export function shouldUseStaticBackgroundFallback(
  prefersReducedMotion: boolean
): boolean {
  return (
    prefersReducedMotion || !isWebglAvailable() || getDeviceTier() === 'low'
  );
}
