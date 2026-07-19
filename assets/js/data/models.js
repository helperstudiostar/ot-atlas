/* ============================================================
   MODELS & FRAMES OF REFERENCE
   - Occupation-focused conceptual models of practice
   - Frames of reference (FoR) that guide specific techniques
   ============================================================ */
window.OT = window.OT || {};

OT.models = {
  intro:
    "OT practice is theory-driven. <strong>Conceptual models of practice</strong> are occupation-focused lenses for understanding a person's whole situation. <strong>Frames of reference (FoR)</strong> translate specific bodies of knowledge (e.g., biomechanics, neuroscience, learning theory) into ‘how-to’ guidance for assessment and intervention. Skilled clinicians often combine an occupation-focused model with one or more frames of reference.",

  occupationModels: [
    {
      name: "Model of Human Occupation",
      abbr: "MOHO",
      author: "Gary Kielhofner & colleagues (Kielhofner & Burke, 1980 four-part AJOT series; multiple editions since)",
      type: "Occupation-focused model",
      summary: "The most widely used and most researched occupation-focused model. Views the person as a dynamic system of three interacting parts, shaped by and shaping the environment, producing occupational participation, performance and skill — over time, occupational identity and competence (occupational adaptation).",
      constructs: [
        "<strong>Volition</strong> — motivation for occupation: personal causation (sense of capacity/efficacy), values, and interests.",
        "<strong>Habituation</strong> — habits and internalised roles that organise behaviour into patterns.",
        "<strong>Performance capacity</strong> — underlying physical/mental abilities plus the lived, subjective experience of doing.",
        "<strong>Environment</strong> — physical and social context that affords or presses behaviour."
      ],
      use: "Excellent for understanding motivation, roles, habits and identity — strong in mental health and complex/chronic cases. Has a large family of assessments (MOHOST, OPHI-II, OSA, Role & Interest Checklists, ACIS, AOF, Volitional Questionnaire).",
      videos: ["moho-simple", "moho-johnny", "moho-ramona"]
    },
    {
      name: "Person–Environment–Occupation–Performance",
      abbr: "PEOP",
      author: "Christiansen & Baum (1991; updated)",
      type: "Occupation-focused, transactive model",
      summary: "Occupational performance and participation emerge from the transaction of Person factors (intrinsic), Environment factors (extrinsic) and Occupation, with the goal of well-being. Emphasises both internal capacities and external enablers, and supports a top-down, strengths-based, client-centred approach.",
      constructs: [
        "<strong>Person</strong> — cognition, psychological, physiological, sensorimotor, spirituality, neurobehavioural factors.",
        "<strong>Environment</strong> — culture, social support, social/economic systems, built & natural environment, technology.",
        "<strong>Occupation</strong> — activities, tasks and roles people carry out.",
        "<strong>Performance & participation</strong> — the doing that results, supporting well-being and quality of life."
      ],
      use: "A versatile organising framework across settings; pairs well with a narrative, strengths-based evaluation.",
      videos: []
    },
    {
      name: "Person–Environment–Occupation Model",
      abbr: "PEO",
      author: "Mary Law et al. (1996)",
      type: "Occupation-focused, transactive model",
      summary: "Occupational performance is the dynamic, ever-changing overlap of Person, Environment and Occupation. Greater overlap (fit) = better performance. Because the three are interwoven across the lifespan, intervention can target any of them — and changing one changes the whole.",
      constructs: [
        "<strong>Person</strong> — a unique being with roles, skills and experiences.",
        "<strong>Environment</strong> — cultural, socioeconomic, institutional, physical and social.",
        "<strong>Occupation</strong> — self-care, productivity and leisure activities and tasks.",
        "<strong>Performance</strong> — the outcome of the fit; maximise the overlap to maximise participation."
      ],
      use: "An intuitive, easily-taught model and a clear rationale for environmental and task adaptation as legitimate ‘treatment.’",
      videos: []
    },
    {
      name: "Canadian Model of Occupational Performance & Engagement",
      abbr: "CMOP-E",
      author: "Polatajko, Townsend & Craik (CAOT, 2007) — revision of the 1997 CMOP, adding ‘Engagement’ in Enabling Occupation II",
      type: "Occupation-focused model",
      summary: "Places <strong>spirituality at the core</strong> of the person, surrounded by cognitive, affective and physical performance components, interacting with the environment (physical, institutional, cultural, social) to enable occupation (self-care, productivity, leisure). The ‘E’ adds engagement — participation matters even without independent performance. Paired with the CMCE (Canadian Model of Client-Centred Enablement) and the COPM assessment.",
      constructs: [
        "<strong>Person</strong> — affective, cognitive, physical, with spirituality at the centre.",
        "<strong>Occupation</strong> — self-care, productivity, leisure.",
        "<strong>Environment</strong> — physical, institutional, cultural, social.",
        "<strong>Engagement</strong> — involvement in occupation beyond observable performance."
      ],
      use: "Strongly client-centred; the Canadian Occupational Performance Measure (COPM) operationalises it as an outcome measure of client-identified priorities.",
      videos: []
    },
    {
      name: "Kawa (River) Model",
      abbr: "KAWA",
      author: "Michael Iwama (2006)",
      type: "Culturally-grounded, metaphoric model",
      summary: "A non-Western, culturally responsive model using the metaphor of a <strong>river</strong> for a person's life flow. Life energy/health is the water; rocks are life circumstances/problems; driftwood is personal assets and liabilities; river walls and bed are the environment. OT helps maximise the flow of life by working with all elements together.",
      constructs: [
        "<strong>Water (mizu)</strong> — life flow / energy / health.",
        "<strong>Rocks (iwa)</strong> — difficult circumstances and obstacles.",
        "<strong>Driftwood (ryuboku)</strong> — personal attributes, values, resources & liabilities.",
        "<strong>River walls & bed (torimaki)</strong> — physical and social environment."
      ],
      use: "Powerful for culturally diverse clients and holistic, narrative work; the client draws their own river, decentring the therapist's worldview.",
      videos: []
    },
    {
      name: "Ecology of Human Performance",
      abbr: "EHP",
      author: "Dunn, Brown & McGuigan (1994)",
      type: "Occupation & context model",
      summary: "Centres <strong>context</strong> as inseparable from performance: a person, their tasks, and the context together create the ‘performance range’ of what someone can do. Offers five clear intervention strategies that map neatly onto OTPF approaches.",
      constructs: [
        "<strong>Establish/Restore</strong> — build the person's skills/abilities.",
        "<strong>Alter</strong> — find a different context that better fits the person.",
        "<strong>Adapt/Modify</strong> — change the task or context demands.",
        "<strong>Prevent</strong> — stop problems from developing.",
        "<strong>Create</strong> — design enriched circumstances for everyone."
      ],
      use: "A practical decision framework; its five strategies are an easy way to generate intervention options.",
      videos: []
    },
    {
      name: "Occupational Adaptation",
      abbr: "OA",
      author: "Schkade & Schultz (1992)",
      type: "Occupation-focused process model",
      summary: "Focuses on the internal process by which a person responds to occupational challenges and ‘press’ from the environment. Therapy aims to improve the client's internal adaptive capacity (relative mastery) so they can generalise and self-initiate, not just complete a task.",
      constructs: [
        "<strong>Occupational challenge & role expectations</strong> create press for mastery.",
        "<strong>Adaptive response</strong> — generated by the person to meet the challenge.",
        "<strong>Relative mastery</strong> — efficiency, effectiveness and satisfaction to self & society.",
        "Therapist as agent of the <strong>adaptation process</strong>, not just task performance."
      ],
      use: "Useful when the goal is transfer/generalisation and self-directed problem-solving, not just performing a single task.",
      videos: []
    },
    {
      name: "Occupational Science",
      abbr: "OS",
      author: "Yerxa, Clark et al. (USC, 1989)",
      type: "Underlying academic discipline",
      summary: "The basic science studying humans as occupational beings — how occupation shapes health, identity and society. It provides the theoretical bedrock and key concepts (occupational balance, deprivation, alienation, identity, justice) that inform practice.",
      constructs: [
        "<strong>Occupational balance/imbalance</strong>", "<strong>Occupational deprivation</strong>",
        "<strong>Occupational alienation</strong>", "<strong>Occupational identity & competence</strong>", "<strong>Occupational justice</strong>"
      ],
      use: "Not a practice model per se, but the scientific lens that legitimises and deepens occupation-focused practice.",
      videos: []
    }
  ],

  framesOfReference: [
    { name: "Biomechanical", basis: "Kinetics & kinematics — range of motion, strength, endurance.", use: "Orthopaedic, hand, and physical-disability conditions where structures are intact but capacity is limited. Targets ROM, strength, endurance to enable occupation.", egs: "Therapeutic exercise, activity grading, work conditioning, orthoses." },
    { name: "Rehabilitative / Compensatory", basis: "Maximise function despite residual impairment.", use: "When remediation has plateaued. Compensate via adaptive equipment, technique change, environmental modification and training.", egs: "One-handed dressing, reachers, home mods, wheelchair set-up." },
    { name: "Neurodevelopmental Treatment (NDT / Bobath)", basis: "Neuroplasticity & normal movement; inhibit abnormal tone, facilitate typical patterns.", use: "Stroke, cerebral palsy, TBI — upper-limb and postural control. (Evidence is mixed vs. task-specific training.)", egs: "Handling/facilitation, weight-bearing, positioning." },
    { name: "Motor Control / Motor Learning & Task-Oriented", basis: "Systems theory of motor control; learning through practice and feedback.", use: "Neurological rehab. Whole-task, repetitive, salient practice in varied contexts drives recovery; strong evidence base.", egs: "Constraint-induced movement therapy (CIMT), task-specific training, repetitive functional practice." },
    { name: "Sensory Integration (Ayres SI)", basis: "Neuroscience of sensory processing; the ‘just-right challenge’ in play.", use: "Paediatrics — sensory processing/modulation, praxis. Child-directed, play-based, individually tailored sensory-motor activities (fidelity matters).", egs: "Swings, proprioceptive/vestibular play, tactile experiences." },
    { name: "Sensory Modulation / Sensory-Based (Adult MH)", basis: "Sensory strategies for arousal & self-regulation.", use: "Mental health, trauma, dementia, autism — calming/alerting strategies and sensory rooms to manage arousal and reduce restraint/seclusion.", egs: "Weighted blankets, sensory diets, comfort rooms, self-regulation toolkits." },
    { name: "Cognitive-Behavioural (CBT-informed)", basis: "Thoughts ↔ feelings ↔ behaviour.", use: "Mental health, chronic pain, fatigue — challenge unhelpful thinking, build coping, graded activity and behavioural activation.", egs: "Activity scheduling, pacing, problem-solving, relaxation." },
    { name: "Cognitive Rehabilitation (Remedial & Adaptive)", basis: "Restore or compensate for cognitive impairment.", use: "TBI, stroke, dementia — attention, memory, executive function via strategy training and external aids.", egs: "CO-OP approach, errorless learning, spaced retrieval, checklists, smartphone cues." },
    { name: "Cognitive Disabilities (Allen)", basis: "Allen Cognitive Levels (ACL 0–6) describe global cognitive capacity for function.", use: "Dementia, severe mental illness, brain injury — match task demands and supports to the person's cognitive level; guide caregiver support.", egs: "Allen Cognitive Level Screen (ACLS), ADM, environmental compensation." },
    { name: "Person–Environment–Occupation (applied as FoR)", basis: "Fit of person, environment, occupation.", use: "Justifies environmental & task adaptation as core intervention across populations.", egs: "Home modification, task simplification, AT." },
    { name: "Psychodynamic / Object Relations", basis: "Unconscious processes, emotions, relationships, meaning.", use: "Mental health — using creative and expressive occupations to explore emotion and build insight and relationships.", egs: "Expressive arts, projective groups, therapeutic relationship." },
    { name: "Behavioural / Acquisitional", basis: "Operant learning — reinforcement, shaping, chaining.", use: "Skill acquisition in autism, IDD, paediatrics; building habits and routines.", egs: "Task analysis, prompting & fading, token systems, backward/forward chaining." },
    { name: "Developmental", basis: "Predictable sequences of development.", use: "Paediatrics — identify gaps against milestones and build skills in developmental order.", egs: "Milestone-based fine-motor, play and self-care progression." },
    { name: "Rood / PNF (neurophysiological)", basis: "Sensorimotor facilitation & inhibition; spiral-diagonal patterns.", use: "Older neuro approaches, sometimes adjuncts for tone and motor recruitment.", egs: "Tapping, brushing, quick stretch; PNF diagonals." },
    { name: "Model of Human Occupation (as FoR)", basis: "MOHO constructs guide reasoning & tools.", use: "Mental health and complex cases — assess volition, habituation, performance & environment and target the weakest link.", egs: "MOHOST-guided planning, role & interest rebuilding." }
  ]
};
