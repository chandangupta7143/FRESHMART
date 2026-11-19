import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Leaf, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileNav from './MobileNav.jsx';

export const NAV_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'Categories', href: '#categories' },
  { label: 'Featured',   href: '#products' },
  { label: 'About',      href: '#about' },
  { label: 'Newsletter', href: '#newsletter' },
];

/**
 * Navbar
 * Sticky header with brand identity, desktop nav links, expanding search field,
 * and responsive mobile drawer toggle.
 *
 * Search Integration (Stage 6):
 * Accepts shared search state from `useProductFilters` so that desktop, mobile,
 * and in-page product filters remain 100% synchronized.
 */
export default function Navbar({
  searchQuery = '',
  onSearchChange,
  onClearSearch,
}) {
  const [isScrolled,  setIsScrolled]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  const desktopSearchInputRef = useRef(null);
  const mobileSearchInputRef  = useRef(null);
  const hamburgerBtnRef       = useRef(null);

  /* Sticky background blur effect on scroll */
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Auto-focus search input when search is opened */
  useEffect(() => {
    if (searchOpen) {
      if (window.innerWidth >= 768) {
        desktopSearchInputRef.current?.focus();
      } else {
        mobileSearchInputRef.current?.focus();
      }
    }
  }, [searchOpen]);

  /* Automatically close mobile drawer when resizing up to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Smooth anchor scrolling and panel dismissal */
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    setSearchOpen(false);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClear = () => {
    if (typeof onClearSearch === 'function') {
      onClearSearch();
    }
    setSearchOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const productsEl = document.querySelector('#products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 'var(--z-sticky)',
          backgroundColor: isScrolled ? 'rgba(247, 245, 239, 0.96)' : 'var(--color-background)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: `1px solid ${isScrolled ? 'var(--color-border)' : 'transparent'}`,
          boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
          transition: 'background-color 220ms ease, box-shadow 220ms ease, border-color 220ms ease',
        }}
      >
        <div className="container-page">
          {/* Main Navigation Bar */}
          <nav
            aria-label="Primary navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '4.25rem',
              gap: '1rem',
            }}
          >
            {/* Brand Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              aria-label="FRESHMART home"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '2.125rem',
                  height: '2.125rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Leaf size={15} color="var(--color-accent)" strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '700',
                  fontSize: '1.1875rem',
                  color: 'var(--color-primary)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1,
                }}
              >
                FRESHMART
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <ul
              className="hidden md:flex items-center flex-1 justify-center"
              style={{ gap: '0.25rem', listStyle: 'none', margin: 0, padding: 0 }}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <NavLink label={label} href={href} onClick={handleNavClick} />
                </li>
              ))}
            </ul>

            {/* Right Action Cluster */}
            <div
              className="flex items-center"
              style={{ gap: '0.625rem', flexShrink: 0, marginLeft: 'auto' }}
            >
              {/* Desktop Search Expansion Form */}
              <div className="hidden md:flex items-center" style={{ position: 'relative' }}>
                <AnimatePresence mode="wait">
                  {searchOpen ? (
                    <motion.form
                      key="desktop-search-input"
                      role="search"
                      onSubmit={handleSearchSubmit}
                      initial={{ opacity: 0, width: '2.375rem' }}
                      animate={{ opacity: 1, width: '15rem' }}
                      exit={{ opacity: 0, width: '2.375rem' }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.45rem 0.875rem',
                          backgroundColor: 'var(--color-surface)',
                          border: '1.5px solid var(--color-primary)',
                          borderRadius: 'var(--radius-full)',
                          boxShadow: 'var(--shadow-xs)',
                        }}
                      >
                        <Search size={14} color="var(--color-primary)" aria-hidden="true" />
                        <input
                          ref={desktopSearchInputRef}
                          type="search"
                          placeholder="Search produce, bakery…"
                          value={searchQuery}
                          onChange={(e) => onSearchChange?.(e.target.value)}
                          aria-label="Search products by name"
                          style={{
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            fontSize: 'var(--text-body-sm)',
                            fontFamily: 'var(--font-body)',
                            color: 'var(--color-text)',
                            width: '100%',
                            minWidth: 0,
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleClear}
                          aria-label="Clear and close search"
                          style={{
                            display: 'flex',
                            padding: 0,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--color-text-muted)',
                            flexShrink: 0,
                            lineHeight: 0,
                          }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.button
                      key="desktop-search-trigger"
                      type="button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSearchOpen(true)}
                      aria-label="Open product search"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2.375rem',
                        height: '2.375rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-surface)',
                        color: 'var(--color-text)',
                        cursor: 'pointer',
                      }}
                    >
                      <Search size={16} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Search Toggle */}
              <motion.button
                type="button"
                className="flex md:hidden"
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen((v) => !v);
                }}
                aria-label={searchOpen ? 'Close search field' : 'Open search field'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.375rem',
                  height: '2.375rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                }}
              >
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </motion.button>

              {/* Mobile Hamburger Drawer Trigger */}
              <motion.button
                ref={hamburgerBtnRef}
                type="button"
                className="flex md:hidden"
                onClick={() => {
                  setSearchOpen(false);
                  setMobileOpen(true);
                }}
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-drawer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.375rem',
                  height: '2.375rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                }}
              >
                <Menu size={18} />
              </motion.button>
            </div>
          </nav>

          {/* Mobile Search Expansion Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.form
                role="search"
                onSubmit={handleSearchSubmit}
                className="flex md:hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{ overflow: 'hidden', paddingBottom: '0.875rem' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.55rem 1rem',
                    backgroundColor: 'var(--color-surface)',
                    border: '1.5px solid var(--color-primary)',
                    borderRadius: 'var(--radius-full)',
                    width: '100%',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <Search size={16} color="var(--color-primary)" aria-hidden="true" />
                  <input
                    ref={mobileSearchInputRef}
                    type="search"
                    placeholder="Search produce, bakery, pantry…"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    aria-label="Search products by name"
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      fontSize: 'var(--text-body-sm)',
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-text)',
                      width: '100%',
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear and close search input"
                    style={{
                      display: 'flex',
                      padding: 0,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--color-text-muted)',
                      lineHeight: 0,
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Accessible Mobile Slide-over Drawer */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={NAV_LINKS}
        onNavClick={handleNavClick}
        triggerRef={hamburgerBtnRef}
      />
    </>
  );
}

/* ── NavLink atom ───────────────────────────────────────────── */
function NavLink({ label, href, onClick }) {
  return (
    <a
      href={href}
      onClick={(e) => onClick(e, href)}
      style={{
        display: 'block',
        fontFamily: 'var(--font-body)',
        fontWeight: '500',
        fontSize: 'var(--text-body-sm)',
        color: 'var(--color-text)',
        padding: '0.5rem 0.95rem',
        borderRadius: 'var(--radius-full)',
        textDecoration: 'none',
        transition: 'color 120ms ease, background-color 120ms ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(32, 63, 50, 0.07)';
        e.currentTarget.style.color = 'var(--color-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'var(--color-text)';
      }}
    >
      {label}
    </a>
  );
}
