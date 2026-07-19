/* ============================================================
   VIDEO LIBRARY
   - `yt`     : a verified YouTube video id (real, from search)
   - `search` : a topic search query (opens YouTube results — never goes dead)
   - `url`    : external resource link
   ============================================================ */
window.OT = window.OT || {};

OT.videos = {
  note: "Curated, topic-organised. Specific videos below are real links gathered from search; ‘Browse on YouTube’ cards open a live topic search so the library stays fresh even as individual videos come and go. Channels are listed at the bottom.",

  buckets: [
    {
      key: "intro", title: "Start here — what is OT?", icon: "i-compass",
      blurb: "Warm overviews of the profession for the public, new students and the curious.",
      items: [
        { yt: "uVJsZwD_sg0", title: "AOTA — Occupational Therapy", channel: "American Occupational Therapy Association", desc: "The profession's official introduction to what OT is and who it helps." },
        { yt: "hwNUCnFqP0s", title: "Occupational Therapy Scope of Practice", channel: "AOTA", desc: "What occupational therapy practitioners actually do across settings." },
        { search: "what is occupational therapy explained", title: "Browse: ‘What is occupational therapy?’", desc: "More plain-language explainers from OT educators." }
      ]
    },
    {
      key: "history", title: "History, philosophy & ethics", icon: "i-book",
      blurb: "Where OT came from and the values that guide it.",
      items: [
        { yt: "DbCwf2CzGvw", title: "Celebrating AOTA's Centennial: 100 Years of OT", channel: "AOTA", desc: "A historical look at a century of occupational therapy." },
        { yt: "h1DcY6xKCaQ", title: "Ethics & Occupational Therapy: The OT Code of Ethics", channel: "OT educator", desc: "Principles and related terms in the OT Code of Ethics." },
        { search: "history of occupational therapy moral treatment arts and crafts", title: "Browse: OT history & founders", desc: "Moral Treatment, the Arts & Crafts movement, and the founders." }
      ]
    },
    {
      key: "framework", title: "The OT Practice Framework (OTPF-4)", icon: "i-clipboard",
      blurb: "The official map of OT's domain and process.",
      items: [
        { yt: "It-fblYXPzQ", title: "Domains & Processes in OT — OTPF-4 Simplified", channel: "OT educator", desc: "The core structure of OT per the 4th-edition framework, for students." },
        { yt: "hUz3p_UtzKk", title: "OTPF-4 — Changes & What's New", channel: "OT Dude", desc: "What changed in the 4th edition (incl. Health Management)." },
        { yt: "OjA3kX4UJnA", title: "OT Framework: Domain & Process", channel: "OT educator", desc: "‘What we do’ (domain) and ‘how we do it’ (process)." }
      ]
    },
    {
      key: "models", title: "Models & theory", icon: "i-hex",
      blurb: "MOHO, PEOP, PEO, CMOP-E, KAWA and more — the lenses of practice.",
      items: [
        { yt: "rCc6T4a2aeQ", title: "MOHO Explained Simply", channel: "OT educator", desc: "The Model of Human Occupation in plain terms." },
        { yt: "AwKZjCRv9f8", title: "MOHO: A Case Study (Johnny)", channel: "OT educator", desc: "How MOHO describes a real person's occupational life." },
        { yt: "-Qo2jHJSQow", title: "MOHO in Motion — Ramona's Story", channel: "OT educator", desc: "MOHO applied to managing fibromyalgia." },
        { yt: "LX02dQn3ERw", title: "MOHO: Theory & Assessment Choice", channel: "OT educator", desc: "Linking MOHO theory to the right assessment." },
        { yt: "xd2aj1cGDLo", title: "MOHO Workshop Part 1: Theory", channel: "OT educator", desc: "A deeper dive into MOHO's volition, habituation & performance." },
        { search: "PEO PEOP CMOP-E Kawa model occupational therapy explained", title: "Browse: PEO · PEOP · CMOP-E · Kawa", desc: "Walk-throughs of the other major OT models." }
      ]
    },
    {
      key: "reasoning", title: "Clinical reasoning, documentation & goals", icon: "i-loop",
      blurb: "How OTs think, write SOAP notes, and craft strong goals.",
      items: [
        { search: "occupational therapy clinical reasoning types explained", title: "Browse: clinical reasoning types", desc: "Procedural, narrative, conditional & interactive reasoning." },
        { search: "occupational therapy SOAP note documentation tutorial", title: "Browse: SOAP notes & documentation", desc: "Writing defensible, skilled OT documentation." },
        { search: "occupational therapy goal writing COAST SMART goals", title: "Browse: goal writing (COAST/SMART)", desc: "Writing occupation-focused, measurable goals." }
      ]
    },
    {
      key: "ebp", title: "Evidence-based practice", icon: "i-chart",
      blurb: "Asking PICO questions, finding and appraising evidence.",
      items: [
        { search: "evidence based practice occupational therapy PICO", title: "Browse: EBP & PICO in OT", desc: "The five steps and building answerable questions." },
        { url: "https://www.otseeker.com", ext: true, title: "OTseeker — evidence database", channel: "otseeker.com", desc: "Search appraised RCTs & systematic reviews for OT." },
        { url: "https://www.cochranelibrary.com", ext: true, title: "Cochrane Library", channel: "cochranelibrary.com", desc: "Gold-standard systematic reviews across rehab." }
      ]
    },
    {
      key: "adl", title: "ADLs, IADLs & adaptive equipment", icon: "i-home",
      blurb: "Self-care retraining and the tools that make daily life possible.",
      items: [
        { yt: "1Cvysam3oio", title: "ADL Practicals: Dressing & Feeding in OT", channel: "OT students", desc: "Demonstration of ADL techniques and adaptive equipment." },
        { search: "occupational therapy adaptive equipment dressing demonstration reacher sock aid", title: "Browse: adaptive equipment demos", desc: "Reachers, sock aids, button hooks, one-handed techniques." },
        { search: "occupational therapy energy conservation joint protection", title: "Browse: energy conservation & joint protection", desc: "Pacing and protecting joints during daily tasks." }
      ]
    },
    {
      key: "stroke", title: "Stroke & neuro rehab", icon: "i-brain",
      blurb: "Upper-limb recovery, CIMT, and neuro-rehab strategies.",
      items: [
        { search: "constraint induced movement therapy CIMT stroke occupational therapy", title: "Browse: CIMT & stroke arm recovery", desc: "Constraint-induced movement therapy in action." },
        { url: "https://strokengine.ca", ext: true, title: "StrokEngine — intervention evidence", channel: "strokengine.ca", desc: "Plain-language evidence summaries for stroke interventions." },
        { search: "occupational therapy stroke ADL retraining neglect apraxia", title: "Browse: stroke OT (ADLs, neglect, apraxia)", desc: "Functional retraining and managing neuro deficits." }
      ]
    },
    {
      key: "peds", title: "Paediatrics & sensory integration", icon: "i-child",
      blurb: "Sensory, handwriting, autism, fine-motor and play-based therapy.",
      items: [
        { yt: "02JlnqUhXeU", title: "Sensory Integration Therapy — Pediatric OT", channel: "Pediatric OT", desc: "How sensory-integration therapy works with children." },
        { search: "occupational therapy handwriting fine motor kids", title: "Browse: handwriting & fine motor", desc: "Building handwriting and hand skills in children." },
        { search: "occupational therapy autism sensory strategies kids", title: "Browse: autism strategies", desc: "Sensory, regulation and self-care strategies for autistic children." },
        { url: "https://www.theottoolbox.com", ext: true, title: "The OT Toolbox", channel: "theottoolbox.com", desc: "A huge free library of paediatric OT activities & ideas." }
      ]
    },
    {
      key: "hand", title: "Hand therapy & orthoses/splinting", icon: "i-hand",
      blurb: "Upper-extremity rehab, anatomy and orthosis fabrication.",
      items: [
        { yt: "cQAvGv1hETA", title: "OT Live Q&A: Splinting & Orthosis Fabrication", channel: "OT educator", desc: "Practical splinting and orthosis questions answered." },
        { url: "https://www.youtube.com/@Splinting101", ext: true, title: "Splinting 101 (channel)", channel: "Kelly J. Daniels, OTD, OTR/L, CHT", desc: "Step-by-step orthosis fabrication for the upper extremity." },
        { url: "https://www.youtube.com/@HandTherapySecrets0", ext: true, title: "Hand Therapy Secrets (channel)", channel: "Hand Therapy Secrets", desc: "Community for OTs/OTAs specialising in the upper limb (CHT)." }
      ]
    },
    {
      key: "mh", title: "Mental health OT", icon: "i-cloud",
      blurb: "Recovery model, groups, and occupation-based mental-health practice.",
      items: [
        { search: "occupational therapy mental health recovery model interventions", title: "Browse: mental health OT", desc: "Recovery-oriented, activity-based mental-health practice." },
        { url: "https://www.aota.org", ext: true, title: "AOTA — Mental Health resources", channel: "aota.org", desc: "OT's distinct value in mental-health promotion & care." },
        { search: "occupational therapy sensory modulation mental health", title: "Browse: sensory modulation in MH", desc: "Sensory rooms & strategies to reduce restraint/seclusion." }
      ]
    },
    {
      key: "geri", title: "Geriatrics, dementia & home modification", icon: "i-leaf",
      blurb: "Aging in place, dementia care, falls and home safety.",
      items: [
        { search: "occupational therapy dementia caregiver strategies", title: "Browse: dementia & caregiver coaching", desc: "Supporting people with dementia and their carers." },
        { search: "occupational therapy home modification fall prevention older adults", title: "Browse: home mods & fall prevention", desc: "Making homes safer for aging in place." },
        { url: "https://www.cdc.gov/steadi/", ext: true, title: "CDC STEADI — falls prevention", channel: "cdc.gov", desc: "Evidence-based older-adult fall-prevention resources." }
      ]
    },
    {
      key: "students", title: "Students & NBCOT exam prep", icon: "i-grad",
      blurb: "Study help, board prep and ‘day in the life’ for future practitioners.",
      items: [
        { url: "https://www.youtube.com/@MiriLee", ext: true, title: "OT Miri (channel)", channel: "Miri Lee, OTR/L", desc: "Illustrated NBCOT board-prep and OT concept breakdowns." },
        { url: "https://www.youtube.com/c/OTDUDE", ext: true, title: "OT Dude (channel)", channel: "OT Dude", desc: "Videos for pre-OTs, students, new grads and practitioners." },
        { search: "NBCOT exam prep occupational therapy study tips", title: "Browse: NBCOT exam prep", desc: "Study strategies and board-review content." }
      ]
    }
  ],

  channels: [
    { name: "AOTA (official)", url: "https://www.youtube.com/user/AOTAInc", about: "The American Occupational Therapy Association's official channel — profession, advocacy, practice." },
    { name: "OT Dude", url: "https://www.youtube.com/c/OTDUDE", about: "Jeff, OTR/L — accessible videos for patients, students, new grads and practitioners (also otdude.com)." },
    { name: "OT Miri", url: "https://www.youtube.com/@MiriLee", about: "Miri Lee, OTR/L — illustrated, exam-focused breakdowns from reflexes to Alzheimer's." },
    { name: "Splinting 101", url: "https://www.youtube.com/@Splinting101", about: "Kelly J. Daniels, OTD, OTR/L, CHT — orthosis/splint fabrication tutorials." },
    { name: "Hand Therapy Secrets", url: "https://www.youtube.com/@HandTherapySecrets0", about: "Upper-extremity & hand-therapy community working toward CHT." },
    { name: "OT Potential", url: "https://otpotential.com", about: "Evidence-focused OT podcast and CE — connecting research to practice." },
    { name: "The OT Toolbox", url: "https://www.theottoolbox.com", about: "Vast free library of paediatric OT activities, handwriting and sensory ideas." },
    { name: "My OT Spot", url: "https://www.myotspot.com", about: "Practical articles and guides for working OTs and students." }
  ]
};

