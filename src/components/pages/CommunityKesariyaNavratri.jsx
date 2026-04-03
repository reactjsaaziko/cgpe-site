import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CGPEHeader from '../headers/CGPEHeader';
import CGPEFooter from '../Footer';
import CommunityLanguageSelector from '../community/CommunityLanguageSelector';
import kn1 from '../../assets/kn1.png';
import kn2 from '../../assets/kn2\'.png';
import kn3 from '../../assets/kn3.png';
import kn4 from '../../assets/kn4.png';
import kn5 from '../../assets/kn5.png';
import kn6 from '../../assets/kn6.png';
import kn7 from '../../assets/kn7.png';
import knVideo from '../../assets/kn.mp4';

const galleryImages = [kn1, kn2, kn3, kn4, kn5, kn6, kn7];

const CommunityKesariyaNavratri = () => {
  return (
    <div className="ch-root">
      <CGPEHeader />
      <div className="ch-lang-bar">
        <div className="ch-container" style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 24px' }}>
          <CommunityLanguageSelector />
        </div>
      </div>

      {/* Main Content */}
      <section className="ch-container ch-detail-section" style={{ maxWidth: '1152px' }}>
        <Link to="/community" className="ch-back-link">
          <ArrowLeft size={16} /> Back to Community
        </Link>

        {/* CGPE Presented Section */}
        <div style={{ marginBottom: '48px' }}>
          <div className="ch-detail-badge">
            Community Excellence Initiative
          </div>
          <h1 className="ch-detail-h1">
            <span className="ch-primary-text">CGPE</span> Presents
          </h1>
          <h2 className="ch-detail-h2">
            Kesariya Navratri: A Celebration of Culture &amp; Community
          </h2>

          <div className="ch-prose">
            <p className="ch-body-text" style={{ fontSize: '17px' }}>
              At <span style={{ fontWeight: '600', color: 'var(--ch-text)' }}>Websuite CGPE</span>, we believe in building more than business relationships —{' '}
              we build lasting partnerships rooted in trust, shared values, and community engagement. Our commitment extends beyond
              providing exceptional insurance and financial solutions; we actively invest in the cultural fabric that strengthens our community.
            </p>
            <p className="ch-body-text" style={{ fontSize: '17px', marginBottom: '32px' }}>
              The <span className="ch-primary-text" style={{ fontWeight: '600' }}>Kesariya Navratri</span> celebration exemplifies this commitment.{' '}
              By sponsoring and organizing this vibrant cultural event, we demonstrate our dedication to preserving traditions,
              fostering unity, and creating meaningful experiences that bring people together. This is how we build trust —
              not just through policies and premiums, but through genuine community partnership.
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

        {/* Photo Gallery */}
        <div style={{ marginBottom: '64px' }}>
          <h3 className="ch-section-h3">Event Gallery</h3>
          <div className="ch-divider" style={{ width: '96px', marginBottom: '32px' }} />
          <div className="ch-kn-gallery">
            {galleryImages.map((img, i) => (
              <div key={i} className="ch-kn-gallery-item">
                <img
                  src={img}
                  alt={`Kesariya Navratri celebration moment ${i + 1}`}
                  className="ch-kn-gallery-img"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ch-kn-footer">
        <div className="ch-container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: 'var(--ch-muted)' }}>
            &copy; 2026 Websuite CGPE. All rights reserved. Building trust through community engagement.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CommunityKesariyaNavratri;
