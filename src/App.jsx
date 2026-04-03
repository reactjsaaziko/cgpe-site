import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { InvestmentProvider } from './context/InvestmentContext';
import { UserDataProvider } from './context/UserDataContext';
import { LanguageProvider } from './context/LanguageContext';
import ImagePreloader from './components/common/ImagePreloader';
import PerformanceMonitor from './components/common/PerformanceMonitor';
import './index.css';

// Loading component for lazy-loaded routes
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="text-gray-600 text-sm">Loading...</p>
    </div>
  </div>
);

// Critical components that should load immediately (home page and main navigation)
import InformationPage from './components/Informationpage/Informationpage';

// Lazy load all other components for better performance
const Home = React.lazy(() => import('./Home'));
const ConfirmationModal = React.lazy(() => import('./components/term insurance/ConfirmationModal'));
const InsuranceLanding = React.lazy(() => import('./components/pages/InsuranceLanding'));
const Generalform = React.lazy(() => import('./components/term insurance/Generalform'));

// Health Insurance Components
const GenderSelectScreenHI = React.lazy(() => import('./components/health insurance/GenderselectscreenHI'));
const SelectFamilyMembersHI = React.lazy(() => import('./components/health insurance/SelectfamilymemberHI'));
const SelectAgeHI = React.lazy(() => import('./components/health insurance/SelectageHI'));
const SelectCityHI = React.lazy(() => import('./components/health insurance/SelectcityHI'));
const EnterMobileNumberHI = React.lazy(() => import('./components/health insurance/EntermobilenumberHI'));
const MedicalHistoryHI = React.lazy(() => import('./components/health insurance/MedicalhistoryHI'));
const MedicalHistoryGrid2HI = React.lazy(() => import('./components/health insurance/Medicalhistorygrid2Hi'));
const PlanlistHI = React.lazy(() => import('./components/health insurance/PlanlistHI'));
const PlanDetailsHI = React.lazy(() => import('./components/health insurance/PlanDetailsHI'));
const ProposerDetailsHI = React.lazy(() => import('./components/health insurance/ProposerDetailsHI'));
const MedicalQuestionsHI = React.lazy(() => import('./components/health insurance/MedicalQuestionsHI'));
const NomineeDetailsHI = React.lazy(() => import('./components/health insurance/NomineeDetailsHI'));

// Family Health Insurance Components
const GenderSelectScreenFHI = React.lazy(() => import('./components/Family health insurance/GenderselectionFHI'));
const SelectFamilyMembersFHI = React.lazy(() => import('./components/Family health insurance/SelectfamilymemberFHI'));
const SelectAgeFHI = React.lazy(() => import('./components/Family health insurance/SelectageFHI'));
const SelectCityFHI = React.lazy(() => import('./components/Family health insurance/SelectcityFHI'));
const EnterMobileNumberFHI = React.lazy(() => import('./components/Family health insurance/EntermobilenumberFHI'));
const MedicalHistoryFHI = React.lazy(() => import('./components/Family health insurance/Familymembermadicalhistort'));
const MedicalHistortFHI = React.lazy(() => import('./components/Family health insurance/MedicalhistortFHI'));
const PlansListFHI = React.lazy(() => import('./components/Family health insurance/PlanlistFHI'));
const PlanDetailFHI = React.lazy(() => import('./components/Family health insurance/PlandetailFHI'));
const ProposerDetailsFHI = React.lazy(() => import('./components/Family health insurance/ProposerDetailsFHI'));
const MedicalQuestionsFHI = React.lazy(() => import('./components/Family health insurance/MedicalquestionFHI'));
const NomineeDetailsFHI = React.lazy(() => import('./components/Family health insurance/NommoniedetailFHI'));
const OfficeInsuranceQuestion = React.lazy(() => import('./components/Family health insurance/OfficeInsuranceQuestion'));

// Car Insurance Components
const MotorRenewal = React.lazy(() => import('./components/car insurance/MotorRenewal'));
const PolicyComparison = React.lazy(() => import('./components/car insurance/PolicyComparison'));
const PolicySummary = React.lazy(() => import('./components/car insurance/PolicySummary'));
const PaymentPage = React.lazy(() => import('./components/car insurance/PaymentPage'));

// Bike Insurance Components
const BikeRenewal = React.lazy(() => import('./components/bike insurance/BikeRenewal'));
const PolicySuggestion = React.lazy(() => import('./components/bike insurance/PolicySuggestion'));
const BikeInsuranceDetails = React.lazy(() => import('./components/bike insurance/BikeInsuranceDetails'));

// Travel Insurance Components
const TravelInsuranceStep1 = React.lazy(() => import('./components/Travel insurance/Travelinsurancestep1'));
const TravelPolicySuggestions = React.lazy(() => import('./components/Travel insurance/TravelPolicySuggestions'));
const TravelPersonalDetails = React.lazy(() => import('./components/Travel insurance/TravelPersonalDetails'));

