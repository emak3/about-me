export function initScrollReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("[data-reveal]").forEach((n) => n.classList.add("is-visible"));
    return;
  }

  const nodes = document.querySelectorAll("[data-reveal]");
  if (!nodes.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  nodes.forEach((n) => io.observe(n));
}
