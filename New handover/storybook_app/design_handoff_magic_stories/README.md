# Handoff: Magic Stories — AI Children's Storybook Creator

## Overview
**Magic Stories** is an AI-powered storybook creator for children aged 5–12. A child is guided
through a playful, teacherly **wizard** that asks the classic author's questions (Who / Where /
When / What / Why), lets them choose literary techniques ("magic words"), and actively coaches
them to **write their own sentences**. The app then "writes" and "illustrates" a personalised
6-page storybook the child can read, edit, download as PDF, and save to a library.

The product has two surfaces, both included in this bundle:
1. **Marketing landing page** (`Story Magic Landing.html`) — public site with hero, how-it-works,
   book-bundle pricing, CTA, footer.
2. **The app itself** (`Magic Stories App.html` + `magic-app.css` + `magic-app.js`) — the
   multi-screen story-builder. **This is the primary deliverable** and the focus of this document.

The pedagogical goal threaded through the app: build **agency** (the child chooses and writes),
**scaffolding** (simple → advanced, age-gated), and **instant visible payoff** (the child's own
words appear verbatim in the finished book).

---

## About the Design Files
The files in this bundle are **design references created in HTML/CSS/vanilla-JS** — working
prototypes that demonstrate the intended look, copy, flow, and interaction. **They are not meant
to be shipped as-is.** The task is to **recreate these designs inside the target codebase's
existing environment** (React, Vue, Svelte, SwiftUI, native, etc.) using its established component
patterns, state management, and styling system. If no app environment exists yet, choose an
appropriate modern framework (React + TypeScript is a natural fit given the screen-state machine)
and implement the designs there.

The "AI" in this prototype is **simulated** — the loading screen is a timed animation and the
story text is assembled client-side from a template (see *State Management → Story assembly*). In
production these are the integration points for the real LLM (story text) and image model
(illustrations). The handover from the original product brief specifies **Anthropic Claude** for
the story text and **DALL·E 3** for illustrations, called from a backend.

---

## Fidelity
**High-fidelity (hifi).** Final colours, typography, spacing, copy, animations, and interaction
behaviour are all specified. Recreate the UI faithfully using the codebase's libraries. Exact
design tokens are listed below and also live in `:root` of `magic-app.css`.

The one area to treat as **content, not final art**: the inner book-page illustrations. The
prototype shows one real illustration (`assets/illo-jungle.png`) on the cover and page 1, and
themed emoji/gradient placeholder panels on pages 2–6. In production every page gets a generated
illustration.

---

## Screens / Views
The app is a **single-page state machine**: one `.screen` is visible at a time, swapped by a
`show(screenId)` function. Screens in flow order:

### 1. Builder (`#screen-builder`)
- **Purpose**: The guided wizard where the child designs their story.
- **Layout**: Centred column, `max-width: 1140px`. Top: a **builder header** (step counter
  eyebrow, Fredoka One title "Let's build a story", and a horizontal **progress trail**). Below: a
  **step panel** card that re-renders per step. Below that: a **builder nav** row (Back / optional
  Skip / Next).
- **Progress trail**: a row of numbered circular nodes joined by short segments. States: `done`
  (gold fill, shows ✓), `current` (purple fill, gold ring glow), upcoming (dark, panel-line
  border). 30×30px nodes, 14px segments.
- **Steps** (rendered from the `STEPS` array in `magic-app.js`), in order:
  1. **Reading Level** (required) — 4 cards: Foundation (5–6), Early Reader (7–8), Confident
     (9–10), Advanced (11–12). Sets `state.level.age`, which **age-gates** the Magic Words step.
  2. **Magic Words** (optional) — choose literary techniques up front. 5 device rows: Adjectives
     (age 5), Similes (7), Personification (8), Metaphors (9), Adverbs (9, "use sparingly").
     Locked rows show "🔒 Age N+" and are non-interactive. A live "watch the sentence grow"
     parchment preview updates as techniques toggle. Chosen tools are woven through every page and
     surface as a reminder at each writing prompt.
  3. **Who** (required) — "Who is our hero?" 20 emoji option cards + "design your own" text field +
     a "Tell me more" writing block.
  4. **Where** (required) — "Where does it happen?" 20 cards + own + writing block.
  5. **When** (required) — "When does our tale unfold?" 20 cards + own + writing block.
  6. **What** (required) — "What's the quest?" 20 cards + own + writing block.
  7. **Why** (required) — "And why does it matter?" 20 cards + writing block.
  8. **Magic Touch** (optional) — free-text textarea for any extra detail.
  9. **Final recap** — chips summarising every choice + a "you wrote N of your own words" badge,
     then the "✦ Write My Story! ✦" button.
