import { notFound } from 'next/navigation';
import { caseStudies } from '../data';
import CaseStudyClient from './CaseStudyClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
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

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();
  return <CaseStudyClient study={study} />;
}
