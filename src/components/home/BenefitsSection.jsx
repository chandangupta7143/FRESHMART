import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Compass, Utensils, Sparkles } from 'lucide-react';

const BENEFITS = [
  {
    id: 'variety',
    icon: ShoppingBag,
    title: 'Everyday Grocery Variety',
    description:
      'Explore 6 distinct departments covering fresh produce, dairy essentials, bakery loaves, and everyday kitchen staples.',
  },
  {
    id: 'discovery',
    icon: Compass,
    title: 'Simple Product Discovery',
    description:
      'Browse familiar grocery aisles with real-time product search, responsive category filters, and clear pricing in one view.',
  },
  {
    id: 'inspiration',
    icon: Utensils,
    title: 'Meal Inspiration for Every Day',
    description:
      'Wholesome, versatile ingredients designed to support daily family cooking, balanced breakfasts, and wholesome dinners.',
  },
];

/**
 * BenefitsSection
 * Highlights three core experiential benefits of the FRESHMART digital storefront.
 * Uses descriptive, honest consumer-facing themes with zero operational promises.
 */
export default function BenefitsSection() {
  return (
    <section
      id="about"
      aria-label="Storefront Benefits & Brand Philosophy"
      className="section-padding border-t"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="container-page">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: 'rgba(32, 63, 50, 0.08)',
              color: 'var(--color-primary)',
              letterSpacing: '0.06em',
            }}
          >
            <Sparkles size={13} />
            <span>Why FRESHMART</span>
          </div>

          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-primary)',
            }}
          >
            Thoughtfully Designed for Everyday Living
          </h2>

          <p
            className="text-sm md:text-base leading-relaxed"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            A modern digital storefront centered around clarity, clean design,
            and convenient access to your everyday grocery essentials.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.article
                key={benefit.id}
                className="flex flex-col p-7 md:p-8 rounded-2xl border transition-all"
                style={{
                  backgroundColor: 'var(--color-background)',
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xs)',
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, boxShadow: 'var(--shadow-md)' }}
              >
                {/* Icon Container */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0"
                  style={{
                    backgroundColor: 'rgba(32, 63, 50, 0.08)',
                    color: 'var(--color-primary)',
                  }}
                >
                  <Icon size={22} strokeWidth={2.2} aria-hidden="true" />
                </div>

                {/* Title */}
                <h3
                  className="font-bold text-base md:text-lg mb-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-primary)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {benefit.title}
                </h3>

                {/* Description */}
                <p
                  className="text-xs md:text-sm leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {benefit.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
