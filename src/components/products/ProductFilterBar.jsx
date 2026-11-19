import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';

const FILTER_TABS = [
  { id: 'all',        label: 'All Items' },
  { id: 'fruits',     label: 'Fruits' },
  { id: 'vegetables', label: 'Vegetables' },
  { id: 'dairy',      label: 'Dairy' },
  { id: 'bakery',     label: 'Bakery' },
  { id: 'beverages',  label: 'Beverages' },
  { id: 'pantry',     label: 'Pantry' },
];

/**
 * ProductFilterBar
 * Interactive category pill tabs and integrated search input.
 * Supports simultaneous category filtering and real-time product name searching.
 */
export default function ProductFilterBar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onClearSearch,
  onResetAll,
  categoryCounts = {},
  totalFilteredCount,
  hasActiveFilters,
}) {
  return (
    <div className="w-full space-y-4 mb-8">
      {/* ── Top Bar: Search Input & Result Count Indicator ──── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Integrated Product Search Input */}
        <div className="relative flex-1 max-w-md">
          <div
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: searchQuery ? 'var(--color-primary)' : 'var(--color-border)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <Search size={16} color="var(--color-primary)" className="shrink-0" aria-hidden="true" />
            <input
              type="search"
              placeholder="Filter by product name (e.g. mango, milk)…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Filter products by name"
              className="w-full bg-transparent border-none outline-none text-xs md:text-sm"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text)',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={onClearSearch}
                aria-label="Clear search text"
                className="shrink-0 p-1 rounded-full hover:opacity-70 transition-opacity cursor-pointer"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Status Count & Reset Helper */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-full border"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-muted)',
            }}
          >
            Showing{' '}
            <strong className="text-primary font-bold" style={{ color: 'var(--color-primary)' }}>
              {totalFilteredCount}
            </strong>{' '}
            item{totalFilteredCount === 1 ? '' : 's'}
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetAll}
              aria-label="Reset all filters and search"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:opacity-80 cursor-pointer"
              style={{
                backgroundColor: 'rgba(32, 63, 50, 0.06)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-primary)',
              }}
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Category Pill Tabs Row ──────────────────────────── */}
      <div
        role="tablist"
        aria-label="Filter products by grocery category"
        className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {FILTER_TABS.map((tab) => {
          const isSelected = selectedCategory === tab.id;
          const count = categoryCounts[tab.id];

          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls="product-catalog-grid"
              onClick={() => onSelectCategory(tab.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer"
              style={{
                backgroundColor: isSelected
                  ? 'var(--color-primary)'
                  : 'var(--color-surface)',
                color: isSelected ? 'var(--color-white)' : 'var(--color-text)',
                border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
              }}
            >
              <span>{tab.label}</span>
              {typeof count === 'number' && (
                <span
                  className="text-[11px] px-1.5 py-0.2 rounded-full font-normal"
                  style={{
                    backgroundColor: isSelected
                      ? 'rgba(255, 255, 255, 0.22)'
                      : 'rgba(32, 63, 50, 0.08)',
                    color: isSelected
                      ? 'var(--color-white)'
                      : 'var(--color-text-muted)',
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
