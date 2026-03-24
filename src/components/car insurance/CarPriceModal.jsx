import React, { useState } from 'react';

const CarPriceModal = ({ isOpen, onClose, onSubmit }) => {
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (price.trim()) {
            onSubmit(price);
            setPrice('');
            onClose();
        }
    };

    const handleDontKnow = () => {
        // Handle the "I don't know my car's ex-showroom price" action
        console.log('User clicked on "I don\'t know my car\'s ex-showroom price"');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            What is your car's ex-showroom price
                        </h2>
                        <p className="text-sm text-gray-600">
                            This will help us give you the right coverage
                        </p>
                    </div>

                    {/* Input Field */}
                    <div>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter Amount"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4472c4] transition text-lg"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#4472c4] hover:bg-[#2957a4] text-white rounded-lg py-4 text-lg font-semibold transition"
                    >
                        Submit
                    </button>

                    {/* Explanatory Text */}
                    <div className="text-xs text-gray-500 text-center leading-relaxed">
                        Ex-Showroom price of a car is not final price of your car. this is the price of the car minus the cost of registration, insurance and road tax
                    </div>

                    {/* Don't Know Link */}
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleDontKnow}
                            className="text-[#4472c4] underline text-sm hover:text-[#2957a4] transition"
                        >
                            I don't know my car's ex-showroom price
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CarPriceModal; 