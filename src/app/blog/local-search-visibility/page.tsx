import BlogArticle from '@/components/BlogArticle';
import Link from 'next/link';

export const metadata = {
  title: 'Google Says 46% of Searches Are Local. Is Your Business Showing Up? — Kootenay Made Digital',
  description: 'Nearly half of all Google searches have local intent. Here\'s what that means for Kootenay small businesses and how to make sure you\'re visible when it counts.',
};

export default function Article() {
  return (
    <BlogArticle
      title="Google Says 46% of Searches Are Local. Is Your Business Even Showing Up?"
      date="March 30, 2026"
      readTime="8 min read"
      category="Growth & SEO"
      image="/images/blog/local-search-visibility.jpg"
    >
      <p>
        According to Google, nearly half of all searches on their platform have local intent. That means when people pull out their phones and start typing, a huge portion of them are looking for something nearby — a restaurant, a contractor, a shop, a service provider.
      </p>
      <p>
        They&apos;re looking for someone like you.
      </p>
      <p>
        The question is: when those searches happen in Nelson, Castlegar, Rossland, Trail, or anywhere else in the Kootenays — does your business show up? Or does it not?
      </p>
      <p>
        Because if it doesn&apos;t show up, it doesn&apos;t exist. Not to that customer. Not in that moment. Not ever.
      </p>

      <h2>What &quot;Local Search&quot; Actually Means</h2>
      <p>
        Local search is any search with geographic intent. That includes explicit ones like &quot;electrician Castlegar&quot; or &quot;coffee shop Nelson BC&quot; — but also implicit ones like &quot;coffee shop near me&quot; or just &quot;coffee shop&quot; typed on a phone, where Google infers you want something nearby.
      </p>
      <p>
        These searches almost always trigger what Google calls the &quot;Local Pack&quot; — the map with three business pins that appears near the top of results. That&apos;s prime real estate. The three businesses that appear there get the vast majority of clicks.
      </p>
      <p>
        Everyone else? Much harder to find.
      </p>

      <h2>Why Local Visibility Matters More in the Kootenays</h2>
      <p>
        In a major city, you might rely on foot traffic, neighbourhood reputation, and density of people to sustain a business even without a strong online presence. The Kootenays are different.
      </p>
      <p>
        Our communities are spread out. People drive 30-45 minutes for services regularly. They plan ahead. They research before they go. When someone in Winlaw is looking for a plumber, they&apos;re not walking by shop windows to find one — they&apos;re Googling.
      </p>
      <p>
        And then there&apos;s tourism. The Kootenays attract hundreds of thousands of visitors per year who have absolutely no idea who the local businesses are. Their entire discovery process happens through Google Maps, review sites, and local search. If you&apos;re not visible there, tourist dollars walk right past you.
      </p>

      <h2>The Three Things That Determine If You Show Up</h2>
      <p>
        Google&apos;s local ranking algorithm considers three main factors:
      </p>

      <h3>1. Relevance</h3>
      <p>
        Does your business match what the person searched for? This is driven by how clearly you&apos;ve described your services — on your website, on your Google Business Profile, and in your categories. A business that says &quot;we do all kinds of home services&quot; is less relevant to &quot;furnace repair Nelson&quot; than a business that specifically mentions furnace repair.
      </p>
      <p>
        Be specific. List every service you offer. Use the language your customers use.
      </p>

      <h3>2. Distance</h3>
      <p>
        Google tries to show results that are physically close to the searcher. You can&apos;t change your location, but you can make sure your address is correct and consistent everywhere online — your website, your Google Business Profile, local directories, social media. Inconsistencies confuse Google and hurt your ranking.
      </p>

      <h3>3. Prominence</h3>
      <p>
        This is the most complex factor, and it&apos;s where most businesses can improve. Prominence includes your Google reviews (quantity and quality), your website authority, how often you&apos;re mentioned online, and how complete and active your Google Business Profile is.
      </p>
      <p>
        A business with 50 Google reviews ranks higher than a business with 3. A business with a well-maintained Google Business Profile outperforms a business with a neglected one. A business with a fast, well-built website beats a slow, outdated one.
      </p>

      <h2>A Quick Test: How Visible Are You Right Now?</h2>
      <p>
        Open a private browser window (so your search history doesn&apos;t influence results) and search for your business category plus your city. For example:
      </p>
      <ul>
        <li>&quot;[your service] [your city]&quot;</li>
        <li>&quot;[your service] near me&quot; (if you&apos;re in the right area)</li>
        <li>&quot;best [your service] [your city]&quot;</li>
      </ul>
      <p>
        Do you show up in the Local Pack (the map section)? Do you show up at all? Where on the page?
      </p>
      <p>
        If you&apos;re not on the first page for your primary service in your primary city, you&apos;re essentially invisible to most people searching for you.
      </p>

      <h2>The Foundation: Your Google Business Profile</h2>
      <p>
        If you haven&apos;t set up and optimized your Google Business Profile yet, that&apos;s the single highest-leverage thing you can do. It&apos;s free, it&apos;s critical for local search, and most businesses in the Kootenays have either never set one up or set it up years ago and forgot about it.
      </p>
      <p>
        We&apos;ve written a full guide on this: <Link href="/blog/google-business-profile" className="text-copper hover:underline font-medium">Google Business Profile: The Free Tool Most Local Businesses Ignore</Link>. It walks you through setup step by step.
      </p>

      <h2>Beyond Google Business Profile: Your Website Still Matters</h2>
      <p>
        Some business owners think: &quot;I have a Google Business Profile, so I don&apos;t need a website.&quot; This is half-right and half-dangerous.
      </p>
      <p>
        A Google Business Profile without a website is like a business card without a portfolio. Great for first contact. Not enough to close the deal.
      </p>
      <p>
        When someone finds you on Google, a significant portion of them will click through to your website before deciding to call. If your website is slow, outdated, hard to navigate, or doesn&apos;t answer their questions — they bounce. And bouncing often means calling your competitor instead.
      </p>
      <p>
        Your Google Business Profile gets them to the door. Your website invites them in.
      </p>

      <div className="not-prose my-8 p-6 bg-copper/10 border border-copper/20 rounded-xl">
        <p className="text-slate font-semibold mb-2">Not sure how visible your business is?</p>
        <p className="text-text-secondary text-sm mb-4">We&apos;ll run a local search audit and show you exactly where you stand — and what to do about it.</p>
        <Link href="/audit" className="inline-block bg-copper text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-copper-light transition-colors">Book a Free Audit →</Link>
      </div>

      <h2>Start Small, Start Now</h2>
      <p>
        You don&apos;t need to overhaul everything at once. The most important thing is to start. Even one improvement — claiming your Google Business Profile, updating your hours, adding recent photos — moves you in the right direction.
      </p>
      <p>
        Local search visibility is a compound investment. Every small improvement stacks on the ones before it. The businesses that start now will have a significant head start over those who wait until &quot;things slow down a bit.&quot;
      </p>
      <p>
        Spoiler: things don&apos;t slow down. Start now.
      </p>
    </BlogArticle>
  );
}
