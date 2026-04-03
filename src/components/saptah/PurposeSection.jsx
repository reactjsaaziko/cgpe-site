import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sectionVariants, staggerDelay, SectionLabel, SectionHeading } from './shared';
import { GangaDivider, SanskritShloka } from './decorative';
import leftPhoto from './saptah-invite-1.png';
import rightPhoto from './saptah-invite-2.png';

const PurposeSection = () => {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  return (
    <section className="sp-section sp-bg-white">
      <div className="sp-container sp-max-7xl">
        <motion.div {...sectionVariants} className="sp-text-center">
          <SectionLabel>Our Purpose</SectionLabel>
          <SectionHeading>True Care Goes Beyond Money</SectionHeading>
        </motion.div>

        <div className="sp-purpose-grid">
          {/* Left Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="sp-purpose-photo sp-hidden-mobile"
            onMouseEnter={() => setIsLeftHovered(true)}
            onMouseLeave={() => setIsLeftHovered(false)}
          >
            <motion.img
              src={leftPhoto}
              alt="Chhaganbhai Gordhanbhai Sheliya"
              className="sp-purpose-img"
              animate={isLeftHovered ? { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'] } : { clipPath: 'inset(0 0 0 0)' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Center Content */}
          <motion.div {...staggerDelay(1)} className="sp-purpose-text">
            <p className="sp-body-regular">
              At CGPE, we believe real protection is about more than just finances. Yes, we help keep your family safe and build a bright future for your children.
            </p>
            <p className="sp-body-regular">
              But we also know that peace of mind, happiness, and spiritual wellness are just as important for a healthy life.
            </p>
            <p className="sp-body-large sp-mt-10">
              This Saptah is our way of spending quality time with families we care about, supporting your emotional wellness, and giving you a peaceful, uplifting experience in the sacred beauty of Rishikesh.
            </p>
          </motion.div>

          {/* Right Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="sp-purpose-photo-right sp-hidden-mobile"
            onMouseEnter={() => setIsRightHovered(true)}
            onMouseLeave={() => setIsRightHovered(false)}
          >
            <motion.img
              src={rightPhoto}
              alt="Gordhanbhai Arjanbhai Sheliya"
              className="sp-purpose-img"
              animate={isRightHovered ? { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'] } : { clipPath: 'inset(0 0 0 0)' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        <motion.div {...staggerDelay(2)} className="sp-mt-12">
          <SanskritShloka
            text="सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः"
            translation="May all be happy, may all be free from illness"
          />
        </motion.div>

        <GangaDivider />
      </div>
    </section>
  );
};

export default PurposeSection;
