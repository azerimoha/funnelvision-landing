import React, { useRef, useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import Questionnaire from '@/components/Questionnaire';
import BookingSection from '@/components/BookingSection';

const Index = () => {
  const questionnaireRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

  // Prevent scroll when questionnaire is not completed
  useEffect(() => {
    const handleScroll = (e: WheelEvent | TouchEvent) => {
      const scrollPosition = window.scrollY;
      const questionnairePosition = questionnaireRef.current?.offsetTop || 0;
      const bookingPosition = bookingRef.current?.offsetTop || 0;

      // If we're at or past the questionnaire section but haven't completed it
      if (scrollPosition >= questionnairePosition && !questionnaireCompleted) {
        e.preventDefault();
        window.scrollTo({
          top: questionnairePosition,
          behavior: 'smooth'
        });
        return false;
      }
    };

    // Add both wheel and touch event listeners
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [questionnaireCompleted]);

  const scrollToQuestionnaire = () => {
    questionnaireRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    if (questionnaireCompleted) {
      bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuestionnaireComplete = () => {
    setQuestionnaireCompleted(true);
    scrollToBooking();
  };

  return (
    <main className="relative">
      <HeroSection onScrollToQuestionnaire={scrollToQuestionnaire} />
      
      <div ref={questionnaireRef}>
        <Questionnaire onComplete={handleQuestionnaireComplete} />
      </div>
      
      <div ref={bookingRef}>
        <BookingSection />
      </div>
    </main>
  );
};

export default Index;