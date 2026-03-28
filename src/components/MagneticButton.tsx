'use client';

import { useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = '', as = 'button', href, onClick }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState('translate(0, 0)');

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setTransform(`translate(${x}px, ${y}px)`);
  };

  const handleLeave = () => setTransform('translate(0, 0)');

  const props = {
    ref: ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>,
    className: `inline-block transition-transform duration-200 ${className}`,
    style: { transform },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
  };

  if (as === 'a' && href) {
    return <a href={href} {...props}>{children}</a>;
  }
  return <button {...props}>{children}</button>;
}
