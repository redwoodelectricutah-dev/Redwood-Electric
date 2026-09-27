import { projects } from "./projects.js"
import { modules, tracks } from "./training-content.js"

export const QUOTE_URL = "https://redwoodelectricutah-dev.github.io/Redwood-Electric-Sales/"

const NAV = [
  ["home", "index.html", "Home"],
  ["about", "about.html", "About"],
  ["portfolio", "portfolio.html", "Portfolio"],
  ["services", "services.html", "Services"],
  ["contact", "contact.html", "Contact"],
  ["training", "training.html", "Training Portal"],
]

export function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]
  ))
}

export function headAssets() {
  return `
    <link rel="icon" href="favicon.png" type="image/png">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <meta name="theme-color" content="#143028">
    <meta name="color-scheme" content="light">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./src/style.css">
    <script>document.documentElement.classList.add("js")</script>
  `
}

export function header(active) {
  const links = NAV.map(([key, href, label]) => {
    const current = key === active ? ' aria-current="page"' : ""
    const extra = key === "training" ? " nav-portal" : ""
    return `<li><a class="nav-link${extra}" href="${href}"${current}>${label}</a></li>`
  }).join("")

  return `
    <header class="site-header">
      <a class="brand" href="index.html">
        <span class="brand-mark">
          <img src="brand/redwood-electric-logo-ORIGINAL.jpg" alt="Redwood Electric" width="1280" height="1024">
        </span>
      </a>
      <nav id="site-nav" class="site-nav" aria-label="Primary">
        <ul class="nav-list">${links}</ul>
      </nav>
      <div class="header-actions">
        <a class="btn btn-ochre btn-small" href="${QUOTE_URL}" target="_blank" rel="noopener">Get a quote<span class="visually-hidden"> (opens the configurator in a new tab)</span></a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
          <span class="nav-toggle-bars" aria-hidden="true"></span>
          <span class="visually-hidden">Menu</span>
        </button>
      </div>
    </header>
  `
}

