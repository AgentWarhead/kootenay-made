import BlogArticle from '@/components/BlogArticle';

export const metadata = {
  title: 'Google Business Profile: The Free Tool Most Local Businesses Ignore — Kootenay Made Digital',
  description: 'How to set up and optimize your Google Business Profile to show up in local search results.',
};

export default function Article() {
  return (
    <BlogArticle
      title="Google Business Profile: The Free Tool Most Local Businesses Ignore"
      date="March 28, 2026"
      readTime="6 min read"
      category="Growth & SEO"
      image="/images/blog/google-business-profile.jpg"
    >
      <p>
        Here&apos;s a scenario that plays out every single day in the Kootenays: someone new to town pulls out their phone and searches &quot;coffee shop near me&quot; or &quot;plumber Castlegar&quot; or &quot;yoga studio Nelson.&quot; Google shows them a map with three businesses pinned on it. Those three businesses get the click. Everyone else? Invisible.
      </p>
      <p>
        The tool that determines who shows up in that map? Google Business Profile. It&apos;s completely free. It takes about 20 minutes to set up. And most local businesses either don&apos;t have one or haven&apos;t touched it since 2019.
      </p>

      <h2>What Is Google Business Profile?</h2>
      <p>
        Google Business Profile (formerly Google My Business) is the box that appears on the right side of Google when someone searches your business name — or in the map results when they search for what you do. It shows your hours, phone number, reviews, photos, location, and a link to your website.
      </p>
      <p>
        Think of it as your Google storefront. Even if you don&apos;t have a website, your Google Business Profile is often the first thing people see.
      </p>

      <h2>How to Set Yours Up (20-Minute Version)</h2>
      <p>
        <strong>Step 1: Claim your listing.</strong> Go to <a href="https://business.google.com" target="_blank" rel="noopener noreferrer">business.google.com</a> and search for your business. If it already exists (Google often creates listings automatically), claim it. If not, create a new one.
      </p>
      <p>
        <strong>Step 2: Verify your business.</strong> Google will usually send a postcard to your address with a verification code. Some businesses can verify by phone or email. This step is non-negotiable — unverified listings don&apos;t show up properly.
      </p>
      <p>
        <strong>Step 3: Fill out everything.</strong> This is where most people stop at 60%. Don&apos;t. Fill out every single field:
      </p>
      <ul>
        <li><strong>Business name</strong> — exactly as it appears on your signage</li>
        <li><strong>Category</strong> — pick the most specific one (e.g., &quot;Thai Restaurant&quot; not just &quot;Restaurant&quot;)</li>
        <li><strong>Hours</strong> — including holiday hours when they change</li>
        <li><strong>Phone number</strong> — local number, not toll-free</li>
        <li><strong>Website</strong> — even a simple one helps</li>
        <li><strong>Description</strong> — 750 characters about what you do, naturally including your location and services</li>
        <li><strong>Services/menu</strong> — list what you offer with descriptions</li>
      </ul>
      <p>
        <strong>Step 4: Add photos.</strong> Businesses with photos get 42% more requests for directions and 35% more website clicks. Add your storefront, interior, team, products — real photos, not stock images. Aim for at least 10 to start, then add a few each month.
      </p>

      <h2>The Secret Weapon: Google Posts</h2>
      <p>
        Most business owners don&apos;t know about Google Posts, and that&apos;s a huge missed opportunity. Posts are like mini social media updates that appear directly on your Google listing. You can share:
      </p>
      <ul>
        <li>Special offers or seasonal deals</li>
        <li>Events you&apos;re hosting</li>
        <li>New products or services</li>
        <li>Quick updates (&quot;Closed for Family Day&quot; or &quot;New summer hours!&quot;)</li>
      </ul>
      <p>
        Posts signal to Google that your business is active and engaged. That boosts your ranking. One post per week is plenty — even one per month is better than nothing.
      </p>

      <h2>Reviews: The Currency of Trust</h2>
      <p>
        Let&apos;s talk about the elephant in the room: reviews. They matter enormously. Businesses with more (and better) reviews rank higher in local search. Period.
      </p>
      <p>
        The trick isn&apos;t buying reviews or begging for them. It&apos;s making it easy. After a good experience with a customer, send them a direct link to your review page. (Google Business Profile gives you a short link specifically for this.) A simple &quot;If you have a minute, a Google review would mean a lot to us&quot; works better than any complicated strategy.
      </p>
      <p>
        And always respond to reviews — good and bad. A thoughtful response to a negative review often impresses potential customers more than the five-star ones.
      </p>

      <h2>Why This Matters in the Kootenays</h2>
      <p>
        We live in a region where word of mouth has traditionally been king. And it still matters. But &quot;word of mouth&quot; increasingly happens on Google. When someone recommends your business, the next thing people do is Google you. What they find — your photos, your reviews, your hours, your professionalism — that&apos;s the new word of mouth.
      </p>
      <p>
        The Kootenays are also a tourism region. Thousands of visitors come through every year who don&apos;t know anyone local. They&apos;re relying entirely on Google to decide where to eat, shop, and spend money. If you&apos;re not showing up, that money is going to whoever is.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Google Business Profile costs nothing, takes minimal time to maintain, and directly influences whether local customers find you. If you haven&apos;t set one up — or if you set it up years ago and forgot about it — now&apos;s the time.
      </p>
      <p>
        Twenty minutes today could mean dozens of new customers this year. That&apos;s a pretty solid return on investment.
      </p>
      <p>
        Once your profile is dialed in, the next step is making sure the website it links to does its job. Read <a href="/blog/local-search-visibility">Google Says 46% of Searches Are Local</a> for the bigger picture on local visibility — and <a href="/blog/what-google-sees">What Actually Happens When Someone Googles Your Business Name</a> to understand the full journey from search to sale.
      </p>
      <p className="border-l-4 border-copper pl-4 my-6 text-text-secondary italic">
        Want us to audit your current local presence? <a href="/audit" className="text-copper font-semibold not-italic hover:underline">Book a free audit →</a> We&apos;ll check your Google profile, website, and local rankings in one shot.
      </p>
    </BlogArticle>
  );
}
