import { useState, useMemo, useCallback } from 'react';

/**
 * useProductFilters
 * Custom hook encapsulating client-side grocery product search and category filtering.
 *
 * Capabilities:
 * - Case-insensitive product name search with whitespace trimming
 * - Department category filtering ('all' or specific category id)
 * - Simultaneous query + category intersection filtering
 * - Dynamic category item counting
 * - Granular and global reset helpers
 *
 * @param {Array} initialProducts - The static catalogue array
 * @param {string} defaultCategory - Initial category selection ('all')
 */
export function useProductFilters(initialProducts = [], defaultCategory = 'all') {
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Normalized search query
  const cleanQuery = useMemo(() => {
    return searchQuery.trim().toLowerCase();
  }, [searchQuery]);

  // 2. Filtered products (simultaneous category + query filtering)
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category condition
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      // Search condition (matches product name)
      const matchesQuery =
        cleanQuery === '' || product.name.toLowerCase().includes(cleanQuery);

      return matchesCategory && matchesQuery;
    });
  }, [initialProducts, selectedCategory, cleanQuery]);

  // 3. Dynamic category product count dictionary based on full catalog
  const categoryCounts = useMemo(() => {
    const counts = { all: initialProducts.length };
    initialProducts.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [initialProducts]);

  // 4. Action helpers
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const resetCategory = useCallback(() => {
    setSelectedCategory('all');
  }, []);

  const resetAllFilters = useCallback(() => {
    setSelectedCategory('all');
    setSearchQuery('');
  }, []);

  const hasActiveFilters = useMemo(() => {
    return selectedCategory !== 'all' || cleanQuery !== '';
  }, [selectedCategory, cleanQuery]);

  return {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    clearSearch,
    resetCategory,
    resetAllFilters,
    categoryCounts,
    hasActiveFilters,
    totalCount: initialProducts.length,
    filteredCount: filteredProducts.length,
  };
}
