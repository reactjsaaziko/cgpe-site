import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';

const Events = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <CGPEHeader />
      
      {/* Hero Section */}
      <div
        className="relative text-white overflow-hidden py-32"
        style={{
          backgroundImage: "url('/assets/images/bkcareer.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 reveal" data-animate style={{ '--d': '0ms' }}>Events</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto reveal" data-animate style={{ '--d': '120ms' }}>
            Stay updated with our latest events, webinars, and important announcements.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Video Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* First Video - YouTube iframe */}
          <div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate('/kesariya-navratri')}
          >
            <div className="aspect-video relative">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/y0zfkXFsMtQ?si=doz-pzAMYLyfIkhO&start=12442&modestbranding=1&rel=0&showinfo=0&controls=0&disablekb=1&fs=0&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              ></iframe>
              {/* Overlay to make it clickable */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-4">
                    <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
               <h3 className="text-xl font-semibold text-gray-900 mb-2">
                 Kesariya 2.0 Navratri 2024 - CGPE Sponsored Event
               </h3>
               <p className="text-gray-600 mb-4">
                 Join us for Kesariya 2.0 Navratri 2024 at Sarsana Convention Center, Surat! CGPE proudly sponsored this spectacular 9-day celebration featuring performances by Jaysinh Gadhavi, Mitali Mahant, Stuti Vora, and Akshat Parikh. Experience the fully air-conditioned dome with palace-themed décor, state-of-the-art lighting, interactive selfie booths, and smooth Garba dancing on cushioned carpeted floors. A perfect blend of tradition and modern entertainment in the heart of Surat.
               </p>
               <div className="text-sm text-gray-500">
                 <span>October 3-12, 2024 • Sarsana Convention Center, Surat</span>
               </div>
            </div>
          </div>

          {/* Second Video - YouTube iframe */}
          <div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate('/ankit-shah-session')}
          >
            <div className="aspect-video relative">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/InM5ONsZyMQ?si=LBxlCHu687miyw3_&modestbranding=1&rel=0&showinfo=0&controls=0&disablekb=1&fs=0&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              ></iframe>
              {/* Overlay to make it clickable */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-4">
                    <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ankit Shah - CGPE Insurance Session
              </h3>
                <p className="text-gray-600 mb-4">
                  Join Ankit Shah from CGPE Insurance for an insightful session covering life insurance, health insurance, and investment planning. Learn about CGPE's comprehensive portfolio including LIC, TATA AIA, HDFC Life, ICICI Prudential, and other leading insurance providers. Get expert guidance on choosing the right coverage for your family's financial security and explore mutual fund investment opportunities tailored to your goals.
                </p>
              <div className="text-sm text-gray-500">
                <span>Educational Session • Ankit Shah - CGPE Insurance</span>
              </div>
            </div>
          </div>

          {/* Third Video - CGPE Insurance Training Session */}
          <div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate('/amit-dave-session')}
          >
            <div className="aspect-video relative">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/tCpGoz9idpQ?si=lzbVciJOR6IdP8IU&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=0&fs=1&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              ></iframe>
              {/* Overlay to make it clickable */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-4">
                    <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Amit dave in CGPE
              </h3>
              <p className="text-gray-600 mb-4">
                Discover the secrets of successful insurance sales with Amit Dave's exclusive training session at CGPE. This comprehensive workshop covers advanced sales strategies, client relationship building, and proven techniques for closing deals. Learn how to identify customer pain points, present complex insurance products in simple terms, and build trust that leads to long-term client relationships. Whether you're a seasoned professional or just starting your insurance career, this session will equip you with practical tools and real-world insights to accelerate your success in the competitive insurance market.
              </p>
              <div className="text-sm text-gray-500">
                <span>Training Session • CGPE Insurance</span>
              </div>
            </div>
          </div>
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

export default Events;
