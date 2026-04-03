import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import CGPEHeader from '../headers/CGPEHeader';
import CGPEFooter from '../Footer';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../lib/communityTranslations';
import CommunityLanguageSelector from '../community/CommunityLanguageSelector';

import silva1 from '../../assets/silva-meditation-1.jpg';
import silva2 from '../../assets/silva-meditation-2.jpg';
import navratri from '../../assets/kesariya-navratri.jpg';
import saptah from '../../assets/rishikesh-saptah.jpg';

const ForCommunityHub = () => {
  const { language } = useLanguage();

  const events = [
    {
      id: 'silva-meditation-session-1',
      titleKey: 'silvaMeditationSession1',
      tagKey: 'wellness',
      image: silva1,
      route: '/community/silva-meditation-session-1',
      descKey: 'silvaMeditation1Desc',
    },
    {
      id: 'silva-meditation-session-2',
      titleKey: 'silvaMeditationSession2',
      tagKey: 'wellness',
      image: silva2,
      route: '/community/silva-meditation-session-2',
      descKey: 'silvaMeditation2Desc',
    },
    // {
    //   id: 'kesariya-navratri',
    //   titleKey: 'kesariyaNavratri',
    //   tagKey: 'culturalCelebration',
    //   image: navratri,
    //   route: '/community/kesariya-navratri',
    //   descKey: 'kesariyaNavratriDesc',
    // },
    {
      id: 'surat-ac-dome-navratri',
      titleKey: 'suratAcDomeNavratri',
      tagKey: 'culturalCelebration',
      image: navratri,
      route: '/community/surat-ac-dome-navratri',
      descKey: 'suratAcDomeNavratriDesc',
    },
    {
      id: 'rishikesh-saptah',
      titleKey: 'rishikeshSaptah',
      tagKey: 'spiritualGathering',
      image: saptah,
      route: '/community/rishikesh-saptah',
      descKey: 'rishikeshSaptahDesc',
    },
  ];

  return (
    <div className="ch-root">
      <CGPEHeader />

      {/* Language selector bar */}
      <div className="ch-lang-bar">
        <div className="ch-container" style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 24px' }}>
          <CommunityLanguageSelector />
        </div>
      </div>

      {/* Hero Section */}
      <section className="ch-hero">
        <div className="ch-hero-bg-1" />
        <div className="ch-hero-bg-2" />

        <div className="ch-container ch-hero-content">
          <div className="ch-badge">
            <Sparkles size={14} />
            {t('ourCommunityEvents', language)}
          </div>
          <h1 className="ch-hero-title">
            {t('beyondWealth', language)}{' '}
            <span className="ch-gradient-text">{t('meaningfulLiving', language)}</span>
          </h1>
          <p className="ch-hero-desc">
            {t('communityDescription', language)}
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="ch-container ch-events-section">
        <div className="ch-events-grid">
          {events.map((event) => (
            <Link
              key={event.id}
              to={event.route}
              className="ch-event-card"
            >
              <div className="ch-event-img-wrap">
                <img
                  src={event.image}
                  alt={t(event.titleKey, language)}
                  className="ch-event-img"
                  loading="lazy"
                />
                <div className="ch-event-overlay" />
              </div>

              <div className="ch-event-body">
                <span className="ch-event-tag">
                  {t(event.tagKey, language)}
                </span>
                <h2 className="ch-event-title">
                  {t(event.titleKey, language)}
                </h2>
                <p className="ch-event-desc">
                  {t(event.descKey, language)}
                </p>
                <div className="ch-event-link">
                  {t('viewDetails', language)}
                  <ArrowRight size={13} className="ch-event-arrow" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CGPEFooter />
    </div>
  );
};

export default ForCommunityHub;
