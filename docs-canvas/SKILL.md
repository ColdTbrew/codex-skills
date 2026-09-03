---
name: docs-canvas
description: Turn documentation, architecture notes, API references, runbooks, RFCs, or codebase walkthroughs into a navigable Codex canvas. Use when the user asks for a docs canvas, documentation overview, architecture walkthrough, interactive reference, or a visual document that is easier to scan than flat Markdown. Do not use for a small answer that is clearer as ordinary prose or one compact diagram.
---

# Docs Canvas

Create a focused, navigable documentation artifact that helps the reader find the answer quickly and trace it back to its sources.

## Choose the deliverable

- Prefer an in-conversation HTML/SVG visualization when the available visualization tool can provide a self-contained interactive artifact.
- Otherwise create a self-contained HTML file in the current thread's writable visualization directory and return its content reference.
- Use ordinary Markdown instead when the source is short or interactivity would not improve comprehension. Briefly say why a canvas is unnecessary.
- Do not assume Cursor Canvas APIs, `~/.cursor` files, or Cursor SDK components exist.

## Establish the documentation contract

Before composing the canvas, identify:

- the reader and the question they need answered;
- the included and excluded scope;
- the source material and its authority;
- whether current repository state, a supplied document, or external sources are the source of truth.

Inspect relevant source files and documentation. Browse only when the user supplied a URL, asks for current external information, or the answer otherwise requires it. Never invent APIs, file paths, commands, or architecture links. Mark interpretations and unresolved gaps as such.

## Shape the canvas around the material

Use the smallest structure that makes the subject easy to scan. A substantial canvas usually includes:

1. An overview with purpose, scope, audience, and key takeaway.
2. Compact navigation to the major sections.
3. Sections organized around reader tasks or system boundaries rather than source-file order.
4. References linking claims to source files, documents, or external pages.

Add only representations that clarify the content:

- architecture or dependency diagrams for ownership and relationships;
- sequence or state diagrams for runtime behavior;
- tables for exact mappings, parameters, or comparisons;
- code blocks for small runnable or representative examples;
- callouts for warnings, invariants, deprecations, and open questions;
- decision trees, glossaries, or worked examples when those shorten the path to understanding.

Keep critical facts visible without hover. Use progressive disclosure for supporting detail, not for prerequisites or warnings.

## Make navigation real

- Give every major section a stable anchor and make the table of contents link to it.
- Keep orientation visible on long pages with a restrained sticky or pinned navigation element.
- Provide a clear reading order on narrow screens; do not make a desktop graph the only way to understand the document.
- For codebase sources, use clickable absolute file links with a line number when the current environment supports them.
- Label external links descriptively and distinguish source evidence from further reading.

## Visual and interaction quality

- Match an existing product or documentation system when one is in scope; otherwise use a quiet documentation-first visual language.
- Favor readable typography, generous line height, restrained color, and consistent spacing over decorative effects.
- Use semantic headings, landmarks, lists, tables, and controls. Ensure keyboard focus is visible and interactive controls have accessible names.
- Respect reduced-motion preferences. Avoid motion unless it explains a transition or relationship.
- Keep the artifact self-contained. Do not depend on sibling local assets; use inline SVG and embedded data. If a CDN library is necessary, pin its version and provide a readable fallback.

## Verify before handing off

Check the artifact in proportion to the request:

- confirm navigation targets, source links, code formatting, and interactive controls work;
- check that content remains readable at desktop and mobile widths;
- check overflow, clipping, contrast, keyboard navigation, and reduced-motion behavior;
- compare claims and examples with the cited source material;
- state which checks were actually performed and do not call an unverified artifact verified.

For an explicitly quick or no-browser request, skip browser and screenshot checks, keep the artifact lightweight, and disclose the reduced validation scope.

## Handoff

Lead with the finished canvas link or visualization. Then summarize its scope, source basis, and validation in a few lines. Mention material gaps or assumptions that could change the documentation.

This skill is a Codex-native adaptation inspired by Cursor's MIT-licensed `docs-canvas` plugin: https://github.com/cursor/plugins/tree/main/docs-canvas
