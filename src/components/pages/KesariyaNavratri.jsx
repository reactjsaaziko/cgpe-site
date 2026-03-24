import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';

const KesariyaNavratri = () => {
  const navigate = useNavigate();
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
  const [isNewVideoPopupOpen, setIsNewVideoPopupOpen] = useState(false);
  const [isSecondNewVideoPopupOpen, setIsSecondNewVideoPopupOpen] = useState(false);
  const [isThirdNewVideoPopupOpen, setIsThirdNewVideoPopupOpen] = useState(false);
  const [isFourthNewVideoPopupOpen, setIsFourthNewVideoPopupOpen] = useState(false);
  const [isLastVideoPopupOpen, setIsLastVideoPopupOpen] = useState(false);

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
        } else if (isNewVideoPopupOpen) {
          setIsNewVideoPopupOpen(false);
        } else if (isSecondNewVideoPopupOpen) {
          setIsSecondNewVideoPopupOpen(false);
        } else if (isThirdNewVideoPopupOpen) {
          setIsThirdNewVideoPopupOpen(false);
        } else if (isFourthNewVideoPopupOpen) {
          setIsFourthNewVideoPopupOpen(false);
        } else if (isLastVideoPopupOpen) {
          setIsLastVideoPopupOpen(false);
        }
      }
    };

    const isAnyPopupOpen = isVideoPopupOpen || isNewVideoPopupOpen || isSecondNewVideoPopupOpen || isThirdNewVideoPopupOpen || isFourthNewVideoPopupOpen || isLastVideoPopupOpen;
    
    if (isAnyPopupOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoPopupOpen, isNewVideoPopupOpen, isSecondNewVideoPopupOpen, isThirdNewVideoPopupOpen, isFourthNewVideoPopupOpen, isLastVideoPopupOpen]);

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
              <h3 className="text-xl font-semibold">Kesariya 2.0 Navratri 2024 - Main Event Day 8</h3>
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
                src="https://www.youtube.com/embed/y0zfkXFsMtQ?si=doz-pzAMYLyfIkhO&start=12442&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=1&fs=1&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com&autoplay=1"
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
                Watch the complete Kesariya 2.0 Navratri 2024 celebration at Sarsana Convention Center, Surat. 
                CGPE proudly sponsored this spectacular 9-day cultural extravaganza featuring performances by 
                Jaysinh Gadhavi, Mitali Mahant, Stuti Vora, and Akshat Parikh. Experience the grandeur of 
                traditional Navratri celebrations with modern amenities and luxury venue.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span>October 3-12, 2024 • Sarsana Convention Center, Surat</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Video Popup */}
      {isNewVideoPopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsNewVideoPopupOpen(false)}
        >
          <div 
            className="w-full max-w-7xl bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Header */}
            <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Kesariya Navratri 2024 - Special Performance</h3>
              <button
                onClick={() => setIsNewVideoPopupOpen(false)}
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
                src="https://www.youtube.com/embed/zRaOJDTI5Lg?si=SsdAR3uwtWTSwkVF&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=0&fs=1&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com&autoplay=1"
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
                Experience the vibrant energy of Kesariya Navratri 2024 with this special performance video. 
                Watch the spectacular cultural celebration featuring traditional Garba, Dandiya, and modern performances 
                at the Sarsana Convention Center, Surat. CGPE proudly presents this exclusive glimpse into the grandeur 
                of Navratri festivities with world-class artists and performers.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span>Special Performance • Kesariya Navratri 2024 • CGPE Sponsored Event</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Second New Video Popup */}
      {isSecondNewVideoPopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsSecondNewVideoPopupOpen(false)}
        >
          <div 
            className="w-full max-w-7xl bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Header */}
            <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Kesariya Navratri 2024 - Exclusive Performance</h3>
              <button
                onClick={() => setIsSecondNewVideoPopupOpen(false)}
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
                src="https://www.youtube.com/embed/VlKoP98c3L4?si=FXOwA0BXd2T6FnrA&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=0&fs=1&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com&autoplay=1"
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
                Discover the magic of Kesariya Navratri 2024 with this exclusive performance video. 
                Witness the spectacular cultural celebration featuring mesmerizing Garba and Dandiya performances 
                at the prestigious Sarsana Convention Center, Surat. CGPE proudly presents this extraordinary 
                showcase of traditional Gujarati culture and modern entertainment.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span>Exclusive Performance • Kesariya Navratri 2024 • CGPE Sponsored Event</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Third New Video Popup */}
      {isThirdNewVideoPopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsThirdNewVideoPopupOpen(false)}
        >
          <div 
            className="w-full max-w-7xl bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Header */}
            <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Kesariya Navratri 2024 - Day 5 Special Performance</h3>
              <button
                onClick={() => setIsThirdNewVideoPopupOpen(false)}
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
                src="https://www.youtube.com/embed/WHsoKhWEj5M?si=XkF84N-dfypT3kVg&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=0&fs=1&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com&autoplay=1"
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
                Experience the electrifying energy of Kesariya Navratri 2024 Day 5 with this spectacular performance video. 
                Witness the mesmerizing Garba and Dandiya celebrations featuring world-class artists and performers at the 
                prestigious Sarsana Convention Center, Surat. CGPE proudly presents this exclusive Day 5 showcase of 
                traditional Gujarati culture and modern entertainment.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span>Day 5 Special Performance • Kesariya Navratri 2024 • CGPE Sponsored Event</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fourth New Video Popup */}
      {isFourthNewVideoPopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsFourthNewVideoPopupOpen(false)}
        >
          <div 
            className="w-full max-w-7xl bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Header */}
            <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Kesariya Navratri 2024 - Special Celebration</h3>
              <button
                onClick={() => setIsFourthNewVideoPopupOpen(false)}
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
                src="https://www.youtube.com/embed/JnpO7-XORiM?si=NJ8mOFYwaW_oFMYK&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=0&fs=1&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com&autoplay=1"
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
                Join us for this special celebration video from Kesariya Navratri 2024. Experience the vibrant energy 
                and cultural richness of this magnificent event at Sarsana Convention Center, Surat. Watch as performers 
                showcase the best of traditional Gujarati culture with modern flair, creating unforgettable moments 
                that capture the essence of Navratri festivities.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span>Special Celebration • Kesariya Navratri 2024 • CGPE Sponsored Event</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Last Video Popup */}
      {isLastVideoPopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsLastVideoPopupOpen(false)}
        >
          <div 
            className="w-full max-w-7xl bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Header */}
            <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Kesariya Navratri 2024 - Cultural Highlights & Performances Day 9</h3>
              <button
                onClick={() => setIsLastVideoPopupOpen(false)}
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
                src="https://www.youtube.com/embed/yRZR1Hloms8?si=Cv1r3DBCBMcO1Lfi&start=1218&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=0&fs=1&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com&autoplay=1"
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
                Experience the royal grandeur of Kesariya Navratri 2024 at Sarsana Convention Center, Surat. Watch exclusive performances by renowned Gujarati artists including Jaysinh Gadhavi, Mitali Mahant, Stuti Vora, and Akshat Parikh in this palace-themed cultural extravaganza. CGPE proudly presents this magnificent showcase of traditional Gujarati culture and modern entertainment.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span>October 2024 • Sarsana Convention Center, Surat • CGPE Sponsored Event</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <div className="relative text-white overflow-hidden py-32 bg-gradient-to-r from-[#244491] to-[#19aae8]">
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 reveal" data-animate style={{ '--d': '0ms' }}>Kesariya Navratri</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto reveal" data-animate style={{ '--d': '120ms' }}>
            Experience the grandeur of Kesariya 2.0 Navratri 2024 - CGPE's spectacular cultural celebration
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Video Grid - 3 columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* First Video - New Exclusive Performance Video */}
           <div 
             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
             onClick={() => setIsSecondNewVideoPopupOpen(true)}
           >
             <div className="aspect-video relative">
               <iframe
                 width="100%"
                 height="100%"
                 src="https://www.youtube.com/embed/VlKoP98c3L4?si=FXOwA0BXd2T6FnrA&modestbranding=1&rel=0&showinfo=0&controls=0&disablekb=1&fs=0&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com"
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
                Kesariya Navratri 2024 - Exclusive Performance
              </h3>
              <p className="text-gray-600 mb-4">
                Discover the magic of Kesariya Navratri 2024 with this exclusive performance video. Witness the spectacular cultural celebration featuring mesmerizing Garba and Dandiya performances at the prestigious Sarsana Convention Center, Surat.
              </p>
              <div className="text-sm text-gray-500">
                <span>Exclusive Performance • Kesariya Navratri 2024 • CGPE Sponsored Event</span>
              </div>
            </div>
          </div>

          {/* Second Video - Special Performance Video */}
          <div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setIsNewVideoPopupOpen(true)}
          >
            <div className="aspect-video relative">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/zRaOJDTI5Lg?si=SsdAR3uwtWTSwkVF&modestbranding=1&rel=0&showinfo=0&controls=0&disablekb=1&fs=0&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com"
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
                Kesariya Navratri 2024 - Special Performance
              </h3>
              <p className="text-gray-600 mb-4">
                Experience the vibrant energy of Kesariya Navratri 2024 with this special performance video. Watch the spectacular cultural celebration featuring traditional Garba, Dandiya, and modern performances at the Sarsana Convention Center, Surat.
              </p>
              <div className="text-sm text-gray-500">
                <span>Special Performance • Kesariya Navratri 2024 • CGPE Sponsored Event</span>
              </div>
            </div>
          </div>

          {/* Third Video - Main Event Day 8 */}
          <div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setIsVideoPopupOpen(true)}
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
                Kesariya 2.0 Navratri 2024 - Main Event Day 8
              </h3>
              <p className="text-gray-600 mb-4">
                Watch the complete Kesariya 2.0 Navratri 2024 celebration at Sarsana Convention Center, Surat. CGPE proudly sponsored this spectacular 9-day cultural extravaganza featuring performances by Jaysinh Gadhavi, Mitali Mahant, Stuti Vora, and Akshat Parikh.
              </p>
              <div className="text-sm text-gray-500">
                <span>October 3-12, 2024 • Sarsana Convention Center, Surat</span>
              </div>
              </div>
            </div>
          </div>

         {/* Second Row - Three Videos */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
           {/* Fourth Video - Day 5 Special Performance */}
           <div 
             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
             onClick={() => setIsThirdNewVideoPopupOpen(true)}
           >
             <div className="aspect-video relative">
               <iframe
                 width="100%"
                 height="100%"
                 src="https://www.youtube.com/embed/WHsoKhWEj5M?si=XkF84N-dfypT3kVg&modestbranding=1&rel=0&showinfo=0&controls=0&disablekb=1&fs=0&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com"
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
                 Kesariya Navratri 2024 - Day 5 Special Performance
               </h3>
               <p className="text-gray-600 mb-4">
                 Experience the electrifying energy of Kesariya Navratri 2024 Day 5 with this spectacular performance video. Witness the mesmerizing Garba and Dandiya celebrations featuring world-class artists and performers.
               </p>
               <div className="text-sm text-gray-500">
                 <span>Day 5 Special Performance • Kesariya Navratri 2024 • CGPE Sponsored Event</span>
               </div>
             </div>
           </div>

           {/* Fifth Video - Special Celebration */}
           <div 
             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
             onClick={() => setIsFourthNewVideoPopupOpen(true)}
           >
             <div className="aspect-video relative">
               <iframe
                 width="100%"
                 height="100%"
                 src="https://www.youtube.com/embed/JnpO7-XORiM?si=NJ8mOFYwaW_oFMYK&modestbranding=1&rel=0&showinfo=0&controls=0&disablekb=1&fs=0&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com"
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
                 Kesariya Navratri 2024 - Special Celebration
               </h3>
               <p className="text-gray-600 mb-4">
                 Join us for this special celebration video from Kesariya Navratri 2024. Experience the vibrant energy and cultural richness of this magnificent event at Sarsana Convention Center, Surat.
               </p>
               <div className="text-sm text-gray-500">
                 <span>Special Celebration • Kesariya Navratri 2024 • CGPE Sponsored Event</span>
               </div>
             </div>
           </div>

           {/* Sixth Video - Cultural Highlights & Performances Day 9 */}
           <div 
             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
             onClick={() => setIsLastVideoPopupOpen(true)}
           >
             <div className="aspect-video relative">
               <iframe
                 width="100%"
                 height="100%"
                 src="https://www.youtube.com/embed/yRZR1Hloms8?si=Cv1r3DBCBMcO1Lfi&start=1218&modestbranding=1&rel=0&showinfo=0&controls=0&disablekb=1&fs=0&cc_load_policy=0&iv_load_policy=3&playsinline=1&autohide=1&enablejsapi=1&origin=https://yourdomain.com"
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
                 Kesariya Navratri 2024 - Cultural Highlights & Performances Day 9
               </h3>
               <p className="text-gray-600 mb-4">
                 Experience the royal grandeur of Kesariya Navratri 2024 at Sarsana Convention Center, Surat. Watch exclusive performances by renowned Gujarati artists including Jaysinh Gadhavi, Mitali Mahant, Stuti Vora, and Akshat Parikh in this palace-themed cultural extravaganza.
               </p>
               <div className="text-sm text-gray-500">
                 <span>October 2024 • Sarsana Convention Center, Surat • CGPE Sponsored Event</span>
               </div>
             </div>
           </div>
         </div>


        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/newsroom')}
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

export default KesariyaNavratri;
