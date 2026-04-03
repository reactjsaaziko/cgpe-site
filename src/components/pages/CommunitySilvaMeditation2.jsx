import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import CGPEHeader from '../headers/CGPEHeader';
import CGPEFooter from '../Footer';
import CommunityLanguageSelector from '../community/CommunityLanguageSelector';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../lib/communityTranslations';
import videoSrc from '../../assets/2024sm.mp4';
import sm1 from '../../assets/2024sm1.png';
import sm2 from '../../assets/2024sm2.png';
import sm3 from '../../assets/2024sm3.png';
import sm4 from '../../assets/2024sm4.png';
import sm5 from '../../assets/2024sm5.png';
import sm6 from '../../assets/2024sm6.png';
import sm7 from '../../assets/2024sm7.png';
import sm8 from '../../assets/2024sm8.png';
import sm9 from '../../assets/2024sm9.png';
import sm10 from '../../assets/2024sm10.jpeg';

const galleryImages = [sm1, sm2, sm3, sm4, sm5, sm6, sm7, sm8, sm9, sm10];

const CommunitySilvaMeditation2 = () => {
  const { language } = useLanguage();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

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

        {/* Header */}
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
              {t('silvaSession2Title', language)}
            </span>
          </h2>

          <div className="ch-prose">
            <p className="ch-body-text" style={{ fontSize: '17px', marginBottom: '32px' }}>
              {t('silvaSession2Intro', language)}
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div style={{ marginBottom: '64px' }}>
          <h3 className="ch-section-h3">
            {language === 'en' ? 'Session Highlights' : language === 'hi' ? 'सत्र की झलकियाँ' : 'સત્ર હાઇલાઇટ્સ'}
          </h3>
          <div className="ch-divider" style={{ width: '96px', marginBottom: '32px' }} />

          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#000',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            maxWidth: '860px',
            margin: '0 auto',
          }}>
            <video
              ref={videoRef}
              src={videoSrc}
              style={{ width: '100%', display: 'block', maxHeight: '480px', objectFit: 'cover' }}
              playsInline
              autoPlay
              muted
              preload="auto"
              onEnded={() => setPlaying(false)}
            />

            {/* Bottom control bar */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '16px 20px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <button
                onClick={togglePlay}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.95)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {playing
                  ? <Pause size={18} style={{ color: '#1e293b' }} />
                  : <Play size={18} style={{ color: '#1e293b', marginLeft: '2px' }} />
                }
              </button>

              <button
                onClick={toggleMute}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {muted
                  ? <VolumeX size={16} style={{ color: '#fff' }} />
                  : <Volume2 size={16} style={{ color: '#fff' }} />
                }
              </button>

              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontWeight: '500' }}>
                Silva Meditation Session — 2024, Surat
              </span>
            </div>

            {/* Big play overlay when paused */}
            {!playing && (
              <div
                onClick={togglePlay}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  background: 'rgba(0,0,0,0.25)',
                }}
              >
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.92)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}>
                  <Play size={30} style={{ color: '#1e293b', marginLeft: '4px' }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Photo Gallery */}
        <div style={{ marginBottom: '64px' }}>
          <h3 className="ch-section-h3">
            {language === 'en' ? 'Event Gallery' : language === 'hi' ? 'कार्यक्रम गैलरी' : 'ઇવેન્ટ ગેલેરી'}
          </h3>
          <div className="ch-divider" style={{ width: '96px', marginBottom: '32px' }} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {galleryImages.map((img, i) => (
              <div
                key={i}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  aspectRatio: '16/10',
                }}
              >
                <img
                  src={img}
                  alt={`Silva Meditation 2024 moment ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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

export default CommunitySilvaMeditation2;
