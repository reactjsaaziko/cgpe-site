---
title: "Change Documentation — cgpe-site"
---

# Change Documentation — cgpe-site

> Auto-generated on every push, to any branch. Newest entry first. Old entries are never removed.

<!-- AAZIKO-CHANGELOG:INSERT-AFTER -->

## 2026-10-19 16:14 — branch `main`

### Overview

This push to branch `main` changed **2 file(s)**: 2 new, 0 modified, 0 removed (+457 / −0 lines).

Main areas touched: `.aaziko-flow` (1), `.github/workflows` (1).

### New files

#### `.aaziko-flow/changelog.mjs`

*New file — 347 lines*

- Defines: `sh`, `shSafe`, `git`, `esc`, `code`, `list`, `repo`, `declName`, `collect`, `minusSet` and 9 more.
- Uses: `node:child_process`, `node:fs`, `node:path`.
- Reads environment variables: `BEFORE_SHA`, `AFTER_SHA`, `BASE_BRANCH`, `BRANCH`.

**Other new files**

- `.github/workflows/aaziko-changelog.yml` — 110 lines

### Impact

- Code now reads `BEFORE_SHA` — make sure it is set in the `.env` / deployment.
- Code now reads `AFTER_SHA` — make sure it is set in the `.env` / deployment.
- Code now reads `BASE_BRANCH` — make sure it is set in the `.env` / deployment.
- Code now reads `BRANCH` — make sure it is set in the `.env` / deployment.
- Build/deploy configuration changed: `.github/workflows/aaziko-changelog.yml` — re-check the build and deployment.

---

<!-- AAZIKO-CHANGELOG:HISTORY-START -->

> **History before automatic documentation was switched on** — one entry per day of the `main` branch, newest first.

## 2026-09-26 — branch `main` (history)

### Overview

On this day, branch `main` received changes to **1 file(s)**: 1 new, 0 modified, 0 removed (+111 / −0 lines).

Main areas touched: `.github/workflows` (1).

### New files

**Other new files**

- `.github/workflows/backup-to-gitlab.yml` — 111 lines

### Impact

- Build/deploy configuration changed: `.github/workflows/backup-to-gitlab.yml` — re-check the build and deployment.

---

## 2026-04-03 — branch `main` (history)

### Overview

On this day, branch `main` received changes to **67 file(s)**: 62 new, 5 modified, 0 removed (+3099 / −7 lines).

Main areas touched: `src/assets` (28), `src/components/saptah` (24), `src/components/pages` (8), `src` (2), `src/components` (1), `src/components/community` (1).

### New files

#### `src/components/pages/CommunitySilvaMeditation2.jsx`

*New file — 239 lines*

- Defines: `CommunitySilvaMeditation2`, `togglePlay`, `toggleMute`.
- Uses: `react`, `react-router-dom`, `lucide-react`, `../headers/CGPEHeader`, `../Footer`, `../community/CommunityLanguageSelector`, `../../context/LanguageContext`, `../../lib/communityTranslations`, `../../assets/2024sm.mp4`, `../../assets/2024sm1.png`, `../../assets/2024sm2.png`, `../../assets/2024sm3.png`, `../../assets/2024sm4.png`, `../../assets/2024sm5.png`, `../../assets/2024sm6.png`, `../../assets/2024sm7.png`, `../../assets/2024sm8.png`, `../../assets/2024sm9.png`, `../../assets/2024sm10.jpeg`.

#### `src/components/pages/CommunitySilvaMeditation1.jsx`

*New file — 229 lines*

- Defines: `CommunitySilvaMeditation1`, `togglePlay`, `toggleMute`.
- Uses: `react`, `react-router-dom`, `lucide-react`, `../headers/CGPEHeader`, `../Footer`, `../community/CommunityLanguageSelector`, `../../context/LanguageContext`, `../../lib/communityTranslations`, `../../assets/2022sm1.png`, `../../assets/2022sm2.png`, `../../assets/2022sm.mp4`.

#### `src/lib/communityTranslations.js`

*New file — 206 lines*

- Defines: `t`.

#### `src/components/saptah/decorative.jsx`

*New file — 149 lines*

- Defines: `FloatingParticles`, `FloatingFlowers`, `FloatingDiyas`, `MandalaSVG`, `OmSymbol`, `PulsingOm`, `DiyaIcon`, `BellIcon`, `IncenseIcon`, `PeacockFeatherIcon`, `ConchIcon`, `LotusIcon`, `MarigoldIcon`, `GangaDivider`, `SanskritShloka`, `CornerFlourish`.
- Uses: `react`.

#### `src/components/pages/ForCommunityHub.jsx`

*New file — 137 lines*

- Defines: `ForCommunityHub`.
- Uses: `react`, `react-router-dom`, `lucide-react`, `../headers/CGPEHeader`, `../Footer`, `../../context/LanguageContext`, `../../lib/communityTranslations`, `../community/CommunityLanguageSelector`, `../../assets/silva-meditation-1.jpg`, `../../assets/silva-meditation-2.jpg`, `../../assets/kesariya-navratri.jpg`, `../../assets/rishikesh-saptah.jpg`.

#### `src/components/pages/CommunityEventDetail.jsx`

*New file — 128 lines*

- Defines: `CommunityEventDetail`.
- Uses: `react`, `react-router-dom`, `lucide-react`, `../headers/CGPEHeader`, `../Footer`, `../community/CommunityLanguageSelector`, `../../context/LanguageContext`, `../../lib/communityTranslations`, `../../assets/silva-meditation-1.jpg`, `../../assets/silva-meditation-2.jpg`, `../../assets/kesariya-navratri.jpg`.

#### `src/components/saptah/KathaGayakSection.jsx`

*New file — 108 lines*

- Defines: `KathaGayakSection`.
- Uses: `react`, `framer-motion`, `lucide-react`, `./shared`, `./decorative`, `./Ved-Vyas-tirth.jpg`.

#### `src/components/pages/CommunityKesariyaNavratri.jsx`

*New file — 105 lines*

- Defines: `CommunityKesariyaNavratri`.
- Uses: `react`, `react-router-dom`, `lucide-react`, `../headers/CGPEHeader`, `../Footer`, `../community/CommunityLanguageSelector`, `../../assets/kn1.png`, `../../assets/kn2\`, `../../assets/kn3.png`, `../../assets/kn4.png`, `../../assets/kn5.png`, `../../assets/kn6.png`, `../../assets/kn7.png`, `../../assets/kn.mp4`.

#### `src/components/saptah/AchievementSection.jsx`

*New file — 95 lines*

- Defines: `IconRow`, `AchievementSection`.
- Uses: `react`, `framer-motion`, `lucide-react`, `./decorative`.

#### `src/components/saptah/HeroSection.jsx`

*New file — 95 lines*

- Defines: `HeroSection`.
- Uses: `react`, `framer-motion`, `./decorative`.

#### `src/components/pages/CommunitySuratNavratri.jsx`

*New file — 94 lines*

- Defines: `CommunitySuratNavratri`.
- Uses: `react`, `react-router-dom`, `lucide-react`, `../headers/CGPEHeader`, `../Footer`, `../community/CommunityLanguageSelector`, `../../context/LanguageContext`, `../../lib/communityTranslations`, `../../assets/kn1.png`, `../../assets/kn2\`, `../../assets/kn3.png`, `../../assets/kn4.png`, `../../assets/kn5.png`, `../../assets/kn6.png`, `../../assets/kn7.png`, `../../assets/kn.mp4`.

#### `src/components/community/CommunityLanguageSelector.jsx`

*New file — 88 lines*

- Defines: `CommunityLanguageSelector`, `handleClick`.
- Uses: `react`, `lucide-react`, `../../context/LanguageContext`.

#### `src/components/saptah/PurposeSection.jsx`

*New file — 86 lines*

- Defines: `PurposeSection`.
- Uses: `react`, `framer-motion`, `./shared`, `./decorative`, `./saptah-invite-1.png`, `./saptah-invite-2.png`.

#### `src/components/pages/CommunityRishikeshSaptah.jsx`

*New file — 73 lines*

- Defines: `CommunityRishikeshSaptah`.
- Uses: `react`, `react-router-dom`, `lucide-react`, `../headers/CGPEHeader`, `../Footer`, `../community/CommunityLanguageSelector`, `../../assets/rishikesh-saptah.jpg`.

#### `src/components/saptah/GallerySection.jsx`

*New file — 65 lines*

- Defines: `GallerySection`.
- Uses: `react`, `framer-motion`, `./shared`, `./decorative`, `./satsang.jpg`, `./ganga-aarti.jpg`, `./bbb.jpg`, `./aaa.jpg`.

#### `src/components/saptah/WhyRishikesh.jsx`

*New file — 60 lines*

- Defines: `WhyRishikesh`.
- Uses: `react`, `framer-motion`, `./shared`, `./decorative`, `./rishikesh-ganga.jpg`, `./hero-rishikesh.jpg`.

#### `src/components/saptah/MessageSection.jsx`

*New file — 59 lines*

- Defines: `MessageSection`.
- Uses: `react`, `framer-motion`, `./shared`, `./decorative`.

#### `src/components/saptah/FamilySection.jsx`

*New file — 50 lines*

- Defines: `FamilySection`.
- Uses: `react`, `framer-motion`, `lucide-react`, `./shared`, `./decorative`.

#### `src/components/saptah/FinalCTA.jsx`

*New file — 47 lines*

- Defines: `FinalCTA`.
- Uses: `react`, `framer-motion`, `lucide-react`, `./shared`, `./decorative`.

#### `src/components/saptah/HighlightsSection.jsx`

*New file — 46 lines*

- Defines: `HighlightsSection`.
- Uses: `react`, `framer-motion`, `./shared`, `./decorative`.

#### `src/components/saptah/shared.jsx`

*New file — 30 lines*

- Defines: `staggerDelay`, `SectionLabel`, `SectionHeading`.
- Uses: `react`.

#### `src/context/LanguageContext.jsx`

*New file — 29 lines*

- Defines: `LanguageProvider`, `setLanguage`, `useLanguage`.
- Uses: `react`.

#### `src/components/saptah/SaptahFooter.jsx`

*New file — 14 lines*

- Defines: `SaptahFooter`.
- Uses: `react`.

**Other new files**

- `src/components/saptah/Saptah.css` — 419 lines
- `src/assets/2022sm.mp4` — binary file
- `src/assets/2022sm1.png` — binary file
- `src/assets/2022sm2.png` — binary file
- `src/assets/2024sm.mp4` — binary file
- `src/assets/2024sm1.png` — binary file
- `src/assets/2024sm10.jpeg` — binary file
- `src/assets/2024sm2.png` — binary file
- `src/assets/2024sm3.png` — binary file
- `src/assets/2024sm4.png` — binary file
- `src/assets/2024sm5.png` — binary file
- `src/assets/2024sm6.png` — binary file
- `src/assets/2024sm7.png` — binary file
- `src/assets/2024sm8.png` — binary file
- `src/assets/2024sm9.png` — binary file
- `src/assets/IMG-20260325-WA0052.jpg.jpeg` — binary file
- `src/assets/kesariya-navratri.jpg` — binary file
- `src/assets/kn.mp4` — binary file
- `src/assets/kn1.png` — binary file
- `src/assets/kn2'.png` — binary file
- `src/assets/kn3.png` — binary file
- `src/assets/kn4.png` — binary file
- `src/assets/kn5.png` — binary file
- `src/assets/kn6.png` — binary file
- `src/assets/kn7.png` — binary file
- `src/assets/rishikesh-saptah.jpg` — binary file
- `src/assets/silva-meditation-1.jpg` — binary file
- `src/assets/silva-meditation-2.jpg` — binary file
- `src/assets/websuite-logo.png` — binary file
- `src/components/saptah/34812441084_f4e546d439_b.jpg` — binary file
- `src/components/saptah/Ved-Vyas-tirth.jpg` — binary file
- `src/components/saptah/aaa.jpg` — binary file
- `src/components/saptah/bbb.jpg` — binary file
- `src/components/saptah/ganga-aarti.jpg` — binary file
- `src/components/saptah/hero-rishikesh.jpg` — binary file
- `src/components/saptah/rishikesh-ganga.jpg` — binary file
- `src/components/saptah/saptah-invite-1.png` — binary file
- `src/components/saptah/saptah-invite-2.png` — binary file
- `src/components/saptah/satsang.jpg` — binary file

### Changes to existing files

#### `src/App.jsx`

*Existing file, modified — +19 / −3 lines*

- Changed the code inside: `App`.
- Now also uses: `./context/LanguageContext`.

#### `src/components/headers/CGPEHeader.jsx`

*Existing file, modified — +2 / −2 lines*

- Changed the code inside: `CGPEHeader`.

#### `src/components/Footer.jsx`

*Existing file, modified — +1 / −1 lines*

- Changed the code inside: `Footer`.

#### `src/components/pages/Events.jsx`

*Existing file, modified — +1 / −1 lines*

- Changed the code inside: `Events`.

**Other modified files**

- `src/index.css` — +425 / −0 lines

### Impact

