import React from 'react';
import { motion } from 'framer-motion';
import { sectionVariants, staggerDelay, SectionLabel, SectionHeading } from './shared';
import { GangaDivider, MandalaSVG, FloatingParticles } from './decorative';
import gangaImg from './rishikesh-ganga.jpg';
import heroImg from './hero-rishikesh.jpg';

const reasons = [
  { title: 'Sacred Ganga Banks', guj: 'ગંગા કિનારો', desc: 'Begin each day with a divine dip in Maa Ganga and witness the awe-inspiring Ganga Aarti in the evening.' },
  { title: 'Spiritual Atmosphere', guj: 'આધ્યાત્મિક વાતાવરણ', desc: "Rishikesh's ancient temples, ashrams, and natural beauty create the perfect setting for inner peace and reflection." },
  { title: 'Divine Vibrations', guj: 'દૈવી ઊર્જા', desc: 'Feel the positive energy of this sacred land, known since ancient times as a place for spiritual transformation.' },
  { title: 'Natural Beauty', guj: 'કુદરતી સૌંદર્ય', desc: 'Surrounded by the Himalayas and the flowing Ganga, nature itself becomes your companion for this spiritual journey.' },
];

const WhyRishikesh = () => (
  <section className="sp-section sp-relative sp-overflow-hidden">
    <FloatingParticles count={6} />
    <div className="sp-absolute-full sp-pointer-none" style={{ opacity: 0.04 }}>
      <MandalaSVG size={600} className="sp-abs-center sp-text-primary" />
    </div>

    <div className="sp-container sp-max-6xl">
      <motion.div {...sectionVariants} className="sp-text-center sp-mb-16">
        <SectionLabel>The Sacred Setting</SectionLabel>
        <SectionHeading>Why Rishikesh?</SectionHeading>
        <p className="sp-gujarati sp-text-saffron sp-body-large sp-mt-2">ઋષિકેશ · ગંગા · પ્રકૃતિ · ભક્તિ</p>
      </motion.div>

      <div className="sp-why-grid">
        {/* Images */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="sp-why-images">
          <div className="sp-why-img-main">
            <img src={gangaImg} alt="Sacred Ganga in Rishikesh" className="sp-why-img" />
          </div>
          <div className="sp-why-img-secondary">
            <img src={heroImg} alt="Rishikesh temples" className="sp-why-img" />
          </div>
        </motion.div>

        {/* Reasons */}
        <div className="sp-why-reasons">
          {reasons.map((r, i) => (
            <motion.div key={r.title} {...staggerDelay(i)} className="sp-why-card">
              <div className="sp-why-num">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h3 className="sp-card-h3 sp-text-heading sp-mb-1">{r.title}</h3>
                <p className="sp-gujarati sp-text-saffron sp-body-small sp-mb-2">{r.guj}</p>
                <p className="sp-body-small sp-text-muted">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <GangaDivider />
    </div>
  </section>
);

export default WhyRishikesh;
