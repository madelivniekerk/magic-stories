# Story Magic — Design Handover

## What this app is

Story Magic is an AI-powered children's storybook creator for ages 5–12. A parent or child picks a reading level, a hero, a world, a quest, and an optional magic touch — then Claude writes a 6-page story and DALL-E 3 paints an illustration for each page. The result is a magic book UI they can flip through and download as a PDF.

**Main file:** `storybook_app.py` (single-file Streamlit app, ~1160 lines)
**Run:** `streamlit run storybook_app.py` from this folder

---

## Current design system

### Colours
| Token | Hex | Used for |
|---|---|---|
| Background | `#0d0520` → `#1a0a3e` | Radial gradient — deep space purple |
| Gold | `#d4af37` | Primary accent, borders, selected states |
| Purple button | `#7b2fa8` | Buttons, drop cap |
| Parchment | `#f5e6c5` | Book right page background |
| Parchment dark | `#f5e6c8` | Book left page (illustration side) |
| Text on dark | `#e8d5b0` | Body text on dark bg |
| Text on parchment | `#2c1a08` | Story text on book page |
| Story text colour | `#9a7030` | Running head, page numbers |
| Pink accent | `#f9a8d4` | Reading level selector |
| Green accent | `#86efac` | Quest selector |
| Lilac accent | `#c084fc` | World selector |
| Spine gradient | `#c8a050` → `#ffd700` → `#9a7020` | Gold book spine |

### Fonts (loaded from Google Fonts)
| Font | Weight | Used for |
|---|---|---|
| Cinzel Decorative | 400, 700, 900 | App title "Story Magic", drop cap letters, "The End" |
| Cinzel | 400, 600, 700 | Buttons, section headings, running head, page numbers |
| Spectral (incl. italic) | 400, 500, 600 | Story body text on parchment pages, description copy |
| Fredoka One | 400 | h1/h2/h3 tags, loading message |
| Nunito | 400, 600, 700, 800 | General UI labels, card text |

### Animations
- `twinkle` — opacity + scale pulse, 4 variants with staggered delays (2.1s, 2.8s, 1.9s, 3.2s)
- `float` — vertical translateY(-8px) bob, 4s loop — used on the "Story Magic" title and "The End"
- `shimmer` — box-shadow colour oscillates between purple and gold, 4s loop — used on the book spread

---

## App flow (screens in storybook_app.py)

### 1. Story Builder (home screen)
Five stacked sections, each with a left info panel and a right selection grid:

1. **Reading Level** — 4 cards (Foundation 5–6, Early Reader 7–8, Confident 9–10, Advanced 11–12). Pink accent.
2. **Your Hero** — 22 emoji character cards in a 5-col grid. Gold accent. Custom text area on left.
3. **Your World** — 22 setting cards in a 5-col grid. Lilac accent. Custom text area on left.
4. **Your Quest** — 22 adventure cards in a 5-col grid. Green accent. Custom text area on left.
5. **Magic Touch** — Free-text area for any extra idea (optional). Pink accent.

A "✦ Write My Story! ✦" button appears centred once all required fields are filled.

### 2. Loading state
Progress bar + "The story fairies are writing your adventure..." — ~60 seconds (story text + 6 DALL-E 3 images).

### 3. Book Cover
Two-page spread: left = first illustration full-bleed, gold spine, right = dark purple with title in gold gradient + twinkling ornaments. "✦ Open the Book ✦" button below.

### 4. Story Pages (6 pages)
Each page is a two-page book spread: left = DALL-E illustration, gold spine, right = parchment with running head, drop cap, Spectral body text, page number footer.
Below the book: edit text expander, repaint illustration expander, page navigation with dot indicators.

### 5. The End (page 6)
"✦ The End ✦" in floating gold-purple text. Download PDF + Write a New Story buttons.

### 6. Story Library
Grid of saved story cards. PDF download per story. Toggled by "📚 Story Library" button top-right.

---

## Current CSS approach

