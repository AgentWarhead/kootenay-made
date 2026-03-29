export interface CaseStudy {
  slug: string;
  name: string;
  type: string;
  location: string;
  terrain: string;
  terrainColor: string;
  description: string;
  overview: string;
  whatWeBuilt: string;
  keyHighlight: string;
  features: string[];
  techStack: string[];
  liveUrl: string;
  heroImage: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'lapphund-designs',
    name: 'Lapphund Designs',
    type: 'E-Commerce (Shopify)',
    location: 'Kootenay Made',
    terrain: 'River Valley',
    terrainColor: '#4A90A4',
    description: 'Full Shopify e-commerce store for Finnish Lapphund themed products. Print-on-demand, ships worldwide. Biggest store in the Finnish Lapphund niche.',
    overview: 'Lapphund Designs is the world\'s largest online store dedicated to Finnish Lapphund themed products. From apparel to home goods, every item celebrates this beloved Arctic breed with original designs that ship worldwide via print-on-demand.',
    whatWeBuilt: 'We built a complete Shopify storefront with a custom theme tailored to the Finnish Lapphund community. The store features SEO-optimized product pages designed to rank for niche breed-specific keywords, automated email marketing through Klaviyo with welcome sequences and abandoned checkout recovery flows, and a mobile-responsive design that converts browsers into buyers. We also built a fun interactive quiz — "Which Lappy Are You?" — that drives engagement and email signups.',
    keyHighlight: 'The "Which Lappy Are You?" personality quiz became the store\'s top traffic driver. It matches visitors with a Finnish Lapphund archetype based on their personality, then recommends products tailored to their result. The quiz generates email signups at 3x the rate of traditional popups and has become a viral sharing tool within the Finnish Lapphund community.',
    features: ['Shopify storefront with custom theme', 'Automated email marketing (Klaviyo)', 'Welcome + abandoned checkout flows', 'SEO-optimized product pages', 'Mobile-responsive design', '"Which Lappy Are You?" personality quiz'],
    techStack: ['Shopify', 'Klaviyo', 'Custom Theme'],
    liveUrl: 'https://lapphunddesigns.com',
    heroImage: '/images/portfolio/lapphund-designs.png',
  },
  {
    slug: 'disclosure',
    name: 'Disclosure',
    type: 'Mobile App Landing Page',
    location: 'Kootenay Made',
    terrain: 'Night Sky',
    terrainColor: '#22C55E',
    description: 'Landing page for Disclosure — humanity\'s unofficial first contact manual. A mobile app preparing citizens for contact scenarios through 4 unique archetypes.',
    overview: 'Disclosure is humanity\'s unofficial first contact manual — a mobile app that prepares citizens for contact scenarios through four unique archetypes. The landing page needed to capture the cinematic, otherworldly tone of the app itself.',
    whatWeBuilt: 'We designed and built a landing page with a CRT terminal aesthetic that immerses visitors in the Disclosure universe from the first scroll. The cinematic scroll experience reveals the four contact archetypes through atmospheric animations and dark immersive design. The page was built mobile-first to mirror the React Native app experience, with Supabase powering the backend and RevenueCat handling subscriptions. Every interaction feels like you\'re interfacing with classified technology.',
    keyHighlight: 'The CRT terminal aesthetic sets this project apart. Custom scan-line overlays, phosphor text glow effects, and a retro-futuristic UI create the feeling of accessing a classified government terminal. The design language carries through from the landing page to the app itself, creating a seamless narrative experience that makes users feel like they\'re part of something bigger than a typical mobile app.',
    features: ['CRT terminal aesthetic', 'Archetype personality system', 'Cinematic scroll experience', 'Mobile-first React Native app', 'Dark immersive design'],
    techStack: ['React Native (Expo)', 'Supabase', 'RevenueCat', 'Next.js'],
    liveUrl: 'https://getdisclosure.app',
    heroImage: '/images/portfolio/disclosure.png',
  },
  {
    slug: 'generateideas',
    name: 'GenerateIdeas',
    type: 'SaaS Web Application',
    location: 'Kootenay Made',
    terrain: 'Alpine Meadow',
    terrainColor: '#F59E0B',
    description: 'AI-powered idea generation platform. The only dedicated idea generator on the market — web app with companion mobile app (SparkQuest).',
    overview: 'GenerateIdeas is the only dedicated AI-powered idea generation platform on the market. It helps entrepreneurs, creators, and teams go from blank page to validated concept with intelligent idea generation, refinement tools, and market validation features.',
    whatWeBuilt: 'We built a full-stack SaaS platform with an AI idea generation engine at its core. The web app features idea refinement tools that help users evolve raw concepts into actionable plans, market validation features that assess viability, and browser extensions that let users capture inspiration anywhere. We also developed SparkQuest, a companion React Native mobile app that delivers daily idea prompts and lets users build their idea portfolio on the go. The entire platform runs on Next.js with AI/ML powering the generation engine.',
    keyHighlight: 'The AI idea generation engine doesn\'t just spit out random suggestions — it understands context, industry trends, and user preferences to generate genuinely novel concepts. Users can feed in a problem space and receive structured ideas complete with target audience, revenue model suggestions, and competitive landscape notes. The refinement pipeline lets users iterate on ideas through multiple rounds of AI-assisted development.',
    features: ['AI idea generation engine', 'Idea refinement tools', 'Market validation features', 'Browser extensions', 'Companion mobile app (SparkQuest)'],
    techStack: ['Next.js', 'AI/ML', 'React Native'],
    liveUrl: 'https://generateideas.app',
    heroImage: '/images/portfolio/generateideas.png',
  },
  {
    slug: 'cleartoenter',
    name: 'Clear to Enter',
    type: 'Immigration Resource Platform',
    location: 'Kootenay Made',
    terrain: 'Trailhead',
    terrainColor: '#6366F1',
    description: 'Comprehensive Canadian immigration information platform. Express Entry draw tracker, program guides, and tools helping newcomers navigate the immigration system.',
    overview: 'Clear to Enter is a comprehensive Canadian immigration information platform that demystifies the Express Entry system. It provides real-time draw tracking, program comparison tools, and detailed guides to help newcomers navigate one of the world\'s most complex immigration systems.',
    whatWeBuilt: 'We built a data-rich Next.js platform deployed on Vercel with an automated data pipeline that pulls the latest Express Entry draw results as they\'re published. The platform features program comparison tools that help users understand which immigration pathway suits their profile, CRS score insights that break down how the scoring system works, and comprehensive guides covering everything from document preparation to post-landing steps. Every page is designed for clarity — turning dense government policy into accessible, actionable information.',
    keyHighlight: 'The real-time Express Entry draw tracker is the platform\'s cornerstone feature. An automated data pipeline monitors IRCC publications and updates draw results within hours of release. Users can view historical trends, filter by program category, and see how their CRS score stacks up against recent draws. The visualization tools turn raw government data into clear, interactive charts that help applicants make informed decisions about their immigration journey.',
    features: ['Real-time Express Entry draw tracking', 'Program comparison tools', 'CRS score insights', 'Comprehensive immigration guides', 'Automatic data updates'],
    techStack: ['Next.js', 'Vercel', 'Automated Data Pipeline'],
    liveUrl: 'https://cleartoenter.ca',
    heroImage: '/images/portfolio/cleartoenter.png',
  },
  {
    slug: 'kootenay-made',
    name: 'Kootenay Made Digital',
    type: 'Agency Portfolio (This Site)',
    location: 'Kootenay Made',
    terrain: 'The Summit',
    terrainColor: '#C17817',
    description: 'The site you\'re looking at right now. Our own portfolio — 16 industry-specific demo templates, interactive style explorer, Kootenay wilderness theme, and mountain-crafted design.',
    overview: 'This is the site you\'re on right now. Kootenay Made Digital is our own portfolio and agency platform — a showcase of what we can build, featuring 16 industry-specific demo templates, an interactive live redesign tool, and a design system inspired by the Kootenay wilderness.',
    whatWeBuilt: 'We built our own platform on Next.js 14 with Tailwind CSS and Framer Motion, creating a Kootenay wilderness design system with parallax mountain transitions, ambient forest orbs, fog effects, and cedar textures. The site features 16 industry demo templates that let potential clients see exactly what their site could look like, an interactive style explorer for live previewing design directions, and performance-optimized animations that keep everything smooth even on mobile. Every pixel reflects the mountains, forests, and rivers of the Kootenay region.',
    keyHighlight: 'The interactive live redesign tool lets visitors switch between design styles in real-time and see how their industry\'s template transforms. Rather than static mockups, potential clients get a hands-on experience — toggling between Bold & Modern, Warm & Natural, and other styles while watching colors, typography, layouts, and imagery shift instantly. It\'s the closest thing to a test drive for web design.',
    features: ['16 industry demo templates', 'Interactive live redesign tool', 'Kootenay wilderness design system', 'Parallax mountain transitions', 'Performance-optimized animations'],
    techStack: ['Next.js 14', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://kootenaymade.ca',
    heroImage: '/images/portfolio/kootenay-made.png',
  },
];
