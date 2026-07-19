# Build log — The OT Atlas → rigor-first, dual-mode

Upgrade of the existing, verified OT Atlas into a **rigor-first, dual-mode** resource.
In place — **no rebuild**. New file: `assets/js/data/rigor.js`. Modified: `index.html`,
`assets/js/app.js`, `assets/css/styles.css`. All original content/data files untouched.

_Date: 2026-06-24._

---

## 1. What was added

### Phase 1 — Rigor metadata layer (`assets/js/data/rigor.js`)
A single new data file that **attaches** an `evidence` object onto every existing entry at
load (the 701-line `conditions.js` and the others are never edited):

```
evidence = { strength, confidence, bias[], note, sources[], verified }
  strength : strong | moderate | emerging | contested | insufficient
  confidence: high | medium | low      (our confidence in the strength rating)
  bias[]   : western-anglophone | commercial-interest | publication-positive |
             us-funding-assumption | profession-advocacy
  sources[]: [{label, url, type}]      (conditions fall back to their own links)
  verified : true only when ≥1 cited source domain was confirmed real
```

Also exposes: `strengthLevels`, `confidenceLabels`, `biasLabels`, `sourceTypeLabels`,
a cross-cutting `methodology` statement (shown on the EBP page), and Phase-3 `countries`.

### Phase 2 — Dual-mode + filtering UI (`app.js`, `index.html`, `styles.css`)
- **Public ⇄ Clinical** segmented toggle + **Plain-language** toggle in the topbar
  (persisted in `localStorage`; `data-mode` / `data-plain` on `<html>`; re-renders on change).
- **Public mode**: hides practitioner-only nav (framework/models/reasoning/EBP/assessments),
  uses plain-language wording, and in condition drawers leads with plain explainers + the
  "Accessing OT — by country" block instead of dense clinical sourcing.
- **Clinical mode**: full interventions, assessment chips, and the complete evidence block
  (strength + confidence + bias + sources).
- **Evidence-strength filters** on Conditions and Assessments (color-dotted chips).
- Evidence shown inline: mini-badge on condition cards; full badge + note + bias + source
  chips on assessment cards and in drawers; a Strength column + methodology callout on EBP.

### Phase 3 — Country facts (`rigor.js` → rendered on Clients page + public drawers)
US / UK / CA / AU, each **labeled by country**: regulator/licensure, entry-to-practice,
funding/access, how-to-get-started, with a per-country source + confidence + verified flag.
No silent US default.

---

## 2. Coverage (stated honestly)

| Layer | Rated (schema applied) | Sourced | Verified¹ | Contested |
|---|---|---|---|---|
| Conditions | **66 / 66 (100%)** | 100% | **37 / 66 (56%)** | 2 |
| Assessments | **58 / 58 (100%)** | 100% | **50 / 58 (86%)** | 2 |
| EBP landmark findings | **16 / 16 (100%)** | n/a (already cite study kind) | — | 1 |

¹ **`verified`** = "≥1 cited source domain confirmed reachable this session, or a canonical
federal/national authority." It is **decoupled from evidence strength** — a weak-evidence
topic can still have a real, verified source. It is deliberately conservative.

**Verified this session via WebFetch (HTTP 200 / live):** SRALab Rehab Measures, StrokEngine,
HCPC, OrthoInfo/AAOS, CDC, ASHT, NIMH, Arthritis Foundation, OTseeker, CAOT, AOTA, American
Stroke Association, Parkinson's Foundation, National MS Society, Brain Injury Association.
**Treated as canonical despite a bot-block (HTTP 403, real domains):** NINDS, MSKTC, and other
`.gov`/`.nih`/`.va` authorities.

---

## 3. Unverified / flagged (where we surfaced uncertainty, not hid it)

- **MOHO-based assessments (8)** — OPHI-II, MOHOST, OSA, ACIS, VQ, WRI, Role/Interest
  Checklist — cite `moho.uic.edu`, which **refused connection (ECONNREFUSED)** this session,
  so they are `verified:false`. Source likely valid but not confirmed.
- **Australia country fact** — `occupationaltherapyboard.gov.au` returned **HTTP 403** to the
  automated check; marked `verified:false` with a note; facts cross-checked from general
  knowledge. US/UK/CA verified.
- **29 conditions `verified:false`** — their org links (e.g., smaller condition-specific
  charities) were **not re-checked this session**; they were link-checked in the original
  build but we do not relaunder that as "verified" here.
