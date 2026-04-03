import React from 'react';
import { motion } from 'framer-motion';
import { sectionVariants, staggerDelay, SectionLabel, SectionHeading } from './shared';
import { GangaDivider, FloatingFlowers, DiyaIcon } from './decorative';

const highlights = [
  { emoji: '🕉️', title: 'Shreemad Bhagavat Katha', guj: 'શ્રીમદ્ ભાગવત કથા', desc: '7-day continuous Bhagavat Katha by renowned Katha Gayak Sharad (Dada) Vyas.' },
  { emoji: '🌊', title: 'Ganga Aarti', guj: 'ગંગા આરતી', desc: 'Witness the divine Ganga Aarti ceremony at Haridwar, an unforgettable spiritual experience.' },
  { emoji: '🏔️', title: 'Sacred Rishikesh', guj: 'ઋષિકેશ દર્શન', desc: 'Visits to famous temples, ashrams, and sacred spots in the yoga capital of the world.' },
  { emoji: '🛕', title: 'Temple Darshan', guj: 'મંદિર દર્શન', desc: 'Seek blessings at ancient temples along the sacred Ganga with peaceful morning prayers.' },
  { emoji: '🎵', title: 'Devotional Satsang', guj: 'ભક્તિ સત્સંગ', desc: 'Evening satsang sessions with devotional songs, bhajans, and community prayers.' },
  { emoji: '🌅', title: 'Family Activities', guj: 'પારિવારિક આનંદ', desc: 'Special activities for all ages — children, elders, and families to enjoy together.' },
];

const HighlightsSection = () => (
  <section className="sp-section sp-bg-cream sp-relative sp-overflow-hidden">
    <FloatingFlowers count={6} className="sp-opacity-50" />

    <div className="sp-container sp-max-6xl">
      <motion.div {...sectionVariants} className="sp-text-center sp-mb-16">
        <SectionLabel>Programme Highlights</SectionLabel>
        <SectionHeading>What's in Store for You</SectionHeading>
        <p className="sp-gujarati sp-text-saffron sp-body-large sp-mt-2">
          <DiyaIcon size={16} className="sp-inline sp-mr-1" />
          ભક્તિ · જ્ઞાન · આનંદ · પ્રેમ
          <DiyaIcon size={16} className="sp-inline sp-ml-1" />
        </p>
      </motion.div>

      <div className="sp-highlights-grid-main">
        {highlights.map((h, i) => (
          <motion.div key={h.title} {...staggerDelay(i)} className="sp-highlight-main-card">
            <div className="sp-highlight-emoji">{h.emoji}</div>
            <h3 className="sp-card-h3 sp-text-heading sp-mb-1">{h.title}</h3>
            <p className="sp-gujarati sp-text-saffron sp-body-small sp-mb-3">{h.guj}</p>
            <p className="sp-body-small sp-text-muted">{h.desc}</p>
          </motion.div>
        ))}
      </div>

      <GangaDivider />
    </div>
  </section>
);

export default HighlightsSection;
