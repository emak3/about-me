/**
 * スクロール量で色相と傾きをわずかに変える（装飾）。
 */
export function initScrollArt() {
  const root = document.documentElement;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY || 0;
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const p = y / max;
      root.style.setProperty("--scroll-tilt", `${(p - 0.5) * 1.2}deg`);
      root.style.setProperty("--scroll-hue", `${p * 18}`);
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
