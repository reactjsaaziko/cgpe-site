import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CGPEHeader from '../headers/CGPEHeader';
import CGPEFooter from '../Footer';
import CommunityLanguageSelector from '../community/CommunityLanguageSelector';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../lib/communityTranslations';

import silvaImage1 from '../../assets/silva-meditation-1.jpg';
import silvaImage2 from '../../assets/silva-meditation-2.jpg';
import navratriImage from '../../assets/kesariya-navratri.jpg';

const CommunityEventDetail = () => {
  const { eventId } = useParams();
  const { language } = useLanguage();

  const titles = {
    'silva-meditation-session-1': 'Silva Meditation 2022',
    'silva-meditation-session-2': 'Silva Meditation 2024',
    'kesariya-navratri': 'Kesariya Navratri',
    'rishikesh-saptah': 'Rishikesh Saptah',
  };

  const title = titles[eventId || ''] || 'Event Not Found';
  const isSilvaMeditation = eventId?.includes('silva-meditation');

  const galleryImages =
    eventId === 'silva-meditation-session-2'
      ? [silvaImage1, silvaImage2, silvaImage1, silvaImage2, silvaImage1, silvaImage2, silvaImage1, silvaImage2, silvaImage1, silvaImage2, silvaImage1, silvaImage2]
      : eventId === 'kesariya-navratri'
      ? [navratriImage, navratriImage, navratriImage, navratriImage, navratriImage, navratriImage]
      : [silvaImage1, silvaImage2, silvaImage1];

  if (isSilvaMeditation) {
    return (
      <div className="ch-root">
        <CGPEHeader />
        <div className="ch-lang-bar">
          <div className="ch-container" style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 24px' }}>
            <CommunityLanguageSelector />
          </div>
        </div>

        <section className="ch-container ch-detail-section">
          <Link to="/community" className="ch-back-link">
            <ArrowLeft size={16} /> {t('backToCommunity', language)}
          </Link>

          <div className="ch-detail-header">
            <div className="ch-detail-badge">{t('exclusiveForCGPE', language)}</div>
            <h1 className="ch-detail-h1">
              <span className="ch-primary-text">CGPE</span>{' '}
              {language === 'en' ? 'Presents' : language === 'hi' ? 'प्रस्तुत करता है' : 'રજૂ કરે છે'}
            </h1>
            <h2 className="ch-detail-h2">
              <span className="ch-primary-text">
                {eventId === 'silva-meditation-session-2'
                  ? t('silvaSession2Title', language)
                  : t('silvaSession1PageTitle', language)}
              </span>
            </h2>
            <p className="ch-detail-intro">
              {eventId === 'silva-meditation-session-2'
                ? t('silvaSession2Intro', language)
                : t('silvaSession1PageDesc', language)}
            </p>
          </div>

          {/* Video */}
          <div className="ch-video-wrap">
            <video controls autoPlay muted playsInline className="ch-video" poster={silvaImage1} preload="auto">
              <source
                src={
                  eventId === 'silva-meditation-session-2'
                    ? '/videos/silva-meditation-session-2.mp4'
                    : '/videos/silva-meditation-session-1.mp4'
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Gallery */}
          <div className="ch-gallery-section">
            <h3 className="ch-section-h3">Session Gallery</h3>
            <div className="ch-divider" />
            <div className="ch-gallery-grid">
              {galleryImages.map((img, i) => (
                <div key={i} className="ch-gallery-item">
                  <img src={img} alt={`${title} ${i + 1}`} className="ch-gallery-img" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <CGPEFooter />
      </div>
    );
  }

  return (
    <div className="ch-root">
      <CGPEHeader />
      <div className="ch-lang-bar">
        <div className="ch-container" style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 24px' }}>
          <CommunityLanguageSelector />
        </div>
      </div>

      <section className="ch-container ch-detail-section" style={{ textAlign: 'center' }}>
        <Link to="/community" className="ch-back-link">
          <ArrowLeft size={16} /> Back to Community
        </Link>
        <h1 className="ch-detail-h1" style={{ marginTop: '16px' }}>{title}</h1>
        <p className="ch-body-text" style={{ maxWidth: '480px', margin: '16px auto' }}>
          Full event details coming soon. Stay tuned!
        </p>
      </section>

      <CGPEFooter />
    </div>
  );
};

export default CommunityEventDetail;
