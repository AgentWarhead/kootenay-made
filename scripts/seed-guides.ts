/**
 * Seed Trailhead guides into Supabase
 * Run: npx tsx scripts/seed-guides.ts
 */

const SUPABASE_URL = 'https://mimmncqzbfepzndlxdmd.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pbW1uY3F6YmZlcHpuZGx4ZG1kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMxNDc2NywiZXhwIjoyMDkwODkwNzY3fQ.Hxcs8FxCN1H3wM6HxBB5SHJvrWotHzuNu-tngO39kCM'

interface GuideInput {
  title: string
  slug: string
  excerpt: string
  category: 'trailhead'
  trailhead_milestone: number
  trailhead_order: number
  difficulty: 'quick' | 'standard' | 'advanced'
  read_time_minutes: number
  published: boolean
  content: string
}

const guides: GuideInput[] = [
  // === MILESTONE 1: BASECAMP ===
  {
    title: 'Set Up Your Google Business Profile',
    slug: 'set-up-google-business-profile',
    excerpt: 'The single most important thing you can do for free. Your Google Business Profile is how locals find you when they search.',
    category: 'trailhead',
    trailhead_milestone: 1,
    trailhead_order: 1,
    difficulty: 'quick',
    read_time_minutes: 7,
    published: true,
    content: `# Set Up Your Google Business Profile

If someone in Nelson or Castlegar searches for what you do right now, will they find you? If you haven't set up your Google Business Profile, the honest answer is probably not.

Your Google Business Profile (sometimes called Google My Business) is the box that appears on the right side of Google search results — the one with your hours, phone number, photos, and reviews. It's completely free, and it's often the first thing a potential customer sees before they ever visit your website.

## Why This Matters More Than Almost Anything

Think about how you find a local business. You probably Google it. Most of your customers do the same. A complete, accurate Google Business Profile means:

- You show up when people search for your type of business nearby
- Customers can call you directly from the search results
- People can get driving directions with one tap
- Your reviews are visible right there — social proof before they even click

## How to Get Started

1. **Go to business.google.com** and click "Manage now"
2. **Sign in with a Google account** — if you use Gmail, you already have one
3. **Search for your business name** — if it's already listed (which sometimes happens automatically), you'll claim it; if not, you'll create it fresh
4. **Fill in every field**: business name, category, address or service area, phone number, website, and hours
5. **Verify your listing** — Google usually sends a postcard to your address with a code, or sometimes you can verify by phone or video

## What to Do Once You're Verified

The goal is a complete profile — Google literally shows you a percentage score. Aim for 100%.

- **Add at least 5 photos**: your storefront, your team, your work, your products. Real photos, not stock images. If you're a plumber in Trail, show a job you did in Trail.
- **Write a business description**: two or three sentences about what you do and who you help. Keep it plain — no buzzwords.
- **Set your hours carefully** — including holiday hours when they come up. Nothing frustrates a customer more than showing up to find you closed.

💡 **Brett's Tip**: Don't overthink the category. Pick the most obvious one that describes your main service. You can always add more later.

## Keep It Fresh

Google notices when you update your profile, and it rewards active businesses with better visibility. Once a month, post a quick update — a new photo, a seasonal promotion, or just a "we're open late this weekend" notice. It takes five minutes and it genuinely helps.

This one free step will do more for your local visibility than almost anything else on this trail. Do it first. Do it today.`,
  },
  {
    title: 'Understanding Your Domain Name',
    slug: 'understanding-your-domain-name',
    excerpt: 'Your domain name is your address on the internet. Here\'s what you need to know — without the confusing tech stuff.',
    category: 'trailhead',
    trailhead_milestone: 1,
    trailhead_order: 2,
    difficulty: 'quick',
    read_time_minutes: 5,
    published: true,
    content: `# Understanding Your Domain Name

Your domain name is your address on the internet — it's what people type to find you, like \`nelsoncoffeehouse.ca\` or \`kootenayplumbing.com\`. It's not your website itself; it's just the address that points to your website. Think of it like the difference between your street address and your actual house.

## What You Actually Own

When you "buy" a domain, you're renting it annually — usually $15–30/year through a domain registrar. Popular registrars include Namecheap, GoDaddy, and Google Domains. You don't own it forever; you renew it each year. **Set it to auto-renew.** Letting a domain expire is one of the most common and costly mistakes a small business can make.

💡 **Brett's Tip**: Use a separate registrar from your web host if possible. It keeps things cleaner if you ever want to switch hosting providers. And never let your registrar and your host be the same company if you can help it — it makes leaving harder.

## .ca vs .com — Which One?

If you serve primarily Canadian customers, **.ca is a great choice**. It immediately tells people you're Canadian, which matters for local trust and for showing up in Canadian search results. You can register a .ca if you're a Canadian citizen or business.

**.com is still the gold standard worldwide**, and it's what most people instinctively type. If you can get a clean .com, take it.

If you're a local Kootenay business not looking to expand globally, .ca is a solid, professional choice.

## Choosing a Good Domain

- **Keep it short** — under 20 characters if possible
- **Easy to spell** — if you have to spell it out on the phone, it's probably too complicated
- **Avoid hyphens and numbers** — they're confusing to say out loud
- **Include your business name or what you do** — \`nelsonmassage.ca\` is better than \`nmt2010.ca\`

## The Connection Between Your Domain and Your Website

Your domain is registered somewhere. Your website files live somewhere else (your hosting). A setting called a **DNS record** connects the two — it tells the internet "when someone types this address, send them to this server." Your web designer handles this for you, but it's good to know the concept so you're not confused when someone mentions it.

The main thing to remember: **you own your domain**. Make sure your login credentials are saved somewhere safe, and the registrar account is in your name — not just your web designer's. If they ever become unavailable, you need to be able to access it yourself.`,
  },
  {
    title: "Your Website's First Impression",
    slug: 'your-websites-first-impression',
    excerpt: 'You have about 3 seconds before a visitor decides to stay or leave. Here\'s what makes them stay.',
    category: 'trailhead',
    trailhead_milestone: 1,
    trailhead_order: 3,
    difficulty: 'quick',
    read_time_minutes: 6,
    published: true,
    content: `# Your Website's First Impression

Studies consistently show that visitors form an opinion about your website in about 50 milliseconds — roughly the time it takes to blink. In the first 3 seconds, they've already decided whether they trust you and whether they're going to stick around.

That might feel unfair, but it's just how it works. The good news is that making a great first impression isn't complicated. It comes down to a few key things.

## What Visitors Are Asking (Whether They Know It or Not)

When someone lands on your website for the first time, they're subconsciously trying to answer three questions:

1. **Am I in the right place?** (Is this actually what I was searching for?)
2. **Can I trust these people?** (Does this look professional and legitimate?)
3. **What do I do next?** (Is there a clear action for me to take?)

If your website answers all three quickly and clearly, you're in great shape. If any one of them is unclear, the visitor is already halfway out the door.

## The Above-the-Fold Rule

"Above the fold" is old newspaper language for what you see before you scroll. On a website, it means what's visible on screen the moment the page loads — before any scrolling.

That space needs to do heavy lifting:

- **Your business name** (or logo) so they know where they are
- **A clear one-line description** of what you do and who you serve — "Plumbing and heating for West Kootenay homeowners" is better than just your business name
- **A strong image** — ideally a photo of you, your team, or your work. Real photos outperform stock photos every single time.
- **One clear button** telling them what to do next — "Book a Free Estimate," "View Our Menu," "Call Us Now"

💡 **Brett's Tip**: Write your main headline so that a stranger from Kelowna who found you by accident immediately knows what you do. If someone has to read three sentences to figure out you're a hairdresser, that's too long.

## Trust Signals

People are cautious about businesses they've never heard of. These simple things build instant credibility:

- **Real photos** of your face, your team, or your work
- **Your phone number** visible in the top-right corner (big enough to see on mobile)
- **Your location** — "Serving Nelson, Castlegar, and the Arrow Lakes" tells people you're local and real
- **A few Google review stars** embedded on the page

## Speed Matters

A slow website kills first impressions fast. If your site takes more than 3 seconds to load, a big chunk of your visitors have already left. Your web designer can check and optimize this — it's worth asking about if your site feels sluggish.

The bottom line: your website's first impression isn't about flashy design. It's about clarity. Be clear about who you are, what you do, and what to do next — and visitors will stick around to learn more.`,
  },

  // === MILESTONE 2: THE FOREST ===
  {
    title: 'Navigating Your New Website',
    slug: 'navigating-your-new-website',
    excerpt: 'A quick tour of how your website is put together, so you know what\'s what and who to call when something needs changing.',
    category: 'trailhead',
    trailhead_milestone: 2,
    trailhead_order: 1,
    difficulty: 'quick',
    read_time_minutes: 5,
    published: true,
    content: `# Navigating Your New Website

Your new website can feel like moving into a new house — everything is unfamiliar, and you're not quite sure where anything is. This guide is a quick walkthrough of how websites are typically set up, what the moving pieces are, and what you need to know to feel at home.

## The Three Main Pieces

Almost every website has three distinct components:

### 1. The Domain
This is your address — like \`mycastlegarbusiness.ca\`. We covered this in the previous guide. You own this through a registrar.

### 2. The Hosting
This is the server where your website files actually live — the building, not the address. Your hosting plan determines how fast your site loads and how much you can store. For most small Kootenay businesses, a standard shared hosting plan is totally fine.

### 3. The CMS (Content Management System)
This is the dashboard where you log in to make changes — update your hours, swap out a photo, add a new service. The most common one is WordPress. If your site was built on WordPress, you'll have a login at \`yourwebsite.com/wp-admin\`.

## What You Can (and Should) Change Yourself

Your CMS is designed for non-technical people to make everyday updates. Things you should be able to do without calling your web designer:

- **Update your hours** (especially for holidays)
- **Change your phone number or address**
- **Add or remove items from a menu or service list**
- **Swap out photos**
- **Add a blog post or news update**

💡 **Brett's Tip**: Make one small edit as soon as your site goes live — even just fixing a typo or updating a photo. It'll build your confidence, and you'll know the CMS works.

## What Requires Your Web Designer

Some things are better left to the professionals:

- Structural layout changes (moving sections around)
- Adding new features or functionality
- Anything involving code
- Domain and DNS settings

## Keep Your Login Credentials Safe

You need access to three things: your domain registrar, your hosting account, and your CMS. Write these down somewhere safe — a password manager like Bitwarden (free) is ideal.

If your web designer built your site, make sure you have your own login credentials — not just theirs. You should always have owner-level access to your own website.

## Backups

Your web designer should set up automated backups. Ask them directly: "How often is my site backed up, and how would we restore it?" If the answer is "it isn't," that's a problem worth fixing today. For a WordPress site, plugins like UpdraftPlus handle this automatically and for free.

Once you understand the basics of what you have, maintaining your website becomes a lot less scary. It's your tool — get comfortable with it.`,
  },
  {
    title: 'Updating Your Content',
    slug: 'updating-your-content',
    excerpt: 'Keeping your website current is easier than you think, and it matters more than most people realize.',
    category: 'trailhead',
    trailhead_milestone: 2,
    trailhead_order: 2,
    difficulty: 'quick',
    read_time_minutes: 6,
    published: true,
    content: `# Updating Your Content

A website that never changes is a website that slowly loses trust. Outdated hours, last year's prices, a "Grand Opening" banner that's been up since 2019 — these things signal to visitors that maybe you're not paying attention to your business either.

The good news: keeping your content fresh doesn't have to take more than 30 minutes a month.

## What "Content" Actually Means

Content is everything your visitors read, see, or watch on your website. That includes:

- Your service descriptions
- Your team bios and photos
- Your pricing (if you show it)
- Your hours and contact information
- Photos of your work
- Blog posts or news updates
- Testimonials and reviews

## The High-Priority Updates

Some things should be updated the moment they change:

**Hours and contact info** — Nothing frustrates a customer more than driving to your shop based on hours listed online, only to find you're closed. Set a reminder every time your hours change — especially around holidays.

**Services and pricing** — If you added a new service or changed your rates, your website should reflect that. Inconsistent information undermines trust.

**Team changes** — If someone left or joined your team and they're on your website, update it. A photo of someone who no longer works there is a small thing that quietly signals you're not paying attention.

## Low-Priority But Still Worth Doing

**Blog posts or updates** — Even one post every couple of months telling your story, sharing a project, or announcing something new keeps your website feeling alive. Google also notices fresh content.

**New photos** — Did you just complete a really nice project? Renovate your space? Hire someone photogenic? Add photos. Real, current photos beat stock images and old photos every single time.

💡 **Brett's Tip**: Put "Update website" on your calendar once a month. Set it for 20 minutes on the first Monday of the month. You won't always have something to change, but the habit means nothing falls through the cracks.

## How to Make Updates in WordPress

If your site runs on WordPress:

1. Log in at \`yourwebsite.com/wp-admin\`
2. Go to **Pages** and find the page you want to edit
3. Click **Edit** and you'll open the block editor
4. Make your changes
5. Click **Update** to save

Most edits take under 5 minutes once you know where to find the page.

## When to Ask for Help

If you want to restructure a page, add a new section, or change something that affects the layout or design, call your web designer. For content changes — text, photos, hours, services — you should be able to do those yourself.

An accurate, current website is a trustworthy website. Keep it honest and keep it fresh.`,
  },
  {
    title: 'Adding Photos That Sell',
    slug: 'adding-photos-that-sell',
    excerpt: 'The single biggest visual upgrade you can make to your website is replacing stock photos with real ones. Here\'s how.',
    category: 'trailhead',
    trailhead_milestone: 2,
    trailhead_order: 3,
    difficulty: 'quick',
    read_time_minutes: 6,
    published: true,
    content: `# Adding Photos That Sell

Real photos of your actual business — your face, your team, your work, your space — consistently outperform professional stock photos. Not by a little. By a lot.

People buy from people they feel they know. A photo of a real plumber standing in front of a Castlegar home builds more trust than a perfect stock photo of a generic handyman. Real beats polished, every time.

## What Photos You Need

At minimum, your website should have:

**A photo of you or your team** — Customers want to know who they're dealing with. Even a clean, well-lit photo taken on a phone is miles better than nothing. Stand outside in natural light, smile, done.

**Photos of your work** — If you're a landscaper, show yards you've done. If you're a photographer, show your best shots. If you run a restaurant, show your food. The best photos are recent, real, and clearly yours.

**Your location or storefront** — If you have a physical location, a photo of the outside helps people recognize you when they arrive. It also signals "we're real, we're here."

**Photos that tell your story** — Maybe you work on-site across the Kootenays, from Nakusp to Creston. Show that. Photos of you working in the region connect you to the local community.

## Phone Camera Tips That Actually Work

You don't need a professional photographer for most of this. Here's what makes a big difference:

**Natural light beats everything** — Take photos near windows, outside, or in bright shade. Avoid harsh direct sunlight (it creates shadows) and indoor artificial lighting (it looks yellow and flat).

**Clean your lens** — Seriously. Give it a wipe. It fixes about 30% of blurry phone photos.

**Landscape over portrait for most website images** — Horizontal photos (wider than they are tall) fit website layouts better. Think 16:9 ratio, like a TV screen.

**Get in close** — Don't leave a ton of empty space around your subject. Fill the frame.

💡 **Brett's Tip**: The Arrow Lakes area in the fall, the Bluffs behind Castlegar, the mountains framing Nelson — use your landscape. A photo that unmistakably says "Kootenay" creates an instant connection with local customers.

## How to Add Photos in WordPress

1. Log in to your WordPress dashboard
2. Go to **Media > Add New** and upload your photos
3. Go to the page you want to update and find the image block
4. Swap out the old image for your new one
5. Hit **Update**

If you want to replace a specific photo and aren't sure how, your web designer can walk you through it in a 10-minute call.

## File Size Matters

Large photo files (anything over 1–2 MB) can slow your website down. Before uploading, run your photos through a free tool like Squoosh (squoosh.app) or TinyPNG to compress them. Your site will load faster, and faster sites keep more visitors.

Your photos are your first handshake with a potential customer. Make them real.`,
  },
  {
    title: 'Mobile: Where Your Customers Are',
    slug: 'mobile-where-your-customers-are',
    excerpt: 'More than half your website visitors are on their phone. Here\'s what that means for you.',
    category: 'trailhead',
    trailhead_milestone: 2,
    trailhead_order: 4,
    difficulty: 'quick',
    read_time_minutes: 5,
    published: true,
    content: `# Mobile: Where Your Customers Are

Pull up your website on your phone right now. What does it look like?

If the text is tiny, if you have to pinch-and-zoom to read anything, if buttons are hard to tap, or if the layout looks broken — your website has a mobile problem. And that problem is costing you customers.

More than half of all web searches happen on a phone. For local businesses, that number is even higher, because people search for local services when they're out and about — looking for a restaurant while standing on Baker Street in Nelson, searching for an electrician from their truck in Castlegar.

## What "Mobile-Friendly" Actually Means

A mobile-friendly website automatically adjusts its layout to fit the screen it's being viewed on. On a phone, a three-column layout becomes one column. Font sizes get bigger. Buttons get larger. Navigation simplifies.

This is called being "responsive." If your website was built in the last five or six years and your designer was doing their job, it should already be responsive. But it's worth checking yourself.

## How to Test Your Website on Mobile

1. Simply open it on your phone
2. Can you read the text without zooming?
3. Can you tap buttons and menu items without accidentally hitting the wrong one?
4. Does the page load in a few seconds?
5. Is your phone number clickable (i.e., does tapping it offer to call you)?

You can also use Google's free tool — search "Google Mobile-Friendly Test" and paste your URL.

## The Most Important Mobile Elements

**Click-to-call phone number** — Your phone number should be a tap-to-call link on mobile. If someone has to manually dial your number, most of them won't bother.

**Easy-to-find address** — If you have a physical location, make it easy to find and tap into Google Maps with one touch.

**Fast load time** — Mobile connections can be slower than home WiFi. If your site has huge image files, it'll be frustratingly slow on a phone. Compress your images (see the photos guide).

**Large tap targets** — Buttons and links should be big enough to tap comfortably with a thumb. Tiny links are a mobile nightmare.

💡 **Brett's Tip**: Try your website on 3G if you can (turn off WiFi and use your data). If it still loads decently, you're in good shape. Most people searching from Highway 3 or up in the hills don't have great signal.

## If Your Site Isn't Mobile-Friendly

Tell your web designer. A modern website should be responsive out of the box, and fixing a non-responsive site is usually straightforward for someone who knows what they're doing.

In the meantime, the most important fix: make sure your phone number is prominent, tappable, and easy to find within the first scroll.

Your customers are on their phones. Make sure your website is ready for them.`,
  },

  // === MILESTONE 3: THE RIDGE ===
  {
    title: 'Google Maps: Your Digital Storefront',
    slug: 'google-maps-your-digital-storefront',
    excerpt: 'For local businesses, Google Maps might be more important than your website. Here\'s how to make it work for you.',
    category: 'trailhead',
    trailhead_milestone: 3,
    trailhead_order: 1,
    difficulty: 'quick',
    read_time_minutes: 7,
    published: true,
    content: `# Google Maps: Your Digital Storefront

When someone searches "electrician near Nelson" or "best coffee Castlegar," the first thing they see isn't a list of websites. It's a map with three businesses pinned on it. That's called the Local Pack, and getting into it is one of the most valuable things you can do for your business.

Your Google Maps presence flows directly from your Google Business Profile — which is why that first Basecamp guide was so important. If you completed it, you've already done the hard part.

## Why Google Maps Matters So Much

Think about how you personally find local businesses. Chances are you Google it, see the map, look at who's nearby, check the ratings, and pick one. Your customers do exactly the same thing.

The three businesses that show up in that map pack get the lion's share of the clicks. Businesses outside the top three are essentially invisible for that search.

## Factors That Influence Your Map Ranking

Google decides who shows up based on three main things:

**Relevance** — Does your business match what the person searched for? Your business category and description matter here.

**Distance** — How close is your business to where the person is searching? You can't control this, but it's why local search is so powerful — you have an inherent advantage over businesses from out of town.

**Prominence** — How well-known and trusted does Google think you are? This is influenced by your number of reviews, your website, how often your business is mentioned online, and how complete and active your Google Business Profile is.

## What You Can Do Right Now

**Complete your profile to 100%** — Every field you fill in helps. Business description, website, hours, photos, services — fill them all in.

**Get reviews** — This is the big one. We'll cover this in depth at The Summit, but the short version is: ask happy customers to leave you a Google review. Even 10–15 reviews puts you well ahead of many local competitors.

**Post updates** — Use the "Posts" feature in your Google Business Profile dashboard to share updates, promotions, or news once or twice a month. It signals to Google that your business is active.

**Add your service area** — If you serve customers across the Kootenays — Nelson to Trail, up to Nakusp, over to Creston — add all of those areas to your profile. Google uses service area to determine when to show you.

💡 **Brett's Tip**: Search for your own business type in your town right now. See who's showing up. Look at their profiles. Are they fully filled out? Do they have photos? Now compare yours. That gap is your opportunity.

## Photos Make a Bigger Difference Than You Think

Listings with photos get significantly more direction requests and website clicks than those without. Add at least 5–10 photos: your exterior, interior, team, and work. Update them when things change.

## Responding to Reviews

When someone leaves you a review — positive or negative — respond to it. For positive reviews, a brief, genuine thank-you is all you need. For negative reviews, respond calmly and professionally. Potential customers read both the reviews AND how you respond.

Your Google Maps presence is working for you 24 hours a day, even when your shop is closed. It's worth investing a few hours to get it right.`,
  },
  {
    title: 'What Customers Search For',
    slug: 'what-customers-search-for',
    excerpt: 'Getting found on Google isn\'t magic — it\'s just understanding how your customers think when they type into a search bar.',
    category: 'trailhead',
    trailhead_milestone: 3,
    trailhead_order: 2,
    difficulty: 'quick',
    read_time_minutes: 6,
    published: true,
    content: `# What Customers Search For

"Getting found on Google" sounds mysterious, but it's really just one thing: matching the words on your website to the words your customers type into the search bar.

This field is called SEO (search engine optimization), but you don't need to know the term or the technical details. You just need to think like your customer.

## How Your Customers Actually Search

Most people don't search the way business owners think they do.

A plumber might think customers search for "plumbing services" or "residential plumbing." But customers are more likely to search for "leaking pipe under sink," "hot water heater not working," or "plumber Castlegar."

The key insight: **people search for their problem, not your business category.**

## Finding the Right Words

Think about the specific problems you solve and the specific questions your customers ask you. If you're a bookkeeper, your customers might search:

- "bookkeeping for small business Nelson BC"
- "how to do GST remittances"
- "accountant near me Kootenay"
- "year-end taxes small business"

Those specific phrases — not "bookkeeping services" — are what you want sprinkled naturally through your website.

## Where to Use These Phrases

You don't need to be technical about this. Just make sure your website mentions the things you do and the places you serve, in plain language.

**Page titles** — Each page should have a clear, descriptive title. Not "Services" but "Plumbing and Heating Services — Nelson, BC."

**Your main description** — The paragraph near the top of your homepage that explains what you do. Include what you do and where you do it: "We're a family-run landscaping company serving Nelson, Castlegar, and the surrounding Kootenay communities."

**Your service pages** — If you offer multiple services, each one should have its own page. A page called "Drain Cleaning" with a full description will rank far better than a generic "Services" page with bullet points.

**Your location** — Mention your city, nearby towns, and the region naturally throughout your site.

💡 **Brett's Tip**: After you finish a project or a sale, ask your customer: "How did you find us? What did you search for?" Those answers are gold. They tell you exactly what words to use.

## A Simple Exercise

Open Google and start typing something your customers might search for. Don't hit enter — just watch the autocomplete suggestions. Those are real things people are searching for. Write them down. Now look at your website. Are any of those phrases naturally present?

## What Not to Do

Don't stuff your pages with keywords in an unnatural way. Google is smart enough to detect that, and it actually hurts your ranking. Write for humans, not search engines.

One well-written service page with clear, natural language will outperform a page crammed with keywords every time.

Getting found on Google is really just about being clear and specific about what you do and where you do it. That's it.`,
  },
  {
    title: 'Getting Listed in Local Directories',
    slug: 'getting-listed-in-local-directories',
    excerpt: 'Business directories are boring. But having consistent listings across them quietly builds your credibility with Google.',
    category: 'trailhead',
    trailhead_milestone: 3,
    trailhead_order: 3,
    difficulty: 'quick',
    read_time_minutes: 5,
    published: true,
    content: `# Getting Listed in Local Directories

Online business directories aren't exciting. But they do something important: they confirm to Google that you're a real, legitimate business, and consistent information across them quietly boosts how often you show up in local searches.

## What Are Business Directories?

Business directories are websites that list businesses by category and location. The most important ones for a Canadian small business:

- **Google Business Profile** (covered in Basecamp — the most important one)
- **Yelp** — especially relevant for restaurants, home services, and health businesses
- **Bing Places** — Microsoft's version of Google Maps, still used by a surprising number of people
- **Yellow Pages (yellowpages.ca)** — yes, it still exists and still gets traffic
- **Apple Maps** — when iPhone users ask Siri "find a plumber near me," Apple Maps is what they get
- **Facebook Business Page** — lots of people search for local businesses directly on Facebook
- **Chamber of Commerce** — being listed on your local chamber's website is especially valuable for Kootenay businesses

## Why Consistency Matters

Here's the key detail: Google cross-references your business information across multiple sources. If your address on Yelp is slightly different from your Google listing (say, "202 Baker St" vs "202 Baker Street"), it creates a small trust signal against you. Multiplied across multiple directories, inconsistencies can quietly hurt your local search rankings.

The rule is: **Name, Address, Phone number — always identical, always spelled the same way.**

💡 **Brett's Tip**: Pick one format and stick with it. Decide right now: "Suite 4" or "#4"? "Street" or "St"? Write it down and use that exact format everywhere.

## How to Get Listed

Most directories let you create a free business listing. Start with the ones that matter most:

1. **Google Business Profile** — done from Basecamp
2. **Bing Places** — go to bingplaces.com and import your Google listing. Takes 5 minutes.
3. **Apple Maps** — search "Apple Business Connect" and claim your listing
4. **Yelp** — biz.yelp.com
5. **Facebook Page** — if you don't have one, create a free Business Page at facebook.com/business
6. **Your local chamber** — find your Chamber of Commerce website and ask how to get listed

## Don't Chase Every Directory

There are hundreds of directories out there, and some services will try to sell you a package to "list you everywhere." The top five or six directories are what actually matter. Don't pay for directory submissions — the major ones are free.

## Keep Them Updated

When your phone number, address, or hours change, update every directory. Add it to your list. It takes about 20 minutes to update all of them, and it's worth doing.

Think of directory listings as quiet, low-maintenance workers that keep pointing customers toward you, 24 hours a day.`,
  },

  // === MILESTONE 4: THE SUMMIT ===
  {
    title: 'Getting Your First Google Reviews',
    slug: 'getting-your-first-google-reviews',
    excerpt: 'Reviews are the most powerful form of social proof for a local business. Here\'s the right way to ask for them.',
    category: 'trailhead',
    trailhead_milestone: 4,
    trailhead_order: 1,
    difficulty: 'quick',
    read_time_minutes: 7,
    published: true,
    content: `# Getting Your First Google Reviews

If you ask most local business owners what holds them back from getting Google reviews, the answer is usually: "I never ask." That's it. The customers were happy. They just weren't asked.

Reviews are the number one trust signal for local businesses. A business with 40 reviews at 4.8 stars will win the click over a competitor with zero reviews, almost every time — even if the competitor has a better website.

## Why Reviews Matter So Much

Think about the last time you were trying a new restaurant or hiring a tradesperson you'd never used before. What did you do? You checked the reviews.

Your potential customers are doing the same thing. Reviews answer the question: "Can I trust this person with my money?" Better than any marketing copy, a genuine review from a real local customer says: yes.

Reviews also influence how often you appear in local Google Maps searches. Businesses with more reviews (and higher ratings) tend to rank better.

## The Only Way to Get Reviews: Ask

Most happy customers will leave a review if you ask them directly. Most won't think to do it on their own. The asking is the whole secret.

The best time to ask is immediately after a positive interaction — when the customer says "this is exactly what I needed" or "you guys did great work." That's your moment.

**In person:** "I'm so glad it worked out. If you have a minute, a Google review would mean a lot to our small business — it really helps locals find us."

**By text or email:** "Thanks again for choosing us! If you have a moment, leaving us a Google review helps other Kootenay folks find us. Here's the link: [direct review link]"

## Getting Your Direct Review Link

1. Go to your Google Business Profile dashboard
2. Click "Get more reviews" or "Share review form"
3. Copy the link
4. Save it somewhere handy — put it in your phone notes, your email signature, your invoice template

This link takes customers directly to the review box with zero friction.

💡 **Brett's Tip**: Don't ask for a "5-star review." Just ask them to share their honest experience. It sounds more genuine, customers feel better about doing it, and Google actually flags reviews that seem incentivized.

## What to Do With Negative Reviews

First: don't panic. Every business eventually gets a negative review.

**Respond calmly and publicly.** Potential customers aren't just reading the review — they're reading your response. A gracious, professional response to a critical review can actually build more trust than a wall of 5-star ratings.

Don't argue. Don't be defensive. Acknowledge the experience, apologize if appropriate, and explain what you've done (or will do) differently. "We're sorry to hear this — we've reached out privately to make it right" is a great formula.

**Never offer refunds or freebies in a public response.** Handle that privately.

## How Many Reviews Do You Need?

Honestly? 10 solid reviews puts you ahead of most local businesses in the Kootenays. 25+ reviews starts to build real authority. Don't stress about reaching a hundred — just build the habit of asking.

Reviews are the one marketing asset that compounds over time. Each new one adds to the foundation. Start asking today.`,
  },
  {
    title: 'Calls to Action That Work',
    slug: 'calls-to-action-that-work',
    excerpt: 'A button that says "Learn More" isn\'t a call to action. Here\'s how to turn website visitors into actual customers.',
    category: 'trailhead',
    trailhead_milestone: 4,
    trailhead_order: 2,
    difficulty: 'quick',
    read_time_minutes: 6,
    published: true,
    content: `# Calls to Action That Work

A call to action (let's just call it a "next step button") is the thing on your website that tells a visitor what to do. "Book a Free Estimate." "Call Us Now." "Order Online." Without a clear next step, visitors read your page and then... leave.

Most business websites have two common problems with their next step buttons: either they don't have them, or they're so vague they don't motivate anyone.

## The Problem With Vague Buttons

"Learn More" is the most overused button on the internet. Learn more about what? "Submit" tells the visitor nothing. "Click Here" is only slightly better.

These generic buttons create friction. The visitor has to think: "What happens if I click this? Is it worth my time?"

The better approach: **tell them exactly what will happen and why it's worth doing.**

"Book Your Free 30-Minute Consultation" is better than "Learn More."
"Get My Free Estimate" is better than "Contact Us."
"Call (250) 555-1234 to Book Today" is better than "Contact."

## What Makes a Good Next Step Button

**Specific action** — What exactly will the customer do? Book, call, order, download, sign up.

**Clear benefit** — Why should they do it? Free, fast, no obligation, same-day response.

**Low friction** — Make it sound easy and safe. "Get a Free Quote in 2 Minutes" feels easy. "Submit Your Information for a Comprehensive Evaluation" feels like homework.

## Where to Put Your Buttons

Every page on your website should have at least one clear next step. The most important placement:

**Above the fold** — A visible button before anyone has to scroll. This is your primary call to action, usually something like "Book a Free Estimate" or "Call Now."

**After describing each service** — When someone finishes reading about your plumbing services, the next thing they see should be a button: "Book a Plumber."

**At the bottom of every page** — People who scroll to the bottom are interested. Give them somewhere to go.

💡 **Brett's Tip**: Your phone number should be tappable and visible without scrolling on mobile — ideally in the top-right corner of every page. Don't make people hunt for it. Half your visitors are on their phone, and if calling is your primary conversion, that number needs to be the first thing they see.

## The One-Button Rule

On any given page, you generally want ONE primary call to action — not five. When visitors see five different buttons, they freeze. Choice is the enemy of action.

If you have multiple things you want visitors to do, pick the one that's most valuable to your business and make that the primary button. The others can be secondary, smaller, or lower on the page.

## Testing What Works

You don't need fancy analytics tools to figure out what's working. Just track where your leads are coming from. Ask every new customer: "How did you find us? What made you reach out?" If nobody's clicking the "Book Online" button but people are calling the phone number you put in the footer, that tells you something.

A clear, specific, prominent call to action is the most underrated improvement most local business websites can make. It costs nothing and the impact can be immediate.`,
  },
  {
    title: 'Building an Email List',
    slug: 'building-an-email-list',
    excerpt: 'Social media can disappear overnight. Your email list is yours forever. Here\'s why to start building it now.',
    category: 'trailhead',
    trailhead_milestone: 4,
    trailhead_order: 3,
    difficulty: 'standard',
    read_time_minutes: 8,
    published: true,
    content: `# Building an Email List

Here's a scenario worth thinking about: your Facebook page has 800 followers built up over 5 years. Then Facebook changes its algorithm (again), or gets sued, or just becomes less relevant. Overnight, your access to those followers is gone or dramatically reduced.

Your email list is different. Those people gave you their email address directly. You can reach them anytime, without paying a platform, without competing with an algorithm. That list is yours.

For most small Kootenay businesses, email is the highest-return marketing channel there is.

## Why Email Still Works

Despite everything the internet has thrown at us, email open rates for small businesses hover around 30–40%. Your average social media post is seen by maybe 5% of your followers. Email reaches people in their inbox — where they're already paying attention.

And for local businesses, email is especially powerful because your audience is small and local. You're not trying to reach millions of people. You're trying to stay top-of-mind with the 200–500 people who've already bought from you or expressed interest.

## Getting Started: What You Actually Need

You don't need to build some complicated email marketing machine to start. You need:

1. **A simple email tool** — Mailchimp has a free plan that handles up to 500 contacts. MailerLite is another good free option. Both make it easy to build a list and send professional-looking emails.

2. **A reason for people to subscribe** — "Sign up for our newsletter" doesn't work very well. "Get our weekly seasonal specials" or "Be the first to know about new arrivals" works better. Give people a reason.

3. **A way to collect emails** — This can be as simple as a form on your website, a link in your email signature, or a physical sign-up sheet at your counter.

## Who to Add to Your List

The most valuable people on your email list are your past customers. These people already know you, already trust you, and are the most likely to buy from you again.

Ask them directly. After a positive experience: "Do you want to stay in the loop with us? I can add you to our email list — we only send something when we have a deal on or something worth sharing."

You can also import your existing contacts if you have a customer database, as long as you've had a prior relationship with them. (Don't buy lists. It doesn't work and it violates spam laws.)

💡 **Brett's Tip**: Even 50 people on an email list is worth having. Fifty people who have bought from you and trust you are worth more than 5,000 random social media followers. Start small and build it honestly.

## What to Send

You don't need to send weekly emails to make this worthwhile. A monthly email is plenty for most local businesses. What to include:

- A seasonal promotion or limited-time offer
- A project spotlight or behind-the-scenes story
- Something useful — a tip, a how-to, a relevant resource
- News about your business (new service, new team member, new hours)

Keep it short. Two or three sections, each with a clear point. People skim emails — lead with the most interesting thing.

## The Rules (You Have to Follow These)

Canadian anti-spam law (CASL) requires that everyone on your list has given you express or implied consent to receive marketing emails. People who've bought from you in the last two years = implied consent. People who signed up on your website = express consent. Everyone else needs to explicitly opt in.

Always include an easy unsubscribe link. Every legitimate email tool handles this automatically.

Your email list is a long-term asset. It takes time to build, but once you have it, it's one of the most reliable ways to drive repeat business.`,
  },
  {
    title: 'Social Media That Actually Helps',
    slug: 'social-media-that-actually-helps',
    excerpt: 'Most businesses do social media wrong — and burn out in the process. Here\'s how to use it in a way that\'s actually sustainable.',
    category: 'trailhead',
    trailhead_milestone: 4,
    trailhead_order: 4,
    difficulty: 'standard',
    read_time_minutes: 7,
    published: true,
    content: `# Social Media That Actually Helps

Most small business owners start social media with good intentions and end up burning out in three months. They post frantically for a while, then go silent for six months, then feel guilty, then start again. Sound familiar?

The problem is usually that they're doing social media for the wrong reasons — trying to "go viral" or "grow an audience" instead of using it for what it's actually good at for a local business.

## What Social Media Is Actually Good For

For a local Kootenay business, social media has a few specific, realistic jobs:

**Being findable** — People look up local businesses on Facebook and Instagram the same way they Google them. Having an active, real profile means you show up. This alone is worth doing.

**Staying top-of-mind** — Your past customers aren't constantly thinking about you. A photo that shows up in their feed on a Tuesday is a gentle reminder that you exist. When they need what you offer, they remember.

**Building trust before the call** — If someone is deciding between two local plumbers they've never used, they might check both Facebook pages. One has photos, posts, and real reviews. The other hasn't posted since 2021. Which one do they call?

**Word of mouth amplification** — When a happy customer tags you, shares your post, or leaves a comment, their network sees it. That's free advertising to people who already trust the person recommending you.

## Picking the Right Platform

Don't try to be everywhere. Pick one or two platforms where your customers actually are:

**Facebook** — Still the dominant platform for local business in the Kootenays. Especially relevant for 35+ demographic, service businesses, and community-oriented companies.

**Instagram** — Great for visual businesses: restaurants, retail, home décor, landscaping, photography, art. If your work photographs well, Instagram is your friend.

**Google Business Profile Posts** — Often overlooked, but these posts appear directly in Google search results. A quick update once a month is well worth doing.

## A Realistic Posting Strategy

Two to three posts per week sounds manageable. For most local businesses, one solid post per week is plenty. Here's a simple formula:

- **One "work" post** per week — a project you completed, a before/after, a product you're proud of
- **One "human" post** per month — your team, your story, something personal and real
- **One "useful" post** per month — a tip, a how-to, something that helps your audience

Don't post just to hit a quota. A thoughtful post every 5 days beats a forced post every day.

💡 **Brett's Tip**: The single best social media post for a local business is a real photo of real work, with a caption that tells the story. "Replaced this 40-year-old water heater in a home up above Kinnaird today. No hot water for two days — now they're good for another 20 years." That's it. Real, local, specific. Way better than a motivational quote or a stock image.

## What to Avoid

**Don't buy followers.** Fake followers inflate your numbers and hurt your organic reach.

**Don't over-promote.** If every post is a sales pitch, people tune out or unfollow.

**Don't post-and-disappear.** If someone comments on your post, respond. Engagement is the point.

**Don't stress about perfection.** A genuine, slightly imperfect photo from your phone beats a professional stock image every time.

Social media done well is just showing up consistently and being real. That's something any local business can do.`,
  },

  // === MILESTONE 5: THE VISTA ===
  {
    title: 'When to Consider Google Ads',
    slug: 'when-to-consider-google-ads',
    excerpt: 'Google Ads can be powerful — or a fast way to burn money. Here\'s how to know if you\'re ready, and what to expect.',
    category: 'trailhead',
    trailhead_milestone: 5,
    trailhead_order: 1,
    difficulty: 'standard',
    read_time_minutes: 8,
    published: true,
    content: `# When to Consider Google Ads

Google Ads (formerly called AdWords) is paid advertising on Google. You pay to appear at the top of search results for specific terms. When someone searches "plumber Nelson BC," your ad appears above the organic results.

Done well, Google Ads can be a steady source of new customers. Done poorly, it's a fast way to spend a few hundred dollars and wonder where it all went.

## First, a Reality Check

Before paying Google anything, you need to have the basics locked down:

- Your Google Business Profile is complete and verified
- Your website clearly explains what you do and has a strong call to action
- You know what a new customer is worth to you (lifetime value)
- You have a phone number or booking system ready to handle inquiries

If those aren't in place, fix them first. Google Ads sends people to your website — if your website can't convert them, you're paying for traffic that goes nowhere.

## Who Google Ads Works Best For

Google Ads is especially effective for:

**High-intent searches** — When someone searches "emergency plumber Castlegar" or "dentist accepting new patients Nelson," they're ready to buy right now. Paid ads capture that intent.

**Businesses with a clear customer value** — If a new customer is worth $500+ to you, spending $20–50 per lead on Google Ads is a very reasonable investment. If a customer is worth $30, the math doesn't work.

**Service businesses** — Plumbers, electricians, roofers, landscapers, cleaners — these businesses see great returns because their customers search with high purchase intent.

## What It Actually Costs in the Kootenays

Because we're a small market, Google Ads in the Kootenays can be surprisingly affordable compared to big cities. You're not competing with hundreds of businesses for every click.

A realistic budget for a local service business: $300–600/month. Some businesses do well with less; some need more depending on their category. There's no universal right answer.

💡 **Brett's Tip**: Start with a specific service, not a broad campaign. "Emergency plumbing Castlegar" is better than "plumbing." Narrow, specific ads cost less per click and convert better.

## The Anatomy of a Simple Google Ad

You write a headline (up to 30 characters, shown in blue), a description (up to 90 characters), and choose which page it links to. Google shows your ad when someone searches the terms you're targeting, and you pay only when someone clicks.

The most important thing: the page your ad links to must match the ad. If your ad says "Emergency Plumber Available Now" and it links to your homepage, visitors are confused. It should link to a specific page about your emergency plumbing service.

## When to Hire Someone

Google Ads can be managed yourself, but the learning curve is real. If you're willing to spend a few hours learning it and watching your numbers carefully, you can absolutely do it yourself. Google has a free certification course.

If you'd rather not think about it, hiring a digital marketing person to manage your campaign for $200–400/month often pays for itself quickly — assuming your customer value supports it.

The question isn't "should I use Google Ads?" It's "are my fundamentals solid enough that paid traffic will actually convert?" If yes, it's worth exploring.`,
  },
  {
    title: 'Social Media Advertising Basics',
    slug: 'social-media-advertising-basics',
    excerpt: 'Paid social ads are different from Google Ads — and they work best for different goals. Here\'s what you need to know.',
    category: 'trailhead',
    trailhead_milestone: 5,
    trailhead_order: 2,
    difficulty: 'standard',
    read_time_minutes: 7,
    published: true,
    content: `# Social Media Advertising Basics

Facebook and Instagram ads work differently than Google Ads, and understanding the difference helps you use each one correctly.

**Google Ads:** You show up when someone is actively searching for what you offer. High intent, ready to buy.

**Social media ads:** You show up in someone's feed while they're scrolling — they weren't searching for you. Lower purchase intent, but better for building awareness.

This doesn't make one better than the other. It makes them suited for different goals.

## What Social Ads Are Good For

**Building brand awareness** — Getting your name in front of people in your area who might need you someday but don't know you exist yet.

**Promoting a specific offer** — A seasonal promotion, a limited-time discount, or an event. "Get 20% off tree trimming this spring — Kootenay area only."

**Retargeting** — Showing ads to people who already visited your website. These people already expressed interest, so the ads are much more effective. This requires a small pixel (code snippet) added to your website.

**Growing your local following** — Facebook ads that target people by location and interests can build your local following faster than organic posting alone.

## Facebook/Instagram Ads in Plain Language

Both platforms are owned by Meta, and you manage ads through a single dashboard called Meta Business Suite (business.facebook.com).

You set a daily budget (even $5/day produces results at small scale), choose your audience, write your ad, and pick where it shows up — Facebook feed, Instagram feed, Stories, etc.

The targeting is powerful: you can target people within 25km of Nelson who are homeowners, age 30–65, interested in home improvement. For a local service business, this is incredibly useful.

## A Reasonable Starting Budget

For a brand awareness or offer promotion campaign in the Kootenay market, $10–20/day ($300–600/month) will generate meaningful reach. You're not trying to reach millions of people — you're trying to reach a few thousand people in a specific area, repeatedly.

💡 **Brett's Tip**: The biggest mistake with social ads is spending money before having a strong creative (the photo or video in the ad). A mediocre image with great targeting will still underperform. Use a real photo of your work or your team — not stock imagery — and you'll be ahead of most advertisers immediately.

## What Makes a Good Social Ad

The creative (your image or video) is the most important element. It needs to stop the scroll.

- Real photos outperform stock images
- Before/after photos work extremely well for trades, landscaping, renovation
- Video, even short, is more engaging than static images
- Your face or your team's faces build trust quickly

Your headline should be clear and benefit-focused: "Castlegar's Trusted Family Plumber — Same-Day Service Available."

## Start Small and Learn

Don't dump $1,000 into ads before you know what works. Start with $5–10/day for two weeks on a specific offer or campaign. Review the results. What got clicks? What converted? Scale what works, kill what doesn't.

Social ads reward experimentation. The only way to know what works for your specific audience is to test it.`,
  },
  {
    title: 'Measuring What Matters',
    slug: 'measuring-what-matters',
    excerpt: 'You can\'t improve what you don\'t measure. Here\'s how to track what\'s working without drowning in data.',
    category: 'trailhead',
    trailhead_milestone: 5,
    trailhead_order: 3,
    difficulty: 'standard',
    read_time_minutes: 7,
    published: true,
    content: `# Measuring What Matters

You've made it to The Vista. You've done the work — your Google profile is complete, your website is solid, you're collecting reviews, you've tried some ads. Now the question is: what's actually working?

The answer lives in your numbers. But most small business owners either track nothing (flying blind) or track everything (drowning in data). The goal is to track the things that actually tell you whether your marketing is working.

## The Numbers That Matter Most

### Google Business Profile Insights

Your Google Business Profile dashboard shows you:

- **How many people found your listing** (views)
- **How many called you** from the listing
- **How many asked for directions**
- **How many clicked through to your website**

Check this monthly. Is it growing? That's a sign your Google presence is improving. Is it flat or dropping? Something needs attention.

### Website Traffic (Google Analytics)

Google Analytics 4 is free and tells you how many people are visiting your website, where they came from, and what they looked at. The most useful metrics for a local small business:

**Total visitors per month** — Is it growing over time?

**Traffic sources** — Are people finding you through Google search? Social media? Direct (they typed your URL)? Knowing where your traffic comes from tells you which channels are working.

**Top pages** — What pages are people actually reading? If your "Emergency Plumbing" service page gets 10x more traffic than your "Drain Cleaning" page, that tells you something about what people need.

Setting up Google Analytics is a 20-minute job if you're comfortable with websites, or ask your web designer. Once it's running, you mostly check it once a month.

### Review Count and Rating

This one's simple: check it once a month. How many reviews do you have? What's your average rating? Is it improving?

Set a personal target: I want to reach 25 reviews by end of the year. Track it.

### Lead Sources

The most underrated metric: asking new customers where they found you.

"How did you hear about us?" is a question you should ask every single new customer. The answers reveal which marketing channels are actually driving business, as opposed to which ones just look busy in an analytics dashboard.

If 80% of your new customers found you on Google Maps, that's where to focus. If nobody has ever come from Instagram despite you posting there for a year, that's information too.

💡 **Brett's Tip**: Keep a simple spreadsheet. Each month, record: website visitors, Google profile views, number of calls from Google, new reviews, and number of new customers. After six months, you'll have a real picture of what's working and what isn't.

## What Not to Obsess Over

**Social media follower counts** — Follower growth is a vanity metric. What matters is whether your social presence is actually driving calls and customers.

**Ranking #1 on Google** — Ranking positions fluctuate constantly based on who's searching, from where, on what device. Focus on whether you're in the Local Pack (the map results) rather than chasing #1 for every keyword.

**Bounce rate** — The percentage of people who land on a page and immediately leave. This sounds bad but often isn't — if someone Googled your phone number, found it, called you, and left your website, that's a success, not a failure.

## The Monthly Marketing Check-In

Once a month, spend 20 minutes with your numbers:

1. Check Google Business Profile insights
2. Check Google Analytics (or just look at your traffic trend)
3. Count your new Google reviews
4. Note how many new customers this month and where they came from
5. Note what's growing and what isn't

That's it. Twenty minutes a month gives you enough information to make good decisions about where to spend your time and money.

Congratulations — you've made it to The Vista. You've built the foundation that most local businesses in the Kootenays don't have. Keep climbing, keep measuring, and keep showing up for your customers.

The trail never really ends. But from up here, the view is pretty good. 🏔️`,
  },
]

