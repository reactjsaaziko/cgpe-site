import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../context/UserDataContext.jsx';
import InsuranceForm from './InsuranceForm.jsx';
import hdfc from "../assets/Group8757.svg"
import OccupationForm from './Occuptionform.jsx';
import AnnualIncome from './Annualincome.jsx';
import QualificationForm from './Qualificationform.jsx';
import SmokeForm from './Smokeform.jsx';
import AlcoholForm from './Alcoholform.jsx';


const MainContent = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUserData();
  
  // Step state: 0 = InsuranceForm, 1 = OccupationForm, 2 = AnnualIncome, 3 = QualificationForm, 4 = SmokeForm, 5 = AlcoholForm
  const [step, setStep] = useState(0);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Insurance Form Data
    gender: 'male',
    name: '',
    dateOfBirth: '',
    mobileNumber: '',
    
    // Occupation Form Data
    occupation: 'Salaried',
    
    // Annual Income Data
    annualIncome: '15 Lac +',
    
    // Qualification Form Data
    qualification: 'College graduate & above',
    
    // Smoke Form Data
    smokingStatus: 'No',
    
    // Alcohol Form Data
    alcoholStatus: 'No'
  });

  // Validation state
  const [errors, setErrors] = useState({});
  
  // Loading and submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Update form data
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validation function
  const validateStep = (currentStep) => {
    const newErrors = {};

    switch (currentStep) {
      case 0: // Insurance Form
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
        }
        if (!formData.dateOfBirth.trim()) {
          newErrors.dateOfBirth = 'Date of birth is required';
        }
        if (!formData.mobileNumber.trim()) {
          newErrors.mobileNumber = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
          newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
        }
        break;
      
      case 1: // Occupation Form
        if (!formData.occupation) {
          newErrors.occupation = 'Please select your occupation';
        }
        break;
      
      case 2: // Annual Income
        if (!formData.annualIncome) {
          newErrors.annualIncome = 'Please select your annual income';
        }
        break;
      
      case 3: // Qualification Form
        if (!formData.qualification) {
          newErrors.qualification = 'Please select your qualification';
        }
        break;
      
      case 4: // Smoke Form
        if (!formData.smokingStatus) {
          newErrors.smokingStatus = 'Please select your smoking status';
        }
        break;
      
      case 5: // Alcohol Form
        if (!formData.alcoholStatus) {
          newErrors.alcoholStatus = 'Please select your alcohol consumption status';
        }
        break;
      
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler to go to next step
  const handleNext = async () => {
    if (validateStep(step)) {
      // On first step completion, create an admin inquiry with basic details
      if (step === 0) {
        try {
          await fetch('/api/inquiries/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              phone: formData.mobileNumber,
              inquiryType: 'insurance',
              subject: 'Term Insurance',
              message: `Lead from Term Insurance flow. Gender: ${formData.gender}, DOB: ${formData.dateOfBirth}`,
              source: 'website'
            })
          });
        } catch (e) {
          // Non-blocking: proceed even if logging inquiry fails
          console.error('Failed to create inquiry', e);
        }
      }

      if (step < 5) {
        setStep(prev => prev + 1);
      } else {
        // Final step - submit the form
        handleSubmit();
      }
    }
  };

  // Handler to go to previous step
  const handlePrev = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  // Final form submission
  const handleSubmit = async () => {
    if (validateStep(step)) {
      setIsSubmitting(true);
      setSubmitMessage('');
      
      try {
        // Simulate form submission (no API call)
        const mockResponse = {
          data: {
            id: `form-${Date.now()}`,
            submittedAt: new Date().toISOString()
          }
        };
        
        console.log('Form submitted successfully!', mockResponse);
        
        // Update user data in context for persistent header
        updateUserData(formData);
        
        // Navigate to Home page with form data
        navigate('/insurance', { 
          state: { 
            formData: formData,
            submissionId: mockResponse.data.id,
            submittedAt: mockResponse.data.submittedAt
          } 
        });
        
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitMessage(`Submission failed: ${error.message}. Please try again.`);
        setIsSubmitting(false);
      }
    }
  };

  // Render current step
  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <InsuranceForm 
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <OccupationForm 
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}  
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 2:
        return (
          <AnnualIncome 
            formData={formData}
            updateFormData={updateFormData}
            errors={errors} 
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 3:
        return (
          <QualificationForm 
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 4:
        return (
          <SmokeForm 
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 5:
        return (
          <AlcoholForm 
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            onNext={handleNext}
            onPrev={handlePrev}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex flex-col lg:flex-row max-w-6xl mx-auto px-5 py-10 gap-10 lg:gap-15 max-h-screen">
      <img
        src={hdfc}
        alt="Happy Indian Family"
        className="h-80 lg:h-96 object-contain rounded-2xl relative z-10 bg-white w-[700px] mt-20"
      />
 
      <div className="flex-1 max-w-md w-full w-[700px]">
        {renderCurrentStep()}
        
        {/* Submission message */}
        {submitMessage && (
          <div className={`mt-4 p-4 rounded-lg text-center ${
            submitMessage.includes('successfully') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {submitMessage}
          </div>
        )}
        
        {/* Progress indicator */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {[0, 1, 2, 3, 4, 5].map((stepNumber) => (
            <span
              key={stepNumber}
              className={`w-3 h-3 rounded-full inline-block ${
                stepNumber <= step ? 'bg-primary' : 'bg-gray-300'
              }`}
            ></span>
          ))}
        </div>
        
        <div className="text-sm text-gray-600 text-center leading-relaxed md:p-6">
          <p>Only certified cgpatel expert will assist you</p>
          <p>
            By clicking, you agree to our{' '}
            <a href="#" onClick={(e) => e.preventDefault()} className="text-primary hover:underline">Privacy policy</a>,{' '}
            <a href="#" onClick={(e) => e.preventDefault()} className="text-primary hover:underline">Terms of Use</a> &{' '}
            <a href="#" onClick={(e) => e.preventDefault()} className="text-primary hover:underline">Disclaimers</a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default MainContent; 

