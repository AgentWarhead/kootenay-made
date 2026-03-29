import { notFound } from 'next/navigation';
import { caseStudies } from '../data';
import CaseStudyClient from './CaseStudyClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug);
  if (!study) return {};
  return {
    title: `${study.name} — Portfolio | Kootenay Made Digital`,
    description: study.description,
    openGraph: {
      title: `${study.name} — Portfolio | Kootenay Made Digital`,
      description: study.description,
      url: `https://kootenaymade.ca/portfolio/${study.slug}`,
      type: 'article',
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug);
  if (!study) notFound();
  return <CaseStudyClient study={study} />;
}
// Build: 20260329222108
