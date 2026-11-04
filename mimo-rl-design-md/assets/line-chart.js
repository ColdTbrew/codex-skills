/* Dependency-free Canvas line chart in the MiMo RL style: hairline grid,
   1.5px lines, small dots, end-value labels, dashed reference lines and a
   crosshair readout. Colors and fonts come from CSS variables so the chart
   follows the page theme. No animation.

   LineChart(element, {
     series: [{ label, color, points: [[x, y], ...], dash?: [4, 3], endLabel?: true }],
     refs:   [{ label, value, color? }],        // horizontal dashed lines
     xLabel?: v => string, yLabel?: v => string, // tick formatters
     format?: v => string,                       // readout / end-label formatter
     xDomain?: [min, max], integerX?: true, xTitle?: string,
     resetLabel?: string,                        // zoom reset button text
   })
   Mouse drag on the plot zooms to the dragged box (a flat horizontal drag
   zooms x only and fits y to the visible points). Double-click or the
   reset button restores the full view. Touch keeps tap-to-read. End labels
   take the series color and are spread so they never overlap.
   Returns { update(options), destroy() }. */
(function () {
  "use strict";

  const css = (el, name, fallback) => getComputedStyle(el).getPropertyValue(name).trim() || fallback;

  function niceStep(range, count) {
    const raw = range / Math.max(1, count);
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const norm = raw / mag;
    return (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
  }

  function ticks(lo, hi, count) {
    if (!(hi > lo)) { const pad = Math.abs(lo) * 0.05 || 0.01; lo -= pad; hi += pad; }
    const pad = (hi - lo) * 0.08;
    lo -= pad; hi += pad;
    const step = niceStep(hi - lo, count);
    const out = [];
    for (let v = Math.ceil(lo / step) * step; v <= hi + step * 1e-9; v += step) out.push(Number(v.toPrecision(12)));
    return { lo, hi, values: out, step };
  }

  function decimals(step) {
    return Math.max(0, Math.min(6, -Math.floor(Math.log10(step) + 1e-9)));
  }

  function LineChart(host, options) {
    host.classList.add("lc");
    host.style.position = host.style.position || "relative";
    const canvas = document.createElement("canvas");
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    const tip = document.createElement("div");
    tip.className = "lc-tip";
    tip.style.cssText = "position:absolute;pointer-events:none;display:none;z-index:2;white-space:nowrap;";
    const reset = document.createElement("button");
    reset.type = "button";
    reset.className = "lc-reset";
    reset.style.cssText = "position:absolute;top:2px;right:2px;display:none;z-index:3;font:11px var(--mono);padding:1px 7px;border:1px solid var(--border);border-radius:4px;background:var(--surface);color:var(--muted);cursor:pointer;";
    host.replaceChildren(canvas, tip, reset);
    canvas.style.cursor = "crosshair";
    let opts = options;
    let hoverX = null;
    let layout = null;
    let zoom = null;   // { x0, x1, y0?, y1? } in data units
    let drag = null;   // { sx, sy, cx, cy } in CSS px

    function domain() {
      const xs = [], ys = [];
      for (const s of opts.series) for (const [x, y] of s.points) { if (Number.isFinite(x)) xs.push(x); if (Number.isFinite(y)) ys.push(y); }
      for (const r of opts.refs || []) if (Number.isFinite(r.value)) ys.push(r.value);
      const xMin = opts.xDomain ? opts.xDomain[0] : Math.min(...xs);
      const xMax = opts.xDomain ? opts.xDomain[1] : Math.max(...xs);
      const d = { xMin, xMax, yMin: Math.min(...ys), yMax: Math.max(...ys), empty: !ys.length };
      if (zoom && zoom.y0 == null) {
        // x-only zoom: fit y to the points inside the visible x range.
        const vis = [];
        for (const s of opts.series) for (const [x, y] of s.points) if (x >= zoom.x0 && x <= zoom.x1 && Number.isFinite(y)) vis.push(y);
        if (vis.length) { d.yMin = Math.min(...vis); d.yMax = Math.max(...vis); }
      }
      return d;
    }

    function draw() {
      const width = host.clientWidth, height = host.clientHeight;
      if (!width || !height) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const ink = css(host, "--text", "#111"), faint = css(host, "--faint", "#8c8c88"), grid = css(host, "--grid-line", "#ececea");
      const baseline = css(host, "--baseline", "#9a9a96"), mono = css(host, "--mono", "ui-monospace, monospace");
      const fmt = opts.format || ((v) => Number(v).toFixed(3));
      const d = domain();
      if (d.empty) { layout = null; ctx.fillStyle = faint; ctx.font = `12px ${mono}`; ctx.fillText("no data", 8, 18); return; }
      const yCount = Math.max(3, Math.round(height / 48));
      let yt = ticks(d.yMin, d.yMax, yCount);
      if (zoom && zoom.y0 != null) {
        const step = niceStep(zoom.y1 - zoom.y0, yCount), values = [];
        for (let v = Math.ceil(zoom.y0 / step) * step; v <= zoom.y1 + step * 1e-9; v += step) values.push(Number(v.toPrecision(12)));
        yt = { lo: zoom.y0, hi: zoom.y1, values, step };
      }
      const yDec = decimals(yt.step);
      const yLabel = opts.yLabel || ((v) => v.toFixed(yDec));
      ctx.font = `10.5px ${mono}`;
      const left = Math.ceil(Math.max(...yt.values.map((v) => ctx.measureText(yLabel(v)).width))) + 12;
      const endW = opts.series.some((s) => s.endLabel !== false && s.points.length) ? Math.ceil(ctx.measureText(fmt(d.yMax)).width) + 14 : 8;
      const pad = { l: left, r: endW, t: 8, b: 20 };
      const xSpan = d.xMax - d.xMin || 1;
      const xPad = opts.integerX ? 0.5 : xSpan * 0.02;
      const x0 = zoom ? zoom.x0 : d.xMin - xPad, x1 = zoom ? zoom.x1 : d.xMax + xPad;
      const pw = width - pad.l - pad.r, ph = height - pad.t - pad.b;
      const px = (x) => pad.l + ((x - x0) / (x1 - x0)) * pw;
      const py = (y) => pad.t + (1 - (y - yt.lo) / (yt.hi - yt.lo)) * ph;
      const ix = (X) => x0 + ((X - pad.l) / pw) * (x1 - x0);
      const iy = (Y) => yt.lo + (1 - (Y - pad.t) / ph) * (yt.hi - yt.lo);
      layout = { px, py, ix, iy, pad, width, height, x0, x1, ylo: yt.lo, yhi: yt.hi };
      const inView = (x, y) => x >= x0 - 1e-9 && x <= x1 + 1e-9 && y >= yt.lo - 1e-9 && y <= yt.hi + 1e-9;

      ctx.lineWidth = 1;
      ctx.textBaseline = "middle";
      for (const v of yt.values) {
        const y = Math.round(py(v)) + 0.5;
        ctx.strokeStyle = grid; ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(width - pad.r, y); ctx.stroke();
        ctx.fillStyle = faint; ctx.textAlign = "right"; ctx.fillText(yLabel(v), pad.l - 6, y);
      }
      const xTickValues = opts.integerX
        ? Array.from({ length: Math.max(0, Math.floor(x1) - Math.ceil(x0) + 1) }, (_, i) => Math.ceil(x0) + i)
        : ticks(x0, x1, Math.max(3, Math.round(width / 90))).values.filter((v) => v >= x0 && v <= x1);
      const every = Math.max(1, Math.ceil(xTickValues.length / Math.max(2, Math.floor((width - pad.l - pad.r) / 34))));
      const xLabel = opts.xLabel || ((v) => String(v));
      ctx.textAlign = "center"; ctx.textBaseline = "top";
      xTickValues.forEach((v, i) => {
        const x = Math.round(px(v)) + 0.5;
        ctx.strokeStyle = grid; ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, height - pad.b); ctx.stroke();
        if (i % every === 0) { ctx.fillStyle = faint; ctx.fillText(xLabel(v), x, height - pad.b + 5); }
      });

      ctx.save();
      ctx.beginPath(); ctx.rect(pad.l, pad.t - 4, pw, ph + 8); ctx.clip();
      ctx.textBaseline = "bottom"; ctx.textAlign = "left"; ctx.font = `10px ${mono}`;
      for (const r of opts.refs || []) {
        if (!Number.isFinite(r.value) || r.value < yt.lo || r.value > yt.hi) continue;
        const y = Math.round(py(r.value)) + 0.5;
        ctx.strokeStyle = r.color || baseline; ctx.setLineDash([5, 4]); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(width - pad.r, y); ctx.stroke(); ctx.setLineDash([]);
        if (r.label) { ctx.fillStyle = faint; ctx.fillText(r.label, pad.l + 4, y - 2); }
      }

      const ends = [];
      for (const s of opts.series) {
        const pts = s.points.filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y)).sort((a, b) => a[0] - b[0]);
        if (!pts.length) continue;
        ctx.strokeStyle = s.color; ctx.lineWidth = 1.5; ctx.lineJoin = "round"; ctx.setLineDash(s.dash || []);
        ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(px(x), py(y)) : ctx.moveTo(px(x), py(y)))); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = s.color;
        for (const [x, y] of pts) { ctx.beginPath(); ctx.arc(px(x), py(y), s.dash ? 2 : 2.5, 0, Math.PI * 2); ctx.fill(); }
        const shown = pts.filter(([x, y]) => inView(x, y));
        if (s.endLabel !== false && shown.length) {
          const [x, y] = shown[shown.length - 1];
          ends.push({ x: px(x) + 6, y: py(y), text: fmt(y), color: s.color });
        }
      }
      ctx.restore();
      // Keep end labels apart: labels that end near the same x are pushed down 12px each.
      ctx.font = `10.5px ${mono}`; ctx.textAlign = "left"; ctx.textBaseline = "middle";
      const gap = 12;
      ends.sort((a, b) => a.x - b.x || a.y - b.y);
      const groups = [];
      for (const e of ends) { const g = groups[groups.length - 1]; if (g && Math.abs(g[0].x - e.x) < 40) g.push(e); else groups.push([e]); }
      for (const g of groups) {
        g.sort((a, b) => a.y - b.y);
        for (let i = 1; i < g.length; i++) g[i].y = Math.max(g[i].y, g[i - 1].y + gap);
        const over = g[g.length - 1].y - (height - pad.b);
        if (over > 0) for (let i = g.length - 1; i >= 0; i--) g[i].y = Math.min(g[i].y - over, i < g.length - 1 ? g[i + 1].y - gap : Infinity);
        for (const e of g) { ctx.fillStyle = e.color || ink; ctx.fillText(e.text, e.x, e.y); }
      }

      if (drag) {
        const rx = Math.max(pad.l, Math.min(drag.sx, drag.cx)), rw = Math.min(width - pad.r, Math.max(drag.sx, drag.cx)) - rx;
        const flat = Math.abs(drag.cy - drag.sy) < 6;
        const ry = flat ? pad.t : Math.max(pad.t, Math.min(drag.sy, drag.cy)), rh = flat ? ph : Math.min(height - pad.b, Math.max(drag.sy, drag.cy)) - ry;
        ctx.fillStyle = css(host, "--accent", "#2a78d6"); ctx.globalAlpha = 0.1; ctx.fillRect(rx, ry, rw, rh);
        ctx.globalAlpha = 0.6; ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = 1; ctx.strokeRect(rx + 0.5, ry + 0.5, rw - 1, rh - 1); ctx.globalAlpha = 1;
      }
      reset.textContent = opts.resetLabel || "Reset zoom";
      reset.style.display = zoom ? "block" : "none";

      if (hoverX != null && !drag && hoverX >= x0 && hoverX <= x1) {
        const x = Math.round(px(hoverX)) + 0.5;
        ctx.strokeStyle = faint; ctx.lineWidth = 1; ctx.setLineDash([2, 2]);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, height - pad.b); ctx.stroke(); ctx.setLineDash([]);
        for (const s of opts.series) {
          const p = s.points.find(([px_]) => px_ === hoverX);
          if (!p || !Number.isFinite(p[1]) || !inView(p[0], p[1])) continue;
          ctx.fillStyle = css(host, "--surface", "#fff"); ctx.strokeStyle = s.color; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(px(hoverX), py(p[1]), 3.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        }
      }
    }

    function showTip(clientX) {
      if (!layout) return;
      const rect = canvas.getBoundingClientRect();
      const mx = clientX - rect.left;
      const xs = [...new Set(opts.series.flatMap((s) => s.points.map(([x]) => x)))].filter((x) => Number.isFinite(x) && x >= layout.x0 && x <= layout.x1);
      if (!xs.length) return;
      const nearest = xs.reduce((a, b) => (Math.abs(layout.px(b) - mx) < Math.abs(layout.px(a) - mx) ? b : a));
      hoverX = nearest;
      draw();
      const fmt = opts.format || ((v) => Number(v).toFixed(3));
      const rows = opts.series.map((s) => {
        const p = s.points.find(([x]) => x === nearest);
        return p && Number.isFinite(p[1]) ? `<div><i style="display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:6px;background:${s.color}"></i>${s.label} <b>${fmt(p[1])}</b></div>` : "";
      }).join("");
      const refRows = (opts.refs || []).filter((r) => r.label && Number.isFinite(r.value)).map((r) => `<div style="opacity:.7">┄ ${r.label} ${fmt(r.value)}</div>`).join("");
      tip.innerHTML = `<div style="opacity:.7;margin-bottom:2px">${(opts.xTitle || "x")} ${(opts.xLabel || String)(nearest)}</div>${rows}${refRows}`;
      tip.style.display = "block";
      const tx = layout.px(nearest);
      const w = tip.offsetWidth;
      tip.style.left = `${tx + 10 + w > layout.width ? Math.max(0, tx - w - 10) : tx + 10}px`;
      tip.style.top = `${layout.pad.t}px`;
    }

    function hideTip() { hoverX = null; tip.style.display = "none"; draw(); }

    const local = (e) => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    canvas.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button === 0 && layout) {
        const [x, y] = local(e);
        drag = { sx: x, sy: y, cx: x, cy: y };
        canvas.setPointerCapture(e.pointerId);
        e.preventDefault();
        return;
      }
      showTip(e.clientX);
    });
    canvas.addEventListener("pointermove", (e) => {
      if (drag) { [drag.cx, drag.cy] = local(e); hoverX = null; tip.style.display = "none"; draw(); return; }
      showTip(e.clientX);
    });
    canvas.addEventListener("pointerup", (e) => {
      if (!drag) return;
      const d = drag; drag = null;
      const dx = Math.abs(d.cx - d.sx), dy = Math.abs(d.cy - d.sy);
      if (layout && dx >= 6) {
        const L = layout;
        const nx0 = L.ix(Math.min(d.sx, d.cx)), nx1 = L.ix(Math.max(d.sx, d.cx));
        zoom = dy >= 6
          ? { x0: nx0, x1: nx1, y0: L.iy(Math.max(d.sy, d.cy)), y1: L.iy(Math.min(d.sy, d.cy)) }
          : { x0: nx0, x1: nx1 };
      } else if (layout && dy >= 6) {
        zoom = { x0: layout.x0, x1: layout.x1, y0: layout.iy(Math.max(d.sy, d.cy)), y1: layout.iy(Math.min(d.sy, d.cy)) };
      }
      draw();
      showTip(e.clientX);
    });
    canvas.addEventListener("pointerleave", () => { if (!drag) hideTip(); });
    canvas.addEventListener("dblclick", () => { zoom = null; draw(); });
    reset.addEventListener("click", () => { zoom = null; hideTip(); });
    const resize = new ResizeObserver(() => draw());
    resize.observe(host);
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", draw);
    draw();

    return {
      update(next) { opts = next; hoverX = null; tip.style.display = "none"; draw(); },
      destroy() { resize.disconnect(); scheme.removeEventListener("change", draw); host.replaceChildren(); },
    };
  }

  window.LineChart = LineChart;
})();
