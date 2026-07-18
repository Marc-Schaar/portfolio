let cachedResult: boolean | null = null;

/**
 * Memoized: this is called once per section (fallback gating) plus once per
 * 3D component, and probing support means actually creating a WebGL context.
 * Without caching + explicitly releasing it, every call burns a slot against
 * the browser's small concurrent-context budget for no reason.
 */
export function isWebglAvailable(): boolean {
  if (cachedResult !== null) return cachedResult;

  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
    cachedResult = !!context;
    (context as WebGLRenderingContext | null)
      ?.getExtension('WEBGL_lose_context')
      ?.loseContext();
  } catch {
    cachedResult = false;
  }

  return cachedResult;
}
