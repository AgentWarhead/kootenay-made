import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Tag } from 'lucide-react';

interface Props {
  title: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  children: React.ReactNode;
}

export default function BlogArticle({ title, date, readTime, category, image, children }: Props) {
  return (
    <div className="pt-20">
      {/* Hero image */}
      {image && (
        <div className="relative w-full h-[240px] sm:h-[340px] lg:h-[420px] bg-slate overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F4F0] via-transparent to-transparent" />
        </div>
      )}

      <article className="bg-cream py-12 sm:py-16">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-text-tertiary hover:text-copper text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1 bg-copper/10 text-copper text-xs font-medium px-2.5 py-1 rounded-full">
              <Tag size={12} />
              {category}
            </span>
            <span className="text-text-tertiary text-xs">{date}</span>
            <span className="text-text-tertiary text-xs flex items-center gap-1">
              <Clock size={12} />
              {readTime}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-satoshi)] text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate leading-tight mb-8">
            {title}
          </h1>

          <div className="prose-kmd">
            {children}
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-cream-border">
            <div className="bg-slate grain rounded-xl p-5 sm:p-8 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-[family-name:var(--font-satoshi)] text-xl font-bold text-cream mb-2">
                  Wondering how your website stacks up?
                </h3>
                <p className="text-dark-text-muted text-sm mb-5">
                  Our free 30-minute audit will give you honest answers — no sales pitch, no obligation.
                </p>
                <Link
                  href="/audit"
                  className="inline-flex items-center justify-center w-full sm:w-auto bg-copper hover:bg-copper-light text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
                >
                  Book Your Free Audit →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