- **Option cards** (`.opt`): 10-per-row grid on desktop (≥1024px), 5-per-row ≤1024px, 4 ≤480px.
  Each: vertical flex, centred; 30px emoji, 10.5px bold label, optional 9.5px sub-label. Selected
  state: purple gradient fill, accent-coloured border + glow ring, ✓ badge top-right. Each builder
  step has an **accent colour** (pink/gold/lilac/green/purple/blue) that tints its eyebrow,
  selected-card border, and ring.
- **Writing block** (`.write-block`, on Who/Where/When/What/Why): dashed-gold card containing an
  italic prompt, **sentence-starter chips** (tap to prepend a starter into the textarea), a
  textarea (18px text, min-height 150px), and a **sparkle word-counter** that escalates its
  message and colour with word count (0 → "your turn", <5 → "great start", <15 → "N magic words!",
  ≥15 → "Wow — N words!"). If Magic Words were chosen, a reminder pill lists them.

### 2. Loading (`#screen-loading`)
- **Purpose**: Simulated "AI is writing" moment. In production, the real generation happens here.
- **Layout**: Full-height centred column. A floating 80px book emoji (`float` animation), a Fredoka
  title "Weaving your story…", a rotating italic status message, and a progress bar that fills
  0→100%. On complete, advance to Cover.
- **Status messages** cycle through: "The story fairies are dipping their quills…", "Sketching
  your hero…", "Painting the world in watercolour…", "Sprinkling in a little magic…", "Binding the
  pages with golden thread…", "Almost ready…".

### 3. Cover (`#screen-cover`)
- **Purpose**: Reveal the finished book's cover.
- **Layout**: An **open-book spread** (`.spread`, two pages side by side, gold spine down the
  middle, `aspect-ratio: 1000/640`). Left page: the illustration. Right page (`.cover-r`): radial
  purple background, gold ornament "✦ ❖ ✦", a gold-gradient Cinzel Decorative title (auto-generated
  from the quest), and "a magic story for {reader level}". Twinkling sparkles. Below: "✦ Open the
  Book ✦" button. The spread has a soft `shimmer` glow animation.

### 4. Story Pages (`#screen-pages`)
- **Purpose**: Read the 6-page book, one spread at a time.
- **Layout**: Same `.spread` shell. Left page: illustration (real image on page 1, themed
  placeholder panel with big emoji + caption on pages 2–6). Right page (`.parch`): parchment
  gradient, centred running-head (book title + gold rule), the page's prose with a purple Cinzel
  Decorative **drop cap**, and a centred page number with gold gems.
- **Controls**: round prev/next buttons flanking a row of page **dots** (gold = current). Below:
  **Edit text** and **Repaint illustration** tools that toggle inline popovers (edit = textarea to
  rewrite the page; repaint = text field + simulated "repainting…" button).
- **Prose**: assembled from the builder choices; any literary techniques the child selected are
  highlighted inline in their own colour (see Design Tokens → device colours). The child's own
  typed sentences appear verbatim within the relevant pages.
- Advancing past the last page → The End.

### 5. The End (`#screen-end`)
- **Purpose**: Celebrate completion and offer next actions.
- **Layout**: Full-height centred. "✦ The End ✦" in a gold→purple gradient Cinzel Decorative
  (floating animation), a subline, then three buttons: **Download PDF** (`window.print()`), **Save
  to Library**, **Write a New Story**.

### 6. Story Library (`#screen-library`)
- **Purpose**: A shelf of saved books (persists in `localStorage`).
- **Layout**: Header ("📚 Story Library"), responsive card grid (`minmax(220px,1fr)`). Each card:
  4:3 cover thumbnail (image or emoji placeholder), title (Cinzel), and meta line. Bottom: "✦
  Write a New Story" button. Seeded with two sample books on first load.