/* Additional verified videos (real YouTube ids gathered from search), merged into
   their buckets ahead of the 'Browse on YouTube' / external cards. */
OT.videos._extra = [
  { bucket: "framework", yt: "_-NyI-wvKDQ", title: "The Blueprint of You: OTPF-4 Explained", channel: "OT educator", desc: "Clear, student-friendly overview of the 4th-edition Practice Framework." },
  { bucket: "models", yt: "3HwYUIZiCZI", title: "An Introduction to the Kawa Model", channel: "OT educator", desc: "Intro to the Kawa (river) model and its metaphor for a client's life flow." },
  { bucket: "models", yt: "cXCi8TcGD1Y", title: "OT in Mental Health and the Kawa Model", channel: "OT educator", desc: "Applying the Kawa model in a mental-health OT context." },
  { bucket: "reasoning", yt: "9_Vf_V-kL6E", title: "8 Types of Clinical Reasoning for Occupational Therapists", channel: "Professional UOTES", desc: "Walks through the eight forms of clinical/professional reasoning, with examples." },
  { bucket: "reasoning", yt: "1uepV5iXmg4", title: "COAST Goal-Writing Method: clear OT goals", channel: "OT educator", desc: "Step-by-step on the COAST method for measurable, occupation-focused OT goals." },
  { bucket: "reasoning", yt: "MdSLpZ6AcUQ", title: "Creating Good Goals (COAST/SMART) | The OT Process", channel: "OT educator", desc: "Combines COAST and SMART formats to write strong goals." },
  { bucket: "ebp", yt: "IHVO4FC2_Is", title: "PICO: A Model for Evidence-Based Research", channel: "Binghamton University Libraries", desc: "Library tutorial on building answerable PICO questions." },
  { bucket: "ebp", yt: "KgvwQVz6Aic", title: "PICO Tutorial", channel: "University library", desc: "Framing a PICO question and translating it into a database search." },
  { bucket: "adl", yt: "UQFZDHb1nr0", title: "OT Tip: Energy Conservation Techniques", channel: "OT educator", desc: "Practical energy-conservation/work-simplification strategies for daily tasks." },
  { bucket: "adl", yt: "1TpC-POdK1c", title: "How to Use a Reacher for Lower-Body Dressing", channel: "OT educator", desc: "Using a reacher for safe lower-body dressing without bending." },
  { bucket: "adl", yt: "8LomDxVuONs", title: "Occupational Therapy: Sock Aid Demonstration", channel: "OT educator", desc: "Donning socks independently with a sock aid after hip precautions/surgery." },
  { bucket: "stroke", yt: "i7yFFDyETTo", title: "CIMT | Constraint-Induced Movement Therapy: John's Journey", channel: "Stroke rehab", desc: "A stroke survivor's two-week CIMT program restraining the unaffected hand." },
  { bucket: "stroke", yt: "s9upvAfNWSI", title: "Constraint-Induced Movement Therapy in Stroke Recovery", channel: "Stroke rehab", desc: "How CIMT facilitates affected-hand use after stroke." },
  { bucket: "stroke", yt: "rcqhtSibe70", title: "5 Strategies to Improve Spatial Neglect After Stroke", channel: "Stroke rehab", desc: "Visual scanning and functional strategies for unilateral/spatial neglect." },
  { bucket: "peds", yt: "op0xrBFowDM", title: "Teach Handwriting | Evidence-Based Guide From an OT", channel: "Pediatric OT", desc: "Evidence-based approach to teaching and improving children's handwriting." },
  { bucket: "peds", yt: "u947FGYJBg4", title: "How to Use a Sensory Diet (by a Pediatric OT)", channel: "Pediatric OT", desc: "How a sensory diet supports a child's regulation through the day." },
  { bucket: "peds", yt: "FckGl9hKrJQ", title: "What is a Sensory Diet?", channel: "Pediatric OT", desc: "Plain-language intro to sensory diets for parents and carers." },
  { bucket: "hand", yt: "i4RqO7SseRw", title: "Fabricate a Resting Hand Orthosis (Functional Position)", channel: "OT educator", desc: "Step-by-step fabrication of a resting hand orthosis in the functional position." },
  { bucket: "hand", yt: "nqpFUtGFVmE", title: "Fabricate a Resting Hand Orthosis (Intrinsic-Plus)", channel: "OT educator", desc: "Fabricating an anti-deformity (intrinsic-plus) resting hand orthosis." },
  { bucket: "hand", yt: "KZYamq8SzKk", title: "Pattern for a Resting Pan Orthosis (Volar WHFO)", channel: "OT educator", desc: "Drafting a custom pattern for a volar wrist-hand-finger resting pan orthosis." },
  { bucket: "mh", yt: "YSOfb476YGE", title: "Using Sensory Modulation with People with BPD", channel: "Sensory Modulation Brisbane", desc: "Mental-health OTs present sensory modulation for emotional regulation." },
  { bucket: "mh", yt: "NPKUEBhW284", title: "What is Sensory Modulation?", channel: "Mental health OT", desc: "Animated explainer of sensory modulation as a mental-health regulation tool." },
  { bucket: "geri", yt: "ezeacgB6NAY", title: "OT Fall-Prevention Education Session (Part 1)", channel: "OT educator", desc: "Teaching session on identifying fall risks in hospital and home settings." },
  { bucket: "geri", yt: "zvJ3Mb2KJQg", title: "Fall-Prevention Home Safety Assessment", channel: "Home safety", desc: "Walkthrough of a home-safety assessment to find and fix common fall hazards." }
];
OT.videos._extra.forEach(function (v) {
  var b = OT.videos.buckets.find(function (x) { return x.key === v.bucket; });
  if (!b) return;
  var item = { yt: v.yt, title: v.title, channel: v.channel, desc: v.desc };
  var i = b.items.findIndex(function (x) { return x.search || x.url; });
  if (i === -1) b.items.push(item); else b.items.splice(i, 0, item);
});
