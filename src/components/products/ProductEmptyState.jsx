import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ProductEmptyState
 * Rendered when client-side search query and/or category filters yield 0 matching products.
 * Provides clear context explaining why no results were found and an accessible reset button.
 */
export default function ProductEmptyState({
  searchQuery,
  selectedCategory,
  onResetAll,
}) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="w-full py-16 px-6 text-center rounded-2xl border flex flex-col items-center justify-center my-4"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        boxShadow: 'var(--shadow-xs)',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Icon Graphic */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{
          backgroundColor: 'rgba(32, 63, 50, 0.06)',
          color: 'var(--color-primary)',
        }}
      >
        <SearchX size={32} strokeWidth={2} aria-hidden="true" />
      </div>

      {/* Primary Message */}
      <h3
        className="text-lg md:text-xl font-bold mb-2 tracking-tight"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
      >
        No matching products found
      </h3>

      {/* Contextual Description */}
      <p
        className="text-xs md:text-sm max-w-md leading-relaxed mb-6"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
      >
        {searchQuery && selectedCategory !== 'all' ? (
          <>
            No items in <strong>{selectedCategory}</strong> match &ldquo;
            <span className="text-primary font-semibold">{searchQuery}</span>
            &rdquo;. Try searching another department or clearing your query.
          </>
        ) : searchQuery ? (
          <>
            We couldn&rsquo;t find any items matching &ldquo;
            <span className="text-primary font-semibold">{searchQuery}</span>
            &rdquo;. Please check for typos or search for a broader term.
          </>
        ) : (
          <>
            There are currently no items available in the selected category.
          </>
        )}
      </p>

      {/* Reset Action Button */}
      <motion.button
        type="button"
        onClick={onResetAll}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-white)',
          fontFamily: 'var(--font-body)',
          boxShadow: 'var(--shadow-xs)',
        }}
        whileHover={{ scale: 1.03, backgroundColor: 'var(--color-primary-hover)' }}
        whileTap={{ scale: 0.97 }}
      >
        <RotateCcw size={14} />
        <span>Reset All Filters</span>
      </motion.button>
    </motion.div>
  );
}
