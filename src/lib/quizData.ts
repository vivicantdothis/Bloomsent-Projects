import { QuizQuestion } from "./types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Where would you rather spend a morning?",
    choices: [
      { label: "At a sunny farmer's market", emoji: "🌻", vector: [1, 0, 0] },
      { label: "Reading by the window with tea", emoji: "☕", vector: [0, 1, 0] },
      { label: "Tinkering in a workshop", emoji: "🔧", vector: [0, 0, 1] },
    ],
  },
  {
    id: 2,
    question: "Your ideal weekend is…",
    choices: [
      { label: "Dancing with friends at a small show", emoji: "💃", vector: [1, 0, 0] },
      { label: "Long walk in a quiet garden", emoji: "🌿", vector: [0, 1, 0] },
      { label: "Starting a new DIY project", emoji: "🛠️", vector: [0, 0, 1] },
    ],
  },
  {
    id: 3,
    question: "Pick a comfort food",
    choices: [
      { label: "Fresh-baked honey pastry", emoji: "🥐", vector: [1, 0, 0] },
      { label: "Chamomile tea & toast", emoji: "🍵", vector: [0, 1, 0] },
      { label: "Spicy stir-fry", emoji: "🌶️", vector: [0, 0, 1] },
    ],
  },
  {
    id: 4,
    question: "Your emoji of choice",
    choices: [
      { label: "Sunshine", emoji: "🌞", vector: [1, 0, 0] },
      { label: "Sprout", emoji: "🌱", vector: [0, 1, 0] },
      { label: "Cactus", emoji: "🌵", vector: [0, 0, 1] },
    ],
  },
  {
    id: 5,
    question: "Soundtrack for your day",
    choices: [
      { label: "Folky acoustic jam", emoji: "🎸", vector: [1, 0, 0] },
      { label: "Ambient piano", emoji: "🎹", vector: [0, 1, 0] },
      { label: "Upbeat indie rock", emoji: "🎵", vector: [0, 0, 1] },
    ],
  },
];

export function calculatePersonality(answers: [number, number, number][]): {
  type: string;
  vector: [number, number, number];
} {
  const sum = answers.reduce(
    (acc, curr) => [acc[0] + curr[0], acc[1] + curr[1], acc[2] + curr[2]],
    [0, 0, 0] as [number, number, number]
  );

  const normalized: [number, number, number] = [
    sum[0] / answers.length,
    sum[1] / answers.length,
    sum[2] / answers.length,
  ];

  const [warmth, calm, bold] = normalized;
  const max = Math.max(warmth, calm, bold);

  let type = "";
  if (warmth === max) type = "Sunflower";
  else if (calm === max) type = "Willow";
  else type = "Cactus";

  // Handle ties
  if (warmth === calm && warmth > bold) type = "Marigold";
  else if (calm === bold && calm > warmth) type = "Lavender";
  else if (warmth === bold && warmth > calm) type = "Protea";

  return { type, vector: normalized };
}
