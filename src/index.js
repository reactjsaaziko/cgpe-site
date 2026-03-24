import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { UserDataProvider } from './context/UserDataContext';
import { PricingProvider } from './context/PricingContext';
import './styles/no-cursor.css';
import { removeCursorPointer, initCursorObserver } from './utils/removeCursorPointer';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './Home.jsx';
// import ConfirmationModal from './components/ConfirmationModal.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserDataProvider>
    <PricingProvider>
      <App/>
    </PricingProvider>
  </UserDataProvider>
);

// Remove cursor pointer after initial render
setTimeout(() => {
  removeCursorPointer();
  initCursorObserver();
}, 100);

// Register service worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
