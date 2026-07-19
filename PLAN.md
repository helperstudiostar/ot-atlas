# PLAN.md — The OT Atlas: UX/UI overhaul

> Read me first. One item per session. Evidence for every claim lives in PROGRESS.md.

---

## Project Profile (Step 0 — completed 2026-07-01)

1. **Project name:** The OT Atlas (no package.json — from README.md title + `<title>` tag).
2. **Project type:** 100% static, no-build educational reference web app (health education /
   occupational therapy). Stack: single `index.html` + vanilla JS (`assets/js/app.js`, hash
   router) + data files populating a global `OT` namespace + one CSS file. No dependencies,
   no framework, no server code. Already has: 12 routes, rigor/evidence metadata layer,
   Public⇄Clinical dual mode, plain-language toggle, WCAG-focused a11y layer (all verified
   in prior sessions — see HANDOFF.md + BUILDLOG.md).
3. **Primary user goal (dual, by audience):**
   - **Public:** "Could OT help me/my family member, and how do I get it?" → reach a relevant
     condition profile or the self-screener.
   - **Practitioner/student:** "Look up a condition / assessment / evidence rating I can trust."
   Both converge on: **open a condition profile (drawer) with its evidence rating.**
4. **Success metric — time to primary goal:** content/learning product, so not a 2-second bar.
   Targets: **returning user ≤ 5s** (keyboard: `/` → type → Enter, measured ~3.0s programmatic);
   **first-time user ≤ 15s / ≤ 3 interactions** (land → recognise audience path → open a
   condition). Measured today: load 1.5s (324 KB, 12 assets), nav→conditions→drawer = 2
   interactions, ~2.0s programmatic. The gap to target is **recognition**, not speed: no
   first-visit audience routing (see backlog #1).
5. **Accessibility profile (educational health content, dual audience):** cognitive access is
   paramount (plain language, no memory reliance, low reading burden, obvious next step);
   screen-reader + keyboard completeness (largely done — see HANDOFF.md a11y pass); no timed
   content (nothing to extend); error tolerance in the 5 toolkit forms; **trust cues** double
   as accessibility for health-anxious users (evidence badges already shipped).
   **Assumption flagged:** primary public device is mobile (typical for health lookups);
   not yet verified with real usage data.

## Current phase

- [x] Step 0 — Project Profile
- [x] Phase 1 — AUDIT (findings below; no code changed)
- [x] Phase 2 — Numbered plan, items 1–14 (2026-07-01; no code changed)
- [x] Phase 3 foundation batch — items 1, 2, 3, 5 + mobile-topbar fix DONE by Fable 5
      (2026-07-03, owner-approved batch; all verified, see PROGRESS.md)
- [x] Phase 3 — item 4 (F5 text size) DONE (Sonnet 5, 2026-07-03); item 6 (F4 sticky jump-bar
      + back-to-top) DONE (Opus 4.8, 2026-07-03, owner-run on Opus); item 7 (F7 screener CTA)
      DONE (Sonnet 5, 2026-07-03); item 8 (F3 inline glossary links) DONE (Opus 4.8, 2026-07-03);
      item 9 (F9 copy buttons) DONE (Sonnet 5, 2026-07-03); item 10 (F13 brand play affordance)
      DONE (Sonnet 5, 2026-07-03); item 11 (F8 fuzzy search fallback) DONE (Opus 4.8, 2026-07-03)
- [x] **DESIGN OVERHAUL — F17 "cool clinical" recolor DONE (Opus 4.8, 2026-07-03)** — owner
      directive "brown is gross"; deep-research-backed; de-browned to cool neutrals, kept teal,
      clay→coral, AA-clean both themes. Follow-up: new open-book logo + softer bg.
- [x] **AUDIT-DRIVEN BATCHES DONE (Opus 4.8, 2026-07-03)** — 16-agent audit workflow → shipped:
      the 81 dead-end-chip BUG fix, cool scrims, per-view titles/meta, evidence-coverage panel,
      aria-live, iOS input-zoom fix, clear-filters, card focus rings, OG/theme-color meta, noscript,
      font-axis; then F26 glossary bridge, F21 related videos, F22 real ARIA tabs, F23 share link,
      F24 iOS scroll lock, F25 print sheet, F28-part reviewed-date, F29 related conditions,
      **F20 heading hierarchy**, **F18 on-this-page TOC**, **F10 PWA (offline)**. All verified both
      themes, AA-clean, console-clean. See PROGRESS.md.
- [x] **Phase 3 — most of the roadmap shipped.** The big items are done.
- [x] **F16 DONE (Opus 4.8, 2026-07-05)** — all remaining decorative emoji/abstract glyphs in render
      output → sprite icons (17 new symbols; reasoning.js×9 + videos.js×13 icon fields; callouts,
      energy-planner dots, goal ✓/✗ headers, goal-writer checks, clients questions, video ▷/🔗
      fallbacks). 0 console errors, 0 visible zero-size icons, both themes verified. See PROGRESS.md.
      Kept (documented): evidence ✓/⚠ status labels, copy-confirmation ✓, weak-goals list bullets,
      rigor.js flags — monochrome text dingbats / off-limits, not colour emoji.
- [x] **F6 DONE (Fable, 2026-07-06)** — absorbed into the Phase 4 hero recomposition: public mode
      now shows the plain subline INSTEAD of the long lede (above fold at 375×812 — verified, sub
      bottom 339px vs 812 fold, CTAs at 365px); clinical mode lede unchanged.
- [x] **PHASE 4 FOUNDATIONS DONE (Fable, 2026-07-06)** — owner approved "The Honest Atlas" direction;
      shipped F30 (Fraunces SOFT/WONK display cut + motion tokens), F31 (chapter coordinates),
      F32 (contour-field hero), F33 (View-Transition routes), + craft fixes. See Phase 4 section
      below + PROGRESS.md evidence. **Phase 4 queue is now the active queue.**
- [ ] **REMAINING needing input beyond code:** F19 progressive disclosure + F27 content gaps (both
      need CLINICIAN SIGN-OFF for plain-language / new clinical text) · F28 og:image PNG (image tooling).

### Model assignment (owner directive 2026-07-03)
| Model | Use for | Effort |
|---|---|---|
| **Sonnet (4.6+)** | Single-file, pattern-following items with an exact verify recipe: **F5, F4, F7, F9, F13, F6, F16** | default/medium |
| **Opus (4.8)** | Multi-step logic with edge cases but a clear spec: **F3 (DOM text-linking), F8 (fuzzy match), F10 (PWA/service worker)** | high |
| **Fable 5** | Done: foundation (F2, F1, F15, F11+12, topbar). Reserve for: F14 scoping if approved, new design judgment, anything touching the router or first-run UX | — |
Rule of thumb: if the item says "implement exactly this in this function," Sonnet. If it says
"handle these edge cases well," Opus. If it requires deciding *what good looks like*, Fable.

---

## Phase 1 — Audit findings (2026-07-01, evidence in PROGRESS.md)

### A. What is WORKING — do not regress
| Area | Evidence |
|---|---|
| Performance | 324 KB total, 12 assets, DOMContentLoaded 795 ms, load 1.5 s. No build step. |
| Keyboard search journey | `/` → type → Enter opens the right condition **drawer directly** (~3 s). |
| Rigor layer | 100% of 66 conditions / 58 assessments / 16 EBP findings carry strength+confidence+bias+sources; adversarially audited. |
| Dual mode + plain language | Public⇄Clinical + plain toggle, persisted, verified. |
| Accessibility base | Labels, focus trap, live-region announcements, combobox search, aria-current, prefers-contrast/forced-colors, AA contrast (measured 6.7–14.9:1). |
| Visual identity | Custom "warm clinical craft" system (Fraunces/Hanken/Spline, teal+clay, grain texture, custom SVG brand) — distinct, not generic. |
| Integrity | Zero console errors across all 12 routes (re-verified every session). |

### B. Backlog — audit findings (unprioritised; Phase 2 will number & sequence)

**Cognitive access / journey**
- **F1. No first-visit audience routing.** Default mode is `clinical`; no onboarding chooser.
  A parent landing here reads practitioner jargon first. Evidence: `defaultMode:"clinical"`,
  `onboardingPresent:false`. → One-time dismissible "Who are you here as?" chooser
  (2 big buttons → sets mode + goes to clients/foundations), `localStorage`-gated.
  Files: `assets/js/app.js` (start()), `assets/css/styles.css`.
- **F2. Dead-end assessment chips.** In a condition drawer, the "Relevant assessments" chips
  are `cursor:default`, not clickable — intent is clear but user must manually navigate +
  re-search. Evidence: `assessChipClickable:false`. → Make each chip a button →
  `asmtQuery=<abbr>; go("assessments")` (same pattern search already uses, app.js:~930).
  Files: `assets/js/app.js` (openCondition, ~line 560).
- **F3. Jargon unlinked.** "ADL", "IADL", etc. appear in drawers with no inline link to the
  58-term glossary. Evidence: `containsADL:true, adlIsLink:false`. → Auto-link first
  occurrence of glossary terms in drawer bodies (title-attribute tooltip + link to glossary).
  Files: `assets/js/app.js` (drawer render helpers).
- **F4. Mega-scroll pages.** Assessments page = 36,435 px tall; Videos = 30,643 px;
  no in-page section nav or back-to-top. Heavy attention/motor burden. → Sticky
  category jump-bar (reuse chip row) + back-to-top button; consider default-collapsed
  video buckets. Files: `assets/js/app.js` (renderAssessments/renderVideos), CSS.
- **F5. No text-size control.** Only browser zoom. Evidence: `textSizeControl:false`.
  → A/A+ toggle (3 steps, persisted, `html[data-fontsize]` scaling `--base-font`), topbar.
  Files: `index.html`, `app.js`, `styles.css`.
- **F6. Hero is poetic-first.** "The everyday is extraordinary." is craft, but the functional
  answer ("what is this site?") arrives only in the lede — a clarity cost for cognitive/
  low-literacy users, especially if the lede falls below the fold on mobile.
  → Keep the craft; add a mode-aware functional subline; verify mobile fold. Low risk.
- **F7. Screener discoverability.** The "Could OT help?" self-screener (public users' fastest
  answer) is inside Toolkit, the **last** nav item. → Surface it as a primary CTA on the
  clients page top + home pathway card ordering in public mode.

**Friction / utility**
- **F8. Search has no typo tolerance.** **Verified live:** "dimentia" → 0 results,
  "dementia" → 3, partial "strok" → 15 (substring OK, misspelling fails — common for the
  public audience). → Lightweight fuzzy fallback when exact yields 0 (bigram similarity,
  no dependency, keep exact-match ranking first). Files: `app.js` (runSearch).
- **F9. Tool outputs not copyable.** Goal writer / PICO / activity outputs offer print only.
  → "Copy" button per output (navigator.clipboard + fallback), announced via live region.
- **F10. No offline/installable support.** Static app, ideal PWA candidate; clinics/rural/
  low-data users benefit most ("help many"). → `manifest.json` + minimal cache-first
  service worker + install hint. Risk: SW cache staleness — version-stamped cache name,
  rollback = delete SW registration. Files: new `manifest.json`, `sw.js`, `index.html`.

**Visual quality (bar: no generic/AI-slop)**
- **F11. Emoji as category icons.** Condition chips use 🧠✋🧒🫧🌿✦; mode toggle uses 👤🩺;
  pathway cards use emoji too. Renders differently per OS, reads as filler, and is
  screen-reader noise where not hidden. Evidence: `emojiInChips`. → Replace with a small
  consistent inline-SVG icon set (1.5px stroke, brand teal/clay), `aria-hidden`.
  Files: `conditions.js` (icon field), `app.js`, `index.html`.
- **F12. Abstract nav glyphs.** ◆❖▤⬡⟲⊞ convey nothing semantically (evidence: `navGlyphs`)
  and vary by font. Same fix as F11 (one SVG sprite, one style).
- **F13. Stock YouTube red-play overlay.** Default YT play button SVG on every video card is
  the one generic element in an otherwise custom system. → Restyle play affordance to brand
  (teal circle, paper glyph). Files: `app.js` (videoItemHTML), CSS.

**Reach ("help many") — larger, Phase-2 scoping decisions**
- **F14. English-only.** A Spanish track would materially widen reach; big content lift —
  needs scoping (UI-strings-first vs full content) and native review. Flag, don't start.
- **F15. No shareable deep links to a specific condition.** Drawers aren't URL-addressable
  (`#/conditions` only) — clinicians can't send a client a direct link. → Hash sub-route
  `#/conditions/stroke` opens the drawer; also fixes back-button-closes-drawer expectation.
  Files: `app.js` (route(), openCondition).

### Journey map (measured)
| Journey | Steps | Time (programmatic) | Verdict |
|---|---|---|---|
| Load → first paint | — | 1.5 s | ✅ |
| Returning: `/` → "dementia" → Enter → drawer | 1 key + typing + Enter | ~3.0 s | ✅ best path in app |
| First-time: home → nav "Conditions" → card → drawer | 2 clicks | ~2 s + human scan time | ⚠️ works, but nothing routes the user by audience first (F1) |
| Public: home → "I'm looking for help" → clients → screener | 2 clicks + scroll | screener is below long content (F7) | ⚠️ |
| Condition drawer → its assessment | **impossible without manual re-navigation** | — | ❌ F2 |

---

## Phase 2 — Numbered execution plan (2026-07-01; one item per session, in this order)

Every session: implement the ONE item, then verify = `preview_start "ot-atlas"` → exercise the
item's checks → full route sweep → **0 console errors** → paste actual output into PROGRESS.md.
Constraints for all items: no frameworks, no build step, no new dependencies; keep design
tokens (`--teal`, Fraunces/Hanken/Spline); don't touch `rigor.js` ratings or clinical
text; keep `[hidden]{display:none!important}`.

> **PALETTE UPDATED 2026-07-03 (F17 "cool clinical" recolor).** The warm cream/clay system is
> gone. Current system: cool off-white base (`--paper #F4F6FA`), slate ink (`--ink #17212E`),
> cool-grey borders, **teal kept** (`--teal #156B66`), **coral accent** (`--clay #E4633F`, i.e.
> `--clay` is now coral not terracotta). Rule for any future color work: **accent colors used as
> small TEXT must use the `-deep` variant** (`--clay-deep`, `--sage-deep`, `--ochre-deep`,
> `--plum-deep`) — the vivid base is for fills only (fails AA as small text on the light base).
> Do NOT reintroduce warm cream/tan/brown. Verify AA in BOTH themes.

### 1. ✅ DONE (Fable, 2026-07-03) [F2] Make assessment chips in condition drawers clickable — LOW RISK
- **Why:** removes the only outright dead-end (accessibility: intent clear, action impossible).
- **Files:** `assets/js/app.js` → `openCondition()` (the `c.assess.map(...)` chip row).
- **How:** render `<button class="chip" data-asmt="${escapeHTML(a)}">` instead of the
  `cursor:default` span; after `openDrawer(...)`, wire clicks: `closeDrawer(); asmtQuery = <chip
  text with anything after "/" or "(" stripped>; go("assessments")`. (Same pattern the search
  index already uses for assessments.)
- **Verify:** stroke drawer → click "COPM" → lands `#/assessments` with ≥1 filtered result;
  repeat for a chip with a slash ("FIM / CARE" → strip → "FIM" matches). 0 console errors.
- **Time-to-goal:** drawer→assessment details: impossible → 1 click (~1 s).

### 2. ✅ DONE (Fable, 2026-07-03) [F1] First-visit audience chooser — MEDIUM RISK (intercepts first load)
- **Why:** cognitive access; public users currently land in clinical jargon unrouted.
- **Files:** `assets/js/app.js` (`start()` + one new function), `assets/css/styles.css`.
- **How:** if `localStorage.getItem("ot-mode") === null` show a small centered dialog
  (`role="dialog"`, `aria-labelledby`, reuse `trapFocus`, Esc = dismiss-as-clinical):
  two large buttons — "I'm looking for help for myself or my family" → `setMode("public");
  go("clients")`; "I'm a practitioner or student" → `setMode("clinical")` — plus a quiet
  "Just browsing" dismiss link. Any choice writes `ot-mode` so it never reappears. Wrap the
  whole feature in try/catch so failure can never block `start()`.
- **Verify:** `localStorage.clear()` → reload → chooser shows; keyboard: Tab cycles inside,
  Esc dismisses; choose public → mode=public + lands clients; reload → never reappears.
  0 console errors.
- **Time-to-goal (first-time public):** ~15 s undirected → ≤8 s directed.
- **Rollback:** delete the single call in `start()`.

### 3. ✅ DONE (Fable, 2026-07-03) [F15] Deep links: `#/conditions/<id>` opens the drawer — MEDIUM RISK (router)
- **Why:** clinicians/carers can share a direct link to one condition; back-button sanity.
- **Files:** `assets/js/app.js` → `route()`, `openCondition()`, `closeDrawer()`.
- **How:** in `route()`, split the hash on "/"; if key=`conditions` and a second segment
  exists, render conditions then `openCondition(seg)` (unknown id → just the page, no crash).
  In `openCondition`, `history.replaceState(null, "", "#/conditions/" + id)`;
  in `closeDrawer`, if hash has a sub-segment, `replaceState` back to `#/conditions`.
  Use replaceState (not hash assignment) to avoid re-triggering `hashchange`.
- **Verify:** load `http://localhost:4178/#/conditions/stroke` cold → drawer open on Stroke;
  close → hash reverts; search-driven drawer still works; bogus id `#/conditions/zzz` → page
  renders, no error. Full route sweep, 0 console errors.
- **Time-to-goal (shared link):** multi-step instructions → 1 click.
- **Rollback:** revert `route()` diff (it's additive parsing).

### 4. ✅ DONE (Sonnet 5, 2026-07-03) [F5] Text-size control — LOW-MEDIUM RISK
- **Why:** low vision + aging users; WCAG resize support beyond browser zoom.
- **Files:** `index.html` (topbar button), `assets/js/app.js` (persist like theme),
  `assets/css/styles.css`.
- **How:** change `body{font-size:16.5px}` → `font-size: var(--font-base, 16.5px)`;
  `html[data-fontsize="lg"]{--font-base:18.5px}` / `"xl"{--font-base:20.5px}`. One topbar
  button cycles default→lg→xl (aria-label "Text size", shows A/A+/A++), stores `ot-fontsize`,
  applied on init alongside theme.
- **Verify:** cycle persists across reload; at `xl` check drawer + condition cards + toolkit
  on `preview_resize` mobile (375px) — no clipped/overlapping text (screenshot). 0 errors.

### 5. ✅ DONE (Fable, 2026-07-03) [F11+F12] Replace emoji + abstract glyphs with a brand SVG icon set
      (21-symbol sprite in index.html; remaining decorative emoji split out as F16 below)
- **Why:** visual-quality bar (emoji = platform-inconsistent filler); SR noise removal.
- **Files:** `index.html` (inline `<svg style="display:none"><symbol id="i-…">` sprite; nav
  `<use>`), `assets/js/data/conditions.js` (`icon:` emoji → sprite key), `assets/js/app.js`
  (chip/pathway/mode-toggle markup), `assets/css/styles.css` (`.ni svg{width:16px}` etc.).
- **How:** ~14 simple 24×24 outline symbols, 1.5px stroke, `currentColor`, all `aria-hidden`:
  brain, hand, child, mind, leaf, star, heart, gear, book, compass, grid, play, person,
  stethoscope. Keep shapes minimal (2–4 paths each) — no detailed illustration.
- **Verify:** no emoji remain in nav/chips/mode toggle (`document.body` querySelector text
  check on those containers); screenshot nav + condition chips in both themes. 0 errors.

### 6. ✅ DONE (Opus 4.8, 2026-07-03) [F4] Long-page navigation: sticky jump-bar + back-to-top — LOW RISK
> Shipped: `.sticky-jump` (sticky category chip-row on assessments; sticky jump chip-list on
> videos, buttons + measured `scrollTo` — NOT hash anchors, which the router would hijack) +
> `#backToTop` FAB (reveals past 2 viewports, reduced-motion-safe). Mobile: sticky bar becomes a
> single horizontally-swipeable row (`@media max-width:600px`) so 13 chips don't stack to 537px.
- **Why:** 36k px (assessments) / 31k px (videos) scroll burden = attention + motor cost.
- **Files:** `assets/js/app.js` (`renderAssessments`, `renderVideos`), `assets/css/styles.css`.
- **How:** make the existing category chip-row sticky (`position:sticky; top:var(--topbar-h)`,
  solid bg, z below topbar). Videos: give each bucket `id`, add an anchor jump list at top.
  Floating "↑ Top" button (appears after ~2 viewport-heights, `aria-label="Back to top"`,
  respects reduced-motion).
- **Verify:** scroll assessments → chip row stays visible (constant `getBoundingClientRect().top`);
  back-to-top appears + works; video anchors land on buckets. 0 errors.

### 7. ✅ DONE (Sonnet 5, 2026-07-03) [F7] Screener discoverability for public users — LOW RISK
- **Why:** the fastest public answer ("could OT help?") hides in the last nav item.
- **Files:** `assets/js/app.js` (`renderClients`, `renderHome`).
- **How:** clients page: prominent CTA card at top — "2-minute check: could OT help? →"
  linking `#/toolkit` (screener is already the default tab). Public-mode home: mention the
  check in the clients pathway card copy.
- **Verify:** public mode → clients top shows CTA → click → screener visible. 0 errors.

### 8. ✅ DONE (Opus 4.8, 2026-07-03) [F3] Inline glossary links in condition drawers — MEDIUM RISK
> Shipped: `linkifyGlossary()` walks text nodes of `.drawer-body p` (TreeWalker, skips inside
> `<a>`), links first occurrence of each glossary term/abbreviation, cap 4/drawer, → `#/resources`
> with `glossQuery`. Abbreviations matched case-SENSITIVE (so "AT"/"GAS" never link the words
> "at"/"gas"); parenthetical qualifiers like "(MOHO)"/"(OTPF-4)" excluded via first-letter
> heuristic. New `.gloss` CSS class (dotted underline). Verified across all 66 conditions.
- **Why:** jargon ("ADL", "proprioception") blocks public readers; glossary already exists.
- **Files:** `assets/js/app.js` (post-process inside `openCondition` after `openDrawer`).
- **How:** AFTER the drawer is in the DOM, walk **text nodes** of `.drawer-body p` only
  (never regex over HTML strings): for each glossary entry, match term OR its parenthesised
  abbreviation (e.g., "ADL") on word boundaries, link the FIRST occurrence per drawer to
  `#/resources` setting `glossQuery`, `title` = first 80 chars of the definition. Cap 4 links
  per drawer. Skip in plain-language/public mode? No — links help both; keep.
- **Verify:** stroke drawer → at least one `.gloss` link exists; click → resources page,
  glossary filtered to that term; no broken HTML (drawer text unchanged apart from links).
  0 errors.
- **Rollback:** remove the single post-process call.

### 9. ✅ DONE (Sonnet 5, 2026-07-03) [F9] Copy button on every tool output — LOW RISK — **MODEL: SONNET, medium**
- **Why:** users act on tool results outside the app (email to GP, paste into notes).
- **Files:** `assets/js/app.js` (the 5 `wire*` tool functions or one delegated handler),
  `assets/css/styles.css`.
- **How:** inject a small "Copy" button into each rendered `.tool-output`;
  `navigator.clipboard.writeText(el.innerText)` with `document.execCommand("copy")`
  fallback; on success set button text "Copied ✓" for 2 s + `announce("Copied to clipboard")`.
- **Verify:** generate a goal → click Copy → button flips to "Copied ✓" and live region
  updates; all 5 tools. 0 errors.

### 10. ✅ DONE (Sonnet 5, 2026-07-03) [F13] Brand the video play affordance — LOW RISK, cosmetic
- **Why:** the red default-YouTube play SVG is the one stock element left.
- **Files:** `assets/js/app.js` (`videoItemHTML`), `assets/css/styles.css`.
- **How:** replace with a teal circle + paper-cream triangle (matches brand mark), keep the
  hover scale; still `aria-hidden` (card link already labels the video by title).
- **Verify:** screenshot a video card, both themes. 0 errors.

### 11. ✅ DONE (Opus 4.8, 2026-07-03) [F8] Fuzzy fallback for search misspellings — LOW-MEDIUM RISK
- **Why:** verified: "dimentia" → 0 results; public users misspell medical terms.
- **Files:** `assets/js/app.js` (`runSearch`).
- **How:** only when exact-substring yields 0 AND query length ≥ 4: score index titles by
  bigram Dice similarity (inline ~10-line function, no dependency), threshold ≥ 0.4, top 8,
  rendered under a status row "No exact match — showing close matches". Exact path untouched.
- **Verify:** "dimentia" → Dementia appears; "strok"/"copm" behave exactly as before
  (exact path); nonsense "qqqq" → clean empty state. 0 errors.
- **Rollback:** delete the fallback branch.

### 12. [F10] PWA: manifest + versioned service worker — HIGH RISK — **MODEL: OPUS, high effort**
- **Why:** offline/installable = clinics, rural, low-data users; the app is fully static.
- **Files:** NEW `manifest.json`, NEW `sw.js` (repo root), `index.html` (link + registration).
- **How:** manifest (name, short_name "OT Atlas", theme `#156B66`, bg `#F7F0E3`, the existing
  SVG favicon as icon — note some browsers want PNG; accept degraded install UX and say so in
  PROGRESS.md). `sw.js`: `const CACHE="ot-atlas-v1"` — cache-first for same-origin GET,
  network fallback; on activate, delete non-matching caches. Register behind
  `if("serviceWorker" in navigator)`.
- **RULE FOR ALL LATER SESSIONS: any session that edits assets MUST bump the `CACHE` version
  string in `sw.js`, or users get stale code.** Add this rule to the session protocol when done.
- **Verify:** reload twice → `navigator.serviceWorker.getRegistrations()` length 1;
  `caches.keys()` shows `ot-atlas-v1`; route sweep 0 errors. (True offline can't be simulated
  in this preview — state that honestly in PROGRESS.md.)
- **Rollback:** remove registration line + `sw.js`; bump cache name to force-clear clients.

### 13. ✅ DONE (Fable, 2026-07-06 — absorbed into Phase 4 hero) [F6] Mode-aware functional hero subline
- **Why:** poetic hero delays the "what is this?" answer for cognitive/low-literacy users.
- **Files:** `assets/js/app.js` (`renderHome`).
- **How:** under the hero title, one plain sentence — public: "Find out whether occupational
  therapy could help you or your family — and how to get it."; clinical: keep current lede.
  Check the sentence is visible above the fold at 375×812 (`preview_resize` mobile).
- **Verify:** both modes render correct subline; mobile screenshot shows it above fold. 0 errors.

### 14. [F16] Replace remaining decorative emoji — LOW RISK — **MODEL: SONNET, medium**
- **Why:** finish the icon-consistency job: reasoning-mode cards (`reasoning.js` icon field:
  🔬🧩⚙️🤝…), video bucket headings (`videos.js` icon field), and callout icons (ℹ️⚠️💡 in
  `app.js`) still use emoji.
- **Files:** `assets/js/data/reasoning.js`, `assets/js/data/videos.js`, `assets/js/app.js`,
  `index.html` (add any missing symbols to the sprite — copy the existing symbol style:
  24×24, stroke 1.8, currentColor, 2–4 simple paths, NO detailed illustration).
- **How:** same pattern as the done F11/12 work: data `icon:` fields become sprite keys,
  render sites call `icn(key)` (helper already exists in app.js).
- **Verify:** no emoji in reasoning cards / video headings / callouts; all new `<use>`
  targets resolve (no zero-size svgs: `[...document.querySelectorAll('svg.icn')].filter(v=>v.getBoundingClientRect().width<8).length === 0`). 0 console errors.

---

## Phase 4 — AWARD PUSH: "The Honest Atlas" (direction approved by owner 2026-07-06)

> **Direction (decided by Fable, owner-approved from a 3-option proposal):** the app finally LOOKS
> like what it's named — a cartographic-editorial atlas. Foundations shipped 2026-07-06 by Fable:
> **F30** Fraunces display cut (SOFT/WONK axes, display tier only) + motion tokens (`--dur-1/2/3`),
> **F31** chapter-coordinate stamps ("06 · THE FRAMEWORK", injected by `stampCoord()` in route()),
> **F32** contour-field hero with coordinate-pinned live stats (+ F6 plain subline in public mode),
> **F33** View-Transition route choreography (Baseline in all engines 2026; PRM-gated twice),
> plus craft fixes (thin sidenav scrollbar, brand `::selection`, drawer close = `i-cross` sprite).
> Everything below builds on those tokens/patterns. Evidence + research citations in PROGRESS.md.

**Award strategy (research-verified, sources in PROGRESS.md):** the proven health/education path is
editorial brand-system craft + pedagogical clarity + ONE structural signature artifact — NOT WebGL
spectacle. Realistic targets in order: Awwwards Honorable Mention + Typography honors, CSSDA WOTD,
Webby (Health & Wellness / Education), plus dedicated accessibility programs (dual-track: document
WCAG conformance + reduced-motion behavior for every item below). Juror disqualifiers to audit
against before submitting: template feel, uniform cards, entrance-fade-only motion, purposeless
effects.

**Hard constraints (unchanged):** no frameworks, no build step, no dependencies; teal `--teal` +
coral `--clay` (+`-deep` variants for accent TEXT); AA both themes; never edit rigor.js ratings or
clinical text; `[hidden]{display:none!important}` stays; **bump `sw.js` CACHE every session that
edits an asset** (at `ot-atlas-v14` as of 2026-07-16). New motion MUST use `--dur-1/2/3` + `--ease` and be
PRM-safe; new display type must never put `"wght"`/`"opsz"` in `font-variation-settings`.

**⚠️⚠️ THE KIT RATION (2026-07-09, owner: "i'm tired of seeing ai slop design" — second strike).**
Root cause named: the slop is not the motifs, it is the COMPONENT KIT — rounded bordered cards,
chips, icon-callouts, bullet grids, assembled at one rhythm on every page. Decoration on a kit is
still a template. The app's native language is THE BOOK'S — shipped as F48 on the therapy
comparison (numbered figures `FIG. 02·A`, hairline column rules instead of boxes, run-in prose
instead of bullets, figure captions). FROM NOW ON, for every item in this plan:
- **Boxes are rationed.** New surfaces default to rules/hairlines/whitespace, NOT bordered cards.
  A box must earn its border (interactive target, true containment). Never add a grid of
  same-size bordered rectangles.
- **Bullets are rationed.** Reference lists inside prose surfaces become run-in labelled prose
  (`.dp-prose`/`.dp-run`) or set tables — `ul.ticks` is for genuine checklists only.
- **Figures, not decorations.** Any new diagram/visual joins the numbered figure system
  (`.fig/.fig-cap/.fig-no`, chapter-scoped numbers like 02·A) with a caption that makes a claim.
- **One rhythm per page is failure.** Long pages must vary density (figure → prose → table →
  aside), not repeat card-grid sections.
- F34/F35/F36/F39 executors: apply this ration to every surface you touch; converting an existing
  card-grid you're already editing into figure language counts toward the item.

**⚠️ OWNER DESIGN BAR (2026-07-06): "nice but new-slop" = FAILURE.** The 2026 second-generation
template look is: tracked mono uppercase labels everywhere + muted editorial serif + abstract
technical decoration (contours/crosshairs/coordinates) + grids of identical rounded white cards +
perfect symmetry. The app currently exhibits several of these. EVERY Phase 4 item must (a) remove
at least one slop tell from its surface, and (b) pass this test before its PROGRESS entry:
*"could this screenshot be any wellness startup, or is it unmistakably an occupational-therapy
atlas?"* Items 25–26 attack the tells head-on; do not add new tracked-mono surfaces or new
uniform-card grids anywhere.

### 16. [F34] Type-scale + tracking consolidation — MEDIUM-HIGH RISK (global) — **MODEL: OPUS, high**
- **Why:** the 2026-07-06 audit counted ~32 static font-sizes (8 of them between .58 and .72rem all
  serving the same mono micro-label role — differences ≤0.4px), 13 letter-spacing values for one
  label role, a fragmented card-title tier (1.16/1.12/1.12/1.08rem), no `h4` size rule, and ZERO
  `font-variant-numeric` anywhere. Jurors grep for exactly this; consolidation is the craft.
- **Files:** `assets/css/styles.css` only (+ `sw.js` CACHE bump, always).
- **How:** (1) Add tokens to `:root`: `--text-2xs: .7rem; --text-xs: .72rem; --text-sm: .82rem;
  --text-md: .9rem; --text-card: 1.12rem; --track-label: .08em; --track-eyebrow: .16em`.
  (2) Collapse by ROLE — the bucket lists below are AUTHORITATIVE (do not re-round):
  `.58/.6/.62/.64/.66 → --text-2xs (.7rem)` — the deliberate micro-label legibility rise: rem is
  ROOT-relative (16px; body's 16.5px does not change rem), so these currently render 9.3–10.6px
  and rise to 11.2px (+0.6 to +2.0px, intended);
  `.68/.7/.72 → --text-xs (.72rem)` (deltas ≤ 0.66px);
  `.76/.78/.8/.82/.85 → --text-sm (.82rem)` (deltas ≤ 0.99px);
  `.88/.9/.92 → --text-md (.9rem)` (deltas ≤ 0.33px);
  card-title tier `.itemcard h2 / .acc-title / .cc-name / .welcome-btn strong → --text-card`
  (deltas ≤ 0.66px). Leave UNTOUCHED: body size, all **6** fluid clamps (page-title, lede,
  section-head, hero-title, hero-lede, hero-sub), `.94/.95/.98/1rem+` sizes, anything in the
  print block. (3) Letter-spacing: LABEL-ROLE rules only (.02–.12em band) `→ var(--track-label)`;
  `.nav-eyebrow`/`.eyebrow` (.16/.18em) `→ var(--track-eyebrow)`; heading negatives (-.01/-.02em)
  stay as-is. (4) Add `font-variant-numeric: tabular-nums` to `.stat .num`, `.tl-item .yr`,
  `table.data`, `kbd`. (5) Give `h4` an explicit `1rem` rule (dead rung fix).
- **Verify:** each collapsed element computes to EXACTLY its bucket token; deltas match the
  expectations above (≤1px everywhere except the deliberate 2xs rise, +0.6–2.0px — enumerate the
  risen selectors in PROGRESS.md); screenshot diff home/conditions/drawer/toolkit both themes; the
  eyebrow/chip/badge rows must not wrap differently at 375px; 12-route sweep node counts unchanged
  (CSS-only); 0 console errors.
- **Risk/rollback:** global visual change → work token-by-token, screenshot after each role group;
  rollback = revert the CSS diff.

### 17. [F35] Chapter identity rollout — MEDIUM RISK — **MODEL: OPUS, medium**
- **Why:** F31 shipped the coordinate stamp; the header is still one rubber stamp ×12 (audit: the
  italic `em` word even repeats — "practice" ×2, "library" ×2, and Conditions/Assessments share the
  exact eyebrow text "Reference library").
- **Files:** `assets/js/app.js` (render fn headers, `stampCoord`), `assets/css/styles.css`.
- **How:** (1) Give each nav group an accent: ORIENTATION teal / THE FRAMEWORK plum / REFERENCE
  **ochre** / GET HELP & DO clay — sage is deliberately NOT used (it is the evidence-strength
  color on those same reference pages; a chapter accent in sage would collide semantically).
  Applied ONLY as the `.coord` chip border+text and the eyebrow dash (`.eyebrow::before`), via a
  `data-chapter` attribute route() sets on `#main`; text colors MUST use the `-deep` variants (AA
  rule). (2) De-duplicate the four repeated eyebrow/em words with new copy.
  (3) Design a mobile coord variant (currently `display:none` ≤600px): drop the border, keep
  "06 ·" prefix inline in the eyebrow text — reclaims identity without costing a hero line.
  (4) Library masthead variation: on conditions/assessments move the search/filter input UP into
  the masthead row beside the title (the audit's "vary header composition on the two library pages").
- **Verify:** all 12 routes show group-correct accent (screenshot 4 groups × both themes); AA ≥4.5:1
  on every accent text (measure); coord visible at 375px in its inline form, hero subline still
  above fold; masthead search still filters (type "strok" → count updates) AND the masthead row
  does not wrap badly at 375px (screenshot); sweep + 0 errors.
- **Rollback:** remove `data-chapter` + revert header copy lines.

### 18. [F36] Specimen-plate condition drawer — HIGH VALUE, MEDIUM-HIGH RISK — **MODEL: OPUS, high**
- **Why:** the drawer is the app's core object (both audiences converge on it) and is currently a
  generic white modal (audit: "rich content in a generic modal shell"); the atlas metaphor demands
  a specimen plate. This is the single highest-leverage juror surface after the hero.
- **Files:** `assets/js/app.js` (`drawerShell`, `openCondition`), `assets/css/styles.css`.
- **How:** (1) Header band: category-tinted strip carrying the category icon (`icn(cat.icon)`),
  the coordinate-style plate stamp `PLATE 07·<n> — <CATEGORY>` (n = index within category), and
  the existing title/share/close. **Category→tint map (6 categories, write it exactly):**
  neuro→teal-tint · hand→ochre-tint · peds→sage-tint · mh→plum-tint · geri→clay-tint ·
  spec→NEUTRAL (`--paper-2` band, `--ink-soft` text) — there are only 5 tint families; Specialty
  & Other reads correctly as neutral. Any TEXT on a tint uses the matching `-deep` token (AA).
  (2) Taxonomy line under the title in specimen-label mono: `<category> · <first 2 settings>`
  (settings is a "·"-separated string in the condition data — split it; do NOT invent content).
  (3) Promote the evidence rating: small SVG arc-dial next to the badge. **Strength → arc fill is
  a FIVE-step scale (rigor.js strengthLevels): strong 5/5 · moderate 4/5 · emerging 3/5 ·
  contested 2/5 · insufficient 1/5;** confidence (high/medium/low) → 3/2/1 tick marks. Keep the
  dot+label text (non-color-only a11y) exactly as-is; the dial is `aria-hidden` reinforcement.
  (4) Sticky mini-nav inside the drawer listing its h3 sections (reuse the `buildPageTOC` pattern
  scoped to `.drawer-body`; buttons + measured scroll, not anchors).
- **Verify:** open **stroke (neuro) / asd (peds) / dementia (geri)** — three DIFFERENT band tints +
  icons + plate numbers correct (note: `burns` is cat neuro, `autism`'s id is `asd` — don't repeat
  the planning mistake); taxonomy line matches the condition's own data; evidence dial's arc step
  matches the badge's strength word on 5 random conditions across ≥3 strength levels (script the
  comparison against the 5-step map above); share/deep-link/glossary links/related chips all still
  work; drawer scroll lock + focus trap intact; print stylesheet still renders the drawer inline
  (check `@media print` rules don't hide the new band); both themes AA; 0 console errors.
- **Rollback:** `drawerShell` diff is contained; revert it + the CSS block.

> **F49/F50 shipped 2026-07-16 (Fable):** the reference library (conditions + assessments) and
> the new `#/directory` (chapter 13) now use THE INDEX language — `.idx-*` in styles.css: rows
> on hairlines, stable plate numbers (07·n / 08·n / 13·n), `<details>` disclosure. Header brand
> clip bug at 601–999px fixed (tagline hidden ≤999px). **Critique follow-ups assigned:** F35's
> executor also de-kits the MODELS page card grid (green pill headers + truncated "…" descs →
> index or figure language; it's a chapter-identity surface). F37's executor applies the ration
> to the toolkit screener (stack of white checkbox cards; unchecked boxes render as heavy solid
> squares — restyle as a genuine `ul.ticks`-style checklist on hairlines). F39's choreography
> pass should look at the three stacked "More about…" accordion bars on foundations (legal —
> interactive — but kit ×3; vary or merge). Details in PROGRESS.md 2026-07-16.

### 19. [F37] States with personality + the silent-retry bug — LOW-MEDIUM RISK — **MODEL: SONNET, medium**
- **Why:** audit: loading is bare text, empty states are single `<p>`s, and there is NO error state —
  `start()` retries every 40ms FOREVER if a data file fails ("Loading the atlas…" for eternity).
  The best-crafted fallback in the app is currently hidden (the branded video thumb).
- **Files:** `assets/js/app.js` (`start()` at ~1556 — the unconditional `setTimeout(start, 40)`
  retry; empty-state sites: grep for "No conditions match", "No assessments match",
  "No terms match", and the `search-empty` block — line numbers drift, the strings don't),
  `index.html` (loading markup `.view-loading`), `assets/css/styles.css`.
- **How:** (1) BUG FIX: cap `start()` retries at ~75 (≈3s), then render a branded error card
  ("The atlas didn't load — reload usually fixes this" + reload button + which file failed if
  known). (2) Loading: the open-book brand mark drawing itself via `stroke-dasharray`/`dashoffset`
  animation (PRM: static mark). (3) Empty states: one shared `.empty-state` component — compass icon,
  message, and the existing recovery actions (clear-filters button / clickable suggestion chips in
  the search overlay — currently plain text). (4) `pageFoot()` → map-legend colophon: reviewed date
  (exists), typeface credits, WCAG note, + "Continue the atlas → <next chapter>" link driven by
  ROUTE_COORD order; **toolkit (12 of 12) wraps to home — "Start again at the beginning →"**.
- **Verify:** data-failure recipe that actually works in the headless preview (devtools blocking
  doesn't exist there, and the cache-first SW will serve a renamed file from cache — the app's own
  footgun): (a) `mv assets/js/data/conditions.js` aside via Bash; (b) `preview_eval`:
  `navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister()))`; (c) hard
  reload → error card must appear within ≈3s with a working reload button; (d) restore the file,
  reload twice (SW re-registers), confirm `caches.keys()` is current again. Then: empty states
  render on zero-result filters + search; suggestion chips clickable → run that search; every page
  shows the colophon + correct next-chapter link (12/12, incl. the toolkit→home wrap); loading
  animation PRM-static; sweep + 0 errors.
- **Rollback:** each piece is an isolated function; revert individually.

### 20. [F38] Scroll-driven reveals + stagger rollout — LOW RISK (progressive) — **MODEL: SONNET, medium**
- **Why:** per-ELEMENT stagger exists only on home; the other 11 pages get just the block-level
  `.page` fade-up (they animate as one slab, not as composed content). Research: scroll-driven
  pacing is the winning baseline; CSS scroll-driven animations are NOT in stable Firefox (≈v155,
  Sept 2026) so the effect must be gated; the classic `opacity:0`-in-base pitfall must be avoided.
- **Files:** `assets/css/styles.css`, `assets/js/app.js` (add `stagger` class to top-level page
  sections in each render fn).
- **How:** EXACT pattern (verified 2026-07-06, sources in PROGRESS.md): base styles fully visible;
  all hiding lives inside `@media (prefers-reduced-motion: no-preference){ @supports
  (animation-timeline: view()){ .card-reveal { animation: card-reveal linear both;
  animation-timeline: view(); animation-range: entry 0% entry 60%; } } }` with a FROM-ONLY keyframe
  (`from { opacity:0; transform: translateY(1.1rem) }` — no `to`, natural state is the end state).
  Apply `.card-reveal` to grid cards on the long pages; extend `.stagger` (fixed 8-step delays) to
  the headers of the other 11 pages. Durations from `--dur-*` only.
- **Verify:** cards visible with animations OFF (eval: toggle `Emulation.setEmulatedMedia` PRM or
  strip the @supports via a test stylesheet — content must be fully visible either way); Chrome
  preview shows reveal on scroll (assessments page); 12-route sweep unchanged counts; 0 errors.
- **Rollback:** delete the two CSS blocks + class additions.

### 21. [F39] Interaction choreography pack — MEDIUM RISK — **MODEL: OPUS, medium**
- **Why:** audit: "good hover layer, zero choreography" — grid filtering wholesale-replaces
  innerHTML (cards blink), filter chips give no result preview, theme toggle swaps icons with no
  transition.
- **Files:** `assets/js/app.js` (`renderConditions`/`renderAssessments` filter paths, theme toggle),
  `assets/css/styles.css`.
- **How:** (1) FLIP-animate grid filtering: record card positions (First), re-render (Last), invert
  with transforms, play with `--dur-2` — **if the visible card count exceeds 60 (e.g. conditions
  "All" = 66 cards), skip the animation and swap instantly**; always skip under PRM. Prefer
  wrapping the redraw in a view transition with `view-transition-class` on cards — simpler than
  manual FLIP; decide by testing both, document which won.
  (2) Live counts on category/strength chips (`(12)` suffix, `aria-label` updated).
  (3) Theme toggle: crossfade/rotate morph between sun/moon (`--dur-1`). (4) Copy/share: unify the
  "Copied ✓" pattern into a small toast anchored to the button (existing `announce()` untouched).
- **Verify:** filter stroke→neuro on conditions — cards glide, not blink (or VT fallback documented);
  counts on chips match visible cards for 3 filters; PRM = instant swap; theme morph runs; toasts
  appear+clear; keyboard operability unchanged (chips still buttons); sweep + 0 errors.
- **Rollback:** each piece independent; the FLIP path falls back to the current instant redraw.

### 22. [F40] Count-up stat band + coverage mini-viz — LOW RISK — **MODEL: SONNET, small**
- **Why:** the hero's stat-band numbers are static text; the evidence coverage panel (the app's
  soul, per F17 research) is text-only cards. Small, high-charm.
- **Files:** `assets/js/app.js` (`renderHome`, `renderEvidence`), `assets/css/styles.css`.
- **How:** (1) IntersectionObserver + rAF count-up on **`.atlas-legend b`** (F43 replaced the old
  stat band with the legend strip) over ~`--dur-3`ms on first view only; under PRM render final
  numbers instantly (no JS motion, WCAG 2.3.3). **Two legend values are NOT pure integers
  ("8+", "${v}+"): parse the leading integer, count up, re-append the suffix** — or skip non-pure
  values; state which in PROGRESS.md. Requires F34's `tabular-nums` (no layout shift while
  counting). (2) Each
  coverage card gets a 60×8 SVG proportion bar (rated/verified/contested in sage/teal/clay tints)
  with the existing text unchanged (non-color-only preserved).
- **Verify:** numbers land on exact values (66, 58, …) after animation AND with PRM emulated
  (instant); no layout shift (measure `.stat` width before/during); coverage bars’ proportions match
  the text numbers; both themes AA on new elements; sweep + 0 errors.
- **Rollback:** remove the observer + bars.

### 23. [F41] Occupation Compass — the signature artifact — **GATED: needs a FABLE design session first**
- **Why:** research: reference-site winners each have ONE structural, un-copyable interactive
  artifact ("computed cross-linking… doubles as genuine utility"). Ours: the 9 OTPF-4 areas of
  occupation as an interactive compass dial — each sector deep-links into the atlas (pillars
  sections, condition filters, toolkit) — doubling as the brand device. The data cross-links exist.
- **Sequence:** (1) Fable session: prototype the dial (static SVG + sector hover/focus states,
  placement decision: hero contour-field slot vs its own home section), owner look. (2) Opus
  session(s): productionize (keyboard/SR interaction model — roving tabindex, sector labels,
  `aria-describedby` counts; mobile behavior; PRM). Do NOT start (1) without owner ping; do NOT
  start (2) without (1) in PROGRESS.md.

### 24. [F42] Submission prep + font-payload decision — GATED (owner + image tooling)
- **(a) Font pinning (code, Sonnet S):** the F30 URL loads SOFT 0..100 + WONK 0..1 as RANGES
  (measured cost ≈ +53KB/style vs pinned). Once F34/F35 settle the display voice, standardize
  `--display-soft` to ONE value `<S>`, then pin BOTH tuples of the full URL — **the italic tuple
  is load-bearing (`.hero-title em`/`.page-title em` are true italics); do not drop `ital`:**
  `family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,400..700,<S>,1;1,9..144,400..600,<S>,1`
  (pinned custom axes ≈ free, measured 2026-07-06). Verify: `document.fonts` loads; wonk still
  visible; **italic titles still render true italic** (e.g.
  `document.fonts.check('italic 400 24px Fraunces')` true + screenshot a `.page-title em`);
  payload re-measured in PROGRESS.md.
- **(b) og:image 1200×630 + 180×180 apple-touch PNG** of the contour-field hero (image tooling).
- **(c) Case-study page** (`#/colophon` or static) documenting the system: type axes, tokens,
  evidence-rigor layer, a11y + reduced-motion behavior — jurors and a11y-award panels both read this.
- **(d) Entries:** Awwwards (HM/Typography), CSSDA, Webby Health/Education, a11y programs — owner
  submits; prepare the asset checklist per program.

### 25. ✅ MOSTLY DONE (Fable, 2026-07-06 — same session as the critique) [F43] De-slop composition pass
> Shipped: Table-of-Plates contents index (11 chapter rows with real ROUTE_COORD numbers, replaces
> the 9-card grid), pathway hierarchy (primary tinted public path + 2 quiet mini rows), stat band →
> inline `.atlas-legend` strip, evidence coverage asymmetry (`.coverage-grid` 1.45fr + tinted first
> card), 6 tracked-mono-uppercase roles demoted (toc-label, card-meta, thead, out-label, ev-srch,
> filter-lead), radius/pill/shadow consolidation (24 literals → tokens; pills unified 999px).
> **Deferred honestly:** clients full-bleed band → do in the F35 session; drawer-h3 demotion →
> F36 (specimen plate restructures them anyway). NOTE for F40: the stat band no longer exists —
> count-up targets `.atlas-legend b` now. Evidence in PROGRESS.md.
- **Why (owner critique 2026-07-06):** the app reads "nice but new-slop." Root causes are
  compositional, not stylistic: (a) grids of identical rounded white cards (home has 9 identical
  feature-cards + 3 identical pathways + 6 identical stat cells — three uniform grids stacked);
  (b) perfect symmetry on every page; (c) tracked-mono-uppercase used for ~8 different label roles.
- **Files:** `assets/js/app.js` (`renderHome`, long-page render fns), `assets/css/styles.css`.
- **How (Fable decides final form; this is the brief):**
  (1) **Home "Explore the atlas" 9-card grid → a "Table of Plates" contents index** — numbered
  editorial rows (coordinate · title · one-line description · leader dots, like a book's contents
  page), NOT cards. This is the atlas metaphor made structural, kills the biggest uniform grid,
  and rows scan better than cards (cognitive access ✓).
  (2) **Pathway hierarchy:** the public path ("For clients & families") becomes visually primary
  (larger, tinted, illustrated — see F44); the other two become quieter secondary rows. Equal-weight
  triplets are a slop tell; real design has a point of view about what matters most.
  (3) **One grid-breaking element per major page** (e.g. evidence coverage panel offset/oversized,
  a full-bleed tinted band on clients) — asymmetry with purpose, never at the cost of readability.
  (4) **Surface consolidation** (the audit's findings, not yet done anywhere): 9 radius literals →
  the 3 tokens; 100px vs 999px pills → one; the 4th hard-coded shadow → tokens.
  (5) **Demote tracked-mono to ONE role** (the eyebrow/coordinate). Chips, table headers, counts,
  out-labels lose the uppercase+tracking treatment (keep mono family where data-ish, drop the
  shouting). Coordinates stay — they're tied to real IA, but they must stop having 8 cousins.
- **Verify:** home screenshot both themes — zero identical-card grids remain above the fold;
  contents index rows navigate correctly (click 3 → correct routes); pathway hierarchy visible at
  375px without burying "I'm looking for help"; radius/pill/shadow greps show only tokens; the
  label-role demotion doesn't break chip wrapping at 375px; 12-route sweep; 0 console errors;
  the owner slop-test question answered in PROGRESS.md with the screenshot.
- **Rollback:** renderHome diff + CSS block are contained; revert both.

### 26d. ✅ DONE (Fable, 2026-07-09) [F47] Discipline profiles + "More about…" expansions
> Owner: "missing key info per practice + enable expansion to learn more." Vetted international
> profiles (who/where/when/specialties/team/training) + card alias lines + accordion expansions
> on foundations. ⚠️ `foundations.js rows[].alias/more` **PENDING CLINICIAN SIGN-OFF — on the F27
> checklist with the F46 overlaps.** Visual spot-check screenshot due at next session start
> (preview screenshot channel wedged; functional evidence complete in PROGRESS.md). CACHE v11.

### 26c. ✅ DONE (Fable, 2026-07-09) [F46] OT/PT/SLP overlap Venn (owner: "show the overlaps")
> Research-grounded (AOTA/APTA/ASHA + .gov, adversarially accuracy-checked) overlap zones added to
> the foundations comparison as a wobbly-line Venn + accessible zone list. ⚠️ The 16 zone items in
> `foundations.js vsOthers.overlaps` are **PENDING CLINICIAN SIGN-OFF — add to the F27 review
> checklist.** Contested boundaries deliberately soft-worded (dysphagia: "roles vary by setting").
> Evidence in PROGRESS.md. CACHE v9.

### 26b. ✅ DONE (Fable, 2026-07-09) [F45] First-visit welcome redesign (owner: "boring, not easy")
> Need-first dialog: choices phrased as the visitor's question with destination fragments +
> drawn objects (mug / NEW i-obj-pencil) + corner contours; meta-paragraph deleted (footnote
> reassurance); all F1 behavior preserved (trap/Esc/deep-link guard/landings). Evidence in
> PROGRESS.md. CACHE v8.

### 26. [F44] "The everyday, drawn" — product-specific art layer — **GATED: FABLE design session (can share the F41 session)**
- **Why:** the contour field is craft but ABSTRACT — any site can have topo lines. The brand thesis
  is "the everyday is extraordinary": the un-copyable move is making the everyday VISIBLE. No
  template and no other product would draw a button-hook, a kettle, a shoelace as hero art —
  because those objects only mean something HERE.
- **What:** ~10 consistent line-drawn everyday-object spot illustrations (cup, shoe+lace, key,
  spoon, kettle, pencil, phone, plant, door handle, sock aid) in the icon system's stroke language
  (1.8px, currentColor) but larger (~64–96px) and looser — deployed: the hero contour field
  (objects sit at the crosshair coordinates — "the terrain of the everyday", replacing abstract
  markers), chapter openers (one object per chapter), empty states (F37 hooks), the primary
  pathway card (F43 hooks), drawer category plates (F36 hooks).
- **Sequence:** ✅ PHASE 1 DONE (Fable, 2026-07-06): mug/shoe/key drawn (`i-obj-*` symbols) and
  placed — hero contour coordinates (replacing the abstract crosshairs) + the search empty state.
  AWAITING OWNER LOOK → then batch the remaining ~7 objects (kettle, spoon, pencil, plant, door
  handle, sock aid, phone) + deployments (chapter openers, F37 empty states, F43 primary pathway,
  F36 drawer plates); Opus wires those. A11y: all decorative, `aria-hidden`, no meaning carried by
  illustration alone. NOTE for executors: coral accent strokes inside the symbols are INLINE-styled
  (`style="stroke:var(--clay)…"`) because CSS cannot select into `<use>` shadow DOM — copy that
  pattern for new objects.
- **Verify (when built):** consistent stroke weight across the set (computed check); hero still
  ≤ fold-safe on mobile (field stays hidden ≤860px); no new AA or sweep regressions; slop-test
  answered in PROGRESS.md.

### Phase 4 session queue
Every item's Files list implicitly includes **`sw.js` (CACHE bump, always — any asset edit)**.
| Session | Model / effort | Item |
|---|---|---|
| ~~next~~ | ~~Fable~~ | ~~25 — F43~~ ✅ DONE 2026-07-06 (clients bleed-band rides with 17; drawer-h3 demotion rides with 18) |
| ~~next~~ | ~~Opus~~ | ~~16 — F34~~ ✅ DONE 2026-07-16 (agent + Fable verify) |
| ~~+3~~ | ~~Opus~~ | ~~17 — F35~~ ✅ DONE 2026-07-16 (incl. models de-kit) |
| ~~+4~~ | ~~Opus~~ | ~~18 — F36~~ ✅ DONE 2026-07-16 |
| ~~+5~~ | ~~Sonnet~~ | ~~19 — F37~~ ✅ DONE 2026-07-16 (incl. screener ration) |
| ~~+6~~ | ~~Sonnet~~ | ~~20 — F38~~ ✅ DONE 2026-07-16 (+ hidden-doc hardening) |
| +7 | Opus, medium | 21 — F39 **second half only** (FLIP filtering, chip counts, theme morph, toast — needs a foreground-tab session; disclosure half ✅ DONE 2026-07-16) |
| +8 | Sonnet, small | 22 — F40 count-up + coverage viz |
| gated | Fable → Opus | 23 — F41 Occupation Compass + 26 — F44 "the everyday, drawn" (one shared Fable design session; owner ping first) |
| gated | Sonnet + owner | 24 — F42 submission prep (font pinning is un-gated code) |

### 15. [F14] Spanish track — **GATED: DO NOT START without owner approval**
- Options to present, not build: (a) UI chrome + clients/screener pages only (~2–4 sessions,
  machine-draft + flagged for native review); (b) full content (15+ sessions, native review
  required — clinical accuracy risk in translation is real). Decision logged in PROGRESS.md
  Open Questions.

### Sequence summary
| # | Item | Risk | Expected effect on time-to-goal |
|---|---|---|---|
| 1 | F2 clickable assessment chips | low | drawer→assessment: impossible → 1 click |
| 2 | F1 first-visit chooser | med | first-time public: ~15 s → ≤8 s |
| 3 | F15 condition deep links | med | shared link → answer: 1 click |
| 4 | F5 text size | low-med | readability for low-vision users |
| 5 | F11+12 SVG icon set | low | visual consistency (no time change) |
| 6 | F4 sticky jump-bar + top | low | assessments/videos scan time ↓ |
| 7 | F7 screener CTA | low | public "could OT help?": buried → 2 clicks |
| 8 | F3 glossary links | med | jargon lookup: manual → 1 click |
| 9 | F9 copy buttons | low | tool result → use elsewhere: 1 click |
| 10 | F13 brand play button | low | visual bar |
| 11 | F8 fuzzy search | low-med | misspelled search: dead end → results |
| 12 | F10 PWA | **high** | offline/repeat visits; needs version rule |
| 13 | F6 hero subline | low | first-visit comprehension |
| 14 | F14 Spanish | gated | reach — pending decision |

## Session prompts (paste-ready — includes model + effort)

**Universal prompt template** (fill the ⟨item⟩; everything else stays identical):

> Read PLAN.md and PROGRESS.md in this folder first — they are the full context; do NOT
> re-read the whole repo. Log to PROGRESS.md incrementally as you work (a `[PARTIAL]` entry
> first, ticked sub-steps as you go) in case the session is cut.
> Implement **exactly one item: PLAN.md item ⟨N⟩ (⟨Fx name⟩)** — follow its "How" and
> "Files" precisely; do not touch anything else.
> Hard constraints: no frameworks, no build step, no dependencies; keep the design tokens
> (Fraunces/Hanken/Spline, `--teal`/`--clay` CSS vars); never edit rigor.js ratings or
> clinical text; keep `[hidden]{display:none!important}`; the icon helper is `icn(key)` in
> app.js and the sprite lives in index.html.
> Verify with the item's "Verify" recipe using the preview tools (`preview_start "ot-atlas"`,
> port 4178) + a 12-route sweep + zero console errors — paste ACTUAL output into PROGRESS.md,
> never claim success without it. If anything is ambiguous, write it under "Open Questions"
> in PROGRESS.md and stop rather than guessing.
> Finish: completion entry in PROGRESS.md (timestamp, files, evidence, exact next item), then
> output "Checkpoint reached. Progress logged. Ready for next session."

**Session queue — SUPERSEDED 2026-07-06: the active queue is the Phase 4 table below.** Done: items
4–14 (F5, F4, F7, F3, F9, F13, F8, F10 PWA, F6, F16), **F17 recolor**, Phase 4 foundations (F30–F33).
| Session | Model / effort | Item |
|---|---|---|
| — | — | see "Phase 4 session queue" |
| design | **Opus, high** | F18 — anchor-link TOC on mega-pages (Conditions/Assessments); NN/g eyetracking-backed |
| design | Fable/Opus | F19 — lean Public/Clinical modes harder into progressive disclosure (summary-first, reveal clinical depth) |
| gated | Fable (scoping) | item 15 — F14 Spanish, only if owner approves |

### Design follow-ups (added 2026-07-03, from the deep-research report)
- **F18 — anchor-link table of contents** on the two mega-pages. NN/g: a scannable TOC + the
  "layer-cake" pattern (keyword-front-loaded subheadings) is a bigger comprehension win than color.
  Files: `app.js` (`renderConditions`/`renderAssessments`), `styles.css`. Sticky rail on desktop,
  collapsible on mobile. (Complements the shipped F4 jump-bars.)
- **F19 — progressive disclosure** via the existing Public/Clinical modes: lead each topic with
  the essential public summary, reveal clinical depth (evidence specifics) on request; keep
  disclosure ≤2 levels, never hover-only (NN/g). Mostly copy/flow, low code risk.
- **F20 — heading-hierarchy fix (a11y).** Pages skip H1→H3, drawers H2→H4 (found in the 2026-07-03
  a11y audit). Screen-reader heading nav should not skip levels. Fix = promote section/card titles
  H3→H2 and drawer subheads H4→H3 across the app.js render functions AND move the matching CSS
  (`.card h3`, `.drawer-body h4`, `.itemcard h3`, callouts, tool outputs — heading levels are
  styled by TAG, so every retag needs its CSS selector moved too). Medium effort, needs a full
  12-route + drawer visual re-verify. Opus, medium.

### Bigger bets from the 2026-07-03 audit workflow
DONE (Opus, 2026-07-03): **F21** related videos · **F22** ARIA tabs · **F23** share link ·
**F24** iOS scroll lock · **F25** print/handout stylesheet · **F26** glossary bridge ·
**F28 (part)** last-reviewed date · **F29** related conditions in drawer (new, additive).
ALSO DONE: **F20** heading hierarchy (Opus, 2026-07-03) — global h3→h2/h4→h3 shift + CSS moves;
zero skips on all 12 routes + both drawers, zero visual change (font-size parity verified).
ALSO DONE: **F18** on-this-page TOC (Opus, 2026-07-03) — auto-built from `.page > h2`, appears on
the 5 long prose pages, router-safe jump + focus move, AA-clean.
ALSO DONE: **F10** PWA — manifest.json + versioned cache-first `sw.js` + registration + SVG icon
(Opus, 2026-07-03). Verified: SW active, `ot-atlas-v1` caches 15 core assets, app works offline-
capable, console clean. **Standing rule now in the session protocol: bump `sw.js` CACHE on ANY
asset edit.** SVG-icon caveat: some older/iOS browsers prefer PNG install icons (accepted).
REMAINING: F19 (progressive disclosure — needs plain-language content sign-off), F27 (content
gaps — needs clinician sign-off), F28 (og:image PNG — needs image tooling). These 3 all need
input beyond code.
- **F21 — ✅ DONE (Opus, 2026-07-03) related-video cross-links in condition drawers.** `openCondition` links to assessments/
  orgs but never the topic-matched in-app videos that exist. Map condition category→video bucket
  (neuro→stroke, peds→peds, hand→hand, mh→mh, geri→geri; omit 'spec'); render 2 items via
  `videoItemHTML()` or a "See <cat> videos →" jump. Opus, M.
- **F22 — fix the ARIA tab pattern.** Foundations + Toolkit declare `role="tablist"` but the
  `.tab-btn`s lack `role=tab`/`aria-selected`/`aria-controls`, panels lack `role=tabpanel`, and
  `wireTabs` has no arrow-key roving-tabindex — a declared-but-broken pattern. Either implement it
  fully or (cheaper, correct) drop `role="tablist"` so they read as plain buttons. Opus, M.
- **F23 — share/copy-link on the condition drawer header.** Deep links work but no affordance;
  add a Share button to `drawerShell` (condition drawers only) using `navigator.share` with a
  clipboard fallback (reuse the shipped copy helpers), announced via `announce()`. Sonnet/Opus, M.
- **F24 — iOS-safe scroll lock.** `openDrawer`/`openSearch`/welcome use `body.style.overflow=hidden`,
  which doesn't stop iOS touch-scroll (background bleeds/jumps). Record scrollY + `position:fixed`
  body + restore on close. Opus, M (touches 3 open/close paths — verify focus + scroll restore).
- **F25 — real print stylesheet.** The 4-line `@media print` only hides chrome; dark bg survives,
  collapsed accordion bodies are lost, citation URLs don't print. Force light tokens,
  `a[href^=http]::after` URL expansion, `break-inside:avoid`, reveal `.acc-body`, `@page` margins. Sonnet, M.
- **F26 — public glossary gaps + linkify the clients page.** `linkifyGlossary` runs only in
  `openCondition`, and 8 public-visible terms have no glossary entry (hemiparesis, spasticity,
  contracture, edema/oedema, micrographia, tenodesis, mod-I, don/doff). Add plain entries to
  resources.js AND generalise `linkifyGlossary` to accept a container + call it in `renderClients`.
  High value for families. Opus, M.
- **F27 — content coverage gaps (FLAG for clinician sign-off; do NOT touch rigor.js ratings).**
  Missing: pelvic health/continence, adult dysphagia/mealtime, oncology/lymphedema (AOTA growth
  areas); free cognitive/mood screens (SLUMS, Clock-Drawing, PHQ-9/GAD-7) and a fatigue measure;
  Toglia Dynamic Interactional/Multicontext + CO-OP frames. New clinical text needs review. Fable/Opus, L.
- **F28 — last-reviewed date + og:image.** Add a `reviewedOn` field to rigor.js rendered as
  "Content reviewed <date>" in `pageFoot()` (currency/trust signal); commit a 1200×630 og:image
  PNG + 180×180 apple-touch-icon of the open-book mark and reference them in the head. Sonnet, S–M.

## Next 3 steps (as of 2026-07-06 — start-here for a NEW session)
**The active queue is Phase 4 (AWARD PUSH — "The Honest Atlas"), owner-approved 2026-07-06.**
1. **Item 16 [F34]** — type-scale + tracking consolidation (Opus, high). ← next code item
2. **Item 17 [F35]** — chapter identity rollout (Opus, medium); then the queue table in Phase 4.
3. **Input-gated:** F41 Occupation Compass (Fable session, owner ping) · F42 submissions ·
   F19/F27 (clinician sign-off) · F28/F42b og:image PNG (image tooling).
⚠️ **BEFORE editing/verifying: cache-first service worker.** Bump `sw.js` `CACHE` (at
`ot-atlas-v14` as of 2026-07-16) on ANY asset edit or the preview shows STALE output. (See sw.js / session
protocol / the `ot-atlas-service-worker` memory.)
Owner decisions still open: grain whisper vs removed; F14 Spanish in/out; clinician for F19/F27.

### Session protocol for the executing model (token discipline)
- Read PLAN.md + PROGRESS.md only. Do NOT re-read all data files; each backlog item names its files.
- Implement exactly one item. Verify: `preview_start "ot-atlas"` → route sweep → 0 console
  errors + item-specific check named in the item. Paste actual output into PROGRESS.md.
- Keep the design system: Fraunces/Hanken/Spline, teal `--teal` + clay `--clay`, CSS vars,
  `[hidden]{display:none!important}` stays. No frameworks, no build step, no new dependencies.
- Never edit `rigor.js` ratings or clinical text without flagging in PROGRESS.md Open Questions.
- **⚠️ SERVICE WORKER (F10 shipped 2026-07-03): any session that edits ANY asset (css/js/data)
  MUST bump the `CACHE` version string in `sw.js` (e.g. `ot-atlas-v1` → `v2`) — otherwise the
  cache-first SW serves the OLD cached copy and BOTH real users AND the dev preview show stale
  output. If a preview reload doesn't reflect your edit, this is why: bump the version (or
  unregister the SW). Design tokens are now cool (teal `--teal` + coral `--clay`; use `-deep`
  variants for accent TEXT; never reintroduce warm cream/brown).**
