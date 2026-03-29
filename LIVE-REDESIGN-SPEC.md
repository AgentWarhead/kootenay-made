# Live Redesign Spec — All 15 Remaining Demos

## Reference Implementation
See `/home/ubuntu/projects/kootenay-made/LIVE-REDESIGN-REFERENCE.tsx` for the exact component code from home-garden.

## Architecture (MUST follow exactly)

### Component: `LiveRedesign()`
- Uses `useState(false)` for `transformed` — NO auto-trigger, user taps button
- Uses `useRef`, `useReducedMotion` from framer-motion
- `dur` and `stagger` variables for animation timing
- `AnimatePresence mode="wait"` wraps the two states

### Required imports (add to existing if missing)
- `useEffect` from react (already there on most)
- `useInView` from framer-motion (add if missing)
- `useCallback` may already be there — keep it

### Structure
```
<div ref={ref}>
  {/* Bold label — decorative lines + "Before" / "✨ After" */}
  <div className="flex items-center justify-center gap-3 mb-5">
    {line} {AnimatePresence label} {line}
  </div>

  {/* Fixed-height container — BOTH states same size */}
  <div style={{ height: '480px' }}>
    <AnimatePresence mode="wait">
      {!transformed ? BEFORE : AFTER}
    </AnimatePresence>
  </div>

  {/* Toggle button */}
  <button onClick={toggle}>
    "← See the Before" / "✨ Watch the Transformation"
  </button>
</div>
```

