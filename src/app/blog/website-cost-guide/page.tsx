import BlogArticle from '@/components/BlogArticle';
import Link from 'next/link';

export const metadata = {
  title: 'What Should a Website Cost? (And How to Know If You\'re Getting Ripped Off) — Kootenay Made Digital',
  description: 'Website quotes vary wildly. Here\'s what actually drives the cost, what\'s worth paying for, and the red flags to watch for when hiring a web designer.',
};

export default function Article() {
  return (
    <BlogArticle
      title="What Should a Website Cost? (And How to Know If You're Getting Ripped Off)"
      date="March 30, 2026"
      readTime="9 min read"
      category="Getting Started"
      image="/images/blog/website-cost-guide.jpg"
    >
      <p>
        Website quotes are notoriously all over the map. You could get three quotes for the same project and have the highest be ten times the lowest. So how do you know what&apos;s reasonable? And how do you know when someone is either undercharging in ways that will cost you later, or overcharging for things you don&apos;t actually need?
      </p>
      <p>
        This guide is going to give you a real framework for understanding website costs — without citing specific prices (because they vary too much by region, scope, and vendor), but giving you the tools to evaluate what you&apos;re being quoted.
      </p>

      <h2>Why Website Prices Vary So Wildly</h2>
      <p>
        Before anything else, it helps to understand why pricing is so inconsistent in this industry.
      </p>
      <p>
        Unlike plumbing or renovation work, there&apos;s no licensing, no materials cost, and no standard rate card for web design. Anyone can call themselves a web designer. The range of skill, experience, and tools is enormous — and so is the quality of the output.
      </p>
      <p>
        You might get a quote from:
      </p>
      <ul>
        <li>A 19-year-old doing side work who&apos;ll build you a Wix template for almost nothing</li>
        <li>A freelancer with 5 years of experience building custom sites</li>
        <li>A small local agency with a team</li>
        <li>A large agency that serves enterprise clients and is very much not the right fit for your bakery</li>
      </ul>
      <p>
        These are completely different products, even if the pitch sounds similar. &quot;We&apos;ll build you a website&quot; can mean wildly different things.
      </p>

      <h2>What You&apos;re Actually Paying For</h2>
      <p>
        Understanding cost starts with understanding what goes into a website. There are a few distinct components, and not all quotes include all of them.
      </p>

      <h3>Design</h3>
      <p>
        The visual look and feel — colours, fonts, layout, how it all comes together into something that feels like your brand. Good design takes time and skill. Generic template slapping takes almost none.
      </p>

      <h3>Development</h3>
      <p>
        Writing the actual code that makes the site work. More complex functionality — booking systems, e-commerce, member portals, dynamic content — costs more to build. A simple brochure site costs less.
      </p>

      <h3>Content</h3>
      <p>
        The words on your site. Some web designers include copywriting in their scope; most don&apos;t. If you&apos;re providing all the content yourself, that reduces cost. If you need someone to write your pages for you, that adds cost — but it&apos;s often worth it, since good copy converts visitors into customers far better than awkward self-written descriptions.
      </p>

      <h3>Hosting and Maintenance</h3>
      <p>
        Where does the website actually live? Who updates the security software? Who fixes it if it breaks? Some builders include this in an ongoing monthly fee. Others hand you the keys and leave — meaning you&apos;re responsible for all of it. Neither model is inherently wrong, but you need to know which one you&apos;re signing up for.
      </p>

      <h3>SEO and Performance</h3>
      <p>
        Does the site come with proper page titles, descriptions, and structure that help Google find you? Is it built to load fast? These things make a real difference and aren&apos;t automatic — they need to be explicitly built in or you need to know to ask for them.
      </p>

      <h2>Red Flags That Should Give You Pause</h2>
      <p>
        These aren&apos;t automatic deal-breakers, but they warrant caution:
      </p>

      <h3>No Clear Process or Timeline</h3>
      <p>
        If someone can&apos;t tell you roughly how long a project will take and what the stages are, that&apos;s a sign they&apos;re winging it. A good designer can give you a clear process — discovery, design, build, review, launch — with realistic timeframes.
      </p>

      <h3>No Examples of Past Work</h3>
      <p>
        Every real web designer has a portfolio. If someone can&apos;t show you websites they&apos;ve built, either they&apos;re brand new (which might be fine, but should adjust your expectations) or they&apos;re not being honest about their experience.
      </p>

      <h3>Vague Scope</h3>
      <p>
        &quot;We&apos;ll build you a great website&quot; is not a scope. How many pages? What functionality? What&apos;s included and what&apos;s an add-on? Vague proposals lead to vague results and unexpected cost overruns.
      </p>

      <h3>Overpromising on SEO</h3>
      <p>
        Anyone who guarantees you &quot;#1 on Google&quot; is lying. No one can guarantee that. Good SEO is a process, not a switch. A web designer can build a strong SEO foundation — but ranking is earned over time, not installed.
      </p>

      <h3>Extreme Urgency</h3>
      <p>
        If someone is pressuring you to sign quickly before you&apos;ve had time to review the proposal carefully, that&apos;s a sales tactic. Good designers have enough confidence in their work that they don&apos;t need to pressure you.
      </p>

      <h2>What Signals a Quote Is Actually Fair</h2>
      <p>
        Here&apos;s what you want to see in a trustworthy quote:
      </p>
      <ul>
        <li><strong>Clear scope:</strong> specific number of pages, specific features, specific deliverables</li>
        <li><strong>Clear process:</strong> what happens when, what they need from you, and when</li>
        <li><strong>Portfolio examples:</strong> work that demonstrates they can actually do what they&apos;re proposing</li>
        <li><strong>Transparency on ownership:</strong> who owns the site after it&apos;s built? (Answer: you should.)</li>
        <li><strong>Transparency on ongoing costs:</strong> hosting, maintenance, updates — spelled out, not hidden</li>
        <li><strong>A revision policy:</strong> how many rounds of changes are included? What happens if you want more?</li>
      </ul>

      <h2>The Cheapest Option Is Almost Never the Cheapest</h2>
      <p>
        This is the most important thing in this whole article. A website that&apos;s slow, poorly built, impossible to update, or built on a platform that traps your content — will cost you far more over time than a more expensive well-built one.
      </p>
      <p>
        The cheapest websites need to be completely rebuilt in 2-3 years. They don&apos;t show up on Google. They break when you try to update them. They don&apos;t work on phones. And you end up paying twice — once for the cheap site, and again for the proper one you should have built first.
      </p>
      <p>
        Buying quality once is almost always cheaper than buying cheap twice.
      </p>

      <h2>How to Have This Conversation With Confidence</h2>
      <p>
        When you&apos;re getting quotes, don&apos;t just ask for a price. Ask:
      </p>
      <ul>
        <li>What&apos;s included in this quote, and what&apos;s not?</li>
        <li>What platform will you build it on, and will I own it fully?</li>
        <li>What happens if I need changes after launch?</li>
        <li>What are my ongoing costs once the site is live?</li>
        <li>Can you show me examples of similar sites you&apos;ve built?</li>
        <li>How long will the project take, and what do you need from me?</li>
      </ul>
      <p>
        A designer who gets defensive or vague about any of these questions is showing you exactly who they are.
      </p>
      <p>
        To understand more about what the process actually looks like, read <Link href="/blog/what-to-expect-web-designer" className="text-copper hover:underline font-medium">What to Expect When Working with a Web Designer</Link> — it walks through the whole thing from first conversation to launch day.
      </p>

      <div className="not-prose my-8 p-6 bg-copper/10 border border-copper/20 rounded-xl">
        <p className="text-slate font-semibold mb-2">Want a straight answer on what your project might cost?</p>
        <p className="text-text-secondary text-sm mb-4">Let&apos;s have a quick conversation. We&apos;ll listen to what you need and give you a real number — no strings, no pressure.</p>
        <Link href="/contact" className="inline-block bg-copper text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-copper-light transition-colors">Talk to Us →</Link>
      </div>
    </BlogArticle>
  );
}