- **Contested (flagged, not presented as fact):**
  - Conditions: **Autism (ASD)**, **Sensory Processing Differences** — Ayres Sensory
    Integration® (manualised/fidelity-controlled) has small-RCT support on individualised
    GAS goals; broader sensory-based intervention and the sensory-processing construct remain
    scientifically contested; SPD is not a stand-alone DSM-5 diagnosis.
  - Assessments: **Sensory Profile 2 / SPM**, **SIPT / EASI** — acceptable reliability but
    contested construct / intervention link; proprietary.
  - EBP: **Ayres Sensory Integration (autism)** finding.
- **Insufficient (role rests on consensus, little condition-specific RCT evidence, 8):**
  ALS, Guillain-Barré, adult brachial plexus, Huntington's, spina bifida/Erb's, muscular
  dystrophy, eating disorders, EDS/hypermobility.
- **Thin/contested-adjacent notes called out in entry text:** routine hip precautions
  (weak/declining evidence); graded exercise in ME/CFS (contested — pacing preferred);
  Functional Capacity Evaluation predictive validity (debated); Allen Cognitive model
  (debated). No fabricated citations anywhere — uncited specifics live in `note`.

---

## 4. Key decisions

1. **Separate `rigor.js`, attach at load** — keeps original data files pristine; the renderer
   reads `entry.evidence` if present. Reversible by removing one `<script>` tag.
2. **`verified` ≠ `strength`** — computed from a confirmed-domain allowlist, so the flag means
   what the schema says (source is real), not "the evidence is good."
3. **Reuse, don't duplicate, sources** — conditions inherit their already-curated links as
   `org` sources; assessments default to the verified SRALab Rehab Measures hub (which
   documents psychometrics for most of these tools) + StrokEngine / MOHO / CAOT where apt.
4. **Default mode = Clinical** — preserves the original verified behavior; Public mode is
   additive and never removes data (routes stay reachable via the toggle/search).
5. **Flag, don't fabricate** — every strength rating is an appraisal carrying its own
   confidence; specific study names live in prose `note`s, linkable sources are real.

---

## 5. Verification (live, zero-console-errors bar)

- All 12 routes render; **zero console errors**, **zero failed network requests** with the
  rigor layer loaded.
- Public⇄Clinical toggle, plain-language toggle, evidence-strength filters (conditions +
  assessments), condition drawers (clinical evidence block + public country access),
  assessment evidence cards, EBP strength table — all verified working in-browser.
- No regression: global search, detail drawers, theme toggle, and all 5 toolkit tools still work.
- An **adversarial multi-agent audit** of the strength/confidence/bias ratings was run
  (see §6).

---

## 6. Rating audit + known gaps

A multi-agent workflow (4 independent OT-evidence/measurement reviewers + a synthesis editor)
adversarially audited all 66 condition and 58 assessment ratings. Result: **5 flags → 2 unique
endorsed corrections; zero condition ratings flagged** (all 66 judged defensible). Both
corrections were applied:

| Entry | Field | Was → Now | Why |
|---|---|---|---|
| Allen Cognitive Level Screen (ACLS) | strength | moderate → **contested** | The note already says the Allen model + predictive validity are "debated" — that's the definition of contested; moderate contradicted its own description. |
| Mini-Mental State Examination (MMSE) | strength | moderate → **strong** | Conflated access/bias limits with evidence quality; MMSE's psychometric literature is among the largest of any cognitive screen — comparable to the MoCA (rated strong). Caveats already carried by its bias tags. |

After fixes, contested assessments = 3 (SP-2/SPM, SIPT/EASI, ACLS).

**Auditor's calibration verdict:** ratings broadly sound, with a coherent directional bias —
*slightly conservative on well-established instruments, slightly generous on model-dependent
ones* — corrected by the principle "rate the psychometric evidence itself; let the bias,
confidence and commercial-interest fields carry the caveats."

### Known gaps / next steps
- Raise the condition `verified` rate above 56% by WebFetch-confirming the ~29 long-tail org
  links (left unverified rather than assumed).
- Confirm MOHO clearinghouse URL (or re-source the 8 MOHO tools) to lift assessment verified
  from 86%.
- Re-confirm the Australia OT Board page through a non-blocked channel.
- Add a few specific systematic-review/guideline deep links (Cochrane/NICE/AOTA) for the
  highest-traffic conditions, beyond entry-level org sources.
- Models/Frames of Reference don't yet carry the `evidence` schema (out of the stated DoD,
  which covers conditions + assessments + EBP); a natural future extension.
