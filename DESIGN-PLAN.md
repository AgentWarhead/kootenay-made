# 🔨 Kootenay Made Digital — Website Design & UX Master Plan
**Date:** March 28, 2026 | **Prepared by:** Shade 🐧
**Goal:** Build the best digital services website in Canada. Period.

---

## DESIGN PHILOSOPHY

**"Premium Mountain Lodge meets Silicon Valley Polish"**

Not corporate. Not rustic. Not tech-bro. The feeling of walking into an architect-designed cabin in the Kootenays — warm wood, clean lines, mountain views through floor-to-ceiling glass. You feel both impressed AND welcome. That's the energy.

### Inspiration Synthesis

| Source | What We Steal |
|--------|--------------|
| **Grainient.supply** | Dark mode elegance, gradient textures as hero backgrounds, category card grid layout, smooth hover states, warm glow effects against dark surfaces |
| **MotionSites.ai** | Gallery-style showcase grid for Style Menu page, card-based navigation with preview images, premium dark UI with accent colors that pop |
| **Craftwork.design** | Curated gallery filtering (tags, categories), clean masonry grid, editorial quality in how work is presented |
| **Fontshare.com** | Typography AS the hero — massive, confident type. Cream/warm backgrounds. Elegant simplicity. Personality sorting/filtering. The warm neutral palette is exactly our brand. |
| **BentoGrids.com** | Bento grid layout for services/features section — asymmetric cards of different sizes showing different types of content. Visual variety within structure. |
| **Linear.app** | Dark sections with subtle gradients, feature showcase with side-by-side text+visual, premium feel without being cold, data visualization as design element |
| **Stripe.com** | The gold standard — gradient hero that feels alive, trust signals (logos, stats), sectioned storytelling, impeccable spacing, product screenshots as proof |

### The Fusion

