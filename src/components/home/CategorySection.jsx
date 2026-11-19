import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers } from 'lucide-react';
import { CATEGORIES } from '../../data/categories.js';

/**
 * CategoryCard
 * Atomic card displaying category imagery, descriptive text, and a click action
 * that activates the filter selection and scrolls down to the products showcase.
 */
function CategoryCard({ category, isSelected, onSelect }) {
  const [imgSrc, setImgSrc] = useState(category.image);
  const [isFailed, setIsFailed] = useState(false);

  const handleImageError = () => {
    if (imgSrc !== category.fallbackImage) {
      setImgSrc(category.fallbackImage);
    } else {
      setIsFailed(true);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(category.id)}
      aria-label={`Select ${category.name} category and view products`}
      aria-pressed={isSelected}
      className="group relative flex flex-col text-left w-full overflow-hidden rounded-2xl border transition-all cursor-pointer"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
        boxShadow: isSelected
          ? '0 0 0 2px var(--color-primary), var(--shadow-md)'
          : 'var(--shadow-xs)',
      }}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-md)' }}
      whileTap={{ scale: 0.985 }}
    >
      {/* Visual Image Container */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '16 / 10',
          backgroundColor: 'var(--color-background)',
        }}
      >
        {!isFailed ? (
          <img
            src={imgSrc}
            alt={`${category.name} assortment`}
            loading="lazy"
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-4 text-center"
            style={{
              backgroundColor: 'rgba(32, 63, 50, 0.05)',
              color: 'var(--color-primary)',
            }}
          >
            <Layers size={28} className="opacity-40 mb-1" />
            <span className="text-xs font-semibold">{category.name}</span>
          </div>
        )}

        {/* Category Tag Pill (Top Right) */}
        <div className="absolute top-3 right-3">
          <span
            className="inline-block px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-body)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            {category.itemCountText}
          </span>
        </div>
      </div>

      {/* Card Content Footer */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3
              className="font-bold text-base md:text-lg group-hover:text-primary transition-colors"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              {category.name}
            </h3>
            
            {/* Action Arrow Icon */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{
                backgroundColor: isSelected
                  ? 'var(--color-primary)'
                  : 'rgba(32, 63, 50, 0.06)',
                color: isSelected ? 'var(--color-white)' : 'var(--color-primary)',
              }}
            >
              <ArrowUpRight size={14} strokeWidth={2.2} />
            </div>
          </div>

          <p
            className="text-xs md:text-sm leading-relaxed"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            {category.shortDescription}
          </p>
        </div>

        {/* Selected Category Status Indicator */}
        {isSelected && (
          <div className="mt-3 pt-3 border-t flex items-center gap-1.5" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
            <span
              className="text-xs font-semibold"
              style={{ color: 'var(--color-primary)' }}
            >
              Active Filter
            </span>
          </div>
        )}
      </div>
    </motion.button>
  );
}

/**
 * CategorySection
 * Showcases the 6 grocery departments in a balanced 3-column responsive grid.
 * Clicking any category stores the selection and scrolls directly to the products section.
 */
export default function CategorySection({ selectedCategory, onSelectCategory }) {
  const handleCategoryClick = (categoryId) => {
    // 1. Notify parent of selected category
    if (typeof onSelectCategory === 'function') {
      onSelectCategory(categoryId);
    }

    // 2. Smoothly scroll to the products catalog section
    const productsEl = document.querySelector('#products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="categories"
      aria-label="Shop by Category"
      className="section-padding"
      style={{ backgroundColor: 'var(--color-background)' }}
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
            <Layers size={13} />
            <span>Store Departments</span>
          </div>

          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-primary)',
            }}
          >
            Shop by Category
          </h2>

          <p
            className="text-sm md:text-base leading-relaxed"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            Explore our curated grocery aisles, filled with farm-fresh produce,
            wholesome dairy, oven-baked loaves, and everyday kitchen staples.
          </p>
        </div>

        {/* 6-Category Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onSelect={handleCategoryClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
