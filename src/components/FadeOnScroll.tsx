import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeOnScrollProps {
  children: ReactNode;
  className?: string;
}

// Fades content in as it scrolls into view and back out as it leaves
// (viewport.once: false re-triggers the animation in both directions).
export function FadeOnScroll({ children, className }: FadeOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
