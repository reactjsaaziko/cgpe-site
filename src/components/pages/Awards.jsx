import React, { useEffect, useState } from 'react';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';
import LazyLoader, { LazyImage, LoadingSpinner, SkeletonLoader } from '../common/LazyLoader';
import aw1 from "../assets/aw1.JPG"
import aw1v from "../assets/aw1v.MP4"
import aw2 from "../assets/aw2.JPG"
import aw2v from "../assets/aw2v.mp4"
import aw3 from "../assets/aw3.JPG"
import aw3v from "../assets/aw3v.MP4"
import aw4 from "../assets/aw4.JPG"
import aw4v from "../assets/aw4v.MP4"
import aw5 from "../assets/aw5.JPG"
import aw5v from "../assets/aw5v.MP4"
import aw6 from "../assets/aw6.JPG"
import aw6v from "../assets/aw6v.MP4"
import aw7 from "../assets/aw7.JPG"
import aw7v from "../assets/aw7v.MP4"
import aw8 from "../assets/aw8.JPG"
import aw8v from "../assets/aw8v.MP4"
import aw9 from "../assets/aw9.JPG"
import aw9v from "../assets/aw9v.MP4"
import aw10 from "../assets/aw10.JPG"
import aw10v from "../assets/aw10v.mp4"
import aw11 from "../assets/aw11.JPG"
import aw11v from "../assets/aw11v.MP4"
import aw12 from "../assets/aw12.JPG"
import aw12v from "../assets/aw12v.MP4"
import aw13 from "../assets/aw13.JPG"
import aw13v from "../assets/aw13v.MP4"
import aw14 from "../assets/aw14.JPG"
import aw14v from "../assets/aw14v.MP4"
import aw15 from "../assets/aw15.JPG"
import aw15v from "../assets/aw15v.MP4"
import aw16 from "../assets/aw16.JPG"
import aw16v from "../assets/aw16v.MP4"
import aw17 from "../assets/aw17.JPG"
import aw17v from "../assets/aw17v.MP4"
import aw18 from "../assets/aw18.JPG"
import aw18v from "../assets/aw18v.MP4"
import aw19 from "../assets/aw19.JPG"
import aw19v from "../assets/aw19v.MP4"
import aw20 from "../assets/aw20.JPG"
import aw20v from "../assets/aw20v.MP4"
import aw21 from "../assets/aw21.JPG"
import aw21v from "../assets/aw21v.MP4"
import aw22 from "../assets/aw22.JPG"
import aw22v from "../assets/aw22v.MP4"
import aw23 from "../assets/aw23.JPG"
import aw23v from "../assets/aw23v.MP4"
import aw24 from "../assets/aw24.JPG"
import aw24v from "../assets/aw24v.MP4"
import aw25 from "../assets/aw25.JPG"
import aw25v from "../assets/aw25v.MP4"
import aw26 from "../assets/aw26.JPG"
import aw26v from "../assets/aw26v.MP4"
import aw27 from "../assets/aw27.JPG"
import aw27v from "../assets/aw27v.MP4"
import aw28 from "../assets/aw28.JPG"
import aw28v from "../assets/aw28v.MP4"
import aw29 from "../assets/aw29.JPG"
import aw29v from "../assets/aw29v.MP4"
import aw30 from "../assets/aw30.JPG"
import aw30v from "../assets/aw30v.MP4"
import aw31 from "../assets/aw31.JPG"
import aw31v from "../assets/aw31v.MP4"
import aw32 from "../assets/aw32.JPG"
import aw32v from "../assets/aw32v.MP4"
import aw33 from "../assets/aw33.JPG"
import aw33v from "../assets/aw33v.MP4"
import aw34 from "../assets/aw34.JPG"
import aw34v from "../assets/aw34v.MP4"
import aw35 from "../assets/aw35.JPG"
import aw35v from "../assets/aw35v.MP4"
import aw36 from "../assets/aw36.JPG"
import aw36v from "../assets/aw36v.MP4"
import aw37 from "../assets/aw37.jpeg"
import aw37v from "../assets/aw37v.mp4"
import aw38 from "../assets/aw38.jpeg"
import aw38v from "../assets/aw38v.mp4"
import aw39 from "../assets/aw39.jpeg"
import aw39v from "../assets/aw39v.mp4"
import aw40 from "../assets/aw40.jpeg"
import aw40v from "../assets/aw40v.mp4"
import aw41 from "../assets/aw41.jpeg"
import aw41v from "../assets/aw41v.mp4"

