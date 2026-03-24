import React from 'react';

export default function ContactConfirmation({ formData, onClose }) {
    // No auto-close logic, user must close manually

    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex items-start gap-4">
                {/* Success Icon */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold text-gray-800">Submission Successful!</h2>
                        <button
                            onClick={() => {
                                setIsVisible(false);
                                if (onClose) onClose();
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                        Thank you for submitting your details. Our insurance experts will review your requirements and contact you within 24 hours with personalized policy recommendations.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* User Details */}
                        {formData && (
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Your Details
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span className="text-gray-500">Name:</span>
                                        <span className="font-medium text-gray-700 ml-1">{formData.name || 'Not provided'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Phone:</span>
                                        <span className="font-medium text-gray-700 ml-1">{formData.phone || 'Not provided'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Email:</span>
                                        <span className="font-medium text-gray-700 ml-1">{formData.email || 'Not provided'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Age:</span>
                                        <span className="font-medium text-gray-700 ml-1">{formData.dateOfBirth ? `${new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear()} years` : 'Not provided'}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Next Steps */}
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                            <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                What's Next?
                            </h4>
                            <ul className="text-xs text-blue-700 space-y-2">
                                <li className="flex items-start">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                    <span>Our team will analyze your requirements</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                    <span>Compare policies from top insurance companies</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                    <span>Contact you with personalized recommendations</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Need immediate assistance?</span>
                            <a href="tel:+91-1800-123-4567" className="flex items-center text-blue-600 hover:text-blue-700">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                96620 11021
                            </a>
                            <span className="text-gray-300">|</span>
                            <a href="mailto:support@cgpe.com" className="flex items-center text-blue-600 hover:text-blue-700">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                support@cgpe.com
                            </a>
                        </div>
                    </div>

                    {/* No auto-close countdown, user must close manually */}
                </div>
            </div>
        </div>
    );
}
