import QRCode from 'qrcode';
import jsPDF from 'jspdf';

/**
 * Generate a WhatsApp QR code as a data URL
 * @param {string} phoneNumber - WhatsApp phone number with country code
 * @param {string} message - Pre-filled message
 * @param {number} size - QR code size in pixels
 * @returns {Promise<string>} Data URL of the QR code
 */
export const generateWhatsAppQR = async (phoneNumber, message = '', size = 256) => {
  try {
    // Clean phone number (remove non-numeric characters)
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp deep link
    const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    
    // Generate QR code
    const dataURL = await QRCode.toDataURL(whatsappLink, {
      width: size,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    
    return dataURL;
  } catch (error) {
    console.error('Error generating WhatsApp QR code:', error);
    throw error;
  }
};

/**
 * Generate a high-resolution WhatsApp QR code for download
 * @param {string} phoneNumber - WhatsApp phone number with country code
 * @param {string} message - Pre-filled message
 * @param {number} baseSize - Base size for HD calculation (will be multiplied by 4)
 * @returns {Promise<string>} Data URL of the HD QR code
 */
export const generateWhatsAppQRHD = async (phoneNumber, message = '', baseSize = 256) => {
  return generateWhatsAppQR(phoneNumber, message, baseSize * 4);
};

/**
 * Generate QR code with text overlay as canvas
 * @param {string} phoneNumber - WhatsApp phone number with country code
 * @param {string} message - Pre-filled message
 * @param {number} size - QR code size in pixels
 * @param {Array<string>} textLines - Array of text lines to display above QR code
 * @param {Object} options - Text styling options
 * @returns {Promise<HTMLCanvasElement>} Canvas element with QR code and text
 */
export const generateQRWithText = async (phoneNumber, message = '', size = 256, textLines = [], options = {}) => {
  try {
    const {
      textColor = '#000000',
      textSize = 16,
      textFont = 'Arial',
      lineHeight = 20,
      padding = 20,
      backgroundColor = '#FFFFFF'
    } = options;

    // Generate QR code
    const qrDataURL = await generateWhatsAppQR(phoneNumber, message, size);
    
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Calculate canvas dimensions
    const textHeight = textLines.length * lineHeight;
    const totalHeight = textHeight + size + (padding * 3);
    const totalWidth = size + (padding * 2);
    
    canvas.width = totalWidth;
    canvas.height = totalHeight;
    
    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, totalWidth, totalHeight);
    
    // Draw text lines
    ctx.fillStyle = textColor;
    ctx.font = `${textSize}px ${textFont}`;
    ctx.textAlign = 'center';
    
    textLines.forEach((line, index) => {
      const y = padding + (index * lineHeight) + textSize;
      ctx.fillText(line, totalWidth / 2, y);
    });
    
    // Draw QR code
    const qrImage = new Image();
    return new Promise((resolve, reject) => {
      qrImage.onload = () => {
        ctx.drawImage(qrImage, padding, textHeight + (padding * 2), size, size);
        resolve(canvas);
      };
      qrImage.onerror = reject;
      qrImage.src = qrDataURL;
    });
  } catch (error) {
    console.error('Error generating QR code with text:', error);
    throw error;
  }
};

/**
 * Download QR code with text as PNG image
 * @param {string} phoneNumber - WhatsApp phone number with country code
 * @param {string} message - Pre-filled message
 * @param {number} size - QR code size in pixels
 * @param {Array<string>} textLines - Array of text lines to display above QR code
 * @param {string} filename - Optional custom filename
 * @param {Object} options - Text styling options
 */
export const downloadQRWithText = async (phoneNumber, message = '', size = 256, textLines = [], filename = null, options = {}) => {
  try {
    const canvas = await generateQRWithText(phoneNumber, message, size, textLines, options);
    
    // Create filename if not provided
    if (!filename) {
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      const timestamp = Date.now();
      filename = `whatsapp-qr-with-text-${cleanPhone}-${timestamp}.png`;
    }
    
    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
    
    return true;
  } catch (error) {
    console.error('Error downloading QR code with text:', error);
    throw error;
  }
};

/**
 * Download QR code with text as PDF
 * @param {string} phoneNumber - WhatsApp phone number with country code
 * @param {string} message - Pre-filled message
 * @param {number} size - QR code size in pixels
 * @param {Array<string>} textLines - Array of text lines to display above QR code
 * @param {string} filename - Optional custom filename
 * @param {Object} options - Text styling options
 */
export const downloadQRWithTextPDF = async (phoneNumber, message = '', size = 256, textLines = [], filename = null, options = {}) => {
  try {
    const {
      textColor = '#000000',
      textSize = 16,
      textFont = 'helvetica',
      lineHeight = 20,
      padding = 20,
      backgroundColor = '#FFFFFF',
      pageFormat = 'a4'
    } = options;

    // Generate QR code
    const qrDataURL = await generateWhatsAppQR(phoneNumber, message, size);
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: pageFormat
    });
    
    // Set background color
    pdf.setFillColor(backgroundColor);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');
    
    // Calculate positioning
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const qrSizeMM = size * 0.264583; // Convert pixels to mm
    const textSizeMM = textSize * 0.264583;
    const lineHeightMM = lineHeight * 0.264583;
    const paddingMM = padding * 0.264583;
    
    const textHeightMM = textLines.length * lineHeightMM;
    const totalHeightMM = textHeightMM + qrSizeMM + (paddingMM * 3);
    
    // Center everything on the page
    const startX = (pageWidth - qrSizeMM) / 2;
    const startY = (pageHeight - totalHeightMM) / 2;
    
    // Add text lines
    pdf.setFont(textFont, 'normal');
    pdf.setFontSize(textSizeMM);
    pdf.setTextColor(textColor);
    
    textLines.forEach((line, index) => {
      const y = startY + paddingMM + (index * lineHeightMM) + textSizeMM;
      pdf.text(line, pageWidth / 2, y, { align: 'center' });
    });
    
    // Add QR code
    const qrY = startY + textHeightMM + (paddingMM * 2);
    pdf.addImage(qrDataURL, 'PNG', startX, qrY, qrSizeMM, qrSizeMM);
    
    // Create filename if not provided
    if (!filename) {
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      const timestamp = Date.now();
      filename = `whatsapp-qr-${cleanPhone}-${timestamp}.pdf`;
    }
    
    // Save PDF
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error downloading QR code as PDF:', error);
    throw error;
  }
};

