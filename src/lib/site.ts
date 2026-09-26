// One place for personal details. Pages and metadata read from here.
export const site = {
  name: "Ahmed Abdelwahed",
  role: "Aspiring AI & ML Engineer",
  tagline: "I build machine-learning tools people can actually use.",
  intro:
    "Computer Engineering (AI) student at UCSI University and former AI Engineer intern at ArpuPlus. I build NLP, classification and data-analysis projects end to end — from clean data to an interface someone can click.",
  email: "ahmed@ajxlabs.com",
  links: {
    github: "https://github.com/AhmedAbdlwhd",
    linkedin: "https://www.linkedin.com/in/ahmedabdlwhd/",
    credly: "https://www.credly.com/users/ahmedabdlwhd",
  },
  credlyUsername: "ahmedabdlwhd",
  // Shown in the hero terminal's profile.json.
  focus: ["NLP", "machine learning", "data analysis"],
  stack: ["Python", "scikit-learn", "NLTK", "SQL", "AWS"],

  about: [
    "I'm a Computer Engineering student specialising in Artificial Intelligence at UCSI University. What drives me is AI/ML engineering as a whole: training models, building the systems around them, and using AI to automate work people shouldn't have to do by hand.",
    "I care about the part that usually gets skipped — making the result usable. My projects reflect that: a chatbot that knows when to say “I don't know”, a translator that survives an API outage, and analyses that check every claim with a number.",
    "I'm working toward an AI/ML engineering role, learning by building one project at a time. I'm open to remote or on-site work, and happy to relocate.",
  ],

  // Newest first.
  experience: [
    {
      role: "AI Engineer (Internship)",
      company: "ArpuPlus",
      companyDetail: "ARPU Telecommunications Services",
      location: "Cairo, Egypt",
      type: "On-site",
      start: "Feb 2026",
      end: "Apr 2026",
      points: [
        "Built and shipped 5 AI/ML projects: data analysis, classification models (Iris, diabetes prediction), an NLP FAQ chatbot and a translation app — applying EDA, supervised learning, agentic AI and NLP with NLTK.",
        "Contributed to the AI Dubbing Portal for Shofha, an Arabic streaming platform: built the landing page, designed the transcript-verifier UI, resolved audio-clustering issues, evaluated model outputs and documented workflow improvements.",
      ],
      // Awards for this job come from content/awards.json (matched by company).
    },
  ],
  // Shown as one small line under Experience.
  earlierExperience: [{ role: "Data Entry Clerk", company: "AMA Trading & Import", location: "Cairo, Egypt", dates: "2018 – 2020" }],

  education: [
    { degree: "BSc (Hons) Computer Engineering (Artificial Intelligence)", school: "UCSI University", dates: "2024 – 2028 (expected)" },
    { degree: "Foundation in Science", school: "UCSI University", dates: "2022 – 2023" },
  ],

  skills: [
    { group: "AI & ML", items: ["Machine Learning", "Deep Learning", "NLP", "NLTK", "scikit-learn", "Computer Vision", "Generative AI", "Prompt Engineering", "Agentic AI"] },
    { group: "Data", items: ["Data Analysis", "EDA", "Data Visualization", "SQL", "PostgreSQL", "Jupyter"] },
    { group: "Development", items: ["Python", "JavaScript", "HTML/CSS", "Git & GitHub", "AWS", "UI/UX Design"] },
    { group: "Also", items: ["Cybersecurity fundamentals"] },
    { group: "Languages", items: ["Arabic (native)", "English"] },
  ],

  // Education, experience and project milestones only. Newest first.
  timeline: [
    { date: "Jun 2026", title: "Won 1st place, AI Dubbing System Evaluation Challenge", detail: "ArpuPlus — company-wide challenge for the Shofha AI dubbing system." },
    { date: "Apr 2026", title: "Completed AI Engineer internship", detail: "ArpuPlus — shipped 5 AI/ML projects and contributed to the Shofha AI Dubbing Portal." },
    { date: "Mar 2026", title: "Built an NLP FAQ chatbot and a desktop translator", detail: "TF-IDF retrieval with confidence scoring; PyQt6 app with API fallback." },
    { date: "Feb 2026", title: "First end-to-end ML and data projects", detail: "Iris classification (93.3% accuracy) and a COVID-19 unemployment analysis." },
    { date: "Feb 2026", title: "Started AI Engineer internship", detail: "ArpuPlus, ARPU Telecommunications Services — Cairo, Egypt." },
    { date: "2024", title: "Started BSc (Hons) Computer Engineering (AI)", detail: "UCSI University — expected 2028." },
    { date: "2022 – 2023", title: "Foundation in Science", detail: "UCSI University" },
  ],
} as const;
