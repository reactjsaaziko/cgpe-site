import React, { useState } from 'react';
import { downloadQRWithText, downloadQRWithTextPDF } from '../../utils/whatsappQRUtils';

const WhatsAppQRTest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const testPNGDownload = async () => {
    setIsLoading(true);
    try {
      await downloadQRWithText(
        '+919662011021',
        'Hello CGPE, I scanned the QR at White Coat Wealth Circle.\n\nRequesting a 15-minute tea consultation—please confirm available slots here.',
        512, // 512px QR code
        []
      );
      alert('PNG download completed!');
    } catch (error) {
      alert('PNG download failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const testPDFDownload = async () => {
    setIsLoading(true);
    try {
      await downloadQRWithTextPDF(
        '+919662011021',
        'Hello CGPE, I scanned the QR at White Coat Wealth Circle.\n\nRequesting a 15-minute tea consultation—please confirm available slots here.',
        512, // 512px QR code
        []
      );
      alert('PDF download completed!');
    } catch (error) {
      alert('PDF download failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">WhatsApp QR Test</h2>
      <p className="text-gray-600 mb-6">
        Test the PDF and PNG download functionality with text overlay.
      </p>
      
      <div className="space-y-4">
        <button
          onClick={testPNGDownload}
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          {isLoading ? '⏳ Testing...' : '🖼️ Test PNG Download with Text'}
        </button>
        
        <button
          onClick={testPDFDownload}
          disabled={isLoading}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          {isLoading ? '⏳ Testing...' : '📄 Test PDF Download with Text'}
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Test Details:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Phone: +919662011021</li>
          <li>• Message: "Hello CGPE, I scanned the QR at White Coat Wealth Circle. Requesting a 15-minute tea consultation—please confirm available slots here."</li>
          <li>• QR Size: 512px (HD quality)</li>
          <li>• Text Lines: None (clean QR code only)</li>
        </ul>
      </div>
    </div>
  );
};

export default WhatsAppQRTest;
