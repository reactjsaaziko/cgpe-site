import React from 'react';
import Header from '../headers/Headerlogin';
import MainContent from './MainContent';

function Generalform() {
    return (
        <div className="max-h-screen bg-white">
            <Header />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 leading-tight text-center mt-20">
                <span className="text-primary">₹1 Crore</span> life cover starting at ₹490/month+
            </h1>
            <MainContent />
        </div>
    );
}

export default Generalform;    