async function seedGuides() {
  console.log(`Seeding ${guides.length} guides...`)

  // Delete existing trailhead guides first
  const deleteRes = await fetch(
    `${SUPABASE_URL}/rest/v1/guides?category=eq.trailhead`,
    {
      method: 'DELETE',
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )

  if (!deleteRes.ok && deleteRes.status !== 204) {
    console.log('Note: Could not delete existing guides (may not exist yet)')
  } else {
    console.log('Cleared existing trailhead guides')
  }

  // Insert in batches of 5
  const batchSize = 5
  for (let i = 0; i < guides.length; i += batchSize) {
    const batch = guides.slice(i, i + batchSize)
    const res = await fetch(`${SUPABASE_URL}/rest/v1/guides`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(batch),
    })

    if (res.ok || res.status === 201) {
      console.log(`✓ Inserted guides ${i + 1}–${Math.min(i + batchSize, guides.length)}`)
    } else {
      const err = await res.text()
      console.error(`✗ Failed batch ${i + 1}–${i + batchSize}:`, err)
    }
  }

  console.log('\n✅ Seed complete!')
  console.log(`Total guides seeded: ${guides.length}`)
  guides.forEach(g => {
    console.log(`  M${g.trailhead_milestone}.${g.trailhead_order} — ${g.title}`)
  })
}

seedGuides().catch(console.error)
