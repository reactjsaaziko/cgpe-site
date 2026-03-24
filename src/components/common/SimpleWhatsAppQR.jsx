import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  downloadWhatsAppQRHD, 
  downloadQRWithText, 
  downloadQRWithTextPDF 
} from '../../utils/whatsappQRUtils';

const SimpleWhatsAppQR = ({ 
  phoneNumber = "+919662011021",
  message = "Hello CGPE, I scanned the QR at White Coat Wealth Circle.\n\nRequesting a 15-minute tea consultation—please confirm available slots here.",
  size = 200,
  showMessage = true,
  className = "",
  textLines = [], // Array of text lines to display above QR code
  showDownloadButtons = true // Whether to show download buttons
}) => {
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const [customTextLines, setCustomTextLines] = useState(textLines.length > 0 ? textLines : []);
  const [isDownloading, setIsDownloading] = useState(false);

  // Generate WhatsApp deep link
  const generateWhatsAppLink = (phone, msg) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(msg);
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  };

  // Generate QR code
  useEffect(() => {
    const generateQR = async () => {
      try {
        const whatsappLink = generateWhatsAppLink(phoneNumber, message);
        const dataURL = await QRCode.toDataURL(whatsappLink, {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeDataURL(dataURL);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [phoneNumber, message, size]);

  const handleClick = () => {
    const whatsappLink = generateWhatsAppLink(phoneNumber, message);
    window.open(whatsappLink, '_blank');
  };

  // Download QR code as HD image
  const downloadQRCode = async () => {
    try {
      setIsDownloading(true);
      await downloadWhatsAppQRHD(phoneNumber, message, size);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      alert('Failed to download QR code. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Download QR code with text as PNG
  const downloadQRWithTextPNG = async () => {
    try {
      setIsDownloading(true);
      await downloadQRWithText(phoneNumber, message, size * 4, customTextLines);
    } catch (error) {
      console.error('Error downloading QR code with text:', error);
      alert('Failed to download QR code with text. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Download QR code with text as PDF
  const downloadQRWithTextPDF = async () => {
    try {
      setIsDownloading(true);
      await downloadQRWithTextPDF(phoneNumber, message, size * 4, customTextLines);
    } catch (error) {
      console.error('Error downloading QR code as PDF:', error);
      alert('Failed to download QR code as PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={`simple-whatsapp-qr ${className}`}>
      {qrCodeDataURL ? (
        <div className="text-center">
          <img
            src={qrCodeDataURL}
            alt="WhatsApp QR Code"
            className="cursor-pointer hover:opacity-80 transition-opacity mx-auto rounded-lg shadow-md"
            onClick={handleClick}
            style={{ width: size, height: size }}
          />
          {showMessage && (
            <p className="text-xs text-gray-600 mt-2">
              Scan to chat on WhatsApp
            </p>
          )}
          {showDownloadButtons && (
            <div className="mt-3 space-y-2">
              <div className="flex gap-1 justify-center">
                <button
                  onClick={downloadQRCode}
                  disabled={isDownloading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-xs font-semibold py-1 px-2 rounded transition-colors"
                  title="Download HD PNG"
                >
                  {isDownloading ? '⏳' : '📥'} PNG
                </button>
                
                <button
                  onClick={downloadQRWithTextPNG}
                  disabled={isDownloading}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white text-xs font-semibold py-1 px-2 rounded transition-colors"
                  title="Download PNG with text"
                >
                  {isDownloading ? '⏳' : '🖼️'} PNG+T
                </button>
                
                <button
                  onClick={downloadQRWithTextPDF}
                  disabled={isDownloading}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white text-xs font-semibold py-1 px-2 rounded transition-colors"
                  title="Download PDF with text"
                >
                  {isDownloading ? '⏳' : '📄'} PDF
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div 
          className="flex items-center justify-center bg-gray-100 rounded-lg mx-auto"
          style={{ width: size, height: size }}
        >
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default SimpleWhatsAppQR;
