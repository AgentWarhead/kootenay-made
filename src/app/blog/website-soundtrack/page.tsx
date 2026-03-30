import BlogArticle from '@/components/BlogArticle';
import Link from 'next/link';

export const metadata = {
  title: 'We Added a Soundtrack to Our Website. Here\'s Why. — Kootenay Made Digital',
  description: 'We made a design choice that most web designers would never consider. Here\'s the thinking behind it and what it says about how we approach building for the Kootenays.',
};

export default function Article() {
  return (
    <BlogArticle
      title="We Added a Soundtrack to Our Website. Here's Why."
      date="March 30, 2026"
      readTime="6 min read"
      category="Our Story"
      image="/images/blog/website-soundtrack.jpg"
    >
      <p>
        Most web designers would tell you that adding sound to a website is a terrible idea. Users hate unexpected audio. Autoplay is annoying. It slows loading times. It&apos;s an accessibility nightmare. &quot;Never do this,&quot; says every web design best practice guide ever written.
      </p>
      <p>
        We added a soundtrack to our website anyway. Here&apos;s why — and what it tells you about how we think about building websites for Kootenay businesses.
      </p>

      <h2>The Problem We Were Trying to Solve</h2>
      <p>
        Most web design agency websites look exactly alike. Clean sans-serif fonts. Floating cards. Soft gradients. Portfolio grids. A &quot;Let&apos;s Work Together&quot; call to action. They&apos;re professional. They&apos;re competent. And they&apos;re completely interchangeable.
      </p>
      <p>
        If you closed your eyes and opened five different web design agency websites, you&apos;d struggle to tell them apart. The same stock photos. The same vague language about &quot;crafting digital experiences.&quot; The same forgettable everything.
      </p>
      <p>
        We&apos;re based in the Kootenays. We&apos;re not a faceless agency. We&apos;re people who live here, know the mountains, know the rivers, know the specific texture of life in small towns between Nelson and Trail. The website needed to feel like that — not like a template built for a business park in a major city.
      </p>
      <p>
        So we asked: what does the Kootenays sound like?
      </p>

      <h2>What the Kootenays Actually Sound Like</h2>
      <p>
        If you&apos;ve sat by the Slocan River on a summer evening, you know. Wind through the pines. Water moving over rocks. A kind of quiet that cities don&apos;t have. The Kootenays have a specific sonic identity — unhurried, natural, a little wild, deeply peaceful.
      </p>
      <p>
        That&apos;s what we wanted the website to feel like. Not just look like — feel like. Because websites are sensory experiences, not just visual ones. And we weren&apos;t using sound the way a bad website uses it — blasting autoplay music the moment you land on the page. We were offering it: a small ambient toggle, completely optional, that layers in the sounds of the landscape if you want them.
      </p>
      <p>
        The difference between aggressive autoplay and an optional ambient layer is the difference between someone blasting music at you at a bus stop versus a coffee shop where music is playing softly in the background if you notice it.
      </p>

      <h2>The Design Principle Behind It</h2>
      <p>
        We believe websites should feel like something. Not just look professional — actually create a feeling.
      </p>
      <p>
        Every element on a website communicates something. Colour creates emotion. Typography creates personality. Speed creates confidence or frustration. And yes, ambient sound — offered thoughtfully — can deepen a sense of place in a way nothing else can.
      </p>
      <p>
        We build websites for Kootenay businesses. Our clients are kayak guides, mountain lodge owners, craft bakeries, artisan studios, outdoor gear shops, restaurants on Baker Street. These businesses have a <em>feel</em> that generic websites can&apos;t capture.
      </p>
      <p>
        Our own website is a proof of concept: yes, you can build something that looks beautiful <em>and</em> feels distinctly local <em>and</em> loads fast <em>and</em> ranks well in search. You don&apos;t have to choose between character and function.
      </p>

      <h2>What the Response Has Been</h2>
      <p>
        People notice it. That&apos;s the point. In a sea of identical agency websites, people remember ours. Not because the sound is intrusive — it&apos;s easy to ignore if you don&apos;t want it — but because it signals something about who we are and how we think.
      </p>
      <p>
        It communicates: we pay attention to details. We care about the experience of being on a website, not just the appearance of it. We&apos;re specifically rooted in this place, not generic digital workers who could be anywhere.
      </p>
      <p>
        And the clients who resonate with that approach are exactly the ones we want to work with.
      </p>

      <h2>The Broader Point</h2>
      <p>
        The reason we&apos;re writing about this isn&apos;t to convince everyone to add sound to their website. For most businesses, that&apos;s not the right move.
      </p>
      <p>
        The reason is to make a point about <em>distinctiveness</em>. The best websites for Kootenay businesses aren&apos;t the ones that look most like everyone else. They&apos;re the ones that feel most like the business itself — like you could close your eyes and know exactly whose website you were on.
      </p>
      <p>
        What makes your business feel like <em>your business</em>? What&apos;s the thing that a customer in your shop or on your trail or in your restaurant experiences that a generic website design never captures?
      </p>
      <p>
        That&apos;s the thing worth designing toward. That&apos;s the gap between a forgettable website and one that people actually remember.
      </p>
      <p>
        If you&apos;re curious about what a website built specifically for your business — not a template, not a generic agency design — actually looks like, take a look at our <Link href="/styles" className="text-copper hover:underline font-medium">Style Menu</Link> for a starting point. And if you want to talk through what would make your online presence feel genuinely like you, <Link href="/contact" className="text-copper hover:underline font-medium">reach out</Link>. That&apos;s our favourite conversation to have.
      </p>

      <h2>A Note on the Technical Side</h2>
      <p>
        For anyone curious: the ambient sound is implemented as an optional, user-triggered audio layer that has zero impact on page load speed (it only loads if you activate it), zero impact on mobile performance, and respects all accessibility considerations. The user controls it entirely. The toggle is clearly visible. It never autoplays.
      </p>
      <p>
        The design best practices about sound are still valid. We just found a way to honour the intent — respect for the user&apos;s experience — while still doing something no other agency in the Kootenays is doing.
      </p>
      <p>
        That gap between &quot;the rules say X&quot; and &quot;but what if you did X thoughtfully?&quot; is often where the most interesting design decisions live.
      </p>
    </BlogArticle>
  );
}
