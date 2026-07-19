/* ============================================================
   EVIDENCE-BASED PRACTICE (EBP)
   ============================================================ */
window.OT = window.OT || {};

OT.evidence = {
  intro:
    "Evidence-based practice integrates <strong>the best available research evidence</strong>, the <strong>clinician's expertise</strong>, and the <strong>client's values, goals and circumstances</strong> (within the practice context). It is not ‘cookbook’ care — it's combining good science with skilled, client-centred reasoning.",

  steps: [
    { h: "Ask", t: "Convert an information need into an answerable, focused clinical question — usually in PICO format (Population, Intervention, Comparison, Outcome). A well-built question drives an efficient search." },
    { h: "Acquire", t: "Search efficiently for the best evidence — start with pre-appraised sources (guidelines, systematic reviews, OTseeker, Cochrane) before primary studies; use precise search terms from your PICO." },
    { h: "Appraise", t: "Critically evaluate the evidence for validity (is it true?), impact (how big is the effect?) and applicability (does it fit my client?). Use appraisal tools and consider the level of evidence." },
    { h: "Apply", t: "Integrate the appraised evidence with your clinical expertise and the client's values, preferences and situation to make a shared decision." },
    { h: "Assess", t: "Evaluate the outcome — did it work for this client? Reflect on your own EBP process and adjust. (Sometimes listed as the 5th ‘A’.)" }
  ],

  pico: {
    intro: "PICO turns a vague concern into a searchable question:",
    parts: [
      { l: "P", w: "Population / Problem", e: "adults with chronic stroke and upper-limb hemiparesis" },
      { l: "I", w: "Intervention", e: "constraint-induced movement therapy" },
      { l: "C", w: "Comparison", e: "conventional task practice (or none)" },
      { l: "O", w: "Outcome", e: "improved arm use in daily activities" }
    ],
    example: "In adults with chronic stroke (P), does constraint-induced movement therapy (I) compared with conventional therapy (C) improve functional arm use in ADLs (O)?",
    variants: "Add T for Time, and S for Study design (PICOTS) when you need to specify follow-up or the strongest design."
  },

  levels: {
    intro: "Evidence hierarchies rank designs by how well they control bias. The five Roman-numeral levels below are the historical Sackett-derived hierarchy long used by AOTA. Note that AOTA's current AJOT evidence reviews increasingly report GRADE certainty ratings (high / moderate / low / very low) across a body of evidence rather than a single level:",
    rows: [
      { lvl: "Level I", d: "Systematic reviews, meta-analyses, and high-quality randomised controlled trials (RCTs). Strongest control of bias." },
      { lvl: "Level II", d: "Two-group studies without randomisation (cohort, quasi-experimental)." },
      { lvl: "Level III", d: "One-group, non-randomised studies (pre-post)." },
      { lvl: "Level IV", d: "Descriptive studies — single-subject designs, case series, cross-sectional." },
      { lvl: "Level V", d: "Case reports and expert opinion / narrative reviews." }
    ],
    note: "Higher level ≠ automatically more relevant. A rigorous qualitative study may best answer a question about lived experience; a well-done single-subject design can be highly informative in OT. Match the design to the question — and weigh quality, not just rank. Newer systems (GRADE) rate certainty of evidence across a body of studies."
  },

  databases: [
    { name: "OTseeker", what: "OT Systematic Evaluation of Evidence — free database of systematic reviews and critically-appraised RCTs relevant to OT.", url: "https://www.otseeker.com" },
    { name: "AOTA Evidence-Based Practice & Practice Guidelines", what: "Practice guidelines, systematic-review briefs (formerly CATs), evidence resources and the AJOT evidence series.", url: "https://www.aota.org/practice/practice-essentials/evidencebased-practiceknowledge-translation/practice-guidelines" },
    { name: "Cochrane Library", what: "Gold-standard systematic reviews; many relevant to rehab, stroke, dementia, mental health.", url: "https://www.cochranelibrary.com" },
    { name: "PubMed / MEDLINE", what: "The largest free biomedical literature database (NLM).", url: "https://pubmed.ncbi.nlm.nih.gov" },
    { name: "PEDro", what: "Physiotherapy Evidence Database — RCTs/reviews with quality scores; overlaps with rehab evidence.", url: "https://pedro.org.au" },
    { name: "CINAHL", what: "Cumulative Index to Nursing & Allied Health Literature (subscription).", url: "https://www.ebsco.com" },
    { name: "OT Practice / OTseeker links & university LibGuides", what: "Curated EBP gateways and appraisal resources.", url: "https://www.otseeker.com/Resources/links.aspx" },
    { name: "TRIP / Epistemonikos", what: "Federated search engines for pre-appraised evidence & guidelines.", url: "https://www.tripdatabase.com" }
  ],

  appraisal: [
    { name: "CASP Checklists", what: "Critical Appraisal Skills Programme — free checklists for RCTs, systematic reviews, qualitative and cohort studies.", url: "https://casp-uk.net" },
    { name: "PEDro Scale", what: "11-item scale rating the internal validity of RCTs.", url: "https://pedro.org.au" },
    { name: "GRADE", what: "Framework for rating the certainty of a body of evidence and strength of recommendations.", url: "https://www.gradeworkinggroup.org" },
    { name: "AOTA Critically Appraised Topics method", what: "OT-specific approach to summarising evidence for a clinical question.", url: "https://www.aota.org" }
  ],

  journals: [
    { name: "American Journal of Occupational Therapy (AJOT)", pub: "AOTA — flagship US journal & evidence series.", url: "https://research.aota.org/ajot" },
    { name: "British Journal of Occupational Therapy (BJOT)", pub: "RCOT (SAGE).", url: "https://journals.sagepub.com/home/bjo" },
    { name: "Australian Occupational Therapy Journal", pub: "OT Australia (Wiley).", url: "https://onlinelibrary.wiley.com/journal/14401630" },
    { name: "Canadian Journal of Occupational Therapy (CJOT)", pub: "CAOT (SAGE).", url: "https://journals.sagepub.com/home/cjo" },
    { name: "OTJR: Occupational Therapy Journal of Research", pub: "AOTF (SAGE).", url: "https://journals.sagepub.com/home/otj" },
    { name: "Scandinavian Journal of Occupational Therapy", pub: "Taylor & Francis.", url: "https://www.tandfonline.com/journals/iocc20" },
    { name: "OTITN / Journal of Occupational Science", pub: "Occupational science scholarship.", url: "https://www.tandfonline.com/journals/rocc20" }
  ],

  // Curated landmark / illustrative evidence (topic · finding · source kind)
  keyStudies: [
    { topic: "Constraint-Induced Movement Therapy (stroke UE)", finding: "CIMT increases use of the affected arm in daily life. The landmark EXCITE multi-site RCT (Wolf et al., JAMA 2006) enrolled patients 3–9 months post-stroke (sub-acute) with some preserved wrist/finger movement; Cochrane reviews find more modest, variable benefit in the chronic phase. One of OT's most-replicated upper-limb findings.", kind: "RCT (EXCITE) / Cochrane review", area: "Stroke" },
    { topic: "Occupation/task-specific & repetitive training", finding: "Task-specific, high-repetition functional practice drives motor recovery more than impairment-only approaches (neuroplasticity principle: salient, repetitive practice).", kind: "Systematic reviews", area: "Neuro" },
    { topic: "ADL training after stroke", finding: "OT focused on personal ADL improves performance and reduces deterioration/dependence after stroke.", kind: "Cochrane review (Legg et al.)", area: "Stroke" },
    { topic: "OT in the community for stroke survivors", finding: "Community/home OT improves daily-activity outcomes and participation post-stroke.", kind: "Cochrane review", area: "Stroke" },
    { topic: "Caregiver-focused dementia intervention", finding: "Home OT for people with dementia and their caregivers (e.g., COTiD, Tailored Activity Program) can improve daily function, reduce behavioural symptoms and caregiver burden.", kind: "RCTs (Graff et al. BMJ 2006; Gitlin TAP)", area: "Dementia" },
    { topic: "Home modification & fall prevention", finding: "OT-led home assessment and modification reduces falls in higher-risk older adults; multifactorial OT programs reduce fall rates.", kind: "RCTs / Cochrane (Gillespie et al.)", area: "Geriatrics" },
    { topic: "Lifestyle Redesign® / Well Elderly", finding: "Preventive, occupation-based lifestyle programs improve health, function and quality of life and are cost-effective in community-dwelling elders.", kind: "RCT (Clark et al., JAMA 1997; Well Elderly 2)", area: "Productive aging" },
    { topic: "Ayres Sensory Integration® (autism)", finding: "Manualised, fidelity-controlled ASI shows positive effects on individualised goals (GAS) for autistic children; remains an area of active research and debate.", kind: "RCTs / reviews", area: "Paediatrics" },
    { topic: "CO-OP Approach", finding: "Cognitive Orientation to daily Occupational Performance improves skill acquisition and transfer in children with DCD and adults with acquired brain injury.", kind: "RCTs / reviews", area: "Cognitive" },
    { topic: "Cognitive rehabilitation (TBI/stroke)", finding: "Strategy-based cognitive rehab improves functional outcomes for attention, memory and executive function.", kind: "Systematic reviews", area: "Cognitive" },
    { topic: "OT in mental health & recovery", finding: "Occupation-based and recovery-oriented OT supports symptom management, social/vocational reintegration and quality of life.", kind: "Reviews / RCTs", area: "Mental health" },
    { topic: "Supported employment (IPS)", finding: "Individual Placement & Support helps people with serious mental illness obtain and keep competitive employment — strong evidence base OT contributes to.", kind: "RCTs / meta-analyses", area: "Mental health" },
    { topic: "Energy conservation in MS", finding: "Energy-conservation/fatigue-management programs reduce fatigue impact and improve quality of life in MS.", kind: "RCTs / reviews", area: "Neuro" },
    { topic: "Hand therapy after distal radius fracture / tendon repair", finding: "Protocol-based hand therapy and orthotic management improve ROM and functional outcomes.", kind: "Reviews / RCTs", area: "Hand" },
    { topic: "OT for chronic pain (self-management)", finding: "Activity pacing, graded activity and self-management within multidisciplinary care improve function and participation.", kind: "Reviews", area: "Pain" },
    { topic: "Telehealth OT", finding: "Tele-OT can be effective and acceptable for many populations (e.g., paediatrics coaching, rehab, chronic-condition self-management), expanding access.", kind: "Reviews (post-2020)", area: "Service delivery" }
  ],

  caveat: "These summaries are educational orientation, not a substitute for reading and appraising the current primary literature. Evidence evolves — always check the latest reviews and guidelines (e.g., via OTseeker, Cochrane, AOTA) for your specific question."
};
