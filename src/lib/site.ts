// One place for personal details. Pages and metadata read from here.
export const site = {
  name: "Ahmed Abdelwahed",
  role: "AI & ML Engineer",
  tagline: "I build machine-learning tools people can actually use.",
  intro:
    "Models are only useful when people can use them. I build NLP, classification and data-analysis projects end to end — from clean data to an interface someone can click.",
  email: "ahmed@ajxlabs.com",
  links: {
    github: "https://github.com/AhmedAbdlwhd",
    linkedin: "https://www.linkedin.com/in/ahmedabdlwhd/",
    credly: "https://www.credly.com/users/ahmedabdlwhd",
  },
  credlyUsername: "ahmedabdlwhd",
  focus: ["NLP", "classical ML", "data analysis"],
  stack: ["Python", "scikit-learn", "pandas", "NLTK", "Streamlit"],

  about: [
    "I'm a Computer Engineering student specialising in Artificial Intelligence at UCSI University. What drives me is AI/ML engineering as a whole: training models, building the systems around them, and using AI to automate work people shouldn't have to do by hand.",
    "I care about the part that usually gets skipped — making the result usable. My projects reflect that: a chatbot that knows when to say “I don't know”, a translator that survives an API outage, and analyses that check every claim with a number.",
    "I'm working toward an AI/ML engineering role, learning by building one project at a time. I'm open to remote or on-site work, and happy to relocate.",
  ],

  // Newest first. Add a line here when something new happens.
  timeline: [
    { date: "Now", title: "BSc Computer Engineering (Artificial Intelligence)", detail: "UCSI University" },
    { date: "Mar 2026", title: "Built an NLP FAQ chatbot and a desktop translator", detail: "TF-IDF retrieval with confidence scoring; PyQt6 app with API fallback." },
    { date: "Feb 2026", title: "First end-to-end ML and data projects", detail: "Iris classification (93.3% accuracy) and a COVID-19 unemployment analysis." },
    { date: "Feb 2026", title: "Git and GitHub Essentials", detail: "Coursera" },
    { date: "Jul 2025", title: "Software Engineering Essentials", detail: "Coursera" },
    { date: "Mar 2025", title: "Google Project Management Professional Certificate", detail: "Coursera" },
  ],
} as const;
