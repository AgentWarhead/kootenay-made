# Before/After Slider Upgrade Spec — "Headline Showdown"

## Concept
Replace the current mini-website slider with a HEADLINE + CTA comparison at FULL readable scale.
Both sides show just: a headline, a subline, and a CTA button. One side cringe, one side professional.
The contrast should be IMMEDIATE and EMOTIONAL — not a design critique, a gut reaction.

## Technical Implementation
- Keep the existing BeforeAfterSlider component structure (useRef, useCallback, onMouseMove/onTouchMove, clipPath)
- Replace the inner content of both BEFORE and AFTER sides
- Make text LARGE and readable at any screen size (headline should be text-2xl to text-4xl)
- Container: keep `max-w-3xl`, aspect-ratio `3:2` (slightly taller for headline + sub + CTA)
- NO images. Pure CSS typography and colors.

## BEFORE Side (Generic — recognizably bad)
Each industry gets a cringe headline that mimics real bad small business websites:
- Font: Use a system font that looks dated — `Georgia, serif` or `'Times New Roman', serif` for most, `'Comic Sans MS', cursive` for playful/casual industries
- Colors: Muted, dated palette — gray backgrounds (#e5e5e5 or #f0f0f0), dark gray or navy text
- Layout: Center-aligned, cramped, no breathing room
- Headline: Generic, says nothing ("Welcome to Our Website!", "Your #1 Choice for X!")
- CTA: Weak — "Click Here", "Learn More", "Submit" in a gray/default-blue button
- Optional: A phone number floating awkwardly, a "Since 1998" badge, or a "Under Construction 🚧" vibe
- Badge: "BEFORE" label, muted color

## AFTER Side (Demo-Specific — aspirational)
Each industry gets a sharp headline that demonstrates actual copywriting + design skill:
- Font: Use the DEMO's actual heading font (reference the font constant in each page)
- Colors: Use the DEMO's actual color palette (accent colors, backgrounds)
- Layout: Clean, spacious, professional hierarchy
- Headline: Punchy, benefit-driven, industry-specific copy that makes the owner think "that's what I SHOULD be saying"
- CTA: Strong action verb, demo-styled button with proper padding/radius
- Badge: "AFTER" label in demo's accent color

## Industry-Specific Content

### automotive
- BEFORE: "Welcome to Joe's Auto Repair! Your #1 Choice for Car Repairs Since 1998. Click Here to Learn More"
- AFTER: "Your Engine Light's On. We'll Tell You Why — Not Sell You What You Don't Need." CTA: "Book Your Diagnostic →"

### trades-industrial
- BEFORE: "Bob's Plumbing & Heating. Serving the Area for Over 20 Years! Call Us Today!"
- AFTER: "Your Pipes Burst at 2AM. We Answer." CTA: "Emergency Service — Call Now →"

### farm-harvest
- BEFORE: "Welcome to Our Farm! 🌽🍅 We Grow Fresh Produce. Come Visit Us at the Market!"
- AFTER: "Farm-Fresh. Delivered to Your Door." CTA: "Shop This Week's Harvest →"

### adventure-outdoors
- BEFORE: "Welcome to Mountain Adventures! We Offer Hiking, Rafting, and More! Book Now!"
- AFTER: "The Kootenays Don't Wait. Neither Should You." CTA: "Book Your Next Adventure →"

### clean-professional
- BEFORE: "Smith & Associates Professional Services. Trusted. Reliable. Experienced. Contact Us Today."
- AFTER: "Your Money Deserves a Plan. Not a Guessing Game." CTA: "Book a Free Consultation →"

### medical-dental
- BEFORE: "Welcome to Our Dental Clinic! Accepting New Patients. Please Call to Schedule an Appointment."
- AFTER: "Nervous About the Dentist? We Get It. That's Why We're Different." CTA: "Book Online — No Phone Call Needed →"

### editorial-elegant
- BEFORE: "★ TOP REALTOR ★ Your Dream Home Awaits! #1 in Sales! Call Today for a FREE Home Evaluation!!!"
- AFTER: "Your Home Has a Story. Let's Make Sure Buyers Hear It." CTA: "Get Your Property Valuation →"

### education-nonprofit
- BEFORE: "Welcome to Our Organization! Making a Difference Since 2005. Click Here to Donate."
- AFTER: "127 Families Fed Last Month. Yours Could Be Next — To Help." CTA: "Volunteer This Weekend →"

### sleek-dark
- BEFORE: "Welcome to Our Restaurant! Check Out Our Menu! Open Tuesday to Sunday. Call for Reservations."
- AFTER: "Thursday's Special Sells Out by 7pm. Just Saying." CTA: "Reserve Your Table →"

### rustic-craft
- BEFORE: "Welcome to the Brewery! 🍺 Great Beer, Great Times! Come Check Us Out!"
- AFTER: "Brewed 12 Minutes From Where You're Sitting." CTA: "See What's on Tap →"

### bright-playful
- BEFORE: "Welcome to Happy Days Daycare! 🌈 A Safe and Fun Place for Your Children! Enroll Today!"
- AFTER: "You'll Never Wonder If They're Okay. Here's Why." CTA: "Book a Tour — See For Yourself →"

### home-garden
- BEFORE: "Green Thumb Landscaping. Mowing, Trimming, and More! Free Estimates! Call or Email."
- AFTER: "Your Neighbours Will Ask Who Did Your Yard." CTA: "Get Your Free Design Sketch →"

### bold-modern
- BEFORE: "Welcome! We Are a Leading Technology Solutions Provider. Innovative. Scalable. Dynamic."
- AFTER: "Your Competitor Launched Last Month. What Are You Waiting For?" CTA: "Let's Build It →"

### warm-natural
- BEFORE: "Welcome to Our Wellness Centre 🧘 Yoga, Massage, and Holistic Healing. Namaste! Book Now."
- AFTER: "You Carry Enough. Put It Down for an Hour." CTA: "Book Your Escape →"

### music-entertainment
- BEFORE: "WELCOME TO THE VENUE! Live Music Every Weekend! Check Our Facebook for Details!"
- AFTER: "Saturday Sold Out. Friday's Going Fast." CTA: "Grab Tickets Before They're Gone →"

### government-municipal
- BEFORE: "Welcome to the District Website. For Information Please Navigate the Menu Above. Office Hours: Mon-Fri 8:30-4:30."
- AFTER: "Report It. We'll Handle It. No Hold Music Required." CTA: "Submit a Service Request →"