- `src/components/headers/CGPEHeader.jsx` is used by 31 other file(s): `src/components/Informationpage/Informationpage.jsx`, `src/components/Informationpage/TataAIAFortuneGuaranteePlus.jsx`, `src/components/pages/AboutUs.jsx`, `src/components/pages/AmitDaveSession.jsx`, `src/components/pages/AnkitShahSession.jsx`, `src/components/pages/Awards.jsx`, `src/components/pages/CGPEDoctorAdvisor.jsx`, `src/components/pages/Careers.jsx`, `src/components/pages/ComingSoon.jsx`, `src/components/pages/Community.jsx`, `src/components/pages/CommunityEventDetail.jsx`, `src/components/pages/CommunityKesariyaNavratri.jsx`, `src/components/pages/CommunityRishikeshSaptah.jsx`, `src/components/pages/CommunitySilvaMeditation1.jsx`, `src/components/pages/CommunitySilvaMeditation2.jsx`, `src/components/pages/CommunitySuratNavratri.jsx`, `src/components/pages/ContactUsPage.jsx`, `src/components/pages/DoctorConsultation.jsx`, `src/components/pages/Events.jsx`, `src/components/pages/FinancialAdvisory.jsx`, `src/components/pages/ForAdviser.jsx`, `src/components/pages/ForCommunityHub.jsx`, `src/components/pages/InsuranceLanding.jsx`, `src/components/pages/InsuranceServices.jsx`, `src/components/pages/KesariyaNavratri.jsx`, `src/components/pages/MutualFundsSIP.jsx`, `src/components/pages/Newsroom.jsx`, `src/components/pages/OurServices.jsx`, `src/components/pages/Saptah.jsx`, `src/components/pages/Sitemap.jsx`, `src/components/pages/WhiteCoatWealthCircle.jsx` — check that they still work.
- `src/components/Footer.jsx` is used by 72 other file(s): `src/Home.jsx`, `src/components/Child saving insurance/CSIPaymentScreen.jsx`, `src/components/Child saving insurance/CSIPlanconfig.jsx`, `src/components/Child saving insurance/CSIPolicy.jsx`, `src/components/Child saving insurance/CSIReviewDetails.jsx`, `src/components/Family health insurance/MedicalquestionFHI.jsx`, `src/components/Family health insurance/NommoniedetailFHI.jsx`, `src/components/Family health insurance/PlandetailFHI.jsx`, `src/components/Family health insurance/PlanlistFHI.jsx`, `src/components/Family health insurance/ProposerDetailsFHI.jsx`, `src/components/Group health insurace/GHPolicySuggestions.jsx`, `src/components/Group health insurace/GroupHealthPlanUpgrade.jsx`, `src/components/Group health insurace/KnowYourExactPremium.jsx`, `src/components/Informationpage/Informationpage.jsx`, `src/components/Informationpage/TataAIAFortuneGuaranteePlus.jsx`, `src/components/Retirement insurance/RIPlanconfig.jsx`, `src/components/Retirement insurance/RIPolicySuggestions.jsx`, `src/components/Retirement insurance/RIReviewDetails.jsx`, `src/components/Travel insurance/TravelMedicalHistory.jsx`, `src/components/Travel insurance/TravelPersonalDetails.jsx`, `src/components/Travel insurance/TravelPolicySuggestions.jsx`, `src/components/bike insurance/BikeInsuranceDetails.jsx`, `src/components/bike insurance/PolicySuggestion.jsx`, `src/components/car insurance/PaymentPage.jsx`, `src/components/car insurance/PolicyComparison.jsx`, `src/components/car insurance/PolicySummary.jsx`, `src/components/free of cost term/FOCTInsurance.jsx`, `src/components/free of cost term/FOCTPolicy.jsx`, `src/components/guaranted returns plan/GRPLPlanconfig.jsx`, `src/components/guaranted returns plan/GRPLPlans.jsx`, `src/components/guaranted returns plan/GRPLReviewdetail.jsx`, `src/components/guaranted returns plan/GRPLanding.jsx`, `src/components/health insurance/MedicalQuestionsHI.jsx`, `src/components/health insurance/NomineeDetailsHI.jsx`, `src/components/health insurance/PlanDetailsHI.jsx`, `src/components/health insurance/PlanlistHI.jsx`, `src/components/health insurance/ProposerDetailsHI.jsx`, `src/components/investment plans/InvestmentLanding.jsx`, `src/components/investment plans/InvestmentPlanConfig.jsx`, `src/components/investment plans/InvestmentPlansDetails.jsx`, `src/components/investment plans/ReviewDetails.jsx`, `src/components/pages/AboutUs.jsx`, `src/components/pages/AmitDaveSession.jsx`, `src/components/pages/AnkitShahSession.jsx`, `src/components/pages/Awards.jsx`, `src/components/pages/CGPEDoctorAdvisor.jsx`, `src/components/pages/Careers.jsx`, `src/components/pages/ComingSoon.jsx`, `src/components/pages/Community.jsx`, `src/components/pages/CommunityEventDetail.jsx`, `src/components/pages/CommunityKesariyaNavratri.jsx`, `src/components/pages/CommunityRishikeshSaptah.jsx`, `src/components/pages/CommunitySilvaMeditation1.jsx`, `src/components/pages/CommunitySilvaMeditation2.jsx`, `src/components/pages/CommunitySuratNavratri.jsx`, `src/components/pages/ContactUsPage.jsx`, `src/components/pages/DoctorConsultation.jsx`, `src/components/pages/Events.jsx`, `src/components/pages/FinancialAdvisory.jsx`, `src/components/pages/ForAdviser.jsx`, `src/components/pages/ForCommunityHub.jsx`, `src/components/pages/InsuranceLanding.jsx`, `src/components/pages/InsuranceServices.jsx`, `src/components/pages/KesariyaNavratri.jsx`, `src/components/pages/MutualFundsSIP.jsx`, `src/components/pages/Newsroom.jsx`, `src/components/pages/OurServices.jsx`, `src/components/pages/Sitemap.jsx`, `src/components/pages/WhiteCoatWealthCircle.jsx`, `src/components/term insurance/Checkconfirmation.jsx`, `src/components/term insurance/ConfirmationModal.jsx`, `src/components/term women insurance/TWIPolicy.jsx` — check that they still work.
- `src/components/pages/Events.jsx` is used by 1 other file(s): `src/App.jsx` — check that they still work.

---

## 2026-03-24 — branch `main` (history)

### Overview

On this day, branch `main` received changes to **616 file(s)**: 616 new, 0 modified, 0 removed (+101671 / −0 lines).

Main areas touched: `src/components/assets` (207), `public/assets/images` (93), `src/components/admin` (50), `src/components/pages` (25), `src/components/term insurance` (21), `src/components/common` (17).

### New files

#### `src/components/admin/TataAIAProducts.jsx`

*New file — 2516 lines*

- Defines: `TataAIAProducts`, `getProductCategory`, `generateProductDetails`, `testAPIConnectivity`, `fetchProducts`, `handleBulkImport`, `handleCreateProduct`, `handleViewProduct`, `handleEditProduct`, `handleCloseForm`, `handleAddSampleData`, `handleBrochureFileChange`, `handleSubmit`, `handleToggleStatus`, `handleDeleteProduct`, `handleInputChange`, `addRider`, `removeRider`, `updateRider`, `addFAQ`, `removeFAQ`, `updateFAQ`, `addDisclaimer`, `removeDisclaimer`, `updateDisclaimer`.
- Uses: `react`, `axios`, `../../config/environment`, `react-hot-toast`.

#### `src/components/admin/AdminDashboard.jsx`

*New file — 1985 lines*

- Defines: `AdminDashboard`, `fetchDashboardStats`, `handleLogout`, `handleCreatePlan`, `handleEditPlan`, `handleCloseForm`, `handlePlanSaved`, `handleCreatePolicy`, `handleEditPolicy`, `handleClosePolicyForm`, `handlePolicySaved`, `handlePolicySelect`, `toggleSidebar`, `handleCreateHealthPolicy`, `handleEditHealthPolicy`, `handleCloseHealthInsuranceForm`, `handleHealthPolicySaved`, `handleCreateFamilyHealthPolicy`, `handleEditFamilyHealthPolicy`, `handleCloseFamilyHealthInsuranceForm`, `handleFamilyHealthPolicySaved`, `handleCreateTravelPolicy`, `handleEditTravelPolicy`, `handleCloseTravelInsuranceForm`, `handleTravelPolicySaved`, `handleCreateCarPolicy`, `handleEditCarPolicy`, `handleCloseCarInsuranceForm`, `handleCarPolicySaved`, `handleCreateBikePolicy`, `handleEditBikePolicy`, `handleCloseBikeInsuranceForm`, `handleBikePolicySaved`, `handleCreateFreeOfCostPolicy`, `handleEditFreeOfCostPolicy`, `handleCloseFreeOfCostInsuranceForm`, `handleFreeOfCostPolicySaved`, `handleCreateGuaranteedReturnsPolicy`, `handleEditGuaranteedReturnsPolicy`, `handleCloseGuaranteedReturnsForm`, `handleGuaranteedReturnsPolicySaved`, `handleCreateChildSavingInsurancePolicy`, `handleEditChildSavingInsurancePolicy`, `handleCloseChildSavingInsuranceForm`, `handleChildSavingInsurancePolicySaved`, `handleCreateRetirementInsurancePolicy`, `handleEditRetirementInsurancePolicy`, `handleCloseRetirementInsuranceForm`, `handleRetirementInsurancePolicySaved`, `handleCreateGHIPlan`, `handleEditGHIPlan`, `handleCloseGHIForm`.
- Uses: `react`, `axios`, `react-router-dom`, `react-hot-toast`, `./InvestmentPlanForm`, `./InvestmentPlanList`, `./TermInsurancePolicyForm`, `./TermInsuranceBulkUpload`, `./TermInsurancePolicyList`, `./HealthInsuranceForm`, `./HealthInsuranceBulkUpload`, `./HealthInsuranceList`, `./FamilyHealthInsuranceForm`, `./FamilyHealthInsuranceList`, `./FamilyHealthInsuranceBulkUpload`, `./TravelInsuranceForm`, `./TravelInsuranceList`, `./TravelInsuranceBulkUpload`, `./CarInsuranceForm`, `./CarInsuranceList`, `./CarInsuranceBulkUpload`, `./BikeInsuranceForm`, `./BikeInsuranceList`, `./BikeInsuranceBulkUpload`, `./TermInsuranceSidebar`, `./FreeOfCostInsuranceForm`, `./FreeOfCostInsuranceList`, `./FreeOfCostInsuranceBulkUpload`, `./GuaranteedReturnsForm`, `./GuaranteedReturnsList`, `./ChildSavingInsuranceForm`, `./ChildSavingInsuranceList`, `./ChildSavingInsuranceBulkUpload`, `./RetirementInsuranceForm`, `./RetirementInsuranceList`, `./RetirementInsuranceBulkUpload`, `./AdminGHIForm`, `./AdminGHPlanList`, `./GroupHealthInsuranceBulkUpload`, `./InquiryList`, `./InquiryStats`, `./TataAIAInquiryList`, `./ContactUsList`, `./ClaimAssistanceList`, `./CallList`, `./GuaranteedReturnsBulkUpload`, `./TataAIAProducts`, `./ResumeList`, `./AdminUserManager`.
- Reads environment variables: `REACT_APP_API_BASE`.

#### `src/components/Informationpage/TataAIAFortuneGuaranteePlus.jsx`

*New file — 1533 lines*

- Defines: `TataAIAFortuneGuaranteePlus`, `getPlanBenefits`, `getPlanTableData`, `handleClickOutside`, `handleInputChange`, `handleDownloadBrochure`, `initializeProduct`, `handleSubmit`.
- Uses: `react`, `react-router-dom`, `../../config/environment`, `../headers/CGPEHeader`, `../Footer`.

#### `src/components/Informationpage/Informationpage.jsx`

*New file — 1402 lines*

- Defines: `InformationPage`, `playCurrentVideo`, `observeAnimationElements`, `isAnimated`, `handleOtherInsuranceClick`, `handleInsuranceClick`.
- Uses: `react`, `react-router-dom`, `../assets/p.png`, `../assets/q.png`, `../headers/CGPEHeader`, `./Informationpage.css`, `../Footer`, `../assets/l1.png`, `../assets/l2.png`, `../assets/l3.png`, `../assets/l4.png`, `../assets/l5.png`, `../assets/l6.png`, `../assets/l7.png`, `../assets/l8.png`, `../assets/l9.png`, `../assets/l10.png`, `../assets/l11.png`, `../assets/l12.png`.

#### `src/components/pages/InsuranceLanding.jsx`

*New file — 1334 lines*

- Defines: `InsuranceLanding`, `handleOtherInsuranceClick`, `handleInsuranceClick`.
- Uses: `react`, `../headers/CGPEHeader`, `../Footer`, `../TestimonialsSection`, `react-router-dom`, `../assets/l1.png`, `../assets/l2.png`, `../assets/l3.png`, `../assets/l4.png`, `../assets/l5.png`, `../assets/l6.png`, `../assets/l7.png`, `../assets/l8.png`, `../assets/l9.png`, `../assets/l10.png`, `../assets/l11.png`, `../assets/l12.png`, `../assets/gh.png`, `../assets/gh2.png`, `../assets/gh3.png`, `../assets/hhhh.png`, `../assets/hihi.png`.

#### `src/components/pages/Awards.jsx`

*New file — 1148 lines*

- Defines: `Awards`, `updateProgress`, `preloadImages`, `handleScroll`, `handleMouseMove`, `handleMouseEnter`, `handleMouseLeave`, `handleCardVisible`, `preloadVisibleImages`.
- Uses: `react`, `../headers/CGPEHeader`, `../Footer`, `../common/LazyLoader`, `../assets/aw1.JPG`, `../assets/aw1v.MP4`, `../assets/aw2.JPG`, `../assets/aw2v.mp4`, `../assets/aw3.JPG`, `../assets/aw3v.MP4`, `../assets/aw4.JPG`, `../assets/aw4v.MP4`, `../assets/aw5.JPG`, `../assets/aw5v.MP4`, `../assets/aw6.JPG`, `../assets/aw6v.MP4`, `../assets/aw7.JPG`, `../assets/aw7v.MP4`, `../assets/aw8.JPG`, `../assets/aw8v.MP4`, `../assets/aw9.JPG`, `../assets/aw9v.MP4`, `../assets/aw10.JPG`, `../assets/aw10v.mp4`, `../assets/aw11.JPG`, `../assets/aw11v.MP4`, `../assets/aw12.JPG`, `../assets/aw12v.MP4`, `../assets/aw13.JPG`, `../assets/aw13v.MP4`, `../assets/aw14.JPG`, `../assets/aw14v.MP4`, `../assets/aw15.JPG`, `../assets/aw15v.MP4`, `../assets/aw16.JPG`, `../assets/aw16v.MP4`, `../assets/aw17.JPG`, `../assets/aw17v.MP4`, `../assets/aw18.JPG`, `../assets/aw18v.MP4`, `../assets/aw19.JPG`, `../assets/aw19v.MP4`, `../assets/aw20.JPG`, `../assets/aw20v.MP4`, `../assets/aw21.JPG`, `../assets/aw21v.MP4`, `../assets/aw22.JPG`, `../assets/aw22v.MP4`, `../assets/aw23.JPG`, `../assets/aw23v.MP4`, `../assets/aw24.JPG`, `../assets/aw24v.MP4`, `../assets/aw25.JPG`, `../assets/aw25v.MP4`, `../assets/aw26.JPG`, `../assets/aw26v.MP4`, `../assets/aw27.JPG`, `../assets/aw27v.MP4`, `../assets/aw28.JPG`, `../assets/aw28v.MP4`, `../assets/aw29.JPG`, `../assets/aw29v.MP4`, `../assets/aw30.JPG`, `../assets/aw30v.MP4`, `../assets/aw31.JPG`, `../assets/aw31v.MP4`, `../assets/aw32.JPG`, `../assets/aw32v.MP4`, `../assets/aw33.JPG`, `../assets/aw33v.MP4`, `../assets/aw34.JPG`, `../assets/aw34v.MP4`, `../assets/aw35.JPG`, `../assets/aw35v.MP4`, `../assets/aw36.JPG`, `../assets/aw36v.MP4`, `../assets/aw37.jpeg`, `../assets/aw37v.mp4`, `../assets/aw38.jpeg`, `../assets/aw38v.mp4`, `../assets/aw39.jpeg`, `../assets/aw39v.mp4`, `../assets/aw40.jpeg`, `../assets/aw40v.mp4`, `../assets/aw41.jpeg`, `../assets/aw41v.mp4`.

#### `src/components/admin/FamilyHealthInsuranceForm.jsx`

*New file — 1041 lines*

- Defines: `FamilyHealthInsuranceForm`, `validateForm`, `handleSubmit`, `handleInputChange`, `handleArrayChange`, `addArrayItem`, `removeArrayItem`.
- Uses: `react`.

#### `src/components/pages/Careers.jsx`

*New file — 1034 lines*

- Defines: `Careers`, `toggleFAQ`, `toggleLocation`, `validateForm`, `handleResumeFormChange`, `handleResumeSubmit`, `closeResumeForm`, `getMapUrl`.
- Uses: `react`, `react-router-dom`, `../headers/CGPEHeader`, `../Footer`, `../../config/api`, `../assets/c1.png`, `../assets/c2.png`, `../assets/c3.png`, `../assets/c4.png`, `../assets/c5.png`, `../assets/c6.png`, `../assets/cr1.png`, `../assets/cr2.png`, `../assets/cr3.png`, `../assets/cr4.png`, `../assets/cr5.png`, `../assets/cr6.png`, `../assets/cr7.png`, `../assets/cr8.png`, `../assets/cr9.png`, `../assets/cr10.png`, `../assets/cr11.png`, `../assets/cr12.png`, `../assets/cee1.png`, `../assets/cee2.png`, `../assets/cee3.png`.

#### `src/components/admin/HealthInsuranceForm.jsx`

*New file — 954 lines*

- Defines: `HealthInsuranceForm`, `validateForm`, `handleSubmit`, `handleInputChange`, `handleArrayChange`, `addArrayItem`, `removeArrayItem`.
- Uses: `react`.

#### `src/components/admin/BikeInsuranceForm.jsx`

*New file — 930 lines*

- Defines: `BikeInsuranceForm`, `validateForm`, `handleSubmit`, `handleInputChange`, `handleArrayChange`, `addArrayItem`, `removeArrayItem`.
- Uses: `react`.

#### `src/components/admin/RetirementInsuranceForm.jsx`

*New file — 917 lines*

