import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/environment';
import { toast } from 'react-hot-toast';

const TataAIAProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [viewingProduct, setViewingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [brochureFile, setBrochureFile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Life Insurance',
        description: '',
        features: '',
        benefits: '',
        eligibility: '',
        documents: '',
        planOptions: {
            minimumEntryAge: '18 years',
            maximumEntryAge: '60 years',
            minimumAgeAtMaturity: '18 years',
            maximumAgeAtMaturity: '77 years',
            incomePeriod: '20 to 45 years',
            incomeMode: 'Annual & Monthly',
            coverage: 'Single Life & Joint Life',
            minimumPremium: 'Rs 24,000 p.a.',
            maximumPremium: 'No Limit'
        },
        riders: [],
        taxBenefits: 'Available as per prevailing income tax laws, subject to conditions',
        claimSettlement: {
            ratio: '99.13%',
            expressSettlement: '4 Hours',
            conditions: 'Applicable to non-early claims, non-investigation cases'
        },
        companyStats: {
            familiesProtected: '85 Lakh+',
            assetsUnderManagement: '₹1 Lakh Crore+',
            retailSumAssured: '₹4 Lakh Crore+',
            branches: '500+ Branches'
        },
        faqs: [],
        disclaimers: [],
        status: 'active'
    });

    // Comprehensive Tata AIA Products Database
    const tataAIAProductsDatabase = [
        {
            name: "Tata AIA Life Insurance Fortune Guarantee Plus",
            category: "Life Insurance",
            description: "A comprehensive life insurance plan offering guaranteed returns with life coverage and wealth creation benefits.",
            features: "Guaranteed returns, Life coverage, Wealth creation, Tax benefits, Flexible premium payment",
            benefits: "Financial security, Guaranteed maturity benefits, Life protection, Tax savings under Section 80C",
            eligibility: "18-65 years, Indian resident, Minimum income Rs. 2.5 Lakhs p.a.",
            documents: "ID proof, Address proof, Income proof, Age proof, Bank details",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "77 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Semi-annual, Quarterly, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            },
            riders: [
                {
                    title: "Tata AIA Vitality Health",
                    features: ["39 Critical Illness covered including minor stage illness", "Pays fixed amount on Hospitalization and on ICU admission"],
                    disclaimer: "A Non-Linked, Non-Participating Individual Health rider (UIN: 110B045V03)"
                }
            ],
            faqs: [
                {
                    question: "What is the minimum premium amount?",
                    answer: "The minimum premium amount is Rs 24,000 per annum."
                },
                {
                    question: "What are the tax benefits?",
                    answer: "Premium paid is eligible for tax deduction under Section 80C up to Rs 1.5 Lakhs."
                }
            ],
            disclaimers: [
                "All Premiums, Charges, and interest payable under the policy are exclusive of applicable taxes, duties, surcharge, cesses, or levies, which will be entirely borne/paid by the Policyholder."
            ]
        },
        {
            name: "Tata AIA Life Insurance Smart Sampoorna Raksha Plus",
            category: "Life Insurance",
            description: "A term insurance plan providing comprehensive life coverage with additional benefits.",
            features: "High life coverage, Affordable premiums, Multiple riders, Online purchase",
            benefits: "High sum assured, Low premium, Family protection, Additional riders available",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Medical reports if required",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "5 to 40 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 1,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Fortune Guarantee Retirement Ready",
            category: "Retirement Plan",
            description: "A retirement plan designed to provide guaranteed income during retirement years.",
            features: "Guaranteed retirement corpus, Regular income, Tax benefits, Flexible vesting age",
            benefits: "Secure retirement, Regular pension, Tax savings, Wealth creation",
            eligibility: "18-60 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Age proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "60 years",
                minimumAgeAtMaturity: "45 years",
                maximumAgeAtMaturity: "70 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Smart Savings Solution",
            category: "Investment Plan",
            description: "A savings-oriented insurance plan combining protection with wealth creation.",
            features: "Savings component, Life coverage, Maturity benefits, Tax advantages",
            benefits: "Dual benefit of protection and savings, Tax savings, Maturity corpus",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Bank details",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Semi-annual, Quarterly, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 12,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Insurance Smart Value Income Plan",
            category: "Life Insurance",
            description: "A value-based life insurance plan offering regular income benefits.",
            features: "Regular income, Life coverage, Value for money, Flexible terms",
            benefits: "Regular income stream, Life protection, Affordable premiums",
            eligibility: "18-60 years, Indian resident",
            documents: "ID proof, Address proof, Income proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "60 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "70 years",
                incomePeriod: "10 to 20 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 18,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Fortune Guarantee Secure",
            category: "Life Insurance",
            description: "A secure life insurance plan with guaranteed returns and protection.",
            features: "Guaranteed returns, Life protection, Secure investment, Tax benefits",
            benefits: "Guaranteed maturity, Life coverage, Tax savings, Financial security",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Age proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "77 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Insurance Wealth Pro",
            category: "Investment Plan",
            description: "A wealth creation focused insurance plan for long-term financial goals.",
            features: "Wealth creation, Life coverage, Market-linked returns, Flexible investment",
            benefits: "Wealth accumulation, Life protection, Tax benefits, Long-term growth",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Bank details",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Semi-annual, Quarterly, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Insurance Fortune Pro",
            category: "Life Insurance",
            description: "A premium life insurance plan offering comprehensive coverage and benefits.",
            features: "Premium coverage, Multiple benefits, Flexible options, High sum assured",
            benefits: "Comprehensive protection, Premium benefits, Tax advantages, Family security",
            eligibility: "18-65 years, Indian resident, Higher income bracket",
            documents: "ID proof, Address proof, Income proof, Medical reports",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "77 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Semi-annual, Quarterly, Monthly",
                coverage: "Single Life & Joint Life",
                minimumPremium: "Rs 36,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Insurance Fortune Maxima",
            category: "Life Insurance",
            description: "Maximum coverage life insurance plan with premium benefits.",
            features: "Maximum coverage, Premium benefits, Comprehensive protection, High returns",
            benefits: "Maximum protection, Premium returns, Tax benefits, Family security",
            eligibility: "18-65 years, Indian resident, High net worth individuals",
            documents: "ID proof, Address proof, Income proof, Medical reports, Financial statements",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "77 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Semi-annual, Quarterly, Monthly",
                coverage: "Single Life & Joint Life",
                minimumPremium: "Rs 50,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Insurance Wealth Maxima",
            category: "Investment Plan",
            description: "Maximum wealth creation plan with comprehensive investment options.",
            features: "Maximum wealth creation, Life coverage, Market-linked returns, Premium investment",
            benefits: "Maximum wealth accumulation, Life protection, Tax benefits, Premium returns",
            eligibility: "18-65 years, Indian resident, High net worth individuals",
            documents: "ID proof, Address proof, Income proof, Bank details, Financial statements",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Semi-annual, Quarterly, Monthly",
                coverage: "Single Life & Joint Life",
                minimumPremium: "Rs 50,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Insurance Fortune Guarantee Pension",
            category: "Retirement Plan",
            description: "A pension plan with guaranteed returns for retirement security.",
            features: "Guaranteed pension, Life coverage, Tax benefits, Flexible vesting",
            benefits: "Guaranteed retirement income, Life protection, Tax savings, Financial security",
            eligibility: "18-60 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Age proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "60 years",
                minimumAgeAtMaturity: "45 years",
                maximumAgeAtMaturity: "70 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Smart Fortune Plus",
            category: "Investment Plan",
            description: "Smart investment plan with enhanced fortune creation benefits.",
            features: "Smart investment, Fortune creation, Life coverage, Flexible options",
            benefits: "Smart wealth creation, Life protection, Tax benefits, Enhanced returns",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Bank details",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Semi-annual, Quarterly, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Insurance Smart Annuity Plan",
            category: "Retirement Plan",
            description: "Smart annuity plan providing regular income during retirement.",
            features: "Smart annuity, Regular income, Life coverage, Flexible options",
            benefits: "Regular retirement income, Life protection, Tax benefits, Financial security",
            eligibility: "18-60 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Age proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "60 years",
                minimumAgeAtMaturity: "45 years",
                maximumAgeAtMaturity: "70 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Insurance Fortune Guarantee",
            category: "Life Insurance",
            description: "Basic fortune guarantee plan with life coverage and guaranteed returns.",
            features: "Guaranteed returns, Life coverage, Basic protection, Tax benefits",
            benefits: "Guaranteed maturity, Life protection, Tax savings, Financial security",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Age proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "77 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Insurance Saral Jeevan Bima",
            category: "Life Insurance",
            description: "Simple and affordable life insurance plan for basic protection.",
            features: "Simple terms, Affordable premiums, Basic coverage, Easy to understand",
            benefits: "Basic life protection, Affordable premiums, Simple terms, Family security",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "5 to 40 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 1,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Fortune Guarantee Supreme",
            category: "Life Insurance",
            description: "Supreme fortune guarantee plan with maximum benefits and coverage.",
            features: "Supreme coverage, Maximum benefits, Guaranteed returns, Premium features",
            benefits: "Maximum protection, Supreme benefits, Tax advantages, Family security",
            eligibility: "18-65 years, Indian resident, High net worth individuals",
            documents: "ID proof, Address proof, Income proof, Medical reports, Financial statements",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "77 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Semi-annual, Quarterly, Monthly",
                coverage: "Single Life & Joint Life",
                minimumPremium: "Rs 60,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "TATA AIA Premier SIP",
            category: "Investment Plan",
            description: "Premier systematic investment plan for disciplined wealth creation.",
            features: "Systematic investment, Disciplined approach, Market-linked returns, Flexibility",
            benefits: "Disciplined investing, Wealth creation, Tax benefits, Long-term growth",
            eligibility: "18-70 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Bank details",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "70 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "5 to 30 years",
                incomeMode: "Monthly, Quarterly, Semi-annual, Annual",
                coverage: "Single Life",
                minimumPremium: "Rs 1,000 p.m.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Pro-Fit",
            category: "Health Insurance",
            description: "Professional fitness-oriented health insurance plan with wellness benefits.",
            features: "Health coverage, Wellness benefits, Fitness rewards, Professional features",
            benefits: "Health protection, Wellness rewards, Tax benefits, Professional coverage",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Medical reports",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "1 to 3 years",
                incomeMode: "Annual, Monthly",
                coverage: "Individual & Family",
                minimumPremium: "Rs 5,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "TATA AIA Super SIP",
            category: "Investment Plan",
            description: "Super systematic investment plan with enhanced features and benefits.",
            features: "Super investment features, Enhanced returns, Market-linked, Flexibility",
            benefits: "Super wealth creation, Enhanced returns, Tax benefits, Long-term growth",
            eligibility: "18-70 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Bank details",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "70 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "5 to 30 years",
                incomeMode: "Monthly, Quarterly, Semi-annual, Annual",
                coverage: "Single Life",
                minimumPremium: "Rs 2,000 p.m.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Shubh Muhurat",
            category: "Life Insurance",
            description: "Auspicious timing life insurance plan for special occasions and milestones.",
            features: "Auspicious timing, Special benefits, Life coverage, Milestone rewards",
            benefits: "Special occasion coverage, Milestone benefits, Life protection, Tax savings",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Age proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "77 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Insurance Diamond Savings Plan",
            category: "Investment Plan",
            description: "Diamond-grade savings plan with premium investment features.",
            features: "Diamond-grade features, Premium savings, Life coverage, High returns",
            benefits: "Premium savings, Life protection, Tax benefits, High returns",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Bank details",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Semi-annual, Quarterly, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Sampoorna Raksha Promise",
            category: "Life Insurance",
            description: "Complete protection promise with comprehensive life coverage.",
            features: "Complete protection, Promise guarantee, Life coverage, Comprehensive benefits",
            benefits: "Complete life protection, Promise benefits, Family security, Tax savings",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Medical reports",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "5 to 40 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 1,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Insurance Smart Income Plus",
            category: "Life Insurance",
            description: "Smart income plus plan with enhanced income benefits.",
            features: "Smart income, Enhanced benefits, Life coverage, Flexible options",
            benefits: "Enhanced income, Life protection, Tax benefits, Smart features",
            eligibility: "18-60 years, Indian resident",
            documents: "ID proof, Address proof, Income proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "60 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "70 years",
                incomePeriod: "10 to 20 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 18,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Maha Raksha Supreme Select",
            category: "Life Insurance",
            description: "Supreme select life insurance plan with maximum protection.",
            features: "Supreme protection, Select benefits, Maximum coverage, Premium features",
            benefits: "Maximum protection, Supreme benefits, Select features, Family security",
            eligibility: "18-65 years, Indian resident, High net worth individuals",
            documents: "ID proof, Address proof, Income proof, Medical reports, Financial statements",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "5 to 40 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 1,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Insurance Value Income Plan",
            category: "Life Insurance",
            description: "Value-based income plan offering cost-effective life coverage.",
            features: "Value for money, Income benefits, Life coverage, Affordable premiums",
            benefits: "Value benefits, Income protection, Affordable coverage, Tax savings",
            eligibility: "18-60 years, Indian resident",
            documents: "ID proof, Address proof, Income proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "60 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "70 years",
                incomePeriod: "10 to 20 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 18,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Guaranteed Return Insurance Plan",
            category: "Life Insurance",
            description: "Guaranteed return life insurance plan with assured benefits.",
            features: "Guaranteed returns, Life coverage, Assured benefits, Tax advantages",
            benefits: "Guaranteed maturity, Life protection, Assured returns, Tax savings",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Age proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "77 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Life Insurance Diamond Savings Plan Plus",
            category: "Investment Plan",
            description: "Enhanced diamond savings plan with additional premium features.",
            features: "Enhanced diamond features, Premium savings, Life coverage, Plus benefits",
            benefits: "Enhanced savings, Life protection, Tax benefits, Plus features",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Bank details",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Semi-annual, Quarterly, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Param Raksha",
            category: "Life Insurance",
            description: "Ultimate protection life insurance plan with supreme coverage.",
            features: "Ultimate protection, Supreme coverage, Maximum benefits, Premium features",
            benefits: "Ultimate security, Supreme protection, Maximum benefits, Family security",
            eligibility: "18-65 years, Indian resident, High net worth individuals",
            documents: "ID proof, Address proof, Income proof, Medical reports, Financial statements",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "5 to 40 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 1,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Premier Pension Secure",
            category: "Retirement Plan",
            description: "Premier secure pension plan for retirement planning.",
            features: "Premier pension, Secure retirement, Life coverage, Tax benefits",
            benefits: "Secure retirement, Premier benefits, Life protection, Tax savings",
            eligibility: "18-60 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Age proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "60 years",
                minimumAgeAtMaturity: "45 years",
                maximumAgeAtMaturity: "70 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Shubh Onam",
            category: "Life Insurance",
            description: "Special Onam festival life insurance plan with festive benefits.",
            features: "Festival benefits, Special coverage, Life protection, Onam rewards",
            benefits: "Festival rewards, Special benefits, Life protection, Tax savings",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Age proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "77 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Shubh Flexi Income Plan",
            category: "Life Insurance",
            description: "Flexible income plan with auspicious benefits and customizable options.",
            features: "Flexible income, Auspicious benefits, Life coverage, Customizable options",
            benefits: "Flexible benefits, Auspicious rewards, Life protection, Tax savings",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Age proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "77 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "TATA AIA Life Secure Insurance Solution",
            category: "Life Insurance",
            description: "Secure insurance solution providing comprehensive life protection.",
            features: "Secure solution, Comprehensive protection, Life coverage, Multiple benefits",
            benefits: "Secure protection, Comprehensive benefits, Life security, Tax savings",
            eligibility: "18-65 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Age proof",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "65 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "77 years",
                incomePeriod: "10 to 25 years",
                incomeMode: "Annual, Monthly",
                coverage: "Single Life",
                minimumPremium: "Rs 24,000 p.a.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA i Systematic Insurance Plan",
            category: "Investment Plan",
            description: "Intelligent systematic insurance plan with smart investment features.",
            features: "Intelligent features, Systematic investment, Life coverage, Smart options",
            benefits: "Intelligent investing, Systematic approach, Life protection, Tax benefits",
            eligibility: "18-70 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Bank details",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "70 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "5 to 30 years",
                incomeMode: "Monthly, Quarterly, Semi-annual, Annual",
                coverage: "Single Life",
                minimumPremium: "Rs 1,000 p.m.",
                maximumPremium: "No Limit"
            }
        },
        {
            name: "Tata AIA Smart SIP",
            category: "Investment Plan",
            description: "Smart systematic investment plan with intelligent features.",
            features: "Smart investment, Systematic approach, Life coverage, Intelligent features",
            benefits: "Smart wealth creation, Systematic investing, Life protection, Tax benefits",
            eligibility: "18-70 years, Indian resident",
            documents: "ID proof, Address proof, Income proof, Bank details",
            planOptions: {
                minimumEntryAge: "18 years",
                maximumEntryAge: "70 years",
                minimumAgeAtMaturity: "18 years",
                maximumAgeAtMaturity: "75 years",
                incomePeriod: "5 to 30 years",
                incomeMode: "Monthly, Quarterly, Semi-annual, Annual",
                coverage: "Single Life",
                minimumPremium: "Rs 1,000 p.m.",
                maximumPremium: "No Limit"
            }
        }
    ];

    // Product categories based on the product names
    const getProductCategory = (productName) => {
        if (productName.includes('SIP') || productName.includes('Investment')) {
            return 'Investment Plan';
        } else if (productName.includes('Pension') || productName.includes('Retirement')) {
            return 'Retirement Plan';
        } else if (productName.includes('Child') || productName.includes('Savings')) {
            return 'Child Plan';
        } else if (productName.includes('Health')) {
            return 'Health Insurance';
        } else {
            return 'Life Insurance';
        }
    };

    // Generate detailed product information
    const generateProductDetails = (productName) => {
        const category = getProductCategory(productName);
        
        let features = 'Life coverage, Investment benefits, Tax savings';
        let benefits = 'Financial security, Wealth creation, Tax benefits';
        let eligibility = '18-65 years, Indian resident';
        let documents = 'ID proof, Address proof, Income proof';
        let description = `${productName} - Comprehensive insurance coverage`;

        if (category === 'Investment Plan') {
            features = 'Systematic Investment, Market-linked returns, Flexibility';
            benefits = 'Wealth creation, Tax benefits, Long-term growth';
            eligibility = '18-70 years, Indian resident';
            documents = 'ID proof, Address proof, Income proof, Bank details';
            description = `${productName} - Systematic investment plan for wealth creation`;
        } else if (category === 'Retirement Plan') {
            features = 'Retirement corpus, Regular income, Tax benefits';
            benefits = 'Secure retirement, Regular pension, Tax savings';
            eligibility = '18-65 years, Indian resident';
            documents = 'ID proof, Address proof, Income proof, Age proof';
            description = `${productName} - Secure your retirement with guaranteed income`;
        } else if (category === 'Child Plan') {
            features = 'Child education fund, Life coverage, Maturity benefits';
            benefits = 'Child education security, Life protection, Wealth creation';
            eligibility = '18-60 years, Indian resident';
            documents = 'ID proof, Address proof, Income proof, Child details';
            description = `${productName} - Secure your child's future with comprehensive coverage`;
        }

        return {
            name: productName,
            category,
            description,
            features,
            benefits,
            eligibility,
            documents,
            planOptions: {
                minimumEntryAge: '18 years',
                maximumEntryAge: '60 years',
                minimumAgeAtMaturity: '18 years',
                maximumAgeAtMaturity: '77 years',
                incomePeriod: '20 to 45 years',
                incomeMode: 'Annual & Monthly',
                coverage: 'Single Life & Joint Life',
                minimumPremium: 'Rs 24,000 p.a.',
                maximumPremium: 'No Limit'
            },
            riders: [
                {
                    title: 'Tata AIA Vitality Health',
                    features: ['39 Critical Illness covered including minor stage illness', 'Pays fixed amount on Hospitalization and on ICU admission'],
                    disclaimer: 'A Non-Linked, Non-Participating Individual Health rider (UIN: 110B045V03)'
                }
            ],
            taxBenefits: 'Available as per prevailing income tax laws, subject to conditions',
            claimSettlement: {
                ratio: '99.13%',
                expressSettlement: '4 Hours',
                conditions: 'Applicable to non-early claims, non-investigation cases'
            },
            companyStats: {
                familiesProtected: '85 Lakh+',
                assetsUnderManagement: '₹1 Lakh Crore+',
                retailSumAssured: '₹4 Lakh Crore+',
                branches: '500+ Branches'
            },
            faqs: [
                {
                    question: 'What is a savings policy?',
                    answer: 'A savings policy is a life insurance plan designed for savings and financial security.'
                }
            ],
            disclaimers: [
                'All Premiums, Charges, and interest payable under the policy are exclusive of applicable taxes, duties, surcharge, cesses, or levies, which will be entirely borne/paid by the Policyholder.'
            ],
            status: 'active'
        };
    };

    useEffect(() => {
        fetchProducts();
        // Test API connectivity
        testAPIConnectivity();
    }, []);

    const testAPIConnectivity = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(`${API_BASE_URL}/api/health`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('API connectivity test successful:', response.data);
        } catch (error) {
            console.error('API connectivity test failed:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const response = await axios.get('${API_BASE_URL}/api/admin/tata-aia-products', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.data?.success) {
                setProducts(response.data.data);
            } else {
                console.error('Failed to fetch products:', response.data);
                // Fallback to predefined products
                setProducts(tataAIAProductsDatabase.map((product, index) => ({
                    _id: `temp_${index + 1}`, // Use _id to match MongoDB format
                    id: index + 1, // Keep id for backward compatibility
                    ...product,
                    createdAt: new Date().toISOString()
                })));
            }
        } catch (error) {
            console.error('Failed to fetch Tata AIA products:', error);
            
            if (error.response?.status === 401) {
                toast.error('Authentication failed. Please log in again.');
                // Redirect to login or handle authentication error
                return;
            }
            
            // For now, initialize with the predefined products as fallback
            setProducts(tataAIAProductsDatabase.map((product, index) => ({
                _id: `temp_${index + 1}`, // Use _id to match MongoDB format
                id: index + 1, // Keep id for backward compatibility
                ...product,
                createdAt: new Date().toISOString()
            })));
            
            // Show a warning that we're using predefined data
            if (error.response?.status !== 404) {
                toast.error('Failed to fetch products from server. Using predefined data.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBulkImport = async () => {
        if (!window.confirm(`This will add all ${tataAIAProductsDatabase.length} Tata AIA products to the database. Continue?`)) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            const productsToImport = tataAIAProductsDatabase.map(product => ({
                ...product,
                createdAt: new Date().toISOString()
            }));

            // Import products one by one to avoid overwhelming the server
            const importPromises = productsToImport.map(product => 
                axios.post('${API_BASE_URL}/api/admin/tata-aia-products', product, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            );

            toast.loading(`Importing ${productsToImport.length} products...`, { id: 'bulk-import' });
            
            const results = await Promise.allSettled(importPromises);
            
            const successful = results.filter(result => result.status === 'fulfilled').length;
            const failed = results.filter(result => result.status === 'rejected').length;
            
            if (failed > 0) {
                toast.error(`${successful} products imported successfully, ${failed} failed.`, { id: 'bulk-import' });
            } else {
                toast.success(`All ${productsToImport.length} products imported successfully!`, { id: 'bulk-import' });
            }
            
            fetchProducts(); // Refresh the list
        } catch (error) {
            console.error('Failed to import products:', error);
            
            if (error.response?.status === 401) {
                toast.error('Authentication failed. Please log in again.', { id: 'bulk-import' });
            } else {
                toast.error('Failed to import products. Please try again.', { id: 'bulk-import' });
            }
        }
    };

    const handleCreateProduct = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            category: '',
            description: '',
            features: '',
            benefits: '',
            eligibility: '',
            documents: '',
            planOptions: {
                minimumEntryAge: '18 years',
                maximumEntryAge: '60 years',
                minimumAgeAtMaturity: '18 years',
                maximumAgeAtMaturity: '77 years',
                incomePeriod: '20 to 45 years',
                incomeMode: 'Annual & Monthly',
                coverage: 'Single Life & Joint Life',
                minimumPremium: 'Rs 24,000 p.a.',
                maximumPremium: 'No Limit'
            },
            riders: [],
            taxBenefits: 'Available as per prevailing income tax laws, subject to conditions',
            claimSettlement: {
                ratio: '99.13%',
                expressSettlement: '4 Hours',
                conditions: 'Applicable to non-early claims, non-investigation cases'
            },
            companyStats: {
                familiesProtected: '85 Lakh+',
                assetsUnderManagement: '₹1 Lakh Crore+',
                retailSumAssured: '₹4 Lakh Crore+',
                branches: '500+ Branches'
            },
            faqs: [],
            disclaimers: [],
            status: 'active'
        });
        setShowForm(true);
    };

    const handleViewProduct = (product) => {
        setViewingProduct(product);
    };

    const handleEditProduct = (product) => {
        // Check if this is a predefined product (temp ID)
        if (product._id && product._id.startsWith('temp_')) {
            toast.error('Cannot edit predefined products. Please add them to the database first.');
            return;
        }

        setEditingProduct(product);
        // Create a copy of the product without the brochure field to avoid issues
        const { brochure, ...productWithoutBrochure } = product;
        setFormData(productWithoutBrochure);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingProduct(null);
        setBrochureFile(null);
        setFormData({
            name: '',
            category: 'Life Insurance',
            description: '',
            features: '',
            benefits: '',
            eligibility: '',
            documents: '',
            planOptions: {
                minimumEntryAge: '18 years',
                maximumEntryAge: '60 years',
                minimumAgeAtMaturity: '18 years',
                maximumAgeAtMaturity: '77 years',
                incomePeriod: '20 to 45 years',
                incomeMode: 'Annual & Monthly',
                coverage: 'Single Life & Joint Life',
                minimumPremium: 'Rs 24,000 p.a.',
                maximumPremium: 'No Limit'
            },
            riders: [],
            taxBenefits: 'Available as per prevailing income tax laws, subject to conditions',
            claimSettlement: {
                ratio: '99.13%',
                expressSettlement: '4 Hours',
                conditions: 'Applicable to non-early claims, non-investigation cases'
            },
            companyStats: {
                familiesProtected: '85 Lakh+',
                assetsUnderManagement: '₹1 Lakh Crore+',
                retailSumAssured: '₹4 Lakh Crore+',
                branches: '500+ Branches'
            },
            faqs: [],
            disclaimers: [],
            status: 'active'
        });
    };

    const handleAddSampleData = () => {
        setFormData({
            name: 'Tata AIA Life Insurance Fortune Guarantee Plus',
            category: 'Life Insurance',
            description: 'A comprehensive life insurance plan offering guaranteed returns with life coverage and wealth creation benefits.',
            features: 'Guaranteed returns, Life coverage, Wealth creation, Tax benefits, Flexible premium payment',
            benefits: 'Financial security, Guaranteed maturity benefits, Life protection, Tax savings under Section 80C',
            eligibility: '18-65 years, Indian resident, Minimum income Rs. 2.5 Lakhs p.a.',
            documents: 'ID proof, Address proof, Income proof, Age proof, Bank details',
            planOptions: {
                minimumEntryAge: '18 years',
                maximumEntryAge: '65 years',
                minimumAgeAtMaturity: '18 years',
                maximumAgeAtMaturity: '77 years',
                incomePeriod: '10 to 25 years',
                incomeMode: 'Annual, Semi-annual, Quarterly, Monthly',
                coverage: 'Single Life',
                minimumPremium: 'Rs 24,000 p.a.',
                maximumPremium: 'No Limit'
            },
            riders: [
                {
                    title: 'Tata AIA Vitality Health',
                    features: ['39 Critical Illness covered including minor stage illness', 'Pays fixed amount on Hospitalization and on ICU admission'],
                    disclaimer: 'A Non-Linked, Non-Participating Individual Health rider (UIN: 110B045V03)'
                }
            ],
            taxBenefits: 'Available as per prevailing income tax laws, subject to conditions',
            claimSettlement: {
                ratio: '99.13%',
                expressSettlement: '4 Hours',
                conditions: 'Applicable to non-early claims, non-investigation cases'
            },
            companyStats: {
                familiesProtected: '85 Lakh+',
                assetsUnderManagement: '₹1 Lakh Crore+',
                retailSumAssured: '₹4 Lakh Crore+',
                branches: '500+ Branches'
            },
            faqs: [
                {
                    question: 'What is the minimum premium amount?',
                    answer: 'The minimum premium amount is Rs 24,000 per annum.'
                },
                {
                    question: 'What are the tax benefits?',
                    answer: 'Premium paid is eligible for tax deduction under Section 80C up to Rs 1.5 Lakhs.'
                }
            ],
            disclaimers: [
                'All Premiums, Charges, and interest payable under the policy are exclusive of applicable taxes, duties, surcharge, cesses, or levies, which will be entirely borne/paid by the Policyholder.'
            ],
            status: 'active'
        });
    };

    const handleBrochureFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                toast.error('Invalid file type. Only PDF and image files are allowed.');
                return;
            }
            
            // Validate file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                toast.error('File size too large. Maximum size is 10MB.');
                return;
            }
            
            setBrochureFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        const requiredFields = ['name', 'category', 'description', 'features', 'benefits', 'eligibility', 'documents'];
        const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
        
        if (missingFields.length > 0) {
            toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }
        
        try {
            const token = localStorage.getItem('adminToken');
            // Use _id if available (from database), otherwise use id (from predefined list)
            const productId = editingProduct ? (editingProduct._id || editingProduct.id) : null;
            const url = editingProduct 
                ? `/api/admin/tata-aia-products/${productId}`
                : '/api/admin/tata-aia-products';
            const method = editingProduct ? 'put' : 'post';

            // Create FormData for file upload
            const submitData = new FormData();
            
            // Add all form data except brochure (handled separately)
            Object.keys(formData).forEach(key => {
                if (key === 'brochure') {
                    // Skip brochure field - it will be handled separately
                    return;
                }
                
                if (key === 'planOptions' || key === 'claimSettlement' || key === 'companyStats') {
                    submitData.append(key, JSON.stringify(formData[key]));
                } else if (Array.isArray(formData[key])) {
                    submitData.append(key, JSON.stringify(formData[key]));
                } else {
                    submitData.append(key, formData[key]);
                }
            });

            // Add brochure file if selected
            if (brochureFile) {
                submitData.append('brochure', brochureFile);
            }

            console.log('Submitting form data:', {
                url,
                method,
                formData: Object.fromEntries(submitData.entries())
            });
            
            // Log the original formData for debugging
            console.log('Original formData:', formData);
            console.log('Brochure file:', brochureFile);

            const response = await axios[method](url, submitData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data?.success) {
                toast.success(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
                handleCloseForm();
                fetchProducts();
            } else {
                toast.error(response.data?.message || 'Failed to save product');
            }
        } catch (error) {
            console.error('Failed to save product:', error);
            
            if (error.response?.status === 401) {
                toast.error('Authentication failed. Please log in again.');
            } else if (error.response?.status === 400) {
                const errorMessage = error.response.data?.message || 'Invalid data provided';
                console.error('Validation errors:', error.response.data);
                toast.error(errorMessage);
            } else if (error.response?.status === 404 && editingProduct) {
                toast.error('Product not found. Please refresh the page and try again.');
            } else {
                toast.error('Failed to save product. Please try again.');
            }
        }
    };

    const handleToggleStatus = async (product) => {
        console.log('Toggle status called for product:', product);
        
        // Check if this is a predefined product (temp ID)
        if (product._id && product._id.startsWith('temp_')) {
            toast.error('Cannot modify predefined products. Please add them to the database first.');
            return;
        }

        // Use _id if available (from database), otherwise use id (from predefined list)
        const productId = product._id || product.id;
        
        if (!productId) {
            toast.error('Product ID not found');
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            const newStatus = product.status === 'active' ? 'inactive' : 'active';
            
            console.log('Making API call to toggle status:', {
                url: `/api/admin/tata-aia-products/${productId}/toggle-status`,
                newStatus,
                productId
            });
            
            const response = await axios.patch(`${API_BASE_URL}/api/admin/tata-aia-products/${productId}/toggle-status`, 
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log('API response:', response.data);

            if (response.data?.success) {
                toast.success(`Product ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
                fetchProducts();
            } else {
                toast.error(response.data?.message || 'Failed to toggle product status');
            }
        } catch (error) {
            console.error('Failed to toggle product status:', error);
            console.error('Error details:', error.response?.data);
            
            if (error.response?.status === 404) {
                toast.error('Product not found. Please refresh the page and try again.');
            } else if (error.response?.status === 401) {
                toast.error('Authentication failed. Please log in again.');
            } else {
                toast.error('Failed to toggle product status. Please try again.');
            }
        }
    };

    const handleDeleteProduct = async (product) => {
        // Check if this is a predefined product (temp ID)
        if (product._id && product._id.startsWith('temp_')) {
            toast.error('Cannot delete predefined products. Please add them to the database first.');
            return;
        }

        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        // Use _id if available (from database), otherwise use id (from predefined list)
        const productId = product._id || product.id;
        
        if (!productId) {
            toast.error('Product ID not found');
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.delete(`${API_BASE_URL}/api/admin/tata-aia-products/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data?.success) {
                toast.success('Product deleted successfully!');
                fetchProducts();
            } else {
                toast.error(response.data?.message || 'Failed to delete product');
            }
        } catch (error) {
            console.error('Failed to delete product:', error);
            
            if (error.response?.status === 404) {
                toast.error('Product not found. Please refresh the page and try again.');
            } else if (error.response?.status === 401) {
                toast.error('Authentication failed. Please log in again.');
            } else {
                toast.error('Failed to delete product. Please try again.');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Handle nested object updates
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Add rider
    const addRider = () => {
        setFormData(prev => ({
            ...prev,
            riders: [...prev.riders, {
                title: '',
                features: [''],
                disclaimer: ''
            }]
        }));
    };

    // Remove rider
    const removeRider = (index) => {
        setFormData(prev => ({
            ...prev,
            riders: prev.riders.filter((_, i) => i !== index)
        }));
    };

    // Update rider
    const updateRider = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            riders: prev.riders.map((rider, i) => 
                i === index ? { ...rider, [field]: value } : rider
            )
        }));
    };

    // Add FAQ
    const addFAQ = () => {
        setFormData(prev => ({
            ...prev,
            faqs: [...prev.faqs, { question: '', answer: '' }]
        }));
    };

    // Remove FAQ
    const removeFAQ = (index) => {
        setFormData(prev => ({
            ...prev,
            faqs: prev.faqs.filter((_, i) => i !== index)
        }));
    };

    // Update FAQ
    const updateFAQ = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            faqs: prev.faqs.map((faq, i) => 
                i === index ? { ...faq, [field]: value } : faq
            )
        }));
    };

    // Add disclaimer
    const addDisclaimer = () => {
        setFormData(prev => ({
            ...prev,
            disclaimers: [...prev.disclaimers, '']
        }));
    };

    // Remove disclaimer
    const removeDisclaimer = (index) => {
        setFormData(prev => ({
            ...prev,
            disclaimers: prev.disclaimers.filter((_, i) => i !== index)
        }));
    };

    // Update disclaimer
    const updateDisclaimer = (index, value) => {
        setFormData(prev => ({
            ...prev,
            disclaimers: prev.disclaimers.map((disclaimer, i) => 
                i === index ? value : disclaimer
            )
        }));
    };

    // Filter and sort products
    const filteredAndSortedProducts = products
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];
            
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }
            
            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Tata AIA Products
                        </h2>
                        <p className="text-black mt-1">Manage Tata AIA insurance products and policies</p>
                    </div>
                    <div className="flex space-x-3">
                        {/* <button
                            onClick={handleBulkImport}
                            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            Import All Products
                        </button> */}
                        <button
                            onClick={handleCreateProduct}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add New Product
                        </button>
                    </div>
                </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
                        <input
                            type="text"
                            placeholder="Search by name, category, or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Categories</option>
                            <option value="Life Insurance">Life Insurance</option>
                            <option value="Health Insurance">Health Insurance</option>
                            <option value="Investment Plan">Investment Plan</option>
                            <option value="Retirement Plan">Retirement Plan</option>
                            <option value="Child Plan">Child Plan</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="name">Name</option>
                            <option value="category">Category</option>
                            <option value="status">Status</option>
                            <option value="createdAt">Date Created</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                        Showing {filteredAndSortedProducts.length} of {products.length} products
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                                setSortBy('name');
                                setSortOrder('asc');
                            }}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                    <div key={product._id || product.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                                <div className="h-10 w-10 bg-blue-500 bg-opacity-10 rounded-xl flex items-center justify-center mr-3">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-black text-lg">{product.name}</h3>
                                    <p className="text-sm text-gray-600">{product.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    product.status === 'active' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {product.status}
                                </span>
                                {product._id && product._id.startsWith('temp_') && (
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Predefined
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{product.description}</p>

                        <div className="space-y-2 mb-4">
                            <div className="text-xs text-gray-600">
                                <strong>Features:</strong> {product.features}
                            </div>
                            <div className="text-xs text-gray-600">
                                <strong>Benefits:</strong> {product.benefits}
                            </div>
                            <div className="text-xs text-gray-600">
                                <strong>Eligibility:</strong> {product.eligibility}
                            </div>
                            {product.planOptions && (
                                <div className="text-xs text-gray-600">
                                    <strong>Entry Age:</strong> {product.planOptions.minimumEntryAge} - {product.planOptions.maximumEntryAge}
                                </div>
                            )}
                            {product.claimSettlement && (
                                <div className="text-xs text-gray-600">
                                    <strong>Claim Ratio:</strong> {product.claimSettlement.ratio}
                                </div>
                            )}
                            {product.riders && product.riders.length > 0 && (
                                <div className="text-xs text-gray-600">
                                    <strong>Riders:</strong> {product.riders.length} available
                                </div> 
                            )}
                        </div>

                        <div className="flex space-x-2">
                            <button
                                onClick={() => {
                                    console.log('View button clicked for product:', product);
                                    handleViewProduct(product);
                                }}
                                className="text-green-600 hover:text-green-900"
                                title="View Details"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => {
                                    console.log('Edit button clicked for product:', product);
                                    handleEditProduct(product);
                                }}
                                disabled={product._id && product._id.startsWith('temp_')}
                                className={`${
                                    product._id && product._id.startsWith('temp_')
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-blue-600 hover:text-blue-900'
                                }`}
                                title="Edit Product"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => {
                                    console.log('Toggle status button clicked for product:', product);
                                    handleToggleStatus(product);
                                }}
                                disabled={product._id && product._id.startsWith('temp_')}
                                className={`${
                                    product._id && product._id.startsWith('temp_')
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : product.status === 'active'
                                            ? 'text-red-600 hover:text-red-900'
                                            : 'text-green-600 hover:text-green-900'
                                }`}
                                title={product.status === 'active' ? 'Deactivate Product' : 'Activate Product'}
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {product.status === 'active' ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    )}
                                </svg>
                            </button>
                            <button
                                onClick={() => {
                                    console.log('Delete button clicked for product:', product);
                                    handleDeleteProduct(product);
                                }}
                                disabled={product._id && product._id.startsWith('temp_')}
                                className={`${
                                    product._id && product._id.startsWith('temp_')
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-red-600 hover:text-red-900'
                                }`}
                                title="Delete Product"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h3>
                            <div className="flex gap-2">
                                {!editingProduct && (
                                    <button
                                        type="button"
                                        onClick={handleAddSampleData}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                                    >
                                        Add Sample Data
                                    </button>
                                )}
                                <button
                                    onClick={handleCloseForm}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold mb-4">Basic Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Life Insurance">Life Insurance</option>
                                            <option value="Health Insurance">Health Insurance</option>
                                            <option value="Investment Plan">Investment Plan</option>
                                            <option value="Retirement Plan">Retirement Plan</option>
                                            <option value="Child Plan">Child Plan</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Features
                                        </label>
                                        <textarea
                                            name="features"
                                            value={formData.features}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Benefits
                                        </label>
                                        <textarea
                                            name="benefits"
                                            value={formData.benefits}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Eligibility
                                        </label>
                                        <input
                                            type="text"
                                            name="eligibility"
                                            value={formData.eligibility}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Required Documents
                                        </label>
                                        <input
                                            type="text"
                                            name="documents"
                                            value={formData.documents}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Brochure (PDF or Image)
                                        </label>
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png,.gif,.webp"
                                            onChange={handleBrochureFileChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Accepted formats: PDF, JPEG, PNG, GIF, WebP. Maximum size: 10MB
                                        </p>
                                        {brochureFile && (
                                            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                                                <p className="text-sm text-green-700">
                                                    Selected: {brochureFile.name} ({(brochureFile.size / 1024 / 1024).toFixed(2)} MB)
                                                </p>
                                            </div>
                                        )}
                                        {editingProduct?.brochure && !brochureFile && (
                                            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                                                <p className="text-sm text-blue-700">
                                                    Current brochure: {editingProduct.brochure.originalName}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Plan Options */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold mb-4">Plan Options</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Minimum Entry Age
                                        </label>
                                        <input
                                            type="text"
                                            name="planOptions.minimumEntryAge"
                                            value={formData.planOptions.minimumEntryAge}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Maximum Entry Age
                                        </label>
                                        <input
                                            type="text"
                                            name="planOptions.maximumEntryAge"
                                            value={formData.planOptions.maximumEntryAge}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Minimum Age at Maturity
                                        </label>
                                        <input
                                            type="text"
                                            name="planOptions.minimumAgeAtMaturity"
                                            value={formData.planOptions.minimumAgeAtMaturity}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Maximum Age at Maturity
                                        </label>
                                        <input
                                            type="text"
                                            name="planOptions.maximumAgeAtMaturity"
                                            value={formData.planOptions.maximumAgeAtMaturity}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Income Period
                                        </label>
                                        <input
                                            type="text"
                                            name="planOptions.incomePeriod"
                                            value={formData.planOptions.incomePeriod}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Income Mode
                                        </label>
                                        <input
                                            type="text"
                                            name="planOptions.incomeMode"
                                            value={formData.planOptions.incomeMode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Coverage
                                        </label>
                                        <input
                                            type="text"
                                            name="planOptions.coverage"
                                            value={formData.planOptions.coverage}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Minimum Premium
                                        </label>
                                        <input
                                            type="text"
                                            name="planOptions.minimumPremium"
                                            value={formData.planOptions.minimumPremium}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Maximum Premium
                                        </label>
                                        <input
                                            type="text"
                                            name="planOptions.maximumPremium"
                                            value={formData.planOptions.maximumPremium}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tax Benefits */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold mb-4">Tax Benefits</h4>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tax Benefits Description
                                    </label>
                                    <textarea
                                        name="taxBenefits"
                                        value={formData.taxBenefits}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Claim Settlement */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold mb-4">Claim Settlement</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Settlement Ratio
                                        </label>
                                        <input
                                            type="text"
                                            name="claimSettlement.ratio"
                                            value={formData.claimSettlement.ratio}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Express Settlement
                                        </label>
                                        <input
                                            type="text"
                                            name="claimSettlement.expressSettlement"
                                            value={formData.claimSettlement.expressSettlement}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Conditions
                                        </label>
                                        <input
                                            type="text"
                                            name="claimSettlement.conditions"
                                            value={formData.claimSettlement.conditions}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Company Statistics */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold mb-4">Company Statistics</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Families Protected
                                        </label>
                                        <input
                                            type="text"
                                            name="companyStats.familiesProtected"
                                            value={formData.companyStats.familiesProtected}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Assets Under Management
                                        </label>
                                        <input
                                            type="text"
                                            name="companyStats.assetsUnderManagement"
                                            value={formData.companyStats.assetsUnderManagement}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Retail Sum Assured
                                        </label>
                                        <input
                                            type="text"
                                            name="companyStats.retailSumAssured"
                                            value={formData.companyStats.retailSumAssured}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Branches
                                        </label>
                                        <input
                                            type="text"
                                            name="companyStats.branches"
                                            value={formData.companyStats.branches}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Riders */}
                            {/* <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-lg font-semibold">Riders</h4>
                                    <button
                                        type="button"
                                        onClick={addRider}
                                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                    >
                                        Add Rider
                                    </button>
                                </div>
                                {formData.riders.map((rider, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="font-medium">Rider {index + 1}</h5>
                                            <button
                                                type="button"
                                                onClick={() => removeRider(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3">
                                            <input
                                                type="text"
                                                placeholder="Rider Title"
                                                value={rider.title}
                                                onChange={(e) => updateRider(index, 'title', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <textarea
                                                placeholder="Rider Features (comma separated)"
                                                value={rider.features.join(', ')}
                                                onChange={(e) => updateRider(index, 'features', e.target.value.split(',').map(f => f.trim()))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                rows="2"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Rider Disclaimer"
                                                value={rider.disclaimer}
                                                onChange={(e) => updateRider(index, 'disclaimer', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div> */}

                            {/* FAQs */}
                            {/* <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-lg font-semibold">Frequently Asked Questions</h4>
                                    <button
                                        type="button"
                                        onClick={addFAQ}
                                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                    >
                                        Add FAQ
                                    </button>
                                </div>
                                {formData.faqs.map((faq, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="font-medium">FAQ {index + 1}</h5>
                                            <button
                                                type="button"
                                                onClick={() => removeFAQ(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3">
                                            <input
                                                type="text"
                                                placeholder="Question"
                                                value={faq.question}
                                                onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <textarea
                                                placeholder="Answer"
                                                value={faq.answer}
                                                onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                rows="3"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div> */}

                            {/* Disclaimers */}
                            {/* <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-lg font-semibold">Disclaimers</h4>
                                    <button
                                        type="button"
                                        onClick={addDisclaimer}
                                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                    >
                                        Add Disclaimer
                                    </button>
                                </div>
                                {formData.disclaimers.map((disclaimer, index) => (
                                    <div key={index} className="flex items-center gap-3 mb-3">
                                        <textarea
                                            placeholder="Disclaimer text"
                                            value={disclaimer}
                                            onChange={(e) => updateDisclaimer(index, e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                            rows="2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeDisclaimer(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div> */}

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                                >
                                    {editingProduct ? 'Update Product' : 'Create Product'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Product Modal */}
            {viewingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Product Details</h3>
                            <button
                                onClick={() => setViewingProduct(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Basic Information */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold mb-4">Basic Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                        <p className="text-gray-900 font-medium">{viewingProduct.name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <p className="text-gray-900">{viewingProduct.category}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <p className="text-gray-900">{viewingProduct.description}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                                        <p className="text-gray-900">{viewingProduct.features}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                                        <p className="text-gray-900">{viewingProduct.benefits}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                                        <p className="text-gray-900">{viewingProduct.eligibility}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Required Documents</label>
                                        <p className="text-gray-900">{viewingProduct.documents}</p>
                                    </div>
                                    {viewingProduct.brochure && (
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Brochure</label>
                                            <div className="flex items-center space-x-2">
                                                <p className="text-gray-900">{viewingProduct.brochure.originalName}</p>
                                                <span className="text-xs text-gray-500">
                                                    ({(viewingProduct.brochure.size / 1024 / 1024).toFixed(2)} MB)
                                                </span>
                                                <a
                                                    href={`/api/tata-aia-products/${viewingProduct._id}/brochure`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Plan Options */}
                            {viewingProduct.planOptions && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-lg font-semibold mb-4">Plan Options</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Entry Age</label>
                                            <p className="text-gray-900">{viewingProduct.planOptions.minimumEntryAge} - {viewingProduct.planOptions.maximumEntryAge}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Age at Maturity</label>
                                            <p className="text-gray-900">{viewingProduct.planOptions.minimumAgeAtMaturity} - {viewingProduct.planOptions.maximumAgeAtMaturity}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Income Period</label>
                                            <p className="text-gray-900">{viewingProduct.planOptions.incomePeriod}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Income Mode</label>
                                            <p className="text-gray-900">{viewingProduct.planOptions.incomeMode}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Coverage</label>
                                            <p className="text-gray-900">{viewingProduct.planOptions.coverage}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Premium Range</label>
                                            <p className="text-gray-900">{viewingProduct.planOptions.minimumPremium} - {viewingProduct.planOptions.maximumPremium}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Tax Benefits */}
                            {viewingProduct.taxBenefits && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-lg font-semibold mb-4">Tax Benefits</h4>
                                    <p className="text-gray-900">{viewingProduct.taxBenefits}</p>
                                </div>
                            )}

                            {/* Claim Settlement */}
                            {viewingProduct.claimSettlement && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-lg font-semibold mb-4">Claim Settlement</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Settlement Ratio</label>
                                            <p className="text-gray-900">{viewingProduct.claimSettlement.ratio}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Express Settlement</label>
                                            <p className="text-gray-900">{viewingProduct.claimSettlement.expressSettlement}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Conditions</label>
                                            <p className="text-gray-900">{viewingProduct.claimSettlement.conditions}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Company Statistics */}
                            {viewingProduct.companyStats && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-lg font-semibold mb-4">Company Statistics</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Families Protected</label>
                                            <p className="text-gray-900">{viewingProduct.companyStats.familiesProtected}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Assets Under Management</label>
                                            <p className="text-gray-900">{viewingProduct.companyStats.assetsUnderManagement}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Retail Sum Assured</label>
                                            <p className="text-gray-900">{viewingProduct.companyStats.retailSumAssured}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Branches</label>
                                            <p className="text-gray-900">{viewingProduct.companyStats.branches}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Riders */}
                            {viewingProduct.riders && viewingProduct.riders.length > 0 && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-lg font-semibold mb-4">Riders</h4>
                                    {viewingProduct.riders.map((rider, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                                            <h5 className="font-medium mb-2">{rider.title}</h5>
                                            {rider.features && rider.features.length > 0 && (
                                                <div className="mb-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Features:</label>
                                                    <ul className="list-disc list-inside text-gray-900">
                                                        {rider.features.map((feature, idx) => (
                                                            <li key={idx}>{feature}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {rider.disclaimer && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Disclaimer:</label>
                                                    <p className="text-gray-900 text-sm">{rider.disclaimer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* FAQs */}
                            {viewingProduct.faqs && viewingProduct.faqs.length > 0 && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-lg font-semibold mb-4">Frequently Asked Questions</h4>
                                    {viewingProduct.faqs.map((faq, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                                            <h5 className="font-medium mb-2">{faq.question}</h5>
                                            <p className="text-gray-900">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Disclaimers */}
                            {viewingProduct.disclaimers && viewingProduct.disclaimers.length > 0 && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-lg font-semibold mb-4">Disclaimers</h4>
                                    {viewingProduct.disclaimers.map((disclaimer, index) => (
                                        <p key={index} className="text-gray-900 mb-2">{disclaimer}</p>
                                    ))}
                                </div>
                            )}

                            {/* Status */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold mb-4">Status</h4>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    viewingProduct.status === 'active' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {viewingProduct.status}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setViewingProduct(null)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TataAIAProducts;
