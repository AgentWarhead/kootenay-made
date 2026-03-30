'use client';

interface RiverWaveProps {
  fillColor?: string;
  bgColor?: string;
  flip?: boolean;
  className?: string;
}

export default function RiverWave({ fillColor = '#F8F4F0', bgColor, flip = false, className = '' }: RiverWaveProps) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`} style={bgColor ? { backgroundColor: bgColor } : undefined} aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[30px] sm:h-[45px] md:h-[60px]">
        <path d="M0,30 C120,50 240,10 360,30 C480,50 600,10 720,30 C840,50 960,10 1080,30 C1200,50 1320,10 1440,30 L1440,60 L0,60 Z" fill={fillColor} />
      </svg>
    </div>
  );
}
