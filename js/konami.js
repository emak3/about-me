const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function initKonami() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let i = 0;
  const overlay = document.getElementById("glitch-overlay");
  const hint = document.getElementById("konami-hint");

  window.addEventListener(
    "keydown",
    (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = SEQUENCE[i];
      const match = expected === key;
      if (!match) {
        i = key === "ArrowUp" ? 1 : 0;
        return;
      }
      i++;
      if (i < SEQUENCE.length) return;
      i = 0;
      if (overlay) {
        overlay.hidden = false;
        window.setTimeout(() => {
          overlay.hidden = true;
        }, 2600);
      }
      if (hint) {
        hint.hidden = false;
      }
    },
    { passive: true }
  );
}
