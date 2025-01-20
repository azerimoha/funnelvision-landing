import React from 'react';
import { Card } from "@/components/ui/card";

const BookingSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-4xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">
          Schedule Your Strategy Session
        </h2>
        
        <div className="aspect-video">
          {/* Replace this iframe src with your actual Calendly link */}
          <iframe
            src="https://calendly.com/your-calendar"
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </div>
      </Card>
    </div>
  );
};

export default BookingSection;