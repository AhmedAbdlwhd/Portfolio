---
title: Unemployment Analysis — India
summary: Exploratory analysis showing India's unemployment rate jump from ~10% to ~25% in two months of COVID-19 lockdown.
tags: [Data]
stack: [Python, pandas, NumPy, Matplotlib, seaborn, Jupyter]
date: 2026-02
featured: true
order: 4
repo: https://github.com/AhmedAbdlwhd/unemployment-analysis
metric:
  value: "24.9%"
  label: peak national unemployment, May 2020
visual:
  type: line
  unit: "%"
  labels: [May 19, Jun, Jul, Aug, Sep, Oct, Nov, Dec, Jan 20, Feb, Mar, Apr, May, Jun]
  data: [8.9, 9.3, 9.0, 9.6, 9.1, 9.9, 9.9, 9.5, 10.0, 10.0, 10.7, 23.6, 24.9, 11.9]
images:
  - src: /projects/unemployment-analysis/before-during.png
    alt: Line chart of India's average unemployment rate. Before COVID-19 it stays between 9 and 10 percent from mid-2019 to March 2020; during COVID-19 it jumps to about 24 to 25 percent in April and May 2020, then falls to about 12 percent in June.
    caption: The national average, before and during the COVID-19 lockdown.
  - src: /projects/unemployment-analysis/boxplot-2020.png
    alt: Box plots of state unemployment rates for each month of 2020. January to March medians sit below 10 percent; April and May medians rise to about 18 to 20 percent with a much wider spread and outliers above 70 percent; June falls back to about 10 percent.
    caption: In April and May the spread between states exploded, not just the average.
---

## Problem

How hard did COVID-19 hit jobs in India? The raw dataset has monthly unemployment for 28 states and territories, split into rural and urban — too granular to answer the question at a glance, and easy to misread.

## Approach

- **Cleaning:** found and dropped 28 fully-empty rows; parsed day-month-year dates explicitly.
- **Correct aggregation:** averaged ~50 state/area readings per month into one national figure, instead of plotting a misleading zig-zag of raw rows.
- **Visualisation:** trend lines before vs. during the pandemic, plus yearly and monthly box plots to show the spread across states.
- **Plain-language insights** summarised at the end of the notebook.

## Results

| | Result |
|---|---|
| Pre-COVID average (May 2019 – Mar 2020) | **~9–10%**, very stable |
| Peak national average | **24.9%** in May 2020 (23.6% in April) |
| Highest single reading | **76.7%** — urban Puducherry, April 2020 |
| June 2020 | Back down to **~12%**, still above pre-pandemic levels |

In April and May the *spread* between states exploded too — some regions were hit far harder than others.

## What I learned

- Always check the data's granularity before plotting: grouping by date first fixed a chart that made the average look like 30–35%.
- Verify every claim with a number.
- Don't call something seasonal without enough history — 14 months shows a one-off shock, not a pattern.
- Cleaning comes first.

## Dataset

"Unemployment in India" dataset (Kaggle).
