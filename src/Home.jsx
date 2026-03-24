import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/headers/Header';
import PolicySuggestList from './components/term insurance/PolicySuggestList';
import Footer from './components/Footer';
import ConfirmationModal from './components/term insurance/ConfirmationModal';

const Home = () => {
  const location = useLocation();
  const { formData, submissionId, submittedAt } = location.state || {};

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Yes': { color: 'bg-red-100 text-red-800', label: 'Yes' },
      'No': { color: 'bg-green-100 text-green-800', label: 'No' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <>
      <Header formData={formData}/>
      <PolicySuggestList/>
      <Footer/>
      {/* <ConfirmationModal/> */}
    </>
  );
};

export default Home;    