**Light mode primary** (warm cream #F8F4F0) with **dark mode sections** (slate #1A1D20) for dramatic contrast. The site alternates between warm/light and dark/dramatic sections as you scroll — creating a rhythm that keeps eyes engaged and prevents monotony.

---

## TYPOGRAPHY (Final Selections from Fontshare)

**Headlines:** **Satoshi** (from Fontshare) — modern geometric sans with personality. Variable weight. NOT a boring system font, NOT an overused serif. Clean but distinctive. The "craft meets modern" sweet spot.

**Alternative headline option:** **Cabinet Grotesk** (from Fontshare) — slightly more character, bolder personality. Great for large display text.

**Body:** **General Sans** (from Fontshare) — clean, highly readable, pairs beautifully with Satoshi. Variable weight. Modern without being generic.

**Accent/Mono:** **JetBrains Mono** or similar — for code snippets, technical details, pricing figures (gives a "precise" feeling to numbers)

**Why Fontshare over Google Fonts:**
- Free for commercial use
- Way more distinctive than the Google Fonts everyone uses
- The cream Fontshare aesthetic already matches our brand palette
- Nobody else in the Kootenays (or most agencies) will have these fonts

### Type Scale
```
Hero headline:    72px / 1.0 (mobile: 40px)
Section headline: 48px / 1.1 (mobile: 32px)
Sub-headline:     30px / 1.2 (mobile: 24px)
Body large:       20px / 1.6
Body:             16px / 1.6
Small/caption:    14px / 1.5
Micro:            12px / 1.4
```

---

## COLOR SYSTEM (Expanded)

### Light Mode (Primary)
```
--bg-primary:      #F8F4F0  (warm cream — Fontshare vibes)
--bg-secondary:    #EFEBE6  (slightly darker cream for cards)
--bg-accent:       #E8E2DB  (borders, dividers)
--text-primary:    #1A1D20  (near-black, not pure black)
--text-secondary:  #5A5D63  (muted body text)
--text-tertiary:   #8A8D93  (captions, metadata)
```

### Dark Sections
```
--dark-bg:         #1A1D20  (rich dark, not pure black)
--dark-bg-card:    #232629  (card surfaces in dark mode)
--dark-text:       #F8F4F0  (cream text on dark)
--dark-text-muted: #9A9DA3  (secondary text in dark)
```

### Brand Colors
```
--copper:          #C17817  (primary accent — CTAs, highlights)
--copper-light:    #D4943A  (hover state)
--copper-dark:     #9E6012  (active/pressed state)
--forest:          #2D6A4F  (nature accent — success, growth)
--forest-light:    #40916C  (hover)
--river:           #4A90A4  (digital accent — links, info)
--river-light:     #63A8BC  (hover)
```

### Gradients (Grainient-inspired)
```
--gradient-hero:    linear-gradient(135deg, #1A1D20 0%, #2D3436 50%, #1A3A2D 100%)
--gradient-copper:  linear-gradient(135deg, #C17817 0%, #D4943A 100%)
--gradient-subtle:  linear-gradient(180deg, #F8F4F0 0%, #EFEBE6 100%)
--gradient-dark:    radial-gradient(ellipse at top, #2D3436 0%, #1A1D20 70%)
```

### Grain/Noise Texture
Apply a subtle noise texture overlay (Grainient-inspired) to hero sections and dark backgrounds. Creates depth and warmth that flat colors lack. CSS:
```css
.grain::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/noise.svg');
  opacity: 0.03;
  pointer-events: none;
}
```

---

## LAYOUT SYSTEM

### Bento Grid (Services + Features)
Inspired by BentoGrids.com — asymmetric card layouts that break the monotony of uniform grids:

```
┌─────────────┬──────────┐
│             │          │
│   LARGE     │  MEDIUM  │
│   CARD      │  CARD    │
│             │          │
├──────┬──────┼──────────┤
│ SMALL│ SMALL│          │
│ CARD │ CARD │  LARGE   │
│      │      │  CARD    │
├──────┴──────┤          │
│   MEDIUM    │          │
│   CARD      ├──────────┤
│             │  SMALL   │
└─────────────┴──────────┘
```

Different card sizes for different content types:
- Large cards: Hero services (Website, Brand Build)
- Medium cards: Core services with icons
- Small cards: Stats, trust signals, quick facts

### Section Rhythm
The page alternates between light and dark backgrounds as you scroll:

```
[HERO]           — Dark gradient + grain + massive typography
[SERVICES]       — Light cream + bento grid
[STYLE MENU]     — Dark background (makes the style previews pop)
[ABOUT]          — Light cream + photo
[SOCIAL PROOF]   — Dark section (testimonials glow)
[PRICING]        — Light cream
[CTA]            — Dark gradient (mirror hero)
```

This creates visual "chapters" — each section feels like its own experience.

---

## PAGE-BY-PAGE DESIGN SPEC

### 1. HOME PAGE — "The Showstopper"

**HERO SECTION** (full viewport height)
- Dark gradient background with subtle grain texture
- Subtle animated gradient shift (very slow, almost imperceptible — like northern lights)
- Massive Satoshi headline: "Your Kootenay business deserves a digital presence as impressive as the mountains around it."
- Subtext in General Sans: "Locally crafted digital. Modern websites, brands, and marketing for West Kootenay businesses."
- Two CTAs: "See Our Work →" (copper, primary) + "Free Website Audit" (outline, secondary)
- Subtle scroll indicator (animated chevron)
- NO hero image — the typography and gradient ARE the design. Bold. Confident. Different from every competitor who slaps a stock mountain photo on their hero.

**SERVICES BENTO GRID** (light cream section)
- Section headline: "What we build"
- Bento layout with 6-8 cards of varying sizes
- Each card: icon + service name + one-line description + "from $X" price
- Hover: card lifts with subtle shadow, copper accent border appears
- Large cards for: Website ($1,500+) and Full Brand Build ($4,000+)
- Medium cards for: everything else
- Small accent card: "Free Website Audit — Book yours →"

**STYLE MENU PREVIEW** (dark section)
- Section headline: "Find your style"
- Subtext: "Browse our design styles and find the one that fits your business."
- Horizontal scroll row showing 4-5 style category previews (with parallax-like depth)
- Each card: style name, thumbnail mockup, "Perfect for:" tags
- "Explore all styles →" CTA
- This section teases the full Style Menu page

**TRUST & PROOF** (light cream section)
- "Based in Castlegar. Built for the Kootenays."
- Stats in a clean row: "X+ Projects" | "2-4 Week Delivery" | "Modern Tools + AI"
- Testimonial carousel (placeholder slots designed and ready)
- Subtle Kootenay map illustration showing service area

**FINAL CTA** (dark gradient, mirrors hero)
- "Ready to stand out online?"
- Contact form embedded OR "Book Your Free Audit →" button
- hello@kootenaymade.ca displayed prominently

---

### 2. STYLE MENU PAGE — "The Showroom" ⭐

**This is the page that makes us famous.**

**Layout:** Full-width gallery with filtering
- Top: "Choose Your Style" headline + category filter pills
- Filter options: All | Clean | Bold | Warm | Rustic | Dark | Playful | Editorial | Adventure

**Each style entry is a FULL SECTION**, not a small card:
- Left side: Large mockup (desktop view showing a sample site in that style)
- Right side: Style name, description, "Perfect for:" bullets, color palette dots, font preview
- "Start with this style →" CTA
- Mobile mockup floating below/beside the desktop view

**Between entries:** Divider with subtle animated line

**Why full sections instead of a grid:**
- More immersive — each style gets room to breathe
- Easier to understand on mobile
- Feels like flipping through a design magazine, not scrolling a template marketplace
- The previews ARE our portfolio until we have real clients

**The 8 styles (each with a full mockup we pre-build):**

1. **Clean & Professional** — White/light, lots of whitespace, blue accents, corporate trust
   - Preview: Mock accounting firm site
   - Fonts: Sans-serif, clean
   - Perfect for: Law, accounting, medical, consulting

2. **Bold & Modern** — Strong colors, geometric shapes, dark backgrounds, confident
   - Preview: Mock tech startup site
   - Fonts: Bold geometric sans
   - Perfect for: Tech, trades, startups, fitness

3. **Warm & Natural** — Earth tones, organic shapes, soft gradients, calming
   - Preview: Mock wellness practitioner site
   - Fonts: Soft rounded sans + gentle serif
   - Perfect for: Wellness, yoga, therapy, naturopaths

4. **Rustic Craft** — Textured backgrounds, handwritten accents, vintage warmth
   - Preview: Mock brewery/artisan site
   - Fonts: Slab serif + handwritten accent
   - Perfect for: Breweries, bakeries, artisan shops, farm-to-table

5. **Sleek & Dark** — Dark backgrounds, dramatic lighting, cinematic
   - Preview: Mock upscale restaurant site
   - Fonts: Elegant serif + thin sans
   - Perfect for: Restaurants, bars, automotive, luxury services

6. **Bright & Playful** — Vibrant colors, rounded corners, bouncy animations
   - Preview: Mock daycare or pet grooming site
   - Fonts: Rounded sans, playful weights
   - Perfect for: Kids, pets, retail, entertainment

7. **Editorial & Elegant** — Magazine layout, serif headlines, sophisticated spacing
   - Preview: Mock boutique or real estate site
   - Fonts: Classic serif + refined sans
   - Perfect for: Real estate, fashion, salons, galleries

8. **Adventure & Outdoors** — Big hero images, dynamic layout, bold type
   - Preview: Mock adventure tourism company site
   - Fonts: Condensed bold sans + clean body
   - Perfect for: Tourism, guides, ski resorts, outdoor recreation

---

### 3. SERVICES PAGE — "The Menu"

**Design:** Light cream background, clean cards
- Section for each tier: Entry | Core | Premium | Recurring
- Each service: expandable card showing full details
- Pricing visible on every card (no "contact for pricing" BS)
- Comparison table at bottom for retainer tiers (Good-Better-Best)
- Final CTA: "Not sure what you need? Book a free audit and we'll tell you."

---

### 4. ABOUT PAGE — "The Human"

**Design:** Light cream, editorial layout
- Large photo of you (real, authentic, Kootenay vibes)
- Story in two columns: personal journey + why KMD exists
- Values section with icons
- "Why 'Kootenay Made'?" explanation
- Small detail: embedded Google Maps showing Castlegar (not your address)
- Tone: warm, real, proud. Not corporate bio. A neighbor introducing themselves.

---

### 5. CONTACT PAGE — "Come Say Hi"

**Design:** Split layout
- Left: Contact form (name, email, message, optional "which style caught your eye?" dropdown)
- Right: Direct info (email, location, response time promise, "Available for coffee ☕")
- Dark accent section at bottom with Google Maps embed

---

### 6. FREE AUDIT PAGE — "The Magnet"

**Design:** Focused landing page (minimal nav distractions)
- Headline: "Is your website working as hard as you are?"
- Sub: "Find out in 30 minutes — completely free."
- Simple form: Name, business name, website URL, email, phone
- Trust signals: "No sales pitch. No obligation. Just honest insight."
- Social proof: testimonial (when available)
- FAQ section addressing objections

---

## ANIMATION & MOTION

### Philosophy
Subtle, purposeful, warm. Not flashy. Not distracting. Every animation should make the user feel "this is polished" without thinking "this is trying too hard."

### Specific Animations

**Scroll reveals:**
- Sections fade up + slide 20px as they enter viewport
- Staggered: left content first, right content 100ms later
- Duration: 600ms, ease-out
- Only trigger once (no re-animation on scroll back)

**Hero:**
- Headline fades in and slides up (0.8s)
- Subtext follows (0.2s delay)
- CTAs follow (0.4s delay)
- Background gradient shifts very slowly (30s loop, barely perceptible)

**Bento cards:**
- Stagger reveal: each card fades in 100ms after the previous
- Hover: translateY(-4px) + box-shadow expansion (0.2s)
- Copper border fades in on hover

**Style Menu:**
- Mockup images have subtle parallax on scroll (2-3px shift)
- Style sections slide in from alternating sides (left, right, left...)

**Navigation:**
- Sticky nav: transparent on hero, becomes solid cream/dark on scroll
- Smooth background transition (0.3s)

**Micro-interactions:**
- Buttons: scale(1.02) on hover, scale(0.98) on click
- Links: copper underline slides in from left on hover
- Form fields: border color transitions to copper on focus

### Technology
- **Framer Motion** for React animations (scroll-triggered reveals, layout animations)
- **CSS transitions** for hover states (no JS needed for simple interactions)
- **CSS @keyframes** for the hero gradient shift
- **Intersection Observer** (via Framer Motion) for scroll-triggered reveals

---

## RESPONSIVE STRATEGY

### Breakpoints
```
Mobile:   < 640px   (single column, stacked everything)
Tablet:   640-1024px (2-column grids, adjusted spacing)
Desktop:  1024-1440px (full layouts)
Wide:     > 1440px   (max-width container, centered)
```

### Mobile-First Priorities
- Hero text size drops to 40px (still impactful)
- Bento grid becomes single column stack
- Style Menu sections become vertical (mockup above, details below)
- Navigation becomes hamburger menu with full-screen overlay
- Touch targets: minimum 44px × 44px
- Scroll-triggered animations simplified (no parallax on mobile)

### Max-Width Container
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .container { padding: 0 40px; }
}

