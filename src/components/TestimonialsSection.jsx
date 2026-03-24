import React, { useState } from 'react';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(1);

  const testimonials = [
    {
      name: 'Manus Agrawal',
      handle: '@manus.a',
      content: 'dummy text of the printing and typesetting industry. Lorem Ipsum has been th dummy text of the printing and typesetting industry. Lorem Ipsum has been th',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Manus Agrawal',
      handle: '@manus.a',
      content: 'dummy text of the printing and typesetting industry. Lorem Ipsum has been th dummy text of the printing and typesetting industry. Lorem Ipsum has been th',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Manus Agrawal',
      handle: '@manus.a',
      content: 'dummy text of the printing and typesetting industry. Lorem Ipsum has been th dummy text of the printing and typesetting industry. Lorem Ipsum has been th',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="bg-gray-50 py-16 px-8 relative">
      {/* Background Design Elements */}
      <div className="absolute top-8 right-8 w-32 h-32 text-blue-200 opacity-20">
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
        </svg>
      </div>
      <div className="absolute bottom-8 left-8 w-32 h-32 text-blue-200 opacity-20">
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Real experiences from our satisfied customers across India
          </p>
        </div>

        {/* Customer Portraits Carousel */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center space-x-4 lg:space-x-8">
            {/* Card 1 - Blonde man with glasses (now r2.mp4 video, plays on hover) */}
            <div
              className="rounded-xl shadow-lg overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out"
              onMouseEnter={e => {
                const video = e.currentTarget.querySelector('video');
                if (video) video.play();
              }}
              onMouseLeave={e => {
                const video = e.currentTarget.querySelector('video');
                if (video) video.pause();
              }}
            >
              <video
                src="/assets/images/r2.mp4"
                className="w-[220px] h-[210px] object-cover"
                loop
                muted
                playsInline
                preload="metadata"
                onError={(e) => {
                  console.warn('Video loading error:', e.target.src);
                }}
                style={{ display: 'block' }}
              />
            </div>

            {/* Card 2 - Dark hair man with beard */}
            <div
              className="rounded-xl shadow-lg overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out"
              onMouseEnter={e => {
                const video = e.currentTarget.querySelector('video');
                if (video) video.play();
              }}
              onMouseLeave={e => {
                const video = e.currentTarget.querySelector('video');
                if (video) video.pause();
              }}
            >
              <video
                src="/assets/images/r3.mp4"
                className="w-[220px] h-[210px] object-cover"
                loop
                muted
                playsInline
                preload="metadata"
                onError={(e) => {
                  console.warn('Video loading error:', e.target.src);
                }}
                style={{ display: 'block' }}
              />
            </div>

            {/* Card 3 - Center featured card - Dark curly hair man laughing */}
            <div
              className="relative rounded-xl overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out mx-[10px]"
              onMouseEnter={e => {
                const video = e.currentTarget.querySelector('video');
                if (video) video.play();
              }}
              onMouseLeave={e => {
                const video = e.currentTarget.querySelector('video');
                if (video) video.pause();
              }}
            >
              <video
                src="/assets/images/r1.mp4"
                alt="Dark curly hair man laughing"
                className="w-[220px] h-[210px] object-cover"
                loop
                muted
                playsInline
                preload="metadata"
                onError={(e) => {
                  console.warn('Video loading error:', e.target.src);
                }}
              />
            </div>

            {/* Card 4 - Dark curly hair man smiling */}
            <div
              className="rounded-xl shadow-lg overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out"
              onMouseEnter={e => {
                const video = e.currentTarget.querySelector('video');
                if (video) video.play();
              }}
              onMouseLeave={e => {
                const video = e.currentTarget.querySelector('video');
                if (video) video.pause();
              }}
            >
              <video
                src="/assets/images/r4.mp4"
                alt="Dark curly hair man smiling"
                className="w-[220px] h-[210px] object-cover"
                loop
                muted
                playsInline
                preload="metadata"
                onError={(e) => {
                  console.warn('Video loading error:', e.target.src);
                }}
              />
            </div>

            {/* Card 5 - Dark hair man with baseball cap */}
            <div
              className="rounded-xl shadow-lg overflow-hidden transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out"
              onMouseEnter={e => {
                const video = e.currentTarget.querySelector('video');
                if (video) video.play();
              }}
              onMouseLeave={e => {
                const video = e.currentTarget.querySelector('video');
                if (video) video.pause();
              }}
            >
              <video
                src="/assets/images/r5.mp4"
                alt="Dark hair man with baseball cap"
                className="w-[220px] h-[210px] object-cover"
                loop
                muted
                playsInline
                preload="metadata"
                onError={(e) => {
                  console.warn('Video loading error:', e.target.src);
                }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        {/* <div className="flex justify-center space-x-4">
          <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TestimonialsSection;
