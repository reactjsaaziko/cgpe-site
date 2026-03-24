import React from 'react'

const HeaderInvest = () => {
    return (
        <div>
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <img
                                src="/assets/images/C.G3.png"
                                alt="C.G. PATEL Logo"
                                className="w-16 h-auto rounded-lg object-contain bg-white"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Download Brochure</span>
                            </button>
                            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 001.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>Talk to an Expert</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

        </div>
    )
}

export default HeaderInvest