### BEFORE State Rules (SAME pattern for all 15)
- `absolute inset-0 flex flex-col` inside the fixed container
- Background: `#f2f0ed`, border: `1px solid #d8d4cf`, borderRadius `8px`
- **WordPress-style nav bar** at top:
  - Industry-appropriate dark color (NOT the demo's accent — something dated)
  - Georgia/Arial font for business name
  - Underlined nav links on desktop, "☰ Menu" on mobile
- **Hero area**: `flex-1 flex flex-col justify-center text-center`
  - Stock gradient background (muted, opacity 0.12)
  - "★ Welcome to Our Website ★" in Arial
  - Business name in Georgia serif, large
  - Cringey tagline in italics ("Your #1 Choice for X Since YYYY!")
  - Bullet-separated service list
  - Badge spam row (✓ Licensed, ✓ Insured, ✓ Free Estimates — adapt per industry)
  - Floating phone number with 📞 emoji
  - Dead `<span>` button (NOT a link) — "Request a Free Estimate" or similar
  - "Powered by WordPress | Theme: Twenty Twenty-Three"
- **Mobile sizing**: px-5, py-8, text-xl headline, text-xs services, text-sm phone
- Use the SAME company name as the demo (not a different name)

### AFTER State Rules
- `absolute inset-0 flex flex-col` (REMOVED — was causing issues, use `relative w-full overflow-hidden flex flex-col` but wrap in the same fixed container)
- Actually: KEEP `absolute inset-0 w-full overflow-hidden flex flex-col` — this is what makes both cards fill the same container
- Background: demo's LIGHT background color (cream, white, etc)
- Grain texture SVG in backgroundImage
- Border: demo accent color at 30% opacity, borderRadius 16px
- Elevated boxShadow with demo accent color
- **Elegant nav bar**:
  - Demo's heading font for brand name (italic if the demo uses italic)
  - Nav links in demo's body font, uppercase tracking-widest
  - Hamburger on mobile (3 bars in demo accent color)
  - Subtle bottom border
- **Hero area**: `flex-1 flex flex-col justify-center` + `text-center sm:text-left`
  - Decorative SVGs — industry-appropriate (botanical for garden, geometric for tech, etc.)
  - Larger on desktop (240x240), visible opacity (0.15-0.22)
  - Business chip: "Est. YYYY — West Kootenay" in demo accent
  - **The headline**: demo heading font, text-2xl to text-6xl responsive
    - Punchy benefit-driven copy (from BEFORE-AFTER-SPEC.md)
    - Accent word in demo's secondary/warm color with animated SVG underline flourish
  - Subline: demo body font, muted color
  - CTA button: demo accent bg, white text, full-width on mobile, rounded-xl
    - `hover:scale-[1.03] active:scale-[0.97]`
    - Glowing boxShadow
    - Arrow icon SVG inside
    - "No commitment required" text below
  - Trust signals row: 3 items relevant to industry
- **Animated shimmer border**: bottom of card, gradient of demo's two accent colors
- All entrance animations staggered with `initial/animate` on motion elements

### Section Wrapper
Replace the existing before/after section with:
```jsx
{/* ═══════════ 7. THE TRANSFORMATION ═══════════ */}
<section className="..." style={{ backgroundColor: ... }}>
  {decorative corners if demo has them}
  <div className="max-w-5xl mx-auto">
    <Reveal>
      <h2>Watch Your Website Transform</h2>
      <p>From dated to designed — in real time</p>
    </Reveal>
    <LiveRedesign />
  </div>
</section>
```
Style the h2/p with demo's heading font and colors.

### Also replace the existing BeforeAfterSlider function entirely.
Delete it. Replace with LiveRedesign. Update the JSX to render `<LiveRedesign />` instead of `<BeforeAfterSlider />`.

### Also remove `useCallback` from imports if it was only used by BeforeAfterSlider.

## Industry-Specific Content (from BEFORE-AFTER-SPEC.md)

### automotive
- Company: Iron Horse Garage
- Before tagline: "Your #1 Choice for Car Repairs Since 1998!"
- Before services: "Oil Changes • Brake Jobs • Tire Rotations • Inspections • And More!"
- Before badges: ✓ ASE Certified, ✓ All Makes & Models, ✓ Free Estimates
- After headline: "Your Engine Light's On. We'll Tell You Why — Not Sell You What You Don't Need."
- After accent word: "Don't Need" in red
- After CTA: "Book Your Diagnostic →"
- After trust: "ASE Certified • 25+ Years • 4.9★ Google"
- After SVG motif: angular/mechanical lines or gear-like geometry

### trades-industrial
- Company: Kootenay Pro Plumbing
- Before tagline: "Serving the Area for Over 20 Years!"
- Before services: "Plumbing • Heating • Gas Fitting • Drain Cleaning • And More!"
- Before badges: ✓ Licensed, ✓ Bonded, ✓ 24/7 Emergency
- After headline: "Your Pipes Burst at 2AM. We Answer."
- After accent word: "We Answer" in orange
- After CTA: "Emergency Service — Call Now →"
- After trust: "24/7 Response • Licensed & Bonded • 500+ Jobs"
- After SVG motif: industrial/angular lines

### farm-harvest
- Company: Valley Roots Farm
- Before tagline: "Your #1 Choice for Fresh Produce Since 2003!"
- Before services: "Vegetables • Fruit • CSA Boxes • Farm Stand • Seasonal Goods"
- Before badges: ✓ Organic, ✓ Local, ✓ Farm Fresh
- After headline: "Farm-Fresh. Delivered to Your Door."
- After accent word: "Your Door" in warm green
- After CTA: "Shop This Week's Harvest →"
- After trust: "100% Local • Weekly Delivery • 50+ Varieties"
- After SVG motif: organic leaf/vine curves

### adventure-outdoors
- Company: Powder Highway Adventures
- Before tagline: "Your Premier Adventure Destination!"
- Before services: "Hiking • Rafting • Skiing • Camping • Mountain Biking • And More!"
- Before badges: ✓ Certified Guides, ✓ All Skill Levels, ✓ Group Rates
- After headline: "The Kootenays Don't Wait. Neither Should You."
- After accent word: "Neither Should You" in orange
- After CTA: "Book Your Next Adventure →"
- After trust: "Certified Guides • 1000+ Trips • 5★ TripAdvisor"
- After SVG motif: mountain peak/trail lines

### clean-professional
- Company: Ridgeline Financial
- Before tagline: "Trusted. Reliable. Experienced."
- Before services: "Tax Planning • Bookkeeping • Payroll • Business Advisory"
- Before badges: ✓ CPA Certified, ✓ Confidential, ✓ Free Consultation
- After headline: "Your Money Deserves a Plan. Not a Guessing Game."
- After accent word: "Guessing Game" in blue
- After CTA: "Book a Free Consultation →"
- After trust: "CPA Certified • 15+ Years • 200+ Clients"
- After SVG motif: clean geometric lines/angles

### medical-dental
- Company: Kootenay Family Dental
- Before tagline: "Accepting New Patients!"
- Before services: "Cleanings • Fillings • Crowns • Whitening • Emergency"
- Before badges: ✓ Accepting New Patients, ✓ Insurance Welcome, ✓ Family Friendly
- After headline: "Nervous About the Dentist? We Get It. That's Why We're Different."
- After accent word: "We're Different" in teal
- After CTA: "Book Online — No Phone Call Needed →"
- After trust: "Gentle Care • Same-Day Emergency • All Ages"
- After SVG motif: soft curves/waves (calming)

### editorial-elegant
- Company: Pinnacle Real Estate
- Before tagline: "★ TOP REALTOR ★ Your Dream Home Awaits!"
- Before services: "Buying • Selling • Luxury Homes • Investment • Relocation"
- Before badges: ✓ #1 in Sales, ✓ Free Home Evaluation, ✓ MLS Listed
- After headline: "Your Home Has a Story. Let's Make Sure Buyers Hear It."
- After accent word: "Hear It" in gold
- After CTA: "Get Your Property Valuation →"
- After trust: "Top 1% Agent • $50M+ Sold • 15 Years"
- After SVG motif: elegant editorial flourishes

### education-nonprofit
- Company: Kootenay Community Learning Centre
- Before tagline: "Making a Difference Since 2005!"
- Before services: "Tutoring • Adult Ed • Community Programs • Workshops"
- Before badges: ✓ Registered Charity, ✓ Tax Receipts, ✓ Volunteer Run
- After headline: "127 Families Fed Last Month. Yours Could Be Next — To Help."
- After accent word: "To Help" in blue
- After CTA: "Volunteer This Weekend →"
- After trust: "Registered Charity • 2000+ Served • 100% Local"
- After SVG motif: warm community/hand shapes

### sleek-dark
- Company: The Copper Table
- Before tagline: "Fine Dining in the Heart of Nelson!"
- Before services: "Dinner • Cocktails • Private Events • Catering"
- Before badges: ✓ Reservations, ✓ Private Dining, ✓ Local Ingredients
- After headline: "Thursday's Special Sells Out by 7pm. Just Saying."
- After accent word: "Just Saying" in gold
- After CTA: "Reserve Your Table →"
- After trust: "4.8★ Google • Chef's Table • Local Sourced"
- After SVG motif: minimal elegant lines (luxury)

### rustic-craft
- Company: Kootenay Brewing Co.
- Before tagline: "Great Beer, Great Times!"
- Before services: "Craft Beer • Taproom • Growler Fills • Events • Merch"
- Before badges: ✓ Locally Brewed, ✓ Dog Friendly, ✓ Live Music
- After headline: "Brewed 12 Minutes From Where You're Sitting."
- After accent word: "You're Sitting" in amber
- After CTA: "See What's on Tap →"
- After trust: "12 Beers on Tap • Dog Friendly • Open 7 Days"
- After SVG motif: rustic grain/hop curves

### bright-playful
- Company: Sunshine Daycare
- Before tagline: "A Safe and Fun Place for Your Children!"
- Before services: "Infant Care • Toddler Programs • Preschool • After School"
- Before badges: ✓ Licensed, ✓ First Aid Certified, ✓ Subsidy Accepted
- After headline: "You'll Never Wonder If They're Okay. Here's Why."
- After accent word: "Here's Why" in coral
- After CTA: "Book a Tour — See For Yourself →"
- After trust: "Licensed • First Aid Certified • 15:1 Ratio"
- After SVG motif: playful circles/bubbles (use Comic Sans for before!)

### bold-modern
- Company: Volt Electric
- Before tagline: "Innovative. Scalable. Dynamic."
- Before services: "Commercial • Residential • Industrial • EV Chargers • Solar"
- Before badges: ✓ Licensed Master Electrician, ✓ Insured, ✓ Free Quotes
- After headline: "Your Competitor Launched Last Month. What Are You Waiting For?"
- After accent word: "Waiting For" in orange
- After CTA: "Let's Build It →"
- After trust: "Master Electrician • 300+ Projects • Same-Day Quotes"
- After SVG motif: bold angular/circuit-like lines

### warm-natural
- Company: Mountain Flow Wellness
- Before tagline: "Yoga, Massage, and Holistic Healing. Namaste!"
- Before services: "Yoga • Massage • Reiki • Meditation • Sound Healing"
- Before badges: ✓ Certified Instructors, ✓ All Levels, ✓ Gift Cards
- After headline: "You Carry Enough. Put It Down for an Hour."
- After accent word: "for an Hour" in sage
- After CTA: "Book Your Escape →"
- After trust: "Certified RYT-500 • 10+ Classes Weekly • All Levels"
- After SVG motif: organic flowing waves/breath curves

### music-entertainment
- Company: Neon Pines
- Before tagline: "Live Music Every Weekend!"
- Before services: "Live Shows • DJ Nights • Private Events • Merch • Bar"
- Before badges: ✓ All Ages Shows, ✓ VIP Available, ✓ Sound System
- After headline: "Saturday Sold Out. Friday's Going Fast."
- After accent word: "Going Fast" in hot pink
- After CTA: "Grab Tickets Before They're Gone →"
- After trust: "200+ Shows/Year • 500 Capacity • Pro Sound"
- After SVG motif: neon/angular electric lines

### government-municipal
- Company: West Kootenay Regional Parks
- Before tagline: "Welcome to the District Website."
- Before services: "Parks • Recreation • Permits • Bylaws • Council"
- Before badges: ✓ Office Hours Mon-Fri, ✓ Online Forms, ✓ Community Events
- After headline: "Report It. We'll Handle It. No Hold Music Required."
- After accent word: "No Hold Music" in blue
- After CTA: "Submit a Service Request →"
- After trust: "Online 24/7 • 12 Parks • 8 Programs"
- After SVG motif: clean accessible geometric shapes

## Critical Rules
- ALL addresses: "123 Sample St" only
- ALL phones: (250) 555-0XXX
- Before button is a `<span>` NOT an `<a>` — no dead links
- Container height: 480px fixed
- Both cards: absolute inset-0
- NO auto-trigger — user taps button only
- Add `useEffect` and `useInView` to imports if missing
- Remove old BeforeAfterSlider function entirely
- Shimmer border keyframes: add to existing `<style>` block if not present
- Section heading: "Watch Your Website Transform" / "From dated to designed — in real time"
- Adapt heading/subheading font and colors to each demo's theme
