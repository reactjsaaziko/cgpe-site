/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "!./src/components/admin/**/*", // Exclude admin directory if it doesn't exist
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        primaryDark: '#357ABD',
        accent: '#4CAF50',
      },
      cursor: {
        'default': 'default',
        'pointer': 'default', // Override cursor-pointer to use default cursor
        'text': 'default', // Override cursor-text to use default cursor
        'auto': 'default', // Override cursor-auto to use default cursor
        'crosshair': 'default', // Override cursor-crosshair to use default cursor
        'help': 'default', // Override cursor-help to use default cursor
        'move': 'default', // Override cursor-move to use default cursor
        'wait': 'default', // Override cursor-wait to use default cursor
        'not-allowed': 'default', // Override cursor-not-allowed to use default cursor
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'popup-slide-in': 'popupSlideIn 0.3s ease-out',
        'popup-slide-up': 'popupSlideUp 0.3s ease-out',
        'popup-enter': 'popupEnter 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'popup-exit': 'popupExit 0.2s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        popupSlideIn: {
          '0%': { 
            transform: 'translateY(-20px) scale(0.95)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateY(0) scale(1)', 
            opacity: '1' 
          },
        },
        popupSlideUp: {
          '0%': { 
            transform: 'translateY(20px) scale(0.95)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateY(0) scale(1)', 
            opacity: '1' 
          },
        },
        popupEnter: {
          '0%': { 
            transform: 'translateY(30px) scale(0.8) rotateX(-15deg)', 
            opacity: '0',
            filter: 'blur(4px)'
          },
          '50%': { 
            transform: 'translateY(-5px) scale(1.02) rotateX(2deg)', 
            opacity: '0.8',
            filter: 'blur(1px)'
          },
          '100%': { 
            transform: 'translateY(0) scale(1) rotateX(0deg)', 
            opacity: '1',
            filter: 'blur(0px)'
          },
        },
        popupExit: {
          '0%': { 
            transform: 'translateY(0) scale(1) rotateX(0deg)', 
            opacity: '1',
            filter: 'blur(0px)'
          },
          '100%': { 
            transform: 'translateY(20px) scale(0.9) rotateX(-8deg)', 
            opacity: '0',
            filter: 'blur(2px)'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
