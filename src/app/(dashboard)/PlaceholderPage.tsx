import { Construction } from 'lucide-react';

interface Props {
  title: string;
  emoji: string;
  description: string;
}

export default function PlaceholderPage({ title, emoji, description }: Props) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      style={{ fontFamily: 'var(--font-general)' }}
    >
      <div className="text-5xl mb-4">{emoji}</div>
      <h1
        className="text-3xl font-bold mb-3"
        style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
      >
        {title}
      </h1>
      <p className="text-base mb-6 max-w-sm" style={{ color: 'var(--color-dash-text-muted)' }}>
        {description}
      </p>
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
        style={{
          backgroundColor: 'var(--color-dash-copper-muted)',
          color: 'var(--color-dash-copper)',
        }}
      >
        <Construction className="w-4 h-4" />
        Coming soon
      </div>
    </div>
  );
}