// Awards data array - moved outside component to avoid hoisting issues
const awards = [
  {
    id: 39,
    title: "President Club 2024 – Cannes",
    description: "Prestigious recognition by AIA for top-performing advisors.",
    year: "2024",
    category: "Excellence in Performance & Client Service",
    image: aw39,
    video: aw39v,
    detailedDescription: "Honors exceptional advisors for outstanding sales achievements, client trust, and contribution to AIA's growth, celebrated internationally in Cannes, France.",
    achievements: [
      "Selected among AIA's elite President Club members.",
      "Recognized for extraordinary performance and client service.",
      "Honored with international recognition in Cannes 2024."
    ]
  },
  {
    id: 1,
    title: "Paris Training Conclave Award",
    description: "CGP Enterprise qualified for the prestigious Paris Training Conclave by TATA AIA Life Insurance",
    year: "2024",
    category: "Performance Excellence & Training Recognition",
    image: aw1,
    video: aw1v,
    detailedDescription: "Awarded to CGP Enterprise for outstanding performance, dedication, and qualifying for Tata AIA's prestigious Paris Training Conclave, celebrating advisors who excel in sales and client service.",
    achievements: [
      "Qualified for Paris Training Conclave 2024.",
      "Recognized for superlative achievement in performance metrics.",
      "Honored by Tata AIA & Dream Team Agency leadership."
    ]
  },
  {
    id: 8,
    title: "COT (Court of the Table) Qualification Award",
    description: "Recognition by Tata AIA for achieving Court of the Table qualification.",
    year: "2022",
    category: "Top Advisor Performance & Sales Excellence",
    image: aw8,
    video: aw8v,
    detailedDescription: "Awarded to Sagar Changbhai Sholiya for qualifying for the COT (Court of the Table), a global benchmark under MDRT (Million Dollar Round Table), honoring advisors with exceptional sales and client service achievements.",
    achievements: [
      "Qualified for COT 2022 with Tata AIA Life Insurance.",
      "Recognized among the top-performing advisors in the industry.",
      "Demonstrated exceptional client service and business growth."
    ]
  },
  {
    id: 4,
    title: "COT-TOT Strategy Meet Award of Excellence – Hyderabad",
    description: "Recognition for superlative performance at Tata AIA's COT-TOT Strategy Meet.",
    year: "2024",
    category: "Advisor Excellence & Performance Recognition",
    image: aw4,
    video: aw4v,
    detailedDescription: "Awarded to Sagar Chhganbhai Sheliya at the Hyderabad COT-TOT Strategy Meet for exceptional achievement during the period of Jan 2024 to Sep 2024, highlighting consistent excellence and contribution to growth.",
    achievements: [
      "Honored at Tata AIA's COT-TOT Strategy Meet 2024.",
      "Recognized for superlative achievement in Jan–Sep 2024.",
      "Acknowledged as a leading advisor demonstrating excellence and dedication."
    ]
  },
  {
    id: 9,
    title: "AIA President Club Award – Chief Business Associate",
    description: "Recognition by Tata AIA for excellence in the Chief Business Associate category.",
    year: "2024",
    category: "Business Leadership & Performance",
    image: aw9,
    video: aw9v,
    detailedDescription: "Awarded to Chandrikaben Chhaganbhai Patel (CGP Enterprise) for securing Rank 2 in the Chief Business Associate category at the 13th Annual AIA President Club Awards 2024, honoring exceptional business growth and leadership.",
    achievements: [
      "CSecured Rank 2 nationally in Chief Business Associate category.",
      "Recognized at the 13th Annual AIA President Club Awards.",
      "Celebrated for outstanding performance and leadership."
    ]
  },
  {
    id: 11,
    title: "COT Award of Excellence",
    description: "Recognition by Tata AIA for achieving COT qualification in 2021.  ",
    year: "2021",
    category: "Sales Excellence & Advisor Recognition",
    image: aw11,
    video: aw11v,
    detailedDescription: "Awarded to Sagar Chhganbhai Sheliya for qualifying for COT (Court of the Table) 2021, a mark of excellence under MDRT, showcasing top-tier advisor performance in sales and client service.",
    achievements: [
      "Achieved COT qualification in 2021.",
      "Recognized for exceptional client service and business growth.",
      "Honored as one of Tata AIA's leading advisors."
    ]
  },
  {
    id: 41,
    title: "Paris Training Conclave Award",
    description: "Superlative achievement and global recognition in financial advisory.",
    year: "2025",
    category: "Training & Excellence",
    image: aw41,
    video: aw41v,
    detailedDescription: "warded to Sagar Chhaganbhai Sheliya for qualifying for the prestigious Paris Training Conclave through outstanding achievements in financial services.",
    achievements: [
      "Sagar Sheliya earned international recognition at the Paris Training Conclave",
      "highlighting his excellence and commitment in financial advisory."
    ]
  },
  
  {
    id: 27,
    title: "COT Qualification Award – Chandigarh Strategy Meet",
    description: "Recognition for qualifying as COT at Tata AIA's Strategy Meet in Chandigarh.",
    year: "2023",
    category: "Sales Excellence & Advisor Recognition",
    image: aw27,
    video: aw27v,
    detailedDescription: "Awarded to Sagar Chhganbhai Sheliya for being qualified as COT in 2023, celebrated at the Chandigarh Strategy Meet, highlighting consistency in top-tier performance.",
    achievements: [
      "Qualified as COT 2023.",
      "Honored at Chandigarh Strategy Meet.",
      "Recognized for outstanding sales and client service."
    ]
  },
  {
    id: 28,
    title: "TOT Premier Training Conclave Award",
    description: "Recognition for achieving TOT qualification and training excellence.",
    year: "2023",
    category: "Advisor Performance & Leadership",
    image: aw28,
    video: aw28v,
    detailedDescription: "Awarded to Sagar Chhganbhai Sheliya for being recognized at the TOT Premier Training Conclave, marking his place among the industry's highest-performing advisors.",
    achievements: [
      "Qualified as TOT performer.",
      "Recognized at Premier Training Conclave.",
      "Acknowledged for top-level advisor leadership and excellence."
    ]
  },
  {
    id: 7,
    title: "TOT Excellence Award – Mumbai",
    description: "Recognition for delivering outstanding TOT performance.",
    year: "2023",
    category: "TOT Achievement & Business Leadership",
    image: aw7,
    video: aw7v,
    detailedDescription: "Awarded to Sagar Chhganbhai Sheliya (TOT Surat) at Mumbai Extraordinary Meet for delivering exceptional performance and leadership as part of TOT.",
    achievements: [
      "Achieved TOT recognition.",
      "Honored at Mumbai Extraordinary event.",
      "Celebrated for advisor leadership."
    ]
  },
  {
    id: 29,
    title: "Senior Leadership Strategy Meet Award – Jaipur",
    description: "Recognition for leadership and persistency performance at Jaipur Strategy Meet.",
    year: "2025",
    category: "Leadership & Business Performance",
    image: aw29,
    video: aw29v,
    detailedDescription: "Awarded to Chandrikaben Patel (CGP Enterprise) at Tata AIA's Senior Leadership Strategy Meet Jaipur (Jan 2025) for achieving Rank 2 in Partner Leader Persistency performance (DT+L1+L2).",
    achievements: [
      "Achieved Rank 2 in Leader Persistency.",
      "Recognized at Jaipur Leadership Strategy Meet 2025.",
      "Celebrated for leadership and performance excellence."
    ]
  },
  {
    id: 30,
    title: "COT Qualification Award – Chandigarh Strategy Meet",
    description: "Recognition for COT qualification in 2023 at Chandigarh Strategy Meet.",
    year: "2023",
    category: "Advisor Excellence & Recognition",
    image: aw30,
    video: aw30v,
    detailedDescription: "Awarded to Sagar Chhganbhai Sheliya for being qualified as COT 2023, reinforcing his elite advisor status at Tata AIA.",
    achievements: [
      "Qualified as COT in 2023.",
      "Recognized for top performance at Chandigarh Strategy Meet.",
      "Acknowledged for sales and client service achievements."
    ]
  },
  {
    id: 37,
    title: "COT Qualification Award ",
    description: "Recognition by Tata AIA for qualifying as Court of the Table (COT).",
    year: "2022",
    category: "Advisor Performance & Sales Excellence",
    image: aw37,
    video: aw37v,
    detailedDescription: "Awarded to Sagar Chhganbhai Sheliya for his outstanding performance and qualification as COT 2022, celebrated in Surat, representing global standards of excellence under MDRT.",
    achievements: [
      "Qualified as COT in 2022.",
      "Recognized for consistent top-tier advisor performance.",
      "Honored in Surat for sales excellence and client service.",
    ]
  },
  {
    id: 14,
    title: "MDRT COT Qualification Award – Goa",
    description: "Award of Excellence for outstanding qualification as Court of the Table (COT).",
    year: "2021",
    category: "MDRT (Million Dollar Round Table) – COT Qualification",
    image: aw14,
    video: aw14v,
    detailedDescription: "Recognized for qualifying as COT from Jan '21 to Aug '21 under MDRT standards.",
    achievements: [
      "Sagar Chhganbhai Sheliya was honored for his exceptional performance and commitment",
      "successfully qualifying as COT within MDRT standards in 2021."
    ]
  },
  {
    id: 2,
    title: "MDRT Maestros Award",
    description: "Recognition for qualifying and excelling in MDRT (Million Dollar Round Table).",
    year: "2022",
    category: "Sales & Performance Excellence",
    image: aw2,
    video: aw2v,
    detailedDescription: "Awarded by HDFC Life under the leadership of Ankur Shah (Group Head - Proprietary Business), this MDRT Maestros trophy honors top performers for their exceptional contribution and achievement in financial advisory and insurance sales.",
    achievements: [
      "Honored as an MDRT Maestro in 2022, celebrating extraordinary sales performance and global recognition in the prestigious MDRT community.",
      "A mark of dedication, consistency, and client-focused excellence."
    ]
  },
  {
    id: 3,
    title: "MDRT Premier Training Conclave – European Cruise",
    description: "Recognition for exemplary performance at MDRT Premier Training Conclave.",
    year: "2023",
    category: "MDRT Performance & Advisor Recognition",
    image: aw3,
    video: aw3v,
    detailedDescription: "Awarded to Sagar Chhganbhai Sheliya for outstanding performance at the MDRT Premier Training Conclave – European Cruise 2023, honoring international advisory excellence.",
    achievements: [
      "Exemplary MDRT performance.",
      "Honored at the European Cruise Conclave.",
      "Recognized for global advisor excellence."
    ]
  },

  {
    id: 5,
    title: "H2 Achievers Leader Summit – Langkawi",
    description: "Recognition for leadership and performance excellence.",
    year: "2024",
    category: "Leadership & Business Achievement",
    image: aw5,
    video: aw5v,
    detailedDescription: "Awarded to Chandrikaben Chhaganbhai Patel (CGP Enterprise) for qualifying and securing Rank 3 at the H2 Achievers Leader Summit, Langkawi 2024.",
    achievements: [
      "Achieved Rank 3.",
      "Recognized at Langkawi Leadership Summit.",
      "Honored for superlative performance."
    ]
  },
  {
    id: 6,
    title: "MDRT Summit Recognition",
    description: "Recognition for creating MDRT achievement milestones.",
    year: "2022",
    category: "Advisor Excellence & MDRT Qualification",
    image: aw6,
    video: aw6v,
    detailedDescription: "Awarded to C.G. Patel Enterprise for exceptional portfolio management services and MDRT creation in 2022-23.",
    achievements: [
      "Created MDRT recognition.",
      "Excellence in portfolio management.",
      "Honored at MDRT Summit."
    ]
  },



  // {
  //   id: 10,
  //   title: "AIA President Club 2024 - Rank 2 Achievement",
  //   description: "Chandrikaben Chhaganbhai Patel, CGP Enterprise achieved Rank 2 in Chief Business Associate category at AIA President Club 2024",
  //   year: "2024",
  //   category: "President Club",
  //   image: aw10,
  //   video: aw10v,
  //   detailedDescription: "Chandrikaben Chhaganbhai Patel from CGP Enterprise has achieved the prestigious Rank 2 position in the Chief Business Associate category at the AIA President Club 2024. This exceptional recognition celebrates outstanding achievement in the 13th Annual Awards, demonstrating remarkable leadership, business excellence, and professional dedication in the insurance industry.",
  //   achievements: [
  //     "Rank 2 in Chief Business Associate category",
  //     "AIA President Club 2024 recognition",
  //     "Outstanding achievement in 13th Annual Awards",
  //     "Remarkable leadership and business excellence",
  //     "Professional dedication in insurance industry"
  //   ]
  // },

  {
    id: 12,
    title: "MDRT Premier Training Conclave – Baku",
    description: "Award of Appreciation for performance and qualification.",
    year: "2023",
    category: "Advisor Recognition & Training Excellence",
    image: aw12,
    video: aw12v,
    detailedDescription: "Awarded to C.G. Patel Enterprise for qualifying and performing at MDRT Premier Training Conclave in Baku, May 2023, reflecting global excellence.",
    achievements: [
      "Qualified for MDRT Baku 2023.",
      "Recognized for international performance.",
      "Awarded by Tata AIA leadership."
    ]
  },
  {
    id: 13,
    title: "Dubai Performance Excellence Award",
    description: "Recognition for exemplary advisor performance in Dubai.",
    year: "2023",
    category: "Advisor Excellence & Global Recognition",
    image: aw13,
    video: aw13v,
    detailedDescription: "Awarded to Sagar Chhganbhai Sheliya for exemplary performance in Aug 2023, celebrated at the Dubai event under Tata AIA.",
    achievements: [
      "Recognized internationally in Dubai.",
      "Honored for outstanding performance.",
      "Acknowledged as a leading advisor."
    ]
  },
  {
    id: 15,
    title: "May Dhamaka Champion – Turtlemint Contest",
    description: "Excellence award in the May Dhamaka Contest by Turtlemint.",
    year: "2022",
    category: "Sales/Performance Excellence",
    image: aw15,
    video: aw15v,
    detailedDescription: "Presented to C.G. Patel Insurance for winning the May Dhamaka Contest with top performance.",
    achievements: [
      "C.G. Patel Insurance earned the May Dhamaka Champion title in 2022 for outstanding sales growth and leadership in Turtlemint's nationwide contest."
    ]
  },
  {
    id: 16,
    title: "Leadership Strategy Meet – Mumbai",
    description: "Award of Excellence for leadership and performance excellence.",
    year: "2024",
    category: "Leadership & Business Excellence",
    image: aw16,
    video: aw16v,
    detailedDescription: "Awarded to Chandrikaben Chhaganbhai Patel, CGP Enterprise for securing Rank 2 Partner in Persistency (DT+L1+L2) FY24–25.",
    achievements: [
      "Recognized at the Mumbai Leadership Strategy Meet 2024",
      "CGP Enterprise secured Rank 2 for partner persistency",
      "reflecting strong growth and client trust."
    ]
  },
  {
    id: 17,
    title: "Campaign Qualifiers – Sapphire ZM Club",
    description: "Award of Excellence for stupendous performance in FY 2020–21.",
    year: "2021",
    category: "Performance Excellence – Bajaj Allianz",
    image: aw17,
    video: aw17v,
    detailedDescription: "Presented to Sagar Chhaganbhai Sheliya by Bajaj Allianz for exceptional results and qualification in the Sapphire ZM Club campaign.",
    achievements: [
      "Recognized for outstanding performance in FY 2020–21",
      "Sagar Chhaganbhai Sheliya qualified for the elite Sapphire ZM Club under Bajaj Allianz",
      "showcasing excellence in campaign achievements"
    ]
  },
  {
    id: 18,
    title: "Gujarat Zonal Sales Meet Qualification Award",
    description: "Recognition by HDFC Life for outstanding sales qualification.",
    year: "2019",
    category: "Sales Excellence",
    image: aw18,
    video: aw18v,
    detailedDescription: "Awarded at the Gujarat Zonal Sales Meet, Saputara, for exemplary performance.",
    achievements: [
      "Akash Chandpara was recognized at the HDFC Life Gujarat Zonal Sales Meet 2019 for his remarkable qualification and consistent sales excellence."
    ]
  },
  {
    id: 19,
    title: "MDRT Qualification – Surat Division",
    description: "Recognition by LIC for achieving MDRT standards.",
    year: "2019",
    category: "Financial Advisory Excellence",
    image: aw19,
    video: aw19v,
    detailedDescription: "Presented by the Surat Division of LIC to honor MDRT qualification with a citation of excellence.",
    achievements: [
      "Ramesh Chhaganbhai Sheliya achieved the prestigious MDRT qualification in 2019",
      "representing excellence in financial advisory and client service."
    ]
  },
  {
    id: 20,
    title: "MDRT \"Meri Shaan\" Award of Appreciation",
    description: "Recognition by Tata AIA – Dream Team Agency.",
    year: "2020",
    category: "Outstanding Performance",
    image: aw20,
    video: aw20v,
    detailedDescription: "Presented to acknowledge high performance and exceptional client service as part of the MDRT community.",
    achievements: [
      "Sagar Chhaganbhai Sheliya was honored with the MDRT \"Meri Shaan\" Award for his outstanding performance and contribution to Tata AIA's Dream Team Agency."
    ]
  },
  {
    id: 21,
    title: "Career Success Award – STAR Health",
    description: "Presented by STAR Health Insurance to Mr. Chhaganbhai Patel, Surat.",
    // year: "2023",
    category: "Career Achievement",
    image: aw21,
    video: aw21v,
    detailedDescription: "Recognized for achieving excellence under the Career Success Award program.",
    achievements: [
      "Honored for outstanding contribution and consistent growth in the insurance sector",
      "reflecting leadership and professional excellence"
    ]
  },
  {
    id: 22,
    title: "Consecutive TOT/COT Recognition – Tata AIA",
    description: "Awarded to Sagar Chhganbhai Sheliya for consecutive TOT/COT achievements.",
    year: "Consecutive years",
    category: "TOT/COT Qualification",
    image: aw22,
    video: aw22v,
    detailedDescription: "Recognition of consistent top-tier performance and excellence in agency leadership over multiple years.",
    achievements: [
      "Achieved 2 years of continuous TOT/COT qualification",
      "highlighting exceptional consistency and client trust."
    ]
  },
  {
    id: 23,
    title: "MDRT Maestros – HDFC Life",
    description: "Awarded to Akash Chandpara by HDFC Life.",
    year: "2021",
    category: "MDRT Qualification",
    image: aw23,
    video: aw23v,
    detailedDescription: "Recognition for superlative performance and qualifying for the Million Dollar Round Table (MDRT) 2021.",
    achievements: [
      "Earned the prestigious MDRT title in 2021",
      "joining elite financial professionals delivering global standards of excellence."
    ]
  },
  {
    id: 24,
    title: "MDRT Qualification – HDFC Life",
    description: "Awarded to Akash Chandpara for qualifying in MDRT Program 2024.",
    year: "2023",
    category: "MDRT Achievement",
    image: aw24,
    video: aw24v,
    detailedDescription: "Recognition for meeting MDRT standards through remarkable performance in 2023.",
    achievements: [
      "Qualified for MDRT 2024 program through exceptional business growth and client-focused financial advisory in 2023."
    ]
  },
  {
    id: 25,
    title: "Star of the Week Award",
    description: "Recognition for weekly outstanding performance.",
    // year: "2023",
    category: "Performance Excellence",
    image: aw25,
    video: aw25v,
    detailedDescription: "Awarded to Mr. Chhaganbhai Patel, Surat BO, by Star Health Insurance for being selected as the Star of the Week.",
    achievements: [
      "Demonstrated exceptional weekly performance and dedication",
      "standing out among peers."
    ]
  },
  {
    id: 26,
    title: "Award of Excellence – JFM Strategy Meet",
    description: "Recognition for leadership and business excellence.",
    year: "2023",
    category: "Business Growth & Leadership",
    image: aw26,
    video: aw26v,
    detailedDescription: "Presented to CGP Enterprise for achieving Rank 4 in Chief Business Associate Earnings (Apr–Dec 2023) at the JFM Strategy Meet.",
    achievements: [
      "Ranked among the top Chief Business Associates",
      "delivering consistent growth and client service."
    ]
  },
  {
    id: 40,
    title: "CEO Star Club Award",
    description: "Recognition for outstanding business qualification and performance.",
    year: "2025",
    category: "International Recognition",
    image: aw40,
    video: aw40v,
    detailedDescription: "Awarded to C G Patel Enterprise for qualifying into the prestigious CEO Star Club held in France, showcasing exceptional growth and leadership.",
    achievements: [
      "C G Patel Enterprise achieved international recognition by securing a place in the CEO Star Club",
      " reflecting strong performance and consistent excellence."
    ]
  },

  {
    id: 31,
    title: "Head 2 Head Challenge Award",
    description: "Recognition for winning the competitive Head 2 Head Challenge.",
    year: "2025",
    category: "Competitive Excellence",
    image: aw31,
    video: aw31v,
    detailedDescription: "Awarded to Chandrikaben Chhaganbhai Patel (CGP Enterprise Partner) for winning in Group A, FY25 Head 2 Head Challenge.",
    achievements: [
      "Outperformed competitors in leadership and performance",
      "securing top position in challenge group."
    ]
  },
  {
    id: 32,
    title: "Annual Strategy Meet – Rank 1 Award", 
    description: "Recognition for achieving the top rank in progression metrics.",
    year: "2025",
    category: "Leadership & Strategy Excellence",
    image: aw32,
    video: aw32v,
    detailedDescription: "Awarded to Chandrikaben Chhaganbhai Patel (CGP Enterprise Partner) for Achieving Rank 1 in LP Progression – Tree at the Annual Strategy Meet, Mumbai (April 2025).",
    achievements: [
      "Secured the No.1 Rank, showcasing exceptional consistency",
      "leadership, and progress in strategic goals."
    ]
  },
  {
    id: 33,
    title: "Annual Strategy Meet Award 2025",
    description: "Recognizing outstanding business performance.",
    year: "2025",
    category: "LP Activation – Tree",
    image: aw33,
    video: aw33v,
    detailedDescription: "Awarded to Chandrikaben Chhaganbhai Patel (CGP Enterprise) for achieving Rank 2 in LP Activation – Tree during FY25.",
    achievements: [
      "Secured Rank 2 nationally for FY25",
      "reflecting consistent leadership in business growth and performance excellence."
    ]
  },
  {
    id: 34,
    title: "Almaty Training Conclave 2024",
    description: "Qualification award for international training recognition.",
    year: "2024",
    category: "Training Conclave Achievement",
    image: aw34,
    video: aw34v,
    detailedDescription: "Awarded to C.G. Patel Enterprise for superlative achievement and qualifying for the prestigious Almaty Training Conclave, Nov 2024.",
    achievements: [
      "Qualified for an exclusive international training event",
      "showcasing exceptional business growth and advisory performance."
    ]
  },
  {
    id: 35,
    title: "Greece Training Conclave",
    description: "Recognition for international training qualification.",
    year: "2024",
    category: "Training Conclave Achievement",
    image: aw35,
    video: aw35v,
    detailedDescription: "Awarded to Sagar Chhganbhai Sheliya for outstanding achievements and qualifying for the Greece Training Conclave, Nov 2024.",
    achievements: [
      "Earned qualification for the Greece Training Conclave",
      "representing excellence in performance and global recognition."
    ]
  },
  {
    id: 36,
    title: "CEO Star Club Award – France",
    description: "Recognition for exceptional qualification in the CEO Star Club.",
    // year: "2024",
    category: "International Recognition",
    image: aw36,
    video: aw36v,
    detailedDescription: "Awarded to Lalit Chhaganbhai Babariya by TATA AIA & Dream Team Agency for qualifying for the prestigious CEO Star Club, France.",
    achievements: [
      "Honored internationally for excellence in leadership and performance",
      "Lalit Babariya's qualification for the CEO Star Club marks him among the elite achievers at TATA AIA."
    ]
  },
  {
    id: 38,
    title: "Gold Star Award – HDFC Life",
    description: "Recognition for qualifying as a Gold Star achiever.",
    // year: "2024",
    category: "Performance Excellence",
    image: aw38,
    video: aw38v,
    detailedDescription: "Award of Excellence presented to Akash Chandpara by HDFC Life for outstanding performance, under the leadership of Ankur Shah (Group Head - Proprietary Business).",
    achievements: [
      "Akash Chandpara achieved the Gold Star milestone",
      "demonstrating exceptional sales performance and consistency",
      "setting a benchmark of excellence at HDFC Life."
    ]
  },
];

