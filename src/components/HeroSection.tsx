import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollToQuestionnaire: () => void;
}

const HeroSection = ({ onScrollToQuestionnaire }: HeroSectionProps) => {
  const handleDownloadGuide = () => {
    // In a real app, this would trigger the download
    console.log("Downloading guide...");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          Transform Your Online Presence
        </h1>
        <p className="text-xl md:text-2xl text-center mb-12 max-w-2xl">
          Learn how to create and manage a website that drives real business results
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleDownloadGuide}
            size="lg"
            className="bg-funnel-primary hover:bg-funnel-primary/90 text-white px-8"
          >
            Download Free Guide
          </Button>
          <Button
            onClick={onScrollToQuestionnaire}
            variant="outline"
            size="lg"
            className="bg-white/10 hover:bg-white/20 text-white border-white px-8"
          >
            Opt In
          </Button>
        </div>

        <div className="absolute bottom-8 animate-scroll-down">
          <ArrowDown className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;