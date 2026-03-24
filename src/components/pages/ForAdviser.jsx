import React from 'react';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';
import fa1 from '../assets/fa1.png';
import fa2 from '../assets/fa2.png';
import fa3 from '../assets/fa3.png';
import fa4 from '../assets/fa4.png';
import fa5 from '../assets/fa5.png';
import fa6 from '../assets/fa6.png';
import TestimonialsSection from '../TestimonialsSection';

const ForAdviser = () => {
  React.useEffect(() => {
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const motivationActivities = [
    {
      id: 1,
      icon: '🎯',
      label: 'Workshop',
      title: 'Goal Setting Workshops',
      description: 'Set clear, achievable targets and track your progress with our structured goal-setting framework.',
      duration: 'Duration: 2 hours',
      image: '/assets/images/t6.png',
      // color: '#ff6b6b'
    },
    {
      id: 2,
      icon: '🏆',
      label: 'Recognition',
      title: 'Achievement Recognition',
      description: 'Celebrate your wins with our monthly recognition program and milestone rewards.',
      duration: 'Duration: Ongoing',
      image: '/assets/images/t1.png',
      // color: '#ffd93d'
    },
    {
      id: 3,
      icon: '📋',
      label: 'Training',
      title: 'Professional Training',
      description: 'Enhance your skills with our comprehensive training programs and certification courses.',
      duration: 'Duration: Ongoing',
      image: '/assets/images/t2.png',
      // color: '#4ecdc4'
    },
    {
      id: 4,
      icon: '👥',
      label: 'Networking',
      title: 'Peer Mentoring Network',
      description: 'Connect with successful advisors and share best practices in our mentoring program.',
      duration: 'Duration: Weekly',
      image: '/assets/images/t3.png',
      // color: '#a8e6cf'
    },
    {
      id: 5,
      icon: '📊',
      label: 'Analytics',
      title: 'Performance Analytics',
      description: 'Track your success metrics and get insights to optimize your advisory services.',
      duration: 'Duration: Real-time',
      image: '/assets/images/t4.png',
      // color: '#ff8a65'
    },
    {
      id: 6,
      icon: '🎁',
      label: 'Rewards',
      title: 'Incentive Programs',
      description: 'Earn rewards, bonuses, and exclusive benefits based on your performance and client satisfaction.',
      duration: 'Duration: Monthly',
      image: '/assets/images/t5.png',
      // color: '#ffb74d'
    }
  ];

  const successStories = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      label: 'Elite Advisor',
      achievement: 'Top Performer 2023',
      description: 'Increased client portfolio by 150% and achieved highest customer satisfaction rating.',
      image: '/assets/images/tt1.png'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      label: 'Rising Star',
      achievement: 'Top Performer 2023',
      description: 'Exceeded annual targets by 200% in first year as an advisor.',
      image: '/assets/images/tt2.png'
    },
    {
      id: 3,
      name: 'Amit Patel',
      label: 'Champion',
      achievement: 'Customer Champion',
      description: 'Maintained 98% client retention rate and received excellence in service award.',
      image: '/assets/images/tt3.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CGPEHeader />

      {/* Hero Banner Section with Background Image */}
      <div
        className="relative text-white overflow-hidden py-32"
        style={{
          backgroundImage: "url('/assets/images/bkfa.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 reveal" data-animate style={{ '--d': '0ms' }}>
            For Advisors
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl reveal" data-animate style={{ '--d': '120ms' }}>
            Unlock your potential with our comprehensive support system, motivational activities, and growth opportunities designed specifically for insurance advisors.
          </p>
          <a
            href="https://cgpe-frontend-5eobh.ondigitalocean.app/auth"
            className="mt-8 inline-block px-8 py-3 bg-blue-400 text-white font-semibold rounded-lg shadow hover:bg-blue-500 transition-colors duration-200"
          >
            Advisor Login
          </a>
        </div>
      </div>

      {/* Motivation & Growth Activities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Motivation & Growth Activities</h2>
            <p className="text-xl text-gray-600">Choose how you like to connect with us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {motivationActivities.map((activity, idx) => (
              <div
                key={activity.id}
                className="reveal bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                data-animate
                style={{ borderTopColor: activity.color, '--d': `${idx * 100}ms` }}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <img
                      src={activity.image}
                      alt={activity.label}
                      className="w-14 h-14 object-cover border-gray-300"
                    />
                    <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-black border-2 border-black" style={{ backgroundColor: activity.color }}>
                      {activity.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{activity.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">{activity.duration}</span>
                    {/* <span className="text-2xl font-bold" style={{ color: activity.color }}>→</span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Be inspired by our top-performing advisors and their achievements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, idx) => (
              <div
                key={story.id}
                className="reveal bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                data-animate
                style={{ '--d': `${idx * 120}ms` }}
              >
                <div className="relative">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-gray-600 text-white text-sm font-semibold rounded-full">
                    {story.label}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{story.name}</h3>
                  <h4 className="text-lg font-semibold text-blue-600 mb-3">{story.achievement}</h4>
                  <p className="text-gray-600 leading-relaxed">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>
        {`
          .success-story-img {
            transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
          }
          .success-story-card:hover .success-story-img {
            transform: scale(1.05);
          }

          /* Entry animations */
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .reveal { opacity: 0; transform: translateY(16px); }
          .reveal.in-view { animation: fadeUp 600ms var(--ease, cubic-bezier(0.22, 1, 0.36, 1)) both; animation-delay: var(--d, 0ms); }
        `}
      </style>

      {/* Growth & Recognition Programs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black-900 mb-4">Growth & Recognition Programs</h2>
            <p className="text-xl text-gray-700">Choose how you like to connect with us and accelerate your success journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* International Trip Card */}
            <div className="reveal bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-animate style={{ '--d': '0ms' }}>
              <div className="relative">
                <img
                  src={fa3}
                  alt="International Trip"
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center">
                  <img
                    src={fa4}
                    alt="International Trip Icon"
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black-900 mb-3">International Trip</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Experience world-class destinations while building global networks. Our international trip program rewards top performers with luxury travel experiences and exclusive business opportunities.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">Duration: 5-7 Days</span>
                  {/* <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    Learn <span className="ml-1">→</span>
                  </a> */}
                </div>
              </div>
            </div>

            {/* Monthly Motivational Meeting Card */}
            <div className="reveal bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-animate style={{ '--d': '120ms' }}>
              <div className="relative">
                <img
                  src={fa1}
                  alt="Monthly Motivational Meeting"
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center">
                  <img
                    src={fa5}
                    alt="Monthly Motivational Meeting Icon"
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black-900 mb-3">Monthly Motivational Meeting</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Join our inspiring monthly sessions designed to boost your motivation, share success strategies, and connect with fellow advisors. Stay motivated and achieve your goals together.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">Duration: 2-3 Hours Monthly</span>
                  {/* <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    Learn <span className="ml-1">→</span>
                  </a> */}
                </div>
              </div>
            </div>

            {/* Insurance Yearly Award Card */}
            <div className="reveal bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-animate style={{ '--d': '240ms' }}>
              <div className="relative">
                <img
                  src={fa2}
                  alt="Insurance Yearly Award"
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center">
                  <img
                    src={fa6}
                    alt="Insurance Yearly Award Icon"
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black-900 mb-3">Insurance Yearly Award</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Celebrate excellence with our prestigious annual awards ceremony. Recognize outstanding achievements, exceptional performance, and dedication to client service in the insurance industry.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">Duration: Annual Event</span>
                  {/* <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    Learn <span className="ml-1">→</span>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default ForAdviser;
