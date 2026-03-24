import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/Asset.svg"
import logoheader from "../assets/HEADER2.svg"

const Headerlogin = () => {
  const navigate = useNavigate();

  const handleClaimAssistanceClick = () => {
    navigate('/claim-assistance');
  };

  const handleCallUsClick = () => {
    navigate('/call-assistance');
  };

  return (
    <header className="w-full max-w-[1900px] mx-auto flex flex-col md:flex-row justify-between items-center px-5 md:px-10 py-5 bg-white gap-5 md:gap-0">
      <div className="flex items-center gap-4">
        {/* <div className="w-12 h-12 bg-gradient-to-br from-primary to-primaryDark rounded-full flex items-center justify-center relative">
          <div className="w-5 h-5 bg-accent rounded-full relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-accent"></div>
          </div>
        </div> */}
        {/* <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 m-0">C.G. PATEL</h1>
          <p className="text-xs md:text-sm text-gray-600 m-0">HOUSE OF INSURANCE</p>
        </div> */}
        <img src="/assets/images/C.G3.png" alt="logo" className="h-[140px] w-auto" />
      </div>
      
      <nav className="flex gap-5 md:gap-8 items-center relative bottom-[50px]">
        <button 
          onClick={handleClaimAssistanceClick}
          className="flex items-center gap-2 text-gray-800 font-medium hover:text-primary transition-colors text-sm md:text-base cursor-pointer"
        >
          {/* <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-white">₹</div> */}
          <img src={logo} alt="Claim Assistance Icon" className="w-5 h-5" />
          Claim Assistance
        </button>
        <button 
          onClick={handleCallUsClick}
          className="flex items-center gap-2 text-gray-800 font-medium hover:text-primary transition-colors text-sm md:text-base cursor-pointer"
        >
          {/* <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-white">📞</div> */}
          <img src={logoheader} alt="Call Us Icon" className="w-5 h-5" />
          Call Us
        </button>
      </nav>
    </header> 
  );
};

export default Headerlogin; 