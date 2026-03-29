# Demo Page Upgrade Spec — "Legendary Mode"

## Real Services & Pricing (from main page — use these EXACTLY)
- Modern Website: From $1,500
- Full Brand Build: From $4,000  
- Shopify Store: From $3,000
- Email Marketing: From $750
- AI Business Setup: $1,500
- Google Domination: $500

## 5 New Sections to Add (per demo page)

### 1. Before/After Transformation
- Position: AFTER the Gallery section
- Show a visual before/after of a crappy generic website vs a polished KMD-style result
- Use a CSS slider (drag handle to reveal) — NO external deps, pure CSS + minimal JS
- "Before" side: gray, bland, generic template look (describe with text overlay + muted styling)
- "After" side: the beautiful demo style they're already looking at
- Keep it lightweight — use styled divs with text, NOT actual images
- Each industry should have industry-relevant placeholder business name

### 2. Multiple Testimonials (3 per page)
- Position: REPLACE the existing single testimonial section
- 3 fake but convincing testimonials per demo, industry-specific
- Include: name, business name, town (use real Kootenay towns: Trail, Nelson, Rossland, Castlegar, Creston, Fernie, Invermere, Revelstoke, Kimberley, Golden, Kaslo, New Denver, Salmo, Fruitvale, Nakusp)
- Include star ratings (5 stars)
- Include a small "(Sample reviews — your real reviews go here)" note
- Make them FOMO-inducing: mention specific results like "phones started ringing", "bookings doubled", "found us on Google"
- Style with the demo's existing design language

### 3. Pain-Agitate-Solve Copy
- Position: ADD as intro text to the existing SERVICES section (don't replace, enhance)
- 2-3 sentences of gut-punch industry-specific copy BEFORE the service cards
- Pattern: "Your competitor down the road is getting the calls. They're not better — they just show up online. Let's fix that."
- Adapt the pain points to each industry
- Keep it short, punchy, emotionally resonant

### 4. How It Works (3-Step Process)
- Position: AFTER Services section, BEFORE Gallery
- Simple 3-step layout: numbered circles/badges connected by a line or arrows
- Step 1: "We Talk" / "Free Consultation" — you tell us what you need
- Step 2: "We Build" — we design and develop your site in ~2 weeks  
- Step 3: "You Grow" — launch, get found, start getting calls
- Adapt the language slightly per industry but keep the core 3 steps
- Clean, visual, reduces anxiety about "what happens next"

### 5. FAQ Section
- Position: AFTER Testimonials, BEFORE Contact
- 4-5 questions per demo, accordion-style (click to expand)
- Pure CSS/React accordion — NO external deps
- Universal questions (adapt wording per industry):
  - "How long does a website take?" → ~2-3 weeks
  - "What if I already have a website?" → We rebuild or redesign  
  - "Do I need to provide content?" → We help with that
  - "What does it cost?" → Reference the real pricing, link to consultation
  - "Can I update it myself?" → Yes, we build on platforms you can manage
- Add 1-2 industry-specific questions per demo
- Style with the demo's existing design language

### 6. Optimize Sticky Bar
- Already exists on all pages — just verify it:
  - Has a clear CTA ("Get Your Free Mockup" or "Get a Free Quote")
  - Doesn't overlap content badly
  - Has the phone number visible
  - Smooth entrance animation (slide up on scroll)

## Address & Phone Rules
- ALL street addresses MUST use "123 Sample St/Ave/Dr" — NEVER use real street names (Baker, Ward, Columbia, etc.)
- ALL phone numbers MUST use the 555 range: (250) 555-0XXX
- Email addresses should use the fake business domain (e.g., info@fakebusiness.ca)
- Use real Kootenay town names (Trail, Nelson, Castlegar, etc.) — that's fine, just not real streets

## Design Rules
- Each new section MUST match the existing demo's design language (colors, fonts, spacing, dividers)
- Use the demo's existing Reveal/animation components
- Use the demo's existing divider components between sections
- NO new npm dependencies — everything CSS + React state
- Keep industry voice consistent with existing copy
- Maintain accessibility (reduced-motion support via existing prefersReduced patterns)

## Section Order (final)
1. NAV
2. HERO
3. TRUST BAR
4. SERVICES (with new PAS intro copy)
5. HOW IT WORKS (NEW)
6. GALLERY
7. BEFORE/AFTER (NEW)
8. TESTIMONIALS (UPGRADED — 3 reviews)
9. FAQ (NEW)
10. ABOUT
11. CONTACT
12. FOOTER
13. STICKY BAR
