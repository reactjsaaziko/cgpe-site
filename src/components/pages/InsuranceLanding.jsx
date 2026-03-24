import React, { useState, useEffect } from 'react';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';
import TestimonialsSection from '../TestimonialsSection';
import { useNavigate } from 'react-router-dom';
import l1 from '../assets/l1.png';
import l2 from '../assets/l2.png';
import l3 from '../assets/l3.png';
import l4 from '../assets/l4.png';
import l5 from '../assets/l5.png';
import l6 from '../assets/l6.png';
import l7 from '../assets/l7.png';
import l8 from '../assets/l8.png';
import l9 from '../assets/l9.png';
import l10 from '../assets/l10.png';
import l11 from '../assets/l11.png';
import l12 from '../assets/l12.png';
import hg from '../assets/gh.png';
import hg2 from '../assets/gh2.png';
import hg3 from '../assets/gh3.png';
import hhh from '../assets/hhhh.png';
import hihi from '../assets/hihi.png';




const paymentLogos = [
  { alt: "Paytm", src: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Paytm_logo.jpg" },
  { alt: "American Express", src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg  " },
  { alt: "Visa", src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" },
  { alt: "RuPay", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/2560px-RuPay.svg.png" },
  { alt: "Mastercard", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png" },
];
const securedLogo = "https://simplypayme.com/wp-content/uploads/elementor/thumbs/PCI_Compliant_Logo_Social_1024x512-B-p2dnc8ec3t3tvp1m7rc3t4oyo79xgevi1abcbwenw0.png"; // Replace with your secured logo

const social = [
  // {
  //   alt: "Facebook",
  //   url: "https://facebook.com/",
  //   svg: (
  //     <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
  //       <path d="M22 12.073C22 6.505 17.523 2 12 2S2 6.505 2 12.073C2 17.098 5.656 21.124 10.438 21.876v-6.248H7.898V12.07h2.54v-1.563c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.261c-1.243 0-1.631.771-1.631 1.562V12.07h2.773l-.443 3.558h-2.33v6.248C18.344 21.124 22 17.098 22 12.073z" />
  //     </svg>
  //   ),
  // },
  {
    alt: "YouTube",
    url: "https://www.youtube.com/@cgpenterprise",
    svg: (
      <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M23.498 6.186a2.983 2.983 0 0 0-2.095-2.116C19.45 3.5 12 3.5 12 3.5s-7.45 0-9.403.57A2.983 2.983 0 0 0 .502 6.186C0 8.17 0 12 0 12s0 3.83.502 5.814a2.983 2.983 0 0 0 2.095 2.116C4.55 20.5 12 20.5 12 20.5s7.45 0 9.403-.57a2.983 2.983 0 0 0 2.095-2.116C24 15.83 24 12 24 12s0-3.83-.502-5.814zM9.546 15.568V8.432L15.818 12l-6.272 3.568z" />
      </svg>
    ),
  },
  {
    alt: "LinkedIn",
    url: "https://www.linkedin.com/in/cg-patel-715a732b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    svg: (
      <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 20h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.8-1.75-1.732 0-.934.784-1.732 1.75-1.732s1.75.798 1.75 1.732c0 .932-.784 1.732-1.75 1.732zm15 11.268h-3v-5.604c0-1.336-.026-3.062-1.866-3.062-1.87 0-2.156 1.459-2.156 2.967v5.699h-3v-10h2.882v1.367h.041c.402-.761 1.384-1.562 2.847-1.562 3.045 0 3.607 2.005 3.607 4.612v5.583z" />
      </svg>
    ),
  },
];

const InsuranceLanding = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showOtherInsurance, setShowOtherInsurance] = useState(false);

  // Add custom animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInLeft {
        from {
          transform: translateX(-100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes bounceGentle {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
      }
      
      @keyframes countUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes numberGrow {
        from {
          transform: scale(0.8);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }
      
      @keyframes cardFloat {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-3px);
        }
      }
      
      @keyframes trustBadge {
        0% {
          transform: scale(0.9);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      
      @keyframes shieldGlow {
        0%, 100% {
          filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
        }
        50% {
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));
        }
      }
      
      @keyframes textGlow {
        0%, 100% {
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
        }
        50% {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
        }
      }
      
      .animate-slide-in-left {
        animation: slideInLeft 1s ease-out;
      }
      
      .animate-slide-in-right {
        animation: slideInRight 1s ease-out 0.3s both;
      }
      
      .animate-fade-in {
        animation: fadeIn 1.5s ease-out;
      }
      
      .animate-bounce-gentle {
        animation: bounceGentle 2s ease-in-out infinite;
      }
      
      .animate-count-up {
        animation: countUp 0.8s ease-out;
      }
      
      .animate-number-grow {
        animation: numberGrow 1s ease-out;
      }
      
      .animate-card-float {
        animation: cardFloat 3s ease-in-out infinite;
      }
      
      .animate-trust-badge {
        animation: trustBadge 1s ease-out;
      }
      
      .animate-shield-glow {
        animation: shieldGlow 2s ease-in-out infinite;
      }
      
      .animate-text-glow {
        animation: textGlow 2s ease-in-out infinite;
      }
      
      .hover-scale:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
      }
      
      .hover-lift:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
      }
      
      .hover-glow:hover {
        box-shadow: 0 0 20px rgba(25, 170, 232, 0.5);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Scroll animation effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Add staggered animation to child elements
          const childElements = entry.target.querySelectorAll('.animate-stagger-child');
          childElements.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-in');
            }, index * 150); // 150ms delay between each child
          });
        }
      });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll(
      '.scroll-animate, .scroll-animate-fade-left, .scroll-animate-fade-right, .scroll-animate-scale, .scroll-animate-rotate, .scroll-animate-fade-up'
    );
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const handleOtherInsuranceClick = () => {
    setShowOtherInsurance(!showOtherInsurance);
  };

  const otherInsuranceOptions = [
    { name: "Family Health Insurance", route: "/familyhealth-register" },
    { name: "Free Term Plan", route: "/free-term-plan" },
    { name: "Guaranteed Returns", route: "/guaranteed-returns-plan" },
    { name: "Child Saving Insurance", route: "/child-saving-insurance" },
    { name: "Retirement Insurance", route: "/retirement-insurance" },
    { name: "Term Insurance Women", route: "/women-insurance" },
    { name: "Group Health Insurance", route: "/group-health-insurance" },
    { name: "Travel Insurance", route: "/travelinsurance" },
    { name: "Mutual Funds & SIP", route: "/mutual-funds-sip" }
  ];



  // Handle insurance product click
  const handleInsuranceClick = (route, product = null) => {
    // Navigate directly to the first form of the selected insurance type
    navigate(route);
  };

  // Filter Buttons
  const filterButtons = [
    { text: 'Lowest Price Guarantee', icon: '✓' },
    { text: 'Free Home Visit', icon: '🏠' },
    { text: 'Up to 95% Discount', icon: '%' },
    { text: 'Up to 10% Discount', icon: '%' },
    { text: 'Up to 90% Cheaper', icon: '%' }
  ];

  // Client Trust Statistics
  const trustStats = [
    { number: '18k+', label: 'Happy Clients' },
    { number: '₹1800Cr+', label: 'Sum Assured Covered' },
    { number: '40+', label: 'Years Experience' },
    { number: '99%', label: 'Claim Settlement' }
  ];

  // Why Choose Us Benefits
  const benefits = [
    {
      icon: '✓',
      title: 'Quick Claims',
      description: 'Fast and hassle-free claim settlement process with 24/7 support.'
    },
    {
      icon: '🛡️',
      title: 'Trusted Brand',
      description: '25+ years of experience serving customers with reliability and trust.'
    },
    {
      icon: '📈',
      title: 'Best Returns',
      description: 'Competitive premiums and excellent returns on investment plans.'
    }
  ];

  // Financial Solutions
  const financialSolutions = [
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Life Insurance',
      subtitle: 'Protect Your Family, Forever',
      description: 'Comprehensive life insurance coverage to secure your family\'s financial future.',
      features: ['High coverage amounts', 'Flexible premium options', 'Tax benefits under Section 80C'],
      buttonText: 'Get Plan Suggestions',
      buttonIcon: '→'
    },
    {
      icon: '🩹',
      title: 'Claims Assistance',
      subtitle: 'Support, When It Matters Most',
      description: 'Expert guidance and support throughout the claims process.',
      features: ['24/7 claim support', 'Fast processing', 'Documentation assistance'],
      buttonText: 'Need Help With a Claim?',
      buttonIcon: '→'
    },
    {
      icon: '💰',
      title: 'Mutual Funds & SIPs',
      subtitle: 'Start Small, Grow Big, Stay Consistent',
      description: 'Build wealth systematically with our curated mutual fund and SIP options.',
      features: ['Diversified portfolios', 'Systematic investment', 'Professional management'],
      buttonText: 'Start Your SIP',
      buttonIcon: '→',
      route: '/mutual-funds-sip'
    },
    {
      icon: '📊',
      title: 'Portfolio Management Services (PMS)',
      subtitle: 'Your Wealth Deserves Expert Attention',
      description: 'Professional portfolio management for high-net-worth individuals.',
      features: ['Customized strategies', 'Regular monitoring', 'Tax-efficient investing'],
      buttonText: 'Book a Consultation',
      buttonIcon: '→'
    },
    {
      icon: '🎓',
      title: 'Retirement & Child Education Planning',
      subtitle: 'Health Comes First, So Does Your Financial Safety',
      description: 'Plan for your retirement and your children\'s education with expert guidance.',
      features: ['Goal-based planning', 'Regular reviews', 'Flexible contributions'],
      buttonText: 'Calculate Your Goal',
      buttonIcon: '→'
    },
    {
      icon: '📋',
      title: 'Tax Planning',
      subtitle: 'Keep More of What You Earn',
      description: 'Optimize your tax liability with strategic tax planning solutions.',
      features: ['Tax-saving investments', 'Annual reviews', 'Compliance support'],
      buttonText: 'Get Free Tax Checkup',
      buttonIcon: '→'
    }
  ];

  // Recent Activities
  const recentActivities = [
    {
      image: '👥',
      title: 'Insurance Planning Workshop',
      description: 'Learn about the latest insurance products and planning strategies.',
      date: 'Dec 15, 2024',
      participants: '45',
      status: 'Upcoming'
    },
    {
      image: '🎯',
      title: 'Customer Service Training',
      description: 'Enhancing our customer service skills and response times.',
      date: 'Dec 10, 2024',
      participants: '32',
      status: 'Completed'
    },
    {
      image: '🌍',
      title: 'Digital Insurance Trends',
      description: 'Exploring the future of digital insurance and technology.',
      date: 'Dec 8, 2024',
      participants: '28',
      status: 'Completed'
    },
    {
      image: '🏆',
      title: 'Excellence Awards Ceremony',
      description: 'Celebrating outstanding performance and achievements.',
      date: 'Dec 20, 2024',
      participants: '60',
      status: 'Upcoming'
    },
    {
      image: '📄',
      title: 'Policy Documentation Review',
      description: 'Review and update of policy documentation processes.',
      date: 'Dec 5, 2024',
      participants: '18',
      status: 'Completed'
    },
    {
      image: '📝',
      title: 'Risk Assessment Seminar',
      description: 'Understanding risk assessment in insurance planning.',
      date: 'Dec 25, 2024',
      participants: '40',
      status: 'Upcoming'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Manas Agrawal',
      website: 'gmanas.co',
      content: 'dummy text of the printing and typesetting industry. Lorem Ipsum has been th'
    },
    {
      name: 'Priya Sharma',
      website: 'priyasharma.com',
      content: 'dummy text of the printing and typesetting industry. Lorem Ipsum has been th'
    },
    {
      name: 'Rahul Patel',
      website: 'rahulpatel.in',
      content: 'dummy text of the printing and typesetting industry. Lorem Ipsum has been th'
    }
  ];

  // Product Grid Data matching the image with detailed product information
  const productGridData = [
    {
      name: 'Term Insurance',
      banner: 'Lowest Price Guarantee',
      image: l1,
      route: '/register',
      category: 'Life Insurance',
      description: 'Comprehensive life insurance coverage that provides financial protection to your family in case of your untimely demise. Choose from various term plans with flexible premium payment options.',
      features: 'High coverage amounts, Flexible premium options, Tax benefits under Section 80C, Multiple riders available',
      benefits: 'Financial security for family, Tax savings, Affordable premiums, Easy claim process',
      eligibility: 'Age: 18-65 years, Income: No minimum requirement, Health: Medical examination may be required',
      documents: 'KYC documents, Income proof, Medical reports (if required), Bank statements'
    },
    {
      name: 'Health Insurance',
      banner: 'Free Home Visit',
      image: l2,
      route: '/helthregister',
      category: 'Health Insurance',
      description: 'Comprehensive health insurance coverage for medical emergencies, hospitalization, and critical illnesses. Get cashless treatment at network hospitals.',
      features: 'Cashless treatment, Pre & post hospitalization, Critical illness cover, Health check-ups',
      benefits: 'Medical expense coverage, Network hospital benefits, Tax benefits under Section 80D, Family coverage options',
      eligibility: 'Age: 18-65 years, Pre-existing conditions covered after waiting period, Family members can be added',
      documents: 'KYC documents, Medical reports, Income proof, Bank statements'
    },
    {
      name: 'Car Insurance',
      banner: 'Up To 91% Discount',
      image: l3,
      route: '/motor-renewal',
      category: 'Motor Insurance',
      description: 'Comprehensive car insurance coverage including own damage, third-party liability, and additional add-on benefits for complete vehicle protection.',
      features: 'Own damage coverage, Third-party liability, Roadside assistance, Personal accident cover',
      benefits: 'Vehicle protection, Legal compliance, Emergency support, Add-on benefits available',
      eligibility: 'Vehicle ownership, Valid driving license, Vehicle registration, Age: 18+ years',
      documents: 'KYC documents, Vehicle RC, Driving license, Previous policy (if any)'
    },
    {
      name: 'Bike Insurance',
      banner: 'Up To 91% Discount',
      image: l4,
      route: '/bike-renewal',
      category: 'Motor Insurance',
      description: 'Complete two-wheeler insurance coverage with own damage protection, third-party liability, and additional benefits for bike owners.',
      features: 'Own damage coverage, Third-party liability, Engine protect, Roadside assistance',
      benefits: 'Bike protection, Legal compliance, Engine coverage, Emergency support',
      eligibility: 'Bike ownership, Valid driving license, Vehicle registration, Age: 18+ years',
      documents: 'KYC documents, Bike RC, Driving license, Previous policy (if any)'
    },
    {
      name: 'Family Health Insurance',
      banner: 'Up To 91% Discount',
      image: l5,
      route: '/familyhealth-register',
      category: 'Health Insurance',
      description: 'Family floater health insurance that covers all family members under a single policy with comprehensive medical coverage.',
      features: 'Family floater coverage, Cashless treatment, Maternity benefits, Dental coverage',
      benefits: 'Single policy for family, Cost-effective, Comprehensive coverage, Tax benefits',
      eligibility: 'Family members, Age: 18-65 years, Pre-existing conditions covered after waiting period',
      documents: 'KYC documents, Family member details, Medical reports, Income proof'
    },
    {
      name: 'Travel Insurance',
      banner: 'Up To 20% Cheaper',
      image: l6,
      route: '/travelinsurance',
      category: 'Travel Insurance',
      description: 'International travel insurance providing coverage for medical emergencies, trip cancellation, baggage loss, and other travel-related risks.',
      features: 'International medical coverage, Trip cancellation, Baggage protection, Emergency assistance',
      benefits: 'Worldwide coverage, 24/7 assistance, Trip protection, Medical emergency coverage',
      eligibility: 'Indian citizens, Valid passport, Travel plans, Age: 18-70 years',
      documents: 'Passport, Travel itinerary, Visa documents, KYC documents'
    },
    {
      name: 'Investment Plan',
      banner: '',
      image: l8,
      route: '/investment-landing',
      category: 'Investment Plans',
      description: 'Professional investment plans designed for wealth creation with systematic investment options and tax benefits.',
      features: 'Systematic investment, Professional fund management, Tax benefits, Diversified portfolios',
      benefits: 'Wealth creation, Tax efficiency, Professional management, Flexible investment options',
      eligibility: 'Age: 18-65 years, Regular income, Investment goals, Risk appetite',
      documents: 'KYC documents, Income proof, Bank statements, Investment preferences'
    },
    {
      name: 'Free Term Plan',
      banner: '',
      image: l9,
      route: '/free-term-plan',
      category: 'Life Insurance',
      description: 'Free term insurance coverage for eligible individuals with no premium payment required, providing basic life protection.',
      features: 'Zero premium, Life coverage, Simple terms, Easy claim process',
      benefits: 'Free coverage, Basic protection, No premium payment, Simple documentation',
      eligibility: 'Specific eligibility criteria, Age: 18-50 years, Income requirements, Occupation-based',
      documents: 'KYC documents, Income proof, Occupation proof, Bank statements'
    },
    {
      name: 'Guaranteed Returns',
      banner: '',
      image: l10,
      route: '/guaranteed-returns-plan',
      category: 'Guaranteed Returns',
      description: 'Guaranteed return investment plans offering assured returns with life insurance coverage and stable wealth building.',
      features: 'Guaranteed returns, Life coverage, Stable investment, Maturity benefits',
      benefits: 'Assured returns, Life protection, Stable growth, Maturity payout',
      eligibility: 'Age: 18-65 years, Investment capacity, Long-term goals, Risk-averse investors',
      documents: 'KYC documents, Income proof, Investment capacity, Bank statements'
    },
    {
      name: 'Child Saving Insurance',
      banner: '',
      image: l11,
      route: '/child-saving-insurance',
      category: 'Child Saving Insurance',
      description: 'Child-focused insurance plans designed to secure your child\'s future education and career development needs.',
      features: 'Education funding, Marriage corpus, Career development, Parent protection',
      benefits: 'Child\'s future security, Education planning, Marriage planning, Life coverage for parent',
      eligibility: 'Parent age: 18-65 years, Child age: 0-17 years, Regular income, Long-term planning',
      documents: 'KYC documents, Child details, Income proof, Education goals'
    },
    {
      name: 'Retirement Insurance',
      banner: '',
      image: l12,
      route: '/retirement-insurance',
      category: 'Retirement Insurance',
      description: 'Retirement planning insurance products offering regular income post-retirement with life coverage during the accumulation phase.',
      features: 'Retirement corpus, Regular income, Life coverage, Tax benefits',
      benefits: 'Financial independence, Regular pension, Life protection, Tax efficiency',
      eligibility: 'Age: 18-65 years, Regular income, Retirement planning, Long-term investment',
      documents: 'KYC documents, Income proof, Retirement goals, Bank statements'
    },
    {
      name: 'Term Insurance Women',
      banner: '',
      image: l7,
      route: '/women-insurance',
      category: 'Life Insurance',
      description: 'Specialized insurance plans designed for women with additional benefits like critical illness coverage and maternity benefits.',
      features: 'Women-specific benefits, Critical illness cover, Maternity benefits, Life coverage',
      benefits: 'Gender-specific coverage, Health benefits, Life protection, Family security',
      eligibility: 'Women, Age: 18-65 years, Health requirements, Income criteria',
      documents: 'KYC documents, Medical reports, Income proof, Family details'
    }
  ];

  return (
    <div className='bg-gray-50'> 
      <CGPEHeader />

      {/* Hero Section - Matching the Image Design */}
      <div
        className="relative max-h-screen flex items-center mx-auto bg-gray-50 my-10 justify-center scroll-animate"
        style={{
          minHeight: '600px',
        }}
      >
        {/* Background YouTube Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <iframe
              src="https://www.youtube.com/embed/iWpIwnNrW7Y?si=SoHPRAqxwuf8wIlm&autoplay=1&mute=1&controls=0&loop=1&playlist=iWpIwnNrW7Y&modestbranding=1&showinfo=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="object-cover"
              style={{
                width: '100vw',
                height: '100vh',
                minWidth: '100%',
                minHeight: '100%',
                position: 'relative',
                pointerEvents: 'none',
                zIndex: 0,
                display: 'block',
              }}
            ></iframe>
            {/* Overlay for darkening the video */}
            <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto my-20 w-full animate-fade-in">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 border border-white rounded-full px-6 py-3 mb-8 animate-fade-in-up animate-stagger-1 animate-trust-badge">
            <svg className="w-5 h-5 text-white animate-pulse-slow animate-shield-glow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-white font-medium animate-text-glow">Trusted by 50,000+ clients</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-md shadow-black animate-fade-in-up animate-stagger-2">
            <span className="text-white drop-shadow-md shadow-black animate-slide-in-left">Secure Your Future with</span>
            <br />
            <span className="text-[#19aae8] drop-shadow-md shadow-black text-5xl md:text-5xl animate-pulse-slow animate-slide-in-right">CGPE Insurance</span>
          </h1>

          {/* Descriptive Text */}
          <p className="text-xl md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-sm shadow-black animate-fade-in-up animate-stagger-3">
            Comprehensive insurance solutions tailored for your life's every milestone. From health to wealth, we've got you covered.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up animate-stagger-4">
            <button className="bg-[#19aae8] border-1 border-white text-white px-8 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 hover-glow animate-float animate-bounce-gentle">
              Get Quote Now
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <a
              href="tel:+919662011021"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 hover-glow animate-float animate-bounce-gentle"
              style={{ animationDelay: '0.5s' }}
            >
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us: +91 9662011021
            </a>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up animate-stagger-5">
            {trustStats.map((stat, index) => (
              <div key={index} className="text-center hover-scale animate-count-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 animate-pulse-slow animate-number-grow">{stat.number}</div>
                <div className="text-white font-semibold animate-fade-in-up">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Product Grid Section - Matching the Image Design */}
      <div className="py-16 bg-white scroll-animate-scale">
        <div className="max-w-7xl mx-auto px-6">
          {/* Trust Badge */}
          {/* <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#19aae81a] rounded-full px-6 py-3">
              <svg className="w-5 h-5 text-[#19aae8]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[#19aae8] font-medium">Trusted by 50,000+ clients</span>
            </div>
          </div> */}

          {/* Main Heading */}
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4 animate-fade-in-up">
            Choose the Right Coverage for You
          </h2>

          {/* Descriptive Text */}
          <p className="text-base text-[#25385880] font-medium text-center mb-12 max-w-3xl mx-auto animate-fade-in-up animate-stagger-1">
            financial freedom for everyone
          </p>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {productGridData.map((product, index) => (
              <div key={index} className="flex flex-col animate-stagger-child animate-fade-in-up" style={{ animationDelay: `${(index * 0.1) + 0.2}s` }}>
                <div
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100 hover-lift animate-card-float"
                  onClick={() => handleInsuranceClick(product.route, product)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Banner */}
                  {product.banner && (
                    <div className="bg-[#19aae8bf] text-white text-xs font-semibold px-3 py-1 rounded-t-lg text-center animate-shimmer">
                      {product.banner}
                    </div>
                  )}

                  {/* Icon Container */}
                  <div className="p-6 flex flex-col items-center justify-center h-[100px]">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300 animate-float">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-contain hover-scale" />
                    </div>
                  </div>
                </div>
                <h3 className="text-sm mt-4 font-semibold text-gray-800 text-center leading-tight">
                  {product.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why 50,000+ Clients Trust Us Section */}
      <div className="relative py-20 mx-auto scroll-animate-fade-left overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="assets/images/fa.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Main Title and Description */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight animate-pulse-slow">
              Why 18,000+ Clients Trust Us
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-stagger-1">
              Our commitment to excellence and customer satisfaction has made us a trusted name in the insurance industry.
            </p>
          </div>

          {/* Data Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: 50,000+ Happy Customers */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-lg p-8 text-center hover:bg-opacity-20 transition-all duration-300 animate-stagger-child hover-lift">
              <div className="flex justify-center mb-4">
                <img
                  src={hhh}
                  alt="Happy Customers"
                  className="w-12 h-12 object-contain animate-float"
                />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 animate-pulse-slow">18,000+</div>
              <div className="text-lg font-semibold text-white mb-2">Happy Customers</div>
              <div className="text-sm text-gray-200">Trusted by families across India</div>
            </div>

            {/* Card 2: ₹500 Cr+ Claims Paid */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-lg p-8 text-center hover:bg-opacity-20 transition-all duration-300 animate-stagger-child hover-lift">
              <div className="flex justify-center mb-4">
                <img
                  src={hhh}
                  alt="Happy Customers"
                  className="w-12 h-12 object-contain animate-float"
                  style={{ animationDelay: '0.5s' }}
                />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 animate-pulse-slow">₹1800 Cr+</div>
              <div className="text-lg font-semibold text-white mb-2">Claims Paid</div>
              <div className="text-sm text-gray-200">Quick and hassle-free settlements</div>
            </div>

            {/* Card 3: 99% Claim Settlement Ratio */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-lg p-8 text-center hover:bg-opacity-20 transition-all duration-300 animate-stagger-child hover-lift">
              <div className="flex justify-center mb-4">
                <img
                  src={hhh}
                  alt="Happy Customers"
                  className="w-12 h-12 object-contain animate-float"
                  style={{ animationDelay: '1s' }}
                />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 animate-pulse-slow">99%</div>
              <div className="text-lg font-semibold text-white mb-2">Claim Settlement Ratio</div>
              <div className="text-sm text-gray-200">Industry-leading approval rate</div>
            </div>

            {/* Card 4: 25+ Years of Excellence */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-lg p-8 text-center hover:bg-opacity-20 transition-all duration-300 animate-stagger-child hover-lift">
              <div className="flex justify-center mb-4">
                <img
                  src={hhh}
                  alt="Happy Customers"
                  className="w-12 h-12 object-contain animate-float"
                  style={{ animationDelay: '1.5s' }}
                />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 animate-pulse-slow">40+</div>
              <div className="text-lg font-semibold text-white mb-2">Years of Excellence</div>
              <div className="text-sm text-gray-200">Decades of trusted service</div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Solutions Section */}
      <div className="bg-white py-16 scroll-animate-fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Financial Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial solutions designed to help you achieve your financial objectives.
            </p>
          </div>

          {/* Financial Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {financialSolutions.map((solution, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 animate-stagger-child"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="text-4xl mb-4">{solution.icon}</div>
                
                {/* Title and Subtitle */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{solution.title}</h3>
                <p className="text-sm text-blue-600 font-semibold mb-4">{solution.subtitle}</p>
                
                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
                
                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Action Button */}
                <button 
                  onClick={() => handleInsuranceClick(solution.route || '/mutual-funds-sip')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center group"
                >
                  {solution.buttonText}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                    {solution.buttonIcon}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-gray-50 py-16 bg-white scroll-animate-fade-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Latest Updates Button */}
          <div className="text-center mb-8 animate-fade-in-up">
            <button className="bg-[#19aae81a] text-[#19aae8] py-2 px-6 rounded-full font-medium hover:bg-blue-600 transition-colors duration-300 flex items-center mx-auto animate-pulse-slow">
              <img src={hg3} alt="Latest Updates" className="w-4 h-4 mr-2 animate-rotate-slow" />
              Latest Updates
            </button>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-12 animate-fade-in-up animate-stagger-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Activities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              financial freedom for everyone
            </p>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Activity Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-stagger-child hover-lift">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt="Insurance Planning Workshop"
                className="w-full h-48 object-cover hover-scale"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-[#19aae81a] text-[#19aae8] text-xs px-3 py-1 rounded-full animate-shimmer">Technology</span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Dec 15, 2024
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Insurance Planning Workshop</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Join our comprehensive workshop covering modern insurance planning strategies, risk assessment techniques, and portfolio optimization. Learn from industry experts about creating tailored insurance solutions for diverse client needs.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">3 min read</span>
                  <a href="#" className="text-[#19aae8] font-medium hover:text-blue-600 transition-colors duration-300 hover-glow">
                    Read More →
                  </a>
                </div>
              </div>
            </div>

            {/* Activity Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-stagger-child hover-lift">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Digital Transformation"
                className="w-full h-48 object-cover hover-scale"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-[#19aae81a] text-[#19aae8] text-xs px-3 py-1 rounded-full animate-shimmer">Technology</span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Dec 15, 2024
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Transformation</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Join our comprehensive workshop covering modern insurance planning strategies, risk assessment techniques, and portfolio optimization. Learn from industry experts about creating tailored insurance solutions for diverse client needs.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">3 min read</span>
                  <a href="#" className="text-[#19aae8] font-medium hover:text-blue-600 transition-colors duration-300 hover-glow">
                    Read More →
                  </a>
                </div>
              </div>
            </div>

            {/* Activity Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-stagger-child hover-lift">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Team Collaboration"
                className="w-full h-48 object-cover hover-scale"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-[#19aae81a] text-[#19aae8] text-xs px-3 py-1 rounded-full animate-shimmer">Technology</span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Dec 15, 2024
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Insurance Planning Workshop</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Join our comprehensive workshop covering modern insurance planning strategies, risk assessment techniques, and portfolio optimization. Learn from industry experts about creating tailored insurance solutions for diverse client needs.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">3 min read</span>
                  <a href="#" className="text-[#19aae8] font-medium hover:text-blue-600 transition-colors duration-300 hover-glow">
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* View All Updates Button */}
          {/* <div className="text-center animate-fade-in-up animate-stagger-5">
            <button className="bg-[#19aae8] text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 hover-lift animate-float">
              View All Updates
            </button>
          </div> */}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="scroll-animate-rotate">
        <TestimonialsSection />
      </div>

      {/* Insurance Companies Logos Section */}
      <div className="bg-gray-50 py-16 scroll-animate-scale">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          {/* <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted Insurance Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We partner with leading insurance companies across India to provide you with the best coverage options
            </p>
          </div> */}

          {/* Insurance Company Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {/* LIC */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 animate-stagger-child hover-lift">
              <img 
                src="/assets/images/lic.png" 
                alt="LIC" 
                className="h-12 w-auto object-contain hover-scale"
              />
            </div>

            {/* HDFC Life */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/HDFC_LIFE_LOGO.png.png" 
                alt="HDFC Life" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* ICICI Prudential */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/icicipre.jpg" 
                alt="ICICI Prudential" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* SBI Life */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/sbi.png" 
                alt="SBI Life" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Max Life */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/MAX_logo.png.png" 
                alt="Max Life" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Bajaj Allianz */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/BAJAJ_logo.png.png" 
                alt="Bajaj Allianz" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Tata AIA */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/TATA_AIA_logo.png.png" 
                alt="Tata AIA" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Kotak Life */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/kotsk.png" 
                alt="Kotak Life" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Aditya Birla Sun Life */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/Birla_Sun_Life_logo.png.png" 
                alt="Aditya Birla Sun Life" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* PNB MetLife */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/pnb.png" 
                alt="PNB MetLife" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Reliance Nippon */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/relience.png" 
                alt="Reliance Nippon" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Bharti AXA */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/bharti.png" 
                alt="Bharti AXA" 
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>

          {/* Additional Row for More Companies */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-8">
            {/* Star Union Dai-ichi */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/stu.png" 
                alt="Star Union Dai-ichi" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Canara HSBC */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/ch.png" 
                alt="Canara HSBC" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Exide Life */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/exid.png" 
                alt="Exide Life" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Future Generali */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/future.png" 
                alt="Future Generali" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* IDBI Federal */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/idbi.png" 
                alt="IDBI Federal" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* IndiaFirst */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src="/assets/images/india.png" 
                alt="IndiaFirst" 
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="text-black bg-white pb-0 scroll-animate">
        <div className="max-w-6xl mx-auto px-4 md:px-0 flex flex-col md:flex-row md:justify-between gap-10 pb-8">
          {/* Logo and columns */}
          <div className="flex flex-col items-center md:items-start md:w-1/4">
            <img
              src="./assets/images/C.G3.png" // Replace with your actual logo path
              alt="C.G. Patel House of Insurance"
              className="w-[200px] mb-3 rounded-bl-3xl w-full  bg-white p-8"
            />
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Insurance */}
            <div className="p-9">
              <div className="font-bold mb-7">Insurance</div>
                          <ul className="space-y-2 text-sm">
              {/* <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/motor-renewal')}>General Insurance</li> */}
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/register')}>Life Insurance</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/investment-landing')}>Investment</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/helthregister')}>Health Insurance</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={handleOtherInsuranceClick}>
                Other Insurance
                <span className="ml-1 transition-transform duration-200" style={{ transform: showOtherInsurance ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                  ▶
                </span>
              </li>
              {showOtherInsurance && (
                <div className="ml-4 mt-2 space-y-1">
                  {otherInsuranceOptions.map((option, index) => (
                    <li 
                      key={index} 
                      className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400 text-xs"
                      onClick={() => handleInsuranceClick(option.route)}
                    >
                      {option.name}
                    </li>
                  ))}
                </div>
              )}
            </ul>
            </div>
            {/* Resources */}
            <div className="p-9">
              <div className="font-bold mb-7">Resources</div>
                          <ul className="space-y-2 text-sm">
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/insurance')}>Articles</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/insurance')}>Customer reviews</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/insurance')}>Insurance companies</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/insurance')}>Newsroom</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/insurance')}>Our investor</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/insurance')}>Awards</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/insurance')}>PB Life</li>
            </ul>
            </div>
            {/* Company */}
            <div className="p-9">
              <div className="font-bold mb-7">Company</div>
                          <ul className="space-y-2 text-sm">
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/about')}>About Us</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => navigate('/sitemap')}>Sitemap</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/careers')}>Careers</li>
              {/* <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/insurance')}>Legal & Admin policies</li> */}
              {/* <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/insurance')}>ISPN</li> */}
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/contact')}>Contact us</li>
              {/* <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleInsuranceClick('/insurance')}>Verify your advisor</li> */}
            </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-1 pt-5 pb-3">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-5">
            {/* Payments, Secured, Social */}
            {/* <div className="flex flex-col items-center md:items-start">
              <span className="font-bold mb-2 text-sm">Payment Methods</span>
              <div className="flex gap-2 flex-wrap">
                {paymentLogos.map(({ alt, src }) => (
                  <img
                    key={alt}
                    src={src}
                    alt={alt}
                    className="h-7 bg-white rounded-md px-2 py-1 object-contain border border-gray-300 w-15"
                  />
                ))}
              </div>
            </div> */}
            {/* <div className="flex flex-col items-center md:items-start">
              <span className="font-bold mb-2 text-sm">Secured With</span>
              <div className="flex gap-2 flex-wrap">
                <img src={securedLogo} alt="Secured" className="h-7 bg-white rounded-md px-2 py-1 object-contain border border-gray-300" />
              </div>
            </div> */}
            <div className="flex flex-col items-center md:items-start">
              <span className="font-bold mb-2 text-sm">Follow us on</span>
              <div className="flex gap-2">
                {social.map((item) => (
                  <a
                    key={item.alt}
                    href={item.url}
                    className="bg-white text-[#181818] rounded-md p-2 flex items-center justify-center transition hover:bg-blue-100"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.alt}
                  >
                    {item.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm mt-5 pb-2">
            © Copyright 2023 Cg patel. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

InsuranceLanding.displayName = "InsuranceLanding";

export default InsuranceLanding; 