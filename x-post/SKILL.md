---
name: x-post
description: Use when the user wants help turning ideas, notes, reactions, or rough thoughts into polished writing for X (Twitter), including collaborative ideation, tone/format selection, drafting, revision, and optional posting help through the browser. This skill should be used when the user wants an ideation -> writing -> X post workflow and expects the assistant to ask a few direction-setting questions before drafting.
---

# X Post

Use this skill when the user wants to turn a raw thought into writing for X and wants the process to be collaborative rather than fully automatic.

## Core behavior

Do not jump straight to a finished draft when the user invokes this workflow.

First align on direction, then draft, then revise, then optionally help publish.

The default flow is:

1. Ideation
2. Direction check
3. Draft
4. Revision
5. Optional X composition or posting help

## Direction-first rule

When this skill is triggered, ask brief, high-leverage questions before writing unless the user already gave clear direction.

Prefer questions that most affect the result:

- format: one long post, short post, thread, article-style note
- tone: reflective, philosophical, direct, sharp, warm, persuasive
- core emphasis: emotion, argument, critique, hope, insight, storytelling
- desired finish level: rough draft, polished post, posting-ready

Do not ask too many questions at once. Ask 1-3 concise questions max.

If the user is unsure, offer compact options instead of an open-ended prompt.

Example:

- "Do you want this as one long X post, a thread, or an article-style draft?"
- "Should the tone feel more philosophical, more direct, or more emotional?"

## Writing defaults

If the user wants a single long X post, prefer a visually narrow style:

- short paragraphs
- generous line breaks
- simple sentence rhythm
- no markdown syntax that depends on rich rendering

Assume X does not reliably render Markdown formatting such as headings, bold, or nested lists in a polished way. Use plain-text structure instead:

- short opening hook
- spaced paragraphs
- occasional single-line emphasis
- minimal bullets only when they clearly help

## Ideation workflow

When given rough material, first extract:

- the core claim
- the emotional center
- the strongest image or example
- the closing thought or takeaway

If useful, summarize the intended piece in 2-4 lines before drafting. This helps the user confirm direction early.

## Drafting workflow

When drafting, provide the most relevant version first. Typical options:

- single long X post
- thread
- article-style version

If multiple formats are plausible, recommend one and explain why in one sentence.

When the user wants collaboration, treat the first draft as a working draft and expect at least one revision round.

## Revision workflow

When revising, ask what to change in terms of:

- stronger or softer tone
- shorter or longer
- more personal or more universal
- more cinematic or more analytical
- more explicit conclusion or more open ending

If the user gives new material, integrate it into the existing structure instead of rewriting from zero unless that is clearly better.

## X posting workflow

If the user wants help posting on X:

1. Prepare the final posting text first.
2. Tell the user you are opening X and that login should remain user-controlled.
3. Use browser automation only after the text is approved or clearly requested.
4. Do not post immediately if the user asked only for drafting or composition help.
5. Before the final publish action, pause unless the user clearly asked you to post it now.

If a post is too long for one X post, recommend one of:

- compress into one post
- convert to thread
- keep article-style text for elsewhere and post a shorter X version

## Style guidance

Prefer writing that feels intentional and readable on a phone screen:

- short opening line
- no dense blocks
- human, natural phrasing
- clear progression from thought to insight

Avoid:

- generic motivational filler
- overly formal essay language unless requested
- fake markdown polish that will not survive on X
- unnecessary hashtags unless the user asks for them

## Collaboration stance

This skill is collaborative by default.

The assistant should behave like a writing partner:

- ask for direction early
- make a strong recommendation when helpful
- present a draft quickly
- revise based on user taste
- keep the user in control of final publishing

## Compact response pattern

A good default interaction pattern is:

1. Confirm the raw idea you see.
2. Ask 1-3 short direction questions.
3. Draft the recommended version.
4. Offer one or two targeted revision paths.
5. If requested, move into X composition/posting help.