### App bar (persistent, all screens)
- Left: brand button "✦ Magic Stories" (Cinzel Decorative, returns to builder). Right: "📚 Story
  Library" ghost button. 1.5px gold-tint bottom border, translucent blurred background.

---

## Interactions & Behavior
- **Screen routing**: `show(id)` adds `.active` to one `.screen` (others `display:none`). Entrance
  animation is **transform-only** (`@keyframes fadeUp { from { transform: translateY(12px) } }`) —
  deliberately NOT animating opacity, so content stays visible even if a renderer freezes
  animations. Keep this behaviour: never gate a screen's visibility on an animated opacity.
- **Wizard navigation**: Next is disabled on required steps until a choice is made. Back is
  disabled on step 0. Optional steps show a Skip link.
- **Coach nudge** (the signature interaction): when the child clicks **Next** on Who/Where/When/
  What/Why, a one-time modal (`.coach-overlay`) appears *before advancing*, encouraging
  elaboration. It is **context-aware per page**:
  - Reads the child's typed text and extracts a likely **noun** (`pickWord`) and **verb**
    (`findVerb`, backed by a common-verb list + -ing/-ed heuristic).
  - **Adjective** field shows only when a noun is present ("what KIND of {noun}?").
  - **Adverb** field shows only when a verb is present ("HOW did they {verb}?").
  - **Senses** fields (See / Hear & Smell) show **only on Where and What**.
  - Per-page custom field: Who → hero trait; When → light/weather; Why → feeling.
  - Fallback: if no hook and nothing typed, a single "add one more sentence" field.
  - Answers are turned into grammatical sentences and **appended to the child's own writing**
    (`state.more[stepId]`), so they flow into the book. Modal shows once per step (tracked in
    `coached`), is dismissible via "Maybe later →" or backdrop click.
- **Magic Words age-gating**: locked techniques (minAge > reader age) are shown but disabled; if
  the reader level changes to a younger band, any now-locked selections are auto-removed.
- **Live previews**: the Magic Words "sentence grows" preview and the writing-block word-counter
  update on every input.
- **Loading**: timed interval (~480ms ticks) advancing a progress bar and cycling messages; on
  100% waits ~650ms then shows the cover. (Production: replace with real async generation + the
  same visual.)
- **Edit / Repaint**: inline popovers on story pages. Edit rewrites `currentStory.pages[i].text`
  and re-renders. Repaint is a simulated 1.4s spinner (production: re-generate the illustration).
- **PDF**: "Download PDF" calls `window.print()`.

## State Management
Single module-scoped `state` object, rebuilt on "new story":
```
state = {
  level: {label, val, age} | null,        // reading level (gates magic words)
  who/where/when/what/why: {label, val, custom} | null,  // each required choice
  words: [deviceId...],                    // chosen literary techniques
  touch: '',                               // optional magic-touch free text
  more: { who/where/when/what/why: '' },   // the child's own written sentences per page
  senses: { see, hear, feel }              // legacy global senses (coach now writes into `more`)
}
```
Other state: `stepIndex` (current wizard step), `coached` (which steps have shown the coach),
`currentStory` (the assembled book), `pageIndex` (current page in reader).

- **Story assembly** (`buildStory`): pure function of `state`. Produces `{title, hero, pages[6]}`.
  Each page text is a template string interpolating the choices; the child's `more[stepId]` text is
  spliced into the matching page (who→p1, why→p2, where→p3, what→p4). Literary-technique helpers
  (`adj/adv/simile/metaphor/person`) inject highlighted spans only when that device is selected.
  Title is generated from the quest via a lookup map. **This is the seam to replace with a real
  LLM call** — feed the same `state` to the model as a structured prompt.
- **Library persistence**: `localStorage` key `magicStories.library.v1`, an array of
  `{title, meta, cover|emoji}`. Seeded with two samples if empty.

## Design Tokens
All defined in `:root` of `magic-app.css`.

**Colours**
- Backgrounds: `--bg #06020f`, `--bg-soft #0d0520`, `--bg-2 #150a30`. Body is a radial gradient
  `#1a0a3e → #0d0520 → #06020f` with a fixed starfield overlay (layered radial-gradient dots,
  opacity .55).
