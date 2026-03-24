import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Headerlogin from "../headers/Headerlogin";

const steps = [
    "Destinations",
    "Trip date",
    "Travelers",
    "Medical history",
    "Contact details",
];

const popularDestinations = [
    "Schengen",
    "USA",
    "Germany",
    "Thailand",
    "France",
    "United Arab Emirates",
    "Canada",
];

// Component to show when Next button is clicked
const NextStepComponent = ({ destination, onBack, onNext }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleNextClick = () => {
        if (startDate && endDate) {
            onNext({ startDate, endDate });
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-start relative">
            <h1 className="text-3xl font-bold text-[#23294a] mb-7 text-center">
                When are you travelling to {destination}?
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
                Don't worry you can change your trip dates at a later stage
            </p>
            
            <div className="flex gap-4 mb-8">
                <div className="relative">
                    <input
                        type="date"
                        className="w-[200px] bg-white border border-gray-300 rounded-lg px-5 py-4 text-[17px] outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div className="relative">
                    <input
                        type="date"
                        className="w-[200px] bg-white border border-gray-300 rounded-lg px-5 py-4 text-[17px] outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>
            
            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    className="w-[170px] bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg py-4 text-lg font-semibold shadow transition"
                >
                    Back
                </button>
                <button
                    onClick={handleNextClick}
                    disabled={!startDate || !endDate}
                    className={`w-[170px] rounded-lg py-4 text-lg font-semibold shadow transition ${
                        startDate && endDate 
                            ? "bg-[#4472c4] hover:bg-[#2c55a6] text-white" 
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

// Component for travelers step
const TravelersStepComponent = ({ onBack, onNext }) => {
    const [selectedTravelers, setSelectedTravelers] = useState(2);
    const [travelerAges, setTravelerAges] = useState([25, 25]);

    const travelerOptions = [1, 2, 3, "4+"];

    const handleTravelerChange = (count) => {
        setSelectedTravelers(count);
        if (count === "4+") {
            setTravelerAges([25, 25, 25, 25]);
        } else {
            setTravelerAges(Array(parseInt(count)).fill(25));
        }
    };

    const handleAgeChange = (index, age) => {
        const newAges = [...travelerAges];
        newAges[index] = parseInt(age) || 25;
        setTravelerAges(newAges);
    };

    const handleNextClick = () => {
        onNext({ travelers: selectedTravelers, ages: travelerAges });
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-start relative">
            <h1 className="text-3xl font-bold text-[#23294a] mb-7 text-center">
                How many people are travelling?
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
                Don't worry you can change your trip dates at a later stage
            </p>
            
            {/* Traveler count selection */}
            <div className="flex gap-4 mb-8">
                {travelerOptions.map((count) => (
                    <button
                        key={count}
                        onClick={() => handleTravelerChange(count)}
                        className={`w-20 h-12 rounded-lg border-2 font-semibold text-lg transition ${
                            selectedTravelers === count
                                ? "border-blue-500 text-blue-500 bg-blue-50"
                                : "border-gray-300 text-gray-500 hover:border-gray-400"
                        }`}
                    >
                        {count}
                    </button>
                ))}
            </div>
            
            {/* Age selection fields */}
            <div className="flex gap-4 mb-8">
                {travelerAges.map((age, index) => (
                    <div key={index} className="relative">
                        <select
                            value={age}
                            onChange={(e) => handleAgeChange(index, e.target.value)}
                            className="w-[200px] bg-white border border-gray-300 rounded-lg px-5 py-4 text-[17px] outline-none focus:ring-2 focus:ring-blue-200 appearance-none"
                        >
                            {Array.from({ length: 100 }, (_, i) => i + 1).map((ageOption) => (
                                <option key={ageOption} value={ageOption}>
                                    {ageOption} years
                                </option>
                            ))}
                        </select>
                        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <div className="absolute -top-2 left-3 bg-white px-2 text-sm text-gray-600">
                            Select age of traveller {index + 1}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Next button */}
            <button
                onClick={handleNextClick}
                className="w-[350px] bg-[#4472c4] hover:bg-[#2c55a6] text-white rounded-lg py-4 text-lg font-semibold shadow transition"
            >
                Next
            </button>
        </div>
    );
};

// Component for medical history step
const MedicalHistoryStepComponent = ({ onBack, onNext }) => {
    const [hasMedicalCondition, setHasMedicalCondition] = useState("");

    const handleNextClick = () => {
        if (hasMedicalCondition !== "") {
            onNext({ hasMedicalCondition });
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-start relative">
            <h1 className="text-3xl font-bold text-[#23294a] mb-7 text-center">
                Does any of the travellers have a pre-existing medical condition?
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
                If any of the traveller have a known illness, injury or health condition like heart disease, diabetes, cancer etc which will help us cover you
            </p>
            
            {/* Medical condition options */}
            <div className="flex gap-8 mb-8">
                <label className="flex items-center cursor-pointer border border-gray-300 rounded-lg p-4 w-[170px]">
                    <input
                        type="radio"
                        name="medicalCondition"
                        value="yes"
                        checked={hasMedicalCondition === "yes"}
                        onChange={(e) => setHasMedicalCondition(e.target.value)}
                        className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                        hasMedicalCondition === "yes" 
                            ? "border-blue-500 bg-blue-500" 
                            : "border-gray-300 bg-white" 
                    }`}>
                        {hasMedicalCondition === "yes" && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                    </div>
                    <span className="text-lg font-medium text-gray-700">Yes</span>
                </label>
                
                <label className="flex items-center cursor-pointer  border border-gray-300 rounded-lg p-4 w-[170px]">
                    <input
                        type="radio"
                        name="medicalCondition"
                        value="no"
                        checked={hasMedicalCondition === "no"}
                        onChange={(e) => setHasMedicalCondition(e.target.value)}
                        className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                        hasMedicalCondition === "no" 
                            ? "border-blue-500 bg-blue-500" 
                            : "border-gray-300 bg-white"
                    }`}>
                        {hasMedicalCondition === "no" && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                    </div>
                    <span className="text-lg font-medium text-gray-700">No</span>
                </label>
            </div>
            
            {/* Next button */}
            <button
                onClick={handleNextClick}
                disabled={hasMedicalCondition === ""}
                className={`w-[350px] rounded-lg py-4 text-lg font-semibold shadow transition ${
                    hasMedicalCondition !== "" 
                        ? "bg-[#4472c4] hover:bg-[#2c55a6] text-white" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
                Next
            </button>
        </div>
    );
};

// Component for contact details step
const ContactDetailsStepComponent = ({ onBack, onNext }) => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [fullName, setFullName] = useState("");

    const handleNextClick = () => {
        if (mobileNumber.trim()) {
            onNext({ mobileNumber, fullName });
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-start relative">
            <h1 className="text-3xl font-bold text-[#23294a] mb-7 text-center">
                Great! One last step to get your travel insurance plans
            </h1>
            <p className="text-lg mb-8 text-center">
                It will help us to share policy documents and assist you in claim settlement if needed
            </p>
            
            {/* Contact inputs */}
            <div className="mb-8 flex flex-col gap-4">
                <input
                    type="text"
                    className="w-[350px] bg-white border border-gray-300 rounded-lg px-5 py-4 text-[17px] outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <input
                    type="tel"
                    className="w-[350px] bg-white border border-gray-300 rounded-lg px-5 py-4 text-[17px] outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
            </div>
            
            {/* View Plans button */}
            <button
                onClick={handleNextClick}
                disabled={!mobileNumber.trim()}
                className={`w-[350px] rounded-lg py-4 text-lg font-semibold shadow transition ${
                    mobileNumber.trim() 
                        ? "bg-[#4472c4] hover:bg-[#2c55a6] text-white" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
                View Plans
            </button>
        </div>
    );
};

export default function TravelInsuranceStep1() {
    const [destination, setDestination] = useState("");
    const [currentStep, setCurrentStep] = useState(1); // 1: destination, 2: dates, 3: travelers, 4: medical history, 5: contact details, 6: policy suggestions
    const [tripData, setTripData] = useState({});
    const navigate = useNavigate();

    // Load trip data from localStorage on component mount
    useEffect(() => {
        const savedTripData = localStorage.getItem("travelTripData");
        if (savedTripData) {
            setTripData(JSON.parse(savedTripData));
        }
    }, []);

    // Save trip data to localStorage whenever it changes
    useEffect(() => {
        if (Object.keys(tripData).length > 0) {
            localStorage.setItem("travelTripData", JSON.stringify(tripData));
        }
    }, [tripData]);

    const handleNextClick = () => {
        if (destination.trim()) {
            setCurrentStep(2);
        }
    };

    const handleBackClick = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleDatesNext = (dates) => {
        setTripData({ ...tripData, ...dates });
        setCurrentStep(3);
    };

    const handleTravelersNext = (travelers) => {
        setTripData({ ...tripData, ...travelers });
        setCurrentStep(4);
    };

    const handleMedicalHistoryNext = (medicalData) => {
        setTripData({ ...tripData, ...medicalData });
        setCurrentStep(5);
    };

    const handleContactDetailsNext = async (contactData) => {
        const completeTripData = { ...tripData, ...contactData, destination };
        setTripData(completeTripData);
        try {
            const { startDate, endDate, travelers, ages, hasMedicalCondition, mobileNumber, fullName } = completeTripData;
            const details = [
                destination ? `Destination: ${destination}` : null,
                startDate && endDate ? `Dates: ${startDate} to ${endDate}` : null,
                travelers ? `Travellers: ${travelers}` : null,
                Array.isArray(ages) && ages.length ? `Ages: ${ages.join(', ')}` : null,
                typeof hasMedicalCondition === 'string' && hasMedicalCondition ? `Pre-existing condition: ${hasMedicalCondition}` : null,
            ].filter(Boolean).join(' | ');

            await fetch('/api/inquiries/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: (fullName && fullName.trim()) ? fullName.trim() : 'Travel Lead',
                    email: '',
                    phone: mobileNumber,
                    subject: `Travel insurance inquiry${destination ? ` - ${destination}` : ''}`,
                    message: details,
                    inquiryType: 'insurance',
                    source: 'website'
                })
            });
        } catch (error) {
            // Non-blocking: proceed to next page even if inquiry logging fails
            console.error('Failed to create travel inquiry', error);
        }
        // Store complete trip data before navigation
        localStorage.setItem("travelTripData", JSON.stringify(completeTripData));
        // Navigate to policy suggestions page
        navigate("/travel-policy-suggestions");
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header / Logo */}
            <Headerlogin />

            {/* Stepper */}
            <div className="flex justify-center mt-32 mb-5">
                <div className="flex w-[950px] mb-20">
                    {steps.map((step, idx) => (
                        <React.Fragment key={step}>
                            <div className="flex flex-col items-center">
                                <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-[15px] font-semibold ${
                                    idx < currentStep
                                        ? "bg-blue-700 text-white border-blue-700"
                                        : "bg-gray-200 text-gray-500 border-gray-300"
                                    }`}>
                                    {idx + 1}
                                </div>
                                <span className="text-[15px] mt-2 font-medium text-gray-700">{step}</span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className="flex-1 h-1 bg-gray-300 my-3 mx-1 rounded-full" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Main section */}
            {currentStep === 1 && (
                <div className="flex-1 flex flex-col items-center justify-start relative">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-[#23294a] mb-7 text-center">
                        Let's secure your travel
                    </h1>
                    {/* Destination input */}
                    <input
                        className="w-[430px] bg-white border border-gray-300 rounded-lg px-5 py-4 text-[17px] mb-9 outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Enter your destination"
                        value={destination}
                        onChange={e => setDestination(e.target.value)}
                    />
                    {/* Popular Destinations */}
                    <div className="text-lg text-center mb-3 font-medium text-[#23294a]">Popular destinations</div>
                    <div className="flex flex-wrap gap-4 justify-center mb-12">
                        {popularDestinations.map(dest => (
                            <button
                                type="button"
                                key={dest}
                                onClick={() => setDestination(dest)}
                                className="px-6 py-2 rounded-lg border border-gray-400 bg-white text-[16px] font-medium hover:bg-blue-50 transition"
                                style={{
                                    boxShadow: destination === dest ? "0 0 0 2px #4472c4" : undefined,
                                    borderColor: destination === dest ? "#4472c4" : undefined,
                                    color: destination === dest ? "#4472c4" : undefined,
                                }}
                            >
                                {dest}
                            </button>
                        ))}
                    </div>
                    {/* Next button */}
                    <button
                        onClick={handleNextClick}
                        disabled={!destination.trim()}
                        className={`w-[350px] rounded-lg py-4 text-lg font-semibold shadow transition mb-10 ${
                            destination.trim() 
                                ? "bg-[#4472c4] hover:bg-[#2c55a6] text-white" 
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}

            {currentStep === 2 && (
                <NextStepComponent 
                    destination={destination} 
                    onBack={handleBackClick} 
                    onNext={handleDatesNext}
                />
            )}

            {currentStep === 3 && (
                <TravelersStepComponent 
                    onBack={handleBackClick} 
                    onNext={handleTravelersNext}
                />
            )}

            {currentStep === 4 && (
                <MedicalHistoryStepComponent 
                    onBack={handleBackClick} 
                    onNext={handleMedicalHistoryNext}
                />
            )}

            {currentStep === 5 && (
                <ContactDetailsStepComponent 
                    onBack={handleBackClick} 
                    onNext={handleContactDetailsNext}
                />
            )}

            {/* Bottom Cityscape background (replace with SVG/image if you have one) */}
            <div className="absolute left-0 bottom-0 w-full pointer-events-none select-none z-0">
                {/* Place your SVG or PNG cityscape illustration here for full width.
            If you have a PNG: <img src="/your-cityscape.png" className="w-full" alt="" />
            For now, this is left as a placeholder. */}
            </div>
        </div>
    );
}
