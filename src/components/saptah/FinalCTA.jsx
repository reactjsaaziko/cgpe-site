import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { sectionVariants, SectionLabel, SectionHeading } from './shared';
import { FloatingParticles, DiyaIcon, MandalaSVG } from './decorative';

const FinalCTA = () => (
  <section className="sp-cta-section sp-relative sp-overflow-hidden sp-text-center">
    <FloatingParticles count={10} />
    <div className="sp-cta-mandala"><MandalaSVG size={600} className="sp-text-primary" /></div>

    <div className="sp-container sp-max-3xl sp-relative sp-z10">
      <motion.div {...sectionVariants}>
        <DiyaIcon size={32} className="sp-mx-auto sp-mb-6" />
        <SectionLabel>Join Us</SectionLabel>
        <SectionHeading>Be Part of This Sacred Journey</SectionHeading>
        <p className="sp-gujarati sp-text-saffron sp-body-large sp-mt-2">આ પવિત્ર યાત્રામાં જોડાઓ</p>
      </motion.div>

      <motion.div
        {...sectionVariants}
        transition={{ ...sectionVariants.transition, delay: 0.2 }}
        className="sp-cta-card"
      >
        <p className="sp-body-large sp-mb-6">
          Spaces are limited. Reserve your family's place today and embark on a journey that will fill your heart with peace, joy, and lasting memories.
        </p>
        <p className="sp-gujarati sp-text-muted sp-body-small sp-mb-8">
          સ્થળ મર્યાદિત છે. આજે જ તમારા કુટુંબ માટે સ્થાન સુરક્ષિત કરો.
        </p>

        <div className="sp-cta-buttons">
          <a href="tel:+919999999999" className="sp-cta-btn-primary">
            <Phone size={18} />
            Call Us Now
          </a>
          <a href="mailto:info@cgpe.in" className="sp-cta-btn-secondary">
            <Mail size={18} />
            Email Us
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