All styling injected via `st.markdown("""<style>...</style>""", unsafe_allow_html=True)` at top of file. Streamlit's classes overridden: `.stButton > button`, `.stTextInput input`, `.stTextArea textarea`, `.stApp`. Book spread, cover, and cards are pure HTML/CSS via `st.markdown(..., unsafe_allow_html=True)`.

---

## What's working well (keep as-is)
- The book spread layout (left illustration + gold spine + parchment right) — this is the hero UI
- Drop cap treatment in Cinzel Decorative
- Gold shimmer animation on the book
- Floating "Story Magic" title animation
- Parchment texture + corner ornaments on story pages
- 4-colour section system (pink/gold/lilac/green) for builder steps

---

## Known design issues / areas to improve

1. **Selection cards** — The "✦" select button appears below each card as a separate element. The whole card should be one clickable thing.
2. **Loading screen** — Just a text message + progress bar. Should be more magical — animated stars, book-opening feel.
3. **Builder feels long** — All 5 steps stacked with no progress indicator.
4. **Story Library** — No thumbnail preview of the cover image.
5. **Mobile** — The two-column book spread breaks on small screens.
6. **PDF** — ReportLab uses Helvetica. Looks functional, not magical.

---

## Tech constraints

- All styles in one `st.markdown` block at top of `storybook_app.py`
- No custom JS; no separate CSS files
- Streamlit buttons can't be styled per-instance without `div[data-testid]` selectors
- `st.markdown(..., unsafe_allow_html=True)` for static HTML; real buttons placed after
- DALL-E image URLs expire ~1hr; local copies saved to `stories/{story_id}/page_N.jpg`

---

---

## NEW: What to build — Landing Page (`landing.html`)

Create a standalone `landing.html` in the `storybook_app/` folder. This is a **pure HTML/CSS/JS file** (no Streamlit) — a marketing landing page that links to the Streamlit app. Model the structure and visual style on the VineLabel landing page (`wine_dpp/landing.html`), adapted for Story Magic's magic/children's book aesthetic.

### Visual style for the landing page

The landing page should feel like the app — deep space purple background, gold accents, parchment highlights — but presented in clean marketing sections like VineLabel's layout.

**Fonts to load:**
- Cinzel Decorative (700) — hero headline, logo
- Cinzel (400, 600) — section eyebrows, nav links
- Spectral italic (400) — subheadings, pull quotes
- Nunito (400, 600, 700) — body copy, feature lists

**Colours to use (landing page palette):**
```css
--bg:        #06020f;
--bg-soft:   #0d0520;
--purple:    #7b2fa8;
--purple-lt: #c084fc;
--gold:      #d4af37;
--gold-lt:   #ffd700;
--parchment: #f5e6c5;
--ink:       #2c1a08;
--muted:     #9a7ab0;
--line:      rgba(212,175,55,0.15);
```

---

### Section 1 — Nav
Logo left: ✦ Story Magic (Cinzel Decorative, gold gradient). Nav links right: "How it works" / "Pricing". CTA button: "Start for free →" (purple gradient, gold border, Cinzel font).

---

### Section 2 — Hero
Full-height dark section with radial purple glow.

- Eyebrow pill: "AI-powered · Ages 5–12 · No sign-up needed"
- Headline (large, Cinzel Decorative, gold gradient):
  > Every child deserves
  > *their own* story.
  (italic word in Spectral or Caveat-style script)
- Subhead (Spectral italic, muted):
  > Pick a hero. Choose a world. Add a magic touch. In 60 seconds, Story Magic writes and illustrates a personalised storybook — just for your child.
- CTA: "✦ Create your story free →" (primary purple button)
- Secondary link: "See how it works ↓"

---

### Section 3 — How it works

**Eyebrow:** How it works
**Title:** From imagination to illustrated book *in minutes.*
**Subtitle:** Four simple steps. No sign-in. No fuss. Just pure magic.

