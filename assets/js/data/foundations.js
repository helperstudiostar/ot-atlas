/* ============================================================
   FOUNDATIONS — what OT is, history, philosophy, the profession,
   the OTPF-4 Domain, and the OT Process.
   ============================================================ */
window.OT = window.OT || {};

OT.foundations = {

  whatIsOT: {
    headline: "Occupational therapy helps people do the everyday things they want and need to do.",
    plain:
      "Occupational therapy (OT) is a client-centred health profession concerned with promoting health and well-being through <strong>occupation</strong> — the meaningful, everyday activities that fill a person's life. The goal of OT is to enable people to participate in the activities of daily life. Practitioners do this by working with people and communities to enhance their ability to engage in the occupations they want to, need to, or are expected to do — or by modifying the occupation or the environment to better support occupational engagement.",
    occupation:
      "In OT, <strong>“occupation” does not mean a job.</strong> It means everything people do to occupy their time and give life meaning — getting dressed, preparing a meal, going to school or work, playing, parenting, socialising, worshipping, resting and sleeping. When illness, injury, disability, or life circumstances disrupt these occupations, OT helps restore, adapt, or rebuild them.",
    distinctValue:
      "OT's distinct value is improving health, well-being, and quality of life by helping people <em>do</em> the things that matter to them. Where some disciplines focus on the body part or the impairment, OT keeps its eye on participation in real life — and on the dynamic fit between the <strong>person</strong>, their <strong>environment</strong>, and the <strong>occupation</strong>.",
    serves: [
      "People of <strong>all ages</strong> — newborns in the NICU to elders aging in place.",
      "Across the whole continuum: <strong>prevention &amp; wellness</strong>, acute illness, rehabilitation, chronic-condition management, and end-of-life care.",
      "In homes, schools, hospitals, clinics, workplaces, prisons, shelters and the community.",
      "With individuals, groups, organisations, and whole populations."
    ]
  },

  vsOthers: {
    intro: "OT is often confused with physical therapy (PT) and speech-language pathology (SLP). They overlap and collaborate, but their lens differs.",
    rows: [
      { d: "Occupational Therapy (OT)", focus: "Participation in meaningful daily occupations — self-care, productivity, leisure, roles.", lens: "“What do you need and want to <em>do</em>, and what's getting in the way?” Adapts the task, the environment, and the person.", egs: "Re-learning dressing after a stroke; school handwriting; home modifications; sensory strategies; return-to-work; cognitive strategies for daily routines.",
        alias: "The same title — occupational therapist — is used worldwide.",
        more: {
          who: ["People of all ages, from children to older adults", "People recovering from illness, injury or surgery", "People with physical, learning or mental health conditions", "Children with developmental differences, including autism", "Older adults managing memory changes or falls risk"],
          settings: ["Hospitals, clinics and rehabilitation centres", "People's homes and community services", "Schools and nurseries", "Mental health and social care services", "Workplaces and private practice"],
          whenToSee: ["Everyday tasks like dressing or bathing feel hard", "Illness or injury has changed how you manage daily life", "A child struggles with play, handwriting or self-care", "Memory or concentration changes are disrupting daily routines", "Mental health makes everyday activities feel harder"],
          specialties: ["Hand and upper-limb therapy", "Children (paediatrics) and school-based practice", "Mental health", "Older adults (gerontology)", "Home modification and low vision"],
          team: ["Occupational therapy assistants (US: OTAs) help deliver therapy", "UK: support workers and technicians fill similar roles", "Assistants work under the occupational therapist's supervision", "The therapist stays responsible for assessment and planning"],
          training: ["University degree; entry level varies by country", "US: master's or doctorate, NBCOT exam, state licence", "UK: approved degree or apprenticeship; HCPC registration", "Canada and Australia: accredited degree plus registration", "Regulated in many countries — check your national regulator"]
        } },
      { d: "Physical Therapy (PT)", focus: "Movement, strength, gait, balance, pain and gross motor function.", lens: "“How can we restore movement and physical function?”", egs: "Gait training, strengthening, restoring range of motion, managing musculoskeletal pain.",
        alias: "Known as physiotherapy in most countries; physical therapy in the US.",
        more: {
          who: ["People of all ages, from babies to older adults", "People whose movement is limited by injury or illness", "People with neurological conditions like stroke or Parkinson's", "People with heart, lung or circulation conditions", "Athletes and people recovering from surgery"],
          settings: ["Hospitals and outpatient clinics", "Community services and people's homes", "Sports facilities and workplaces", "Schools and care homes", "Private practice, including video appointments"],
          whenToSee: ["Pain or stiffness limits your everyday movement", "Regaining movement after surgery, injury or stroke", "Balance difficulties or a fear of falling", "A breathing condition limits your daily activity", "Bladder leakage or pregnancy-related aches"],
          specialties: ["Musculoskeletal and sports (muscles, bones, joints)", "Neurology (stroke, MS, Parkinson's)", "Heart and lung (cardiorespiratory) rehabilitation", "Pelvic health", "Older adults, children, and vestibular (balance) care"],
          team: ["Physical therapist assistants (US: PTAs) help provide treatment", "PTAs work under a physical therapist's direction and supervision", "UK: physiotherapy support workers assist with rehab programmes", "The therapist keeps responsibility for evaluation and care plan"],
          training: ["University degree; entry level varies by country", "US: Doctor of Physical Therapy (DPT) plus state licence", "UK: approved degree or apprenticeship; HCPC registration", "Regulated in many countries — check your national organisation"]
        } },
      { d: "Speech-Language Pathology (SLP)", focus: "Communication, language, cognition-communication, voice and swallowing (dysphagia).", lens: "“How can we improve communicating and swallowing safely?”", egs: "Aphasia therapy, articulation, AAC devices, swallow studies.",
        alias: "Speech-language pathologist (US/CA) · speech and language therapist (UK) · speech pathologist (AU).",
        more: {
          who: ["People of all ages, from babies to older adults", "Children with speech, language or communication difficulties", "Adults with communication or swallowing changes after illness", "People who stammer or stutter, or have voice difficulties", "People who use communication aids (AAC)"],
          settings: ["Hospital wards and outpatient clinics", "Schools and nurseries", "Community clinics and home visits", "Care homes and justice settings", "Private practice, universities and research"],
          whenToSee: ["A child talks late or is hard to understand", "Stammering or stuttering that persists or causes distress", "Voice changes lasting weeks — worth a doctor's check too", "Often coughing or choking when eating or drinking", "Communication changes after stroke or with dementia"],
          specialties: ["Swallowing difficulties (dysphagia)", "Voice and fluency (stuttering/stammering)", "Children's speech, language and social communication", "AAC — communication aids and devices", "Cognitive-communication after brain injury"],
          team: ["Speech-language pathology assistants (US: SLPAs) support therapy", "Assistants follow plans written by the therapist", "The supervising therapist keeps overall responsibility", "UK: SLT assistants and support workers, therapist-supervised"],
          training: ["University degree; requirements vary by country", "US: master's degree, state licence, usually CCC-SLP certification", "UK: approved degree; HCPC registration", "Canada and Australia: accredited degree plus professional certification"]
        } }
    ],
    note: "OT and PT often share goals like upper-limb recovery or balance; OT frames them around the daily activity (e.g., reaching a cupboard to make tea), while PT frames them around the movement itself. Great teams blur the line and coordinate.",
    /* F46 overlaps — plain-language zone items vetted against AOTA/APTA/ASHA scope documents +
       .gov sources by an adversarial accuracy pass (2026-07-09, sources in PROGRESS.md).
       PENDING CLINICIAN SIGN-OFF (F27 lane). Contested boundaries deliberately soft-worded.
       The rows[].alias/more profiles (F47) are ALSO pending the same sign-off — vetted against
       WFOT/AOTA/RCOT/World Physiotherapy/APTA/CSP/ASHA/RCSLT/NHS sources, worded internationally. */
    overlaps: {
      intro: "The professions overlap on purpose — the same recovery seen through different lenses. OT shares real scope with both PT and SLP; PT and SLP mostly meet through the person they both treat. The circle overlaps are drawn to match:",
      zones: [
        { key: "otpt", who: "OT + PT", items: ["Regaining movement for daily life after stroke", "Safe transfers — bed, chair, toilet, car", "Fall prevention and home safety", "Wheelchair seating and mobility equipment"] },
        { key: "otslp", who: "OT + SLP", items: ["Feeding and swallowing — roles vary by setting", "Memory, attention and thinking skills", "Paediatric feeding teams and mealtime routines", "Daily-life strategies after brain injury or dementia"] },
        { key: "ptslp", who: "PT + SLP", items: ["Working together on shared patients (co-treatment, not shared scope)", "Posture and positioning for safe swallowing", "Breath support for voice and speech", "Walking-while-talking practice after brain injury"] },
        { key: "all", who: "All three", items: ["The core stroke and brain-injury rehab team", "Early intervention and school-based services", "Patient, family and caregiver education", "One shared goal: independence and quality of life"] }
      ],
      caveat: "Exact boundaries vary by country, licensure and setting — good teams negotiate roles around the person rather than defending turf."
    }
  },

  philosophy: {
    intro: "A handful of core beliefs run through everything OT does:",
    tenets: [
      { term: "Occupation is central to health", body: "Humans are occupational beings; doing meaningful activities is itself health-giving. Engagement in occupation is both the means and the end of therapy." },
      { term: "Holism", body: "People are viewed as whole beings — physical, cognitive, emotional, social, spiritual — not as a diagnosis or a body part. Mind and body are inseparable." },
      { term: "Client-centred practice", body: "The person (and family) are partners. Their priorities, values, culture and goals drive the plan. The therapist's expertise serves the client's chosen direction." },
      { term: "Occupational justice", body: "Everyone has the right to participate in the occupations they need and value. OT addresses barriers — disability, poverty, discrimination, environment — that deprive people of occupation (occupational deprivation, alienation, imbalance, marginalisation)." },
      { term: "The person–environment–occupation fit", body: "Performance emerges from the transaction between the person, their occupation, and their context. Change any one — adapt the task, modify the home, build a skill — and participation can improve." },
      { term: "Activity & occupational analysis", body: "A signature OT skill: breaking an activity into its component demands and steps to understand exactly why someone struggles and where to intervene." },
      { term: "Therapeutic use of self", body: "The therapist's empathy, rapport, and intentional relationship are themselves a tool that shapes outcomes." },
      { term: "Evidence-informed & meaningful", body: "Interventions are grounded in evidence and theory, yet always tailored to what is meaningful and motivating for the individual — the ‘just-right challenge.’" }
    ]
  },

  history: {
    intro: "OT grew from the 19th-century <strong>Moral Treatment</strong> movement and the <strong>Arts &amp; Crafts</strong> movement — the radical idea that engaging people in purposeful activity and craft could restore mind and body. The profession was formally founded in 1917.",
    founders: [
      { name: "Adolf Meyer", role: "Psychiatrist whose 1922 ‘Philosophy of Occupation Therapy’ argued that a balanced rhythm of work, rest, play and sleep is essential to health." },
      { name: "Eleanor Clarke Slagle", role: "The ‘mother of occupational therapy’; pioneered ‘habit training’ and helped organise and professionalise the field." },
      { name: "William Rush Dunton Jr.", role: "Psychiatrist, the ‘father of occupational therapy,’ who championed occupation as a curative force." },
      { name: "George Edward Barton", role: "Architect and disability advocate who founded Consolation House and hosted the 1917 founding meeting of the National Society for the Promotion of Occupational Therapy (later AOTA)." },
      { name: "Susan Tracy / Susan Cox Johnson / Thomas Kidner", role: "Founding members who shaped nursing-craft instruction, ethics, and vocational rehabilitation." },
      { name: "Dr. A. Jean Ayres", role: "OT and neuroscientist who developed Sensory Integration theory in the 1960s–70s — foundational to paediatric practice." },
      { name: "Gary Kielhofner", role: "Developed the Model of Human Occupation (MOHO), OT's most-used occupation-focused model." }
    ],
    timeline: [
      { year: "1700s–1800s", text: "Moral Treatment: physicians like Pinel and Tuke use purposeful activity to treat mental illness humanely." },
      { year: "1910s", text: "The Arts & Crafts movement and rehabilitation of WWI soldiers (‘reconstruction aides’) seed the profession." },
      { year: "1917", text: "The National Society for the Promotion of Occupational Therapy is founded in Clifton Springs, NY — later AOTA." },
      { year: "1922", text: "Adolf Meyer publishes ‘The Philosophy of Occupation Therapy.’" },
      { year: "1940s", text: "WWII and polio expand OT into physical rehabilitation; reductionistic/biomechanical focus grows." },
      { year: "1960s–70s", text: "Ayres develops Sensory Integration; Reilly's ‘occupational behaviour’ revives occupation focus (‘Man… can influence the state of his own health’)." },
      { year: "1980s", text: "Kielhofner publishes the Model of Human Occupation (MOHO); the ‘return to occupation’ accelerates." },
      { year: "1989", text: "The discipline of Occupational Science is established (USC) to study humans as occupational beings." },
      { year: "2000s", text: "Evidence-based practice matures; OTPF (2002) standardises language; occupational justice enters the lexicon." },
      { year: "2017", text: "AOTA Centennial — 100 years of the profession." },
      { year: "2020", text: "OTPF-4 published; telehealth and OT's role in primary care, wellness and population health expand rapidly." }
    ]
  },

  profession: {
    roles: [
      { term: "Occupational Therapist (OT / OTR)", body: "Evaluates, plans and directs intervention. Entry-level is a master's (MOT/MSOT) or clinical doctorate (OTD); requires passing the national certification exam (NBCOT in the US) and state licensure." },
      { term: "Occupational Therapy Assistant (OTA / COTA)", body: "Delivers intervention under the supervision of an OT; entry is an associate degree. A vital, hands-on partner in care." },
      { term: "OT Aide", body: "Non-licensed support personnel who assist with preparation and routine tasks under direct supervision." }
    ],
    education:
      "US entry-level practice requires a graduate degree (MOT/MSOT or entry-level OTD) from an ACOTE-accredited program, supervised Level I &amp; II fieldwork, and a passing score on the NBCOT exam, then state licensure. Doctoral programs add a capstone. Globally, qualification ranges from bachelor's to master's; WFOT sets minimum education standards.",
    specialties: [
      "Sensory Integration / Ayres SI (SIPT certification)",
      "Certified Hand Therapist (CHT)",
      "Certified Driver Rehabilitation Specialist (CDRS)",
      "Low Vision (SCLV)",
      "Assistive Technology (ATP)",
      "Lymphedema / Certified Lymphedema Therapist (CLT)",
      "Neuro-IFRAH / NDT, LSVT BIG (Parkinson's)",
      "Mental health, paediatrics, gerontology, feeding/eating/swallowing"
    ],
    settings: [
      { name: "Acute care hospital", desc: "Early mobility, ADL retraining, discharge planning, equipment, safety after surgery, stroke or illness." },
      { name: "Inpatient rehabilitation (IRF)", desc: "Intensive daily rehab after stroke, TBI, SCI, amputation — rebuilding independence in self-care and mobility." },
      { name: "Skilled nursing facility (SNF) / sub-acute", desc: "Restorative care, fall prevention, functional maintenance for older adults." },
      { name: "Outpatient clinic", desc: "Ongoing rehab for hands, orthopaedics, neuro, and chronic conditions." },
      { name: "Hand therapy clinic", desc: "Specialised upper-limb rehab, custom orthoses/splints, post-surgical protocols." },
      { name: "Schools (K-12)", desc: "Help students access education — handwriting, fine motor, sensory, self-regulation, AT, participation (under IDEA in the US)." },
      { name: "Early intervention (0–3)", desc: "Coaching families of infants/toddlers with developmental delays in natural environments." },
      { name: "Home health", desc: "Therapy in the person's own home; home safety, modifications, real-world routines." },
      { name: "Mental & behavioural health", desc: "Inpatient and community psych, recovery-oriented groups, life-skills, return-to-role." },
      { name: "Community & population health", desc: "Wellness, prevention, homelessness, refugee resettlement, ageing-in-place programs." },
      { name: "NICU", desc: "Specialised care for premature/medically fragile infants — feeding, positioning, neuroprotection, parent coaching." },
      { name: "Hospice & palliative care", desc: "Comfort, dignity, meaningful participation and energy management near end of life." },
      { name: "Work & industry / ergonomics", desc: "Functional capacity evaluations, work conditioning, injury prevention, job-site analysis." },
      { name: "Academia & research", desc: "Educating future practitioners and building the evidence base; occupational science." },
      { name: "Telehealth", desc: "Remote evaluation, coaching and intervention — expanded dramatically since 2020." }
    ]
  },

  // ===================== OTPF-4 DOMAIN =====================
  domain: {
    intro:
      "The <strong>Occupational Therapy Practice Framework: Domain &amp; Process, 4th Edition (OTPF-4, AOTA 2020)</strong> is the profession's official map of <em>what</em> OT addresses (the Domain) and <em>how</em> practitioners deliver services (the Process). The Domain has five interrelated aspects, all in service of supporting <strong>occupation, health, well-being and participation</strong>.",
    aspects: [
      {
        key: "occupations",
        name: "Occupations",
        tagline: "The everyday activities people do — the heart of the domain.",
        detail: "Personalised, meaningful activities. OTPF-4 organises them into nine areas. The same activity can be different occupations for different people (cooking as a chore vs. a passion).",
        children: [
          { name: "Activities of Daily Living (ADLs / BADLs)", desc: "Basic self-care: bathing/showering, toileting & hygiene, dressing, eating, feeding, functional mobility, personal hygiene & grooming, sexual activity." },
          { name: "Instrumental ADLs (IADLs)", desc: "More complex community living: meal prep, cleaning, shopping, finances, medication management, child/pet care, driving & community mobility, communication management, safety & emergency maintenance, religious/spiritual expression." },
          { name: "Health Management", desc: "New in OTPF-4: activities to develop, manage and maintain health — symptom & medication management, communication with the health care system, physical activity, nutrition, social/emotional health, and personal care device management." },
          { name: "Rest & Sleep", desc: "Restorative rest, sleep preparation, and sleep participation (sleep hygiene, routines, environment)." },
          { name: "Education", desc: "Formal and informal learning — participating in school, exploring educational needs, accessing the curriculum." },
          { name: "Work", desc: "Employment seeking/performance, volunteer exploration & participation, retirement preparation & adjustment." },
          { name: "Play", desc: "Spontaneous or organised activity for enjoyment — exploration and participation (central in paediatrics)." },
          { name: "Leisure", desc: "Non-obligatory, intrinsically motivated activity in discretionary time — exploration and participation." },
          { name: "Social Participation", desc: "Engagement with family, friends, peers and community; supporting desired roles and relationships." }
        ]
      },
      {
        key: "clientFactors",
        name: "Client Factors",
        tagline: "What resides within the person and shapes performance.",
        detail: "Specific capacities, characteristics or beliefs within the client.",
        children: [
          { name: "Values, beliefs & spirituality", desc: "What the person holds important and meaningful; sense of purpose; cultural & spiritual convictions." },
          { name: "Body functions", desc: "Physiological functions: mental (attention, memory, emotion, cognition), sensory, neuromusculoskeletal & movement-related, cardiovascular, respiratory, voice, digestive, skin." },
          { name: "Body structures", desc: "Anatomical parts — nervous system, eyes/ears, structures related to movement, cardiovascular, skin, etc." }
        ]
      },
      {
        key: "performanceSkills",
        name: "Performance Skills",
        tagline: "The observable, goal-directed actions of doing.",
        detail: "Small units of observable behaviour, learned and developed over time, that you can see during performance.",
        children: [
          { name: "Motor skills", desc: "Moving and interacting with objects/environment — reach, grip, manipulate, coordinate, lift, walk, endure, position." },
          { name: "Process skills", desc: "Selecting, using and sequencing actions and objects; organising time and space; adapting and problem-solving when problems arise." },
          { name: "Social interaction skills", desc: "Communicating and interacting — approaching, producing speech, gesturing, taking turns, regulating, collaborating." }
        ]
      },
      {
        key: "performancePatterns",
        name: "Performance Patterns",
        tagline: "The habits, routines, roles and rituals that organise doing.",
        detail: "The acquired patterns of behaviour that support or hinder occupational performance — for persons, groups and populations.",
        children: [
          { name: "Habits", desc: "Automatic, repeated behaviours (useful, dominating, or impoverished)." },
          { name: "Routines", desc: "Established sequences that structure daily life and provide order." },
          { name: "Roles", desc: "Socially/culturally defined sets of expected behaviours (parent, worker, student, friend)." },
          { name: "Rituals", desc: "Symbolic, meaningful actions with cultural, spiritual or social significance." }
        ]
      },
      {
        key: "contexts",
        name: "Contexts",
        tagline: "The environmental & personal conditions surrounding the person.",
        detail: "OTPF-4 (aligned with the WHO ICF) frames context as Environmental Factors and Personal Factors that influence participation.",
        children: [
          { name: "Environmental factors", desc: "Physical environment & products/technology; natural environment; support & relationships; attitudes; services, systems & policies." },
          { name: "Personal factors", desc: "Age, sexual orientation, gender identity, race & ethnicity, cultural identity, social background, upbringing, education, profession, lifestyle, health condition and coping style — the unique features of the person not part of the health condition." }
        ]
      }
    ]
  },

  // ===================== OT PROCESS =====================
  process: {
    intro: "The <strong>OT Process</strong> is the client-centred, dynamic way services are delivered. It is iterative, not linear — practitioners cycle back as understanding deepens. Throughout, the therapist uses occupation as both the goal and the therapeutic means.",
    phases: [
      {
        name: "Evaluation",
        steps: [
          { h: "Occupational profile", t: "A client-centred interview that captures the person's history, experiences, patterns of daily living, interests, values, needs, and — crucially — what occupations matter to them and what's getting in the way. This is where therapy begins." },
          { h: "Analysis of occupational performance", t: "Targeted observation and assessment of the client doing meaningful occupations to identify supports and barriers across performance skills, patterns, client factors and context. Standardised and non-standardised tools are used." }
        ]
      },
      {
        name: "Intervention",
        steps: [
          { h: "Intervention plan", t: "Collaboratively set measurable, occupation-focused goals; select approaches and a frame of reference; agree on the plan and outcomes." },
          { h: "Intervention implementation", t: "Deliver the plan — and continuously monitor and adjust the client's response." },
          { h: "Intervention review", t: "Re-evaluate the plan and progress; decide to continue, modify or discontinue." }
        ]
      },
      {
        name: "Outcomes",
        steps: [
          { h: "Targeting & measuring outcomes", t: "Determine success against goals — occupational performance, participation, role competence, well-being, quality of life, prevention, health & wellness, and occupational justice. Outcomes guide future decisions and discharge." }
        ]
      }
    ],
    approaches: [
      { name: "Create / Promote (health promotion)", desc: "Enrich performance for all people in a context, regardless of disability — e.g., a wellness program or ergonomic workplace design." },
      { name: "Establish / Restore (remediate)", desc: "Build a skill or ability not yet developed, or restore one that's impaired — e.g., regaining grip strength or relearning dressing." },
      { name: "Maintain", desc: "Preserve current capabilities so the person doesn't decline — e.g., sustaining function in a progressive condition." },
      { name: "Modify (compensation / adaptation)", desc: "Change the activity or context to support performance — adaptive equipment, technique changes, home modifications." },
      { name: "Prevent (disability prevention)", desc: "Head off barriers and problems before they occur — fall-prevention, injury prevention, sleep hygiene education." }
    ],
    interventionTypes: [
      { name: "Occupations & activities", desc: "Using meaningful occupations and purposeful activities as the core therapeutic agent." },
      { name: "Interventions to support occupations", desc: "Preparatory methods & tasks — orthoses/splints, physical agent modalities, exercise, sensory strategies, wheelchair fitting — used to prepare for occupation." },
      { name: "Education & training", desc: "Imparting knowledge (education) and developing concrete skills (training) with clients and caregivers." },
      { name: "Advocacy", desc: "Promoting occupational justice and access — advocacy and self-advocacy." },
      { name: "Group interventions", desc: "Using group dynamics and peer support to develop skills and roles." },
      { name: "Virtual interventions / telehealth", desc: "Delivering services via technology when in-person isn't needed or possible." }
    ]
  }
};
