'use client';

interface FogTransitionProps {
  from?: 'dark' | 'light';
  className?: string;
}

export default function FogTransition({ from = 'dark', className = '' }: FogTransitionProps) {
  const color = from === 'dark' ? 'rgba(26, 29, 32, 0.4)' : 'rgba(248, 244, 240, 0.4)';

  return (
    <div
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
      style={{
        height: '80px',
        background: `linear-gradient(to bottom, ${color} 0%, transparent 100%)`,
      }}
    />
  );
}
