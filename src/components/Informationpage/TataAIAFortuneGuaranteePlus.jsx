import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/environment';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';

const TataAIAFortuneGuaranteePlus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isBenefitsDropdownOpen, setIsBenefitsDropdownOpen] = useState(false);

  // Add isNRILead to formData, default to 'No'
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    isNRI: 'No',
    isNRILead: 'No',
    gender: 'Male',
    smokes: 'No',
    mobileNumber: '',
    email: '',
    consent: false
  });

  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  // Dynamic benefits data based on selected product
  const getPlanBenefits = (product) => {
    if (!product) return [];

    const baseBenefits = [
      "Life Cover: Comprehensive life insurance protection",
      "Tax Benefits: Tax deductions under Section 80C",
      "Flexible Premium Payment: Choose from various payment modes",
      "Death Benefits: Financial protection for your family",
      "Rider Benefits: Additional coverage options available"
    ];

    // If product has custom benefits from backend, use them
    if (product.benefits && typeof product.benefits === 'string') {
      const customBenefits = product.benefits.split(',').map(benefit => benefit.trim());
      return customBenefits;
    }

    // Add product-specific benefits based on category
    const productSpecificBenefits = [];

    if (product.category === 'Health Insurance' || product.name === 'Health Insurance' || product.name === 'Family Health Insurance') {
      productSpecificBenefits.push(
        "Medical Coverage: Comprehensive health protection",
        "Cashless Treatment: Network hospital benefits",
        "Pre & Post Hospitalization: Extended coverage period",
        "No Claim Bonus: Rewards for healthy living"
      );
    } else if (product.category === 'Car Insurance' || product.name === 'Car Insurance' || product.name === 'Bike Insurance') {
      productSpecificBenefits.push(
        "Vehicle Protection: Comprehensive damage coverage",
        "Third Party Liability: Legal compliance coverage",
        "Roadside Assistance: 24/7 emergency support",
        "Personal Accident Cover: Driver protection"
      );
    } else if (product.category === 'Travel Insurance' || product.name === 'Travel Insurance') {
      productSpecificBenefits.push(
        "International Coverage: Worldwide medical protection",
        "Trip Cancellation: Travel plan protection",
        "Baggage Loss: Personal belongings coverage",
        "Emergency Assistance: 24/7 travel support"
      );
    } else if (product.category === 'Investment Plans' || product.name === 'Investment Plan') {
      productSpecificBenefits.push(
        "Wealth Creation: Professional fund management",
        "Diversified Portfolios: Risk management",
        "Systematic Investment: Regular wealth building",
        "Tax Efficiency: Optimized tax benefits"
      );
    } else if (product.category === 'Guaranteed Returns' || product.name === 'Guaranteed Returns') {
      productSpecificBenefits.push(
        "Guaranteed Returns: Assured investment returns",
        "Maturity Benefits: Lump sum payout at policy maturity",
        "Stable Investment: Conservative wealth building",
        "Surrender Value: Get surrender value after lock-in period"
      );
    } else if (product.category === 'Child Saving Insurance' || product.name === 'Child Saving Insurance') {
      productSpecificBenefits.push(
        "Child Education Funding: Future education planning",
        "Marriage Corpus: Wedding expense planning",
        "Career Development: Professional growth support",
        "Parent Protection: Life coverage for parent"
      );
    } else if (product.category === 'Retirement Insurance' || product.name === 'Retirement Insurance') {
      productSpecificBenefits.push(
        "Retirement Corpus: Long-term wealth building",
        "Regular Income: Post-retirement financial security",
        "Financial Independence: Comfortable retirement planning",
        "Tax Benefits: Retirement-specific tax advantages"
      );
    }

    return [...baseBenefits, ...productSpecificBenefits];
  };

  // Dynamic table data based on selected product
  const getPlanTableData = (product) => {
    if (!product) return [];

    // If product has planOptions from backend, use them
    if (product.planOptions && typeof product.planOptions === 'object') {
      const planData = [];

      if (product.planOptions.minimumEntryAge) {
        planData.push({
          criteria: "Minimum Entry Age",
          option1: product.planOptions.minimumEntryAge,
          option2: product.planOptions.minimumEntryAge
        });
      }

      if (product.planOptions.maximumEntryAge) {
        planData.push({
          criteria: "Maximum Entry Age",
          option1: product.planOptions.maximumEntryAge,
          option2: product.planOptions.maximumEntryAge
        });
      }

      if (product.planOptions.minimumAgeAtMaturity) {
        planData.push({
          criteria: "Minimum Age at Maturity",
          option1: product.planOptions.minimumAgeAtMaturity,
          option2: product.planOptions.minimumAgeAtMaturity
        });
      }

      if (product.planOptions.maximumAgeAtMaturity) {
        planData.push({
          criteria: "Maximum Age at Maturity",
          option1: product.planOptions.maximumAgeAtMaturity,
          option2: product.planOptions.maximumAgeAtMaturity
        });
      }

      if (product.planOptions.incomePeriod) {
        planData.push({
          criteria: "Income Period",
          option1: product.planOptions.incomePeriod,
          option2: product.planOptions.incomePeriod
        });
      }

      if (product.planOptions.incomeMode) {
        planData.push({
          criteria: "Income Mode",
          option1: product.planOptions.incomeMode,
          option2: product.planOptions.incomeMode
        });
      }

      if (product.planOptions.coverage) {
        planData.push({
          criteria: "Coverage",
          option1: product.planOptions.coverage,
          option2: product.planOptions.coverage
        });
      }

      if (product.planOptions.minimumPremium) {
        planData.push({
          criteria: "Minimum Premium",
          option1: product.planOptions.minimumPremium,
          option2: product.planOptions.minimumPremium
        });
      }

      if (product.planOptions.maximumPremium) {
        planData.push({
          criteria: "Maximum Premium",
          option1: product.planOptions.maximumPremium,
          option2: product.planOptions.maximumPremium
        });
      }

      if (planData.length > 0) {
        return planData;
      }
    }

    // Fallback to category-based data
    if (product.category === 'Health Insurance' || product.name === 'Health Insurance' || product.name === 'Family Health Insurance') {
      return [
        {
          criteria: "Minimum Entry Age",
          option1: "18 years",
          option2: "18 years"
        },
        {
          criteria: "Maximum Entry Age",
          option1: "65 years",
          option2: "65 years"
        },
        {
          criteria: "Coverage Period",
          option1: "1 year (renewable)",
          option2: "1 year (renewable)"
        },
        {
          criteria: "Waiting Period",
          option1: "30 days for illness, 2 years for pre-existing",
          option2: "30 days for illness, 1 year for pre-existing"
        },
        {
          criteria: "Sum Insured",
          option1: "₹1 Lakh - ₹50 Lakhs",
          option2: "₹2 Lakhs - ₹1 Crore"
        },
        {
          criteria: "Premium Payment",
          option1: "Annual",
          option2: "Annual"
        },
        {
          criteria: "Network Hospitals",
          option1: "5000+ hospitals",
          option2: "8000+ hospitals"
        },
        {
          criteria: "Minimum Premium",
          option1: "₹500 per year",
          option2: "₹1000 per year"
        }
      ];
    } else if (product.category === 'Car Insurance' || product.name === 'Car Insurance' || product.name === 'Bike Insurance') {
      return [
        {
          criteria: "Vehicle Age",
          option1: "New vehicles",
          option2: "New and used vehicles"
        },
        {
          criteria: "Coverage Type",
          option1: "Third Party + Own Damage",
          option2: "Comprehensive + Add-ons"
        },
        {
          criteria: "Policy Period",
          option1: "1 year",
          option2: "1 year"
        },
        {
          criteria: "IDV Coverage",
          option1: "Up to 100% of vehicle value",
          option2: "Up to 100% of vehicle value"
        },
        {
          criteria: "Add-on Benefits",
          option1: "Basic add-ons",
          option2: "Premium add-ons included"
        },
        {
          criteria: "Roadside Assistance",
          option1: "Basic assistance",
          option2: "24/7 premium assistance"
        },
        {
          criteria: "Claim Settlement",
          option1: "Standard process",
          option2: "Fast-track process"
        },
        {
          criteria: "Minimum Premium",
          option1: "As per vehicle value",
          option2: "As per vehicle value + add-ons"
        }
      ];
    } else if (product.category === 'Travel Insurance' || product.name === 'Travel Insurance') {
      return [
        {
          criteria: "Trip Duration",
          option1: "Up to 30 days",
          option2: "Up to 90 days"
        },
        {
          criteria: "Medical Coverage",
          option1: "₹5 Lakhs",
          option2: "₹10 Lakhs"
        },
        {
          criteria: "Trip Cancellation",
          option1: "₹50,000",
          option2: "₹1 Lakh"
        },
        {
          criteria: "Baggage Loss",
          option1: "₹25,000",
          option2: "₹50,000"
        },
        {
          criteria: "Flight Delay",
          option1: "₹5,000",
          option2: "₹10,000"
        },
        {
          criteria: "Emergency Assistance",
          option1: "24/7 support",
          option2: "24/7 premium support"
        },
        {
          criteria: "Coverage Countries",
          option1: "Worldwide",
          option2: "Worldwide + adventure sports"
        },
        {
          criteria: "Minimum Premium",
          option1: "₹500",
          option2: "₹1000"
        }
      ];
    } else if (product.category === 'Investment Plans' || product.name === 'Investment Plan') {
      return [
        {
          criteria: "Investment Amount",
          option1: "₹500 - ₹50,000 per month",
          option2: "₹1000 - ₹1 Lakh per month"
        },
        {
          criteria: "Investment Horizon",
          option1: "3-5 years",
          option2: "5-10 years"
        },
        {
          criteria: "Risk Profile",
          option1: "Moderate",
          option2: "Balanced"
        },
        {
          criteria: "Fund Options",
          option1: "Equity, Debt, Hybrid",
          option2: "Equity, Debt, Hybrid, International"
        },
        {
          criteria: "Exit Load",
          option1: "1% (if exited before 1 year)",
          option2: "0.5% (if exited before 1 year)"
        },
        {
          criteria: "Tax Benefits",
          option1: "ELSS tax benefits",
          option2: "ELSS + additional tax planning"
        },
        {
          criteria: "Professional Management",
          option1: "Yes",
          option2: "Yes + personalized advice"
        },
        {
          criteria: "Minimum Investment",
          option1: "₹500",
          option2: "₹1000"
        }
      ];
    }

    // Default table data for other products
    return [
      {
        criteria: "Minimum Entry Age",
        option1: "1 year (subject to a minimum maturity age of 18 years)",
        option2: "18 years"
      },
      {
        criteria: "Maximum Entry Age",
        option1: "60 years",
        option2: "60 years"
      },
      {
        criteria: "Minimum Age at Maturity",
        option1: "18 years",
        option2: "23 years"
      },
      {
        criteria: "Maximum Age at Maturity",
        option1: "77 years",
        option2: "70 years"
      },
      {
        criteria: "Income Period",
        option1: "20 to 45 years (in multiples of 5 years) Policy Term + Income period is within the range of 25 years to 50 years",
        option2: "30 years for 5 pay and 25 years for 10 pay"
      },
      {
        criteria: "Income Mode",
        option1: "Annual & Monthly",
        option2: "Annual & Monthly"
      },
      {
        criteria: "Coverage",
        option1: "Single Life & Joint Life (Joint Life for Single Pay option only)",
        option2: "Single Life & Joint Life (Joint Life for Single Pay option only)"
      },
      {
        criteria: "Minimum Premium",
        option1: "Single Pay (SA I): Rs 5,000\nSingle Pay (SA II): As per Minimum Sum Assured and Death Benefit Multiple (DBM) offered\nLimited Pay / Regular Pay - Rs 24,000 p.a.",
        option2: "Single Pay (SA I): Rs 5,000\nSingle Pay (SA II): As per Minimum Sum Assured and Death Benefit Multiple (DBM) offered\nLimited Pay / Regular Pay - Rs 24,000 p.a."
      },
      {
        criteria: "Maximum Premium",
        option1: "No Limit",
        option2: "No Limit"
      }
    ];
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isBenefitsDropdownOpen && !event.target.closest('.benefits-dropdown')) {
        setIsBenefitsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBenefitsDropdownOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDownloadBrochure = async (productId, originalName) => {
    try {
      const response = await fetch(`/api/tata-aia-products/${productId}/brochure`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = originalName || 'brochure';

      // Append to the document, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object
      window.URL.revokeObjectURL(url);

      console.log('Brochure downloaded successfully');
    } catch (error) {
      console.error('Error downloading brochure:', error);
      alert('Failed to download brochure. Please try again.');
    }
  };

  // Handle product data from navigation or fetch from API
  useEffect(() => {
    const initializeProduct = async () => {
      // Check if product data was passed via navigation state
      if (location.state && location.state.selectedProduct) {
        setSelectedProduct(location.state.selectedProduct);
        return;
      }

      // Check if product ID was passed via navigation state
      if (location.state && location.state.productId) {
        setLoading(true);
        try {
          const response = await fetch(`${API_BASE_URL}/api/tata-aia-products/${location.state.productId}`);
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) {
              setSelectedProduct(data.data);
            } else {
              setError('Product not found');
            }
          } else {
            setError('Failed to load product details');
          }
        } catch (err) {
          setError('Error loading product details');
          console.error('Error fetching product:', err);
        } finally {
          setLoading(false);
        }
        return;
      }

      // If no product data, try to get from URL params or create default
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('productId');

      if (productId) {
        setLoading(true);
        try {
          const response = await fetch(`${API_BASE_URL}/api/tata-aia-products/${productId}`);
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) {
              setSelectedProduct(data.data);
            } else {
              setError('Product not found');
            }
          } else {
            setError('Failed to load product details');
          }
        } catch (err) {
          setError('Error loading product details');
          console.error('Error fetching product:', err);
        } finally {
          setLoading(false);
        }
        return;
      }

      // If no product data, create a default product for demonstration
      const defaultProduct = {
        name: 'Term Insurance',
        description: 'Comprehensive life insurance coverage that provides financial protection to your family in case of your untimely demise. Choose from various term plans with flexible premium payment options.',
        features: 'High coverage amounts, Flexible premium options, Tax benefits under Section 80C, Multiple riders available',
        benefits: 'Financial security for family, Tax savings, Affordable premiums, Easy claim process',
        eligibility: 'Age: 18-65 years, Income: No minimum requirement, Health: Medical examination may be required',
        documents: 'KYC documents, Income proof, Medical reports (if required), Bank statements'
      };
      setSelectedProduct(defaultProduct);
    };

    initializeProduct();
    // eslint-disable-next-line
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.mobileNumber) {
      alert('Please fill in your name and mobile number');
      return;
    }

    try {
      const inquiryData = {
        name: formData.fullName,
        phone: formData.mobileNumber,
        email: formData.email || '',
        subject: `TataAIA Product Inquiry - ${selectedProduct?.name || 'TataAIA Product'}`,
        message: `User is interested in TataAIA ${selectedProduct?.name || 'Product'}. NRI Status: ${formData.isNRILead || 'No'}. Additional details: Date of Birth: ${formData.dateOfBirth || 'Not provided'}, Gender: ${formData.gender || 'Not specified'}, Smokes: ${formData.smokes || 'Not specified'}`,
        inquiryType: 'insurance',
        source: 'website',
        productName: `TataAIA ${selectedProduct?.name || 'Product'}`,
        productCategory: selectedProduct?.category || 'Life Insurance'
      };

      const response = await fetch('/api/inquiries/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData)
      });

      if (response.ok) {
        alert('Thank you! Our TataAIA expert will contact you soon.');
        // Reset form
        setFormData({
          fullName: '',
          dateOfBirth: '',
          isNRI: 'No',
          isNRILead: 'No',
          gender: 'Male',
          smokes: 'No',
          mobileNumber: '',
          email: '',
          consent: false
        });
      } else {
        throw new Error('Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry. Please try again.');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <CGPEHeader/>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading product details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <CGPEHeader/>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Back to Services
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Validate product data
  const isValidProduct = selectedProduct && selectedProduct.name;

  // Show product not found state
  if (!selectedProduct || !isValidProduct) {
    return (
      <div className="min-h-screen bg-white">
        <CGPEHeader/>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-gray-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">
                {!selectedProduct ? 'No product selected' : 'Product data is incomplete'}
              </p>
              <button 
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              > 
                Back to Services
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <CGPEHeader/>
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-2 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap"> 
            <button 
              onClick={() => navigate('/')}
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <span className="mx-1 sm:mx-2">{'>'}</span>
            <button 
              onClick={() => navigate('/')}
              className="hover:text-blue-600 transition-colors"
            >
              Our Services
            </button>
            <span className="mx-1 sm:mx-2">{'>'}</span>
            <span className="text-blue-600 font-medium truncate">{selectedProduct.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
            {selectedProduct.name}
          </h1>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 bg-gray-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-gray-700 transition-colors text-xs sm:text-sm"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Services</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mb-8 sm:mb-12 px-4 sm:px-0">
          <button 
            onClick={() => {
              const adviceSection = document.getElementById('advice-section');
              if (adviceSection) {
                adviceSection.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start' 
                });
              }
            }}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-xs sm:text-sm w-auto justify-center"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
            <span>Meet an Advisor</span>
          </button>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 px-4 sm:px-0 leading-tight">Top features of {selectedProduct.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
            {[
              {
                icon: "💰",
                title: "Product Features",
                description: selectedProduct.features || "Comprehensive features designed for your needs"
              },
              {
                icon: "📋",
                title: "Product Benefits",
                description: selectedProduct.benefits || "Multiple benefits to secure your future"
              },
              {
                icon: "🤝",
                title: "Eligibility",
                description: selectedProduct.eligibility || "Check your eligibility criteria"
              },
              {
                icon: "🛡️",
                title: "Financial protection",
                description: selectedProduct.name === 'Health Insurance' || selectedProduct.name === 'Family Health Insurance' 
                  ? "Comprehensive health coverage for medical emergencies and hospitalization"
                  : selectedProduct.name === 'Car Insurance' || selectedProduct.name === 'Bike Insurance'
                  ? "Vehicle protection against damages, theft, and third-party liabilities"
                  : selectedProduct.name === 'Travel Insurance'
                  ? "International travel protection for medical emergencies and trip disruptions"
                  : "Lump sum benefit to your loved ones in the case of any unfortunate event"
              },
              {
                icon: "⏰",
                title: "Long term income",
                description: selectedProduct.name === 'Investment Plan' || selectedProduct.name === 'Guaranteed Returns'
                  ? "Systematic wealth building with professional fund management"
                  : selectedProduct.name === 'Child Saving Insurance'
                  ? "Goal-based savings for child's education and future needs"
                  : selectedProduct.name === 'Retirement Insurance'
                  ? "Retirement corpus building for financial independence"
                  : "Flexibility to choose income period between 20 to 45 years"
              },
              {
                icon: "❤️",
                title: selectedProduct.name === 'Health Insurance' || selectedProduct.name === 'Family Health Insurance' 
                  ? "Health Benefits"
                  : selectedProduct.name === 'Car Insurance' || selectedProduct.name === 'Bike Insurance'
                  ? "Vehicle Benefits"
                  : selectedProduct.name === 'Travel Insurance'
                  ? "Travel Benefits"
                  : "Critical Illness Cover⁵",
                description: selectedProduct.name === 'Health Insurance' || selectedProduct.name === 'Family Health Insurance'
                  ? "Cashless treatment, pre & post hospitalization coverage, health check-ups"
                  : selectedProduct.name === 'Car Insurance' || selectedProduct.name === 'Bike Insurance'
                  ? "Roadside assistance, personal accident cover, engine protect"
                  : selectedProduct.name === 'Travel Insurance'
                  ? "Emergency assistance, trip cancellation, baggage protection"
                  : "Health cover against 40 critical illnesses⁵ including cancer and cardiac arrest"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 px-4 sm:px-0">
            <span className="text-xs sm:text-sm text-gray-500">²T&C apply</span>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="relative benefits-dropdown w-full sm:w-auto">
                <button 
                  onClick={() => setIsBenefitsDropdownOpen(!isBenefitsDropdownOpen)}
                  className="flex items-center justify-center sm:justify-start space-x-1 text-blue-600 hover:text-blue-700 focus:outline-none w-full sm:w-auto px-4 py-2 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <span className="text-sm">View all benefits</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isBenefitsDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Benefits Dropdown */}
                {isBenefitsDropdownOpen && (
                  <div className="absolute left-0 sm:right-0 mt-2 w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">Plan Benefits</h3>
                      <ul className="space-y-2">
                        {getPlanBenefits(selectedProduct).map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <span className="text-sm text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              {selectedProduct?.brochure ? (
                <button 
                  onClick={() => handleDownloadBrochure(selectedProduct._id, selectedProduct.brochure.originalName)}
                  className="flex items-center justify-center space-x-1 text-blue-600 hover:text-blue-700 cursor-pointer w-full sm:w-auto px-4 py-2 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <span className="text-sm">Download brochure</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              ) : (
                <button className="flex items-center justify-center space-x-1 text-gray-400 cursor-not-allowed w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-md" disabled>
                  <span className="text-sm">Download brochure</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        {selectedProduct.description && (
          <div className="mb-12 px-4 sm:px-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Product Description</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>
          </div>
        )}

        {/* Required Documents Section */}
        {selectedProduct.documents && (
          <div className="mb-12 px-4 sm:px-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Required Documents</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {selectedProduct.documents}
              </p>
            </div>
          </div>
        )}

        {/* Plan Options Section */}
        <div className="mb-12 px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
            {selectedProduct.name === 'Health Insurance' || selectedProduct.name === 'Family Health Insurance'
              ? 'Select from our health plan options'
              : selectedProduct.name === 'Car Insurance' || selectedProduct.name === 'Bike Insurance'
              ? 'Select from our motor insurance options'
              : selectedProduct.name === 'Travel Insurance'
              ? 'Select from our travel plan options'
              : selectedProduct.name === 'Investment Plan'
              ? 'Select from our investment options'
              : 'Select from our 2 plan options'}
          </h2>
          
          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {getPlanTableData(selectedProduct).map((row, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">{row.criteria}</h3>
                <div className="space-y-2">
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-xs font-medium text-blue-900 mb-1">
                      {selectedProduct.name === 'Health Insurance' || selectedProduct.name === 'Family Health Insurance'
                        ? 'Basic Health Plan'
                        : selectedProduct.name === 'Car Insurance' || selectedProduct.name === 'Bike Insurance'
                        ? 'Comprehensive Plan'
                        : selectedProduct.name === 'Travel Insurance'
                        ? 'Standard Travel Plan'
                        : selectedProduct.name === 'Investment Plan'
                        ? 'Growth Plan'
                        : 'Option 1: Regular Income'}
                    </p>
                    <p className="text-xs text-gray-700">{row.option1}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-md">
                    <p className="text-xs font-medium text-green-900 mb-1">
                      {selectedProduct.name === 'Health Insurance' || selectedProduct.name === 'Family Health Insurance'
                        ? 'Premium Health Plan'
                        : selectedProduct.name === 'Car Insurance' || selectedProduct.name === 'Bike Insurance'
                        ? 'Premium Plan with Add-ons'
                        : selectedProduct.name === 'Travel Insurance'
                        ? 'Premium Travel Plan'
                        : selectedProduct.name === 'Investment Plan'
                        ? 'Balanced Plan'
                        : 'Option 2: Regular Income with an inbuilt Critical Illness benefit'}
                    </p>
                    <p className="text-xs text-gray-700">{row.option2}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Plan Options</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                    {selectedProduct.name === 'Health Insurance' || selectedProduct.name === 'Family Health Insurance'
                      ? 'Basic Health Plan'
                      : selectedProduct.name === 'Car Insurance' || selectedProduct.name === 'Bike Insurance'
                      ? 'Comprehensive Plan'
                      : selectedProduct.name === 'Travel Insurance'
                      ? 'Standard Travel Plan'
                      : selectedProduct.name === 'Investment Plan'
                      ? 'Growth Plan'
                      : 'Option 1: Regular Income'}
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                    {selectedProduct.name === 'Health Insurance' || selectedProduct.name === 'Family Health Insurance'
                      ? 'Premium Health Plan'
                      : selectedProduct.name === 'Car Insurance' || selectedProduct.name === 'Bike Insurance'
                      ? 'Premium Plan with Add-ons'
                      : selectedProduct.name === 'Travel Insurance'
                      ? 'Premium Travel Plan'
                      : selectedProduct.name === 'Investment Plan'
                      ? 'Balanced Plan'
                      : 'Option 2: Regular Income with an inbuilt Critical Illness benefit'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {getPlanTableData(selectedProduct).map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.criteria}</td>
                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700 whitespace-pre-line">{row.option1}</td>
                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700 whitespace-pre-line">{row.option2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="text-center text-xs sm:text-sm text-gray-500 py-4 sm:py-6 border-t border-gray-200 px-4 sm:px-0">
          All reference to age is as on last birthday. All premiums mentioned excludes taxes.
        </div>

        {/* Lead Generation Section */}
        <div id="advice-section" className="bg-gradient-to-r from-blue-50 to-blue-100 py-8 sm:py-12 mb-12 px-4 sm:px-0">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Need advice on a new plan?</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">Our experts are happy to help you!</p>
            
            <div className="bg-white rounded-lg p-4 sm:p-8 shadow-lg max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* NRI Question */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Are you an NRI?
                  </label>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    {['Yes', 'No'].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="isNRILead"
                          value={option}
                          checked={formData.isNRILead === option}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Mobile No.
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="Enter Mobile Number"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get a Call Back
                </button>

                {/* Consent */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <label className="text-xs text-gray-600 text-left">
                    By submitting details, I accept TATA AIA Life's Privacy Policy. TATA AIA Life Insurance Co. Ltd will send you updates on your policy, new products & services, insurance solutions or related information. Select here to opt-in.
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Riders Section */}
        <div className="mb-12 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">Enhance your coverage with riders</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 text-center">This plan offers the following optional riders⁹:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {selectedProduct.riders && Array.isArray(selectedProduct.riders) && selectedProduct.riders.length > 0 ? (
              selectedProduct.riders.map((rider, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">{rider.title}</h3>
                  <ul className="space-y-2 mb-3 sm:mb-4">
                    {rider.features && Array.isArray(rider.features) && rider.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs sm:text-sm text-gray-600 flex items-start">
                        <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors mb-3 text-sm">
                    Download
                  </button>
                  {rider.disclaimer && (
                    <p className="text-xs text-gray-500">{rider.disclaimer}</p>
                  )}
                </div>
              ))
            ) : (
              [
                {
                  title: "Tata AIA Vitality Health",
                  features: [
                    "39 Critical Illness covered including minor stage illness",
                    "Pays fixed amount on Hospitalization and on ICU admission"
                  ],
                  disclaimer: "A Non-Linked, Non-Participating Individual Health rider (UIN: 110B045V03)"
                },
                {
                  title: "Tata AIA Vitality Protect",
                  features: [
                    "Offers protection against 40 Critical Illness including Cancer and Cardiac conditions.",
                    "Extend protection to your loved ones too under the same plan."
                  ],
                  disclaimer: "A Non-Linked, Non-Participating Individual Health rider (UIN: 110B046V04)"
                },
                {
                  title: "Tata AIA Non-Linked Comprehensive Protection Rider",
                  features: [
                    "Financial protection against Death, Accidental Death/Disability, and Illness",
                    "40 Critical Illnesses covered including Cancer and Cardiac arrest"
                  ],
                  disclaimer: "A Non-Linked, Non-Participating Individual Health Rider (UIN: 110B033V04)"
                }
              ].map((rider, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">{rider.title}</h3>
                  <ul className="space-y-2 mb-3 sm:mb-4">
                    {rider.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs sm:text-sm text-gray-600 flex items-start">
                        <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {/* <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors mb-3 text-sm">
                    Download
                  </button> */}
                  <p className="text-xs text-gray-500">{rider.disclaimer}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Why Choose Tata AIA Section */}
        <div className="bg-gray-50 py-8 sm:py-12 mb-12 px-4 sm:px-0 p-2">
          <div className="max-w-7xl mx-auto p-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Why Choose Tata AIA Life Insurance?</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: "👨‍👩‍👧‍👦",
                  statistic: selectedProduct.companyStats?.familiesProtected || "85 Lakh+",
                  description: "Families protected so far¹⁰" 
                },
                {
                  icon: "%",
                  statistic: selectedProduct.claimSettlement?.ratio || "99.13%",
                  description: "Individual Death Claim settlement ratio¹¹"
                },
                {
                  icon: "⏰",
                  statistic: selectedProduct.claimSettlement?.expressSettlement || "4 Hours",
                  description: "Express Claim Settlement¹³"
                },
                {
                  icon: "🏢",
                  statistic: selectedProduct.companyStats?.assetsUnderManagement || "₹1 Lakh Crore+",
                  description: "Worth of Assets Under Management¹²"
                },
                {
                  icon: "📍",
                  statistic: selectedProduct.companyStats?.branches || "500+ Branches",
                  description: "Presence across major cities in India"
                },
                {
                  icon: "🛡️",
                  statistic: selectedProduct.companyStats?.retailSumAssured || "₹4 Lakh Crore+",
                  description: "Retail Sum Assured¹⁴"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 sm:p-6 text-center hover:shadow-md transition-shadow">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{item.icon}</div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1 sm:mb-2">{item.statistic}</div>
                  <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-4 sm:mt-6">
              <span className="text-xs sm:text-sm text-gray-500">¹³T&C apply.</span>
            </div>
          </div>
        </div>

        {/* Downloads and FAQ Section */}
        <div className="space-y-6 px-4 sm:px-0">
          {/* Downloads Section */}
          <div className="bg-gray-50 rounded-lg">
            <button
              onClick={() => setIsDownloadsOpen(!isDownloadsOpen)}
              className="w-full flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-black">Downloads</h2>
              <svg 
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-transform ${isDownloadsOpen ? 'rotate-180' : ''}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Animated dropdown for Downloads */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isDownloadsOpen ? 'max-h-96 opacity-100 scale-100 mt-2' : 'max-h-0 opacity-0 scale-95'
              }`}
              style={{ willChange: 'max-height, opacity, transform' }}
            >
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="space-y-4">
                  <a
                    href="/downloads/tata-aia-fortune-guarantee-plus-brochure.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center space-x-3 bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow hover:bg-blue-100"
                    download
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h8a1 1 0 01.707.293l4 4A1 1 0 0117 7v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm9 1.414V7a1 1 0 001 1h2.586L12 4.414zM8 12V8a1 1 0 112 0v4h1.293a1 1 0 01.707 1.707l-2.293 2.293a1 1 0 01-1.414 0l-2.293-2.293A1 1 0 016.707 12H8z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-blue-900 text-sm sm:text-base">Download Brochure</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-50 rounded-lg">
            <button
              onClick={() => setIsFAQOpen(!isFAQOpen)}
              className="w-full flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-black">Frequently Asked Questions</h2>
              <svg 
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-transform ${isFAQOpen ? 'rotate-180' : ''}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Animated dropdown for FAQ */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isFAQOpen ? 'max-h-[1000px] opacity-100 scale-100 mt-2' : 'max-h-0 opacity-0 scale-95'
              }`}
              style={{ willChange: 'max-height, opacity, transform' }}
            >
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="space-y-3 sm:space-y-4">
                  {selectedProduct.faqs && Array.isArray(selectedProduct.faqs) && selectedProduct.faqs.length > 0 ? (
                    selectedProduct.faqs.map((faq, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{faq.question}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    [
                      {
                        question: "What is a savings policy?",
                        answer: "A savings policy is a life insurance plan designed for savings and financial security."
                      },
                      {
                        question: "What are riders? Why do I need a rider?",
                        answer: "Riders are add-on benefits that provide additional coverage for various risks like accidental death, disability, critical/terminal illness, and medical expenses."
                      },
                      {
                        question: "What is a claim settlement ratio?",
                        answer: "Claim settlement ratio is the ratio of claims settled by an insurer to claims filed in a given period."
                      },
                      {
                        question: "What is a regular income / guaranteed income insurance plan?",
                        answer: "A regular income or guaranteed income insurance plan is a savings plan with a life cover that offers guaranteed income or a lump sum at maturity, along with a death benefit."
                      },
                      {
                        question: "Why do I need a savings plan?",
                        answer: "A savings plan provides disciplined savings for your goals and financial support with a basic life cover."
                      },
                      {
                        question: "When does a policy lapse?",
                        answer: "A policy lapses if premiums for one full year are unpaid within the grace period, resulting in no benefits."
                      },
                      {
                        question: "What is the difference between guaranteed income and whole life insurance?",
                        answer: "Whole life insurance covers up to age 100 with accumulated corpus/return of premiums as a survival benefit. Guaranteed income offers assured maturity benefits as regular income or lump sum, potentially with return of premiums. Both pay a death benefit."
                      },
                      {
                        question: "What is the maturity benefit in a guaranteed income plan?",
                        answer: "The maturity benefit in a guaranteed income plan is the money/funds saved (premiums) paid as a lump sum or regular income at maturity."
                      },
                      {
                        question: "Why purchase our best guaranteed return insurance plan?",
                        answer: "Our best guaranteed return insurance plan offers flexibility in policy term, sum assured, premium payment, and benefits like life cover, guaranteed returns, and savings."
                      }
                    ].map((faq, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{faq.question}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Disclaimer Section */}
        <div className="w-full mx-auto px-4 sm:px-0">
          <button
            onClick={() => setIsDisclaimerOpen(!isDisclaimerOpen)}
            className="w-full flex items-center justify-between bg-white rounded-lg p-4 mt-5 shadow-sm hover:shadow-md transition-shadow"
            aria-expanded={isDisclaimerOpen}
            aria-controls="disclaimer-content"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-black">Disclaimer</h2>
            <svg 
              className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-transform duration-300 ${isDisclaimerOpen ? 'rotate-180' : ''}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <div
            id="disclaimer-content"
            className={`
              overflow-hidden transition-all duration-500 ease-in-out
              ${isDisclaimerOpen ? 'max-h-[3000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}
            `}
            style={{
              // fallback for browsers not supporting max-h-[3000px]
              transitionProperty: 'max-height, opacity, margin-top',
            }}
            aria-hidden={!isDisclaimerOpen}
          >
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                <p className="font-semibold text-gray-900">
                  {selectedProduct.name} - {selectedProduct.category}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 font-semibold">1.</span>
                    <div>
                      <span className="font-semibold">Premium and Benefit Details:</span> Age group 18 to 50, Male/Female, Standard life, Plan Option 1 (Regular Income), Premium Payment Term 10 years, Policy Term 15 years, Income term 30 years, Income will start from 16th year. Total Guaranteed Benefit ₹46,06,600.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 font-semibold">2.</span>
                    <div>
                      <span className="font-semibold">Guaranteed Income:</span> Comprises Guaranteed annual Income plus Income Booster. Commences after maturity until the end of the Income Period, irrespective of the life insured's survival.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 font-semibold">3.</span>
                    <div>
                      <span className="font-semibold">Income Tax Benefits:</span> Available as per prevailing income tax laws, subject to conditions. ULIP policies: Maturity income taxable if annual aggregate premium exceeds ₹2.5 Lakh. Non-ULIP insurance policies: Maturity income taxable if annual aggregate premium exceeds ₹5 Lakh. Tax laws are subject to change. Tata AIA Life Insurance Company Ltd. does not assume responsibility for tax implications mentioned; advises consulting own tax consultant.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 font-semibold">4.</span>
                    <div>
                      <span className="font-semibold">Return of Premium:</span> Sum of Guaranteed Maturity Benefit plus Milestone Benefit. Payable at the end of the Income Period, irrespective of the life insured's survival.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 font-semibold">5.</span>
                    <div>
                      <span className="font-semibold">Critical Illness Benefit:</span> Available under Regular Income with an Inbuilt Critical Illness Benefit option.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 font-semibold">6.</span>
                    <div>
                      <span className="font-semibold">Tata AIA Vitality - A Wellness Program:</span> Offers an upfront discount at policy inception. Allows earning premium discount/cover booster in subsequent years based on Vitality Status (tracked on Vitality app). Refers to rider brochures for additional details on health and wellness benefits.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 font-semibold">7.</span>
                    <div>
                      <span className="font-semibold">Wellness Program Discounts and Details:</span>
                      <ul className="mt-2 ml-4 space-y-1">
                        <li>• <span className="font-semibold">Upfront Discount (First Year Premium):</span> 5% for Accidental Death, Accidental Total & Permanent Disability, Accidental Disability Care Benefits. 10% for other benefit options.</li>
                        <li>• <span className="font-semibold">Maximum Rewards (Cumulative):</span> 15% for Accidental Disability Care. 30% for all other benefit options.</li>
                      </ul>
                      Discount is driven by accumulated points achieved through wellness status. Refers to policy document for more details. Vitality is a trademark licensed to Tata AIA Life by Amplify Health Assets PTE. Limited, a joint venture between Vitality Group International, INC. and AIA Company Limited. Assessment under the wellness program is not considered medical advice or a substitute for professional medical consultation/treatment.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 font-semibold">8.</span>
                    <div>
                      <span className="font-semibold">Specific Tax Benefits Calculation:</span> Up to ₹46,800 u/s 80C is calculated at the highest tax slab rate of 31.20% (including cess excluding surcharge) on life insurance premium paid of ₹1,50,000 as per old tax regime. Benefits are subject to conditions under Sections 80C, 80D, 10(10D), 115BAC, and other provisions of the Income Tax Act, 1961. Good and Service Tax (GST) and Cess will be charged extra. Tax-Free income is subject to Section 10(10D) and other provisions. Tax laws are subject to amendments; advises consulting a tax advisor.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 font-semibold">9.</span>
                    <div>
                      <span className="font-semibold">Riders Information:</span> Riders are not mandatory but available for a nominal extra cost. For details on benefits, premiums, and exclusions, contact Tata AIA Life's Insurance Advisor/Intermediary/branch.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 font-semibold">10.</span>
                    <div>
                      <span className="font-semibold">Families Protected:</span> 85,76,889 families protected till December 24.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 font-semibold">11.</span>
                    <div>
                      <span className="font-semibold">Individual Death Claim Settlement Ratio:</span> 99.13% for FY 2023-24, as per the latest annual audited figures.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 font-semibold">12.</span>
                    <div>
                      <span className="font-semibold">Assets Under Management (AUM):</span> As on 3rd April 2024, the company's total AUM is ₹100,099.11 Crore.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 font-semibold">13.</span>
                    <div>
                      <span className="font-semibold">Claim Submission Conditions:</span> Applicable to non-early claims (more than 3 years of policy duration), non-investigation cases, up to Sum assured of 50 lacs. Applicable for branch walk-in. Time limit: Submit to Tata AIA by 2 pm (working days). Subject to submission of complete documents. Not applicable to ULIP policies and open title claims.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 font-semibold">14.</span>
                    <div>
                      <span className="font-semibold">Retail Sum Assured:</span> For FY2023 is ₹4,43,479 Crores.
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <p><span className="font-semibold">General Disclaimers/Conditions:</span></p>
                  <ul className="ml-4 space-y-1">
                    <li>• All Premiums, Charges, and interest payable under the policy are exclusive of applicable taxes, duties, surcharge, cesses, or levies, which will be entirely borne/paid by the Policyholder.</li>
                    <li>• Tata AIA Life has the right to claim, deduct, adjust, and recover any applicable tax or imposition from benefits.</li>
                    <li>• <span className="font-semibold">Rider Product Name:</span> The complete name of the rider is "Tata AIA Non-Linked Comprehensive Protection Rider (UIN:110B033V04) - A Non-Linked, Non-Participating Individual Health Rider."</li>
                    <li>• The product is underwritten by Tata AIA Life Insurance Company Ltd.</li>
                    <li>• The plan is not a guaranteed issuance plan and is subject to company's underwriting and acceptance.</li>
                    <li>• Insurance cover is available under this product.</li>
                    <li>• Policies sourced through PoS Channel will not require any medical examination. This plan is not a guaranteed issuance plan and is subject to Company's underwriting and acceptance.</li>
                    <li>• Premium excludes taxes, rider premiums, underwriting extra premiums, and loading for modal premiums.</li>
                    <li>• For more details on risk factors, terms, and conditions, read the Sales Brochure carefully before concluding a sale. Precise terms are in the Policy Contract.</li>
                    <li>• Risk cover commences along with policy commencement for all lives, including minor lives.</li>
                    <li>• Buying a Life Insurance Policy is a long-term commitment. Early termination usually involves high costs, and the Surrender Value may be less than the Premiums Paid.</li>
                    <li>• For more details on risk factors, terms, and conditions, read the sales brochure carefully.</li>
                    <li>• For non-standard lives and on submission of non-standard age proof, extra premiums will be charged as per underwriting guidelines.</li>
                    <li>• <span className="font-semibold">Document Identifier:</span> L&C/Advt/2025/Jun/2282.</li>
                  </ul>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
        <Footer/>
    </div>
  );
};

export default TataAIAFortuneGuaranteePlus;