**4 step cards** (grid, same style as VineLabel `.step` cards — dark bg, subtle border, number badge in purple, hover lift):

| # | Heading | Body |
|---|---|---|
| 1 | Pick your hero | Choose from 22 characters, worlds, and quests — or dream up something completely your own. |
| 2 | Add your magic touch | A favourite colour, a pet, a funny detail — anything that makes the story feel personal. |
| 3 | Watch the magic happen | Claude writes your story and DALL-E 3 paints six watercolour illustrations. Takes about 60 seconds. |
| 4 | Read, edit & download | Flip through your magic book, repaint any page you like, then save it as a beautiful PDF. |

---

### Section 4 — Pricing

**Eyebrow:** Simple pricing
**Title:** Start free. *Upgrade when the stories pile up.*
**Subtitle:** Your first story is free, forever. No credit card. Upgrade any time — cancel any time.

**Monthly / Yearly toggle** (same pill toggle as VineLabel — yearly is default, shows "2 months free" in script font)

**3 pricing cards** (same structure as VineLabel `.price-card`):

| | Story Seed | Story Teller ⭐ | Family Library |
|---|---|---|---|
| **Tagline** | Try the magic — no card needed. | For families who love a bedtime story. | Three kids, unlimited adventures. |
| **Price** | A$0 | A$9/mo · A$89/yr | A$19/mo · A$189/yr |
| **CTA** | Start free → | Start free trial → | Choose Family → |
| ✓ | 1 story forever | Unlimited stories | Unlimited stories |
| ✓ | All 22 heroes & worlds | All 22 heroes & worlds | All 22 heroes & worlds |
| ✓ | PDF download | PDF download | PDF download |
| ✓ | Story library | Story library | Story library |
| – | Page editing & repaint | ✓ Page editing & repaint | ✓ Page editing & repaint |
| – | Priority AI (faster) | – | ✓ Priority AI (faster) |
| – | – | 1 child profile | 3 child profiles |

Story Teller is the **featured** card (gold border, elevated, "Most popular" badge in purple).

---

### Section 5 — Closing CTA strip

Dark purple gradient band with gold border (same as VineLabel `.cta-inner`):

- Eyebrow: "Ready when you are"
- Title: The story is waiting. *Your child is the hero.*
- Body: No sign-up. No credit card. One click and the magic begins.
- Buttons: "✦ Create your story free →" (primary) · "See how it works ↓" (ghost)

---

### Section 6 — Footer

Logo left. Right: "Made with Story Magic · © 2026 VisualizePro"

---

### Reference file

The VineLabel landing page is at `../wine_dpp/landing.html`. Use it as the **structural and CSS template** — copy its section layout, card styles, pricing card markup, billing toggle JS, and responsive breakpoints. Replace all wine/compliance colours and copy with the Story Magic purple/gold palette and children's book content above.

Key VineLabel classes to reuse/adapt:
- `.lp`, `.lp-section`, `.lp-band` — page structure
- `.sec-head`, `.sec-eyebrow`, `.sec-title`, `.sec-sub` — section headers
- `.steps`, `.step`, `.step-num` — how it works grid
- `.pricing`, `.price-card`, `.price-card.featured`, `.price-badge` — pricing cards
- `.bill-wrap`, `.bill-toggle`, `.bill-opt` — monthly/yearly toggle
- `.cta-strip`, `.cta-inner` — closing CTA band
- All responsive `@media` breakpoints

---

## File structure
```
storybook_app/
├── storybook_app.py        # Streamlit app — ~1160 lines
├── landing.html            # TO BUILD — marketing landing page
├── requirements.txt
├── stories/                # saved story folders (story.json + page_N.jpg)
├── PRD.md
├── CHANGELOG.md
└── DESIGN_HANDOVER.md      # this file

../wine_dpp/landing.html    # VineLabel landing — use as structural reference
```

API keys are in `C:\Users\madel\.env` (ANTHROPIC_API_KEY + OPENAI_API_KEY).
