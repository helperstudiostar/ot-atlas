# Handoff — The OT Atlas

This folder is **fully self-contained and portable**. You can move it anywhere; nothing
inside uses absolute paths. This doc captures everything needed to run, extend, or continue
the project — including a ready-to-paste brief for a fresh Claude Code session.

---

## TL;DR
A complete, verified, static web app: **The OT Atlas** — a comprehensive Occupational
Therapy educational resource for both practitioners/students and clients/families.
No build step, no dependencies. Open `index.html` or run the local preview server.

## Run / preview
- **Simplest:** double-click `index.html`.
- **Best (reliable fonts/thumbnails):** serve the folder and open the URL:
  ```bash
  node .claude/static-server.js     # → http://localhost:4178
  # or:  npx serve .  /  python3 -m http.server 4178
  ```
  > Note: inside Claude Code's preview sandbox, use the **Node** server — Python's
  > `http.server` is blocked there (`getcwd` PermissionError). Outside that sandbox, any
  > static server (incl. Python) is fine.

## Structure (data-driven)
```
index.html                 app shell, nav, search overlay, <script> includes
README.md                  user-facing overview
HANDOFF.md                 this file
assets/css/styles.css      "warm clinical craft" design system + light/dark theming
assets/js/app.js           router, rendering, search, detail drawers, interactive tools
assets/js/data/
  foundations.js           what OT is, history, profession, OTPF-4 domain, OT process
  models.js                8 models of practice + 15 frames of reference
  reasoning.js             clinical reasoning, SOAP, goal frameworks, worked case
  conditions.js            66-condition library
  assessments.js           58 standardised assessments
  evidence.js              EBP steps, levels, databases, landmark studies, journals
  resources.js             orgs, client-facing guidance, self-management, glossary (58 terms)
  videos.js                curated video library (verified YouTube IDs) + channels
  directory.js             THE DIRECTORY (#/directory, ch. 13) — 148 external resources,
                           honesty-rated (prices/reputation/bias, "as of 2026-07")
  bulletin.js              THE BULLETIN (#/bulletin, ch. 14) — dated what's-changed log;
                           refresh protocol in this file, below
  interventions.js         THE TREATMENTS (#/interventions, ch. 15) — 95 interventions on
                           the 5-step evidence scale + practitioner/patient perspectives;
                           PENDING CLINICIAN REVIEW (do not soften/strengthen ratings
                           without re-checking the cited reviews)
  rigor.js                 evidence ratings (strength/confidence/bias/sources/verified) keyed
                           by condition id + assessment name; EBP-study ratings; country facts.
                           Loads LAST and attaches `.evidence` onto existing entries.
.claude/launch.json        preview config (server name: "ot-atlas")
.claude/static-server.js   tiny dependency-free Node static file server (relative paths)
```
Each `data/*.js` file populates a global `OT` namespace; `app.js` renders it. Hash-based
router (`#/home`, `#/conditions`, …). Global search opens with the `/` key.

## How to extend (no other code changes needed — just add data)
- **Add a condition** → push to `OT.conditions` in `conditions.js`:
  `{ id, name, cat: "neuro"|"hand"|"peds"|"mh"|"geri"|"spec", desc, impact,
     ot:[...], assess:[...], goals:[...], settings, links:[{l,u}] }`
- **Add an assessment** → push to `OT.assessments` in `assessments.js`:
  `{ name, abbr, cat, measures, pop, notes }`  (cat must match one in `OT.assessmentCategories`)
- **Add a video** → add to `OT.videos._extra` at the bottom of `videos.js`:
  `{ bucket, yt:"<id>", title, channel, desc }` (auto-inserted into the bucket). Items can
  also be `{search:"query",…}` (live YouTube search card) or `{url, ext:true,…}` (external link).
- **Add a glossary term / model / FoR / study** → corresponding array in `resources.js` /
  `models.js` / `evidence.js`. The search index in `app.js` picks new entries up automatically.
- **Add/edit an evidence rating** → in `rigor.js`, add to `OT.rigor.conditions[<id>]` or
  `OT.rigor.assessments[<name>]` via `ev(strength, confidence, bias[], note, sources[], unverified?)`.
  Conditions inherit their own `links` as sources automatically. `verified` is computed from the
  `R._confirmed` domain allowlist — add a domain there only after confirming it (e.g., via WebFetch).
  **Never hard-code `verified:true` for an unconfirmed source.** See `BUILDLOG.md` §4 for the rules.

## Design system
"Warm clinical craft" — a nod to OT's Arts-&-Crafts origins. Warm paper background, clinical
teal (`--teal`) + terracotta/clay accent (`--clay`), sage/ochre highlights. Fonts: **Fraunces**
(display serif), **Hanken Grotesk** (body), **Spline Sans Mono** (labels/eyebrows). All colors
are CSS variables with full light/dark variants. Keep this aesthetic consistent for new UI.

## QA already completed
- Verified live in-browser: all 12 routes render, light/dark themes, global search, detail
  drawers, and all 5 interactive tools — **zero console errors**.
- Adversarial multi-agent audit: no code/runtime bugs; fixed 2 dead CDC links and a set of
  clinical-accuracy/scope corrections.
