# PROGRESS.md — append-only checkpoint log

Format per entry: timestamp · item · files changed · evidence · issues · exact next item.
**Logging rule (owner directive 2026-07-01): log incrementally DURING work, not only at
session end — sessions may be cut by usage limits. Partial entries are expected; mark them
`[PARTIAL]` and finalize when the item completes.**

---

## 2026-07-19 — [F55] LAUNCH — GitHub repo + Pages deploy (Fable 5, owner: "create the repo, etc finish it so can launch it") — COMPLETE
- Repo: **https://github.com/helperstudiostar/ot-atlas** (public, gh CLI, owner's
  authenticated account). Commits: 42da6d9 baseline → 1bcd2a0 F54 → a798124 launch.
- **Live: https://helperstudiostar.github.io/ot-atlas/** — GitHub Pages, legacy build from
  main root, auto-deploys on push. Build confirmed "built".
- Pre-launch swap: colophon correction link mailto→**GitHub Issues** (owner email off the
  public site). sw v27→**v28**. README/HANDOFF carry the live URLs + publish flow.
- **Live verification (actual output):** app boots on the real URL from the /ot-atlas/
  subpath (relative paths held); home 184 / conditions 628 / interventions 2973 /
  directory 2814 / bulletin 1719 nodes — identical to local; SW registered, caches
  ["ot-atlas-v28"] on the live origin; correction link →
  github.com/helperstudiostar/ot-atlas/issues/new; console clean. Screenshot: first-visit
  chooser over the dark home on the production URL.
- Still open before wide promotion (logged in HANDOFF "Deployed"): og:image/apple-touch
  PNGs; SEO prerender (hash routes crawler-invisible); custom domain optional; clinician
  review remains THE gate for promoting the clinical chapters.

## 2026-07-19 — [F54] Finish-what-you-can round: git baseline · knowledge-graph links · correction link · source verification (Fable 5, owner: "finish what you can asap") — COMPLETE
- [x] **git init + baseline commit** (42da6d9, 33 objects/496KB) — the repo finally has
      history. Deploy still needs owner accounts (instructions to be added to HANDOFF).
- [x] **F54 knowledge graph, conditions→treatments:** `relatedTreatments(c)` scores each
      condition's ot[] line against intervention name+aka (word-fraction, 0.6 threshold —
      PRECISION-FIRST: a missing link beats a wrong clinical link); drawer gains a "Related
      treatments" chip row (clinical mode, like assessments); chips jump to #/interventions
      pre-filtered. Verified: stroke→[Task-Specific Training, CIMT (adult)], chip→"1
      treatment" exact landing; dementia→[TAP]; carpal-tunnel→0 (below threshold, accepted).
- [x] **Correction link** in the colophon (`.foot-correct` mailto, owner address — swap
      before public deploy if desired).
- [x] source-domain verification (sonnet agent): rigor.js `_confirmed` 26→**64 domains** —
      38 added under a dated comment, each with WebFetch proof or explicit "canonical,
      bot-blocked" note; commercial CEU vendors / aggregators / social platforms deliberately
      excluded; redundant subdomains avoided via substring coverage. Result live-measured:
      **101 of 103 intervention sources now render verified** (was ~0); Ayres SI's AJOT +
      NIHR chips both ✓. node --check OK; nothing but the allowlist touched.
- [x] a11y spot-check, chapters 13–15: 0 unlabeled inputs · 0 heading skips · 0 alt-less
      images · native <summary> semantics (148/76/95 disclosures).
- [x] sw v26→**v27**; 7-route sweep clean (+1 node/route = colophon correction link);
      console clean; caches → ["ot-atlas-v27"]. Second commit follows.
**STATUS: COMPLETE (2026-07-19).** Remaining from the "what's better" list (owner-gated or
future sessions): deploy (owner accounts — instructions in HANDOFF), clinician review
(owner recruits; workflow support on request), og:image/PNG icons (image tooling), perf
lazy-load, F39 second half + F41 compass (foreground-tab/Fable design sessions), Spanish.

## 2026-07-18 — [F53] THE TREATMENTS — treatments & protocols compendium (Fable 5 + 7 agents, owner request) — COMPLETE
Owner: "robust list/info for all the OT treatments, protocols, etc — key info, rankings,
ratings, reviews and feedback from research, experiences, patients and practitioners."
Built as **chapter 15 · REFERENCE**: route `#/interventions`, nav "Treatments & protocols"
(data-aud="pro", i-hand), F49 index language, rows = `<details>` with plate numbers 15·n,
summary = name + aka-tag + evidence dot (SAME 5-step scale + evMiniBadge/evidenceBadge
components as the rest of the atlas), body = What it is./Protocol./evidence badge + sources/
Research says./Practitioners say./Clients & families./Training & cost./Settings./Take care.
run-ins. Filters: section chips + strength chips (reuses strengthChips) + search; global `/`
search cat "Treatment". FIG. 15·A = methodology + how-to-read. **Clinical-content flag: lede
carries "pending clinician review" — same F46/F47 gate; nothing here edits rigor.js.**
- [x] app.js: renderInterventions + route + ROUTE_COORD 15 + CHAPTER_TITLES/ROUTE_TITLES +
      search index (guarded); parse OK
- [x] index.html: nav item + interventions.js script tag
- [x] sw.js: CORE += interventions.js; CACHE v24→**v25**
- [x] research (5 agents + 5 orphaned deep briefs): neuro 30 · peds ~24 · MH/geri 24 ·
      hand+PAMs 22 · perspectives 19 interventions + 5 captured deep briefs (weighted
      vests/blankets, Ayres SI, sensory rooms, DIR/Floortime, Zones). ⚠️ Agent-ops notes:
      two agents initially misread briefs as orchestrator roles (corrected via SendMessage);
      their re-runs then hit the Fable usage limit — peds' 54KB file survived, perspectives
      was re-done from scratch on Sonnet. Orphaned child-agent briefs were captured to
      scratchpad files by Fable so nothing was lost.
- [x] verify+transcribe (opus): assets/js/data/interventions.js — **95 entries** (neuro 26 ·
      hand 22 · peds 24 · mhgeri 23) after 5 dedup merges; ratings distribution strong 12 /
      moderate 30 / emerging 29 / contested 13 / insufficient 11; node --check OK. Ten
      consistency reconciliations vs the atlas's stances (Ayres SI + sensory diets + visual
      scanning + NDT + kinesio taping → contested with both-sides notes; Lifestyle Redesign
      held at atlas's moderate; RTW downgraded per RETAKE/FRESH nulls; CDT strong w/ MLD
      caveat; joint protection strong per Cochrane component evidence). Agent caught + fixed
      a sourceChips shape bug ({l,u}→{label,url,type}) pre-ship. Sources render mostly
      "unverified" by design (domains not in rigor._confirmed — HANDOFF rule respected).
- [x] live verify (Fable): 95 rows / 4 sections / 95 evidence badges; strength filters
      (strong→12, contested→13); search (CIMT→2, weighted→recall in Take care.); Ayres SI
      entry renders all 9 field types incl. Practitioners say./Clients & families.; 15-route
      sweep clean (interventions 2972 nodes full list; sticky-query state explains low count
      mid-sweep — by design); colophon chain now ends at 15→home wrap; console clean;
      caches → ["ot-atlas-v26"] (v26 = post-transcription bump per the twice-bitten SW rule).
      Screenshot: Ayres SI specimen entry (contested badge, fidelity note, SenITA null,
      neurodiversity critique + defense, CLASI costs, insurer reality) over FIG. 15·A.
**STATUS: COMPLETE (2026-07-18). PENDING CLINICIAN REVIEW (flagged in lede + FIG. 15·A +
meta.caveat) — F19/F27/F46/F47 clinician gate now also covers chapter 15.**

## 2026-07-16 (cont) — [F39] disclosure choreography + accordion trio (Opus agent, dispatched by Fable; Fable live-verified) — FIRST HALF COMPLETE
**Fable live verification (actual output):** foundations "More about…" trio de-kitted —
computed .acc-item: radius 0, bg transparent, border 0 (hairline rows, serif run-ins, dotted-
leader mono hints); aria-expanded toggles; open body renders 365px with content ("Who they
help. People of all ages…") once frames flow. Assessments details open → .idx-wrap 250px with
content. 14-route sweep renders (idx-wrap adds ~1 node/row: assessments 1586→1644, directory
2665→2813, bulletin 1642→1718 — expected), console clean, caches → ["ot-atlas-v24"].
The agent also caught + fixed a real collapse bug pre-ship (grid-item padding floors the 0fr
track → every closed row would have shown an ~18px sliver; padding moved to horizontal-only +
child margins / .acc-clip). ⚠️ Animation FRAMES unobservable in the hidden pane (F38 note) —
open-animation must be eyeballed by the owner in a real tab.
**REMAINING (second half of PLAN item 21, still queued):** FLIP/view-transition grid
filtering (+>60-item and PRM skips), live chip counts, theme sun/moon morph, copy toast —
each needs real-browser verification; do in a session with a foreground tab.
Scope of THIS pass (per dispatch): the DISCLOSURE choreography half of F39 + the assigned
foundations "More about…" accordion re-set. The item-21 "How" pieces that need live-browser
verification the hidden pane can't give (FLIP/view-transition grid filtering with the >60-card
skip + PRM skip, live chip counts, theme-toggle sun/moon morph, copy toast) are NOT in this
pass — see Open Questions. Static checks + a real-tab (localhost:4178) computed-layout probe;
per F38's note the pane FREEZES transitions (hidden document), so open/close motion itself was
verified by target-state layout (transition bypassed), not by observing frames.

- [x] **`<details class="idx-x">` body open animation — CSS-only 0fr→1fr grid wrapper, no JS.**
      Added `<div class="idx-wrap">` around every `.idx-detail` at all 4 render sites (models FoR
      `renderModels` ~677, assessments ~1098, directory ~1173, bulletin ~1248 — grep: 4 `idx-wrap`
      in app.js; runtime: assessments route shows 58 details, **58/58** wrapped). CSS (styles.css
      ~921): `details.idx-x > .idx-wrap { display:grid; grid-template-rows:0fr; transition:
      grid-template-rows var(--dur-2) var(--ease); }` + `[open] → 1fr`; `.idx-wrap > .idx-detail
      { overflow:hidden; min-height:0 }`. The empirically-confirmed mechanism: browsers keep a
      closed `<details>`'s wrapper `display:grid` (NOT `display:none`), so the row-track transition
      fires on open. The existing `+`→`×` idx-tgl rotation + teal-deep open color are KEPT
      (unchanged). PRM: `.idx-wrap` + `.idx-tgl` transitions set to `none` (instant snap).
- [x] **Padding-floor bug found + fixed (would have shown an 18px sliver under every closed row).**
      A grid item's own vertical padding/border floors the collapsed 0fr track at that height
      (proved live: `.idx-detail`'s `2px 6px 16px 56px` → closed track 18px, not 0). Fix:
      `.idx-detail { padding: 0 6px 0 56px }` (horizontal only) and deliver the top/bottom inset as
      `:first-child { margin-top:2px }` / `:last-child { margin-bottom:16px }` (clipped to 0 when
      closed via the item's overflow:hidden). Runtime after fix: closed track **0px / height 0**,
      open **250px** (transition bypassed). Same class of fix applied to the accordion (below).
- [x] **Foundations "More about…" trio re-set into book/index language (F49 follow-up).**
      `accordionHTML(items, variant="")` now takes an optional variant class + renders an
      aria-hidden `.acc-leader` span (display:none by default → zero effect on the other two plain
      accordions: `aspAcc`, clients scenarios). The foundations call passes `"acc-idx"`. New CSS
      `.accordion.acc-idx`: border/radius/background REMOVED → 2px ink group top-rule + existing
      1px hairline between items (runtime: borderTop 2px, radius 0px, bg transparent); `.acc-title`
      → serif 1.02rem run-in (runtime font Fraunces); the "who · where · when · specialties · team ·
      training" `.acc-sub` → mono, right-aligned on a dotted `.acc-leader` (runtime: leader
      display:block, sub font Spline Sans Mono); mobile ≤640px hides the leader and drops the hint
      to its own line (mirrors `.idx-*` mobile). **Content + tab/ARIA semantics unchanged** — same
      button + `aria-expanded` + `.acc-body.open` mechanism (`wireAccordions` untouched); runtime
      confirms aria-expanded still toggles and the 3 items render.
- [x] **Accordion body choreography upgraded to the same grid technique (global, all accordions).**
      Replaced the `max-height:0 → 4000px` hack (fixed-height → wrong-speed on arbitrary content)
      with `.acc-body { display:grid; grid-template-rows:0fr; transition: grid-template-rows
      var(--dur-2) var(--ease) }` + `.open → 1fr`. Added an `.acc-clip` (overflow:hidden,
      min-height:0, no padding/border) grid-item layer inside `.acc-body` so `.inner`'s padding +
      dashed rule don't floor the track; `.inner` selectors moved child→descendant accordingly.
      `.acc-head .caret` transition re-tokenized `.25s`→`var(--dur-1)`. Runtime (acc-idx trio,
      transition bypassed): closed **0px / 0**, open **365px**. PRM: `.acc-body` + `.acc-head .caret`
      transitions `none`.
- [x] **sw.js CACHE v23 → v24** (dispatch noted current was v23, not what PLAN implied).

**Files touched:** `assets/js/app.js`, `assets/css/styles.css`, `sw.js` ONLY.

### Static + probe evidence (actual tool output)
```
$ node -e "new Function(fs.readFileSync('assets/js/app.js'))"   → app.js parse OK
$ node --check sw.js                                            → OK
CSS brace balance: 699 / 699 BALANCED
$ grep 'CACHE = ' sw.js                                         → const CACHE = "ot-atlas-v24";
$ grep -c 'idx-wrap' assets/js/app.js                          → 4   (grep 'acc-clip' → 1)

new animation/transition tokens (all var(--dur-*) + var(--ease)):
  .acc-body                     transition: grid-template-rows var(--dur-2) var(--ease)
  details.idx-x > .idx-wrap     transition: grid-template-rows var(--dur-2) var(--ease)
  .acc-head .caret              transition: transform var(--dur-1) var(--ease)   (re-tokenized)
PRM stories (both new disclosures + their glyphs go instant):
  @media (prefers-reduced-motion: reduce){ .acc-body{transition:none} .acc-head .caret{transition:none} }
  @media (prefers-reduced-motion: reduce){ details.idx-x > .idx-wrap{transition:none}
                                            details.idx-x > summary .idx-tgl{transition:none} }
old max-height:4000px accordion hack: 0 matches remaining.

live probe (http://localhost:4178, real tab; transition bypassed to read target layout since the
pane freezes frames per F38):
  assessments  details.idx-x total 58 / wrapped 58 · closed rows 0px h0 · open rows 249.5px h250
               · .idx-detail padTop 0px padLeft 56px · idx-tgl "+" closed, teal-deep(14,78,74) open
  foundations  .accordion.acc-idx: 3 items · borderTop 2px · radius 0px · bg transparent
               · acc-leader display:block · acc-sub font "Spline Sans Mono" · title font Fraunces
               · acc-body closed rows 0px h0 · open 365px · aria-expanded toggles true/false
```

### Choreography inventory (this pass)
| surface | what animates | tokens | PRM |
|---|---|---|---|
| `details.idx-x` (models/assessments/directory/bulletin, ~130 rows total) | body 0fr→1fr grid open | `--dur-2`+`--ease` | instant (transition:none) |
| `.idx-tgl` `+`→`×` (pre-existing, kept) | 45° rotate + color | `.18s`+`--ease` (pre-existing) | instant (guarded) |
| `.accordion` `.acc-body` (all accordions) | body 0fr→1fr grid open | `--dur-2`+`--ease` | instant |
| `.acc-head .caret` | 90° rotate | `--dur-1`+`--ease` | instant |

### Open Questions / judgment calls
1. **Scope read: this is the DISCLOSURE half of F39, logged `[PARTIAL]`.** The dispatch's numbered
   tasks + final-message deliverables are exclusively the details-body animation, the accordion
   trio, and the sw bump; the dispatch's task-1 parenthetical ("drawer open/close, details expand,
   hover/press states") does NOT match item-21's actual "How" (FLIP grid filtering, live chip
   counts, theme sun/moon morph, copy toast) — I read this as Fable narrowing F39 for this pass to
   disclosure choreography. **NOT done (remaining F39):** (1) FLIP / view-transition grid-filter
   redraw with the >60-card instant-swap + PRM-skip rules; (2) live `(n)` counts on filter chips;
   (3) theme-toggle icon morph; (4) unified copy/share toast. Each needs live-browser verification
   the hidden pane can't provide. Flag if the full item-21 How was intended in one pass.
2. **The improved grid choreography + the aria-hidden `.acc-leader` span were applied to the
   accordion COMPONENT globally**, so the other two accordion instances (`aspAcc` on foundations;
   clients "what to expect" scenarios) also get the smoother open + the (invisible, display:none)
   leader — but their VISUAL language (bordered card) is unchanged; only the `.acc-idx` variant is
   re-set into book language. If the owner wants those two de-carded too, add `"acc-idx"` to their
   `accordionHTML(...)` calls. Kept scoped because F39 only assigns the "More about…" trio.
3. **No `:active`/press states added.** Item-21's audit calls the hover layer "good"; the gap is
   choreography, addressed by the two disclosure animations. Press feedback was left out rather
   than guess an unverifiable pressed-background token.
4. **Close direction is instant by design.** Native `<details>` and the accordion drop content the
   moment `[open]`/`.open` is removed, so only OPEN animates (per the item spec "animate the body
   open"); a CSS-only close animation would need `allow-discrete`/`::details-content` + JS. Not
   pursued this pass.

**Exact next item:** orchestrator/Fable live-tab eyeball of the open/close motion (the pane can't
show frames) on assessments/models/directory/bulletin + the foundations trio, both themes, PRM
toggle (`Emulation.setEmulatedMedia` → instant), and mobile 375px (leader hidden, hint wraps).
Then tackle the remaining item-21 How (FLIP/VT filter, chip counts, theme morph, toast) as F39's
second pass. Mark COMPLETE when the full "How" ships.

## 2026-07-16 (cont) — [F38] scroll reveals rollout (Sonnet agent + Fable hardening) — COMPLETE
**Fable live verification + TWO HARDENING FIXES (evidence):** the browser-pane page runs as a
HIDDEN document (visibilityState "hidden" — no rendering frames), which exposed a real
robustness hole: IntersectionObserver callbacks never fire there (verified: a fresh IO
observed 17 in-viewport elements, 0 callbacks in 1.2s) → tagged content stayed opacity:0.
Fable added (1) a 1.6s force-reveal safety net after wiring, and (2) the correct guard:
wireReveals returns early when document.visibilityState === "hidden" (background tabs get no
animation and NOTHING hidden; on a visible tab IO fires normally). Verified live: with guard
active, 5 routes tagged 0 / nothing invisible (the one opacity-0 element is the pre-existing
.page route fade-up mid-animation, not F38); full-page screenshot renders everything.
⚠️ Verification-environment note (add to gotchas): (a) the pane throttles timers AND freezes
IO/rAF (hidden doc) — dynamic motion cannot be observed there, only guarded against; (b) the
SW re-registers on every reload, so ANY asset edit made AFTER the last CACHE bump is invisible
even to fetch(no-store) until the NEXT bump — this bit twice today. CACHE now **v23** (v22 =
agent's bump, v23 = Fable's hardening edits). The animated reveal experience itself is code-
reviewed + spec-conformant (opacity/translateY≤12px, var(--dur-2), section-level targets only,
PRM/print force-visible) but must be eyeballed by the owner in a real browser tab.
Dispatch: implement F38's "How" — a lightweight, per-SECTION scroll-driven reveal system rolled
out to the 13 non-home routes (home already has its own per-ELEMENT `.stagger` on load, left
untouched), using an IntersectionObserver → `.revealed` class instead of the CSS
`animation-timeline: view()` approach PLAN.md's original F38 draft names (that API still has no
stable Firefox support as of 2026-07, per the item's own "Why"; the observer degrades safely
everywhere with no `@supports` fork needed). Static checks only — no browser/preview tools used
in this session; verification is parse/grep/brace-balance evidence below, per dispatch scope.

- [x] **Reveal target list** (`assets/js/app.js` `REVEAL_SELECTOR`, line ~1852):
      `.page > h2, .section-head, .idx-sec, .fig, .callout, .acc-item, .tl-item, .step` —
      top-level section headings, the category-group containers the 66-row conditions/
      assessments/directory/bulletin lists live in (never their `.idx-row`/`.idx-x` children),
      figures, callouts, accordion items, timeline entries, numbered steps. Verified by static
      per-route-function scan (node, regex over each `function render*` body) that every one of
      the 13 non-home routes contains at least one match (conditions/assessments/directory/
      bulletin → `.idx-sec`; foundations → `.fig`+`.tl-item`+`.callout`+accordion; pillars →
      `.section-head`+bare `.page > h2`; models → `.idx-sec`; reasoning/evidence/clients →
      `.callout`/`.step`; videos → `.section-head`; resources/toolkit → bare `.page > h2` inside
      tab panels, which the strict `.page > h2` child-combinator correctly EXCLUDES since those
      headings are nested inside `data-panel` divs, not direct children of `.page` — tab-switch
      disclosure is a different interaction than scroll reveal and was left alone).
- [x] **Observer lifecycle** — `wireReveals(root)` (app.js ~1863): disconnects any previous
      route's `revealObserver` first (its old targets are gone from the DOM anyway), returns
      early under `prefersReducedMotion()` (no observer created, no `.reveal` class ever added),
      else queries `REVEAL_SELECTOR` inside `root`, tags each match `.reveal`, and `observe()`s
      it. Called from `route()`'s `update()` (app.js ~1945) right after `buildPageTOC()`, guarded
      `if (resolvedKey !== "home")`; the `else` branch explicitly disconnects on a home landing so
      no observer is ever left watching a detached previous page's nodes. One observer instance
      exists at a time for the whole app; each element is `unobserve()`d the instant it reveals
      (one-time reveal, never re-hides on scrolling back up).
