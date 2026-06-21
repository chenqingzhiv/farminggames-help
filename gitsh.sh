#!/bin/bash
# Push via SSH
cd "$HOME/farminggames-help" || exit 1
git remote set-url origin git@github.com:chenqingzhiv/farminggames-help.git
git push -u origin main 2>&1
exit $?
