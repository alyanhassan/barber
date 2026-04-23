import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
}

export function FadeUp({ children, delay = 0, duration = 0.8, className = "", yOffset = 30 }: FadeUpProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
