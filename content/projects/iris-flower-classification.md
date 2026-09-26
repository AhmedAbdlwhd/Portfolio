---
title: Iris Flower Classification
summary: A complete, reproducible ML pipeline that predicts an iris species from four measurements.
tags: [ML]
stack: [Python, scikit-learn, pandas, NumPy]
date: 2026-02
featured: true
order: 2
repo: https://github.com/AhmedAbdlwhd/iris-flower-classification
metric:
  value: "93.3%"
  label: test accuracy
visual:
  type: matrix
  labels: [setosa, versicolor, virginica]
  data:
    - [20, 0, 0]
    - [0, 19, 1]
    - [0, 3, 17]
images:
  - src: /projects/iris-flower-classification/confusion-matrix.png
    alt: Confusion matrix on the test set, 93.3% accuracy. Setosa 20 of 20 correct; versicolor 19 correct and 1 predicted as virginica; virginica 17 correct and 3 predicted as versicolor.
    caption: All 4 errors are between versicolor and virginica, whose measurements overlap.
---

## Problem

Predict an iris flower's species — *setosa*, *versicolor* or *virginica* — from sepal and petal length and width, using a pipeline that is honest about its results and gives the same answer every run.

## Approach

- **Stratified 60/40 train/test split** so every species is equally represented in both sets.
- **`StandardScaler` fitted on the training data only**, then applied to the test set — no data leakage.
- **Logistic regression** classifier from scikit-learn.
- **Full evaluation:** accuracy, confusion matrix, and per-class precision / recall / F1.
- **Fixed random seed** for reproducibility.

## Results

| Metric | Test set (60 flowers) |
|---|---|
| Accuracy | **93.3%** |
| Setosa | 100% precision and recall |
| Versicolor | F1 = 0.90 |
| Virginica | F1 = 0.89 |

Setosa is perfectly separable. All 4 errors are between versicolor and virginica, whose measurements overlap.

## What I learned

- The standard ML workflow end to end: load, split, scale, train, predict, evaluate.
- Avoiding data leakage by fitting preprocessing on the training set only.
- Why stratification matters on small datasets.
- Accuracy isn't the whole story — the confusion matrix shows *which* classes get confused.

## Dataset

[Iris dataset](https://archive.ics.uci.edu/dataset/53/iris) — R. A. Fisher (1936), via the UCI Machine Learning Repository.
