import { PROJECTS } from "./config.js";

export function renderProjects() {
  const rail = document.getElementById("project-grid");
  if (!rail) return;

  const frag = document.createDocumentFragment();
  PROJECTS.forEach((p, idx) => {
    const article = document.createElement("article");
    article.className = "work-piece reveal";
    article.dataset.reveal = "";

    const no = String(idx + 1).padStart(2, "0");
    article.innerHTML = `
      <span class="work-piece__no" aria-hidden="true">${no}</span>
      <a class="work-piece__body" href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer">
        <span class="work-piece__lang">${escapeHtml(p.lang)}</span>
        <h3 class="work-piece__title">${escapeHtml(p.title)}</h3>
        <p class="work-piece__text">${escapeHtml(p.description)}</p>
        <span class="work-piece__slug">${escapeHtml(p.slug)}</span>
      </a>
    `;

    frag.appendChild(article);
  });

  rail.appendChild(frag);
}

/**
 * @param {string} s
 */
function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {string} s
 */
function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
