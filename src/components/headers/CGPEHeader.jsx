import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config/environment';

const CGPEHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logoRef = useRef(null);
  
  // Function to determine which link should be active based on current path
  const getActiveLink = (pathname) => {
    // Check for exact matches first
    if (pathname === '/') return 'Home';
    if (pathname === '/about') return 'About US';
    if (pathname === '/information') return 'More';
    if (pathname === '/for-advisor') return 'For Advisor';
    if (pathname === '/contact') return 'Contact';
    if (pathname === '/services') return 'Our Services';
    if (pathname === '/awards') return 'Awards';
    if (pathname === '/community' || pathname.startsWith('/community/')) return 'For Community';
    if (pathname === '/newsroom') return 'Newsroom';
    if (pathname === '/admin/login' || pathname === '/admin/dashboard') return 'For Advisor';
    if (pathname === '/portfolio') return 'Our Portfolio';
    
    // Check for event/session pages that should show Newsroom as active
    if (pathname === '/events' ||
        pathname === '/amit-dave-session' || 
        pathname === '/ankit-shah-session' || 
        pathname === '/kesariya-navratris') {
      return 'Newsroom';
    }
    
    // Check for services dropdown items
    if (pathname === '/services/insurance' || 
        pathname === '/services/financial-planning' || 
        pathname === '/mutual-funds-sip' ||
        pathname === '/register' ||
        pathname === '/motor-renewal' ||
        pathname === '/helthregister' ||
        pathname === '/contact' ||
        pathname === '/doctor-consultation') {
      return 'Our Services';
    }
    if (pathname.includes('/register') || 
        pathname.includes('/helthregister') || 
        pathname.includes('/motor-renewal') || 
        pathname.includes('/bike-renewal') || 
        pathname.includes('/familyhealth-register') || 
        pathname.includes('/travelinsurance') || 
        pathname.includes('/investment-landing') || 
        pathname.includes('/free-term-plan') || 
        pathname.includes('/guaranteed-returns-plan') || 
        pathname.includes('/child-saving-insurance') || 
        pathname.includes('/retirement-insurance') || 
        pathname.includes('/women-insurance') || 
        pathname.includes('/group-health-insurance') ||
        pathname.includes('/confirmation') ||
        pathname.includes('/policy') ||
        pathname.includes('/payment') ||
        pathname.includes('/review') ||
        pathname.includes('/config') ||
        pathname.includes('/tata-aia-products') ||
        pathname.includes('/tata-aia-fortune-guarantee-plus')) {
      return 'Insurance Products';
    }
    
    // Check for more dropdown items
    if (pathname.includes('/admin/') || 
        pathname.includes('/support') || 
        pathname.includes('/privacy')) {
      return 'More';
    }
    
    return 'Home'; // Default to Home
  };
  
  // Initialize activeLink based on current location to prevent flicker
  const [activeLink, setActiveLink] = useState(() => {
    // Get the correct active link immediately based on current pathname
    const currentPath = location.pathname;
    return getActiveLink(currentPath);
  });
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showTataAIAHover, setShowTataAIAHover] = useState(false);
  const [showServicesHover, setShowServicesHover] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileServicesDropdown, setShowMobileServicesDropdown] = useState(false);
  const [showMobileInsuranceDropdown, setShowMobileInsuranceDropdown] = useState(false);
  const [tataAIAProducts, setTataAIAProducts] = useState([]);
  const [isLoadingTataAIA, setIsLoadingTataAIA] = useState(false);


  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'About US', path: '/about' },
    { name: 'For Advisor', path: '/for-advisor' },
    { name: 'Insurance Products', path: '/services', hasDropdown: true },
    { name: 'Our Services', path: '/services', hasDropdown: true },
    { name: 'Awards', path: '/awards' },
    { name: 'For Community', path: '/community' },
    { name: 'Newsroom', path: '/newsroom' },
    // { name: 'Our Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
    // { name: 'More', path: '/more', hasDropdown: true }
  ];

  const moreDropdownItems = [
    { name: 'Admin Dashboard', path: '/admin/dashboard' },
    { name: 'Information Page', path: '/information' },
    { name: 'Support', path: '/support' },
    { name: 'Privacy Policy', path: '/privacy' }
  ];

  const servicesDropdownItems = [
    { name: 'Life Insurance', path: '/services' },
    { name: 'General Insurance', path: '/services' },
    { name: 'Health Insurance', path: '/services' },
    { name: 'Fire & Burglary Insurance', path: '/services' },
    { name: "Jeweler's Policy", path: '/services' },
    { name: 'Mutual Funds', path: '/services' },
    { name: 'For Doctor', path: '/white-coat-wealth-circle' }
  ];



  // Fetch Tata AIA products
  const fetchTataAIAProducts = async () => {
    setIsLoadingTataAIA(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tata-aia-products`);
      if (response.data?.success) {
        setTataAIAProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching Tata AIA products:', error);
    } finally {
      setIsLoadingTataAIA(false);
    }
  };

  // Fetch Tata AIA products only when needed (lazy loading)
  const handleTataAIAClick = () => {
    if (!showTataAIAHover && tataAIAProducts.length === 0 && !isLoadingTataAIA) {
      fetchTataAIAProducts();
    }
    setShowTataAIAHover(!showTataAIAHover);
  };

  // Optimized click outside handler for all dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      
      // Check if click is outside any dropdown
      if (!target.closest('.dropdown-container') && 
          !target.closest('button') && 
          !target.closest('.mobile-menu-container') &&
          !target.closest('.services-dropdown-container')) {
        
        // Close all dropdowns at once for better performance
        setShowTataAIAHover(false);
        setShowServicesDropdown(false);
        setShowMoreDropdown(false);
        setShowMobileMenu(false);
        setShowMobileServicesDropdown(false);
        setShowMobileInsuranceDropdown(false);
      }
    };

    // Only add listener if any dropdown is open
    if (showTataAIAHover || showServicesDropdown || showMoreDropdown || showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showTataAIAHover, showServicesDropdown, showMoreDropdown, showMobileMenu]);

  // Update active link when location changes
  useEffect(() => {
    const currentActiveLink = getActiveLink(location.pathname);
    setActiveLink(currentActiveLink);
  }, [location.pathname]);

  // Preload logo image on component mount
  useEffect(() => {
    const logoImg = new Image();
    logoImg.src = '/assets/images/cg2.png';
    logoImg.onload = () => {
      // Logo is preloaded and cached by browser
      console.log('Logo preloaded successfully');
    };
  }, []);



  const handleLinkClick = (linkName, path) => {
    // Close any open dropdowns first for smooth transition
    setShowMoreDropdown(false);
    setShowServicesDropdown(false);
    setShowTataAIAHover(false);
    setShowMobileMenu(false);
    setShowMobileServicesDropdown(false);
    setShowMobileInsuranceDropdown(false);
    
    // Set active link based on the path we're navigating to (consistent with getActiveLink)
    const expectedActiveLink = getActiveLink(path);
    setActiveLink(expectedActiveLink);
    
    // Navigate immediately
    navigate(path);
    
    // Scroll to top smoothly after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };



  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              {/* Logo Image - Optimized for single load */}
              <img
                ref={logoRef}
                src="/assets/images/cg2.png"
                alt="C.G.PATELLogo"
                className="w-auto h-20 object-contain"
                style={{ minWidth: '48px' }}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
              {/* Text Logo */}
              {/* <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-800 tracking-wide">C.G. PATEL</h1>
                <div className="w-full h-px bg-gray-300 my-1"></div>
                <p className="text-sm font-medium text-gray-800 tracking-wide">HOUSE OF INSURANCE</p>
              </div> */}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 dropdown-container">
            {navigationLinks.map((link) => (
              <div key={link.name} className={`relative ${link.name === 'Our Services' ? 'services-dropdown-container' : ''}`}>
                <button
                  onClick={() => {
                    if (link.hasDropdown) {
                      if (link.name === 'More') {
                        setShowMoreDropdown(!showMoreDropdown);
                      } else if (link.name === 'Our Services') {
                        // Toggle services dropdown on click
                        setShowServicesDropdown(!showServicesDropdown);
                      } else if (link.name === 'Insurance Products') {
                        // Toggle Tata AIA products panel on click with lazy loading
                        handleTataAIAClick();
                      }
                    } else {
                      handleLinkClick(link.name, link.path);
                    }
                  }}
                  className={`flex items-center space-x-1 px-2 py-1.5 rounded-md text-[13px] font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeLink === link.name
                      ? 'text-blue-500 bg-blue-50'
                      : (link.name === 'Insurance Products' && showTataAIAHover)
                        ? 'text-blue-500 bg-blue-50'
                        : (link.name === 'Our Services' && showServicesDropdown)
                          ? 'text-blue-500 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && (
                    <svg className={`w-4 h-4 transition-transform duration-200 ${
                      (link.name === 'Our Services' && showServicesDropdown) || 
                      (link.name === 'Insurance Products' && showTataAIAHover) 
                        ? 'rotate-180' : ''
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {/* Tata AIA Products Click Panel */}
                {link.name === 'Insurance Products' && showTataAIAHover && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-screen max-w-6xl bg-white rounded-md shadow-lg border border-gray-200 py-4 z-50 transition-all duration-300 ease-in-out transform opacity-100 scale-y-100 translate-y-0"
                    style={{ left: '50%', transform: 'translateX(-50%) scaleY(1)' }}
                  >
                    <div className="px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Tata AIA Insurance Products</h3>
                        <p className="text-sm text-gray-600">Comprehensive insurance solutions for your needs</p>
                      </div>
                      <button
                        onClick={() => setShowTataAIAHover(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                        aria-label="Close products panel"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="px-6 py-4">
                      {isLoadingTataAIA ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="ml-3 text-gray-600">Loading products...</span>
                        </div>
                      ) : tataAIAProducts.length > 0 ? (
                        <div>
                          {(() => {
                            // Group products by category
                            const groupedProducts = tataAIAProducts.reduce((acc, product) => {
                              const category = product.category || 'Other';
                              if (!acc[category]) {
                                acc[category] = [];
                              }
                              acc[category].push(product);
                              return acc;
                            }, {});

                            return (
                              <div className="grid grid-cols-3 gap-6">
                                {Object.entries(groupedProducts).map(([category, products]) => {
                                  // Split products into chunks of 8
                                  const productChunks = [];
                                  for (let i = 0; i < products.length; i += 8) {
                                    productChunks.push(products.slice(i, i + 8));
                                  }
                                  
                                                                     return productChunks.map((chunk, chunkIndex) => (
                                     <div key={`${category}-${chunkIndex}`} className="space-y-3">
                                       {/* Category Title - only show on first chunk */}
                                       {chunkIndex === 0 && (
                                         <div className="border-b border-gray-200 pb-2">
                                           <h4 className="text-lg font-semibold text-gray-900 capitalize">
                                             {category}
                                           </h4>
                                         </div>
                                       )}
                                       
                                       {/* Products in this chunk */}
                                       <div className={`space-y-2 ${chunkIndex === 0 ? '' : 'pt-12'}`}>
                                         {chunk.map((product) => (
                                           <button
                                             key={product._id}
                                             onClick={() => {
                                               navigate('/tata-aia-fortune-guarantee-plus', {
                                                 state: {
                                                   selectedProduct: product
                                                 }
                                               });
                                               setShowTataAIAHover(false);
                                             }}
                                             className="w-full text-left p-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded transition-all duration-200"
                                           >
                                             <div className="font-medium text-gray-900 truncate">{product.name}</div>
                                           </button>
                                         ))}
                                       </div>
                                     </div>
                                   ));
                                })}
                              </div>
                            );
                          })()}
                        </div>
                      ) : ( 
                        <div className="text-center py-8">
                          <div className="text-gray-500 mb-2">No Tata AIA products available</div>
                          <button
                            onClick={() => {
                              navigate('/tata-aia-fortune-guarantee-plus', {
                                state: {
                                  selectedProduct: {
                                    name: 'Tata AIA Insurance Products',
                                    category: 'Insurance',
                                    description: 'Comprehensive insurance solutions from Tata AIA Life Insurance Company Ltd. offering a wide range of life insurance, health insurance, and investment products designed to meet your financial protection and wealth creation needs.',
                                    features: 'Life coverage, Health protection, Investment options, Tax benefits, Flexible premium payment',
                                    benefits: 'Financial security, Health protection, Wealth creation, Tax efficiency, Family protection',
                                    eligibility: 'Age: 18-65 years, Indian residents, Income requirements, Health criteria',
                                    documents: 'KYC documents, Income proof, Medical reports (if required), Bank statements'
                                  }
                                }
                              });
                              setShowTataAIAHover(false);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View all products →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Our Services Click Dropdown */}
                {link.name === 'Our Services' && showServicesDropdown && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 services-dropdown-container"
                  >
                    {servicesDropdownItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          // Close dropdown first for smooth transition
                          setShowServicesDropdown(false);
                          // Navigate with smooth transition
                          setTimeout(() => {
                            navigate(item.path, { state: { selectedService: item.name } });
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }, 150);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors duration-200"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* More Dropdown */}
                {/* {link.name === 'More' && showMoreDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    {moreDropdownItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          handleLinkClick(item.name, item.path);
                          setShowMoreDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )} */}
              </div>
            ))}
          </nav>

          {/* Search Button */}
          {/* <div className="flex items-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium text-sm flex items-center space-x-2 transition-colors duration-200">
              <span>Search</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div> */}

          {/* Since 1989 Text */}
          <div className="hidden lg:flex items-center ml-2">
            <span className="text-sm font-semibold text-gray-700 tracking-wide bg-gray-200 rounded-full px-3 py-1.5 whitespace-nowrap">
              Since 1989
            </span>
          </div>

          {/* Mobile Menu Button and Since 1989 */}
          <div className="lg:hidden flex items-center space-x-4">
            <span className="text-sm font-semibold text-gray-700 tracking-wide">
              Since 1989
            </span>
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-gray-700 hover:text-blue-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="lg:hidden mobile-menu-container">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {navigationLinks.map((link) => (
              <div key={link.name}>
                {link.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => {
                        if (link.name === 'Our Services') {
                          setShowMobileServicesDropdown(!showMobileServicesDropdown);
                          setShowMobileInsuranceDropdown(false);
                        } else if (link.name === 'Insurance Products') {
                          setShowMobileInsuranceDropdown(!showMobileInsuranceDropdown);
                          setShowMobileServicesDropdown(false);
                        } else {
                          handleLinkClick(link.name, link.path);
                        }
                      }}
                      className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                        activeLink === link.name
                          ? 'text-blue-500 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
                      }`}
                    >
                      <span>{link.name}</span>
                      <svg className={`w-4 h-4 transition-transform duration-200 ${(link.name === 'Our Services' && showMobileServicesDropdown) || (link.name === 'Insurance Products' && showMobileInsuranceDropdown) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Mobile Services Dropdown */}
                    {link.name === 'Our Services' && showMobileServicesDropdown && (
                      <div className="ml-4 mt-1 space-y-1">
                        {servicesDropdownItems.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => {
                              // Close mobile menu first for smooth transition
                              setShowMobileServicesDropdown(false);
                              setShowMobileMenu(false);
                              // Navigate with smooth transition
                              setTimeout(() => {
                                navigate(item.path, { state: { selectedService: item.name } });
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }, 200);
                            }}
                            className="block w-full text-left px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Mobile Insurance Products Dropdown */}
                    {link.name === 'Insurance Products' && showMobileInsuranceDropdown && (
                      <div className="ml-4 mt-1 space-y-1">
                        {isLoadingTataAIA ? (
                          <div className="px-3 py-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                              Loading products...
                            </div>
                          </div>
                        ) : tataAIAProducts.length > 0 ? (
                          <>
                            {/* Group products by category */}
                            {(() => {
                              const groupedProducts = tataAIAProducts.reduce((acc, product) => {
                                const category = product.category || 'Other';
                                if (!acc[category]) {
                                  acc[category] = [];
                                }
                                acc[category].push(product);
                                return acc;
                              }, {});

                              return Object.entries(groupedProducts).map(([category, products]) => (
                                <div key={category} className="space-y-1">
                                  {/* Category Header */}
                                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                                    {category}
                                  </div>
                                  {/* Products in this category */}
                                  {products.map((product) => (
                                    <button
                                      key={product._id}
                                      onClick={() => {
                                        // Close mobile menu first for smooth transition
                                        setShowMobileInsuranceDropdown(false);
                                        setShowMobileMenu(false);
                                        // Navigate with smooth transition
                                        setTimeout(() => {
                                          navigate('/tata-aia-fortune-guarantee-plus', {
                                            state: {
                                              selectedProduct: product
                                            }
                                          });
                                          window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }, 200);
                                      }}
                                      className="block w-full text-left px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                    >
                                      {product.name}
                                    </button>
                                  ))}
                                </div>
                              ));
                            })()}
                          </>
                        ) : (
                          <div className="px-3 py-2 text-sm text-gray-600">
                            <div className="mb-2">No Tata AIA products available</div>
                            <button
                              onClick={() => {
                                navigate('/tata-aia-fortune-guarantee-plus', {
                                  state: {
                                    selectedProduct: {
                                      name: 'Tata AIA Insurance Products',
                                      category: 'Insurance',
                                      description: 'Comprehensive insurance solutions from Tata AIA Life Insurance Company Ltd.',
                                      features: 'Life coverage, Health protection, Investment options, Tax benefits',
                                      benefits: 'Financial security, Health protection, Wealth creation, Tax efficiency',
                                      eligibility: 'Age: 18-65 years, Indian residents',
                                      documents: 'KYC documents, Income proof, Medical reports'
                                    }
                                  }
                                });
                                setShowMobileInsuranceDropdown(false);
                                setShowMobileMenu(false);
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View all products →
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleLinkClick(link.name, link.path);
                      setShowMobileMenu(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      activeLink === link.name
                        ? 'text-blue-500 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default CGPEHeader;
