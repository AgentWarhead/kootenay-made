import BlogArticle from '@/components/BlogArticle';
import Link from 'next/link';

export const metadata = {
  title: 'What Actually Happens When Someone Googles Your Business Name — Kootenay Made Digital',
  description: 'Ever wonder what potential customers actually see when they Google you? Here\'s a step-by-step walk through the full customer journey from search to contact.',
};

export default function Article() {
  return (
    <BlogArticle
      title="What Actually Happens When Someone Googles Your Business Name"
      date="March 30, 2026"
      readTime="7 min read"
      category="Growth & SEO"
      image="/images/blog/what-google-sees.jpg"
    >
      <p>
        You know your business. You know your work is good. But do you know what someone experiences when they type your business name into Google for the first time?
      </p>
      <p>
        Let&apos;s walk through it — step by step — because the journey from &quot;curious stranger&quot; to &quot;paying customer&quot; has more friction points than most business owners realize.
      </p>

      <h2>Step 1: The Search Results Page</h2>
      <p>
        When someone searches your business name, Google shows them a results page. What appears on that page varies, but typically includes some combination of:
      </p>
      <ul>
        <li>Your Google Business Profile (the panel on the right side of desktop, or top of mobile)</li>
        <li>Your website in the organic results</li>
        <li>Your social media profiles</li>
        <li>Review sites that have listed your business</li>
        <li>News articles or directory listings mentioning you</li>
      </ul>
      <p>
        The first question: what does this picture look like for your business right now? Search your own name in a private browser window and see what you get.
      </p>
      <p>
        Does your Google Business Profile show up with accurate hours, photos, and recent reviews? Is your website in the top results? Or is the first thing people see a half-finished directory listing with wrong hours and no photos?
      </p>

      <h2>Step 2: The Knowledge Panel (Your Google Business Profile)</h2>
      <p>
        For most local businesses, the most important element on that search results page is your Google Business Profile — the box that shows your name, hours, phone number, address, photos, and reviews.
      </p>
      <p>
        This is often the first thing someone interacts with. They scan the photo, check the hours, glance at the star rating. And they make a quick judgment — before they&apos;ve visited your website, before they&apos;ve read a single word you&apos;ve written.
      </p>
      <p>
        Some of the questions running through their mind:
      </p>
      <ul>
        <li>Are they open right now?</li>
        <li>What do other people think of them? (reviews)</li>
        <li>Does the place look legitimate? (photos)</li>
        <li>Can I call them easily?</li>
      </ul>
      <p>
        If your Knowledge Panel is missing, incomplete, or hasn&apos;t been updated since you set it up years ago — you&apos;re failing this critical first filter. Read our guide to <Link href="/blog/google-business-profile" className="text-copper hover:underline font-medium">Google Business Profile optimization</Link> if you need to fix this.
      </p>

      <h2>Step 3: The Click to Your Website</h2>
      <p>
        Many people who see a solid Knowledge Panel will also click through to your website — especially if they&apos;re doing research before making a decision, or if they want more detail about your services.
      </p>
      <p>
        The moment they land on your homepage is the moment your website either wins them or loses them. We&apos;ve written at length about <Link href="/blog/website-first-impression" className="text-copper hover:underline font-medium">how first impressions form in milliseconds</Link>. The short version: load speed, visual quality, and how clearly you communicate what you do all determine whether they stay or leave.
      </p>

      <h2>Step 4: What They&apos;re Looking For on Your Site</h2>
      <p>
        When someone clicks to your website, they typically want to answer a few specific questions:
      </p>

      <h3>Do you offer what I need?</h3>
      <p>
        A clear, easy-to-find services page is essential. Don&apos;t make people hunt for what you do. List your services, explain them briefly, and make it obvious whether you&apos;re the right fit.
      </p>

      <h3>Are you near me?</h3>
      <p>
        Location should be clear on your homepage — not buried in a contact page. &quot;Serving Nelson, Castlegar, and the West Kootenays&quot; tells people immediately whether they&apos;re in your service area.
      </p>

      <h3>Can I trust you?</h3>
      <p>
        Reviews, testimonials, years in business, real photos of your work and team — all of these contribute to trust. A business that looks active, real, and reviewed is far more trustworthy than one with a generic stock photo and no social proof.
      </p>

      <h3>How do I contact you?</h3>
      <p>
        This should be impossible to miss. A click-to-call phone number in the header. A contact page that&apos;s one click away. A form that actually works on mobile. If getting in touch requires a scavenger hunt, many people will give up before they find it.
      </p>

      <h2>Step 5: The Decision</h2>
      <p>
        At this point, they&apos;ve formed an impression of your business based entirely on what they found online. They haven&apos;t met you. They haven&apos;t experienced your service. They&apos;ve just seen your digital presence.
      </p>
      <p>
        If that presence is strong — accurate, professional, responsive, with real photos and reviews — most people who were genuinely looking for what you offer will reach out.
      </p>
      <p>
        If it&apos;s weak — outdated, incomplete, hard to navigate, or just absent — a significant portion of potential customers will move on to someone who looks more put-together. Not because the other business is better at what they do. But because they appeared more trustworthy, more organized, more present.
      </p>

      <h2>The Invisible Audit You Should Do Right Now</h2>
      <p>
        Here&apos;s a useful exercise: go through this whole journey yourself, as if you were a potential customer who doesn&apos;t know you. Search your business name. Look at the results page. Click your Google Business Profile. Visit your website. Try to contact you.
      </p>
      <p>
        Then ask: would I hire this business based on what I just saw?
      </p>
      <p>
        Most business owners are surprised by at least something they find. A photo from five years ago. Hours that haven&apos;t been updated. A mobile website that&apos;s embarrassingly hard to use. A contact form that doesn&apos;t send anywhere.
      </p>
      <p>
        The good news is that every problem you find is fixable. Usually quickly and without a huge investment.
      </p>

      <div className="not-prose my-8 p-6 bg-copper/10 border border-copper/20 rounded-xl">
        <p className="text-slate font-semibold mb-2">Want someone else to run this audit for you?</p>
        <p className="text-text-secondary text-sm mb-4">We&apos;ll look at your whole digital presence with fresh eyes and give you a prioritized list of what to fix. It&apos;s free and takes 30 minutes.</p>
        <Link href="/audit" className="inline-block bg-copper text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-copper-light transition-colors">Book a Free Audit →</Link>
      </div>

      <h2>The Bottom Line</h2>
      <p>
        Every day, people are Googling your business — and making decisions about whether to contact you based on what they find. That journey happens without you in the room. You can&apos;t answer their questions in real time. You can&apos;t show them your work in person. All you can do is make sure your digital presence is strong enough to convert that curiosity into a conversation.
      </p>
      <p>
        Knowing what they see is the first step. Improving it is the next one.
      </p>
    </BlogArticle>
  );
}
