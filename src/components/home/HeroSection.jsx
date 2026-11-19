import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Sparkles, ShoppingBag } from 'lucide-react';

const PRIMARY_IMG =
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80';
const SECONDARY_FALLBACK_IMG =
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80';

/**
 * HeroSection
 * Editorial split-layout hero banner with honest, premium brand messaging,
 * primary & secondary CTAs, and a robust multi-tiered grocery photography visual
 * that degrades gracefully to a brand-styled SVG card if remote CDNs fail.
 */
export default function HeroSection() {
  const [imageStage, setImageStage] = useState('primary'); // 'primary' | 'secondary' | 'failed'

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageError = () => {
    if (imageStage === 'primary') {
      setImageStage('secondary');
    } else {
      setImageStage('failed');
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Pill Tag */}
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6"
              style={{
                backgroundColor: 'rgba(32, 63, 50, 0.08)',
                color: 'var(--color-primary)',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <Leaf size={14} color="var(--color-primary)" />
              <span
                className="text-xs font-semibold tracking-wider uppercase"
                style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.06em' }}
              >
                Mindful Grocery Selections
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <h1
              className="text-display mb-6 tracking-tight"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-primary)',
                lineHeight: '1.12',
              }}
            >
              Freshness sourced from nature, delivered for your everyday table.
            </h1>

            {/* Supporting Copy */}
            <p
              className="text-base md:text-lg mb-8 max-w-xl"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-muted)',
                lineHeight: '1.65',
              }}
            >
              Discover seasonal produce, wholesome dairy, artisanal bakery essentials,
              and pantry staples selected for balanced taste, quality ingredients, and
              everyday cooking convenience.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              {/* Primary CTA */}
              <motion.a
                href="#products"
                onClick={(e) => handleScrollTo(e, '#products')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-medium shadow-sm transition-all text-sm md:text-base"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)',
                  fontFamily: 'var(--font-body)',
                }}
                whileHover={{ scale: 1.02, backgroundColor: 'var(--color-primary-hover)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore Harvest</span>
                <ArrowRight size={17} />
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="#categories"
                onClick={(e) => handleScrollTo(e, '#categories')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium transition-all text-sm md:text-base"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-primary)',
                  border: '1px solid var(--color-border)',
                  fontFamily: 'var(--font-body)',
                }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(32, 63, 50, 0.04)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Browse Categories</span>
              </motion.a>
            </div>

            {/* Storefront Feature Overview */}
            <div
              className="mt-10 pt-8 border-t w-full grid grid-cols-3 gap-4"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div>
                <p
                  className="font-bold text-lg md:text-xl"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                >
                  6+
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Fresh Categories
                </p>
              </div>

              <div>
                <p
                  className="font-bold text-lg md:text-xl"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                >
                  Wholesome
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Pantry &amp; Produce
                </p>
              </div>

              <div>
                <p
                  className="font-bold text-lg md:text-xl"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                >
                  Convenient
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Everyday Shopping
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Composition with Multi-Tier Fallback */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Main Visual Container */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-lg border"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                aspectRatio: '4 / 5',
              }}
            >
              {imageStage !== 'failed' ? (
                <>
                  <img
                    src={imageStage === 'primary' ? PRIMARY_IMG : SECONDARY_FALLBACK_IMG}
                    alt="Colorful assortment of fresh bell peppers, greens, and produce in an open-air market"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="eager"
                    onError={handleImageError}
                  />

                  {/* Gradient Vignette Overlay for Depth */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(32, 63, 50, 0.05) 0%, rgba(32, 63, 50, 0.28) 100%)',
                    }}
                  />
                </>
              ) : (
                /* Tier 3: Resilient Brand-Styled SVG Placeholder */
                <div
                  role="img"
                  aria-label="Fresh grocery assortment illustration placeholder"
                  className="w-full h-full flex flex-col items-center justify-center p-8 text-center select-none"
                  style={{
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-white)',
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: 'rgba(217, 232, 163, 0.2)' }}
                  >
                    <Leaf size={40} color="var(--color-muted-citrus)" />
                  </div>
                  <p
                    className="font-bold text-xl mb-1 tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-muted-citrus)' }}
                  >
                    FRESHMART
                  </p>
                  <p
                    className="text-xs max-w-xs leading-relaxed"
                    style={{ color: 'rgba(255, 255, 255, 0.85)', fontFamily: 'var(--font-body)' }}
                  >
                    Fresh seasonal produce, bakery, dairy &amp; pantry essentials
                  </p>
                  <div
                    className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      color: 'var(--color-white)',
                    }}
                  >
                    <ShoppingBag size={12} />
                    <span>Curated Grocery Storefront</span>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Seasonal Harvest Badge (Bottom Left) */}
            <motion.div
              className="absolute -bottom-5 -left-4 sm:left-4 p-4 rounded-2xl shadow-md border flex items-center gap-3 backdrop-blur-md"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: 'var(--color-border)',
                maxWidth: '260px',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--color-muted-citrus)' }}
              >
                <Sparkles size={18} color="var(--color-primary)" />
              </div>
              <div>
                <p
                  className="font-semibold text-xs md:text-sm"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
                >
                  Seasonal Harvest
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Selected for daily cooking
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