- All embedded YouTube IDs validated as real via the oEmbed endpoint.
- **Rigor upgrade (2026-06-24):** evidence schema applied to 100% of conditions/assessments/EBP
  findings; sources verified via WebFetch where confirmable (see coverage in `BUILDLOG.md`);
  ratings adversarially audited by a multi-agent pass (2 corrections applied). Re-verified live:
  all routes zero console errors with Public/Clinical + plain-language toggles and the new filters.
- **Accessibility pass (2026-06-24):** targets WCAG 2.1 AA. Programmatic label↔input association
  for all tool fields (`associateLabels()` in `app.js`, runs on every render); `aria-label`s on the
  mode toggle; `aria-current="page"` on active nav; modal **focus trap** + `aria-labelledby` on the
  drawer and search overlay; SPA route changes announced via a visually-hidden `#routeStatus`
  live region; search is a proper **combobox/listbox** (`aria-activedescendant`); `.sr-only` util,
  larger touch targets, and `prefers-contrast` / `forced-colors` support in CSS. An "Accessibility"
  section on the Resources page documents shortcuts. Verified live: 0 unlabeled inputs (was 20),
  focus trap wraps, announcements fire, zero console errors.

## Keeping "What's changed" current (THE BULLETIN, `#/bulletin` — added 2026-07)
The bulletin (`assets/js/data/bulletin.js`) is a dated log of profession / licensure /
evidence / funding changes (US-first + global). **Refresh protocol for any future session:**
1. Run 2–3 web-research agents scoped to "since <last reviewedOn date>" over: US licensure
   (OT Compact, NBCOT, ACOTE, AOTA, CMS/Medicare) · evidence (Cochrane, AJOT practice
   guidelines, landmark RCTs, contested-evidence developments) · global (WFOT, RCOT/HCPC,
   CAOT, AHPRA/OTA-AU, NDIS).
2. Rules: primary sources; exact dates where findable; ENACTED vs PROPOSED explicit; never
   fabricate a date/number — omit instead. Each entry: date (YYYY-MM), title, one-line
   summary, what-changed, why-it-matters, status, sources.
3. Append new entries to `OT.bulletin.entries` (id-unique), update `meta.reviewedOn`,
   bump `sw.js` CACHE, verify the route live, log in PROGRESS.md.
Cadence: quarterly is enough for licensure/policy; after each Medicare fee schedule
(Nov) and AOTA annual (spring), consider an off-cycle pass. **Refresh is MANUAL, on owner
request only — the owner declined scheduled automation (2026-07-16); do not propose cron.**

## Deployed (2026-07-19)
- **Live site:** https://helperstudiostar.github.io/ot-atlas/ (GitHub Pages, legacy build,
  main branch root, no build step). Deploys automatically on every push to main.
- **Repo:** https://github.com/helperstudiostar/ot-atlas — corrections arrive as GitHub
  Issues via the colophon link.
- Publishing flow for future sessions: edit → bump sw.js CACHE → verify locally →
  commit → `git push` → Pages redeploys in ~1 min.
- Still open before wide promotion: 1200×630 og:image PNG + 180×180 apple-touch-icon
  (F28/F42b — image tooling); real-path routing/prerender for SEO (hash routes are
  crawler-invisible); custom domain if wanted (repo Settings → Pages).

## Gotchas (learned the hard way)
- **The Claude-Code browser pane runs the page as a HIDDEN document** (visibilityState
  "hidden"): timers throttle to ~1/min, IntersectionObserver/rAF never fire, screenshots can
  desync after programmatic scroll (capture at scrollTop 0 / fresh tab / tall viewport).
  Dynamic motion (reveals, dial draw, count-ups) can only be GUARDED there, not observed —
  eyeball motion in a real browser tab. App-side rule that came out of this: never gate
  content visibility on IO/timers without a hidden-document guard (see wireReveals).
- **SW re-registers on every reload** — an asset edit made AFTER the last sw.js CACHE bump is
  served stale from the SW cache (even to fetch(cache:'no-store')) until the NEXT bump. If an
  edit "isn't showing", bump CACHE again; don't trust one bump per session if you edit after it.
- **Bash sandbox has no network.** To verify a YouTube ID, use WebFetch on
  `https://www.youtube.com/oembed?url=https://youtu.be/<ID>&format=json` (returns the real
  title if valid, an error if not). Only embed IDs you've confirmed this way.
- CSS sets `[hidden]{display:none!important}` globally so author `display` rules don't
  override the `hidden` attribute (the search overlay depends on this).
- Video thumbnails use `loading="lazy"` + an `onerror` fallback, so a removed video degrades
  to a "watch on YouTube" placeholder instead of a broken image.
- The content is an **educational resource, not medical advice** — keep clinical claims
  accurate and match assessments to the correct population/condition.

---

## For a new Claude Code session
Open a new session **in this folder** and paste this as your first message:

> This folder contains "The OT Atlas," a complete, verified static web app (a comprehensive
> Occupational Therapy educational resource for practitioners and the public). Read
> `HANDOFF.md` and `README.md` first, then skim `index.html`, `assets/js/app.js`, and
> `assets/js/data/*.js` to orient yourself before changing anything. It's 100% static (no
> build); preview with `node .claude/static-server.js` on port 4178 (use Node, not Python).
> To extend it, add an entry to the relevant `assets/js/data/*.js` file. Verify any change
> live in the browser preview (zero console errors across all routes is the bar), and verify
> any new YouTube IDs via the oEmbed endpoint before embedding them.
> My task: <describe what you want, or "just confirm it still runs after the move">
