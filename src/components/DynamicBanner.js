import React, { useState, useEffect } from 'react';
import { getPublicBannerMessages } from '../services/api';

const resolveMsg = (msg) => typeof msg === 'string' ? msg : (msg?.en || '');

function DynamicBanner() {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClosed, setIsClosed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch banner messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getPublicBannerMessages();
        if (data && data.length > 0) {
          setMessages(data);
        } else {
          // Fallback messages if API fails or no messages
          setMessages([
            { icon: '🏆', message: 'Ranked Among Top 10 Ayurveda Clinics in India' },
            { icon: '💆', message: 'Expert Panchkarma Treatments Available' },
            { icon: '✨', message: 'ISO Certified Research Centre' },
            { icon: '🌿', message: '25+ Years of Excellence in Healthcare' }
          ]);
        }
      } catch (error) {
        // Silently use fallback messages if API is unavailable
        setMessages([
          { icon: '🏆', message: 'Ranked Among Top 10 Ayurveda Clinics in India' },
          { icon: '💆', message: 'Expert Panchkarma Treatments Available' },
          { icon: '✨', message: 'ISO Certified Research Centre' },
          { icon: '🌿', message: '25+ Years of Excellence in Healthcare' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (isClosed || messages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isClosed, messages.length]);

  if (loading || messages.length === 0 || isClosed) {
    return null;
  }

  const currentMessage = messages[currentIndex];

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeSlide {
            0% {
              opacity: 0;
              transform: translateY(-10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
      
      <div 
        className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa] text-white shadow-sm transition-transform duration-300 ${
          isClosed ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="relative">
          <div className="container mx-auto px-4 py-1.5">
            <div className="flex items-center justify-center gap-2 pr-8">
              {/* Dynamic Text with Fade Animation */}
              <div className="overflow-hidden">
                <p 
                  key={currentIndex}
                  className="text-xs md:text-sm font-medium text-center"
                  style={{
                    animation: 'fadeSlide 0.5s ease-in-out'
                  }}
                >
                  {currentMessage.icon} {resolveMsg(currentMessage.message)}
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsClosed(true)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/20 rounded-full transition-all duration-200 group"
            aria-label="Close banner"
          >
            <svg 
              className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default DynamicBanner;
