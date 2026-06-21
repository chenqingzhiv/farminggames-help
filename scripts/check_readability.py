#!/usr/bin/env python3
"""Readability check for .md files. Outputs Markdown table."""
import re, sys, textstat, os

docs_dir = sys.argv[1] if len(sys.argv) > 1 else "docs"
print("| File | Words | Sentences | Reading Ease | Grade Level |")
print("|:-----|:-----:|:---------:|:-----------:|:----------:|")

for root, dirs, files in os.walk(docs_dir):
    for fname in sorted(files):
        if not fname.endswith('.md'):
            continue
        path = os.path.join(root, fname)
        with open(path) as fh:
            text = fh.read()

        text = re.sub(r'^---.*?---', '', text, flags=re.DOTALL)
        text = re.sub(r'```.*?```', '', text, flags=re.DOTALL)
        text = re.sub(r'\|.*?\|', '', text, flags=re.DOTALL)

        words = text.split()
        if len(words) < 30:
            continue

        try:
            grade = textstat.flesch_kincaid_grade(text)
            ease = textstat.flesch_reading_ease(text)
            sents = [s for s in text.split('.') if len(s.strip()) > 5]
            short = fname[:28]
            print(f"| {short:28s} | {len(words):5d} | {len(sents):3d} | {ease:3.0f}/100 | Grade {grade:.0f} |")
        except Exception as e:
            print(f"| {fname[:28]:28s} | ERROR: {e} |")
