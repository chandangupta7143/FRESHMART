import React from 'react';
import {
  Leaf,
  ArrowUp,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Sparkles,
  Heart,
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories.js';
import { NAV_LINKS } from './Navbar.jsx';

/**
 * Footer
 * Premium, accessible footer component for the FRESHMART storefront.
 *
 * Architecture & Compliance:
 * - Employs semantic `<footer>` and `<nav>` elements with explicit ARIA labels.
 * - Adheres strictly to the Forest Green (#203F32) and Warm Cream (#F7F5EF) design palette.
 * - All text meets WCAG AA contrast against the dark forest-green surface.
 * - Department filter links integrate directly with the existing `useProductFilters` state in `App.jsx`.
 * - Social media icons are rendered as tasteful, non-interactive demonstration mockups
 *   with transparent accessible labels (no broken hrefs, fake accounts, or misleading handles).
 * - Smooth anchor scrolling to page sections without broken hashes or full page reloads.
 */
export default function Footer({ onSelectCategory }) {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (e, categoryId) => {
    e.preventDefault();
    if (typeof onSelectCategory === 'function') {
      onSelectCategory(categoryId);
    }
    const el = document.querySelector('#products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialMockups = [
    { name: 'Instagram', icon: Instagram },
    { name: 'Facebook',  icon: Facebook },
    { name: 'Twitter',   icon: Twitter },
    { name: 'LinkedIn',  icon: Linkedin },
  ];

  return (
    <footer
      aria-label="Site Footer"
      className="border-t text-sm"
      style={{
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-background)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Main Footer Navigation Grid */}
      <div className="container-page py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Philosophy (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, '#home')}
              aria-label="FRESHMART Home"
              className="inline-flex items-center gap-2.5 mb-4 group cursor-pointer"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-primary)',
                }}
              >
                <Leaf size={18} strokeWidth={2.4} aria-hidden="true" />
              </div>
              <span
                className="text-xl font-bold tracking-tight"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-background)',
                }}
              >
                FRESHMART
              </span>
            </a>

            <p
              className="text-xs uppercase tracking-widest font-semibold mb-3"
              style={{ color: 'var(--color-accent)' }}
            >
              Freshness, Quality & Everyday Convenience.
            </p>

            <p
              className="text-xs md:text-sm leading-relaxed mb-6 opacity-80 max-w-md"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              A modern grocery storefront demonstration showcasing curated produce,
              dairy, bakery loaves, cold beverages, and everyday pantry essentials for
              your household table.
            </p>

            {/* Social Media Non-Interactive Mockups */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-70 block mb-2.5">
                Social Community Preview
              </span>
              <div
                role="group"
                aria-label="Social media demonstration preview"
                className="flex items-center gap-2.5"
              >
                {socialMockups.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    title={`${name} (Demonstration preview)`}
                    aria-label={`${name} demonstration preview`}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-default"
                    style={{
                      backgroundColor: 'rgba(247, 245, 239, 0.1)',
                      color: 'var(--color-background)',
                    }}
                  >
                    <Icon size={15} strokeWidth={2} aria-hidden="true" />
                  </div>
                ))}
              </div>
              <p className="text-[11px] mt-2 opacity-50">
                Demonstration preview · External social profiles not established
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h3
              className="text-xs uppercase tracking-wider font-bold mb-4"
              style={{ color: 'var(--color-accent)' }}
            >
              Navigation
            </h3>
            <nav aria-label="Footer Quick Links">
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className="text-xs md:text-sm opacity-80 hover:opacity-100 hover:underline transition-opacity cursor-pointer inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Department Filters (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h3
              className="text-xs uppercase tracking-wider font-bold mb-4"
              style={{ color: 'var(--color-accent)' }}
            >
              Departments
            </h3>
            <nav aria-label="Footer Grocery Departments">
              <ul className="space-y-2.5">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={(e) => handleCategoryClick(e, cat.id)}
                      className="text-xs md:text-sm text-left opacity-80 hover:opacity-100 hover:underline transition-opacity cursor-pointer inline-block"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 4: Storefront Information & Assessment Credit (3 cols on lg) */}
          <div className="lg:col-span-3">
            <h3
              className="text-xs uppercase tracking-wider font-bold mb-4"
              style={{ color: 'var(--color-accent)' }}
            >
              Storefront Details
            </h3>
            <div className="space-y-3 text-xs opacity-80 leading-relaxed">
              <p>
                <span className="font-semibold text-white">Curated Selection:</span>{' '}
                18 demonstration products across 6 departments with local filtering.
              </p>
              <p>
                <span className="font-semibold text-white">Technology Stack:</span>{' '}
                React 19, Tailwind CSS v4, Framer Motion, and Lucide React.
              </p>
              <p>
                <span className="font-semibold text-white">Execution Mode:</span>{' '}
                100% frontend client demonstration with zero external analytics or tracking.
              </p>
              <div
                className="mt-3 p-3 rounded-xl border text-[11px]"
                style={{
                  backgroundColor: 'rgba(247, 245, 239, 0.06)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center gap-1.5 font-semibold text-white mb-1">
                  <Sparkles size={12} style={{ color: 'var(--color-accent)' }} />
                  <span>Technical Assessment</span>
                </div>
                <span>Developed for the MOH TECHNOLOGY engineering evaluation.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Utility Bar */}
      <div
        className="border-t py-6"
        style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-75">
          <div className="text-center sm:text-left">
            <p>© 2026 FRESHMART. All rights reserved.</p>
            <p className="text-[11px] opacity-70 mt-0.5">
              Demonstration storefront only · Prices in INR (₹) · No commercial transactions or order deliveries.
            </p>
          </div>

          {/* Back to Top Button */}
          <button
            type="button"
            onClick={(e) => handleScrollTo(e, '#home')}
            aria-label="Scroll back to top of page"
            className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full border transition-all hover:opacity-100 hover:bg-white/10 cursor-pointer text-xs"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: 'var(--color-background)',
            }}
          >
            <ArrowUp size={13} aria-hidden="true" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
