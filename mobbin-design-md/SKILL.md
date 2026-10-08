---
name: mobbin-design-md
description: Apply the bundled Mobbin DESIGN.md reference to websites, dashboards, documentation, and HTML/SVG previews. Use when Mobbin styling or mobbin-design-md is requested; research about apps listed on Mobbin does not trigger restyling.
---

# Mobbin Design MD

Read [references/DESIGN.md](references/DESIGN.md) before styling a surface. This is a design analysis installed with `npx getdesign@latest add mobbin`, not an official Mobbin specification. The bundled copy works without the CLI or network access.

## Applying the reference

- Preserve the requested content, behavior, framework, and output format. Honor explicit exclusions such as keeping an embedded document's original design.
- Use white canvas `#ffffff`, near-black ink `#141414`, secondary text `#707070`, soft surfaces `#f3f3f3`, and hairlines `#f0f0f0` or `#e0e0e0`. Let source images supply color. Reserve blue `#0066ff` for existing meaningful emphasis rather than adding decorative accents.
- Saans is commercial. Use existing licensed assets when available; otherwise use Inter or system sans with a Korean fallback. Do not claim a font loaded without verification. Map heading weight 652 to 650 or 700, body 456 to 450 or 500, and subtitle 300 to light.
- Use natural tracking, strong headings, and light subtitles. Adapt the 56/44/32/24px heading and 20/16/14/12px text scales for the document. Preserve readable Korean leading instead of copying tight Latin leading literally.
- Build spacing from 8px with 4px half-steps. Use 24–32px card padding and 48–80px section gaps. Let whitespace and neutral fills establish hierarchy.
- Use stadium pills for buttons, navigation controls, and badges. Use 24px content cards and 16px media or input corners. Keep controls at least 44px high where space allows.
- Prefer tinted surfaces and subtle hairlines over shadows. Use the inverse dark footer for an existing footer when suitable; do not invent a marketing hero, CTA, icon cloud, or commercial badge to demonstrate the reference.
- Reflow grids as width narrows. Preserve source-image aspect ratios, readable diagrams, and scrollable wide tables or code. Avoid repeated outer panels around an embedded page.

## Interpretation and checks

Treat the reference as styling guidance. Do not import its unrelated marketing content, mandatory headline punctuation, or specimen components into the user's document. Keep measured results, proposals, examples, and source content distinct.

Use visible keyboard focus and clear hover, open, and selected states. Check essential text contrast; faint tokens belong to nonessential decoration. Preserve real state colors when needed.

Honor the active workflow. This skill does not require installation, browser automation, screenshots, hosting, commits, or publishing. When those checks are requested or appropriate for a repository change, verify the rendered surface and relevant interactions, and report only checks actually performed.
