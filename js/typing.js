import { TYPING_PHRASES } from "./config.js";

/**
 * @param {HTMLElement | null} el
 */
export function initTyping(el) {
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = TYPING_PHRASES[0] ?? "";
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const typeSpeed = 52;
  const deleteSpeed = 32;
  const pauseEnd = 2200;
  const pauseStart = 400;

  const tick = () => {
    const full = TYPING_PHRASES[phraseIndex] ?? "";
    if (!deleting && charIndex <= full.length) {
      el.textContent = full.slice(0, charIndex);
      charIndex++;
      window.setTimeout(tick, typeSpeed);
      return;
    }
    if (!deleting && charIndex > full.length) {
      window.setTimeout(() => {
        deleting = true;
        charIndex = full.length;
        tick();
      }, pauseEnd);
      return;
    }
    if (deleting && charIndex >= 0) {
      el.textContent = full.slice(0, charIndex);
      charIndex--;
      window.setTimeout(tick, deleteSpeed);
      return;
    }
    deleting = false;
    phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
    charIndex = 0;
    window.setTimeout(tick, pauseStart);
  };

  tick();
}
