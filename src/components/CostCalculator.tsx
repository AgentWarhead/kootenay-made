'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, ShoppingBag, Mail, Bot, Palette, Search,
  ArrowRight, ArrowLeft, Check, MapPin,
} from 'lucide-react';
import Link from 'next/link';

type ServiceKey = 'website' | 'ecommerce' | 'email' | 'ai' | 'branding' | 'seo';
type Tier = 'starter' | 'standard' | 'premium';

interface ServiceOption {
  key: ServiceKey;
  label: string;
  icon: typeof Globe;
}

const SERVICES: ServiceOption[] = [
  { key: 'website', label: 'Website', icon: Globe },
  { key: 'ecommerce', label: 'E-Commerce', icon: ShoppingBag },
  { key: 'email', label: 'Email Marketing', icon: Mail },
  { key: 'ai', label: 'AI Setup', icon: Bot },
  { key: 'branding', label: 'Branding', icon: Palette },
  { key: 'seo', label: 'SEO / Google', icon: Search },
];

const PRICING: Record<ServiceKey, Record<Tier, [number, number]>> = {
  website:   { starter: [1500, 1500], standard: [2500, 2500], premium: [4000, 4000] },
  ecommerce: { starter: [3000, 3000], standard: [4500, 4500], premium: [6000, 6000] },
  email:     { starter: [750, 750],   standard: [1000, 1000], premium: [1500, 1500] },
  ai:        { starter: [1500, 1500], standard: [1500, 1500], premium: [1500, 1500] },
  branding:  { starter: [4000, 4000], standard: [6000, 6000], premium: [8000, 8000] },
  seo:       { starter: [500, 500],   standard: [500, 500],   premium: [500, 500] },
};

const TIERS: { key: Tier; label: string; desc: string }[] = [
  { key: 'starter', label: 'Starter', desc: 'Essential features to get started' },
  { key: 'standard', label: 'Standard', desc: 'Full-featured for growing businesses' },
  { key: 'premium', label: 'Premium', desc: 'Everything plus premium touches' },
];

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = display;
    const diff = value - start;
    if (diff === 0) return;

    const startTime = Date.now();
    const duration = 600;

    function tick() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{display.toLocaleString()}</>;
}

export default function CostCalculator() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Set<ServiceKey>>(new Set());
  const [tier, setTier] = useState<Tier>('standard');

  const toggleService = (key: ServiceKey) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const { low, high } = Array.from(selected).reduce(
    (acc, key) => {
      const [lo, hi] = PRICING[key][tier];
      return { low: acc.low + lo, high: acc.high + hi };
    },
    { low: 0, high: 0 }
  );

  // Sum across tiers for range display
  const rangeLow = Array.from(selected).reduce((sum, key) => sum + PRICING[key].starter[0], 0);
  const rangeHigh = Array.from(selected).reduce((sum, key) => sum + PRICING[key].premium[1], 0);

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 100 : -100, opacity: 0 }),
  };

  const [direction, setDirection] = useState(0);

  const goNext = () => {
    if (step === 0 && selected.size === 0) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, 2));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  return (
    <section className="bg-slate grain py-20 sm:py-24 relative overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-copper mb-3">
            <MapPin size={16} />
            <span className="font-medium text-sm tracking-wider uppercase">Map Your Trail</span>
          </div>
          <h2 className="font-[family-name:var(--font-satoshi)] text-2xl sm:text-3xl md:text-4xl font-bold text-cream">
            What does your project look like?
          </h2>
          <p className="mt-3 text-dark-text-muted text-base max-w-lg mx-auto">
            Select what you need and get a ballpark estimate in seconds.
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1, 2].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step ? 'w-8 bg-copper' : s < step ? 'w-4 bg-copper/50' : 'w-4 bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Steps */}
        <div className="relative min-h-[320px]">
          <AnimatePresence custom={direction} mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <p className="text-cream font-medium text-center mb-6">What do you need?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SERVICES.map(({ key, label, icon: Icon }) => {
                    const isSelected = selected.has(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggleService(key)}
                        className={`relative flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-200 min-h-[100px] ${
                          isSelected
                            ? 'border-copper bg-copper/10 text-copper'
                            : 'border-white/10 bg-white/5 text-dark-text-muted hover:border-white/20 hover:bg-white/8'
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2"
                          >
                            <Check size={14} className="text-copper" />
                          </motion.div>
                        )}
                        <Icon size={24} />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <p className="text-cream font-medium text-center mb-6">How big is the project?</p>
                <div className="space-y-3">
                  {TIERS.map(({ key, label, desc }) => (
                    <button
                      key={key}
                      onClick={() => setTier(key)}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-200 text-left ${
                        tier === key
                          ? 'border-copper bg-copper/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          tier === key ? 'border-copper' : 'border-white/30'
                        }`}
                      >
                        {tier === key && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2.5 h-2.5 rounded-full bg-copper"
                          />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${tier === key ? 'text-copper' : 'text-cream'}`}>{label}</p>
                        <p className="text-dark-text-muted text-sm">{desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p className="text-dark-text-muted text-sm mb-2">Your selected tier: {tier}</p>
                <div className="mb-6">
                  {Array.from(selected).map((key) => {
                    const svc = SERVICES.find((s) => s.key === key);
                    return svc ? (
                      <span
                        key={key}
                        className="inline-flex items-center gap-1.5 bg-copper/10 text-copper text-sm px-3 py-1.5 rounded-full m-1"
                      >
                        <svc.icon size={14} /> {svc.label}
                      </span>
                    ) : null;
                  })}
                </div>

                <div className="glass-card-dark rounded-2xl p-8 mb-8">
                  <p className="text-dark-text-muted text-sm mb-2">Estimated Investment</p>
                  <p className="font-[family-name:var(--font-satoshi)] text-4xl sm:text-5xl font-bold text-copper">
                    ${low === high ? (
                      <AnimatedNumber value={low} />
                    ) : (
                      <>
                        <AnimatedNumber value={low} /> &ndash; $<AnimatedNumber value={high} />
                      </>
                    )}
                  </p>
                  {rangeLow !== rangeHigh && rangeLow !== low && (
                    <p className="text-dark-text-muted text-xs mt-2">
                      Full range across tiers: ${rangeLow.toLocaleString()} &ndash; ${rangeHigh.toLocaleString()}
                    </p>
                  )}
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-copper hover:bg-copper-light text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Your Free Quote <ArrowRight size={18} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={goBack}
            className={`flex items-center gap-2 text-dark-text-muted hover:text-cream transition-colors text-sm ${
              step === 0 ? 'invisible' : ''
            }`}
          >
            <ArrowLeft size={16} /> Back
          </button>
          {step < 2 && (
            <button
              onClick={goNext}
              disabled={step === 0 && selected.size === 0}
              className="flex items-center gap-2 bg-copper/20 hover:bg-copper/30 text-copper px-5 py-2.5 rounded-lg transition-colors text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
