/* ============================================================
   ASSESSMENTS & OUTCOME MEASURES
   Each: {name, abbr, cat, measures, pop, notes}
   ============================================================ */
window.OT = window.OT || {};

OT.assessmentCategories = [
  "Occupation & Participation", "ADL / Function", "Cognition", "Motor & Upper Extremity",
  "Sensory & Visual-Motor", "Balance & Falls", "Paediatric", "Mental Health"
];

OT.assessments = [
  // Occupation & participation
  { name: "Canadian Occupational Performance Measure", abbr: "COPM", cat: "Occupation & Participation", measures: "Client-identified problems in self-care, productivity & leisure; self-rated performance and satisfaction.", pop: "All ages (self/proxy report)", notes: "A gold-standard client-centred, semi-structured interview and outcome measure; operationalises CMOP-E." },
  { name: "Occupational Performance History Interview-II", abbr: "OPHI-II", cat: "Occupation & Participation", measures: "Life history, occupational identity, competence and the impact of environments over time.", pop: "Adolescent–adult", notes: "MOHO-based narrative interview with rating scales and a life-history narrative." },
  { name: "Model of Human Occupation Screening Tool", abbr: "MOHOST", cat: "Occupation & Participation", measures: "Volition, habituation, communication/interaction, process & motor skills, and environment.", pop: "Adult (esp. mental health)", notes: "Broad MOHO screen; great overview when clients can't self-report easily." },
  { name: "Occupational Self-Assessment", abbr: "OSA", cat: "Occupation & Participation", measures: "Self-perception of occupational competence and the values placed on activities; sets priorities.", pop: "Adult", notes: "MOHO client-report; collaborative goal setting." },
  { name: "Role Checklist", abbr: "—", cat: "Occupation & Participation", measures: "Past/present/future life roles and their perceived value.", pop: "Adolescent–adult", notes: "Quick MOHO tool for role identity and balance." },
  { name: "Interest Checklist", abbr: "—", cat: "Occupation & Participation", measures: "Strength of interest in leisure/occupational activities, past and present.", pop: "Adolescent–adult", notes: "Supports motivation and meaningful-activity planning (MOHO)." },
  { name: "Assessment of Communication & Interaction Skills", abbr: "ACIS", cat: "Occupation & Participation", measures: "Social interaction skills during occupation (physicality, information exchange, relations).", pop: "Adult", notes: "Observation-based MOHO tool." },

  // ADL / function
  { name: "Assessment of Motor & Process Skills", abbr: "AMPS", cat: "ADL / Function", measures: "Quality of ADL/IADL performance via 16 motor and 20 process skills during real tasks.", pop: "≈3 yrs–elderly", notes: "Standardised, observation-based, requires certification; powerful for occupation-focused evaluation." },
  { name: "Functional Independence Measure", abbr: "FIM", cat: "ADL / Function", measures: "Burden of care across 18 motor & cognitive items (7-level assist scale).", pop: "Adult rehab", notes: "Widely used rehab outcome; WeeFIM is the paediatric version." },
  { name: "Barthel Index", abbr: "—", cat: "ADL / Function", measures: "Independence in 10 basic ADLs.", pop: "Adult (esp. stroke/geriatric)", notes: "Quick, classic ADL index." },
  { name: "Katz / Lawton IADL Scales", abbr: "—", cat: "ADL / Function", measures: "Basic ADLs (Katz) and instrumental ADLs (Lawton-Brody).", pop: "Older adults", notes: "Screening of functional status, esp. in geriatrics." },
  { name: "Performance Assessment of Self-Care Skills", abbr: "PASS", cat: "ADL / Function", measures: "Independence, safety and adequacy across functional tasks (clinic or home versions).", pop: "Adult", notes: "Criterion-referenced, observation-based." },

  // Cognition
  { name: "Montreal Cognitive Assessment", abbr: "MoCA", cat: "Cognition", measures: "Global cognition — attention, executive function, memory, language, visuospatial, orientation.", pop: "Adult", notes: "Sensitive to mild cognitive impairment; requires certification to administer." },
  { name: "Mini-Mental State Examination", abbr: "MMSE", cat: "Cognition", measures: "Global cognitive screen (orientation, recall, attention, language).", pop: "Adult/older adult", notes: "Classic dementia screen; less sensitive to executive/MCI than MoCA." },
  { name: "Allen Cognitive Level Screen", abbr: "ACLS / LACLS", cat: "Cognition", measures: "Global cognitive function for daily activity via a leather-lacing task (Allen levels 3–5.8).", pop: "Adult (MH, dementia, BI)", notes: "Cognitive Disabilities Model; guides supervision and task demands." },
  { name: "Executive Function Performance Test", abbr: "EFPT", cat: "Cognition", measures: "Executive function during real tasks (cooking, bill paying) and cueing needed.", pop: "Adult (stroke/BI)", notes: "Performance-based, ecologically valid." },
  { name: "A-ONE (Árnadóttir OT-ADL Neurobehavioral Eval)", abbr: "A-ONE", cat: "ADL / Function", measures: "Links ADL performance to underlying neurobehavioural impairments.", pop: "Adult neuro", notes: "Standardised observational ADL assessment that detects apraxia, neglect and perseveration within self-care — bridges ADL/function and cognition." },

  // Motor & UE
  { name: "Nine-Hole Peg Test", abbr: "9-HPT", cat: "Motor & Upper Extremity", measures: "Finger dexterity / fine-motor speed (timed).", pop: "All ages (norms)", notes: "Quick, reliable dexterity outcome." },
  { name: "Box & Blocks Test", abbr: "BBT", cat: "Motor & Upper Extremity", measures: "Gross manual dexterity (blocks moved in 60 s).", pop: "All ages", notes: "Simple, normed unilateral dexterity measure." },
  { name: "Jebsen-Taylor Hand Function Test", abbr: "JTHFT", cat: "Motor & Upper Extremity", measures: "Timed functional hand tasks (writing, page-turning, feeding, manipulation).", pop: "Adult/child norms", notes: "Functional hand-use outcome." },
  { name: "Grip & Pinch Dynamometry", abbr: "—", cat: "Motor & Upper Extremity", measures: "Grip and pinch (tip/key/palmar) strength.", pop: "All ages (Jamar norms)", notes: "Standardised positioning; core hand-therapy metric." },
  { name: "DASH / QuickDASH", abbr: "DASH", cat: "Motor & Upper Extremity", measures: "Self-reported upper-limb disability and symptoms.", pop: "Adult", notes: "Region-specific PROM; QuickDASH is the 11-item short form." },
  { name: "Fugl-Meyer Assessment (UE)", abbr: "FMA-UE", cat: "Motor & Upper Extremity", measures: "Post-stroke motor impairment, sensation, ROM and coordination.", pop: "Adult stroke", notes: "Research and clinical standard for stroke UE recovery." },
  { name: "Goniometry / Manual Muscle Testing", abbr: "ROM / MMT", cat: "Motor & Upper Extremity", measures: "Joint range of motion (goniometer) and muscle strength (0–5).", pop: "All ages", notes: "Foundational biomechanical measures." },

  // Sensory & visual-motor
  { name: "Sensory Profile 2 / Sensory Processing Measure", abbr: "SP-2 / SPM", cat: "Sensory & Visual-Motor", measures: "Sensory processing patterns across home, school and community.", pop: "Birth–adult (versions)", notes: "Caregiver/teacher/self questionnaires; map registration, seeking, sensitivity, avoiding." },
  { name: "Sensory Integration & Praxis Tests / EASI", abbr: "SIPT / EASI", cat: "Sensory & Visual-Motor", measures: "Sensory integration and praxis functions.", pop: "Children 4y0m–8y11m (SIPT)", notes: "The SIPT is normed for ages 4y0m–8y11m and requires certification. The EASI (Evaluation in Ayres Sensory Integration) is a newer, freely-available international successor with a broader age range." },
  { name: "Beery-Buktenica Visual-Motor Integration", abbr: "Beery VMI", cat: "Sensory & Visual-Motor", measures: "Visual-motor integration, visual perception & motor coordination.", pop: "2–100 yrs", notes: "Common in handwriting/school evaluations." },
  { name: "Motor-Free Visual Perception Test", abbr: "MVPT", cat: "Sensory & Visual-Motor", measures: "Visual perception without a motor response.", pop: "Child–adult", notes: "Isolates perception from motor ability." },

  // Balance & falls
  { name: "Berg Balance Scale", abbr: "BBS", cat: "Balance & Falls", measures: "Static & dynamic balance across 14 functional tasks.", pop: "Adult/older adult", notes: "Predicts fall risk; widely used." },
  { name: "Timed Up & Go", abbr: "TUG", cat: "Balance & Falls", measures: "Functional mobility & fall risk (timed rise-walk-turn-sit).", pop: "Older adults", notes: "Fast screen; ≥12 s flags risk." },
  { name: "Tinetti POMA", abbr: "POMA", cat: "Balance & Falls", measures: "Gait and balance performance and fall risk.", pop: "Older adults", notes: "Performance-oriented mobility assessment." },
  { name: "Falls Efficacy Scale-International", abbr: "FES-I", cat: "Balance & Falls", measures: "Concern/fear about falling during activities.", pop: "Older adults", notes: "Captures the psychological side of falls." },

  // Paediatric
  { name: "Pediatric Evaluation of Disability Inventory-CAT", abbr: "PEDI-CAT", cat: "Paediatric", measures: "Daily activities, mobility, social/cognitive function and responsibility.", pop: "Birth–21 yrs", notes: "Computer-adaptive functional measure." },
  { name: "Bruininks-Oseretsky Test of Motor Proficiency-2", abbr: "BOT-2", cat: "Paediatric", measures: "Fine & gross motor proficiency.", pop: "4–21 yrs", notes: "Norm-referenced motor battery." },
  { name: "Peabody Developmental Motor Scales-2", abbr: "PDMS-2", cat: "Paediatric", measures: "Gross & fine motor development.", pop: "Birth–5 yrs", notes: "Early-childhood motor assessment." },
  { name: "School Function Assessment", abbr: "SFA", cat: "Paediatric", measures: "Participation, task supports and activity performance in the school setting.", pop: "K–6", notes: "Links function to educational participation." },
  { name: "Miller Function & Participation Scales / Movement ABC-2", abbr: "M-FUN / MABC-2", cat: "Paediatric", measures: "Functional motor performance and coordination (DCD screening).", pop: "Preschool–school age", notes: "Identifies motor difficulties affecting participation." },
  { name: "Goal Attainment Scaling", abbr: "GAS", cat: "Paediatric", measures: "Individualised, scaled goal outcomes (−2 to +2).", pop: "All ages", notes: "Sensitive, client-specific outcome — common in paeds & rehab." },

  // Mental health
  { name: "Kohlman Evaluation of Living Skills", abbr: "KELS", cat: "Mental Health", measures: "Basic living skills needed for community living (self-care, safety, money, transport).", pop: "Adult", notes: "Quick discharge/independence screen." },
  { name: "Independent Living Scales", abbr: "ILS", cat: "Mental Health", measures: "Competence in instrumental living skills & judgement.", pop: "Adult/older adult", notes: "Capacity for independent living." },
  { name: "Volitional Questionnaire", abbr: "VQ", cat: "Mental Health", measures: "Motivation observed through behaviour for clients who can't self-report.", pop: "Adult", notes: "MOHO observational tool." },

  // ---- Added ----
  { name: "Reintegration to Normal Living Index", abbr: "RNLI", cat: "Occupation & Participation", measures: "Satisfaction with community reintegration across mobility, self-care, daily activity, recreation, family roles, relationships, self-presentation and coping (11 items).", pop: "Adult (stroke, SCI, geriatric)", notes: "Self/proxy-report participation outcome split into daily functioning and perception of self." },
  { name: "Worker Role Interview", abbr: "WRI", cat: "Occupation & Participation", measures: "Psychosocial & environmental factors affecting ability to return to, retain or obtain work (volition, habituation, environment).", pop: "Adult (injured/disabled workers)", notes: "MOHO semi-structured interview plus rating scale; vocational-rehab planning." },
  { name: "Patient-Specific Functional Scale", abbr: "PSFS", cat: "Occupation & Participation", measures: "Client-nominated activities limited by their condition, each self-rated 0 (unable) to 10 (prior level).", pop: "Adult (musculoskeletal & general)", notes: "Quick, free, individualised PROM; complements COPM." },
  { name: "Action Research Arm Test", abbr: "ARAT", cat: "Motor & Upper Extremity", measures: "Upper-limb function across 19 items in four subscales: grasp, grip, pinch and gross movement (total 0–57).", pop: "Adult (stroke, ABI, MS)", notes: "Observational, hierarchical scoring; responsive standard for UE recovery." },
  { name: "Wolf Motor Function Test", abbr: "WMFT", cat: "Motor & Upper Extremity", measures: "Upper-extremity motor ability via 15 timed functional tasks plus strength items, scored for time and functional-ability quality.", pop: "Adult (stroke, TBI)", notes: "Tasks progress proximal→distal; common CIMT outcome." },
  { name: "Chedoke Arm & Hand Activity Inventory", abbr: "CAHAI", cat: "Motor & Upper Extremity", measures: "Bilateral upper-limb performance in functional ADL tasks (13 items, 7-point scale).", pop: "Adult stroke", notes: "Encourages affected-limb use in real tasks; shorter 7/8/9-item forms exist." },
  { name: "Modified Ashworth Scale", abbr: "MAS", cat: "Motor & Upper Extremity", measures: "Resistance to passive movement / muscle tone, graded 0–4 (0, 1, 1+, 2, 3, 4).", pop: "All ages (neuro/spasticity)", notes: "The most widely used clinical spasticity grading; quick bedside measure." },
  { name: "Purdue Pegboard Test", abbr: "PPT", cat: "Motor & Upper Extremity", measures: "Fine finger dexterity & bimanual coordination via four subtests (dominant, non-dominant, both, assembly).", pop: "All ages (age/sex norms)", notes: "Distinguishes fingertip dexterity from gross arm/hand movement; vocational & neuro use." },
  { name: "Stroke Impact Scale 3.0", abbr: "SIS", cat: "ADL / Function", measures: "Health-related quality of life across 8 domains (strength, hand function, mobility, ADL/IADL, memory, communication, emotion, participation) plus recovery; 0–100 per domain.", pop: "Adult stroke", notes: "59-item self/proxy report; captures impact beyond basic ADL independence." },
  { name: "Loewenstein OT Cognitive Assessment", abbr: "LOTCA", cat: "Cognition", measures: "Cognition across orientation, visual & spatial perception, motor praxis, visuomotor organisation and thinking operations.", pop: "Adult neuro (esp. brain injury)", notes: "OT-developed battery giving a cognitive profile to guide intervention; dynamic version adds mediation." },
  { name: "Rivermead Behavioural Memory Test", abbr: "RBMT-3", cat: "Cognition", measures: "Everyday/functional memory including prospective memory via ecologically valid subtests.", pop: "Adult (≈16–96 yrs)", notes: "Predicts everyday memory failures; more functional than list-learning tests." },
  { name: "Trail Making Test", abbr: "TMT A & B", cat: "Cognition", measures: "Visual attention & processing speed (A) and set-shifting / executive function (B), timed.", pop: "Adult/older adult (norms)", notes: "Brief paper-pencil screen; B−A difference isolates executive load." },
  { name: "Activities-specific Balance Confidence Scale", abbr: "ABC", cat: "Balance & Falls", measures: "Self-rated confidence (0–100%) in maintaining balance across 16 graded ambulatory activities.", pop: "Older / community-dwelling adults", notes: "Captures fall-related self-efficacy; <50% low, 50–80% moderate, >80% high function." },
  { name: "Mini-BESTest", abbr: "Mini-BESTest", cat: "Balance & Falls", measures: "Dynamic balance across anticipatory postural adjustments, reactive control, sensory orientation and gait (14 items).", pop: "Adult neuro (stroke, PD, vestibular)", notes: "Targets balance subsystems to direct intervention; strong fall prediction." },
  { name: "Semmes-Weinstein Monofilament Test", abbr: "SWMT", cat: "Sensory & Visual-Motor", measures: "Cutaneous pressure-threshold / light-touch sensation mapped by graded monofilaments.", pop: "All ages (hand, neuropathy, diabetes)", notes: "Standard hand-therapy sensibility test; grades light touch to loss of protective sensation." },
  { name: "Test of Visual Perceptual Skills (4th Ed.)", abbr: "TVPS-4", cat: "Sensory & Visual-Motor", measures: "Motor-free visual perception across 7 areas (discrimination, memory, spatial relations, form constancy, sequential memory, figure-ground, closure).", pop: "4–19 yrs", notes: "Verbal/pointing response isolates perception from motor output; common in school OT." },
  { name: "Test of Playfulness", abbr: "ToP", cat: "Paediatric", measures: "Playfulness during free play across intrinsic motivation, internal control, freedom to suspend reality and framing.", pop: "6 mo–18 yrs", notes: "Observational, trained-rater tool; addresses play as a core childhood occupation." }
];