- Defines: `RetirementInsuranceForm`, `validateForm`, `handleSubmit`, `handleInputChange`, `handleArrayChange`, `addArrayItem`, `removeArrayItem`.
- Uses: `react`.

#### `src/components/admin/GuaranteedReturnsForm.jsx`

*New file — 887 lines*

- Defines: `GuaranteedReturnsForm`, `handleInputChange`, `handleArrayChange`, `addArrayItem`, `removeArrayItem`, `validateForm`, `handleSubmit`.
- Uses: `react`.
- Reads environment variables: `REACT_APP_API_BASE`.

#### `src/components/admin/TermInsurancePolicyForm.jsx`

*New file — 862 lines*

- Defines: `TermInsurancePolicyForm`, `validateForm`, `handleSubmit`, `handleInputChange`, `handleArrayChange`, `addArrayItem`, `removeArrayItem`.
- Uses: `react`.

#### `src/components/guaranted returns plan/GRPLPlans.jsx`

*New file — 844 lines*

- Defines: `useGuaranteedReturnsPlans`, `fetchPlans`, `Chip`, `PlanCard`, `FilterSidebar`, `GRPLanding`, `handleTaxSavingClick`, `closeTaxPopup`, `handleGetDetailsClick`, `closePlanBenefits`, `handleProceedToPlanConfig`, `handleDirectToPlanConfig`, `handleCompareWithFDClick`, `closeCompareWithFD`, `handlePlanBenefitsFromCompareClick`, `handleProceedFromCompareWithFD`.
- Uses: `react`, `../headers/Header`, `../Footer`, `./TaxSavingsPopup`, `./PlanBenefitsPopup`, `./CompareWithFDPopup`, `./GRPLPlanconfig`, `../term insurance/ContactConfirmation`, `../common/EmptyState`, `../common/LoadingState`.

#### `src/components/free of cost term/FOCTPolicy.jsx`

*New file — 762 lines*

- Defines: `FOCTPolicy`, `calculateAge`, `fetchPolicies`, `handlePlanClick`, `closeModal`, `updateOccupationFormData`, `handleOccupationNext`, `handleOccupationPrev`, `PlanRow`.
- Uses: `react`, `../../context/PricingContext`, `react-router-dom`, `../term insurance/PlanDetailsModal`, `../StartBlock`, `../headers/Header`, `../Footer`, `./FOCTOccuption`, `../term insurance/ContactConfirmation`.

#### `src/components/admin/HealthInsuranceList.jsx`

*New file — 730 lines*

- Defines: `HealthInsuranceList`, `handleToggleStatus`, `handleTogglePopular`, `handleDeletePolicy`, `formatCurrency`, `formatRoomRentLimit`, `formatRestorationBenefit`.
- Uses: `react`.

#### `src/components/pages/DoctorConsultation.jsx`

*New file — 713 lines*

- Defines: `DoctorConsultation`, `handleInputChange`, `handleBookCall`, `handleWhatsApp`, `toggleFAQ`, `nextSlide`, `prevSlide`, `goToSlide`, `getVisibleSections`.
- Uses: `react`, `../headers/CGPEHeader`, `../Footer`, `../common/SimpleWhatsAppQR`, `../common/OptimizedImage`, `../common/OptimizedVideo`, `../assets/gpt1.png`, `../assets/gpt2.png`, `../assets/gpt3.png`, `../assets/gp48.png`, `../assets/gpt51.png`, `../assets/grandfather.png`.

#### `src/components/term insurance/PolicySuggestList.jsx`

*New file — 685 lines*

- Defines: `PolicySuggestList`, `calculateAge`, `fetchPolicies`, `handlePlanClick`, `closeModal`, `PlanRow`.
- Uses: `react`, `../../context/PricingContext`, `react-router-dom`, `./PlanDetailsModal`, `../StartBlock`, `./ContactConfirmation`.

#### `src/components/pages/KesariyaNavratri.jsx`

*New file — 680 lines*

- Defines: `KesariyaNavratri`, `handleEscape`.
- Uses: `react`, `react-router-dom`, `../headers/CGPEHeader`, `../Footer`.

#### `src/components/term women insurance/TWIPolicy.jsx`

*New file — 680 lines*

- Defines: `TWIPolicy`, `calculateAge`, `fetchPolicies`, `handlePlanClick`, `closeModal`, `PlanRow`.
- Uses: `react`, `../../context/PricingContext`, `react-router-dom`, `../term insurance/PlanDetailsModal`, `../StartBlock`, `../headers/Header`, `../Footer`, `../term insurance/ContactConfirmation`.

#### `src/components/Travel insurance/TravelPolicySuggestions.jsx`

*New file — 671 lines*

- Defines: `UpgradeModal`, `TravelPolicyCompare`, `fetchTravelPolicies`, `handleBackClick`, `handleBuyNowClick`, `closeModal`, `handleSkip`, `handleUpgrade`.
- Uses: `react`, `react-router-dom`, `../headers/Header`, `../Footer`, `../StartBlock`, `../term insurance/ContactConfirmation`.

#### `src/components/admin/TravelInsuranceForm.jsx`

*New file — 671 lines*

- Defines: `TravelInsuranceForm`, `handleInputChange`, `handleArrayInputChange`, `addArrayItem`, `removeArrayItem`, `handleTagsChange`, `validateForm`, `handleSubmit`.
- Uses: `react`.

#### `src/components/admin/ChildSavingInsuranceForm.jsx`

*New file — 670 lines*

- Defines: `ChildSavingInsuranceForm`, `handleInputChange`, `handleArrayChange`, `addArrayItem`, `removeArrayItem`, `handleSubmit`.
- Uses: `react`.

#### `src/components/admin/FreeOfCostInsuranceForm.jsx`

*New file — 663 lines*

- Defines: `FreeOfCostInsuranceForm`, `handleInputChange`, `handleNestedInputChange`, `handleArrayChange`, `validateForm`, `handleSubmit`.
- Uses: `react`, `axios`.
- Reads environment variables: `REACT_APP_API_BASE`.

#### `src/components/car insurance/PolicyComparison.jsx`

*New file — 662 lines*

- Defines: `PolicyComparison`, `extractFormData`, `fetchPolicies`, `handleAddonChange`, `toggleSection`, `handlePolicySelect`.
- Uses: `react`, `react-router-dom`, `../headers/Header`, `../Footer`, `../StartBlock`, `../term insurance/ContactConfirmation`.

#### `src/components/headers/CGPEHeader.jsx`

*New file — 655 lines*

- Defines: `CGPEHeader`, `getActiveLink`, `fetchTataAIAProducts`, `handleTataAIAClick`, `handleClickOutside`, `handleLinkClick`.
- Uses: `react`, `react-router-dom`, `axios`, `../../config/environment`.

#### `src/components/admin/TermInsurancePolicyList.jsx`

*New file — 645 lines*

- Defines: `TermInsurancePolicyList`, `handleToggleStatus`, `handleTogglePopular`, `handleDeletePolicy`, `formatCurrency`, `getPolicyTypeLabel`, `getPolicyTypeColor`.
- Uses: `react`.

#### `src/components/admin/InvestmentPlanForm.jsx`

*New file — 636 lines*

- Defines: `InvestmentPlanForm`, `handleChange`, `handleBlueBannerChange`, `handleAddTag`, `handleRemoveTag`, `handleTagSelect`, `handleSubmit`.
- Uses: `react`, `../../utils/apiUtils`.

#### `src/components/pages/Community.jsx`

*New file — 616 lines*

- Defines: `staggerDelay`, `FloatingParticles`, `MandalaSVG`, `DiyaIcon`, `OmSymbol`, `GangaDivider`, `SanskritShloka`, `LotusIcon`, `SectionLabel`, `SectionHeading`, `CornerFlourish`, `PeacockFeatherIcon`, `ConchIcon`, `HeroSection`, `PurposeSection`, `KathaGayakSection`, `MessageSection`, `AchievementSection`, `FamilySection`, `WhyRishikeshSection`, `HighlightsSection`, `GallerySection`, `FinalCTASection`, `CommunityFooterSection`, `Community`.
- Uses: `react`, `framer-motion`, `lucide-react`, `../headers/CGPEHeader`, `../Footer`.

#### `src/components/admin/CarInsuranceForm.jsx`

*New file — 595 lines*

- Defines: `CarInsuranceForm`, `validateForm`, `handleSubmit`, `handleInputChange`, `handleArrayChange`, `addArrayItem`, `removeArrayItem`.
- Uses: `react`.

#### `src/components/admin/InquiryList.jsx`

*New file — 589 lines*

- Defines: `InquiryList`, `fetchInquiries`, `handleFilterChange`, `handleCategorySelect`, `handleClearAllFilters`, `handleStatusUpdate`, `handlePriorityUpdate`, `handleDelete`, `handleBulkAction`, `formatDate`.
- Uses: `react`, `../../utils/apiUtils`.

#### `src/components/admin/AdminGHPlanList.jsx`

*New file — 581 lines*

- Defines: `AdminGHPlanList`, `fetchPlans`, `handleToggleStatus`, `handleTogglePopular`, `handleDeletePlan`, `formatCurrency`, `formatDate`.
- Uses: `react`, `react-hot-toast`.

#### `src/components/admin/ResumeList.jsx`

*New file — 581 lines*

- Defines: `ResumeList`, `fetchResumes`, `handleFilterChange`, `handleStatusChange`, `handleDeleteResume`, `handleBulkAction`, `handleSingleDownload`, `handleBulkDownload`, `handleResumeSelect`, `handleSelectAll`, `formatDate`, `formatFileSize`.
- Uses: `react`, `axios`.
- Reads environment variables: `REACT_APP_API_BASE`.

#### `src/components/admin/AdminGHIForm.jsx`

*New file — 573 lines*

- Defines: `AdminGHIForm`, `handleInputChange`, `handleArrayChange`, `addArrayItem`, `removeArrayItem`, `handleSubmit`.
- Uses: `react`, `react-hot-toast`.

#### `src/components/admin/FreeOfCostInsuranceList.jsx`

*New file — 552 lines*

- Defines: `FreeOfCostInsuranceList`, `fetchPolicies`, `handleToggleStatus`, `handleTogglePopular`, `handleDeletePolicy`, `formatCurrency`, `formatDate`.
- Uses: `react`, `axios`, `react-hot-toast`, `../../utils/apiUtils`.
- Reads environment variables: `REACT_APP_API_BASE`.

#### `src/components/pages/MutualFundsSIP.jsx`

*New file — 531 lines*

- Defines: `MutualFundsSIP`, `handleContactNavigation`.
- Uses: `react`, `react-router-dom`, `../headers/CGPEHeader`, `../Footer`.

#### `src/components/health insurance/PlanlistHI.jsx`

*New file — 528 lines*

- Defines: `PlansListHI`, `handleClickOutside`, `fetchHealthInsurancePlans`, `formatRoomRentLimit`, `formatRestorationBenefit`, `getMemberDisplayName`, `handlePlanSelection`.
- Uses: `react`, `react-router-dom`, `../Footer`, `../headers/HeaderHI`, `../StartBlock`, `../term insurance/ContactConfirmation`.

#### `src/components/admin/ChildSavingInsuranceList.jsx`

*New file — 516 lines*

- Defines: `ChildSavingInsuranceList`, `fetchPolicies`, `handleToggleStatus`, `handleTogglePopular`, `handleDeletePolicy`, `formatCurrency`, `formatPlanType`.
- Uses: `react`.

#### `src/components/Travel insurance/Travelinsurancestep1.jsx`

*New file — 510 lines*

- Defines: `NextStepComponent`, `handleNextClick`, `TravelersStepComponent`, `handleTravelerChange`, `handleAgeChange`, `MedicalHistoryStepComponent`, `ContactDetailsStepComponent`, `TravelInsuranceStep1`, `handleBackClick`, `handleDatesNext`, `handleTravelersNext`, `handleMedicalHistoryNext`, `handleContactDetailsNext`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`.

#### `src/components/admin/FamilyHealthInsuranceList.jsx`

*New file — 507 lines*

- Defines: `FamilyHealthInsuranceList`, `handleToggleStatus`, `handleTogglePopular`, `handleDeletePolicy`, `formatCurrency`, `formatRoomRentLimit`, `formatRestorationBenefit`.
- Uses: `react`.

#### `src/components/Family health insurance/ProposerDetailsFHI.jsx`

*New file — 504 lines*

- Defines: `ProposerDetailsHI`, `handleInputChange`, `handleSubmit`.
- Uses: `react`, `react-router-dom`, `../Footer`, `../headers/HeaderHI`.

#### `src/components/health insurance/ProposerDetailsHI.jsx`

*New file — 504 lines*

- Defines: `ProposerDetailsHI`, `handleInputChange`, `handleSubmit`.
- Uses: `react`, `react-router-dom`, `../Footer`, `../headers/HeaderHI`.

#### `src/components/pages/ContactUsPage.jsx`

*New file — 504 lines*

- Defines: `ContactUsPage`, `handleChange`, `handleSubmit`, `SuccessPopup`.
- Uses: `react`, `axios`, `../../config/environment`, `react-icons/fa`, `react-icons/fa6`, `../headers/CGPEHeader`, `../Footer`, `../common/SimpleWhatsAppQR`, `../../utils/whatsappQRUtils`.
- Reads environment variables: `REACT_APP_API_BASE`.

#### `src/components/Child saving insurance/CSIPolicy.jsx`

*New file — 500 lines*

- Defines: `CSIPolicy`, `handleGetDetails`, `fetchPolicies`, `handleEscape`, `UserChip`, `Panel`, `GhostButton`, `SelectSimple`, `Badge`, `Stat`, `PolicyCard`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`, `../headers/Header`, `../Footer`, `../../context/UserDataContext`, `./PowerOfCompoundingCalculator`, `./ChildSavingsCalculator`, `./CSIPlancomperision`, `./ULIPComparisonModal`, `../term insurance/ContactConfirmation`.

#### `src/components/admin/ContactUsList.jsx`

*New file — 498 lines*

- Defines: `ContactUsList`, `fetchContactUsMessages`, `handleFilterChange`, `handleStatusUpdate`, `handlePriorityUpdate`, `handleDelete`, `handleBulkAction`, `formatDate`, `handleRetry`, `handleClearFilters`.
- Uses: `react`, `axios`, `../../config/environment`, `../../utils/apiUtils`.

#### `src/components/admin/RetirementInsuranceList.jsx`

*New file — 498 lines*

- Defines: `RetirementInsuranceList`, `fetchPolicies`, `handleToggleStatus`, `handleTogglePopular`, `handleDeletePolicy`, `formatCurrency`.
- Uses: `react`.

#### `src/components/car insurance/PaymentPage.jsx`

*New file — 493 lines*

- Defines: `PaymentPage`, `handlePaymentModeChange`, `handleBankSelection`, `handleEmiTypeChange`, `handleGenerateQRCode`, `handleCardDetailChange`, `handlePayment`, `handleBack`.
- Uses: `react`, `react-router-dom`, `../headers/Header`, `../Footer`.

#### `src/components/admin/BikeInsuranceList.jsx`

*New file — 489 lines*

- Defines: `BikeInsuranceList`, `fetchPolicies`, `handleToggleStatus`, `handleTogglePopular`, `handleDeletePolicy`, `formatCurrency`, `formatEngineCapacity`, `formatBikeType`.
- Uses: `react`.

#### `src/components/Child saving insurance/ChildSavingInsurance.jsx`

*New file — 487 lines*