- Purple: `--purple #7b2fa8`, `--purple-lt #c084fc`, `--purple-deep #4a1d6e`.
- Gold: `--gold #d4af37`, `--gold-lt #ffd700`, `--gold-deep #b8932f`.
- Parchment (book pages): `--parchment #f5e6c5`, `--parchment-2 #efdcb4`, `--parch-edge #e2cf9f`.
- Ink (text on parchment): `--ink #2c1a08`, `--ink-soft #6c5022`.
- Cream (text on dark): `--cream #e8d5b0`, `--cream-soft #bda88a`.
- Step accents: `--pink #f9a8d4`, `--green #86efac`, `--lilac #c084fc`, `--blue #93c5fd`.
- Surfaces: `--panel rgba(20,12,42,0.62)`, `--panel-line rgba(176,111,216,0.26)`,
  `--line rgba(212,175,55,0.16)`.
- **Literary-technique highlight colours** (used in story prose & previews): adjective `#9c3fb0`,
  adverb `#b8651f`, simile `#2f6fbf` (italic), metaphor `#2f7d4a`, personification `#b0457f`.

**Typography** (Google Fonts)
- `Cinzel Decorative` (700/900) — brand wordmark, book titles, drop caps, "The End".
- `Cinzel` (400/600/700) — eyebrows, labels, buttons, running heads.
- `Fredoka One` — playful screen headings ("Let's build a story").
- `Spectral` (400/500 + italics) — story prose, prompts, sublines.
- `Nunito` (400/600/700/800) — UI/body, option labels, counters.

**Radius**: cards 16–24px, option cards 11px, buttons 11–16px, pills/dots 999px, `--radius 20px`.
**Shadow**: `--shadow 0 26px 54px -30px rgba(0,0,0,.75)`; book spread adds a deep drop shadow +
gold ring; buttons have coloured glow shadows.
**Spacing**: card padding `clamp(22px,3vw,38px)`; option grid gap 7px; generous vertical rhythm.
**Animations**: `fadeUp` (transform-only entrance), `float` (gentle 3–3.6s bob), `twinkle`
(sparkles), `shimmer` (cover glow), `fadeIn` (coach backdrop). Respect
`prefers-reduced-motion: no-preference` for the screen entrance.

**Responsive**: option grid 10→5→4 columns at 1024/820/480px; book `.spread` collapses from
side-by-side to stacked (illustration above text) ≤820px and hides the spine; nav links hide
≤880px.

## Assets
- `assets/book-original.png` — the source hero render used on the landing page (the open-book
  marketing image; its cream background is removed **client-side** in the landing page's script).
- `assets/book-hero.png` — pre-processed hero book cut-out (landing page).
- `assets/illo-jungle.png` — the single real inner illustration (jungle explorer scene), used on
  the app's cover and page 1, and as library thumbnails. **Placeholder for AI-generated art** in
  production — every page should get its own generated illustration.
- All other "illustrations" in the reader are emoji + gradient panels, intentionally placeholder.
- Emoji are used throughout as lightweight iconography (option cards, scene panels). A production
  build may keep emoji or swap for an icon/illustration set per the codebase's system.

## Files
In this bundle (under the project's `storybook_app/`):
- **`Magic Stories App.html`** — the app shell (screen markup). Loads the CSS + JS. *Primary.*
- **`magic-app.css`** — all app styles + design tokens (`:root`).
- **`magic-app.js`** — all app logic: `STEPS` config, wizard rendering, coach, story assembly,
  library, screen routing. `~760 lines`, no framework, no build step.
- **`Story Magic Landing.html`** — the marketing landing page (self-contained; references
  `assets/`).
- Supporting/earlier explorations (not required to implement the app): `Story Magic Landing
  Hi-Fi.html`, `Story Magic Hero Backgrounds.html`, `Story Magic Landing Wireframes.html`.

### Suggested implementation notes for the target codebase
- The `STEPS` array is effectively a **schema** — port it to typed config and drive the wizard
  from data, exactly as the prototype does.
- Model the screen flow as an explicit state machine / route set (builder, loading, cover, pages,
  end, library).
- Keep `buildStory` as a pure function boundary so the simulated assembler can be swapped for a
  real Claude call without touching the UI.
- Preserve the **transform-only entrance** rule and the **age-gating** + **context-aware coach**
  logic — these encode the product's pedagogy and accessibility intent.