export function footer() {
  const links = NAV.map(([, href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")
  return `
    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div>
          <a class="brand brand-footer" href="index.html">
            <span class="brand-mark">
              <img src="brand/redwood-electric-logo-ORIGINAL.jpg" alt="" width="1280" height="1024">
            </span>
            <span class="visually-hidden">Redwood Electric home</span>
          </a>
          <p class="footer-blurb">Residential electrical, home theaters, UniFi, and data racks. Utah County, and we travel the Wasatch Front.</p>
        </div>
        <div>
          <p class="footer-label">Visit</p>
          <ul class="footer-links">${links}</ul>
        </div>
        <div>
          <p class="footer-label">Start a project</p>
          <p><a href="mailto:redwoodelectricutah@gmail.com">redwoodelectricutah@gmail.com</a></p>
          <p><a href="${QUOTE_URL}" target="_blank" rel="noopener">See the work we do / Get a quote</a></p>
          <p class="footer-badge">Licensed &amp; insured</p>
        </div>
      </div>
      <div class="wrap footer-base">
        <p>Redwood Electric · James Hewitt · Near Elberta, Utah</p>
        <p>Company site. The quote configurator is a separate tool.</p>
      </div>
    </footer>
    <script type="module" src="./src/site.js"></script>
  `
}

export function gallery() {
  const chips = [
    ["all", "All"],
    ["electrical", "Electrical"],
    ["theater", "Home theater"],
    ["unifi", "UniFi / security"],
    ["racks", "Data racks"],
  ].map(([id, label], i) => `
    <button type="button" class="chip${i === 0 ? " is-on" : ""}" data-filter="${id}" aria-pressed="${i === 0 ? "true" : "false"}">${label}</button>
  `).join("")

  const figures = projects.map((project, index) => {
    const orient = project.w > project.h ? "land" : "port"
    const loading = index < 3 ? "eager" : "lazy"
    return `
      <figure class="shot" data-cat="${project.cat}" data-orient="${orient}">
        <button type="button" class="shot-open">
          <img src="${esc(project.src)}" alt="${esc(project.alt)}" width="${project.w}" height="${project.h}" loading="${loading}" decoding="async">
          <span class="shot-meta">
            <span class="shot-cat">${esc(project.catLabel)}</span>
            <span class="shot-title">${esc(project.title)}</span>
          </span>
        </button>
      </figure>
    `
  }).join("")

  return `
    <div class="filter-bar" data-filter-scope>
      <div class="filters" role="toolbar" aria-label="Filter photographs">
        ${chips}
      </div>
      <p class="filter-count" aria-live="polite">${projects.length} photographs</p>
      <div class="gallery">${figures}</div>
      <p class="filter-empty" hidden>No photographs in this set.</p>
    </div>
  `
}

function slot(label, filledHtml, emptyText, filled) {
  if (!filled) {
    return `<li data-state="empty"><span>${label}</span><strong>${emptyText}</strong></li>`
  }
  return `<li data-state="ready"><span>${label}</span><div class="slot-body">${filledHtml}</div></li>`
}

function moduleCard(mod) {
  const lesson = slot("Lesson", mod.lesson ? `<p>${esc(mod.lesson)}</p>` : "", "Not written yet", Boolean(mod.lesson))
  const photoHtml = (mod.photos || []).map((photo) => `
    <img src="${esc(photo.src)}" alt="${esc(photo.alt || "")}" loading="lazy">
  `).join("")
  const photos = slot("Photos", `<div class="slot-photos">${photoHtml}</div>`, "No set uploaded", (mod.photos || []).length > 0)
  const videoHtml = mod.video
    ? `<video controls preload="none" src="${esc(mod.video.src)}"></video><p>${esc(mod.video.label || "Lesson video")}</p>`
    : ""
  const video = slot("Video", videoHtml, "No video added", Boolean(mod.video))
  const quizHtml = (mod.quiz || []).map((item, index) => `
    <fieldset>
      <legend>${index + 1}. ${esc(item.q)}</legend>
      ${(item.choices || []).map((choice) => `<label><input type="radio" name="${esc(mod.id)}-${index}" disabled> ${esc(choice)}</label>`).join("")}
    </fieldset>
  `).join("")
  const quiz = slot("Quiz", quizHtml, "No questions yet", (mod.quiz || []).length > 0)

  return `
    <article class="module" id="${esc(mod.id)}" data-cat="${esc(mod.track)}">
      <header class="module-head">
        <p class="module-track">${esc(mod.trackLabel)}</p>
        <h2>${esc(mod.title)}</h2>
        <p class="module-status">${esc(mod.status)}</p>
      </header>
      <p class="module-summary">${esc(mod.summary)}</p>
      <ul class="slots">${lesson}${photos}${video}${quiz}</ul>
    </article>
  `
}

export function portal() {
  const chips = tracks.map((track, i) => `
    <button type="button" class="chip${i === 0 ? " is-on" : ""}" data-filter="${track.id}" aria-pressed="${i === 0 ? "true" : "false"}">${esc(track.label)}</button>
  `).join("")

  return `
    <div class="portal" data-filter-scope>
      <aside class="portal-rail">
        <p class="rail-kicker">Crew</p>
        <h2 class="rail-title">Tracks</h2>
        <div class="filters" role="toolbar" aria-label="Training tracks">${chips}</div>
        <p class="rail-note">Lessons, photo sets, videos, and quizzes land in the slots on the right. Empty means not written yet — not hidden behind a login.</p>
      </aside>
      <div class="portal-main">
        <p class="filter-count" aria-live="polite">${modules.length} modules</p>
        <div class="module-list">${modules.map(moduleCard).join("")}</div>
        <p class="filter-empty" hidden>No modules in this track.</p>
      </div>
    </div>
  `
}
