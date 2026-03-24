import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../headers/Header';
import Footer from '../Footer';
import StartBlock from '../StartBlock';
import ContactConfirmation from '../term insurance/ContactConfirmation';

const PolicyComparison = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);

  const [selectedAddons, setSelectedAddons] = useState({
    zeroDepreciation: false,
    roadsideAssistance: false,
    engineProtection: false,
    consumables: false,
    keyLockReplacement: false,
    invoicePriceCover: false,
    tyreProtector: false,
    personalBelongings: false,
    dailyAllowance: false
  });

  const [expandedSections, setExpandedSections] = useState({
    recommendedAddons: true,
    otherAddons: true,
    sortBy: false,
    deductibles: false,
    accidentCovers: false,
    accessoriesCover: false
  });

  // Extract form data from location state or search params
  useEffect(() => {
    const extractFormData = () => {
      // First try to get data from location state
      const stateData = location.state || {};

      // Then try to get data from search params
      const paramsData = {
        car_type: searchParams.get('car_type'),
        fuel_type: searchParams.get('fuel_type'),
        model_year: searchParams.get('model_year'),
        city: searchParams.get('city'),
        coverage_type: searchParams.get('coverage_type'),
        brand: searchParams.get('brand'),
        model: searchParams.get('model'),
        variant: searchParams.get('variant'),
        car_price: searchParams.get('car_price'),
        registration: searchParams.get('registration'),
        user_name: searchParams.get('user_name'),
        mobile_number: searchParams.get('mobile_number'),
        email_id: searchParams.get('email_id')
      };

      // Combine state and params data, preferring state data
      const combinedData = {
        ...paramsData,
        ...stateData,
        // Map old field names to new ones for compatibility
        selectedBrand: stateData.selectedBrand || paramsData.brand,
        selectedModel: stateData.selectedModel || paramsData.model,
        selectedFuelType: stateData.selectedFuelType || paramsData.fuel_type,
        selectedVariant: stateData.selectedVariant || paramsData.variant,
        selectedYear: stateData.selectedYear || paramsData.model_year,
        carPrice: stateData.carPrice || paramsData.car_price,
        registration: stateData.registration || paramsData.registration,
        userDetails: stateData.userDetails || {
          fullName: paramsData.user_name,
          mobileNumber: paramsData.mobile_number,
          emailId: paramsData.email_id
        }
      };

      setFormData(combinedData);
      return combinedData;
    };

    extractFormData();
  }, [location.state, searchParams]);

  // Filter policies based on selected addons
  useEffect(() => {
    if (policies.length === 0) {
      setFilteredPolicies([]);
      return;
    }

    // Check if any addons are selected
    const hasSelectedAddons = Object.values(selectedAddons).some(addon => addon);

    if (!hasSelectedAddons) {
      // If no addons are selected, show all policies
      setFilteredPolicies(policies);
      return;
    }

    // Filter policies based on selected addons
    const filtered = policies.filter(policy => {
      // If policy has addons array, check if it includes any of the selected addons
      if (policy.addons && Array.isArray(policy.addons)) {
        const selectedAddonNames = Object.keys(selectedAddons)
          .filter(key => selectedAddons[key])
          .map(key => {
            // Map checkbox names to addon names that might appear in the policy
            const addonMapping = {
              zeroDepreciation: ['Zero Depreciation', 'Bumper-to-Bumper', 'Zero Dep'],
              roadsideAssistance: ['Roadside Assistance', '24x7 Roadside', 'RSA'],
              engineProtection: ['Engine Protection', 'Engine Cover'],
              consumables: ['Consumables', 'Consumable Cover'],
              keyLockReplacement: ['Key & Lock Replacement', 'Key Replacement'],
              invoicePriceCover: ['Invoice Price Cover', 'Invoice Cover'],
              tyreProtector: ['Tyre Protector', 'Tyre Cover'],
              personalBelongings: ['Personal Belongings', 'Belongings Cover'],
              dailyAllowance: ['Daily Allowance', 'Allowance Cover']
            };
            return addonMapping[key] || [key];
          })
          .flat();

        // Check if policy addons include any of the selected addon names
        return policy.addons.some(policyAddon =>
          selectedAddonNames.some(selectedAddon =>
            policyAddon.toLowerCase().includes(selectedAddon.toLowerCase())
          )
        );
      }

      // If policy doesn't have addons array, check other properties
      const policyText = JSON.stringify(policy).toLowerCase();
      const selectedAddonNames = Object.keys(selectedAddons)
        .filter(key => selectedAddons[key])
        .map(key => key.toLowerCase());

      return selectedAddonNames.some(addonName =>
        policyText.includes(addonName.replace(/([A-Z])/g, ' $1').toLowerCase())
      );
    });

    setFilteredPolicies(filtered);
  }, [policies, selectedAddons]);

  // Fetch car insurance policies from API based on user criteria
  useEffect(() => {
    const fetchPolicies = async () => {
      if (!formData) return;

      try {
        setLoading(true);

        // Build query parameters for the API call
        const queryParams = new URLSearchParams();

        if (formData.car_type) queryParams.append('car_type', formData.car_type);
        if (formData.fuel_type) queryParams.append('fuel_type', formData.fuel_type);
        if (formData.model_year) queryParams.append('year', formData.model_year);
        if (formData.city) queryParams.append('city', formData.city);
        if (formData.coverage_type) queryParams.append('coverage', formData.coverage_type);
        if (formData.brand) queryParams.append('brand', formData.brand);
        if (formData.model) queryParams.append('model', formData.model);
        if (formData.variant) queryParams.append('variant', formData.variant);
        if (formData.car_price) queryParams.append('car_price', formData.car_price);
        if (formData.registration) queryParams.append('registration', formData.registration);

        // Make API call with query parameters
        const apiUrl = `/api/car-insurance?${queryParams.toString()}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (result.success) {
          setPolicies(result.data);
        } else {
          console.warn('API not available, using fallback data');
          // Fallback to existing filtered policies API if the new API fails
          const fallbackResponse = await fetch('/api/car-insurance/filtered-policies', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              selectedBrand: formData.selectedBrand,
              selectedModel: formData.selectedModel,
              selectedFuelType: formData.selectedFuelType,
              selectedVariant: formData.selectedVariant,
              selectedYear: formData.selectedYear,
              carPrice: formData.carPrice,
              userDetails: formData.userDetails
            })
          });
          const fallbackResult = await fallbackResponse.json();

          if (fallbackResult.success) {
            setPolicies(fallbackResult.data);
          } else {
            setError(fallbackResult.message || 'Failed to fetch car insurance policies');
          }
        }
      } catch (error) {
        console.error('Error fetching policies:', error);
        setError('Failed to fetch car insurance policies');
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [formData]);

  const handleAddonChange = (addon) => {
    setSelectedAddons(prev => ({
      ...prev,
      [addon]: !prev[addon]
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePolicySelect = (policy) => {
    // Get all car details from formData
    const carDetails = formData || {};

    navigate('/policy-summary', {
      state: {
        policy: {
          company: policy.companyName,
          planType: '1+3 Long Term',
          idvCover: policy.idvCover,
          premiumAmount: policy.premiumAmount,
          gst: '₹2,495',
          totalAmount: `₹${policy.premiumAmount}`,
          claimsSettled: policy.claimsSettled,
          features: `${policy.cashlessGarages} Cashless Garages`,
          claims: policy.claimType,
          addons: policy.addons || [],
          payAsYouConsume: policy.payAsYouConsume
        },
        carDetails: {
          selectedBrand: carDetails.selectedBrand || carDetails.brand || 'HYUNDAI',
          selectedModel: carDetails.selectedModel || carDetails.model || 'VERNA',
          selectedFuelType: carDetails.selectedFuelType || carDetails.fuel_type || 'Diesel',
          selectedVariant: carDetails.selectedVariant || carDetails.variant || '1.5 CRDi VGT (1493cc)',
          selectedYear: carDetails.selectedYear || carDetails.model_year || '2023',
          registration: carDetails.registration || 'GJ05',
          carPrice: carDetails.carPrice || carDetails.car_price || '₹26,60,000',
          userDetails: carDetails.userDetails || {}
        },
        selectedAddons
      }
    });
  };

  // Get the policies to display (filtered or all)
  const displayPolicies = filteredPolicies.length > 0 ? filteredPolicies : policies;

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center w-full my-6">
          <input
            type="text"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-base bg-gray-50 focus:ring-2 focus:ring-blue-200"
            defaultValue="Suggest Best Policy"
            readOnly
          />
          <button className="ml-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 hover:bg-blue-100 transition">
            <img
              src="/assets/images/assistant1.png"
              alt="Assistant"
              className="w-6 h-6 object-contain"
            />
          </button>
        </div>
        <ContactConfirmation />
        <div className="flex gap-6">
          {/* Left Sidebar - Car Details & Filters */}
          <div className="w-80 flex-shrink-0">
            <div className="rounded-lg shadow-sm">
              {/* Car Information */}
              <div className='bg-white rounded-lg shadow-sm p-6 border '>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {formData?.selectedBrand || formData?.brand || 'HYUNDAI'} {formData?.selectedModel || formData?.model || 'VERNA'}
                    </h3>
                    <button className="text-blue-600 text-sm hover:underline font-medium">Edit Car</button>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formData?.registration || 'GJ05'} | {formData?.selectedYear || formData?.model_year || '2023'} | {formData?.selectedFuelType || formData?.fuel_type || 'Diesel'}
                  </p>
                </div>

                {/* User Details */}
                {formData?.userDetails && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 text-sm mb-2">User Details</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div>Name: {formData.userDetails.fullName}</div>
                      <div>Mobile: {formData.userDetails.mobileNumber}</div>
                      <div>Email: {formData.userDetails.emailId}</div>
                    </div>
                  </div>
                )}

                {/* Policy Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">IDV Cover (Insured Value)</span>
                    <span className="text-sm font-medium">{formData?.carPrice || formData?.car_price || '₹26,60,000'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">No Claim Bonus (NCB)</span>
                    <span className="text-sm font-medium">0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Expected Delivery Date</span>
                    <span className="text-sm text-blue-600 cursor-pointer">Select Date</span>
                  </div>
                </div>

              </div>
              {/* Sort & Filter */}
              <div className="border-t pt-6 bg-white rounded-lg shadow-sm p-6 border mt-6">
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Sort & Filter</h3>
                </div>

                {/* Filter Status */}
                {Object.values(selectedAddons).some(addon => addon) && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">Active Filters:</span>
                      <button
                        onClick={() => setSelectedAddons({
                          zeroDepreciation: false,
                          roadsideAssistance: false,
                          engineProtection: false,
                          consumables: false,
                          keyLockReplacement: false,
                          invoicePriceCover: false,
                          tyreProtector: false,
                          personalBelongings: false,
                          dailyAllowance: false
                        })}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(selectedAddons)
                        .filter(([_, isSelected]) => isSelected)
                        .map(([addon, _]) => (
                          <span key={addon} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {addon.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                        ))}
                    </div>
                    <div className="text-xs text-blue-700 mt-2">
                      Showing {filteredPolicies.length} of {policies.length} policies
                    </div>
                  </div>
                )}

                {/* Recommended Addons */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection('recommendedAddons')}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                  >
                    Recommended Addons
                    <svg className={`w-4 h-4 transition-transform ${expandedSections.recommendedAddons ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedSections.recommendedAddons && (
                    <div className="space-y-3">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          checked={selectedAddons.zeroDepreciation}
                          onChange={() => handleAddonChange('zeroDepreciation')}
                          className="mr-3 mt-0.5"
                        />
                        <div>
                          <span className="text-sm text-gray-900">Zero Depreciation</span>
                          <div className="text-xs text-gray-500">Also called 'Bumper-to-Bumper' cover</div>
                        </div>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAddons.roadsideAssistance}
                          onChange={() => handleAddonChange('roadsideAssistance')}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-900">24x7 Roadside Assistance</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAddons.engineProtection}
                          onChange={() => handleAddonChange('engineProtection')}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-900">Engine Protection Cover</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAddons.consumables}
                          onChange={() => handleAddonChange('consumables')}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-900">Consumables</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Other Addons */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection('otherAddons')}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                  >
                    Other Addons
                    <svg className={`w-4 h-4 transition-transform ${expandedSections.otherAddons ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedSections.otherAddons && (
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAddons.keyLockReplacement}
                          onChange={() => handleAddonChange('keyLockReplacement')}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-900">Key & Lock Replacement</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAddons.invoicePriceCover}
                          onChange={() => handleAddonChange('invoicePriceCover')}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-900">Invoice Price Cover</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAddons.tyreProtector}
                          onChange={() => handleAddonChange('tyreProtector')}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-900">Tyre Protector</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAddons.personalBelongings}
                          onChange={() => handleAddonChange('personalBelongings')}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-900">Loss of Personal Belongings</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAddons.dailyAllowance}
                          onChange={() => handleAddonChange('dailyAllowance')}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-900">Daily Allowance</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Other Collapsible Sections */}
                {['sortBy', 'deductibles', 'accidentCovers', 'accessoriesCover'].map((section) => (
                  <div key={section} className="mb-2">
                    <button
                      onClick={() => toggleSection(section)}
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 py-2"
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
                      <svg className={`w-4 h-4 transition-transform ${expandedSections[section] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Policy Listings */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {formData?.userDetails ?
                  `Hi ${formData.userDetails.fullName}, here are the best policies for your ${formData.selectedBrand || formData.brand} ${formData.selectedModel || formData.model}` :
                  'You can also explore 16 other plans'
                }
              </h2>
              <p className="text-sm text-gray-600">
                {formData?.userDetails ?
                  'Policies matched to your car details and preferences' :
                  'Best plans outside of your preferences'
                }
              </p>
            </div>

            <div className="space-y-4">
              <StartBlock />
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              ) : displayPolicies.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-500">
                    {Object.values(selectedAddons).some(addon => addon)
                      ? 'No policies match your selected addons. Try adjusting your filters.'
                      : 'No car insurance policies available'
                    }
                  </div>
                  {Object.values(selectedAddons).some(addon => addon) && (
                    <button
                      onClick={() => setSelectedAddons({
                        zeroDepreciation: false,
                        roadsideAssistance: false,
                        engineProtection: false,
                        consumables: false,
                        keyLockReplacement: false,
                        invoicePriceCover: false,
                        tyreProtector: false,
                        personalBelongings: false,
                        dailyAllowance: false
                      })}
                      className="mt-4 text-blue-600 hover:underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                displayPolicies.map((policy) => (
                  <div key={policy._id} className="bg-white rounded-lg shadow-sm border pt-6 pl-6 pr-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePolicySelect(policy)}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Company Info */}
                        <div className="flex items-center mb-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg mr-4 flex items-center justify-center border">
                            <span className="text-sm font-semibold text-gray-700">{policy.companyName.split(' ')[0]}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                              <span className='px-10'>IDV Cover: <br />{policy.idvCover}</span>
                              <span className='px-10'>Claims Settled: <br />{policy.claimsSettled}</span>
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {policy.claimType && (
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                              {policy.claimType}
                            </span>
                          )}
                        </div>

                        {/* Addons */}
                        {policy.addons && policy.addons.length > 0 && (
                          <div className="mb-3">
                            {policy.addons.map((addon, index) => (
                              <div key={index} className="text-sm text-green-600 mb-1 flex items-center">
                                <span className="mr-1">✓</span>
                                {addon}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Pay As You Consume */}
                        {policy.payAsYouConsume && (
                          <div className="mb-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm text-yellow-800 mb-3 font-medium">
                              Pay As You Consume! Choose annual driving limit. Save more on premium.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {['3,000 km/yr', '5,000 km/yr', '7,500 km/yr'].map((option) => (
                                <span key={option} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full border border-yellow-300">
                                  {option}
                                </span>
                              ))}
                              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full border border-yellow-300">
                                +4 more
                              </span>
                            </div>
                            <a href="#" className="text-xs text-yellow-800 underline hover:no-underline">know more</a>
                          </div>
                        )}

                        {/* View Coverage Link */}
                        <div className="flex justify-end w-full">
                          {policy.cashlessGarages > 0 && (
                            <span className="px-3 py-1 text-blue-700 text-sm mb-1">
                              {policy.cashlessGarages} Cashless Garages
                            </span>
                          )}
                          <a href="#" className="text-blue-700 mt-1 text-sm hover:underline font-medium ml-4">View Coverage</a>
                        </div>
                      </div>

                      {/* Premium Section */}
                      <div className="text-right ml-6 flex flex-col items-end">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center">
                          ₹{policy.premiumAmount}
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PolicyComparison; 