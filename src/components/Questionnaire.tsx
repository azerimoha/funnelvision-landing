import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface QuestionnaireProps {
  onComplete: () => void;
}

const Questionnaire = ({ onComplete }: QuestionnaireProps) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: "website",
      question: "Do you currently have a website?",
      options: ["Yes", "No", "Under Development"]
    },
    {
      id: "budget",
      question: "What's your monthly marketing budget?",
      options: ["$0-$500", "$501-$2000", "$2000+"]
    },
    {
      id: "timeline",
      question: "When do you want to start?",
      options: ["Immediately", "Within 1 Month", "3+ Months"]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (!answers[questions[currentQuestion].id]) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      console.log('Final answers:', answers);
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-funnel-secondary/30 px-4">
      <Card className="w-full max-w-lg p-8">
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-8">
          Let's find the perfect solution for you
        </h2>
        
        <div className="space-y-6">
          <p className="text-lg font-medium mb-4">
            {questions[currentQuestion].question}
          </p>

          <RadioGroup
            onValueChange={handleAnswer}
            value={answers[questions[currentQuestion].id]}
          >
            {questions[currentQuestion].options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>

          <Button
            onClick={handleNext}
            className="w-full bg-funnel-primary hover:bg-funnel-primary/90"
          >
            {currentQuestion < questions.length - 1 ? 'Next' : 'See Available Times'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Questionnaire;