- Defines: `ChildSavingsinsurance`, `onChange`, `onCityChange`, `onAgeChange`, `onIncomeChange`, `selectCity`, `handleClickOutside`, `submit`, `submitCity`, `submitAge`, `submitIncome`, `Badge`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`, `../../context/UserDataContext`, `../../utils/cityNames`, `../assets/ci.png`, `../assets/a.png`, `../assets/c.png`, `../assets/b.png`, `../assets/d.png`.

#### `src/components/admin/CallAssistanceList.jsx`

*New file — 486 lines*

- Defines: `CallAssistanceList`, `fetchCalls`, `handleFilterChange`, `handleStatusUpdate`, `handlePriorityUpdate`, `handleDelete`, `handleAddNote`, `handleBulkAction`, `formatDate`.
- Uses: `react`, `axios`, `../../config/environment`.

#### `src/components/pages/AboutUs.jsx`

*New file — 477 lines*

- Defines: `AboutUs`, `handleInsuranceClick`, `toggleAudio`.
- Uses: `react`, `../headers/CGPEHeader`, `../Footer`, `../Timeline/Timeline`, `react-router-dom`.

#### `src/components/Child saving insurance/CSIPaymentScreen.jsx`

*New file — 475 lines*

- Defines: `CSIPaymentScreen`, `handlePaymentModeChange`, `handleBankSelection`, `handleEmiTypeChange`, `handleGenerateQRCode`, `handleCardDetailChange`, `handlePayment`, `handleBack`.
- Uses: `react`, `react-router-dom`, `../headers/HeaderInvest`, `../Footer`.

#### `src/components/admin/GuaranteedReturnsList.jsx`

*New file — 461 lines*

- Defines: `GuaranteedReturnsList`, `fetchPlans`, `handleToggleStatus`, `handleTogglePopular`, `handleDelete`, `formatCurrency`.
- Uses: `react`, `react-hot-toast`, `../../utils/apiUtils`, `./GuaranteedReturnsBulkUpload`.

#### `src/components/guaranted returns plan/GRPLPlanconfig.jsx`

*New file — 457 lines*

- Defines: `GRPLPlanconfig`, `handleNextClick`, `handleBackToForm`, `handleBackToYourDetails`, `handleYourDetailsNext`, `handlePersonalDetailsNext`, `getFallbackPrice`, `handleInitialFormChange`, `handleProceedToPayment`, `BenefitCard`, `CriteriaCard`.
- Uses: `react`, `react-router-dom`, `../headers/HeaderInvest`, `../Footer`, `./YourDetailsForm`, `./PersonalDetailsForm`.

#### `src/components/bike insurance/PolicySuggestion.jsx`

*New file — 455 lines*

- Defines: `PolicySuggestion`, `fetchPolicies`, `handlePlanSelect`, `handleBack`.
- Uses: `react`, `react-router-dom`, `../Footer`, `../headers/Header`, `../StartBlock`, `../term insurance/ContactConfirmation`.

#### `src/components/admin/CallUsSection.jsx`

*New file — 436 lines*

- Defines: `CallUsSection`, `fetchCallData`, `handleCallBack`, `getStatusColor`, `getStatusIcon`.
- Uses: `react`, `axios`, `react-hot-toast`.
- Reads environment variables: `REACT_APP_API_BASE`.

#### `src/components/Family health insurance/PlanlistFHI.jsx`

*New file — 434 lines*

- Defines: `PlansListHI`, `handleClickOutside`, `fetchPlans`, `getMemberDisplayName`, `handlePlanSelection`.
- Uses: `react`, `react-router-dom`, `../Footer`, `../headers/HeaderHI`, `../StartBlock`, `../term insurance/ContactConfirmation`.

#### `src/components/admin/TataAIAInquiryList.jsx`

*New file — 432 lines*

- Defines: `TataAIAInquiryList`, `fetchTataAIAInquiries`, `handleFilterChange`, `handleStatusUpdate`, `handlePriorityUpdate`, `handleDelete`, `handleBulkAction`, `formatDate`.
- Uses: `react`, `axios`, `../../utils/apiUtils`.
- Reads environment variables: `REACT_APP_API_BASE`.

#### `src/components/Child saving insurance/CSIReviewDetails.jsx`

*New file — 424 lines*

- Defines: `CSIReviewDetails`, `onProceed`, `Section`, `Divider`, `GridTwo`, `Field`.
- Uses: `react`, `react-router-dom`, `../Footer`, `../headers/HeaderInvest`.

#### `src/components/admin/CallList.jsx`

*New file — 424 lines*

- Defines: `CallList`, `fetchCalls`, `handleFilterChange`, `handleStatusUpdate`, `handlePriorityUpdate`, `handleDelete`, `handleBulkAction`, `formatDate`.
- Uses: `react`, `axios`.
- Reads environment variables: `REACT_APP_API_BASE`.

#### `src/components/Child saving insurance/ULIPComparisonModal.jsx`

*New file — 423 lines*

- Defines: `ULIPComparisonModal`, `Row`, `renderCell`.
- Uses: `react`.

#### `src/components/pages/WhiteCoatWealthCircle.jsx`

*New file — 423 lines*

- Defines: `WhiteCoatWealthCircle`, `handleServiceSelect`, `closeModal`.
- Uses: `react`, `react-router-dom`, `../headers/CGPEHeader`, `../Footer`, `../common/WhiteCoatWealthQR`.

#### `src/components/Travel insurance/TravelPersonalDetails.jsx`

*New file — 422 lines*

- Defines: `TravelPersonalDetails`, `handleContinue`.
- Uses: `react`, `react-router-dom`, `../headers/Header`, `../Footer`.

#### `src/components/admin/TravelInsuranceList.jsx`

*New file — 419 lines*

- Defines: `TravelInsuranceList`, `fetchPolicies`, `handleToggleActive`, `handleTogglePopular`, `handleDelete`.
- Uses: `react`.

#### `src/components/admin/CarInsuranceList.jsx`

*New file — 416 lines*

- Defines: `CarInsuranceList`, `handleToggleStatus`, `handleTogglePopular`, `handleDeletePolicy`, `formatCurrency`, `formatPolicyType`.
- Uses: `react`.

#### `src/components/admin/ClaimAssistanceList.jsx`

*New file — 409 lines*

- Defines: `ClaimAssistanceList`, `fetchClaimAssistances`, `handleFilterChange`, `handleStatusUpdate`, `handlePriorityUpdate`, `handleDelete`, `handleBulkAction`, `formatDate`.
- Uses: `react`, `../../utils/apiUtils`.

#### `src/components/bike insurance/BikeInsuranceDetails.jsx`

*New file — 393 lines*

- Defines: `BikeInsuranceDetails`, `handleChange`, `handleFormSubmit`, `handleBack`.
- Uses: `react`, `react-router-dom`, `../Footer`, `../headers/Header`.

#### `src/components/pages/AmitDaveSession.jsx`

*New file — 392 lines*

- Defines: `AmitDaveSession`, `handleEscape`.
- Uses: `react`, `react-router-dom`, `../headers/CGPEHeader`, `../Footer`.

#### `src/utils/cityNames.js`

*New file — 386 lines*

- Defines: `getAllCities`, `getCitiesByState`, `searchCities`, `getCitiesByFirstLetter`, `getRandomCities`, `isValidCity`.

#### `src/components/pages/AnkitShahSession.jsx`

*New file — 379 lines*

- Defines: `AnkitShahSession`, `handleEscape`.
- Uses: `react`, `react-router-dom`, `../headers/CGPEHeader`, `../Footer`.

#### `src/components/Child saving insurance/CSIPlanconfig.jsx`

*New file — 378 lines*

- Defines: `CSIPlanconfig`, `getFallbackPrice`, `handleInitialFormChange`, `handleProceedToPayment`, `handleYourDetailsBack`, `handleYourDetailsNext`, `BenefitCard`, `CriteriaCard`.
- Uses: `react`, `react-router-dom`, `../headers/HeaderInvest`, `../Footer`, `./YourDetailsForm`.

#### `src/components/admin/AdminUserManager.jsx`

*New file — 376 lines*

- Defines: `AdminUserManager`, `fetchAdminUsers`, `handleInputChange`, `validateForm`, `handleCreateAdmin`, `handleDeleteAdmin`, `copyToClipboard`.
- Uses: `react`, `react-hot-toast`, `../../utils/apiUtils`.

#### `src/components/car insurance/PolicySummary.jsx`

*New file — 376 lines*

- Defines: `PolicySummary`, `handleInputChange`, `handlePayment`, `handleBack`.
- Uses: `react`, `react-router-dom`, `../headers/Header`, `../Footer`.

#### `src/components/term insurance/PlanDetailsModal.jsx`

*New file — 372 lines*

- Defines: `PlanDetailsModal`, `handleTabChange`, `handleClose`, `handleProceed`, `getCurrentPrice`.
- Uses: `react`, `react-router-dom`, `../../context/PricingContext`, `./AddonBenefitsModal`, `./FAQModal`.

#### `src/components/term insurance/ConfirmationModal.jsx`

*New file — 367 lines*

- Defines: `ConfirmationModel`, `getFallbackPrice`, `handleConfirtfirstDataChange`, `handleConfirmpageDataChange`, `handleInsurancePlanDataChange`, `handleAddonBenefitsDataChange`, `handleInputChange`, `handleSubmit`, `calculateAge`, `formatDate`, `getUserInfoString`, `handleProceed`.
- Uses: `../headers/Header`, `../Footer`, `react`, `react-router-dom`, `../../context/UserDataContext`, `../../context/PricingContext`, `./Confirtfirst`, `./Confirmpage`, `./InsurancePlanCards`, `./AddonBenefitsCards`, `./Checkconfirmation`.

#### `src/components/Family health insurance/MedicalquestionFHI.jsx`

*New file — 361 lines*

- Defines: `MedicalQuestionsHI`, `handleAnswer`, `handleSubmit`.
- Uses: `react`, `react-router-dom`, `../Footer`, `../headers/HeaderHI`.

#### `src/components/Retirement insurance/RIPolicySuggestions.jsx`

*New file — 361 lines*

- Defines: `RIPolicySuggestions`, `fetchFilteredPolicies`, `UserChip`, `Select`, `Stat`, `PolicyCard`.
- Uses: `react`, `react-router-dom`, `../../context/UserDataContext`, `../headers/Header`, `../Footer`, `./PlanDetailsDrawer`, `../term insurance/ContactConfirmation`.

#### `src/components/health insurance/MedicalQuestionsHI.jsx`

*New file — 361 lines*

- Defines: `MedicalQuestionsHI`, `handleAnswer`, `handleSubmit`.
- Uses: `react`, `react-router-dom`, `../Footer`, `../headers/HeaderHI`.

#### `src/components/pages/CGPEDoctorAdvisor.jsx`

*New file — 358 lines*

- Defines: `CGPEDoctorAdvisor`, `handleApplyClick`, `handleTalkToMentorClick`, `toggleFAQ`.
- Uses: `react`, `react-router-dom`, `react-icons/fa`, `../headers/CGPEHeader`, `../Footer`.

#### `src/components/pages/ForAdviser.jsx`

*New file — 351 lines*

- Defines: `ForAdviser`.
- Uses: `react`, `../headers/CGPEHeader`, `../Footer`, `../assets/fa1.png`, `../assets/fa2.png`, `../assets/fa3.png`, `../assets/fa4.png`, `../assets/fa5.png`, `../assets/fa6.png`, `../TestimonialsSection`.

#### `src/utils/whatsappQRUtils.js`

*New file — 327 lines*

- Defines: `generateWhatsAppQR`, `generateWhatsAppQRHD`, `generateQRWithText`, `downloadQRWithText`, `downloadQRWithTextPDF`, `downloadWhatsAppQR`, `downloadWhatsAppQRHD`, `openWhatsApp`, `validatePhoneNumber`, `formatPhoneNumber`.
- Uses: `qrcode`, `jspdf`.

#### `src/components/pages/FinancialAdvisory.jsx`

*New file — 324 lines*

- Defines: `FinancialAdvisory`, `handleLearnMore`.
- Uses: `react`, `react-router-dom`, `../headers/CGPEHeader`, `../Footer`, `../assets/fi1.png`, `../assets/fi2.png`, `../assets/fi3.png`, `../assets/fi4.png`, `../assets/fi5.png`, `../assets/fi6.png`.

#### `src/components/Family health insurance/PlandetailFHI.jsx`

*New file — 317 lines*

- Defines: `PlanDetailHI`, `calculateTotalPremium`.
- Uses: `react`, `react-router-dom`, `../Footer`, `../headers/HeaderHI`.

#### `src/components/health insurance/PlanDetailsHI.jsx`

*New file — 317 lines*

- Defines: `PlanDetailHI`, `calculateTotalPremium`.
- Uses: `react`, `react-router-dom`, `../headers/Header`, `../Footer`, `../headers/HeaderHI`.

#### `src/components/term insurance/MainContent.jsx`

*New file — 317 lines*

- Defines: `MainContent`, `updateFormData`, `validateStep`, `handleNext`, `handlePrev`, `handleSubmit`, `renderCurrentStep`.
- Uses: `react`, `react-router-dom`, `../../context/UserDataContext.jsx`, `./InsuranceForm.jsx`, `../assets/Group8757.svg`, `./Occuptionform.jsx`, `./Annualincome.jsx`, `./Qualificationform.jsx`, `./Smokeform.jsx`, `./Alcoholform.jsx`.

#### `src/components/term women insurance/TWImaincontent.jsx`

*New file — 317 lines*

- Defines: `TWImaincontent`, `updateFormData`, `validateStep`, `handleNext`, `handlePrev`, `handleSubmit`, `renderCurrentStep`.
- Uses: `react`, `react-router-dom`, `../../context/UserDataContext.jsx`, `../term insurance/InsuranceForm.jsx`, `../assets/Group55383.png`, `./TWIOccuption.jsx`, `./TWIAnnualincome.jsx`, `./TWIQualification.jsx`, `./TWISmoke.jsx`, `./TWIAlkohole.jsx`, `../headers/Headerlogin`.

#### `src/components/admin/InquiryStats.jsx`

*New file — 316 lines*

- Defines: `InquiryStats`, `fetchStats`, `exportReport`.
- Uses: `react`, `../../utils/apiUtils`, `xlsx`.

#### `src/components/Group health insurace/GHInsurance.jsx`

*New file — 315 lines*

- Defines: `GHInsurance`, `handleSubmit`, `handleCoverageSubmit`, `handleCompanySubmit`, `handleCitySubmit`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`, `../../context/UserDataContext`, `../assets/i.png`, `../assets/k.png`, `../assets/j.png`.

#### `src/components/Group health insurace/GHPolicySuggestions.jsx`

*New file — 315 lines*

- Defines: `GHPolicySuggestions`, `fetchPolicies`, `formatCurrency`, `formatSumInsured`, `PolicyCard`, `generateRibbons`.
- Uses: `react`, `react-router-dom`, `../headers/Header`, `../Footer`, `../../context/UserDataContext`.

#### `src/components/pages/Sitemap.jsx`

*New file — 313 lines*

- Defines: `Sitemap`, `handleItemClick`.
- Uses: `react`, `react-router-dom`, `../headers/CGPEHeader`, `../Footer`, `../assets/s1.png`, `../assets/s2.png`, `../assets/s3.png`, `../assets/s4.png`, `../assets/s5.png`, `../assets/s6.png`, `../assets/s7.png`, `../assets/s8.png`, `../assets/s9.png`, `../assets/s10.png`.

#### `src/components/Family health insurance/SelectageFHI.jsx`

*New file — 306 lines*

