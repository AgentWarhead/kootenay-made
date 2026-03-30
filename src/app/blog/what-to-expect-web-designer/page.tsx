import BlogArticle from '@/components/BlogArticle';

export const metadata = {
  title: 'What to Expect When Working with a Web Designer (No Jargon Edition) — Kootenay Made Digital',
  description: 'Never hired a web designer? Here\'s the full process explained in plain English.',
};

export default function Article() {
  return (
    <BlogArticle
      title="What to Expect When Working with a Web Designer (No Jargon Edition)"
      date="March 28, 2026"
      readTime="5 min read"
      category="Getting Started"
      image="/images/blog/web-designer.png"
    >
      <p>
        If you&apos;ve never worked with a web designer before, the whole thing can feel a bit mysterious. What happens after you say yes? How long does it take? What do you need to provide? What if you don&apos;t know what you want?
      </p>
      <p>
        Here&apos;s the full process, explained in plain English — no jargon, no tech speak, no acronyms. Just what actually happens from start to finish.
      </p>

      <h2>Step 1: The First Conversation</h2>
      <p>
        This is a casual chat — usually 30 minutes over a video call or a coffee at a local spot. We ask about your business, your customers, what&apos;s working, and what frustrates you about your current online presence. You don&apos;t need to have all the answers. That&apos;s our job.
      </p>
      <p>
        The goal is simple: understand your business well enough to recommend the right approach. Sometimes that&apos;s a full website. Sometimes it&apos;s a quick fix to what you already have. Sometimes it&apos;s setting up your Google Business Profile first and worrying about the website later. Honest advice, not a sales pitch.
      </p>

      <h2>Step 2: The Proposal</h2>
      <p>
        After our conversation, we put together a clear proposal. It includes what we&apos;ll build, how long it&apos;ll take, and what it costs. No hidden fees, no surprise add-ons, no vague &quot;starting from&quot; pricing. A real number you can budget around.
      </p>
      <p>
        You&apos;ll also see a rough timeline — most projects take 2-4 weeks from kickoff to launch. We&apos;ll tell you exactly what we need from you (spoiler: it&apos;s not much) and when we&apos;ll need it.
      </p>

      <h2>Step 3: The Design Phase</h2>
      <p>
        This is where the creative work happens. We start by choosing a design direction — colors, fonts, layout style, overall vibe. If you&apos;ve browsed our <a href="/styles">Style Menu</a>, you might already have a feel for what you like. If not, we&apos;ll walk you through options until something clicks.
      </p>
      <p>
        We build out the homepage first and share it with you. This is your chance to react. Love it? We keep going. Want changes? We adjust. Hate the whole direction? We pivot. This stage is collaborative — your feedback genuinely shapes the outcome.
      </p>
      <p>
        <strong>What we need from you:</strong> Your logo (if you have one), any photos you want on the site, and the text/content for each page. Don&apos;t worry about perfecting the wording — we&apos;ll clean it up. Just get the ideas down.
      </p>

      <h2>Step 4: Building the Site</h2>
      <p>
        Once the design is approved, we build the real thing. This is where your site goes from a pretty picture to an actual working website. We handle all the technical parts — making it fast, mobile-friendly, search-engine-friendly, and accessible.
      </p>
      <p>
        You don&apos;t need to understand any of this. Just know that when we say &quot;it&apos;s fast,&quot; we mean your pages load in under a second. When we say &quot;mobile-friendly,&quot; we mean it looks just as good on a phone as on a computer. When we say &quot;accessible,&quot; we mean everyone can use it — including people using screen readers or keyboard navigation.
      </p>

      <h2>Step 5: Review and Revisions</h2>
      <p>
        Before anything goes live, you get to review the entire site. Click through every page, read every word, test every button. We&apos;ll walk you through it on a call if you prefer.
      </p>
      <p>
        Most projects include 2-3 rounds of revisions. That&apos;s industry standard and it&apos;s built into the price. A revision might be &quot;can we make this heading bigger?&quot; or &quot;can we swap these two sections?&quot; or &quot;I changed my mind about that photo.&quot; Totally normal. Expected, even.
      </p>

      <h2>Step 6: Launch Day</h2>
      <p>
        Once you&apos;re happy with everything, we flip the switch. Your new site goes live, replacing whatever was there before (or appearing for the first time if you didn&apos;t have one). We handle the domain connection, the SSL certificate (that&apos;s the padlock icon that means your site is secure), and make sure everything works perfectly.
      </p>
      <p>
        We also give you a quick walkthrough of how to make basic updates yourself — changing hours, adding a new photo, tweaking text. You&apos;ll never be stuck waiting on someone else for simple changes.
      </p>

      <h2>Step 7: After Launch</h2>
      <p>
        A good web designer doesn&apos;t disappear after launch day. We check in after a week to make sure everything&apos;s smooth. If something breaks or you need a quick adjustment, we&apos;re a phone call away.
      </p>
      <p>
        For ongoing support — regular updates, security monitoring, content changes, SEO improvements — that&apos;s what retainer plans are for. But there&apos;s no pressure to sign up for one. Some businesses need it. Others are perfectly fine on their own.
      </p>

      <h2>What You Don&apos;t Need to Worry About</h2>
      <p>
        You don&apos;t need to know anything about code, hosting, domains, DNS, SSL, SEO, responsive design, or any other acronym. That&apos;s literally what you&apos;re hiring someone for. Your job is to know your business and your customers. Our job is everything else.
      </p>
      <p>
        The best client-designer relationships work like any good partnership: clear communication, mutual respect, and a shared goal. You bring the expertise about your business. We bring the expertise about the digital side. Together, we build something you&apos;re proud to share.
      </p>
      <p>
        Curious what a website should actually cost? Read <a href="/blog/website-cost-guide">What Should a Website Cost?</a> so you can evaluate any quote with confidence. And if you&apos;re on the fence about whether you need one at all, start with <a href="/blog/do-you-need-website-2026">Do You Actually Need a Website in 2026?</a>
      </p>
      <p className="border-l-4 border-copper pl-4 my-6 text-text-secondary italic">
        The best first step? A free conversation. <a href="/contact" className="text-copper font-semibold not-italic hover:underline">Get in touch →</a> No pressure, no pitch — just an honest look at what would actually help your business.
      </p>
    </BlogArticle>
  );
}
