import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WhatsAppQRCode from './WhatsAppQRCode';

// Mock QRCode library
jest.mock('qrcode', () => ({
  toDataURL: jest.fn(() => Promise.resolve('data:image/png;base64,mock-qr-code'))
}));

describe('WhatsAppQRCode Component', () => {
  const defaultProps = {
    phoneNumber: '+919662011021',
    message: 'Hello! I\'m interested in your services.',
    size: 256
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    render(<WhatsAppQRCode />);
    
    expect(screen.getByText('Scan QR Code to Chat on WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('Scan this QR code with your phone camera or WhatsApp to start a conversation')).toBeInTheDocument();
  });

  test('renders with custom props', () => {
    render(<WhatsAppQRCode {...defaultProps} />);
    
    expect(screen.getByText('Phone: +919662011021')).toBeInTheDocument();
    expect(screen.getByText('Message: Hello! I\'m interested in your services.')).toBeInTheDocument();
  });

  test('shows loading state initially', () => {
    render(<WhatsAppQRCode {...defaultProps} />);
    
    expect(screen.getByText('Generating QR Code...')).toBeInTheDocument();
  });

  test('regenerate button works', async () => {
    render(<WhatsAppQRCode {...defaultProps} />);
    
    const regenerateButton = screen.getByText('Regenerate QR Code');
    fireEvent.click(regenerateButton);
    
    await waitFor(() => {
      expect(screen.getByText('Generating...')).toBeInTheDocument();
    });
  });

  test('download button is disabled when QR code is not ready', () => {
    render(<WhatsAppQRCode {...defaultProps} />);
    
    const downloadButton = screen.getByText('📥 Download HD QR Code');
    expect(downloadButton).toBeDisabled();
  });

  test('opens WhatsApp when QR code is clicked', () => {
    const mockOpen = jest.spyOn(window, 'open').mockImplementation(() => {});
    
    render(<WhatsAppQRCode {...defaultProps} />);
    
    // Wait for QR code to load and then click
    waitFor(() => {
      const qrImage = screen.getByAltText('WhatsApp QR Code');
      fireEvent.click(qrImage);
      
      expect(mockOpen).toHaveBeenCalledWith(
        'https://wa.me/919662011021?text=Hello!%20I\'m%20interested%20in%20your%20services.',
        '_blank'
      );
    });
    
    mockOpen.mockRestore();
  });

  test('handles phone number formatting correctly', () => {
    render(<WhatsAppQRCode phoneNumber="+91 966 201 1021" message="Test" />);
    
    expect(screen.getByText('Phone: +91 966 201 1021')).toBeInTheDocument();
  });

  test('handles empty message gracefully', () => {
    render(<WhatsAppQRCode phoneNumber="+919662011021" message="" />);
    
    expect(screen.getByText('Message:')).toBeInTheDocument();
  });
});
