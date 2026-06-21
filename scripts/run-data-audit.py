#!/usr/bin/env python3
"""Wrapper: runs data audit, silent when healthy, noisy when errors found (watchdog pattern)."""
import sys, subprocess, json
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
SCRIPT = BASE / "scripts/data-audit.py"
REPORT = BASE / ".hermes/audit-report.json"

result = subprocess.run(
    [sys.executable, str(SCRIPT), "--notify"],
    cwd=BASE, capture_output=True, text=True, timeout=60
)

# Read the audit report
if REPORT.exists():
    report = json.loads(REPORT.read_text())
else:
    report = {"healthy": False, "passed": 0, "failed": 1, "errors": ["Audit did not complete"]}

if report["healthy"]:
    # Silent = nothing sent to user (watchdog pattern)
    sys.exit(0)
else:
    # Errors found: output for delivery
    msg = [
        "❌ SDV Data Audit — Issues Found",
        f"Passed: {report['passed']}/{report['total']}",
    ]
    if report["errors"]:
        for e in report["errors"][:8]:
            msg.append(f"• {e}")
    if report["warnings"]:
        msg.append(f"Warnings: {report['warnings']}")
    msg.append("")
    msg.append("Run manually: python3 scripts/data-audit.py --verbose")
    print("\n".join(msg))
    sys.exit(1)
