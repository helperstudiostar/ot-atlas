# The OT Atlas

**An extensive, evidence-informed guide to Occupational Therapy — for the people who practise it and the people it serves.**

A self-contained, no-build web app. It gathers OT's frameworks, domains, conditions, clinical reasoning, evidence-based practice, assessments, a curated video library, and hands-on interactive tools into one place — designed for **two audiences at once**: practitioners/students and clients/families.

---

## How to open it

**Live:** https://helperstudiostar.github.io/ot-atlas/

Or locally — it's a static site, **no install, no build, no server required**.

- **Easiest:** double-click `index.html` to open it in your browser.
- **Recommended (so external thumbnails/fonts load reliably):** serve the folder locally and visit the URL:

```bash
# from this folder, any one of these works:
python3 -m http.server 4178        # then open http://localhost:4178
npx serve .                         # or
node .claude/static-server.js       # then open http://localhost:4178
```

Works offline (fonts and YouTube thumbnails simply fall back gracefully without a connection).

---

## What's inside

| Section | For whom | Contents |
|---|---|---|
| **Foundations & profession** | everyone | What OT is, OT vs PT/SLP, philosophy, history & founders, roles, education, 15 practice settings |
| **Domain & the OT process** | students/practitioners | The five OTPF‑4 pillars (occupations, client factors, performance skills & patterns, contexts), the OT process, intervention approaches & types |
| **Models & frames of reference** | students/practitioners | 8 occupation‑focused models (MOHO, PEOP, PEO, CMOP‑E, KAWA, EHP, Occupational Adaptation, Occupational Science) + 15 frames of reference |
| **Clinical reasoning** | students/practitioners | 9 reasoning modes, novice→expert, top‑down vs bottom‑up, SOAP documentation, goal frameworks (SMART/COAST/RUMBA/ABCD), a worked case |
| **Evidence‑based practice** | students/practitioners | The 5 steps, PICO, levels of evidence, databases (OTseeker, Cochrane, PubMed, PEDro…), 16 landmark findings, appraisal tools, journals |
| **Conditions library** | both | 66 conditions across the lifespan — each with OT's role, assessments, sample goals, settings, and reputable links |
| **Assessments & measures** | students/practitioners | 58 standardised tools — what each measures, population, notes |
| **Video library** | both | 60+ curated videos & 8 channels organised by topic (real verified links + live topic searches) |
| **For clients & families** | clients/public | “Could OT help?”, what to expect, how to find an OT, self‑management strategies, rights & advocacy |
| **Interactive toolkit** | both | OT self‑screener, COAST/SMART goal writer, PICO builder, activity‑analysis worksheet, energy‑conservation planner |
| **Resources & glossary** | both | Professional organisations + a 58‑term glossary |
| **The OT directory** | both | 148 external resources — YouTube channels, CEU providers, websites, podcasts, orgs, exam prep, communities — each with who runs it, prices, reputation and an honest **bias note** (curated + adversarially verified 2026‑07) |
| **What's changed** | both | A dated bulletin of profession / licensure / evidence / funding changes (2023→, US‑first + global), each note sourced with enacted‑vs‑proposed status |
| **Treatments & protocols** | students/practitioners | 95 interventions & protocols on the atlas's five‑step evidence scale — what each is, trial‑specified doses, what research / practitioners / clients say, training costs, cautions (pending clinician review) |

Plus: a **Public ⇄ Clinical** audience switch and a **plain‑language** toggle; an
**evidence‑rigor layer** — every condition, assessment and EBP finding carries an
evidence‑strength rating (strong → contested → insufficient), a confidence level, bias flags
and sources, all **filterable**; **country‑labelled** licensure & funding facts (US/UK/CA/AU);
**global search** (press `/`), **light/dark themes**, fully responsive, keyboard‑accessible,
and printable tool outputs. See `BUILDLOG.md` for the rigor methodology and coverage stats.

---

## Project structure

```
index.html                 # app shell, nav, search overlay
assets/
  css/styles.css           # "warm clinical craft" design system + theming
  js/
    app.js                 # router, rendering, search, drawers, interactive tools
    data/
      foundations.js       # what OT is, history, profession, OTPF‑4 domain, OT process
      models.js            # models of practice + frames of reference
      reasoning.js         # clinical reasoning, documentation, goals, worked case
      conditions.js        # 51-condition library
      assessments.js       # 41 standardised assessments
      evidence.js          # EBP steps, levels, databases, studies, journals
      videos.js            # curated video library + channels
      resources.js         # orgs, client-facing guidance, glossary
      directory.js         # 148 external resources w/ prices, reputation, bias notes
      bulletin.js          # "What's changed" — dated profession/evidence/licensure log
      interventions.js     # 95 treatments/protocols, evidence-rated + perspectives
      rigor.js             # evidence ratings/sources/bias per entry + country facts (loads last)
.claude/
  launch.json              # preview server config
  static-server.js         # tiny dependency-free static server
```

Content is **data-driven**: each `data/*.js` file populates a global `OT` namespace, and `app.js` renders it. To extend the atlas (add a condition, assessment, video, glossary term), just add an entry to the relevant data file — no other code changes needed.

---

## A note on accuracy & scope

This atlas is an **educational resource, not medical advice**, and not a substitute for individualised care from a licensed/registered occupational therapist. Core content is grounded in the AOTA *Occupational Therapy Practice Framework (OTPF‑4, 2020)*, established OT models, and widely accepted practice. External links point to authoritative bodies (AOTA, WFOT, NBCOT, OTseeker, Cochrane, condition‑specific organisations). Evidence evolves — always appraise the current literature for a specific clinical question.
