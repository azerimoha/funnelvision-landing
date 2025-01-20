import React, { useRef, useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import Questionnaire from '@/components/Questionnaire';
import BookingSection from '@/components/BookingSection';
import EmailDialog from '@/components/EmailDialog';

const Index = () => {
  const questionnaireRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const [hasOptedIn, setHasOptedIn] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Prevent scroll when conditions are not met
  useEffect(() => {
    const handleScroll = (e: WheelEvent | TouchEvent) => {
      const scrollPosition = window.scrollY;
      const questionnairePosition = questionnaireRef.current?.offsetTop || 0;
      
      // If we haven't opted in yet, prevent scrolling past hero section
      if (!hasOptedIn && scrollPosition > 100) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return false;
      }

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
  }, [questionnaireCompleted, hasOptedIn]);

  const handleOptIn = () => {
    setShowEmailDialog(true);
  };

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
    setHasOptedIn(true);
    setShowEmailDialog(false);
    scrollToQuestionnaire();
  };

  const scrollToQuestionnaire = () => {
    if (hasOptedIn) {
      questionnaireRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
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
      <HeroSection onScrollToQuestionnaire={handleOptIn} />
      
      <div ref={questionnaireRef}>
        <Questionnaire onComplete={handleQuestionnaireComplete} />
      </div>
      
      <div ref={bookingRef}>
        <BookingSection />
      </div>

      <EmailDialog 
        open={showEmailDialog}
        onClose={() => setShowEmailDialog(false)}
        onSubmit={handleEmailSubmit}
      />
    </main>
  );
};

export default Index;