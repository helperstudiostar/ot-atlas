# Handoff — The OT Atlas

This folder is **fully self-contained and portable**. You can move it anywhere; nothing
inside uses absolute paths. This doc captures everything needed to run, extend, or continue
the project — including a ready-to-paste brief for a fresh Claude Code session.

---

## TL;DR
**The OT Atlas** — a 17-chapter, evidence-honest Occupational Therapy reference for
practitioners, students, clients and families. Static: no build step, no dependencies,
no framework. **Live at https://helperstudiostar.github.io/ot-atlas/** (auto-deploys on
push to `main`). Open `index.html` locally, or run the preview server.

**Scale (verified 2026-07-19):** 66 conditions · 58 assessments · 95 evidence-rated
treatments · 148 external resources · 76 dated bulletin notes · 130 abbreviations ·
66 glossary terms · ~350 generated study cards. Every clinical rating carries its sources
and a 5-step strength scale; nothing claims more certainty than it has.

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
  resources.js             orgs, client-facing guidance, self-management, glossary (66 terms)
  videos.js                curated video library (verified YouTube IDs) + channels
  directory.js             THE DIRECTORY (#/directory, ch. 11) — 148 external resources,
                           honesty-rated (prices/reputation/bias, "as of 2026-07")
  bulletin.js              THE BULLETIN (#/bulletin, ch. 12) — dated what's-changed log;
                           refresh protocol in this file, below
  abbreviations.js         130-entry abbreviation decoder (rendered on the Resources page)
  studenthub.js            THE STUDENT'S SHELF (#/students, ch. 17) — NBCOT, fieldwork,
                           OT vs OTA, careers & pay; figures carry their sourcing caveats
  interventions.js         THE TREATMENTS (#/interventions, ch. 13) — 95 interventions on
                           the 5-step evidence scale + practitioner/patient perspectives.
                           REVIEW MODEL (owner decision 2026-07-19: no paid sign-off):
                           OPEN PRACTITIONER REVIEW — transparent sourcing + REVIEWING.md
                           checklist + GitHub Issues; incorporate reviews per REVIEWING.md
                           ground rules; never soften/strengthen a rating without a source.
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
- Verified live in-browser (2026-07-19): all **17 routes** render in both themes, no horizontal
  overflow at 375px, **zero unlabeled inputs, zero heading skips**, global search, detail drawers,
  study cards and all 5 interactive tools — **zero console errors**.
- Data integrity audited 2026-07-19: no duplicate ids, no enum/reference mismatches, rigor.js
  attaches evidence to 100% of conditions and assessments, all bulletin dates well-formed.
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
- ✅ Done: og:image (1200×630) + apple-touch-icon (180×180) — generated in-browser from the
  app's own fonts, wired to the live URL; robots.txt + sitemap.xml + JSON-LD.
- Still open before wide promotion: real-path routing/prerender for SEO (hash routes are
  crawler-invisible to most crawlers); custom domain if wanted (repo Settings → Pages);
  privacy-friendly analytics (needs an owner account).

## Gotchas (learned the hard way)
- **`ROUTE_COORD` key ORDER is load-bearing.** It drives the chapter numbers, the coordinate
  stamps, and the colophon's "Continue the atlas →" chain. Chapters were renumbered 2026-07-19
  so the numbers run 01–17 in nav order; adding a chapter means inserting it in the right
  position, not appending, and updating the hardcoded plate prefixes (`11·n` directory,
  `13·n` treatments) and FIG numbers in the matching render function.
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

Open a session **in this folder** and paste this as your first message:

> This folder is **The OT Atlas** — a 17-chapter, deployed, static Occupational Therapy
> reference (no build step, no framework, no dependencies). Live at
> https://helperstudiostar.github.io/ot-atlas/ ; repo `helperstudiostar/ot-atlas`; it
> auto-deploys on push to `main`.
>
> **Read `HANDOFF.md` (this file) and the top "STATE OF PLAY" block of `PLAN.md` first.**
> Then skim the most recent PROGRESS.md entries. Do NOT read every data file — they are
> large; each backlog item names the files it touches.
>
> Ground rules that matter:
> 1. **Bump `sw.js` CACHE on ANY asset edit — and bump AGAIN if you edit after a bump.**
>    The cache-first service worker will otherwise serve stale files to you *and* to real
>    users. This is the #1 footgun in this project; it has bitten three times.
> 2. **Verify live before claiming anything works**: run the preview, sweep all 17 routes,
>    require zero console errors, and paste the ACTUAL tool output into PROGRESS.md. Never
>    claim success from code-reading alone.
> 3. **Evidence honesty is the product.** Never soften or strengthen an evidence rating
>    without a source; never invent a number, price, date or citation — omit instead, or
>    state the uncertainty inline. `rigor.js` ratings and clinical text are not to be edited
>    casually. Sources become "verified" only by adding a WebFetch-confirmed domain to
>    `rigor.js` `_confirmed`.
> 4. **Design law: the book, not the component kit.** No new grids of identical rounded
>    cards, no tinted callout boxes, no chip-and-icon clutter. The atlas's language is
>    numbered figures (`FIG. 07·A`), index rows on hairlines with plate numbers, margin
>    notes, run-in prose. See "THE KIT RATION" in PLAN.md before designing anything.
> 5. **Chapter numbers run 01–17 in nav order** and drive both the coordinate stamps and the
>    colophon's "Continue the atlas →" chain (`ROUTE_COORD` key order is load-bearing).
>
> Environment notes: the Claude-Code browser pane runs the page as a **hidden document**, so
> IntersectionObserver/rAF/CSS transitions do not run there — animation can be *guarded* but
> not observed; screenshots go stale after programmatic scrolling (capture at scrollTop 0, a
> tall viewport, or a fresh tab). Preview with `node .claude/static-server.js` (Node, not
> Python). Bash has **no network** — use WebFetch/WebSearch for anything online.
>
> My task: <describe it>

---

## Where to pick up (as of 2026-07-19)

**Nothing is broken.** The app is deployed, audited and clean. Candidate next moves, roughly
by value:

1. **Recruit practitioner reviews** (owner action): post the link to r/OccupationalTherapy or
   CommunOT. `REVIEWING.md` is the 30-minute reviewer checklist; reviews arrive as GitHub
   Issues; reviewers get named credit. This is the project's main credibility gap and it
   costs nothing but a post.
2. **Assessment norms & cutoffs** — add scoring ranges/cutoffs to the 58 assessments. Turns a
   catalogue into a clinical shelf reference. Needs careful sourcing (research agents).
3. **SEO prerender** — hash routes are crawler-invisible; a small prerender step would make
   the atlas findable. Architecture change, do deliberately.
4. **Client handout polish** — the print-handout button exists on condition drawers but the
   printed output has never been eyeballed in a real browser (the pane cannot print).
5. **Case library** — one worked case per setting; best written after practitioner reviews
   start arriving so the cases can be checked.
6. **Gated/design:** F39 second half (FLIP filtering, theme morph, toast — needs a foreground
   browser tab), F41 "Occupation Compass" signature artifact, F44 remaining drawn objects,
   Spanish track (owner decision), billing/documentation chapter (CPT copyright care needed).

**Known non-blocking gaps:** 19 directory entries (mostly small podcasts) have no stable
public URL — they render a "search the name" fallback instead of a link. Several treatment
sources point at publisher/database hubs rather than deep links. BLS figures in the student's
shelf are search-excerpt-sourced (bls.gov blocks automated fetches) and say so inline.
