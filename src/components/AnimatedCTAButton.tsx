'use client';

import { ReactNode } from 'react';

interface AnimatedCTAButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function AnimatedCTAButton({ children, className = '', href, onClick, type = 'button', disabled = false }: AnimatedCTAButtonProps) {
  const inner = (
    <span className={`relative inline-flex items-center justify-center rounded-lg ${className}`}>
      {/* Rotating gradient border */}
      <span className="absolute inset-0 rounded-lg animated-gradient-border" />
      {/* Inner content */}
      <span className="relative z-10 m-[2px] rounded-[6px] bg-copper hover:bg-copper-light transition-colors duration-200 text-white font-medium inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </span>
  );

  if (href) {
    return <a href={href}>{inner}</a>;
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}
