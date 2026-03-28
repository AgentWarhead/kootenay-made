import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
  dark?: boolean;
}

export default function Breadcrumb({ items, dark }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm flex-wrap">
        <li>
          <Link href="/" className={`transition-colors ${dark ? 'text-dark-text-muted hover:text-cream' : 'text-text-tertiary hover:text-copper'}`}>
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight size={14} className={dark ? 'text-dark-text-muted/50' : 'text-text-tertiary/50'} />
            {item.href ? (
              <Link href={item.href} className={`transition-colors ${dark ? 'text-dark-text-muted hover:text-cream' : 'text-text-tertiary hover:text-copper'}`}>
                {item.label}
              </Link>
            ) : (
              <span className={dark ? 'text-cream/70' : 'text-text-secondary'}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
