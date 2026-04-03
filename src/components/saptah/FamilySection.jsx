import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sun, Users, Flower2, Brain } from 'lucide-react';
import { sectionVariants, staggerDelay, SectionLabel, SectionHeading } from './shared';
import { GangaDivider, FloatingParticles, FloatingFlowers } from './decorative';

const experiences = [
  { icon: Users, title: 'Family Bonding', guj: 'કુટુંબ જોડાણ', description: 'Enjoy quality time with your loved ones in a peaceful, beautiful setting away from daily distractions.' },
  { icon: Brain, title: 'Mental Wellness', guj: 'માનસિક શાંતિ', description: 'Take a refreshing break from stress — a full week to relax, recharge, and feel calm inside.' },
  { icon: Sun, title: 'Spiritual Joy', guj: 'આધ્યાત્મિક દૃઢતા', description: 'Experience uplifting katha, satsang, and the divine blessings of Maa Ganga.' },
  { icon: Heart, title: 'Emotional Happiness', guj: 'ભાવનાત્મક સુખાકારી', description: 'Feel truly cared for. This is about your happiness and heart, not just finances.' },
  { icon: Flower2, title: 'Blessings for Tomorrow', guj: 'ભવિષ્ય માટે આશીર્વાદ', description: "Receive divine blessings for your children's bright future and your family's health and happiness." },
];

const FamilySection = () => (
  <section className="sp-section sp-relative sp-overflow-hidden">
    <FloatingFlowers count={6} />
    <FloatingParticles count={5} />

    <div className="sp-container sp-max-5xl">
      <motion.div {...sectionVariants} className="sp-text-center sp-mb-16">
        <SectionLabel>For Your Family</SectionLabel>
        <SectionHeading>A Beautiful Experience for Your Whole Family</SectionHeading>
        <p className="sp-body-regular sp-text-muted sp-mt-6 sp-mx-auto" style={{ maxWidth: '640px' }}>
          This is more than just an event. It's a special break from everyday life — a full week where your family can relax, reconnect, and grow together in joy.
        </p>
      </motion.div>

      <div className="sp-family-grid">
        {experiences.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.title} {...staggerDelay(i)} className="sp-family-card">
              <div className="sp-family-icon">
                <Icon size={24} className="sp-text-primary" />
              </div>
              <h3 className="sp-card-h3 sp-text-heading sp-mb-1">{item.title}</h3>
              <p className="sp-gujarati sp-text-saffron sp-body-small sp-mb-3">{item.guj}</p>
              <p className="sp-body-small sp-text-muted">{item.description}</p>
            </motion.div>
          );
        })}
      </div>

      <GangaDivider />
    </div>
  </section>
);

export default FamilySection;
