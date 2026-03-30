'use client';

export default function CopperRule({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center py-6 ${className}`} aria-hidden="true">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-copper/20 to-copper/20" />
      <div className="mx-4 w-2 h-2 rotate-45 bg-copper/30" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-copper/20 to-copper/20" />
    </div>
  );
}
