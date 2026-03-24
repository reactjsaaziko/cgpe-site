import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';

const AnkitShahSession = () => {
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
      if (e.key === 'Escape' && (isVideoPopupOpen || isSecondVideoPopupOpen || isThirdVideoPopupOpen)) {
        setIsVideoPopupOpen(false);
        setIsSecondVideoPopupOpen(false);
        setIsThirdVideoPopupOpen(false);
      }
    };

    if (isVideoPopupOpen || isSecondVideoPopupOpen || isThirdVideoPopupOpen) {
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
      
      {/* Full Width Video Popup */}
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
              <h3 className="text-xl font-semibold">Ankit Shah - CGPE Insurance Educational Session</h3>
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
                src="https://www.youtube.com/embed/s4cpQRVsjZo?si=ZLYXB-nXBi74m3rO&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=0&fs=1&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com&autoplay=1"
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
                Join Ankit Shah from CGPE Insurance for an insightful educational session covering life insurance, 
                health insurance, and investment planning. Learn about CGPE's comprehensive portfolio including LIC, 
                TATA AIA, HDFC Life, ICICI Prudential, and other leading insurance providers. Get expert guidance 
                on choosing the right coverage for your family's financial security and explore mutual fund 
                investment opportunities tailored to your goals.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span>Educational Session • Ankit Shah - CGPE Insurance</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Second Video Popup */}
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
              <h3 className="text-xl font-semibold">Additional Ankit Shah Session - CGPE Insurance</h3>
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
                src="https://www.youtube.com/embed/IWJ3twPBeDQ?si=T35_1bRPy87sJWNR&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=0&fs=1&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com&autoplay=1"
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
                Watch more valuable insights from Ankit Shah covering advanced insurance concepts, investment strategies, 
                and financial planning techniques. This additional session provides deeper knowledge about CGPE's 
                comprehensive insurance portfolio and expert guidance on choosing the right financial products for 
                your family's long-term security and wealth building.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span>Educational Session • Ankit Shah - CGPE Insurance</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Third Video Popup */}
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
              <h3 className="text-xl font-semibold">More Educational Content - CGPE Insurance</h3>
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
                src="https://www.youtube.com/embed/UUfFo6V68n4?si=6Xqq-VqddALPurjS&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=0&fs=1&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com&autoplay=1"
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
                Explore additional educational content covering insurance planning, investment strategies, and financial 
                advisory services from CGPE. This comprehensive session provides valuable insights into various 
                financial products and helps you make informed decisions about your family's financial future.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span>Educational Content • CGPE Insurance</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <div className="relative text-white overflow-hidden py-32 bg-gradient-to-r from-[#244491] to-[#19aae8]">
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 reveal" data-animate style={{ '--d': '0ms' }}>Ankit Shah Session</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto reveal" data-animate style={{ '--d': '120ms' }}>
            Expert insights on insurance and investment planning from CGPE's experienced advisor
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Video Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* First Video - Main Ankit Shah Video */}
           <div 
             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
             onClick={() => setIsVideoPopupOpen(true)}
           >
             <div className="aspect-video relative">
               <iframe
                 width="100%"
                 height="100%"
                  src="https://www.youtube.com/embed/s4cpQRVsjZo?si=ZLYXB-nXBi74m3rO&modestbranding=1&rel=0&showinfo=0&controls=0&disablekb=0&fs=0&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com"
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
                Ankit Shah - CGPE Insurance Educational Session
              </h3>
              <p className="text-gray-600 mb-4">
                Join Ankit Shah from CGPE Insurance for an insightful session covering life insurance, health insurance, and investment planning. Learn about CGPE's comprehensive portfolio and get expert guidance on financial security.
              </p>
              <div className="text-sm text-gray-500">
                <span>Educational Session • Ankit Shah - CGPE Insurance</span>
              </div>
            </div>
          </div>

          {/* Second Video - Additional Ankit Shah Content */}
          <div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setIsSecondVideoPopupOpen(true)}
          >
            <div className="aspect-video relative">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/IWJ3twPBeDQ?si=T35_1bRPy87sJWNR&modestbranding=1&rel=0&showinfo=0&controls=0&disablekb=1&fs=0&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com"
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
                Additional Ankit Shah Session
              </h3>
              <p className="text-gray-600 mb-4">
                Watch more valuable insights from Ankit Shah covering advanced insurance concepts, investment strategies, and financial planning techniques.
              </p>
              <div className="text-sm text-gray-500">
                <span>Educational Session • Ankit Shah - CGPE Insurance</span>
              </div>
            </div>
          </div>

          {/* Third Video - Additional Content */}
          <div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setIsThirdVideoPopupOpen(true)}
          >
            <div className="aspect-video relative">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/UUfFo6V68n4?si=6Xqq-VqddALPurjS&modestbranding=1&rel=0&showinfo=0&controls=0&disablekb=1&fs=0&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com"
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
                More Educational Content
              </h3>
              <p className="text-gray-600 mb-4">
                Explore additional educational content covering insurance planning, investment strategies, and financial advisory services from CGPE.
              </p>
              <div className="text-sm text-gray-500">
                <span>Educational Content • CGPE Insurance</span>
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

export default AnkitShahSession;
