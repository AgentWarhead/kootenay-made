'use client';

interface GradientFadeProps {
  from?: string;
  to?: string;
  height?: string;
  className?: string;
}

export default function GradientFade({ from = '#1A1D20', to = '#1A1D20', height = '60px', className = '' }: GradientFadeProps) {
  return (
    <div 
      className={`w-full pointer-events-none ${className}`} 
      style={{ height, background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)` }}
      aria-hidden="true" 
    />
  );
}
