---
# HOW TO ADD A PROJECT
# 1. Copy this file and rename it, e.g. "my-new-project.md".
#    The filename becomes the page URL: /projects/my-new-project
# 2. Fill in the fields below. Lines starting with # are notes; delete them if you like.
# 3. Files starting with "_" (like this one) are ignored by the site.

title: My New Project                    # required
summary: One sentence a recruiter reads on the card.   # required
tags: [ML]                               # required — used by the filter on /projects (e.g. ML, NLP, Data, Apps)
stack: [Python, scikit-learn]            # tools shown on the case study page
date: 2026-10                            # required — year-month, used for sorting (newest first)
featured: false                          # true = also shows in the home page grid
# order: 1                               # optional — lower numbers show first (otherwise newest first)

repo: https://github.com/AhmedAbdlwhd/my-new-project   # "Code" button
# live: https://my-app.streamlit.app     # "Try it live" button (+ embedded preview)
# video: https://www.youtube.com/watch?v=XXXXXXXXXXX  # demo video (YouTube or a .mp4 link)

# One big number for the card (optional)
metric:
  value: "95%"
  label: test accuracy

# A small picture for the card (optional). Pick ONE type:
# visual:
#   type: line                           # line chart
#   unit: "%"
#   labels: [Jan, Feb, Mar]
#   data: [10, 12, 9]
# visual:
#   type: matrix                         # confusion matrix
#   labels: [cat, dog]
#   data:
#     - [18, 2]
#     - [1, 19]
# visual:
#   type: chat                           # chatbot exchange
#   question: What are the fees?
#   answer: "Matched → “How much is tuition?”"
#   note: optional small caption
# visual:
#   type: words                          # a few words/phrases
#   words: [Hello, Bonjour]

# Screenshots or charts (optional). Put the files in /public/projects/<this-file-name>/
# The first image is the cover at the top of the case study page.
# images:
#   - src: /projects/my-new-project/screenshot.png
#     alt: Describe what the image shows, for people using screen readers.   # required
#     caption: Optional short caption under the image.
---

## Problem

What problem does this solve, and for whom?

## Approach

How you built it — data, model, tools, key decisions.

## Results

Numbers and outcomes. Tables work too:

| Metric | Value |
|---|---|
| Accuracy | 95% |

## What I learned

- One lesson per bullet.
