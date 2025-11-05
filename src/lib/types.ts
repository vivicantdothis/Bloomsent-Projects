export interface Plant {
  id: string;
  personalityType: string;
  personalityVector: [number, number, number]; // [warmth, calm, bold]
  songUrl: string;
  messageTo?: string;
  messageFrom?: string;
  message?: string;
  createdAt: string;
  compatibilityScore?: number;
}

export interface QuizAnswer {
  questionId: number;
  vector: [number, number, number];
}

export interface QuizQuestion {
  id: number;
  question: string;
  choices: {
    label: string;
    emoji: string;
    vector: [number, number, number];
  }[];
}
