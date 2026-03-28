#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <skill-name> <target-skills-dir>" >&2
  exit 1
fi

SKILL_NAME="$1"
TARGET_DIR="$2"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCE_DIR="$REPO_ROOT/$SKILL_NAME"

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "Skill not found: $SKILL_NAME" >&2
  exit 1
fi

mkdir -p "$TARGET_DIR"
rm -rf "$TARGET_DIR/$SKILL_NAME"
cp -R "$SOURCE_DIR" "$TARGET_DIR/"

echo "Installed $SKILL_NAME to $TARGET_DIR/$SKILL_NAME"
