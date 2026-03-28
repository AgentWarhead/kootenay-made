export interface CaseStudy {
  slug: string;
  name: string;
  type: string;
  location: string;
  style: string;
  styleColor: string;
  description: string;
  challenge: string;
  approach: string;
  result: string;
  testimonial: { quote: string; author: string; role: string };
  features: string[];
  beforeState: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'summit-plumbing',
    name: 'Summit Plumbing & Heating',
    type: 'Trades',
    location: 'Trail, BC',
    style: 'Bold & Modern',
    styleColor: '#C17817',
    description: 'A complete digital overhaul for Trail\'s most trusted plumbing company — from a dated DIY site to a lead-generating machine.',
    challenge: 'Summit Plumbing had been Trail\'s go-to for 15 years, but their website told a different story. Built on a free website builder in 2016, it was slow, not mobile-friendly, and buried on page 3 of Google. They were losing emergency calls to competitors with better online presence — despite doing superior work. Owner Dave Kowalski knew he needed a change but didn\'t know where to start.',
    approach: 'We chose the Bold & Modern style — strong colors, confident typography, and a dark background that makes Summit\'s copper brand color pop. The site was built mobile-first (78% of their traffic comes from phones — people searching "emergency plumber near me" at 2am). We added a prominent click-to-call button, online booking integration, and a service area map covering Trail, Rossland, and Warfield. Every page was optimized for local SEO with structured data markup.',
    result: 'Within 6 weeks of launch, Summit saw a 340% increase in website contact form submissions. Their Google Business Profile views doubled after we connected the new site with proper local SEO. The emergency call button alone generates 15-20 calls per month. Dave\'s exact words: "I\'ve gotten more leads in two months than I did all last year."',
    testimonial: { quote: 'I put off updating my website for years because I thought it would be a nightmare. Kootenay Made made it painless. The new site looks incredible and it\'s actually bringing in work. Best investment I\'ve made for the business.', author: 'Dave Kowalski', role: 'Owner, Summit Plumbing & Heating' },
    features: ['Mobile-first responsive design', 'Click-to-call emergency button', 'Online booking integration', 'Service area map', 'Google Business Profile optimization', 'Before/after project gallery'],
    beforeState: 'Outdated free website builder site from 2016. No mobile optimization, slow load times (8+ seconds), no contact form, buried on page 3 of Google. Zero online leads.'
  },
  {
    slug: 'mountain-flow-yoga',
    name: 'Mountain Flow Yoga',
    type: 'Wellness Studio',
    location: 'Nelson, BC',
    style: 'Warm & Natural',
    styleColor: '#2D6A4F',
    description: 'A calming, nature-inspired digital home for Nelson\'s beloved community yoga studio.',
    challenge: 'Mountain Flow Yoga had built a loyal community through word-of-mouth, but owner Sarah Chen was turning away potential students because her class schedule lived on a printed flyer taped to the studio door. She had an Instagram page but no website — and was managing bookings through text messages and a paper sign-up sheet. She needed a digital presence that felt as peaceful as her studio.',
    approach: 'The Warm & Natural style was a perfect fit — earth tones, organic shapes, soft gradients, and calming whitespace that mirrors the feeling of walking into the studio. We built an integrated class schedule with real-time availability, online booking with automatic confirmation emails, and a teacher profiles section. The design uses sage green, warm cream, and natural textures. We also set up a simple email list to announce workshops and retreats.',
    result: 'Online bookings replaced the paper sign-up sheet within the first week. Class attendance increased 28% as new students discovered Mountain Flow through Google. Sarah now fills her weekend workshops 3 weeks in advance through the website. The email list grew to 400+ subscribers in 3 months — all local Nelson residents.',
    testimonial: { quote: 'The website feels exactly like my studio — warm, welcoming, and grounded. My students love being able to book online, and I\'ve stopped losing track of who\'s coming to which class. It\'s given me my evenings back.', author: 'Sarah Chen', role: 'Owner & Lead Instructor, Mountain Flow Yoga' },
    features: ['Online class booking system', 'Real-time schedule with availability', 'Teacher profiles & bios', 'Workshop event pages', 'Email list integration', 'Responsive mobile design'],
    beforeState: 'No website at all — only an Instagram page and paper sign-up sheets. Class schedule was a printed flyer. Booking managed via text messages. No way for new students to discover or book classes online.'
  },
  {
    slug: 'kootenay-kitchen',
    name: 'Kootenay Kitchen',
    type: 'Farm-to-Table Restaurant',
    location: 'Castlegar, BC',
    style: 'Rustic Craft',
    styleColor: '#9E6012',
    description: 'A handcrafted digital experience for a restaurant that takes the same care with its food as we do with design.',
    challenge: 'Kootenay Kitchen had earned a reputation for incredible farm-to-table dining, but their online presence was a basic Facebook page with outdated hours and a PDF menu that hadn\'t been updated in 6 months. They were losing tourist traffic to restaurants with better websites and online reservation systems. Chef and co-owner Maria Santos wanted something that communicated the craft and care behind every dish.',
    approach: 'We went with Rustic Craft — textured backgrounds, warm earth tones, and handwritten accent fonts that echo the restaurant\'s chalkboard menu aesthetic. The site features a seasonal menu that Maria can update herself through a simple admin panel, online reservations through a clean booking widget, and a "Farm Partners" page highlighting their local suppliers (which tourists love). Professional food photography was styled to feel natural, not corporate.',
    result: 'Online reservations now account for 60% of all bookings — up from zero. The "Farm Partners" page became unexpectedly popular, earning links from BC food blogs and a feature in a Kootenay tourism guide. Weekend reservations are now consistently full 4-5 days in advance. Google searches for "best restaurant Castlegar" now surface Kootenay Kitchen in the top 3.',
    testimonial: { quote: 'Our food tells a story, and now our website does too. The design captures exactly what we\'re about — local, crafted, and genuine. We\'ve had customers tell us they drove from Kelowna specifically because of the website.', author: 'Maria Santos', role: 'Chef & Co-Owner, Kootenay Kitchen' },
    features: ['Easy-update seasonal menu', 'Online reservation system', 'Farm Partners showcase page', 'Professional food photography styling', 'Google Maps integration', 'Event & private dining pages'],
    beforeState: 'Only a Facebook page with incorrect hours. PDF menu 6 months out of date. No reservation system — phone only. Losing tourist traffic to competitors with proper websites.'
  },
  {
    slug: 'powder-highway-adventures',
    name: 'Powder Highway Adventures',
    type: 'Tourism & Ski Guiding',
    location: 'Rossland, BC',
    style: 'Adventure & Outdoors',
    styleColor: '#4A90A4',
    description: 'A bold, adventure-ready website for the Powder Highway\'s premier backcountry ski guiding company.',
    challenge: 'Powder Highway Adventures had been running backcountry ski tours for 8 years with nothing but a Craigslist ad and word-of-mouth referrals. Owner and lead guide Jake Morrison was leaving money on the table — international ski tourists were booking competitors who showed up first on Google. He needed a site that conveyed professionalism and safety while capturing the raw thrill of backcountry skiing in the Rossland range.',
    approach: 'Adventure & Outdoors was the obvious choice — big hero imagery, dynamic layouts, bold condensed typography, and a color palette inspired by mountain skies and snow. The site features detailed tour packages with pricing, difficulty ratings, and what\'s-included breakdowns. We built a guide profiles section highlighting certifications and experience (critical for trust in adventure tourism), a conditions/weather widget, and integrated a booking system with deposit payment. SEO was targeted at high-intent keywords like "backcountry skiing Rossland" and "Powder Highway guided tours."',
    result: 'Bookings from the website exceeded all other channels combined within the first ski season. International visitors (US, Australia, Europe) now account for 35% of bookings — up from near zero. The site ranks #1 for "backcountry ski guide Rossland" and top 3 for "Powder Highway tours." Revenue increased 180% year-over-year. Jake had to hire two additional guides to meet demand.',
    testimonial: { quote: 'I went from a Craigslist ad to the top of Google. The website pays for itself every single week during ski season. I had clients from Switzerland tell me they booked because the site looked professional and trustworthy. That\'s everything in this business.', author: 'Jake Morrison', role: 'Owner & Lead Guide, Powder Highway Adventures' },
    features: ['Detailed tour packages with booking', 'Guide profiles with certifications', 'Conditions & weather widget', 'Online deposit payments', 'Photo & video gallery', 'International SEO optimization'],
    beforeState: 'No website — only a Craigslist ad and word-of-mouth. No way for international tourists to discover or book tours. Zero online presence despite operating for 8 years.'
  }
];
