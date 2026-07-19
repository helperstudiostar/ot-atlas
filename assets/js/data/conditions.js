/* ============================================================
   CONDITIONS LIBRARY
   Each: {id, name, cat, desc, impact, ot[], assess[], goals[], settings, links[]}
   Links use reputable, stable organisation pages.
   ============================================================ */
window.OT = window.OT || {};

OT.conditionCategories = [
  /* icon = symbol id in the inline SVG sprite (index.html), rendered via icn() in app.js */
  { key: "neuro",   label: "Neuro, Physical & MSK Rehab", icon: "i-brain" },
  { key: "hand",    label: "Hand & Upper Extremity", icon: "i-hand" },
  { key: "peds",    label: "Paediatrics", icon: "i-child" },
  { key: "mh",      label: "Mental Health", icon: "i-cloud" },
  { key: "geri",    label: "Geriatrics & Productive Aging", icon: "i-leaf" },
  { key: "spec",    label: "Specialty & Other", icon: "i-star" }
];

OT.conditions = [
  /* ---------------- NEURO & PHYSICAL REHAB ---------------- */
  {
    id: "stroke", name: "Stroke (CVA)", cat: "neuro",
    desc: "Sudden loss of brain function from interrupted blood supply (ischaemic) or bleeding (haemorrhagic), often causing one-sided weakness (hemiparesis), sensory, cognitive, visual-perceptual and communication changes.",
    impact: "Disrupts dressing, bathing, feeding, mobility, cooking, driving, work and roles; may bring neglect, apraxia, aphasia, fatigue and emotional change.",
    ot: ["Task-specific & repetitive functional training of the affected arm/hand", "Constraint-Induced Movement Therapy (CIMT/mCIMT)", "ADL/IADL retraining with adaptive techniques & equipment", "Management of visual neglect, apraxia & cognitive deficits", "Edema/shoulder management, positioning, splinting to prevent contracture", "Caregiver training, home safety & discharge planning", "Community reintegration, driving & return-to-work"],
    assess: ["COPM", "FIM / CARE", "Fugl-Meyer (UE)", "Box & Blocks", "9-Hole Peg", "MoCA", "Catherine Bergego Scale (neglect)", "Barthel Index"],
    goals: ["Independent grooming seated within 2 weeks", "Don/doff shirt with mod-I using affected arm in 4 weeks", "Prepare a simple meal safely with supervision"],
    settings: "Acute care · Inpatient rehab · Home health · Outpatient",
    links: [{ l: "American Stroke Association", u: "https://www.stroke.org" }, { l: "NINDS – Stroke", u: "https://www.ninds.nih.gov" }, { l: "StrokEngine (interventions)", u: "https://strokengine.ca" }]
  },
  {
    id: "tbi", name: "Traumatic Brain Injury (TBI)", cat: "neuro",
    desc: "Brain injury from external force — concussion to severe. Effects span physical, cognitive, behavioural and emotional domains and can evolve over months/years.",
    impact: "Variable: attention/memory/executive deficits, fatigue, impulsivity, motor and sensory changes affecting every occupation; disrupts return to school/work and relationships.",
    ot: ["Cognitive rehabilitation (attention, memory, executive function) — remedial & compensatory", "Graded return to daily routines, school and work", "Use of external aids (planners, smartphone cues, checklists)", "Management of agitation/behaviour via structure & environment", "ADL/IADL retraining; community mobility; vision screening/referral", "Family education and emotional support"],
    assess: ["Rancho Los Amigos Levels", "MoCA / cognitive batteries", "A-ONE", "Executive Function Performance Test (EFPT)", "COPM"],
    goals: ["Use a memory notebook to complete morning routine with cues", "Plan & execute a 3-step IADL with minimal cues", "Return to modified school/work duties"],
    settings: "Acute · Inpatient rehab · Day rehab · Outpatient · Community",
    links: [{ l: "Brain Injury Association of America", u: "https://www.biausa.org" }, { l: "Model Systems Knowledge Translation Center", u: "https://msktc.org" }]
  },
  {
    id: "sci", name: "Spinal Cord Injury (SCI)", cat: "neuro",
    desc: "Damage to the spinal cord causing partial or complete loss of motor/sensory function below the level of injury (tetraplegia or paraplegia).",
    impact: "Profound changes to self-care, mobility, bladder/bowel, skin integrity, sexuality, work and independence — degree depends on level and completeness.",
    ot: ["Level-specific ADL retraining & adaptive equipment (e.g., tenodesis grasp, universal cuffs)", "Wheelchair seating, positioning & pressure-injury prevention", "Upper-limb strengthening & preservation", "Home & vehicle modification; assistive technology & environmental control", "Bowel/bladder routine support; sexuality; psychosocial adjustment", "Vocational & community re-entry"],
    assess: ["FIM / SCIM (Spinal Cord Independence Measure)", "Manual muscle testing", "Capabilities of UE (CUE)", "COPM"],
    goals: ["Independent feeding with universal cuff (C5-6)", "Independent pressure relief & skin checks", "Independent wheelchair-level dressing"],
    settings: "Inpatient rehab · Outpatient · Home · Community",
    links: [{ l: "Christopher & Dana Reeve Foundation", u: "https://www.christopherreeve.org" }, { l: "MSKTC – SCI", u: "https://msktc.org" }]
  },
  {
    id: "ms", name: "Multiple Sclerosis (MS)", cat: "neuro",
    desc: "Chronic autoimmune demyelinating disease of the CNS with a relapsing or progressive course; symptoms include fatigue, weakness, spasticity, sensory changes, cognitive and visual problems.",
    impact: "Fluctuating fatigue and unpredictability undermine work, parenting and routines; heat sensitivity, cognition and balance affect safety and participation.",
    ot: ["Energy conservation & fatigue management (the ‘4 P's’)", "Cognitive strategies and compensations", "Adaptive equipment, home/work modification & ergonomics", "Spasticity management & orthotics; fall prevention", "Heat-management strategies; self-management & coping"],
    assess: ["Modified Fatigue Impact Scale (MFIS)", "COPM", "MoCA", "9-Hole Peg Test", "Berg Balance"],
    goals: ["Apply energy-conservation to complete workday without crash", "Maintain independence in IADLs using adaptive strategies"],
    settings: "Outpatient · Home health · Community",
    links: [{ l: "National MS Society", u: "https://www.nationalmssociety.org" }]
  },
  {
    id: "parkinsons", name: "Parkinson's Disease", cat: "neuro",
    desc: "Progressive neurodegenerative disorder affecting movement — bradykinesia, rigidity, tremor, postural instability — plus non-motor features (cognition, mood, sleep).",
    impact: "Slowing and small movements impair dressing, handwriting (micrographia), eating, transfers and turning; freezing increases fall risk.",
    ot: ["Large-amplitude movement training (LSVT BIG-informed) embedded in occupation", "Cueing strategies (visual/auditory/rhythmic) for gait & freezing", "Handwriting & fine-motor strategies; adaptive utensils", "Fall prevention & home modification; energy management", "Routine & medication-timing optimisation"],
    assess: ["PDQ-39 (Parkinson's quality of life)", "COPM", "9-Hole Peg", "Timed Up & Go", "Berg Balance"],
    goals: ["Use cueing to complete safe morning transfers", "Maintain legible signature & feeding independence"],
    settings: "Outpatient · Home health · Community",
    links: [{ l: "Parkinson's Foundation", u: "https://www.parkinson.org" }]
  },
  {
    id: "als", name: "ALS / Motor Neurone Disease", cat: "neuro",
    desc: "Progressive degeneration of motor neurons causing increasing weakness of voluntary muscles; cognition usually preserved.",
    impact: "Progressive loss of self-care, mobility, speech and eventually breathing; emphasis shifts to maintaining participation, dignity and quality of life.",
    ot: ["Proactive adaptive equipment & AT (eye-gaze, environmental control, AAC referral)", "Energy conservation & positioning for comfort", "Caregiver training; pressure-injury & contracture prevention", "Home modification; planning ahead of progression", "Maintaining valued roles & participation"],
    assess: ["ALSFRS-R (functional)", "COPM", "ROM & MMT for planning"],
    goals: ["Access communication device independently", "Maintain safe feeding with adaptive set-up as long as possible"],
    settings: "Multidisciplinary clinic · Home health · Hospice",
    links: [{ l: "The ALS Association", u: "https://www.als.org" }]
  },
  {
    id: "gbs", name: "Guillain-Barré Syndrome", cat: "neuro",
    desc: "Acute autoimmune polyneuropathy causing rapidly ascending weakness and sensory changes, usually followed by gradual recovery.",
    impact: "Acute loss of strength and function; long rehab to rebuild ADLs, endurance and fine motor; pain and fatigue common.",
    ot: ["Graded strengthening within fatigue limits (avoid overwork)", "Progressive ADL/IADL retraining", "Splinting & positioning to prevent contracture", "Desensitisation & fine-motor recovery; endurance building"],
    assess: ["MMT", "FIM", "9-Hole Peg", "COPM"],
    goals: ["Progress from dependent to mod-I dressing", "Rebuild fine-motor for self-feeding and writing"],
    settings: "Acute · Inpatient rehab · Outpatient",
    links: [{ l: "NINDS – GBS", u: "https://www.ninds.nih.gov" }]
  },
  {
    id: "amputation", name: "Amputation & Prosthetics", cat: "neuro",
    desc: "Surgical or traumatic loss of a limb; upper-limb amputations are a particular OT focus.",
    impact: "Affects all self-care and productivity for UE loss; requires residual-limb care, prosthetic training, and psychosocial adjustment to body image.",
    ot: ["Pre-prosthetic: residual-limb care, desensitisation, ROM, edema control", "Prosthetic training (body-powered/myoelectric) in functional tasks", "One-handed & adaptive techniques during transition", "Phantom-limb strategies; psychosocial & vocational support"],
    assess: ["COPM", "DASH/QuickDASH", "TAPES (adjustment)", "Box & Blocks"],
    goals: ["Don/doff & operate prosthesis for bilateral ADLs", "Independent residual-limb care & skin checks"],
    settings: "Inpatient rehab · Outpatient · Specialty clinic",
    links: [{ l: "Amputee Coalition", u: "https://www.amputee-coalition.org" }]
  },
  {
    id: "burns", name: "Burns", cat: "neuro",
    desc: "Thermal/chemical/electrical skin injury; OT is central to scar, contracture and function management.",
    impact: "Pain, scarring and contracture threaten ROM, hand function and ADLs; significant psychosocial impact.",
    ot: ["Anti-deformity positioning & custom splinting/orthoses", "Scar management (pressure garments, silicone, massage)", "ROM, edema control & graded functional activity", "ADL retraining; desensitisation; psychosocial support & community re-entry"],
    assess: ["ROM/goniometry", "Vancouver Scar Scale", "DASH", "COPM"],
    goals: ["Maintain functional hand ROM to prevent contracture", "Return to independent self-care despite scarring"],
    settings: "Burn unit · Acute · Outpatient",
    links: [{ l: "American Burn Association", u: "https://ameriburn.org" }]
  },
  {
    id: "ortho", name: "Orthopaedic (Joint Replacement / Fracture)", cat: "neuro",
    desc: "Total hip/knee/shoulder replacement, fractures and post-surgical orthopaedic conditions, often with movement precautions.",
    impact: "Temporary loss of independence in dressing, bathing, toileting and mobility while respecting precautions (e.g., hip precautions, weight-bearing limits).",
    ot: ["ADL retraining within precautions; adaptive equipment (reacher, sock aid, long shoehorn, raised toilet seat)", "Lower-body dressing & bathing techniques", "Energy conservation & home safety", "Upper-limb rehab for shoulder/wrist; functional ROM/strength"],
    assess: ["FIM", "DASH (UE)", "Timed Up & Go", "COPM"],
    goals: ["Independent lower-body dressing using adaptive equipment within hip precautions", "Safe tub/shower transfer"],
    settings: "Acute · SNF · Home health · Outpatient",
    links: [{ l: "AAOS – OrthoInfo", u: "https://orthoinfo.aaos.org" }]
  },
  {
    id: "lbp", name: "Low Back / Chronic Pain", cat: "neuro",
    desc: "Persistent musculoskeletal pain affecting movement and participation; managed biopsychosocially.",
    impact: "Limits work, sleep, lifting, self-care and leisure; fear-avoidance and deconditioning compound disability.",
    ot: ["Activity pacing & graded activity; body mechanics & ergonomics", "Work conditioning & job-site analysis", "CBT-informed coping, relaxation & sleep strategies", "Adaptive techniques and assistive devices"],
    assess: ["COPM", "Oswestry Disability Index", "Functional Capacity Evaluation"],
    goals: ["Return to work tasks with safe body mechanics & pacing", "Independent self-management of flare-ups"],
    settings: "Outpatient · Work rehab · Pain program",
    links: [{ l: "NIAMS – Back Pain", u: "https://www.niams.nih.gov" }]
  },

  /* ---------------- HAND & UPPER EXTREMITY ---------------- */
  {
    id: "ctsyn", name: "Carpal Tunnel Syndrome", cat: "hand",
    desc: "Compression of the median nerve at the wrist causing numbness, tingling and weakness in the thumb-side of the hand.",
    impact: "Night symptoms, dropping objects, difficulty with fine tasks (buttons, writing, phone), grip weakness.",
    ot: ["Custom wrist orthosis (neutral, esp. night)", "Nerve & tendon gliding exercises", "Activity & ergonomic modification; pacing", "Post-surgical scar & ROM management"],
    assess: ["Boston Carpal Tunnel Questionnaire", "QuickDASH", "Grip/pinch dynamometry", "Monofilament sensation"],
    goals: ["Reduce night symptoms with orthosis to sleep through", "Return to keyboarding with ergonomic set-up"],
    settings: "Outpatient · Hand therapy",
    links: [{ l: "ASHT (hand therapy)", u: "https://www.asht.org" }, { l: "OrthoInfo – CTS", u: "https://orthoinfo.aaos.org" }]
  },
  {
    id: "tendon", name: "Tendon Injuries & Repairs", cat: "hand",
    desc: "Lacerations or ruptures of flexor/extensor tendons requiring protected, protocol-driven rehabilitation.",
    impact: "Loss of finger motion and grip; strict protocols balance healing against stiffness and rupture risk.",
    ot: ["Protocol-based protected motion (e.g., early active/passive flexor protocols)", "Custom orthoses (dorsal blocking, relative motion)", "Graded ROM → strengthening → return to function", "Edema, scar and sensory management"],
    assess: ["Goniometry (TAM)", "Grip/pinch", "QuickDASH"],
    goals: ["Achieve protocol ROM milestones without rupture", "Return to functional grasp for ADLs/work"],
    settings: "Hand therapy · Outpatient",
    links: [{ l: "ASHT", u: "https://www.asht.org" }]
  },
  {
    id: "ra-oa-hand", name: "Arthritis of the Hand (RA & OA)", cat: "hand",
    desc: "Rheumatoid (inflammatory, autoimmune) or osteoarthritis (degenerative) affecting hand joints — pain, deformity, reduced grip.",
    impact: "Pain and deformity limit grasp, pinch, opening jars, writing and dressing; morning stiffness and fatigue (RA).",
    ot: ["Joint protection & energy conservation education", "Custom orthoses (resting hand, thumb CMC)", "Adaptive equipment (built-up handles, jar openers)", "Gentle ROM; pain and edema strategies"],
    assess: ["QuickDASH", "Grip/pinch", "COPM", "Joint count/pain scales"],
    goals: ["Apply joint-protection to reduce hand pain during cooking", "Independent dressing using adaptive techniques"],
    settings: "Outpatient · Hand therapy · Rheumatology",
    links: [{ l: "Arthritis Foundation", u: "https://www.arthritis.org" }]
  },
  {
    id: "crps", name: "Complex Regional Pain Syndrome (CRPS)", cat: "hand",
    desc: "Disproportionate, persistent pain (often post-injury) with autonomic, sensory and motor changes in a limb.",
    impact: "Severe pain, hypersensitivity, edema and disuse threaten all hand use and participation; early intervention matters.",
    ot: ["Graded motor imagery & mirror therapy", "Desensitisation & sensory re-education", "Edema management; gentle functional use", "Pain-coping, pacing & normalising use of the limb"],
    assess: ["Pain & sensory mapping", "Edema (volumetrics)", "COPM", "QuickDASH"],
    goals: ["Tolerate light tactile input during ADLs", "Resume functional hand use in daily tasks"],
    settings: "Hand therapy · Pain program · Outpatient",
    links: [{ l: "RSDSA (CRPS)", u: "https://rsds.org" }]
  },
  {
    id: "epicondylitis", name: "Lateral Epicondylitis (Tennis Elbow)", cat: "hand",
    desc: "Overuse tendinopathy of the wrist extensors at the lateral elbow.",
    impact: "Pain with gripping, lifting and repetitive forearm use limits work and daily tasks.",
    ot: ["Counterforce bracing / wrist orthosis", "Eccentric loading & graded strengthening", "Ergonomic & activity modification", "Pain-management modalities as adjuncts"],
    assess: ["Grip dynamometry (pain-limited)", "QuickDASH", "PRTEE"],
    goals: ["Return to pain-free gripping for work tasks", "Self-manage symptoms with activity modification"],
    settings: "Outpatient · Hand therapy",
    links: [{ l: "OrthoInfo", u: "https://orthoinfo.aaos.org" }]
  },
  {
    id: "dupuytren", name: "Dupuytren's / Trigger Finger", cat: "hand",
    desc: "Dupuytren's: progressive palmar fascia contracture. Trigger finger: stenosing tenosynovitis causing catching/locking of a digit.",
    impact: "Finger contracture or catching limits grasp, flat-hand tasks and fine motor use.",
    ot: ["Post-procedure (needle aponeurotomy/surgery) orthoses & ROM", "Tendon gliding; activity modification", "Scar & edema management; graded strengthening"],
    assess: ["Goniometry/extension deficit", "QuickDASH", "Grip"],
    goals: ["Restore functional finger extension for grasp", "Eliminate triggering during daily tasks"],
    settings: "Hand therapy · Outpatient",
    links: [{ l: "ASHT", u: "https://www.asht.org" }]
  },
  {
    id: "wrist-fx", name: "Wrist & Hand Fractures", cat: "hand",
    desc: "Distal radius (Colles), scaphoid and metacarpal/phalangeal fractures — among the most common UE injuries.",
    impact: "Immobilisation leads to stiffness, edema and weakness; OT restores motion and function.",
    ot: ["Edema & scar management; ROM progression post-immobilisation", "Custom/prefab orthoses as indicated", "Graded strengthening; ADL/work return", "Desensitisation if nerve-involved"],
    assess: ["Goniometry", "Grip/pinch", "QuickDASH", "Edema (figure-8)"],
    goals: ["Regain functional wrist ROM for self-care", "Return to occupational hand use & strength"],
    settings: "Hand therapy · Outpatient",
    links: [{ l: "OrthoInfo", u: "https://orthoinfo.aaos.org" }]
  },

  /* ---------------- PAEDIATRICS ---------------- */
  {
    id: "asd", name: "Autism Spectrum Disorder (ASD)", cat: "peds",
    desc: "Neurodevelopmental difference in social communication and behaviour, often with sensory processing differences and restricted/repetitive patterns.",
    impact: "May affect sensory regulation, play, fine/gross motor, self-care, transitions, social participation and school access.",
    ot: ["Sensory-integration & sensory-modulation strategies (sensory diets)", "Self-regulation/emotional-regulation programs (e.g., Zones of Regulation)", "Play, fine-motor & self-care skill building", "Visual supports, social stories & routine structuring", "Environmental modification; caregiver & teacher coaching"],
    assess: ["Sensory Profile / SPM", "COPM (caregiver)", "PEDI-CAT", "School Function Assessment", "Goal Attainment Scaling"],
    goals: ["Use a sensory strategy to remain regulated for 15-min table task", "Independent dressing routine with visual schedule"],
    settings: "Schools · Early intervention · Outpatient · Clinic/home",
    links: [{ l: "Autism Speaks – OT", u: "https://www.autismspeaks.org/occupational-therapy" }, { l: "Ayres SI® (CL-ASI)", u: "https://www.cl-asi.org/about-ayres-sensory-integration" }]
  },
  {
    id: "adhd", name: "ADHD", cat: "peds",
    desc: "Attention-deficit/hyperactivity disorder — persistent inattention, hyperactivity and/or impulsivity affecting daily function.",
    impact: "Disrupts organisation, task completion, handwriting, self-regulation, morning/bedtime routines and classroom participation.",
    ot: ["Self-regulation & sensory strategies for arousal/attention", "Executive-function & organisation supports (checklists, timers, environment)", "Handwriting & fine-motor support", "Routine and habit building; parent/teacher coaching"],
    assess: ["Sensory Profile", "COPM", "Goal Attainment Scaling", "BRIEF (executive function)"],
    goals: ["Complete homework routine with a visual checklist & timer", "Use movement breaks to sustain seated attention"],
    settings: "Schools · Outpatient · Community",
    links: [{ l: "CHADD", u: "https://chadd.org" }]
  },
  {
    id: "spd", name: "Sensory Processing Differences", cat: "peds",
    desc: "Difficulty registering, modulating or integrating sensory input (over- or under-responsivity, sensory seeking, discrimination or praxis difficulties).",
    impact: "Can cause meltdowns, avoidance, clumsiness, picky eating and difficulty with grooming, clothing, noise and daily routines.",
    ot: ["Ayres Sensory Integration® intervention (play-based, individualised)", "Sensory diets & environmental modification", "Caregiver education on the ‘just-right’ sensory level", "Co-regulation & self-regulation skill building"],
    assess: ["Sensory Profile 2", "Sensory Processing Measure (SPM)", "EASI (research)", "Clinical observations"],
    goals: ["Tolerate hair-washing with graded sensory strategies", "Participate in group activity with self-selected supports"],
    settings: "Outpatient · Schools · Clinic/home",
    links: [{ l: "STAR Institute (Sensory)", u: "https://sensoryhealth.org" }, { l: "Sensory Integration – StatPearls", u: "https://www.ncbi.nlm.nih.gov/books/NBK559155/" }]
  },
  {
    id: "cp", name: "Cerebral Palsy", cat: "peds",
    desc: "A group of permanent movement and posture disorders from non-progressive injury to the developing brain; varies from mild to severe (GMFCS levels).",
    impact: "Affects gross/fine motor, tone, hand use, self-care, mobility, communication and school/play participation.",
    ot: ["Functional, task-specific & goal-directed training (e.g., CO-OP, CIMT/bimanual for UE)", "Adaptive seating, positioning & equipment; AT/AAC referral", "Splinting/orthoses & tone management within team", "Self-care, play and school-participation skills; caregiver coaching"],
    assess: ["GMFCS / MACS / PEDI-CAT", "Goal Attainment Scaling", "Quality of Upper Extremity Skills Test (QUEST)", "COPM"],
    goals: ["Use both hands to manage a 2-handed self-care task", "Access classroom materials with adapted seating/tools"],
    settings: "Early intervention · Schools · Outpatient · Inpatient",
    links: [{ l: "CDC – Cerebral Palsy", u: "https://www.cdc.gov/cerebral-palsy/about/index.html" }]
  },
  {
    id: "dcd", name: "Developmental Coordination Disorder (Dyspraxia)", cat: "peds",
    desc: "Marked difficulty acquiring and executing coordinated motor skills, not explained by another condition.",
    impact: "Clumsiness affects handwriting, dressing, sports, using utensils and keeping up at school; can erode confidence.",
    ot: ["CO-OP Approach (cognitive strategy: Goal-Plan-Do-Check)", "Task-specific practice of priority skills", "Environmental & task adaptation; assistive tools", "Building confidence and participation"],
    assess: ["Movement ABC-2", "BOT-2", "COPM/PEGS", "DCDQ"],
    goals: ["Use a cognitive strategy to learn shoe-tying", "Improve handwriting legibility for class work"],
    settings: "Schools · Outpatient",
    links: [{ l: "CanChild – DCD", u: "https://www.canchild.ca" }]
  },
  {
    id: "downs", name: "Down Syndrome", cat: "peds",
    desc: "Genetic condition (trisomy 21) associated with hypotonia, developmental delay, and characteristic learning profile.",
    impact: "Low tone and ligament laxity affect fine/gross motor, feeding, self-care and handwriting; developmental supports across the lifespan.",
    ot: ["Developmental fine/gross-motor & self-care skill building", "Feeding/oral-motor support; hand strengthening", "Adaptive tools; visual supports; routine building", "Transition & vocational skills in adolescence"],
    assess: ["Peabody (PDMS-2)", "PEDI-CAT", "Sensory Profile", "School Function Assessment"],
    goals: ["Independent finger-feeding then utensil use", "Participate in classroom fine-motor tasks with adapted tools"],
    settings: "Early intervention · Schools · Outpatient",
    links: [{ l: "National Down Syndrome Society", u: "https://ndss.org" }]
  },
  {
    id: "ddelay", name: "Developmental Delay / Prematurity (NICU)", cat: "peds",
    desc: "Delays in reaching milestones, and the specialised needs of premature/medically-fragile newborns in the NICU.",
    impact: "Affects feeding, motor development, regulation, attachment and later school readiness.",
    ot: ["NICU: neuroprotective positioning, feeding support, state regulation, parent coaching", "EI: coaching families in natural routines to build milestones", "Play-based motor, sensory and self-care development", "Environmental enrichment & developmental monitoring"],
    assess: ["NICU Network Neurobehavioral Scale", "Peabody/Bayley", "PEDI-CAT", "Sensory Profile (infant)"],
    goals: ["Coordinated suck-swallow-breathe for oral feeding", "Achieve next motor milestone in play routines"],
    settings: "NICU · Early intervention · Outpatient",
    links: [{ l: "CDC – Milestones (Learn the Signs. Act Early.)", u: "https://www.cdc.gov/act-early/index.html" }]
  },
  {
    id: "handwriting", name: "Handwriting & Fine-Motor Difficulties", cat: "peds",
    desc: "Difficulty with legible, efficient handwriting and the underlying fine-motor, visual-motor and motor-planning skills (dysgraphia).",
    impact: "Slows or frustrates classroom output, affects grades, self-esteem and participation in written tasks.",
    ot: ["Multisensory handwriting programs (e.g., Handwriting Without Tears-style)", "Fine-motor & in-hand manipulation strengthening", "Visual-motor integration activities; pencil grasp & positioning", "Accommodations & AT (keyboarding, slant board) when appropriate"],
    assess: ["Beery VMI", "Print Tool / handwriting assessments", "Sensory Profile", "School Function Assessment"],
    goals: ["Copy a sentence with legible letters & spacing in 4/5 trials", "Sustain writing endurance for classroom tasks"],
    settings: "Schools · Outpatient",
    links: [{ l: "The OT Toolbox", u: "https://www.theottoolbox.com" }]
  },
  {
    id: "feeding", name: "Paediatric Feeding Difficulties", cat: "peds",
    desc: "Difficulty accepting, managing or progressing foods — sensory, motor, behavioural and/or medical in origin (incl. ‘picky’/ARFID-type and oral-motor).",
    impact: "Limited diet, mealtime stress, poor growth and restricted family/social participation around eating.",
    ot: ["Sensory & oral-motor approaches (e.g., SOS-informed, food chaining)", "Positioning, adaptive utensils & mealtime routines", "Graded food exposure; caregiver coaching", "Team work with SLP/dietitian/medical"],
    assess: ["Clinical feeding observation", "Sensory Profile", "Parent mealtime questionnaires"],
    goals: ["Accept & manage one new food texture", "Self-feed with adapted utensil and stable seating"],
    settings: "Outpatient · Feeding clinic · Early intervention",
    links: [{ l: "Feeding Matters", u: "https://www.feedingmatters.org" }]
  },
  {
    id: "spina-bifida", name: "Spina Bifida & Erb's Palsy", cat: "peds",
    desc: "Spina bifida: congenital neural-tube defect affecting lower-body function and sometimes hands/cognition. Erb's palsy: brachial-plexus birth injury affecting an arm.",
    impact: "Spina bifida affects mobility, continence and self-care; Erb's palsy limits one arm's movement and bimanual use.",
    ot: ["Self-care & adaptive-equipment training; wheelchair/seating (spina bifida)", "Bimanual & affected-arm use, positioning/splinting (Erb's)", "Skin protection, AT, school participation", "Developmental & fine-motor skill building"],
    assess: ["PEDI-CAT", "Active Movement Scale (Erb's palsy)", "COPM"],
    goals: ["Independent self-catheterisation set-up & dressing", "Incorporate affected arm into 2-handed tasks"],
    settings: "Early intervention · Schools · Outpatient · Specialty clinic",
    links: [{ l: "Spina Bifida Association", u: "https://www.spinabifidaassociation.org" }]
  },

  /* ---------------- MENTAL HEALTH ---------------- */
  {
    id: "depression", name: "Depression & Mood Disorders", cat: "mh",
    desc: "Persistent low mood, anhedonia, fatigue and cognitive changes that impair daily functioning.",
    impact: "Withdrawal from roles and routines, neglected self-care, occupational imbalance, reduced activity and isolation.",
    ot: ["Behavioural activation & meaningful-activity scheduling", "Routine & habit rebuilding; occupational balance", "Coping skills, sleep hygiene & self-management", "Return-to-role/work; graded re-engagement; community participation"],
    assess: ["COPM", "MOHOST / OSA", "Interest & Role Checklists", "Occupational Self-Assessment"],
    goals: ["Re-establish a structured morning routine", "Re-engage in one valued leisure occupation weekly"],
    settings: "Inpatient psych · Community MH · Outpatient · Primary care",
    links: [{ l: "AOTA – Mental Health", u: "https://www.aota.org" }, { l: "NIMH – Depression", u: "https://www.nimh.nih.gov" }]
  },
  {
    id: "anxiety", name: "Anxiety Disorders & OCD", cat: "mh",
    desc: "Excessive worry, fear or compulsions (GAD, panic, social anxiety, OCD) that interfere with participation.",
    impact: "Avoidance restricts work, school, social and community participation; rituals consume time and disrupt routines.",
    ot: ["Graded exposure embedded in valued occupations", "Relaxation, mindfulness & sensory self-regulation", "Routine structuring; time/role management", "Cognitive strategies & coping toolkits (CBT-informed)"],
    assess: ["COPM", "GAD-7 (generalised anxiety severity; not OCD-specific)", "Occupational questionnaires"],
    goals: ["Tolerate a graded community outing", "Use a coping strategy to complete morning routine without rituals"],
    settings: "Outpatient · Community MH · Primary care",
    links: [{ l: "ADAA", u: "https://adaa.org" }]
  },
  {
    id: "schizophrenia", name: "Schizophrenia & Psychotic Disorders", cat: "mh",
    desc: "Serious mental illness with positive symptoms (hallucinations, delusions), negative symptoms (avolition, flat affect) and cognitive impairment.",
    impact: "Cognitive and motivational deficits impair self-care, IADLs, work, social roles and independent living.",
    ot: ["Life-skills & IADL training (cooking, money, transport, medication)", "Cognitive-adaptation strategies & supported routines", "Social-skills & vocational/supported-employment groups", "Recovery-oriented goal setting; community integration"],
    assess: ["MOHOST", "ACLS (Allen)", "AMPS", "COPM", "Independent Living Scales"],
    goals: ["Manage medications with a supported routine", "Perform independent grocery shopping with strategies"],
    settings: "Inpatient psych · Community MH · Supported housing · Clubhouse",
    links: [{ l: "NAMI", u: "https://www.nami.org" }]
  },
  {
    id: "bipolar", name: "Bipolar Disorder", cat: "mh",
    desc: "Mood disorder with episodes of mania/hypomania and depression.",
    impact: "Disrupted routines, sleep and occupational balance; risk-taking in mania, withdrawal in depression.",
    ot: ["Routine & sleep-wake regulation (social rhythm)", "Occupational-balance & energy management", "Early-warning-sign monitoring & self-management plans", "Role and work support across mood states"],
    assess: ["COPM", "OSA", "MOHOST", "activity/sleep logs"],
    goals: ["Maintain consistent sleep-wake routine", "Use a balanced weekly activity schedule"],
    settings: "Community MH · Outpatient · Inpatient",
    links: [{ l: "DBSA", u: "https://www.dbsalliance.org" }]
  },
  {
    id: "ptsd", name: "PTSD & Trauma", cat: "mh",
    desc: "Persistent distress, hyperarousal, avoidance and intrusive memories following trauma.",
    impact: "Hypervigilance and avoidance limit sleep, work, relationships and community participation; sensory triggers disrupt daily life.",
    ot: ["Sensory-modulation & grounding strategies for arousal regulation", "Routine, sleep and safe-environment structuring", "Graded re-engagement in meaningful, valued roles", "Trauma-informed, choice-centred therapeutic relationship"],
    assess: ["COPM", "sensory profiles", "occupational/role measures"],
    goals: ["Use grounding/sensory tools to manage triggers in public", "Re-establish a restorative sleep routine"],
    settings: "VA / military · Community MH · Outpatient",
    links: [{ l: "PTSD – US Dept of VA", u: "https://www.ptsd.va.gov" }]
  },
  {
    id: "sud", name: "Substance Use Disorders", cat: "mh",
    desc: "Compulsive substance use despite harm, often disrupting every life domain.",
    impact: "Lost routines, roles, employment and relationships; need to rebuild a meaningful, structured, substance-free life.",
    ot: ["Building healthy routines & meaningful occupations to replace use", "Life-skills, vocational & financial-management training", "Coping, stress-management & relapse-prevention strategies", "Re-establishing roles, leisure and social participation"],
    assess: ["COPM", "OSA / MOHOST", "Role & Interest Checklists"],
    goals: ["Build a structured daily routine of meaningful activity", "Develop substance-free leisure occupations"],
    settings: "Rehab programs · Community MH · Outpatient",
    links: [{ l: "SAMHSA", u: "https://www.samhsa.gov" }]
  },
  {
    id: "eating", name: "Eating Disorders", cat: "mh",
    desc: "Anorexia, bulimia, binge-eating and related conditions involving disordered eating and body image.",
    impact: "Rigid routines, anxiety around food/meals, perfectionism and impaired daily participation and roles.",
    ot: ["Meal-preparation & normalised mealtime participation", "Body-image, self-regulation & coping strategies", "Routine flexibility & occupational balance", "Re-engagement in valued roles and leisure"],
    assess: ["COPM", "OSA", "occupational balance tools"],
    goals: ["Participate in planning & sharing a balanced meal", "Build flexible, balanced daily routines"],
    settings: "ED treatment programs · Outpatient · Inpatient",
    links: [{ l: "NEDA", u: "https://www.nationaleatingdisorders.org" }]
  },

  /* ---------------- GERIATRICS & PRODUCTIVE AGING ---------------- */
  {
    id: "dementia", name: "Dementia / Alzheimer's", cat: "geri",
    desc: "Progressive decline in memory, cognition and function (Alzheimer's, vascular, Lewy body, frontotemporal).",
    impact: "Increasing difficulty with IADLs then ADLs; safety, wandering, behaviour and caregiver burden grow over time.",
    ot: ["Caregiver education & training (the strongest evidence — e.g., COTID, Tailored Activity Program)", "Environmental modification & cueing for safety and function", "Meaningful, engaging activity matched to cognitive level", "Routine simplification; fall & wandering prevention", "Maximising remaining abilities and dignity"],
    assess: ["MoCA / MMSE", "Allen Cognitive Level Screen (ACLS)", "COPM (caregiver)", "Home safety checklists"],
    goals: ["Caregiver uses cueing to support dressing", "Engage in a meaningful daily activity for 20 min"],
    settings: "Home health · SNF · Memory care · Community · Outpatient",
    links: [{ l: "Alzheimer's Association", u: "https://www.alz.org" }]
  },
  {
    id: "lowvision", name: "Low Vision", cat: "geri",
    desc: "Significant, uncorrectable vision loss (macular degeneration, glaucoma, diabetic retinopathy) impairing daily function.",
    impact: "Difficulty reading, cooking, managing meds, mobility and self-care; safety and falls concerns; loss of driving.",
    ot: ["Magnification, contrast & lighting strategies; eccentric viewing training", "Environmental modification & organisation (labelling, tactile cues)", "Adaptive techniques & AT for reading, cooking, meds", "Safe mobility, fall prevention & community access"],
    assess: ["Functional vision evaluation", "COPM", "reading/ADL performance"],
    goals: ["Read medication labels with magnifier & lighting", "Safely prepare a simple meal using contrast strategies"],
    settings: "Outpatient · Home health · Low-vision clinic",
    links: [{ l: "American Foundation for the Blind", u: "https://www.afb.org" }]
  },
  {
    id: "falls", name: "Falls & Fall Prevention", cat: "geri",
    desc: "Falls are a leading cause of injury and loss of independence in older adults; prevention is multifactorial.",
    impact: "Fear of falling, injury, hospitalisation and reduced participation; major driver of decline and institutionalisation.",
    ot: ["Home-safety evaluation & modification (lighting, rails, rugs, bathroom)", "ADL/IADL retraining with safe techniques & equipment", "Strength, balance & dual-task activities embedded in occupation", "Medication & vision review (referral); footwear & confidence"],
    assess: ["Timed Up & Go", "Berg Balance", "Falls Efficacy Scale", "Home FAST / home safety"],
    goals: ["Eliminate environmental fall hazards at home", "Safe independent bathroom transfers with equipment"],
    settings: "Home health · Outpatient · Community · SNF",
    links: [{ l: "CDC STEADI (Falls)", u: "https://www.cdc.gov/steadi/" }]
  },
  {
    id: "aging-place", name: "Aging in Place & Home Modification", cat: "geri",
    desc: "Supporting older adults to live safely and independently in their own homes as needs change.",
    impact: "Mismatch between home and ability threatens independence; the right modifications keep people home and safe.",
    ot: ["Comprehensive home assessment & modification recommendations", "Durable medical & adaptive equipment selection", "Energy conservation, routine & safety strategies", "Caregiver training; technology & smart-home supports", "CAPS-informed universal design"],
    assess: ["Home safety assessments (SAFER, Home FAST)", "COPM", "IADL evaluation"],
    goals: ["Home modified for safe, independent bathing", "Independent IADLs with adaptive set-up"],
    settings: "Home health · Community · Outpatient",
    links: [{ l: "Rebuilding Together / AOTA Home Mods", u: "https://www.aota.org" }, { l: "CDC – Older Adult Falls", u: "https://www.cdc.gov/falls/" }]
  },
  {
    id: "driving", name: "Driving & Community Mobility", cat: "geri",
    desc: "Driving is a key IADL; OT (and Certified Driver Rehab Specialists) assess fitness to drive and community mobility alternatives.",
    impact: "Loss of driving threatens independence, access and identity; safety must be balanced with participation.",
    ot: ["Clinical & on-road driving evaluation (CDRS)", "Vehicle adaptations & adaptive equipment", "Retraining or planning for driving retirement", "Community-mobility alternatives & transition support"],
    assess: ["Clinical driving screens", "Useful Field of View", "on-road assessment", "MoCA"],
    goals: ["Safe return to driving with adapted equipment", "Establish alternative community-mobility plan"],
    settings: "Driving rehab program · Outpatient",
    links: [{ l: "ADED (Driver Rehab)", u: "https://www.aded.net" }]
  },
  {
    id: "arthritis-gen", name: "Arthritis & Joint Health (General)", cat: "geri",
    desc: "Osteoarthritis and inflammatory arthritis across the body limiting movement and daily activity in adults and elders.",
    impact: "Pain, stiffness and fatigue restrict self-care, IADLs, work and leisure; flares disrupt routines.",
    ot: ["Joint protection & energy-conservation education", "Adaptive equipment & assistive devices", "Activity pacing; exercise within tolerance", "Home/work modification & ergonomics"],
    assess: ["COPM", "HAQ / disability indices", "grip/pinch", "Timed Up & Go"],
    goals: ["Apply joint-protection across daily tasks", "Maintain independence in valued IADLs"],
    settings: "Outpatient · Rheumatology · Community",
    links: [{ l: "Arthritis Foundation", u: "https://www.arthritis.org" }]
  },

  /* ---------------- SPECIALTY & OTHER ---------------- */
  {
    id: "cancer", name: "Cancer / Oncology Rehab", cat: "spec",
    desc: "OT supports function and quality of life through cancer treatment and survivorship — including cancer-related fatigue, neuropathy and ‘chemo brain.’",
    impact: "Fatigue, pain, neuropathy, cognitive changes, deconditioning and role disruption affect every occupation.",
    ot: ["Cancer-related fatigue & energy management", "Cognitive strategies for ‘chemo brain’", "Adaptive equipment, ADL/IADL & return-to-work support", "Lymphedema management (if certified); scar & ROM after surgery", "Survivorship participation & meaningful roles"],
    assess: ["COPM", "FACIT-Fatigue", "cognitive screens", "ROM/edema"],
    goals: ["Use energy conservation to manage daily routine through treatment", "Return to work with cognitive & fatigue strategies"],
    settings: "Acute · Outpatient · Cancer centre · Home health",
    links: [{ l: "American Cancer Society", u: "https://www.cancer.org" }]
  },
  {
    id: "lymphedema", name: "Lymphedema", cat: "spec",
    desc: "Chronic swelling from impaired lymphatic drainage, often after cancer surgery/radiation; managed by certified therapists.",
    impact: "Limb heaviness, reduced ROM, skin risk and functional limitation; requires lifelong self-management.",
    ot: ["Complete Decongestive Therapy (manual lymph drainage, compression, exercise, skin care) — CLT", "Self-management training & garment fitting", "Functional ROM & activity adaptation"],
    assess: ["Limb volumetrics/circumference", "ROM", "COPM/DASH"],
    goals: ["Independent self-bandaging & garment use", "Maintain functional UE ROM for ADLs"],
    settings: "Outpatient · Cancer centre · Lymphedema clinic",
    links: [{ l: "National Lymphedema Network", u: "https://lymphnet.org" }]
  },
  {
    id: "cardiac-pulm", name: "Cardiac & Pulmonary Rehab", cat: "spec",
    desc: "Rehabilitation after cardiac events or with chronic heart/lung disease (e.g., COPD, heart failure).",
    impact: "Reduced endurance and breathlessness limit self-care, IADLs and activity; anxiety and routine disruption common.",
    ot: ["Energy conservation, work simplification & pacing (the 4 P's)", "Graded ADL/IADL reconditioning with vitals monitoring", "Breathing strategies & positioning during activity", "Lifestyle, stress & risk-factor self-management"],
    assess: ["COPM", "6-Minute Walk (with team)", "Borg RPE/dyspnoea", "MET-level ADL grading"],
    goals: ["Complete shower/dressing within safe energy limits", "Use pacing to resume household IADLs"],
    settings: "Acute · Cardiac/pulm rehab · Home health · Outpatient",
    links: [{ l: "American Heart Association", u: "https://www.heart.org" }]
  },
  {
    id: "diabetes", name: "Diabetes Self-Management", cat: "spec",
    desc: "OT supports the daily self-management routines and complications (neuropathy, low vision, wounds) of diabetes.",
    impact: "Complex daily regimen (monitoring, meds, diet, foot/skin care) and complications affect routines, sensation and participation.",
    ot: ["Habit & routine building for monitoring, medication & diet", "Adaptive strategies for neuropathy/low vision (insulin, glucometer)", "Foot-care & skin-protection routines", "Health-management coaching & lifestyle redesign"],
    assess: ["COPM", "sensation (monofilament)", "self-management questionnaires"],
    goals: ["Establish a reliable glucose-monitoring & medication routine", "Adapt self-care for sensory loss to protect skin"],
    settings: "Outpatient · Primary care · Community · Home health",
    links: [{ l: "American Diabetes Association", u: "https://diabetes.org" }]
  },
  {
    id: "chronic-fatigue", name: "Chronic Fatigue / Long COVID", cat: "spec",
    desc: "Conditions of persistent, disproportionate fatigue and post-exertional malaise (ME/CFS, long COVID, fibromyalgia overlap).",
    impact: "Severe limits on activity tolerance; ‘boom-and-bust’ cycles disrupt work, self-care and roles.",
    ot: ["Activity pacing & energy management (avoid post-exertional crashes)", "Graded, sustainable routine building & prioritisation", "Cognitive & fatigue strategies; sleep optimisation", "Work and role adaptation; self-advocacy"],
    assess: ["COPM", "MFIS / FACIT-Fatigue", "activity diaries"],
    goals: ["Use pacing/energy envelope to avoid crashes", "Sustain priority occupations within energy limits"],
    settings: "Outpatient · Community · Primary care",
    links: [{ l: "CDC – ME/CFS", u: "https://www.cdc.gov/me-cfs/" }]
  },
  {
    id: "vestibular", name: "Vestibular / Dizziness", cat: "spec",
    desc: "Dizziness and balance disorders (e.g., BPPV, vestibular hypofunction) affecting orientation and safety.",
    impact: "Dizziness, nausea and imbalance limit driving, work, reading and daily activity; high fall risk.",
    ot: ["Vestibular & gaze-stabilisation exercises within function (with team)", "Habituation & graded exposure in real tasks", "Fall prevention & safe ADL strategies", "Visual & environmental adaptation"],
    assess: ["Dizziness Handicap Inventory", "Timed Up & Go", "COPM"],
    goals: ["Tolerate grocery shopping without disabling dizziness", "Safe community mobility with reduced fall risk"],
    settings: "Outpatient · Specialty clinic",
    links: [{ l: "VeDA (Vestibular Disorders)", u: "https://vestibular.org" }]
  },
  {
    id: "work-rehab", name: "Work Rehabilitation & Ergonomics", cat: "spec",
    desc: "Helping injured or at-risk workers safely return to and stay at work; and preventing workplace injury.",
    impact: "Injury, pain or disability threatens employment, identity and income; mismatched job demands cause harm.",
    ot: ["Functional Capacity Evaluation (FCE) & job analysis", "Work conditioning/hardening & graded return-to-work", "Ergonomic assessment & worksite modification", "Body mechanics, pacing & injury-prevention training"],
    assess: ["FCE", "DASH/QuickDASH", "ergonomic risk tools (RULA/REBA)"],
    goals: ["Meet essential job demands safely on FCE", "Return to work with ergonomic modifications"],
    settings: "Work rehab · Outpatient · On-site/industry",
    links: [{ l: "OSHA – Ergonomics", u: "https://www.osha.gov/ergonomics" }]
  },
  {
    id: "idd", name: "Intellectual & Developmental Disabilities (Adults)", cat: "spec",
    desc: "Lifelong conditions affecting cognition and adaptive function (e.g., adults with autism, Down syndrome, IDD).",
    impact: "Support needs across self-care, community living, work and social participation; goal is maximal autonomy and inclusion.",
    ot: ["Life-skills & supported-living training (cooking, money, transport, self-care)", "Vocational & supported-employment skills", "Environmental & task adaptation; visual supports & AT", "Community participation, leisure & self-advocacy"],
    assess: ["COPM", "ACLS", "Independent Living Scales", "adaptive-behaviour measures"],
    goals: ["Independent in a chosen IADL with supports", "Participate in supported employment task"],
    settings: "Community · Supported living · Day programs · Vocational",
    links: [{ l: "The Arc", u: "https://thearc.org" }]
  },
  {
    id: "wheelchair", name: "Wheelchair Seating & Assistive Technology", cat: "spec",
    desc: "Specialised evaluation and provision of seating, mobility and assistive/adaptive technology to enable participation.",
    impact: "The right seating and AT can transform independence, posture, skin health, communication and access; the wrong fit harms.",
    ot: ["Seating & positioning evaluation (pressure, posture, function)", "Manual/power mobility selection & training", "Environmental control units, AAC referral & smart-home AT", "Computer/access adaptations; caregiver training"],
    assess: ["Seating/pressure mapping", "Functional Mobility Assessment", "COPM"],
    goals: ["Independent pressure relief & functional positioning", "Independent mobility with appropriate wheelchair"],
    settings: "Seating clinic · Rehab · Home · Community",
    links: [{ l: "RESNA (AT professionals)", u: "https://www.resna.org" }]
  },
  {
    id: "palliative", name: "Hospice & Palliative Care", cat: "spec",
    desc: "OT supports comfort, dignity, meaning and participation for people with life-limiting illness.",
    impact: "Declining function, fatigue and changing roles; the goal is quality of life and doing what matters most, on the person's terms.",
    ot: ["Energy conservation & positioning for comfort", "Adaptive equipment to preserve valued occupations & dignity", "Meaningful-activity & legacy/role participation", "Caregiver training; environment for safety & comfort"],
    assess: ["COPM", "symptom/comfort & quality-of-life measures"],
    goals: ["Participate in a personally meaningful activity", "Maintain comfort & dignity in daily care"],
    settings: "Hospice · Home · Palliative care · Inpatient",
    links: [{ l: "CAPC (Palliative Care)", u: "https://www.capc.org" }]
  },

  /* ---------------- ADDED: NEURO & PHYSICAL ---------------- */
  {
    id: "concussion", name: "Concussion / Post-Concussion Syndrome", cat: "neuro",
    desc: "Mild traumatic brain injury from a blow or jolt; most recover quickly, but persistent post-concussion symptoms (4+ weeks) span vestibular, visual, cognitive, sleep and mood domains.",
    impact: "Headache, dizziness, light/sound sensitivity, fatigue, poor concentration and screen intolerance disrupt return to work, school, driving, reading and daily routines.",
    ot: ["Graded return-to-activity (return-to-work/learn/play) with symptom-limited pacing", "Vision- and vestibular-informed rehabilitation within functional tasks (with team)", "Cognitive strategy training and symptom-management education", "Sleep, energy and screen-exposure management; environmental modification (lighting, noise)", "Anxiety/mood support and re-engagement in valued occupations"],
    assess: ["Post-Concussion Symptom Scale", "COPM", "Dizziness Handicap Inventory", "MoCA / cognitive screens", "Convergence/oculomotor screen"],
    goals: ["Tolerate 30 min of screen-based work without symptom flare", "Return to graded school/work duties using pacing", "Resume safe community driving"],
    settings: "Outpatient · Concussion clinic · Sports medicine · Primary care",
    links: [{ l: "CDC HEADS UP", u: "https://www.cdc.gov/headsup/" }, { l: "Concussion Alliance – OT", u: "https://www.concussionalliance.org/occupational-therapy" }]
  },
  {
    id: "peripheral-neuropathy", name: "Peripheral Neuropathy", cat: "neuro",
    desc: "Damage to peripheral nerves (diabetic, chemotherapy-induced/CIPN, idiopathic) causing numbness, tingling, burning pain and weakness, typically in the hands and feet.",
    impact: "Sensory loss and pain impair fine-motor tasks (buttons, fasteners, coins), grip, balance and safe handling of hot or sharp objects; falls and burns risk rises.",
    ot: ["Sensory re-education and desensitisation; mirror therapy for painful limbs", "Compensatory strategies for sensory loss (visual substitution, protective techniques)", "Adaptive equipment and built-up handles for impaired grip/fine motor", "Joint protection, energy management and fall/burn-prevention education", "Pain-coping, graded activity and orthoses as indicated"],
    assess: ["Semmes-Weinstein monofilament testing", "Grip/pinch dynamometry", "9-Hole Peg Test", "QuickDASH", "COPM"],
    goals: ["Manage fasteners and coins using adaptive strategies", "Adopt protective techniques to prevent burns/skin breakdown", "Maintain safe independent self-care despite sensory loss"],
    settings: "Outpatient · Hand therapy · Oncology rehab · Home health",
    links: [{ l: "NINDS – Peripheral Neuropathy", u: "https://www.ninds.nih.gov" }]
  },
  {
    id: "bells-palsy", name: "Bell's Palsy / Facial Paralysis", cat: "neuro",
    desc: "Acute, usually idiopathic facial-nerve (CN VII) palsy causing unilateral facial weakness; OT addresses facial neuromuscular re-education and the functional and psychosocial effects.",
    impact: "Affects eye closure, eating/drinking (drooling, food pocketing), speech intelligibility, facial expression and self-image; risk of corneal exposure and synkinesis.",
    ot: ["Facial neuromuscular re-education with mirror and surface-EMG biofeedback", "Selective, symmetry-focused facial exercises (avoid gross/forceful patterns)", "Eye-protection routines and adaptive eating/drinking strategies", "Synkinesis management and gentle stretching/relaxation", "Psychosocial support around facial disfigurement and participation"],
    assess: ["House-Brackmann / Sunnybrook Facial Grading", "COPM", "Facial Disability Index", "Clinical observation of facial symmetry"],
    goals: ["Achieve protective eye closure during daily tasks", "Reduce drooling/food pocketing during meals", "Improve voluntary facial symmetry for expression"],
    settings: "Outpatient · Facial nerve clinic · Neuro rehab",
    links: [{ l: "NINDS – Bell's Palsy", u: "https://www.ninds.nih.gov" }]
  },
  {
    id: "brachial-plexus-adult", name: "Brachial Plexus Injury (Adult)", cat: "neuro",
    desc: "Traumatic stretch, rupture or avulsion of the brachial plexus (often high-energy/motorcycle trauma) causing partial or complete paralysis and sensory loss of the upper limb.",
    impact: "Loss of shoulder, elbow and/or hand function severely limits dressing, grooming, two-handed tasks and work; neuropathic pain and altered body image are common.",
    ot: ["Sensorimotor retraining and activity-based UE rehabilitation post-injury/nerve-transfer", "Custom orthoses and positioning to protect joints and prevent contracture", "One-handed and adaptive techniques during recovery; edema management", "Neuropathic-pain strategies (graded motor imagery, desensitisation)", "Return-to-work, psychosocial adjustment and goal-directed practice"],
    assess: ["Manual muscle testing", "DASH/QuickDASH", "Sensory mapping/monofilament", "COPM", "Box & Blocks"],
    goals: ["Incorporate affected arm into two-handed ADLs as recovery allows", "Independent self-care using adaptive/one-handed techniques", "Manage neuropathic pain to participate in daily routine"],
    settings: "Outpatient · Hand/peripheral-nerve clinic · Inpatient rehab",
    links: [{ l: "OrthoInfo – Brachial Plexus", u: "https://orthoinfo.aaos.org" }]
  },
  {
    id: "huntingtons", name: "Huntington's Disease", cat: "neuro",
    desc: "Inherited progressive neurodegenerative disorder causing chorea and motor decline, cognitive impairment and psychiatric/behavioural changes.",
    impact: "Involuntary movements, falls, dysphagia, declining cognition and apathy progressively erode self-care, IADLs, work, mealtime safety and roles, increasing caregiver burden.",
    ot: ["Adaptive equipment, weighted utensils and positioning to manage chorea in ADLs", "Energy conservation, routine simplification and falls/home-safety modification", "Cognitive and behavioural strategies; mealtime safety and feeding adaptations", "Seating and pressure-care planning as mobility declines", "Caregiver training, positioning and proactive equipment planning across stages"],
    assess: ["UHDRS (functional impact)", "COPM (client/caregiver)", "MoCA / cognitive screens", "Home safety / falls assessment"],
    goals: ["Maintain safe self-feeding with adapted utensils and set-up", "Reduce fall risk with home modification and routine adaptation", "Caregiver applies positioning and cueing strategies"],
    settings: "Outpatient · Home health · HD specialty clinic · SNF · Hospice",
    links: [{ l: "Huntington's Disease Society of America", u: "https://hdsa.org" }]
  },
  {
    id: "post-icu", name: "Post-Intensive Care Syndrome (PICS)", cat: "neuro",
    desc: "New or worsening physical, cognitive and psychological impairments after critical illness/ICU stay (incl. prolonged ventilation, ARDS, sepsis), affecting many survivors.",
    impact: "Profound weakness/deconditioning, cognitive impairment ('ICU brain fog'), PTSD/anxiety, fatigue and dependence disrupt self-care, return to work and roles long after discharge.",
    ot: ["Early mobilisation and graded ADL reconditioning (begun in ICU where appropriate)", "Cognitive retraining and compensatory strategies (memory, attention, executive function)", "Energy conservation and fatigue management; delirium-aware engagement", "Psychological support, anxiety/PTSD-informed care and re-engagement in roles", "Caregiver education and discharge/home-safety planning"],
    assess: ["FIM / functional status measures", "MoCA / cognitive screens", "COPM", "FACIT-Fatigue"],
    goals: ["Rebuild independence in basic self-care from dependent status", "Use compensatory strategies to complete a multi-step IADL", "Return to prior roles with fatigue and cognitive strategies"],
    settings: "ICU · Acute care · Inpatient rehab · Outpatient · Home health",
    links: [{ l: "SCCM – Post-Intensive Care Syndrome", u: "https://www.sccm.org/clinical-resources/iculiberation-home/about" }]
  },

  /* ---------------- ADDED: HAND / UPPER EXTREMITY ---------------- */
  {
    id: "rotator-cuff", name: "Rotator Cuff & Shoulder Conditions", cat: "hand",
    desc: "Rotator cuff tears/repairs, impingement and adhesive capsulitis (frozen shoulder) — among the most common upper-extremity conditions seen in therapy.",
    impact: "Shoulder pain and limited reach impair overhead tasks, dressing (esp. behind-back/overhead), bathing, lifting, sleep and work; post-op protocols restrict early motion.",
    ot: ["Protocol-based phased rehab (PROM → AAROM → AROM → strengthening) post-repair", "ADL retraining within precautions; adaptive techniques and equipment", "Pain, edema and scar management; activity and ergonomic modification", "Graded functional strengthening and return-to-work/leisure tasks", "Joint mobility work for frozen shoulder; home-program adherence"],
    assess: ["Goniometry (shoulder ROM)", "DASH/QuickDASH", "Manual muscle testing", "Pain scales (shoulder)", "COPM"],
    goals: ["Independent dressing using adaptive techniques within precautions", "Regain functional reach for overhead self-care tasks", "Return to occupational lifting/reaching demands"],
    settings: "Outpatient · Hand therapy · Orthopaedic rehab",
    links: [{ l: "AAOS OrthoInfo – Rotator Cuff", u: "https://orthoinfo.aaos.org" }]
  },

  /* ---------------- ADDED: PAEDIATRICS ---------------- */
  {
    id: "torticollis", name: "Congenital Muscular Torticollis (Infant)", cat: "peds",
    desc: "Postural neck deformity from unilateral shortening/tightness of the sternocleidomastoid, causing head tilt to one side and rotation to the other; often with positional plagiocephaly.",
    impact: "Affects head/neck range, visual tracking, symmetrical reaching, tummy-time tolerance, feeding and emerging fine/gross-motor and sensory development if untreated.",
    ot: ["Positioning and play strategies promoting active movement to the non-preferred side", "Caregiver-coached home program: stretching, tummy time and symmetrical play", "Environmental set-up to encourage tracking/reaching to the affected side", "Feeding and visual-tracking support; developmental monitoring", "Collaboration with PT/medical team; plagiocephaly repositioning education"],
    assess: ["Cervical ROM (rotation/lateral flexion)", "Muscle Function Scale", "Developmental milestone screening", "Clinical observation of symmetry"],
    goals: ["Achieve symmetrical, full neck ROM", "Tolerate prescribed daily tummy time", "Use both hands at midline with symmetrical reaching"],
    settings: "Early intervention · Outpatient peds · Pediatric clinic",
    links: [{ l: "Children's Hospital of Philadelphia – CMT", u: "https://www.chop.edu/conditions-diseases/congenital-muscular-torticollis" }]
  },
  {
    id: "cvi", name: "Cortical/Cerebral Visual Impairment (CVI)", cat: "peds",
    desc: "A leading cause of paediatric visual impairment from brain (rather than ocular) involvement; the eyes may be healthy but the brain has difficulty interpreting what is seen.",
    impact: "Affects visual attention, recognition, reaching to visual targets, navigation and access to play, learning materials and daily routines; clutter and complexity overwhelm vision.",
    ot: ["Environmental modification: reduced clutter, high contrast, optimal lighting, simplified backgrounds", "Multisensory and functional-vision strategies embedded in play and routines", "Positioning and presentation of materials within the child's visual field", "Visually-guided reaching and developmental/play-skill building", "Caregiver/teacher coaching and collaboration with TVI; school participation"],
    assess: ["Functional vision assessment", "CVI Range", "Sensory Profile", "Developmental/play assessments", "Goal Attainment Scaling"],
    goals: ["Visually attend to and reach for a high-contrast object", "Locate familiar items in a simplified environment", "Participate in adapted play/learning routine using vision"],
    settings: "Early intervention · Schools · Outpatient peds · Vision clinic",
    links: [{ l: "Perkins School for the Blind – CVI", u: "https://www.perkins.org/resource/what-cortical-visual-impairment/" }]
  },
  {
    id: "muscular-dystrophy", name: "Muscular Dystrophy (Duchenne / MD)", cat: "peds",
    desc: "Group of inherited disorders causing progressive muscle weakness and wasting; Duchenne MD is the most common childhood form, with predictable stage-based functional decline.",
    impact: "Progressive weakness affects fine/gross motor, self-care, handwriting, school participation, mobility and later upper-limb and respiratory function across the lifespan.",
    ot: ["Stage-appropriate adaptive equipment, assistive technology and dressing/feeding aids", "Energy conservation and activity adaptation to preserve participation", "Splinting/orthoses and positioning to prevent contracture; gentle ROM", "Power mobility, seating and access/computer adaptations as weakness progresses", "School accommodations (IEP/504), caregiver training and home modification"],
    assess: ["PEDI-CAT", "Manual muscle testing / functional grading", "COPM (child/caregiver)", "School Function Assessment"],
    goals: ["Maintain self-feeding/writing with adaptive equipment", "Access classroom materials with adapted tools/technology", "Preserve participation in valued activities at each stage"],
    settings: "Early intervention · Schools · Outpatient peds · MD specialty clinic",
    links: [{ l: "Parent Project Muscular Dystrophy – OT", u: "https://www.parentprojectmd.org/care/care-guidelines/by-area/physical-therapy-and-stretching/occupational-therapy/" }]
  },

  /* ---------------- ADDED: MENTAL HEALTH ---------------- */
  {
    id: "postpartum-mh", name: "Perinatal & Postpartum Mental Health", cat: "mh",
    desc: "Perinatal mood and anxiety disorders (PMADs) — postpartum depression, anxiety and related conditions during pregnancy and the year after birth — addressed alongside the occupational transition to parenthood.",
    impact: "Disrupted sleep, role overload, identity change, anxiety and low mood undermine self-care, infant-care routines, occupational balance and return to valued roles/work.",
    ot: ["Routine restructuring, occupational balance and restorative-occupation scheduling", "Energy conservation, sleep strategies and pain/ergonomics for infant care", "Sensory and self-regulation/coping strategies for anxiety and overwhelm", "Screening for PMADs and warm referral; graded re-engagement in valued roles", "Caregiver/partner education and support around the parenting transition"],
    assess: ["COPM", "Edinburgh Postnatal Depression Scale (screen)", "Occupational balance / role measures", "OSA"],
    goals: ["Establish a sustainable daily routine balancing infant care and self-care", "Use coping/self-regulation strategies to manage anxiety", "Re-engage in one valued restorative occupation weekly"],
    settings: "Community MH · Outpatient · Mother-baby unit · Primary care",
    links: [{ l: "Postpartum Support International – OT", u: "https://postpartum.net/the-benefits-of-occupational-therapy-for-perinatal-mental-health/" }]
  },
  {
    id: "bpd", name: "Borderline Personality Disorder / Emotion Dysregulation", cat: "mh",
    desc: "Pervasive pattern of emotional instability, impulsivity, unstable relationships and self-image, often with self-harm; emotion dysregulation is the core feature.",
    impact: "Mood swings, impulsivity, interpersonal conflict and crises disrupt routines, work/school, relationships and consistent engagement in self-care and valued occupations.",
    ot: ["DBT-informed skills embedded in occupation (mindfulness, distress tolerance, emotion regulation, interpersonal effectiveness)", "Sensory-modulation strategies and self-soothing/grounding toolkits", "Routine structuring, role and time management; occupational balance", "Graded re-engagement in meaningful, valued occupations and vocational roles", "Crisis-coping planning within a validating, trauma-informed relationship"],
    assess: ["COPM", "OSA / MOHOST", "Sensory profile", "Role and Interest Checklists"],
    goals: ["Use a sensory/distress-tolerance strategy to manage a crisis without self-harm", "Maintain a structured daily routine across mood states", "Sustain engagement in a valued role or activity"],
    settings: "Community MH · DBT program · Outpatient · Inpatient psych",
    links: [{ l: "NIMH – Borderline Personality Disorder", u: "https://www.nimh.nih.gov" }]
  },

  /* ---------------- ADDED: GERIATRICS ---------------- */
  {
    id: "hip-fracture", name: "Hip Fracture (Older Adults)", cat: "geri",
    desc: "Fragility hip fracture (typically after a fall in an older adult), usually surgically repaired, with high risk of lasting ADL decline, fear of falling and loss of independence.",
    impact: "Pain, weight-bearing limits and reduced mobility undermine dressing, bathing, toileting and transfers; many lose ADL function, and fear of falling compounds decline.",
    ot: ["Early individualised ADL retraining within weight-bearing precautions", "Adaptive equipment (reacher, sock aid, long shoehorn, raised toilet seat) and safe transfer training", "Home-safety evaluation, modification and falls-prevention strategies", "Energy conservation, confidence-building and fear-of-falling reduction", "Discharge planning, caregiver education and community re-integration"],
    assess: ["FIM / Barthel Index", "Timed Up & Go", "Falls Efficacy Scale", "COPM", "Home safety assessment"],
    goals: ["Independent lower-body dressing with adaptive equipment within precautions", "Safe toilet and tub/shower transfers", "Return home with reduced fall risk and restored ADL independence"],
    settings: "Acute · Inpatient rehab · SNF · Home health · Outpatient",
    links: [{ l: "AAOS OrthoInfo – Hip Fractures", u: "https://orthoinfo.aaos.org" }]
  },

  /* ---------------- ADDED: SPECIALTY & OTHER ---------------- */
  {
    id: "fibromyalgia", name: "Fibromyalgia", cat: "spec",
    desc: "Chronic widespread musculoskeletal pain with fatigue, sleep disturbance, cognitive difficulty ('fibro fog') and heightened pain sensitivity.",
    impact: "Pain, fatigue and cognitive fog with 'boom-and-bust' cycles limit work, household tasks, self-care, leisure and social participation; flares disrupt routines.",
    ot: ["Activity pacing and energy management (energy-envelope / 'spoon' strategies)", "Joint protection, ergonomics and adaptive equipment", "Pain-neuroscience education and CBT-informed coping; relaxation/mindfulness", "Sleep hygiene, routine balance and graded activity", "Work and role adaptation; self-management and self-advocacy"],
    assess: ["COPM", "Fibromyalgia Impact Questionnaire (FIQ)", "MFIS / FACIT-Fatigue", "Activity diaries"],
    goals: ["Use pacing to complete priority tasks without triggering a flare", "Apply energy conservation across the daily routine", "Sustain a valued occupation within energy and pain limits"],
    settings: "Outpatient · Pain program · Rheumatology · Community",
    links: [{ l: "CDC – Fibromyalgia", u: "https://www.cdc.gov/arthritis/about/fibromyalgia.htm" }]
  },
  {
    id: "eds-hypermobility", name: "Ehlers-Danlos / Hypermobility Spectrum Disorder", cat: "spec",
    desc: "Connective-tissue conditions (hypermobile EDS and hypermobility spectrum disorders) causing joint hypermobility, instability, chronic pain, fatigue and frequent subluxations/dislocations.",
    impact: "Joint instability, pain, fatigue, dysautonomia and poor proprioception undermine handwriting, gripping, dressing, work and endurance; injury and 'crash-and-burn' cycles are common.",
    ot: ["Custom orthoses and joint supports to stabilise painful/unstable joints (esp. hands/wrists)", "Joint-protection education and ergonomic/task modification", "Pacing, energy conservation and fatigue/'brain fog' management", "Gentle proprioception, coordination and joint-position-sense activities", "Adaptive writing tools and equipment; sleep and stress strategies"],
    assess: ["COPM", "Beighton score (context)", "Grip/pinch dynamometry", "QuickDASH", "Fatigue measures"],
    goals: ["Use orthoses and joint protection to reduce hand pain during tasks", "Apply pacing to prevent post-activity crashes", "Maintain handwriting/keyboarding endurance with adaptive tools"],
    settings: "Outpatient · Hand therapy · Rheumatology · Pain program",
    links: [{ l: "The Ehlers-Danlos Society – OT", u: "https://www.ehlers-danlos.com/occupational-therapy/" }]
  }
];
