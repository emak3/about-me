/**
 * ポインタ位置でわずかに歪む（装飾）。reduce では無効。
 */
export function initPointerSkew() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const root = document.documentElement;
  window.addEventListener(
    "pointermove",
    (e) => {
      const x = e.clientX / Math.max(window.innerWidth, 1);
      const y = e.clientY / Math.max(window.innerHeight, 1);
      root.style.setProperty("--look-x", String(x));
      root.style.setProperty("--look-y", String(y));
    },
    { passive: true }
  );
}
