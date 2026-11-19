import React, { useState, useRef, useEffect } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * NewsletterSection
 * Client-side email demonstration mockup.
 *
 * Validation Architecture:
 * - Employs `noValidate` on the form to allow our custom accessible validation messages
 *   to take precedence over inconsistent native browser tooltips.
 * - Uses a standard client-side pattern check (/^[^\s@]+@[^\s@]+\.[^\s@]+$/) suitable for
 *   frontend input validation (not a full RFC 5322 specification validator).
 * - Manages distinct required-field vs malformed-format error messages.
 * - Static local confirmation with immediate feedback.
 *
 * Accessibility & Focus Management:
 * - Uses a React `useEffect` with previous-state tracking (`prevSubmittedRef`) tied to `isSubmitted`
 *   to manage programmatic focus safely, including under React Strict Mode double-invocation.
 * - On successful submission: programmatic focus is shifted to the success heading (`tabIndex={-1}`).
 * - On form reset ("Test with another email"): focus is returned to the email input.
 * - On validation error: focus returns to the email input for immediate correction.
 * - Does not steal focus on initial page load or during Strict Mode remounts.
 *
 * Strict Compliance:
 * - NO backend submission
 * - NO external API integration
 * - NO artificial network latency delays
 * - Factual demonstration messaging clearly acknowledging local frontend execution
 */
export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inputRef = useRef(null);
  const successHeadingRef = useRef(null);
  const prevSubmittedRef = useRef(isSubmitted);

  // Standard client-side email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Focus management effect tied to isSubmitted state transition
  useEffect(() => {
    // If state has not changed (initial render or React Strict Mode re-mount), do not move focus
    if (prevSubmittedRef.current === isSubmitted) {
      return;
    }

    // Synchronize previous state ref
    prevSubmittedRef.current = isSubmitted;

    if (isSubmitted) {
      // Focus success heading when confirmation UI mounts
      successHeadingRef.current?.focus();
    } else {
      // Return focus to input when returning from confirmation UI
      inputRef.current?.focus();
    }
  }, [isSubmitted]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = email.trim();

    // 1. Required-field check
    if (!trimmed) {
      setError('Please enter your email address.');
      inputRef.current?.focus();
      return;
    }

    // 2. Format pattern check
    if (!emailPattern.test(trimmed)) {
      setError('Please enter a valid email address (e.g. name@example.com).');
      inputRef.current?.focus();
      return;
    }

    // 3. Clear errors and activate static local confirmation
    setError('');
    setIsSubmitted(true);
    setEmail('');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setError('');
  };

  return (
    <section
      id="newsletter"
      aria-label="Newsletter Demonstration"
      className="section-padding border-t"
      style={{
        backgroundColor: 'var(--color-background)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="container-page">
        <div
          className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-10 md:p-12 text-center border shadow-sm"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Section Icon Badge */}
          <div
            className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-4"
            style={{
              backgroundColor: 'rgba(32, 63, 50, 0.08)',
              color: 'var(--color-primary)',
            }}
          >
            <Mail size={22} strokeWidth={2.2} aria-hidden="true" />
          </div>

          {/* Headline */}
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tight mb-3"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-primary)',
            }}
          >
            Stay Connected with FRESHMART
          </h2>

          {/* Subtitle */}
          <p
            className="text-xs md:text-sm leading-relaxed max-w-md mx-auto mb-8"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            Experience our frontend newsletter demonstration. Enter your email below
            to test client-side validation and instant local confirmation.
          </p>

          <AnimatePresence>
            {!isSubmitted ? (
              /* Input Form with noValidate to ensure custom accessible feedback */
              <motion.form
                key="newsletter-form"
                noValidate
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md mx-auto"
              >
                <div className="relative flex-1 text-left">
                  {/* Visually Hidden Accessible Label */}
                  <label
                    htmlFor="newsletter-email-input"
                    className="sr-only"
                  >
                    Email address for newsletter demonstration
                  </label>

                  <input
                    ref={inputRef}
                    type="email"
                    name="email"
                    id="newsletter-email-input"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address…"
                    autoComplete="email"
                    aria-describedby={error ? 'newsletter-error-msg' : undefined}
                    aria-invalid={Boolean(error)}
                    className="w-full px-4 py-3 rounded-full text-xs md:text-sm border transition-all"
                    style={{
                      backgroundColor: 'var(--color-background)',
                      borderColor: error ? 'var(--color-error)' : 'var(--color-border)',
                      color: 'var(--color-text)',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="px-6 py-3 rounded-full text-xs md:text-sm font-semibold transition-all shrink-0 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-white)',
                    fontFamily: 'var(--font-body)',
                  }}
                  whileHover={{ scale: 1.03, backgroundColor: 'var(--color-primary-hover)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </motion.form>
            ) : (
              /* Static Demonstration Success Confirmation */
              <motion.div
                key="newsletter-success"
                role="status"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 rounded-2xl border text-center flex flex-col items-center max-w-md mx-auto"
                style={{
                  backgroundColor: 'var(--color-success-light)',
                  borderColor: 'rgba(58, 125, 90, 0.25)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2.5"
                  style={{ backgroundColor: 'var(--color-success)', color: 'var(--color-white)' }}
                >
                  <CheckCircle2 size={22} strokeWidth={2.5} />
                </div>

                <h3
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="font-bold text-sm md:text-base mb-1 outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-sm"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-success)' }}
                >
                  Demo Submission Received
                </h3>

                <p
                  className="text-xs leading-relaxed mb-4"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}
                >
                  Thanks for your interest! This newsletter demo is working locally.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs underline font-medium cursor-pointer transition-opacity hover:opacity-80"
                  style={{ color: 'var(--color-success)' }}
                >
                  Test with another email
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Accessible Validation Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                id="newsletter-error-msg"
                role="alert"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium"
                style={{ color: 'var(--color-error)', fontFamily: 'var(--font-body)' }}
              >
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Demonstration Notice Disclaimer */}
          <p
            className="text-[11px] mt-6 tracking-wide"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            Frontend demonstration only · No data is sent or stored externally.
          </p>
        </div>
      </div>
    </section>
  );
}
