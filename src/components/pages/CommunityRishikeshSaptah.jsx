import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CGPEHeader from '../headers/CGPEHeader';
import CGPEFooter from '../Footer';
import CommunityLanguageSelector from '../community/CommunityLanguageSelector';
import rishikeshImage from '../../assets/rishikesh-saptah.jpg';

const galleryImages = Array(12).fill(rishikeshImage);

const CommunityRishikeshSaptah = () => {
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
          <ArrowLeft size={16} /> Back to Community
        </Link>

        <div className="ch-detail-header">
          <div className="ch-detail-badge">Community Excellence Initiative</div>
          <h1 className="ch-detail-h1">
            <span className="ch-primary-text">CGPE</span> Presents
          </h1>
          <h2 className="ch-detail-h2">
            Rishikesh Saptah: A Spiritual Journey of Discovery
          </h2>

          <div className="ch-prose">
            <p className="ch-body-text">
              At <strong>Websuite CGPE</strong>, we believe in building more than business relationships —
              we build lasting partnerships rooted in trust, shared values, and community engagement. Our commitment extends beyond
              providing exceptional insurance and financial solutions; we actively invest in the cultural fabric that strengthens our community.
            </p>
            <p className="ch-body-text">
              The <span className="ch-primary-text" style={{ fontWeight: '600' }}>Rishikesh Saptah</span> celebration exemplifies this commitment.
              By sponsoring and organizing this transformative spiritual event, we demonstrate our dedication to preserving traditions,
              fostering unity, and creating meaningful experiences that bring people together. This is how we build trust —
              not just through policies and premiums, but through genuine community partnership.
            </p>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="ch-gallery-section">
          <h3 className="ch-section-h3">Event Gallery</h3>
          <div className="ch-divider" />
          <div className="ch-gallery-grid ch-gallery-grid-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="ch-gallery-item ch-gallery-item-tall">
                <img
                  src={img}
                  alt={`Rishikesh Saptah spiritual journey moment ${i + 1}`}
                  className="ch-gallery-img ch-gallery-img-hover"
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

export default CommunityRishikeshSaptah;
