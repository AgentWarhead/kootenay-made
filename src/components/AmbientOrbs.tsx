'use client';

export default function AmbientOrbs({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* Forest green orb */}
      <div className="absolute top-[10%] left-[15%] w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full bg-forest/[0.15] blur-3xl animate-orb-drift-1 max-sm:hidden" />
      {/* Copper orb */}
      <div className="absolute top-[50%] right-[10%] w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full bg-copper/[0.1] blur-3xl animate-orb-drift-2 max-sm:hidden" />
      {/* River blue orb */}
      <div className="absolute bottom-[20%] left-[40%] w-[150px] h-[150px] md:w-[180px] md:h-[180px] rounded-full bg-river/[0.08] blur-3xl animate-orb-pulse max-sm:hidden" />
    </div>
  );
}
