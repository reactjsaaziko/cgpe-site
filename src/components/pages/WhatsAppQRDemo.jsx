import React, { useState } from 'react';
import WhatsAppQRCode from '../common/WhatsAppQRCode';
import SimpleWhatsAppQR from '../common/SimpleWhatsAppQR';
import WhatsAppQRTest from '../common/WhatsAppQRTest';

const WhatsAppQRDemo = () => {
  const [phoneNumber, setPhoneNumber] = useState('+919662011021');
  const [message, setMessage] = useState('Hello CGPE, I scanned the QR at White Coat Wealth Circle.\n\nRequesting a 15-minute tea consultation—please confirm available slots here.');
  const [qrSize, setQrSize] = useState(256);
  const [textLines, setTextLines] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            WhatsApp QR Code Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate high-quality WhatsApp QR codes that can be downloaded as HD images. 
            Perfect for business cards, websites, and marketing materials.
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1234567890"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Include country code (e.g., +91 for India)
              </p>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pre-filled Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* QR Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Code Size (pixels)
              </label>
              <select
                value={qrSize}
                onChange={(e) => setQrSize(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value={128}>128px (Small)</option>
                <option value={256}>256px (Medium)</option>
                <option value={512}>512px (Large)</option>
                <option value={1024}>1024px (Extra Large)</option>
              </select>
            </div>

            {/* Text Lines */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Above QR Code (Optional)
              </label>
              <div className="space-y-2">
                {textLines.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No text lines - clean QR code only</p>
                ) : (
                  textLines.map((line, index) => (
                    <input
                      key={index}
                      type="text"
                      value={line}
                      onChange={(e) => {
                        const newLines = [...textLines];
                        newLines[index] = e.target.value;
                        setTextLines(newLines);
                      }}
                      placeholder={`Text line ${index + 1}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                  ))
                )}
                <button
                  onClick={() => setTextLines([...textLines, ''])}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md transition-colors text-sm"
                >
                  + Add Text Line
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">💡 Pro Tip</h3>
              <p className="text-sm text-blue-700">
                The download button generates a QR code that's 4x the display size for HD quality. 
                A 256px display will download as 1024px for crisp printing.
              </p>
            </div>
          </div>
        </div>

        {/* Test Component */}
        <div className="mb-8">
          <WhatsAppQRTest />
        </div>

        {/* QR Code Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Full Featured Component */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Full Featured QR Code
            </h2>
            <p className="text-gray-600 mb-6">
              Complete component with all features including HD download
            </p>
            
            <WhatsAppQRCode
              phoneNumber={phoneNumber}
              message={message}
              size={qrSize}
              textLines={textLines}
              className="w-full"
            />
          </div>

          {/* Simple Component */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Simple QR Code
            </h2>
            <p className="text-gray-600 mb-6">
              Compact component with basic functionality and HD download
            </p>
            
            <SimpleWhatsAppQR
              phoneNumber={phoneNumber}
              message={message}
              size={qrSize}
              textLines={textLines}
              showMessage={true}
              showDownloadButtons={true}
              className="w-full"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">WhatsApp Integration</h3>
              <p className="text-sm text-gray-600">
                Direct integration with WhatsApp for instant messaging
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📥</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">HD Download</h3>
              <p className="text-sm text-gray-600">
                Download QR codes in high resolution PNG and PDF formats
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Real-time Generation</h3>
              <p className="text-sm text-gray-600">
                Instant QR code generation with live updates
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Customizable</h3>
              <p className="text-sm text-gray-600">
                Customize phone number, message, size, and text overlay
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Text Overlay</h3>
              <p className="text-sm text-gray-600">
                Add custom text above QR code in downloads
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Deep Linking</h3>
              <p className="text-sm text-gray-600">
                Direct links to WhatsApp with pre-filled messages
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Mobile Friendly</h3>
              <p className="text-sm text-gray-600">
                Responsive design that works on all devices
              </p>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-12 bg-gray-800 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            How to Use
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">For Users:</h3>
              <ol className="space-y-2 text-sm">
                <li>1. Scan the QR code with your phone camera</li>
                <li>2. WhatsApp will open with the pre-filled message</li>
                <li>3. Send the message to start a conversation</li>
                <li>4. Or click the QR code to open WhatsApp directly</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">For Developers:</h3>
              <ol className="space-y-2 text-sm">
                <li>1. Import the component: <code className="bg-gray-700 px-2 py-1 rounded">import WhatsAppQRCode from './WhatsAppQRCode'</code></li>
                <li>2. Use with props: <code className="bg-gray-700 px-2 py-1 rounded">&lt;WhatsAppQRCode phoneNumber="+1234567890" message="Hello!" /&gt;</code></li>
                <li>3. Customize size and styling as needed</li>
                <li>4. HD download is automatically included</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppQRDemo;