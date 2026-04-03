import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, FileText, Shield, Umbrella, Building } from 'lucide-react';
import { GangaDivider } from './decorative';

const achievements = [
  { icon: Users, title: '18000+ સુરક્ષિત કુટુંબો', subtitle: 'Protected Families' },
  { icon: Users, title: '523+ ટીમ મેમ્બર', subtitle: 'Team Members' },
  { icon: Trophy, title: '300+ એવોર્ડ', subtitle: 'Awards' },
  { icon: FileText, title: '150 cr+ ક્લેઈમ પાસ', subtitle: 'Claims Passed' },
];
const insurance = [
  { icon: Shield, title: 'જીવન વીમો', subtitle: 'Life Insurance' },
  { icon: FileText, title: 'હેલ્થ વીમો', subtitle: 'Health Insurance' },
  { icon: Umbrella, title: 'બિઝનેસ વીમો', subtitle: 'Business Insurance' },
];
const investment = [{ icon: Building, title: 'મ્યુચ્યુઅલ ફંડ', subtitle: 'Mutual Fund' }];
const cities = ['અમદાવાદ', 'સુરત', 'મુંબઈ'];

const IconRow = ({ items, cols = 4 }) => (
  <div className={`sp-ach-grid sp-ach-grid-${cols}`}>
    {items.map((item, i) => {
      const Icon = item.icon;
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="sp-ach-item"
        >
          <Icon size={48} strokeWidth={1.5} className="sp-ach-icon" />
          <p className="sp-gujarati sp-ach-title">{item.title}</p>
          <p className="sp-ach-sub">{item.subtitle}</p>
        </motion.div>
      );
    })}
  </div>
);

const AchievementSection = () => (
  <section className="sp-section sp-ach-section sp-relative sp-overflow-hidden">
    {/* Video background */}
    <div className="sp-absolute-full sp-z0">
      <div className="sp-ach-overlay" />
      <iframe
        className="sp-ach-video"
        src="https://www.youtube.com/embed/CT3anN_PTRg?autoplay=1&mute=1&loop=1&playlist=CT3anN_PTRg&controls=0&showinfo=0&rel=0&modestbranding=1"
        title="CGPE Award Video"
        allow="autoplay; encrypted-media"
        style={{ border: 0, pointerEvents: 'none' }}
      />
    </div>

    <div className="sp-container sp-relative sp-z20">
      {/* Achievements */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="sp-text-center sp-mb-16">
        <h2 className="sp-ach-heading">ACHIEVEMENT</h2>
        <IconRow items={achievements} cols={4} />
      </motion.div>

      <GangaDivider className="sp-my-16" />

      {/* Insurance */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="sp-text-center sp-mb-16">
        <h2 className="sp-ach-heading">INSURANCE</h2>
        <IconRow items={insurance} cols={3} />
      </motion.div>

      <GangaDivider className="sp-my-16" />

      {/* ULIP */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="sp-text-center sp-mb-16">
        <h2 className="sp-ach-heading">ULIP INVESTMENT</h2>
        <IconRow items={investment} cols={1} />
      </motion.div>

      {/* Cities */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="sp-text-center sp-mt-20">
        <p className="sp-ach-cities-label">We Offer Our Services Across 3 Major Cities</p>
        <div className="sp-cities-row">
          {cities.map((city, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="sp-city-item">
              <div className="sp-gujarati sp-city-name">{city}</div>
              {i < cities.length - 1 && <div className="sp-city-divider" />}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default AchievementSection;
