import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sectionVariants, SectionLabel, SectionHeading } from './shared';
import { GangaDivider, FloatingFlowers, LotusIcon, CornerFlourish } from './decorative';
import satsangImg from './satsang.jpg';
import gangaAartiImg from './ganga-aarti.jpg';
import rishikeshImg from './bbb.jpg';
import heroImg from './aaa.jpg';

const images = [
  { src: heroImg, alt: 'Sunrise over temples in Rishikesh' },
  { src: gangaAartiImg, alt: 'Ganga aarti with floating diyas' },
  { src: satsangImg, alt: 'Devotional satsang gathering' },
  { src: rishikeshImg, alt: 'Sacred Ganga banks with marigold flowers' },
];

const duplicated = [...images, ...images, ...images];

const GallerySection = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="sp-section sp-bg-cream sp-relative sp-overflow-hidden">
      <FloatingFlowers count={5} className="sp-opacity-70" />
      <div className="sp-gallery-lotus-left"><LotusIcon size={36} /></div>
      <div className="sp-gallery-lotus-right"><LotusIcon size={36} /></div>
      <CornerFlourish position="top-left" className="sp-opacity-50" />
      <CornerFlourish position="bottom-right" className="sp-opacity-50" />

      <div className="sp-container sp-max-6xl sp-mb-12">
        <motion.div {...sectionVariants} className="sp-text-center">
          <SectionLabel>The Atmosphere</SectionLabel>
          <SectionHeading>A Glimpse of What Awaits</SectionHeading>
          <p className="sp-gujarati sp-text-saffron sp-body-large sp-mt-2">દર્શન · વાતાવરણ · ભક્તિ</p>
        </motion.div>
      </div>

      {/* Auto-scrolling carousel */}
      <div
        className="sp-gallery-carousel-wrap"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="sp-gallery-track"
          animate={{ x: [0, -(images.length * (320 + 24))] }}
          transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 30, ease: 'linear' } }}
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {duplicated.map((img, i) => (
            <div key={i} className="sp-gallery-card sp-card-shadow">
              <img src={img.src} alt={img.alt} className="sp-gallery-card-img" loading="lazy" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="sp-container sp-max-6xl sp-mt-12">
        <GangaDivider />
      </div>
    </section>
  );
};

export default GallerySection;
