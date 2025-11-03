import { QuizQuestion as QuizQuestionType } from "@/lib/types";

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (questionId: number, vector: [number, number, number]) => void;
  selectedVector?: [number, number, number];
  disabled?: boolean;
}

export function QuizQuestion({ question, onAnswer, selectedVector, disabled }: QuizQuestionProps) {
  return (
    <div className={`scrapbook-card relative ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      <h3 className="font-heading text-lg mb-4 text-soft-brown">{question.question}</h3>
      
      <div className="grid gap-2">
        {question.choices.map((choice, index) => {
          const isSelected =
            selectedVector &&
            choice.vector.every((val, i) => val === selectedVector[i]);

          return (
            <button
              key={index}
              onClick={() => onAnswer(question.id, choice.vector)}
              disabled={disabled}
              className={`p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                isSelected
                  ? "border-leaf bg-leaf/10 scale-[1.02]"
                  : "border-soft-brown/20 hover:border-leaf/50 hover:bg-muted"
              }`}
            >
              <span className="text-2xl">{choice.emoji}</span>
              <span className="font-medium text-soft-brown">{choice.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
