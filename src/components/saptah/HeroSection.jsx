import React from 'react';
import { motion } from 'framer-motion';
import { FloatingParticles, FloatingDiyas, PulsingOm, MandalaSVG, OmSymbol, DiyaIcon, PeacockFeatherIcon, ConchIcon } from './decorative';

const HeroSection = () => {
  return (
    <section className="sp-hero">
      {/* YouTube background */}
      <div className="sp-hero-bg">
        <div className="sp-hero-video-wrap">
          <iframe
            className="sp-hero-iframe"
            src="https://www.youtube.com/embed/_Sj-tf26TcY?start=216&autoplay=1&mute=1&controls=0&loop=1&playlist=_Sj-tf26TcY&playsinline=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&vq=hd1080"
            title="Rishikesh Ganga Aarti"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="eager"
            style={{ border: 0, pointerEvents: 'none' }}
          />
        </div>
        <div className="sp-hero-overlay" />
      </div>

      <FloatingParticles count={10} />
      <FloatingDiyas count={6} />

      <div className="sp-hero-om-bg">
        <PulsingOm className="sp-om-watermark" />
      </div>
      <div className="sp-hero-content">
        {/* Top */}
        <div className="sp-container sp-text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="sp-mb-6">
            <p className="sp-devanagari sp-hero-mantra">ॐ नमो भगवते वासुदेवाय</p>
            <p className="sp-hero-mantra-latin">Om Namo Bhagavate Vasudevaya</p>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="sp-eyebrow-light sp-block"
          >
            <DiyaIcon size={18} className="sp-inline sp-mr-2" />
            CGPE Presents · Shreemad Bhagavat Saptah
            <DiyaIcon size={18} className="sp-inline sp-ml-2" />
          </motion.span>
        </div>
        {/* Bottom */}
        <div className="sp-container sp-text-center sp-hero-bottom">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="sp-hero-h1"
          >
            Beyond Financial Security.
            <br />
            A Journey to Inner Peace.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="sp-hero-support"
          >
            CGPE has always been there for your family's financial future. Now, join us in Rishikesh for a beautiful spiritual week filled with peace, joy, and positive energy for your whole family.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="sp-gujarati sp-hero-guj"
          >
            શ્રીમદ્ ભાગવત સપ્તાહ · ઋષિકેશ · પવિત્ર ગંગા તટ
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="sp-hero-badge-row"
          >
            <OmSymbol className="sp-om-primary" />
            <span className="sp-eyebrow-light">10 Days · 1 Sacred River · Your Entire Family Cared For</span>
            <OmSymbol className="sp-om-primary" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
