import React, { useEffect, useState, useRef } from 'react';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';
import Timeline from '../Timeline/Timeline';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  // Scroll to top when component mounts and handle loading
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading time and wait for content to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleInsuranceClick = (route, product = null) => {
    if (product) {
      navigate('/tata-aia-fortune-guarantee-plus', {
        state: {
          selectedProduct: product
        }
      });
    } else {
      navigate(route);
    }
    // Scroll to top when navigating from AboutUs page
    window.scrollTo(0, 0);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    // Update iframe src to enable/disable audio
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      const newSrc = isAudioEnabled 
        ? currentSrc.replace('&mute=0', '&mute=1')
        : currentSrc.replace('&mute=1', '&mute=0');
      iframeRef.current.src = newSrc;
    }
  };

  // Loader Component - Same as Awards page
  if (isLoading) {
    return (
      <div className='bg-gray-50 min-h-screen'>
        <CGPEHeader />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            {/* Spinner */}
            <div className="relative">
              <div className="w-20 h-20 border-4 border-black/30 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-black rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
            </div>
            
            {/* Loading Text */}
            <h2 className="text-2xl font-bold text-black mb-2">Loading About Us</h2>
            <p className="text-black/80 text-lg">Preparing our story...</p>
            
            {/* Progress Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              <div className="w-2 h-2 bg-black/50 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
              <div className="w-2 h-2 bg-black/50 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-black/50 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-50'>
      <CGPEHeader />

      {/* Hero Section - Video Background */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <iframe
          ref={iframeRef}
          src="https://www.youtube.com/embed/iWpIwnNrW7Y?si=SoHPRAqxwuf8wIlm&autoplay=1&mute=1&controls=0&loop=1&playlist=iWpIwnNrW7Y&modestbranding=1&showinfo=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{
            width: '100vw',
            height: '100vh',
            minWidth: '100vw',
            minHeight: '100vh',
            position: 'absolute',
            pointerEvents: 'none',
            zIndex: 0,
            display: 'block',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></iframe>

        {/* Audio Control Button - Bottom Right */}
        <button
          onClick={toggleAudio}
          className="fixed bottom-6 right-6 z-30 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          title={isAudioEnabled ? "Mute Audio" : "Unmute Audio"}
        >
          {isAudioEnabled ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

        {/* Content */}
      
      </div>
 
      

      {/* About Company Section - Matching the Image Design */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About Company</h2>
            <div className="w-24 h-1 bg-[#19aae8] mx-auto"></div>
          </div>
          <div className="relative z-20 text-center text-black px-6 max-w-5xl mx-auto my-20 flex flex-col items-center">
          {/* Trust Badge */}
          {/* <div className="inline-flex items-center gap-2 border border-white rounded-full px-6 py-3 mb-8">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-white font-medium">Trusted by 50,000+ clients</span>
          </div> */}

          {/* Main Headline */}
          <h1 className="text-5xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-md shadow-black text-center">
            <span className="text-black drop-shadow-md shadow-black block">Finding you the best</span>
            <span className="text-black drop-shadow-md shadow-black text-5xl md:text-5xl block my-2">insurance</span>
            <span className="text-[#19aae8] drop-shadow-md shadow-black text-5xl md:text-5xl block">SINCE 1985</span>
          </h1>

          {/* Descriptive Text */}
          <p className="text-xl md:text-xl text-black-200 mb-12 max-w-3xl leading-relaxed drop-shadow-sm shadow-black text-center">
            It's a fine balancing act when 9 million+ insurance buyers and more than 50+ insurers transact a few lac crores of insurance cover and a few thousand crores of insurance premium on a platform with complete confidence every year.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            {/* <button
              onClick={() => handleInsuranceClick('/register')}
              className="bg-[#19aae8] border-1 border-white text-white px-8 py-4 rounded-[20px] font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
            >
              Get Your Quote
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button> */}
            {/* <button
              onClick={() => handleInsuranceClick('/insurance')}
              className="border-2 border-white text-white px-8 py-4 rounded-[20px] font-bold text-base flex items-center justify-center gap-2 hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button> */}
          </div>
        </div>

          {/* Three Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Our Origin */}
            <div>
              <div className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 text-blue-500 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="bg-white rounded-t-[35%] h-[300px] p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-blue-500 mb-2">Our origin</h3>
                <h4 className="text-xl font-bold text-gray-800 mb-4">How it all started</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  CG Patel was founded in 2008 with one mission: bringing transparency in insurance. The founders wanted to reimagine insurance plans so they started by simplifying all the information around plans, ending the rampant mis-selling, and preventing policy lapses.
                </p>
              </div>
            </div>

            {/* Card 2: Our Present */}
            <div>
              <div className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="bg-white rounded-t-[35%] h-[300px] p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-green-600 mb-2">Our present</h3>
                <h4 className="text-xl font-bold mb-4">15 years of success</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Today, we are India's best & largest online insurance platform with 15+ million (50 lakh+) individuals have come to us & bought the best insurers in the country. We have sold over 14 million policies since inception, and this number is only growing.
                </p>
              </div>
            </div>

            {/* Card 3: Our Vision */}
            <div>
              <div className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="bg-white rounded-t-[35%] h-[300px] p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-orange-600 mb-2">Our vision</h3>
                <h4 className="text-xl font-bold mb-4">A look forward</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  While we are happy with how we are changing Insurance for the country, we know there is still a lot of work to be done. Our vision is to bring pioneering technologies & innovations to the field continues to grow, we aspire to build a health & financial safety net for more households in India in the coming years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> 

      {/* Legacy of Trust Section - Based on Image Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* The Early Years Section */}
          <div className="mb-20">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left Side - Illustration */}
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/images/about3.png"
                      alt="Legacy Early Years Illustration"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="lg:w-1/2">
                <div className="mb-6">
                  <span className="text-primary font-semibold text-lg">A Legacy of Trust:</span>
                  <h2 className="text-4xl font-bold text-gray-800 mt-2">The Early Years (1989-2007)</h2>
                </div>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our story begins in 1989 with <strong>C. G. Patel</strong>, driven by a mission to educate and 
                  empower individuals with the power of life insurance. With a single policy valued 
                  at just ₹63,90 INR, C. G. Patel embarked on a journey that would change 
                  countless lives. This dedication to building trust and client understanding laid 
                  the foundation for what CGPE would become.
                </p>

                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-semibold text-gray-800">Key Milestones:</h3>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold">1989-90:</span> C. G. Patel starts his insurance journey with a single policy.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold">1992:</span> Achieved the prestigious title of 'General Insurance Agent'.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold">2000:</span> Expanded services to include 'General Insurance'.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold">2002-2005:</span> Consistent achievement of MDRT (Million Dollar Round Table) and Chairman's Club recognition.
                    </div>
                  </div>
                </div>

                {/* <button className="bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                  Our Vision
                </button> */}
              </div>
            </div>
          </div>

          {/* Vision for the Future Section */}
          <div className="mb-20">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Right Side - Illustration */}
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/images/about2.png"
                      alt="Business Growth Illustration"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Left Side - Content */}
              <div className="lg:w-1/2">
                <div className="mb-6">
                  <span className="text-primary font-semibold text-lg">A Legacy of Trust:</span>
                  <h2 className="text-4xl font-bold text-gray-800 mt-2">
                    A Vision for the Future:<br/>
                    Joining Forces<br/>
                    (2007-Present)
                  </h2>
                </div>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Recognizing the ever-evolving financial landscape, R. C. Patel joined the 
                  firm in 2007. Together, they built upon the legacy of trust established by 
                  C. G. Patel while embracing a vision for technological innovation. They 
                  saw a future where financial planning was accessible to everyone, not 
                  just the privileged few.
                </p>

                {/* <button className="bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                  Birth Of CGPE
                </button> */}
              </div>
            </div>
          </div>

          {/* Birth of CGPE Section */}
          <div className="mb-20">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left Side - Illustration */}
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/images/about1.png"
                      alt="Birth of CGPE Illustration"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="lg:w-1/2">
                <div className="mb-6">
                  <span className="text-primary font-semibold text-lg">Starting of Journey</span>
                  <h2 className="text-4xl font-bold text-gray-800 mt-2">
                    Birth of cgpe Insurance Platform
                  </h2>
                </div>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                  This shared vision culminated in the creation of CGPE in 2023. This revolutionary 
                  platform harnesses the power of cutting-edge AI technology, making financial 
                  planning more accessible and personalized than ever before.
                </p>

                  {/* <button className="bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                    See Our Growth
                  </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

     {/* Timeline Section */}
      <Timeline />


      {/* Our Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h2>
            <div className="w-24 h-1 bg-[#19aae8] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the passionate professionals who make CG Patel Insurance a trusted name in the industry.
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Team Member 1 */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src="assets/images/rameshbhai.jpg" 
                      alt="rameshbhai" 
                      className="w-90vh h-90vh object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-[#19aae8]">R. C. Patel</h3>
                    <p className="text-gray-800">CEO & MD</p>
                  </div>
                </div>

                {/* Team Member 2 */}
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src="assets/images/IMG_3633.jpg" 
                      alt="S. C. Patel" 
                      className="w-90vh h-90vh object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-[#19aae8]">S. C. Patel</h3>
                    <p className="text-gray-800">Head Of It & Strategy</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

    
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
