import React, { useState } from 'react';

const StartBlock = () => {
  // const [formData, setFormData] = useState({
  //   name: 'smit',
  //   phone: '78xxxxx991',
  //   country: 'India',
  //   countryCode: '+91',
  //   noSpam: true,
  //   whatsappUpdates: false
  // });

  // const handleInputChange = (field, value) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     [field]: value
  //   }));
  // };

  //   const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  //   // Add your form submission logic here
  // };

  return (
    <></>
    // <div className="max-h-screen bg-gradient-to-br from-white to-green-50 mb-5">
    //   <div className="container mx-auto px-4 py-8">
    //     <div className="grid lg:grid-cols-2 gap-8 items-center">
          
    //       {/* Left Section - Content and Image */}
    //       <div className="space-y-6">
    //         {/* Main Heading */}
    //         <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 leading-tight">
    //           Best Investment Plans in 2025
    //         </h1>
            
    //         {/* Description */}
    //         <p className="text-lg text-gray-700 leading-relaxed">
    //           Invest wisely for your child's education and retirement planning. 
    //           Secure your future with our comprehensive investment solutions. 
    //           <a href="#" className="text-blue-600 hover:text-blue-800 ml-2 font-medium">
    //             Read more
    //           </a>
    //         </p>

    //         {/* Main Image and Benefits */}
    //         <div className="flex flex-col lg:flex-row gap-6 items-start">
    //           {/* Person Image */}
    //           {/* <div className="flex-shrink-0">
    //             <div className="w-64 h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
    //               <div className="text-center">
    //                 <div className="w-32 h-32 bg-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center">
    //                   <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
    //                     <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    //                   </svg>
    //                 </div>
    //                 <p className="text-sm text-blue-700">Professional Advisor</p>
    //               </div>
    //             </div>
    //           </div> */}

    //           {/* Benefits List */}
    //           <div className="space-y-4 flex-1">
    //             <div className="flex items-start gap-3">
    //               <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
    //                 <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
    //                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    //                 </svg>
    //               </div>
    //               <div>
    //                 <h3 className="font-semibold text-gray-900">Generate wealth with high returns</h3>
    //                 <p className="text-sm text-gray-600">Earn 1 Cr in maturity with Zero LTCG tax^</p>
    //               </div>
    //             </div>

    //             <div className="flex items-start gap-3">
    //               <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
    //                 <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
    //                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    //                 </svg>
    //               </div>
    //               <div>
    //                 <h3 className="font-semibold text-gray-900">Double tax savings^</h3>
    //                 <p className="text-sm text-gray-600">On premiums (under 80C) and on maturity (under 10(10D))</p>
    //               </div>
    //             </div>

    //             <div className="flex items-start gap-3">
    //               <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
    //                 <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
    //                   <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    //                 </svg>
    //               </div>
    //               <div>
    //                 <h3 className="font-semibold text-gray-900">Compare & choose the best</h3>
    //                 <p className="text-sm text-gray-600">30+ Plans and 150+ Fund options~</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Statistics */}
    //         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
    //           <div className="text-center">
    //             <div className="flex items-center justify-center gap-1 mb-1">
    //               {[...Array(5)].map((_, i) => (
    //                 <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
    //                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    //                 </svg>
    //               ))}
    //             </div>
    //             <p className="text-sm font-semibold text-gray-900">4.8++ Rated</p>
    //           </div>
              
    //           <div className="text-center">
    //             <p className="text-lg font-bold text-blue-600">10.5 Crore</p>
    //             <p className="text-sm text-gray-600">Registered Consumer</p>
    //           </div>
              
    //           <div className="text-center">
    //             <p className="text-lg font-bold text-blue-600">51</p>
    //             <p className="text-sm text-gray-600">Insurance Partners</p>
    //           </div>
              
    //           <div className="text-center">
    //             <p className="text-lg font-bold text-blue-600">5.3 Crore</p>
    //             <p className="text-sm text-gray-600">Policies Sold</p>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Right Section - Form */}
    //       <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:p-8">
    //         <div className="border-b-2 border-blue-500 pb-4 mb-6">
    //           <h2 className="text-2xl font-bold text-gray-900">Top Performing~</h2>
    //           <p className="text-gray-600">Investment Plans With High Returns**</p>
    //         </div>

    //         <div className="mb-6">
    //           <p className="text-xl font-bold text-blue-600 text-center">
    //             Invest ₹10k/Month & Get ₹1 Crore# Tax-Free*
    //           </p>
    //         </div>

    //         <form onSubmit={handleSubmit} className="space-y-4">
    //           {/* Name Input */}
    //           <div>
    //             <input
    //               type="text"
    //               onChange={(e) => handleInputChange('name', e.target.value)}
    //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //               placeholder="Enter your name"
    //             />
    //           </div>

    //           {/* Phone Input */}
    //           <div className="flex gap-2">
    //             <select
    //               value={formData.country}
    //               onChange={(e) => handleInputChange('country', e.target.value)}
    //               className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //             >
    //               <option value="India">India</option>
    //               <option value="USA">USA</option>
    //               <option value="UK">UK</option>
    //             </select>
                
    //             <select
    //               value={formData.countryCode}
    //               onChange={(e) => handleInputChange('countryCode', e.target.value)}
    //               className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //             >
    //               <option value="+91">+91</option>
    //               <option value="+1">+1</option>
    //               <option value="+44">+44</option>
    //             </select>
                
    //             <input
    //               type="tel"
    //               onChange={(e) => handleInputChange('phone', e.target.value)}
    //               className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //               placeholder="Enter Phone number"
    //             />
    //           </div>

    //           {/* No Spam Checkbox */}
    //           <div className="flex items-center gap-2">
    //             <input
    //               type="checkbox"
    //               id="noSpam"
    //               checked={formData.noSpam}
    //               onChange={(e) => handleInputChange('noSpam', e.target.checked)}
    //               className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    //             />
    //             <label htmlFor="noSpam" className="text-sm text-gray-700">
    //               ✔ We don't spam
    //             </label>
    //           </div>

    //           {/* Submit Button */}
    //           <button
    //             type="submit"
    //             className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
    //           >
    //             View Plans
    //           </button>
    //         </form>

    //         {/* Disclaimers and Options */}
    //         <div className="mt-6 space-y-4">
    //           <div className="flex items-center gap-2 text-sm text-gray-600">
    //             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    //               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    //             </svg>
    //             Your personal information is secure with us
    //           </div>

    //           <p className="text-xs text-gray-500">
    //             By clicking on "View Plans" you agree to our{' '}
    //             <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{' '}
    //             <a href="#" className="text-blue-600 hover:underline">Terms of use</a>
    //           </p>

    //           <p className="text-xs text-gray-500">
    //             Tax benefit is subject to changes in tax laws
    //           </p>

    //           {/* WhatsApp Updates */}
    //           <div className="flex items-center justify-between">
    //             <div className="flex items-center gap-2">
    //               <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
    //                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
    //               </svg>
    //               <span className="text-sm text-gray-700">Get Updates on WhatsApp</span>
    //             </div>
    //             <label className="relative inline-flex items-center cursor-pointer">
    //               <input
    //                 type="checkbox"
    //                 checked={formData.whatsappUpdates}
    //                 onChange={(e) => handleInputChange('whatsappUpdates', e.target.checked)}
    //                 className="sr-only peer"
    //               />
    //               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    //             </label>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default StartBlock; 