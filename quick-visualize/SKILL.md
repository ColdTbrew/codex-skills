---
name: quick-visualize
description: Create fast Codex in-conversation HTML/SVG previews when the user asks for "빠른 시각화", a quick visualization, or asks to skip browser, screenshot, responsive, theme, or Playwright validation. Do not use for production, publication, or verification-sensitive visuals.
---

# Quick Visualize

Show the requested visual immediately with the smallest useful implementation. Invoking this skill is the user's explicit choice of the fast path and its reduced validation scope.

## Output

- Write one HTML fragment to the current thread's writable visualization directory. Do not write a full HTML document.
- Put the SVG markup and its data directly in the fragment. Never reference a sibling local SVG, image, script, stylesheet, or data file: Codex embeds may not resolve local relative paths.
- Prefer handwritten SVG for simple charts and diagrams. Add JavaScript only when the requested interaction requires it.
- For hover details, attach `data-tooltip` and an accessible label directly to each mark or to a transparent hit target over the mark. Keep essential values visible without hover.
- Give the visual and each SVG an accessible name or concise `<title>` and `<desc>`.
- Return the Codex visualization content reference for the fragment in the same response: `visualize{"path":"/absolute/path/to/file.html"}`.

## Fast-path boundary

When this skill applies, do not use Playwright, launch a browser, render screenshots, start a preview server, test multiple viewport sizes or themes, or run visual regression checks unless the user separately requests them. Do not claim the visual was verified.

If the user asks for polished, exact, production-ready, publishable, cross-browser, responsive, or accessibility-verified output, leave the fast path and use the normal visualization workflow instead.