/**
 * Download a WhatsApp QR code as a PNG file
 * @param {string} phoneNumber - WhatsApp phone number with country code
 * @param {string} message - Pre-filled message
 * @param {number} size - QR code size in pixels
 * @param {string} filename - Optional custom filename
 */
export const downloadWhatsAppQR = async (phoneNumber, message = '', size = 256, filename = null) => {
  try {
    const dataURL = await generateWhatsAppQR(phoneNumber, message, size);
    
    // Create filename if not provided
    if (!filename) {
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      const timestamp = Date.now();
      filename = `whatsapp-qr-${cleanPhone}-${timestamp}.png`;
    }
    
    // Create download link
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataURL;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Error downloading WhatsApp QR code:', error);
    throw error;
  }
};

/**
 * Download a high-resolution WhatsApp QR code
 * @param {string} phoneNumber - WhatsApp phone number with country code
 * @param {string} message - Pre-filled message
 * @param {number} baseSize - Base size for HD calculation
 * @param {string} filename - Optional custom filename
 */
export const downloadWhatsAppQRHD = async (phoneNumber, message = '', baseSize = 256, filename = null) => {
  return downloadWhatsAppQR(phoneNumber, message, baseSize * 4, filename);
};

/**
 * Open WhatsApp with pre-filled message
 * @param {string} phoneNumber - WhatsApp phone number with country code
 * @param {string} message - Pre-filled message
 */
export const openWhatsApp = (phoneNumber, message = '') => {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  
  window.open(whatsappLink, '_blank');
};

/**
 * Validate phone number format
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} True if valid format
 */
export const validatePhoneNumber = (phoneNumber) => {
  // Remove all non-numeric characters
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // Check if it's a valid length (7-15 digits)
  return cleanPhone.length >= 7 && cleanPhone.length <= 15;
};

/**
 * Format phone number for display
 * @param {string} phoneNumber - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  if (cleanPhone.length === 10) {
    // Indian format: +91 98765 43210
    return `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`;
  } else if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
    // Indian format with country code: +91 98765 43210
    return `+${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 7)} ${cleanPhone.slice(7)}`;
  } else if (cleanPhone.length > 10) {
    // International format: +1234567890
    return `+${cleanPhone}`;
  }
  
  return phoneNumber;
};