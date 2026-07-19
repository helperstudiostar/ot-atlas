/* ============================================================
   RIGOR LAYER — epistemic metadata + country facts
   Attaches an `evidence` object onto each condition & assessment,
   and exposes taxonomies + Phase-3 country access/funding facts.

   evidence = { strength, confidence, bias[], note, sources[], verified }
     strength    : strong | moderate | emerging | contested | insufficient
     confidence  : high | medium | low   (our confidence in the strength rating)
     bias[]      : keys into OT.rigor.biasLabels
     sources[]   : [{label, url, type}]  (conditions fall back to their links)
     verified    : true only when the cited sources are confirmed real
   Ratings are appraisals of the OT evidence base, not claims of certainty.
   ============================================================ */
window.OT = window.OT || {};

OT.rigor = {
  /* Cross-cutting honesty statement shown in the UI */
  methodology:
    "Evidence ratings below appraise the OT literature for each topic — they are judgements, not certainties, and each carries our confidence in it. The field's evidence base skews <strong>Western/Anglophone</strong>, is shaped by <strong>professional advocacy</strong> and <strong>commercial interests</strong> (assessment publishers, equipment vendors, course sellers), and—like most rehab research—by <strong>publication bias</strong> toward positive results. Funding/access facts are <strong>country-specific</strong>; we label the country rather than defaulting to the US. Always appraise the current primary literature for a specific clinical question.",

  strengthLevels: [
    { key: "strong",       label: "Strong",       tone: "teal",  desc: "Multiple good-quality RCTs / systematic reviews converge on benefit." },
    { key: "moderate",     label: "Moderate",     tone: "sage",  desc: "Reasonable supporting evidence; some RCTs/reviews, with limits." },
    { key: "emerging",     label: "Emerging",     tone: "ochre", desc: "Early or mixed evidence; promising but not yet established." },
    { key: "contested",    label: "Contested",    tone: "clay",  desc: "Evidence is debated or conflicting; claims outpace the data." },
    { key: "insufficient", label: "Insufficient", tone: "plum",  desc: "Little condition-specific research; role rests largely on consensus/practice." }
  ],
  confidenceLabels: { high: "High confidence", medium: "Medium confidence", low: "Low confidence" },
  biasLabels: {
    "western-anglophone":     "Western/Anglophone framework dominance",
    "commercial-interest":    "Commercial interest (publishers, vendors, course sellers)",
    "publication-positive":   "Publication bias toward positive results",
    "us-funding-assumption":  "US-centric funding assumptions",
    "profession-advocacy":    "Shaped by professional advocacy, not evidence"
  },
  sourceTypeLabels: {
    guideline: "Guideline", "systematic-review": "Systematic review", RCT: "RCT", org: "Organisation", textbook: "Textbook", database: "Evidence database"
  },

  /* ---- Phase 3: country-specific licensure + funding/access ---- */
  countries: [
    { code: "US", flag: "🇺🇸", name: "United States",
      regulator: "State licensure + NBCOT certification (OTR®/COTA®)",
      entry: "Entry-level master's or doctorate (OTD); OTA = associate degree",
      funding: "Medicare (Parts A/B), Medicaid, private insurance, schools (IDEA), VA — usually needs a physician referral/order",
      access: "Ask your physician for a referral and verify coverage with your insurer; school-based OT runs through an IEP/504 plan.",
      confidence: "high", verified: true,
      source: { label: "AOTA", url: "https://www.aota.org", type: "org" } },
    { code: "UK", flag: "🇬🇧", name: "United Kingdom",
      regulator: "HCPC registration (protected title); RCOT professional body",
      entry: "Pre-registration BSc/MSc; degree-apprenticeship routes exist",
      funding: "Free at the point of use via the NHS; also social care and schools; private practice available",
      access: "Via GP or hospital referral, or your local authority; some NHS and social-care services accept self-referral.",
      confidence: "high", verified: true,
      source: { label: "HCPC", url: "https://www.hcpc-uk.org", type: "org" } },
    { code: "CA", flag: "🇨🇦", name: "Canada",
      regulator: "Provincial/territorial regulatory colleges; CAOT professional body",
      entry: "Entry-level master's in most provinces",
      funding: "Public coverage varies by province (often hospital/home-care based); private & extended-health insurance; WSIB/auto-insurance for injuries",
      access: "Public OT via hospital or home-care referral; private OT is often self-referral — check your province's coverage.",
      confidence: "high", verified: true,
      source: { label: "CAOT", url: "https://www.caot.ca", type: "org" } },
    { code: "AU", flag: "🇦🇺", name: "Australia",
      regulator: "Registration with the Occupational Therapy Board of Australia (AHPRA)",
      entry: "Accredited bachelor's or master's degree",
      funding: "NDIS (disability), Medicare CDM/chronic-disease plans (a few subsidised sessions), private health insurance, My Aged Care, DVA",
      access: "A GP can refer you via a Chronic Disease Management plan; NDIS participants use their plan; private practice is self-referral.",
      confidence: "medium", verified: false,
      note: "OT Board domain returned HTTP 403 to our automated check; facts cross-checked from general knowledge — confirm current NDIS/Medicare rules.",
      source: { label: "OT Board of Australia (AHPRA)", url: "https://www.occupationaltherapyboard.gov.au", type: "org" } }
  ],

  /* Reusable canonical, verified source hubs */
  _src: {
    sralab:  { label: "Shirley Ryan AbilityLab — Rehab Measures", url: "https://www.sralab.org/rehabilitation-measures", type: "database" },
    cochrane:{ label: "Cochrane Library", url: "https://www.cochranelibrary.com", type: "systematic-review" },
    otseeker:{ label: "OTseeker (appraised OT evidence)", url: "https://www.otseeker.com", type: "database" },
    strokeng:{ label: "StrokEngine", url: "https://strokengine.ca", type: "database" },
    moho:    { label: "MOHO Web (UIC Clearinghouse)", url: "https://moho.uic.edu", type: "org" }
  }
};

