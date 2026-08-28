# codex-skills

Custom writing and workflow skills that can be copied into an agent's local skill directory.

## Repo layout

Each top-level folder is one installable skill.

```text
codex-skills/
├── quick-visualize/
│   ├── SKILL.md
│   └── agents/openai.yaml
├── x-post/
│   ├── SKILL.md
│   └── agents/openai.yaml
└── scripts/
    └── install-skill.sh
```

## Available skills

- `quick-visualize`: fast Codex inline HTML/SVG previews with optional hover details and no browser validation.
- `x-post`: writing support for X posts.

## Install a skill

If your agent supports skills as local folders, clone this repo and copy the skill folder into that agent's skill directory.

Generic pattern:

```bash
git clone https://github.com/ColdTbrew/codex-skills.git
cd codex-skills

# Copy one skill into your agent's local skills directory
cp -R x-post /path/to/your/skills/
```

## One-command install

You can also use the included installer:

```bash
./scripts/install-skill.sh x-post /path/to/your/skills
```

Example for Codex:

```bash
git clone https://github.com/ColdTbrew/codex-skills.git
cd codex-skills
./scripts/install-skill.sh x-post "$HOME/.codex/skills"
```

## Agent-friendly install instruction

If you are another agent and were given only this GitHub link, use this workflow:

1. Clone the repo.
2. Identify the requested skill folder at the repo root.
3. Find your product's local skill directory.
4. Copy the entire skill folder into that directory.
5. Preserve the folder name exactly.

Short version:

```bash
git clone https://github.com/ColdTbrew/codex-skills.git
cp -R codex-skills/x-post /path/to/your/skills/
```

## Notes

- `SKILL.md` is the actual skill definition.
- `agents/openai.yaml` is UI metadata for products that support it.
- If your agent product uses a different skills directory, adapt only the destination path.
