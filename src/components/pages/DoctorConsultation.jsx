import React, { useState, useEffect } from 'react';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';
import SimpleWhatsAppQR from '../common/SimpleWhatsAppQR';
import OptimizedImage from '../common/OptimizedImage';
import OptimizedVideo from '../common/OptimizedVideo';
import gpt1 from '../assets/gpt1.png';
import gpt2 from '../assets/gpt2.png';
import gpt3 from '../assets/gpt3.png';
import gpt48 from '../assets/gp48.png';
import gpt51 from '../assets/gpt51.png';
import grandfather from '../assets/grandfather.png';

const DoctorConsultation = () => {
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        city: '',
        phone: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openFAQ, setOpenFAQ] = useState(null);
    
    // Slider state for plan sections
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isAutoSliding, setIsAutoSliding] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBookCall = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Redirect to WhatsApp with the specific message
        const message = "Hello CGPE, I scanned the QR at White Coat Wealth Circle.\nRequesting a 15-minute tea consultation—please confirm available slots here.";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/919662011021?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        
        // Reset submitting state
        setIsSubmitting(false);
    };

    const handleWhatsApp = () => {
        const message = `Hello CGPE, I'm interested in the Doctor Consultation service.\n\nName: ${formData.name || 'Not provided'}\nSpecialty: ${formData.specialty || 'Not provided'}\nCity: ${formData.city || 'Not provided'}\nPhone: ${formData.phone || 'Not provided'}\n\nPlease contact me for a 15-minute consultation.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/919662011021?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    // Plan sections data
    const planSections = [
        {
            id: 1,
            title: "1 Year",
            wePay: "We Pay 33k",
            image: gpt1,
            alt: "1 Year Plan"
        },
        {
            id: 2,
            title: "2 Year",
            wePay: "We Pay 66k",
            image: gpt2,
            alt: "2 Year Plan"
        },
        {
            id: 3,
            title: "3 Year",
            wePay: "We Pay 99k",
            image: gpt3,
            alt: "3 Year Plan"
        },
        {
            id: 4,
            title: "Every Year",
            wePay: "",
            image: " --",
            alt: ""
        },
        {
            id: 5,
            title: "49 Year",
            wePay: "We Pay 16.17 lacs",
            image: gpt48,
            alt: "49 Year Plan"
        },
        {
            id: 6,
            title: "50 Year",
            wePay: "We Pay 16.5 lacs",
            image: grandfather,
            alt: "50 Year Plan"
        },
        {
            id: 7,
            title: "at 50 years",
            wePay: "We Pay 1 cr",
            image: gpt51,
            alt: "50 Year Plan"
        }
    ];

    // Auto-slide functionality
    useEffect(() => {
        if (!isAutoSliding || !needsSlider) return;

        const interval = setInterval(() => {
            setCurrentSlideIndex((prev) => {
                if (prev + 1 >= totalSlides) {
                    setIsAutoSliding(false); // Stop auto-sliding when reaching the last slide
                    return prev; // Stay at the last slide
                }
                return prev + 1;
            });
        }, 4000); // Auto-slide every 4 seconds

        return () => clearInterval(interval);
    }, [isAutoSliding, needsSlider, totalSlides]);

    // Slider navigation functions
    const nextSlide = () => {
        console.log(`Next clicked: current=${currentSlideIndex}, total=${totalSlides}`);
        if (currentSlideIndex < totalSlides - 1) {
            setCurrentSlideIndex((prev) => {
                console.log(`Moving to slide: ${prev + 1}`);
                return prev + 1;
            });
            setIsAutoSliding(false); // Stop auto-sliding when user interacts
        } else {
            console.log('Already at last slide');
        }
    };

    const prevSlide = () => {
        console.log(`Prev clicked: current=${currentSlideIndex}, total=${totalSlides}`);
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex((prev) => {
                console.log(`Moving to slide: ${prev - 1}`);
                return prev - 1;
            });
            setIsAutoSliding(false); // Stop auto-sliding when user interacts
        } else {
            console.log('Already at first slide');
        }
    };

    const goToSlide = (index) => {
        setCurrentSlideIndex(index);
        setIsAutoSliding(false); // Stop auto-sliding when user interacts
    };

    // Get visible sections for current slide (show 3 at a time)
    const getVisibleSections = () => {
        const visibleSections = [];
        for (let i = 0; i < 3; i++) {
            const index = currentSlideIndex + i;
            if (index < planSections.length) {
                visibleSections.push(planSections[index]);
            }
        }
        console.log(`Slide ${currentSlideIndex + 1}: Showing sections`, visibleSections.map(s => s.title));
        return visibleSections;
    };

    // Calculate total number of slides needed (7 sections - 3 per slide + 1 = 5 slides)
    const totalSlides = Math.max(1, planSections.length - 2);

    // Check if slider is needed (more than 3 sections)
    const needsSlider = planSections.length > 3;

    return (
        <div className="min-h-screen">
            <CGPEHeader />

            <div className="flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full">
                    <div className="text-center">

                        {/* Centered Information Section */}
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                You save lives{' '}.
                                <div>We secure your family.</div>
                                <span className="block text-blue-600">In 15 minutes.</span>
                            </h1>

                            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                                Doctor-desk plans: Term + Mediclaim + Indemnity + SIP growth, claim support handled for you.
                            </p>

                            {/* Feature Badges */}
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                                    18,000+ families protected
                                </div>
                                <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                                    36+ yrs legacy
                                </div>
                                <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                                    100% partner claim support
                                </div>
                                <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                                    5500+ sum Assured
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                                <button
                                    onClick={handleBookCall}
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
                                >
                                    {isSubmitting ? 'Booking...' : 'Book 15-min Call'}
                                </button>

                                <button
                                    onClick={handleWhatsApp}
                                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                    </svg>
                                    Need More Information
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="gradient-background-v3 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                        {/* Card 1 - Happy Clients */}
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-700 hover:scale-105 hover:shadow-xl">
                            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2 animate-pulse">18,000+</div>
                            <div className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Happy Clients</div>
                        </div>

                        {/* Card 2 - Claims Settled */}
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-700 hover:scale-105 hover:shadow-xl">
                            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2 animate-pulse">₹5500Cr+</div>
                            <div className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Sum Assured Covered</div>
                        </div>

                        {/* Card 3 - Claims Paid */}
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-700 hover:scale-105 hover:shadow-xl">
                            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2 animate-pulse">110Cr+</div>
                            <div className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Fund Under Management</div>
                        </div>

                        {/* Card 4 - Claims Settlement */}
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-700 hover:scale-105 hover:shadow-xl">
                            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2 animate-pulse">350+</div>
                            <div className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Overseas Clients</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Doctor Testimonials */}
            <div className="bg-gray-50 mt-5 py-16 mb-5 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* First Testimonial */}
                    <div className="bg-white rounded-lg shadow-md p-6 text-left">
                        <div className="flex items-center mb-4">
                            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-green-600 font-medium text-sm">Verified Doctor</span>
                        </div>
                        <blockquote className="text-gray-800 text-lg font-medium mb-3">
                            "One consult. Full clarity on clinic, kids, retirement."
                        </blockquote>
                        <cite className="text-gray-500 text-sm">
                            — Dr. Karan, Ortho
                        </cite>
                    </div>

                    {/* Second Testimonial */}
                    <div className="bg-white rounded-lg shadow-md p-6 text-left">
                        <div className="flex items-center mb-4">
                            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-green-600 font-medium text-sm">Verified Doctor</span>
                        </div>
                        <blockquote className="text-gray-800 text-lg font-medium mb-3">
                            "Claim coordination during a 36-hr shift—seamless."
                        </blockquote>
                        <cite className="text-gray-500 text-sm">
                            — Dr. Meera, Cardio
                        </cite>
                    </div>
                </div>
            </div>

            {/* Your 3-Stack Plan Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
                        <div>
                            {/* <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Child Investment Plan</h2> */}
                            <p className="text-lg text-gray-900 font-medium">You Pay 20k Per Month Still 12 Years</p>
                        </div>
                    </div>

                    {/* Slider Container */}
                    <div className="relative group">
                        {/* Navigation Buttons - Only show if slider is needed */}
                        {needsSlider && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    disabled={currentSlideIndex === 0}
                                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 z-20 rounded-full transition-all duration-200 p-3 border ${
                                        currentSlideIndex === 0 
                                            ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-50' 
                                            : 'bg-white border-gray-200 shadow-lg hover:shadow-xl hover:scale-110 opacity-80 hover:opacity-100'
                                    }`}
                                    aria-label="Previous slide"
                                    title={currentSlideIndex === 0 ? "Already at first slide" : "Previous slide"}
                                >
                                    <svg className={`w-6 h-6 ${currentSlideIndex === 0 ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextSlide}
                                    disabled={currentSlideIndex === totalSlides - 1}
                                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 z-20 rounded-full transition-all duration-200 p-3 border ${
                                        currentSlideIndex === totalSlides - 1 
                                            ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-50' 
                                            : 'bg-white border-gray-200 shadow-lg hover:shadow-xl hover:scale-110 opacity-80 hover:opacity-100'
                                    }`}
                                    aria-label="Next slide"
                                    title={currentSlideIndex === totalSlides - 1 ? "Already at last slide" : "Next slide"}
                                >
                                    <svg className={`w-6 h-6 ${currentSlideIndex === totalSlides - 1 ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Plan Sections Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden px-8">
                            {needsSlider ? (
                                // Show slider with visible sections
                                getVisibleSections().map((section, index) => (
                                    <div 
                                        key={`${section.id}-${currentSlideIndex}-${index}`} 
                                        className="bg-white rounded-lg shadow-md p-6 transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className={`text-xl font-bold text-gray-900 mb-2 ${section.id === 4 ? 'text-center' : ''}`}>{section.title}</h3>
                                                <p className="text-lg font-semibold text-blue-600">{section.wePay}</p>
                                            </div>
                                            {section.id !== 4 && (
                                                <div className="ml-4 flex-shrink-0">
                                                    <OptimizedImage 
                                                        src={section.image} 
                                                        alt={section.alt} 
                                                        className="h-16 w-16 object-contain"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // Show all sections in grid (3 or fewer)
                                planSections.map((section) => (
                                    <div key={section.id} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className={`text-xl font-bold text-gray-900 mb-2 ${section.id === 4 ? 'text-center' : ''}`}>{section.title}</h3>
                                                <p className="text-lg font-semibold text-blue-600">{section.wePay}</p>
                                            </div>
                                            {section.id !== 4 && (
                                                <div className="ml-4 flex-shrink-0">
                                                    <OptimizedImage 
                                                        src={section.image} 
                                                        alt={section.alt} 
                                                        className="h-16 w-16 object-contain"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Slider Indicators - Only show if slider is needed */}
                        {needsSlider && (
                            <div className="flex justify-center mt-6 space-x-2">
                                {Array.from({ length: totalSlides }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                            currentSlideIndex === index
                                                ? 'bg-blue-600 scale-125'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Auto-play indicator and slide counter */}
                        {needsSlider && (
                            <div className="flex justify-center items-center mt-4 space-x-6">
                                <button
                                    onClick={() => setIsAutoSliding(!isAutoSliding)}
                                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center gap-2"
                                >
                                    <div className={`w-2 h-2 rounded-full ${isAutoSliding ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                    {isAutoSliding ? 'Auto-playing' : 'Paused'}
                                </button>
                                
                                <div className="text-sm text-gray-500">
                                    {currentSlideIndex + 1} of {totalSlides}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* How it Works Section */}
            <div className=" py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How it works</h2>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <span className="text-2xl font-bold text-gray-900 mr-4">1)</span>
                            <p className="text-lg text-gray-700">15-min call → capture basics & goals.</p>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl font-bold text-gray-900 mr-4">2)</span>
                            <p className="text-lg text-gray-700">Doctor-desk blueprint with premiums.</p>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl font-bold text-gray-900 mr-4">3)</span>
                            <p className="text-lg text-gray-700">Claim-ready file & checklist, no paperwork chase.</p>
                        </div>
                    </div>
                </div>
            </div>



            {/* Call to Action Section */}
            <div className="bg-gray-50 py-16 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Main Call to Action Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto mb-8">
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Be claim-ready. Be growth-ready. In 15 minutes.
                            </h3>
                            <p className="text-lg text-gray-600">
                                Doctor-desk plans that protect your clinic, grow your money, and keep claims 100% coordinated.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleBookCall}
                                    disabled={isSubmitting}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Booking...' : 'Book 15-min Call'}
                                </button>

                                <button
                                    onClick={handleWhatsApp}
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                    </svg>
                                    WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Customer Testimonials Section */}
            <div className="bg-gray-50 py-16 px-8 relative">
                {/* Background Design Elements */}
                <div className="absolute top-8 right-8 w-32 h-32 text-blue-200 opacity-20">
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                    </svg>
                </div>
                <div className="absolute bottom-8 left-8 w-32 h-32 text-blue-200 opacity-20">
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-4">
                            What Our Customers Say
                        </h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Real experiences from our satisfied customers across India
                        </p>
                    </div>

                    {/* Customer Portraits Carousel */}
                    <div className="flex justify-center items-center mb-8">
                        <div className="flex items-center space-x-4 lg:space-x-8">
                            {/* Card 1 - Blonde man with glasses (now r2.mp4 video, plays on hover) */}
                            <div className="rounded-xl shadow-lg overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out">
                                <OptimizedVideo
                                    src="/assets/images/r2.mp4"
                                    className="w-[220px] h-[210px]"
                                    loop={true}
                                    muted={true}
                                    playsInline={true}
                                    loading="lazy"
                                />
                            </div>

                            {/* Card 2 - Dark hair man with beard */}
                            <div className="rounded-xl shadow-lg overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out">
                                <OptimizedVideo
                                    src="/assets/images/r3.mp4"
                                    className="w-[220px] h-[210px]"
                                    loop={true}
                                    muted={true}
                                    playsInline={true}
                                    loading="lazy"
                                />
                            </div>

                            {/* Card 3 - Center featured card - Dark curly hair man laughing */}
                            <div className="relative rounded-xl overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out mx-[10px]">
                                <OptimizedVideo
                                    src="/assets/images/r1.mp4"
                                    className="w-[220px] h-[210px]"
                                    loop={true}
                                    muted={true}
                                    playsInline={true}
                                    loading="lazy"
                                />
                            </div>

                            {/* Card 4 - Dark curly hair man smiling */}
                            <div className="rounded-xl shadow-lg overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out">
                                <OptimizedVideo
                                    src="/assets/images/r4.mp4"
                                    className="w-[220px] h-[210px]"
                                    loop={true}
                                    muted={true}
                                    playsInline={true}
                                    loading="lazy"
                                />
                            </div>

                            {/* Card 5 - Dark hair man with baseball cap */}
                            <div className="rounded-xl shadow-lg overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out">
                                <OptimizedVideo
                                    src="/assets/images/r5.mp4"
                                    className="w-[220px] h-[210px]"
                                    loop={true}
                                    muted={true}
                                    playsInline={true}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* FAQ Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
                    <div className="space-y-4">
                        {/* FAQ Item 1 */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div
                                className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => toggleFAQ(0)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <svg className={`w-4 h-4 text-gray-600 mr-3 mt-1 flex-shrink-0 transition-transform duration-200 ${openFAQ === 0 ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <h3 className="text-lg font-semibold text-gray-900">Is there any fee for the consult?</h3>
                                    </div>
                                </div>
                            </div>
                            {openFAQ === 0 && (
                                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                                    <p className="text-gray-600">No. It's a zero-cost consult to build clarity and a claim-ready file.</p>
                                </div>
                            )}
                        </div>

                        {/* FAQ Item 2 */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div
                                className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => toggleFAQ(1)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <svg className={`w-4 h-4 text-gray-600 mr-3 mt-1 flex-shrink-0 transition-transform duration-200 ${openFAQ === 1 ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <h3 className="text-lg font-semibold text-gray-900">How fast can I get covered?</h3>
                                    </div>
                                </div>
                            </div>
                            {openFAQ === 1 && (
                                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                                    <p className="text-gray-600">Most doctors can lock the cover within 24-48 hours post consult.</p>
                                </div>
                            )}
                        </div>

                        {/* FAQ Item 3 */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div
                                className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => toggleFAQ(2)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <svg className={`w-4 h-4 text-gray-600 mr-3 mt-1 flex-shrink-0 transition-transform duration-200 ${openFAQ === 2 ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <h3 className="text-lg font-semibold text-gray-900">Do you help during claims?</h3>
                                    </div>
                                </div>
                            </div>
                            {openFAQ === 2 && (
                                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                                    <p className="text-gray-600">Yes. Our partner support coordinates documents and follow-ups end-to-end.</p>
                                </div>
                            )}
                        </div>

                        {/* FAQ Item 4 */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div
                                className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => toggleFAQ(3)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <svg className={`w-4 h-4 text-gray-600 mr-3 mt-1 flex-shrink-0 transition-transform duration-200 ${openFAQ === 3 ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <h3 className="text-lg font-semibold text-gray-900">Which insurers do you work with?</h3>
                                    </div>
                                </div>
                            </div>
                            {openFAQ === 3 && (
                                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                                    <p className="text-gray-600">We work with multiple select partners (incl. TATA AIA) to match your profile.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>



            <Footer />
        </div>
    );
};

export default DoctorConsultation;
