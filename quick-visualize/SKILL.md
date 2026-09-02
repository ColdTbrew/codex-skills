---
name: quick-visualize
description: Create fast Codex in-conversation HTML/SVG previews when the user asks for "빠른 시각화", a quick visualization, or asks to skip browser, screenshot, responsive, theme, or Playwright validation. Do not use for production, publication, or verification-sensitive visuals.
---

# Quick Visualize

Show the requested visual immediately with the smallest useful implementation. Invoking this skill is the user's explicit choice of the fast path and its reduced validation scope.

## Output

- Write one HTML fragment to the current thread's writable visualization directory. Do not write a full HTML document.
- Keep all visualization data and configuration directly in the fragment. Put handwritten SVG markup inline; for library-backed charts, load a pinned official CDN bundle. Never reference a sibling local SVG, image, script, stylesheet, or data file: Codex embeds may not resolve local relative paths.
- For hover details on handwritten marks, attach `data-tooltip` and an accessible label directly to each mark or to a transparent hit target. For library-rendered marks, configure the library's native hover and give the chart container an accessible name. Keep essential values visible without hover.
- Give the visual and each SVG an accessible name or concise `<title>` and `<desc>`.
- Return the Codex visualization content reference for the fragment in the same response: `visualize{"path":"/absolute/path/to/file.html"}`.

## Theme

- Use a white theme unless the user explicitly requests a different theme. Keep page and chart surfaces white or off-white, text dark, and borders neutral; set equivalent light backgrounds explicitly in Plotly or ECharts configuration.

## Technology choice

- Use Plotly by default for conventional analytical charts that benefit from axes, legends, hover, or multiple series, including bar, line, scatter, heatmap, and histogram charts.
- Use handwritten inline SVG for explanatory diagrams, custom layouts, dependency-free visuals, and very small charts.
- Prefer ECharts when dashboard-style composition, mobile interaction, streaming, or large datasets materially benefit from it.
- When using Plotly, load the smallest official pinned bundle that supports every requested trace type. Use the full bundle only when needed.
- For Plotly bar charts, set `layout.barcornerradius: "25%"` unless square corners better fit the subject.
- If loading an external library is unacceptable or fails in the Codex embed, fall back to handwritten inline SVG.

## Fast-path boundary

When this skill applies, do not use Playwright, launch a browser, render screenshots, start a preview server, test multiple viewport sizes or themes, or run visual regression checks unless the user separately requests them. Do not claim the visual was verified.

If the user asks for polished, exact, production-ready, publishable, cross-browser, responsive, or accessibility-verified output, leave the fast path and use the normal visualization workflow instead.
