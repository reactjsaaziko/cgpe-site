import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';

const AmitDaveSession = () => {
  const navigate = useNavigate();
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
  const [isSecondVideoPopupOpen, setIsSecondVideoPopupOpen] = useState(false);
  const [isThirdVideoPopupOpen, setIsThirdVideoPopupOpen] = useState(false);

  // Reveal-on-scroll animations
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Handle escape key to close popup
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isVideoPopupOpen) {
          setIsVideoPopupOpen(false);
        } else if (isSecondVideoPopupOpen) {
          setIsSecondVideoPopupOpen(false);
        } else if (isThirdVideoPopupOpen) {
          setIsThirdVideoPopupOpen(false);
        }
      }
    };

    const isAnyPopupOpen = isVideoPopupOpen || isSecondVideoPopupOpen || isThirdVideoPopupOpen;
    
    if (isAnyPopupOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoPopupOpen, isSecondVideoPopupOpen, isThirdVideoPopupOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <CGPEHeader />
      
      {/* Full Width Video Popup - First Video */}
      {isVideoPopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoPopupOpen(false)}
        >
          <div 
            className="w-full max-w-7xl bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Header */}
            <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Amit Dave - CGPE Insurance Training Session</h3>
              <button
                onClick={() => setIsVideoPopupOpen(false)}
                className="text-white hover:text-gray-300 transition-colors text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            
            {/* Video Player */}
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/tCpGoz9idpQ?si=lzbVciJOR6IdP8IU&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=0&fs=1&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com&autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              ></iframe>
            </div>
            
            {/* Video Description */}
            <div className="p-6 bg-gray-50">
              <p className="text-gray-700 text-lg leading-relaxed">
                Discover the secrets of successful insurance sales with Amit Dave's exclusive training session at CGPE. 
                This comprehensive workshop covers advanced sales strategies, client relationship building, and proven 
                techniques for closing deals. Learn how to identify customer pain points, present complex insurance 
                products in simple terms, and build trust that leads to long-term client relationships. Whether you're 
                a seasoned professional or just starting your insurance career, this session will equip you with 
                practical tools and real-world insights to accelerate your success in the competitive insurance market.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span>Training Session • Amit Dave - CGPE Insurance</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Width Video Popup - Second Video */}
      {isSecondVideoPopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsSecondVideoPopupOpen(false)}
        >
          <div 
            className="w-full max-w-7xl bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Header */}
            <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Amit Dave - Advanced Insurance Sales Masterclass</h3>
              <button
                onClick={() => setIsSecondVideoPopupOpen(false)}
                className="text-white hover:text-gray-300 transition-colors text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            
            {/* Video Player */}
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/zwyXHpVg4dk?si=BNlwwbJ7Kw86HX2D&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=0&fs=1&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com&autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              ></iframe>
            </div>
            
            {/* Video Description */}
            <div className="p-6 bg-gray-50">
              <p className="text-gray-700 text-lg leading-relaxed">
                Master advanced insurance sales techniques with Amit Dave's comprehensive training session at CGPE. 
                Learn proven strategies for client acquisition, policy presentation, objection handling, and closing techniques. 
                This masterclass covers market analysis, competitive positioning, and building long-term client relationships 
                in the insurance industry. Perfect for insurance professionals looking to elevate their sales performance 
                and achieve consistent results in today's competitive market.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span>Advanced Training • Amit Dave - CGPE Insurance Expert</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Width Video Popup - Third Video */}
      {isThirdVideoPopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsThirdVideoPopupOpen(false)}
        >
          <div 
            className="w-full max-w-7xl bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Header */}
            <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Amit Dave - Client Relationship & Trust Building Strategies</h3>
              <button
                onClick={() => setIsThirdVideoPopupOpen(false)}
                className="text-white hover:text-gray-300 transition-colors text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            
            {/* Video Player */}
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/j__EHlU0S_s?si=b1b0mn-B0CcQZnJs&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=0&fs=1&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com&autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              ></iframe>
            </div>
            
            {/* Video Description */}
            <div className="p-6 bg-gray-50">
              <p className="text-gray-700 text-lg leading-relaxed">
                Discover Amit Dave's proven methods for building lasting client relationships in the insurance industry. 
                Learn essential trust-building techniques, effective communication strategies, and how to maintain long-term 
                client satisfaction. This session covers client retention, referral generation, and creating value that keeps 
                clients coming back. Essential viewing for insurance professionals who want to build a sustainable and 
                profitable client base through genuine relationship building.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span>Client Relations • Amit Dave - CGPE Insurance Expert</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <div className="relative text-white overflow-hidden py-32 bg-gradient-to-r from-[#244491] to-[#19aae8]">
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 reveal" data-animate style={{ '--d': '0ms' }}>Amit Dave Training Session</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto reveal" data-animate style={{ '--d': '120ms' }}>
            Master the art of insurance sales with proven strategies and techniques from CGPE's expert trainer
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Video Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* First Video - Main Amit Dave Video */}
           <div 
             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
             onClick={() => setIsVideoPopupOpen(true)}
           >
             <div className="aspect-video relative">
               <iframe
                 width="100%"
                 height="100%"
                 src="https://www.youtube.com/embed/tCpGoz9idpQ?si=lzbVciJOR6IdP8IU&modestbranding=1&rel=0&showinfo=0&controls=0&disablekb=1&fs=0&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com"
                 title="YouTube video player"
                 frameBorder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                 referrerPolicy="strict-origin-when-cross-origin"
                 allowFullScreen
                 className="w-full h-full"
                 style={{ border: 'none' }}
               ></iframe>
               {/* Overlay to make it clickable */}
               <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                 <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                   <div className="bg-white bg-opacity-90 rounded-full p-6 shadow-lg">
                     <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M8 5v14l11-7z"/>
                     </svg>
                   </div>
                 </div>
               </div>
             </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Amit Dave - CGPE Insurance Training Session
              </h3>
              <p className="text-gray-600 mb-4">
                Discover the secrets of successful insurance sales with Amit Dave's exclusive training session at CGPE. 
                This comprehensive workshop covers advanced sales strategies, client relationship building, and proven 
                techniques for closing deals.
              </p>
              <div className="text-sm text-gray-500">
                <span>Training Session • Amit Dave - CGPE Insurance</span>
              </div>
            </div>
          </div>

          {/* Second Video - Advanced Training Session */}
          <div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setIsSecondVideoPopupOpen(true)}
          >
            <div className="aspect-video relative">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/zwyXHpVg4dk?si=BNlwwbJ7Kw86HX2D&modestbranding=1&rel=0&showinfo=0&controls=0&disablekb=1&fs=0&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              ></iframe>
              {/* Overlay to make it clickable */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-6 shadow-lg">
                    <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Amit Dave - Advanced Insurance Sales Masterclass
              </h3>
              <p className="text-gray-600 mb-4">
                Master advanced insurance sales techniques with Amit Dave's comprehensive training session at CGPE. Learn proven strategies for client acquisition, policy presentation, objection handling, and closing techniques. This masterclass covers market analysis, competitive positioning, and building long-term client relationships in the insurance industry.
              </p>
              <div className="text-sm text-gray-500">
                <span>Advanced Training • Amit Dave - CGPE Insurance Expert</span>
              </div>
            </div>
          </div>

          {/* Third Video - Client Relationship Building */}
          <div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setIsThirdVideoPopupOpen(true)}
          >
            <div className="aspect-video relative">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/j__EHlU0S_s?si=b1b0mn-B0CcQZnJs&modestbranding=1&rel=0&showinfo=0&controls=0&disablekb=1&fs=0&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              ></iframe>
              {/* Overlay to make it clickable */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-6 shadow-lg">
                    <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Amit Dave - Client Relationship & Trust Building Strategies
              </h3>
              <p className="text-gray-600 mb-4">
                Discover Amit Dave's proven methods for building lasting client relationships in the insurance industry. Learn essential trust-building techniques, effective communication strategies, and how to maintain long-term client satisfaction. This session covers client retention, referral generation, and creating value that keeps clients coming back.
              </p>
              <div className="text-sm text-gray-500">
                <span>Client Relations • Amit Dave - CGPE Insurance Expert</span>
              </div>
            </div>
          </div>
        </div>


        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/events')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg"
          >
            ← Back to Events
          </button>
        </div>
      </main>

      <Footer />
      
      <style>
        {`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          .reveal { opacity: 0; transform: translateY(16px); }
          .reveal.in-view { animation: fadeUp 600ms cubic-bezier(0.22, 1, 0.36, 1) both; animation-delay: var(--d, 0ms); }
        `}
      </style>
    </div>
  );
};

export default AmitDaveSession;
