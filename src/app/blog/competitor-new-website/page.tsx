import BlogArticle from '@/components/BlogArticle';
import Link from 'next/link';

export const metadata = {
  title: 'Your Competitor Just Got a New Website. Here\'s Why That Should Keep You Up Tonight — Kootenay Made Digital',
  description: 'When a local competitor upgrades their website, the balance of power shifts. Here\'s what it means for your business and what to do about it.',
};

export default function Article() {
  return (
    <BlogArticle
      title="Your Competitor Just Got a New Website. Here's Why That Should Keep You Up Tonight"
      date="March 30, 2026"
      readTime="7 min read"
      category="Growth & SEO"
      image="/images/blog/competitor-new-website.jpg"
    >
      <p>
        You noticed it. Maybe a customer mentioned it. Maybe you Googled your own service category and saw it. Your main competitor — the one you&apos;ve been running alongside for years — just launched a brand new website.
      </p>
      <p>
        It looks sharp. It loads fast. It has real photos, clear messaging, and a big bold button that says &quot;Book Now.&quot;
      </p>
      <p>
        And yours looks exactly like it did three years ago.
      </p>
      <p>
        Here&apos;s why this matters more than it might seem — and what you can do about it before the gap widens.
      </p>

      <h2>Online Competition Is Different From In-Person Competition</h2>
      <p>
        In the physical world, competition is somewhat forgiving. Your business might be better-located, have a better reputation, or benefit from word of mouth that&apos;s been building for years. Customers who already know you don&apos;t care that the place down the road has a nicer sign.
      </p>
      <p>
        Online is different. When someone new to the area, a tourist, or a customer who&apos;s never heard of either of you searches for your service category — they&apos;re making a cold decision. And that decision is almost entirely based on what they see on their screen.
      </p>
      <p>
        A sleek, fast, modern website has a measurable advantage over an outdated one. Not because your work is worse — but because presentation shapes perception before they ever see your work.
      </p>

      <h2>What a New Website Does for Your Competitor</h2>
      <p>
        It&apos;s not just about looking nice. A properly built modern website does several things at once:
      </p>

      <h3>It Boosts Their Google Ranking</h3>
      <p>
        Google pays attention to site speed, mobile-friendliness, security, and structure. A new website built with current standards will rank higher than an old one on all of these. If you were neck-and-neck in local search results before, you might not be anymore.
      </p>

      <h3>It Captures Leads More Effectively</h3>
      <p>
        Modern websites are built around conversion — getting visitors to take action. Contact forms that actually work. Phone numbers that are clickable on mobile. Online booking systems. Clear calls to action. If someone is comparing you and your competitor on a phone at 9pm, the one with the easier path to contact gets the business.
      </p>

      <h3>It Builds Trust Faster</h3>
      <p>
        A professional website signals that a business is established, credible, and cares about how it presents itself. Right or wrong, people associate website quality with business quality. It&apos;s not fair — but it&apos;s real.
      </p>

      <h3>It Works 24/7</h3>
      <p>
        A good website answers questions, showcases work, and captures inquiries while you&apos;re closed. If a tourist rolls into Nelson on a Sunday evening looking for a kayak rental and your competitor has all their info online while your site is a dead end — that&apos;s a lost customer who never even knew they could have called you.
      </p>

      <h2>The Real Risk: Losing Customers You Never Knew You Had</h2>
      <p>
        The most painful kind of loss is the invisible one. You never meet the customer who found your competitor first. You never know how many people looked at both sites and chose them. You don&apos;t see the clicks you didn&apos;t get.
      </p>
      <p>
        In a region like the Kootenays — where tourist dollars, newcomers, and seasonal surges can make or break a year — that invisible loss adds up quietly and quickly.
      </p>
      <p>
        Think about it this way: if even five new customers per month choose your competitor because their online presence looks more credible, what does that cost you over a year? Over five years?
      </p>

      <h2>This Isn&apos;t About Panic. It&apos;s About Timing.</h2>
      <p>
        The good news is that your competitor just did you a favour by being first. They showed you where the market is going. They validated that a better online presence is worth investing in. And they gave you a benchmark to beat.
      </p>
      <p>
        Here&apos;s the thing about websites: a newer one isn&apos;t automatically better. It depends entirely on who built it and how well it was done. Plenty of &quot;new&quot; websites are built on cheap templates with generic copy and zero local relevance. If yours is built with genuine care — specific to your business, your customers, and your community — it will outperform theirs.
      </p>

      <div className="not-prose my-8 p-6 bg-copper/10 border border-copper/20 rounded-xl">
        <p className="text-slate font-semibold mb-2">Ready to stop watching from the sidelines?</p>
        <p className="text-text-secondary text-sm mb-4">We&apos;ll audit your current site and show you exactly where the gaps are — so you can make a smart move, not a rushed one.</p>
        <Link href="/audit" className="inline-block bg-copper text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-copper-light transition-colors">Book a Free Audit →</Link>
      </div>

      <h2>What to Do Right Now</h2>
      <p>
        Before you make any decisions, do a proper comparison. Not a gut-feel comparison — a systematic one.
      </p>
      <p>
        Open your website and your competitor&apos;s side by side on your phone. Ask yourself:
      </p>
      <ul>
        <li>Which one loads faster?</li>
        <li>Which one is easier to navigate?</li>
        <li>Which one makes the phone number easier to find?</li>
        <li>Which one looks more professional at a glance?</li>
        <li>Which one would a stranger trust more?</li>
      </ul>
      <p>
        Be honest. If the answer is consistently &quot;theirs,&quot; that&apos;s valuable information — not a reason to panic, but a reason to act.
      </p>

      <h2>The Window Is Still Open</h2>
      <p>
        Right now, your competitor has a head start, but not an insurmountable one. Most businesses in the Kootenays still have mediocre or outdated websites. The businesses that invest in a proper online presence in the next year or two will have a significant advantage over those who don&apos;t.
      </p>
      <p>
        The question isn&apos;t whether to do this. It&apos;s whether to do it now, while the gap is small — or later, when it&apos;s much harder to close.
      </p>
      <p>
        If you&apos;re not sure where to start, take a look at <Link href="/blog/website-first-impression" className="text-copper hover:underline font-medium">what your website is saying to visitors right now</Link> — and then let&apos;s talk about what to do about it.
      </p>
    </BlogArticle>
  );
}