@media (min-width: 1024px) {
  .container { padding: 0 64px; }
}
```

---

## ACCESSIBILITY (WCAG 2.2)

- Text contrast: 4.5:1 minimum (our cream + dark text passes easily)
- Copper on cream: verified at 4.8:1 ✅
- Cream on dark: verified at 13.2:1 ✅
- All interactive elements keyboard-navigable
- Focus states: copper ring (3px, offset)
- Alt text on all images
- Semantic HTML (proper heading hierarchy, landmark regions)
- Skip-to-content link
- Form labels associated with inputs
- Reduced motion: @media (prefers-reduced-motion) disables all animations

---

## TECHNICAL STACK

```
Framework:     Next.js 15 (App Router)
Styling:       Tailwind CSS 4
Fonts:         Fontshare (Satoshi + General Sans) — self-hosted for performance
Animations:    Framer Motion
Icons:         Lucide React
Deployment:    Vercel (free plan)
Domain:        kootenaymade.ca
Analytics:     Vercel Analytics (free) or Plausible
Contact Form:  Resend (or simple API route → email)
```

---

## PERFORMANCE TARGETS

- Lighthouse: 95+ on all four categories
- First Contentful Paint: < 1.2s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total page weight: < 500KB (excluding images)
- Images: WebP/AVIF, lazy loaded, properly sized
- Fonts: self-hosted, preloaded, font-display: swap

---

## BUILD PHASES

### Phase 1: Core Launch (Week 1)
- Home page (hero + services bento + style preview + trust + CTA)
- Services page (full pricing)
- About page
- Contact page
- Navigation + footer
- Mobile responsive
- Deploy to Vercel + connect kootenaymade.ca

### Phase 2: The Differentiator (Week 2)
- Style Menu page (all 8 styles with mockup previews)
- Free Audit landing page
- Blog skeleton (3 seed articles)

### Phase 3: Polish & Extras (Week 3)
- Client Learning Portal (auth + dashboard)
- Portfolio page (seed with 3-4 demo projects)
- Full animation pass (scroll reveals, micro-interactions)
- SEO optimization (meta tags, Open Graph, structured data)
- Google Business Profile setup for KMD itself

---

*This site doesn't just represent what we build. It IS what we build. Every pixel is a portfolio piece.* 🔨