- Defines: `getMemberIcon`, `SelectAgeFHI`, `handleAgeChange`, `handleContinue`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`, `../assets/account.png`, `../assets/personfemale.png`, `../assets/son.png`, `../assets/daughter.png`, `../assets/father.png`, `../assets/mother.png`, `../assets/grandfather.png`, `../assets/grandmother.png`, `../assets/father-in-law.png`, `../assets/mother-in-law.png`.

#### `src/components/admin/InvestmentPlanList.jsx`

*New file — 306 lines*

- Defines: `InvestmentPlanList`, `fetchPlans`, `handleDeletePlan`, `handleToggleStatus`.
- Uses: `react`, `../../utils/apiUtils`, `../common/OptimizedImage`.

#### `src/components/investment plans/FundPerformance.jsx`

*New file — 303 lines*

- Defines: `FundPerformance`, `getRiskColor`.
- Uses: `react`, `react-router-dom`.

#### `src/App.jsx`

*New file — 300 lines*

- Defines: `LoadingSpinner`, `App`, `handleMediaError`, `preloadComponents`.
- Uses: `react`, `react-router-dom`, `react-hot-toast`, `./context/InvestmentContext`, `./context/UserDataContext`, `./components/common/ImagePreloader`, `./components/common/PerformanceMonitor`, `./index.css`, `./components/Informationpage/Informationpage`.

#### `src/components/Retirement insurance/RIFirst.jsx`

*New file — 298 lines*

- Defines: `RIFirst`, `onChange`, `onAgeChange`, `onIncomeChange`, `submit`, `submitAge`, `submitIncome`, `Badge`.
- Uses: `react`, `react-router-dom`, `../../context/UserDataContext`, `../headers/Headerlogin`, `../assets/h.png`, `../assets/a.png`, `../assets/c.png`, `../assets/b.png`, `../assets/d.png`.

#### `src/components/admin/GuaranteedReturnsBulkUpload.jsx`

*New file — 297 lines*

- Defines: `GuaranteedReturnsBulkUpload`, `handleFileChange`, `downloadTemplate`, `validateFile`, `handleUpload`, `renderErrorDetails`.
- Uses: `react`.
- Reads environment variables: `REACT_APP_API_BASE`.

#### `src/components/Retirement insurance/RIPlanconfig.jsx`

*New file — 286 lines*

- Defines: `RIPlanconfig`, `handleNextClick`, `handleBackToForm`, `handleYourDetailsNext`, `handleNextClickNavigate`, `BenefitCard`, `CriteriaCard`.
- Uses: `react`, `react-router-dom`, `../headers/HeaderInvest`, `../Footer`, `./YourDetailsForm`.

#### `src/components/pages/CallAssistance.jsx`

*New file — 285 lines*

- Defines: `CallAssistance`, `handleInputChange`, `handleSubmit`, `SuccessPopup`.
- Uses: `react`, `react-router-dom`, `../../config/environment`, `../headers/Headerlogin`.

#### `src/components/investment plans/InvestmentPlansDetails.jsx`

*New file — 283 lines*

- Defines: `PlanCard`, `FundComparisonPage`, `fetchPlans`, `handleGetDetails`, `handleClosePopup`.
- Uses: `react`, `./Leftsidebar`, `../Footer`, `./PlanDetailsPopup`, `../StartBlock`, `../../context/InvestmentContext`, `../term insurance/ContactConfirmation`, `../common/OptimizedImage`.

#### `src/components/pages/WhatsAppQRDemo.jsx`

*New file — 281 lines*

- Defines: `WhatsAppQRDemo`.
- Uses: `react`, `../common/WhatsAppQRCode`, `../common/SimpleWhatsAppQR`, `../common/WhatsAppQRTest`.

#### `src/components/investment plans/InvestmentPlanConfig.jsx`

*New file — 280 lines*

- Defines: `InvestmentPlanConfig`, `handleNextClick`, `handleBackToForm`, `handleYourDetailsNext`, `BenefitCard`, `CriteriaCard`.
- Uses: `react`, `../headers/HeaderInvest`, `../Footer`, `./YourDetailsForm`.

#### `src/components/Group health insurace/GroupHealthPlanUpgrade.jsx`

*New file — 273 lines*

- Defines: `GroupHealthPlanUpgrade`, `PlanCard`, `getIconImage`.
- Uses: `react`, `react-router-dom`, `../headers/Header`, `../Footer`, `../assets/l.png`, `../assets/m.png`, `../assets/n.png`, `../assets/o.png`.

#### `src/components/pages/InsuranceServices.jsx`

*New file — 271 lines*

- Defines: `InsuranceServices`, `handleGetQuote`.
- Uses: `react`, `react-router-dom`, `../headers/CGPEHeader`, `../Footer`, `../assets/ii1.png`, `../assets/ii2.png`, `../assets/ii3.png`, `../assets/ii4.png`, `../assets/ii5.png`, `../assets/ii6.png`.

#### `src/utils/apiUtils.js`

*New file — 271 lines*

- Defines: `getApiBaseUrl`, `makeApiRequest`, `handleAxiosError`, `handleContactUsError`, `apiRequest`, `handleApiResponse`, `apiCall`, `getProductPath`, `fetchAllProducts`, `groupProductsByCategory`.
- Uses: `react-hot-toast`, `../config/environment`.

#### `src/components/common/WhatsAppQRCode.jsx`

*New file — 270 lines*

- Defines: `generateWhatsAppLink`, `generateQRCode`, `handleQRCodeClick`, `downloadQRCode`, `downloadQRWithTextPNG`, `downloadQRWithTextPDF`, `handleTextLineChange`, `addTextLine`, `removeTextLine`.
- Uses: `react`, `qrcode`.

#### `src/components/free of cost term/FOCTInsurance.jsx`

*New file — 268 lines*

- Defines: `FOCTInsurance`, `handleInputChange`, `handleSubmit`.
- Uses: `react`, `react-router-dom`, `../Footer.jsx`, `../headers/HeaderInvest`.

#### `src/components/Child saving insurance/PowerOfCompoundingCalculator.jsx`

*New file — 265 lines*

- Defines: `PowerOfCompoundingCalculator`, `fmtINR`, `futureValue`, `Tab`, `SliderBlock`, `SummaryCard`, `toWordsIN`.
- Uses: `react`.

#### `src/components/investment plans/InvestmentLanding.jsx`

*New file — 261 lines*

- Defines: `InvestmentLanding`, `handleInputChange`, `validate`, `handleSubmit`.
- Uses: `react`, `axios`, `../../config/environment`, `react-router-dom`, `../Footer.jsx`, `../headers/HeaderInvest`.

#### `src/components/StartBlock.jsx`

*New file — 256 lines*

- Defines: `StartBlock`.
- Uses: `react`.

#### `src/components/term insurance/Paymentscreen.jsx`

*New file — 255 lines*

- Defines: `PaymentScreen`, `getPlanData`, `getFallbackPrice`, `getNumericPrice`.
- Uses: `react`, `react-router-dom`, `../../context/PricingContext`.

#### `src/components/Child saving insurance/CareerSelectionScreen.jsx`

*New file — 252 lines*

- Defines: `CareerSelectionScreen`, `handleOptionClick`, `handleCollegeSelect`, `handleBackToCareer`, `MortarboardIcon`, `DoctorIcon`, `EngineerIcon`, `KidIcon`.
- Uses: `react`, `./CollegeSelectionScreen`.

#### `src/components/admin/GroupHealthInsuranceBulkUpload.jsx`

*New file — 252 lines*

- Defines: `GroupHealthInsuranceBulkUpload`, `handleFileChange`, `downloadTemplate`, `validateFile`, `handleUpload`, `renderErrorDetails`.
- Uses: `react`.

#### `src/components/admin/TermInsuranceSidebar.jsx`

*New file — 244 lines*

- Defines: `TermInsuranceSidebar`, `fetchPolicies`, `formatCurrency`, `getPolicyTypeIcon`, `getPolicyTypeColor`, `sortPolicies`.
- Uses: `react`.

#### `src/components/guaranted returns plan/PersonalDetailsForm.jsx`

*New file — 241 lines*

- Defines: `PersonalDetailsForm`, `handleInputChange`, `handleProceed`.
- Uses: `react`, `react-router-dom`.

#### `src/components/Family health insurance/NommoniedetailFHI.jsx`

*New file — 240 lines*

- Defines: `NomineeDetailsHI`, `handleInputChange`, `handleSubmit`.
- Uses: `react`, `react-router-dom`, `../headers/HeaderHI`, `../Footer`.

#### `src/components/health insurance/NomineeDetailsHI.jsx`

*New file — 237 lines*

- Defines: `NomineeDetailsHI`, `handleInputChange`, `handleSubmit`.
- Uses: `react`, `react-router-dom`, `../headers/HeaderHI`, `../Footer`.

#### `src/components/guaranted returns plan/GRPLanding.jsx`

*New file — 235 lines*

- Defines: `GRPLanding`, `handleInputChange`, `handleSubmit`.
- Uses: `react`, `react-router-dom`, `axios`, `../../config/environment`, `react-hot-toast`, `../headers/Header`, `../Footer`.

#### `src/components/guaranted returns plan/CompareWithFDPopup.jsx`

*New file — 234 lines*

- Defines: `CompareWithFDPopup`, `handlePlanBenefitsClick`, `handleProceedClick`, `Section`, `TwoCol`, `Rate`.
- Uses: `react`.

#### `src/components/Retirement insurance/PlanDetailsDrawer.jsx`

*New file — 233 lines*

- Defines: `PlanDetailsDrawer`, `handleProceed`.
- Uses: `react`, `react-router-dom`.

#### `src/components/guaranted returns plan/PlanBenefitsPopup.jsx`

*New file — 229 lines*

- Defines: `PlanBenefitsPopup`, `handleProceedClick`, `handleCompareWithFDClick`.
- Uses: `react`.

#### `src/components/common/ImageGallery.jsx`

*New file — 223 lines*

- Defines: `handleMouseEnter`, `handleMouseLeave`, `goToSlide`, `goToPrevious`, `goToNext`, `toggleFullscreen`.
- Uses: `react`, `./OptimizedImage`.

#### `src/components/common/LazyLoader.jsx`

*New file — 223 lines*

- Defines: `getSkeletonClass`, `getSizeClass`, `handleLoad`, `handleError`.
- Uses: `react`.

#### `src/components/pages/ClaimAssistance.jsx`

*New file — 222 lines*

- Defines: `ClaimAssistance`, `handleInputChange`, `handleSubmit`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`.

#### `src/components/health insurance/SelectcityHI.jsx`

*New file — 221 lines*

- Defines: `getMemberIcon`, `SelectCityHI`, `handleSearchChange`, `handleCitySelect`, `handleContinue`, `handleBack`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`, `../assets/account.png`, `../assets/personfemale.png`, `../assets/son.png`, `../assets/daughter.png`, `../assets/father.png`, `../assets/mother.png`, `../assets/grandfather.png`, `../assets/grandmother.png`, `../assets/father-in-law.png`, `../assets/mother-in-law.png`.

#### `src/components/admin/BikeInsuranceBulkUpload.jsx`

*New file — 220 lines*

- Defines: `BikeInsuranceBulkUpload`, `handleFileChange`, `downloadTemplate`, `handleUpload`.
- Uses: `react`.

#### `src/components/ContactForm.jsx`

*New file — 217 lines*

- Defines: `ContactForm`, `handleChange`, `handleSubmit`.
- Uses: `react`, `axios`, `../utils/apiUtils`.

#### `src/components/TestimonialsSection.jsx`

*New file — 217 lines*

- Defines: `TestimonialsSection`, `nextTestimonial`, `prevTestimonial`, `goToTestimonial`.
- Uses: `react`.

#### `src/components/guaranted returns plan/GRPLReviewdetail.jsx`

*New file — 217 lines*

- Defines: `InfoRow`, `GRPLReviewdetail`, `getFallbackPrice`, `handleProceedToPayment`, `calculateAge`, `formatDate`, `formatMobile`.
- Uses: `react`, `react-router-dom`, `../../context/UserDataContext`, `../../context/PricingContext`, `../headers/Header`, `../Footer`, `../term insurance/Paymentscreen`.

#### `src/components/investment plans/ReviewDetails.jsx`

*New file — 213 lines*

- Defines: `ReviewDetails`, `handleEditDetails`, `handleCheckout`.
- Uses: `react`, `react-router-dom`, `../headers/HeaderInvest`, `../Footer`.

#### `src/components/investment plans/YourDetailsForm.jsx`

*New file — 212 lines*

- Defines: `YourDetailsForm`, `handleInputChange`, `validateForm`, `handleNext`.
- Uses: `react`, `axios`, `react-router-dom`, `../../config/environment`.

#### `src/components/Footer.jsx`

*New file — 211 lines*

- Defines: `Footer`, `handleFooterClick`, `handleOtherInsuranceClick`.
- Uses: `react`, `react-router-dom`.

#### `src/components/term insurance/AddonBenefitsModal.jsx`

*New file — 209 lines*

- Defines: `AddonBenefitsModal`, `getCurrentPrice`.
- Uses: `react`, `../../context/PricingContext`.

#### `src/components/admin/CarInsuranceBulkUpload.jsx`

*New file — 205 lines*

- Defines: `CarInsuranceBulkUpload`, `handleFileChange`, `downloadTemplate`, `handleUpload`.
- Uses: `react`.

#### `src/components/admin/FamilyHealthInsuranceBulkUpload.jsx`

*New file — 205 lines*

- Defines: `FamilyHealthInsuranceBulkUpload`, `handleFileChange`, `downloadTemplate`, `handleUpload`.
- Uses: `react`.

#### `src/components/admin/ChildSavingInsuranceBulkUpload.jsx`

*New file — 204 lines*

- Defines: `ChildSavingInsuranceBulkUpload`, `handleFileChange`, `downloadTemplate`, `handleUpload`.
- Uses: `react`.

#### `src/components/term insurance/PolicyFilters.jsx`

*New file — 198 lines*

- Defines: `PolicyFilters`, `handleFilterChange`, `clearAllFilters`.
- Uses: `react`.

#### `src/components/Child saving insurance/YourDetailsForm.jsx`

*New file — 197 lines*

- Defines: `YourDetailsForm`, `handleInputChange`, `handleSubmit`.
- Uses: `react`.

#### `src/components/pages/Events.jsx`

*New file — 196 lines*

- Defines: `Events`.
- Uses: `react`, `react-router-dom`, `../headers/CGPEHeader`, `../Footer`.

#### `src/components/term insurance/Checkconfirmation.jsx`

*New file — 196 lines*

- Defines: `InfoRow`, `Checkconfirmation`, `getFallbackPrice`, `handleProceedToPayment`, `calculateAge`, `formatDate`, `formatMobile`.
- Uses: `react`, `react-router-dom`, `../../context/UserDataContext`, `../../context/PricingContext`, `../headers/Header`, `../Footer`, `./Paymentscreen`.

#### `src/components/Group health insurace/KnowYourExactPremium.jsx`

*New file — 193 lines*

- Defines: `KnowYourExactPremium`, `handleIndustrySelect`, `handleProceed`, `handleScheduleCallback`, `handleCallUs`.
- Uses: `react`, `react-router-dom`, `../headers/Header`, `../Footer`, `./ExpertContactModal`.

#### `src/components/Family health insurance/SelectcityFHI.jsx`

*New file — 188 lines*

- Defines: `SelectCityFHI`, `handleCitySelect`, `handleSearchChange`, `handleContinue`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`.

#### `src/components/admin/TravelInsuranceBulkUpload.jsx`

*New file — 188 lines*

- Defines: `TravelInsuranceBulkUpload`, `handleFileChange`, `downloadTemplate`, `handleUpload`.
- Uses: `react`.

#### `src/components/bike insurance/SelectBikeBrand.jsx`

*New file — 187 lines*

- Defines: `SelectBikeBrand`, `handleBrandSelect`, `handleContinue`, `handleCancel`, `handleOther`.
- Uses: `react`, `react-router-dom`, `../assets/suzuuki.png`, `../assets/honda.png`, `../assets/bajaj.png`, `../assets/TVS.png`, `../assets/yamaha.png`, `../assets/hero.png`, `../assets/re.png`, `../assets/ktm.png`, `../assets/ola.png`, `../assets/mahindra.png`, `./Selectbikemodel`.

#### `src/components/car insurance/SelectCarBrand.jsx`

*New file — 187 lines*

