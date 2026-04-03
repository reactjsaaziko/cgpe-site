import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CGPEHeader from '../headers/CGPEHeader';
import CGPEFooter from '../Footer';
import CommunityLanguageSelector from '../community/CommunityLanguageSelector';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../lib/communityTranslations';
import kn1 from '../../assets/kn1.png';
import kn2 from '../../assets/kn2\'.png';
import kn3 from '../../assets/kn3.png';
import kn4 from '../../assets/kn4.png';
import kn5 from '../../assets/kn5.png';
import kn6 from '../../assets/kn6.png';
import kn7 from '../../assets/kn7.png';
import knVideo from '../../assets/kn.mp4';

const galleryImages = [kn1, kn2, kn3, kn4, kn5, kn6, kn7];

const CommunitySuratNavratri = () => {
  const { language } = useLanguage();

  return (
    <div className="ch-root">
      <CGPEHeader />
      <div className="ch-lang-bar">
        <div className="ch-container" style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 24px' }}>
          <CommunityLanguageSelector />
        </div>
      </div>

      <section className="ch-container ch-detail-section" style={{ maxWidth: '1152px' }}>
        <Link to="/community" className="ch-back-link">
          <ArrowLeft size={16} /> {t('backToCommunity', language)}
        </Link>

        <div style={{ marginBottom: '48px' }}>
          <div className="ch-detail-badge">
            {t('exclusiveForCGPE', language)}
          </div>
          <h1 className="ch-detail-h1">
            <span className="ch-primary-text">CGPE</span>{' '}
            {language === 'en' ? 'Presents' : language === 'hi' ? 'प्रस्तुत करता है' : 'રજૂ કરે છે'}
          </h1>
          <h2 className="ch-detail-h2">
            <span className="ch-primary-text">
              {t('suratNavratriTitle', language)}
            </span>
          </h2>

          <div className="ch-prose">
            <p className="ch-body-text" style={{ fontSize: '17px', marginBottom: '32px' }}>
              {t('suratNavratriIntro', language)}
            </p>
          </div>
        </div>

        {/* Event Video */}
        <div style={{ marginBottom: '56px' }}>
          <h3 className="ch-section-h3">Event Highlights</h3>
          <div className="ch-divider" style={{ width: '96px', marginBottom: '28px' }} />
          <div className="ch-video-wrap">
            <video controls className="ch-video" poster={kn1}>
              <source src={knVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div style={{ marginBottom: '64px' }}>
          <h3 className="ch-section-h3">Event Gallery</h3>
          <div className="ch-divider" style={{ width: '96px', marginBottom: '32px' }} />
          <div className="ch-kn-gallery">
            {galleryImages.map((img, i) => (
              <div key={i} className="ch-kn-gallery-item">
                <img
                  src={img}
                  alt={`Surat AC Dome Navratri 2024 moment ${i + 1}`}
                  className="ch-kn-gallery-img"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CGPEFooter />
    </div>
  );
};

export default CommunitySuratNavratri;