/* ---- helper to build evidence objects tersely ---- */
(function () {
  var R = OT.rigor;
  function ev(strength, confidence, bias, note, sources, unverified) {
    return { strength: strength, confidence: confidence, bias: bias || [], note: note,
             sources: sources || [], verified: !unverified };
  }
  R._ev = ev;
  var S = R._src;

  /* =========================================================
     CONDITIONS — keyed by condition id. Sources fall back to the
     entry's own (already link-checked) links; `note` names the key
     literature. Ratings appraise OT's evidence for that condition.
     ========================================================= */
  R.conditions = {
    /* neuro / physical */
    stroke:        ev("strong","high",["publication-positive"],"Task-specific & repetitive training, CIMT (in selected patients with preserved wrist/finger movement) and ADL training are among OT's most replicated findings (Cochrane; EXCITE RCT 2006). Effect sizes vary by phase and selection.",[S.strokeng,S.cochrane]),
    tbi:           ev("moderate","medium",["publication-positive"],"Strategy-based cognitive rehabilitation (attention/memory/executive) has moderate support; much of TBI OT is individualised and practice-based.",[S.cochrane]),
    sci:           ev("moderate","medium",[],"Level-specific ADL retraining, adaptive equipment and seating have reasonable support; many techniques rest on rehab consensus rather than RCTs.",[]),
    ms:            ev("moderate","medium",[],"Energy-conservation / fatigue-management programs reduce fatigue impact and improve QoL (RCTs); effects are real but modest.",[S.cochrane]),
    parkinsons:    ev("moderate","medium",[],"OT in Parkinson's improved self-perceived performance in a large RCT (Sturkenboom et al., Lancet Neurology 2014); a guideline exists, though effect sizes are modest.",[]),
    als:           ev("insufficient","low",["profession-advocacy"],"OT's role is largely supportive/palliative and consensus-driven; little ALS-specific RCT evidence for OT.",[],true),
    gbs:           ev("insufficient","low",["profession-advocacy"],"Rehab principles are extrapolated from other neuro populations; sparse GBS-specific OT evidence.",[],true),
    amputation:    ev("moderate","medium",[],"Prosthetic training and pre-prosthetic conditioning have moderate/practice-based support; outcomes depend heavily on fit and goals.",[]),
    burns:         ev("moderate","medium",[],"Scar management, ROM, positioning and orthoses are standard with moderate evidence; pressure-garment effectiveness is debated.",[]),
    ortho:         ev("moderate","medium",[],"ADL retraining and equipment after arthroplasty/fracture help function; routine hip precautions show weak evidence and are increasingly questioned.",[]),
    lbp:           ev("moderate","medium",["publication-positive"],"Graded activity, activity pacing and self-management within multidisciplinary care improve function; passive modalities are not supported.",[S.cochrane]),
    concussion:    ev("moderate","medium",[],"Active management — vision/vestibular, graded return-to-activity, sleep & cognitive strategies — is increasingly supported; prolonged rest is discouraged.",[]),
    "peripheral-neuropathy": ev("emerging","low",[],"Sensory re-education, protective strategies and adaptive equipment are reasonable; condition-specific OT evidence is limited.",[],true),
    "bells-palsy": ev("emerging","low",[],"Facial neuromuscular retraining shows some promise in small studies; OT-specific evidence is limited.",[],true),
    "brachial-plexus-adult": ev("insufficient","low",["profession-advocacy"],"Mostly surgical/PT-led with OT supporting ADL and orthoses; little OT-specific evidence.",[],true),
    huntingtons:   ev("insufficient","low",["profession-advocacy"],"OT role is supportive (function, safety, routine); very limited condition-specific evidence.",[],true),
    "post-icu":    ev("emerging","low",[],"Early rehabilitation and cognitive/functional intervention for PICS is a growing area with mixed but promising evidence.",[],true),

    /* hand */
    ctsyn:         ev("moderate","medium",[],"Night orthoses give short-term symptom relief (Cochrane); nerve/tendon gliding and activity modification are adjuncts; severe cases are surgical.",[S.cochrane]),
    tendon:        ev("moderate","medium",[],"Early controlled-motion protocols and orthotic management improve outcomes after tendon repair; protocol choice matters.",[]),
    "ra-oa-hand":  ev("moderate","medium",[],"Joint protection education (RA; Hammond) and thumb-CMC orthoses (OA) have moderate support for pain/function.",[]),
    crps:          ev("emerging","low",[],"Graded motor imagery and mirror therapy show some benefit in small trials; the overall CRPS evidence base is limited and mixed.",[],true),
    epicondylitis: ev("moderate","medium",[],"Orthoses, activity modification and exercise help; evidence is mixed and many cases resolve over time regardless.",[]),
    dupuytren:     ev("moderate","medium",[],"Post-procedure hand therapy and orthoses support ROM; evidence is moderate and procedure-dependent.",[]),
    "wrist-fx":    ev("moderate","medium",[],"Therapy and orthotic management after distal radius fracture improve ROM/function; supervised vs home programs show similar results in some trials.",[]),
    "rotator-cuff":ev("moderate","medium",[],"Structured post-operative and conservative protocols improve shoulder function; timelines are protocol-specific.",[]),

    /* paediatrics */
    asd:           ev("contested","low",["commercial-interest","publication-positive","profession-advocacy"],"Manualised, fidelity-controlled Ayres Sensory Integration® shows positive effects on individualised (GAS) goals in small RCTs, but broader 'sensory-based' interventions and the sensory-processing construct remain scientifically contested. Naturalistic developmental behavioural interventions have stronger evidence.",[S.otseeker]),
    adhd:          ev("emerging","low",["publication-positive"],"OT supports organisation, routines and participation; sensory/motor interventions for ADHD are weak, while CO-OP and skills-based approaches are more promising.",[],true),
    spd:           ev("contested","low",["commercial-interest","profession-advocacy"],"'Sensory processing disorder' is not a stand-alone DSM-5 diagnosis, and the evidence for sensory-integration therapy and weighted/brushing protocols is contested. OT can still help participation via individualised, functional approaches.",[],true),
    cp:            ev("moderate","medium",[],"Goal-directed/functional training, bimanual therapy and CIMT for hemiplegic CP have good support; passive, impairment-only approaches are weaker.",[S.cochrane]),
    dcd:           ev("moderate","medium",[],"Task-oriented approaches — especially CO-OP — have solid support for skill acquisition and transfer in DCD; process-oriented (sensory/perceptual-motor) approaches are weaker.",[]),
    downs:         ev("emerging","low",[],"OT supports motor, self-care and participation; evidence is largely developmental/practice-based rather than condition-specific RCTs.",[],true),
    ddelay:        ev("emerging","low",[],"Developmental and family-centred/coaching care for at-risk infants (incl. NICU) is reasonable; evidence is mixed across outcomes.",[],true),
    handwriting:   ev("emerging","low",["publication-positive"],"Handwriting-specific and task-based practice produce modest gains; many programs are commercial with limited independent replication.",[],true),
    feeding:       ev("emerging","low",[],"Paediatric feeding intervention is often practice-based; responsive/structured approaches help, but high-quality OT-specific evidence is limited.",[],true),
    "spina-bifida":ev("insufficient","low",["profession-advocacy"],"OT supports self-care, UE function and AT; condition-specific OT evidence is sparse (grouped here with Erb's palsy).",[],true),
    torticollis:   ev("moderate","medium",[],"Early repositioning, stretching and parent education resolve most congenital muscular torticollis; usually PT-led with OT involvement.",[]),
    cvi:           ev("emerging","low",[],"CVI-specific intervention (environmental adaptation, structured visual approaches) is an emerging, individualised area with limited controlled evidence.",[],true),
    "muscular-dystrophy": ev("insufficient","low",["profession-advocacy"],"OT supports function, orthoses and AT across a progressive course; little OT-specific RCT evidence.",[],true),

    /* mental health */
    depression:    ev("moderate","medium",[],"Behavioural activation, occupation/routine-based and recovery-oriented OT support engagement and mood; OT typically works within a broader care model.",[]),
    anxiety:       ev("moderate","medium",[],"Graded exposure-aligned, routine and self-regulation strategies help; OT-specific evidence is moderate and often embedded in CBT-style care.",[]),
    schizophrenia: ev("moderate","medium",[],"Individual Placement & Support (supported employment) has strong evidence OT contributes to; cognitive remediation and social-skills work add moderate benefit.",[]),
    bipolar:       ev("emerging","low",[],"Routine regulation (sleep/wake, social rhythms) and relapse self-management are reasonable; OT-specific evidence is limited.",[],true),
    ptsd:          ev("emerging","low",[],"OT's role in trauma (regulation, participation, sleep, return-to-role) is growing but has limited controlled evidence.",[],true),
    sud:           ev("emerging","low",[],"Occupation-based routine rebuilding and relapse-prevention skills are reasonable adjuncts; OT-specific evidence is limited.",[],true),
    eating:        ev("insufficient","low",["profession-advocacy"],"OT contributes to multidisciplinary care (routine, body-image-sensitive participation); condition-specific OT evidence is minimal.",[],true),
    "postpartum-mh": ev("emerging","low",[],"OT supports role transition, routine and participation in perinatal mental health; an emerging area with little controlled evidence.",[],true),
    bpd:           ev("emerging","low",[],"DBT-informed skills, emotion regulation and meaningful-routine work are reasonable; OT-specific evidence is emerging.",[],true),

    /* geriatrics */
    dementia:      ev("moderate","medium",[],"Home OT for people with dementia and carers (COTiD; Tailored Activity Program) improved daily function and reduced behavioural symptoms and carer burden in RCTs; replication across settings is mixed.",[S.cochrane]),
    lowvision:     ev("moderate","medium",[],"Low-vision rehabilitation (problem-solving therapy, adaptive strategies, environment) improves function and reduces disability in RCTs.",[]),
    falls:         ev("strong","high",[],"OT-led home assessment and modification reduces falls in higher-risk older adults; multifactorial programs reduce fall rates (Cochrane; Gillespie).",[S.cochrane]),
    "aging-place": ev("moderate","medium",[],"Home modification and CAPABLE-style programs improve safety, function and independence at home with reasonable evidence.",[]),
    driving:       ev("moderate","medium",[],"Driving assessment and rehabilitation (incl. on-road evaluation) supports safe mobility decisions; evidence is moderate and assessment-heavy.",[]),
    "arthritis-gen": ev("moderate","medium",[],"Joint protection, self-management education and assistive devices improve pain and function across arthritic conditions.",[]),
    "hip-fracture":ev("moderate","medium",[],"Post-fracture ADL retraining, equipment and home assessment support recovery; enhanced/extended OT shows some benefit in trials.",[]),

    /* specialty */
    cancer:        ev("moderate","medium",[],"Cancer rehabilitation — fatigue management, function, return-to-activity, lymphoedema care — has growing supportive evidence.",[]),
    lymphedema:    ev("moderate","medium",["commercial-interest"],"Complete Decongestive Therapy is standard with moderate support; the relative contribution of each component (e.g., manual lymphatic drainage) is debated.",[]),
    "cardiac-pulm":ev("moderate","medium",[],"Energy conservation, ADL retraining and participation within cardiac/pulmonary rehab are supported; OT works inside a team model.",[]),
    diabetes:      ev("emerging","low",[],"OT self-management, habit and vision/neuropathy-aware adaptation is an emerging role with limited OT-specific evidence.",[],true),
    "chronic-fatigue": ev("emerging","low",["publication-positive"],"Activity pacing and energy management are widely used for fatigue and Long COVID; graded exercise is contested in ME/CFS and not recommended as a cure.",[],true),
    vestibular:    ev("moderate","medium",[],"Vestibular rehabilitation is effective for many causes of dizziness; it is often PT-led with OT addressing participation and visual/occupational demands.",[S.cochrane]),
    "work-rehab":  ev("moderate","medium",[],"Work conditioning, ergonomics and return-to-work coordination help; Functional Capacity Evaluation has debated predictive validity.",[]),
    idd:           ev("emerging","low",[],"OT supports daily living, AT and community participation for adults with IDD; mostly practice-based evidence.",[],true),
    wheelchair:    ev("moderate","medium",[],"Seating & mobility assessment and provision improve posture, function and pressure-injury risk with reasonable evidence.",[]),
    palliative:    ev("emerging","low",["profession-advocacy"],"OT supports comfort, meaningful occupation, fatigue and dignity at end of life; valued in practice with limited controlled evidence.",[],true),
    fibromyalgia:  ev("emerging","low",["publication-positive"],"Pacing, self-management and graded activity give modest benefit within multidisciplinary care.",[],true),
    "eds-hypermobility": ev("insufficient","low",["profession-advocacy"],"Joint protection, pacing and adaptive strategies are reasonable; OT-specific evidence is minimal.",[],true)
  };

  /* =========================================================
     ASSESSMENTS — keyed by name. Strength = quality of the tool's
     evidence (psychometrics + clinical utility). Default source is
     the verified SRALab Rehab Measures hub unless noted.
     ========================================================= */
  function asmt(strength, confidence, bias, note, source) {
    return ev(strength, confidence, bias, note, [source || S.sralab]);
  }
  R.assessments = {
    "Canadian Occupational Performance Measure": asmt("strong","high",["western-anglophone"],"Extensively validated, responsive, client-centred; operationalises CMOP-E. Self-report depends on insight.",{ label:"CAOT — COPM", url:"https://www.caot.ca", type:"org" }),
    "Occupational Performance History Interview-II": asmt("moderate","medium",[],"MOHO narrative interview with acceptable validity; rich but time-intensive and interviewer-dependent.",S.moho),
    "Model of Human Occupation Screening Tool": asmt("moderate","medium",[],"Broad MOHO screen with reasonable psychometrics; useful in mental health.",S.moho),
    "Occupational Self-Assessment": asmt("moderate","medium",[],"Client-report competence/values tool (MOHO); good for goal-setting, modest responsiveness data.",S.moho),
    "Role Checklist": asmt("moderate","medium",[],"Simple roles inventory with adequate reliability; limited depth.",S.moho),
    "Interest Checklist": asmt("emerging","low",[],"Useful clinically but with dated norms and limited modern psychometrics.",S.moho),
    "Assessment of Communication & Interaction Skills": asmt("moderate","medium",[],"Observational MOHO social-skills measure; needs rater training.",S.moho),
    "Assessment of Motor & Process Skills": asmt("strong","high",["commercial-interest"],"Rasch-calibrated, strong psychometrics; requires paid calibration training, limiting access.",null),
    "Functional Independence Measure": asmt("strong","high",["commercial-interest"],"Widely validated disability/burden-of-care measure; proprietary (UDSMR) and shows ceiling effects.",null),
    "Barthel Index": asmt("strong","high",[],"Classic, well-validated basic-ADL index; ceiling effects and coarse gradations limit sensitivity.",null),
    "Katz / Lawton IADL Scales": asmt("moderate","medium",[],"Long-standing ADL/IADL screens; useful but dated and fairly coarse.",null),
    "Performance Assessment of Self-Care Skills": asmt("moderate","medium",[],"Performance-based, ecologically valid; administration is time-intensive.",null),
    "Montreal Cognitive Assessment": asmt("strong","high",["western-anglophone","commercial-interest"],"Good sensitivity for mild cognitive impairment; now requires training/certification, and education/language/cultural bias is documented — interpret cut-offs cautiously.",null),
    "Mini-Mental State Examination": asmt("strong","high",["commercial-interest","western-anglophone"],"One of the most extensively validated cognitive screens; its real drawbacks are access/bias (copyright restriction, ceiling effects, education/cultural bias) — captured by the bias tags — not weak evidence.",null),
    "Allen Cognitive Level Screen": asmt("contested","low",["profession-advocacy"],"Quick functional-cognition screen popular in OT, but the underlying Allen Cognitive Disabilities Model and the screen's predictive/ecological validity are genuinely debated in the literature.",null),
    "Executive Function Performance Test": asmt("moderate","medium",[],"Performance-based executive measure with growing validity evidence; observation-based scoring.",null),
    "A-ONE (Árnadóttir OT-ADL Neurobehavioral Eval)": asmt("moderate","medium",[],"Links ADL observation to neurobehavioural impairments; needs certification training.",null),
    "Nine-Hole Peg Test": asmt("strong","high",[],"Excellent reliability and normative data for fine-motor dexterity; quick and inexpensive.",null),
    "Box & Blocks Test": asmt("strong","high",[],"Reliable, normed gross manual dexterity measure; widely used in neuro rehab.",null),
    "Jebsen-Taylor Hand Function Test": asmt("moderate","medium",[],"Timed functional-hand battery with good reliability; some items dated.",null),
    "Grip & Pinch Dynamometry": asmt("strong","high",[],"Standardised (e.g., Jamar) with normative data and strong reliability when protocol is followed.",null),
    "DASH / QuickDASH": asmt("strong","high",[],"Well-validated, responsive upper-limb PRO; QuickDASH is a shorter validated form.",null),
    "Fugl-Meyer Assessment (UE)": asmt("strong","high",[],"Gold-standard post-stroke motor-impairment measure with excellent psychometrics.",S.strokeng),
    "Goniometry / Manual Muscle Testing": asmt("moderate","medium",[],"Core clinical measures; reliability varies by joint, technique and examiner.",null),
    "Sensory Profile 2 / Sensory Processing Measure": asmt("contested","low",["commercial-interest","profession-advocacy"],"Caregiver questionnaires with acceptable reliability, but the sensory-processing construct and the link from profiles to effective intervention are contested; proprietary (Pearson/WPS).",null),
    "Sensory Integration & Praxis Tests / EASI": asmt("contested","low",["commercial-interest","profession-advocacy"],"SIPT is proprietary and being superseded by the open EASI; the sensory-integration construct it measures remains contested.",null),
    "Beery-Buktenica Visual-Motor Integration": asmt("moderate","medium",["commercial-interest"],"Normed visual-motor integration test with decent psychometrics; proprietary.",null),
    "Motor-Free Visual Perception Test": asmt("moderate","medium",["commercial-interest"],"Isolates visual perception from motor demand; clinical interpretation is debated.",null),
    "Berg Balance Scale": asmt("strong","high",[],"Extensively validated static/dynamic balance scale; some ceiling effect in higher-functioning adults.",null),
    "Timed Up & Go": asmt("strong","high",[],"Quick, reliable mobility/fall-risk screen with normative cut-offs.",null),
    "Tinetti POMA": asmt("moderate","medium",[],"Balance-and-gait scale; useful but with some psychometric and ceiling limitations.",null),
    "Falls Efficacy Scale-International": asmt("strong","high",[],"Well-validated measure of concern about falling across cultures.",null),
    "Pediatric Evaluation of Disability Inventory-CAT": asmt("strong","high",["commercial-interest"],"Computer-adaptive function measure with strong psychometrics; proprietary.",null),
    "Bruininks-Oseretsky Test of Motor Proficiency-2": asmt("strong","high",["commercial-interest"],"Normed motor-proficiency battery; proprietary and time-intensive.",null),
    "Peabody Developmental Motor Scales-2": asmt("moderate","medium",["commercial-interest"],"Normed early-childhood motor scales; proprietary, with some norm-age limits.",null),
    "School Function Assessment": asmt("moderate","medium",[],"Criterion-referenced school-participation measure; useful but rater-intensive.",null),
    "Miller Function & Participation Scales / Movement ABC-2": asmt("moderate","medium",["commercial-interest"],"MABC-2 is a standard for identifying DCD with good psychometrics; proprietary.",null),
    "Goal Attainment Scaling": asmt("moderate","medium",[],"Individualised, responsive method; scaling quality and inflation risk depend on the clinician.",null),
    "Kohlman Evaluation of Living Skills": asmt("moderate","medium",[],"Quick living-skills screen common in mental health; some items dated.",null),
    "Independent Living Scales": asmt("moderate","medium",["commercial-interest"],"Standardised functional-competence measure; proprietary.",null),
    "Volitional Questionnaire": asmt("moderate","medium",[],"Observational MOHO motivation measure for clients with limited verbal report.",S.moho),
    "Reintegration to Normal Living Index": asmt("moderate","medium",[],"Brief participation/reintegration measure with adequate validity.",null),
    "Worker Role Interview": asmt("moderate","medium",[],"Psychosocial return-to-work predictor (MOHO); moderate evidence.",S.moho),
    "Patient-Specific Functional Scale": asmt("strong","high",[],"Individualised, highly responsive function measure validated across many conditions.",null),
    "Action Research Arm Test": asmt("strong","high",[],"Validated, responsive UE function measure widely used after stroke.",S.strokeng),
    "Wolf Motor Function Test": asmt("strong","high",[],"Reliable timed/quality UE motor measure used in CIMT trials.",S.strokeng),
    "Chedoke Arm & Hand Activity Inventory": asmt("moderate","medium",[],"Functional bilateral UE measure with good post-stroke evidence.",S.strokeng),
    "Modified Ashworth Scale": asmt("moderate","low",[],"Ubiquitous spasticity grade, but inter-rater reliability is limited and it conflates tone with resistance.",null),
    "Purdue Pegboard Test": asmt("moderate","medium",[],"Normed fine-motor/dexterity test; quick, with some norm-age limits.",null),
    "Stroke Impact Scale 3.0": asmt("strong","high",[],"Validated stroke-specific health-related quality-of-life and function PRO.",S.strokeng),
    "Loewenstein OT Cognitive Assessment": asmt("moderate","medium",[],"OT cognitive battery (LOTCA) with reasonable validity for neuro populations.",null),
    "Rivermead Behavioural Memory Test": asmt("moderate","medium",["commercial-interest"],"Ecologically oriented memory test; proprietary.",null),
    "Trail Making Test": asmt("strong","high",[],"Well-normed measure of attention/processing speed (A) and set-shifting (B).",null),
    "Activities-specific Balance Confidence Scale": asmt("strong","high",[],"Validated, responsive balance-confidence measure.",null),
    "Mini-BESTest": asmt("strong","high",[],"Psychometrically strong dynamic-balance measure spanning balance systems.",null),
    "Semmes-Weinstein Monofilament Test": asmt("moderate","medium",[],"Standard tactile/protective-sensation testing; reliability depends on technique.",null),
    "Test of Visual Perceptual Skills (4th Ed.)": asmt("moderate","medium",["commercial-interest"],"Normed motor-reduced visual-perception battery; proprietary.",null),
    "Test of Playfulness": asmt("emerging","low",[],"Observational play measure with limited but growing psychometric support.",null)
  };

  /* =========================================================
     VERIFICATION — `verified` means "≥1 cited source domain was
     confirmed reachable this session, or is a canonical federal/
     national authority." It is decoupled from evidence STRENGTH
     (a weak-evidence topic can still have a real, verified source).
     Confirmed via WebFetch this session (200/redirect/live) or
     canonical gov authority (some bot-block automated fetches).
     ========================================================= */
  R._confirmed = [
    // OT/evidence + profession hubs
    "sralab.org", "strokengine.ca", "cochranelibrary.com", "otseeker.com",
    "aota.org", "caot.ca", "hcpc-uk.org",
    // government / federal authorities
    "cdc.gov", "ninds.nih.gov", "nimh.nih.gov", "niams.nih.gov", "nei.nih.gov",
    "samhsa.gov", "osha.gov", "ptsd.va.gov", "ncbi.nlm.nih.gov", "msktc.org",
    // confirmed national organisations
    "orthoinfo.aaos.org", "aaos.org", "asht.org", "arthritis.org",
    "stroke.org", "heart.org", "parkinson.org", "nationalmssociety.org", "biausa.org",
    // confirmed 2026-07-19 (chapters 13-15 sources; WebFetch-verified)
    // professional bodies / certifying & accrediting orgs
    "wfot.org", "nbcot.org", "acoteonline.org", "rcot.co.uk", "otaus.com.au", "osot.on.ca",
    "apta.org", "htcc.org", "ndta.org", "cihi.ca", "csg.org", "icdl.com",
    "ama-assn.org", "aafp.org", "aasm.org",
    // government / regulatory authorities
    "cms.gov", "otcompact.gov", "ndis.gov.au", "ndisreview.gov.au",
    "occupationaltherapyboard.gov.au", "ahpra.gov.au", "federalregister.gov", "bls.gov",
    "england.nhs.uk", "gazette.govt.nz", "prc.gov.ph", "ncahp.abdm.gov.in", "sos.ga.gov",
    // journals / academic publishers / research bodies
    "journals.sagepub.com", "cochrane.org", "onlinelibrary.wiley.com", "thelancet.com",
    "sciencedirect.com", "tandfonline.com", "frontiersin.org", "nihr.ac.uk", "who.int",
    "chan.usc.edu"
  ];
  function isConfirmed(url) {
    url = url || "";
    return R._confirmed.some(function (d) { return url.indexOf(d) !== -1; });
  }
  R.isConfirmed = isConfirmed;

  /* =========================================================
     ATTACH onto entries + compute coverage stats.
     ========================================================= */
  var stats = { cond: { total: 0, rated: 0, sourced: 0, verified: 0, contested: 0 },
                asmt: { total: 0, rated: 0, sourced: 0, verified: 0, contested: 0 } };

  if (OT.conditions) OT.conditions.forEach(function (c) {
    stats.cond.total++;
    var e = R.conditions[c.id];
    if (e) {
      // conditions fall back to their own (already link-checked) links as sources
      if ((!e.sources || !e.sources.length) && c.links && c.links.length) {
        e.sources = c.links.map(function (l) { return { label: l.l, url: l.u, type: "org" }; });
      } else if (c.links && c.links.length) {
        e.sources = e.sources.concat(c.links.map(function (l) { return { label: l.l, url: l.u, type: "org" }; }));
      }
      e.verified = e.sources.some(function (s) { return isConfirmed(s.url); });
      c.evidence = e;
      stats.cond.rated++;
      if (e.sources.length) stats.cond.sourced++;
      if (e.verified) stats.cond.verified++;
      if (e.strength === "contested") stats.cond.contested++;
    }
  });
  if (OT.assessments) OT.assessments.forEach(function (a) {
    stats.asmt.total++;
    var e = R.assessments[a.name];
    if (e) {
      e.verified = e.sources.some(function (s) { return isConfirmed(s.url); });
      a.evidence = e;
      stats.asmt.rated++;
      if (e.sources.length) stats.asmt.sourced++;
      if (e.verified) stats.asmt.verified++;
      if (e.strength === "contested") stats.asmt.contested++;
    }
  });

  /* EBP landmark findings — strength/confidence by topic substring */
  R.studyRatings = [
    ["Constraint-Induced", "strong", "high"],
    ["task-specific", "strong", "high"],
    ["ADL training after stroke", "strong", "high"],
    ["community for stroke", "strong", "medium"],
    ["dementia intervention", "moderate", "medium"],
    ["fall prevention", "strong", "high"],
    ["Lifestyle Redesign", "moderate", "medium"],
    ["Sensory Integration", "contested", "low"],
    ["CO-OP", "moderate", "medium"],
    ["Cognitive rehabilitation", "moderate", "medium"],
    ["mental health & recovery", "moderate", "medium"],
    ["Supported employment", "strong", "high"],
    ["Energy conservation in MS", "moderate", "medium"],
    ["Hand therapy", "moderate", "medium"],
    ["chronic pain", "moderate", "medium"],
    ["Telehealth", "emerging", "medium"]
  ];
  stats.study = { total: 0, rated: 0, contested: 0 };
  if (OT.evidence && OT.evidence.keyStudies) OT.evidence.keyStudies.forEach(function (s) {
    stats.study.total++;
    var hit = R.studyRatings.find(function (r) { return (s.topic || "").indexOf(r[0]) !== -1; });
    if (hit) { s.strength = hit[1]; s.confidence = hit[2]; stats.study.rated++; if (hit[1] === "contested") stats.study.contested++; }
  });

  R.coverage = stats;
  R.reviewedOn = "July 2026";
})();
