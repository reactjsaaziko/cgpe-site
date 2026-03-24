import React from 'react';
import WhatsAppQRCode from './WhatsAppQRCode';

const WhiteCoatWealthQR = ({ 
  size = 300,
  className = "",
  showTextInput = false // Hide text input for this specific use case
}) => {
  const consultationMessage = "Hello CGPE, I scanned the QR at White Coat Wealth Circle.\n\nRequesting a 15-minute tea consultation—please confirm available slots here.";
  
  const consultationTextLines = [];

  return (
    <div className={`white-coat-wealth-qr ${className}`}>
      <WhatsAppQRCode
        phoneNumber="+919662011021"
        message={consultationMessage}
        size={size}
        textLines={consultationTextLines}
        showTextInput={showTextInput}
        className="w-full"
      />
    </div>
  );
};

export default WhiteCoatWealthQR;