// Women Insurance Components
const TWImaincontent = React.lazy(() => import('./components/term women insurance/TWImaincontent'));
const TWIPolicy = React.lazy(() => import('./components/term women insurance/TWIPolicy'));

// Investment Components
const InvestmentLanding = React.lazy(() => import('./components/investment plans/InvestmentLanding'));
const InvestmentPlansDetails = React.lazy(() => import('./components/investment plans/InvestmentPlansDetails'));
const InvestmentPlanConfig = React.lazy(() => import('./components/investment plans/InvestmentPlanConfig'));
const ReviewDetails = React.lazy(() => import('./components/investment plans/ReviewDetails'));

// Free of Cost Term Components
const FOCTInsurance = React.lazy(() => import('./components/free of cost term/FOCTInsurance'));
const FOCTPolicy = React.lazy(() => import('./components/free of cost term/FOCTPolicy'));

// Guaranteed Returns Components
const GRPLanding = React.lazy(() => import('./components/guaranted returns plan/GRPLanding'));
const GRPLPlans = React.lazy(() => import('./components/guaranted returns plan/GRPLPlans'));
const GRPLPlanconfig = React.lazy(() => import('./components/guaranted returns plan/GRPLPlanconfig'));
const GRPLReviewdetail = React.lazy(() => import('./components/guaranted returns plan/GRPLReviewdetail'));

// Child Saving Insurance Components
const ChildSavingInsurance = React.lazy(() => import('./components/Child saving insurance/ChildSavingInsurance'));
const CSIPolicy = React.lazy(() => import('./components/Child saving insurance/CSIPolicy'));
const CSIPlanconfig = React.lazy(() => import('./components/Child saving insurance/CSIPlanconfig'));
const CSIReviewDetails = React.lazy(() => import('./components/Child saving insurance/CSIReviewDetails'));
const CSIPaymentScreen = React.lazy(() => import('./components/Child saving insurance/CSIPaymentScreen'));

// Retirement Insurance Components
const RIFirst = React.lazy(() => import('./components/Retirement insurance/RIFirst'));
const RIPolicySuggestions = React.lazy(() => import('./components/Retirement insurance/RIPolicySuggestions'));
const RIPlanconfig = React.lazy(() => import('./components/Retirement insurance/RIPlanconfig'));
const RIReviewDetails = React.lazy(() => import('./components/Retirement insurance/RIReviewDetails'));

// Group Health Insurance Components
const GHInsurance = React.lazy(() => import('./components/Group health insurace/GHInsurance'));
const PolicySuggestions = React.lazy(() => import('./components/Group health insurace/GHPolicySuggestions'));
const GroupHealthPlanUpgrade = React.lazy(() => import('./components/Group health insurace/GroupHealthPlanUpgrade'));
const KnowYourExactPremium = React.lazy(() => import('./components/Group health insurace/KnowYourExactPremium'));

// Admin Components
const AdminLogin = React.lazy(() => import('./components/admin/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard'));

// Page Components
const TataAIAFortuneGuaranteePlus = React.lazy(() => import('./components/Informationpage/TataAIAFortuneGuaranteePlus'));
const AboutUs = React.lazy(() => import('./components/pages/AboutUs'));
const Sitemap = React.lazy(() => import('./components/pages/Sitemap'));
const ClaimAssistance = React.lazy(() => import('./components/pages/ClaimAssistance'));
const CallAssistance = React.lazy(() => import('./components/pages/CallAssistance'));
const Careers = React.lazy(() => import('./components/pages/Careers'));
const ContactUsPage = React.lazy(() => import('./components/pages/ContactUsPage'));
const ForAdviser = React.lazy(() => import('./components/pages/ForAdviser'));
const InsuranceServices = React.lazy(() => import('./components/pages/InsuranceServices'));
const FinancialAdvisory = React.lazy(() => import('./components/pages/FinancialAdvisory'));
const MutualFundsSIP = React.lazy(() => import('./components/pages/MutualFundsSIP'));
const OurServices = React.lazy(() => import('./components/pages/OurServices'));
const Awards = React.lazy(() => import('./components/pages/Awards'));
const Newsroom = React.lazy(() => import('./components/pages/Newsroom'));
const Events = React.lazy(() => import('./components/pages/Events'));
const KesariyaNavratri = React.lazy(() => import('./components/pages/KesariyaNavratri'));
const AnkitShahSession = React.lazy(() => import('./components/pages/AnkitShahSession'));
const AmitDaveSession = React.lazy(() => import('./components/pages/AmitDaveSession'));
const WhiteCoatWealthCircle = React.lazy(() => import('./components/pages/WhiteCoatWealthCircle'));
const WhatsAppQRDemo = React.lazy(() => import('./components/pages/WhatsAppQRDemo'));
const CGPEDoctorAdvisor = React.lazy(() => import('./components/pages/CGPEDoctorAdvisor'));
const DoctorConsultation = React.lazy(() => import('./components/pages/DoctorConsultation'));
const ComingSoon = React.lazy(() => import('./components/pages/ComingSoon'));
const ForCommunityHub = React.lazy(() => import('./components/pages/ForCommunityHub'));
const CommunityEventDetail = React.lazy(() => import('./components/pages/CommunityEventDetail'));
const CommunityKesariyaNavratri = React.lazy(() => import('./components/pages/CommunityKesariyaNavratri'));
const CommunityRishikeshSaptah = React.lazy(() => import('./components/pages/CommunityRishikeshSaptah'));
const CommunitySuratNavratri = React.lazy(() => import('./components/pages/CommunitySuratNavratri'));
const CommunitySilvaMeditation1 = React.lazy(() => import('./components/pages/CommunitySilvaMeditation1'));
const CommunitySilvaMeditation2 = React.lazy(() => import('./components/pages/CommunitySilvaMeditation2'));
const Saptah = React.lazy(() => import('./components/pages/Saptah'));





