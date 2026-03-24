# WhatsApp QR Code Components

This directory contains React components for generating WhatsApp QR codes with HD download functionality.

## Components

### 1. WhatsAppQRCode.jsx
A full-featured WhatsApp QR code component with all functionality.

**Features:**
- Real-time QR code generation
- HD download (4x resolution)
- WhatsApp deep linking
- Customizable phone number and message
- Responsive design
- Loading states
- Error handling

**Props:**
- `phoneNumber` (string): WhatsApp phone number with country code (default: "+1234567890")
- `message` (string): Pre-filled message (default: "Hello! I'm interested in your insurance services.")
- `size` (number): QR code display size in pixels (default: 256)
- `className` (string): Additional CSS classes

**Usage:**
```jsx
import WhatsAppQRCode from './components/common/WhatsAppQRCode';

<WhatsAppQRCode
  phoneNumber="+919662011021"
  message="Hello! I'm interested in your services."
  size={256}
  className="my-custom-class"
/>
```

### 2. SimpleWhatsAppQR.jsx
A compact WhatsApp QR code component with basic functionality.

**Features:**
- QR code generation
- HD download
- WhatsApp deep linking
- Minimal UI
- Customizable size and message display

**Props:**
- `phoneNumber` (string): WhatsApp phone number with country code
- `message` (string): Pre-filled message
- `size` (number): QR code display size in pixels (default: 200)
- `showMessage` (boolean): Show "Scan to chat on WhatsApp" text (default: true)
- `className` (string): Additional CSS classes

**Usage:**
```jsx
import SimpleWhatsAppQR from './components/common/SimpleWhatsAppQR';

<SimpleWhatsAppQR
  phoneNumber="+919662011021"
  message="Hello! I'm interested in your services."
  size={200}
  showMessage={true}
/>
```

## Utility Functions

### whatsappQRUtils.js
Utility functions for programmatic QR code generation and management.

**Functions:**
- `generateWhatsAppQR(phoneNumber, message, size)` - Generate QR code as data URL
- `generateWhatsAppQRHD(phoneNumber, message, baseSize)` - Generate HD QR code (4x resolution)
- `downloadWhatsAppQR(phoneNumber, message, size, filename)` - Download QR code as PNG
- `downloadWhatsAppQRHD(phoneNumber, message, baseSize, filename)` - Download HD QR code
- `openWhatsApp(phoneNumber, message)` - Open WhatsApp with pre-filled message
- `validatePhoneNumber(phoneNumber)` - Validate phone number format
- `formatPhoneNumber(phoneNumber)` - Format phone number for display

**Usage:**
```javascript
import { 
  generateWhatsAppQR, 
  downloadWhatsAppQRHD, 
  openWhatsApp 
} from './utils/whatsappQRUtils';

// Generate QR code
const qrDataURL = await generateWhatsAppQR('+919662011021', 'Hello!');

// Download HD QR code
await downloadWhatsAppQRHD('+919662011021', 'Hello!', 256);

// Open WhatsApp
openWhatsApp('+919662011021', 'Hello!');
```

## Demo Page

### WhatsAppQRDemo.jsx
A comprehensive demo page showcasing all WhatsApp QR code functionality.

**Access:** Navigate to `/whatsapp-qr` in your application.

**Features:**
- Live configuration panel
- Real-time QR code generation
- Both component types side by side
- Feature showcase
- Usage instructions
- Responsive design

## HD Download Feature

The HD download feature generates QR codes at 4x the display resolution for crisp printing and high-quality display.

**Example:**
- Display size: 256px
- Download size: 1024px (256 × 4)
- Perfect for business cards, flyers, and print materials

## Dependencies

- `qrcode`: ^1.5.4 (already installed)
- `react`: ^18.2.0
- `react-dom`: ^18.2.0

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## File Naming Convention

Downloaded files follow this naming pattern:
```
whatsapp-qr-{phoneNumber}-{timestamp}.png
```

Example: `whatsapp-qr-919662011021-1703123456789.png`

## Error Handling

All components include comprehensive error handling:
- Invalid phone numbers
- Network errors
- QR code generation failures
- Download failures

## Styling

Components use Tailwind CSS classes and are fully responsive:
- Mobile-first design
- Hover effects
- Loading states
- Error states
- Customizable via className prop

## Performance

- Lazy loading of QR code generation
- Memoized components where appropriate
- Efficient re-rendering
- Background processing for HD generation

## Security

- Phone number validation
- URL encoding for messages
- Safe deep linking
- No data persistence

## Examples

### Basic Usage
```jsx
import WhatsAppQRCode from './components/common/WhatsAppQRCode';

function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <WhatsAppQRCode
        phoneNumber="+919662011021"
        message="I need help with insurance"
        size={300}
      />
    </div>
  );
}
```

### Custom Styling
```jsx
<WhatsAppQRCode
  phoneNumber="+919662011021"
  message="Hello!"
  size={200}
  className="border-2 border-green-500 rounded-xl p-4"
/>
```

### Programmatic Usage
```javascript
import { downloadWhatsAppQRHD } from './utils/whatsappQRUtils';

// Download HD QR code when button is clicked
const handleDownload = async () => {
  try {
    await downloadWhatsAppQRHD(
      '+919662011021',
      'Hello! I need insurance help.',
      256,
      'my-custom-qr-code.png'
    );
  } catch (error) {
    console.error('Download failed:', error);
  }
};
```

## Troubleshooting

### Common Issues

1. **QR Code not generating**
   - Check if phone number is valid
   - Ensure qrcode library is installed
   - Check browser console for errors

2. **Download not working**
   - Check browser popup blockers
   - Ensure sufficient disk space
   - Try different browser

3. **WhatsApp not opening**
   - Check if WhatsApp is installed
   - Verify phone number format
   - Check deep link permissions

### Debug Mode

Enable debug logging by setting:
```javascript
localStorage.setItem('whatsapp-qr-debug', 'true');
```

## Contributing

When modifying these components:
1. Maintain backward compatibility
2. Add proper error handling
3. Update documentation
4. Test on multiple browsers
5. Ensure responsive design

## License

This code is part of the CGPE frontend application.
