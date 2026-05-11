# KnowledgeGraph — AI Agent UX Spec
**Version:** 1.0 | **Source:** Visily designs (Homepage + Article page)
**Rule:** This file + tokens.css are your ONLY design references. Never invent values.

---

## HOW TO USE THIS FILE

Paste the "AGENT PROMPT HEADER" section at the top of every UI task you give your AI.
The component specs below are the exact rules the agent must follow for each component.

---

## AGENT PROMPT HEADER
*(copy-paste this block at the start of every AI UI task)*

```
You are building UI for the KnowledgeGraph platform — a technical publishing/blog app.
Import and follow tokens.css for all values. Rules:

1. COLORS: Use only token values. Never hardcode a hex that isn't in tokens.css.
2. TYPOGRAPHY: Use only the defined font sizes and weights. No 15px, 17px, 19px etc.
3. SPACING: Multiples of 4px only. Use the --space-* tokens.
4. RADIUS: Only 4px / 8px / 12px / 16px / 999px.
5. COMPONENTS: Match the spec in agent-spec.md exactly. Ask before inventing new patterns.
6. NEVER add: drop shadows on cards, gradients on surfaces, colors not in tokens.

Now build: [YOUR TASK HERE]
```

---

## COMPONENT SPECS

### 1. Navigation Bar
```
Height:         var(--nav-height)  →  56px
Background:     var(--color-bg-nav)  →  #1A1A1A
Padding:        0 var(--space-6)   →  0 24px

Logo:
  - Icon: 22×22px square, bg #4F8EF7, border-radius 6px
  - Text: "KnowledgeGraph" | Inter 14px/600 | color white
  - Gap between icon and text: 8px

Nav Links:
  - Font: Inter 13px/400
  - Default color: rgba(255,255,255,0.65)
  - Active color: white
  - Gap between links: 20px
  - No underline, no border

Right side:
  - "Sign in": same style as nav links
  - "Get started" CTA button:
      bg: #4F8EF7
      text: white 12px/600
      padding: 7px 14px
      border-radius: 7px
      no border
```

---

### 2. Filter Pills (Category Tabs)
```
Shape:          border-radius 999px
Padding:        5px 14px
Font:           Inter 13px/400
Gap:            6px between pills

Default state:
  background:   white
  border:       1px solid var(--color-border)  →  #E5E7EB
  color:        var(--color-text-primary)  →  #111827

Active state:
  background:   var(--color-bg-nav)  →  #1A1A1A
  border:       1px solid #1A1A1A
  color:        white

Hover state:
  background:   var(--color-bg-hover)  →  #F3F4F6
  border:       1px solid #D1D5DB
```

---

### 3. Category Badge
```
Font:           Inter 10px / weight 600 / ALL CAPS / letter-spacing 0.10em
Padding:        3px 8px
Border-radius:  var(--radius-sm)  →  4px
Border:         0.5px solid (category border color)
Display:        inline-block

Color mapping (EXACT — never improvise):
  RESEARCH:    bg #EBF3FF | text #1A56A0  | border #BFDBFE
  AI & ML:     bg #EDE9FE | text #5B21B6  | border #C4B5FD
  WEB:         bg #ECFDF5 | text #065F46  | border #A7F3D0
  SYSTEMS:     bg #FEF3C7 | text #92400E  | border #FCD34D
  DATA:        bg #FEE2E2 | text #991B1B  | border #FCA5A5
  DESIGN:      bg #FDF2F8 | text #9D174D  | border #F9A8D4
  ENGINEERING: bg #F0FDF4 | text #166534  | border #86EFAC
```

---

### 4. Featured Article Card (Hero — left column top)
```
Container:
  background:   white
  border:       1px solid var(--color-border)
  border-radius:var(--radius-xl)  →  16px
  overflow:     hidden
  NO box-shadow

Image area:
  width:        100%
  height:       180–240px (responsive)
  object-fit:   cover
  border-radius:16px 16px 0 0

Body:
  padding:      var(--space-4) var(--space-5)  →  16px 20px

Content order inside body:
  1. Category badge (margin-bottom 8px)
  2. Title: Inter 20–22px / 700 / #111827 / line-height 1.3 / max 3 lines
  3. Excerpt: Inter 13px / 400 / #6B7280 / line-height 1.5 / max 3 lines
  4. Author row: [24px avatar circle] + [Inter 12px / 400 / #6B7280 "Name · Date · N min read"]
```

---

### 5. List Article Card (Feed Row)
```
Layout:         flex row | justify-content space-between | align-items flex-start
Gap:            var(--space-4)  →  14–16px
Border-bottom:  1px solid var(--color-border)
Padding:        var(--space-4) 0  →  16px top/bottom

Left side (text):
  1. Category badge (margin-bottom 6px)
  2. Title: Inter 16px / 700 / #111827 / line-height 1.35 / max 2 lines
  3. Excerpt: Inter 13px / 400 / #6B7280 / line-height 1.5 / max 2 lines
  4. Author row: [20px avatar] + [12px / 400 / #6B7280]

Right side (thumbnail):
  width:        var(--thumb-w)   →  72px
  height:       var(--thumb-h)   →  56px
  border-radius:var(--radius-md) →  8px
  flex-shrink:  0
  object-fit:   cover
```

---

