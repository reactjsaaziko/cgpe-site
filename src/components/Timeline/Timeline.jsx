import React from 'react';

const Timeline = () => {
  const timelineData = [
    {
      year: "1989-1992",
      title: "Building a Foundation of Trust",
      description: "C. G. Patel establishes a strong reputation for client-centric service.",
      position: "right",
      align: "left"
    },
    {
      year: "2000",
      title: "Expanding Expertise",
      description: "CGPE expands its offerings to include General Insurance.",
      position: "left",
      align: "right"
    },
    {
      year: "2002-2005",
      title: "Consistent Excellence",
      description: "Consistent Excellence - CGPE achieves MDRT and Chairman's Club recognition, demonstrating a commitment to exceeding client expectations.",
      position: "right",
      align: "left"
    },
    {
      year: "2015",
      title: "5,000 Families Secured",
      description: "CGPE helps 5,000 families achieve financial security.",
      position: "left",
      align: "right"
    },
    {
      year: "2017",
      title: "6,000 Families Empowered",
      description: "CGPE continues its growth, supporting the financial well-being of 6,000 families.",
      position: "right",
      align: "left"
    },
    {
      year: "2020",
      title: "Top of the Table Achievement",
      description: "CGPE earns a prestigious industry recognition.",
      position: "left",
      align: "right"
    },
    {
      year: "2021",
      title: "10,000 Families on the Path to Freedom",
      description: "CGPE celebrates a major milestone, empowering 10,000 families on their journey to financial freedom.",
      position: "right",
      align: "left"
    },
    {
      year: "2022",
      title: "Continued Success",
      description: "CGPE achieves Top of the Table recognition with TATA AIA and Club of Top Performers (COT) with Bajaj, showcasing continued excellence across insurance providers.",
      position: "left",
      align: "right"
    },
    {
      year: "2023",
      title: "Expansion and Innovation",
      description: "CGPE establishes a new office in Mumbai",
      position: "right",
      align: "left"
    },
    {
      year: "2024",
      title: "Reaching New Heights",
      description: "CGPE opens a new office in Ahmedabad, expanding its reach and commitment to financial empowerment across India.",
      position: "left",
      align: "right"
    },
    {
      year: "2024",
      title: "Started Mutual Funds Business",
      description: "Grow your wealth with confidence through mutual funds, a secure investment option tailored to your financial goals.",
      position: "right",
      align: "left"
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-black-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Working Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            A Timeline of Growth and Achievement:
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-400 rounded-full"></div>
          
          {/* Mobile Line - Left side */}
          <div className="md:hidden absolute left-6 w-1 h-full bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div key={index} className={`relative flex items-center ${item.position === 'left' ? 'md:flex-row-reverse flex-row' : 'flex-row'}`}>
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${item.position === 'left' ? 'md:pr-8 md:text-right pl-16 md:pl-0' : 'md:pl-8 md:text-left pl-16 md:pl-8'}`}>
                  <div className={`bg-white rounded-lg shadow-lg hover:shadow-xl ${item.align === 'left' ? 'md:pr-8 md:text-right pl-16 md:pl-0' : 'md:pl-8 md:text-left pl-16 md:pl-8'} transition-all duration-300 p-6 border-l-4 border-blue-400`}>
                    <div className="text-blue-400 font-semibold text-lg mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center Circle - Desktop */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>

                {/* Left Circle - Mobile */}
                <div className="md:hidden absolute left-2 w-8 h-8 bg-purple-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>

                {/* Empty Space for Other Side - Desktop only */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
