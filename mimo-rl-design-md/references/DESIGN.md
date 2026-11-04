---
version: alpha
name: MiMo RL Dashboard Analysis
source: https://mimo.xiaomi.com/rl/ (measured 2026-11-02 with computed styles at 1440px and 390px widths)
description: A white, shadowless research-monitor language. Hairline-bordered cards with 6px corners sit on a pure white page; prose is small Inter, every number and metric name is monospace; a single selected-state black fill marks toggles; charts are thin two-color lines with end labels. Density comes from small type and tight padding, not from boxes or color.

colors:
  bg: "#ffffff"
  surface: "#ffffff"
  surface-2: "#f5f5f4"
  surface-3: "#e9e9e7"
  border: "#e4e4e1"
  grid: "#ececea"
  ink: "#111111"
  ink-2: "#5c5c59"
  ink-3: "#8c8c88"
  accent: "#2a78d6"
  series-1: "#e8622c"
  series-2: "#2a78d6"
  # series-3..7 extend the measured two-color palette for many-run charts (not measured from MiMo)
  series-3: "#1a9a4a"
  series-4: "#8b5cf6"
  series-5: "#d6409f"
  series-6: "#0891b2"
  series-7: "#c98a00"
  baseline: "#9a9a96"
  live: "#d9463f"
  selected-fill: "#111111"
  on-selected: "#ffffff"

colors-dark:
  bg: "#111111"
  surface: "#161616"
  surface-2: "#1e1e1e"
  surface-3: "#2a2a2a"
  border: "#2a2a29"
  grid: "#242423"
  ink: "#ececea"
  ink-2: "#a3a3a0"
  ink-3: "#6f6f6c"
  accent: "#3987e5"
  baseline: "#6e6e6b"

fonts:
  sans: '"Inter", -apple-system, "Segoe UI", system-ui, Helvetica, Arial, sans-serif'
  mono: 'ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", "DejaVu Sans Mono", monospace'
  note: Inter is self-hosted as InterVariable (weights 100–900). Add a Korean sans fallback (Pretendard, Noto Sans KR) after Inter for Korean pages.

typography:
  body:            { font: sans, size: 13.5px, weight: 400, lineHeight: 1.45, color: ink }
  section-title:   { font: sans, size: 13px, weight: 600, color: ink, case: "as written, often lowercase" }
  section-subtitle:{ font: sans, size: 12.5px, weight: 400, color: ink-3 }
  card-label:      { font: sans, size: 12px, weight: 400, color: ink-2 }
  kpi-value:       { font: mono, size: 20px, weight: 600, color: ink }
  headline-value:  { font: mono, size: 18px, weight: 600, color: ink }
  meta:            { font: mono, size: 11.5px, weight: 400, color: ink-3 }
  timestamp:       { font: mono, size: 12px, weight: 400, color: ink-3 }
  micro-label:     { font: sans, size: 10px, weight: 400, color: ink-3, transform: uppercase }
  table-cell:      { font: mono, size: 12.5px, weight: 400, color: ink }
  table-header:    { font: mono, size: 11.5px, weight: 500, color: ink-3 }
  chart-title:     { font: sans, size: 12.5px, weight: 600, color: ink, mutedPrefix: ink-3 }
  chart-tick:      { font: mono, size: 10.5px, color: ink-3 }

shape:
  radius-card: 6px
  radius-control: 4px
  radius-modal: 8px
  border: 1px solid border
  shadow: none

spacing:
  page-gutter: 20px (12px on phones)
  card-padding: 12px 14px
  kpi-cell-padding: 10px 16px, cells separated by 1px vertical hairlines inside one card
  section-gap: 16–20px; section title 8px above its card
  table-cell-padding: 6px 10px
  control-padding: 3px 9px

components:
  top-nav: 48px tall, white, bottom hairline; text tabs (active tab ink with 2px underline), right side micro-labelled monospace stats.
  card: white, 1px hairline, 6px radius, no shadow; title row inside the card at 12.5px/600.
  kpi-strip: one card, header row (name • state • big mono step) then a row of equal cells split by hairlines; each cell = 12px label + 20px mono value + small mono delta.
  segmented: inline-flex, 1px hairline, 4px radius, segments 12.5px; selected segment bg #111 / text #fff; unselected transparent ink.
  chart-card: 3-up grid; legend top-right listing series swatch dot + name + latest value (mono); end-of-line value label; dots 3–4px; lines 1.5–2px; grid #ececea; no plot background.
  chart-zoom (extension): mouse drag draws a 10% accent box and zooms to it; flat drag zooms x and refits y; double-click or a small hairline "reset" button (top-right, mono 11px) restores; plot content clips to the plot area while zoomed.
  feed: rows separated by hairlines, mono timestamp column in ink-3, message in ink.
  table: mono, hairline rows, right-aligned numbers, inline bar track (#f5f5f4, height 6px) with accent fill.
  tooltip: white, 1px hairline, 4px radius, mono 12px, no shadow.
  delta: "▲0.068" mono 11.5px; up ink/green, down #d9463f; no badge background.
  swatch: 8–9px circle in series color before series names.

responsive:
  - Chart grid 3 → 2 → 1 columns.
  - KPI cells wrap to 2 columns on phones; keep hairline separators.
  - Wide tables scroll horizontally inside their card.
