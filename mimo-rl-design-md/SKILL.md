---
name: mimo-rl-design-md
description: Apply the bundled Xiaomi MiMo RL dashboard reference (white canvas, no shadows, hairline cards, monospace numbers) to dashboards, training monitors, evaluation pages, and data-heavy HTML/SVG previews. Use when the user asks for the MiMo RL look, mimo-rl-design-md, or a clean white shadowless monitoring dashboard in that style.
---

# MiMo RL Design MD

Read [references/DESIGN.md](references/DESIGN.md) before styling a surface. It records tokens measured from the public page `https://mimo.xiaomi.com/rl/` (Xiaomi MiMo RL training dashboard). It is a design analysis, not an official Xiaomi specification. The bundled copy works without network access.

## Applying the reference

- Preserve the requested content, behavior, framework, data, and output format. Restyle; do not remove information unless the user asks.
- Use a white canvas and white cards. Never use box shadows, gradients, glass blur, or tinted page backgrounds. Separate regions with 1px hairlines `#e4e4e1` and 6px corners.
- Use near-black ink `#111111`, secondary text `#5c5c59`, and muted labels `#8c8c88`. Use `#f5f5f4` only for small fills such as table headers, bar tracks, or hover rows.
- Use Inter (or the system sans with a Korean fallback such as Pretendard or Noto Sans KR) at 13.5px for prose and labels. Use the system monospace stack for numbers, metric names, timestamps, table cells, and axis ticks. Do not claim a web font loaded without checking.
- Keep type small and dense: section titles 13px/600 in ink, card labels 12px in `#5c5c59`, hints 11.5–12px in `#8c8c88`, key numbers 18–20px/600 monospace. No large display headings.
- Group related KPIs in one bordered card split by vertical hairlines rather than separate floating cards.
- Segmented controls: 1px hairline border, 4px corners, 12.5px text, selected segment filled `#111111` with white text. Do not use pills with shadows.
- Charts: transparent background, grid `#ececea`, thin 1.5–2px lines, small 3–4px dots, monospace ticks in `#8c8c88`, legend at the card's top right with the latest value beside each series, and the last value labelled at the line end. Default series colors: orange `#e8622c`, blue `#2a78d6`; reference or baseline lines `#9a9a96` dashed.
- For line charts in plain HTML pages, copy [assets/line-chart.js](assets/line-chart.js) next to the page instead of loading a chart library (MiMo draws its charts with hand-written Canvas 2D). It reads `--text`, `--faint`, `--grid-line`, `--baseline`, `--mono`, and `--surface` from CSS, so define those tokens. Give each host element an explicit height and style the hover readout:

  ```css
  .lc-tip { background: var(--surface); border: 1px solid var(--border); border-radius: 4px; padding: 6px 8px; font: 11.5px/1.5 var(--mono); color: var(--text); }
  ```

  `LineChart(el, { series: [{ label, color, points: [[x, y]], dash? }], refs: [{ label, value }], integerX?, xDomain?, xTitle?, format? })` returns `{ update, destroy }`; call `update` on data changes instead of recreating the chart. Use a framework's own chart stack only when the project already depends on one.
- Deltas are small monospace text: `▲0.068` in ink or green, `▼` in red `#d9463f`. Avoid colored badge backgrounds for every number.
- Tables: monospace 12.5px cells, 11.5px/500 muted headers, 6px 10px padding, hairline row separators, numbers right-aligned, inline thin bar tracks (`#f5f5f4` track, `#2a78d6` fill) for proportions.
- Dark mode, when the surface supports it: bg `#111111`, surface `#161616`, border `#2a2a29`, ink `#ececea`, secondary `#a3a3a0`, muted `#6f6f6c`, grid `#242423`, accent `#3987e5`.
- Reflow grids as width narrows; keep wide tables horizontally scrollable with a sticky first column; never cause horizontal page scroll.

## Interpretation and checks

Treat the reference as styling guidance, not content. Do not import its MiMo-specific panels (notices feed, city clocks, cost counters) unless the user's data calls for them.

Keep visible keyboard focus, hover, and selected states. Check essential text contrast; `#8c8c88` is for secondary labels only. Preserve semantic state colors the content needs (errors, misses, warnings).

This skill does not require installation, browser automation, screenshots, hosting, commits, or publishing. When a rendered check is requested or appropriate, verify the actual surface and report only checks performed.
