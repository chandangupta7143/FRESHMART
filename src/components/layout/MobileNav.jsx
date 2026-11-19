import React, { useEffect, useRef } from 'react';
import { X, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MobileNav
 * Accessible slide-over navigation drawer for mobile viewports.
 * Features strict focus trapping, focus containment against external shift,
 * Escape key dismissal, and conditional focus restoration (ensuring focus is
 * not returned to a hidden hamburger on desktop viewport resize).
 *
 * Props:
 *   isOpen     — boolean
 *   onClose    — () => void
 *   navLinks   — Array<{ label: string, href: string }>
 *   onNavClick — (e, href) => void
 *   triggerRef — React ref pointing to the hamburger button
 */
export default function MobileNav({ isOpen, onClose, navLinks, onNavClick, triggerRef }) {
  const closeBtnRef = useRef(null);
  const drawerRef = useRef(null);
  const prevActiveElementRef = useRef(null);

  /* Helper to query currently focusable elements in the drawer */
  const getFocusableElements = () => {
    if (!drawerRef.current) return [];
    return Array.from(
      drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  };

  /* Manage initial focus and restoration upon close */
  useEffect(() => {
    if (isOpen) {
      // Record currently focused element before drawer opens
      prevActiveElementRef.current = triggerRef?.current || document.activeElement;

      // Move focus into the drawer's close button after render
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      return () => clearTimeout(timer);
    } else {
      // When closing, only restore focus if the trigger element is still visible in the layout
      const triggerEl = prevActiveElementRef.current;
      if (triggerEl && typeof triggerEl.focus === 'function') {
        const isTriggerVisible =
          window.innerWidth < 768 &&
          triggerEl.offsetParent !== null &&
          window.getComputedStyle(triggerEl).display !== 'none';

        if (isTriggerVisible) {
          triggerEl.focus();
        } else {
          // If resizing to desktop hid the trigger, blur or leave focus at body level
          if (document.activeElement === triggerEl) {
            document.activeElement.blur();
          }
        }
      }
    }
  }, [isOpen, triggerRef]);

  /* Strict keyboard focus trapping & Escape key listener */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = getFocusableElements();
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    // Containment guard: if focus moves outside the drawer unexpectedly, bring it back inside
    const handleFocusIn = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        const focusable = getFocusableElements();
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [isOpen, onClose]);

  /* Safe body scroll locking with clean teardown */
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflowY;
      document.body.style.overflowY = 'hidden';
      return () => {
        document.body.style.overflowY = originalOverflow || '';
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop overlay ──────────────────────────────── */}
          <motion.div
            key="backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'var(--color-overlay)',
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)',
              zIndex: 'var(--z-overlay)',
            }}
          />

          {/* ── Slide-over drawer ─────────────────────────────── */}
          <motion.div
            id="mobile-nav-drawer"
            key="drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(82vw, 320px)',
              backgroundColor: 'var(--color-surface)',
              zIndex: 'var(--z-modal)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {/* Brand mark */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    width: '1.75rem',
                    height: '1.75rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Leaf size={12} color="var(--color-accent)" strokeWidth={2.5} />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '700',
                    fontSize: '1rem',
                    color: 'var(--color-primary)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  FRESHMART
                </span>
              </div>

              {/* Close button */}
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close navigation menu"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2rem',
                  height: '2rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  transition: 'background-color 120ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-background)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Nav links */}
            <nav aria-label="Mobile menu navigation" style={{ flex: 1, padding: '1.25rem 1rem', overflowY: 'auto' }}>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {navLinks.map(({ label, href }, index) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + index * 0.05, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={href}
                      onClick={(e) => onNavClick(e, href)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        fontFamily: 'var(--font-body)',
                        fontWeight: '500',
                        fontSize: '1rem',
                        color: 'var(--color-text)',
                        textDecoration: 'none',
                        transition: 'background-color 120ms ease, color 120ms ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(32, 63, 50, 0.06)';
                        e.currentTarget.style.color = 'var(--color-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--color-text)';
                      }}
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Drawer Footer */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-caption)',
                  color: 'var(--color-text-muted)',
                  lineHeight: '1.5',
                }}
              >
                Freshness, Quality &amp; Everyday Convenience.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
