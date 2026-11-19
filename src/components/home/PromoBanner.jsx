import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';

const PROMO_IMAGE =
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80';
const PROMO_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80';

/**
 * PromoBanner
 * Editorial promotional banner highlighting seasonal grocery variety.
 * CTA smoothly navigates to the #products catalog section.
 *
 * Audit Compliance:
 * - NO fake discount percentages
 * - NO artificial countdown timers
 * - NO delivery guarantees or unverified sourcing assertions
 */
export default function PromoBanner() {
  const [imgSrc, setImgSrc] = useState(PROMO_IMAGE);
  const [hasFailed, setHasFailed] = useState(false);

  const handleScrollToProducts = (e) => {
    e.preventDefault();
    const target = document.querySelector('#products');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageError = () => {
    if (imgSrc !== PROMO_FALLBACK_IMAGE) {
      setImgSrc(PROMO_FALLBACK_IMAGE);
    } else {
      setHasFailed(true);
    }
  };

  return (
    <section
      aria-label="Seasonal Grocery Spotlight"
      className="section-padding"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="container-page">
        <div
          className="relative rounded-3xl overflow-hidden border shadow-md"
          style={{
            backgroundColor: 'var(--color-primary)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-white)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 z-10 flex flex-col items-start">
              {/* Badge Tag */}
              <div
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
                style={{
                  backgroundColor: 'rgba(217, 232, 163, 0.2)',
                  color: 'var(--color-muted-citrus)',
                  letterSpacing: '0.06em',
                }}
              >
                <Sparkles size={13} />
                <span>Store Spotlight</span>
              </div>

              {/* Headline */}
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-white)',
                }}
              >
                Wholesome ingredients for every home recipe.
              </h2>

              {/* Supporting Copy */}
              <p
                className="text-sm md:text-base leading-relaxed mb-8 max-w-xl opacity-90"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-warm-cream)',
                }}
              >
                From crisp morning fruits and chilled dairy to fragrant pantry lentils,
                discover balanced staples curated for daily home cooking and family meals.
              </p>

              {/* CTA Button */}
              <motion.a
                href="#products"
                onClick={handleScrollToProducts}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs md:text-sm transition-all cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-muted-citrus)',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-body)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Browse Grocery Catalogue</span>
                <ArrowRight size={16} />
              </motion.a>
            </div>

            {/* Right Media Column */}
            <div className="lg:col-span-5 relative w-full h-64 lg:h-full min-h-[300px] overflow-hidden">
              {!hasFailed ? (
                <>
                  <img
                    src={imgSrc}
                    alt="Arrangement of fresh market vegetables and grocery ingredients"
                    loading="lazy"
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle Gradient Transition */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--color-primary) 0%, rgba(32, 63, 50, 0.4) 30%, transparent 100%)',
                    }}
                  />
                </>
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-8 text-center select-none"
                  style={{ backgroundColor: 'var(--color-primary-light)' }}
                >
                  <ShoppingBag size={48} color="var(--color-muted-citrus)" className="mb-2 opacity-60" />
                  <p
                    className="font-bold text-lg"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-muted-citrus)' }}
                  >
                    FRESHMART
                  </p>
                  <p className="text-xs opacity-75">Everyday Grocery Storefront</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
