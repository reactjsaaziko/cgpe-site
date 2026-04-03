import React from 'react';

const ease = [0.25, 0.1, 0.25, 1];

export const sectionVariants = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.8, ease },
};

export const staggerChildren = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease },
};

export const staggerDelay = (index) => ({
  ...staggerChildren,
  transition: { ...staggerChildren.transition, delay: index * 0.08 },
});

export const SectionLabel = ({ children }) => (
  <span className="sp-eyebrow block mb-3">{children}</span>
);

export const SectionHeading = ({ children, className = '' }) => (
  <h2 className={`sp-section-h2 sp-header-glow ${className}`}>{children}</h2>
);
