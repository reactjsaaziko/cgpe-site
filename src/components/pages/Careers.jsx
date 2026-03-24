import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';
import API_CONFIG from '../../config/api';
import c1 from '../assets/c1.png';
import c2 from '../assets/c2.png';
import c3 from '../assets/c3.png';
import c4 from '../assets/c4.png';
import c5 from '../assets/c5.png';
import c6 from '../assets/c6.png';
import cr1 from '../assets/cr1.png';
import cr2 from '../assets/cr2.png';
import cr3 from '../assets/cr3.png';
import cr4 from '../assets/cr4.png';
import cr5 from '../assets/cr5.png';
import cr6 from '../assets/cr6.png';
import cr7 from '../assets/cr7.png';
import cr8 from '../assets/cr8.png';
import cr9 from '../assets/cr9.png';
import cr10 from '../assets/cr10.png';
import cr11 from '../assets/cr11.png';
import cr12 from '../assets/cr12.png';
import cee1 from '../assets/cee1.png';
import cee2 from '../assets/cee2.png';
import cee3 from '../assets/cee3.png';

const Careers = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [expandedLocations, setExpandedLocations] = useState({
    surat: true,
    mumbai: false,
    ahmedabad: false
  });
  const [showResumeForm, setShowResumeForm] = useState(false);
  const [resumeFormData, setResumeFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [selectedMapKey, setSelectedMapKey] = useState('surat_all');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const toggleLocation = (location) => {
    setExpandedLocations(prev => {
      // If clicking the same location, toggle it
      if (prev[location]) {
        return {
          ...prev,
          [location]: false
        };
      }
      // If clicking a different location, close all others and open the clicked one
      return {
        surat: location === 'surat',
        mumbai: location === 'mumbai',
        ahmedabad: location === 'ahmedabad'
      };
    });

    // Update default selected map per location
    if (location === 'surat') {
      setSelectedMapKey('surat_all');
    } else if (location === 'mumbai') {
      setSelectedMapKey('mumbai');
    } else if (location === 'ahmedabad') {
      setSelectedMapKey('ahmedabad');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!resumeFormData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!resumeFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(resumeFormData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!resumeFormData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(resumeFormData.mobile.replace(/\s/g, ''))) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!resumeFormData.resume) {
      errors.resume = 'Please select a resume file';
    } else if (resumeFormData.resume.size > 5 * 1024 * 1024) { // 5MB limit
      errors.resume = 'File size should be less than 5MB';
    }
    
    return errors;
  };

  const handleResumeFormChange = (e) => {
    const { name, value, files } = e.target;
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (name === 'resume') {
      setResumeFormData(prev => ({
        ...prev,
        resume: files[0]
      }));
    } else {
      setResumeFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', resumeFormData.name);
      formData.append('email', resumeFormData.email);
      formData.append('mobile', resumeFormData.mobile);
      formData.append('resume', resumeFormData.resume);
      
      // Send data to backend API
      const apiUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CAREERS.SUBMIT_RESUME}`;
      console.log('Submitting resume to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });
      
      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response result:', result);
      
      if (response.ok) {
        // Success - reset form and close modal
        setResumeFormData({
          name: '',
          email: '',
          mobile: '',
          resume: null
        });
        setFormErrors({});
        setShowResumeForm(false);
        
        // Show success message
        alert(result.message || 'Resume submitted successfully! We will get back to you soon.');
      } else {
        // Handle validation errors from backend
        if (result.errors) {
          setFormErrors(result.errors);
        } else {
          alert(result.message || 'Error submitting resume. Please try again.');
        }
      }
      
    } catch (error) {
      console.error('Error submitting resume:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeResumeForm = () => {
    if (isSubmitting) {
      return; // Prevent closing while submitting
    }
    setShowResumeForm(false);
    setResumeFormData({
      name: '',
      email: '',
      mobile: '',
      resume: null
    });
    setFormErrors({});
  };

  // Function to get the correct map URL for each selection
  const getMapUrl = (mapKey) => {
    switch (mapKey) {
      case 'surat_all':
        // Both Surat addresses highlighted
        return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50!2d72.8313!3d21.1702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0x6c6ef1c2d4b38226!2sSumul%20Dairy%20Road%2C%20Katargam%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890&markers=color:red%7Clabel:PA%7C21.1701,72.8312&markers=color:blue%7Clabel:AT%7C21.1704,72.8315";
      case 'surat_pa':
        // 9, Parisaor Apartment
        return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50!2d72.8312!3d21.1701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0x6c6ef1c2d4b38226!2sParisaor%20Apartment%2C%20Sumul%20Dairy%20Road%2C%20Katargam%2C%20Surat!5e0!3m2!1sen!2sin!4v1234567891";
      case 'surat_at':
        // Basement-1, Alokik Tower
        return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50!2d72.8315!3d21.1704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0x6c6ef1c2d4b38226!2sAlokik%20Tower%2C%20Sumul%20Dairy%20Road%2C%20Katargam%2C%20Surat!5e0!3m2!1sen!2sin!4v1234567892";
      case 'mumbai':
        return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50!2d72.8775!3d19.0758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da8edc28bcf315c!2sRustom%20Eazone%2C%20Sundar%20Nagar%2C%20Malad%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890&markers=color:red%7Clabel:RE%7C19.0758,72.8775";
      case 'ahmedabad':
        return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50!2d72.5712!3d23.0223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd3a3%3A0x4fcedd11614f9a87!2sRatnakar%20Nine%20Square%2C%20Mansi%20Road%2C%20Vastrapur%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890&markers=color:red%7Clabel:RN%7C23.0223,72.5712";
      default:
        return "";
    }
  };

  const faqData = [
    {
      question: "Please tell us some things about yourself?",
      answer: "I am a results-driven professional with over 5 years of experience in the insurance and financial services industry. I hold a degree in Business Administration and have specialized in customer relationship management and sales operations. My key strengths include strong analytical skills, excellent communication abilities, and a proven track record of exceeding targets. I am passionate about helping clients find the right insurance solutions and have consistently achieved top performance ratings in my previous roles. I believe in continuous learning and staying updated with industry trends to provide the best service to clients."
    },
    {
      question: "Why do you want this job?",
      answer: "I am seeking this position because it represents the perfect alignment of my professional experience and career aspirations. Having worked in the insurance sector, I understand the importance of building trust with clients and providing comprehensive solutions. This role offers the opportunity to work with a reputable company like CG Patel, where I can leverage my expertise in client relations and insurance products. I am particularly excited about the growth opportunities and the chance to contribute to the company's mission of providing excellent financial protection to families and businesses. The position also allows me to develop new skills while making a meaningful impact in people's lives."
    },
    {
      question: "Why are you interested in this profile?",
      answer: "This profile interests me because it combines client-facing responsibilities with strategic business development, which aligns perfectly with my career goals. I am particularly drawn to the opportunity to work with diverse clients, understand their unique needs, and provide tailored insurance solutions. The role offers exposure to various insurance products and the chance to build long-term relationships with clients. I am excited about the learning opportunities, including staying updated with the latest insurance regulations and market trends. Additionally, the performance-based incentives and career progression opportunities make this an attractive long-term career path."
    },
    {
      question: "What are your weaknesses and strengths?",
      answer: "My key strengths include excellent communication skills, strong analytical thinking, and the ability to build rapport with clients quickly. I am detail-oriented, which helps me understand complex insurance policies and explain them clearly to clients. I have a proven track record of meeting and exceeding sales targets, and I work well both independently and in team environments. As for weaknesses, I sometimes spend extra time ensuring every detail is perfect, which can occasionally slow down my pace. However, I've learned to balance thoroughness with efficiency by setting clear priorities and deadlines. I continuously work on improving my time management skills and have developed systems to maintain quality while meeting deadlines."
    },
    {
      question: "Tell me any challenge or conflict you faced at work, and how you dealt with it?",
      answer: "In my previous role, I faced a challenging situation where a client was dissatisfied with their insurance claim process and was considering switching providers. The client was frustrated due to delays and lack of communication from our claims department. I addressed this by first listening empathetically to understand their concerns completely. Then, I took ownership of the situation by personally following up with the claims team, providing regular updates to the client, and expediting their claim resolution. I also implemented a better communication system to prevent similar issues. Through proactive communication and problem-solving, I not only resolved the immediate issue but also strengthened the client relationship. The client appreciated my dedication and remained with our company, even referring new clients to us."
    },
    {
      question: "Why do you want to work with CG Patel?",
      answer: "I want to work with CG Patel because of the company's strong reputation in the insurance industry and its commitment to customer-centric service. CG Patel has established itself as a trusted name in providing comprehensive insurance solutions, and I am impressed by the company's values of integrity, excellence, and innovation. The company's focus on employee development and growth opportunities aligns with my career aspirations. I am excited about the chance to be part of a team that values performance and provides the resources needed to succeed. Additionally, CG Patel's diverse product portfolio and commitment to staying ahead of market trends make it an ideal place to grow professionally while making a positive impact on clients' financial security."
    }
  ];

  const careerBenefits = [
    {
      id: 1,
      title: "Respect for performance",
      description: "We value excellence and recognize outstanding achievements across all levels.",
      icon: (
        <img
          src={c1}
          alt="Respect for performance"
          className="w-8 h-8 object-contain"
        />
      )
    },
    {
      id: 2,
      title: "Research for solutions & innovation",
      description: "Continuous learning and innovative thinking drive our success forward.",
      icon: (
        <img
        src={c2}
        alt="Respect for performance"
        className="w-8 h-8 object-contain"
      />
      )
    },
    {
      id: 3,
      title: "Fast track growth paths",
      description: "Clear career progression with opportunities for rapid professional development.",
      icon: (
        <img
        src={c3}
        alt="Respect for performance"
        className="w-8 h-8 object-contain"
      />
      )
    },
    {
      id: 4,
      title: "Empowerment teams for quick decisions",
      description: "Autonomous teams with decision-making authority to move fast and efficiently.",
      icon: (
        <img
        src={c1}
        alt="Respect for performance"
        className="w-8 h-8 object-contain"
      />
      )
    },
    {
      id: 5,
      title: "Competitive compensation packages",
      description: "Attractive salary packages with performance bonuses and benefits.",
      icon: (
        <img
        src={c2}
        alt="Respect for performance"
        className="w-8 h-8 object-contain"
      />
      )
    },
    {
      id: 6,
      title: "Flexible leave and vacation policy",
      description: "Work-life balance with generous time off and flexible working arrangements.",
      icon: (
        <img
        src={c3}
        alt="Respect for performance"
        className="w-8 h-8 object-contain"
      />
      )
    },
    {
      id: 7,
      title: "Open door policy & flat hierarchy",
      description: "Direct access to leadership and minimal bureaucracy for faster execution.",
      icon: (
        <img
        src={c4}
        alt="Respect for performance"
        className="w-8 h-8 object-contain"
      />
      )
    },
    {
      id: 8,
      title: "Work with friends, not colleagues",
      description: "Collaborative environment fostering genuine relationships and teamwork.",
      icon: (
        <img
        src={c5}
        alt="Respect for performance"
        className="w-8 h-8 object-contain"
      />
      )
    },
    {
      id: 9,
      title: "Friday dressing through the week",
      description: "Relaxed dress code promoting comfort and personal expression.",
      icon: (
        <img
        src={c6}
        alt="Respect for performance"
        className="w-8 h-8 object-contain"
      />
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <CGPEHeader />
      {/* Header Section with Stacked Hands Background */}
      <div className="relative bg-gradient-to-r from-gray-800 py-20 to-gray-900 text-white">
        {/* Background Image - Stacked Hands */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/images/bkcareer.png')`
          }}
        ></div>
        
        {/* Content Overlay */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Join our team
          </h1>
          <p className="text-2xl md:text-4xl font-bold mb-6 text-blue-300">
            Work hard, have fun & make history!
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Be part of something extraordinary. Build the future with a team that values innovation, growth, and making a real impact.
          </p>
        </div>
      </div>

      {/* Benefits Grid Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careerBenefits.map((benefit, index) => (
            <div 
              key={benefit.id}
              className="bg-white rounded-lg p-8 shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Section: Post Your Resume & Benefits */}
      <div className="bg-gray-50 py-16">
        {/* Post Your Resume Section */}
        <div className="text-white py-16" style={{ backgroundColor: '#253858' }}>
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don't see a Job Opening which interests you?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-200">
              Don't sweat it! Mail us your resume & tell us about your dream role. We'll get in touch once we have a suitable opening.
            </p>
            <button 
              onClick={() => setShowResumeForm(true)}
              className="bg-blue-400 hover:bg-blue-500 text-blue-900 font-semibold py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105"
            >
              Post Your Resume
            </button>
          </div>
        </div>

        {/* Benefits of Working With Us Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Benefit Of Working With US
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Unlimited Incentives */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center mr-4">
                  <img src={cr6} alt="Unlimited Incentives" className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Unlimited Incentives</h3>
              </div>
            </div>

            {/* Car Lease */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center mr-4">
                  <img src={cr2} alt="Car Lease" className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Car Lease</h3>
              </div>
            </div>

            {/* Insurance Cover */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center mr-4">
                  <img src={cr8} alt="Insurance Cover" className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Insurance Cover</h3>
              </div>
            </div>

            {/* EAP */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center mr-4">
                  <img src={cr9} alt="EAP" className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">EAP</h3>
              </div>
            </div>

            {/* Mobile Policy */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center mr-4">
                  <img src={cr7} alt="Mobile Policy" className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Mobile Policy</h3>
              </div>
            </div>

            {/* Creche Facility */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center mr-4">
                  <img src={cr10} alt="Creche Facility" className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Creche Facility</h3>
              </div>
            </div>

            {/* Maternity Benefit */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center mr-4">
                  <img src={cr3} alt="Maternity Benefit" className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Maternity Benefit</h3>
              </div>
            </div>

            {/* Gym Facility */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center mr-4">
                  <img src={cr12} alt="Gym Facility" className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Gym Facility</h3>
              </div>
            </div>

            {/* Equal Employment Opportunity */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center text-left">
                <div className="w-12 h-12 flex items-center justify-center mr-4">
                  <img src={cr1} alt="Equal Employment Opportunity" className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Equal Employment Opportunity</h3>
              </div>
            </div>

            {/* SEED */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center mr-4">
                  <img src={cr2} alt="SEED" className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-start text-left">
                  <h3 className="text-lg font-semibold text-gray-800">SEED</h3>
                  <span className="text-xs text-gray-600 mt-1">(Skill Enhancement and Employee Development)</span>
                </div>
              </div>
            </div>

            {/* LEAP */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center mr-4">
                  <img src={cr4} alt="SEED" className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-start text-left">
                  <h3 className="text-lg font-semibold text-gray-800">SEED</h3>
                  <span className="text-xs text-gray-600 mt-1">(Level Enhancement and Accreditation Program)</span>
                </div>
              </div>
            </div>

            {/* JAG */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center mr-4">
                  <img src={cr11} alt="SEED" className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-start text-left">
                  <h3 className="text-lg font-semibold text-gray-800">SEED</h3>
                  <span className="text-xs text-gray-600 mt-1">(Jeeto Apna Ghar)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Even more reasons to join us Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-left mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Even more reasons to join us
            </h2>
            <div className="w-24 h-1 bg-blue-600"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Unlock success */}
            <div className="text-left">
              <div className="mb-6 flex justify-start">
                <div className="w-20 h-20 flex items-center justify-center">
                  <img src={cee1} alt="Unlock success" className="w-auto h-auto" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Unlock success
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We support your growth by creating a fast and flexible workspace. This is why over 80% of our subject matter experts and team leaders have got promotions internally.
              </p>
            </div>

            {/* Work hard, play harder */}
            <div className="text-left">
              <div className="mb-6 flex justify-start">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img src={cee2} alt="Work hard, play harder" className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Work hard, play harder
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our focus on work-life balance drives happiness and productivity. We keep our employees engaged with activities like Talent Hunt, and internal tournaments for cricket, football, and table tennis.
              </p>
            </div>

            {/* Get the career edge you need */}
            <div className="text-left">
              <div className="mb-6 flex justify-start">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img src={cee3} alt="Get the career edge you need" className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Get the career edge you need
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Gain a competitive advantage over your peers by joining India's top Insurtech with over 90% of the online insurance market share. Hone your skills by learning from the best of the best.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              FAQ's in CG Patel
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                >
                  <span className="text-gray-700 font-medium pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
            
      {/* Currently Hiring Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
              Currently hiring for
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Location List - Left Side */}
            <div className="space-y-4">
              {/* Surat - Dropdown */}
              <div className="bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                <button 
                  onClick={() => toggleLocation('surat')}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {expandedLocations.surat ? '−' : '+'}
                      </div>
                      <h3 className="text-xl font-bold text-blue-800">Surat</h3>
                    </div>
                  </div>
                </button>
                {expandedLocations.surat && (
                  <div className="px-6 pb-6">
                    <div className="space-y-2 text-blue-800">
                      <button
                        type="button"
                        onClick={() => setSelectedMapKey('surat_pa')}
                        className={`text-left text-sm w-full hover:underline ${selectedMapKey==='surat_pa' ? 'font-semibold text-blue-700' : ''}`}
                      >
                        9, Parisaor Apartment, Sumul Dairy Road, Katargam, Surat, 395003
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedMapKey('surat_at')}
                        className={`text-left text-sm w-full hover:underline ${selectedMapKey==='surat_at' ? 'font-semibold text-blue-700' : ''}`}
                      >
                        Basement-1, Alokik Tower, Sumul Dairy Road, Katargam, Surat, 395003
                      </button>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      {/* Map Legend */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs font-medium text-gray-600 mb-2">Perfect Location Markers:</p>
                        <div className="flex items-center space-x-3 text-xs">
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-gray-600">PA - Parisaor Apartment (Perfect)</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600">AT - Alokik Tower (Perfect Building)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mumbai - Dropdown */}
              <div className="bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                <button 
                  onClick={() => toggleLocation('mumbai')}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {expandedLocations.mumbai ? '−' : '+'}
                      </div>
                      <h3 className="text-xl font-bold text-blue-800">Mumbai</h3>
                    </div>
                  </div>
                </button>
                {expandedLocations.mumbai && (
                  <div className="px-6 pb-6">
                    <div className="space-y-2 text-blue-800">
                      <button
                        type="button"
                        onClick={() => setSelectedMapKey('mumbai')}
                        className={`text-left text-sm w-full hover:underline ${selectedMapKey==='mumbai' ? 'font-semibold text-blue-700' : ''}`}
                      >
                        2066, Rustom Eazone, Sundar Nagar, Malad West, Mumbai, Maharashtra, 400064
                      </button>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      {/* Map Legend */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs font-medium text-gray-600 mb-2">Perfect Location Markers:</p>
                        <div className="flex items-center space-x-3 text-xs">
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-gray-600">RE - Rustom Eazone (Perfect Building)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Ahmedabad - Dropdown */}
              <div className="bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                <button 
                  onClick={() => toggleLocation('ahmedabad')}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {expandedLocations.ahmedabad ? '−' : '+'}
                      </div>
                      <h3 className="text-xl font-bold text-blue-800">Ahmedabad</h3>
                    </div>
                  </div>
                </button>
                {expandedLocations.ahmedabad && (
                  <div className="px-6 pb-6">
                    <div className="space-y-2 text-blue-800">
                      <button
                        type="button"
                        onClick={() => setSelectedMapKey('ahmedabad')}
                        className={`text-left text-sm w-full hover:underline ${selectedMapKey==='ahmedabad' ? 'font-semibold text-blue-700' : ''}`}
                      >
                        A-406, Ratnakar Nine Square, Opp. ITC Narmada, Mansi Road, Vastrapur, Ahmedabad, 380025
                      </button>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      {/* Map Legend */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs font-medium text-gray-600 mb-2">Perfect Location Markers:</p>
                        <div className="flex items-center space-x-3 text-xs">
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-gray-600">RN - Ratnakar Nine Square (Perfect Building)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map - Right Side */}
            <div className="relative">
              <div className="w-full h-80 bg-white rounded-lg relative overflow-hidden">
                {(expandedLocations.surat || expandedLocations.mumbai || expandedLocations.ahmedabad) ? (
                  <iframe
                    src={getMapUrl(selectedMapKey)}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Selected Location Map"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center text-gray-500">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-lg font-medium">Select a location to view on map</p>
                      <p className="text-sm">Click on any city above to see its location</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Form Modal */}
      {showResumeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeResumeForm}>
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Submit Your Resume
              </h2>
              <button
                onClick={closeResumeForm}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Please ensure your resume is in PDF format and under 5MB. 
                We'll review your application and get back to you soon.
              </p>
            </div>
            
            <form onSubmit={handleResumeSubmit} className="space-y-4">
                              <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={resumeFormData.name}
                    onChange={handleResumeFormChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>
                              <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={resumeFormData.email}
                    onChange={handleResumeFormChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>
                              <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={resumeFormData.mobile}
                    onChange={handleResumeFormChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.mobile ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your 10-digit mobile number"
                  />
                  {formErrors.mobile && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.mobile}</p>
                  )}
                </div>
                              <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                    Resume (Multiple formats) *
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx,.txt,.html,.rtf,.jpg,.jpeg,.png,.gif"
                    onChange={handleResumeFormChange}
                    required
                    className={`block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                      formErrors.resume ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.resume && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.resume}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Maximum file size: 5MB</p>
                  {resumeFormData.resume && (
                    <p className="text-xs text-blue-600 mt-1">
                      Selected: {resumeFormData.resume.name}
                    </p>
                  )}
                </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Resume'
                  )}
                </button>
                <button
                  type="button"
                  onClick={closeResumeForm}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
                >
                  Cancel 
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Careers;