function App() {
  // Global error handler for media resources
  React.useEffect(() => {
    const handleMediaError = (event) => {
      console.warn('Media resource error:', {
        type: event.target.tagName,
        src: event.target.src,
        error: event.target.error
      });
    };

    // Add global error listeners for media elements
    document.addEventListener('error', handleMediaError, true);

    return () => {
      document.removeEventListener('error', handleMediaError, true);
    };
  }, []);

  // Preload critical components on idle time
  React.useEffect(() => {
    const preloadComponents = () => {
      // Preload commonly used components
      import('./components/term insurance/Generalform');
      import('./components/pages/AboutUs');
      import('./components/pages/OurServices');
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadComponents);
    } else {
      setTimeout(preloadComponents, 2000);
    }
  }, []);

  return (
    <InvestmentProvider>
      <UserDataProvider>
        <LanguageProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <ImagePreloader />
          <PerformanceMonitor />
          <Suspense fallback={<LoadingSpinner />}>
          <Routes>
          <Route path="/insurance" element={<Home />} />
          <Route path="/test" element={<InsuranceLanding />} />
          <Route path="/" element={<InformationPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/community" element={<ForCommunityHub />} />
          <Route path="/community/silva-meditation-session-1" element={<CommunitySilvaMeditation1 />} />
          <Route path="/community/silva-meditation-session-2" element={<CommunitySilvaMeditation2 />} />
          <Route path="/community/kesariya-navratri" element={<CommunityKesariyaNavratri />} />
          <Route path="/community/surat-ac-dome-navratri" element={<CommunitySuratNavratri />} />
          <Route path="/community/rishikesh-saptah" element={<Saptah />} />
          <Route path="/community/:eventId" element={<CommunityEventDetail />} />
          <Route path="/newsroom" element={<Events />} />
          <Route path="/events" element={<Events />} />
          <Route path="/kesariya-navratris" element={<KesariyaNavratri />} />
          <Route path="/ankit-shah-session" element={<AnkitShahSession />} />
          <Route path="/amit-dave-session" element={<AmitDaveSession />} />
          <Route path="/white-coat-wealth-circle" element={<WhiteCoatWealthCircle />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/information" element={<InformationPage />} />
          <Route path="/claim-assistance" element={<ClaimAssistance />} />
          <Route path="/call-assistance" element={<CallAssistance />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/for-advisor" element={<ForAdviser />} />
          <Route path="/services/insurance" element={<InsuranceServices />} />
          <Route path="/services/financial-planning" element={<FinancialAdvisory />} />
          <Route path="/register" element={<Generalform />} />
          <Route path="/confirmation" element={<ConfirmationModal />} />
          <Route path="/helthregister" element={<GenderSelectScreenHI />} />
          <Route path="/select-family-members" element={<SelectFamilyMembersHI />} />
          <Route path="/select-age" element={<SelectAgeHI />} />
          <Route path="/select-city" element={<SelectCityHI />} />
          <Route path="/enter-mobile" element={<EnterMobileNumberHI />} />
          <Route path="/medical-history" element={<MedicalHistoryHI />} />
          <Route path="/medical-history-grid2" element={<MedicalHistoryGrid2HI />} />
          <Route path="/plan-list" element={<PlanlistHI />} />
          <Route path="/plan-details" element={<PlanDetailsHI />} />
          <Route path="/proposer-details" element={<ProposerDetailsHI />} />
          <Route path="/medical-questions" element={<MedicalQuestionsHI />} />
          <Route path="/nominee-details" element={<NomineeDetailsHI />} />
          <Route path="/familyhealth-register" element={<GenderSelectScreenFHI />} />
          <Route path="/select-family-members-fhi" element={<SelectFamilyMembersFHI />} />
          <Route path="/select-age-fhi" element={<SelectAgeFHI />} />
          <Route path="/select-city-fhi" element={<SelectCityFHI />} />
          <Route path="/enter-mobile-fhi" element={<EnterMobileNumberFHI />} />
          <Route path="/medical-history-fhi" element={<MedicalHistoryFHI />} />
          <Route path="/medical-history-fhi-details" element={<MedicalHistortFHI />} />
          <Route path="/plan-list-fhi" element={<PlansListFHI />} />
          <Route path="/plan-details-fhi" element={<PlanDetailFHI />} />
          <Route path="/proposer-details-fhi" element={<ProposerDetailsFHI />} />
          <Route path="/medical-questions-fhi" element={<MedicalQuestionsFHI />} />
          <Route path="/nominee-details-fhi" element={<NomineeDetailsFHI />} />
          <Route path="/final-confirmation" element={<ConfirmationModal />} />
          <Route path="/office-insurance-question" element={<OfficeInsuranceQuestion />} />
          <Route path="/motor-renewal" element={<MotorRenewal />} />
          <Route path="/policy-comparison" element={<PolicyComparison />} />
          <Route path="/car-insurance/compare" element={<PolicyComparison />} />
          <Route path="/policy-summary" element={<PolicySummary />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/bike-renewal" element={<BikeRenewal />} />
          <Route path="/policy-suggestion" element={<PolicySuggestion />} />
          <Route path="/bike-insurance-details" element={<BikeInsuranceDetails />} />
          <Route path="/policy-details" element={<PolicySummary />} />
          <Route path="/travelinsurance" element={<TravelInsuranceStep1 />} />
          <Route path="/travel-policy-suggestions" element={<TravelPolicySuggestions />} />
          <Route path="/travel-personal-details" element={<TravelPersonalDetails />} />
          <Route path="/women-insurance" element={<TWImaincontent />} />
           <Route path="/twi-policy" element={<TWIPolicy />} />
          <Route path="/investment-landing" element={<InvestmentLanding />} />
          <Route path="/investment-plans-details" element={<InvestmentPlansDetails />} />
          <Route path="/investment-plan-config" element={<InvestmentPlanConfig />} />
          <Route path="/review-details" element={<ReviewDetails />} />
          <Route path="/free-term-plan" element={<FOCTInsurance />} />
          <Route path="/foct-policy" element={<FOCTPolicy />} />
          <Route path="/guaranteed-returns-plan" element={<GRPLanding />} />
          <Route path="/guaranteed-returns-plans" element={<GRPLPlans />} />
          <Route path="/guaranteed-returns-plan-config" element={<GRPLPlanconfig />} />
          <Route path="/guaranteed-returns-review" element={<GRPLReviewdetail />} />
          <Route path="/child-saving-insurance" element={<ChildSavingInsurance />} />
          <Route path="/child-saving-policy" element={<CSIPolicy />} />
          <Route path="/child-saving-plan-config" element={<CSIPlanconfig />} />
          <Route path="/child-saving-review-details" element={<CSIReviewDetails />} />
          <Route path="/csi-payment-screen" element={<CSIPaymentScreen />} />
          <Route path="/retirement-insurance" element={<RIFirst />} />
          <Route path="/retirement-policy-suggestions" element={<RIPolicySuggestions />} />
          <Route path="/retirement-plan-config" element={<RIPlanconfig />} />
          <Route path="/retirement-review-details" element={<RIReviewDetails />} />
          <Route path="/group-health-insurance" element={<GHInsurance />} />
          <Route path="/policy-suggestions" element={<PolicySuggestions />} />
          <Route path="/group-health-plan-upgrade" element={<GroupHealthPlanUpgrade />} />
          <Route path="/know-your-exact-premium" element={<KnowYourExactPremium />} />
          <Route path="/tata-aia-fortune-guarantee-plus" element={<TataAIAFortuneGuaranteePlus />} />
          <Route path="/mutual-funds-sip" element={<MutualFundsSIP />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/whatsapp-qr" element={<WhatsAppQRDemo />} />
          <Route path="/cgpe-doctor-advisor" element={<CGPEDoctorAdvisor />} />
          <Route path="/doctor-consultation" element={<DoctorConsultation />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Catch-all route - redirect unknown paths to home */}
          <Route path="*" element={<InformationPage />} />
        </Routes>
          </Suspense>
        </BrowserRouter>
        </LanguageProvider>
      </UserDataProvider>
    </InvestmentProvider>
  );
}

export default App;
  