- Defines: `SelectCarBrand`, `handleBrandSelect`, `handleContinue`, `handleCancel`, `handleOther`.
- Uses: `react`, `react-router-dom`, `../assets/suzuki.png`, `../assets/hyundai.png`, `../assets/tata.png`, `../assets/mahindra.png`, `../assets/honda.png`, `../assets/toyota.png`, `../assets/ford.png`, `../assets/renault.png`, `../assets/kia.png`, `../assets/skoda.png`, `./SelectCarModel`.

#### `src/components/Retirement insurance/YourDetailsForm.jsx`

*New file — 186 lines*

- Defines: `YourDetailsForm`, `handleInputChange`, `handleProceed`.
- Uses: `react`.

#### `src/components/Travel insurance/TravelMedicalHistory.jsx`

*New file — 185 lines*

- Defines: `TravelMedicalHistory`.
- Uses: `react`, `../Footer`, `../headers/Header`.

#### `src/components/admin/RetirementInsuranceBulkUpload.jsx`

*New file — 185 lines*

- Defines: `RetirementInsuranceBulkUpload`, `handleFileChange`, `downloadTemplate`, `handleUpload`.
- Uses: `react`.

#### `src/components/guaranted returns plan/YourDetailsForm.jsx`

*New file — 185 lines*

- Defines: `YourDetailsForm`, `handleInputChange`, `handleProceed`.
- Uses: `react`.

#### `src/components/Child saving insurance/CSIFee.jsx`

*New file — 182 lines*

- Defines: `CSIFee`, `inr`, `inrLakh`.
- Uses: `react`.

#### `src/components/bike insurance/SelectBikeVariant.jsx`

*New file — 179 lines*

- Defines: `SelectBikeVariant`, `handleVariantSelect`, `handleCancel`, `handleBack`, `handleBackToVariant`.
- Uses: `react`, `react-router-dom`, `./SelectCarRegistrationYear`.

#### `src/components/term insurance/FAQModal.jsx`

*New file — 179 lines*

- Defines: `FAQModal`, `getCurrentPrice`, `toggleFAQ`.
- Uses: `react`.

#### `public/saptah/assets/index-DOW0tli3.js`

*New file — 178 lines*

- Defines: `yh`.
- Uses: `@emotion/is-prop-valid`.

#### `src/components/investment plans/Leftsidebar.jsx`

*New file — 176 lines*

- Defines: `LeftSidebar`, `handleYearSelect`, `handleAmountSelect`, `SidebarMenuItem`.
- Uses: `react`, `../../context/InvestmentContext`.

#### `src/components/pages/OurServices.jsx`

*New file — 175 lines*

- Defines: `OurServices`, `handleCallUs`, `handleServiceClick`.
- Uses: `react`, `react-router-dom`, `../headers/CGPEHeader`, `../Footer`.

#### `src/components/Family health insurance/EntermobilenumberFHI.jsx`

*New file — 174 lines*

- Defines: `EnterMobileNumberFHI`, `handleMobileChange`, `validateMobile`, `handleContinue`, `formatMobileNumber`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`.

#### `src/components/admin/AdminLogin.jsx`

*New file — 174 lines*

- Defines: `AdminLogin`, `handleChange`, `handleSubmit`.
- Uses: `react`, `react-router-dom`, `../../utils/apiUtils`.

#### `src/components/headers/Header.jsx`

*New file — 174 lines*

- Defines: `Header`, `calculateAge`, `formatIncome`, `getUserInfoString`.
- Uses: `react`, `../../context/UserDataContext`.

#### `src/utils/imageUtils.js`

*New file — 172 lines*

- Defines: `preloadImages`, `lazyLoadImages`, `compressImage`, `getOptimalImageFormat`, `getOptimizedImageUrl`, `isImageLoaded`, `getImageDimensions`.

#### `src/components/admin/FreeOfCostInsuranceBulkUpload.jsx`

*New file — 170 lines*

- Defines: `FreeOfCostInsuranceBulkUpload`, `handleFileChange`, `downloadTemplate`, `handleUpload`.
- Uses: `react`.

#### `src/components/bike insurance/Selectbikemodel.jsx`

*New file — 169 lines*

- Defines: `SelectBikeModel`, `handleModelSelect`, `handleContinue`, `handleCancel`, `handleOther`, `handleBack`.
- Uses: `react`, `react-router-dom`, `./SelectBikeVariant`.

#### `src/components/car insurance/SelectCarModel.jsx`

*New file — 169 lines*

- Defines: `SelectCarModel`, `handleModelSelect`, `handleContinue`, `handleCancel`, `handleOther`, `handleBack`.
- Uses: `react`, `react-router-dom`, `./SelectCarFuelType`.

#### `src/components/car insurance/UserDetailsForm.jsx`

*New file — 169 lines*

- Defines: `UserDetailsForm`, `handleInputChange`, `handleViewPrices`, `handleCarPriceSubmit`, `handleBack`.
- Uses: `react`, `react-router-dom`, `./CarPriceModal`.

#### `src/components/investment plans/PlanDetailsPopup.jsx`

*New file — 167 lines*

- Defines: `PlanDetailsPopup`, `PayoutInfoCard`.
- Uses: `react`, `react-router-dom`, `./FundPerformance`.

#### `src/components/Child saving insurance/CollegeSelectionScreen.jsx`

*New file — 166 lines*

- Defines: `CollegeSelectionScreen`, `handleCollegeSelect`, `handleContinue`, `handleCSIFeeClose`, `handleCSIFeeBack`, `handleCSIFeeStart`.
- Uses: `react`, `./CSIFee`.

#### `src/components/pages/Newsroom.jsx`

*New file — 165 lines*

- Defines: `Newsroom`.
- Uses: `react`, `../headers/CGPEHeader`, `../Footer`.

#### `src/components/car insurance/SelectCarVariant.jsx`

*New file — 160 lines*

- Defines: `SelectCarVariant`, `handleVariantSelect`, `handleContinue`, `handleCancel`, `handleBack`.
- Uses: `react`, `react-router-dom`, `./SelectCarRegistrationYear`.

#### `src/components/Child saving insurance/CSIPlancomperision.jsx`

*New file — 159 lines*

- Defines: `CSIPlancomperision`, `Cell`, `CheckIcon`, `CrossIcon`.
- Uses: `react`.

#### `src/components/common/SimpleWhatsAppQR.jsx`

*New file — 156 lines*

- Defines: `generateWhatsAppLink`, `generateQR`, `handleClick`, `downloadQRCode`, `downloadQRWithTextPNG`, `downloadQRWithTextPDF`.
- Uses: `react`, `qrcode`.

#### `src/components/free of cost term/FOCTOccuption.jsx`

*New file — 155 lines*

- Defines: `FOCTOccuption`, `handleOccupationChange`, `handleAnnualClose`, `handleAnnualNext`, `handleQualificationClose`, `handleQualificationNext`, `handleQualificationPrev`.
- Uses: `react`, `./FOCTAnnual`, `./FOCTQulification`.

#### `src/components/Retirement insurance/RIReviewDetails.jsx`

*New file — 147 lines*

- Defines: `RIReviewDetails`, `Section`, `Field`.
- Uses: `react`, `react-router-dom`, `../Footer`, `../headers/Headerlogin`.

#### `src/components/Timeline/Timeline.jsx`

*New file — 145 lines*

- Defines: `Timeline`.
- Uses: `react`.

#### `src/components/term insurance/AddonBenefitsCards.jsx`

*New file — 144 lines*

- Defines: `AddonBenefitsCards`, `handleToggleBenefit`.
- Uses: `react`.

#### `src/components/bike insurance/SelectCarRegistrationYear.jsx`

*New file — 143 lines*

- Defines: `SelectCarRegistrationYear`, `handleYearSelect`, `handleCancel`, `handleBack`, `handleContinue`.
- Uses: `react`, `react-router-dom`.

#### `src/components/common/OptimizedVideo.jsx`

*New file — 139 lines*

- Defines: `handleLoadedData`, `handleError`, `handlePlay`, `handlePause`.
- Uses: `react`.

#### `src/components/guaranted returns plan/TaxSavingsPopup.jsx`

*New file — 138 lines*

- Defines: `TaxSavingPopup`.
- Uses: `react`.

#### `src/components/investment plans/InvestmentPayment.jsx`

*New file — 137 lines*

- Defines: `InvestmentPayment`, `handlePayment`.
- Uses: `react`, `react-router-dom`.

#### `src/hooks/useImagePreloader.js`

*New file — 137 lines*

- Defines: `useImagePreloader`, `loadImage`, `useCriticalImagePreloader`, `preloadCriticalImages`.
- Uses: `react`.

#### `public/sw.js`

*New file — 136 lines*

- Defines: `doBackgroundSync`.

#### `src/components/Family health insurance/Familymembermadicalhistort.jsx`

*New file — 134 lines*

- Defines: `MedicalHistoryHI`, `handleCheck`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`.

#### `src/components/Family health insurance/SelectfamilymemberFHI.jsx`

*New file — 134 lines*

- Defines: `SelectFamilyMembersFHI`, `toggleMember`, `handleContinue`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`, `../assets/account.png`, `../assets/personfemale.png`, `../assets/son.png`, `../assets/daughter.png`, `../assets/father.png`, `../assets/mother.png`, `../assets/grandfather.png`, `../assets/grandmother.png`, `../assets/father-in-law.png`, `../assets/mother-in-law.png`.

#### `src/components/health insurance/MedicalhistoryHI.jsx`

*New file — 134 lines*

- Defines: `MedicalHistoryHI`, `handleCheck`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`.

#### `src/components/demo/LazyLoaderDemo.jsx`

*New file — 133 lines*

- Defines: `LazyLoaderDemo`.
- Uses: `react`, `../common/LazyLoader`.

#### `src/components/admin/HealthInsuranceBulkUpload.jsx`

*New file — 131 lines*

- Defines: `HealthInsuranceBulkUpload`, `handleFileChange`, `downloadTemplate`, `handleUpload`.
- Uses: `react`.

#### `src/components/car insurance/SelectCarFuelType.jsx`

*New file — 128 lines*

- Defines: `SelectCarFuelType`, `handleFuelTypeSelect`, `handleContinue`, `handleCancel`, `handleBack`.
- Uses: `react`, `react-router-dom`, `./SelectCarVariant`.

#### `src/components/Child saving insurance/ChildSavingsCalculator.jsx`

*New file — 127 lines*

- Defines: `ChildSavingsCalculator`, `handleInputChange`, `handleSubmit`, `handleCareerSelect`, `handleCloseCareerSelection`.
- Uses: `react`, `./CareerSelectionScreen`.

#### `src/components/term insurance/InsuranceForm.jsx`

*New file — 126 lines*

- Defines: `InsuranceForm`, `handleInputChange`, `handleGenderChange`, `handleSubmit`.
- Uses: `react`.

#### `src/components/car insurance/SelectCarRegistrationYear.jsx`

*New file — 124 lines*

- Defines: `SelectCarRegistrationYear`, `handleYearSelect`, `handleContinue`, `handleCancel`, `handleBack`.
- Uses: `react`, `react-router-dom`, `./UserDetailsForm`.

#### `src/components/health insurance/SelectfamilymemberHI.jsx`

*New file — 124 lines*

- Defines: `SelectFamilyMembersHI`, `toggleMember`, `handleContinue`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`, `../assets/account.png`, `../assets/personfemale.png`, `../assets/son.png`, `../assets/daughter.png`, `../assets/father.png`, `../assets/mother.png`, `../assets/grandfather.png`, `../assets/grandmother.png`, `../assets/father-in-law.png`, `../assets/mother-in-law.png`.

#### `src/components/term insurance/ContactConfirmation.jsx`

*New file — 124 lines*

- Defines: `ContactConfirmation`.
- Uses: `react`.

#### `src/components/Family health insurance/OfficeInsuranceQuestion.jsx`

*New file — 121 lines*

- Defines: `OfficeInsuranceQuestion`, `handleSelection`, `handleViewPlans`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`.

#### `src/components/admin/TermInsuranceBulkUpload.jsx`

*New file — 121 lines*

- Defines: `TermInsuranceBulkUpload`, `handleFileChange`, `downloadTemplate`, `handleUpload`.
- Uses: `react`.

#### `src/components/health insurance/SelectageHI.jsx`

*New file — 120 lines*

- Defines: `getMemberIcon`, `SelectAgeHI`, `handleContinue`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`, `../assets/account.png`, `../assets/personfemale.png`, `../assets/son.png`, `../assets/daughter.png`, `../assets/father.png`, `../assets/mother.png`, `../assets/grandfather.png`, `../assets/grandmother.png`, `../assets/father-in-law.png`, `../assets/mother-in-law.png`.

#### `src/components/bike insurance/BikeRenewal.jsx`

*New file — 117 lines*

- Defines: `BikeRenewal`, `handleViewPrices`, `handleBuyNewCar`.
- Uses: `react`, `react-router-dom`, `../assets/bike.png`, `./SelectBikeBrand`.

#### `src/components/car insurance/MotorRenewal.jsx`

*New file — 117 lines*

- Defines: `MotorRenewal`, `handleViewPrices`, `handleBuyNewCar`.
- Uses: `react`, `react-router-dom`, `../assets/car.png`, `./SelectCarBrand`.

#### `src/components/free of cost term/FOCTQulification.jsx`

*New file — 116 lines*

- Defines: `FOCTQulification`, `handleQualificationChange`, `handleSmokeClose`, `handleSmokeNext`, `handleSmokePrev`.
- Uses: `react`, `./FOCTSmoke`.

#### `src/context/PricingContext.jsx`

*New file — 116 lines*

- Defines: `usePricing`, `PricingProvider`, `getCurrentPrice`, `getFormattedPrice`, `getSelectedPlanDetails`.
- Uses: `react`.

#### `src/components/common/OptimizedImage.jsx`

*New file — 112 lines*

- Defines: `getOptimizedSrc`, `handleLoad`, `handleError`.
- Uses: `react`, `../../hooks/useImagePreloader`.

#### `src/components/health insurance/EntermobilenumberHI.jsx`

*New file — 111 lines*

- Defines: `EnterMobileNumberHI`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`.

#### `tailwind.config.js`

*New file — 109 lines*

- Data / content file (no functions or components).

#### `src/components/term insurance/Confirtfirst.jsx`

*New file — 106 lines*

- Defines: `Confirtfirst`, `handleInputChange`.
- Uses: `react`.

#### `src/components/term insurance/Confirmpage.jsx`

*New file — 105 lines*

- Defines: `Confirmpage`, `handleInputChange`.
- Uses: `react`.

#### `src/components/term insurance/InsurancePlanCards.jsx`

*New file — 105 lines*

- Defines: `InsurancePlanCards`.
- Uses: `react`, `../../context/PricingContext`.

#### `src/utils/browserUtils.js`

*New file — 105 lines*

- Defines: `getBrowserInfo`, `supportsAutoplay`, `supportsVideoPreload`, `getOptimalPreloadStrategy`, `supportsVideoCodec`, `getOptimalVideoFormat`, `isMobileDevice`, `getVideoLoadingStrategy`.

#### `src/components/Family health insurance/MedicalhistortFHI.jsx`

*New file — 101 lines*

