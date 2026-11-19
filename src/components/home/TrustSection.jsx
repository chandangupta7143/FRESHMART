import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, LayoutGrid, Compass, Clock } from 'lucide-react';

const TRUST_ITEMS = [
  {
    id: 'selection',
    icon: Sprout,
    title: 'Thoughtful Selection',
    description: 'Seasonal produce and pantry staples chosen for balanced taste and everyday cooking.',
  },
  {
    id: 'variety',
    icon: LayoutGrid,
    title: 'Everyday Variety',
    description: 'Explore a range of grocery categories for your everyday household needs.',
  },
  {
    id: 'discovery',
    icon: Compass,
    title: 'Easy Discovery',
    description: 'Browse familiar grocery categories and find everyday essentials with ease.',
  },
  {
    id: 'convenience',
    icon: Clock,
    title: 'Everyday Convenience',
    description: 'Clean digital shopping designed to save time on recurring household grocery routines.',
  },
];

/**
 * TrustSection
 * Polished trust-indicator grid presenting four descriptive brand themes.
 * Uses honest, customer-facing copy with zero operational promises,
 * delivery claims, certifications, or unverified customer-support guarantees.
 */
export default function TrustSection() {
  return (
    <section
      aria-label="Why Shop With FRESHMART"
      className="py-10 md:py-14 border-y"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="container-page">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                className="flex items-start gap-4 p-5 rounded-2xl border transition-all"
                style={{
                  backgroundColor: 'var(--color-background)',
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -2, boxShadow: 'var(--shadow-sm)' }}
              >
                {/* Icon Badge */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: 'rgba(32, 63, 50, 0.08)',
                    color: 'var(--color-primary)',
                  }}
                >
                  <Icon size={20} strokeWidth={2.2} aria-hidden="true" />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-semibold text-sm md:text-base mb-1"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-primary)',
                      lineHeight: '1.3',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
