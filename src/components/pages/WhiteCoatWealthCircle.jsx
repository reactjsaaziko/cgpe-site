import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';
import WhiteCoatWealthQR from '../common/WhiteCoatWealthQR';

const WhiteCoatWealthCircle = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedService, setSelectedService] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({
    totalFamilies: 17000,
    totalAdvisors: 600,
    totalAwards: 300,
    claimsAmount: 500
  });

  const services = [
    {
      id: 'family-shield',
      title: 'Doctor Family Shield',
      description: 'Comprehensive protection combining Term Life, Critical Illness, and Health Insurance',
      features: ['Term Life Insurance', 'Critical Illness Cover', 'Health Super Top-Up', 'Family Protection'],
      price: 'Starting ₹2,500/month',
      icon: '🛡️',
      color: 'blue'
    },
    {
      id: 'clinic-continuity',
      title: 'Clinic Continuity Review',
      description: 'Professional liability and business continuity protection for medical practices',
      features: ['Key-man Insurance', 'Professional Indemnity', 'Business Continuity', '15-min Audit'],
      price: 'Starting ₹5,000/month',
      icon: '🏥',
      color: 'green'
    },
    {
      id: 'advisor-fellowship',
      title: 'Doctor Advisor Fellowship',
      description: 'Join our exclusive network of medical professionals as insurance advisors',
      features: ['Low Time Commitment', 'High Support System', 'Ethical Practices', 'Concierge Service'],
      price: 'Commission-based',
      icon: '👨‍⚕️',
      color: 'purple'
    }
  ];

  const achievements = [
    { number: '₹5500+', label: 'Sume Assured', sublabel: 'Crore Achievement' },
    { number: '17,000+', label: 'Families Protected', sublabel: 'And Growing Strong' },
    { number: '600+', label: 'Trained Advisors', sublabel: 'Largest DO Team in Gujarat' },
    { number: '₹500+', label: 'Crore Claims Delivered', sublabel: 'Life + Health Insurance' },
    { number: '300+', label: 'Industry Awards', sublabel: 'Across Leading Insurers' },
  ];

  const testimonials = [
    {
      name: 'Dr. Rajesh Patel',
      specialty: 'Cardiologist, Ahmedabad',
      quote: 'CGPE helped me secure my family\'s future while I focus on saving lives. Their comprehensive approach covers everything from term insurance to critical illness.',
      rating: 5
    },
    {
      name: 'Dr. Priya Sharma',
      specialty: 'Pediatrician, Surat',
      quote: 'The advisor fellowship program is perfect for doctors. I can earn additional income while helping other medical professionals with their financial planning.',
      rating: 5
    },
    {
      name: 'Dr. Amit Kumar',
      specialty: 'Orthopedic Surgeon, Vadodara',
      quote: 'Their clinic continuity review saved my practice during a difficult time. The professional indemnity coverage was exactly what I needed.',
      rating: 5
    }
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CGPEHeader />

      {/* Hero Section - Video Background */}
      <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 scale-100 opacity-100"
          src="/assets/images/fa.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onError={(e) => {
            console.warn('Background video loading error:', e.target.src);
          }}
          style={{ zIndex: 0 }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40" style={{ zIndex: 1 }}></div>

        {/* Content */}
        <div className="relative z-10 flex items-center h-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex justify-center">
              <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8 max-w-4xl">
                {/* Trust Badge */}
                <div className="flex justify-center">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-3 sm:px-4 lg:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border border-white border-opacity-30">
                    Trusted by Medical Professionals
                  </div>
                </div>

                {/* Main Title */}
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                    <span>White Coat </span>
                    <span className="text-blue-300">Wealth Circle</span>
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mt-2 sm:mt-4">
                    Exclusive for Doctors & Families
                  </p>
                </div>

                {/* Tagline */}
                {/* <div>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-100 px-4 sm:px-0">
                    You save lives. We secure your family's future.
                  </p>
                </div> */}

                {/* Additional Info */}
                <div className="space-y-4">
                  {/* <p className="text-xs sm:text-sm text-gray-300">
                    15-minute concierge call. No spam. No pressure.
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 lg:mb-8">
                    <span className="text-xs sm:text-sm text-gray-200">Trusted by 17,000+ families</span>
                  </div>
                   */}
                  {/* WhatsApp Button */}
                  <button
                    onClick={() => {
                      const message = "Hello CGPE, I scanned the QR at White Coat Wealth Circle.\nRequesting a 15-minute tea consultation—please confirm available slots here.";
                      const encodedMessage = encodeURIComponent(message);
                      const whatsappUrl = `https://wa.me/919662011021?text=${encodedMessage}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2 sm:gap-3 shadow-lg text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    <span className="hidden sm:inline">Connect on WhatsApp</span>
                    <span className="sm:hidden">WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CGPE Legacy Section - Image Design Replica */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Top Badge */}
            <div className="flex justify-center">
              <div className="bg-gray-200 text-gray-800 px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                Since 1989 • Trusted Legacy
              </div>
            </div>

            {/* Main Heading */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                <span>CGPE — </span>
                <span className="text-blue-600">Khushiyon Ka Financial</span>
                <span className="block text-blue-600">Planner</span>
              </h2>
            </div>

            {/* First Paragraph */}
            <div className="max-w-3xl mx-auto px-4 sm:px-0">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Founded in 1989 by <strong className="text-gray-900">C.G. Patel</strong>, CGPE has protected and guided <strong className="text-blue-600">17,000+ families</strong> with simple, honest advice across Life Insurance, Health, SIPs, Mutual Funds, and Legacy Planning.
              </p>
            </div>

            {/* Promise Statement */}
            <div className="max-w-2xl mx-auto px-4 sm:px-0">
              <p className="text-lg sm:text-xl text-blue-600 font-semibold leading-relaxed">
                We stand with families during claims, during crises, and during milestones. That's our promise.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-12 sm:mt-16 px-4 sm:px-0">
              <button 
                onClick={() => navigate('/doctor-consultation')}
                className="w-full sm:w-auto bg-blue-600 text-xs sm:text-sm hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Plan My Protection & Wealth (Book a Call)
              </button>
              <button
                onClick={() => navigate('/cgpe-doctor-advisor')}
                className="w-full sm:w-auto bg-blue-600 text-xs sm:text-sm hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Join the Mission (Become an Advisor)
              </button>
            </div>
          </div>
        </div>
      </section>




      {/* CGPE Achievements Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            {/* Trust Badge */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-blue-100 text-blue-600 px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                Trust Snapshot
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 px-4 sm:px-0">
              CGPE Achievements
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Numbers that reflect our commitment to medical professionals
            </p>
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">

            {/* Sumeinsure Card */}
            <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-5 lg:p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-500 mb-2">₹5500+</div>
              <div className="text-sm sm:text-base font-semibold text-gray-800 mb-1">Sume Assured</div>
              <div className="text-xs text-gray-600">crore achievement</div>
            </div>


            {/* Families Card */}
            <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-5 lg:p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-500 mb-2">17,000+</div>
              <div className="text-sm sm:text-base font-semibold text-gray-800 mb-1">Families</div>
              <div className="text-xs text-gray-600">protected & growing</div>
            </div>


            {/* Advisors Card */}
            <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-5 lg:p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-500 mb-2">600+</div>
              <div className="text-sm sm:text-base font-semibold text-gray-800 mb-1">Trained Advisors</div>
              <div className="text-xs text-gray-600">largest DO teams in Gujarat</div>
            </div>




            {/* Claims Card */}
            <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-5 lg:p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-500 mb-2">₹500+</div>
              <div className="text-sm sm:text-base font-semibold text-gray-800 mb-1">Crore Claims</div>
              <div className="text-xs text-gray-600">delivered (life + health)</div>
            </div>

            {/* Awards Card */}
            <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-5 lg:p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-500 mb-2">300+</div>
              <div className="text-sm sm:text-base font-semibold text-gray-800 mb-1">Awards</div>
              <div className="text-xs text-gray-600">across leading insurers</div>
            </div>

          </div>
        </div>
      </section>

      {/* What Doctors Choose Here Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            {/* Top Badge */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-green-100 text-green-600 px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                Tailored Solutions
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 px-4 sm:px-0">
              What Doctors Choose Here
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Specialized financial solutions designed specifically for medical professionals and their unique challenges
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Doctor Family Shield */}
            <div className="bg-white rounded-2xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Doctor Family Shield
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-blue-500 font-medium mb-4">
                Term + Critical Illness + Health Super Top-Up
              </p>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                "Peace of mind that keeps the clinic and the home steady. Comprehensive protection designed for medical families."
              </p>

              {/* CTA Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 mt-auto">
                Get My 60-sec Quote
              </button>
            </div>

            {/* Clinic Continuity Review */}
            <div className="bg-white rounded-2xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

               {/* Title */}
               <h3 className="text-xl font-bold text-gray-800 mb-3">
                 Secure Financial Growth Advice
               </h3>
 
               {/* Subtitle */}
               <p className="text-sm text-blue-500 font-medium mb-4">
                 Investment Planning + Wealth Building + SIP Guidance
               </p>
 
               {/* Description */}
               <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                 "Grow your wealth with confidence. Expert guidance on investments, SIPs, and long-term financial planning tailored for medical professionals."
               </p>
 
               {/* CTA Button */}
               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 mt-auto">
                 Get Growth Advice
               </button>
            </div>

            {/* Doctor Advisor Fellowship */}
            <div className="bg-white rounded-2xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Doctor Advisor Fellowship
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-blue-500 font-medium mb-4">
                Low time • High support • Ethical • Concierge paperwork
              </p>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                "Earn with trust. Lead with purpose. Join our exclusive network of medical professional advisors."
              </p>

              {/* CTA Button */}
              <button
                onClick={() => navigate('/cgpe-doctor-advisor')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 mt-auto"
              >
                Join the Mission
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default WhiteCoatWealthCircle;