import React, { createContext, useContext, useState, useEffect } from 'react';

const UserDataContext = createContext();

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('userFormData');
    if (savedUserData) {
      try {
        setUserData(JSON.parse(savedUserData));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('userFormData');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user data to localStorage whenever it changes
  const updateUserData = (newData) => {
    setUserData(newData);
    if (newData) {
      localStorage.setItem('userFormData', JSON.stringify(newData));
    } else {
      localStorage.removeItem('userFormData');
    }
  };

  // Clear user data
  const clearUserData = () => {
    setUserData(null);
    localStorage.removeItem('userFormData');
  };

  const value = {
    userData,
    updateUserData,
    clearUserData,
    isLoading,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}; 