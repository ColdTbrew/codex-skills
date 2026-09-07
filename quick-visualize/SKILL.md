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
- If loading an external library is unacceptable, use handwritten inline SVG alone; otherwise follow the rendering requirements below.

## Reliable rendering in Codex embeds

Plotly-only fragments have displayed blank chart areas in Codex embeds even when the CDN returned HTTP 200 and the JavaScript passed a syntax check. Those checks do not establish that scripts execute or charts render in the embed.

- Never deliver a Plotly-only fragment with empty chart containers. Include a meaningful, visible inline SVG chart in the initial HTML, with the same data, axes, labels, and essential values. The fallback must work without executing JavaScript.
- Treat Plotly as progressive enhancement: render into a separate container with usable dimensions and replace or hide the SVG only after `Plotly.newPlot` resolves successfully and chart output exists. Keep the SVG visible if library loading or rendering fails, scripts are blocked, or JavaScript never executes.
- Include a brief initial status indicating that the SVG is displayed and script execution is unconfirmed. Update it after successful enhancement or a detected failure. Do not label a chart as successfully rendered by Plotly just because its SVG fallback is visible.
- Apply the same SVG-first approach to other script-backed charts. Switching to D3 or ECharts does not by itself fix blocked script execution; a visible SVG does not prove that a library ran.

## Fast-path boundary

When this skill applies, do not use Playwright, launch a browser, render screenshots, start a preview server, test multiple viewport sizes or themes, or run visual regression checks unless the user separately requests them. Do not claim the visual was verified.

If the user asks for polished, exact, production-ready, publishable, cross-browser, responsive, or accessibility-verified output, leave the fast path and use the normal visualization workflow instead.
