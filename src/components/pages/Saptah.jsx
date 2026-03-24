import React from 'react';
import CGPEHeader from '../headers/CGPEHeader';
import HeroSection from '../saptah/HeroSection';
import PurposeSection from '../saptah/PurposeSection';
import KathaGayakSection from '../saptah/KathaGayakSection';
import MessageSection from '../saptah/MessageSection';
import AchievementSection from '../saptah/AchievementSection';
import FamilySection from '../saptah/FamilySection';
import WhyRishikesh from '../saptah/WhyRishikesh';
import HighlightsSection from '../saptah/HighlightsSection';
import GallerySection from '../saptah/GallerySection';
import FinalCTA from '../saptah/FinalCTA';
import SaptahFooter from '../saptah/SaptahFooter';
import '../saptah/Saptah.css';

const Saptah = () => {
  return (
    <div className="saptah-page">
      <CGPEHeader />
      <main className="overflow-hidden">
        <HeroSection />
        <PurposeSection />
        <KathaGayakSection />
        <MessageSection />
        <AchievementSection />
        <FamilySection />
        <WhyRishikesh />
        <HighlightsSection />
        <GallerySection />
        <FinalCTA />
        <SaptahFooter />
      </main>
    </div>
  );
};

export default Saptah;
