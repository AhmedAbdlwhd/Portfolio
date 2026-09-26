---
title: University FAQ Chatbot
summary: An NLP chatbot that answers student questions instantly — and says "I don't know" instead of guessing.
tags: [NLP, ML]
stack: [Python, NLTK, scikit-learn, pandas, Streamlit]
date: 2026-03
featured: true
order: 1
repo: https://github.com/AhmedAbdlwhd/faq-chatbot
metric:
  value: "0.40"
  label: confidence cutoff before it falls back
visual:
  type: chat
  question: How do I enroll?
  answer: "Matched → “How can I apply for admission?”"
  note: paraphrase understood via lemmas + synonyms
---

## Problem

Students ask the same questions over and over. Staff spend time repeating answers that already exist in an FAQ — and a chatbot that confidently gives the *wrong* answer is worse than none at all.

## Approach

- **Preprocessing pipeline** with NLTK: lowercase → domain synonym map (`enroll → apply`, `tuition → fees`, `dorm → housing`) → tokenize → remove stopwords → lemmatize.
- **Retrieval** with a scikit-learn `TfidfVectorizer` fitted once at startup, then cosine similarity to find the closest FAQ.
- **Confidence threshold (0.40):** below it, the bot gives a safe fallback instead of a wrong answer.
- **Gap logging:** low-confidence questions are written to a CSV and shown live in the sidebar, so admins know which FAQs to add next.
- **Two interfaces** — a Streamlit chat app and a CLI — sharing one engine module.

## Results

- Paraphrased questions like *"How do I enroll?"* land on the right FAQ without training a model or calling an API.
- The knowledge base is a CSV: editing `data/faqs.csv` changes the bot's answers with no code changes.

## What I learned

- Classic NLP still goes a long way — TF-IDF + cosine similarity handles paraphrases well.
- Preprocessing matters as much as the model.
- A confidence threshold makes a bot trustworthy: saying "I don't know" and logging the gap beats a confident wrong answer.
- Splitting preprocessing, vectorization, similarity and UI into modules let me add the CLI without touching the engine.

## Next steps

- Swap TF-IDF for sentence embeddings to catch synonyms automatically.
- Admin page to add FAQs from logged unknown questions.
- Unit tests for the preprocessing pipeline.
