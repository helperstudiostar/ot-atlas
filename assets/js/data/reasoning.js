/* ============================================================
   CLINICAL / PROFESSIONAL REASONING, DOCUMENTATION & GOALS
   ============================================================ */
window.OT = window.OT || {};

OT.reasoning = {
  intro:
    "<strong>Clinical (professional) reasoning</strong> is the thinking that guides practice — the way therapists make sense of a person's situation and decide what to do. Experts blend several reasoning modes fluidly and often simultaneously, shifting between the science of the condition and the story of the person. It is the difference between applying a protocol and truly tailoring care.",

  types: [
    { name: "Scientific reasoning", icon: "i-flask", body: "Logical, evidence-based thinking about the condition and what generally works. Encompasses diagnostic reasoning (understanding the client's problems) and uses research evidence and theory to decide on intervention.", q: "“What does the evidence say works for this condition?”" },
    { name: "Diagnostic reasoning", icon: "i-search", body: "Investigating and defining the nature of the occupational performance problem and its causes — generating and testing hypotheses about why the person is struggling.", q: "“What exactly is the problem, and what's driving it?”" },
    { name: "Procedural reasoning", icon: "i-clipboard", body: "Deciding what to do and in what order — selecting and sequencing assessments and interventions to address the identified problems. Focused on getting things done and ‘what happens next.’", q: "“Which techniques, in what sequence?”" },
    { name: "Interactive reasoning", icon: "i-chat", body: "Understanding and engaging the person through the therapeutic relationship — building rapport, reading cues, motivating, and collaborating. The basis of therapeutic use of self.", q: "“How do I connect with and motivate this person?”" },
    { name: "Narrative reasoning", icon: "i-book", body: "Thinking in stories — understanding the person's illness experience, their life story, and the meaning of their occupations, then imagining a future story therapy can help write.", q: "“What's this person's story, and where do they want it to go?”" },
    { name: "Conditional reasoning", icon: "i-eye", body: "The hallmark of expertise — integrating the whole picture (condition + person + context) and imagining how the situation could change under different conditions: ‘what if?’ It blends the scientific and narrative to project possible futures.", q: "“Given everything, what could the future look like — and how do we get there?”" },
    { name: "Pragmatic reasoning", icon: "i-compass", body: "Accounting for the practical realities — time, resources, reimbursement, setting, equipment, the therapist's own skills, and the client's living situation.", q: "“What's actually feasible here, with these constraints?”" },
    { name: "Ethical reasoning", icon: "i-scale", body: "Determining the right thing to do when values conflict — balancing autonomy, beneficence, non-maleficence, justice and the profession's code of ethics.", q: "“What is the right thing to do for this person?”" },
    { name: "Generalisation / reflective reasoning", icon: "i-loop", body: "Learning across cases — reflecting on experience to build the pattern-recognition that turns novices into experts (the ‘therapist with a body of experience’).", q: "“What does this case teach me for the next one?”" }
  ],

  expertise: {
    intro: "Reasoning matures with experience. Benner's novice-to-expert continuum, applied to OT:",
    levels: [
      { lvl: "Novice", desc: "Relies on rules and protocols; limited situational awareness; reasons mostly procedurally." },
      { lvl: "Advanced beginner", desc: "Recognises recurring features; still rule-bound but starting to see patterns and the person." },
      { lvl: "Competent", desc: "Plans deliberately, prioritises, sees actions in terms of longer-range goals; more efficient." },
      { lvl: "Proficient", desc: "Perceives situations as wholes; uses conditional reasoning; adjusts plans fluidly to nuance." },
      { lvl: "Expert", desc: "Intuitive grasp grounded in deep experience; reasons across all modes at once; highly individualised, creative practice." }
    ]
  },

  topDownBottomUp: {
    intro: "A defining choice in OT evaluation:",
    rows: [
      { d: "Top-down reasoning (occupation-first)", body: "Start from the person's occupations, roles and goals (the occupational profile), then work down to the underlying factors limiting them. Keeps therapy meaningful and client-centred — the preferred starting point in contemporary OT." },
      { d: "Bottom-up reasoning (impairment-first)", body: "Start from specific impairments (strength, ROM, cognition) and build toward function. Useful when component deficits clearly drive the problem, but risks losing sight of what matters to the person." }
    ]
  },

  documentation: {
    intro: "Documentation makes reasoning visible, justifies medical necessity, ensures continuity and reimbursement, and protects the client and clinician. The most common format is <strong>SOAP</strong>.",
    soap: [
      { l: "S — Subjective", d: "What the client (or caregiver) reports — concerns, pain, goals, response to therapy, relevant history in their words." },
      { l: "O — Objective", d: "Measurable, observable data — assessment scores, ROM/strength, assistance levels, what was done in the session, performance observed." },
      { l: "A — Assessment", d: "The therapist's clinical interpretation — progress toward goals, clinical reasoning, justification of skilled need, barriers and rehab potential." },
      { l: "P — Plan", d: "Next steps — frequency/duration, what will be addressed, goals to progress, home program, recommendations, discharge planning." }
    ],
    tips: [
      "Document <strong>skilled</strong> service: show why an OT's expertise (not a caregiver) was required.",
      "Tie everything back to <strong>function and occupation</strong>, not just impairments.",
      "Be objective, specific, and measurable; avoid vague terms like ‘tolerated well.’",
      "Use standard assistance levels (Independent, Modified Independent, Supervision, Min/Mod/Max Assist, Dependent) or the FIM/CARE scales.",
      "Show progress (or justify lack of it) toward the established goals."
    ]
  },

  goals: {
    intro: "OT goals are <strong>occupation-focused, collaborative and measurable.</strong> Several mnemonics help write strong goals — all share the same DNA: who will do what, how well, under what conditions, by when.",
    frameworks: [
      { abbr: "SMART", expand: "Specific · Measurable · Achievable · Relevant · Time-bound", note: "The universal standard for goal quality." },
      { abbr: "COAST", expand: "Client · Occupation · Assist level · Specific condition · Timeline", note: "OT-specific and occupation-centred — ‘Client will perform Occupation with Assist level under Specific conditions by Timeline.’ Ideal for keeping goals occupation-based." },
      { abbr: "RUMBA", expand: "Relevant · Understandable · Measurable · Behavioural · Achievable", note: "A quality check for any goal." },
      { abbr: "ABCD", expand: "Audience · Behaviour · Condition · Degree", note: "Borrowed from instructional design; maps cleanly to functional goals." }
    ],
    examplesGood: [
      "<strong>COAST:</strong> “<u>Client</u> will <u>don a button-up shirt</u> with <u>modified independence</u> using <u>a button hook and adaptive techniques</u> in <u>4 weeks</u>.”",
      "<strong>SMART:</strong> “Within 2 weeks, client will prepare a simple hot meal (oatmeal) using one-handed techniques with supervision and no safety errors in 4/5 attempts.”",
      "<strong>Paeds:</strong> “In 8 weeks, student will copy a 5-word sentence with legible letter formation and correct spacing in 4/5 trials to participate in classroom writing tasks.”"
    ],
    examplesPoor: [
      "“Improve fine motor skills.” — not measurable, not occupation-based, no timeline.",
      "“Increase strength.” — impairment-level, no functional relevance or criterion.",
      "“Patient will tolerate therapy.” — vague and not client-meaningful."
    ]
  },

  caseWalkthrough: {
    title: "A worked example — reasoning in motion",
    client: "Mrs. R, 72, three weeks post left-MCA ischaemic stroke with right hemiparesis and mild aphasia. Lives alone in a two-storey home; was an avid baker and grandmother of four. Referred to OT in inpatient rehab.",
    steps: [
      { mode: "Narrative + Occupational profile", text: "OT interviews Mrs. R and family: she desperately wants to return home, bake with her grandchildren, and manage her own morning routine. Baking and grandparenting are her core occupations and her motivation engine." },
      { mode: "Diagnostic / Scientific", text: "Hypotheses: right UE weakness and reduced fine-motor control, standing balance deficits, and mild aphasia are limiting dressing, kitchen tasks and safety. Evidence points to task-specific training and CIMT-style practice for the UE." },
      { mode: "Procedural", text: "Plan: graded task-specific UE practice embedded in real occupations (folding, reaching cupboard items, stirring batter); seated→standing kitchen tolerance; adaptive strategies and equipment as needed; caregiver and home-safety education." },
      { mode: "Pragmatic", text: "Reality check: 2-week expected length of stay, insurance authorisation, two-storey home (stairs), lives alone — so discharge planning and a home assessment start now, not at the end." },
      { mode: "Interactive", text: "Therapeutic use of self: pace sessions to her aphasia, use baking as motivation, celebrate small wins, involve the grandchildren as ‘co-therapists’ in a session." },
      { mode: "Conditional", text: "Imagining futures: If UE recovery is strong → restore independent baking. If limited → adaptive one-handed techniques + a stand mixer + downstairs set-up so the meaningful occupation survives the impairment. Either path protects what matters." },
      { mode: "Ethical", text: "Respect her autonomy and goal of returning home while honestly weighing safety; collaborate rather than impose a ‘safer’ placement she doesn't want." }
    ],
    outcome: "Goals are written in COAST format around dressing, a simplified baking task, and safe kitchen mobility — keeping the meaningful occupation, not just the impairment, at the centre."
  }
};
