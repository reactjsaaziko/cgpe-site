import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sectionVariants, SectionLabel, SectionHeading } from './shared';
import { GangaDivider, FloatingParticles, DiyaIcon } from './decorative';

const MessageSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="sp-section sp-bg-cream sp-relative sp-overflow-hidden">
      <FloatingParticles count={5} />
      <div className="sp-container sp-max-3xl sp-text-center sp-relative sp-z10">
        <motion.div {...sectionVariants}>
          <DiyaIcon className="sp-text-primary sp-mx-auto sp-mb-4" size={28} />
          <SectionLabel>From the Heart</SectionLabel>
          <SectionHeading>A Personal Invitation from CGPE</SectionHeading>
          <p className="sp-gujarati sp-text-muted sp-body-small sp-mt-3">
            CGPE તરફથી એક હૃદયપૂર્વક આમંત્રણ
          </p>
        </motion.div>

        <motion.div
          {...sectionVariants}
          transition={{ ...sectionVariants.transition, delay: 0.2 }}
          className="sp-message-card sp-ornate-corner sp-relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="sp-om-watermark-card">ॐ</span>

          <motion.div
            animate={isHovered ? { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'] } : { clipPath: 'inset(0 0 0 0)' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <p className="sp-body-regular sp-mb-4">Dear families,</p>
            <p className="sp-body-regular sp-mb-4">
              You've trusted us with your family's dreams — your children's education, your retirement, and your peace of mind. Your trust means the world to us.
            </p>
            <p className="sp-body-regular sp-mb-4">
              Now, we want to give back in a special way. Join us in the beautiful, sacred land of Rishikesh where we'll take care of you with love and gratitude.
            </p>
            <div className="sp-gold-divider sp-mx-auto sp-my-6" />
            <p className="sp-text-quote">
              "Let us nurture your inner peace, just like we nurture your future."
            </p>
            <p className="sp-gujarati sp-text-muted sp-body-small sp-mt-3">
              "તમારી શાંતિની સેવા અમને કરવા દો, જેમ અમે તમારા ભવિષ્યની સેવા કરીએ છીએ."
            </p>
            <p className="sp-eyebrow sp-text-saffron sp-mt-6">— Team CGPE</p>
          </motion.div>
        </motion.div>

        <GangaDivider />
      </div>
    </section>
  );
};

export default MessageSection;
