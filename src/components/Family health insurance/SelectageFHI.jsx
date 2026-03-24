import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Headerlogin from "../headers/Headerlogin";
import male from "../assets/account.png";
import female from "../assets/personfemale.png";
import son from "../assets/son.png";
import daughter from "../assets/daughter.png";
import father from "../assets/father.png";
import mother from "../assets/mother.png";
import grandfather from "../assets/grandfather.png";
import grandmother from "../assets/grandmother.png";
import fatherinlaw from "../assets/father-in-law.png";
import motherinlaw from "../assets/mother-in-law.png";

const AGE_RANGES = [
    { min: 18, max: 25, label: "18-25 years" },
    { min: 26, max: 35, label: "26-35 years" },
    { min: 36, max: 45, label: "36-45 years" },
    { min: 46, max: 55, label: "46-55 years" },
    { min: 56, max: 65, label: "56-65 years" },
    { min: 66, max: 75, label: "66-75 years" },
    { min: 76, max: 85, label: "76-85 years" },
];

const getMemberIcon = (memberKey) => {
    switch (memberKey) {
        case "self":
            return male;
        case "wife":
            return female;
        case "son":
            return son;
        case "daughter":
            return daughter;
        case "father":
            return father;
        case "mother":
            return mother;
        case "grand_father":
            return grandfather;
        case "grand_mother":
            return grandmother;
        case "father_in_law":
            return fatherinlaw;
        case "mother_in_law":
            return motherinlaw;
        default:
            return male;
    }
};

