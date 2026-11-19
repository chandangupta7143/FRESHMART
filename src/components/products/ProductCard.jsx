import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

/**
 * ProductCard
 * Purely informational grocery product card.
 *
 * Strict Compliance:
 * - NO "Add to Cart" button
 * - NO "Buy Now" button
 * - NO wishlist controls
 * - NO cart icon / counter
 * - NO "Available" / stock status pill (no inventory management system)
 * - NO purchase or checkout action
 *
 * Displays:
 * - Product photography with 3-tier resilient fallback
 * - Department category tag
 * - Product title
 * - Static INR demonstration price & unit measurement
 * - Optional factual badge (if defined)
 * - Short informational culinary description
 */
export default function ProductCard({ product }) {
  const [imgStage, setImgStage] = useState('primary'); // 'primary' | 'fallback' | 'failed'

  const handleImageError = () => {
    if (imgStage === 'primary' && product.fallbackImage) {
      setImgStage('fallback');
    } else {
      setImgStage('failed');
    }
  };

  const currentImgSrc = imgStage === 'primary' ? product.image : product.fallbackImage;

  return (
    <motion.article
      aria-label={`${product.name}, ${product.categoryLabel}`}
      className="group flex flex-col h-full rounded-2xl border transition-all overflow-hidden"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        boxShadow: 'var(--shadow-xs)',
      }}
      whileHover={{ y: -3, boxShadow: 'var(--shadow-md)' }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Visual Media Container ─────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '4 / 3',
          backgroundColor: 'var(--color-background)',
        }}
      >
        {imgStage !== 'failed' ? (
          <img
            src={currentImgSrc}
            alt={product.name}
            loading="lazy"
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          /* Tier 3 Resilient SVG Placeholder */
          <div
            role="img"
            aria-label={`${product.name} illustration placeholder`}
            className="w-full h-full flex flex-col items-center justify-center p-4 text-center select-none"
            style={{
              backgroundColor: 'rgba(32, 63, 50, 0.05)',
              color: 'var(--color-primary)',
            }}
          >
            <Package size={26} className="opacity-40 mb-1" />
            <span className="text-xs font-semibold">{product.name}</span>
          </div>
        )}

        {/* Optional Factual Badge (Top Left) — rendered only if defined */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span
              className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md"
              style={{
                backgroundColor: 'rgba(217, 232, 163, 0.95)',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-body)',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Category Department Pill (Top Right) */}
        <div className="absolute top-3 right-3">
          <span
            className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-medium tracking-wide backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-body)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            {product.categoryLabel}
          </span>
        </div>
      </div>

      {/* ── Content & Pricing Body ─────────────────────────── */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Product Name */}
          <h3
            className="font-bold text-base md:text-lg mb-1.5 transition-colors group-hover:text-primary"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-primary)',
              lineHeight: '1.25',
              letterSpacing: '-0.01em',
            }}
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p
            className="text-xs leading-relaxed mb-4 line-clamp-2"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Unit Metric (Purely Informational Display) */}
        <div
          className="pt-3 border-t flex items-baseline justify-between gap-2"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-lg md:text-xl font-bold"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              ₹{product.price}
            </span>
            <span
              className="text-xs font-normal"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-muted)',
              }}
            >
              / {product.unit}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
