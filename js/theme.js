const STORAGE_KEY = "emak-profile-theme";

/** @returns {"light" | "dark"} */
function getStoredTheme() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    /* ignore */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function syncMetaTheme(mode) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;
  meta.setAttribute("content", mode === "light" ? "#e4e2dc" : "#070708");
}

/**
 * class + data の両方でテーマを同期（CSS は html.theme-day を参照）。
 * A→B 切替時のみショック用 class theme-b-jolt を一瞬付与。
 */
export function initTheme() {
  const root = document.documentElement;
  const label = () => document.querySelector("#theme-toggle .invert-chip__label");

  let firstApply = true;

  const apply = (mode) => {
    const prevLight = root.classList.contains("theme-day");
    const isLight = mode === "light";
    root.dataset.theme = mode;
    root.classList.toggle("theme-day", isLight);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
    syncMetaTheme(mode);
    const toggle = document.getElementById("theme-toggle");
    if (toggle) toggle.setAttribute("aria-pressed", isLight ? "true" : "false");
    const lb = label();
    if (lb) lb.textContent = isLight ? "B" : "A";

    const jolt =
      !firstApply &&
      isLight &&
      !prevLight &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (jolt) {
      root.classList.remove("theme-b-jolt");
      void root.offsetWidth;
      root.classList.add("theme-b-jolt");
      window.setTimeout(() => root.classList.remove("theme-b-jolt"), 1300);
    }

    firstApply = false;
  };

  apply(getStoredTheme());

  document.addEventListener(
    "click",
    (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const btn = t.closest("#theme-toggle");
      if (!btn) return;
      e.preventDefault();
      const next = root.classList.contains("theme-day") ? "dark" : "light";
      apply(next);
    },
    false
  );

  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) apply(e.matches ? "light" : "dark");
    } catch {
      apply(e.matches ? "light" : "dark");
    }
  });
}
