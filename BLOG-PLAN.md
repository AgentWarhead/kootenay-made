# Blog Build Plan — Kootenay Made Digital

## CRITICAL RULES
- NO LIES. NO HALLUCINATED STATS. Every stat must be from a real, citable source.
- NO pricing numbers. Frame AI as speed/cost advantage without dollar amounts.
- Target audience: Kootenay small business owners (plumbers, restaurants, shops, salons, guides, lodges)
- Every article drives toward /contact or /audit page
- All articles must be beautifully designed with Kootenay influence
- SEO-optimized: title tags, meta descriptions, H2 subtopics, internal links

## EXISTING POSTS TO UPGRADE (3)
1. `/blog/kootenay-business-new-website` — "5 Signs Your Kootenay Business Needs a New Website"
2. `/blog/google-business-profile` — "Google Business Profile: The Free Tool Most Local Businesses Ignore"  
3. `/blog/what-to-expect-web-designer` — "What to Expect When Working with a Web Designer"

Upgrade: add more depth, better formatting, internal links to new posts, CTAs, hero images

## NEW POSTS (12)

### Awareness (4)
4. slug: `website-first-impression` — "76% of People Judge Your Business By Your Website — Here's What Yours Is Saying"
5. slug: `competitor-new-website` — "Your Competitor Just Got a New Website. Here's Why That Should Keep You Up Tonight"
6. slug: `local-search-visibility` — "Google Says 46% of Searches Are Local. Is Your Business Even Showing Up?"
7. slug: `tourism-season-website` — "Tourism Season Is Coming — Is Your Website Ready for the Rush?"

### Consideration (4)
8. slug: `do-you-need-website-2026` — "Do You Actually Need a Website in 2026? (An Honest Answer)"
9. slug: `website-cost-guide` — "What Should a Website Cost? (And How to Know If You're Getting Ripped Off)"
10. slug: `wix-vs-custom` — "Wix vs. Custom Website: What's Actually Right for Your Business?"
11. slug: `what-google-sees` — "What Actually Happens When Someone Googles Your Business Name"

### AI Fear-Busting (3)
12. slug: `ai-not-scary` — "AI for Small Business: It's Not Scary, It's Your New Favourite Employee"
13. slug: `ai-tools-save-time` — "5 AI Tools That Can Save Your Business 10 Hours a Week"
14. slug: `ai-business-setup` — "What an AI Business Setup Actually Looks Like (No Robots, No Sci-Fi)"

### Decision + Authority (1)
15. slug: `website-soundtrack` — "We Added a Soundtrack to Our Website. Here's Why."

## SEO STRUCTURE (every post)
- Title tag: primary keyword + location/year (max 60 chars)
- Meta description: benefit-driven, 150-155 chars, includes keyword
- H1 matches title
- H2s address subtopics / long-tail keywords
- 2-3 internal links to service pages + 1-2 to other blog posts
- CTA mid-article + end-of-article to /contact or /audit
- URL slug: short, keyword-rich

## ARTICLE TEMPLATE
Each article page.tsx should follow the existing blog post structure.
- Export metadata with title, description, openGraph
- Use the ProseArticle or existing blog layout wrapper
- Hero image at top
- Article content with proper heading hierarchy
- Author/date section
- Related posts at bottom
- CTA section at bottom

## BLOG LISTING PAGE
Redesign /blog/page.tsx:
- Categories: "Getting Started", "AI & Automation", "Growth", "Case Studies"
- Featured post at top (larger card)
- Grid of remaining posts
- Each card: hero image, title, excerpt, category badge, read time
- Kootenay-themed design (copper accents, mountain vibes)

## IMAGES
Generate 1 hero image per post using Nano Banana 2 (Gemini 3.1 Flash).
Save to: public/images/blog/{slug}.jpg
Resolution: 1K
Style: Kootenay-inspired, relevant to topic, warm natural lighting
NO text in the images — text is overlaid via HTML/CSS
