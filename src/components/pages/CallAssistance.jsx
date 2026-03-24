import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/environment';
import Headerlogin from '../headers/Headerlogin';

const CallAssistance = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
      // Submit to call assistance API
      const callAssistanceResponse = await fetch(`${API_BASE_URL}/api/call-assistance/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          contactNumber: formData.contactNumber,
          description: formData.description || 'User requested call assistance',
          source: 'website'
        })
      });

      const callAssistanceData = await callAssistanceResponse.json();
      
      if (callAssistanceData.success) {
        // Also create an inquiry record for tracking
        try {
          await fetch(`${API_BASE_URL}/api/inquiries/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              phone: formData.contactNumber,
              subject: 'Call Assistance Request',
              message: formData.description || 'User requested call assistance',
              inquiryType: 'insurance',
              source: 'website',
              productName: 'Call Assistance',
              productCategory: 'Customer Support'
            })
          });
        } catch (inquiryError) {
          console.error('Error creating inquiry record:', inquiryError);
          // Don't fail the entire request if inquiry creation fails
        }
        
        setSuccess(true);
        setFormData({
          name: '',
          contactNumber: '',
          description: ''
        });
      } else {
        throw new Error(callAssistanceData.message || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting call assistance request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success Popup Component
  const SuccessPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Call Request Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your call assistance request. We will contact you soon to help with your insurance needs.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/insurance')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium w-full"
            >
              Go to Insurance
            </button>
            <button
              onClick={() => setSuccess(false)}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium w-full"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Headerlogin />

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-10 lg:py-16">
        <div className="text-center">
          <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-snug sm:text-4xl">
            <span className="text-primary">Call Us</span> - We're Here to Help
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Get expert assistance over the phone. Our team is ready to help you with all your insurance needs.
          </p>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_500px]">
          {/* Left side - Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Call Us?</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Expert guidance for all insurance products
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Personalized policy recommendations
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Quick quote and comparison assistance
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Policy renewal and modification support
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  24/7 customer support availability
                </li>
              </ul>
            </div>

            {/* Call Process Information */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">How Our Call Service Works</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Submit Your Request</h4>
                    <p className="text-sm text-gray-600">Fill out the form with your basic details and what you need help with</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Expert Call Back</h4>
                    <p className="text-sm text-gray-600">Our insurance experts will call you at your preferred time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Personalized Assistance</h4>
                    <p className="text-sm text-gray-600">Get personalized guidance and recommendations for your needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Follow-up Support</h4>
                    <p className="text-sm text-gray-600">We'll provide ongoing support until your needs are met</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Direct Contact Information</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Main Helpline:</strong> +91 96620 11021</p>
                <p><strong>Email:</strong> support@aaziko.com</p>
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
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Request a Call Back</h2>
                <p className="text-sm text-gray-500">Fill out the form below and we'll call you back</p>
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
                    placeholder="Tell us what you need help with or any questions you have..."
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
                {loading ? 'Submitting...' : 'Request Call Back'}
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
      {success && <SuccessPopup />}
    </div>
  );
};

export default CallAssistance;
