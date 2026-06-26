#!/usr/bin/env python3
"""Test pipeline module import for both sites."""
import os, sys

print("=== Testing farming pipeline ===")
os.chdir("/home/hermes/farminggames-help")
sys.path.insert(0, "/home/hermes/farminggames-help")
from scripts.pipeline import run_pipeline, SITES
print("  SITES keys:", list(SITES.keys()))
print("  run_pipeline:", run_pipeline.__code__.co_varnames[:4])

print("\n=== Testing game pipeline ===")
os.chdir("/home/hermes/game-guide")
sys.path.insert(0, "/home/hermes/game-guide")
from scripts.pipeline import select_content_brief, DATABASE_ROTATION
print("  Rotation count:", len(DATABASE_ROTATION))
brief = select_content_brief("database")
print("  First brief:", brief["target_path"])

print("\n✅ Both imports OK")
