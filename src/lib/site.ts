// One place for personal details. Pages and metadata read from here.
export const site = {
  name: "Ahmed Abdelwahed",
  role: "Machine Learning Engineer",
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

  // DRAFT — edit freely.
  about: [
    "I care about the part of machine learning that usually gets skipped: making the result usable. A model that scores well in a notebook but can't answer a real question isn't finished.",
    "My projects reflect that — a chatbot that knows when to say “I don't know”, a translator that survives an API outage, and analyses that check every claim with a number.",
  ],

  // Newest first. Add a line here when something new happens.
  timeline: [
    { date: "Mar 2026", title: "Built an NLP FAQ chatbot and a desktop translator", detail: "TF-IDF retrieval with confidence scoring; PyQt6 app with API fallback." },
    { date: "Feb 2026", title: "First end-to-end ML and data projects", detail: "Iris classification (93.3% accuracy) and a COVID-19 unemployment analysis." },
    { date: "Feb 2026", title: "Git and GitHub Essentials", detail: "Coursera" },
    { date: "Jul 2025", title: "Software Engineering Essentials", detail: "Coursera" },
    { date: "Mar 2025", title: "Google Project Management Professional Certificate", detail: "Coursera" },
  ],
} as const;
