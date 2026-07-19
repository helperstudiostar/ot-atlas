/* The OT Atlas — THE STUDENT'S SHELF (#/students, ch. 17). Compiled 2026-07.
   RULES: verified facts only; "as of 2026-07" on fees/figures; unverified items carry
   their flag INLINE — never silently strengthened. */
window.OT = window.OT || {};
OT.studenthub = {
  meta: {
    reviewedOn: "2026-07-19",
    caveat: "Compiled from primary sources (nbcot.org, aota.org, acoteonline.org) where reachable; bls.gov's own pages blocked direct fetch, so pay/employment figures were captured via search excerpts of the exact BLS URLs cited. Fees, pass rates, and BLS figures move — verify at nbcot.org / bls.gov before decisions. Not academic or career advice."
  },
  sections: [
    {
      key: "nbcot",
      title: "The NBCOT exam",
      lede: "What the exam actually looks like, what it costs, and how the pass/retake mechanics really work, as of 2026-07.",
      facts: [
        { h: "Format", body: "Two credentials — OTR and COTA — each a separate 4-hour, computer-based exam via Pearson VUE. Items are mostly single-response multiple-choice plus multi-select scenario sets (informally called 'clinical simulation' items, though that isn't NBCOT's official term). Roughly 170-200 items are presented per exam, with some unscored field-test items mixed in." },
        { h: "Scoring", body: "Criterion-referenced against a fixed competency standard, not curved against other candidates. Raw scores convert to a scaled score of 300-600, with a passing score of 450 for both OTR and COTA, set by subject-matter-expert panels using the Modified Angoff method." },
        { h: "Eligibility", body: "Candidates must graduate from an ACOTE-accredited program and complete all degree requirements, including Level I and Level II fieldwork (plus the doctoral capstone for OTD students), before applying. Minimum fieldwork is 960 hours, and the exam must be taken within 3 years of finishing coursework and fieldwork. International/non-U.S.-accredited-degree candidates go through NBCOT's separate OTED eligibility process." },
        { h: "Cost", body: "As of 2026-07: online initial exam application is $540 ($595 paper); online retake application is $430 ($485 paper). Add-ons include a reissued ATT letter ($115), score transfer ($35), and Early Determination Review ($225). NBCOT's fee schedule does not differentiate OTR from COTA pricing." },
        { h: "ATT window", body: "The Authorization to Test letter is valid for 90 days from issuance, as of 2026-07. A reissue request (another 90 days, $115) must be submitted while the original ATT and exam application are still valid." },
        { h: "Retakes", body: "No cap on the number of attempts. Reported waiting periods are 30 days before a 2nd or 3rd attempt, 60 days for a 4th-6th attempt, and 6 months for a 7th attempt or beyond — sourced from secondary confirmation of NBCOT policy language rather than a clean extraction of the current Cert Exam Handbook PDF, so confirm exact wording there before treating as final. Each retake needs a new application, fee, and ATT letter." },
        { h: "Pass rates", body: "For the 2024 new-graduate cohort, 68% passed on the first attempt and 93% passed overall within a year allowing retakes — but these figures came through search-engine summarization of NBCOT's public data commentary, not a directly-opened NBCOT PDF, and are flagged as needing direct re-verification at nbcot.org. A separately cited 94% national-average figure for 2025 could not be confirmed against a primary source and should be treated as unverified. The gap between first-attempt and eventual pass rates is itself worth knowing: many who don't pass the first time do pass on a retake." },
        { h: "Prep resources", body: "NBCOT's own Aspire platform and paid StudyPack (practice exam, domain MiniTests, 175+ sample questions, flashcards) are the official tools, built from validated practice-analysis domains. AOTA separately offers member exam-prep materials. A claimed free NBCOT exam-prep course could not be independently confirmed as genuinely free rather than a trial — verify current free-vs-paid tiers directly at nbcot.org/study-tools as of 2026-07 before relying on it." },
        { h: "Study timelines", body: "Commonly cited prep windows run 4-6 weeks at the minimum workable end, 8-12 weeks as the more common recommendation, and up to 6 months for some students. A frequently recommended structure: start with a timed practice exam to find weak domains, study 5-6 days/week, then take a second timed practice exam near the end with 1-2 buffer weeks before test day. AOTA recommends using its own Test Prep materials alongside other vendors rather than relying on one source." }
      ],
      sources: [
        { label: "NBCOT — exam foundations & scoring", url: "https://www.nbcot.org/exam-info/foundations", type: "org" },
        { label: "NBCOT — fees", url: "https://www.nbcot.org/fees", type: "org" },
        { label: "NBCOT — eligibility", url: "https://www.nbcot.org/get-certified/eligibility", type: "org" },
        { label: "NBCOT — study tools", url: "https://www.nbcot.org/study-tools", type: "org" }
      ]
    },
    {
      key: "fieldwork",
      title: "Fieldwork & the capstone",
      lede: "How Level I, Level II, and the OTD capstone actually work, what happens if fieldwork goes wrong, and the real costs involved.",
      facts: [
        { h: "Level I vs II", body: "Level I is woven into coursework to introduce client interaction and observation, not to build entry-level competence, and can be supervised by a range of qualified personnel. Level II comes after coursework and is designed to build competent, entry-level generalist practitioners; it must be supervised by an OT or OTA with at least 1 year of post-certification practice experience." },
        { h: "Level II length", body: "Under the 2023 ACOTE Standards, OT students need a minimum of 24 weeks full-time Level II fieldwork covering more than one practice area across no more than 4 settings; OTA students need a minimum of 16 weeks full-time. Placements can run part-time but never below 50% FTE at a given site, and must be completed within 24 months of finishing coursework." },
        { h: "The '12-week norm'", body: "Two sequential 12-week Level II placements is a common way programs split the 24-week OT requirement across two practice areas, but it's a programmatic convention, not an ACOTE-mandated number. The actual ACOTE rule is the 24-week floor plus 'more than one practice area' — how it's divided is up to the program." },
        { h: "The FWPE", body: "AOTA's Fieldwork Performance Evaluation is the standard grading tool for Level II (separate OT and OTA versions), scored on a 4-point scale where 4 is exemplary and 3 is proficient. As of 2026-07, AOTA is/was mid-transition from a subscription-based Formstack delivery model to a royalty-based licensing model (Formstack contract ending August 2025); check AOTA's FWPE page directly for the current edition and pricing, since a form revision could accompany the transition." },
        { h: "If struggling", body: "The documented first step is talking directly with the fieldwork educator and putting concerns and a plan in writing. If problems persist, the Academic Fieldwork Coordinator can put in place a learning contract — an individualized, measurable, collaborative improvement plan." },
        { h: "If it fails", body: "A failed Level II placement is governed by the individual program's own repeat/remediation policy, and any grade dispute follows the school's own grade-appeal process, not an NBCOT or AOTA process. A formal complaint to ACOTE is the route for suspected non-compliance by the program itself, not the student." },
        { h: "Common failure causes", body: "Fieldwork-educator-facing guidance most often cites clear safety concerns, insufficient clinical knowledge, poor time management or work ethic, and — frequently flagged as a root cause — weak communication of clinical reasoning to supervisors." },
        { h: "Cost reality", body: "Level II fieldwork is typically unpaid; students cover their own living expenses, transportation, and onboarding costs (background checks, immunizations, drug screens) even when a placement requires relocation. This unpaid-placement burden — mirrored in fields like social work — is a real budgeting item worth weighing when choosing a program or location." },
        { h: "OTD capstone", body: "Required only for OTD students, in addition to standard Level II fieldwork: a minimum of 14 weeks full-time / 560 hours, with no more than 20% completable off-site and no substituting prior work experience. Its purpose differs from Level II — deep exposure to one specialized area (clinical practice, research, administration, policy, or education) rather than generalist competence." }
      ],
      sources: [
        { label: "ACOTE — FAQ", url: "https://acoteonline.org/frequently-asked-questions/", type: "org" },
        { label: "AOTA — fieldwork FAQs", url: "https://www.aota.org/education/fieldwork/fieldwork-faqs", type: "org" },
        { label: "AOTA — FWPE royalty-model transition", url: "https://www.aota.org/education/fieldwork/fieldwork-performance-evaluation/transition-to-royalty-model-for-aota-fwpe", type: "org" },
        { label: "Colorado State — ACOTE doctoral capstone standards", url: "https://www.chhs.colostate.edu/ot/programs-and-degrees/occupational-therapy-doctorate/doctoral-capstone/acote-doctoral-capstone-standards/", type: "guide" }
      ]
    },
    {
      key: "otvsota",
      title: "OT vs OTA",
      lede: "Two credentials, two scopes of practice, and a well-worn bridge between them — plus why 'supervision' means something different in every state.",
      facts: [
        { h: "Education path", body: "OT requires an entry-level graduate degree (MOT/MSOT or OTD) from an ACOTE-accredited program plus Level I/II fieldwork (and a capstone for OTD). OTA requires an associate degree from an ACOTE-accredited OTA program plus a minimum 16-week Level II fieldwork." },
        { h: "Scope", body: "OTs evaluate clients, write the intervention plan, and remain ultimately responsible for outcomes. OTAs implement the plan under OT supervision; they generally haven't demonstrated competence for evaluation tasks, and in most states evaluation stays an OT-exclusive scope item regardless." },
        { h: "Supervision", body: "Every U.S. state or territory that regulates OT requires an OTA to be supervised by a licensed OT, but the type of supervision required — general vs. direct, in-person vs. telehealth, contact frequency, ratios — varies significantly by state practice act. Check the specific state OT board, not just AOTA's general guidance, before assuming what an OTA can do unsupervised." },
        { h: "Bridge programs", body: "OTA-to-OTR/OTD bridge programs let working COTAs earn an MOT or OTD, often through hybrid formats that let them keep working, typically over 20-28 months depending on the program and prior coursework. Common entry requirements are active COTA certification/license and often 1 year of practice experience." },
        { h: "Pay gap", body: "Per BLS OEWS data (May 2024), OT median pay was $98,340 versus $68,340 for OTA — roughly a $30,000/year (about 44%) gap frequently cited by bridge programs as the financial case for pursuing OTR. These BLS figures were captured via search excerpt of the bls.gov page, not a directly re-opened page, so treat as reasonably solid but not independently re-confirmed." },
        { h: "State-by-state check", body: "Because supervision rules differ by state, students and new grads weighing an OTA role — or an OT considering how much they can delegate — should verify current requirements with the specific state licensing board before relying on general national guidance." }
      ],
      sources: [
        { label: "AOTA — supervision requirements", url: "https://www.aota.org/career/state-licensure/supervision-requirements", type: "org" },
        { label: "USAHS — OT vs OTA", url: "https://www.usa.edu/blog/ot-vs-ota/", type: "guide" },
        { label: "OT Mastery — OTA to OTR bridge programs", url: "https://www.otmastery.com/resources/ota-to-otrbridge-programs", type: "guide" },
        { label: "BLS OEWS 29-1122 — occupational therapists", url: "https://www.bls.gov/oes/current/oes291122.htm", type: "gov" }
      ]
    },
    {
      key: "careers",
      title: "Careers & pay",
      lede: "Pay, growth, and setting trade-offs for OT and OTA careers — mostly BLS-sourced, though BLS's own pages blocked direct verification, so treat exact figures as needing a manual double-check.",
      facts: [
        { h: "OT pay", body: "BLS OEWS May 2024 data put occupational therapist median annual wage at $98,340, with the middle 50% earning roughly $80,490-$110,460 (10th percentile under $67,090; 90th over $129,830)." },
        { h: "OT jobs & outlook", body: "About 160,000 OT jobs existed in 2024; BLS projects 14% employment growth (much faster than average) through 2034, with about 10,200 annual openings, driven substantially by the aging population's rising need for daily-living support." },
        { h: "OTA pay", body: "BLS OEWS May 2024 data put OTA median annual wage at $68,340 (10th percentile under $49,070; 90th over $86,930). A separate, lower-credential 'OT aide' role held about 5,200 jobs alongside roughly 49,200 OTA jobs in the same BLS category." },
        { h: "OTA jobs & outlook", body: "BLS projects 18% growth for the combined OTA-and-aide category through 2034, with about 7,900 annual openings. The access caveat above (search-excerpt sourcing, not a directly re-opened bls.gov page) applies to all BLS figures in this section." },
        { h: "Where OTs work", body: "Employment-share figures commonly cited — hospitals about 28%, OT/PT offices and outpatient clinics about 27%, schools about 13%, home health about 8%, nursing facilities about 7% — come from secondary aggregation of BLS industry tables, not a directly-fetched BLS page; treat as directional pending direct verification." },
        { h: "Pay by setting", body: "Directionally consistent across multiple practitioner sources, not BLS-exact: skilled nursing facilities and home health tend to pay the most, often clearing six figures for OTs, with productivity trade-offs; schools tend to pay less (commonly cited in the low-to-mid $80,000s) but offer school-calendar time off; acute care/hospitals fall in between." },
        { h: "Productivity reality", body: "Ethical/reasonable SNF productivity targets are commonly cited around 80% for OTs and 85% for COTAs, while some for-profit contract rehab companies reportedly push 85-90%+ for OTs and 95-100%+ for COTAs — a real quality-of-work-life difference worth asking about directly in interviews. This is practitioner-blog-level sourcing, not BLS data." },
        { h: "New-grad norms", body: "SNFs are a common first job for new grads because of relatively higher pay, despite productivity pressure; many new-grad OT salaries are cited in the $60,000s as a starting figure — a broad, non-BLS, practitioner-blog citation, since BLS doesn't publish an entry-level-specific wage. Shadowing a setting and directly asking staff about real productivity expectations before accepting an offer is repeatedly documented advice." },
        { h: "Travel OT pay", body: "2026 travel OT weekly gross packages are commonly cited in the $2,100-$3,300/week range, with some crisis/high-need contracts reaching $3,000-$3,500+/week; these are staffing-agency-sourced figures, not BLS data (BLS doesn't break out travel/contract pay separately). A meaningful share is tax-free housing/meal stipends, which is why take-home can exceed an equivalent staff salary — contingent on maintaining a genuine tax home under IRS rules." }
      ],
      sources: [
        { label: "BLS OEWS 29-1122 — occupational therapists", url: "https://www.bls.gov/oes/current/oes291122.htm", type: "gov" },
        { label: "BLS OEWS 31-2011 — occupational therapy assistants", url: "https://www.bls.gov/oes/current/oes312011.htm", type: "gov" },
        { label: "BLS OOH — occupational therapists", url: "https://www.bls.gov/ooh/healthcare/occupational-therapists.htm", type: "gov" },
        { label: "MyOTSpot — working in a SNF", url: "https://www.myotspot.com/tips-for-working-in-a-skilled-nursing-facility/", type: "guide" }
      ]
    }
  ]
};
