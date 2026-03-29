'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from 'react';
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext';

interface BalancedTextProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * BalancedText uses Pretext to find the optimal max-width that eliminates
 * orphaned single words on the last line, producing visually balanced text.
 */
export default function BalancedText({
  as: Tag = 'span',
  children,
  className,
  style,
}: BalancedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [balancedWidth, setBalancedWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function rebalance() {
      if (!el) return;
      const text = el.textContent || '';
      if (!text.trim() || text.length < 10) {
        setBalancedWidth(null);
        return;
      }

      try {
        // Get computed font from element
        const computed = getComputedStyle(el);
        const font = `${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
        const containerWidth = el.parentElement?.clientWidth || el.clientWidth;

        if (containerWidth <= 0) return;

        const prepared = prepareWithSegments(text, font);

        // First measure with full container width
        let fullLineCount = 0;
        walkLineRanges(prepared, containerWidth, () => {
          fullLineCount++;
        });

        // If only 1 line, no balancing needed
        if (fullLineCount <= 1) {
          setBalancedWidth(null);
          return;
        }

        // Binary search for the narrowest width that keeps the same line count
        let lo = containerWidth * 0.5;
        let hi = containerWidth;
        let bestWidth = containerWidth;

        for (let iter = 0; iter < 16; iter++) {
          const mid = (lo + hi) / 2;
          let lineCount = 0;
          let lastLineWidth = 0;
          walkLineRanges(prepared, mid, (line) => {
            lineCount++;
            lastLineWidth = line.width;
          });

          if (lineCount <= fullLineCount) {
            // This width keeps the same line count — try narrower
            bestWidth = mid;

            // Check balance: last line should be at least 33% of width
            const ratio = lastLineWidth / mid;
            if (ratio >= 0.33) {
              hi = mid;
            } else {
              // Last line too short at this width, widen a bit
              lo = mid;
            }
          } else {
            // Too narrow — causes extra line break
            lo = mid;
          }
        }

        // Only apply if meaningfully different from container
        if (bestWidth < containerWidth * 0.98) {
          setBalancedWidth(Math.ceil(bestWidth));
        } else {
          setBalancedWidth(null);
        }
      } catch {
        setBalancedWidth(null);
      }
    }

    // Initial balance
    rebalance();

    // Re-balance on resize
    const observer = new ResizeObserver(() => {
      rebalance();
    });

    if (el.parentElement) {
      observer.observe(el.parentElement);
    }
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [children]);

  const mergedStyle: CSSProperties = {
    ...style,
    ...(balancedWidth ? { maxWidth: `${balancedWidth}px` } : {}),
  };

  return (
    <Tag ref={ref} className={className} style={mergedStyle}>
      {children}
    </Tag>
  );
}
