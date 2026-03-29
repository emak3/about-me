import { MARQUEE_FRAGMENTS, MARQUEE_FRAGMENTS_REV } from "./config.js";

/**
 * 1 単位分の幅を測る（フォントは .marquee__half と揃える）
 * @param {string} unit
 * @param {HTMLElement} track
 */
function measureUnitWidth(unit, track) {
  const probe = document.createElement("span");
  probe.className = "marquee__half";
  probe.setAttribute("aria-hidden", "true");
  probe.textContent = unit;
  probe.style.cssText = "position:absolute;left:-9999px;top:0;visibility:hidden;pointer-events:none;white-space:nowrap;";
  track.appendChild(probe);
  const w = probe.getBoundingClientRect().width;
  track.removeChild(probe);
  return Math.max(w, 1);
}

/**
 * 画面幅より長い1ブロックを組む（ループ継ぎ目で空白が出ないように）
 * @param {readonly string[]} parts
 * @param {HTMLElement} track
 */
function buildWideLine(parts, track) {
  const base = parts.join(" ");
  const unit = `${base} · `;
  const vw = window.innerWidth || document.documentElement.clientWidth || 1024;
  const uw = measureUnitWidth(unit, track);
  const count = Math.max(8, Math.ceil((vw * 1.35) / uw));
  return Array(count).fill(unit).join("");
}

/**
 * @param {string} id
 * @param {readonly string[]} parts
 * @param {boolean} reverse
 */
function fillTrack(id, parts, reverse) {
  const track = document.getElementById(id);
  if (!track) return;

  const line = parts.join(" ");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    track.classList.add("marquee--static");
    const inner = document.createElement("div");
    inner.className = "marquee__static";
    inner.setAttribute("aria-hidden", "true");
    inner.textContent = `${line} · ${line}`;
    track.appendChild(inner);
    return;
  }

  const halfText = buildWideLine(parts, track);

  const row = document.createElement("div");
  row.className = "marquee__row" + (reverse ? " marquee__row--rev" : "");

  const a = document.createElement("span");
  a.className = "marquee__half";
  a.textContent = halfText;

  const b = document.createElement("span");
  b.className = "marquee__half";
  b.setAttribute("aria-hidden", "true");
  b.textContent = halfText;

  row.appendChild(a);
  row.appendChild(b);
  track.appendChild(row);
}

export function initMarquee() {
  fillTrack("marquee-track", MARQUEE_FRAGMENTS, false);
  fillTrack("marquee-track-rev", MARQUEE_FRAGMENTS_REV, true);
}
