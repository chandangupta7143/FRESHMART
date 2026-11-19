import React from 'react';
import { MotionConfig } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import AnnouncementBar from './components/layout/AnnouncementBar.jsx';
import Navbar from './components/layout/Navbar.jsx';
import HeroSection from './components/home/HeroSection.jsx';
import TrustSection from './components/home/TrustSection.jsx';
import CategorySection from './components/home/CategorySection.jsx';
import ProductFilterBar from './components/products/ProductFilterBar.jsx';
import ProductGrid from './components/products/ProductGrid.jsx';
import PromoBanner from './components/home/PromoBanner.jsx';
import BenefitsSection from './components/home/BenefitsSection.jsx';
import NewsletterSection from './components/home/NewsletterSection.jsx';
import Footer from './components/layout/Footer.jsx';
import { PRODUCTS } from './data/products.js';
import { useProductFilters } from './hooks/useProductFilters.js';

/**
 * FRESHMART Application Root
 * Stage 7 Implementation:
 * - AnnouncementBar
 * - Sticky Navbar with shared search state
 * - HeroSection (#home)
 * - TrustSection (4 verified brand indicators)
 * - CategorySection (#categories)
 * - Product Catalog Section (#products) with live filtering & search
 * - PromoBanner (editorial harvest spotlight)
 * - BenefitsSection (#about - 3 experiential brand pillars)
 * - NewsletterSection (client-side validation & static confirmation)
 */
export default function App() {
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    clearSearch,
    resetAllFilters,
    categoryCounts,
    hasActiveFilters,
    filteredCount,
  } = useProductFilters(PRODUCTS);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-background)' }}>
        {/* 1. Announcement Bar */}
        <AnnouncementBar />

        {/* 2. Sticky Navbar with Shared Search State */}
        <Navbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={clearSearch}
        />

        {/* 3. Main Content Flow */}
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection />

          {/* Trust Indicators Section */}
          <TrustSection />

          {/* Shop by Category Showcase */}
          <CategorySection
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Filterable Products Showcase Section */}
          <section
            id="products"
            aria-label="Grocery Products Showcase"
            className="section-padding border-t"
            style={{
              backgroundColor: 'var(--color-background)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="container-page">
              {/* Section Header */}
              <div className="max-w-2xl mb-8">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{
                    backgroundColor: 'rgba(32, 63, 50, 0.08)',
                    color: 'var(--color-primary)',
                    letterSpacing: '0.06em',
                  }}
                >
                  <Sparkles size={13} />
                  <span>Curated Storefront</span>
                </div>

                <h2
                  className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-primary)',
                  }}
                >
                  Grocery Selections
                </h2>

                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Explore our seasonal harvest, fresh dairy, bakery loaves, and pantry essentials.
                  Filter by department or search by item name below.
                </p>
              </div>

              {/* Interactive Category Filter Pills & Integrated Search Bar */}
              <ProductFilterBar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClearSearch={clearSearch}
                onResetAll={resetAllFilters}
                categoryCounts={categoryCounts}
                totalFilteredCount={filteredCount}
                hasActiveFilters={hasActiveFilters}
              />

              {/* Dynamic Filtered Product Grid / Empty State */}
              <ProductGrid
                products={filteredProducts}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                onResetAll={resetAllFilters}
              />
            </div>
          </section>

          {/* 5. Editorial Promotional Banner */}
          <PromoBanner />

          {/* 6. Benefits & Storefront Philosophy Section (#about) */}
          <BenefitsSection />

          {/* 7. Newsletter Demonstration Section */}
          <NewsletterSection />
        </main>

        {/* 8. Site Footer */}
        <Footer onSelectCategory={setSelectedCategory} />
      </div>
    </MotionConfig>
  );
}
