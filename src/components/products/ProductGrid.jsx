import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard.jsx';
import ProductEmptyState from './ProductEmptyState.jsx';

/**
 * ProductGrid
 * Responsive multi-column grid layout for filtered grocery product cards.
 * If 0 items match the active query/category, renders ProductEmptyState.
 */
export default function ProductGrid({
  products = [],
  searchQuery = '',
  selectedCategory = 'all',
  onResetAll,
}) {
  if (products.length === 0) {
    return (
      <ProductEmptyState
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onResetAll={onResetAll}
      />
    );
  }

  return (
    <div
      id="product-catalog-grid"
      role="region"
      aria-label="Filtered product list"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