const Awards = () => {
  const [hoveredAward, setHoveredAward] = useState(null);
  const [hoveredCardPosition, setHoveredCardPosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleCards, setVisibleCards] = useState(new Set());

  // Scroll to top when component mounts and handle loading
  useEffect(() => {
    window.scrollTo(0, 0);

    // Enhanced loading with progress tracking
    const totalImages = awards.length;
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / totalImages) * 100);
      setLoadingProgress(progress);
      setLoadedImages(loadedCount);

      if (loadedCount >= totalImages) {
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // Small delay for smooth transition
      }
    };

    // Preload critical images
    const preloadImages = () => {
      awards.slice(0, 6).forEach((award, index) => {
        const img = new Image();
        img.onload = () => {
          setTimeout(updateProgress, index * 100); // Staggered loading
        };
        img.onerror = updateProgress;
        img.src = award.image;
      });

      // Load remaining images in background
      setTimeout(() => {
        awards.slice(6).forEach((award, index) => {
          const img = new Image();
          img.onload = updateProgress;
          img.onerror = updateProgress;
          img.src = award.image;
        });
      }, 1000);
    };

    preloadImages();

    // Fallback timer in case images don't load
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  // Update popup position on scroll (but don't hide if still hovering)
  useEffect(() => {
    const handleScroll = () => {
      if (hoveredAward) {
        // Hide popup on scroll to avoid positioning issues
        setHoveredAward(null);
        setIsAnimating(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hoveredAward]);

  // Track mouse movement for cursor-following popup
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (hoveredAward) {
        // Calculate popup dimensions
        const popupWidth = 550;
        const popupHeight = 250;
        const offsetX = 20;
        const offsetY = 130;

        // Calculate position with boundary checking
        let x = e.clientX + offsetX;
        let y = e.clientY - offsetY;

        // Ensure popup stays within viewport bounds
        if (x + popupWidth > window.innerWidth - 10) {
          x = e.clientX - popupWidth - offsetX; // Position to the left of cursor
        }

        if (y < 10) {
          y = e.clientY + offsetY; // Position below cursor
        }

        setMousePosition({ x, y });
      }
    };

    if (hoveredAward) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredAward]);

  const handleMouseEnter = (award, event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    // Clear any existing hide timeout
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }

    // Set initial mouse position
    setMousePosition({ x: event.clientX, y: event.clientY });

    // Update state
    setHoveredAward(award);
    setIsAnimating(true);
  };

  const handleMouseLeave = () => {
    // Don't immediately set isAnimating to false, let the timeout handle it
    // Set a timeout to hide the popup, but this can be cancelled if we hover another award
    const timeout = setTimeout(() => {
      setHoveredAward(null);
      setIsAnimating(false);
    }, 100); // Reduced timeout for faster response
    setHideTimeout(timeout);
  };

  // Handle card visibility for progressive loading
  const handleCardVisible = (awardId) => {
    setVisibleCards(prev => new Set([...prev, awardId]));
  };

  // Preload images for visible cards
  useEffect(() => {
    const preloadVisibleImages = () => {
      visibleCards.forEach(awardId => {
        const award = awards.find(a => a.id === awardId);
        if (award && award.image) {
          const img = new Image();
          img.src = award.image;
        }
      });
    };

    if (visibleCards.size > 0) {
      preloadVisibleImages();
    }
  }, [visibleCards, awards]);


  // Loader Component
  if (isLoading) {
    return (
      <div className='bg-white min-h-screen'>
        <CGPEHeader />
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="text-center max-w-md mx-auto px-6">
            <LoadingSpinner 
              size="large" 
              text="Loading Awards & Recognition" 
              showText={false}
              className="mb-8"
            />
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#244491] to-[#19aae8] h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            
            {/* Progress Text */}
            <div className="text-gray-600 text-lg mb-2">
              {loadingProgress < 100 ? `Loading ${loadedImages} of ${awards.length} awards...` : 'Almost ready!'}
            </div>
            
            {/* Loading Tips */}
            <div className="text-sm text-gray-500 space-y-1">
              <p>✨ Preparing our achievements for you...</p>
              {loadingProgress > 50 && (
                <p>🎯 Optimizing images for best performance</p>
              )}
              {loadingProgress > 80 && (
                <p>🚀 Almost there!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white min-h-screen'>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      <CGPEHeader />

      {/* Hero Section */}
      <div className="relative p-10 bg-gradient-to-r from-[#244491] to-[#19aae8]">
        {/* Content */}
        <div className="relative flex items-center h-full px-4 sm:px-8 lg:px-16">
          <div className="relative w-full text-gray-100 text-center">
            <div className="mb-6">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-md text-sm font-medium border border-white/30">
                Excellence Since 1989
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Awards & Recognition
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Our commitment to excellence in insurance services has been recognized by industry leaders and clients alike.
              These awards reflect our dedication to providing outstanding service and innovative solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="py-16 awards-section relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#244491] mb-4">
              Our Achievements
            </h2>
            <div className="w-24 h-1 bg-[#19aae8] mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
              Recognition from industry leaders for our commitment to excellence in insurance services.
            </p>
            
            {/* Performance Indicator */}
            {visibleCards.size > 0 && (
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                {visibleCards.size} of {awards.length} awards loaded
              </div>
            )}
          </div>

          {/* Awards Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 awards-grid"
            onMouseLeave={handleMouseLeave} // Handle mouse leave for the entire grid
          >
            {awards.map((award, index) => (
              <LazyLoader
                key={award.id}
                threshold={0.1}
                rootMargin="100px"
                fallback={
                  <SkeletonLoader 
                    type="award-card" 
                    height="400px"
                    className="hover:shadow-md transition-shadow duration-200"
                  />
                }
                onVisible={() => handleCardVisible(award.id)}
              >
                <div
                  className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer relative transform hover:scale-105"
                  onMouseEnter={(e) => handleMouseEnter(award, e)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Award Header */}
                  <div className="bg-white flex justify-center items-center border-b border-gray-200 h-64 relative overflow-hidden">
                    <LazyImage
                      src={award.image}
                      alt={award.title}
                      className="h-full max-h-60 w-auto object-contain mx-auto transition-transform duration-300 hover:scale-110"
                      placeholder={
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-gray-400">
                            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm">Loading award image...</p>
                          </div>
                        </div>
                      }
                    />
                    
                    {/* Year badge overlay */}
                    {award.year && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#244491] text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          {award.year}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Award Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#244491] mb-3 line-clamp-2">
                      {award.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {award.description}
                    </p>
                    
                    {/* Category badge */}
                    {award.category && (
                      <div className="mt-3">
                        <span className="inline-block bg-blue-50 text-[#244491] text-xs font-medium px-2.5 py-1 rounded-full">
                          {award.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </LazyLoader>
            ))}
          </div>

          {/* Hover Popup */}
          {hoveredAward && (
            <div
              className={`fixed z-50 bg-white rounded-xl shadow-2xl border p-5 border-gray-200 overflow-hidden transition-all duration-200 ease-out ${isAnimating ? 'animate-popup-enter' : 'animate-popup-exit'
                }`}
              style={{
                left: mousePosition.x, // Use calculated position with boundary checking
                top: mousePosition.y, // Use calculated position with boundary checking
                width: '550px',
                height: '250px',
                maxWidth: 'calc(100vw - 20px)', // Account for margins
                pointerEvents: 'none',
                transform: isAnimating
                  ? 'translateY(0) scale(1) rotateX(0deg)'
                  : 'translateY(-20px) scale(0.9) rotateX(10deg)',
                opacity: isAnimating ? 1 : 0,
                transformOrigin: 'center top',
                backfaceVisibility: 'hidden',
                transition: 'all 0.1s ease-out' // Faster transition for smooth cursor following
              }}
            >
              <div className="flex h-full">
                {/* Left Side - Video */}
                <div className="w-1/2 bg-black h-full rounded-lg overflow-hidden flex items-center justify-center">
                  {hoveredAward.video && (
                    <video
                      className="h-full max-h-full w-auto object-contain rounded-lg mx-auto"
                      src={hoveredAward.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      onLoadedData={(e) => {
                        e.target.playbackRate = 0.5; // Set video speed to 50% (half speed)
                      }}
                    />
                  )}
                </div>

                {/* Right Side - Award Details */}
                <div className="w-1/2 p-3 flex flex-col justify-center h-full">
                  <div className="mb-2">
                    <span className="inline-block bg-[#4A90E2] text-white text-xs font-bold px-2 py-1 rounded-full">
                      {hoveredAward.year}
                    </span>
                  </div>
                  {/* <div className="mb-2">
                    <span className="inline-block bg-blue-50 text-[#244491] text-xs font-medium px-2 py-1 rounded">
                      {hoveredAward.category}
                    </span>
                  </div> */}

                  <h3 className="text-sm font-bold text-[#244491] mb-2 leading-tight">
                    {hoveredAward.title}
                  </h3>

                  <p className="text-gray-700 text-xs leading-tight mb-2">
                    {hoveredAward.detailedDescription?.substring(0, 120)}...
                  </p>

                  {hoveredAward.achievements && (
                    <div>
                      <ul className="text-xs text-gray-600 space-y-0.5">
                        {hoveredAward.achievements.slice(0, 2).map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-[#4A90E2] mr-1">•</span>
                            <span className="text-xs leading-tight">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Awards;
