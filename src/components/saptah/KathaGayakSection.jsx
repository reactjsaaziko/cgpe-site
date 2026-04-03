import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, BookOpen, Award } from 'lucide-react';
import { sectionVariants, SectionLabel, SectionHeading } from './shared';
import { GangaDivider, MandalaSVG, FloatingParticles, CornerFlourish } from './decorative';
import vedVyasImg from './Ved-Vyas-tirth.jpg';

const highlights = [
  { icon: BookOpen, label: 'Kathas Delivered', value: '740+', description: 'Shreemad Bhagavat Kathas completed' },
  { icon: Globe, label: 'International Kathas', value: '130+', description: 'Conducted on international soil' },
  { icon: Users, label: 'Countries', value: 'Oman, UK, USA', description: 'Travels abroad 2 months yearly' },
  { icon: Award, label: 'Experience', value: '25+ Years', description: 'Of spiritual guidance' },
];

const KathaGayakSection = () => {
  return (
    <section className="sp-section sp-bg-saffron-light sp-relative sp-overflow-hidden">
      <div className="sp-absolute-full sp-pointer-none">
        <MandalaSVG className="sp-abs-top-left sp-text-primary" size={400} />
        <MandalaSVG className="sp-abs-bottom-right sp-text-primary" size={350} />
        <FloatingParticles count={8} />
        <CornerFlourish position="top-left" className="sp-opacity-40" />
        <CornerFlourish position="bottom-right" className="sp-opacity-40" />
      </div>
      <div className="sp-section-gradient-overlay" />

      <div className="sp-container sp-max-6xl sp-relative sp-z10">
        <motion.div {...sectionVariants} className="sp-text-center sp-mb-16">
          <SectionLabel>Katha Gayak · કથા ગાયક</SectionLabel>
          <SectionHeading>Your Spiritual Guide</SectionHeading>
          <p className="sp-body-regular sp-mt-4 sp-mx-auto" style={{ maxWidth: '640px' }}>
            Experience the beautiful narration of Shreemad Bhagavat by an inspiring storyteller
          </p>
        </motion.div>

        <div className="sp-katha-grid">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="sp-relative"
          >
            <motion.div className="sp-katha-photo-wrap" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <motion.img
                src={vedVyasImg}
                alt="Sharad (Dada) Vyas - Katha Gayak"
                className="sp-katha-photo"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            {...sectionVariants}
            transition={{ ...sectionVariants.transition, delay: 0.4 }}
            className="sp-katha-content"
          >
            <div className="sp-katha-bio">
              <h3 className="sp-card-h3 sp-text-heading sp-mb-2">Sharad (Dada) Vyas</h3>
              <p className="sp-gujarati sp-body-large sp-text-saffron sp-mb-4">શરદ (દાદા) વ્યાસ</p>
              <p className="sp-caption sp-text-muted">Dharampur</p>
            </div>

            <p className="sp-body-large sp-text-heading">
              A beloved Katha Gayak known for his deep knowledge of Shreemad Bhagavat and his gift for making ancient wisdom feel relevant to modern life.
            </p>
            <p className="sp-body-regular sp-text-muted">
              With many years of experience and a warm understanding of Vedic teachings, Dada has touched countless hearts around the world, sharing the timeless wisdom of Lord Krishna with devotees everywhere.
            </p>

            <div className="sp-highlights-grid">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="sp-highlight-card"
                  >
                    <div className="sp-highlight-icon">
                      <Icon size={20} className="sp-text-primary" />
                    </div>
                    <div className="sp-card-h3 sp-text-heading sp-mb-1">{item.value}</div>
                    <div className="sp-eyebrow sp-text-saffron sp-mb-1">{item.label}</div>
                    <div className="sp-body-small sp-text-muted">{item.description}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <GangaDivider />
      </div>
    </section>
  );
};

export default KathaGayakSection;
