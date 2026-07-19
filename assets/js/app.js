/* ============================================================
   THE OT ATLAS — application engine
   Routing · rendering · search · drawers · interactive tools
   ============================================================ */
(function () {
  "use strict";

  const F = () => window.OT.foundations;
  const M = () => window.OT.models;
  const R = () => window.OT.reasoning;
  const E = () => window.OT.evidence;
  const RES = () => window.OT.resources;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const main = $("#main");

  /* ---------------- ACCESSIBILITY HELPERS ---------------- */
  const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  function focusable(container) {
    return $$(FOCUSABLE, container).filter(el => el.offsetParent !== null || el === document.activeElement);
  }
  // Trap Tab focus within a modal container. Call from the container's keydown handler.
  function trapFocus(container, e) {
    if (e.key !== "Tab") return;
    const items = focusable(container);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  // Associate <label> with its control inside every .field (screen-reader names).
  let _aid = 0;
  function associateLabels(root = main) {
    $$(".field", root).forEach(f => {
      const label = f.querySelector("label");
      const ctrl = f.querySelector("input, textarea, select");
      if (!label || !ctrl) return;
      if (!ctrl.id) ctrl.id = "f" + (++_aid);
      if (!label.getAttribute("for")) label.setAttribute("for", ctrl.id);
    });
  }
  // Announce SPA route/page changes to screen-reader users.
  function announce(msg) { const el = $("#routeStatus"); if (el) { el.textContent = ""; setTimeout(() => { el.textContent = msg; }, 30); } }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  // Icon from the inline sprite in index.html (consistent cross-platform, silent to SRs)
  const icn = (key, cls = "") => `<svg class="icn${cls ? " " + cls : ""}" aria-hidden="true"><use href="#${key}"></use></svg>`;
  // F37: one shared empty-state treatment — drawn-object icon + message (message HTML may
  // already include a recovery action, e.g. a #xClear text-btn — callers keep that logic).
  const emptyState = (messageHTML, icon = "i-compass") =>
    `<div class="empty-state"><svg class="empty-obj" aria-hidden="true" focusable="false"><use href="#${icon}"/></svg><p>${messageHTML}</p></div>`;
  const ytThumb = id => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  const ytWatch = id => `https://www.youtube.com/watch?v=${id}`;
  const ytSearch = q => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
  const FALLBACK_THUMB = "data:image/svg+xml," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'><rect width='320' height='180' fill='#156B66'/><circle cx='160' cy='74' r='23' fill='none' stroke='#F4F6FA' stroke-width='3'/><path d='M153 63 176 74 153 85 Z' fill='#F4F6FA'/><text x='160' y='126' font-family='monospace' font-size='14' fill='#F4F6FA' text-anchor='middle'>watch on YouTube</text></svg>`);

  /* ---------------- THEME ---------------- */
  const htmlEl = document.documentElement;
  function initTheme() {
    const saved = localStorage.getItem("ot-theme");
    if (saved) htmlEl.setAttribute("data-theme", saved);
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) htmlEl.setAttribute("data-theme", "dark");
  }
  initTheme();
  $("#themeToggle").addEventListener("click", () => {
    const next = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    htmlEl.setAttribute("data-theme", next);
    localStorage.setItem("ot-theme", next);
  });

  /* ---------------- TEXT SIZE ---------------- */
  const FONTSIZES = { default: { label: "A", next: "lg", desc: "default" }, lg: { label: "A+", next: "xl", desc: "large" }, xl: { label: "A++", next: "default", desc: "extra large" } };
  function initFontSize() {
    const saved = localStorage.getItem("ot-fontsize");
    applyFontSize(FONTSIZES[saved] ? saved : "default");
  }
  function applyFontSize(size) {
    if (size === "default") htmlEl.removeAttribute("data-fontsize");
    else htmlEl.setAttribute("data-fontsize", size);
    const btn = $("#fontSizeToggle");
    btn.querySelector(".fs-label").textContent = FONTSIZES[size].label;
    btn.setAttribute("aria-label", `Text size: ${FONTSIZES[size].desc}. Activate to ${size === "xl" ? "reset to default" : "increase"}.`);
  }
  initFontSize();
  $("#fontSizeToggle").addEventListener("click", () => {
    const current = htmlEl.getAttribute("data-fontsize") || "default";
    const next = FONTSIZES[current].next;
    applyFontSize(next);
    localStorage.setItem("ot-fontsize", next);
  });

  /* ---------------- BACK TO TOP (long-page navigation, F4) ---------------- */
  const prefersReducedMotion = () => !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  function initBackToTop() {
    const btn = $("#backToTop");
    if (!btn) return;
    // Reveal past ~2 viewport-heights. Math.max guards a 0-height viewport so the
    // button starts hidden even before layout reports a real innerHeight.
    const update = () => { btn.hidden = window.scrollY < Math.max(1, window.innerHeight) * 2; };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      // Move focus to content top so it isn't lost when the button self-hides at y<2vh.
      main.focus({ preventScroll: true });
    });
  }
  initBackToTop();

  /* ---------------- AUDIENCE MODE + PLAIN LANGUAGE ---------------- */
  function getMode() { return localStorage.getItem("ot-mode") === "public" ? "public" : "clinical"; }
  function isPlain() { return localStorage.getItem("ot-plain") === "on"; }
  function applyMode() {
    htmlEl.setAttribute("data-mode", getMode());
    htmlEl.setAttribute("data-plain", isPlain() ? "on" : "off");
    syncModeButtons();
  }
  function syncModeButtons() {
    const m = getMode();
    $$("#modeToggle button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.mode === m)));
    const p = $("#plainToggle"); if (p) p.setAttribute("aria-pressed", String(isPlain()));
  }
  function setMode(m) {
    if (m !== "public" && m !== "clinical") return;
    localStorage.setItem("ot-mode", m);
    applyMode();
    if (typeof route === "function") route();
  }
  function togglePlain() {
    localStorage.setItem("ot-plain", isPlain() ? "off" : "on");
    applyMode();
    if (typeof route === "function") route();
  }
  applyMode();
  document.addEventListener("click", e => {
    const mb = e.target.closest("#modeToggle button"); if (mb) { setMode(mb.dataset.mode); return; }
    if (e.target.closest("#plainToggle")) togglePlain();
  });
  /* plain-language helper: plain wording when the toggle is on OR in public mode */
  function pl(clinical, plain) { return (isPlain() || getMode() === "public") ? plain : clinical; }

  /* ---------------- FIRST-VISIT AUDIENCE CHOOSER ---------------- */
  // Shown once, only on home, only when the visitor has never chosen a mode.
  // Wrapped in try/catch so it can never block startup. Esc / skip = stay clinical.
  // iOS-safe scroll lock: body.overflow:hidden alone doesn't stop iOS touch-scroll, so pin the
  // body with position:fixed and restore scrollY on release. Ref-counted for nested locks.
  let _lockY = 0, _locks = 0;
  function lockScroll() {
    if (_locks++ > 0) return;
    _lockY = window.scrollY || window.pageYOffset || 0;
    const b = document.body.style;
    b.position = "fixed"; b.top = `-${_lockY}px`; b.left = "0"; b.right = "0"; b.width = "100%"; b.overflow = "hidden";
  }
  function unlockScroll() {
    if (_locks <= 0 || --_locks > 0) return;
    const b = document.body.style;
    b.position = ""; b.top = ""; b.left = ""; b.right = ""; b.width = ""; b.overflow = "";
    window.scrollTo(0, _lockY);
  }
  function maybeWelcome() {
    try {
      if (localStorage.getItem("ot-mode") !== null || localStorage.getItem("ot-welcomed")) return;
      if (location.hash && !/^#\/?(home\/?)?$/.test(location.hash)) return; // never interrupt deep links
      const wrap = document.createElement("div"); wrap.className = "welcome-scrim"; wrap.id = "welcomeEl";
      const wc = window.OT.conditions.length, wa = window.OT.assessments.length;
      wrap.innerHTML = `<div class="welcome" role="dialog" aria-modal="true" aria-labelledby="welcomeTitle">
        <svg class="w-contours" viewBox="0 0 240 190" aria-hidden="true"><circle cx="218" cy="8" r="44"/><circle cx="222" cy="4" r="80"/><circle cx="228" cy="0" r="118"/></svg>
        <p class="eyebrow" style="margin-bottom:8px">The atlas of the everyday</p>
        <h2 id="welcomeTitle" style="margin:0 0 16px;font-size:1.55rem">What brings you here?</h2>
        <div class="welcome-choices">
          <button class="welcome-btn" data-choice="public">
            <svg class="w-obj" aria-hidden="true"><use href="#i-obj-mug"/></svg>
            <span class="w-main"><strong>Could OT help me or someone I love?</strong><span>Plain language · what to expect · a 2-minute check</span></span>
            <span class="w-arrow" aria-hidden="true">→</span>
          </button>
          <button class="welcome-btn" data-choice="clinical">
            <svg class="w-obj" aria-hidden="true"><use href="#i-obj-pencil"/></svg>
            <span class="w-main"><strong>I'm a student or practitioner</strong><span>Frameworks · evidence · ${wa} assessments · ${wc} conditions</span></span>
            <span class="w-arrow" aria-hidden="true">→</span>
          </button>
        </div>
        <div class="welcome-foot"><button class="welcome-skip">Just browsing — skip</button><span class="w-note">Switch any time: Public / Clinical, top of the page.</span></div>
      </div>`;
      document.body.appendChild(wrap);
      lockScroll();
      const dlg = $(".welcome", wrap);
      const finish = choice => {
        try { localStorage.setItem("ot-welcomed", "1"); } catch (e) {}
        wrap.remove(); unlockScroll();
        if (choice) { setMode(choice); if (choice === "public") go("clients"); }
      };
      $$(".welcome-btn", wrap).forEach(b => b.addEventListener("click", () => finish(b.dataset.choice)));
      $(".welcome-skip", wrap).addEventListener("click", () => finish(null));
      wrap.addEventListener("keydown", e => { if (e.key === "Escape") { finish(null); return; } trapFocus(dlg, e); });
      setTimeout(() => { const f = $(".welcome-btn", wrap); if (f) f.focus(); }, 30);
    } catch (e) { /* never block startup */ }
  }

  /* ---------------- MOBILE NAV ---------------- */
  const navToggle = $("#navToggle"), scrim = $("#scrim");
  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    scrim.hidden = !open;
  }
  navToggle.addEventListener("click", () => setNav(!document.body.classList.contains("nav-open")));
  scrim.addEventListener("click", () => setNav(false));

  /* ---------------- COMPONENT HELPERS ---------------- */
  function accordionHTML(items, variant = "") {
    return `<div class="accordion${variant ? " " + variant : ""}">${items.map((it, i) => `
      <div class="acc-item">
        <button class="acc-head" aria-expanded="false" data-acc="${i}">
          <span class="caret" aria-hidden="true">›</span>
          <span class="acc-title">${it.title}</span>
          <span class="acc-leader" aria-hidden="true"></span>
          ${it.sub ? `<span class="acc-sub">${it.sub}</span>` : ""}
        </button>
        <div class="acc-body" id="accb-${i}"><div class="acc-clip"><div class="inner">${it.body}</div></div></div>
      </div>`).join("")}</div>`;
  }
  function wireAccordions(root = main) {
    $$(".acc-head", root).forEach(btn => {
      btn.addEventListener("click", () => {
        const body = btn.parentElement.querySelector(".acc-body");
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        body.classList.toggle("open", !open);
      });
    });
  }
  function wireTabs(root = main) {
    $$(".tabs", root).forEach(tabbar => {
      const group = tabbar.getAttribute("data-tabs");
      tabbar.setAttribute("role", "tablist");
      const btns = $$(".tab-btn", tabbar);
      const panelFor = key => $(`[data-panel="${group}"][data-key="${key}"]`, root);
      // enhance existing markup into a proper ARIA tab pattern (role=tab/tabpanel, aria-controls, roving tabindex)
      btns.forEach(b => {
        const key = b.dataset.key, on = b.classList.contains("active");
        const tabId = `tab-${group}-${key}`, panId = `panel-${group}-${key}`, panel = panelFor(key);
        b.setAttribute("role", "tab"); b.id = tabId; b.setAttribute("aria-selected", String(on));
        b.setAttribute("aria-controls", panId); b.tabIndex = on ? 0 : -1;
        if (panel) { panel.setAttribute("role", "tabpanel"); panel.id = panId; panel.setAttribute("aria-labelledby", tabId); panel.tabIndex = 0; }
      });
      const select = b => {
        btns.forEach(x => { const on = x === b; x.classList.toggle("active", on); x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1; });
        $$(`[data-panel="${group}"]`, root).forEach(p => p.classList.add("hide"));
        const panel = panelFor(b.dataset.key); if (panel) panel.classList.remove("hide");
      };
      btns.forEach((b, i) => {
        b.addEventListener("click", () => select(b));
        b.addEventListener("keydown", e => {
          let ni = -1;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") ni = (i + 1) % btns.length;
          else if (e.key === "ArrowLeft" || e.key === "ArrowUp") ni = (i - 1 + btns.length) % btns.length;
          else if (e.key === "Home") ni = 0;
          else if (e.key === "End") ni = btns.length - 1;
          if (ni >= 0) { e.preventDefault(); select(btns[ni]); btns[ni].focus(); }
        });
      });
    });
  }

  function videoItemHTML(v) {
    if (v.yt) {
      return `<a class="card lift video-card" href="${ytWatch(v.yt)}" target="_blank" rel="noopener">
        <span class="video-thumb"><img loading="lazy" src="${ytThumb(v.yt)}" alt="" onerror="this.onerror=null;this.src='${FALLBACK_THUMB}'"><span class="play" aria-hidden="true"><svg viewBox="0 0 68 68"><circle cx="34" cy="34" r="33" fill="var(--teal)"/><path d="M27 21v26l22-13z" fill="var(--paper)"/></svg></span></span>
        <span class="video-body"><h3>${v.title}</h3><span class="chan">${v.channel || ""}</span><p>${v.desc || ""}</p></span></a>`;
    }
    if (v.search) {
      return `<a class="card lift video-card" href="${ytSearch(v.search)}" target="_blank" rel="noopener">
        <span class="video-thumb" style="background:linear-gradient(135deg,var(--teal),var(--teal-deep));display:grid;place-items:center"><svg viewBox="0 0 24 24" width="44" height="44" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="#F4F6FA" stroke-width="2"/><path d="m20 20-3.5-3.5" stroke="#F4F6FA" stroke-width="2" stroke-linecap="round"/></svg></span>
        <span class="video-body"><h3>${v.title}</h3><span class="chan">Browse on YouTube →</span><p>${v.desc || ""}</p></span></a>`;
    }
    return `<a class="card lift video-card" href="${v.url}" target="_blank" rel="noopener">
      <span class="video-thumb" style="background:linear-gradient(135deg,var(--clay),var(--clay-soft));display:grid;place-items:center">${icn("i-link")}</span>
      <span class="video-body"><h3>${v.title}</h3><span class="chan">${v.channel || "External resource"}</span><p>${v.desc || ""}</p></span></a>`;
  }

  /* ---------------- DETAIL DRAWER ---------------- */
  let lastFocus = null;
  function openDrawer(html) {
    closeDrawer();
    lastFocus = document.activeElement;
    const scrimEl = document.createElement("div"); scrimEl.className = "drawer-scrim"; scrimEl.id = "drawerScrim";
    const drawer = document.createElement("aside"); drawer.className = "drawer"; drawer.setAttribute("role", "dialog"); drawer.setAttribute("aria-modal", "true"); drawer.id = "drawerEl";
    drawer.innerHTML = html;
    const titleEl = $(".drawer-head h2", drawer);
    if (titleEl) { titleEl.id = "drawerTitle"; drawer.setAttribute("aria-labelledby", "drawerTitle"); }
    associateLabels(drawer);
    document.body.appendChild(scrimEl); document.body.appendChild(drawer);
    lockScroll();
    scrimEl.addEventListener("click", closeDrawer);
    const closeBtn = $(".close", drawer);
    if (closeBtn) { closeBtn.addEventListener("click", closeDrawer); closeBtn.focus(); }
    drawer.addEventListener("keydown", e => { if (e.key === "Escape") { closeDrawer(); return; } trapFocus(drawer, e); });
  }
  function closeDrawer() {
    const d = $("#drawerEl"), s = $("#drawerScrim");
    if (d) d.remove(); if (s) s.remove();
    unlockScroll();
    // drop the deep-link sub-segment so the URL matches the closed state
    if (/^#\/conditions\/./.test(location.hash) && history.replaceState) history.replaceState(null, "", "#/conditions");
    if (lastFocus) { try { lastFocus.focus(); } catch (e) {} lastFocus = null; }
  }
  // drawerShell is SHARED (models + conditions). Pass `plate` (F36) ONLY from openCondition to
  // get the specimen-plate header band; every other caller omits it and keeps the plain header.
  function drawerShell(eyebrow, title, bodyHTML, plate) {
    const head = plate
      ? `<div class="drawer-head drawer-plate" data-tint="${plate.tint}">
          <div class="plate-stamp-row"><span class="plate-icn">${plate.icon}</span><span class="plate-stamp">${plate.stamp}</span></div>
          <h2 class="drawer-title">${title}</h2>
          ${plate.taxon ? `<p class="plate-taxon">${plate.taxon}</p>` : ""}
          <button class="icon-btn close" aria-label="Close">${icn("i-cross")}</button></div>`
      : `<div class="drawer-head"><p class="eyebrow" style="margin-bottom:6px">${eyebrow}</p><h2 style="margin:0;font-size:1.7rem">${title}</h2>
          <button class="icon-btn close" aria-label="Close">${icn("i-cross")}</button></div>`;
    return `${head}<div class="drawer-body">${bodyHTML}</div>`;
  }
  // F36: decorative arc-dial reinforcing the evidence rating. `aria-hidden` — the dot+label text
  // in evidenceBadge stays the non-colour a11y channel. Strength → 1..5 arc fill (rigor.js
  // strengthLevels order); confidence high/medium/low → 3/2/1 ticks; colour from the strength tone.
  function evidenceDial(ev) {
    if (!ev) return "";
    const STEP = { strong: 5, moderate: 4, emerging: 3, contested: 2, insufficient: 1 };
    const step = STEP[ev.strength] || 0;
    const conf = { high: 3, medium: 2, low: 1 }[(ev.confidence || "").toLowerCase()] || 0;
    const tone = strengthMeta(ev.strength).tone || "teal";
    const pol = deg => { const r = 15, a = (deg - 90) * Math.PI / 180; return [(20 + r * Math.cos(a)).toFixed(2), (20 + r * Math.sin(a)).toFixed(2)]; };
    const s = pol(225), e = pol(135); // 270° gauge, 90° gap centred at the bottom
    const d = `M ${s[0]} ${s[1]} A 15 15 0 1 1 ${e[0]} ${e[1]}`;
    const ticks = [0, 1, 2].map(i => `<circle class="dial-tick${i < conf ? " on" : ""}" cx="${20 + (i - 1) * 5}" cy="35.5" r="1.6"/>`).join("");
    return `<svg class="ev-dial" data-tone="${tone}" viewBox="0 0 40 40" width="44" height="44" aria-hidden="true" focusable="false">
      <path class="dial-track" d="${d}" pathLength="100"/>
      <path class="dial-val" d="${d}" pathLength="100" style="stroke-dasharray:${step * 20} 100"/>
      ${ticks}
    </svg>`;
  }
  const listHTML = arr => `<ul>${arr.map(x => `<li>${x}</li>`).join("")}</ul>`;
  const linksHTML = arr => (arr && arr.length) ? `<div class="flex" style="margin-top:6px">${arr.map(l => `<a class="chip" href="${l.u || l.url}" target="_blank" rel="noopener">${l.l || l.name} ↗</a>`).join("")}</div>` : "";

  /* ---------------- EVIDENCE / RIGOR ---------------- */
  const RIG = () => window.OT.rigor;
  function strengthMeta(key) { return (RIG().strengthLevels.find(s => s.key === key)) || { label: key, tone: "", desc: "" }; }
  function evidenceBadge(ev) {
    if (!ev) return "";
    const sm = strengthMeta(ev.strength);
    const vlabel = ev.verified ? "✓ sourced" : "⚠ unverified";
    const vtitle = ev.verified ? "At least one cited source was confirmed reachable this session" : "Sources not re-confirmed this session — treat with extra caution";
    return `<span class="ev-badges">
      <span class="ev-badge ev-${sm.tone}" title="${escapeHTML(sm.desc)}">${sm.label} evidence</span>
      <span class="ev-conf" title="Our confidence in this strength rating">${escapeHTML(ev.confidence)} conf</span>
      <span class="${ev.verified ? "ev-ok" : "ev-unv"}" title="${vtitle}">${vlabel}</span>
    </span>`;
  }
  function evMiniBadge(ev) {
    if (!ev) return "";
    const sm = strengthMeta(ev.strength);
    return `<span class="ev-mini ev-${sm.tone}" title="Evidence: ${sm.label} (${escapeHTML(ev.confidence)} confidence). ${escapeHTML(sm.desc)}">${sm.label}</span>`;
  }
  function biasHTML(ev) {
    if (!ev || !ev.bias || !ev.bias.length) return "";
    return `<div class="ev-bias"><span class="ev-bias-h">Bias watch</span>${ev.bias.map(b => `<span class="bias-chip">${escapeHTML(RIG().biasLabels[b] || b)}</span>`).join("")}</div>`;
  }
  function sourceChips(ev) {
    if (!ev || !ev.sources || !ev.sources.length) return "";
    // de-dup by url
    const seen = {}, out = [];
    ev.sources.forEach(s => { if (!seen[s.url]) { seen[s.url] = 1; out.push(s); } });
    return `<div class="ev-sources">${out.map(s => `<a class="src-chip" href="${s.url}" target="_blank" rel="noopener"><span class="src-type">${escapeHTML(RIG().sourceTypeLabels[s.type] || s.type)}</span>${escapeHTML(s.label)} ↗</a>`).join("")}</div>`;
  }
  // Full evidence block for drawers. Public/plain mode shows a lighter version.
  function evidenceBlock(ev) {
    if (!ev) return "";
    const full = getMode() === "clinical" && !isPlain();
    return `<div class="ev-block">
      <div class="ev-row">${evidenceBadge(ev)}</div>
      ${ev.note ? `<p class="ev-note">${ev.note}</p>` : ""}
      ${full ? biasHTML(ev) : ""}
      ${ev.sources && ev.sources.length ? `<p class="ev-srch">${full ? "Sources" : "Where this comes from"}</p>${sourceChips(ev)}` : ""}
    </div>`;
  }

  /* ---------------- COUNTRY FACTS (Phase 3) ---------------- */
  function countryCard(c, compact) {
    const conf = `${escapeHTML(c.confidence)} conf${c.verified ? " · ✓ source" : " · ⚠ unverified"}`;
    const rows = compact
      ? [["Regulator / licensure", c.regulator], ["Funding / access", c.funding], ["Getting started", c.access]]
      : [["Regulator / licensure", c.regulator], ["Entry to practice", c.entry], ["Funding / access", c.funding], ["How to get started", c.access]];
    return `<div class="country-card">
      <div class="cc-head"><span class="cc-flag" aria-hidden="true">${c.flag}</span><span class="cc-name">${c.name}</span></div>
      <dl>${rows.map(r => `<div class="cc-row"><dt class="cc-k">${r[0]}</dt><dd class="cc-v">${r[1]}</dd></div>`).join("")}</dl>
      ${c.note ? `<p class="cc-v" style="margin-top:8px;color:var(--clay-deep)">⚠ ${c.note}</p>` : ""}
      <div class="cc-foot"><span class="muted">${conf}</span><a class="pill-link" href="${c.source.url}" target="_blank" rel="noopener">${c.source.label} ↗</a></div>
    </div>`;
  }
  function countryFactsHTML(compact) {
    const cs = (RIG() && RIG().countries) || [];
    if (!cs.length) return "";
    return `<div class="country-grid">${cs.map(c => countryCard(c, compact)).join("")}</div>`;
  }
  // Evidence-strength filter chip row (shared by conditions + assessments)
  function strengthChips(active, idAttr) {
    const lv = (RIG() && RIG().strengthLevels) || [];
    return `<div class="chip-row strength-chips" id="${idAttr}">
      <span class="filter-lead">Evidence strength</span>
      <button class="chip ${active === "all" ? "active" : ""}" data-str="all">All</button>
      ${lv.map(s => `<button class="chip str-chip ${active === s.key ? "active" : ""}" data-str="${s.key}" title="${escapeHTML(s.desc)}"><span class="str-dot dot-${s.tone}"></span>${s.label}</button>`).join("")}
    </div>`;
  }

  /* ============================================================
     ROUTES
     ============================================================ */
  function setActiveNav(route) {
    $$(".nav-list a").forEach(a => {
      const on = a.dataset.route === route;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }

  /* ---------- HOME ---------- */
  function renderHome() {
    const c = window.OT.conditions.length, a = window.OT.assessments.length;
    const v = window.OT.videos.buckets.reduce((n, b) => n + b.items.length, 0);
    const g = RES().glossary.length;
    const pub = getMode() === "public";
    const clientsCopy = pub
      ? "Could OT help you, your child or your parent? Take the 2-minute check, or read what to expect and how to find a therapist."
      : "Could OT help you, your child or your parent? What to expect, and how to find a therapist.";
    // F6: public mode gets the plain functional answer; clinical keeps the full lede.
    const heroLede = pub
      ? `<p class="hero-sub">Find out whether occupational therapy could help you or your family — and how to get it.</p>`
      : `<p class="hero-lede">Occupational therapy helps people do the things they want and need to do — after a stroke, in a classroom, through a hard season, into older age. This atlas gathers the <span class="ul">frameworks, evidence, conditions, reasoning and tools</span> of OT for the people who practise it and the people it serves.</p>`;
    // F32: cartographic contour field — decorative terrain with coordinate-pinned live stats.
    const heroField = `<svg class="hero-field" viewBox="0 0 520 420" aria-hidden="true" focusable="false">
      <g class="hf-a">
        <path class="ring ring-accent" d="M143 148 C143 134 157 122 175 122 C193 122 207 134 207 148 C207 162 193 174 175 174 C157 174 143 162 143 148 Z"/>
        <path class="ring" d="M122 152 C122 130 146 106 181 106 C214 106 238 128 238 152 C238 176 212 198 178 198 C148 198 122 176 122 152 Z"/>
        <path class="ring" d="M101 158 C99 128 132 80 188 82 C240 84 271 122 271 158 C271 196 234 226 184 226 C136 226 103 194 101 158 Z"/>
        <path class="ring" d="M79 166 C74 126 118 56 200 58 C268 60 309 116 309 166 C309 218 258 258 192 258 C122 258 84 214 79 166 Z"/>
        <path class="ring" d="M56 176 C50 122 106 30 212 34 C296 38 352 108 352 176 C352 246 284 296 200 296 C110 296 62 240 56 176 Z"/>
        <use class="hf-obj" href="#i-obj-mug" x="145" y="115" width="64" height="64"/>
        <path class="hf-leader" d="M207 141 L258 100"/>
        <text class="hf-label" x="264" y="98">${c} CONDITIONS</text>
      </g>
      <g class="hf-b">
        <path class="ring" d="M340 290 C340 276 353 266 370 266 C387 266 400 276 400 290 C400 304 387 314 370 314 C353 314 340 304 340 290 Z"/>
        <path class="ring" d="M314 286 C312 264 336 244 368 244 C398 244 420 264 420 286 C420 310 396 328 366 328 C336 328 316 310 314 286 Z"/>
        <path class="ring" d="M286 280 C282 248 316 218 362 218 C408 218 438 248 438 280 C438 314 404 342 360 342 C318 342 290 314 286 280 Z"/>
        <path class="ring" d="M256 273 C250 232 294 190 356 190 C416 190 458 232 458 273 C458 316 414 356 354 356 C298 356 262 318 256 273 Z"/>
        <use class="hf-obj" href="#i-obj-shoe" x="337" y="257" width="68" height="68"/>
        <path class="hf-leader" d="M400 297 L446 350"/>
        <text class="hf-label" x="400" y="372">${a} ASSESSMENTS</text>
        <use class="hf-obj" href="#i-obj-key" x="272" y="34" width="56" height="56"/>
        <text class="hf-label" x="326" y="66">${g} PLAIN-LANGUAGE TERMS</text>
      </g>
    </svg>`;
    main.innerHTML = `<div class="page">
      <section class="hero stagger">
        ${heroField}
        <p class="eyebrow">An in-depth, evidence-informed guide</p>
        <h1 class="hero-title"><span class="l1">The everyday is</span><em>extraordinary.</em></h1>
        ${heroLede}
        <div class="hero-cta">
          <a class="btn btn-primary" href="#/foundations">Start with the basics →</a>
          <a class="btn btn-ghost" href="#/clients">I'm looking for help</a>
        </div>
      </section>

      <!-- F43: pathway hierarchy — one primary path (public), two quiet secondary rows -->
      <div class="stagger" style="margin-top:30px">
        <button class="pathway-primary" data-go="clients">
          <span class="pw-ico"><svg class="fig-obj" aria-hidden="true"><use href="#i-obj-key"/></svg></span>
          <span class="pp-main"><h2>For clients &amp; families</h2><p>${clientsCopy}</p></span>
          <span class="pp-arrow" aria-hidden="true">→</span>
        </button>
        <div class="pathway-minis">
          <button class="pathway-mini" data-go="foundations">${icn("i-grad")}<span><strong>Students &amp; practitioners</strong> — foundations, frameworks, reasoning, EBP &amp; the full reference library.</span></button>
          <button class="pathway-mini" data-go="toolkit">${icn("i-sliders")}<span><strong>Interactive toolkit</strong> — goal writer, PICO builder, activity analysis &amp; the self-screener.</span></button>
        </div>
      </div>

      <hr class="divider" />
      <p class="eyebrow">Contents — the atlas in twelve chapters</p>
      <!-- F43: Table of Plates — a contents index, not a card grid; numbers are the real ROUTE_COORD chapters -->
      <nav class="plates stagger" aria-label="Atlas contents">
        ${[
          ["foundations", "02", "Foundations &amp; profession", "What OT is, its history &amp; philosophy, OT vs PT/SLP, and the profession itself.", "i-book"],
          ["pillars", "03", "Domain &amp; the OT process", "The OTPF-4 pillars — occupations, client factors, skills, patterns, contexts.", "i-pillars"],
          ["models", "04", "Models &amp; frames of reference", "MOHO, PEOP, PEO, CMOP-E, KAWA and the frames that guide technique.", "i-hex"],
          ["reasoning", "05", "Clinical reasoning", "How OTs think, document (SOAP) and write goals — with a worked case.", "i-loop"],
          ["evidence", "06", "Evidence-based practice", "PICO, levels of evidence, databases, landmark studies and journals.", "i-chart"],
          ["conditions", "07", "Conditions library", `${c} conditions — OT's role, assessments, goals and reputable links.`, "i-plus"],
          ["assessments", "08", "Assessments &amp; measures", `${a} standardised tools, what they measure and who for.`, "i-clipboard"],
          ["videos", "09", "Video library", "Curated, topic-organised videos and channels for every area.", "i-play"],
          ["resources", "10", "Resources &amp; glossary", `${g} plain-language terms, organisations and reputable sources.`, "i-bookmark"],
          ["clients", "11", "For clients &amp; families", "Recognise when OT helps, what to expect, and self-management strategies.", "i-heart"],
          ["toolkit", "12", "Interactive toolkit", "PICO builder, goal writer, activity analysis and the self-screener.", "i-sliders"]
        ].map(([r, n, t, d, ic]) => `<button class="plate-row" data-go="${r}"><span class="plate-no">${n}</span><span class="plate-main"><span class="plate-title">${t}</span><span class="plate-desc">${d}</span></span><span class="plate-lead" aria-hidden="true"></span><span class="plate-ico">${icn(ic)}</span></button>`).join("")}
      </nav>

      <p class="atlas-legend"><span><b>9</b> areas of occupation</span><span><b>8+</b> models &amp; frames</span><span><b>${c}</b> conditions</span><span><b>${a}</b> assessments</span><span><b>${v}+</b> videos</span><span><b>${g}</b> glossary terms</span></p>

      <div class="callout note" style="margin-top:40px"><span class="ico">${icn("i-info"," c-ochre")}</span><p>${RES().disclaimer}</p></div>
      ${pageFoot("home")}
    </div>`;
    wireGo();
  }

  /* ---------- FOUNDATIONS ---------- */
  function renderFoundations() {
    const f = F();
    const whatTab = `<div data-panel="found" data-key="what">
      <p class="lede">${f.whatIsOT.headline}</p>
      <div class="prose"><p>${f.whatIsOT.plain}</p></div>
      <div class="callout tip"><span class="ico">${icn("i-bulb"," c-teal")}</span><p>${f.whatIsOT.occupation}</p></div>
      <div class="prose"><p>${f.whatIsOT.distinctValue}</p></div>
      <h2>Who OT serves</h2><ul class="ticks">${f.whatIsOT.serves.map(s => `<li>${s}</li>`).join("")}</ul>
      <hr class="divider"/>
      <h2>OT vs PT vs SLP</h2><p class="muted">${f.vsOthers.intro}</p>
      <!-- Figure language, not card kit: hairline column rules, numbered figure, run-in prose -->
      <figure class="fig" style="margin-top:18px">
        <figcaption class="fig-cap"><span class="fig-no">FIG. 02·A</span> The three rehabilitation professions</figcaption>
        <div class="fig-cols">
          ${f.vsOthers.rows.map((r, i) => `<div class="fig-col">
            <svg class="fig-obj" aria-hidden="true"><use href="#${["i-obj-mug", "i-obj-shoe", "i-obj-spoon"][i]}"/></svg>
            <h2 class="fig-name">${r.d}</h2>
            ${r.alias ? `<p class="fig-alias">${r.alias}</p>` : ""}
            <p class="fig-body"><strong>Focus.</strong> ${r.focus}</p>
            <p class="fig-body"><strong>Lens.</strong> ${r.lens}</p>
            <p class="fig-eg">e.g. ${r.egs}</p>
          </div>`).join("")}
        </div>
      </figure>
      ${f.vsOthers.rows.some(r => r.more) ? `<div style="margin-top:6px">${accordionHTML(f.vsOthers.rows.filter(r => r.more).map(r => ({
        title: `More about ${r.d.replace(/\s*\(.*\)$/, "").toLowerCase()}`,
        sub: "who · where · when · specialties · team · training",
        body: `<div class="dp-prose">${[
          ["Who they help", r.more.who], ["Where they work", r.more.settings],
          ["When you might see one", r.more.whenToSee], ["Specialty areas", r.more.specialties],
          ["The wider team", r.more.team], ["Training & regulation", r.more.training]
        ].map(([label, items]) => `<p><strong class="dp-run">${label}.</strong> ${items.map(x => x.replace(/\.$/, "")).join("; ")}.</p>`).join("")}</div>`
      })), "acc-idx")}</div>` : ""}
      ${f.vsOthers.overlaps ? `<h3 style="margin-top:26px">Where they overlap</h3>
      <p class="muted small">${f.vsOthers.overlaps.intro}</p>
      <p class="fig-cap" style="margin-top:14px"><span class="fig-no">FIG. 02·B</span> Shared scope, drawn to scale</p>
      <div class="venn-wrap">
        <!-- Overlap areas are drawn to MEAN something: OT shares real scope with both PT and SLP
             (deep lenses); PT and SLP barely touch — they mostly meet through co-treatment. -->
        <svg class="venn" viewBox="0 0 360 330" aria-hidden="true" focusable="false">
          <path class="v-circle v-ot" d="M180 25 C233 24 275 68 274 120 C273 172 232 215 180 214 C128 213 85 171 86 120 C87 69 127 26 180 25 Z"/>
          <path class="v-circle v-pt" d="M98 126 C147 128 186 168 185 214 C184 262 146 303 98 302 C50 301 10 261 11 214 C12 167 49 124 98 126 Z"/>
          <path class="v-circle v-slp" d="M262 126 C311 124 350 167 349 214 C348 261 310 302 262 303 C214 304 175 262 175 214 C175 168 213 128 262 126 Z"/>
          <text class="v-label vl-ot" x="180" y="62" text-anchor="middle">OT</text>
          <text class="v-label vl-pt" x="62" y="256" text-anchor="middle">PT</text>
          <text class="v-label vl-slp" x="298" y="256" text-anchor="middle">SLP</text>
        </svg>
        <div class="venn-zones">
          ${f.vsOthers.overlaps.zones.map(z => `<div class="vz vz-${z.key}">
            <p class="vz-who"><span class="vz-dots" aria-hidden="true"></span>${z.who}</p>
            <p class="vz-items">${z.items.join(" · ")}</p>
          </div>`).join("")}
        </div>
      </div>
      <p class="small muted" style="margin-top:10px">${f.vsOthers.overlaps.caveat}</p>` : ""}
      <div class="callout"><span class="ico">${icn("i-people"," c-teal")}</span><p>${f.vsOthers.note}</p></div>
    </div>`;

    const philTab = `<div data-panel="found" data-key="phil" class="hide">
      <p class="lede">${f.philosophy.intro}</p>
      <div class="grid g2" style="margin-top:14px">${f.philosophy.tenets.map(t => `<div class="card accent"><h2 style="font-size:1.12rem">${t.term}</h2><p>${t.body}</p></div>`).join("")}</div></div>`;

    const histTab = `<div data-panel="found" data-key="hist" class="hide">
      <p class="lede">${f.history.intro}</p>
      <div class="grid g2" style="margin-top:8px;align-items:start">
        <div><h2>A timeline</h2><div class="timeline">${f.history.timeline.map(t => `<div class="tl-item"><span class="yr">${t.year}</span><p>${t.text}</p></div>`).join("")}</div></div>
        <div><h2>Founders &amp; pioneers</h2><div class="deflist">${f.history.founders.map(p => `<div class="row"><dt>${p.name}</dt><dd>${p.role}</dd></div>`).join("")}</div></div>
      </div></div>`;

    const profTab = `<div data-panel="found" data-key="prof" class="hide">
      <h2>Who's who</h2><div class="grid g3">${f.profession.roles.map(r => `<div class="card"><h2 style="font-size:1.08rem">${r.term}</h2><p>${r.body}</p></div>`).join("")}</div>
      <h2 style="margin-top:26px">Education &amp; licensure</h2><div class="prose"><p>${f.profession.education}</p></div>
      <h3>Specialty certifications</h3><div class="chip-row">${f.profession.specialties.map(s => `<span class="chip" style="cursor:default">${s}</span>`).join("")}</div>
      <h2 style="margin-top:26px">Where OTs work — practice settings</h2>
      <div class="grid g3">${f.profession.settings.map(s => `<div class="card"><h3>${s.name}</h3><p class="small">${s.desc}</p></div>`).join("")}</div></div>`;

    main.innerHTML = `<div class="page">
      <p class="eyebrow">Foundations &amp; the profession</p>
      <h1 class="page-title">What occupational <em>therapy</em> is</h1>
      <div class="tabs" data-tabs="found" role="tablist">
        <button class="tab-btn active" data-key="what">What is OT</button>
        <button class="tab-btn" data-key="phil">Philosophy</button>
        <button class="tab-btn" data-key="hist">History</button>
        <button class="tab-btn" data-key="prof">The profession</button>
      </div>
      ${whatTab}${philTab}${histTab}${profTab}
      ${pageFoot("foundations")}
    </div>`;
    wireTabs();
    wireAccordions(); // F47: discipline-profile expansions
  }

  /* ---------- PILLARS (OTPF domain + process) ---------- */
  function renderPillars() {
    const d = F().domain, p = F().process;
    const occ = d.aspects.find(a => a.key === "occupations");
    const aspAcc = accordionHTML(d.aspects.map(a => ({
      title: a.name, sub: a.tagline,
      body: `<p>${a.detail}</p><div class="deflist">${a.children.map(ch => `<div class="row"><dt>${ch.name}</dt><dd>${ch.desc}</dd></div>`).join("")}</div>`
    })));

    main.innerHTML = `<div class="page">
      <p class="eyebrow">The OTPF-4 domain</p>
      <h1 class="page-title">The <em>pillars</em> of practice</h1>
      <p class="lede">${d.intro}</p>

      <h2 style="margin-top:30px">The nine areas of occupation</h2>
      <div class="grid g3">${occ.children.map(ch => `<div class="card accent-teal"><h3>${ch.name}</h3><p class="small">${ch.desc}</p></div>`).join("")}</div>

      <h2 style="margin-top:34px">The five aspects of the domain</h2>
      <p class="muted small">Tap to expand each pillar.</p>
      ${aspAcc}

      <hr class="divider"/>
      <p class="eyebrow">The OT process</p>
      <h2 class="section-head">How occupational therapy works</h2>
      <p class="lede">${p.intro}</p>
      <div class="grid g3" style="margin-top:16px">
        ${p.phases.map(ph => `<div class="card accent"><div class="card-meta">Phase</div><h2>${ph.name}</h2>${ph.steps.map(s => `<div style="margin-bottom:10px"><strong>${s.h}</strong><p class="small">${s.t}</p></div>`).join("")}</div>`).join("")}
      </div>

      <h2 style="margin-top:30px">Intervention approaches</h2>
      <div class="grid g3">${p.approaches.map(a => `<div class="card"><h3>${a.name}</h3><p class="small">${a.desc}</p></div>`).join("")}</div>

      <h2 style="margin-top:30px">Types of intervention</h2>
      <div class="grid g3">${p.interventionTypes.map(a => `<div class="card"><h3>${a.name}</h3><p class="small">${a.desc}</p></div>`).join("")}</div>
      ${pageFoot("pillars")}
    </div>`;
    wireAccordions();
  }

  /* ---------- MODELS ---------- */
  function renderModels() {
    const m = M();
    // F35 follow-up: de-kit the models page — the card grid + FoR accordions become THE INDEX
    // (chapter 04). Models are button-rows opening the existing drawer; FoR are native <details>.
    // Numbers 04·n run continuously across both sections so each plate is unique in the chapter.
    const nModels = m.occupationModels.length;
    main.innerHTML = `<div class="page">
      <p class="eyebrow">Theory that drives practice</p>
      <h1 class="page-title">Models &amp; <em>frames of reference</em></h1>
      <p class="lede">${m.intro}</p>

      <div class="idx">
        <section class="idx-sec">
          <header class="idx-head"><h2>Occupation-focused models of practice</h2><span class="idx-count">${nModels}</span></header>
          <p class="muted small" style="margin:4px 0 0">Open any model for its constructs, uses and related videos.</p>
          <ul class="idx-list" id="modelGrid">${m.occupationModels.map((mod, i) => `<li><button class="idx-row" data-model="${i}">
            <span class="idx-main"><span class="idx-no">04·${i + 1}</span><span class="idx-name">${mod.name}</span><span class="idx-leader" aria-hidden="true"></span><span class="tag teal">${mod.abbr}</span></span>
            <span class="idx-desc">${mod.summary}</span></button></li>`).join("")}</ul>
        </section>

        <section class="idx-sec">
          <header class="idx-head"><h2>Frames of reference</h2><span class="idx-count">${m.framesOfReference.length}</span></header>
          <p class="muted small" style="margin:4px 0 0">Frames of reference translate specific knowledge into ‘how-to’ guidance. Open any to expand.</p>
          <ul class="idx-list">${m.framesOfReference.map((fr, i) => `<li><details class="idx-x">
            <summary class="idx-row">
              <span class="idx-main"><span class="idx-no">04·${nModels + i + 1}</span><span class="idx-name">${fr.name}</span><span class="idx-leader" aria-hidden="true"></span><span class="idx-tgl" aria-hidden="true">+</span></span>
              <span class="idx-desc">${fr.basis}</span>
            </summary>
            <div class="idx-wrap"><div class="idx-detail">
              <p><strong>When it's used.</strong> ${fr.use}</p>
              <p><strong>Examples.</strong> ${fr.egs}</p>
            </div></div>
          </details></li>`).join("")}</ul>
        </section>
      </div>
      ${pageFoot("models")}
    </div>`;
    $$("#modelGrid [data-model]").forEach(btn => btn.addEventListener("click", () => openModel(+btn.dataset.model)));
  }
  function openModel(i) {
    const mod = M().occupationModels[i];
    // Pull related videos from the video data when present
    let vidHTML = "";
    if (mod.videos && mod.videos.length) {
      const all = window.OT.videos.buckets.find(b => b.key === "models");
      const picks = all ? all.items.filter(x => x.yt).slice(0, mod.videos.length) : [];
      if (picks.length) vidHTML = `<h3>Watch</h3><div class="grid g2">${picks.map(videoItemHTML).join("")}</div>`;
    }
    openDrawer(drawerShell(`${mod.abbr} · ${mod.type}`, mod.name, `
      <p class="muted small"><strong>Origin:</strong> ${mod.author}</p>
      <h3>In a nutshell</h3><p>${mod.summary}</p>
      <h3>Key constructs</h3>${listHTML(mod.constructs)}
      <h3>How it's used</h3><p>${mod.use}</p>
      ${vidHTML}
    `));
  }

  /* ---------- REASONING ---------- */
  function renderReasoning() {
    const r = R();
    const soap = r.documentation.soap.map(s => `<div class="card accent"><h2 style="font-size:1.05rem">${s.l}</h2><p class="small">${s.d}</p></div>`).join("");
    main.innerHTML = `<div class="page">
      <p class="eyebrow">How occupational therapists think</p>
      <h1 class="page-title">Clinical <em>reasoning</em></h1>
      <p class="lede">${r.intro}</p>

      <h2 style="margin-top:26px">The modes of reasoning</h2>
      <div class="grid g3">${r.types.map(t => `<div class="card lift"><div class="reason-ico">${icn(t.icon)}</div><h3>${t.name}</h3><p class="small">${t.body}</p><p class="small mono" style="color:var(--clay-deep)">${t.q}</p></div>`).join("")}</div>

      <div class="grid g2" style="margin-top:30px;align-items:start">
        <div><h2>From novice to expert</h2><p class="muted small">${r.expertise.intro}</p><div class="deflist">${r.expertise.levels.map(l => `<div class="row"><dt>${l.lvl}</dt><dd>${l.desc}</dd></div>`).join("")}</div></div>
        <div><h2>Top-down vs bottom-up</h2><p class="muted small">${r.topDownBottomUp.intro}</p>${r.topDownBottomUp.rows.map(x => `<div class="card" style="margin-bottom:12px"><h3>${x.d}</h3><p class="small">${x.body}</p></div>`).join("")}</div>
      </div>

      <hr class="divider"/>
      <h2 class="section-head">Documentation — the SOAP note</h2>
      <p class="lede">${r.documentation.intro}</p>
      <div class="grid g4" style="margin-top:14px">${soap}</div>
      <div class="callout tip" style="margin-top:16px"><span class="ico">${icn("i-pen"," c-teal")}</span><div><strong>Documentation tips</strong><ul class="ticks" style="margin-top:8px">${r.documentation.tips.map(t => `<li>${t}</li>`).join("")}</ul></div></div>

      <hr class="divider"/>
      <h2 class="section-head">Writing strong goals</h2>
      <p class="lede">${r.goals.intro}</p>
      <div class="grid g4" style="margin-top:14px">${r.goals.frameworks.map(g => `<div class="card accent-teal"><h2 style="font-size:1.2rem">${g.abbr}</h2><p class="small mono">${g.expand}</p><p class="small muted">${g.note}</p></div>`).join("")}</div>
      <div class="grid g2" style="margin-top:18px;align-items:start">
        <div class="card" style="border-left:4px solid var(--sage)"><h3>${icn("i-check"," c-sage")} Strong goals</h3><ul class="ticks">${r.goals.examplesGood.map(g => `<li>${g}</li>`).join("")}</ul></div>
        <div class="card" style="border-left:4px solid var(--clay)"><h3>${icn("i-cross"," c-clay")} Weak goals</h3><ul class="arrows" style="list-style:none;padding:0">${r.goals.examplesPoor.map(g => `<li style="padding-left:28px;position:relative"><span style="position:absolute;left:0;color:var(--clay-deep)">✗</span>${g}</li>`).join("")}</ul></div>
      </div>
      <p style="margin-top:18px"><a class="btn btn-clay" href="#/toolkit">Try the goal writer →</a></p>

      <hr class="divider"/>
      <h2 class="section-head">${r.caseWalkthrough.title}</h2>
      <div class="callout note"><span class="ico">${icn("i-steth"," c-ochre")}</span><p>${r.caseWalkthrough.client}</p></div>
      <div class="numbered" style="margin-top:18px">${r.caseWalkthrough.steps.map(s => `<div class="step"><div class="n"></div><div><h3>${s.mode}</h3><p>${s.text}</p></div></div>`).join("")}</div>
      <div class="callout tip" style="margin-top:16px"><span class="ico">${icn("i-target"," c-teal")}</span><p><strong>Outcome:</strong> ${r.caseWalkthrough.outcome}</p></div>
      ${pageFoot("reasoning")}
    </div>`;
  }

  /* ---------- EVIDENCE ---------- */
  function renderEvidence() {
    const e = E();
    main.innerHTML = `<div class="page">
      <p class="eyebrow">Doing what works</p>
      <h1 class="page-title">Evidence-based <em>practice</em></h1>
      <p class="lede">${e.intro}</p>

      <div class="callout warn" style="margin-top:18px"><span class="ico">${icn("i-compass"," c-clay")}</span><div><strong>How we rate &amp; flag evidence in this atlas</strong><p style="margin-top:6px">${RIG().methodology}</p></div></div>

      ${(() => { const cv = RIG().coverage; return cv ? `<div class="coverage-grid" style="margin-top:16px">
        <div class="card accent-teal"><p class="card-meta">Conditions</p><p><strong>${cv.cond.rated}/${cv.cond.total}</strong> carry an evidence rating · <strong>${cv.cond.verified}</strong> source-verified · <strong>${cv.cond.contested}</strong> flagged contested.</p></div>
        <div class="card accent-teal"><p class="card-meta">Assessments</p><p><strong>${cv.asmt.rated}/${cv.asmt.total}</strong> rated · <strong>${cv.asmt.verified}</strong> source-verified · <strong>${cv.asmt.contested}</strong> flagged contested.</p></div>
        <div class="card accent-teal"><p class="card-meta">Landmark studies</p><p><strong>${cv.study.rated}/${cv.study.total}</strong> tagged by strength · <strong>${cv.study.contested}</strong> flagged contested.</p></div>
      </div><p class="muted small" style="margin-top:6px">We show these numbers on purpose — an honest map includes where the evidence is thin or debated.</p>` : ""; })()}

      <h2 style="margin-top:26px">The five steps of EBP</h2>
      <div class="numbered">${e.steps.map(s => `<div class="step"><div class="n"></div><div><h3>${s.h}</h3><p>${s.t}</p></div></div>`).join("")}</div>

      <div class="grid g2" style="margin-top:30px;align-items:start">
        <div><h2>Building a PICO question</h2><p class="muted small">${e.pico.intro}</p>
          <div class="deflist">${e.pico.parts.map(p => `<div class="row"><dt>${p.l} — ${p.w}</dt><dd><em>${p.e}</em></dd></div>`).join("")}</div>
          <div class="callout tip" style="margin-top:12px"><span class="ico">${icn("i-help"," c-teal")}</span><p>${e.pico.example}</p></div>
          <p class="small muted">${e.pico.variants}</p>
          <p><a class="btn btn-ghost" href="#/toolkit">Build a PICO question →</a></p>
        </div>
        <div><h2>Levels of evidence</h2><p class="muted small">${e.levels.intro}</p>
          <div class="deflist">${e.levels.rows.map(r => `<div class="row"><dt>${r.lvl}</dt><dd>${r.d}</dd></div>`).join("")}</div>
          <div class="callout"><span class="ico">${icn("i-scale"," c-teal")}</span><p>${e.levels.note}</p></div>
        </div>
      </div>

      <hr class="divider"/>
      <h2>Where to find the evidence</h2>
      <div class="grid g3">${e.databases.map(d => `<a class="card lift" href="${d.url}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"><h3>${d.name} ↗</h3><p class="small">${d.what}</p></a>`).join("")}</div>

      <h2 style="margin-top:30px">Appraising the evidence</h2>
      <div class="grid g4">${e.appraisal.map(d => `<a class="card lift" href="${d.url}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"><h3>${d.name} ↗</h3><p class="small">${d.what}</p></a>`).join("")}</div>

      <hr class="divider"/>
      <h2>Landmark &amp; illustrative evidence</h2>
      <p class="muted small">Orientation to high-impact findings across OT — each tagged with an evidence-strength rating. Always appraise the current literature for your question.</p>
      <div class="table-wrap" style="margin-top:12px"><table class="data"><thead><tr><th>Area</th><th>Topic</th><th>Strength</th><th>What the evidence suggests</th><th>Source kind</th></tr></thead>
        <tbody>${e.keyStudies.map(s => `<tr><td><span class="tag teal">${s.area}</span></td><td><strong>${s.topic}</strong></td><td>${s.strength ? evMiniBadge({ strength: s.strength, confidence: s.confidence }) : "—"}</td><td>${s.finding}</td><td class="small muted">${s.kind}</td></tr>`).join("")}</tbody></table></div>
      <div class="callout warn" style="margin-top:14px"><span class="ico">${icn("i-warn"," c-clay")}</span><p>${e.caveat}</p></div>

      <h2 style="margin-top:30px">Major OT journals</h2>
      <div class="grid g3">${e.journals.map(j => `<a class="card lift" href="${j.url}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"><h3>${j.name} ↗</h3><p class="small muted">${j.pub}</p></a>`).join("")}</div>
      ${pageFoot("evidence")}
    </div>`;
  }

  /* ---------- CONDITIONS ---------- */
  let condFilter = "all", condQuery = "", condStrength = "all";
  // F36/F49: SINGLE source of truth for condition plate numbers. `07·n` = position within the
  // FULL category over window.OT.conditions order — stable regardless of active filters. Used by
  // BOTH renderConditions (index rows + "X of Y" counts) and openCondition (drawer stamp) so the
  // drawer's `PLATE 07·n` always equals the index row's number.
  function condPlates() {
    const plateNo = {}, perCat = {};
    window.OT.conditions.forEach(c => { perCat[c.cat] = (perCat[c.cat] || 0) + 1; plateNo[c.id] = perCat[c.cat]; });
    return { plateNo, perCat };
  }
  function condPlateNo(id) { return condPlates().plateNo[id]; }
  function renderConditions() {
    const cats = window.OT.conditionCategories;
    main.innerHTML = `<div class="page">
      <p class="eyebrow">The clinical atlas</p>
      <div class="lib-masthead">
        <h1 class="page-title"><em>Conditions</em> library</h1>
        <div class="field lib-search"><input type="text" id="condSearch" placeholder="Search conditions (e.g., stroke, autism, hand, dementia)…" value="${escapeHTML(condQuery)}" aria-label="Search conditions"></div>
      </div>
      <p class="lede">${window.OT.conditions.length} conditions OT addresses across the lifespan — each with OT's role, common assessments, sample goals, settings, an <strong>evidence-strength rating</strong> and reputable sources. <span class="muted">Tap an entry for the full profile.</span></p>
      <div class="chip-row" id="condChips">
        <button class="chip ${condFilter === "all" ? "active" : ""}" data-cat="all">All</button>
        ${cats.map(c => `<button class="chip ${condFilter === c.key ? "active" : ""}" data-cat="${c.key}">${icn(c.icon)} ${c.label}</button>`).join("")}
      </div>
      ${strengthChips(condStrength, "condStr")}
      <p class="count-note" id="condCount" aria-live="polite"></p>
      <div class="idx" id="condGrid"></div>
      ${pageFoot("conditions")}
    </div>`;
    const draw = () => {
      const q = condQuery.trim().toLowerCase();
      const items = window.OT.conditions.filter(c => {
        const okCat = condFilter === "all" || c.cat === condFilter;
        const okStr = condStrength === "all" || (c.evidence && c.evidence.strength === condStrength);
        const okQ = !q || (c.name + " " + c.desc + " " + c.ot.join(" ")).toLowerCase().includes(q);
        return okCat && okStr && okQ;
      });
      $("#condCount").textContent = `${items.length} condition${items.length === 1 ? "" : "s"}${condStrength !== "all" ? " · " + condStrength + " evidence" : ""}`;
      // F49 THE INDEX — plate numbers are STABLE (position within the full category, not the
      // filtered view) so 07·n matches the same condition regardless of active filters, and
      // equals the F36 drawer stamp `PLATE 07·n` (both go through condPlates()).
      const { plateNo, perCat } = condPlates();
      const secs = cats.filter(cat => condFilter === "all" || cat.key === condFilter)
        .map(cat => ({ cat, list: items.filter(i => i.cat === cat.key) }))
        .filter(s => s.list.length);
      $("#condGrid").innerHTML = secs.map(s => `<section class="idx-sec">
        <header class="idx-head"><h2>${icn(s.cat.icon)} ${s.cat.label}</h2><span class="idx-count">${s.list.length} of ${perCat[s.cat.key]}</span></header>
        <ul class="idx-list">${s.list.map(c => `<li><button class="idx-row" data-cond="${c.id}">
          <span class="idx-main"><span class="idx-no">07·${plateNo[c.id]}</span><span class="idx-name">${c.name}</span><span class="idx-leader" aria-hidden="true"></span>${c.evidence ? evMiniBadge(c.evidence) : `<span class="idx-set">${escapeHTML((c.settings || "").split("·")[0].trim())}</span>`}</span>
          <span class="idx-desc">${c.desc}</span></button></li>`).join("")}</ul>
      </section>`).join("") ||
        emptyState(`No conditions match${(condFilter !== "all" || condStrength !== "all" || q) ? ` your filters. <button type="button" class="text-btn" id="condClear">Clear filters</button>` : ". Try a different term."}`, "i-compass");
      $$("#condGrid [data-cond]").forEach(b => b.addEventListener("click", () => openCondition(b.dataset.cond)));
      const condClear = $("#condClear");
      if (condClear) condClear.addEventListener("click", () => {
        condFilter = "all"; condStrength = "all"; condQuery = "";
        const si = $("#condSearch"); if (si) si.value = "";
        $$("#condChips .chip").forEach(x => x.classList.toggle("active", x.dataset.cat === "all"));
        $$("#condStr .chip").forEach(x => x.classList.toggle("active", x.dataset.str === "all"));
        draw();
      });
    };
    $("#condSearch").addEventListener("input", e => { condQuery = e.target.value; draw(); });
    $$("#condChips .chip").forEach(ch => ch.addEventListener("click", () => {
      condFilter = ch.dataset.cat;
      $$("#condChips .chip").forEach(x => x.classList.toggle("active", x === ch));
      draw();
    }));
    $$("#condStr .chip").forEach(ch => ch.addEventListener("click", () => {
      condStrength = ch.dataset.str;
      $$("#condStr .chip").forEach(x => x.classList.toggle("active", x === ch));
      draw();
    }));
    draw();
  }
  // F54: match a condition's intervention lines to entries in the treatments compendium (ch. 15).
  // Score = fraction of the treatment's name/aka words present in the condition's ot[] line;
  // 0.6 threshold keeps generic words ("therapy", "training") from making false links.
  function relatedTreatments(c) {
    if (!window.OT.interventions || !c.ot) return [];
    const norm = s => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(w => w.length > 2);
    const found = new Map();
    c.ot.forEach(line => {
      const lw = norm(line);
      if (!lw.length) return;
      let best = null, bestScore = 0;
      window.OT.interventions.entries.forEach(e => {
        const hay = norm(e.name + " " + (e.aka || ""));
        if (!hay.length) return;
        const score = hay.filter(w => lw.includes(w)).length / hay.length;
        if (score > bestScore) { bestScore = score; best = e; }
      });
      if (bestScore >= 0.6 && best && !found.has(best.id)) found.set(best.id, best);
    });
    return [...found.values()].slice(0, 6);
  }
  // Map a drawer chip label ("Fugl-Meyer (UE)", "FIM / CARE") to the best assessments-library query.
  function bestAsmtQuery(label) {
    const norm = s => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(w => w.length > 1);
    const lw = norm(label);
    if (!lw.length) return null;
    let best = null, bestScore = 0;
    window.OT.assessments.forEach(a => {
      const hay = norm(a.name + " " + a.abbr);
      const score = lw.filter(w => hay.includes(w)).length / lw.length;
      if (score > bestScore) { bestScore = score; best = a; }
    });
    // Resolve to a real library tool, or null if this label isn't in the 58-tool library
    // (returning the raw label made the assessments filter match nothing → dead-end chips).
    return (bestScore >= 0.5 && best) ? (best.abbr && best.abbr !== "—" ? best.abbr : best.name) : null;
  }
  /* ---------- Inline glossary links in condition drawers (F3) ---------- */
  // Built once from the static glossary; regexes are reset (lastIndex) before every exec, so
  // caching the array across drawer opens is safe.
  let glossMatchers = null;
  function buildGlossMatchers() {
    const firstAlpha = s => { const m = s.match(/[A-Za-z]/); return m ? m[0].toLowerCase() : ""; };
    const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const out = [];
    RES().glossary.forEach(g => {
      const paren = g.t.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
      let base = paren ? paren[1] : g.t;
      const abbr = paren ? paren[2] : "";
      base = base.replace(/®/g, "").split("/")[0].trim(); // "Remediation / restorative" → "Remediation"
      if (base.length >= 3) {
        // full term: case-INSENSITIVE, whole-word
        out.push({ key: g.t, term: g, len: base.length, re: new RegExp("\\b" + esc(base) + "\\b", "gi") });
      }
      // Only treat the parenthetical as an abbreviation when it shares the term's first letter.
      // This admits ADLs/IADLs/EBP/ROM… but rejects qualifiers like "Volition (MOHO)" or
      // "Context (OTPF-4)" whose paren text is a model/framework tag, not an abbreviation.
      if (abbr && /[A-Za-z]/.test(abbr) && firstAlpha(abbr) === firstAlpha(base)) {
        const stem = abbr.replace(/s$/, "");           // strip only a lowercase plural s ("ADLs"→"ADL"; "GAS" kept)
        if (stem.length >= 2) {
          // acronym: case-SENSITIVE (so "AT"/"GAS" never link the words "at"/"gas"); optional plural s
          out.push({ key: g.t, term: g, len: stem.length, re: new RegExp("\\b" + esc(stem) + "s?\\b", "g") });
        }
      }
    });
    return out;
  }
  function linkifyGlossary(root) {
    if (!root) return;
    const body = root.querySelector(".drawer-body") || root; // drawer → its body; a page → the container itself
    if (!body) return;
    if (!glossMatchers) glossMatchers = buildGlossMatchers();
    const state = { used: new Set(), count: 0, cap: 4 };
    const titleFor = d => (d && d.length > 80) ? d.slice(0, 80).replace(/\s+\S*$/, "").trim() + "…" : (d || "");
    const makeLink = (text, term) => {
      const a = document.createElement("a");
      a.className = "gloss";
      a.href = "#/resources";
      a.textContent = text;                            // exact matched substring — original casing preserved
      a.title = titleFor(term.d);
      a.setAttribute("data-gloss", term.t);
      a.addEventListener("click", e => { e.preventDefault(); glossQuery = term.t; closeDrawer(); go("resources"); });
      return a;
    };
    // leftmost match at/after `from`; ties broken by longest span (prefer "Instrumental ADLs" over "ADLs")
    const findFrom = (text, from) => {
      let best = null;
      for (const m of glossMatchers) {
        if (state.used.has(m.key)) continue;
        m.re.lastIndex = from;
        const mm = m.re.exec(text);
        if (!mm) continue;
        if (!best || mm.index < best.index || (mm.index === best.index && mm[0].length > best.len)) {
          best = { index: mm.index, len: mm[0].length, matched: mm[0], term: m.term, key: m.key };
        }
      }
      return best;
    };
    const processNode = node => {
      const text = node.nodeValue;
      const parts = []; let cursor = 0;
      while (state.count < state.cap) {
        const best = findFrom(text, cursor);
        if (!best) break;
        if (best.index > cursor) parts.push(text.slice(cursor, best.index));
        parts.push({ matched: best.matched, term: best.term });
        state.used.add(best.key); state.count++;
        cursor = best.index + best.len;
      }
      if (!parts.length) return;                       // untouched → leave the original text node in place
      if (cursor < text.length) parts.push(text.slice(cursor));
      const frag = document.createDocumentFragment();
      parts.forEach(p => frag.appendChild(typeof p === "string" ? document.createTextNode(p) : makeLink(p.matched, p.term)));
      node.parentNode.replaceChild(frag, node);
    };
    body.querySelectorAll("p").forEach(p => {
      if (state.count >= state.cap) return;
      const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT, {
        acceptNode(n) {
          if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          for (let el = n.parentNode; el && el !== p; el = el.parentNode) {
            if (el.nodeName === "A") return NodeFilter.FILTER_REJECT; // never nest inside an existing link
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      const nodes = []; let n; while ((n = walker.nextNode())) nodes.push(n); // collect before mutating
      nodes.forEach(tn => { if (state.count < state.cap) processNode(tn); });
    });
  }

  function openCondition(id) {
    const c = window.OT.conditions.find(x => x.id === id); if (!c) return;
    const catObj = window.OT.conditionCategories.find(k => k.key === c.cat) || {};
    const cat = catObj.label || "";
    const pub = getMode() === "public";
    // F36 specimen plate: category-tinted header band. Tint = c.cat (CSS maps each key → a tint).
    const setParts = (c.settings || "").split("·").map(x => x.trim()).filter(Boolean).slice(0, 2);
    const plate = {
      tint: c.cat,
      icon: catObj.icon ? icn(catObj.icon) : "",
      stamp: `PLATE 07·${condPlateNo(c.id)} — ${escapeHTML(cat.toUpperCase())}`,
      taxon: escapeHTML([cat].concat(setParts).join(" · "))
    };
    // F21: cross-link to the topic-matched video bucket (spec has no bucket → omitted)
    const VID_MAP = { neuro: "stroke", hand: "hand", peds: "peds", mh: "mh", geri: "geri" };
    const relBucket = VID_MAP[c.cat] ? window.OT.videos.buckets.find(b => b.key === VID_MAP[c.cat]) : null;
    const relBucketIdx = relBucket ? window.OT.videos.buckets.indexOf(relBucket) : -1;
    const relVideos = relBucket ? `<h3>Related videos</h3><div class="chip-row"><button type="button" class="chip" data-vidbucket="${relBucketIdx}">${icn("i-play")} Watch “${escapeHTML(relBucket.title)}” ↗</button></div>` : "";
    // F29: sibling conditions in the same category, to keep exploration going
    const siblings = window.OT.conditions.filter(x => x.cat === c.cat && x.id !== c.id).slice(0, 5);
    const relConds = siblings.length ? `<h3>Related conditions</h3><div class="chip-row">${siblings.map(s => `<button class="chip" data-cond="${s.id}">${escapeHTML(s.name)} →</button>`).join("")}</div>` : "";
    // F54: cross-link into the treatments compendium (clinical mode, like assessments)
    const relTx = pub ? [] : relatedTreatments(c);
    const relTxHTML = relTx.length ? `<h3>Related treatments</h3><p class="muted small" style="margin:0 0 8px">Evidence-rated entries in the treatments compendium.</p><div class="chip-row">${relTx.map(t => `<button class="chip" data-tx="${escapeHTML(t.name)}">${escapeHTML(t.name)} ↗</button>`).join("")}</div>` : "";
    const body = `
      <p>${c.desc}</p>
      <h3>${pl("Impact on occupation &amp; daily life", "How it affects everyday life")}</h3><p>${c.impact}</p>
      <h3>${pl("OT's role &amp; common interventions", "How OT can help")}</h3>${listHTML(c.ot)}
      ${c.evidence ? `<h3>How strong is the evidence?</h3><div class="ev-dialwrap">${evidenceDial(c.evidence)}${evidenceBlock(c.evidence)}</div>` : ""}
      ${!pub ? `<h3>Relevant assessments</h3><p class="muted small" style="margin:0 0 8px">Tap a highlighted tool to open it in the assessments library.</p><div class="chip-row">${c.assess.map(a => { const q = bestAsmtQuery(a); return q ? `<button class="chip" data-asmt="${escapeHTML(q)}">${escapeHTML(a)} ↗</button>` : `<span class="chip chip-static" title="Not yet in the assessments library">${escapeHTML(a)}</span>`; }).join("")}</div>` : ""}
      ${relTxHTML}
      <h3>${pl("Example goals", "What progress can look like")}</h3>${listHTML(c.goals)}
      <h3>${pl("Typical settings", "Where this kind of OT happens")}</h3><p>${c.settings}</p>
      ${pub ? `<h3>Accessing OT — by country</h3><p class="muted small">Routes and funding differ by country — find yours.</p>${countryFactsHTML(true)}` : ""}
      ${relConds}
      ${relVideos}
      ${c.links && c.links.length ? `<h3>Learn more</h3>${linksHTML(c.links)}` : ""}
    `;
    openDrawer(drawerShell(cat, c.name, body, plate));
    // F23: share / copy-link (conditions only — drawerShell is shared with model drawers)
    const dHead = document.querySelector("#drawerEl .drawer-head");
    if (dHead) {
      const sb = document.createElement("button");
      sb.type = "button"; sb.className = "icon-btn drawer-share";
      sb.setAttribute("aria-label", "Share or copy a link to this condition");
      sb.title = "Share / copy link";
      sb.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 3v11M8 7l4-4 4 4M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      dHead.appendChild(sb);
      sb.addEventListener("click", () => {
        const url = location.href;
        if (navigator.share) { navigator.share({ title: `${c.name} — The OT Atlas`, url }).catch(() => {}); return; }
        const done = () => { announce("Link copied to clipboard"); sb.title = "Link copied ✓"; setTimeout(() => { sb.title = "Share / copy link"; }, 2000); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done).catch(() => { fallbackCopy(url); done(); });
        else { fallbackCopy(url); done(); }
      });
    }
    $$("#drawerEl [data-asmt]").forEach(b => b.addEventListener("click", () => {
      asmtQuery = b.dataset.asmt; asmtFilter = "all"; asmtStrength = "all"; // already resolved to a real tool
      closeDrawer(); go("assessments");
    }));
    $$("#drawerEl [data-cond]").forEach(b => b.addEventListener("click", () => openCondition(b.dataset.cond)));
    $$("#drawerEl [data-tx]").forEach(b => b.addEventListener("click", () => {
      txQuery = b.dataset.tx; txFilter = "all"; txStrength = "all";
      closeDrawer(); go("interventions");
    }));
    $$("#drawerEl [data-vidbucket]").forEach(b => b.addEventListener("click", () => {
      const bi = +b.dataset.vidbucket; closeDrawer(); go("videos");
      setTimeout(() => { const t = document.getElementById("vid-b" + bi); if (!t) return;
        const tb = document.querySelector(".topbar"), jb = document.querySelector("#vidJump");
        const off = (tb ? tb.offsetHeight : 0) + (jb ? jb.offsetHeight : 0) + 14;
        window.scrollTo({ top: Math.max(0, t.getBoundingClientRect().top + window.scrollY - off), behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }, 90);
    }));
    try { linkifyGlossary(document.getElementById("drawerEl")); } catch (e) {} // F3: never block the drawer
    if (history.replaceState) history.replaceState(null, "", "#/conditions/" + id);
    setMeta(c.name, c.desc);
  }

  /* ---------- ASSESSMENTS ---------- */
  let asmtFilter = "all", asmtQuery = "", asmtStrength = "all";
  function renderAssessments() {
    const cats = window.OT.assessmentCategories;
    main.innerHTML = `<div class="page">
      <p class="eyebrow">The measurement shelf</p>
      <div class="lib-masthead">
        <h1 class="page-title">Assessments &amp; <em>outcome measures</em></h1>
        <div class="field lib-search"><input type="text" id="asmtSearch" placeholder="Search assessments (e.g., COPM, balance, cognition)…" value="${escapeHTML(asmtQuery)}" aria-label="Search assessments"></div>
      </div>
      <p class="lede">${window.OT.assessments.length} standardised tools OTs use — what each measures, who it's for, key notes, and an <strong>evidence-strength rating</strong> with sources and bias flags.</p>
      <div class="chip-row sticky-jump" id="asmtChips">
        <button class="chip ${asmtFilter === "all" ? "active" : ""}" data-cat="all">All</button>
        ${cats.map(c => `<button class="chip ${asmtFilter === c ? "active" : ""}" data-cat="${c}">${c}</button>`).join("")}
      </div>
      ${strengthChips(asmtStrength, "asmtStr")}
      <p class="count-note" id="asmtCount" aria-live="polite"></p>
      <div id="asmtList"></div>
      ${pageFoot("assessments")}
    </div>`;
    const draw = () => {
      const q = asmtQuery.trim().toLowerCase();
      const items = window.OT.assessments.filter(a => {
        const okCat = asmtFilter === "all" || a.cat === asmtFilter;
        const okStr = asmtStrength === "all" || (a.evidence && a.evidence.strength === asmtStrength);
        const okQ = !q || (a.name + " " + a.abbr + " " + a.measures + " " + a.pop).toLowerCase().includes(q);
        return okCat && okStr && okQ;
      });
      $("#asmtCount").textContent = `${items.length} tool${items.length === 1 ? "" : "s"}${asmtStrength !== "all" ? " · " + asmtStrength + " evidence" : ""}`;
      // F49 THE INDEX — stable 08·n numbers (position within full category); rows are native
      // <details> so every field the old cards showed lives in the disclosure body.
      const plateNo = new Map(), perCat = {};
      window.OT.assessments.forEach(a => { perCat[a.cat] = (perCat[a.cat] || 0) + 1; plateNo.set(a, perCat[a.cat]); });
      const secs = cats.filter(c => asmtFilter === "all" || asmtFilter === c)
        .map(c => ({ c, list: items.filter(i => i.cat === c) }))
        .filter(s => s.list.length);
      $("#asmtList").innerHTML = secs.map(s => `<section class="idx-sec">
        <header class="idx-head"><h2>${s.c}</h2><span class="idx-count">${s.list.length} of ${perCat[s.c]}</span></header>
        <ul class="idx-list">${s.list.map(a => `<li><details class="idx-x">
          <summary class="idx-row">
            <span class="idx-main"><span class="idx-no">08·${plateNo.get(a)}</span><span class="idx-name">${a.name}</span><span class="idx-leader" aria-hidden="true"></span>${a.abbr && a.abbr !== "—" ? `<span class="tag teal">${a.abbr}</span>` : ""}${a.evidence ? evMiniBadge(a.evidence) : ""}<span class="idx-tgl" aria-hidden="true">+</span></span>
            <span class="idx-desc">${a.measures}</span>
          </summary>
          <div class="idx-wrap"><div class="idx-detail">
            <p><strong>Population.</strong> ${a.pop}</p>
            <p><strong>Notes.</strong> ${a.notes}</p>
            ${a.evidence ? `<div class="ev-row">${evidenceBadge(a.evidence)}</div>${a.evidence.note ? `<p class="ev-note">${a.evidence.note}</p>` : ""}${biasHTML(a.evidence)}${sourceChips(a.evidence)}` : ""}
          </div></div>
        </details></li>`).join("")}</ul>
      </section>`).join("") || emptyState(`No assessments match${(asmtFilter !== "all" || asmtStrength !== "all" || asmtQuery.trim()) ? ` your filters. <button type="button" class="text-btn" id="asmtClear">Clear filters</button>` : "."}`, "i-compass");
      const asmtClear = $("#asmtClear");
      if (asmtClear) asmtClear.addEventListener("click", () => {
        asmtFilter = "all"; asmtStrength = "all"; asmtQuery = "";
        const si = $("#asmtSearch"); if (si) si.value = "";
        $$("#asmtChips .chip").forEach(x => x.classList.toggle("active", x.dataset.cat === "all"));
        $$("#asmtStr .chip").forEach(x => x.classList.toggle("active", x.dataset.str === "all"));
        draw();
      });
    };
    $("#asmtSearch").addEventListener("input", e => { asmtQuery = e.target.value; draw(); });
    $$("#asmtChips .chip").forEach(ch => ch.addEventListener("click", () => {
      asmtFilter = ch.dataset.cat;
      $$("#asmtChips .chip").forEach(x => x.classList.toggle("active", x === ch));
      draw();
    }));
    $$("#asmtStr .chip").forEach(ch => ch.addEventListener("click", () => {
      asmtStrength = ch.dataset.str;
      $$("#asmtStr .chip").forEach(x => x.classList.toggle("active", x === ch));
      draw();
    }));
    draw();
  }

  /* ---------- F50 THE DIRECTORY (chapter 13 — the atlas's appendix) ---------- */
  let dirFilter = "all", dirQuery = "";
  function renderDirectory() {
    const D = window.OT.directory;
    if (!D) { main.innerHTML = `<div class="page"><p class="muted">The directory data didn't load.</p></div>`; return; }
    main.innerHTML = `<div class="page">
      <p class="eyebrow">Reference library</p>
      <h1 class="page-title">The OT <em>directory</em></h1>
      <p class="lede">${D.entries.length} external places to learn OT — YouTube channels, CEU providers, websites, podcasts, organisations and communities — each with who runs it, what it sells, and an honest note on reputation and bias. <span class="muted">A curated guide, not a census.</span></p>
      <div class="field" style="max-width:440px;margin-top:18px"><input type="text" id="dirSearch" placeholder="Search the directory (e.g., Medbridge, pediatric, podcast)…" value="${escapeHTML(dirQuery)}" aria-label="Search the directory"></div>
      <div class="chip-row" id="dirChips">
        <button class="chip ${dirFilter === "all" ? "active" : ""}" data-sec="all">All</button>
        ${D.sections.map(s => `<button class="chip ${dirFilter === s.key ? "active" : ""}" data-sec="${s.key}">${s.label}</button>`).join("")}
      </div>
      <p class="count-note" id="dirCount" aria-live="polite"></p>
      <div class="idx" id="dirList"></div>
      <figure class="fig" style="margin-top:36px">
        <figcaption class="fig-cap"><span class="fig-no">FIG. 13·A</span> How this directory was curated — and why you should still check for yourself.</figcaption>
        <p class="fig-body">${D.meta.method}</p>
        <p class="fig-eg">${D.meta.caveat}</p>
      </figure>
      ${pageFoot("directory")}
    </div>`;
    const draw = () => {
      const q = dirQuery.trim().toLowerCase();
      const items = D.entries.filter(e => {
        const okSec = dirFilter === "all" || e.sec === dirFilter;
        const okQ = !q || [e.name, e.focus, e.who, e.bg, e.sells, e.reput, e.bias].filter(Boolean).join(" ").toLowerCase().includes(q);
        return okSec && okQ;
      });
      $("#dirCount").textContent = `${items.length} ${items.length === 1 ? "entry" : "entries"}`;
      // Stable 13·n numbers: position within the full section, filter-independent (F49 rule).
      const plateNo = new Map(), perSec = {};
      D.entries.forEach(e => { perSec[e.sec] = (perSec[e.sec] || 0) + 1; plateNo.set(e, perSec[e.sec]); });
      const host = u => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch (err) { return u; } };
      const secs = D.sections.filter(s => dirFilter === "all" || dirFilter === s.key)
        .map(s => ({ s, list: items.filter(i => i.sec === s.key) }))
        .filter(x => x.list.length);
      $("#dirList").innerHTML = secs.map(x => `<section class="idx-sec">
        <header class="idx-head"><h2>${x.s.label}</h2><span class="idx-count">${x.list.length} of ${perSec[x.s.key]}</span></header>
        <ul class="idx-list">${x.list.map(e => `<li><details class="idx-x">
          <summary class="idx-row">
            <span class="idx-main"><span class="idx-no">13·${plateNo.get(e)}</span><span class="idx-name">${e.name}</span><span class="idx-leader" aria-hidden="true"></span>${/^free\b/i.test(e.sells || "") ? `<span class="tag teal">free</span>` : ""}<span class="idx-tgl" aria-hidden="true">+</span></span>
            <span class="idx-desc">${e.focus || ""}</span>
          </summary>
          <div class="idx-wrap"><div class="idx-detail">
            ${e.who ? `<p><strong>Who.</strong> ${e.who}${e.bg ? ` — ${e.bg}` : ""}</p>` : (e.bg ? `<p><strong>Background.</strong> ${e.bg}</p>` : "")}
            ${e.since || e.country ? `<p><strong>Since.</strong> ${[e.since, e.country].filter(Boolean).join(" · ")}</p>` : ""}
            ${e.sells ? `<p><strong>Costs &amp; sells.</strong> ${e.sells}</p>` : ""}
            ${e.reput ? `<p><strong>Reputation.</strong> ${e.reput}</p>` : ""}
            ${e.bias ? `<p><strong>Bias watch.</strong> ${e.bias}</p>` : ""}
            <p><a href="${e.url}" target="_blank" rel="noopener">Visit ${host(e.url)} ↗</a></p>
          </div></div>
        </details></li>`).join("")}</ul>
      </section>`).join("") ||
        emptyState(`Nothing matches${(dirFilter !== "all" || q) ? ` your filters. <button type="button" class="text-btn" id="dirClear">Clear filters</button>` : "."}`, "i-obj-mug");
      const dirClear = $("#dirClear");
      if (dirClear) dirClear.addEventListener("click", () => {
        dirFilter = "all"; dirQuery = "";
        const si = $("#dirSearch"); if (si) si.value = "";
        $$("#dirChips .chip").forEach(x => x.classList.toggle("active", x.dataset.sec === "all"));
        draw();
      });
    };
    $("#dirSearch").addEventListener("input", e => { dirQuery = e.target.value; draw(); });
    $$("#dirChips .chip").forEach(ch => ch.addEventListener("click", () => {
      dirFilter = ch.dataset.sec;
      $$("#dirChips .chip").forEach(x => x.classList.toggle("active", x === ch));
      draw();
    }));
    draw();
  }

  /* ---------- F53 THE TREATMENTS (chapter 15 — treatments & protocols) ---------- */
  let txFilter = "all", txStrength = "all", txQuery = "";
  function renderInterventions() {
    const T = window.OT.interventions;
    if (!T) { main.innerHTML = `<div class="page"><p class="muted">The treatments data didn't load.</p></div>`; return; }
    main.innerHTML = `<div class="page">
      <p class="eyebrow">What OT does, measured</p>
      <h1 class="page-title">Treatments &amp; <em>protocols</em></h1>
      <p class="lede">${T.entries.length} interventions and protocols OTs use — what each one is, the dose where trials specify one, how strong the evidence is on the same five-step scale as the rest of this atlas, and what research, practitioners, and clients actually say. <span class="muted">Drafted from published evidence ${T.meta.reviewedOn.slice(0, 7)}; pending clinician review. Educational — not a substitute for individualised care.</span></p>
      <div class="field" style="max-width:440px;margin-top:18px"><input type="text" id="txSearch" placeholder="Search treatments (e.g., CIMT, sensory, tendon)…" value="${escapeHTML(txQuery)}" aria-label="Search treatments"></div>
      <div class="chip-row" id="txChips">
        <button class="chip ${txFilter === "all" ? "active" : ""}" data-sec="all">All</button>
        ${T.sections.map(sc => `<button class="chip ${txFilter === sc.key ? "active" : ""}" data-sec="${sc.key}">${sc.label}</button>`).join("")}
      </div>
      ${strengthChips(txStrength, "txStr")}
      <p class="count-note" id="txCount" aria-live="polite"></p>
      <div class="idx" id="txList"></div>
      <figure class="fig" style="margin-top:36px">
        <figcaption class="fig-cap"><span class="fig-no">FIG. 15·A</span> How this compendium was built — and how to read it.</figcaption>
        <p class="fig-body">${T.meta.method}</p>
        <p class="fig-eg">${T.meta.caveat}</p>
      </figure>
      ${pageFoot("interventions")}
    </div>`;
    const draw = () => {
      const q = txQuery.trim().toLowerCase();
      const items = T.entries.filter(e => {
        const okSec = txFilter === "all" || e.sec === txFilter;
        const okStr = txStrength === "all" || (e.evidence && e.evidence.strength === txStrength);
        const okQ = !q || [e.name, e.aka, e.what, e.pop, e.research, e.practitioners, e.patients].filter(Boolean).join(" ").toLowerCase().includes(q);
        return okSec && okStr && okQ;
      });
      $("#txCount").textContent = `${items.length} ${items.length === 1 ? "treatment" : "treatments"}${txStrength !== "all" ? " · " + txStrength + " evidence" : ""}`;
      const plateNo = new Map(), perSec = {};
      T.entries.forEach(e => { perSec[e.sec] = (perSec[e.sec] || 0) + 1; plateNo.set(e, perSec[e.sec]); });
      const secs = T.sections.filter(sc => txFilter === "all" || txFilter === sc.key)
        .map(sc => ({ sc, list: items.filter(i => i.sec === sc.key) }))
        .filter(x => x.list.length);
      $("#txList").innerHTML = secs.map(x => `<section class="idx-sec">
        <header class="idx-head"><h2>${x.sc.label}</h2><span class="idx-count">${x.list.length} of ${perSec[x.sc.key]}</span></header>
        <ul class="idx-list">${x.list.map(e => `<li><details class="idx-x">
          <summary class="idx-row">
            <span class="idx-main"><span class="idx-no">15·${plateNo.get(e)}</span><span class="idx-name">${e.name}</span><span class="idx-leader" aria-hidden="true"></span>${e.aka ? `<span class="tag teal">${escapeHTML(e.aka)}</span>` : ""}${e.evidence ? evMiniBadge(e.evidence) : ""}<span class="idx-tgl" aria-hidden="true">+</span></span>
            <span class="idx-desc">${e.pop ? `${escapeHTML(e.pop)} — ` : ""}${e.what ? e.what.split(". ")[0] + "." : ""}</span>
          </summary>
          <div class="idx-wrap"><div class="idx-detail">
            ${e.what ? `<p><strong>What it is.</strong> ${e.what}</p>` : ""}
            ${e.protocol ? `<p><strong>Protocol.</strong> ${e.protocol}</p>` : ""}
            ${e.evidence ? `<div class="ev-row">${evidenceBadge(e.evidence)}</div>${e.evidence.note ? `<p class="ev-note">${e.evidence.note}</p>` : ""}${sourceChips(e.evidence)}` : ""}
            ${e.research ? `<p><strong>Research says.</strong> ${e.research}</p>` : ""}
            ${e.practitioners ? `<p><strong>Practitioners say.</strong> ${e.practitioners}</p>` : ""}
            ${e.patients ? `<p><strong>Clients &amp; families.</strong> ${e.patients}</p>` : ""}
            ${e.training ? `<p><strong>Training &amp; cost.</strong> ${e.training}</p>` : ""}
            ${e.settings ? `<p><strong>Settings.</strong> ${escapeHTML(e.settings)}</p>` : ""}
            ${e.caution ? `<p><strong>Take care.</strong> ${e.caution}</p>` : ""}
          </div></div>
        </details></li>`).join("")}</ul>
      </section>`).join("") ||
        emptyState(`Nothing matches${(txFilter !== "all" || txStrength !== "all" || q) ? ` your filters. <button type="button" class="text-btn" id="txClear">Clear filters</button>` : "."}`);
      const txClear = $("#txClear");
      if (txClear) txClear.addEventListener("click", () => {
        txFilter = "all"; txStrength = "all"; txQuery = "";
        const si = $("#txSearch"); if (si) si.value = "";
        $$("#txChips .chip").forEach(c => c.classList.toggle("active", c.dataset.sec === "all"));
        $$("#txStr .chip").forEach(c => c.classList.toggle("active", c.dataset.str === "all"));
        draw();
      });
    };
    $("#txSearch").addEventListener("input", e => { txQuery = e.target.value; draw(); });
    $$("#txChips .chip").forEach(ch => ch.addEventListener("click", () => {
      txFilter = ch.dataset.sec;
      $$("#txChips .chip").forEach(c => c.classList.toggle("active", c === ch));
      draw();
    }));
    $$("#txStr .chip").forEach(ch => ch.addEventListener("click", () => {
      txStrength = ch.dataset.str;
      $$("#txStr .chip").forEach(c => c.classList.toggle("active", c === ch));
      draw();
    }));
    draw();
  }

  /* ---------- F51 THE BULLETIN (chapter 14 — notes to this edition) ---------- */
  let bulCat = "all", bulRegion = "all", bulQuery = "";
  function renderBulletin() {
    const B = window.OT.bulletin;
    if (!B) { main.innerHTML = `<div class="page"><p class="muted">The bulletin data didn't load.</p></div>`; return; }
    const regions = [...new Set(B.entries.map(e => e.region))];
    main.innerHTML = `<div class="page">
      <p class="eyebrow">Notes to this edition</p>
      <h1 class="page-title">What&rsquo;s <em>changed</em></h1>
      <p class="lede">A dated log of changes to the profession, the evidence base, licensure and funding — US-first, with the global picture. Each note says what changed, why it matters, and where it's from. <span class="muted">Last reviewed ${B.meta.reviewedOn}.</span></p>
      <div class="field" style="max-width:440px;margin-top:18px"><input type="text" id="bulSearch" placeholder="Search the bulletin (e.g., compact, Medicare, Cochrane)…" value="${escapeHTML(bulQuery)}" aria-label="Search the bulletin"></div>
      <div class="chip-row" id="bulCats">
        <button class="chip ${bulCat === "all" ? "active" : ""}" data-cat="all">All topics</button>
        ${B.categories.map(c => `<button class="chip ${bulCat === c.key ? "active" : ""}" data-cat="${c.key}">${c.label}</button>`).join("")}
      </div>
      <div class="chip-row" id="bulRegions" style="margin-top:6px">
        <button class="chip ${bulRegion === "all" ? "active" : ""}" data-region="all">All regions</button>
        ${regions.map(r => `<button class="chip ${bulRegion === r ? "active" : ""}" data-region="${r}">${escapeHTML(B.regionLabels && B.regionLabels[r] || r)}</button>`).join("")}
      </div>
      <p class="count-note" id="bulCount" aria-live="polite"></p>
      <div class="idx" id="bulList"></div>
      <figure class="fig" style="margin-top:36px">
        <figcaption class="fig-cap"><span class="fig-no">FIG. 14·A</span> How this log is kept — and its honest limits.</figcaption>
        <p class="fig-body">${B.meta.method}</p>
        <p class="fig-eg">${B.meta.caveat}</p>
      </figure>
      ${pageFoot("bulletin")}
    </div>`;
    const catLabel = k => { const c = B.categories.find(x => x.key === k); return c ? c.label : k; };
    const monthShow = d => { const [y, m] = d.split("-"); return (m ? ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][+m - 1] + " " : "") + y; };
    const draw = () => {
      const q = bulQuery.trim().toLowerCase();
      const items = B.entries.filter(e => {
        const okC = bulCat === "all" || e.cat === bulCat;
        const okR = bulRegion === "all" || e.region === bulRegion;
        const okQ = !q || [e.title, e.body, e.why, e.cat, e.region].filter(Boolean).join(" ").toLowerCase().includes(q);
        return okC && okR && okQ;
      }).slice().sort((a, b) => b.date.localeCompare(a.date));
      $("#bulCount").textContent = `${items.length} ${items.length === 1 ? "note" : "notes"}`;
      const years = [...new Set(items.map(e => e.date.slice(0, 4)))];
      $("#bulList").innerHTML = years.map(y => { const list = items.filter(e => e.date.slice(0, 4) === y); return `<section class="idx-sec">
        <header class="idx-head"><h2>${y}</h2><span class="idx-count">${list.length} ${list.length === 1 ? "note" : "notes"}</span></header>
        <ul class="idx-list">${list.map(e => `<li><details class="idx-x">
          <summary class="idx-row">
            <span class="idx-main"><span class="idx-no idx-no-date">${monthShow(e.date)}</span><span class="idx-name">${e.title}</span><span class="idx-leader" aria-hidden="true"></span><span class="idx-set">${catLabel(e.cat)} · ${escapeHTML(B.regionLabels && B.regionLabels[e.region] || e.region)}</span><span class="idx-tgl" aria-hidden="true">+</span></span>
            <span class="idx-desc">${e.summary || ""}</span>
          </summary>
          <div class="idx-wrap"><div class="idx-detail">
            <p><strong>What changed.</strong> ${e.body}</p>
            ${e.why ? `<p><strong>Why it matters.</strong> ${e.why}</p>` : ""}
            ${e.status ? `<p><strong>Status.</strong> ${e.status}</p>` : ""}
            ${e.sources && e.sources.length ? `<p><strong>Sources.</strong> ${e.sources.map(s => `<a href="${s.u}" target="_blank" rel="noopener">${escapeHTML(s.l)} ↗</a>`).join(" · ")}</p>` : ""}
          </div></div>
        </details></li>`).join("")}</ul>
      </section>`; }).join("") ||
        emptyState(`Nothing matches${(bulCat !== "all" || bulRegion !== "all" || q) ? ` your filters. <button type="button" class="text-btn" id="bulClear">Clear filters</button>` : "."}`, "i-compass");
      const bulClear = $("#bulClear");
      if (bulClear) bulClear.addEventListener("click", () => {
        bulCat = "all"; bulRegion = "all"; bulQuery = "";
        const si = $("#bulSearch"); if (si) si.value = "";
        $$("#bulCats .chip").forEach(x => x.classList.toggle("active", x.dataset.cat === "all"));
        $$("#bulRegions .chip").forEach(x => x.classList.toggle("active", x.dataset.region === "all"));
        draw();
      });
    };
    $("#bulSearch").addEventListener("input", e => { bulQuery = e.target.value; draw(); });
    $$("#bulCats .chip").forEach(ch => ch.addEventListener("click", () => {
      bulCat = ch.dataset.cat;
      $$("#bulCats .chip").forEach(x => x.classList.toggle("active", x === ch));
      draw();
    }));
    $$("#bulRegions .chip").forEach(ch => ch.addEventListener("click", () => {
      bulRegion = ch.dataset.region;
      $$("#bulRegions .chip").forEach(x => x.classList.toggle("active", x === ch));
      draw();
    }));
    draw();
  }

  /* ---------- VIDEOS ---------- */
  function renderVideos() {
    const v = window.OT.videos;
    main.innerHTML = `<div class="page">
      <p class="eyebrow">Watch &amp; learn</p>
      <h1 class="page-title">Video <em>library</em></h1>
      <p class="lede">${v.note}</p>
      <div class="chip-row sticky-jump" id="vidJump" role="group" aria-label="Jump to a video category">
        ${v.buckets.map((b, i) => `<button class="chip" type="button" data-jump="vid-b${i}">${escapeHTML(b.title)}</button>`).join("")}
      </div>
      ${v.buckets.map((b, i) => `<section id="vid-b${i}" style="margin-top:34px">
        <div class="kicker-row"><h2 class="section-head" style="margin:0">${icn(b.icon)} ${b.title}</h2></div>
        <p class="muted" style="margin-top:-10px">${b.blurb}</p>
        <div class="grid g3">${b.items.map(videoItemHTML).join("")}</div>
      </section>`).join("")}
      <hr class="divider"/>
      <h2 class="section-head">Channels &amp; hubs worth following</h2>
      <div class="grid g3">${v.channels.map(c => `<a class="card lift" href="${c.url}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"><h3>${c.name} ↗</h3><p class="small">${c.about}</p></a>`).join("")}</div>
      ${pageFoot("videos")}
    </div>`;
    // Jump list uses buttons + measured scroll (NOT #hash anchors — the router listens on
    // hashchange). Offset clears the sticky topbar + sticky jump bar; measured, so it stays
    // correct as chips wrap or the F5 text-size changes their height.
    $$("#vidJump [data-jump]").forEach(btn => btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.jump);
      if (!target) return;
      const topbar = document.querySelector(".topbar");
      const jumpBar = $("#vidJump");
      const offset = (topbar ? topbar.offsetHeight : 0) + (jumpBar ? jumpBar.offsetHeight : 0) + 14;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, y), behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }));
  }

  /* ---------- RESOURCES & GLOSSARY ---------- */
  let glossQuery = "";
  function renderResources() {
    const r = RES();
    main.innerHTML = `<div class="page">
      <p class="eyebrow">Go deeper</p>
      <h1 class="page-title">Resources &amp; <em>glossary</em></h1>

      <h2 style="margin-top:20px">Professional organisations &amp; bodies</h2>
      <div class="grid g3">${r.orgs.map(o => `<a class="card lift" href="${o.url}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"><div class="spread"><h3>${o.name} ↗</h3></div><p class="card-meta">${o.region}</p><p class="small">${o.about}</p></a>`).join("")}</div>

      <hr class="divider"/>
      <h2>Glossary of OT terms</h2>
      <div class="field" style="max-width:420px"><input type="text" id="glossSearch" placeholder="Search terms…" aria-label="Search glossary"></div>
      <div class="deflist" id="glossList"></div>

      <hr class="divider"/>
      <h2>Accessibility</h2>
      <p class="muted">Access is core to OT — so this atlas aims to be usable by everyone. It targets <strong>WCAG&nbsp;2.1 AA</strong>.</p>
      <div class="grid g2" style="margin-top:8px;align-items:start">
        <div class="card accent-teal">
          <h3>Built-in supports</h3>
          <ul class="ticks">
            <li><strong>Plain-language toggle</strong> — simpler wording and roomier text for cognitive load, fatigue or low literacy.</li>
            <li><strong>Public / Clinical modes</strong> — choose the depth that fits you.</li>
            <li><strong>Light &amp; dark themes</strong>; respects your system <em>reduced-motion</em> and <em>high-contrast</em> settings.</li>
            <li><strong>Full keyboard operation</strong> with visible focus, skip-link, and screen-reader landmarks, labels &amp; announcements.</li>
            <li>Resizable / zoomable to 200%+ without loss of content.</li>
          </ul>
        </div>
        <div class="card">
          <h3>Keyboard shortcuts</h3>
          <div class="deflist">
            <div class="row"><dt><kbd>/</kbd></dt><dd>Open search</dd></div>
            <div class="row"><dt><kbd>↑</kbd> <kbd>↓</kbd> <kbd>Enter</kbd></dt><dd>Move through &amp; open search results</dd></div>
            <div class="row"><dt><kbd>Esc</kbd></dt><dd>Close search or any open panel</dd></div>
            <div class="row"><dt><kbd>Tab</kbd></dt><dd>Move between controls (focus stays inside open dialogs)</dd></div>
          </div>
          <p class="small muted" style="margin-top:10px">Found a barrier? It's worth fixing — accessibility is never "done".</p>
        </div>
      </div>
      ${pageFoot("resources")}
    </div>`;
    const draw = () => {
      const q = glossQuery.trim().toLowerCase();
      const items = r.glossary.filter(g => !q || (g.t + " " + g.d).toLowerCase().includes(q))
        .sort((a, b) => a.t.localeCompare(b.t));
      $("#glossList").innerHTML = items.map(g => `<div class="row"><dt>${g.t}</dt><dd>${g.d}</dd></div>`).join("") ||
        emptyState(`No terms match${q ? ` “${escapeHTML(glossQuery.trim())}”. <button type="button" class="text-btn" id="glossClear">Clear search</button>` : "."}`, "i-compass");
      const glossClear = $("#glossClear");
      if (glossClear) glossClear.addEventListener("click", () => {
        glossQuery = "";
        const si = $("#glossSearch"); if (si) si.value = "";
        draw();
      });
    };
    $("#glossSearch").addEventListener("input", e => { glossQuery = e.target.value; draw(); });
    draw();
  }

  /* ---------- CLIENTS & FAMILIES ---------- */
  function renderClients() {
    const c = RES().clients;
    main.innerHTML = `<div class="page">
      <p class="eyebrow">For clients &amp; families</p>
      <h1 class="page-title">Could OT <em>help you?</em></h1>
      <p class="lede">${c.intro}</p>

      <div class="card accent-teal lift" style="margin:20px 0;display:flex;align-items:center;gap:16px;flex-wrap:wrap">
        <span class="pw-ico">${icn("i-sliders")}</span>
        <div style="flex:1;min-width:200px">
          <h2 style="margin:0 0 4px">2-minute check: could OT help?</h2>
          <p style="margin:0">Answer a few quick questions about daily life to see if occupational therapy is worth exploring.</p>
        </div>
        <a class="btn btn-primary" href="#/toolkit">Take the check →</a>
      </div>

      <h2 style="margin-top:26px">Recognise when OT can help</h2>
      ${accordionHTML(c.scenarios.map(s => ({
        title: s.who,
        body: `<div class="grid g2"><div><h3>Signs OT might help</h3><ul class="ticks">${s.signs.map(x => `<li>${x}</li>`).join("")}</ul></div><div><h3>How OT can help</h3><ul class="arrows" style="list-style:none;padding:0">${s.otCan.map(x => `<li style="padding-left:28px;position:relative"><span style="position:absolute;left:0;color:var(--clay-deep)">→</span>${x}</li>`).join("")}</ul></div></div>`
      })))}

      <hr class="divider"/>
      <h2>What to expect</h2>
      <div class="numbered">${c.whatToExpect.map(s => `<div class="step"><div class="n"></div><div><h3>${s.h}</h3><p>${s.t}</p></div></div>`).join("")}</div>

      <hr class="divider"/>
      <div class="grid g2" style="align-items:start">
        <div><h2>How to find an OT</h2><ul class="ticks">${c.findOT.steps.map(s => `<li>${s}</li>`).join("")}</ul></div>
        <div><h2>Questions to ask</h2><div class="card">${c.findOT.questions.map(q => `<p class="small">${icn("i-chat"," c-teal qico")} ${q}</p>`).join("")}</div></div>
      </div>

      <hr class="divider"/>
      <h2>Accessing &amp; funding OT — by country</h2>
      <p class="muted small">Licensure, who can practise, and how OT is paid for differ by country. Here are four — find yours (and confirm current rules locally).</p>
      ${countryFactsHTML(false)}

      <hr class="divider"/>
      <h2>Everyday strategies OT teaches</h2>
      <p class="muted small">Practical self-management you can start using today (and refine with a therapist).</p>
      <div class="grid g2">${c.selfManagement.map(s => `<div class="card accent"><h3>${s.title}</h3><p class="small">${s.body}</p><ul class="ticks">${s.tips.map(t => `<li>${t}</li>`).join("")}</ul></div>`).join("")}</div>

      <hr class="divider"/>
      <h2>Rights &amp; advocacy</h2>
      <p class="muted">${c.advocacy.intro}</p>
      <ul class="ticks">${c.advocacy.points.map(p => `<li>${p}</li>`).join("")}</ul>

      <div class="callout warn" style="margin-top:24px"><span class="ico">${icn("i-warn"," c-clay")}</span><p>${RES().disclaimer}</p></div>
      ${pageFoot("clients")}
    </div>`;
    wireAccordions();
    try { linkifyGlossary(main); } catch (e) {} // F26: define jargon for the least clinical audience too
  }

  /* ============================================================
     INTERACTIVE TOOLKIT
     ============================================================ */
  function renderToolkit() {
    main.innerHTML = `<div class="page">
      <p class="eyebrow">Do, don't just read</p>
      <h1 class="page-title">Interactive <em>toolkit</em></h1>
      <p class="lede">Hands-on tools for practitioners, students and curious clients. Everything runs in your browser — nothing is sent anywhere.</p>
      <div class="tabs" data-tabs="tools" role="tablist">
        <button class="tab-btn active" data-key="screener">Could OT help?</button>
        <button class="tab-btn" data-key="goal">Goal writer</button>
        <button class="tab-btn" data-key="pico">PICO builder</button>
        <button class="tab-btn" data-key="activity">Activity analysis</button>
        <button class="tab-btn" data-key="energy">Energy planner</button>
      </div>
      <div data-panel="tools" data-key="screener">${toolScreener()}</div>
      <div data-panel="tools" data-key="goal" class="hide">${toolGoal()}</div>
      <div data-panel="tools" data-key="pico" class="hide">${toolPico()}</div>
      <div data-panel="tools" data-key="activity" class="hide">${toolActivity()}</div>
      <div data-panel="tools" data-key="energy" class="hide">${toolEnergy()}</div>
      ${pageFoot("toolkit")}
    </div>`;
    wireTabs();
    wireScreener(); wireGoal(); wirePico(); wireActivity(); wireEnergy();
  }

  /* --- Screener --- */
  const screenerItems = [
    { t: "Self-care is hard", d: "Trouble with dressing, bathing, grooming, eating or toileting", area: "Daily living", setting: "Rehab · Home health · Outpatient" },
    { t: "Home/community tasks are hard", d: "Cooking, cleaning, shopping, money or managing medications", area: "Daily living", setting: "Home health · Community · Outpatient" },
    { t: "Hand or arm problems", d: "Pain, weakness, numbness, an injury or surgery affecting the hand/arm", area: "Hand & UE", setting: "Hand therapy · Outpatient" },
    { t: "After a stroke / brain injury / illness", d: "Rebuilding movement, thinking skills and independence", area: "Neuro rehab", setting: "Inpatient rehab · Home health · Outpatient" },
    { t: "A child is struggling", d: "Handwriting, sensory, self-care, motor skills, regulation or school participation", area: "Paediatrics", setting: "Schools · Early intervention · Outpatient" },
    { t: "Mental health & routines", d: "Low mood/anxiety, lost routines, wanting structure, coping or to return to work", area: "Mental health", setting: "Community MH · Outpatient" },
    { t: "Fatigue or a chronic condition", d: "Exhaustion or pain limiting activity (MS, long COVID, arthritis, cancer)", area: "Chronic-condition management", setting: "Outpatient · Community" },
    { t: "Aging at home", d: "Falls, safety concerns, or wanting to stay independent at home", area: "Productive aging", setting: "Home health · Community · Outpatient" },
    { t: "Memory or cognition changes", d: "Forgetfulness or thinking changes affecting safety and daily life", area: "Cognition", setting: "Outpatient · Home health · Memory care" },
    { t: "Returning to work or driving", d: "Getting back to a job, school or safe driving after a setback", area: "Work & community mobility", setting: "Work rehab · Driving rehab · Outpatient" }
  ];
  function toolScreener() {
    return `<h2>Could occupational therapy help?</h2>
      <p class="muted">Tick anything that resonates for you or someone you care about. This is an educational guide, not a diagnosis.</p>
      <div class="checklist" id="scrList">${screenerItems.map((it, i) => `<label class="check-item"><input type="checkbox" data-scr="${i}" class="ci-input sr-only"><span class="ci-box" aria-hidden="true"><svg class="ci-tick" viewBox="0 0 24 24"><use href="#i-check"/></svg></span><span class="ci-text">${it.t}<small>${it.d}</small></span></label>`).join("")}</div>
      <p style="margin-top:16px"><button class="btn btn-primary" id="scrRun">See what OT could offer →</button></p>
      <div id="scrOut" aria-live="polite"></div>`;
  }
  function wireScreener() {
    const run = $("#scrRun"); if (!run) return;
    run.addEventListener("click", () => {
      const picked = $$("#scrList input:checked").map(c => screenerItems[+c.dataset.scr]);
      const out = $("#scrOut");
      if (!picked.length) { out.innerHTML = `<div class="tool-output"><p>Tick at least one item above, then try again.</p></div>`; return; }
      const settings = [...new Set(picked.map(p => p.setting))];
      out.innerHTML = `<div class="tool-output">
        <button class="copy-btn" type="button">Copy</button>
        <div class="out-label">Based on what you ticked</div>
        <p><strong>Occupational therapy looks relevant to you.</strong> OT could help across these areas:</p>
        <ul class="ticks">${picked.map(p => `<li><strong>${p.area}:</strong> ${p.d.toLowerCase()}.</li>`).join("")}</ul>
        <p style="margin-top:10px"><strong>Where this kind of OT usually happens:</strong></p>
        <div class="chip-row">${settings.map(s => `<span class="chip" style="cursor:default">${s}</span>`).join("")}</div>
        <p class="small">Next step: ask your doctor for an OT referral or check whether you can self-refer. See <a href="#/clients">For clients &amp; families</a> for how to find a therapist and what to expect.</p>
      </div>`;
      out.querySelector(".tool-output").scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  /* --- Goal writer (COAST / SMART) --- */
  function toolGoal() {
    const assist = ["independently", "with modified independence", "with supervision", "with minimal assistance", "with moderate assistance", "with maximal assistance"];
    return `<h2>Occupation-focused goal writer</h2>
      <p class="muted">Builds a measurable goal in <strong>COAST</strong> form (Client · Occupation · Assist · Specific condition · Timeline) — the OT standard.</p>
      <div class="grid g2" style="align-items:start">
        <div>
          <div class="field"><label>Client <span class="hint">(who)</span></label><input type="text" id="gClient" placeholder="e.g., Client / John / the student" value="Client"></div>
          <div class="field"><label>Occupation / task <span class="hint">(what meaningful activity)</span></label><input type="text" id="gOcc" placeholder="e.g., don a button-up shirt"></div>
          <div class="field"><label>Assistance level</label><select id="gAssist">${assist.map(a => `<option>${a}</option>`).join("")}</select></div>
          <div class="field"><label>Specific condition / how <span class="hint">(equipment, technique, criterion)</span></label><input type="text" id="gCond" placeholder="e.g., using a button hook in 4 of 5 attempts"></div>
          <div class="field"><label>Timeline <span class="hint">(by when)</span></label><input type="text" id="gTime" placeholder="e.g., within 4 weeks"></div>
          <button class="btn btn-primary" id="gRun">Generate goal →</button>
        </div>
        <div><div id="gOut" aria-live="polite"></div></div>
      </div>`;
  }
  function wireGoal() {
    const run = $("#gRun"); if (!run) return;
    run.addEventListener("click", () => {
      const client = ($("#gClient").value || "Client").trim();
      const occ = ($("#gOcc").value || "…").trim();
      const assist = $("#gAssist").value;
      const cond = ($("#gCond").value || "").trim();
      const time = ($("#gTime").value || "").trim();
      const goal = `${client} will ${occ} ${assist}${cond ? " " + cond : ""}${time ? " " + time : ""}.`;
      const checks = [
        ["Occupation-based", occ && occ !== "…"],
        ["Measurable criterion", /\d|all|each|every|without|trials?|attempts?|%/i.test(cond)],
        ["Assist level stated", !!assist],
        ["Time-bound", !!time]
      ];
      $("#gOut").innerHTML = `<div class="tool-output"><button class="copy-btn" type="button">Copy</button><div class="out-label">Your COAST goal</div>
        <p style="font-size:1.05rem">“${goal}”</p>
        <div class="out-label" style="margin-top:14px">Quality check</div>
        ${checks.map(c => `<p class="small">${c[1] ? icn("i-check"," c-sage") : icn("i-warn"," c-ochre")} ${c[0]}${c[1] ? "" : " — consider adding this"}</p>`).join("")}
        <p class="small muted" style="margin-top:10px">Tip: keep the focus on the <em>occupation</em>, not the impairment, and make the criterion countable.</p></div>`;
    });
  }

  /* --- PICO builder --- */
  function toolPico() {
    return `<h2>PICO question builder</h2>
      <p class="muted">Turn a clinical hunch into a searchable, answerable question — then jump to the databases.</p>
      <div class="grid g2" style="align-items:start"><div>
        <div class="field"><label>P — Population / Problem</label><input type="text" id="pP" placeholder="e.g., adults with chronic stroke and arm weakness"></div>
        <div class="field"><label>I — Intervention</label><input type="text" id="pI" placeholder="e.g., constraint-induced movement therapy"></div>
        <div class="field"><label>C — Comparison <span class="hint">(optional)</span></label><input type="text" id="pC" placeholder="e.g., conventional task practice"></div>
        <div class="field"><label>O — Outcome</label><input type="text" id="pO" placeholder="e.g., functional arm use in daily activities"></div>
        <button class="btn btn-primary" id="pRun">Build question →</button>
      </div><div><div id="pOut" aria-live="polite"></div></div></div>`;
  }
  function wirePico() {
    const run = $("#pRun"); if (!run) return;
    run.addEventListener("click", () => {
      const P = ($("#pP").value || "").trim(), I = ($("#pI").value || "").trim(),
            C = ($("#pC").value || "").trim(), O = ($("#pO").value || "").trim();
      if (!P || !I || !O) { $("#pOut").innerHTML = `<div class="tool-output"><p>Fill in at least P, I and O.</p></div>`; return; }
      const q = `In ${P}, does ${I}${C ? ` compared with ${C}` : ""} improve ${O}?`;
      const search = [P, I, C, O].filter(Boolean).join(" ");
      $("#pOut").innerHTML = `<div class="tool-output"><button class="copy-btn" type="button">Copy</button><div class="out-label">Your clinical question</div>
        <p style="font-size:1.05rem">${q}</p>
        <div class="out-label" style="margin-top:12px">Search string</div>
        <code class="codeblock">${escapeHTML(search)}</code>
        <div class="out-label" style="margin-top:12px">Search it now</div>
        <div class="flex" style="margin-top:6px">
          <a class="chip" target="_blank" rel="noopener" href="https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(search)}">PubMed ↗</a>
          <a class="chip" target="_blank" rel="noopener" href="https://www.otseeker.com">OTseeker ↗</a>
          <a class="chip" target="_blank" rel="noopener" href="https://www.cochranelibrary.com/search?q=${encodeURIComponent(search)}">Cochrane ↗</a>
          <a class="chip" target="_blank" rel="noopener" href="https://scholar.google.com/scholar?q=${encodeURIComponent(search)}">Google Scholar ↗</a>
        </div></div>`;
    });
  }

  /* --- Activity analysis --- */
  function toolActivity() {
    return `<h2>Activity analysis worksheet</h2>
      <p class="muted">A signature OT skill — break an occupation into its demands to see where someone struggles and how to grade it. Fill in and generate a printable summary.</p>
      <div class="field"><label>Activity / occupation</label><input type="text" id="aName" placeholder="e.g., making a cup of tea"></div>
      <div class="grid g2">
        <div class="field"><label>Steps / sequence</label><textarea id="aSteps" placeholder="List the steps in order…"></textarea></div>
        <div class="field"><label>Objects, tools &amp; space required</label><textarea id="aObjects" placeholder="Kettle, cup, water, counter height…"></textarea></div>
      </div>
      <div class="grid g3">
        <div class="field"><label>Body functions / client factors</label><textarea id="aBody" placeholder="Strength, ROM, balance, attention, memory, vision…"></textarea></div>
        <div class="field"><label>Performance skills</label><textarea id="aSkills" placeholder="Reach, grip, sequence, problem-solve, attend…"></textarea></div>
        <div class="field"><label>Demands &amp; safety</label><textarea id="aDemands" placeholder="Hot water, sharp edges, standing tolerance, cognitive load…"></textarea></div>
      </div>
      <div class="grid g2">
        <div class="field"><label>To GRADE DOWN (make easier)</label><textarea id="aDown" placeholder="Sit to work, pre-fill kettle, use lighter cup, fewer steps…"></textarea></div>
        <div class="field"><label>To GRADE UP (make harder)</label><textarea id="aUp" placeholder="Add timing, larger volumes, standing, dual-task…"></textarea></div>
      </div>
      <button class="btn btn-primary" id="aRun">Generate summary →</button>
      <div id="aOut" aria-live="polite"></div>`;
  }
  function wireActivity() {
    const run = $("#aRun"); if (!run) return;
    run.addEventListener("click", () => {
      const g = id => ($("#" + id).value || "—").trim() || "—";
      const rows = [["Steps / sequence", "aSteps"], ["Objects, tools & space", "aObjects"], ["Body functions / client factors", "aBody"], ["Performance skills", "aSkills"], ["Demands & safety", "aDemands"], ["Grade down (easier)", "aDown"], ["Grade up (harder)", "aUp"]];
      $("#aOut").innerHTML = `<div class="tool-output"><button class="copy-btn" type="button">Copy</button><div class="out-label">Activity analysis — ${escapeHTML(g("aName"))}</div>
        <div class="deflist">${rows.map(r => `<div class="row"><dt>${r[0]}</dt><dd>${escapeHTML(g(r[1])).replace(/\n/g, "<br>")}</dd></div>`).join("")}</div>
        <p class="small muted" style="margin-top:10px">Use <kbd style="font-family:var(--mono)">Ctrl/Cmd&nbsp;+&nbsp;P</kbd> to print or save this as a PDF.</p></div>`;
    });
  }

  /* --- Energy planner (4 P's) --- */
  function toolEnergy() {
    return `<h2>Energy conservation planner (the “4 P's”)</h2>
      <p class="muted">For fatigue, pain or breathlessness. List your tasks and sort them — the planner builds a paced, prioritised day.</p>
      <div class="grid g3">
        <div class="field"><label>${icn("i-dot"," c-clay pdot")} High priority &amp; high energy</label><textarea id="eHi" placeholder="Must-do, demanding tasks…"></textarea></div>
        <div class="field"><label>${icn("i-dot"," c-ochre pdot")} Important but flexible</label><textarea id="eMid" placeholder="Can be spread out or scheduled…"></textarea></div>
        <div class="field"><label>${icn("i-dot"," c-sage pdot")} Low priority / can delegate</label><textarea id="eLo" placeholder="Could wait, simplify or delegate…"></textarea></div>
      </div>
      <button class="btn btn-primary" id="eRun">Build my paced plan →</button>
      <div id="eOut" aria-live="polite"></div>`;
  }
  function wireEnergy() {
    const run = $("#eRun"); if (!run) return;
    run.addEventListener("click", () => {
      const split = id => ($("#" + id).value || "").split("\n").map(s => s.trim()).filter(Boolean);
      const hi = split("eHi"), mid = split("eMid"), lo = split("eLo");
      $("#eOut").innerHTML = `<div class="tool-output"><button class="copy-btn" type="button">Copy</button><div class="out-label">Your paced plan</div>
        <p><strong>Prioritise.</strong> Do the high-energy must-dos first, when your energy is highest — and rest <em>before</em> you tire.</p>
        ${hi.length ? `<p><strong>${icn("i-dot"," c-clay pdot")} Do first (peak energy):</strong></p><ul class="ticks">${hi.map(t => `<li>${escapeHTML(t)} <span class="muted small">— then take a planned rest</span></li>`).join("")}</ul>` : ""}
        ${mid.length ? `<p><strong>${icn("i-dot"," c-ochre pdot")} Spread across the day/week (pace):</strong></p><ul class="ticks">${mid.map(t => `<li>${escapeHTML(t)}</li>`).join("")}</ul>` : ""}
        ${lo.length ? `<p><strong>${icn("i-dot"," c-sage pdot")} Simplify, delegate or postpone:</strong></p><ul class="arrows" style="list-style:none;padding:0">${lo.map(t => `<li style="padding-left:28px;position:relative"><span style="position:absolute;left:0;color:var(--clay-deep)">→</span>${escapeHTML(t)}</li>`).join("")}</ul>` : ""}
        <p class="small muted">Remember the 4 P's: <strong>Prioritise · Plan · Pace · Position</strong> (sit to work, keep things within reach).</p></div>`;
    });
  }

  /* --- Copy button (F9) — one delegated listener covers all 5 tools, incl. re-renders --- */
  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { document.execCommand("copy"); } finally { ta.remove(); }
  }
  function wireCopyButtons() {
    document.addEventListener("click", e => {
      const btn = e.target.closest(".copy-btn");
      if (!btn) return;
      const output = btn.closest(".tool-output");
      if (!output) return;
      const clone = output.cloneNode(true);
      const cloneBtn = clone.querySelector(".copy-btn");
      if (cloneBtn) cloneBtn.remove();
      const text = (clone.innerText || clone.textContent || "").trim();
      const onDone = () => {
        const original = btn.textContent;
        btn.textContent = "Copied ✓";
        announce("Copied to clipboard");
        setTimeout(() => { btn.textContent = original; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(onDone).catch(() => { fallbackCopy(text); onDone(); });
      } else {
        fallbackCopy(text); onDone();
      }
    });
  }
  wireCopyButtons();

  /* ============================================================
     SEARCH
     ============================================================ */
  let searchIndex = null;
  function buildIndex() {
    if (searchIndex) return searchIndex;
    const idx = [];
    window.OT.conditions.forEach(c => idx.push({ cat: "Condition", title: c.name, desc: c.desc, route: "conditions", action: () => { go("conditions"); setTimeout(() => openCondition(c.id), 60); } }));
    window.OT.assessments.forEach(a => idx.push({ cat: "Assessment", title: `${a.name}${a.abbr && a.abbr !== "—" ? " (" + a.abbr + ")" : ""}`, desc: a.measures, route: "assessments", action: () => { asmtQuery = a.abbr && a.abbr !== "—" ? a.abbr : a.name; go("assessments"); } }));
    M().occupationModels.forEach((m, i) => idx.push({ cat: "Model", title: `${m.name} (${m.abbr})`, desc: m.summary, route: "models", action: () => { go("models"); setTimeout(() => openModel(i), 60); } }));
    M().framesOfReference.forEach(fr => idx.push({ cat: "Frame of reference", title: fr.name, desc: fr.basis, route: "models", action: () => go("models") }));
    R().types.forEach(t => idx.push({ cat: "Clinical reasoning", title: t.name, desc: t.body, route: "reasoning", action: () => go("reasoning") }));
    RES().glossary.forEach(g => idx.push({ cat: "Glossary", title: g.t, desc: g.d, route: "resources", action: () => { glossQuery = g.t; go("resources"); } }));
    window.OT.videos.buckets.forEach(b => b.items.forEach(v => idx.push({ cat: "Video", title: v.title, desc: v.desc || b.title, route: "videos", action: () => go("videos") })));
    F().domain.aspects.forEach(a => idx.push({ cat: "Domain", title: a.name, desc: a.tagline, route: "pillars", action: () => go("pillars") }));
    F().domain.aspects.find(a => a.key === "occupations").children.forEach(ch => idx.push({ cat: "Area of occupation", title: ch.name, desc: ch.desc, route: "pillars", action: () => go("pillars") }));
    E().keyStudies.forEach(s => idx.push({ cat: "Evidence", title: s.topic, desc: s.finding, route: "evidence", action: () => go("evidence") }));
    if (window.OT.directory) window.OT.directory.entries.forEach(e => idx.push({ cat: "Directory", title: e.name, desc: e.focus || "", route: "directory", action: () => { dirQuery = e.name; dirFilter = "all"; go("directory"); } }));
    if (window.OT.bulletin) window.OT.bulletin.entries.forEach(e => idx.push({ cat: "What's changed", title: e.title, desc: e.summary || "", route: "bulletin", action: () => { bulQuery = e.title; bulCat = "all"; bulRegion = "all"; go("bulletin"); } }));
    if (window.OT.interventions) window.OT.interventions.entries.forEach(e => idx.push({ cat: "Treatment", title: e.name + (e.aka ? " (" + e.aka + ")" : ""), desc: e.what ? e.what.slice(0, 110) : "", route: "interventions", action: () => { txQuery = e.name; txFilter = "all"; txStrength = "all"; go("interventions"); } }));
    [["What is OT", "foundations"], ["History of OT", "foundations"], ["The OT profession & settings", "foundations"], ["EBP & PICO", "evidence"], ["SOAP notes & goals", "reasoning"], ["For clients & families", "clients"], ["Interactive toolkit", "toolkit"]].forEach(p => idx.push({ cat: "Page", title: p[0], desc: "", route: p[1], action: () => go(p[1]) }));
    searchIndex = idx;
    return idx;
  }
  const overlay = $("#searchOverlay"), sInput = $("#searchInput"), sResults = $("#searchResults");
  let searchOpener = null;
  function openSearch() { searchOpener = document.activeElement; overlay.hidden = false; lockScroll(); sInput.setAttribute("aria-expanded", "true"); sInput.value = ""; selIdx = 0; runSearch(""); setTimeout(() => sInput.focus(), 20); }
  function closeSearch() { overlay.hidden = true; unlockScroll(); sInput.setAttribute("aria-expanded", "false"); sInput.removeAttribute("aria-activedescendant"); if (searchOpener) { try { searchOpener.focus(); } catch (e) {} searchOpener = null; } }
  function runSearch(q) {
    const idx = buildIndex();
    q = q.trim().toLowerCase();
    let res;
    if (!q) res = idx.filter(x => x.cat === "Page" || x.cat === "Condition").slice(0, 8);
    else res = idx.filter(x => (x.title + " " + x.desc + " " + x.cat).toLowerCase().includes(q)).slice(0, 30);
    if (!res.length) {
      // F8: typo-tolerant fallback — fires ONLY when exact substring found nothing and the query
      // is long enough to be meaningful. The exact-match path above is never affected.
      const fuzzy = q.length >= 4 ? fuzzyMatches(q, idx) : [];
      if (fuzzy.length) {
        paintResults(fuzzy, q, `<div class="search-note" role="status" style="padding:10px 14px;font-size:.82rem;color:var(--ink-faint);border-bottom:1px solid var(--line)">No exact match — showing close matches</div>`);
        return;
      }
      // F37: suggestion terms are now clickable chips (were plain text) — run that search on click.
      const suggestions = ["stroke", "COPM", "MOHO", "sensory"];
      sResults.innerHTML = `<div class="search-empty" role="status">
        <svg class="empty-obj" aria-hidden="true" focusable="false"><use href="#i-obj-mug"/></svg>
        <p>No matches for “${escapeHTML(q)}”.</p>
        <p class="search-suggest-label">Try one of these</p>
        <div class="search-suggest">${suggestions.map(t => `<button type="button" class="chip" data-suggest="${escapeHTML(t)}">${escapeHTML(t)}</button>`).join("")}</div>
      </div>`;
      $$("[data-suggest]", sResults).forEach(b => b.addEventListener("click", () => { sInput.value = b.dataset.suggest; runSearch(b.dataset.suggest); sInput.focus(); }));
      sInput.removeAttribute("aria-activedescendant"); return;
    }
    paintResults(res, q, "");
  }
  // Shared result painter (unchanged rendering, click-wiring, _res + aria-activedescendant);
  // noteHTML is prepended above the results (empty string for the exact path → identical output).
  function paintResults(list, q, noteHTML) {
    selIdx = 0;
    sResults.innerHTML = (noteHTML || "") + list.map((r, i) => `<button class="sr ${i === 0 ? "sel" : ""}" id="sr-${i}" role="option" aria-selected="${i === 0}" data-i="${i}"><span class="sr-cat">${r.cat}</span><div class="sr-title">${highlight(r.title, q)}</div>${r.desc ? `<div class="sr-desc">${highlight(r.desc.slice(0, 110), q)}${r.desc.length > 110 ? "…" : ""}</div>` : ""}</button>`).join("");
    $$(".sr", sResults).forEach(btn => btn.addEventListener("click", () => { closeSearch(); list[+btn.dataset.i].action(); }));
    sResults._res = list;
    sInput.setAttribute("aria-activedescendant", "sr-0");
  }
  // Sørensen–Dice bigram similarity (no dependency). Scores the query against each index TITLE,
  // taking the best-matching word so multi-token titles ("Dementia / Alzheimer's") aren't diluted.
  function diceSim(a, b) {
    if (a === b) return 1;
    if (a.length < 2 || b.length < 2) return 0;
    const pairs = s => { const m = new Map(); for (let i = 0; i < s.length - 1; i++) { const bg = s.slice(i, i + 2); m.set(bg, (m.get(bg) || 0) + 1); } return m; };
    const A = pairs(a), B = pairs(b);
    let inter = 0, aTotal = 0, bTotal = 0;
    A.forEach((cnt, bg) => { aTotal += cnt; inter += Math.min(cnt, B.get(bg) || 0); });
    B.forEach(cnt => { bTotal += cnt; });
    return (2 * inter) / (aTotal + bTotal);
  }
  function fuzzyMatches(q, idx) {
    const nq = q.replace(/[^a-z0-9]/g, "");
    if (nq.length < 2) return [];
    const scored = [];
    idx.forEach(x => {
      const title = x.title.toLowerCase();
      let best = diceSim(nq, title.replace(/[^a-z0-9]/g, ""));      // whole-title (multi-word queries)
      title.split(/[^a-z0-9]+/).forEach(w => { if (w.length >= 3) { const s = diceSim(nq, w); if (s > best) best = s; } });
      if (best >= 0.4) scored.push({ x, best });
    });
    scored.sort((a, b) => b.best - a.best);
    return scored.slice(0, 8).map(s => s.x);
  }
  function highlight(text, q) {
    if (!q) return text;
    try { return text.replace(new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark style='background:var(--ochre-tint);color:inherit'>$1</mark>"); }
    catch (e) { return text; }
  }
  $("#searchTrigger").addEventListener("click", openSearch);
  $("#searchClose").addEventListener("click", closeSearch);
  overlay.addEventListener("click", e => { if (e.target === overlay) closeSearch(); });
  overlay.addEventListener("keydown", e => trapFocus(overlay, e));
  sInput.addEventListener("input", e => runSearch(e.target.value));
  let selIdx = 0;
  sInput.addEventListener("keydown", e => {
    const items = $$(".sr", sResults);
    if (e.key === "ArrowDown") { e.preventDefault(); selIdx = Math.min(selIdx + 1, items.length - 1); updateSel(items); }
    else if (e.key === "ArrowUp") { e.preventDefault(); selIdx = Math.max(selIdx - 1, 0); updateSel(items); }
    else if (e.key === "Enter") { const r = sResults._res; if (r && r[selIdx]) { closeSearch(); r[selIdx].action(); } }
  });
  function updateSel(items) {
    items.forEach((it, i) => { const on = i === selIdx; it.classList.toggle("sel", on); it.setAttribute("aria-selected", String(on)); });
    if (items[selIdx]) { items[selIdx].scrollIntoView({ block: "nearest" }); sInput.setAttribute("aria-activedescendant", "sr-" + selIdx); }
  }

  document.addEventListener("keydown", e => {
    if (e.key === "/" && overlay.hidden && !/INPUT|TEXTAREA|SELECT/.test((e.target.tagName || ""))) { e.preventDefault(); openSearch(); }
    else if (e.key === "Escape") { if (!overlay.hidden) closeSearch(); }
  });

  /* ============================================================
     ROUTER
     ============================================================ */
  const routes = {
    home: renderHome, foundations: renderFoundations, pillars: renderPillars,
    models: renderModels, reasoning: renderReasoning, evidence: renderEvidence,
    conditions: renderConditions, assessments: renderAssessments, directory: renderDirectory, bulletin: renderBulletin, interventions: renderInterventions, videos: renderVideos,
    resources: renderResources, clients: renderClients, toolkit: renderToolkit
  };
  // F37: pageFoot doubles as a map-legend colophon — reviewed date, typeface credits, an AA
  // note, and a "Continue the atlas" link driven by ROUTE_COORD's order (the 14-chapter chain;
  // bulletin, 14 of 14, wraps to home). `key` is the CALLING route so we know what's "next".
  function pageFoot(key) {
    const rev = (RIG() && RIG().reviewedOn) ? RIG().reviewedOn : "";
    const order = Object.keys(ROUTE_COORD);
    const i = order.indexOf(key);
    let nextHTML = "";
    if (i !== -1) {
      const wrap = i === order.length - 1;
      const nextKey = order[(i + 1) % order.length];
      const nextLabel = CHAPTER_TITLES[nextKey] || nextKey;
      nextHTML = `<a class="foot-next" href="#/${nextKey}">${wrap ? "Start again at the beginning" : "Continue the atlas"} → ${escapeHTML(nextLabel)}</a>`;
    }
    return `<div class="page-foot">
      <p class="foot-legal">The OT Atlas — an educational resource. Not a substitute for individualised care from a licensed occupational therapist. Sources include AOTA/OTPF-4, WFOT, OTseeker, Cochrane and the curated links throughout.${rev ? ` <span class="muted">Content reviewed ${rev}.</span>` : ""}</p>
      <p class="foot-colophon">Set in <span class="foot-face">Fraunces</span> · <span class="foot-face">Hanken Grotesk</span> · <span class="foot-face">Spline Sans Mono</span>. Colour contrast meets <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> AA in both themes. <a class="foot-correct" href="https://github.com/helperstudiostar/ot-atlas/issues/new?title=Correction%3A%20" target="_blank" rel="noopener">Spotted an error? Tell us ↗</a></p>
      ${nextHTML}
    </div>`;
  }
  function go(route) { location.hash = "#/" + route; }
  function wireGo(root = main) { $$("[data-go]", root).forEach(b => b.addEventListener("click", () => go(b.dataset.go))); }
  window.__otGo = go;

  const ROUTE_TITLES = { home: "Occupational therapy, in depth", foundations: "Foundations & the OT profession", pillars: "Domain & the OT process", models: "Models & frames of reference", reasoning: "Clinical reasoning", evidence: "Evidence-based practice", conditions: "Conditions library", assessments: "Assessments & measures", videos: "Video library", resources: "Resources & glossary", clients: "For clients & families", toolkit: "Interactive toolkit", interventions: "Treatments & protocols" };
  function setMeta(title, desc) {
    document.title = title ? `${title} — The OT Atlas` : "The OT Atlas — Occupational Therapy, in depth";
    if (desc != null) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); }
      m.setAttribute("content", String(desc).replace(/\s+/g, " ").trim().slice(0, 160));
    }
  }
  // F18: "On this page" TOC — auto-built from a page's top-level section headings. Only appears on
  // long prose pages (>=3 sections) that don't already have a category jump-bar. Router-safe
  // (buttons + measured scroll, not #anchors).
  function buildPageTOC() {
    try {
      const page = main.querySelector(".page"); if (!page) return;
      if (main.querySelector(".sticky-jump") || page.querySelector(".page-toc")) return;
      const heads = [...main.querySelectorAll(".page > h2")];
      if (heads.length < 3) return;
      const slug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
      heads.forEach((h, i) => { if (!h.id) h.id = "sec-" + (slug(h.textContent) || i); });
      const nav = document.createElement("nav");
      nav.className = "page-toc"; nav.setAttribute("aria-label", "On this page");
      nav.innerHTML = `<p class="toc-label">On this page</p><ul>${heads.map(h => `<li><button type="button" data-toc="${h.id}">${escapeHTML(h.textContent.replace(/^[^\w]+/, "").trim())}</button></li>`).join("")}</ul>`;
      const anchor = main.querySelector(".page > .lede") || main.querySelector(".page-title");
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(nav, anchor.nextSibling);
      else page.insertBefore(nav, page.firstChild);
      nav.querySelectorAll("[data-toc]").forEach(btn => btn.addEventListener("click", () => {
        const t = document.getElementById(btn.dataset.toc); if (!t) return;
        const topbar = document.querySelector(".topbar");
        const off = (topbar ? topbar.offsetHeight : 0) + 14;
        window.scrollTo({ top: Math.max(0, t.getBoundingClientRect().top + window.scrollY - off), behavior: prefersReducedMotion() ? "auto" : "smooth" });
        t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true });
      }));
    } catch (e) {}
  }
  // F38: per-SECTION scroll-driven reveals for the 13 non-home routes (home already has its own
  // per-ELEMENT .stagger on load — left untouched). IntersectionObserver, not the CSS
  // scroll-timeline API: `animation-timeline: view()` still has no stable Firefox support as of
  // 2026-07, and this is a static, no-build app that can't gate a whole render path behind a
  // @supports fork without either duplicating markup or leaving Firefox users with dead motion —
  // an observer that just toggles a class works everywhere and degrades safely.
  // Targets are SECTION-level blocks only — never `.idx-row`/`.idx-x` (the 66-row conditions/
  // assessments lists must not pop row-by-row): top-level headings (`.page > h2`/`.section-head`),
  // `.idx-sec` (the category groups those rows live in), figures, callouts, accordion items,
  // timeline entries and numbered steps.
  const REVEAL_SELECTOR = ".page > h2, .section-head, .idx-sec, .fig, .callout, .acc-item, .tl-item, .step";
  // Scroll-triggered batches (user keeps scrolling): stagger up to this cap.
  const REVEAL_STEP_MS = 40, REVEAL_CAP_MS = 240;
  // The very first batch = whatever is already in the viewport the instant the route renders.
  // Kept short on purpose — a slow cascade on landing reads as lag, not polish.
  const REVEAL_STEP_MS_INITIAL = 15, REVEAL_CAP_MS_INITIAL = 90;
  let revealObserver = null;
  // Called once per route render, after `fn()` has finished building #main. Disconnects any
  // previous route's observer first (its targets are gone from the DOM anyway) so there is never
  // more than one live observer — this is the whole reveal lifecycle: created here, disconnected
  // here on the next call, and implicitly GC'd with its (unobserved) targets on navigation away.
  function wireReveals(root) {
    if (revealObserver) { revealObserver.disconnect(); revealObserver = null; }
    // PRM: never wire the observer or add the hiding class at all — every target starts, and
    // stays, at its natural fully-visible state. (styles.css also carries a CSS-only backstop.)
    // Same for hidden documents: a background tab/webview produces no rendering frames, so IO
    // never fires there — tagging would leave content invisible. No animation for unseen paints.
    if (prefersReducedMotion() || document.visibilityState === "hidden") return;
    const targets = $$(REVEAL_SELECTOR, root);
    if (!targets.length) return;
    let firstBatch = true;
    revealObserver = new IntersectionObserver((entries, obs) => {
      const step = firstBatch ? REVEAL_STEP_MS_INITIAL : REVEAL_STEP_MS;
      const cap = firstBatch ? REVEAL_CAP_MS_INITIAL : REVEAL_CAP_MS;
      let i = 0;
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.setProperty("--rdelay", Math.min(i * step, cap) + "ms");
        el.classList.add("revealed");
        i++;
        obs.unobserve(el); // one-time reveal — never re-hide on scrolling back up
      });
      firstBatch = false;
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(el => { el.classList.add("reveal"); revealObserver.observe(el); });
    // Safety net: if IO callbacks stall (occluded tab/webview produces no rendering frames),
    // content must never stay hidden — force-reveal everything still pending after ~1.6s.
    setTimeout(() => targets.forEach(el => el.classList.add("revealed")), 1600);
  }
  // F31: Honest Atlas chapter coordinates — one stamp per route, mirrors the nav groups.
  const ROUTE_COORD = {
    home: "01 · ORIENTATION", foundations: "02 · ORIENTATION",
    pillars: "03 · THE FRAMEWORK", models: "04 · THE FRAMEWORK",
    reasoning: "05 · THE FRAMEWORK", evidence: "06 · THE FRAMEWORK",
    conditions: "07 · REFERENCE", assessments: "08 · REFERENCE",
    videos: "09 · REFERENCE", resources: "10 · REFERENCE",
    clients: "11 · GET HELP & DO", toolkit: "12 · GET HELP & DO",
    directory: "13 · REFERENCE",  // the appendix — external resources, added 2026-07 (F50)
    bulletin: "14 · REFERENCE",   // notes to this edition — what's changed, added 2026-07 (F51)
    interventions: "15 · REFERENCE" // treatments & protocols compendium, added 2026-07 (F53)
  };
  // F37: chapter display names for the pageFoot() "Continue the atlas →" link — mirrors the
  // nav-list wording (index.html), NOT ROUTE_TITLES (that map drives <title>/meta and is missing
  // directory/bulletin; kept separate so this list stays exactly Object.keys(ROUTE_COORD)-shaped).
  const CHAPTER_TITLES = {
    home: "Start here", foundations: "Foundations & profession", pillars: "Domain & the OT process",
    models: "Models & frames of reference", reasoning: "Clinical reasoning", evidence: "Evidence-based practice",
    conditions: "Conditions library", assessments: "Assessments & measures", videos: "Video library",
    resources: "Resources & glossary", clients: "For clients & families", toolkit: "Interactive toolkit",
    directory: "The OT directory", bulletin: "What's changed",
    interventions: "Treatments & protocols"
  };
  // F35: nav-group → chapter accent slug (drives #main[data-chapter] → --chapter-accent).
  // ORIENTATION teal / THE FRAMEWORK plum / REFERENCE ochre / GET HELP & DO clay.
  const CHAPTER_SLUG = { "ORIENTATION": "orientation", "THE FRAMEWORK": "framework", "REFERENCE": "reference", "GET HELP & DO": "action" };
  function chapterSlug(key) {
    const co = ROUTE_COORD[key];
    const grp = co ? co.split("·")[1].trim() : "";
    return CHAPTER_SLUG[grp] || "orientation";
  }
  function stampCoord(key) {
    const co = ROUTE_COORD[key]; if (!co) return;
    const eb = main.querySelector(".page .eyebrow");
    if (!eb || eb.querySelector(".coord")) return;
    // Split "07 · REFERENCE" → number prefix + group word so mobile can keep just "07 ·" inline.
    const m = co.match(/^(\S+)\s*·\s*(.+)$/);
    const s = document.createElement("span");
    s.className = "coord"; s.setAttribute("aria-hidden", "true");
    if (m) s.innerHTML = `<span class="coord-no">${m[1]} ·</span> <span class="coord-grp">${m[2]}</span>`;
    else s.textContent = co;
    eb.prepend(s);
  }
  function route() {
    const hash = location.hash.replace(/^#\/?/, "");
    const segs = hash.split("?")[0].split("/").filter(Boolean);
    const key = segs[0] || "home";
    const sub = segs[1] || "";
    const fn = routes[key] || renderHome;
    const update = () => {
      setActiveNav(routes[key] ? key : "home");
      closeDrawer();
      setNav(false);
      fn();
      const resolvedKey = routes[key] ? key : "home";
      main.dataset.chapter = chapterSlug(resolvedKey);  // F35 chapter accent
      stampCoord(resolvedKey);
      buildPageTOC();
      // F38: scroll-driven per-section reveals — every route except home (home already has its
      // own per-ELEMENT .stagger-on-load and isn't part of this rollout).
      if (resolvedKey !== "home") wireReveals(main); else if (revealObserver) { revealObserver.disconnect(); revealObserver = null; }
      associateLabels(main);
      const heading = main.querySelector("h1, h2");
      setMeta(ROUTE_TITLES[key] || (heading ? heading.textContent.trim() : ""));
      announce((heading ? heading.textContent.trim() : "Page") + " — loaded");
      main.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
      // deep link: #/conditions/<id> opens that condition's drawer (unknown id = no-op)
      if (key === "conditions" && sub) openCondition(sub);
    };
    // F33: route choreography via View Transitions — Baseline in all engines (2026).
    // Plain callback only (Firefox 144 lacks the types signature); reduced-motion skips entirely.
    if (document.startViewTransition && !prefersReducedMotion()) document.startViewTransition(update);
    else update();
  }
  window.addEventListener("hashchange", route);

  // F37 BUG FIX: start() used to retry setTimeout(start, 40) UNCONDITIONALLY — if a data file
  // failed to load (renamed/404/blocked), the app polled forever behind "Loading the atlas…"
  // with no way out. Now capped at START_MAX_ATTEMPTS (~75 × 40ms ≈ 3s), then a branded error
  // state replaces #main: open-book mark, plain-language message, a real reload button, and
  // (when determinable) which data namespace never arrived.
  const START_RETRY_MS = 40, START_MAX_ATTEMPTS = 75; // 75 * 40ms ≈ 3000ms
  // Every window.OT.* namespace the CORE data files are expected to set (mirrors sw.js CORE).
  const START_NS_FILE = {
    foundations: "foundations.js", models: "models.js", reasoning: "reasoning.js",
    conditions: "conditions.js", assessments: "assessments.js", evidence: "evidence.js",
    videos: "videos.js", resources: "resources.js", directory: "directory.js",
    bulletin: "bulletin.js", rigor: "rigor.js"
  };
  function missingDataFiles() {
    const keys = Object.keys(START_NS_FILE);
    if (!window.OT) return keys.map(k => START_NS_FILE[k]);
    return keys.filter(k => !window.OT[k]).map(k => START_NS_FILE[k]);
  }
  function renderStartError() {
    const missing = missingDataFiles();
    const missingHTML = missing.length
      ? `<p class="se-missing">Data file${missing.length > 1 ? "s" : ""} that didn't arrive: <code>${missing.map(escapeHTML).join(", ")}</code></p>`
      : "";
    main.innerHTML = `<div class="start-error" role="alert">
      <svg class="loading-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <path d="M50 34C42 28 28 28 20 31L20 69C28 66 42 66 50 72C58 66 72 66 80 69L80 31C72 28 58 28 50 34Z" fill="none" stroke="currentColor" stroke-width="6"/>
        <path d="M50 34L50 72" fill="none" stroke="var(--clay)" stroke-width="5" stroke-linecap="round"/>
      </svg>
      <p class="se-msg">The atlas didn't load — reloading usually fixes this.</p>
      ${missingHTML}
      <button type="button" class="btn btn-primary" id="startReload">Reload the atlas</button>
    </div>`;
    const btn = $("#startReload");
    if (btn) btn.addEventListener("click", () => location.reload());
    announce("The atlas failed to load. Reload to try again.");
  }
  let startAttempts = 0;
  function start() {
    if (!window.OT || !window.OT.foundations || !window.OT.conditions) {
      startAttempts++;
      if (startAttempts >= START_MAX_ATTEMPTS) { renderStartError(); return; }
      setTimeout(start, START_RETRY_MS);
      return;
    }
    if (!location.hash) location.hash = "#/home";
    route();
    maybeWelcome();
  }
  start();
})();
