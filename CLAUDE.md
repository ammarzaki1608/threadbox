# THREADBOX — Claude Code Project Guide
*Drop this file as `CLAUDE.md` in your project root. Claude Code auto-reads it as project memory on every session.*

---

## 0. What this file is for

Claude Code (and any AI tool) defaults to a handful of templated looks when it isn't given a real point of view: warm-cream-and-serif, near-black-with-neon-accent, or hairline-rule broadsheet. None of these are THREADBOX. This file exists so every session — even a brand-new one, even a different model — starts from the same visual DNA instead of re-inventing a generic streetwear template.

Read `THREADBOX_Brand_Guidelines.md` alongside this file for the *why*; this file is the *how* — tokens, structure, and prompting patterns to actually get Claude Code to build it correctly.

---

## 1. Brand Snapshot (paste-able context block)

```
Brand: THREADBOX
Product: Malaysian streetwear apparel, collections organized by geographic tier
(Malaysia → State → District → Landmark → Culture → Food → Festival)
Current drops: Merdeka (national), Penang (state), Balik Pulau (district/football collab)
Audience: 18-28 Malaysian streetwear/drop-culture audience, secondary 30-40s nostalgia buyers
Tone: proud not preachy, local slang no apology, understated confidence, dry humor
Visual anchor: bold condensed wordmark logo (stripe-styled "E"), garments always black or white,
back-print is the hero graphic, front chest logo stays small and monochrome
```

---

## 2. Design Tokens

### Color
```css
:root {
  /* Base */
  --bg-black: #0A0A0A;
  --bg-white: #FAFAF7;
  --ink: #141414;

  /* Merdeka collection accent */
  --merdeka-red: #CC1F2E;
  --merdeka-gold: #F2C230;
  --merdeka-navy: #1B2E5C;
  --merdeka-cream: #F0E6D2;

  /* Penang collection accent */
  --penang-teal: #1E7A8C;
  --penang-cream: #F3E9D2;
  --penang-red: #B8352E;

  /* Balik Pulau (football collab) accent */
  --bp-cobalt: #16386B;
  --bp-gold: #F0B429;
}
```
Do not blend these into one "brand palette" for the whole site — the site should shift accent per collection section, the way the physical drops do. A homepage that uses all five accents evenly will look like a rainbow sampler, not a brand.

### Type
- **Display/Headlines:** a heavy condensed grotesk (e.g. self-hosted variable font in that family — Anton, Druk-style, or similar). This should visually rhyme with the garment back-print lettering.
- **Body/UI:** a plain, restrained grotesk (e.g. Inter or a similar neutral face) — kept quiet on purpose so it doesn't compete with the product graphics on scroll.
- **Never** use a soft rounded/geometric UI font (Poppins, Quicksand-type shapes) as display — reads as generic app, not apparel.

### Layout signature
- Product-first, editorial grid — think drop-page/lookbook, not SaaS landing page.
- No default hero pattern of "big heading, subhead, two buttons, gradient blob." Instead: lead with a **full-bleed back-print photograph** as the hero — the product graphic *is* the thesis, per the brief.
- Section dividers = collection changes, not decorative rules. Each collection section change should also swap the accent color token, so scrolling through the site feels like flipping through the three drops physically.

---

## 3. Anti-"AI Slop" Checklist

Before accepting any Claude Code output, check it against this list:

- [ ] Is the hero a product photo/graphic, not a gradient-blob-plus-two-buttons layout?
- [ ] Does typography look chosen for THREADBOX specifically, not the default pairing you'd get for any streetwear brief?
- [ ] Is there exactly **one** bold/unusual layout idea (the "signature element"), with everything else disciplined and quiet around it — not five competing ideas?
- [ ] Are numbered steps/badges (01 / 02 / 03) only used where there's a real sequence (e.g. actual drop order), not decoratively?
- [ ] Is animation restrained — one deliberate moment (e.g. a scroll reveal tied to a garment turning front-to-back) rather than scattered hover/fade effects everywhere?
- [ ] Does copy sound like a person who knows the brand, not generic marketing filler ("Elevate your style" = reject; "Balik Pulau — from our land to the pitch" = keep)?
- [ ] Off the three AI-design defaults — warm cream+serif+terracotta, near-black+neon accent, broadsheet hairline-rule — has this design earned its palette from the brief, or defaulted into one of these?

---

## 4. How to Prompt Claude Code (workflow, not one giant prompt)

Build in passes — don't ask for the whole site in one prompt. Recommended order:

**Pass 1 — Design plan, no code yet.**
> "Before writing any code: propose a design token system (colors, type, layout concept, one signature element) for the THREADBOX homepage, based on `THREADBOX_Brand_Guidelines.md` and `CLAUDE.md` in this repo. Don't write code yet — show me the plan first so I can react to it."

This forces the plan-then-critique step instead of jumping straight to a templated build.

**Pass 2 — Foundation.**
> "Now scaffold the project: [Next.js/Astro/plain HTML — pick your stack], set up the design tokens as CSS variables exactly as specified in CLAUDE.md, and build just the navigation + hero section using the Merdeka collection as the hero drop."

**Pass 3 — One section at a time.**
> "Add the Penang collection section below the hero. Accent color switches to the Penang palette per CLAUDE.md. Reuse the same card/grid structure as the Merdeka section but do not reuse the same accent color or imagery style."

**Pass 4 — Self-critique loop.**
> "Take a screenshot of the current homepage. Compare it against the Anti-AI-Slop Checklist in CLAUDE.md section 3 and tell me which items fail. Then fix them."

**Pass 5 — Product/detail pages.**
> "Build a single product page template for a SKU — reference [specific shirt], use its actual back-print image, and follow the Poster-Back or Collage-Badge composition rules from the Graphic Design Bible section of THREADBOX_Brand_Guidelines.md depending on which collection it belongs to."

### General prompting tips specific to this project
- Always point Claude Code at the two markdown files by name in your prompt (`THREADBOX_Brand_Guidelines.md`, `CLAUDE.md`) rather than re-typing brand facts each time — consistency across sessions comes from the files, not your memory of what you said last time.
- When you have real product photos, say so explicitly ("use the uploaded photo at `/assets/merdeka-back.jpg`, don't generate a placeholder") — otherwise it'll default to a stock-photo-style placeholder that undercuts the "real garment" feel.
- Ask for one collection section at a time rather than "build the whole site" — it's much easier to catch a generic-looking section early than to unwind five sections that all look the same.
- If something looks close-but-off, name the specific default it's falling into (e.g. "this hero reads like the cream/serif/terracotta AI default — reground it in the Merdeka palette and condensed type instead") rather than just saying "make it better."

---

## 5. Assets Checklist (what to actually feed Claude Code)

- [ ] High-res front/back product photos per SKU (the flat-lay renders you already have work for placeholders, but real garment photography will read far better once available)
- [ ] Logo files: wordmark (SVG, black + white versions), and the circular/crest marks used on Penang and Balik Pulau lines
- [ ] `THREADBOX_Brand_Guidelines.md` (this doc)
- [ ] `CLAUDE.md` (this doc, renamed at project root)
- [ ] Any existing copy/captions from Threads (Marz) so site tone matches your existing public voice rather than being reinvented from scratch

---

*Keep this file updated as new collections launch — add new palette tokens per tier, and log which layout/register choices worked so future drops (District/Landmark/Culture/Food/Festival tiers) don't have to re-litigate decisions already made.*
