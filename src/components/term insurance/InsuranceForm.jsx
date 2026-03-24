import React from 'react';

const InsuranceForm = ({ formData, updateFormData, errors, onNext }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleGenderChange = (gender) => {
    updateFormData('gender', gender);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="text-center w-[500px]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 md:p-7 rounded-2xl shadow-lg w-full mt-14"
      >
        {/* Gender Selection */}
        <div className="flex gap-5 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={() => handleGenderChange('male')}
              className="hidden"
            />
            <div
              className={`w-5 h-5 border-2 border-gray-300 rounded-full relative cursor-pointer transition-colors flex items-center justify-center ${
                formData.gender === 'male' ? 'border-primary' : ''
              }`}
            >
              {formData.gender === 'male' && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </div>
            Male
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={() => handleGenderChange('female')}
              className="hidden"
            />
            <div
              className={`w-5 h-5 border-2 border-gray-300 rounded-full relative cursor-pointer transition-colors flex items-center justify-center ${
                formData.gender === 'female' ? 'border-primary' : ''
              }`}
            >
              {formData.gender === 'female' && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </div>
            Female
          </label>
        </div>

        {/* Input Fields */}
        <div className="mb-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={`w-full p-2 md:p-3 border rounded-lg text-base md:text-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1 text-left">{errors.name}</p>}
        </div>

        <div className="mb-6">
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of birth(DD/MM/YYYY)"
            className={`w-full p-2 md:p-3 border rounded-lg text-base md:text-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
              errors.dateOfBirth ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1 text-left">{errors.dateOfBirth}</p>}
        </div>

        <div className="mb-6">
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile number"
            className={`w-full p-2 md:p-3 border rounded-lg text-base md:text-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
              errors.mobileNumber ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
            value={formData.mobileNumber}
            onChange={handleInputChange}
            required
          />
          {errors.mobileNumber && <p className="text-red-500 text-sm mt-1 text-left">{errors.mobileNumber}</p>}
        </div>

        {/* Call to Action Button */}
        <button
          type="submit"
          className="w-full p-2 md:p-3 bg-primary text-white border-none rounded-lg text-base md:text-lg font-bold cursor-pointer hover:bg-primaryDark transition-colors text-xl"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default InsuranceForm;