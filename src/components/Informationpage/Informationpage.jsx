import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import im from "../assets/p.png"
import ca from "../assets/q.png"
import CGPEHeader from '../headers/CGPEHeader';
import './Informationpage.css';
import Footer from '../Footer';
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
    //     alt: "Facebook",
    //     url: "https://facebook.com/",
    //     svg: (
    //         <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
    //             <path d="M22 12.073C22 6.505 17.523 2 12 2S2 6.505 2 12.073C2 17.098 5.656 21.124 10.438 21.876v-6.248H7.898V12.07h2.54v-1.563c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.261c-1.243 0-1.631.771-1.631 1.562V12.07h2.773l-.443 3.558h-2.33v6.248C18.344 21.124 22 17.098 22 12.073z" />
    //         </svg>
    //     ),
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


const InformationPage = () => {
    const navigate = useNavigate();
    const [clickedCard, setClickedCard] = useState(null);
    const [showOtherInsurance, setShowOtherInsurance] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Animation states
    const [animatedElements, setAnimatedElements] = useState(new Set());
    const observerRef = useRef(null);

    // Function to play video when slide changes
    const playCurrentVideo = () => {
        setTimeout(() => {
            // Find the current video in both desktop and mobile views
            let currentVideo = document.querySelector(`[data-slide="${currentSlide}"] video`);

            // If not found in desktop view, try mobile view
            if (!currentVideo) {
                currentVideo = document.querySelector(`.lg\\:hidden [data-slide="${currentSlide}"] video`);
            }

            if (currentVideo) {
                // Reset video to beginning
                currentVideo.currentTime = 0;

                // Ensure video is properly configured for mobile auto-play
                currentVideo.muted = true;
                currentVideo.playsInline = true;
                currentVideo.preload = 'metadata';

                // Force play the video with mobile-optimized approach
                const playPromise = currentVideo.play();

                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log(`Auto-playing video for slide ${currentSlide} on ${window.innerWidth < 1024 ? 'mobile' : 'desktop'}`);
                        })
                        .catch(error => {
                            console.log('Auto-play failed, trying mobile-optimized method:', error);

                            // Mobile-specific fallback: try multiple approaches
                            if (window.innerWidth < 1024) {
                                // Method 1: Ensure muted and try again
                                currentVideo.muted = true;
                                currentVideo.play().catch(e => {
                                    console.log('Method 1 failed:', e);

                                    // Method 2: Try with user interaction simulation
                                    currentVideo.dispatchEvent(new Event('touchstart'));
                                    currentVideo.play().catch(e2 => {
                                        console.log('Method 2 failed:', e2);

                                        // Method 3: Final attempt with click simulation
                                        currentVideo.click();
                                        currentVideo.play().catch(e3 => console.log('All methods failed:', e3));
                                    });
                                });
                            } else {
                                // Desktop fallback
                                currentVideo.muted = true;
                                currentVideo.play().catch(e => console.log('Desktop fallback failed:', e));
                            }
                        });
                }
            } else {
                console.log(`Video not found for slide ${currentSlide}`);
            }
        }, 200); // Increased delay for mobile devices to ensure smooth transitions
    };

    // Effect to auto-play video when slide changes
    useEffect(() => {
        if (currentSlide !== undefined) {
            console.log(`Slide changed to: ${currentSlide}`);
            playCurrentVideo();
        }
    }, [currentSlide]);

    // Effect to ensure all videos are properly configured for auto-play
    useEffect(() => {
        // Ensure all videos are muted and ready for auto-play
        const allVideos = document.querySelectorAll('video');
        allVideos.forEach(video => {
            video.muted = true;
            video.playsInline = true;
            video.preload = 'metadata';
        });

        // Mobile-specific optimizations
        if (window.innerWidth < 1024) {
            console.log('Mobile device detected, applying mobile video optimizations');

            // Additional mobile video settings
            allVideos.forEach(video => {
                video.setAttribute('webkit-playsinline', 'true');
                video.setAttribute('x5-playsinline', 'true');
                video.setAttribute('x5-video-player-type', 'h5');
                video.setAttribute('x5-video-player-fullscreen', 'false');
            });
        }
    }, []);

    // Intersection Observer for scroll animations
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Handle data-animate-id elements
                        if (entry.target.dataset.animateId) {
                            setAnimatedElements(prev => new Set([...prev, entry.target.dataset.animateId]));
                        }
                        
                        // Handle scroll animation classes
                        if (entry.target.classList.contains('scroll-animate') ||
                            entry.target.classList.contains('scroll-animate-fade-left') ||
                            entry.target.classList.contains('scroll-animate-fade-right') ||
                            entry.target.classList.contains('scroll-animate-scale') ||
                            entry.target.classList.contains('scroll-animate-rotate') ||
                            entry.target.classList.contains('scroll-animate-fade-up')) {
                            entry.target.classList.add('animate-in');
                        }
                        
                        // Handle fade-in-up animations
                        if (entry.target.classList.contains('animate-fade-in-up')) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                        
                        // Handle staggered child animations
                        const childElements = entry.target.querySelectorAll('.animate-stagger-child');
                        childElements.forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('animate-in');
                            }, index * 150); // 150ms delay between each child
                        });
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Function to observe all animation elements
        const observeAnimationElements = () => {
            const dataAnimateElements = document.querySelectorAll('[data-animate-id]');
                    const scrollAnimateElements = document.querySelectorAll(
            '.scroll-animate, .scroll-animate-fade-left, .scroll-animate-fade-right, .scroll-animate-scale, .scroll-animate-rotate, .scroll-animate-fade-up'
        );
            const fadeInUpElements = document.querySelectorAll('.animate-fade-in-up');
            const staggerChildElements = document.querySelectorAll('.animate-stagger-child');
            

            
            dataAnimateElements.forEach(el => observerRef.current.observe(el));
            scrollAnimateElements.forEach(el => observerRef.current.observe(el));
            fadeInUpElements.forEach(el => observerRef.current.observe(el));
            staggerChildElements.forEach(el => observerRef.current.observe(el));
        };

        // Initial observation
        observeAnimationElements();

        // Re-observe after a short delay to ensure all elements are rendered
        const timeoutId = setTimeout(observeAnimationElements, 100);

        return () => {
            clearTimeout(timeoutId);
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    // Animation utility function
    const isAnimated = (id) => animatedElements.has(id);

    const handleOtherInsuranceClick = () => {
        setShowOtherInsurance(!showOtherInsurance);
    };

    const otherInsuranceOptions = [
        { name: "Family Health Insurance", type: "family-health" },
        { name: "Free Term Plan", type: "free-term" },
        { name: "Guaranteed Returns", type: "guaranteed-returns" },
        { name: "Child Saving Insurance", type: "child" },
        { name: "Retirement Insurance", type: "retirement" },
        { name: "Term Insurance Women", type: "women-insurance" },
        { name: "Group Health Insurance", type: "group" },
        { name: "Travel Insurance", type: "travel" }
    ];

    // Insurance coverage navigation handlers
    const handleInsuranceClick = (insuranceType) => {
        // Handle 'about' navigation immediately without delay
        if (insuranceType === 'about') {
            navigate('/about');
            return;
        }

        setClickedCard(insuranceType);

        // Navigate immediately for better performance (removed setTimeout delay)
        {
            // Define product data for each insurance type
            const productDataMap = {
                'health': {
                    name: 'Health Insurance',
                    category: 'Health Insurance',
                    description: 'Comprehensive health insurance coverage for medical emergencies, hospitalization, and critical illnesses. Get cashless treatment at network hospitals.',
                    features: 'Cashless treatment, Pre & post hospitalization, Critical illness cover, Health check-ups',
                    benefits: 'Medical expense coverage, Network hospital benefits, Tax benefits under Section 80D, Family coverage options',
                    eligibility: 'Age: 18-65 years, Pre-existing conditions covered after waiting period, Family members can be added',
                    documents: 'KYC documents, Medical reports, Income proof, Bank statements'
                },
                'moto': {
                    name: 'Motor Insurance',
                    category: 'Motor Insurance',
                    description: 'Comprehensive motor insurance coverage including own damage, third-party liability, and additional add-on benefits for complete vehicle protection.',
                    features: 'Own damage coverage, Third-party liability, Roadside assistance, Personal accident cover',
                    benefits: 'Vehicle protection, Legal compliance, Emergency support, Add-on benefits available',
                    eligibility: 'Vehicle ownership, Valid driving license, Vehicle registration, Age: 18+ years',
                    documents: 'KYC documents, Vehicle RC, Driving license, Previous policy (if any)'
                },
                'home': {
                    name: 'Family Health Insurance',
                    category: 'Health Insurance',
                    description: 'Family floater health insurance that covers all family members under a single policy with comprehensive medical coverage.',
                    features: 'Family floater coverage, Cashless treatment, Maternity benefits, Dental coverage',
                    benefits: 'Single policy for family, Cost-effective, Comprehensive coverage, Tax benefits',
                    eligibility: 'Family members, Age: 18-65 years, Pre-existing conditions covered after waiting period',
                    documents: 'KYC documents, Family member details, Medical reports, Income proof'
                },
                'business': {
                    name: 'Group Health Insurance',
                    category: 'Health Insurance',
                    description: 'Group health insurance for organizations providing comprehensive health coverage to employees and their families.',
                    features: 'Group coverage, Employee benefits, Family inclusion, Corporate discounts',
                    benefits: 'Cost-effective, Comprehensive coverage, Employee retention, Tax benefits',
                    eligibility: 'Organizations, Minimum employee count, Employee age criteria, Health requirements',
                    documents: 'Company details, Employee list, KYC documents, Health declarations'
                },
                'travel': {
                    name: 'Travel Insurance',
                    category: 'Travel Insurance',
                    description: 'International travel insurance providing coverage for medical emergencies, trip cancellation, baggage loss, and other travel-related risks.',
                    features: 'International medical coverage, Trip cancellation, Baggage protection, Emergency assistance',
                    benefits: 'Worldwide coverage, 24/7 assistance, Trip protection, Medical emergency coverage',
                    eligibility: 'Indian citizens, Valid passport, Travel plans, Age: 18-70 years',
                    documents: 'Passport, Travel itinerary, Visa documents, KYC documents'
                },
                'child': {
                    name: 'Child Saving Insurance',
                    category: 'Child Saving Insurance',
                    description: 'Child-focused insurance plans designed to secure your child\'s future education and career development needs.',
                    features: 'Education funding, Marriage corpus, Career development, Parent protection',
                    benefits: 'Child\'s future security, Education planning, Marriage planning, Life coverage for parent',
                    eligibility: 'Parent age: 18-65 years, Child age: 0-17 years, Regular income, Long-term planning',
                    documents: 'KYC documents, Child details, Income proof, Education goals'
                },
                'group': {
                    name: 'Group Health Insurance',
                    category: 'Health Insurance',
                    description: 'Group health insurance for organizations providing comprehensive health coverage to employees and their families.',
                    features: 'Group coverage, Employee benefits, Family inclusion, Corporate discounts',
                    benefits: 'Cost-effective, Comprehensive coverage, Employee retention, Tax benefits',
                    eligibility: 'Organizations, Minimum employee count, Employee age criteria, Health requirements',
                    documents: 'Company details, Employee list, KYC documents, Health declarations'
                },
                'life': {
                    name: 'Term Insurance',
                    category: 'Life Insurance',
                    description: 'Comprehensive life insurance coverage that provides financial protection to your family in case of your untimely demise. Choose from various term plans with flexible premium payment options.',
                    features: 'High coverage amounts, Flexible premium options, Tax benefits under Section 80C, Multiple riders available',
                    benefits: 'Financial security for family, Tax savings, Affordable premiums, Easy claim process',
                    eligibility: 'Age: 18-65 years, Income: No minimum requirement, Health: Medical examination may be required',
                    documents: 'KYC documents, Income proof, Medical reports (if required), Bank statements'
                },
                'investment': {
                    name: 'Investment Plan',
                    category: 'Investment Plans',
                    description: 'Professional investment plans designed for wealth creation with systematic investment options and tax benefits.',
                    features: 'Systematic investment, Professional fund management, Tax benefits, Diversified portfolios',
                    benefits: 'Wealth creation, Tax efficiency, Professional management, Flexible investment options',
                    eligibility: 'Age: 18-65 years, Regular income, Investment goals, Risk appetite',
                    documents: 'KYC documents, Income proof, Bank statements, Investment preferences'
                },
                'family-health': {
                    name: 'Family Health Insurance',
                    category: 'Health Insurance',
                    description: 'Family floater health insurance that covers all family members under a single policy with comprehensive medical coverage.',
                    features: 'Family floater coverage, Cashless treatment, Maternity benefits, Dental coverage',
                    benefits: 'Single policy for family, Cost-effective, Comprehensive coverage, Tax benefits',
                    eligibility: 'Family members, Age: 18-65 years, Pre-existing conditions covered after waiting period',
                    documents: 'KYC documents, Family member details, Medical reports, Income proof'
                },
                'free-term': {
                    name: 'Free Term Plan',
                    category: 'Life Insurance',
                    description: 'Free term insurance coverage for eligible individuals with no premium payment required, providing basic life protection.',
                    features: 'Zero premium, Life coverage, Simple terms, Easy claim process',
                    benefits: 'Free coverage, Basic protection, No premium payment, Simple documentation',
                    eligibility: 'Specific eligibility criteria, Age: 18-50 years, Income requirements, Occupation-based',
                    documents: 'KYC documents, Income proof, Occupation proof, Bank statements'
                },
                'guaranteed-returns': {
                    name: 'Guaranteed Returns',
                    category: 'Guaranteed Returns',
                    description: 'Guaranteed return investment plans offering assured returns with life insurance coverage and stable wealth building.',
                    features: 'Guaranteed returns, Life coverage, Stable investment, Maturity benefits',
                    benefits: 'Assured returns, Life protection, Stable growth, Maturity payout',
                    eligibility: 'Age: 18-65 years, Investment capacity, Long-term goals, Risk-averse investors',
                    documents: 'KYC documents, Income proof, Investment capacity, Bank statements'
                },
                'retirement': {
                    name: 'Retirement Insurance',
                    category: 'Retirement Insurance',
                    description: 'Retirement planning insurance products offering regular income post-retirement with life coverage during the accumulation phase.',
                    features: 'Retirement corpus, Regular income, Life coverage, Tax benefits',
                    benefits: 'Financial independence, Regular pension, Life protection, Tax efficiency',
                    eligibility: 'Age: 18-65 years, Regular income, Retirement planning, Long-term investment',
                    documents: 'KYC documents, Income proof, Retirement goals, Bank statements'
                },
                'women-insurance': {
                    name: 'Term Insurance Women',
                    category: 'Life Insurance',
                    description: 'Specialized insurance plans designed for women with additional benefits like critical illness coverage and maternity benefits.',
                    features: 'Women-specific benefits, Critical illness cover, Maternity benefits, Life coverage',
                    benefits: 'Gender-specific coverage, Health benefits, Life protection, Family security',
                    eligibility: 'Women, Age: 18-65 years, Health requirements, Income criteria',
                    documents: 'KYC documents, Medical reports, Income proof, Family details'
                },
                'tata-aia': {
                    name: 'Tata AIA Insurance Products',
                    category: 'Insurance',
                    description: 'Comprehensive insurance solutions from Tata AIA Life Insurance Company Ltd. offering a wide range of life insurance, health insurance, and investment products designed to meet your financial protection and wealth creation needs.',
                    features: 'Life coverage, Health protection, Investment options, Tax benefits, Flexible premium payment',
                    benefits: 'Financial security, Health protection, Wealth creation, Tax efficiency, Family protection',
                    eligibility: 'Age: 18-65 years, Indian residents, Income requirements, Health criteria',
                    documents: 'KYC documents, Income proof, Medical reports (if required), Bank statements'
                }
            };

            // Get product data for the selected insurance type
            const productData = productDataMap[insuranceType];

            // Navigate to TataAIA Fortune Guarantee Plus with product data for all insurance types
            if (productData) {
                navigate('/tata-aia-fortune-guarantee-plus', {
                    state: {
                        selectedProduct: productData
                    }
                });
            } else {
                // Fallback to original navigation for unknown types
                switch (insuranceType) {
                    case 'health':
                        navigate('/helthregister');
                        break;
                    case 'moto':
                        navigate('/motor-renewal');
                        break;
                    case 'home':
                        navigate('/familyhealth-register');
                        break;
                    case 'business':
                        navigate('/group-health-insurance');
                        break;
                    case 'travel':
                        navigate('/travelinsurance');
                        break;
                    case 'child':
                        navigate('/child-saving-insurance');
                        break;
                    case 'group':
                        navigate('/group-health-insurance');
                        break;
                    case 'life':
                        navigate('/register');
                        break;
                    case 'investment':
                        navigate('/investment-landing');
                        break;
                    case 'family-health':
                        navigate('/familyhealth-register');
                        break;
                    case 'free-term':
                        navigate('/free-term-plan');
                        break;
                    case 'guaranteed-returns':
                        navigate('/guaranteed-returns-plan');
                        break;
                    case 'retirement':
                        navigate('/retirement-insurance');
                        break;
                    case 'women-insurance':
                        navigate('/women-insurance');
                        break;
                    case 'tata-aia':
                        navigate('/tata-aia-fortune-guarantee-plus');
                        break;
                    case 'about':
                        navigate('/about');
                        break;
                    case 'careers':
                        navigate('/careers');
                        break;
                    case 'contact':
                        navigate('/contact');
                        break;
                    default:
                        break;
                }
            }
            setClickedCard(null);
        }
    };

    return (
        <>
            <div className="min-h-screen mx-auto gradient-background">
                <CGPEHeader />
                {/* Top Section - Hero Section */}
                <div
                    className="relative h-full sm:h-[70vh] md:h-[80vh] lg:h-[85vh] bg-cover bg-center bg-origin-content page-refresh-animation"
                    style={{
                        backgroundImage: `url('/assets/images/a')`,
                        backgroundColor: '#f5f5dc' // Light brown/beige background as fallback
                    }}
                >
                    {/* Background Image Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                    {/* Content Container */}
                    <div className="relative z-10 flex items-center h-full px-4 sm:px-8 lg:px-16">
                        {/* Since 1989 Badge - Top Right */}
                        {/* <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 z-20 page-refresh-badge-animation">
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm text-black px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-black border border-white border-opacity-30">
                                Since 1989
                            </div>
                        </div> */}

                        {/* Video Background */}
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
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-30" style={{ zIndex: 1 }}></div>
                        {/* Left Side - Text Content */}
                        <div
                            className="relative w-full lg:w-1/2 text-gray-100 text-center lg:text-left page-refresh-content-animation"
                            style={{ zIndex: 2 }}
                            data-animate-id="hero-content"
                        >
                            <h1
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-2 sm:mb-4 transition-all duration-700 gradient-text text-gray-100 translate-x-0 opacity-100 text-reveal"
                                style={{ transitionDelay: '0.4s' }}
                            >
                                {/* Finance */}
                            </h1>
                            <h1
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-2 sm:mb-4 transition-all duration-700 delay-200 gradient-text text-gray-100 translate-x-0 opacity-100 text-reveal"
                                style={{ transitionDelay: '0.6s' }}
                            >
                                {/* Figured Out */}
                            </h1>
                            <h1
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6 transition-all duration-700 delay-400 gradient-text text-gray-100 translate-x-0 opacity-100 text-reveal"
                                style={{ transitionDelay: '0.8s' }}
                            >
                                {/* For Your */}
                            </h1>

                            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 transition-all duration-700 delay-600 text-gray-200 px-4 sm:px-0 translate-x-0 opacity-90"
                                style={{ transitionDelay: '1s' }}
                            >
                                {/* Real experiences from our satisfied customers across India */}
                            </p>

                            {/* Get Started Button */}
                            {/* <button
                                className="bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-500 flex items-center gap-2 shadow-lg hover:scale-105 hover:shadow-xl mx-auto lg:mx-0 animate-bounce-custom opacity-100"
                                style={{ animationDelay: '1.5s' }}
                            >
                                Get Started
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button> */}
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Now appears after the first section ends */}
                <div
                    className="relative gradient-background-alt h-[40vh] sm:h-[45vh] md:h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
                    data-animate-id="bottom-section"
                >
                    {/* Smiley Emoji Background Elements */}
                    <span
                        className="absolute text-5xl sm:text-6xl md:text-7xl emoji-fly"
                        style={{ top: '10%', left: '8%', opacity: 0.20, filter: 'blur(0.5px)', ['--dx']: '28px', ['--dy']: '-18px', ['--duration']: '10s', ['--delay']: '0s', ['--scale']: isAnimated('bottom-section') ? '1' : '0.5', animationPlayState: isAnimated('bottom-section') ? 'running' : 'paused' }}
                        aria-hidden="true"
                    >😊</span>
                    <span
                        className="absolute text-4xl sm:text-5xl md:text-6xl emoji-fly"
                        style={{ top: '70%', left: '12%', opacity: 0.17, filter: 'blur(1px)', ['--dx']: '24px', ['--dy']: '-12px', ['--duration']: '11s', ['--delay']: '0.2s', ['--scale']: isAnimated('bottom-section') ? '1' : '0.5', animationPlayState: isAnimated('bottom-section') ? 'running' : 'paused' }}
                        aria-hidden="true"
                    >😊</span>
                    <span
                        className="absolute text-6xl sm:text-7xl md:text-8xl emoji-fly"
                        style={{ top: '20%', right: '10%', opacity: 0.15, filter: 'blur(1.5px)', ['--dx']: '36px', ['--dy']: '-22px', ['--duration']: '12s', ['--delay']: '0.3s', ['--scale']: isAnimated('bottom-section') ? '1' : '0.5', animationPlayState: isAnimated('bottom-section') ? 'running' : 'paused' }}
                        aria-hidden="true"
                    >😊</span>
                    <span
                        className="absolute text-4xl sm:text-5xl md:text-6xl emoji-fly"
                        style={{ bottom: '12%', right: '16%', opacity: 0.18, filter: 'blur(0.5px)', ['--dx']: '18px', ['--dy']: '-10px', ['--duration']: '9s', ['--delay']: '0.4s', ['--scale']: isAnimated('bottom-section') ? '1' : '0.5', animationPlayState: isAnimated('bottom-section') ? 'running' : 'paused' }}
                        aria-hidden="true"
                    >😊</span>
                    <span
                        className="absolute text-3xl sm:text-4xl md:text-5xl emoji-fly"
                        style={{ top: '50%', left: '45%', opacity: 0.13, filter: 'blur(1.2px)', ['--dx']: '16px', ['--dy']: '-14px', ['--duration']: '8.5s', ['--delay']: '0.5s', ['--scale']: isAnimated('bottom-section') ? '1' : '0.5', animationPlayState: isAnimated('bottom-section') ? 'running' : 'paused' }}
                        aria-hidden="true"
                    >😊</span>
                    <span
                        className="absolute text-5xl sm:text-6xl md:text-7xl emoji-fly"
                        style={{ bottom: '18%', left: '30%', opacity: 0.16, filter: 'blur(0.8px)', ['--dx']: '22px', ['--dy']: '-16px', ['--duration']: '10.5s', ['--delay']: '0.6s', ['--scale']: isAnimated('bottom-section') ? '1' : '0.5', animationPlayState: isAnimated('bottom-section') ? 'running' : 'paused' }}
                        aria-hidden="true"
                    >😇</span>
                    <span
                        className="absolute text-4xl sm:text-5xl md:text-6xl emoji-fly"
                        style={{ top: '30%', right: '30%', opacity: 0.14, filter: 'blur(1.1px)', ['--dx']: '26px', ['--dy']: '-20px', ['--duration']: '9.5s', ['--delay']: '0.7s', ['--scale']: isAnimated('bottom-section') ? '1' : '0.5', animationPlayState: isAnimated('bottom-section') ? 'running' : 'paused' }}
                        aria-hidden="true"
                    >😊</span>
                    {/* You can add more smileys for a denser effect */}

                    {/* Main Content */}
                    <div className="text-center z-10">
                        <h2
                            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-2 sm:mb-4 transition-all duration-1000 ${isAnimated('bottom-section') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                        >
                            Khushiyo Ka
                        </h2>
                        <h2
                            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-600 mb-4 sm:mb-6 transition-all duration-1000 delay-200 ${isAnimated('bottom-section') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                        >
                            Financial Planner
                        </h2>

                        <p
                            className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 sm:px-0 transition-all duration-1000 delay-400 ${isAnimated('bottom-section') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                        >
                            Comprehensive protection, trusted by thousands, backed by experience
                        </p>

                        {/* Call to Action Buttons */}
                        <div
                            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center transition-all duration-1000 delay-600 ${isAnimated('bottom-section') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                        >
                            {/* Call Us Button */}
                            <button 
                                onClick={() => window.open('https://wa.me/919662011021', '_blank')}
                                className="bg-white border-2 border-blue-300 hover:border-blue-400 text-blue-600 hover:text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105 hover:shadow-xl transform cursor-pointer"
                            >
                                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="white" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                </svg>
                                </div>
                                <span className="hidden sm:inline"></span>+91 96620 11021
                            </button>
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div
                    className="gradient-background-v3 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8"
                    data-animate-id="statistics-section"
                >
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                            {/* Card 1 - Happy Clients */}
                            <div
                                className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-700 hover:scale-105 hover:shadow-xl hover-lift hover-glow ${isAnimated('statistics-section') ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                    }`}
                                style={{ transitionDelay: '100ms' }}
                            >
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2 animate-pulse">18,000+</div>
                                <div className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Happy Clients</div>
                             </div>

                            {/* Card 2 - Claims Settled */}
                            <div
                                className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-700 hover:scale-105 hover:shadow-xl hover-lift hover-glow ${isAnimated('statistics-section') ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                    }`}
                                style={{ transitionDelay: '200ms' }}
                            >
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2 animate-pulse">₹5500 Cr+</div>
                                <div className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Sum Assured Covered</div>
                            </div>

                            {/* Card 3 - Claims Paid */}
                            <div
                                className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-700 hover:scale-105 hover:shadow-xl hover-lift hover-glow ${isAnimated('statistics-section') ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                    }`}
                                style={{ transitionDelay: '300ms' }}
                            >
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2 animate-pulse">110 Cr+</div>
                                <div className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Fund Under Management</div>
                            </div>

                            {/* Card 4 - Claims Settlement */}
                            <div
                                className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-700 hover:scale-105 hover:shadow-xl hover-lift hover-glow ${isAnimated('statistics-section') ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                    }`}
                                style={{ transitionDelay: '400ms' }}
                            >
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2 animate-pulse">350+</div>
                                <div className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Overseas Clients</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Divider Line */}
                <div className="flex justify-center items-center py-8">
                    <div className="text-4xl text-gray-300 font-mono">----------</div>
                </div>

                {/* Insurance Coverage Section */}
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
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-blue-600 text-center mb-4 animate-fade-in-up">
                            Choose the Right Coverage for You
                        </h2>

                        {/* Descriptive Text */}
                        <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto px-4 sm:px-0 text-center mb-12 animate-fade-in-up animate-stagger-1">
                            financial freedom for everyone
                        </p>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {productGridData.map((product, index) => (
                                <div key={index} className="flex flex-col animate-stagger-child animate-fade-in-up" style={{ animationDelay: `${(index * 0.1) + 0.2}s` }}>
                                    <div
                                        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100 hover-lift animate-card-float"
                                        onClick={() => navigate(product.route)}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        {/* Banner */}
                                        {/* {product.banner && (
                                            <div className="bg-[#19aae8bf] text-white text-xs font-semibold px-3 py-1 rounded-t-lg text-center animate-shimmer">
                                                {product.banner}
                                            </div>
                                        )} */}

                                        {/* Icon Container */}
                                        <div className="p-6 flex flex-col items-center justify-center h-[100px]">
                                            <div className="w-16 h-16 rounded-full flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                                <img src={product.image} alt={product.name} className="w-14 h-14 object-contain hover-scale" />
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



                {/* Latest Updates Section */}
               

                {/* What Our Customers Say Section */}
                <div className="gradient-background-v5 py-8 sm:py-12 lg:pb-16 px-4 sm:px-6 lg:px-8 relative">
                    {/* Background Design Elements */}
                    <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 text-blue-200 opacity-20">
                        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                    </div>
                    <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 text-blue-200 opacity-20">
                        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                    </div>

                    <div className="max-w-6xl mx-auto relative z-10">
                        {/* Section Header */}
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2 sm:mb-4">
                                What Our Customers Say
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto px-4 sm:px-0">
                                Real experiences from our satisfied customers across India
                            </p>
                        </div>

                        {/* Responsive Customer Testimonials Slider */}
                        <div
                            className="relative mb-6 sm:mb-8"
                            data-animate-id="video-testimonials"
                        >
                            {/* Desktop View - Show all videos in a row */}
                            <div className={`hidden lg:flex items-center justify-center space-x-8 transition-all duration-1000 delay-600 ${isAnimated('video-testimonials') ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                }`}>
                                {/* Card 1 - Blonde man with glasses */}
                                <div
                                    className="rounded-xl shadow-lg overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out cursor-pointer"
                                    data-slide="0"
                                    onMouseEnter={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) video.play();
                                    }}
                                    onMouseLeave={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) video.pause();
                                    }}
                                    onClick={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) {
                                            video.currentTime = 0;
                                            video.play().catch(e => console.log('Video play failed:', e));
                                        }
                                    }}
                                >
                                    <video
                                        src="/assets/images/r2.mp4"
                                        className="w-[220px] h-[210px] object-cover"
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        onError={(e) => {
                                            console.warn('Video loading error:', e.target.src);
                                        }}
                                        style={{ display: 'block' }}
                                    />
                                </div>

                                {/* Card 2 - Dark hair man with beard */}
                                <div
                                    className="rounded-xl shadow-lg overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out cursor-pointer"
                                    data-slide="1"
                                    onMouseEnter={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) video.play();
                                    }}
                                    onMouseLeave={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) video.pause();
                                    }}
                                    onClick={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) {
                                            video.currentTime = 0;
                                            video.play().catch(e => console.log('Video play failed:', e));
                                        }
                                    }}
                                >
                                    <video
                                        src="/assets/images/r3.mp4"
                                        className="w-[220px] h-[210px] object-cover"
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        onError={(e) => {
                                            console.warn('Video loading error:', e.target.src);
                                        }}
                                        style={{ display: 'block' }}
                                    />
                                </div>

                                {/* Card 3 - Center featured card - Dark curly hair man laughing */}
                                <div
                                    className="relative rounded-xl overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out cursor-pointer"
                                    data-slide="2"
                                    onMouseEnter={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) video.play();
                                    }}
                                    onMouseLeave={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) video.pause();
                                    }}
                                    onClick={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) {
                                            video.currentTime = 0;
                                            video.play().catch(e => console.log('Video play failed:', e));
                                        }
                                    }}
                                >
                                    <video
                                        src="/assets/images/r1.mp4"
                                        alt="Dark curly hair man laughing"
                                        className="w-[220px] h-[210px] object-cover"
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        onError={(e) => {
                                            console.warn('Video loading error:', e.target.src);
                                        }}
                                    />
                                </div>

                                {/* Card 4 - Dark curly hair man smiling */}
                                <div
                                    className="rounded-xl shadow-lg overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out cursor-pointer"
                                    data-slide="3"
                                    onMouseEnter={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) video.play();
                                    }}
                                    onMouseLeave={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) video.pause();
                                    }}
                                    onClick={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) {
                                            video.currentTime = 0;
                                            video.play().catch(e => console.log('Video play failed:', e));
                                        }
                                    }}
                                >
                                    <video
                                        src="/assets/images/r4.mp4"
                                        alt="Dark curly hair man smiling"
                                        className="w-[220px] h-[210px] object-cover"
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        onError={(e) => {
                                            console.warn('Video loading error:', e.target.src);
                                        }}
                                    />
                                </div>

                                {/* Card 5 - Dark hair man with baseball cap */}
                                <div
                                    className="rounded-xl shadow-lg overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out cursor-pointer"
                                    data-slide="4"
                                    onMouseEnter={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) video.play();
                                    }}
                                    onMouseLeave={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) video.pause();
                                    }}
                                    onClick={e => {
                                        const video = e.currentTarget.querySelector('video');
                                        if (video) {
                                            video.currentTime = 0;
                                            video.play().catch(e => console.log('Video play failed:', e));
                                        }
                                    }}
                                >
                                    <video
                                        src="/assets/images/r5.mp4"
                                        alt="Dark hair man with baseball cap"
                                        className="w-[220px] h-[210px] object-cover"
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        onError={(e) => {
                                            console.warn('Video loading error:', e.target.src);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Mobile/Tablet View - Slider */}
                            <div className={`lg:hidden transition-all duration-1000 delay-600 ${isAnimated('video-testimonials') ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                }`}>
                                <div className="relative overflow-hidden">
                                    <div
                                        className="flex transition-transform duration-300 ease-in-out"
                                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                    >
                                        {/* Mobile Card 1 */}
                                        <div className="w-full flex-shrink-0 px-4" data-slide="0">
                                            <div className="flex justify-center">
                                                <div
                                                    className="rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                                                    onMouseEnter={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) video.play();
                                                    }}
                                                    onMouseLeave={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) video.pause();
                                                    }}
                                                    onClick={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) {
                                                            video.currentTime = 0;
                                                            video.play().catch(e => console.log('Video play failed:', e));
                                                        }
                                                    }}
                                                    onTouchStart={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video && window.innerWidth < 1024) {
                                                            video.currentTime = 0;
                                                            video.muted = true;
                                                            video.play().catch(e => console.log('Mobile touch play failed:', e));
                                                        }
                                                    }}
                                                >
                                                    <video
                                                        src="/assets/images/r2.mp4"
                                                        className="w-[200px] h-[190px] sm:w-[220px] sm:h-[210px] object-cover"
                                                        loop
                                                        muted
                                                        playsInline
                                                        preload="metadata"
                                                        onError={(e) => {
                                                            console.warn('Video loading error:', e.target.src);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile Card 2 */}
                                        <div className="w-full flex-shrink-0 px-4" data-slide="1">
                                            <div className="flex justify-center">
                                                <div
                                                    className="rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                                                    onMouseEnter={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) video.play();
                                                    }}
                                                    onMouseLeave={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) video.pause();
                                                    }}
                                                    onClick={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) {
                                                            video.currentTime = 0;
                                                            video.play().catch(e => console.log('Video play failed:', e));
                                                        }
                                                    }}
                                                    onTouchStart={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video && window.innerWidth < 1024) {
                                                            video.currentTime = 0;
                                                            video.muted = true;
                                                            video.play().catch(e => console.log('Mobile touch play failed:', e));
                                                        }
                                                    }}
                                                >
                                                    <video
                                                        src="/assets/images/r3.mp4"
                                                        className="w-[200px] h-[190px] sm:w-[220px] sm:h-[210px] object-cover"
                                                        loop
                                                        muted
                                                        playsInline
                                                        preload="metadata"
                                                        onError={(e) => {
                                                            console.warn('Video loading error:', e.target.src);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile Card 3 - Featured */}
                                        <div className="w-full flex-shrink-0 px-4" data-slide="2">
                                            <div className="flex justify-center">
                                                <div
                                                    className="relative rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                                                    onMouseEnter={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) video.play();
                                                    }}
                                                    onMouseLeave={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) video.pause();
                                                    }}
                                                    onClick={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) {
                                                            video.currentTime = 0;
                                                            video.play().catch(e => console.log('Video play failed:', e));
                                                        }
                                                    }}
                                                    onTouchStart={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video && window.innerWidth < 1024) {
                                                            video.currentTime = 0;
                                                            video.muted = true;
                                                            video.play().catch(e => console.log('Mobile touch play failed:', e));
                                                        }
                                                    }}
                                                >
                                                    <video
                                                        src="/assets/images/r1.mp4"
                                                        alt="Dark curly hair man laughing"
                                                        className="w-[200px] h-[190px] sm:w-[220px] sm:h-[210px] object-cover"
                                                        loop
                                                        muted
                                                        playsInline
                                                        preload="metadata"
                                                        onError={(e) => {
                                                            console.warn('Video loading error:', e.target.src);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile Card 4 */}
                                        <div className="w-full flex-shrink-0 px-4" data-slide="3">
                                            <div className="flex justify-center">
                                                <div
                                                    className="rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                                                    onMouseEnter={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) video.play();
                                                    }}
                                                    onMouseLeave={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) video.pause();
                                                    }}
                                                    onClick={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) {
                                                            video.currentTime = 0;
                                                            video.play().catch(e => console.log('Video play failed:', e));
                                                        }
                                                    }}
                                                    onTouchStart={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video && window.innerWidth < 1024) {
                                                            video.currentTime = 0;
                                                            video.muted = true;
                                                            video.play().catch(e => console.log('Mobile touch play failed:', e));
                                                        }
                                                    }}
                                                >
                                                    <video
                                                        src="/assets/images/r4.mp4"
                                                        alt="Dark curly hair man smiling"
                                                        className="w-[200px] h-[190px] sm:w-[220px] sm:h-[210px] object-cover"
                                                        loop
                                                        muted
                                                        playsInline
                                                        preload="metadata"
                                                        onError={(e) => {
                                                            console.warn('Video loading error:', e.target.src);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile Card 5 */}
                                        <div className="w-full flex-shrink-0 px-4" data-slide="4">
                                            <div className="flex justify-center">
                                                <div
                                                    className="rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                                                    onMouseEnter={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) video.play();
                                                    }}
                                                    onMouseLeave={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) video.pause();
                                                    }}
                                                    onClick={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video) {
                                                            video.currentTime = 0;
                                                            video.play().catch(e => console.log('Video play failed:', e));
                                                        }
                                                    }}
                                                    onTouchStart={e => {
                                                        const video = e.currentTarget.querySelector('video');
                                                        if (video && window.innerWidth < 1024) {
                                                            video.currentTime = 0;
                                                            video.muted = true;
                                                            video.play().catch(e => console.log('Mobile touch play failed:', e));
                                                        }
                                                    }}
                                                >
                                                    <video
                                                        src="/assets/images/r5.mp4"
                                                        alt="Dark hair man with baseball cap"
                                                        className="w-[200px] h-[190px] sm:w-[220px] sm:h-[210px] object-cover"
                                                        loop
                                                        muted
                                                        playsInline
                                                        preload="metadata"
                                                        onError={(e) => {
                                                            console.warn('Video loading error:', e.target.src);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Navigation Controls */}
                                <div className="flex justify-center items-center mt-6 space-x-4">
                                    <button
                                        onClick={() => setCurrentSlide(prev => prev === 0 ? 4 : prev - 1)}
                                        className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors shadow-lg"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={() => setCurrentSlide(prev => prev === 4 ? 0 : prev + 1)}
                                        className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors shadow-lg"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Navigation Controls - Only show on large screens */}
                        <div className="hidden lg:flex justify-center space-x-4">
                            <button
                                onClick={() => setCurrentSlide(prev => prev === 0 ? 4 : prev - 1)}
                                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setCurrentSlide(prev => prev === 4 ? 0 : prev + 1)}
                                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default InformationPage;