- Defines: `MedicalHistortFHI`, `handleSelection`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`.

#### `src/components/health insurance/Medicalhistorygrid2Hi.jsx`

*New file — 101 lines*

- Defines: `MedicalHistoryGrid2HI`, `handleSelection`.
- Uses: `react`, `react-router-dom`, `../headers/Headerlogin`.

#### `src/utils/cityNamesExample.js`

*New file — 100 lines*

- Defines: `CitySelector`, `handleSearch`, `CityDropdown`.
- Uses: `react`, `../utils/cityNames`.

#### `scripts/check-preload.js`

*New file — 98 lines*

- Defines: `checkPreloads`, `lazyImports`.
- Uses: `fs`, `path`.

#### `src/components/common/SafeVideo.jsx`

*New file — 94 lines*

- Defines: `handleError`, `handleLoadStart`, `handleCanPlay`, `handleAbort`.
- Uses: `react`.

#### `scripts/optimize-images.js`

*New file — 93 lines*

- Defines: `optimizeImage`, `optimizeImages`.
- Uses: `fs`, `path`, `sharp`.

#### `src/hooks/useVideoLoader.js`

*New file — 93 lines*

- Defines: `useVideoLoader`, `handleLoadStart`, `handleCanPlay`, `handleError`, `handleAbort`, `play`, `pause`.
- Uses: `react`.

#### `src/utils/videoLoadingManager.js`

*New file — 93 lines*

- Defines: `VideoLoadingManager`.

#### `src/components/Family health insurance/GenderselectionFHI.jsx`

*New file — 92 lines*

- Defines: `GenderSelectScreenFHI`, `handleContinue`.
- Uses: `react`, `react-router-dom`, `../assets/personfemale.png`, `../assets/account.png`, `../headers/Headerlogin`.

#### `src/components/health insurance/GenderselectscreenHI.jsx`

*New file — 92 lines*

- Defines: `GenderSelectScreenHI`, `handleContinue`.
- Uses: `react`, `react-router-dom`, `../assets/personfemale.png`, `../assets/account.png`, `../headers/Headerlogin`.

#### `src/components/common/WhatsAppQRCode.test.js`

*New file — 90 lines*

- Uses: `react`, `@testing-library/react`, `@testing-library/jest-dom`, `./WhatsAppQRCode`.

#### `src/utils/videoUtils.js`

*New file — 89 lines*

- Defines: `safeLoadVideo`, `optimizeVideoLoading`, `safeVideoControl`, `isVideoFormatSupported`, `getOptimalVideoFormat`.

#### `scripts/analyze-bundle.js`

*New file — 88 lines*

- Defines: `analyzeBundle`.
- Uses: `fs`, `path`.

#### `src/components/guaranted returns plan/PlanBenefitsDemo.jsx`

*New file — 85 lines*

- Defines: `PlanBenefitsDemo`, `handleProceedClick`.
- Uses: `react`, `react-router-dom`, `./PlanBenefitsPopup`.

#### `src/components/common/PerformanceMonitor.jsx`

*New file — 82 lines*

- Defines: `PerformanceMonitor`, `measurePerformance`, `monitorImageLoading`.
- Uses: `react`.

#### `src/components/free of cost term/FOCTSmoke.jsx`

*New file — 80 lines*

- Defines: `FOCTSmoke`, `handleSmokingChange`.
- Uses: `react`.

#### `src/components/term insurance/Smokeform.jsx`

*New file — 80 lines*

- Defines: `SmokeForm`, `handleSmokingChange`.
- Uses: `react`.

#### `src/components/term women insurance/TWISmoke.jsx`

*New file — 80 lines*

- Defines: `TWISmoke`, `handleSmokingChange`.
- Uses: `react`.

#### `src/components/common/WhatsAppQRTest.jsx`

*New file — 79 lines*

- Defines: `WhatsAppQRTest`, `testPNGDownload`, `testPDFDownload`.
- Uses: `react`, `../../utils/whatsappQRUtils`.

#### `src/components/free of cost term/FOCTAnnual.jsx`

*New file — 79 lines*

- Defines: `FOCTAnnual`, `handleIncomeChange`.
- Uses: `react`.

#### `src/components/term women insurance/TWIOccuption.jsx`

*New file — 79 lines*

- Defines: `OccupationForm`, `handleOccupationChange`.
- Uses: `react`.

#### `src/components/car insurance/CarPriceModal.jsx`

*New file — 78 lines*

- Defines: `CarPriceModal`, `handleSubmit`, `handleDontKnow`.
- Uses: `react`.

#### `src/components/pages/ComingSoon.jsx`

*New file — 78 lines*

- Defines: `ComingSoon`.
- Uses: `react`, `react-router-dom`, `../headers/CGPEHeader`, `../Footer`.

#### `src/components/term insurance/Annualincome.jsx`

*New file — 77 lines*

- Defines: `AnnualIncome`, `handleIncomeChange`.
- Uses: `react`.

#### `src/components/Group health insurace/ExpertContactModal.jsx`

*New file — 74 lines*

- Defines: `ExpertContactModal`.
- Uses: `react`, `../assets/IMAGE.png`.

#### `src/components/term insurance/Alcoholform.jsx`

*New file — 74 lines*

- Defines: `AlcoholForm`, `handleAlcoholChange`.
- Uses: `react`.

#### `src/components/term insurance/Qualificationform.jsx`

*New file — 72 lines*

- Defines: `QualificationForm`, `handleQualificationChange`.
- Uses: `react`.

#### `src/components/term women insurance/TWIAlkohole.jsx`

*New file — 72 lines*

- Defines: `TWIAlkohole`, `handleAlcoholChange`.
- Uses: `react`.

#### `src/components/term women insurance/TWIQualification.jsx`

*New file — 72 lines*

- Defines: `TWIQualificationForm`, `handleQualificationChange`.
- Uses: `react`.

#### `src/utils/removeCursorPointer.js`

*New file — 71 lines*

- Defines: `removeCursorPointer`, `applyNoCursorStyles`, `initCursorObserver`.

#### `src/components/term women insurance/TWIAnnualincome.jsx`

*New file — 69 lines*

- Defines: `TWIAnnualincome`, `handleIncomeChange`.
- Uses: `react`.

#### `src/components/term insurance/Occuptionform.jsx`

*New file — 68 lines*

- Defines: `OccupationForm`, `handleOccupationChange`.
- Uses: `react`.

#### `setup-admin-users.js`

*New file — 65 lines*

- Defines: `setupAdminUsers`.
- Uses: `bcrypt`.

#### `src/context/UserDataContext.jsx`

*New file — 59 lines*

- Defines: `useUserData`, `UserDataProvider`, `updateUserData`, `clearUserData`.
- Uses: `react`.

#### `src/config/environment.js`

*New file — 58 lines*

- Defines: `getApiBaseUrl`, `getApiUrl`, `debugEnvironment`.
- Reads environment variables: `REACT_APP_API_BASE`, `NODE_ENV`.

#### `generate-hashed-passwords.js`

*New file — 55 lines*

- Defines: `generateHashedPasswords`.
- Uses: `bcrypt`.

#### `src/components/headers/Headerlogin.jsx`

*New file — 54 lines*

- Defines: `Headerlogin`, `handleClaimAssistanceClick`, `handleCallUsClick`.
- Uses: `react`, `react-router-dom`, `../assets/Asset.svg`, `../assets/HEADER2.svg`.

#### `src/components/common/EmptyState.jsx`

*New file — 53 lines*

- Defines: `getVariantStyles`.
- Uses: `react`.

#### `package.json`

*New file — 52 lines*

- Added package `@babel/helper-define-polyfill-provider` ^0.6.5
- Added package `@testing-library/jest-dom` ^5.16.4
- Added package `@testing-library/react` ^13.3.0
- Added package `@testing-library/user-event` ^13.5.0
- Added package `animejs` ^4.1.2
- Added package `axios` ^1.11.0
- Added package `bcrypt` ^6.0.0
- Added package `framer-motion` ^12.38.0
- Added package `jspdf` ^3.0.3
- Added package `lucide-react` ^1.0.1
- Added package `qrcode` ^1.5.4
- Added package `react` ^18.2.0
- Added package `react-dom` ^18.2.0
- Added package `react-hot-toast` ^2.5.2
- Added package `react-icons` ^5.5.0
- Added package `react-router-dom` ^6.8.0
- Added package `react-scripts` 5.0.1
- Added package `web-vitals` ^2.1.4
- Added package `xlsx` ^0.18.5
- Added package `autoprefixer` ^10.4.14
- Added package `postcss` ^8.4.24
- Added package `tailwindcss` ^3.3.2
- Added npm script `start`
- Added npm script `build`
- Added npm script `build:analyze`
- Added npm script `test`
- Added npm script `eject`
- Added npm script `optimize:images`
- Added npm script `preload:check`

#### `src/components/common/ImagePreloader.jsx`

*New file — 48 lines*

- Defines: `ImagePreloader`.
- Uses: `react`, `../../hooks/useImagePreloader`.

#### `src/components/common/LazyLoader.test.js`

*New file — 44 lines*

- Uses: `react`, `@testing-library/react`, `./LazyLoader`.

#### `src/Home.jsx`

*New file — 42 lines*

- Defines: `Home`, `formatDate`, `getStatusBadge`.
- Uses: `react`, `react-router-dom`, `./components/headers/Header`, `./components/term insurance/PolicySuggestList`, `./components/Footer`, `./components/term insurance/ConfirmationModal`.

#### `src/components/headers/HeaderInvest.jsx`

*New file — 41 lines*

- Defines: `HeaderInvest`.
- Uses: `react`.

#### `src/components/common/LoadingState.jsx`

*New file — 40 lines*

- Defines: `getSizeStyles`.
- Uses: `react`.

#### `src/components/headers/HeaderHI.jsx`

*New file — 39 lines*

- Defines: `HeaderHI`.
- Uses: `react`, `../assets/Asset.svg`, `../assets/HEADER2.svg`.

#### `src/index.js`

*New file — 39 lines*

- Uses: `react`, `react-dom/client`, `./App.jsx`, `./context/UserDataContext`, `./context/PricingContext`, `./styles/no-cursor.css`, `./utils/removeCursorPointer`.

#### `src/components/pages/Saptah.jsx`

*New file — 37 lines*

- Defines: `Saptah`.
- Uses: `react`, `../headers/CGPEHeader`, `../saptah/HeroSection`, `../saptah/PurposeSection`, `../saptah/KathaGayakSection`, `../saptah/MessageSection`, `../saptah/AchievementSection`, `../saptah/FamilySection`, `../saptah/WhyRishikesh`, `../saptah/HighlightsSection`, `../saptah/GallerySection`, `../saptah/FinalCTA`, `../saptah/SaptahFooter`, `../saptah/Saptah.css`.

#### `src/context/InvestmentContext.jsx`

*New file — 29 lines*

- Defines: `useInvestment`, `InvestmentProvider`.
- Uses: `react`.

#### `src/components/common/WhiteCoatWealthQR.jsx`

*New file — 27 lines*

- Uses: `react`, `./WhatsAppQRCode`.

#### `public/config.js`

*New file — 25 lines*

- Data / content file (no functions or components).

#### `src/components/term insurance/Generalform.jsx`

*New file — 17 lines*

- Defines: `Generalform`.
- Uses: `react`, `../headers/Headerlogin`, `./MainContent`.

#### `src/config/api.js`

*New file — 14 lines*

- Data / content file (no functions or components).
- Reads environment variables: `REACT_APP_API_BASE`.

#### `webpack.config.js`

*New file — 9 lines*

- Uses: `path`.

#### `postcss.config.js`

*New file — 6 lines*

- Data / content file (no functions or components).

#### `src/components/admin/ContactUsInquiryList.jsx`

*New file — 0 lines*

- Data / content file (no functions or components).

**Other new files**

- `package-lock.json` — 18617 lines
- `src/components/Informationpage/Informationpage.css` — 962 lines
- `src/index.css` — 577 lines
- `src/components/common/README_WHATSAPP_QR.md` — 261 lines
- `src/utils/README.md` — 255 lines
- `src/components/assets/Group8757.svg` — 234 lines
- `admin-credentials.html` — 231 lines
- `add.txt` — 212 lines
- `src/utils/README_IMAGE_OPTIMIZATION.md` — 209 lines
- `src/styles/imageOptimization.css` — 181 lines
- `PERFORMANCE_OPTIMIZATION.md` — 138 lines
- `src/styles/no-cursor.css` — 130 lines
- `src/components/common/README.md` — 116 lines
- `README.md` — 108 lines
- `public/index.html` — 72 lines
- `public/offline.html` — 62 lines
- `public/saptah/placeholder.svg` — 40 lines
- `public/404.html` — 38 lines
- `public/nginx.conf` — 38 lines
- `Dockerfile` — 32 lines
- `vercel.json` — 32 lines
- `public/saptah/index.html` — 25 lines
- `.gitignore` — 23 lines
- `public/web.config` — 19 lines
- `public/manifest.json` — 15 lines
- `public/saptah/robots.txt` — 14 lines
- `src/components/assets/Asset.svg` — 13 lines
- `src/components/assets/HEADER2.svg` — 12 lines
- `.env.example` — 5 lines
- `public/.htaccess` — 5 lines
- `public/_redirects` — 3 lines
- `public/saptah/assets/index-DsLily_j.css` — 1 lines
- `src/components/assets/mdrt-award.png` — 1 lines
- `.env` — binary file
- `public/assets/community/34812441084_f4e546d439_b.jpg` — binary file
- `public/assets/community/Ved-Vyas-tirth.jpg` — binary file
- `public/assets/community/aaa.jpg` — binary file
- `public/assets/community/bbb.jpg` — binary file
- `public/assets/community/ganga-aarti.jpg` — binary file
- `public/assets/community/hero-rishikesh.jpg` — binary file
- `public/assets/community/rishikesh-ganga.jpg` — binary file
- `public/assets/community/satsang.jpg` — binary file
- `"public/assets/community/\340\252\266\340\253\215\340\252\260\340\253\200\340\252\256\340\252\246\340\253\215\340\252\255\340\252\276 \340\252\255\340\252\276\340\252\227\340\252\265\340\252\244 \340\252\270\340\252\252\340\253\215\340\252\244\340\252\276\340\252\271 \340\252\206\340\252\256\340\252\202\340\252\244\340\253\215\340\252\260\340\252\243-CGPE (1).png"` — binary file
- `"public/assets/community/\340\252\266\340\253\215\340\252\260\340\253\200\340\252\256\340\252\246\340\253\215\340\252\255\340\252\276 \340\252\255\340\252\276\340\252\227\340\252\265\340\252\244 \340\252\270\340\252\252\340\253\215\340\252\244\340\252\276\340\252\271 \340\252\206\340\252\256\340\252\202\340\252\244\340\253\215\340\252\260\340\252\243-CGPE.png"` — binary file
- `public/assets/images/BAJAJ_logo.png.png` — binary file
- `public/assets/images/Birla_Sun_Life_logo.png.png` — binary file
- `public/assets/images/C.G3.png` — binary file
- `public/assets/images/Group8756.png` — binary file
- `public/assets/images/HDFC_Life_logo.png.png` — binary file
- `public/assets/images/HEADERLOGO.png` — binary file
- `public/assets/images/ICICI_logo.png.png` — binary file
- `public/assets/images/IMAGE.png` — binary file
- `public/assets/images/IMG_3633.jpg` — binary file
- `public/assets/images/MAX_logo.png.png` — binary file
- `public/assets/images/PNB_Metlife_logo.png.png` — binary file
- `public/assets/images/SBI_logo.png.png` — binary file
- `public/assets/images/TATA_AIA_logo.png.png` — binary file
- `public/assets/images/a.png` — binary file
- `public/assets/images/about.png` — binary file
- `public/assets/images/about1.png` — binary file
- `public/assets/images/about2.png` — binary file
- `public/assets/images/about3.png` — binary file
- `public/assets/images/assistant1.png` — binary file
- `public/assets/images/b.png` — binary file
- `public/assets/images/bharti.png` — binary file
- `public/assets/images/bkcareer.png` — binary file
- `public/assets/images/bkfa.png` — binary file
- `public/assets/images/bkfi.png` — binary file
- `public/assets/images/bkin.png` — binary file
- `public/assets/images/bkmu.png` — binary file
- `public/assets/images/c.png` — binary file
- `public/assets/images/cg2.png` — binary file
- `public/assets/images/ch.png` — binary file
- `public/assets/images/credit.png` — binary file
- `public/assets/images/cu1.jpg` — binary file
- `public/assets/images/cu2.jpg` — binary file
- `public/assets/images/cu3.jpg` — binary file
- `public/assets/images/cu4.jpg` — binary file
- `public/assets/images/cu5.jpg` — binary file
- `public/assets/images/cu6.png` — binary file
- `public/assets/images/d.png` — binary file
- `public/assets/images/debit.png` — binary file
- `public/assets/images/e.png` — binary file
- `public/assets/images/emi.png` — binary file
- `public/assets/images/exid.png` — binary file
- `public/assets/images/f.png` — binary file
- `public/assets/images/fa.mp4` — binary file
- `public/assets/images/fir.png` — binary file
- `public/assets/images/future.png` — binary file
- `public/assets/images/g.png` — binary file
- `public/assets/images/h.png` — binary file
- `public/assets/images/i.png` — binary file
- `public/assets/images/i2.png` — binary file
- `public/assets/images/i3.png` — binary file
- `public/assets/images/i4.png` — binary file
- `public/assets/images/i5.png` — binary file
- `public/assets/images/icicipre.jpg` — binary file
- `public/assets/images/idbi.png` — binary file
- `public/assets/images/india.png` — binary file
- `public/assets/images/j.png` — binary file
- `public/assets/images/k.png` — binary file
- `public/assets/images/kotsk.png` — binary file
- `public/assets/images/l.png` — binary file
- `public/assets/images/lic.png` — binary file
- `public/assets/images/m.png` — binary file
- `public/assets/images/mail.png` — binary file
- `public/assets/images/mu1.png` — binary file
- `public/assets/images/mu2.png` — binary file
- `public/assets/images/mu3.png` — binary file
- `public/assets/images/mu4.png` — binary file
- `public/assets/images/mu5.png` — binary file
- `public/assets/images/mu6.png` — binary file
- `public/assets/images/netbanking.png` — binary file
- `public/assets/images/phone.png` — binary file
- `public/assets/images/pnb.png` — binary file
- `public/assets/images/r1.mp4` — binary file
- `public/assets/images/r2.mp4` — binary file
- `public/assets/images/r3.mp4` — binary file
- `public/assets/images/r4.mp4` — binary file
- `public/assets/images/r5.mp4` — binary file
- `public/assets/images/rameshbhai.jpg` — binary file
- `public/assets/images/re.png` — binary file
- `public/assets/images/relience.png` — binary file
- `public/assets/images/sbi.png` — binary file
- `public/assets/images/sec.png` — binary file
- `public/assets/images/sitemap.png` — binary file
- `public/assets/images/stu.png` — binary file
- `public/assets/images/t1.png` — binary file
- `public/assets/images/t2.png` — binary file
- `public/assets/images/t3.png` — binary file
- `public/assets/images/t4.png` — binary file
- `public/assets/images/t5.png` — binary file
- `public/assets/images/t6.png` — binary file
- `public/assets/images/tt1.png` — binary file
- `public/assets/images/tt2.png` — binary file
- `public/assets/images/tt3.png` — binary file
- `public/assets/images/upi.png` — binary file
- `public/assets/saptah/Ved-Vyas-tirth.jpg` — binary file
- `public/assets/saptah/aaa.jpg` — binary file
- `public/assets/saptah/bbb.jpg` — binary file
- `public/assets/saptah/cgpe-invitation-2.png` — binary file
- `public/assets/saptah/cgpe-invitation.png` — binary file
- `public/assets/saptah/ganga-aarti.jpg` — binary file
- `public/assets/saptah/hero-rishikesh.jpg` — binary file
- `public/assets/saptah/invitation-cgpe-2.png` — binary file
- `public/assets/saptah/invitation-cgpe.png` — binary file
- `public/assets/saptah/rishikesh-ganga.jpg` — binary file
- `public/assets/saptah/satsang.jpg` — binary file
- `public/saptah/assets/aaa-C8wa7N9H.jpg` — binary file
- `public/saptah/assets/bbb-BcfMmlpb.jpg` — binary file
- `public/saptah/assets/ganga-aarti-BpCJPJy9.jpg` — binary file
- `public/saptah/assets/satsang-D4S0oZSe.jpg` — binary file
- `"public/saptah/assets/\340\252\266\340\253\215\340\252\260\340\253\200\340\252\256\340\252\246\340\253\215\340\252\255\340\252\276 \340\252\255\340\252\276\340\252\227\340\252\265\340\252\244 \340\252\270\340\252\252\340\253\215\340\252\244\340\252\276\340\252\271 \340\252\206\340\252\256\340\252\202\340\252\244\340\253\215\340\252\260\340\252\243-CGPE (1)-VXglp4an.png"` — binary file
- `"public/saptah/assets/\340\252\266\340\253\215\340\252\260\340\253\200\340\252\256\340\252\246\340\253\215\340\252\255\340\252\276 \340\252\255\340\252\276\340\252\227\340\252\265\340\252\244 \340\252\270\340\252\252\340\253\215\340\252\244\340\252\276\340\252\271 \340\252\206\340\252\256\340\252\202\340\252\244\340\253\215\340\252\260\340\252\243-CGPE-COuQZSGs.png"` — binary file
- `public/saptah/favicon.ico` — binary file
- `src/components/assets/E.png` — binary file
- `src/components/assets/Group55383.png` — binary file
- `src/components/assets/IMAGE.png` — binary file
- `src/components/assets/TVS.png` — binary file
- `src/components/assets/a.png` — binary file
- `src/components/assets/account.png` — binary file
- `src/components/assets/aw1.JPG` — binary file
- `src/components/assets/aw10.JPG` — binary file
- `src/components/assets/aw10v.mp4` — binary file
- `src/components/assets/aw11.JPG` — binary file
- `src/components/assets/aw11v.MP4` — binary file
- `src/components/assets/aw12.JPG` — binary file
- `src/components/assets/aw12v.MP4` — binary file
- `src/components/assets/aw13.JPG` — binary file
- `src/components/assets/aw13v.MP4` — binary file
- `src/components/assets/aw14.JPG` — binary file
- `src/components/assets/aw14v.MP4` — binary file
- `src/components/assets/aw15.JPG` — binary file
- `src/components/assets/aw15v.MP4` — binary file
- `src/components/assets/aw16.JPG` — binary file
- `src/components/assets/aw16v.MP4` — binary file
- `src/components/assets/aw17.JPG` — binary file
- `src/components/assets/aw17v.MP4` — binary file
- `src/components/assets/aw18.JPG` — binary file
- `src/components/assets/aw18v.MP4` — binary file
- `src/components/assets/aw19.JPG` — binary file
- `src/components/assets/aw19v.MP4` — binary file
- `src/components/assets/aw1v.MP4` — binary file
- `src/components/assets/aw2.JPG` — binary file
- `src/components/assets/aw20.JPG` — binary file
- `src/components/assets/aw20v.MP4` — binary file
- `src/components/assets/aw21.JPG` — binary file
- `src/components/assets/aw21v.MP4` — binary file
- `src/components/assets/aw22.JPG` — binary file
- `src/components/assets/aw22v.MP4` — binary file
- `src/components/assets/aw23.JPG` — binary file
- `src/components/assets/aw23v.MP4` — binary file
- `src/components/assets/aw24.JPG` — binary file
- `src/components/assets/aw24v.MP4` — binary file
- `src/components/assets/aw25.JPG` — binary file
- `src/components/assets/aw25v.MP4` — binary file
- `src/components/assets/aw26.JPG` — binary file
- `src/components/assets/aw26v.MP4` — binary file
- `src/components/assets/aw27.JPG` — binary file
- `src/components/assets/aw27v.MP4` — binary file
- `src/components/assets/aw28.JPG` — binary file
- `src/components/assets/aw28v.MP4` — binary file
- `src/components/assets/aw29.JPG` — binary file
- `src/components/assets/aw29v.MP4` — binary file
- `src/components/assets/aw2v.mp4` — binary file
- `src/components/assets/aw3.JPG` — binary file
- `src/components/assets/aw30.JPG` — binary file
- `src/components/assets/aw30v.MP4` — binary file
- `src/components/assets/aw31.JPG` — binary file
- `src/components/assets/aw31v.MP4` — binary file
- `src/components/assets/aw32.JPG` — binary file
- `src/components/assets/aw32v.MP4` — binary file
- `src/components/assets/aw33.JPG` — binary file
- `src/components/assets/aw33v.MP4` — binary file
- `src/components/assets/aw34.JPG` — binary file
- `src/components/assets/aw34v.MP4` — binary file
- `src/components/assets/aw35.JPG` — binary file
- `src/components/assets/aw35v.MP4` — binary file
- `src/components/assets/aw36.JPG` — binary file
- `src/components/assets/aw36v.MP4` — binary file
- `src/components/assets/aw37.jpeg` — binary file
- `src/components/assets/aw37v.mp4` — binary file
- `src/components/assets/aw38.jpeg` — binary file
- `src/components/assets/aw38v.mp4` — binary file
- `src/components/assets/aw39.jpeg` — binary file
- `src/components/assets/aw39v.mp4` — binary file
- `src/components/assets/aw3v.MP4` — binary file
- `src/components/assets/aw4.JPG` — binary file
- `src/components/assets/aw40.jpeg` — binary file
- `src/components/assets/aw40v.mp4` — binary file
- `src/components/assets/aw41.jpeg` — binary file
- `src/components/assets/aw41v.mp4` — binary file
- `src/components/assets/aw4v.MP4` — binary file
- `src/components/assets/aw5.JPG` — binary file
- `src/components/assets/aw5v.MP4` — binary file
- `src/components/assets/aw6.JPG` — binary file
- `src/components/assets/aw6v.MP4` — binary file
- `src/components/assets/aw7.JPG` — binary file
- `src/components/assets/aw7v.MP4` — binary file
- `src/components/assets/aw8.JPG` — binary file
- `src/components/assets/aw8v.MP4` — binary file
- `src/components/assets/aw9.JPG` — binary file
- `src/components/assets/aw9v.MP4` — binary file
- `src/components/assets/b.png` — binary file
- `src/components/assets/bajaj.png` — binary file
- `src/components/assets/bike.png` — binary file
- `src/components/assets/c.png` — binary file
- `src/components/assets/c1.png` — binary file
- `src/components/assets/c2.png` — binary file
- `src/components/assets/c3.png` — binary file
- `src/components/assets/c4.png` — binary file
- `src/components/assets/c5.png` — binary file
- `src/components/assets/c6.png` — binary file
- `src/components/assets/car.png` — binary file
- `src/components/assets/cee1.png` — binary file
- `src/components/assets/cee2.png` — binary file
- `src/components/assets/cee3.png` — binary file
- `src/components/assets/ci.png` — binary file
- `src/components/assets/cr1.png` — binary file
- `src/components/assets/cr10.png` — binary file
- `src/components/assets/cr11.png` — binary file
- `src/components/assets/cr12.png` — binary file
- `src/components/assets/cr2.png` — binary file
- `src/components/assets/cr3.png` — binary file
- `src/components/assets/cr4.png` — binary file
- `src/components/assets/cr5.png` — binary file
- `src/components/assets/cr6.png` — binary file
- `src/components/assets/cr7.png` — binary file
- `src/components/assets/cr8.png` — binary file
- `src/components/assets/cr9.png` — binary file
- `src/components/assets/d.png` — binary file
- `src/components/assets/daughter.png` — binary file
- `src/components/assets/f.png` — binary file
- `src/components/assets/fa1.png` — binary file
- `src/components/assets/fa2.png` — binary file
- `src/components/assets/fa3.png` — binary file
- `src/components/assets/fa4.png` — binary file
- `src/components/assets/fa5.png` — binary file
- `src/components/assets/fa6.png` — binary file
- `src/components/assets/father-in-law.png` — binary file
- `src/components/assets/father.png` — binary file
- `src/components/assets/fi1.png` — binary file
- `src/components/assets/fi2.png` — binary file
- `src/components/assets/fi3.png` — binary file
- `src/components/assets/fi4.png` — binary file
- `src/components/assets/fi5.png` — binary file
- `src/components/assets/fi6.png` — binary file
- `src/components/assets/ford.png` — binary file
- `src/components/assets/g.png` — binary file
- `src/components/assets/gh.png` — binary file
- `src/components/assets/gh2.png` — binary file
- `src/components/assets/gh3.png` — binary file
- `src/components/assets/gp48.png` — binary file
- `src/components/assets/gpt1.png` — binary file
- `src/components/assets/gpt2.png` — binary file
- `src/components/assets/gpt3.png` — binary file
- `src/components/assets/gpt51.png` — binary file
- `src/components/assets/grandfather.png` — binary file
- `src/components/assets/grandmother.png` — binary file
- `src/components/assets/h.png` — binary file
- `src/components/assets/hero.png` — binary file
- `src/components/assets/hhhh.png` — binary file
- `src/components/assets/hihi.png` — binary file
- `src/components/assets/honda.png` — binary file
- `src/components/assets/hyundai.png` — binary file
- `src/components/assets/i.png` — binary file
- `src/components/assets/ii1.png` — binary file
- `src/components/assets/ii2.png` — binary file
- `src/components/assets/ii3.png` — binary file
- `src/components/assets/ii4.png` — binary file
- `src/components/assets/ii5.png` — binary file
- `src/components/assets/ii6.png` — binary file
- `src/components/assets/j.png` — binary file
- `src/components/assets/k.png` — binary file
- `src/components/assets/kia.png` — binary file
- `src/components/assets/ktm.png` — binary file
- `src/components/assets/l.png` — binary file
- `src/components/assets/l1.png` — binary file
- `src/components/assets/l10.png` — binary file
- `src/components/assets/l11.png` — binary file
- `src/components/assets/l12.png` — binary file
- `src/components/assets/l2.png` — binary file
- `src/components/assets/l3.png` — binary file
- `src/components/assets/l4.png` — binary file
- `src/components/assets/l5.png` — binary file
- `src/components/assets/l6.png` — binary file
- `src/components/assets/l7.png` — binary file
- `src/components/assets/l8.png` — binary file
- `src/components/assets/l9.png` — binary file
- `src/components/assets/m.png` — binary file
- `src/components/assets/mahindra.png` — binary file
- `src/components/assets/mother-in-law.png` — binary file
- `src/components/assets/mother.png` — binary file
- `src/components/assets/n.png` — binary file
- `src/components/assets/o.png` — binary file
- `src/components/assets/ola.png` — binary file
- `src/components/assets/p.png` — binary file
- `src/components/assets/personfemale.png` — binary file
- `src/components/assets/q.png` — binary file
- `src/components/assets/re.png` — binary file
- `src/components/assets/renault.png` — binary file
- `src/components/assets/s1.png` — binary file
- `src/components/assets/s10.png` — binary file
- `src/components/assets/s2.png` — binary file
- `src/components/assets/s3.png` — binary file
- `src/components/assets/s4.png` — binary file
- `src/components/assets/s5.png` — binary file
- `src/components/assets/s6.png` — binary file
- `src/components/assets/s7.png` — binary file
- `src/components/assets/s8.png` — binary file
- `src/components/assets/s9.png` — binary file
- `src/components/assets/skoda.png` — binary file
- `src/components/assets/son.png` — binary file
- `src/components/assets/suzuki.png` — binary file
- `src/components/assets/suzuuki.png` — binary file
- `src/components/assets/tata.png` — binary file
- `src/components/assets/toyota.png` — binary file
- `src/components/assets/yamaha.png` — binary file

### Impact

- Code now reads `REACT_APP_API_BASE` — make sure it is set in the `.env` / deployment.
- Code now reads `NODE_ENV` — make sure it is set in the `.env` / deployment.
- Dependencies changed in `package.json` — run `npm install` and rebuild the Docker image before deploying.
- Build/deploy configuration changed: `.env` — re-check the build and deployment.
- Build/deploy configuration changed: `.env.example` — re-check the build and deployment.
- Build/deploy configuration changed: `Dockerfile` — re-check the build and deployment.
- Build/deploy configuration changed: `public/nginx.conf` — re-check the build and deployment.
- 2 test file(s) were added or changed — run the tests.

---
