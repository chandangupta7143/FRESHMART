import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnnouncementBar
 * Slim top strip with honest, descriptive brand messaging.
 * Uses forest green background + citrus accent text.
 */
export default function AnnouncementBar() {
  return (
    <motion.div
      className="w-full text-center px-4 py-2.5 bg-primary"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <p
        className="text-xs font-medium tracking-wide text-accent"
        style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.03em' }}
      >
        🌿&nbsp;&nbsp;A thoughtful selection for your everyday table.
        <span className="mx-2 opacity-40 select-none">|</span>
        <span className="opacity-80">Discover our seasonal harvest selection</span>
      </p>
    </motion.div>
  );
}
