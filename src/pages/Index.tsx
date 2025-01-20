import React, { useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import Questionnaire from '@/components/Questionnaire';
import BookingSection from '@/components/BookingSection';

const Index = () => {
  const questionnaireRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  const scrollToQuestionnaire = () => {
    questionnaireRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative">
      <HeroSection onScrollToQuestionnaire={scrollToQuestionnaire} />
      
      <div ref={questionnaireRef}>
        <Questionnaire onComplete={scrollToBooking} />
      </div>
      
      <div ref={bookingRef}>
        <BookingSection />
      </div>
    </main>
  );
};

export default Index;