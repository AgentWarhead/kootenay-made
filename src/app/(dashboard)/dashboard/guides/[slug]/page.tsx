import PlaceholderPage from '../../../PlaceholderPage';

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  return <PlaceholderPage title={`Guide: ${params.slug}`} emoji="📖" description="This guide is on its way." />;
}
