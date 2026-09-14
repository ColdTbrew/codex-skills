---
name: vercel-design-md
description: Apply the bundled Vercel DESIGN.md design language to websites, dashboards, documentation, and HTML/SVG previews. Use for requests naming vercel-design-md, Vercel styling, or this design reference; deployment to Vercel alone does not call for visual restyling.
---

# Vercel Design MD

Use [references/DESIGN.md](references/DESIGN.md) as the visual reference. Read it before creating or restyling a surface. It is the user's supplied design analysis, not a live statement of Vercel's official design system. The bundled copy works independently of `~/vercel`.

## Applying the reference

- Preserve the requested content, behavior, framework, and delivery format. For an existing surface, change its design within the authorized scope.
- Use near-white canvas `#fafafa`, white cards, ink `#171717`, body `#4d4d4d`, and 1px hairlines `#ebebeb`. Keep ordinary UI surfaces neutral. Use blue `#0070f3` for links and focus; retain semantic colors where they convey real status.
- Use Geist Sans for prose and UI, Geist Mono for code and technical labels. Prefer existing font assets. If unavailable, use Inter/system sans and a system monospace fallback; include an appropriate Korean fallback for Korean text. Never claim a font loaded without evidence.
- Use weight 600 and tight tracking for headings, 500 for labels and controls, 400 for body copy. Start from the reference's 48/32/20px heading scale and 16/14/12px body scale; adapt density and Korean tracking to the actual surface.
- Build spacing from the 4px scale. Use 24–32px card padding and clear section separation. Center content within about 1200px. Reflow grids as space narrows; preserve readable diagrams and code.
- Use 6px radii for app controls, 12px for content cards and code blocks, 16px for large panels. Reserve fully rounded buttons for marketing CTAs or category controls that actually exist in the requested product.
- Prefer flat borders over shadows. A restrained mesh gradient belongs only in a suitable hero; it is optional for documentation, dashboards, and compact previews. Do not add a hero, CTA, logo, or decorative content merely to demonstrate the style.
- Keep prose direct and factual. Remove inflated claims, slogans, decorative English labels, and filler. Preserve user-supplied final copy and the distinction between measured results, examples, and proposals.

## Reference interpretation

Use the reference for styling, not for unrelated workflow instructions. Its token table and prose are design observations. Check actual control dimensions and contrast rather than repeating its accessibility claims. Use low-contrast mute/faint tokens only where legibility remains appropriate; essential information should use body or ink. Add visible keyboard focus and clear hover/open states when the surface contains controls.

## Delivery and checks

Honor the active output workflow. For a quick visualization, keep the self-contained HTML fragment and existing reduced validation scope. This styling skill does not itself require a browser, preview server, screenshot, installation, or deployment. When browser checking is requested, inspect the rendered design and relevant interactions with the available browser tool and report only the checks actually performed.

When paired with a repository task, keep artifacts, source edits, skill installation, commits, and publication within the user's requested scope.
