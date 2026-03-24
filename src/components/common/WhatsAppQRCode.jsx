import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  downloadWhatsAppQRHD, 
  downloadQRWithText, 
  downloadQRWithTextPDF 
} from '../../utils/whatsappQRUtils';

const WhatsAppQRCode = ({ 
  phoneNumber = "+919662011021", // Default phone number
  message = "Hello CGPE, I scanned the QR at White Coat Wealth Circle.\n\nRequesting a 15-minute tea consultation—please confirm available slots here.", // Default message
  size = 256,
  className = "",
  textLines = [], // Array of text lines to display above QR code
  showTextInput = true // Whether to show text input fields
}) => {
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customTextLines, setCustomTextLines] = useState(textLines.length > 0 ? textLines : []);
  const [isDownloading, setIsDownloading] = useState(false);
  const canvasRef = useRef(null);

  // Generate WhatsApp deep link
  const generateWhatsAppLink = (phone, msg) => {
    // Remove any non-numeric characters from phone number
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(msg);
    
    // Create WhatsApp deep link
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  };

  // Generate QR code
  const generateQRCode = async () => {
    setIsGenerating(true);
    try {
      const whatsappLink = generateWhatsAppLink(phoneNumber, message);
      
      // Generate QR code as data URL
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
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate QR code on component mount or when props change
  useEffect(() => {
    generateQRCode();
  }, [phoneNumber, message, size]);

  // Handle QR code click to open WhatsApp directly
  const handleQRCodeClick = () => {
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

  // Handle text line changes
  const handleTextLineChange = (index, value) => {
    const newTextLines = [...customTextLines];
    newTextLines[index] = value;
    setCustomTextLines(newTextLines);
  };

  // Add new text line
  const addTextLine = () => {
    if (customTextLines.length < 5) { // Limit to 5 lines
      setCustomTextLines([...customTextLines, '']);
    }
  };

  // Remove text line
  const removeTextLine = (index) => {
    if (customTextLines.length > 1) { // Keep at least 1 line
      const newTextLines = customTextLines.filter((_, i) => i !== index);
      setCustomTextLines(newTextLines);
    }
  };

  return (
    <div className={`whatsapp-qr-container ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Scan QR Code to Chat on WhatsApp
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Scan this QR code with your phone camera or WhatsApp to start a conversation
        </p>
        
        {/* QR Code Display */}
        <div className="relative inline-block">
          {isGenerating ? (
            <div 
              className="flex items-center justify-center bg-gray-100 rounded-lg"
              style={{ width: size, height: size }}
            >
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-600 text-sm">Generating QR Code...</p>
              </div>
            </div>
          ) : qrCodeDataURL ? (
            <div className="relative">
              <img
                src={qrCodeDataURL}
                alt="WhatsApp QR Code"
                className="cursor-pointer hover:opacity-90 transition-opacity rounded-lg shadow-lg"
                onClick={handleQRCodeClick}
                style={{ width: size, height: size }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg">
                <span className="text-white font-semibold">Click to open WhatsApp</span>
              </div>
            </div>
          ) : (
            <div 
              className="flex items-center justify-center bg-gray-100 rounded-lg"
              style={{ width: size, height: size }}
            >
              <span className="text-gray-400 text-sm">QR Code will appear here</span>
            </div>
          )}
        </div>

        {/* Text Input Section */}
        {showTextInput && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Customize Text Above QR Code</h4>
            <div className="space-y-2">
              {customTextLines.map((line, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={line}
                    onChange={(e) => handleTextLineChange(index, e.target.value)}
                    placeholder={`Text line ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  {customTextLines.length > 1 && (
                    <button
                      onClick={() => removeTextLine(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-md transition-colors"
                      title="Remove line"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              {customTextLines.length < 5 && (
                <button
                  onClick={addTextLine}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md transition-colors text-sm"
                >
                  + Add Text Line
                </button>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={generateQRCode}
              disabled={isGenerating}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {isGenerating ? 'Generating...' : 'Regenerate QR Code'}
            </button>
            
            <button
              onClick={handleQRCodeClick}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Open WhatsApp Directly
            </button>
          </div>
          
          {/* Download Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={downloadQRCode}
              disabled={!qrCodeDataURL || isGenerating || isDownloading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              {isDownloading ? '⏳' : '📥'} HD PNG
            </button>
            
            <button
              onClick={downloadQRWithTextPNG}
              disabled={!qrCodeDataURL || isGenerating || isDownloading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              {isDownloading ? '⏳' : '🖼️'} PNG + Text
            </button>
            
            <button
              onClick={downloadQRWithTextPDF}
              disabled={!qrCodeDataURL || isGenerating || isDownloading}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              {isDownloading ? '⏳' : '📄'} PDF + Text
            </button>
          </div>
        </div>

        {/* Display Info */}
        <div className="mt-4 text-xs text-gray-500">
          <p>Phone: {phoneNumber}</p>
          <p className="truncate max-w-xs mx-auto">Message: {message}</p>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppQRCode;
