import { initTheme } from "./theme.js";
import { initTyping } from "./typing.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { renderProjects } from "./projects.js";
import { initKonami } from "./konami.js";
import { initMarquee } from "./marquee.js";
import { initScrollArt } from "./scroll-art.js";
import { initFakeCoord } from "./coord.js";
import { initPointerSkew } from "./confuse-pointer.js";

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

initTheme();
setYear();
initMarquee();
renderProjects();
initTyping(document.getElementById("typing-target"));
initScrollReveal();
initScrollArt();
initPointerSkew();
initFakeCoord();
initKonami();
