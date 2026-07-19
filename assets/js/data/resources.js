/* ============================================================
   RESOURCES, CLIENT-FACING GUIDANCE & GLOSSARY
   ============================================================ */
window.OT = window.OT || {};

OT.resources = {
  orgs: [
    { name: "American Occupational Therapy Association (AOTA)", region: "United States", about: "The US professional body — practice standards, the OTPF, advocacy, evidence and the AJOT journal.", url: "https://www.aota.org" },
    { name: "World Federation of Occupational Therapists (WFOT)", region: "Global", about: "International body representing OT worldwide; sets minimum education standards and global policy.", url: "https://www.wfot.org" },
    { name: "National Board for Certification in OT (NBCOT)", region: "United States", about: "Administers the certification exam (OTR/COTA) and the credential.", url: "https://www.nbcot.org" },
    { name: "Accreditation Council for OT Education (ACOTE)", region: "United States", about: "Accredits OT and OTA education programs.", url: "https://acoteonline.org" },
    { name: "American Occupational Therapy Foundation (AOTF)", region: "United States", about: "Advances OT science and research; publishes OTJR.", url: "https://www.aotf.org" },
    { name: "Royal College of Occupational Therapists (RCOT)", region: "United Kingdom", about: "UK professional body; publishes the British Journal of Occupational Therapy.", url: "https://www.rcot.co.uk" },
    { name: "Occupational Therapy Australia (OTA)", region: "Australia", about: "Australian professional association for OTs.", url: "https://otaus.com.au" },
    { name: "Canadian Association of Occupational Therapists (CAOT)", region: "Canada", about: "Canadian professional body; home of CMOP-E and the COPM.", url: "https://www.caot.ca" },
    { name: "Association of OT of Ireland (AOTI)", region: "Ireland", about: "Professional body for OT in Ireland.", url: "https://www.aoti.ie" },
    { name: "OTseeker", region: "Global", about: "Free database of appraised OT evidence (RCTs & systematic reviews).", url: "https://www.otseeker.com" }
  ],

  // -------- For clients & families --------
  clients: {
    intro: "Occupational therapy can help at any age and any stage. If illness, injury, disability, development, mental health or aging is making it hard to do the everyday things that matter to you — OT may help. Here's how to recognise when OT could help, what to expect, and how to find a therapist.",

    scenarios: [
      {
        who: "After a stroke, brain injury or illness (adults)",
        signs: ["Trouble dressing, bathing, cooking or using a hand", "Difficulty with memory, attention or organising the day", "Fatigue, weakness or balance problems affecting daily life", "Wanting to return home, to work, or to driving safely"],
        otCan: ["Rebuild self-care and daily routines with new techniques", "Recommend adaptive equipment and home changes", "Retrain arm/hand use and thinking skills", "Plan a safe return home, to work and to the community"]
      },
      {
        who: "A child who's struggling (parents)",
        signs: ["Messy or laborious handwriting; avoids drawing/cutting", "Very sensitive to (or seeking) noise, textures, movement", "Big reactions to transitions, clothing, grooming or food", "Behind on self-care (dressing, using utensils) or play/motor skills", "Difficulty regulating emotions or attention at school"],
        otCan: ["Build fine-motor, handwriting and self-care skills through play", "Develop sensory and self-regulation strategies", "Coach families and teachers; adapt the classroom and routines", "Support participation at home, school and with friends"]
      },
      {
        who: "An aging parent (families)",
        signs: ["Recent falls or fear of falling", "Struggling with bathing, cooking, medications or finances", "Memory changes affecting safety at home", "Considering whether they can stay in their home safely"],
        otCan: ["Assess the home and recommend safety modifications", "Train safe techniques and provide adaptive equipment", "Support memory, routines and meaningful activity", "Help the person stay independent and age in place"]
      },
      {
        who: "Living with a hand or arm injury",
        signs: ["Pain, stiffness, numbness or weakness in the hand/arm", "Recovering from surgery, fracture, tendon or nerve injury", "Trouble with gripping, writing, typing or daily tasks"],
        otCan: ["Provide custom splints/orthoses and a recovery program", "Restore motion, strength and dexterity", "Adapt work and daily tasks; manage pain and swelling"]
      },
      {
        who: "Mental health & wellbeing",
        signs: ["Withdrawing from routines, roles, work or activities", "Anxiety or low mood making daily tasks feel impossible", "Wanting structure, coping skills and meaningful activity", "Returning to work, study or community after a setback"],
        otCan: ["Rebuild routines, roles and meaningful occupations", "Teach coping, regulation and energy-management skills", "Support return to work, study and social participation", "Use a recovery-oriented, strengths-based approach"]
      },
      {
        who: "Managing a chronic condition or fatigue",
        signs: ["Exhaustion or pain that limits what you can do (MS, long COVID, arthritis, cancer)", "‘Boom and bust’ — overdoing it then crashing", "Trouble keeping up with work, home and family"],
        otCan: ["Teach pacing and energy conservation (the ‘4 P's’)", "Prioritise and protect the activities that matter most", "Adapt tasks, tools and environments to your energy", "Support self-management and quality of life"]
      }
    ],

    whatToExpect: [
      { h: "Referral & getting started", t: "You may be referred by a doctor or self-refer (varies by country/insurer). The OT confirms your needs and goals." },
      { h: "Evaluation & your occupational profile", t: "The OT interviews you about your life, routines, priorities and what's hard right now, then observes or assesses you doing meaningful tasks. You are the expert on your life." },
      { h: "Collaborative goal-setting", t: "Together you set goals around the real things you want to do — not just impairments. Your priorities drive the plan." },
      { h: "Intervention", t: "Sessions use meaningful activities, skill-building, new techniques, equipment, environment changes and education. You'll often get a home program." },
      { h: "Review & progress", t: "Goals are revisited and the plan adjusted as you improve or your situation changes." },
      { h: "Discharge & next steps", t: "When goals are met (or you're equipped to continue independently), therapy concludes with recommendations and resources." }
    ],

    findOT: {
      steps: [
        "Ask your doctor for a referral, or check whether you can self-refer in your area.",
        "Use your national association's ‘find a therapist’ directory (e.g., AOTA, RCOT, OT Australia, CAOT).",
        "Check that the therapist is licensed/registered and, if needed, has relevant specialty certification (e.g., CHT for hands, SI for sensory).",
        "Ask your insurer / public health system what OT is covered (e.g., Medicare, NHS, NDIS) and any limits.",
        "For children, ask the school about OT services (in the US, under IDEA / IEP / 504)."
      ],
      questions: [
        "What experience do you have with my condition or situation?",
        "What will evaluation and a typical session look like?",
        "How will we measure progress, and roughly how long might therapy take?",
        "What's the cost, and what does my insurance/health system cover?",
        "What can I do at home between sessions?"
      ]
    },

    selfManagement: [
      { title: "Energy conservation — the ‘4 P's’", body: "Make limited energy go further when fatigue, pain or breathlessness is a factor.", tips: ["<strong>Prioritise</strong> — decide what truly matters today; let go of the rest.", "<strong>Plan</strong> — schedule demanding tasks when energy is highest; spread them across the week.", "<strong>Pace</strong> — break tasks up; rest <em>before</em> you're exhausted, not after.", "<strong>Position</strong> — sit to work when you can; keep frequently-used items within easy reach."] },
      { title: "Joint protection", body: "Reduce strain on painful or vulnerable joints (e.g., arthritis).", tips: ["Use larger/stronger joints — carry bags on your forearm, not finger hooks.", "Use built-up handles, jar openers and lever taps to reduce grip force.", "Avoid sustained tight grips and awkward, prolonged positions.", "Balance activity with rest; respect pain as a signal."] },
      { title: "Fall prevention at home", body: "Most falls are preventable with simple changes.", tips: ["Remove loose rugs and clutter; tidy cords and tape down edges.", "Add grab bars by the toilet and in the shower; use a non-slip mat.", "Improve lighting, especially on stairs and the path to the bathroom at night.", "Wear supportive, non-slip footwear; keep daily items at waist height.", "Review medications and vision with your provider."] },
      { title: "Sensory strategies", body: "Regulate arousal and comfort for sensory differences (children and adults).", tips: ["Identify what calms vs. alerts you (deep pressure, movement, quiet, rhythm).", "Build a personal ‘toolkit’ (noise-reducing headphones, fidgets, weighted blanket, movement breaks).", "Reduce overload — dim lights, lower noise, give warning before transitions.", "Use a predictable routine and a calm-down space."] },
      { title: "Adaptive equipment", body: "The right tool can restore independence instantly.", tips: ["Dressing: reacher, sock aid, long-handled shoehorn, button hook, elastic laces.", "Bathing/toileting: shower chair, grab bars, long-handled sponge, raised toilet seat.", "Kitchen: rocker knife, jar opener, non-slip mat, one-handed cutting board.", "Always trial equipment with an OT for the right fit and technique."] },
      { title: "Routines & habits", body: "Structure supports health, mood and function.", tips: ["Anchor the day with consistent wake, meal and sleep times.", "Build a balanced mix of self-care, productivity, rest and meaningful leisure.", "Use checklists, visual schedules and reminders to reduce cognitive load.", "Start small — one reliable routine is worth more than a perfect plan."] }
    ],

    advocacy: {
      intro: "Participation is a right. OT champions access and occupational justice — and so can you.",
      points: [
        "<strong>Know your rights</strong> — disability-rights laws (e.g., the ADA in the US, the Equality Act in the UK) require reasonable accommodations at work, school and in public.",
        "<strong>School supports</strong> — in the US, OT can be part of a child's IEP or 504 plan under IDEA; ask the school to evaluate.",
        "<strong>Accessible design</strong> — universal design and home modification let more people participate; OTs assess and recommend.",
        "<strong>Self-advocacy</strong> — you can request an OT referral, ask for accommodations, and bring your priorities to every appointment.",
        "<strong>Occupational justice</strong> — everyone deserves access to meaningful occupation regardless of disability, income or circumstance."
      ]
    }
  },

  disclaimer: "This atlas is an educational resource, not medical advice or a substitute for individualised care. For assessment and treatment, consult a licensed/registered occupational therapist. In an emergency, contact local emergency services.",

  // -------- Glossary --------
  glossary: [
    { t: "Occupation", d: "Any meaningful, everyday activity that ‘occupies’ a person's time and gives life meaning — not just paid work." },
    { t: "Activities of Daily Living (ADLs)", d: "Basic self-care tasks: bathing, dressing, toileting, eating, grooming, functional mobility." },
    { t: "Instrumental ADLs (IADLs)", d: "More complex community-living tasks: cooking, cleaning, finances, shopping, medication & transport." },
    { t: "Occupational profile", d: "The client-centred summary of a person's occupational history, patterns, interests, values and needs — the start of evaluation." },
    { t: "Occupational performance", d: "The act of doing and accomplishing a selected occupation, resulting from the person–environment–occupation transaction." },
    { t: "Client-centred practice", d: "Care driven by the client's priorities, values and goals as an active partner." },
    { t: "Occupational justice", d: "The right of all people to access and participate in the occupations they need and value." },
    { t: "Occupational deprivation", d: "Being prevented from engaging in necessary/meaningful occupations due to factors outside one's control." },
    { t: "Occupational balance", d: "A satisfying mix of self-care, productivity, rest and leisure occupations." },
    { t: "Activity analysis", d: "Breaking an activity into its component steps and demands to understand and grade it." },
    { t: "Grading", d: "Adjusting the difficulty of an activity up or down to provide the ‘just-right challenge.’" },
    { t: "Adaptation", d: "Modifying the task, method or environment to enable performance." },
    { t: "Just-right challenge", d: "An activity pitched at the optimal difficulty — achievable but stretching — to promote engagement and growth." },
    { t: "Therapeutic use of self", d: "The therapist's intentional use of empathy, rapport and personality as a tool of intervention." },
    { t: "Frame of reference (FoR)", d: "A body of theory translated into guidelines for assessment and intervention (e.g., biomechanical, sensory integration)." },
    { t: "Model of practice", d: "An occupation-focused conceptual framework for understanding the whole person (e.g., MOHO, PEOP)." },
    { t: "OTPF", d: "Occupational Therapy Practice Framework — AOTA's official description of OT's domain and process (4th ed., 2020)." },
    { t: "Volition (MOHO)", d: "Motivation for occupation — personal causation, values and interests." },
    { t: "Habituation (MOHO)", d: "Habits and roles that organise behaviour into recurring patterns." },
    { t: "Performance capacity (MOHO)", d: "Underlying physical/mental abilities plus the lived experience of doing." },
    { t: "Performance skills", d: "Observable, goal-directed actions: motor, process and social-interaction skills." },
    { t: "Performance patterns", d: "Habits, routines, roles and rituals that support or hinder occupation." },
    { t: "Client factors", d: "Values/beliefs/spirituality, body functions and body structures within the person." },
    { t: "Context (OTPF-4)", d: "Environmental and personal factors surrounding and influencing performance (aligned with the WHO ICF)." },
    { t: "Top-down approach", d: "Beginning evaluation from occupations/roles and goals, then examining underlying factors." },
    { t: "Bottom-up approach", d: "Beginning from specific impairments/components and building toward function." },
    { t: "Remediation / restorative", d: "Restoring or developing an impaired skill or capacity." },
    { t: "Compensation / adaptive", d: "Working around an impairment via technique, equipment or environment change." },
    { t: "Splint / orthosis", d: "A custom or prefabricated device that supports, positions, protects or mobilises a body part." },
    { t: "Sensory integration", d: "The neurological process of organising sensory input for use; the basis of Ayres SI therapy." },
    { t: "Sensory diet", d: "A personalised schedule of sensory activities to support regulation throughout the day." },
    { t: "Constraint-Induced Movement Therapy (CIMT)", d: "Restraining the stronger arm to force intensive use of the weaker arm after stroke/brain injury." },
    { t: "Energy conservation", d: "Strategies (prioritise, plan, pace, position) to manage limited energy from fatigue, pain or illness." },
    { t: "Joint protection", d: "Techniques to reduce stress on vulnerable joints during activity." },
    { t: "Functional mobility", d: "Moving within the environment to perform occupations — bed mobility, transfers, getting around." },
    { t: "Transfer", d: "Moving safely from one surface to another (e.g., bed to wheelchair)." },
    { t: "Assistive technology (AT)", d: "Devices that increase, maintain or improve functional capabilities." },
    { t: "Durable medical equipment (DME)", d: "Reusable medical equipment for home use (wheelchairs, commodes, walkers)." },
    { t: "Universal design", d: "Designing environments usable by all people without adaptation." },
    { t: "Praxis", d: "The ability to conceive, plan and carry out a novel motor action (motor planning)." },
    { t: "Proprioception", d: "The body's sense of its own position and movement in space." },
    { t: "Vestibular sense", d: "The sense of balance and head movement from the inner ear." },
    { t: "Apraxia", d: "Difficulty performing learned, purposeful movements despite intact strength." },
    { t: "Unilateral neglect", d: "Reduced awareness of one side of space/body, often after right-hemisphere stroke." },
    { t: "Executive function", d: "Higher-order cognition: planning, organising, initiating, problem-solving, self-monitoring." },
    { t: "Range of motion (ROM)", d: "The amount of movement available at a joint (active or passive)." },
    { t: "FIM", d: "Functional Independence Measure — a common rehab measure of assistance needed." },
    { t: "COPM", d: "Canadian Occupational Performance Measure — a client-centred outcome measure of performance and satisfaction." },
    { t: "Fieldwork", d: "Supervised clinical practice that is a required part of OT education (Level I & II)." },
    { t: "OTR / COTA", d: "Registered Occupational Therapist / Certified OT Assistant (US credentials)." },
    { t: "Recovery model", d: "A mental-health approach focused on hope, meaning, empowerment and living well, not just symptom reduction." },
    { t: "Occupational science", d: "The basic discipline studying humans as occupational beings and how occupation affects health." },
    { t: "SOAP note", d: "Documentation format: Subjective, Objective, Assessment, Plan." },
    { t: "PICO", d: "Question format for EBP: Population, Intervention, Comparison, Outcome." },
    { t: "Evidence-based practice (EBP)", d: "Integrating best research evidence, clinical expertise and client values to guide care." },
    { t: "Goal Attainment Scaling (GAS)", d: "An individualised method of scoring progress against scaled, personalised goals." },
    { t: "Lifestyle Redesign®", d: "A preventive, occupation-based program to build healthy, meaningful routines (from the Well Elderly studies)." },
    { t: "Telehealth", d: "Delivering OT evaluation and intervention remotely via technology." },
    { t: "Hemiparesis", d: "Weakness affecting one side of the body — a common effect of stroke or brain injury." },
    { t: "Spasticity", d: "Muscle stiffness or tightness that resists movement, often after a stroke, brain or spinal-cord injury." },
    { t: "Contracture", d: "A joint that has become stiff and hard to straighten because the muscles or soft tissue around it have tightened and shortened." },
    { t: "Edema", d: "Swelling caused by extra fluid building up in body tissues — often in a hand, arm or leg (British spelling: oedema)." },
    { t: "Micrographia", d: "Handwriting that becomes small and cramped — a common sign in Parkinson's disease." },
    { t: "Tenodesis", d: "A grasp technique that uses wrist movement to open and close the fingers when the hand's own muscles are weak (common after spinal-cord injury)." },
    { t: "Modified independence (mod-I)", d: "Doing a task on your own, but with extra time, equipment or a changed method rather than hands-on help from another person." },
    { t: "Doff", d: "To take off clothing or equipment such as a splint, prosthesis or compression garment; putting it on is called ‘donning’." }
  ]
};