### 6. Sidebar — Trending This Week
```
Section title:
  font:         Inter 10px / 700 / ALL CAPS
  color:        var(--color-text-muted)  →  #6B7280
  letter-spacing: 0.12em
  margin-bottom: 8px

Each trending row:
  layout:       flex row | align-items flex-start
  padding:      10px 0
  border-bottom:1px solid var(--color-border)
  Last row:     no border-bottom

  Number:
    font:       Inter 20px / 700
    color:      var(--color-num-muted)  →  #D1D5DB
    min-width:  28px

  Title:
    font:       Inter 14px / 600 / #111827
    line-height:1.35
    max 2 lines

  Meta (author · read time):
    font:       Inter 12px / 400 / #6B7280
    margin-top: 2px
```

---

### 7. Sidebar — Browse Topics (Tag Cloud)
```
Section title: same as Trending section title above

Tag:
  font:         Inter 12px / 400 / #111827
  background:   white
  border:       1px solid var(--color-border)  →  #E5E7EB
  border-radius:var(--radius-md)  →  6px (not pill — box shape)
  padding:      5px 12px
  gap:          6px (wrap)
  cursor:       pointer

Hover:
  background:   var(--color-bg-hover)  →  #F3F4F6
```

---

### 8. Newsletter Widget
```
Wrapper:
  background:   var(--color-bg-muted)  →  #F9FAFB
  border:       1px solid var(--color-border)
  border-radius:var(--radius-lg)  →  12px
  padding:      var(--space-4)  →  16px

Header row:
  layout:       flex | align-items center | gap 8px | margin-bottom 8px
  Icon box:     28×28px | bg #EBF3FF | border-radius 6px | accent-colored icon inside
  Title:        Inter 14px / 600 / #111827

Description:
  font:         Inter 12px / 400 / #6B7280
  line-height:  1.5
  margin-bottom:10px

Email input:
  width:        100%
  padding:      8px 12px
  font:         Inter 13px / 400
  border:       1px solid var(--color-border)
  border-radius:7px
  margin-bottom:8px
  placeholder color: #9CA3AF

Subscribe button:
  width:        100%
  background:   var(--color-bg-nav)  →  #1A1A1A
  color:        white
  font:         Inter 13px / 600
  padding:      9px
  border:       none
  border-radius:7px
```

---

### 9. Table of Contents (Article Page Sidebar)
```
Position:       sticky | top 80px | right sidebar

Section title: same pattern as other sidebars (10px/700/ALL CAPS/#6B7280)

TOC item default:
  font:         Inter 13px / 400 / #6B7280
  padding:      5px 10px
  border-radius:4px
  border-left:  2px solid transparent  (reserve space)
  cursor:       pointer

TOC item active:
  font:         Inter 13px / 400 / #1A56A0
  background:   #EBF3FF
  border-left:  2px solid #4F8EF7
  padding-left: 8px  (compensate for border)

TOC item hover:
  background:   var(--color-bg-hover)  →  #F3F4F6
  color:        #111827
```

---

### 10. Code Block
```
Background:     var(--color-bg-code)  →  #F8F8F8
Border:         1px solid var(--color-border)  →  #E5E7EB
Border-radius:  var(--radius-md)  →  8px
Padding:        14px 16px
Font:           'JetBrains Mono' 12px / 400
Color:          #374151
Line-height:    1.7
Overflow-x:     auto
White-space:    pre
```

---

### 11. Article Header (Breadcrumb + Meta)
```
Breadcrumb:
  font:         Inter 12px / 400
  separator:    " › " | color #D1D5DB
  active item:  Inter 12px / 500 / #111827
  other items:  #6B7280
  margin-bottom:12px

Article title:
  font:         Inter 30–36px / 700 / #111827
  line-height:  1.2
  margin-bottom:8px

Byline:
  font:         Inter 13px / 400 / #6B7280
  format:       "By [Author Name] · [N] min read"
  margin-bottom:32px (before body begins)
```

---

### 12. Section Heading Hierarchy (Article Body)
```
H2 (major section):
  font:         Inter 22px / 700 / #111827
  margin-top:   var(--space-8)  →  32px
  margin-bottom:var(--space-4)  →  16px

H3 (sub-section):
  font:         Inter 18px / 600 / #111827
  margin-top:   var(--space-6)  →  24px
  margin-bottom:var(--space-3)  →  12px

Body paragraph:
  font:         Inter 16px / 400 / #374151
  line-height:  1.75
  margin-bottom:var(--space-4)  →  16px
  max-width:    var(--content-max-width)  →  640px
```

---

## LAYOUT RULES

### Homepage Layout
```
Max-width:        1200px centered
Padding:          0 24px
Hero section:     centered | padding-top 80px | padding-bottom 48px
Filter pills:     left-aligned | margin-bottom 32px

Main grid:
  Left (articles): ~65% width
  Right (sidebar): ~30% width
  Gap:             40px
  Breakpoint:      stack to single column below 768px
```

### Article Page Layout
```
Max-width:        780px page | 640px content
Padding:          48px 24px
TOC sidebar:      220px | sticky right | hidden below 1024px

Breadcrumb nav (top):
  Left: breadcrumb links
  Right: Share + Bookmark buttons (same line)
```

---

## WHAT THE AI MUST NEVER DO
```
❌ Add box-shadow or drop-shadow to cards
❌ Use any hex color not in tokens.css
❌ Use font-size not in the typography scale (no 15px, 17px, 19px...)
❌ Use border-radius not in the scale (no 6px, 10px, 20px...)
❌ Use spacing values not in --space-* tokens
❌ Add gradients to any surface (only to hero images)
❌ Invent new component patterns without specification
❌ Use font-weight above 700
❌ Change category badge colors (they are fixed per category)
```

## WHAT THE AI CAN DECIDE
```
✅ Copy and text content for components
✅ Which existing component to use for a new screen
✅ Layout order of spec-compliant components
✅ Image content for thumbnails/hero images
✅ Responsive behavior within the grid system
```
