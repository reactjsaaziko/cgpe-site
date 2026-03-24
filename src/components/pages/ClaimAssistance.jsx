import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headerlogin from '../headers/Headerlogin';

const ClaimAssistance = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.contactNumber) {
      alert('Please fill in your name and contact number.');
      return;
    }
    setLoading(true);
    
    
    try {
      // Submit to inquiry API
      await fetch('/api/inquiries/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.contactNumber,
          subject: 'Claim Assistance Request',
          message: formData.description || 'User requested claim assistance',
          inquiryType: 'insurance',
          source: 'website',
          productName: 'Claim Assistance',
          productCategory: 'Claims Support'
        })
      });
      
      alert('Thank you for your claim assistance request. We will contact you soon.');
      navigate('/insurance');
    } catch (error) {
      console.error('Error submitting claim assistance request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Headerlogin />
      
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-10 lg:py-16">
        <div className="text-center">
          <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-snug sm:text-4xl">
            <span className="text-primary">Claim Assistance</span> - We're Here to Help
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Get expert assistance with your insurance claims. Our team will guide you through the entire process.
          </p>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_500px]">
          {/* Left side - Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Our Claim Assistance?</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Expert guidance through the entire claim process
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Fast and efficient claim processing
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Documentation assistance and verification
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Regular updates on claim status
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Support for all types of insurance claims
                </li>
              </ul>
            </div>

            {/* Claim Process Information */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Claim Process Overview</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Submit Your Request</h4>
                    <p className="text-sm text-gray-600">Fill out the form with your basic details and claim information</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Expert Review</h4>
                    <p className="text-sm text-gray-600">Our experts will review your claim details and contact you</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Process Initiation</h4>
                    <p className="text-sm text-gray-600">We'll initiate the claim process with the insurance company</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Regular Updates</h4>
                    <p className="text-sm text-gray-600">You'll receive regular updates on your claim status</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Immediate Help?</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Emergency Claims:</strong> +91 96620 11021</p>
                <p><strong>Email:</strong> claims@aaziko.com</p>
                <p><strong>Business Hours:</strong> Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p><strong>Emergency Support:</strong> Available 24/7</p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="text-center">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-5 md:p-7 rounded-2xl shadow-lg w-full border border-slate-100"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Claim Assistance Request</h2>
                <p className="text-sm text-gray-500">Fill out the form below and we'll assist you with your claim</p>
              </div>

              <div className="space-y-5">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 md:p-3 border rounded-lg text-base md:text-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors border-gray-300 focus:border-primary"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="contactNumber"
                    placeholder="Contact Number *"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 md:p-3 border rounded-lg text-base md:text-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors border-gray-300 focus:border-primary"
                  />
                </div>

                <div>
                  <textarea
                    name="description"
                    placeholder="Tell us about your claim situation or any questions you have..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-2 md:p-3 border rounded-lg text-base md:text-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors border-gray-300 focus:border-primary resize-none"
                  />
                </div>
              </div>

              {/* Call to Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full p-2 md:p-3 bg-primary text-white border-none rounded-lg text-base md:text-lg font-bold hover:bg-primaryDark transition-colors text-xl mt-6 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Claim Assistance Request'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/insurance')}
                className="w-full p-2 md:p-3 bg-gray-200 text-gray-800 border-none rounded-lg text-base md:text-lg font-medium hover:bg-gray-300 transition-colors mt-3"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClaimAssistance;
