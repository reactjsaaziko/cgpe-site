import React from "react";
import { useNavigate } from "react-router-dom";

const paymentLogos = [
  { alt: "Paytm", src: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Paytm_logo.jpg" },
  { alt: "American Express", src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg  " },
  { alt: "Visa", src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" },
  { alt: "RuPay", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/2560px-RuPay.svg.png" },
  { alt: "Mastercard", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png" },
];
const securedLogo = "https://simplypayme.com/wp-content/uploads/elementor/thumbs/PCI_Compliant_Logo_Social_1024x512-B-p2dnc8ec3t3tvp1m7rc3t4oyo79xgevi1abcbwenw0.png"; // Replace with your secured logo

const social = [
  // {
  //   alt: "Facebook",
  //   url: "https://facebook.com/",
  //   svg: (
  //     <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
  //       <path d="M22 12.073C22 6.505 17.523 2 12 2S2 6.505 2 12.073C2 17.098 5.656 21.124 10.438 21.876v-6.248H7.898V12.07h2.54v-1.563c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.261c-1.243 0-1.631.771-1.631 1.562V12.07h2.773l-.443 3.558h-2.33v6.248C18.344 21.124 22 17.098 22 12.073z" />
  //     </svg>
  //   ),
  // },
  {
    alt: "YouTube",
    url: "https://www.youtube.com/@cgpenterprise",
    svg: (
      <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M23.498 6.186a2.983 2.983 0 0 0-2.095-2.116C19.45 3.5 12 3.5 12 3.5s-7.45 0-9.403.57A2.983 2.983 0 0 0 .502 6.186C0 8.17 0 12 0 12s0 3.83.502 5.814a2.983 2.983 0 0 0 2.095 2.116C4.55 20.5 12 20.5 12 20.5s7.45 0 9.403-.57a2.983 2.983 0 0 0 2.095-2.116C24 15.83 24 12 24 12s0-3.83-.502-5.814zM9.546 15.568V8.432L15.818 12l-6.272 3.568z"/>
      </svg>
    ),
  },
  {
    alt: "LinkedIn",
    url: "https://www.linkedin.com/in/cg-patel-715a732b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    svg: (
      <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 20h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.8-1.75-1.732 0-.934.784-1.732 1.75-1.732s1.75.798 1.75 1.732c0 .932-.784 1.732-1.75 1.732zm15 11.268h-3v-5.604c0-1.336-.026-3.062-1.866-3.062-1.87 0-2.156 1.459-2.156 2.967v5.699h-3v-10h2.882v1.367h.041c.402-.761 1.384-1.562 2.847-1.562 3.045 0 3.607 2.005 3.607 4.612v5.583z"/>
      </svg>
    ),
  },
  {
    alt: "Instagram",
    url: "https://www.instagram.com/cgpenterprise/?hl=en",
    svg: (
      <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/>
      </svg>
    ),
  },
  {
    alt: "Facebook",
    url: "https://www.facebook.com/share/1XmbeLVEFc/",
    svg: (
      <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M22 12.073C22 6.505 17.523 2 12 2S2 6.505 2 12.073C2 17.098 5.656 21.124 10.438 21.876v-6.248H7.898V12.07h2.54v-1.563c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.261c-1.243 0-1.631.771-1.631 1.562V12.07h2.773l-.443 3.558h-2.33v6.248C18.344 21.124 22 17.098 22 12.073z" />
      </svg>
    ),
  },
  // {
  //   alt: "Twitter",
  //   url: "https://www.linkedin.com/in/cg-patel-715a732b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  //   svg: (
  //     <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
  //       <path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.965-2.475 8.94 8.94 0 0 1-2.828 1.082 4.48 4.48 0 0 0-7.635 4.085A12.72 12.72 0 0 1 3.112 4.89a4.48 4.48 0 0 0 1.387 5.976 4.44 4.44 0 0 1-2.03-.561v.057a4.48 4.48 0 0 0 3.593 4.393 4.48 4.48 0 0 1-2.025.077 4.48 4.48 0 0 0 4.184 3.11A8.98 8.98 0 0 1 2 19.54a12.67 12.67 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.22 9.22 0 0 0 24 4.59a8.93 8.93 0 0 1-2.54.698z"/>
  //     </svg>
  //   ),
  // },
];

export default function Footer() {
  const navigate = useNavigate();
  const [showOtherInsurance, setShowOtherInsurance] = React.useState(false);

  const handleFooterClick = (route) => {
    navigate(route);
  };

  const handleOtherInsuranceClick = () => {
    setShowOtherInsurance(!showOtherInsurance);
  };

  const otherInsuranceOptions = [
    { name: "Family Health Insurance", route: "/familyhealth-register" },
    { name: "Free Term Plan", route: "/free-term-plan" },
    { name: "Guaranteed Returns", route: "/guaranteed-returns-plan" },
    { name: "Child Saving Insurance", route: "/child-saving-insurance" },
    { name: "Retirement Insurance", route: "/retirement-insurance" },
    { name: "Term Insurance Women", route: "/women-insurance" },
    { name: "Group Health Insurance", route: "/group-health-insurance" },
    { name: "Travel Insurance", route: "/travelinsurance" },
    { name: "Mutual Funds & SIP", route: "/mutual-funds-sip" }
  ];

  return (
    <footer className="text-black pb-0 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-0 flex flex-col md:flex-row md:justify-between gap-10 pb-8">
        {/* Logo and columns */}
        <div className="flex flex-col items-center md:items-start md:w-1/4">
          <img
            src="./assets/images/C.G3.png" // Replace with your actual logo path
            alt="C.G. Patel House of Insurance"
            className="w-[200px] mb-3 rounded-bl-3xl w-full  bg-white p-8"
          />
        </div>
        <div className="flex justify-between grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Insurance */}
          <div className="p-9">
            <div className="font-bold mb-7">Insurance</div>
            <ul className="space-y-2 text-sm">
              {/* <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/motor-renewal')}>General Insurance</li> */}
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/tata-aia-fortune-guarantee-plus')}>Life Insurance</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/tata-aia-fortune-guarantee-plus')}>Investment</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/tata-aia-fortune-guarantee-plus')}>Health Insurance</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={handleOtherInsuranceClick}>
                Other Insurance
                <span className="ml-1 transition-transform duration-200" style={{ transform: showOtherInsurance ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                  ▶
                </span>
              </li>
              {showOtherInsurance && (
                <div className="ml-4 mt-2 space-y-1">
                  {otherInsuranceOptions.map((option, index) => (
                    <li 
                      key={index} 
                      className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400 text-xs"
                      onClick={() => handleFooterClick('/tata-aia-fortune-guarantee-plus')}
                    >
                      {option.name}
                    </li>
                  ))}
                </div>
              )}
            </ul>
          </div>
          {/* Resources */}
          <div className="p-9">
            <div className="font-bold mb-7">Resources</div>
            <ul className="space-y-2 text-sm">
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/insurance')}>Articles</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/insurance')}>Customer reviews</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/insurance')}>Insurance companies</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/insurance')}>Newsroom</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/insurance')}>Our investor</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/insurance')}>Awards</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/insurance')}>PB Life</li>
            </ul>
          </div>
          {/* Company */}
          <div className="p-9">
            <div className="font-bold mb-7">Company</div>
            <ul className="space-y-2 text-sm">
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/about')}>About Us</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/sitemap')}>Sitemap</li>
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/careers')}>Careers</li>
              {/* <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/insurance')}>Legal & Admin policies</li> */}
              {/* <li  className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/insurance')}>ISPN</li> */}
              <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/contact')}>Contact us</li>
              {/* <li className="py-1 hover:cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => handleFooterClick('/insurance')}>Verify your advisor</li> */}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}   
      <div className="border-t border-gray-700 mt-1 pt-5 pb-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-5">
          {/* Payments, Secured, Social */}
          {/* <div className="flex flex-col items-center md:items-start">
            <span className="font-bold mb-2 text-sm">Payment Methods</span>
            <div className="flex gap-2 flex-wrap">
              {paymentLogos.map(({ alt, src }) => (
                <img
                  key={alt}
                  src={src}
                  alt={alt}
                  className="h-7 bg-white rounded-md px-2 py-1 object-contain border border-gray-300 w-15"
                />
              ))}
            </div> 
          </div> */}
          {/* <div className="flex flex-col items-center md:items-start">
            <span className="font-bold mb-2 text-sm">Secured With</span>
            <div className="flex gap-2 flex-wrap">
              <img src={securedLogo} alt="Secured" className="h-7 bg-white rounded-md px-2 py-1 object-contain border border-gray-300" />
            </div>
          </div> */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-bold mb-2 text-sm">Follow us on</span>
            <div className="flex gap-2">
              {social.map((item) => (
                <a
                  key={item.alt}
                  href={item.url}
                  className="bg-white text-[#181818] rounded-md p-2 flex items-center justify-center transition hover:bg-blue-100"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.alt}
                >
                  {item.svg}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 text-sm mt-5 pb-2">
          © Copyright 2023 Cg patel. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
