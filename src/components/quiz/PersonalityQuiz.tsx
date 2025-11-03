import { useState } from "react";
import { QuizQuestion } from "./QuizQuestion";
import { quizQuestions } from "@/lib/quizData";
import { Button } from "@/components/ui/button";

interface PersonalityQuizProps {
  onComplete: (answers: [number, number, number][]) => void;
}

export function PersonalityQuiz({ onComplete }: PersonalityQuizProps) {
  const [answers, setAnswers] = useState<Map<number, [number, number, number]>>(new Map());
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (questionId: number, vector: [number, number, number]) => {
    const newAnswers = new Map(answers);
    newAnswers.set(questionId, vector);
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    }
  };

  const handleSubmit = () => {
    const answerArray = Array.from(answers.values());
    onComplete(answerArray);
  };

  const allAnswered = answers.size === quizQuestions.length;
  const progress = (answers.size / quizQuestions.length) * 100;

  return (
    <div className="space-y-6">
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-leaf transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-4">
        {quizQuestions.map((question, index) => (
          <div
            key={question.id}
            className={`transition-all duration-300 ${
              index === currentQuestion ? "opacity-100" : index < currentQuestion ? "opacity-50" : "opacity-30"
            }`}
          >
            <QuizQuestion
              question={question}
              onAnswer={handleAnswer}
              selectedVector={answers.get(question.id)}
              disabled={index > currentQuestion}
            />
          </div>
        ))}
      </div>

      {allAnswered && (
        <Button
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform"
        >
          Continue to Plant Details
        </Button>
      )}
    </div>
  );
}
