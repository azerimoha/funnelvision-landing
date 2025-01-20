import React, { useRef, useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import Questionnaire from '@/components/Questionnaire';
import BookingSection from '@/components/BookingSection';
import EmailDialog from '@/components/EmailDialog';

const Index = () => {
  const questionnaireRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailAction, setEmailAction] = useState<'guide' | 'questionnaire'>('questionnaire');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Prevent all scrolling
  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  const handleEmailSubmit = (email: string) => {
    console.log('Email submitted:', email);
    setUserEmail(email);
    setShowEmailDialog(false);

    if (emailAction === 'guide') {
      console.log('Downloading guide...');
      // Handle guide download logic here
    } else {
      scrollToQuestionnaire();
    }
  };

  const scrollToQuestionnaire = () => {
    questionnaireRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    if (questionnaireCompleted) {
      bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    setEmailAction('questionnaire');
    setShowEmailDialog(true);
  };

  const handleDownloadGuide = () => {
    setEmailAction('guide');
    setShowEmailDialog(true);
  };

  const handleQuestionnaireComplete = () => {
    setQuestionnaireCompleted(true);
    scrollToBooking();
  };

  return (
    <main className="relative h-screen overflow-hidden">
      <div className="h-screen">
        <HeroSection 
          onScrollToQuestionnaire={handleGetStarted}
          onDownloadGuide={handleDownloadGuide}
        />
      </div>
      
      <div ref={questionnaireRef} className="h-screen">
        <Questionnaire onComplete={handleQuestionnaireComplete} />
      </div>
      
      <div ref={bookingRef} className="h-screen">
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