export default function SelectAgeFHI() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get data passed from previous screen
    const { selectedMembers, gender, name } = location.state || {};
    
    // Initialize ages state for all selected members
    const [ages, setAges] = useState(() => {
        const initialAges = {};
        selectedMembers?.forEach(member => {
            initialAges[member] = "";
        });
        return initialAges;
    });
    
    // State for currently selected member to show input for
    const [currentMember, setCurrentMember] = useState(selectedMembers?.[0] || null);

    const handleAgeChange = (member, value) => {
        if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 120)) {
            setAges(prev => ({
                ...prev,
                [member]: value
            }));
        }
    };

    const handleContinue = () => {
        // Check if all selected members have ages entered
        const allAgesEntered = selectedMembers?.every(member => ages[member]?.trim());
        
        if (allAgesEntered) {
            // Navigate to city selection screen with selected data
            navigate("/select-city-fhi", {
                state: {
                    selectedMembers,
                    memberAges: ages,
                    gender,
                    name
                }
            });
        }
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar for selected members */}
            {selectedMembers?.length > 1 && (
                <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Selected Family Members</h3>
                        <div className="text-sm text-gray-600">
                            {selectedMembers.length} members selected
                        </div>
                    </div>
                    
                                         <div className="space-y-4">
                         {selectedMembers.map((member, index) => (
                             <button
                                 key={member} 
                                 onClick={() => setCurrentMember(member)}
                                 className={`w-full p-4 rounded-lg border transition-all text-left ${
                                     currentMember === member
                                         ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                         : ages[member]?.trim() 
                                             ? 'border-green-300 bg-green-50 hover:border-green-400' 
                                             : 'border-gray-200 bg-white hover:border-gray-300'
                                 }`}
                             >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={getMemberIcon(member)}
                                        alt={member}
                                        className="w-12 h-12 rounded-full border-2 border-gray-200"
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-800">
                                            {member.replace('_', ' ')}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Member {index + 1}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {ages[member]?.trim() ? (
                                            <div className="text-green-600 font-medium">
                                                {ages[member]} years
                                            </div>
                                        ) : (
                                            <div className="text-gray-400 text-sm">
                                                Age pending
                                            </div>
                                        )}
                                    </div>
                                </div>
                                                                 {ages[member]?.trim() && (
                                     <div className="mt-2 flex items-center gap-2">
                                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                         <span className="text-xs text-green-600">Age entered</span>
                                     </div>
                                 )}
                             </button>
                        ))}
                    </div>
                    
                    {/* Progress Summary */}
                    <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                        <div className="text-sm font-medium text-gray-800 mb-2">Progress</div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                    style={{ 
                                        width: `${(selectedMembers.filter(member => ages[member]?.trim()).length / selectedMembers.length) * 100}%` 
                                    }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                                {selectedMembers.filter(member => ages[member]?.trim()).length}/{selectedMembers.length}
                            </span>
                        </div>
                        <div className="text-xs text-gray-500">
                            {selectedMembers.filter(member => ages[member]?.trim()).length === selectedMembers.length 
                                ? 'All ages entered!' 
                                : `${selectedMembers.length - selectedMembers.filter(member => ages[member]?.trim()).length} more to go`
                            }
                        </div>
                    </div>
                </div>
            )}
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-start pt-10">
                <Headerlogin />
                
                {/* Back Button */}
                <div className="w-full max-w-4xl px-6 mb-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="text-blue-600 text-[15px] mb-4 inline-block hover:text-blue-800"
                    >
                        ← Back
                    </button>
                </div>

                         {/* Header */}
             <div className="flex flex-col items-center mb-8 mt-10">
                 <div className="text-2xl font-medium mb-2 text-center">
                     {selectedMembers?.length > 1 
                         ? `Enter age for ${currentMember?.replace('_', ' ')}` 
                         : "Enter age for family member"
                     }
                 </div>
                 <div className="text-gray-500 text-center mb-4">
                     {selectedMembers?.length > 1 ? 
                         `Click on any member in the sidebar to edit their age` : 
                         "Enter the age to get personalized plans"
                     }
                 </div>
                 {/* Progress indicator */}
                 {selectedMembers?.length > 1 && (
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                         <span>
                             {selectedMembers.filter(member => ages[member]?.trim()).length} of {selectedMembers.length} ages entered
                         </span>
                         <div className="w-32 bg-gray-200 rounded-full h-2">
                             <div 
                                 className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                 style={{ 
                                     width: `${(selectedMembers.filter(member => ages[member]?.trim()).length / selectedMembers.length) * 100}%` 
                                 }}
                             ></div>
                         </div>
                     </div>
                 )}
             </div>

                         {/* Age input for currently selected member */}
             {currentMember && (
                 <div className="w-full max-w-2xl mb-8">
                     <div className="mb-6">
                         <div className="flex items-center gap-4 mb-3">
                             <img
                                 src={getMemberIcon(currentMember)}
                                 alt={currentMember}
                                 className="w-20 h-20 rounded-full border-4 border-blue-200"
                             />
                             <div>
                                 <div className="text-2xl font-medium text-gray-800">
                                     {currentMember.replace('_', ' ')}
                                 </div>
                                 <div className="text-sm text-gray-500">
                                     Member {selectedMembers.indexOf(currentMember) + 1} of {selectedMembers.length}
                                 </div>
                             </div>
                         </div>
                         <input
                             type="number"
                             min="1"
                             max="120"
                             className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
                             placeholder={`Enter age for ${currentMember.replace('_', ' ')} (1-120)`}
                             value={ages[currentMember] || ""}
                             onChange={(e) => handleAgeChange(currentMember, e.target.value)}
                             autoFocus
                         />
                     </div>
                     
                     {/* Navigation buttons for multiple members */}
                     {selectedMembers.length > 1 && (
                         <div className="flex justify-between items-center mt-6">
                             <button
                                 onClick={() => {
                                     const currentIndex = selectedMembers.indexOf(currentMember);
                                     const prevIndex = currentIndex > 0 ? currentIndex - 1 : selectedMembers.length - 1;
                                     setCurrentMember(selectedMembers[prevIndex]);
                                 }}
                                 className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
                             >
                                 ← Previous
                             </button>
                             <button
                                 onClick={() => {
                                     const currentIndex = selectedMembers.indexOf(currentMember);
                                     const nextIndex = currentIndex < selectedMembers.length - 1 ? currentIndex + 1 : 0;
                                     setCurrentMember(selectedMembers[nextIndex]);
                                 }}
                                 className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
                             >
                                 Next →
                             </button>
                         </div>
                     )}
                 </div>
             )}

            {/* Continue Button */}
            <button
                className={`w-full max-w-lg font-semibold text-lg rounded-lg py-3 shadow transition ${
                    selectedMembers?.every(member => ages[member]?.trim())
                        ? "bg-blue-700 hover:bg-blue-800 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!selectedMembers?.every(member => ages[member]?.trim())}
                onClick={handleContinue}
            >
                Continue
            </button>

            {/* Top right actions */}
            </div>
        </div>
    );
}