- [x] **Stagger / delay numbers** — `transition: opacity var(--dur-2) var(--ease), transform
      var(--dur-2) var(--ease)` (0.28s), `transform: translateY(12px)` (opacity + small
      translateY only, ≤12px per the constraint). Per-element `transition-delay` set inline via
      `--rdelay` custom property, computed PER OBSERVER-CALLBACK BATCH (not a fixed nth-child
      list, since batches are scroll position, not DOM order): first batch (whatever is already
      in the viewport the instant the route renders) steps 15ms apart capped at 90ms total chain
      (under the item's ~100ms landing-cascade limit); every later batch (user scrolling further
      sections into view) steps 40ms apart capped at 240ms (the item's stagger-cap spec).
- [x] **PRM handling** — JS gate is primary (`wireReveals` returns before creating the observer
      or adding any class, so PRM users' content is never touched — no opacity:0 state ever
      exists for them); `styles.css` `@media (prefers-reduced-motion: reduce) { .reveal {
      opacity:1!important; transform:none!important; transition:none!important; } }` added as a
      CSS-only backstop, matching the file's existing belt-and-braces pattern for the F33 view-
      transition block a few lines above it.
- [x] **Print handling** — `.reveal { opacity:1!important; transform:none!important;
      transition:none!important; }` added inside the existing `@media print { }` block (styles.css
      ~1216), alongside the other force-visible/force-static print rules, so a printed handout
      never carries a section stuck at opacity:0 regardless of scroll position at print time.
- [x] **a11y / F33 / print non-regression by construction** — opacity only, never
      `display:none`/`visibility:hidden`, so find-in-page and screen-reader text access are
      unaffected before reveal; `.reveal` is only ever added by JS to elements it is about to
      observe, so content is never hidden by default CSS alone (no-JS / JS-error fallback = fully
      visible, avoiding the "opacity:0-in-base" pitfall PLAN.md's F38 note calls out for the
      sibling CSS-only approach). `#main`'s F33 view-transition wiring (`view-transition-name`,
      the vt-fade keyframes) is untouched; `wireReveals()` runs inside the same synchronous
      `update()` callback `document.startViewTransition()` already wraps, so it participates in
      the existing choreography rather than replacing any part of it. `.page`'s own block-level
      `fade-up` animation and `.stagger` (home) are untouched — F38 is additive, not a
      replacement (see Open Questions #1).
- [x] **sw.js CACHE v21 → v22.**

**Files touched:** `assets/js/app.js`, `assets/css/styles.css`, `sw.js` ONLY. rigor.js / condition
data / clinical text untouched (not read or needed for this item).

### Static evidence (actual tool output)
```
$ node -e "new Function(fs.readFileSync('assets/js/app.js','utf8')); console.log('app.js parse OK')"
  → app.js parse OK
$ node --check sw.js  → OK
CSS brace balance: 674 / 674 BALANCED
$ grep -n 'CACHE = ' sw.js  → const CACHE = "ot-atlas-v22";

$ grep -n 'REVEAL_SELECTOR\s*=' assets/js/app.js
  1852:  const REVEAL_SELECTOR = ".page > h2, .section-head, .idx-sec, .fig, .callout, .acc-item, .tl-item, .step";
  (confirmed selector contains no .idx-row / .idx-x / .idx-list substring — never reveals rows)

$ grep -n 'wireReveals\|revealObserver\|IntersectionObserver' assets/js/app.js
  1858: let revealObserver = null;
  1863: function wireReveals(root) {
  1864:   if (revealObserver) { revealObserver.disconnect(); revealObserver = null; }
  1871:   revealObserver = new IntersectionObserver((entries, obs) => { ... });
  1885:   targets.forEach(el => { el.classList.add("reveal"); revealObserver.observe(el); });
  1945:   if (resolvedKey !== "home") wireReveals(main); else if (revealObserver) { revealObserver.disconnect(); revealObserver = null; }

$ grep -n 'prefers-reduced-motion: reduce' assets/css/styles.css   → 4 blocks (112, 126, 350, 458)
  (350 = the new F38 .reveal PRM backstop, adjacent to the F33 view-transition PRM block at 126)

$ grep -n '\.reveal.*!important' assets/css/styles.css
  350:  .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
  1218: .reveal { opacity:1 !important; transform:none !important; transition:none !important; }
  (350 = PRM backstop, 1218 = print force-visible, inside @media print)

Per-route static scan (node, regex over each function render*() body) confirming every one of
the 13 non-home routes contains ≥1 reveal-target class:
  renderFoundations   fig:1 callout:2 tl-item:1 acc-item(via accordionHTML):1 bareH2:5
  renderPillars       section-head:1 bareH2(direct .page children):4
  renderModels        idx-sec:2
  renderReasoning     section-head:3 callout:3 step:1
  renderEvidence      callout:4 step:1
  renderConditions    idx-sec:1
  renderAssessments   idx-sec:1
  renderDirectory     idx-sec:1 fig:1
  renderBulletin      idx-sec:1 fig:1
  renderVideos        section-head:2
  renderResources     (glossary/orgs — bare h2 inside page flow)
  renderClients       callout:1 acc-item(via accordionHTML):1 step:1
  renderToolkit       (tool headings live inside data-panel tabs, correctly excluded — see below)
```

### Open Questions / judgment calls
1. **`.page`'s existing block-level `fade-up` animation (0.5s) and home's `.stagger` were left
   untouched — F38 is additive, not a replacement.** The PLAN.md item's "Why" describes the
   CURRENT problem as pages getting "just" the block-level fade (one slab). The dispatch's "How"
   only asked to roll out a reveal system to the other 13 pages, not to strip `.page`'s own
   entrance animation. Layering per-section reveal underneath a still-present 500ms container
   fade is a minor, imperceptible-in-practice overlap (both animations reach opacity:1 well within
   the same first second) rather than a conflict, and keeping `.page`/`.stagger` untouched is the
   lower-risk, easily-rolled-back choice (rollback = delete the new CSS block + the `wireReveals`
   call + its selector const). Flag if the intent was to REMOVE `.page`'s block fade on the 13
   routes so section reveal is the ONLY entrance motion there.
2. **`.step` (numbered step blocks — case-walkthrough/EBP-process/client "what to expect" steps)
   was added to the reveal-target list even though the item's "How" enumerates
   ".page > h2/.section-head, .idx-sec, .fig, .callout, .acc, timeline items" without naming it
   explicitly.** `.step` is the same section-level granularity as `.fig`/`.callout` (a handful per
   page, never a 60-row list), so it was folded in for consistency with the rollout's intent
   rather than left as a slab. One-line revert: drop `.step` from `REVEAL_SELECTOR`.
3. **Filter-triggered redraws (conditions/assessments/directory/bulletin search & chip clicks,
   which call their internal `draw()` and replace `#condGrid`/`#asmtList`/etc.) are NOT re-wired
   into the reveal system** — newly-drawn `.idx-sec` sections from a filter change render without
   the `.reveal` class (plain, immediately visible, since hiding is only ever added by
   `wireReveals` at route-render time). This is safe by construction (no content can get stuck
   invisible) but means filter-changed content does not itself compose in — that redraw
   choreography is F39's scope ("FLIP-animate grid filtering" / view-transition on filter redraw),
   not this item's. Flagging in case F38 was meant to also cover filter-redraw entrances.
4. **Toolkit and the `whatIsOT`/`philosophy`/`history`/`profession` tab panels on
   foundations do not get scroll-reveal on their own headings** — those headings live inside
   `data-panel="…"` divs (children of `.page`, but the headings themselves are grandchildren, not
   direct children), so the strict `.page > h2` combinator excludes them by design (tab-switch is
   a click-driven disclosure, not a scroll-driven one, and IS still fully covered once a hidden
   tab panel's `display:none` is removed — the same `IntersectionObserver` already watching those
   nodes fires once they become visible in the viewport, so a first-open tab still gets a reveal,
   just not on scroll). Flagging only because the "13 routes" framing could be read as "every
   route uniformly," and this item does not achieve a uniform density of reveal targets on
   tab-heavy pages (foundations, toolkit) vs. list-heavy ones (conditions, assessments, directory,
   bulletin, models).

**Exact next item:** Orchestrator/Fable live verification — Chrome preview 12→14-route sweep
scrolling each of the 13 non-home routes to confirm sections compose in (not the whole page as one
slab), PRM toggle check (`Emulation.setEmulatedMedia`) confirms instant full visibility with zero
transition, a print-preview check that no section renders at opacity:0, and confirmation the F33
view-transition crossfade between routes still plays cleanly with reveals wired underneath it.
Then mark this entry COMPLETE.

## 2026-07-16 (cont) — [F37] states + retry bug + screener ration (Sonnet agent, dispatched by Fable; Fable live-verified) — COMPLETE
**Fable live verification (actual output):** FAILURE RECIPE run for real — conditions.js moved
aside + SW unregistered + reload → error card renders via the REAL code path (role="alert",
"The atlas didn't load — reloading usually fixes this", "Data file that didn't arrive:
conditions.js", working reload button). ⚠️ Verification note: the browser-pane tab THROTTLES
background timers (~2/s → 1/8s), so the 75×40ms cap takes minutes there — confirmed the full
path by evaluating app.js with only START_MAX_ATTEMPTS patched to 2 (error card in ~2.5s); in
a foreground user tab the cap fires at ≈3s as designed. File restored; recovery reload clean.
Screener: 10 hairline rows (computed border 1px bottom only, radius 0, bg transparent),
.ci-box custom checkbox present, toggling works. Colophon: typeface credits render; chain
toolkit→"Continue the atlas → The OT directory", bulletin→"Start again at the beginning →
Start here" (14→wrap ✓). Empty states: conditions zero-result shows .empty-state with drawn
object + working clear ("66 conditions" restored). Search overlay: 4 suggestion chips
(stroke/COPM/MOHO/sensory), click runs the search (stroke→25 results). 14-route sweep renders
(+~6 nodes/route = richer colophon; toolkit +36 = screener+colophon), console clean,
caches → ["ot-atlas-v21"]. **Fable rulings on open questions:** glossary clear button
APPROVED; CHAPTER_TITLES map APPROVED; home getting a colophon APPROVED (last line of the
title page is right for a book); 40ms poll interval retained APPROVED.
Dispatch: implement F37's "How" (silent-retry bug fix, drawing loading state, shared empty-state
component, pageFoot() → map-legend colophon with 14-chapter next-link) plus the toolkit-screener
kit-ration fix assigned to this item's executor in the F49 critique note. Static checks only per
dispatch (no browser/preview tools used here) — orchestrator runs the live SW-aware
data-file-rename failure recipe and the visual/AA checks.

- [x] **(1) BUG FIX — `start()` silent retry.** Was `if (!window.OT || !window.OT.foundations ||
      !window.OT.conditions) { setTimeout(start, 40); return; }` — unconditional, forever. Now
      capped: `START_MAX_ATTEMPTS = 75` at `START_RETRY_MS = 40` (≈3000ms), tracked via a
      `startAttempts` counter closed over `start()`. On cap, `renderStartError()` replaces
      `#main` with: the open-book brand mark (exact paths copied from the header `.brand-mark`
      SVG, viewBox 0 0 100 100), "The atlas didn't load — reloading usually fixes this.", a
      REAL `<button id="startReload">` wired to `location.reload()` (not a dead link), and — when
      determinable — which data file(s) never arrived. Determined via `missingDataFiles()`
      against `START_NS_FILE` (all 11 `window.OT.*` namespaces the CORE data files set:
      foundations/models/reasoning/conditions/assessments/evidence/videos/resources/directory/
      bulletin/rigor → their `.js` filenames), so a renamed/404'd `conditions.js` reports
      "Data file that didn't arrive: conditions.js". `announce()` (existing `#routeStatus`
      live region, outside `#main` so it survives the replace) tells screen-reader users the
      atlas failed to load.
- [x] **(2) Loading state.** `index.html`'s `.view-loading` (was bare "Loading the atlas…" text)
      now holds the same open-book brand-mark SVG (`.loading-mark`, two paths `.lm-cover`/
      `.lm-spine`, `pathLength="100"` on both — the exact convention F36's `evidenceDial` already
      established for arc fills) plus the unchanged copy. CSS: base rule is `stroke-dashoffset: 0`
      (fully drawn/STATIC by default); the draw-on-loop animation (`lm-draw`, infinite, cover then
      spine with a stagger delay) lives entirely inside
      `@media (prefers-reduced-motion: no-preference)` — PRM users get the complete static mark,
      never a stuck-undrawn or unnecessarily-moving one. `renderStartError()`'s mark reuses the
      same two paths WITHOUT the `.loading-mark` animation classes tied to it (no `pathLength`/
      dasharray attrs on that copy) — it's inert by construction, not just PRM-gated.
- [x] **(3) Empty states.** New shared helper `emptyState(messageHTML, icon)` (app.js, next to
      `icn()`) → `.empty-state` (drawn-object icon + message; CSS merged with the pre-existing
      `.search-empty .empty-obj` rule so there's one icon treatment, not two — "extend, don't
      duplicate" per the dispatch note). Converted call sites (5, all previously bare
      `<p class="muted">…`): conditions "No conditions match…" (i-compass), assessments
      "No assessments match…" (i-compass), directory "Nothing matches…" (i-obj-mug), bulletin
      "Nothing matches…" (i-compass), resources glossary "No terms match" (i-compass — this one
      had NO existing recovery action, so a "Clear search" text-btn + `#glossClear` handler was
      added, mirroring the other four's `#xClear` pattern). ALL pre-existing `#condClear`/
      `#asmtClear`/`#dirClear`/`#bulClear` clear-filters buttons kept their ids/handlers verbatim
      — only the wrapping markup changed. Search-overlay `.search-empty` (already had a mug icon)
      was extended, not duplicated: its 4 suggestion terms ("stroke"/"COPM"/"MOHO"/"sensory") were
      plain text, now `.chip` buttons (`data-suggest`) wired to `sInput.value = term; runSearch(term)`.
- [x] **(4) `pageFoot()` → map-legend colophon.** Signature is now `pageFoot(key)` — every one of
      the 14 render functions (added `renderHome`, which never called `pageFoot()` before) now
      passes its own route key: `pageFoot("home")` … `pageFoot("bulletin")`, one call each,
      verified 1:1 against `Object.keys(ROUTE_COORD)` (dry-run below). Kept the existing
      reviewed-date line (`.foot-legal`), added `.foot-colophon` (mono, `--text-2xs`/
      `--track-label`, uppercase) with typeface credits ("Fraunces · Hanken Grotesk · Spline
      Sans Mono") + a WCAG-AA note, and `.foot-next` — "Continue the atlas → &lt;next chapter&gt;"
      computed as `order[(i+1) % order.length]` over `Object.keys(ROUTE_COORD)` (its insertion
      order is already the 01→14 numbering, confirmed by dry-run — no separate sort needed).
      Display names come from a new `CHAPTER_TITLES` map (mirrors the nav-list wording in
      index.html; kept separate from `ROUTE_TITLES` because that map drives `<title>`/meta and is
      missing directory/bulletin entries). **bulletin (14 of 14) wraps to home** with "Start again
      at the beginning → Start here" instead of "Continue the atlas →". Composition is hairline
      rules only (2px top rule echoing `.fig`, 1px rule above `.foot-next`) — no card/box.
- [x] **(5) Toolkit screener ration.** `.checklist`/`.check-item` (was a stack of white
      `border+radius+background` cards with native `<input type=checkbox>` at 18×18 — the "heavy
      solid unchecked boxes" the F49 critique flagged) → hairline rows: `.check-item` is now
      border-bottom only (+ border-top on `:first-child`), no radius/shadow/background. The
      native checkbox is visually hidden via the existing `.sr-only` class (reused, not
      reinvented) while staying keyboard/AT-operable; a sibling `.ci-box` (1.5px `var(--ink)`
      outline square, no radius) is the visible control, with a `.ci-tick` (`<use href="#i-check">`)
      that fades/scales in on `:checked`. `:focus-visible` on the (hidden) input drives a visible
      outline on `.ci-box` via `~` sibling selector. The `<label>` still wraps the input — row IS
      the click target, unchanged. **Zero changes to `wireScreener()`/`screenerItems` — logic and
      scoring untouched**; `$$("#scrList input:checked")` still matches (same input, new wrapper).
- [x] **(6) sw.js CACHE v20 → v21.**

**Files touched:** `assets/js/app.js`, `index.html` (loading markup only), `assets/css/styles.css`,
`sw.js`. No other files. rigor.js / condition-assessment data / clinical text untouched.

### Static evidence (actual tool output)
```
$ node -e "new Function(fs.readFileSync('assets/js/app.js','utf8'))"  → app.js parse OK
$ node --check sw.js                                                   → OK
CSS brace balance: 669 / 669 BALANCED
$ grep -n 'CACHE = ' sw.js  → const CACHE = "ot-atlas-v21";

Retry cap (was: unconditional `setTimeout(start, 40)` forever):
  app.js:1918  const START_RETRY_MS = 40, START_MAX_ATTEMPTS = 75; // ≈3000ms
  app.js:1949-1955  startAttempts counter → renderStartError() at cap, else setTimeout(start,...)
  Simulated the dispatch's mv-conditions.js recipe in Node (window.OT missing .conditions only):
    missingDataFiles() → ["conditions.js"]   (gate check !foundations||!conditions → true)

Empty-state sites converted (grep emptyState():
  app.js:852   conditions  "No conditions match…"      icon i-compass
  app.js:1104  assessments "No assessments match…"     icon i-compass
  app.js:1183  directory   "Nothing matches…"          icon i-obj-mug
  app.js:1256  bulletin    "Nothing matches…"          icon i-compass
  app.js:1362  resources/glossary "No terms match"     icon i-compass (+ new #glossClear action)
  + search-overlay .search-empty: 4 suggestion terms now .chip[data-suggest] buttons (was plain text)

Colophon next-chapter chain (Object.keys(ROUTE_COORD) dry-run, Node):
  route count: 14
   1 home        -> continue -> foundations   8 assessments -> continue -> videos
   2 foundations -> continue -> pillars       9 videos      -> continue -> resources
   3 pillars     -> continue -> models       10 resources   -> continue -> clients
   4 models      -> continue -> reasoning    11 clients     -> continue -> toolkit
   5 reasoning   -> continue -> evidence     12 toolkit     -> continue -> directory
   6 evidence    -> continue -> conditions   13 directory   -> continue -> bulletin
   7 conditions  -> continue -> assessments  14 bulletin    -> START AGAIN -> home
  pageFoot("...") call sites: 14, one per render fn, each passing its OWN key (verified by
  scanning back from each call to its nearest preceding `function render*` — home/foundations/
  pillars/models/reasoning/evidence/conditions/assessments/directory/bulletin/videos/resources/
  clients/toolkit, no mismatches).

Screener markup (grep ci-input/ci-box/ci-tick): app.js:1471 — checkbox now
  `class="ci-input sr-only"` + sibling `.ci-box` (svg use #i-check as .ci-tick); wireScreener()
  UNCHANGED, still selects "#scrList input:checked".
```
Marked `[PARTIAL]` pending the orchestrator's live verification (SW-aware data-file-rename
failure recipe per the item's Verify section; both-theme AA measurement on the colophon/
empty-state/checklist; PRM toggle check on the loading-mark animation; 14-route sweep + 0
console errors) — all 6 sub-steps above are implemented and statically verified as shown.

### Open Questions / judgment calls
1. **Glossary empty state had no existing recovery action** (unlike conditions/assessments/
   directory/bulletin, which all had a filters-driven `#xClear` button already). Added
   `#glossClear` (same pattern: resets the query, clears the search input, redraws) since the
   dispatch requires "message, recovery action" for every converted site and the glossary only
   has a search box (no filter chips) to clear. One-line revert if a bare message (no action) is
   preferred instead.
2. **`CHAPTER_TITLES` is a new map, not a reuse of `ROUTE_TITLES`.** `ROUTE_TITLES` (drives
   `<title>`/meta) is missing `directory`/`bulletin` entries and its home entry ("Occupational
   therapy, in depth") reads wrong as a "next chapter" link label. `CHAPTER_TITLES` mirrors the
   nav-list wording instead (e.g. home → "Start here") and covers all 14 keys. Flagging in case
   Fable prefers consolidating the two maps later.
3. **`renderHome` now calls `pageFoot("home")` for the first time** (it previously had no footer
   at all) — needed so chapter 01 participates in the "ALL 14 chapters" colophon chain per the
   dispatch. This adds the legal/colophon/next-link block to the bottom of the home page, which
   it didn't have before. Flag if home was meant to stay footer-free and only feed INTO the chain
   from bulletin's wrap (in which case remove this one call and home simply has no "next" line
   itself, same as before).
4. **START_MAX_ATTEMPTS/interval reuses the ORIGINAL 40ms poll rate** (only the retry count is
   new) — 75 × 40ms ≈ 3000ms, matching the item's "~75 attempts (≈3s)" spec exactly. Not flagging
   as a question, just noting the arithmetic was matched deliberately rather than rounded.


**Fable live verification (actual output):** stroke drawer = "PLATE 07·1 — NEURO, PHYSICAL &
MSK REHAB" on teal tint rgb(220,235,230) · dementia = geri clay rgb(251,228,220) · asd = peds
sage rgb(224,231,223); every stamp equals its F49 index number (stroke index row 07·1 ✓ —
shared condPlates() helper working); .plate-taxon renders "Neuro… · Acute care · Inpatient
rehab" (settings split, nothing invented); .ev-dial renders beside an UNCHANGED badge ("Strong
evidence" text intact); drawer h3s now serif book voice. Models drawer verified PLAIN (no
plate band, opens fine). Scroll lock releases (body static after close). 6-route spot sweep
stable, console clean, caches → ["ot-atlas-v20"]. Screenshot: stroke specimen plate over the
conditions index. **Fable rulings:** plum color-mix for mh APPROVED (no --plum-tint token
exists; matches .ev-plum); full category label in stamp APPROVED; drawer mini-TOC correctly
descoped (not in PLAN item's How); title staying --ink APPROVED (band already carries the
category; a tinted title would double-encode).
**Files:** `assets/js/app.js`, `assets/css/styles.css`, `sw.js` ONLY. rigor.js / condition data /
clinical text untouched (rigor.js READ only, for the strength tone map). Static checks only (no
browser/preview per dispatch — orchestrator does live checks). All 4 dispatched sub-steps
implemented; marked [PARTIAL] pending Fable live verification (screenshots, both-theme AA, print,
focus-trap, 0 console errors).

- [x] **(1) Header band on the CONDITION drawer only.** `drawerShell(eyebrow,title,body,plate)`
      gained an optional 4th arg. ONLY `openCondition` passes `plate`; every other caller
      (`openModel`, etc.) omits it → plain `.drawer-head` unchanged. When present it renders a
      full-bleed, square-cornered, category-tinted `.drawer-plate` strip: `icn(cat.icon)` +
      plate stamp `PLATE 07·<n> — <CATEGORY>` (mono, `var(--text-2xs)`, `var(--track-label)`,
      uppercase) on the stamp row, the title `<h2 class="drawer-title">`, then the taxonomy line,
      then the existing close button (share button still appended by openCondition to
      `.drawer-head`). Band keeps the inherited sticky + border-bottom from `.drawer-head`.
      **Tint map AS SHIPPED (data-tint = `c.cat`, CSS at styles.css ~851–857):**
      `neuro→--teal-tint / text --teal-deep` · `hand→--ochre-tint / --ochre-deep` ·
      `peds→--sage-tint / --sage-deep` · `mh→color-mix(--plum 16%) / --plum-deep` (see OQ 1) ·
      `geri→--clay-tint / --clay-deep` · `spec→--paper-2 / --ink-soft` (neutral). Band text
      colour = matching `-deep` token (AA); title kept `--ink` (passes AA on every tint, both
      themes); icon follows `currentColor` = the band deep token.
- [x] **(2) Taxonomy line** under the title, mono `var(--text-2xs)`: `<category> · <first 2
      settings>`. Built from the condition's own `c.settings` ("·"-split, trimmed, `.slice(0,2)`),
      prefixed with the category label. No invented content. Verified against data: stroke →
      "Neuro, Physical & MSK Rehab · Acute care · Inpatient rehab"; asd → "…Paediatrics · Schools
      · Early intervention"; dementia → "…Geriatrics… · Home health · SNF".
- [x] **(3) Evidence arc-dial** `evidenceDial(ev)` injected beside the badge inside a
      `.ev-dialwrap` flex row (dial + existing `evidenceBlock`). Inline SVG (44px, `viewBox 0 0
      40 40`), `aria-hidden="true"` `focusable="false"` — **the dot+label text in `evidenceBadge`
      is untouched** (evidenceBadge/evidenceBlock NOT modified, so the assessments index that
      shares them is unaffected). 270° gauge (90° gap at bottom): track = `var(--line)`, value arc
      = `currentColor` filled via `pathLength="100"` + `stroke-dasharray: step*20 100`. **FIVE-step
      strength→fill** (rigor.js strengthLevels): strong 5/5 · moderate 4/5 · emerging 3/5 ·
      contested 2/5 · insufficient 1/5. Confidence high/medium/low → 3/2/1 filled tick dots in the
      bottom gap. Colour = strength `tone` via `.ev-dial[data-tone=…]` → the same `-deep` token
      family the badge uses (teal/sage/ochre/clay/plum).
- [x] **(3b) Drawer h3 demotion** (PLAN item 25 deferred note, done while restructuring): drawer
      `h3`s were mono / `--track-label` / uppercase / `--teal-deep` → now book voice: `var(--serif)`,
      `var(--text-md)`, `font-weight:600`, `-.01em`, normal case, `--ink`.
- [x] **(4) sw.js CACHE v19 → v20.**

### Shared plate-number helper (dispatch requirement — ONE source, both call sites)
`condPlates()` (app.js:801) builds `{plateNo, perCat}` = position within the FULL category over
`window.OT.conditions` order. `condPlateNo(id)` (app.js:806) wraps it. `renderConditions`' `draw()`
destructures `condPlates()` (app.js:837) for both the row `07·n` AND the "X of Y" header counts;
`openCondition` uses `condPlateNo(c.id)` (app.js:990) for the stamp → drawer stamp ALWAYS equals
the index row number by construction.

### Static evidence (actual tool output)
```
$ node -e "new Function(fs.readFileSync('assets/js/app.js','utf8'))"  → app.js parse OK
$ node --check sw.js  → OK
CSS brace balance: 643 / 643 BALANCED
grep condPlates()/condPlateNo(  → 801 def, 806 def, 837 renderConditions draw(), 990 openCondition
sw cache: const CACHE = "ot-atlas-v20";
Data cross-check (loaded conditions.js + rigor.js in Node, replicated condPlates()):
  stroke  cat=neuro PLATE 07·1 tint=teal-tint  settings2="Acute care · Inpatient rehab"
  asd     cat=peds  PLATE 07·1 tint=sage-tint  settings2="Schools · Early intervention"
  dementia cat=geri PLATE 07·1 tint=clay-tint  settings2="Home health · SNF"
  dial steps: strong→5/5 (stroke) · moderate→4/5 (tbi) · emerging→3/5 (adhd) ·
              contested→2/5 (asd) · insufficient→1/5 (als)   — matches 5-step map
  category counts: neuro:17 hand:8 peds:13 mh:9 geri:7 spec:12 (66 total)
```

### Open Questions / judgment calls
1. **mh tint uses `color-mix(in srgb, var(--plum) 16%, transparent)`, NOT a `--plum-tint` token.**
   The dispatch tint map says "mh→plum-tint", but **no `--plum-tint` token exists** in styles.css
   (light OR dark) — the app's established plum tint is exactly this color-mix (see `.ev-plum`,
   styles.css:886). Reused it verbatim for consistency; text `--plum-deep` (AA). One-line swap if a
   real `--plum-tint` token is added later.
2. **Stamp `<CATEGORY>` uses the FULL category label uppercased** (e.g. "NEURO, PHYSICAL & MSK
   REHAB"), matching the index section header, not a short key. Long but honest; wraps if needed.
3. **Dispatch scoped F36 to 4 steps** (band / taxonomy / dial / cache) — the PLAN item's sub-step
   (4) "sticky mini-nav / drawer TOC" was NOT in the dispatch and is NOT implemented here.
4. **Title kept `--ink`** (not the `-deep` tint token) — the "-deep on tint" AA rule was applied to
   the mono label text (stamp + taxon + icon); `--ink` on every tint passes AA in both themes, and
   an ink serif name reads as the book voice. Flag if a deep-tinted title is preferred.

## 2026-07-16 (cont) — [F35] chapter identity + models de-kit (Opus agent, dispatched by Fable; Fable live-verified) — COMPLETE
**Fable live verification (actual output):** data-chapter correct on all 4 groups with distinct
-deep accents (home→orientation teal rgb(14,78,74) · models→framework plum rgb(87,58,78) ·
directory→reference ochre rgb(126,88,16) · toolkit→action clay rgb(180,68,31)); models index:
8 drawer rows (04·1 opens "Model of Human Occupation") + 15 FoR details, 0 cards; conditions
masthead search live ("strok"→"1 condition"); 375px coord inline "07 ·" borderless, group word
hidden, no overflow, masthead wraps to 2 rows (99px); 14-route sweep all render (+2 nodes/route
from the coord split; models 226→303 = FoR bodies now inline; conditions +3 = masthead row);
console clean; caches → ["ot-atlas-v19"]. Screenshot: models page = book index with plum
chapter accent + right-aligned model tags. **Fable rulings on the agent's open questions:**
continuous FoR numbering 04·9–04·23 APPROVED (chapter-wide plate uniqueness, like a real
chapter); full model summaries as idx-desc APPROVED (no truncation is the ration); eyebrow
text staying clay while only the dash takes the chapter accent APPROVED (the dash IS the
signature; recoloring all eyebrow text would over-sauce it).
**Files:** `assets/js/app.js`, `assets/css/styles.css`, `sw.js` ONLY. No frameworks; tokens kept;
`[hidden]{display:none!important}` untouched; rigor.js/clinical text untouched. Static checks only
(no browser/preview per dispatch). Marked [PARTIAL] pending Fable live verification (screenshots +
AA measurement + 14-route sweep); all sub-steps implemented, static evidence below.

- [x] **(1) Chapter accents by nav group** via `#main[data-chapter]` set in `route()`'s `update()`
      (`main.dataset.chapter = chapterSlug(...)`). `chapterSlug(key)` parses the group word out of
      `ROUTE_COORD[key]` (`split("·")[1].trim()`) → `CHAPTER_SLUG` map. Slugs: ORIENTATION→teal
      (`orientation`, the `#main` default), THE FRAMEWORK→plum (`framework`), REFERENCE→ochre
      (`reference`), GET HELP & DO→clay (`action`). CSS drives it through two custom props on
      `#main` (`--chapter-accent` / `--chapter-accent-deep`); applied ONLY to `.coord` (border =
      `color-mix(... 32%)`, text = `--chapter-accent-deep`) and `.eyebrow::before` dash (=
      `--chapter-accent`). **All four `-deep` tokens verified present in both themes** (styles.css
      21/28/31/34 light, 88/95/98/101 dark) — none missing, no fallback needed. Text uses `-deep`
      per the AA rule (sage deliberately unused — it's the evidence-strength color).
- [x] **(2) De-duplicated eyebrows + em words** — audit collisions ("Reference library" ×3 across
      conditions/assessments/directory; em "practice" ×2 pillars/evidence; em "library" ×2
      conditions/videos) all resolved. Conditions eyebrow → "The clinical atlas"; assessments →
      "The measurement shelf" (directory keeps sole "Reference library"). Pillars re-emphasised
      "The <em>pillars</em> of practice" (was em "practice"); conditions re-emphasised
      "<em>Conditions</em> library" (was em "library"). Evidence keeps em "practice" (EBP is the
      real term); videos keeps em "library". **All 14 route eyebrows + all 14 em words now unique**
      (enumerated below).
- [x] **(3) Mobile coord variant** (≤600px): `.coord` was `display:none`; now the border/padding
      drop and only the "NN ·" prefix stays inline in the eyebrow (group word hidden). `stampCoord`
      now emits `<span class="coord-no">NN ·</span> <span class="coord-grp">GROUP</span>`; the
      `@media (max-width:600px)` rule hides `.coord-grp` and strips the chip border. Reclaims chapter
      identity without a hero line.
- [x] **(4) Library masthead** on conditions AND assessments: the search field moved UP into a
      `.lib-masthead` flex row beside the h1 (`justify-content:space-between; flex-wrap:wrap`;
      `.lib-search` is `flex:1 1 260px; max-width:440px`, wraps to full width ≤600px). Input ids
      `#condSearch`/`#asmtSearch` preserved → filter/search JS untouched. Eyebrow still precedes the
      masthead so `stampCoord`'s `.page .eyebrow` target is unaffected.
- [x] **(5) MODELS page de-kit** (F49 follow-up): the occupation-models card grid + FoR accordions
      became THE INDEX (chapter 04). Models → `.idx-row` **buttons** (kept `openModel(i)` wiring via
      `data-model` on the rows, container `#modelGrid`), `mod.abbr` rendered as `<span class="tag
      teal">` after the name (mirrors the assessments index), plate numbers `04·1..04·8`, idx-desc =
      FULL `mod.summary` (**no `.slice(130)`/"…" truncation** — the model's essence field). FoR →
      native `<details class="idx-x">` (they had no drawer, only an accordion → converted to
      disclosure like the assessments index), plate numbers `04·9..04·23` (continuous so each plate
      is unique in the chapter), idx-desc = `fr.basis`, body = `When it's used.` / `Examples.`
      run-ins. Removed the `wireAccordions()`/`accordionHTML` usage from renderModels only (still
      used elsewhere). No new clinical content written.
- [x] **(6) sw.js CACHE v18 → v19.**

### Static evidence (actual tool output)
```
$ node -e "new Function(fs.readFileSync('assets/js/app.js','utf8'))"   → app.js parse OK
$ node --check sw.js            → OK      $ node --check models.js       → OK
CSS brace balance: 618 / 618 BALANCED
data-chapter wiring:
  app.js:1801  main.dataset.chapter = chapterSlug(routes[key] ? key : "home");
  app.js:1772  CHAPTER_SLUG = {ORIENTATION:orientation, THE FRAMEWORK:framework,
                               REFERENCE:reference, GET HELP & DO:action}
  css:315-318  #main{--chapter-accent:teal} + [data-chapter=framework|reference|action]
  css:319/322-323  .eyebrow::before bg + .coord color/border → var(--chapter-accent[-deep])
chapterSlug/coord-split dry run over all 14 ROUTE_COORD values: every route resolves to the
  correct group slug (0 FALLBACK) and coord splits cleanly into NN + GROUP (verified in Node).
```
**14 unique eyebrow · em pairs (route → EYEBROW / em):**
```
home        An in-depth, evidence-informed guide / extraordinary.
foundations Foundations & the profession        / therapy
pillars     The OTPF-4 domain                    / pillars        (was em "practice")
models      Theory that drives practice          / frames of reference
reasoning   How occupational therapists think    / reasoning
evidence    Doing what works                     / practice
conditions  The clinical atlas   (was "Reference library") / Conditions (was em "library")
assessments The measurement shelf (was "Reference library") / outcome measures
videos      Watch & learn                        / library
resources   Go deeper                            / glossary
clients     For clients & families               / help you?
toolkit     Do, don't just read                  / toolkit
directory   Reference library (sole owner)       / directory
bulletin    Notes to this edition                / changed
```
**Models/FoR open mechanism:** models = `.idx-row` **buttons → existing drawer** (`openModel(i)`,
`data-model` attrs, `#modelGrid` handler kept); FoR = native **`<details>`** (no pre-existing
drawer — the old accordion became a disclosure, per the dispatch's "if it has no drawer make rows
`<details>`").

### Open Questions / judgment calls
1. **FoR plate numbering is continuous (04·9..04·23), not restarted at 04·1.** Rationale: models
   and FoR are two different object types in one chapter, so continuous numbers keep every plate in
   chapter 04 unique/unambiguous (unlike conditions/assessments where NN·1 legitimately recurs per
   category). If Fable prefers FoR to restart at 04·1, it's a one-line change.
2. **idx-desc for models shows the full `mod.summary`** (2–3 sentences), not a clipped one-liner —
   the dispatch forbids both truncation AND new clinical content, and models have no dedicated
   short field, so the summary is the "essence" line as written. It wraps like a book index
   annotation (idx-desc max-width 64ch).
3. **Eyebrow TEXT color unchanged (stays `--clay-deep`)** — the dispatch scoped the chapter accent
   to the `.coord` and the `.eyebrow::before` dash ONLY, so on non-clay chapters the dash now
   differs from the eyebrow word color by design. Flagging in case Fable wants the eyebrow text to
   also follow the accent (would be a one-line `color: var(--chapter-accent-deep)` on `.eyebrow`).


**Fable live verification (actual output):** computed sizes hit tokens EXACTLY — .ev-mini 11.2px
(2xs) · .idx-no/.idx-count/.eyebrow 11.52px (xs) · .idx-desc 13.12px (sm) · lede still fluid
21.12px (untouched clamp); tracking .eyebrow 1.8432px (=.16em) · .idx-no 0.9216px (=.08em);
table.data font-variant-numeric: tabular-nums; 375px: no horizontal overflow, chip row 343px,
eyebrow single-line; 14-route sweep node counts IDENTICAL to pre-F34 (home 172 … toolkit 170 —
CSS-only proven); console clean; caches → ["ot-atlas-v18"]. Agent's 3 open questions all
resolved correct by Fable (.stat .num doesn't exist; .85em icon rule is em-relative, stays;
idx/callout values join their buckets, deltas ≤0.66px).
Files: `assets/css/styles.css` + `sw.js` CACHE bump ONLY. CSS-only visual consolidation.
Method: each RAW font-size value maps to exactly ONE authoritative bucket regardless of
selector, so bucket collapses are done as exact-substring `replace_all` on
`font-size: .NNrem` (the `rem` guard keeps `.85em` nav-icon / `.82em` print `em` sizes
untouched). Card tier is 4 NAMED selectors only → targeted edits (other 1.12rem like
`.fig-name`/`.plate-title` stay per "leave 1rem+ untouched"). Letter-spacing done as
`replace_all` on `letter-spacing: .NNem` (the `-` in `-.01/-.02em` and the `.005em`/`0`
literals are never substring-matched, so heading negatives + plain-lang tracking survive).

- [x] (1) tokens added to `:root` (styles.css:66–73): `--text-2xs:.7rem --text-xs:.72rem
      --text-sm:.82rem --text-md:.9rem --text-card:1.12rem --track-label:.08em --track-eyebrow:.16em`
- [x] (2) font-size buckets collapsed (16 exact-substring replace_all)
- [x] (3) letter-spacing → track-label (band .02–.12em) / track-eyebrow (.16/.18em)
- [x] (4) tabular-nums on table.data, .tl-item .yr, kbd (`.stat .num` absent → skipped, see OQ)
- [x] (5) explicit `h4 { font-size: 1rem }` added (styles.css:335)
- [x] (6) sw.js v17→**v18** (`node --check sw.js` OK)

### Static evidence (actual tool output)
**font-size count:** before **121** → after **122** (`grep -c 'font-size:'`; +1 = the new h4 rule).
Every raw bucket value gone outside print:
```
$ grep -nE 'font-size: \.(58|6|62|64|66|68|7|72|76|78|8|82|85|88|9|92)rem' styles.css
NONE remaining
$ grep -n 'font-size: \.6[0-6]' styles.css
NONE
```
Remaining `font-size: N.rem` literals are all the intended LEAVE set: 6 fluid clamps,
.94/.95/.98rem, 1rem+ (incl. `.plate-title`/`.fig-name` 1.12rem — NOT in the 4-selector card
tier), the new `h4 1rem`, and print `.82em` (untouched, it's `em`). Card tier (4 named
selectors) → `--text-card`: `.itemcard h2` (1.16→1.12, −.66px), `.acc-title`/`.cc-name`
(1.12→1.12, 0), `.welcome-btn strong` (1.1→1.12, +.33px).

**Letter-spacing distinct values:** before **13** → after **6**:
```
before:  -.02 -.01 .005 0 .02(3) .03(5) .04(8) .06(1) .08(9) .1(2) .12(1) .16(1) .18(1)
after:   -.01(3)  -.02(1)  .005(1)  0(1)  var(--track-eyebrow)(2)  var(--track-label)(29)
$ grep -nE 'letter-spacing: \.(02|03|04|06|08|1|12|16|18)em' styles.css  → NONE remaining
```
Heading negatives (`-.01em`×3, `-.02em`×1), plain-lang `.005em`, `.pt-abbr 0` all survived.
Eyebrows: `.nav-eyebrow` (.16→.16, same) + `.eyebrow` (.18→.16, −.02em intended consolidation).
`font-variant-numeric: tabular-nums` present on 3 rules (table.data / .tl-item .yr / kbd).
CSS brace balance 608/608; `node --check sw.js` OK; caches key will be `ot-atlas-v18`.

**Risen selectors (2xs bucket .58–.66rem → --text-2xs .7rem = 11.2px @16px root).** All 17,
delta = 11.2 − value·16 px. Those with a >1px rise are the `.58/.6/.62` originals (bold):
```
.58rem (+1.92px):  **.src-type**
.6rem  (+1.60px):  **.ev-mini**, **.country-card .cc-k**
.62rem (+1.28px):  **.ev-conf**, **.ev-ok/.ev-unv**, **.ev-bias-h**, **.ev-srch**, **.filter-lead**
.64rem (+0.96px):  .nav-eyebrow, .coord, .page-toc .toc-label, .search .sr-cat,
                   .itemcard .ic-cat, .ev-badge
.66rem (+0.64px):  .brand-text em, .tag, .tool-output .out-label
```
(Sub-1px members .64/.66 listed for completeness — same bucket, deliberate.) Every other
bucket delta is ≤0.99px (sm), ≤0.66px (xs/card), ≤0.33px (md) — all downward or negligible.

### Open Questions / judgment calls (flagged per protocol)
1. **`.stat .num` does not exist** in styles.css (only `.numbered .step .n` exists) → tabular-nums
   rule NOT created for it, per the item's "skip any selector that doesn't exist and note it."
   The other 3 (table.data, .tl-item .yr, kbd) were applied.
2. **`.nav-list a .ni { font-size: .85em }` LEFT UNTOUCHED.** `.85` is in the sm bucket list but
   this value is `em` (parent-relative icon sizing), not `rem`. Collapsing it to `.82rem` would
   break the icon's em-relative scale and change its role. Not a text-scale label → left as-is.
3. **idx-*/callout note tension.** The dispatch note said `.idx-*`/`.callout` are "in scope for
   the same bucket collapses" yet "MUST keep computing to the same rendered values." Those two
   can't both hold exactly: `.idx-count`/`.idx-no` `.68rem`→`--text-xs` is a +0.66px rise, and
   `.callout p` `.92rem`→`--text-md` is −0.33px — they shift to the bucket TOKEN, not their old px.
   I followed the explicit "in scope for collapses" instruction (leaving them raw would desync
   them from their bucket siblings, defeating the consolidation). Their `.08em` tracking →
   `var(--track-label)` (.08em) is genuinely unchanged. Flagging the sub-px size shift as the
   one place the note's two clauses conflict; did not leave untouched.

## 2026-07-16 (later) — [F52] De-slop pass 3: pathway doorway + margin-note callouts (Fable 5, owner: "get rid of the ai slop designs") — COMPLETE
Owner screenshotted two kit survivors: the home "For clients & families" tinted rounded card
(heart icon chip, lift-shadow) and a `.callout.note` box (rounded, ochre-tinted, ⓘ icon chip).
Both translated into the book language:
- [x] **`.pathway-primary` → rule-bounded doorway:** background/border/radius/shadow GONE; 2px
      ink top rule + hairline bottom (matches `.fig`); heart icon chip → drawn object
      **i-obj-key** (46px, the F44 set — "the way in"; echoes the key in the hero contour
      field); hover = surface wash + title→teal (no lift). Still a full-width button target.
- [x] **`.pathway-mini` glyph chips hidden** — run-in rows carry themselves on hairlines.
- [x] **`.callout` → margin note (GLOBAL, all ~14 call sites):** tinted fill, 1px border,
      radius, and `.ico` icon chips gone; now a 3px LEFT RULE in the tone color (tip→teal,
      warn→clay, note→ochre, default→ink-faint) + prose. No injected labels (several callouts
      open with their own <strong> run-ins — a generated label would double up).
- [x] sw.js CACHE v16→**v17**.
**Files:** `assets/css/styles.css` (callout block, pathway-primary, pathway-mini), 
`assets/js/app.js` (pathway markup: i-heart → fig-obj i-obj-key), `sw.js`.
**Evidence (actual tool output):**
```
Computed .callout.note: borderLeft "3px rgb(221,176,90)" (ochre), bg transparent, radius 0px,
  .ico display none. 14-route sweep: all render, counts stable (home 172 … toolkit 170).
  Console: "No console logs." caches → ["ot-atlas-v17"].
Screenshots: dark home (doorway between rules, key object, icon-free minis); light
  foundations ("occupation ≠ job" now a teal margin-rule aside above FIG. 02·A); light home
  (hero → doorway → contents reads as one continuous book page).
```
**Slop-test:** home no longer contains a single tinted rounded card; asides app-wide read as
margin notes, not alert boxes. Remaining kit (queue-owned): models grid (F35), toolkit
screener (F37), "More about…" accordion trio (F39).

## 2026-07-16 — [F51] THE BULLETIN — "What's changed" log (Fable 5, owner request) — COMPLETE
Owner: "keep a log and/or blog that helps track when updates to the profession, evidence,
licensure is updated (focused on USA typically, but include global info too)". Built as
**chapter 14 — notes to this edition**: route `#/bulletin`, nav under Reference library, coord
"14 · REFERENCE". Same F49 index language: YEAR sections, rows = `<details>` whose coordinate
slot is the DATE (`MAR 2026`, `.idx-no-date` 78px), summary = title + dot leader + category ·
region, body = What changed./Why it matters./Status./Sources run-ins. Filters: topic chips +
region chips + search; entries in global `/` search (cat "What's changed"). Method + limits
as **FIG. 14·A**; lede carries "Last reviewed <date>".
- [x] index.html: nav item (i-pen) + bulletin.js script tag
- [x] app.js: renderBulletin + route + ROUTE_COORD 14 + search index (guarded)
- [x] styles.css: `.idx-no-date` width modifier + detail link color
- [x] sw.js: CORE += bulletin.js; CACHE v14→**v15**
- [x] research (3 sonnet agents): US ~33 entries (compact launch Jan 2026, telehealth
      lapse/restore cycles, 3 yrs of conversion-factor cuts) · evidence 22 (Cochrane falls
      trilogy, SEARCH null trial, AOTA guideline wave) · global 22 (WFOT 2026 education
      standards, NDIS pricing squeeze, NHS apprenticeships). Honest flags kept: compact
      state-count discrepancy (32–35 across sources), WFOT vote date unconfirmed.
- [x] bulletin.js (opus transcription): **76 entries** after dedup, node --check OK.
      Fable fix after review: 6 Cochrane/Lancet evidence entries retagged region US→global
      (evidence now 15 US / 6 global); monthShow already guards year-only dates.
- [x] refresh protocol documented (HANDOFF.md "Keeping 'What's changed' current").
      Owner DECLINED scheduled automation (2026-07-16) — manual refresh on request only.
- [x] live verify + owner screenshots
**STATUS: COMPLETE (2026-07-16).**
**Evidence (actual tool output):**
```
14-route sweep: {home:172, foundations:337, pillars:236, models:226, reasoning:246,
  evidence:362, conditions:618, assessments:1577, videos:812, resources:313,
  directory:2657, bulletin:1634, clients:404, toolkit:170}. Console: "No console logs."
Bulletin: "76 notes"; years [2026(14), 2025, 2024, 2023, 2022]; topic filter evidence→21;
  search "compact"→10; first <details> shows What changed./Why it matters./Status.
  ("SCHEDULED — …")/Sources. run-ins. Global search "telehealth" → "What's changed:
  Medicare OT telehealth authority extended through Dec 31 2027".
caches → ["ot-atlas-v16"] (v16 incl. directory.js + bulletin.js in CORE).
Screenshots: bulletin light desktop (year ledger, MAR 2026 date coordinates, category ·
  region on the leader). NOTE: browser-pane screenshot pipeline desyncs after programmatic
  scroll — screenshots reliable at scrollTop 0 or on a fresh tab; app itself unaffected.
```

## 2026-07-16 — [F50] THE DIRECTORY — external OT resources, honestly rated (Fable 5, owner request) — COMPLETE
Owner: "add an extensive list of OT youtube channels, websites, CEU sites… include all things
helpful (link, names, titles, background, years, reviews, rating, rankings, prices, what they
are selling, biases, domain, setting…)". Built as **chapter 13 — the atlas's appendix**, in the
F49 index language (zero new kit): route `#/directory`, nav under Reference library, coord
"13 · REFERENCE", rows = `<details>` with plate numbers 13·n (stable per section), summary =
name + dot leader + free-tag, body = Who./Since./Costs & sells./Reputation./Bias watch. run-ins
+ external link. Method + caveat rendered as **FIG. 13·A** ("curated, not a census").
**Research provenance (this session):** 4 parallel agents (YouTube 53 ch · CEU ~45 · websites/
podcasts 61 · reputation/pricing/bias for the majors) + 1 adversarial verifier (31 URLs live-
checked, 3 dead links, 8 contradictions resolved — e.g. Great Seminars founder corrected to
Dr. Carole B. Lewis PT; AOTA dues updated to 2026 figures; CEU360→Colibri redirect; MedBridge/
Summit PE ownership + affiliate-review ecosystem documented). Raw files in session scratchpad.
- [x] index.html: nav item (i-link icon) + directory.js script tag (before rigor.js)
- [x] app.js: renderDirectory + route + ROUTE_COORD 13 + global-search entries (guarded)
- [x] sw.js: CORE += directory.js (CACHE ultimately at v16 with F51)
- [x] assets/js/data/directory.js (opus transcription): **148 entries** after cross-platform
      dedup — youtube 36 · ceu 38 · sites 23 · podcasts 21 · orgs 19 · exam 6 · community 5.
      node --check OK. Verifier corrections applied (AOTA 2026 dues, Great Seminars founder,
      CEU360→Colibri merge); honesty layer in `bias` (MedBridge/Brentwood + Summit/Avathon PE
      ownership, affiliate-code review ecosystem, PESI BBB record, vendor-as-reviewer CE);
      every price/rating "as of 2026-07"; dropped Apex Education (couldn't confirm it exists)
      and The Anonymous OT (domain now redirects to an unrelated site).
- [x] live verify: route renders (2657 nodes), CEU chip→38, search "medbridge"→7, details
      show Who/Since/Costs & sells/Reputation/Bias watch + external link, FIG. 13·A renders,
      0 console errors (see F51 sweep — both chapters verified together)
- [x] owner screenshots: directory top (light+dark), CEU section with MedBridge expanded
**STATUS: COMPLETE (2026-07-16).**

## 2026-07-16 — [F49] THE INDEX — de-kit the reference library (Fable 5, owner: "let claude design fix the design") — COMPLETE
Owner asked for an overall design critique + fix pass. Fresh-eyes sweep (all screenshots in
session transcript) found: hero/prose/F48-figure surfaces hold up; **the kit ration never
reached the reference library** — Conditions is 66 identical white rounded cards (tracked-mono
cat label, centered text, badge, "Open ↗"), Assessments is the same card grid ×58, Models the
same + green pill headers. No queue item owns these grids (F36 owns only the drawer). Also
found: **real header bug** — `.brand-text em` tagline only hides ≤600px, so at 601–999px it
wraps and the brand block (72px) overflows/clips the 64px topbar (measured via getBoundingClientRect).
**Design decision (Fable):** the library becomes THE INDEX — the way an atlas indexes its
plates. Per category: 2px top rule (matches `.fig`), run-in serif head + drawn-object icon +
count; each entry ONE ROW — mono plate number `07·n` (n = stable position within category;
pre-figures F36's `PLATE 07·n` drawer stamps), serif name, dot leader, evidence dot at the
right margin, one-line desc under. No boxes. Assessments: same rows as `<details>` (all card
detail moves into the disclosure body as run-in prose — nothing is lost, a11y-native).
- [x] styles.css: header fix (nowrap + hide tagline ≤999px) + `.idx-*` system
- [x] app.js: renderConditions draw() → index sections (plate numbers stable under filters)
- [x] app.js: renderAssessments draw() → details-index (Population/Notes/evidence/bias/sources
      all preserved in the disclosure body; summary line = what it measures)
- [x] sw.js CACHE v12→**v13**
**STATUS: COMPLETE (2026-07-16).**
**Evidence (actual tool output):**
```
12-route sweep after change: {home:172, foundations:337, pillars:236, models:226, reasoning:246,
  evidence:362, conditions:618, assessments:1577, videos:812, resources:313, clients:404,
  toolkit:170} — all render. Console: "No console logs."
Conditions: sections 6 / idx-rows 66 / old .itemcard count 0. Row click → drawer opens
  ("Stroke (CVA)"). Search "strok" → "1 condition", section shows "1 of 17", number stays 07·1
  (stable). Clear → 66 back.
Assessments: first <details> opens → Population./Notes. run-ins + ev-row + source chips present.
Header: brand block no longer clips at 601–999px (tagline hidden; was 72px in a 64px bar).
Screenshots: light+dark desktop (index w/ dot leaders, badges right), mobile 375px (number
  runs into name line, badge wraps, leaders hidden). Smooth-scroll false alarm during verify:
  scrollTop reads pre-animation value; behavior:'instant' confirms no scroll lock bug.
```
**Slop-test:** the library now reads as a book's index of plates — no boxes, no centered text,
no uniform card grid; unmistakably the atlas.
**Critique follow-ups logged (NOT done this session):** models page still card-kit (+ green
pill headers, truncated "…" desc) — fold into F35 or a F49b; toolkit screener = stack of white
checkbox cards with heavy solid unchecked boxes — F37's session should apply the ration; the 3
"More about…" accordion bars on foundations are borderline (interactive = legal) but read as
kit ×3 — candidate for F39's choreography pass.
Parallel this session: OT directory research fan-out COMPLETE (4 agents: 53 YouTube + ~45 CEU +
61 websites/podcasts + reputation/bias/pricing layer) + opus verification pass COMPLETE
(31 URLs WebFetch-checked, 3 dead links found, 8 contradictions resolved, 13 entries added,
AOTA dues corrected to 2026 figures, verdict "publish as curated, not exhaustive"). Research
files in session scratchpad → next: design + build the directory section (F50).

## 2026-07-09 (night) — [F48] FIGURE LANGUAGE — the anti-kit (Fable 5, owner: "tired of ai slop design") — COMPLETE
Second slop strike. Root cause finally named correctly: **the slop is the component KIT, not the
motifs** — rounded bordered cards, chips, icon-callouts, bullet grids at one rhythm everywhere;
even recent "de-slop" work (F47's bullet grid) was assembled from the same kit. The app's native
language is the BOOK's: numbered figures, hairline rules, run-in prose. Shipped on the surface
the owner was critiquing:
- [x] **FIG. 02·A "The three rehabilitation professions":** the three `card accent-teal` boxes
      are GONE → one `<figure class="fig">` bounded by a 2px top rule + hairline bottom, three
      columns separated by 1px rules (no boxes), each: drawn object (mug/shoe/**new i-obj-spoon**
      for SLP — feeding/swallowing), serif name, italic alias caption, run-in `Focus./Lens.`
      prose, `e.g.` run-in examples. Mobile: columns → hairline-separated rows.
- [x] **FIG. 02·B "Shared scope, drawn to scale":** the Venn joins the numbered figure system.
- [x] **Expansions de-bulleted:** the F47 six-block bullet grid → `.dp-prose` — six run-in
      labelled paragraphs ("Who they help. People of all ages…; …") flowing in 2 text columns
      with a column rule (1 col mobile). Zero `<li>` remain in the section.
- [x] **THE KIT RATION written into PLAN.md** (above the design bar): boxes rationed (must earn
      their border), bullets rationed (run-in prose/tables default), all new diagrams join the
      numbered-figure system with claim-making captions, one-rhythm pages = failure; F34/F35/F36/
      F39 executors apply it to every surface they touch.
- [x] sw.js CACHE v11→**v12**.
**Files changed:** `assets/js/app.js` (figure markup, prose expansion, FIG 02·B cap),
`index.html` (i-obj-spoon), `assets/css/styles.css` (.fig* system + .dp-prose; .dp-grid deleted),
`sw.js` (v12), PLAN.md (kit ration), PROGRESS.md.
**Evidence (actual tool output):**
```
caches → ["ot-atlas-v12"]. Figures: ["FIG. 02·A","FIG. 02·B"]; 3 fig-cols; objects
  [i-obj-mug, i-obj-shoe, i-obj-spoon]; zero .card inside the figure; column rule 1px.
Expansion: 6 paragraphs, 0 bullets, column-count 2, run-ins ("Who they help." …).
DOM got LIGHTER: foundations 432→337 (−95 nodes — de-kitting is measurable); all 11 other
  routes unchanged. Console: "No console logs."
Screenshot (channel recovered on the fresh preview instance): FIG. 02·A three-column spread +
  open OT expansion — textbook spread, no boxes, no bullets.
```
**Slop-test:** the comparison now reads as a book plate with specimen drawings. The remaining
kit-heavy surfaces (condition/assessment grids, models cards, callouts) are queue items and now
governed by the ration.
**Exact next queue item:** 16 [F34] (Opus, high — apply the kit ration wherever it touches).
CACHE now v12. F46/F47 content still pending clinician sign-off.

## 2026-07-09 (evening) — [F47] discipline profiles + "learn more" expansions (Fable 5, owner request) — COMPLETE
Owner: "still missing key info for each practice; make a better and accurate overview for each
and enable an expansion option to learn so much more." Shipped:
- [x] **Research + accuracy gate (2-agent workflow):** profiles gathered from WFOT/AOTA/RCOT,
      World Physiotherapy/APTA/CSP, ASHA/RCSLT, NHS/BLS; then an adversarial checker enforced
      (1) internationally-safe wording — NO US-degree claims stated as universal (each training
      list says "varies by country" and names US/UK/CA-AU separately), (2) consistency with the
      F46 overlap Venn (no scope re-grabs), (3) "when to see one" items that guide rather than
      diagnose (e.g. voice changes item explicitly adds "worth a doctor's check too").
- [x] **Cards improved:** each discipline card gains an `alias` line — the name-variation fact
      international readers actually need (physiotherapy vs physical therapy; SLP/SLT/speech
      pathologist by country; OT uniform worldwide).
- [x] **Expansions:** three full-width "More about …" accordions (existing accordion component +
      wireAccordions now called in renderFoundations) between the cards and the Venn. Each opens
      a responsive 3/2/1-column grid of six labelled blocks: Who they help · Where they work ·
      When you might see one · Specialty areas · The wider team · Training & regulation
      (~27 vetted items per discipline). New `.dp-grid/.dp-label/.dp-block` CSS; teal ::marker.
- [x] Data in `foundations.js` `rows[].alias/more` — **PENDING CLINICIAN SIGN-OFF (F27 lane)**,
      same flag block as the F46 overlaps.
- [x] sw.js CACHE v10→**v11**.
**Files changed:** `assets/js/data/foundations.js`, `assets/js/app.js` (card alias + accordions +
wireAccordions call), `assets/css/styles.css` (.dp-*), `sw.js` (v11), PLAN.md, PROGRESS.md.
**Evidence (actual tool output):**
```
caches → ["ot-atlas-v11"]. Accordion titles: ["More about occupational therapy", "More about
  physical therapy", "More about speech-language pathology"]. Aliases render on cards (OT
  "same title worldwide", PT "physiotherapy in most countries…", SLP three-title line).
PT expansion: aria-expanded true, body.open true, 6 blocks ["Who they help","Where they work",
  "When you might see one","Specialty areas","The wider team","Training & regulation"], 28 <li>,
  first when-item "Pain or stiffness limits your everyday movement"; collapse restores
  aria-expanded=false + removes .open. dp-grid responsive (2-col at this width; 3/2/1 by CSS).
Route sweep: foundations 264→432 (+168 = 3 accordions × ~56 nodes); ALL 11 other routes
  unchanged. Console: "No console logs."
```
**Environment note (honest):** the preview's screenshot channel desynced from the DOM mid-session
(captures stopped matching measured layout after a focus-scroll wedge; earlier F45/F46 screenshots
were fine). F47 is verified by the structural/behavioral evidence above; take the visual
spot-check screenshot at the START of the next session (fresh preview), or look directly:
Foundations → OT vs PT vs SLP → "More about …". Component reuses the app's existing accordion
styles (visually known-good everywhere else).
**Open:** F47 content on the F27 sign-off checklist (with F46). **Exact next queue item:**
16 [F34] (Opus, high). CACHE now v11.

## 2026-07-09 (later) — [F46] OT/PT/SLP comparison: overlap Venn (Fable 5, owner request) — COMPLETE
Owner: "therapy comparisons should also show the overlaps." The foundations OT-vs-PT-vs-SLP
section only showed the three distinct cores; the real-world confusion lives in the overlaps.
- [x] **Content (research-grounded):** ran a 3-agent workflow — 2 researchers (AOTA/APTA/ASHA
      scope docs, BLS/MedlinePlus/NINDS/CDC .gov sources, peer-reviewed interprofessional
      literature) + an adversarial clinical-accuracy checker. The checker caught and fixed real
      landmines before anything shipped: dysphagia ownership is CONTESTED between ASHA and AOTA
      (→ moved to OT∩SLP as "roles vary by setting", never single-owner); equipment/wheelchair
      seating → OT∩PT shared; "manual therapy PT-only" softened; US-only degree claims dropped;
      PT∩SLP explicitly framed as "co-treatment, not shared scope". Final items: max 4/zone,
      ≤8 words, plain language. Full citations in the workflow output
      (task wrnr1lys5; sources incl. asha.org/policy/sp2016-00343, AOTA Scope of Practice +
      functional-cognition paper, apta.org scope, MedlinePlus/NINDS/CDC, ASHA Perspectives 2020
      "Whose Job Is It?").
- [x] **Data:** `foundations.js` `vsOthers.overlaps` (intro, 4 zones × 4 items, caveat) — marked
      in-file **PENDING CLINICIAN SIGN-OFF (F27 lane)**.
- [x] **Design:** "Where they overlap" block after the three discipline cards — a wobbly-line
      three-circle Venn in the atlas voice (OT teal / PT plum / SLP ochre — sage avoided per the
      F35 rule; low-opacity fills compound in the lens zones; labels in `-deep` tokens),
      `aria-hidden` decorative; the CONTENT lives in the accessible `.venn-zones` list beside it
      (zone name + paired colour dots + items), so nothing is colour-/diagram-only. Caveat line
      about jurisdiction under it; the existing "lens" note callout kept.
- [x] sw.js CACHE v8→**v9**.
**Files changed:** `assets/js/data/foundations.js` (overlaps data + review flag),
`assets/js/app.js` (renderFoundations block), `assets/css/styles.css` (.venn*/.vz*), `sw.js` (v9),
PLAN.md, PROGRESS.md.
**Evidence (actual tool output):**
```
caches → ["ot-atlas-v9"]. Foundations: svg present, 3 circles, labels [OT, PT, SLP], 4 zones
  ["OT + PT","OT + SLP","PT + SLP","All three"], first zone items render, caveat shown,
  svg aria-hidden=true.
AA (light, on page bg): OT label 8.17 · PT 8.5 · SLP 5.48 · zone headings 13.94 · items 6.46
  (dark uses the F17-audited light-on-dark -deep tokens; dark screenshot clearly legible).
Route sweep: foundations 236→264 (+28 = h3 + intro + venn svg[8] + zones[17] + caveat — exact);
  ALL 11 other routes unchanged (home 172 … toolkit 170).
Mobile 375: venn-wrap stacked, venn 340px centred, no horizontal overflow, zone list intact.
Console: "No console logs." Screenshots: light + dark Venn with zone list (in chat, per the
  present-choices-as-inline-screenshots memory).
```
**Slop-test:** a hand-wobbled scope-of-practice Venn grounded in contested-boundary honesty
("roles vary by setting") is pedagogy no template ships.
**Open:** the 16 zone items need clinician sign-off (added to the F27 checklist). **Exact next
queue item:** 16 [F34] (Opus, high). CACHE now v9.

**Amendment (same day, owner correction): PROPORTIONAL geometry.** Owner: "this is not accurately
representing what overlaps, PT has very little overlap with SLP" — correct, and the research
itself had said PT∩SLP is the thinnest zone; the first drawing used three equal overlaps anyway.
Redrawn so the SHAPE carries the data: OT (the bridge profession) overlaps deeply with both;
PT and SLP barely touch; the triple zone is a small honest sliver. Intro copy updated to say the
overlaps are drawn to match ("OT shares real scope with both PT and SLP; PT and SLP mostly meet
through the person they both treat"). sw.js CACHE v9→**v10**.
Evidence: measured lens widths from live path bboxes — OT∩PT 99 · OT∩SLP 99 · **PT∩SLP 10**
(≈10:1); foundations node count unchanged at 264 (attribute/text-only edit); all other routes
untouched; console "No console logs."; light screenshot shows the new geometry (side-by-side
venn + zone list at wide viewport).

## 2026-07-09 — [F45] first-visit welcome redesign (Fable 5, owner critique) — COMPLETE
Owner screenshot + verdict on the F1 welcome dialog: "boring, not easy — do better design and
faster way to what people need." Diagnosis: twin identical cards (the uniform-card slop tell on
the app's FIRST screen) + a reading gate (headline + meta-paragraph + identity quiz before any
content). Redesign — need-first, one tap = mode + destination:
- [x] **Copy:** the meta-paragraph is GONE (its reassurance now lives as a one-line footnote,
      "Switch any time: Public / Clinical, top of the page"). Choices are phrased as the visitor's
      own question, not an identity: "Could OT help me or someone I love?" / "I'm a student or
      practitioner". Each button states its destination as scannable fragments ("Plain language ·
      what to expect · a 2-minute check" / "Frameworks · evidence · 58 assessments · 66
      conditions" — live counts from data).
- [x] **Form:** twin cards → two full-width tactile rows with drawn objects (mug for the help
      path; NEW `i-obj-pencil` — 4th everyday object — for the study path), sliding arrows, faint
      contour rings in the dialog corner (`.w-contours`). Skip + footnote share one quiet row.
- [x] **Behavior preserved exactly:** focus trap, Esc = dismiss without forcing a mode,
      first-button autofocus, deep-link suppression, never-block-startup try/catch, public →
      #/clients, clinical → home (the contents index), scroll lock/unlock. Handler code untouched
      (same classes/data attributes).
- [x] sw.js CACHE v7→**v8**.
**Files changed:** `assets/js/app.js` (welcome template), `index.html` (i-obj-pencil symbol),
`assets/css/styles.css` (welcome block rewrite + .w-contours/.w-obj/.w-arrow/.welcome-foot),
`sw.js` (v8), PLAN.md, PROGRESS.md.
**Evidence (actual tool output):**
```
caches.keys() → ["ot-atlas-v8"]. Fresh visitor (ot-mode+ot-welcomed cleared, reload): dialog
shows; autofocus on first button (true); objects [#i-obj-mug, #i-obj-pencil]; 3 contour circles.
FLOW public: click → dialog gone, ot-mode "public", hash "#/clients", ot-welcomed "1", body
  position restored (scroll unlocked).
FLOW clinical: fresh reload → click → dialog gone, ot-mode "clinical", hash "#/home".
FLOW Esc: fresh reload → Escape → dialog gone, ot-mode still null (no mode forced), welcomed set,
  body unlocked.
AA (alpha-composited): DARK strong 15.42 · micro 9.84 · note 5.0 · skip 5.0; LIGHT strong 13.94 ·
  micro 6.46 · note 5.37 · skip 5.37 — all ≥5:1.
Mobile 375×812 (light): full dialog visible without scrolling — both buttons, skip, footnote;
  objects 38px; text wraps cleanly (screenshot). Desktop dark screenshot: mug w/ coral steam +
  pencil w/ coral lead + corner contours (screenshot).
Console after all reloads/flows: "No console logs."
```
**Slop-test:** a steaming mug asking "Could OT help me or someone I love?" is not a template
pattern; the dialog now belongs to the same drawn-everyday voice as the hero.
**Issues found:** none. **Exact next queue item:** 16 [F34] (Opus, high). CACHE now v8.
**Still pending owner:** style verdict on the 4 drawn objects → gates the F44 batch (~6 more).

## 2026-07-06 (evening) — item 26 [F44] "the everyday, drawn" — PHASE 1 (Fable 5) — COMPLETE
Owner said "keep going" after F43 → the Fable-gated art item's phase 1 (draw + place 2–3, owner
look before batching the rest).
- [x] **3 spot illustrations** as sprite symbols (`i-obj-mug`, `i-obj-shoe`, `i-obj-key` — 64-box,
      round-cap line art in the icon system's language; coral accents (steam, trailing lace, key
      hole) are INLINE-styled so they pierce the `<use>` shadow boundary, which CSS descendant
      selectors cannot).
- [x] **Hero terrain is now OF the everyday:** the three abstract crosshair markers in the contour
      field are replaced by the mug (peak A, inside the coral ring), the shoe (peak B) and the key
      (upper coordinate) — the map labels (66 CONDITIONS / 58 ASSESSMENTS / 66 TERMS) now annotate
      real objects like specimens. Stroke props inherit through `<use>` (`.hf-obj`: 2.3 width,
      .62 opacity); first placement rendered too small (24–31px) → sizes bumped to 64/68/56 units.
- [x] **First empty state:** the search "No matches" state now opens with the drawn mug
      (`.empty-obj`, 46px, teal) above the copy; `role="status"` untouched.
- [x] sw.js CACHE v5→v6→**v7** (two bumps: the object-size iteration landed after v6 was cached).
**Files changed:** `index.html` (3 symbols), `assets/js/app.js` (hero-field uses ×3, search-empty
mug), `assets/css/styles.css` (`.hf-obj`, `.empty-obj`; `.hf-cross` rule removed), `sw.js` (v7),
PLAN.md, PROGRESS.md.
**Evidence:** caches.keys() → ["ot-atlas-v7"]; 3 symbols defined; hf-cross count 0; objects render
31/41/24px → after bump legible at width 1440 (screenshots light + dark — dark reads as a night
chart with a steaming mug in the accent ring); search "qqqq" → empty state with 46px mug,
role=status; 12-route sweep IDENTICAL to the F43 baseline incl. home 172 (3 uses replaced 3 paths,
net 0; the empty-state svg lives in the overlay, not #main); console "No console logs."
**Slop-test:** the hero decoration is no longer abstract-technical — a steaming mug, a shoe and a
key ARE the subject matter of OT. No template ships that.
**Next for F44:** owner look at the 3 objects' style → then batch the remaining ~7 (kettle, spoon,
pencil, plant, door handle, sock aid, phone) + deployments (chapter openers, F37 empty states,
F43 primary pathway, F36 drawer plates). **Exact next queue item:** 16 [F34] (Opus, high). CACHE v7.

## 2026-07-06 (later still) — item 25 [F43] de-slop composition pass (Fable 5) — COMPLETE
Owner chose "do F43 now." Shipped in the same session as the critique:
- [x] **Table of Plates.** The home 9-card "Explore the atlas" grid is GONE — replaced by an
      11-row contents index (`.plates`/`.plate-row`): real ROUTE_COORD chapter numbers (02–12,
      coral mono), Fraunces titles, one-line descriptions, dotted leaders to chapter icons,
      hairline separators. Structural (numbers match the coordinate stamps on the pages they
      open), not decorative. Rows are `data-go` buttons (same wireGo path as before).
- [x] **Pathway hierarchy.** The 3 equal pathway cards → ONE primary tinted path ("For clients &
      families", teal-tint band, 34px heart, sliding arrow) + two quiet `.pathway-mini` hairline
      rows. The public path now visibly matters most (matches the audience priority in the
      project profile).
- [x] **Stat band → `.atlas-legend`.** The 6-cell uniform grid became a single hairline inline
      strip (serif numbers, sans labels). Third uniform grid removed from home.
- [x] **Evidence grid-break.** Coverage panel → `.coverage-grid` (1.45fr/1fr/1fr, first card
      teal-tinted) — measured columns 424/292/292px.
- [x] **Tracked-mono demotion (6 roles).** toc-label, card-meta, table thead, out-label, ev-srch,
      filter-lead: `text-transform: uppercase` removed, tracking reduced to .03–.04em. The
      cartographic voice (eyebrow / nav-eyebrow / coord) keeps uppercase+tracking — ONE role now.
      (Drawer h3 deliberately left for F36's specimen plate; tiny ev-status stamps kept.)
- [x] **Surface consolidation.** `--radius-xs: 6px` token added; 24 radius literals → tokens
      (8/10/11/12px → --radius-sm ×10, 5/6px → --radius-xs ×5, 100px pills → 999px ×9); the 4th
      hard-coded shadow (back-to-top) → var(--shadow-2). Non-token radii remaining: only the two
      intentional 4px micro-radii (focus ring, coord chip).
- [x] sw.js CACHE v4 → **v5**.

**Files changed:** `assets/js/app.js` (renderHome composition, coverage-grid class), 
`assets/css/styles.css` (plates/pathway-primary/minis/legend/coverage components; 6 demotions;
radius/shadow consolidation; stat-band rules deleted), `sw.js` (v5), PLAN.md, PROGRESS.md.

**Evidence (actual tool output):**
```
caches.keys() → ["ot-atlas-v5"] after double reload.
Plates: 11 rows, numbers ["02".."12"] matching ROUTE_COORD; click plate 07 → #/conditions renders.
Old surfaces gone: #main .feature-card 0 (models page unaffected — still uses them), .stat-band
  false, old .pathway 0. Primary + 2 minis present; legend 6 items.
AA (alpha-composited) LIGHT: plate-no 4.76, plate-title 13.94, plate-desc 4.61, legend b 8.17,
  legend text 4.61, pathway-primary h2 13.2 / p 6.11 (on teal-tint), mini strong 13.94 / text 6.46,
  coverage first-card text 6.11 on rgb(220,235,230). DARK: plate-no 9.16, plate-title 15.42,
  plate-desc 5.84, legend b 10.77/5.84, pp h2 11.91 / p 7.6. Zero fails, min 4.61.
Demotion live: table.data thead th text-transform "none", renders "Area" (mixed case).
Coverage asymmetry: grid-template-columns 424.06px / 292.47px / 292.47px, first card tinted.
Mobile 375×812 (public): hero subline + CTAs still above fold (F6 intact); no horizontal
  overflow; plate descs hidden; rows 57px; minis stacked single-column.
Route sweep: 11 routes IDENTICAL to the morning baseline (foundations 236 … toolkit 170);
  home 132 → 172 (+40 = new composition net of removed grids — the ONLY changed page).
Console (reloads, plate navigation, theme flips, mobile pass): "No console logs."
Screenshots: light + dark Table of Plates (contents page, not cards), light hero with primary
  pathway band. (Headless scroll clamp worked around via #main translate — .page transform is
  animation-pinned; documented for future sessions.)
```
**Slop-test answer (required by the design bar):** the home page now reads as a book's contents —
numbered chapters, dotted leaders, one visually-primary pathway, an inline legend. No uniform card
grid remains on it. Could it be any wellness startup? The contents index + live chapter
coordinates are structural to THIS atlas; the remaining generic surfaces are the condition/
assessment card grids (F36/F39 territory) and the abstract contour art (F44 makes it
product-specific).
**Issues found:** none open. **Deferred honestly:** clients bleed-band (→ F35 session),
drawer-h3 demotion (→ F36). F40 retargeted to `.atlas-legend b` (stat band no longer exists).
**Exact next item:** Phase 4 item 16 [F34] type-scale consolidation (Opus, high). CACHE now v5.

## 2026-07-06 (later) — Owner critique: "nice but new-slop" → plan amended (Fable 5) — COMPLETE
Owner reviewed the shipped foundations: "looks a bit ai sloppy (nice but the new slop style)."
Assessment: the critique is CORRECT and diagnosable — the tracked-mono + editorial-serif +
abstract-technical-decoration language is itself the 2026 second-gen template look, and the real
tells are compositional: three stacked uniform-card grids on home, perfect symmetry on every page,
tracked-mono uppercase serving ~8 label roles, decoration (contours) that isn't product-specific.
What ISN'T slop: the evidence-rigor layer, dual-mode, real data cross-links, the wonk cut.
**Actions:** added a standing OWNER DESIGN BAR to PLAN.md Phase 4 (every item must remove ≥1 slop
tell + pass the "could this be any wellness startup?" screenshot test); added **item 25 [F43]
de-slop composition pass** (Table-of-Plates contents index replacing the 9-card home grid, pathway
hierarchy, one grid-breaker per page, radius/pill/shadow consolidation, tracked-mono demoted to one
role) — queued FIRST since it reshapes surfaces other items build on; added **item 26 [F44] "the
everyday, drawn"** (product-specific spot-illustration layer: the brand thesis made visible —
gated Fable art session, shareable with F41). Queue resequenced. No code changed this entry.
**Exact next item:** 25 [F43] (Fable) — or owner may reorder.

## 2026-07-06 — AWARD PUSH kickoff: direction + Phase 4 foundations (Fable 5) — COMPLETE
Owner directive: "improve the design elements and features so we can win design awards — decide
what you can fix and write a detailed plan for Opus." Process: 5-agent audit/research workflow
(CSS-system inventory, component-craft audit, award-pattern research, Fraunces-axes facts,
View-Transitions/scroll-animation support facts — 278k tokens, all findings cited) + my own
juror-eyes screenshot pass → 3 directions proposed → **owner approved "The Honest Atlas"**
(cartographic-editorial identity) → foundations implemented + verified → Phase 4 plan written.

**Key research facts recorded for later sessions (verified 2026-07-06, citations in the workflow
output):** Fraunces on GF exposes ital/opsz(9–144)/wght(100–900)/SOFT(0–100)/WONK(0–1); WONK
auto-substitutes only above opsz 18 (display-only by design); pinned custom axes are ≈free,
full SOFT+WONK ranges ≈+53KB/style (measured); never put "wght"/"opsz" in font-variation-settings.
Same-document View Transitions = Baseline all engines (Firefox 144+, plain-callback signature
only). CSS scroll-driven animations NOT in stable Firefox (≈v155, Sept 2026) → @supports-gate +
never opacity:0 in base styles. Award path for health/education content: editorial craft +
pedagogical clarity + ONE structural signature artifact; realistic targets Awwwards HM/Typography,
CSSDA, Webby Health/Education, a11y programs (dual-track).

**Shipped this session (Fable lane — judgment + router):**
- [x] **F30 — Fraunces display cut + motion tokens.** Font URL now loads SOFT+WONK ranges
      (canonical axis order `ital,opsz,wght,SOFT,WONK`); `.hero-title`/`.page-title` get
      `font-variation-settings: "SOFT" var(--display-soft), "WONK" 1` (hero 42, titles 24) —
      display tier only, body/cards untouched (WONK's opsz>18 gate). Motion tokens `--dur-1/2/3`.
- [x] **F31 — chapter coordinates.** `ROUTE_COORD` map + `stampCoord()` injected in `route()`:
      every page's eyebrow carries its atlas coordinate ("06 · THE FRAMEWORK"), `aria-hidden`,
      boxed mono chip; hidden ≤600px (mobile fold economy — F35 will design the mobile variant).
- [x] **F32 — contour-field hero (+ F6 absorbed).** Hand-drawn topographic SVG (9 rings, 2 peaks,
      coral accent ring, crosshairs, dotted leaders) fills the previously-empty right half, with
      coordinate-pinned LIVE stats (66 CONDITIONS / 58 ASSESSMENTS / 66 PLAIN-LANGUAGE TERMS from
      the data at render time); `aria-hidden`, pointer-events none, hidden ≤860px, drift animation
      (46s/38s alternate) that the global PRM block freezes. **F6:** public mode now renders the
      plain subline "Find out whether occupational therapy could help you or your family — and how
      to get it." INSTEAD of the long lede; clinical lede byte-unchanged.
- [x] **F33 — View-Transition route choreography.** `route()` wraps its render in
      `document.startViewTransition` (plain callback — Firefox-safe), double-gated (JS
      `prefersReducedMotion()` skip + CSS `::view-transition-*` animation:none block); `#main` has
      its own `view-transition-name` so topbar/sidenav never flash; VT is pure crossfade — `.page`
      fade-up supplies the rise (no double movement).
- [x] **Craft fixes:** sidenav scrollbar de-slabbed (thin + line-token tint — it was a heavy dark
      bar in every screenshot); brand `::selection`; drawer close ✕ glyph → `icn("i-cross")`.
- [x] **sw.js CACHE v2→v3→v4** (v4 final after a late mobile-coord CSS fix — the footgun caught
      live: the v3 cache had already stored the pre-fix stylesheet).

**Files changed:** `index.html` (font URL), `assets/css/styles.css` (display cut, motion tokens,
coord chip + ≤600px rule, hero-field + hero-sub, VT block, scrollbar/selection), `assets/js/app.js`
(renderHome hero recomposition + F6 branch, ROUTE_COORD/stampCoord, route() VT wrapper, drawer
close icon), `sw.js` (v4), PLAN.md (Phase 4 section + status blocks), PROGRESS.md.

**Evidence (actual tool output):**
```
SW: caches.keys() → ["ot-atlas-v4"] after double reload; new assets confirmed live.
F30: getComputedStyle(.hero-title).fontVariationSettings → '"SOFT" 42, "WONK" 1'; hero 59.99px
  (opsz 60 > 18 → wonk active); font link contains SOFT,WONK; document.fonts Fraunces loaded.
F31: all 12 routes stamped correctly — home "01 · ORIENTATION" … evidence "06 · THE FRAMEWORK" …
  toolkit "12 · GET HELP & DO" (full map in eval output). Coord contrast 8.17:1 light / 10.77:1
  dark (AA+). Hidden at 375px (display:none verified).
F32/F6: hero-field present, 9 rings, labels ["66 CONDITIONS","58 ASSESSMENTS","66 PLAIN-LANGUAGE
  TERMS"]; field display:none at 375px; public mode 375×812: hero-sub bottom 339px < 812 fold,
  CTAs top 365px (previously the 8-line lede pushed actions below the fold); clinical mode: lede
  present, unchanged text, no subline. hero-sub contrast 13.94:1 light / 15.42:1 dark.
  body.scrollWidth == innerWidth at 375 (no overflow).
F33: document.startViewTransition true; computed view-transition-name on #main = "main-content";
  12-route sweep navigated through the VT path (12+ transitions) with console clean.
Drawer: close button now contains svg.icn use → "#i-cross"; open/close + share intact.
Route sweep (#main elements, clinical/light): home 132, foundations 236, pillars 236, models 226,
  reasoning 246, evidence 362, conditions 642, assessments 1190, videos 812, resources 313,
  clients 404, toolkit 170. Reconciliation vs post-F16 baseline: +1/page = the .coord span;
  home +21 = coord (+1) + hero-field SVG (20 elements: svg + 2 g + 9 ring + 3 cross + 2 leader +
  3 text). Exact.
Console (after reloads, 12+ VT navigations, drawer open/close, theme flips, mobile pass):
  "No console logs." — zero errors/warnings.
Screenshots: desktop light hero (contour field + coord + wonky display cut), desktop dark
  ("night chart" — phosphor rings, coral accent), mobile 375 public (title → plain subline →
  both CTAs above fold), evidence page with coord stamp.
```
**Honest caveats:** (1) Font payload grew by ≈+53KB/style (SOFT/WONK loaded as RANGES for runtime
control while the voice settles); F42a pins the axes once F34/F35 finalize values — measured
pinning cost ≈0. (2) The drift animation + wonk cannot be visually diffed in this headless
preview beyond computed styles + screenshots — both verified by computed values. (3) VT tested in
the Chromium preview; Firefox/Safari behavior is per the cited Baseline docs, not locally tested.
(4) Hero stagger delays shifted by one child (field is first child) — cosmetic, intended.

**Issues found:** the v3→v4 cache re-bump (footgun self-caught); mobile eyebrow wrap cost a hero
line → coord hidden ≤600px this session, proper mobile variant specced in F35.

**Open questions:** none for this session. Phase 4 queue + gates are in PLAN.md.

**Plan quality gate:** the Phase 4 section was adversarially reviewed by a zero-context reviewer
agent that grep-verified every factual claim against the code. It found 4 blocking issues — all
fixed: (16) delta tolerances now match the authoritative buckets (+ .7rem micro-label floor with
the rem-root arithmetic corrected), (18) verify trio corrected to stroke/asd/dementia (burns is
neuro; autism's id is asd) + 5-step strength dial + explicit 6-category→tint map incl. spec→neutral,
(19) data-failure simulation replaced with an executable recipe (mv file + SW unregister — devtools
blocking doesn't exist headless and the cache-first SW defeats a bare rename), (24a) pinned font
URL now keeps BOTH ital tuples (dropping italics would have silently regressed every title).
A second scoped review confirmed all fixes + arithmetic: **APPROVED**.

**Exact next item:** PLAN.md Phase 4 **item 16 [F34] type-scale + tracking consolidation**
(Opus, high). Use the universal prompt template; remember the CACHE bump (now v4).

## 2026-07-05 — item 14 [F16] replace remaining decorative emoji with the SVG icon set (Opus 4.8) — COMPLETE
Finishes the icon-consistency job started by F11/F12: every remaining decorative emoji/abstract
glyph in the app's render output is now a sprite icon. Sub-steps:
- [x] index.html: added 17 new sprite symbols (i-flask, i-search, i-chat, i-eye, i-scale, i-home,
      i-info, i-bulb, i-people, i-pen, i-target, i-help, i-warn, i-check, i-cross, i-dot, i-link) —
      same 24×24 / 1.8px-stroke / currentColor style as the existing 21.
- [x] reasoning.js: 9 `icon:` emoji → sprite keys (🔬→i-flask, 🧩→i-search, ⚙️→i-clipboard, 🤝→i-chat,
      📖→i-book, 🔮→i-eye, 🧭→i-compass, ⚖️→i-scale, 🪞→i-loop).
- [x] videos.js: 13 `icon:` emoji/glyphs → sprite keys (incl. the abstract ◆❖▤⬡⟲⊞ from F12 that
      were still on the bucket headings: intro→i-compass, history→i-book, framework→i-clipboard,
      models→i-hex, reasoning→i-loop, ebp→i-chart, adl→i-home, stroke→i-brain, peds→i-child,
      hand→i-hand, mh→i-cloud, geri→i-leaf, students→i-grad).
- [x] app.js (24 edits): reasoning-card icon render (`icn(t.icon)`), video bucket heading
      (`icn(b.icon)`), 11 callout `.ico` spans (ℹ️💡🤝🖊️🧑‍⚕️🎯🧭❓⚖️⚠️⚠️ → icn + colour class),
      goal-quality headers ✓/✗ → i-check/i-cross, goal-writer per-check ✅/⚠️ → i-check/i-warn,
      clients "Questions to ask" 💬 → i-chat, energy planner 🔴🟡🟢 (labels + output) → coloured
      i-dot, video FALLBACK_THUMB ▷ → inline brand play mark, external-resource thumb 🔗 → i-link.
- [x] styles.css: 4 icon colour utilities (`.c-teal/.c-clay/.c-sage/.c-ochre` → AA-safe `-deep`
      tokens) + contextual sizing (`.reason-ico`, `.section-head .icn`, `.callout .ico .icn`,
      `.video-thumb .icn`, `.icn.qico`, `.icn.pdot`).
- [x] sw.js: CACHE `ot-atlas-v1` → `ot-atlas-v2` (mandatory bump — assets edited).
- [x] Static checks: reasoning.js + videos.js icon fields 100% emoji-free; every `icn()`/data
      `icon:` key resolves to a defined sprite symbol (0 missing); app.js residual glyphs = only the
      documented KEEP set (evidence ✓/⚠ status labels, copy-confirmation ✓, weak-goals list-item ✗
      bullet — all monochrome text dingbats, not platform-variant colour emoji; out of F16 scope).
- [x] Preview verify (this session's own server, port 56751 — fresh origin, so no stale SW from
      other chats; v2 SW registered clean): every icon surface renders sprite icons; 0 visible
      zero-size svg.icn on all 12 routes; 12-route sweep reconciled; 0 console errors; screenshots
      both themes.

**Files changed:** `index.html` (17 new `<symbol>`s), `assets/js/data/reasoning.js` (9 icon keys),
`assets/js/data/videos.js` (13 icon keys), `assets/js/app.js` (24 render/inline edits),
`assets/css/styles.css` (4 colour utilities + 6 sizing rules), `sw.js` (CACHE v1→v2), PLAN.md, PROGRESS.md.

**Scope decision (documented, honest):** the plan targets the "LAST **decorative** emoji" — i.e. the
platform-variant colour emoji + abstract glyphs F11/F12 left behind. Deliberately KEPT (all
monochrome text dingbats that render identically cross-platform, NOT colour emoji, and out of the
enumerated F16 list): the evidence "✓ sourced / ⚠ unverified" status micro-labels in condition cards
(app.js 311/349/356 — tied to the rigor/evidence display, which the protocol guards), the
copy-button "Copied ✓ / Link copied ✓" text confirmations (873/1312), the Weak-goals **list-item**
✗ bullets (the card **header** ✗ IS now `i-cross`; the 3 list bullets match the app's text-marker
convention — parallel to the CSS `ul.ticks ✓` / `ul.arrows →` markers, left as-is), and rigor.js
country **flags** (off-limits file, informative). No `rigor.js` ratings/clinical text touched.

**Evidence (actual tool output):**
```
Static (python scan): reasoning.js + videos.js icon fields = 100% sprite keys, 0 emoji.
  reasoning: [i-flask,i-search,i-clipboard,i-chat,i-book,i-eye,i-compass,i-scale,i-loop]
  videos:    [i-compass,i-book,i-clipboard,i-hex,i-loop,i-chart,i-home,i-brain,i-child,i-hand,i-cloud,i-leaf,i-grad]
  All icn()/data icon: keys resolve to a defined <symbol> — MISSING (used, undefined) = none.
  app.js residual glyphs >=U+2000 = ONLY the documented keep-set (evidence ✓/⚠ 311/349/356,
    copy ✓ 873/1312, weak-goals list ✗ 606) — 0 decorative colour emoji remain.
Preview (port 56751):
  reasoning: 9 mode cards → use=[#i-flask,#i-search,#i-clipboard,#i-chat,#i-book,#i-eye,#i-compass,
    #i-scale,#i-loop]; goal headers → #i-check / #i-cross; 3 callouts → #i-pen,#i-steth,#i-target.
  home: disclaimer callout → #i-info. foundations: callouts → #i-bulb,#i-people.
  evidence: callouts → #i-compass,#i-help,#i-scale,#i-warn.
  videos: 13 bucket headings → #i-compass,#i-book,#i-clipboard,#i-hex,#i-loop,#i-chart,#i-home,
    #i-brain,#i-child,#i-hand,#i-cloud,#i-leaf,#i-grad; 10 external-resource thumbs → #i-link.
  clients: "Questions to ask" → 5× #i-chat; disclaimer callout → #i-warn.
  toolkit energy: label dots → 3× #i-dot, computed colours clay-deep rgb(180,68,31)=high /
    ochre-deep rgb(126,88,16)=important / sage-deep rgb(63,97,82)=low (traffic-light kept, AA-safe);
    output headings → 3× #i-dot. goal-writer per-check indicators → #i-check / #i-warn (no emoji in output).
  Zero-size icons (VISIBLE, hidden tab panels excluded): 0 on every one of the 12 routes.
    (4 apparent zero-size on toolkit were goal-writer icons in the .hide inactive tab panel —
     display:none → 0 rect; they render correctly when their tab is active.)
  12-route node sweep (#main *): home 111, foundations 235, pillars 235, models 225, reasoning 245,
    evidence 361, conditions 641, assessments 1189, videos 811, resources 312, clients 403, toolkit 169.
    Every delta vs the old baseline reconciles: THIS session's icons (home +2, foundations +4,
    reasoning +28, evidence +8, videos +36, clients +12, toolkit +6) + prior 2026-07-03 features
    (F18 TOC, coverage panel, F26 glossary, +1 pageFoot "reviewed" line/page). The 5 render
    functions I never touched (pillars/models/conditions/assessments/resources) changed by 0 from
    this session — their deltas are entirely prior-feature (e.g. conditions/models/assessments +1 = pageFoot).
  Console (preview_console_logs, all levels, after 12-route sweep + drawer/tab/tool interactions,
    both themes): "No console logs." — zero errors/warnings.
  Screenshots: dark reasoning (i-flask/i-search/i-clipboard mode icons), light videos (i-compass
    bucket heading + F13 play buttons), light toolkit energy (red/amber/green dots), light evidence
    (i-compass warn callout) — all clean, on-brand, both themes, no emoji.
```
**Issues found:** none. **Open questions:** none.

**Exact next item:** PLAN.md **item 13 — [F6] mode-aware functional hero subline in `renderHome`**
(`assets/js/app.js`) — **Sonnet, small/medium** — add one plain "what is this + how to get OT"
subline under the hero title (public copy vs keep-current clinical lede); verify it sits above the
fold at 375×812. Then only input-gated items remain (F19/F27 clinician sign-off, F28 og:image PNG).
⚠️ Reminder: the SW is cache-first — any asset edit MUST bump `sw.js` CACHE (now `ot-atlas-v2` → v3).

## 2026-07-03 — F10 PWA: manifest + versioned service worker (Opus 4.8) — COMPLETE
The last major code item; HIGH RISK, done carefully.
- [x] NEW `manifest.json` (name/short_name "OT Atlas", standalone, `start_url`/`scope` "./",
      theme+bg `#EAEEF4`, categories education/medical/reference, one SVG icon `any maskable`).
- [x] NEW `assets/icon.svg` (open-book mark on a teal rounded square, coral spine; maskable-safe
      padding).
- [x] NEW `sw.js` — `CACHE = "ot-atlas-v1"`, precaches 15 core assets (index.html, css, app.js, all
      9 data files, manifest, icon). Cache-first for same-origin GET + runtime-cache; cross-origin
      (Google Fonts, YouTube thumbs) pass through to network; navigation offline-fallback to
      index.html. `install` skipWaiting, `activate` deletes non-matching caches + clients.claim.
      Prominent header comment: **bump CACHE on any asset edit.**
- [x] `index.html`: `<link rel="manifest">` + `<link rel="apple-touch-icon" href="assets/icon.svg">`
      + a `load`-time SW registration (feature-detected, silent catch).
- [x] **Standing cache-bump rule added to PLAN.md session protocol**, and a project **memory**
      written (`ot-atlas-service-worker`) so future sessions don't get misled by stale preview output.

**Files changed:** NEW `manifest.json`, `sw.js`, `assets/icon.svg`; `index.html` (manifest/icon
links + SW registration); PLAN.md, PROGRESS.md; memory `ot-atlas-service-worker.md` + MEMORY.md.

**Evidence (actual tool output):**
```
After reload: navigator.serviceWorker.getRegistrations() → 1; registration state "active".
caches.keys() → ["ot-atlas-v1"]; that cache holds 15 entries (/, /index.html, /manifest.json,
  /assets/icon.svg, /assets/css/styles.css, /assets/js/app.js, + 9 data files).
manifest.json fetches + parses (name "The OT Atlas", 1 icon); <link rel=manifest> present;
  assets/icon.svg serves with image/svg+xml.
App fully functional with SW active: 12-route sweep node counts unchanged; a condition drawer opens
  with share button + related-conditions chips (proves the cached app.js runs correctly).
caches.match('./assets/css/styles.css') returns a hit → offline-capability confirmed for the shell.
Console (after SW install/activate + route sweep + drawer): "No console logs." — zero SW errors.
```
**Issues found / caveats (honest):**
- SVG manifest icon works in modern Chrome; some older/iOS browsers prefer a PNG install icon →
  degraded install UX there (accepted, per the plan; F28 PNG still queued).
- TRUE offline (airplane mode) can't be simulated in this headless preview — verified the pieces
  (SW active, assets cached, cache serves) that make it work; a real offline test is the final check.
- **DEV FOOTGUN now active:** the preview origin has a cache-first SW; future asset edits won't show
  on reload until the `sw.js` CACHE version is bumped (or the SW is unregistered). Documented in
  sw.js, PLAN.md session protocol, and a memory.

**Exact next item:** the pure-code roadmap is essentially exhausted. Remaining items each need input
beyond code: F19 (plain-language condition bodies — clinician sign-off), F27 (content gaps — sign-off),
F28 (og:image PNG — image tooling). Good point to pause for owner review.

## 2026-07-03 — F18 "On this page" table of contents (Opus 4.8) — COMPLETE
- [x] Added `buildPageTOC()` (called in `route()` after render). Auto-builds a TOC from a page's
      top-level section headings (`.page > h2`), but ONLY when there are ≥3 AND the page has no
      existing `.sticky-jump` category bar — so it appears on long prose pages and stays off the
      grid/jump-bar pages. Router-safe: buttons + measured `scrollTo` (topbar offset), NOT `#`
      anchors; moves keyboard focus to the target section (`tabindex=-1` + `focus`). New `.page-toc`
      CSS (teal-left-accent box, wrapped link list). `aria-label="On this page"`.
- [x] Verify: appears on exactly the right 5 pages; targets resolve; jump keeps the hash; focus
      moves; AA 9.77:1; console clean.

**Files changed:** `assets/js/app.js` (`buildPageTOC` + `route()` call), `assets/css/styles.css`
(`.page-toc`), PLAN.md, PROGRESS.md.
**Evidence (actual tool output):**
```
TOC auto-appears on: clients (5 sections), evidence (5), pillars (5), reasoning (4), resources (3).
  Correctly ABSENT on: home (no .page>h2), foundations/toolkit (tab pages), models (no sections),
  conditions/assessments/videos (already have .sticky-jump category bars).
Evidence page: all 5 TOC targets resolve to real section ids; clicking item 3 keeps hash #/evidence
  (router-safe) and moves document.activeElement to the section (focusMoved=true); TOC link
  contrast 9.77:1. Screenshot shows the "ON THIS PAGE" box after the lede.
Route sweep deltas = exactly the TOC nodes (clients/evidence/pillars +13, reasoning +11, resources
  +9); all other pages unchanged. Console: "No console logs."
```
**Issues found:** none. **Exact next item:** owner's call — remaining: F19 (progressive disclosure),
F10 (PWA — high risk), F27 (content — sign-off), F28 (og:image — image tooling).

## 2026-07-03 — F20 heading-hierarchy fix (Opus 4.8) — COMPLETE
The dedicated pass. Root cause: the whole app was uniformly **one heading level too deep** — page
sections/cards were h3 (should be h2), sub-headings were h4 (should be h3), so pages jumped H1→H3
and drawers H2→H4 (WCAG best-practice / axe "heading-order"). Because it was uniform, a global
**h3→h2, h4→h3** shift fixes every skip with zero visual change.
- [x] Verified safety preconditions first: 52/52 + 39/39 balanced open/close tags, no stray `<h3`/`<h4`,
      no h5/h6, and **all 8 existing `<h2>`s are inline- or `.section-head`-sized** (so a new bare
      `h2` size rule can't affect them). Confirmed `.section-head` = `clamp(1.5–2.05rem)`.
- [x] JS (app.js): global `<h3`→`<h2`, `</h3>`→`</h2>`, then `<h4`→`<h3`, `</h4>`→`</h3>` (order
      matters — h3 fully before h4). drawerShell's `<h2>` title and the welcome `<h2>` were already
      the right level and untouched.
- [x] CSS (styles.css): moved the 9 tag-based rules to match — bare `h3{1.32rem}`→`h2`, `h4{1.08rem}`
      →`h3`, `.card h3`→`.card h2`, `.pathway h3`→`.pathway h2`, `.itemcard h3`→`.itemcard h2`,
      `.numbered .step h4`→`h3`, `.video-body h4`→`h3`, `.drawer-body h4`→`h3` (+`:first-child`).
- [x] Verify: heading-order audit + numeric font-size parity + screenshots.

**Files changed:** `assets/js/app.js` (heading tags, global), `assets/css/styles.css` (9 heading-rule
selectors), PLAN.md, PROGRESS.md. No structural/DOM-count change.

**Evidence (actual tool output):**
```
Heading-order audit (all 12 routes + condition drawer + model drawer): pagesWithSkipsOrBadH1 = {}
  — ZERO skips, exactly one h1 per page. Outlines now sequential + nested:
  videos 1,2,3,3,3,2,3,3 (h1→h2 bucket→h3 video titles→h2 next bucket); clients 1,2,2,3,3;
  evidence 1,2,3,3,…,2; condition drawer 2,3,3,3…; model drawer 2,3,3,3… (was H2→H4).
Visual parity (computed font-size vs former values, base rem=16px): section h2 21.1px (=old h3
  1.32rem) · itemcard h2 18.6px (=1.16rem) · drawer subhead h3 11.5px (=.drawer-body .72rem) ·
  video h3 16.0px (=1rem) · step h3 17.3px (=1.08rem) · drawer title h2 27.2px (=1.7rem, unchanged) ·
  section-head 32.8px (clamp, unchanged). Every size matches → zero visual change.
Route sweep node counts: IDENTICAL to pre-change (tag-only edit). Drawer screenshot: subheads still
  mono-uppercase-teal, title unchanged. Console: "No console logs."
```
**Issues found:** none. The reassessment last entry (that this needed a careful pass) was right; the
uniform-depth structure made the pass clean once verified. **Exact next item:** owner's call —
remaining: F18 (TOC), F19 (progressive disclosure), F10 (PWA), F27 (content — sign-off), F28 (og:image).

## 2026-07-03 — Print handout sheet (F25) + related conditions (F29); F20 reassessed (Opus 4.8) — COMPLETE
- [x] **F25 — real print / handout stylesheet.** Replaced the 4-line `@media print` block with a
      full sheet: forces readable light tokens regardless of theme (the print block sits after the
      dark block → wins on source order), `@page` margins, hides chrome (topbar/sidenav/grain/
      scrims/sticky bars/copy+share buttons), prints an open condition drawer inline (not as a
      clipped fixed panel), reveals collapsed accordion bodies, `break-inside:avoid` on cards/
      callouts, and expands external citation URLs via `a[href^="http"]::after` (suppressed for
      internal `#`/`.`/`/` links). **Verified: the @media print rule parses; screen rendering is
      unaffected (body bg still #EAEEF4). NOTE: actual paper/PDF output can't be emulated in this
      headless preview — the rules are standard, valid and print-scoped, but a real File→Print is
      the final check.**
- [x] **F29 — related conditions in the drawer (NEW, additive).** `openCondition` now lists up to 5
      sibling conditions in the same category as chips that open them (mirrors the F21 related-videos
      pattern). Turns the drawer into an exploration hub (Related conditions · Related videos · Learn
      more). **Verified: stroke drawer shows 5 neuro siblings; clicking TBI → #/conditions/tbi with
      the title updated; console clean; page-level node counts unchanged (chips live in the drawer).**
- [~] **F20 — heading hierarchy: REASSESSED, deferred honestly.** On inspection this is NOT a clean
      batch edit. The 90 headings are styled by TAG and the same `<h4>` serves BOTH drawer subheads
      AND page-card titles (video cards, steps, country cards, links…); a blanket h3→h2 / h4→h3 would
      break heading visuals across the app or create NEW skips inside cards. It needs a dedicated pass
      that classifies each heading's semantic level per surface and moves the matching CSS, with a
      full 12-route + drawer visual re-verify in both themes. Left queued rather than risk regressions.

**Files changed:** `assets/css/styles.css` (`@media print` block), `assets/js/app.js`
(openCondition: siblings + relConds + `[data-cond]` drawer wiring), PLAN.md, PROGRESS.md.
**Evidence:** print rule parsed via document.styleSheets, screen bg unaffected; F29 5 chips +
cross-nav verified; console "No console logs."; route sweep unchanged.
**Still queued:** F20 (heading pass, dedicated), F18 (TOC), F19 (progressive disclosure), F10 (PWA),
F27 (content — clinician sign-off), F28 (og:image PNG — needs image tooling).
**Exact next item:** owner's call — F20 as a dedicated pass, F18 (TOC, additive), or F10 (PWA, high risk).

## 2026-07-03 — Bigger-bets batch: cross-linking + sharing + a11y + mobile (Opus 4.8) — COMPLETE
Second implementation batch from the audit roadmap. All verified live, both themes, AA-clean.
- [x] **F26 — public glossary bridge.** Generalised `linkifyGlossary(root)` to accept any container
      (drawer → `.drawer-body`; a page → the container). Now called in `renderClients` too. Added 8
      missing plain-language glossary entries to resources.js (Hemiparesis, Spasticity, Contracture,
      Edema, Micrographia, Tenodesis, Modified independence (mod-I), Doff). Chose unambiguous keys to
      avoid linkifier false positives (e.g. NOT bare "don" — would match "don't"). **Verified: 66
      glossary terms; new terms link in real drawers (hemiparesis→stroke, micrographia→Parkinson's,
      contracture→burns); clients page now shows glossary links.**
- [x] **F21 — related-video cross-links in condition drawers.** Category→bucket map
      (neuro→stroke, hand→hand, peds→peds, mh→mh, geri→geri; spec omitted). Renders a "Watch
      "<bucket title>" ↗" chip (both modes) that closes the drawer, goes to Videos and measured-
      scrolls to that bucket. **Verified: stroke drawer chip → #/videos.**
- [x] **F23 — share/copy-link on condition drawers.** Injected a share button into the drawer header
      (conditions only — `drawerShell` is shared with model drawers, so gated in `openCondition`;
      **verified absent on model drawers**). Uses `navigator.share` with a clipboard fallback
      (reuses `fallbackCopy`), announced via `announce()`. **Verified: copies the deep link
      `…/#/conditions/stroke`.**
- [x] **F22 — full ARIA tab pattern.** Rewrote `wireTabs` to enhance the existing markup
      (Foundations + Toolkit) into a real tab pattern: `role=tab`/`tabpanel`, `aria-selected`,
      `aria-controls`, roving `tabindex`, and Arrow/Home/End keys — instead of the previous
      declared-but-broken `role="tablist"` with plain buttons. No inline markup rewrite needed.
      **Verified: role=tab, aria-selected, aria-controls→panel[role=tabpanel]; ArrowRight moves
      selection + focus.**
- [x] **F24 — iOS-safe scroll lock.** Replaced the 6 `body.style.overflow='hidden'|''` calls
      (drawer / search / welcome) with ref-counted `lockScroll()`/`unlockScroll()` that pin the body
      with `position:fixed` + restore scrollY (plain overflow:hidden doesn't stop iOS touch-scroll).
      **Verified: body position fixed on open → static + restored on close.**
- [x] **F28 (part) — last-reviewed date.** Added `R.reviewedOn = "July 2026"` (rigor.js), rendered as
      "Content reviewed July 2026." in `pageFoot()`. (The og:image/apple-touch PNG half is still queued.)

**Files changed:** `assets/js/app.js` (linkifyGlossary signature + renderClients call, VID_MAP +
relVideos + wiring in openCondition, share-button injection, wireTabs full ARIA rewrite, lockScroll/
unlockScroll + 6 swaps, pageFoot reviewed line), `assets/js/data/resources.js` (8 glossary entries),
`assets/js/data/rigor.js` (reviewedOn), `assets/css/styles.css` (`.drawer-share` position), PLAN.md, PROGRESS.md.

**Evidence (actual tool output):**
```
F26: window.OT.resources.glossary.length = 66; new-term drawer links = [stroke:hemiparesis,
     parkinsons:micrographia, burns:contracture]; clients a.gloss present.
F21: stroke drawer [data-vidbucket] text "Watch “Stroke & neuro rehab” ↗"; click → hash #/videos,
     drawer gone, body position restored to static.
F23: share button present on condition drawer, ABSENT on model drawer; click copied
     "http://localhost:4178/#/conditions/stroke".
F22: first tab role=tab, aria-selected=true, aria-controls=panel-tools-screener (role=tabpanel);
     ArrowRight → active key "goal", focus moved to btn[1], aria-selected=true.
F24: bodyPos fixed on drawer open → static after close (+ video-chip close path also restores).
F28: pageFoot contains "Content reviewed July 2026".
Route sweep: all deltas explained (pageFoot reviewed-span +1/page; resources +25 = 8 new glossary
     rows; clients +3 = gloss links). No unexpected DOM changes.
Contrast (alpha-composited, both themes): new elements (gloss links, glossary rows, video chip,
     share button, pageFoot muted) — 22 elements/theme, 0 fails, min 4.61:1.
Console (both themes, drawers + tabs + search): "No console logs."
```
**Issues found:** none open. **Still queued:** F25 (print stylesheet), F27 (content coverage —
needs clinician sign-off), F20 (heading hierarchy), F18 (TOC), F19 (progressive disclosure),
F10 (PWA), F28 og:image PNG. **Exact next item:** owner's call — F25 print or F20 headings are
the cleanest next code items; F27 content needs sign-off.

## 2026-07-03 — Workflow-driven improvement batch (Opus 4.8, ultracode) — COMPLETE
Ran a 16-agent audit workflow (10 code auditors + 4 web-research + synthesis + adversarial critic)
to find improvements. Then implemented + verified the high-value, low-risk items. Full roadmap
lives in the workflow output; the bigger bets are queued in PLAN.md (F21–F28).

**Shipped this session (all verified live, both themes):**
- [x] **BUG FIX (critical): 81 dead-end assessment chips.** `bestAsmtQuery` (app.js) returned the
      raw verbose label when it couldn't resolve a real tool → the assessments filter matched 0 →
      31% of chips (81/259, in 57/66 conditions) dead-ended to "No assessments match." Now returns
      `null` when unresolved; `openCondition` renders unresolved labels as non-clickable `.chip-static`
      (dashed, muted, no ↗) and resolves each label ONCE (stored in data-asmt), dropping the
      redundant second call. **Verified: 259 chips → 178 clickable (0 dead-ends) + 81 static.**
- [x] **Cool scrims.** 4 warm-brown overlay rgba()s (`.scrim`/`.search-overlay`/`.drawer-scrim`/
      `.welcome-scrim`) left over from before F17 → one shared `--scrim` token (cool slate light /
      near-black dark). My own miss from the recolor.
- [x] **iOS auto-zoom fix.** `.field` inputs `.95rem`→`1rem` (≥16px stops iOS Safari focus-zoom).
- [x] **Card-button focus + press.** `.card.lift/.pathway/.feature-card/.itemcard:focus-visible`
      now inherit the card's radius (was a broken-looking 4px ring on big cards) + `:active` press.
- [x] **aria-live (WCAG 4.1.3).** Added `aria-live="polite"` to the 4 toolkit outputs
      (#gOut/#pOut/#aOut/#eOut) and both result counts (#condCount/#asmtCount) — matches #scrOut.
- [x] **Clear-filters recovery.** Conditions + Assessments empty states now show a "Clear filters"
      text-button (new `.text-btn`) that resets filter/strength/query, re-syncs chips, redraws.
- [x] **Per-view title + meta.** New `setMeta()` + route-title map; `route()` sets a per-page
      `<title>`, `openCondition()` sets `<condition> — The OT Atlas` + the condition desc as
      meta description. (Every tab/bookmark/history entry used to be identical.)
- [x] **Evidence-coverage trust panel.** `window.OT.rigor.coverage` was computed at load and shown
      NOWHERE; now a 3-card panel in `renderEvidence`: "66/66 rated · 37 source-verified · 2
      contested", assessments 58/58·50·3, studies 16/16·1.
- [x] **Head meta.** Added theme-color (light #EAEEF4 / dark #0E1621), canonical, Open Graph +
      Twitter Card tags (text; og:image PNG still to add — queued).
- [x] **`<noscript>` fallback** so a failed deferred script doesn't strand users on "Loading…".
- [x] **Font axis tightening** (Fraunces 400..700 / italic 400..600, Hanken 400..700 — dropped
      unused 300/800/900).
- [x] **Dead code removed:** the no-op `vids` block in `openModel`.

**Files changed:** `assets/js/app.js` (bestAsmtQuery, openCondition chips + click, setMeta +
ROUTE_TITLES + route()/openCondition calls, renderEvidence coverage panel, clear-filters in
renderConditions/renderAssessments, aria-live attrs, openModel dead-code removal), `assets/css/
styles.css` (`.chip-static`, `--scrim` token + 4 repoints, `.field` font-size, card focus/press,
`.text-btn`), `index.html` (theme-color/canonical/OG/Twitter meta, noscript, font axis), PROGRESS.md, PLAN.md.

**Evidence (actual tool output):**
```
Chips: 259 total → 178 clickable (matcher-verified 0 dead-ends) + 81 non-clickable static.
Per-view titles: home "Occupational therapy, in depth — The OT Atlas"; assessments "Assessments &
  measures — The OT Atlas"; #/conditions/stroke → "Stroke (CVA) — The OT Atlas" + meta desc = c.desc.
Coverage panel renders on #/evidence: 3 cards, "66/66 carry an evidence rating · 37 source-verified
  · 2 flagged contested" etc. (evidence route node count 320→339 = the panel; all 11 other routes
  unchanged from baseline).
Clear-filters: empty state (query 'zzzq') shows the button → click recovers 66 conditions + clears input.
aria-live "polite" confirmed on #condCount and #gOut; .field input computed font-size = 16px.
Scrim: #drawerScrim bg now rgba(14,22,33,.5) (cool), not brown.
Contrast (alpha-composited, srgb-aware): new/changed elements (coverage cards, .chip-static, .text-btn,
  clickable chips) — LIGHT 0 fails min 4.61:1; DARK 0 fails min 5.0:1.
Console (both themes, 24 route loads + drawers + tools): "No console logs."
```
**Issues found:** none open from the shipped set. **Open:** og:image PNG asset; the bigger-bet
roadmap items F21–F28 (queued in PLAN.md). **Exact next item:** owner's call — strongest next is
**F26** (fill public glossary gaps + run the linkifier on the clients page) or **F21** (related-video
cross-links in condition drawers).

## 2026-07-03 — F17 follow-up: logo + brightness + a11y audit (Opus 4.8) — COMPLETE
Owner glance notes: "odd logo", "bright site", + "is this handicap usable?"
- [x] **Logo redesigned.** Old brand mark was a shield-blob + dot + smile (read as an ambiguous
      face). Replaced with a clean **open-book** mark (teal outline + coral spine) — fits "Atlas",
      unambiguous at 34px. `index.html` brand-mark SVG + `<link rel=icon>` favicon both updated.
      **Also fixed:** the favicon still had leftover WARM colors (`#E8DFCE` cream stroke,
      `#D2693F` terracotta dot) missed in the recolor — now cool (`#F4F6FA` book, `#E4633F` spine).
- [x] **Brightness toned down.** Page base `#F4F6FA`→`#EAEEF4` (softer cool grey, less glare),
      `--paper-2`→`#DFE6EF`, `--line`→`#D7DFE9` (defines edges on the greyer bg); white cards kept,
      so they now lift with more separation. Re-verified AA: 79 text elements, 0 fails, min 4.55:1
      (darker base only raised text contrast).
- [x] **Accessibility audit (automated, 12 routes).** PASS: html lang=en, title, skip link,
      landmarks (banner/nav/main), zero nameless controls, zero missing img alt, exactly one h1
      per page, all toolkit inputs labelled, no duplicate ids, `:focus-visible` styled, evidence
      badges use dot+label (not color-only). **One gap found:** heading-level skips (pages H1→H3,
      drawers H2→H4) — moderate (screen-reader heading nav). NOT fixed this session: heading levels
      are styled by tag across the whole stylesheet, so correcting them safely needs its own pass +
      full re-verify. Queued as **F20**.

**Files changed:** `index.html` (brand-mark SVG, favicon), `assets/css/styles.css` (`--paper`,
`--paper-2`, `--line`), PROGRESS.md, PLAN.md.
**Evidence:** logo renders clean in both themes (screenshots home light+dark); AA re-audit 0 fails
min 4.55:1 on the softer base; console clean after both-theme route loads; a11y audit output above.
**Open:** F20 (heading hierarchy). Grain-fully-removed still an open owner toggle from F17.

## 2026-07-03 — DESIGN OVERHAUL: "cool clinical" recolor (F17, Opus 4.8) — COMPLETE
**New owner directive (2026-07-03): "brown is gross — research what people like, decide, and
do it."** Supersedes the old "keep the warm cream/clay tokens" constraint. Ran the deep-research
harness first (101 agents, 18 sources, adversarial verification), then owner delegated the call
("research and decide, you should have enough to go on"). This is a token-level recolor — the
app's structure/logic is unchanged; every route still renders at its exact baseline node count.

**Research basis (verified findings, sources in the deep-research report):**
- Authoritative health design (CMS / HealthCare.gov) uses cool neutrals + blue/blue-green
  *because* they read as trust/calm; warm beige/cream is deliberately absent. A cited
  patient-preference study: cool colors 49% vs warm 29%.
- **Keep the teal** — the existing #156B66 already sits in the trusted blue-green family;
  retaining it keeps the app distinctive (teal-led, not generic corporate-blue).
- Typography guidance (ODPHP/HHS, Section 508: serif headings + sans body ≥16px) — the app was
  already correct, so Fraunces/Hanken/Spline were kept untouched.
- Avoid "AI-slop" tells (Inter, purple gradients, uniform cards) — the app avoids all three;
  the brief was to swap the warm palette WITHOUT flattening the distinctiveness. Grain texture
  kept (as a distinctiveness asset) but dialed to a whisper.

**Decisions I made (owner-delegated):** coral accent (owner's pick from a 4-option mockup);
proof-of-concept → committed after it verified clean; kept teal + the sage/ochre/plum evidence
scale; grain reduced (0.5→0.12), not removed; fixed evidence-scale AA while in here.

**What changed (all token-level):**
- Neutrals de-browned: page #F7F0E3→#F4F6FA (cool off-white); ink #241F1A→#17212E (slate);
  borders tan→cool-grey; card #FFFDF7→#FFFFFF; cool shadows; atmospheric wash cooled.
- Teal KEPT (#156B66). Clay terracotta #C0552F → **coral #E4633F**.
- New **-deep text variants** (mirror the existing --teal-deep pattern) so vivid accent colors
  stay AA as small text: `--clay-deep #B4441F`, `--sage-deep #3F6152`, `--ochre-deep #7E5810`,
  `--plum-deep #573A4E` (light) with light-on-dark equivalents for dark mode. All `color:
  var(--clay)` text uses repointed to `--clay-deep`; evidence-badge/tag/plain-toggle text
  repointed to the sage/ochre/plum deep variants; `.btn-clay` uses deep coral bg (white text AA).
- Dark mode fully re-themed to cool slate (#0E1621 base, coral #F0805C).
- Fixed 2 hardcoded cream `#F7F0E3` fills in app.js (video fallback graphics) → cool off-white.

**Pre-existing AA gaps found by the audit and fixed while here (not recolor regressions):**
`.ev-sage` (2.95) / `.ev-ochre` (2.36) mid-tone text on pale tints; dark-mode active `.chip`
(white on light teal, 2.35 — the dark override covered `[aria-pressed]` but not `.chip.active`).

**Files changed:** `assets/css/styles.css` (header comment; :root + dark token blocks; grain;
gradient; shadows; +4 `-deep` tokens; ~6 text-repoints; `.btn-clay` + dark override; `.chip`
dark `.active` override; `--ink-faint` darkened for AA), `assets/js/app.js` (2 fallback-thumb
cream→cool; `color:var(--clay)`→`--clay-deep` inline text repoints), PROGRESS.md, PLAN.md.

**Evidence (actual tool output):**
```
Contrast audit (alpha-composited, srgb-float-aware parser):
  LIGHT — 143 text elements across assessments/stroke-drawer/toolkit/home: 0 fails, min 4.55:1.
  DARK  — 147 text elements across same: 0 fails, min 5.0:1.
  (The audit first flagged 3 false positives — .card-meta/.count-note/.ev-conf via a too-light
   --ink-faint which I then darkened #6C7C8E→#5F6C7A; plus 2 measurement artifacts from
   semi-transparent color-mix bg and color(srgb ..) float syntax, both real-pass once composited.)
  Spot values: eyebrow (deep coral) 5.12; ev-clay 4.55; ev-teal 7.73; page-title 15.0.
Route sweep (#main node counts, 12 routes) unchanged from baseline: home 109 … assessments 1188,
  videos 774, conditions 640, clients 375, toolkit 162 — pure recolor, DOM identical.
Console (preview_console_logs after 24 route-loads across BOTH themes): "No console logs."
Screenshots captured: home, stroke drawer, assessments, videos, clients (light) + home, stroke
  drawer (dark) — all cohesive; teal-led, coral accents, no warm/brown cast; F13 play buttons,
  F7 CTA, evidence badges, glossary links all read correctly in both themes.
```

**Issues found:** none open. All AA gaps (recolor + pre-existing) resolved.

**Open questions for owner:** (1) grain is a whisper, not gone — say if you want it fully
removed. (2) Two research-backed non-color upgrades are queued but not built: anchor-link TOC on
mega-pages, and leaning Public/Clinical harder into progressive disclosure.

**Note for the pending F10 PWA item:** `sw.js` doesn't exist yet, so the cache-bump rule didn't
apply to this session; when PWA ships, this recolor is part of the cached assets.

**Exact next item:** owner's call — either resume the original queue (**item 12 [F10] PWA**,
Opus/high) or take a queued design follow-up (F18 TOC / F19 progressive disclosure).

---

## 2026-07-03 — Phase 3 item 11 (F8 fuzzy search fallback, Opus 4.8) — COMPLETE
Sub-steps (all completed):
- [x] `app.js` `runSearch`: added a fuzzy branch INSIDE the existing `if (!res.length)` block —
      fires only when the exact-substring filter returned 0 AND `q.length >= 4`. If fuzzy finds
      matches → render them with a "No exact match — showing close matches" note and return; else
      fall through to the original empty state (kept verbatim, including its curly quotes).
- [x] `app.js`: added `diceSim(a,b)` — Sørensen–Dice bigram similarity (Map-based multiset
      intersection, no dependency) and `fuzzyMatches(q, idx)` — scores each index TITLE at the
      **word level** (best-matching word ≥ 3 chars, plus the whole normalized title for multi-word
      queries) so "Dementia / Alzheimer's" isn't diluted; threshold ≥ 0.4, sorted desc, top 8.
- [x] `app.js`: extracted the shared result renderer into `paintResults(list, q, noteHTML)`
      (same button template, click-wiring, `_res`, `aria-activedescendant`); the exact path now
      calls `paintResults(res, q, "")`. **Behavior-preserving refactor — verified identical** (see
      evidence: strok=15, copm=3, dementia=3, all with no note). The note is inline-styled so no
      CSS file was touched; rollback = delete the fuzzy branch + the two helper functions.
- [x] Verify: exact path unchanged; typo cases surface close matches; correctly-spelled queries
      stay on the exact path; nonsense → clean empty state; fuzzy results fully interactive
      (mouse + keyboard); 12-route sweep; 0 console errors.

**Files changed:** `assets/js/app.js` (`runSearch` fuzzy branch, new `paintResults`/`diceSim`/
`fuzzyMatches`), PROGRESS.md, PLAN.md. **No CSS change** (note row is inline-styled with existing
tokens). No `sw.js` yet (PWA not built) so the F10 cache-bump rule does not apply this session.

**Evidence (actual tool output — driven via the real search overlay + input events):**
```
EXACT PATH UNCHANGED (hasNote:false on all):
  "strok"    → 15 results (Stroke (CVA), Fugl-Meyer…, SIS…) — matches prior-session baseline of 15.
  "copm"     → 3 results (COPM, CMOP-E, COPM entry).
  "dementia" → 3 results (Dementia / Alzheimer's, Browse: dementia…, Caregiver-focused…).
FUZZY FALLBACK (hasNote:true, note "No exact match — showing close matches", aria sr-0):
  "dimentia"   → 8 close matches, first = "Dementia / Alzheimer's".  ← the plan's key case
  "alzheimers" → 1 close match  = "Dementia / Alzheimer's" (word-level score caught "alzheimer").
CORRECTLY-SPELLED stays exact (no fuzzy):
  "proprioception" → 1 exact result (Proprioception), hasNote:false.
CLEAN EMPTY STATE (hasEmpty:true, hasNote:false, aria cleared):
  "qqqq" → 0,  "zzzz" → 0,  "xq" → 0 (2 chars, below the q.length>=4 gate).
INTERACTIVITY of fuzzy results (via shared paintResults wiring):
  Keyboard: type "dimentia" → ArrowDown selects sr-1 ("Browse: dementia & caregiver coaching"),
    aria-activedescendant="sr-1" → Enter closes overlay + navigates to #/videos.
  Mouse: type "dimentia" → click first result → overlay closes, hash "#/conditions/dementia",
    drawer opens titled "Dementia / Alzheimer's".
Route sweep (12 routes, #main descendant counts): home 109, foundations 230, pillars 221,
  models 224, reasoning 205, evidence 320, conditions 640, assessments 1188, videos 774,
  resources 278, clients 375, toolkit 162 — all match prior-session baseline exactly.
Console (preview_console_logs, after exact-path checks, fuzzy checks, keyboard/mouse nav,
  route sweep): "No console logs." — zero errors/warnings.
Screenshot: search overlay with "dimentia" typed → note row + ranked close matches
  (Dementia / Alzheimer's selected with the clay left-border, then related video/evidence).
```

**Issues found:** none. Note: the refactor into `paintResults` is the only change the exact path
touches; its output is byte-for-byte the same template as before (empty note string), and the
strok/copm/dementia checks confirm identical counts, ordering and absence of the note.

**Open questions:** none.

**Exact next item:** PLAN.md **item 12 — [F10] PWA: manifest + versioned service worker**
(NEW `manifest.json`, NEW `sw.js`, `index.html`) — **Opus, high effort, HIGH RISK**. Standing
rule to add to the session protocol when done: every later asset-editing session MUST bump the
`CACHE` version string in `sw.js`. Use the universal prompt template in PLAN.md "Session prompts".

---

## 2026-07-03 — Phase 3 item 10 (F13 brand the video play affordance, Sonnet 5) — COMPLETE
Sub-steps (all completed):
- [x] `app.js` `videoItemHTML` (the `v.yt` branch only — real YouTube-thumbnail cards): replaced
      the stock YouTube red-rounded-rect play SVG with a brand mark — teal circle
      (`fill="var(--teal)"`) + paper-cream triangle (`fill="var(--paper)"`), same pattern already
      used for the brand SVG in `index.html`. Added explicit `aria-hidden="true"` on the `.play`
      wrapper (card link already labels the video via its title/channel/desc text).
      `search`/plain-link video cards (no real thumbnail) were left untouched — out of F13 scope.
- [x] No CSS changes needed: `.video-thumb .play` / `.play svg` sizing, drop-shadow and
      hover-scale rules are generic and apply unchanged to the new markup.
- [x] Verify: both themes screenshotted; computed fill colors resolve correctly per theme
      (cream triangle on deep-teal circle in light mode, dark triangle on lighter-teal circle
      in dark mode — both high-contrast, both intentional via the same var()-flip pattern the
      brand mark already uses); old red/white stock SVG fully gone; 12-route sweep; 0 errors.

**Files changed:** `assets/js/app.js` (`videoItemHTML`, `v.yt` branch only), PROGRESS.md, PLAN.md.

**Evidence (actual tool output):**
```
Play overlay found: 39 of 67 video cards have `.play` (the v.yt/thumbnail branch); the other
  28 (search + external-link cards) unaffected, confirming scope was exactly the YT branch.
aria-hidden: "true" on `.play`.
Old stock SVG confirmed gone: document.body.innerHTML no longer contains fill="#f33" or fill="#fff".
Dark theme (default): circle computed fill rgb(95,184,174) (--teal), triangle computed fill
  rgb(24,21,17) (--paper in dark mode — dark ink, per this app's existing --paper token flip).
Light theme: circle computed fill rgb(21,107,102) (--teal-deep... actually --teal resolves to
  the light-mode value), triangle computed fill rgb(247,240,227) (--paper light-mode cream) —
  matches the plan's literal "paper-cream triangle" description exactly in light mode; dark
  mode auto-inverts to a dark triangle on a lighter-teal circle, same adaptive pattern as the
  existing brand SVG mark in index.html. Both combinations screenshotted — clearly legible,
  on-brand, no stock red/white remaining in either theme.
Route sweep (12 routes, #main descendant counts): home 109, foundations 230, pillars 221,
  models 224, reasoning 205, evidence 320, conditions 640, assessments 1188, videos 774,
  resources 278, clients 375, toolkit 162 — all match prior-session baseline exactly.
Console (preview_console_logs, checked after theme toggle + route sweep): "No console logs."
```

**Issues found:** none.

**Open questions:** none.

**Exact next item:** PLAN.md **item 11 — [F8] fuzzy fallback for search misspellings**
(`assets/js/app.js` `runSearch`) — **Opus, high effort** — exact-match path must stay untouched;
fallback only fires when exact yields 0 AND query length ≥ 4. Use the universal prompt template
in PLAN.md "Session prompts".

---

## 2026-07-03 — Phase 3 item 9 (F9 copy button on every tool output, Sonnet 5) — COMPLETE
Sub-steps (all completed):
- [x] `styles.css`: `.tool-output` gained `position:relative`; new `.copy-btn` rule
      (absolute top-right pill, teal border, fills teal on hover, `:focus-visible` outline) —
      reuses existing color tokens, no new colors.
- [x] `app.js`: added `<button class="copy-btn" type="button">Copy</button>` to the **success**
      branch of all 5 tools (screener, goal writer, PICO, activity analysis, energy planner).
      Deliberately NOT added to the 2 guidance/error branches (screener "tick at least one",
      PICO "fill in P/I/O") — nothing meaningful to copy there.
- [x] `app.js`: one delegated `wireCopyButtons()` (single `document.addEventListener("click", …)`,
      called once at module init) — works for every tool's output including re-renders, no
      per-render rewiring needed. On click: clones the `.tool-output`, strips the clone's own
      `.copy-btn` (so "Copy"/"Copied ✓" text is never included), copies `clone.innerText.trim()`
      via `navigator.clipboard.writeText`, falls back to a hidden `<textarea>` +
      `execCommand("copy")` if Clipboard API is unavailable/rejects. On success: button text →
      "Copied ✓" for 2 s (setTimeout restores original), `announce("Copied to clipboard")` for
      the screen-reader live region.
- [x] Verify: all 5 tools — button present after generating output, clipboard receives exact
      expected text (button-excluded), button flips to "Copied ✓" then reverts after 2 s, live
      region fires. Error/guidance outputs confirmed to have NO copy button. Mobile 375px: no
      clipping, button sits cleanly beside the out-label. 12-route sweep; 0 console errors.

**Files changed:** `assets/js/app.js` (`fallbackCopy`, `wireCopyButtons` + one button + call in
each of the 5 `wire*` functions' success-output template), `assets/css/styles.css`
(`.tool-output{position:relative}`, new `.copy-btn` rule), PROGRESS.md, PLAN.md.

**Evidence (actual tool output):**
```
Screener (ticked 1 item, ran): button present ("Copy"); clicked with navigator.clipboard.writeText
  intercepted — text passed to clipboard EXACTLY matches the output's own text with the button
  stripped ("Based on what you ticked\n… Next step: ask your doctor…"); matchesExpected: true.
  Button → "Copied ✓" immediately; #routeStatus live region → "Copied to clipboard"; after
  2.1s wait, button text reverted to "Copy".
Goal writer: generated a goal, clicked Copy → "Copied ✓"; live region → "Copied to clipboard".
PICO builder: generated a question, clicked Copy → "Copied ✓".
Activity analysis: generated a summary, clicked Copy → "Copied ✓".
Energy planner: generated a plan, clicked Copy → "Copied ✓".
Guidance/error states confirmed copy-button-FREE: screener with nothing ticked → innerHTML is
  exactly `<div class="tool-output"><p>Tick at least one item above, then try again.</p></div>`
  (no button); PICO with P/I/O empty → no button.
Mobile 375px: body.scrollWidth <= window.innerWidth (no horizontal overflow); .tool-output
  computed position="relative" (button correctly contained); screenshot (via a temporary
  fixed-position clone, since this headless preview clamps scroll — same documented limitation
  as F4/F5/F7 sessions) shows the "COPY" pill sitting cleanly top-right beside "YOUR COAST GOAL",
  no clipping or overlap.
Route sweep (12 routes, #main descendant counts): home 109, foundations 230, pillars 221,
  models 224, reasoning 205, evidence 320, conditions 640, assessments 1188, videos 774,
  resources 278, clients 375, toolkit 162 — all match prior-session baseline exactly (toolkit
  unchanged because the copy buttons only appear after a tool is run, not on initial render).
Console (preview_console_logs, checked throughout all 5 tool tests + route sweep):
  "No console logs." — zero errors/warnings.
```

**Issues found:** none. One self-caused false alarm during testing (a stale checked checkbox
from an earlier manual test made the screener "no-copy-button" check look wrong on first try;
re-tested with the checkbox explicitly unchecked and confirmed correct — logged for
transparency, not a product bug).

**Open questions:** none.

**Exact next item:** PLAN.md **item 10 — [F13] brand the video play affordance**
(`assets/js/app.js` `videoItemHTML`, `assets/css/styles.css`) — **Sonnet, medium effort** — use
the universal prompt template in PLAN.md "Session prompts".

---

## 2026-07-03 — Phase 3 item 8 (F3 inline glossary links in condition drawers, Opus 4.8) — COMPLETE
Sub-steps (all completed):
- [x] `app.js`: added `buildGlossMatchers()` (cached) — parses each glossary entry into a
      **base term** (paren + ® stripped, first slash-segment) matched case-INSENSITIVE, and an
      **abbreviation** matched case-SENSITIVE with optional plural `s`. Abbreviation is only
      admitted when it shares the term's first letter (first-letter heuristic) — this accepts
      ADLs/IADLs/CIMT/EBP/ROM/AT… but rejects parenthetical qualifiers that are NOT abbreviations
      of the term ("Volition (MOHO)", "Context (OTPF-4)").
- [x] `app.js`: added `linkifyGlossary(drawer)` — walks **text nodes** of `.drawer-body p` via
      `TreeWalker` (skips any text already inside an `<a>`; collects nodes before mutating),
      leftmost+longest match, one link per term, **cap 4** per drawer, document order. Builds
      links with `document.createElement`/`textContent` (no innerHTML → no injection, no HTML-regex).
      Each link: `class="gloss"`, `href="#/resources"`, `title` = first 80 chars of the definition
      (word-trimmed + …), click → `glossQuery = term.t; closeDrawer(); go("resources")`.
- [x] `app.js`: wired one guarded call `try { linkifyGlossary(...) } catch(e){}` in `openCondition`
      after the assessment-chip wiring, before the deep-link `replaceState`. Rollback = remove this line.
- [x] `styles.css`: added `.gloss` rule (dotted underline, solid on hover/focus, pointer) — a new
      class needs a style; reuses the existing `a` color token. **Minor scope note below.**
- [x] Verify: stroke drawer links; click→filtered glossary; **all 66 conditions swept** (cap,
      text-integrity, no false lowercase-word links, no qualifier mislinks); both modes; bogus
      deep-link; 12-route sweep; 0 console errors.

**Files changed:** `assets/js/app.js` (`glossMatchers`, `buildGlossMatchers`, `linkifyGlossary`,
one call in `openCondition`), `assets/css/styles.css` (`.gloss` rule), PROGRESS.md, PLAN.md.

**Scope note (honest deviation):** the item lists Files as `app.js` only, but a new semantic
class (`.gloss`) needs a style to read as a link — I added a 2-line CSS rule using the existing
link color token. Rollback is therefore two removals (the `openCondition` call + the `.gloss`
rule), not one. Nothing else in CSS was touched; `[hidden]{display:none!important}` and the design
tokens are untouched.

**Evidence (actual tool output):**
```
Stroke drawer (clinical): 3 a.gloss links, all inside <p>, all href="#/resources" —
  "apraxia"→Apraxia (full term, lowercase match); "CIMT"→Constraint-Induced Movement Therapy
  (case-sensitive acronym, first-letter heuristic C==C); "ADL"→Activities of Daily Living (ADLs)
  (singular matched from the "(ADLs)" abbr via optional-plural pattern). Titles truncate at 80
  chars with "…". Screenshot confirms dotted underlines; the <li> items "CIMT/mCIMT" and
  "ADL/IADL retraining" are NOT linked (only <p> is processed).
Click "ADL" link: e.preventDefault → glossQuery set → drawer removed → hash "#/resources";
  #glossList shows exactly 1 row: "Activities of Daily Living (ADLs)".
ALL 66 conditions swept (3 chunks of 22): cap never exceeded (maxLinks=3); 0 cap violations;
  0 non-text/child-containing links; 0 nested links; 0 lowercase-word links
  (BAD set {at,gas,for,rom,dme,ebp,gap,pico,fim} never appeared as link text); 0 MOHO/OTPF-4
  qualifier mislinks. Distinct link texts seen incl. "AT" (UPPERCASE) — verified genuine:
  from condition impact "The right seating and AT can transform independence…" (Assistive
  technology). Case-sensitive matching linked real "AT" but would never touch the word "at".
Text integrity (stroke): each .drawer-body <p>.textContent still exactly equals the raw source
  data string (desc/impact/settings, entity-decoded) — descMatch/impactMatch/settingsMatch all
  true → only <a> wrappers inserted, zero characters changed/lost/duplicated.
Public mode: stroke drawer still shows 3 gloss links (feature kept for both modes, per plan).
Bogus deep-link #/conditions/zzz-bogus: renders the conditions page (page present), no drawer,
  no crash.
Route sweep (12 routes, #main descendant counts): home 109, foundations 230, pillars 221,
  models 224, reasoning 205, evidence 320, conditions 640, assessments 1188, videos 774,
  resources 278, clients 375, toolkit 162 — all match prior-session baseline exactly.
Console (preview_console_logs, checked after single-drawer test, after each 22-condition sweep
  chunk, after route sweep): "No console logs." — zero errors/warnings throughout.
```

**Issues found:** none. The one uppercase "AT" link initially looked like a possible
false positive but was verified as a genuine Assistive-Technology reference in a condition's
impact text — the case-sensitive design behaving exactly as intended.

**Open questions:** none.

**Exact next item:** PLAN.md **item 9 — [F9] copy button on every tool output** (`assets/js/app.js`
tool wiring + `styles.css`) — **Sonnet, medium effort** — use the universal prompt template in
PLAN.md "Session prompts".

---

## 2026-07-03 — Phase 3 item 7 (F7 screener discoverability CTA, Sonnet 5) — COMPLETE
Sub-steps (all completed):
- [x] `renderClients`: added a prominent CTA card ("2-minute check: could OT help?") right
      after the lede, before "Recognise when OT can help" — reuses existing `.card.accent-teal
      .lift` + `.btn-primary` tokens (no new CSS), links `#/toolkit` (screener is already the
      default tab there).
- [x] `renderHome`: public-mode-only copy change on the "For clients & families" pathway card —
      mentions the 2-minute check when `getMode() === "public"`; clinical-mode copy unchanged.
- [x] Verify: CTA renders with correct text/href; clicking navigates to `#/toolkit` with the
      screener tab active and its panel visible; public vs clinical home copy both correct;
      12-route sweep vs prior-session baseline; 0 console errors.

**Files changed:** `assets/js/app.js` (`renderClients` CTA card, `renderHome` mode-aware
`clientsCopy`), PROGRESS.md, PLAN.md.

**Evidence (actual tool output):**
```
CTA card: main a[href="#/toolkit"] found, text "Take the check →".
Click (a.click() — preview_click's rect was empty on this element per the known headless-
  scroll-clamp limitation, so navigation was confirmed via direct anchor .click() instead):
  location.hash → "#/toolkit"; active tab-btn dataset.key === "screener"; screener panel
  visible (no "hide" class), innerHTML length 2446 (non-empty).
Home copy — public mode (localStorage ot-mode=public, reload): pathway[data-go=clients] p
  text = "Could OT help you, your child or your parent? Take the 2-minute check, or read
  what to expect and how to find a therapist."
Home copy — clinical mode (reload): same element = "Could OT help you, your child or your
  parent? What to expect, and how to find a therapist." (unchanged from baseline).
Route sweep (async, 50ms settle per route, #main descendant counts): home 109, foundations
  230, pillars 221, models 224, reasoning 205, evidence 320, conditions 640, assessments 1188,
  videos 774, resources 278, toolkit 162 — all match prior-session baseline exactly.
  clients 367→375 = +8 nodes (icon svg+use+path, div, h3, p, a, text) = just the new CTA card.
Console (preview_console_logs, after CTA check + click + both mode reloads + route sweep):
  "No console logs." — zero errors/warnings.
Screenshot: CTA card renders correctly (dark theme, clinical mode) — teal-accent card,
  sliders icon, heading, body copy, "Take the check →" primary button, positioned above
  "Recognise when OT can help".
```

**Issues found:** none in the implementation. Environmental note (same as prior sessions):
`preview_click` reported an empty bounding rect for the CTA link in this headless preview
(scroll-clamp limitation already documented for F4/F5) — worked around by dispatching the
click directly on the anchor element, which exercises the same native navigation path.

**Open questions:** none.

**Exact next item:** PLAN.md **item 8 — [F3] inline glossary links in condition drawers**
(`assets/js/app.js`, post-process inside `openCondition` after `openDrawer`) — **Opus, high
effort** — text-node DOM walking only, do NOT regex over HTML strings. Use the universal
prompt template in PLAN.md "Session prompts".

---

## 2026-07-03 — Phase 3 item 6 (F4 sticky jump-bar + back-to-top, Opus 4.8) — COMPLETE
Note: plan assigned this item to Sonnet/medium; owner ran the session on Opus 4.8 (quality
equivalent, higher cost) — flagged, proceeded with owner's go-ahead ("next part of plan?").
Sub-steps (all completed):
- [x] CSS: `.sticky-jump` (position:sticky; top:var(--topbar-h); z-index:40 — below topbar 60 /
      sidenav 55 / search-overlay 50; blur bg + bottom border) and `.back-to-top` (fixed
      bottom-right FAB, teal, reduced-motion-safe) added after `.chip-row`.
- [x] index.html: `#backToTop` button (aria-label "Back to top", starts `hidden`) before search overlay.
- [x] app.js: `prefersReducedMotion()` helper; `initBackToTop()` (reveals past 2 viewport-heights,
      smooth-scroll-to-top respecting reduced motion, moves focus to #main so focus isn't lost
      when the button self-hides at top).
- [x] app.js renderAssessments: added `sticky-jump` class to `#asmtChips` category row.
- [x] app.js renderVideos: added sticky `#vidJump` chip list (buttons, NOT hash anchors — router
      listens on hashchange) + `id="vid-b<i>"` per bucket; click = measured `scrollTo`
      (topbar+jumpbar offset read at click time, robust to chip wrap and F5 text-size).
- [x] NEW FINDING + FIXED (mobile): at 375px the 13-chip video jump bar wrapped to 537px tall —
      unusable as a sticky bar. Added `@media (max-width:600px)` rule making `.sticky-jump` a
      single horizontally-swipeable row (`flex-wrap:nowrap; overflow-x:auto`; chips `flex:0 0 auto`).
      Re-measured: 57px, scrollable, all chips reachable, no page overflow.
- [x] Verify: structure/CSS/logic verified live + 12-route sweep + 0 console errors + mobile 375px.

**Files changed:** `assets/css/styles.css` (`.sticky-jump`, `.back-to-top`, reduced-motion +
`max-width:600px` rules after `.chip-row`), `index.html` (`#backToTop` button), `assets/js/app.js`
(`prefersReducedMotion`, `initBackToTop`, `#asmtChips` sticky class, `renderVideos` jump list +
bucket ids + measured-scroll handler), PROGRESS.md, PLAN.md.

**Evidence (actual tool output):**
```
Sticky CSS (both bars): position:sticky, top:64px, z-index:40 (topbar=60/sidenav=55/overlay=50 above).
Assessments: #asmtChips position "sticky", 9 category chips; strength row below stays non-sticky (screenshot).
Videos: #vidJump renders 13 buttons; all 13 data-jump targets resolve to real section[id=vid-bN];
        a[href^="#"] count in jump bar = 0 (router-safe — no hashchange hijack).
Jump click (bucket vid-b7): threw nothing; computed target y=5359 (positive), offset =
        topbar.offsetHeight + jumpBar.offsetHeight(177 desktop) + 14 — measured, so wrap/font-size safe.
Back-to-top: exists; initial state hidden=true; aria-label "Back to top"; position fixed; z-index 45;
        click threw nothing; reveal predicate window.scrollY < max(1,innerHeight)*2 (~2 viewports).
Route sweep (12 routes, #main descendant counts): home 109, foundations 230, pillars 221, models 224,
        reasoning 205, evidence 320, conditions 640, assessments 1188, videos 774, resources 278,
        clients 367, toolkit 162. videos 760→774 = +14 nodes = jump container + 13 buttons; rest match baseline.
Mobile 375px: videos jump bar height 537px (wrapped) → 57px after max-width:600px rule; flex-wrap nowrap;
        overflow-x auto; horizontally scrollable (all chips reachable); body.scrollWidth==innerWidth (no overflow) (screenshot).
Console (preview_console_logs, after desktop sweep AND after mobile pass): "No console logs." — zero errors/warnings.
```

**Issues found:** 1 (mobile sticky-bar height — caught during the 375px verify, fixed + re-verified
this session). No open questions.

**Environment limitation (stated honestly, per F5/PWA precedent):** this headless preview clamps
all document scroll offsets to 0 (window/body/html `scrollTop` won't move; `scrollIntoView` moved
0px), so live scroll-*motion* — the bars visibly pinning, the FAB appearing at 2 viewports, the
smooth jump-to-bucket — could not be exercised here. Verified instead: the sticky CSS is applied and
correct; the layout supports sticky (document is the scroller, no `overflow:hidden` ancestor between
the sticky element and the scroll container, `.page` is 36k px tall, `fade-up` ends at
`transform:none`); the JS handlers run without error and compute correct positive scroll targets and
thresholds. These are standard patterns that pin/scroll in a real browser given the confirmed layout.

**Exact next item:** PLAN.md **item 7 — [F7] screener discoverability CTA** (`renderClients`,
`renderHome` in `assets/js/app.js`) — **Sonnet, medium effort** — use the universal prompt template
in PLAN.md "Session prompts".

## 2026-07-03 — Phase 3 item 4 (F5 text-size control, Sonnet 5) — COMPLETE
Sub-steps (all completed):
- [x] CSS: `body{font-size:16.5px}` → `var(--font-base,16.5px)`; added `html[data-fontsize="lg"]`
      (`--font-base:18.5px`) / `"xl"` (`--font-base:20.5px`) overrides.
- [x] index.html: topbar button `#fontSizeToggle` (A/A+/A++ cycle) placed before `#themeToggle`,
      reuses `.icon-btn` styling; `<span class="fs-label" aria-hidden="true">`.
- [x] app.js: `initFontSize()` (applies persisted `ot-fontsize` on load, alongside `initTheme()`)
      + click handler cycling default→lg→xl→default via `FONTSIZES` map, persists `ot-fontsize`,
      updates visible label + `aria-label` each step.
- [x] Verify: persistence across reload; `xl` at 375px mobile (topbar/drawer/toolkit) — no
      clipped/overlapping text; 12-route sweep; 0 console errors.

**Files changed:** `assets/css/styles.css` (`--font-base` var + `[data-fontsize]` rules),
`index.html` (topbar `#fontSizeToggle` button), `assets/js/app.js` (`FONTSIZES`, `initFontSize`,
`applyFontSize`, click handler), `.claude/launch.json` (added `"autoPort": true` — port 4178
was held by another session's server; unrelated to F5, needed to get a preview at all),
PROGRESS.md.

**Evidence (actual tool output):**
```
Route sweep (node counts, home #/home to about #/about, 12 routes): about 109, assessments 1188,
clients 367, conditions 640, foundations 230, glossary 109, home 109, practitioners 109,
resources 278, students 109, toolkit 162, videos 760 — matches prior-session baseline, all render.

Cycle test (4 clicks from default): lg → xl → default → lg, each step correct label
(A → A+ → A++ → A), correct aria-label, correct localStorage["ot-fontsize"] value.

Reload persistence: set ot-fontsize=xl, location.reload() → data-fontsize="xl",
getComputedStyle(body).fontSize === "20.5px", label "A++" restored.

Mobile 375x812 @ xl: topbar-tools scrollWidth===clientWidth (272px, no clip), fontSizeToggle
button visible; #/conditions/stroke drawer renders full clinical text, no clipped/overlapping
lines (screenshot); #/toolkit renders tabs + checklist cleanly (screenshot);
body.scrollWidth === window.innerWidth (375) throughout — no horizontal overflow.

Console (preview_console_logs, checked after route sweep, after cycle test, after reload,
after mobile screenshots): "No console logs." — zero errors/warnings throughout.
```

**Issues found:** none in the implementation. Environmental note: this session's preview
server could not bind port 4178 (another chat's "ot-atlas" server was already using it) —
fixed by adding `autoPort: true` to `.claude/launch.json`; `.claude/static-server.js` already
reads `process.env.PORT`, so no server code change was needed. Session ran on port 56471.

**Open questions:** none.

**Exact next item:** PLAN.md item 6 — [F4] sticky jump-bar + back-to-top for long pages
(`renderAssessments`/`renderVideos` in `assets/js/app.js`, `styles.css`) — Sonnet, medium
effort, per the session queue in PLAN.md.

---

## 2026-07-03 — Phase 3 FOUNDATION BATCH (Fable 5) `[PARTIAL until marked complete]`
Owner directive: Fable does the design/flow foundation itself this session (deviation from
one-item-per-session is owner-approved), then PLAN.md gets per-model assignments (Sonnet vs
Opus) + paste-ready session prompts. Items claimed by Fable now: **1 (F2 chips), 3 (F15 deep
links), 2 (F1 first-visit chooser), 5 (F11+12 icon system), + mobile topbar check**.
Sub-steps (ticked as completed, logged as I go):
- [x] F2 clickable assessment chips — VERIFIED: chips are `<button data-asmt>`; COPM→"1 tool";
      "FIM / CARE"→query FIM "1 tool" (bestAsmtQuery word-overlap matcher); 0 console errors.
- [x] F15 deep links — VERIFIED: cold load `#/conditions/stroke` opens Stroke drawer; close
      reverts hash to `#/conditions`; bogus id renders page (66 cards), no crash.
- [x] F1 first-visit chooser — VERIFIED: shows once on #/home for fresh visitors only
      (deep-link guard confirmed — reload on #/conditions correctly suppressed it);
      role=dialog + labelledby + focus on first button; Tab wraps; Esc dismisses without
      forcing a mode; choose-public → mode=public + lands #/clients; never reappears.
- [x] F11+F12 icon system — VERIFIED: 21-symbol inline SVG sprite (24×24, 1.8px stroke,
      currentColor); 26 rendered instances, 0 zero-size; NO emoji/glyphs left in nav,
      condition chips, mode toggle, pathways, feature cards. Remaining decorative emoji in
      reasoning cards + video bucket headings + callouts → logged as new small item F16.
- [x] Mobile topbar — NEW FINDING + FIXED: at 375px the tools row measured 490px and clipped
      off-screen (theme toggle unreachable). Compact breakpoint ≤600px (hide brand text +
      kbd hint, tighten gaps): topbar scrollWidth now 375=clientWidth, theme toggle right
      edge 365px — reachable. Mobile screenshot captured.
- [x] PLAN.md updated: items 1/2/3/5 marked DONE; model-assignment table (Sonnet vs Opus vs
      Fable + effort levels); new item F16 (remaining decorative emoji → Sonnet); universal
      session-prompt template + 11-session queue with model/effort per session.
- [x] Final completion entry — this one.

**Session status: COMPLETE (2026-07-03, Fable 5).**
**Files changed:** assets/js/app.js (bestAsmtQuery + chip wiring, route() sub-segments,
closeDrawer hash restore, icn() helper, maybeWelcome(), renderHome icons, chip icon render),
index.html (21-symbol SVG sprite, nav/mode-toggle icons, pt-abbr), assets/css/styles.css
(icon sizing, welcome dialog, compact-topbar ≤600px), assets/js/data/conditions.js
(category icons → sprite keys), PLAN.md, PROGRESS.md.
**Evidence:** logged per-item above; final regression = 12/12 routes render, search 15
results, deep link works, console clean ("No console logs").
**Issues found:** 1 new (mobile topbar clipping — fixed + verified this session);
1 new backlog item (F16).
**Exact next item:** PLAN.md item 4 (F5 text-size control) — **Sonnet, medium effort** —
use the universal prompt template in PLAN.md "Session prompts".

Post-implementation regression (actual output): all 12 routes render (nodes: home 109 …
assessments 1188); search "stroke"→15; deep link #/conditions/dementia → "Dementia /
Alzheimer's" drawer; **console: "No console logs"** (zero errors/warnings).

---

## 2026-07-01 — Phase 2 (numbered plan) — COMPLETE
Owner approved proceeding (directed incremental logging — rule added to header). Item:
convert backlog F1–F15 into the numbered execution plan in PLAN.md. **No code changed.**
- [x] Plan items 1–7 written to PLAN.md (F2, F1, F15, F5, F11+12, F4, F7 — each with files,
      how, verify recipe, risk, rollback where medium+)
- [x] Plan items 8–14 + sequence summary table written (F3, F9, F13, F8, F10-PWA, F6, F14-gated)
- [x] Phase checkboxes updated: Phase 3 next; session 1 = item 1 (F2)

**Files changed:** PLAN.md (Phase 2 section added, ~180 lines), PROGRESS.md (this entry).
**Evidence:** the plan itself — 14 numbered items, each with why/files/how/verify/risk;
1 item gated (F14 Spanish, owner decision); 1 item flagged HIGH risk with a standing rule
(F10 PWA: every later asset-editing session must bump the sw.js CACHE version).
**Issues found:** none new; PWA icon format limitation pre-noted in item 12 (SVG favicon may
degrade install UX on some browsers — acceptable, documented).
**Open questions (unchanged):** F14 Spanish in/out of scope; mobile-first assumption.
**Exact next item:** Phase 3, session 1 — implement PLAN.md **item 1 only** ([F2] clickable
assessment chips in condition drawers), verify per its recipe, log here, stop.

---

## 2026-07-01 — Step 0 (Project Profile) + Phase 1 (Audit) — COMPLETE

**Item completed:** Step 0 self-discovery written to PLAN.md; full Phase 1 audit executed
(output only — **zero code changes**; only PLAN.md + PROGRESS.md were created).

**Files changed:** `PLAN.md` (new), `PROGRESS.md` (new). No app files touched.

**Evidence (actual measured output, via live browser eval on `node .claude/static-server.js`, port 4178):**
```
load: { domContentLoaded: 795ms, loadEvent: 1520ms, assetCount: 12, totalKB: 324 }
journey nav→conditions→drawer: 2 interactions, ~2001ms programmatic (incl. scripted waits)
journey "/"→"dementia"→Enter:  ~3006ms, lands #/conditions with drawer OPEN (best path)
assessChipClickable: false  (cursor:"default")            → finding F2
jargon: containsADL: true, adlIsLink: false               → finding F3
pageHeights: assessments 36,435px · videos 30,643px       → finding F4
textSizeControl: false                                    → finding F5
defaultMode: "clinical", onboardingPresent: false         → finding F1
emojiInChips: 🧠 ✋ 🧒 🫧 🌿 ✦ · navGlyphs: ◆ ❖ ▤ ⬡ ⟲ ⊞   → findings F11/F12
search: "dimentia"→0, "dementia"→3, "strok"→15            → finding F8 (verified, not assumed)
homeHero: "The everyday is extraordinary."                → finding F6
```
Console: no errors during the audit sweep (checked via preview console log, empty).

**What's working (verified, keep):** 324KB/1.5s load; keyboard search→drawer path; 100%
rigor-layer coverage (66 cond / 58 asmt / 16 EBP, adversarially audited); dual mode + plain
language; a11y layer (labels/trap/live-region/combobox — see HANDOFF.md); custom design
system; zero console errors on all 12 routes.

**Issues found:** 15 findings, F1–F15, logged as the backlog in PLAN.md §B with exact
files/components per item. Highest-leverage cluster for "help many": F1 (audience routing),
F2 (dead-end chips), F15 (shareable condition links), F5 (text size), F11/F12 (icon system).

**Open questions (for the human):**
1. Approve backlog + the recommended Phase-2 order? (F2→F1→F15→F5→F11/12→F4→F7→F3→F9→F13→F8→F10→F6→F14)
2. F14 (Spanish track): in or out of scope? It's the single biggest "help many" lever and the
   single biggest lift.
3. Confirm assumption: mobile-first public audience (untestable without usage data).

**Model note (verification integrity):** this session ran on Fable 5 (planning model);
Phase 3 execution sessions are intended for Sonnet 4.6 per the owner — the per-item file
pointers + verification recipes in PLAN.md exist so the executor never needs whole-repo reads.

**Exact next item:** Await approval → Phase 2 session: convert backlog F1–F15 into the
numbered, sequenced plan with before/after time-to-goal, risk level, and rollback per item.
Do NOT begin Phase 2 or touch code before approval.
