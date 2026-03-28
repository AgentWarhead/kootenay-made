'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-slate relative flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <div className="absolute inset-0">
        <Image
          src="/images/misc/404.png"
          alt="Lost in the mountains"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate via-slate/60 to-slate/40" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-8xl sm:text-9xl font-bold text-copper mb-4"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl font-bold text-cream mb-4"
        >
          Wrong turn on Highway 3.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-dark-text-muted text-lg mb-10 leading-relaxed"
        >
          Looks like you took a wrong turn on Highway 3. Don&apos;t worry — even the best trail runners miss a marker now and then. Let&apos;s get you back on trail.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft size={18} /> Back to Home Base
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-dark-text-muted/50 text-xs font-mono"
        >
          49.3°N, 117.7°W — You&apos;re closer to Castlegar than you think
        </motion.p>
      </div>
    </section>
  );
}
