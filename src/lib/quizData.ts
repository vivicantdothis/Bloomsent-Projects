import { QuizQuestion } from "./types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "YOUR PLANT HAS GROWN LEGS. WHERE IS IT GOING?",
    choices: [
      { label: "A CONCERT, OBVIOUSLY", emoji: "🎸🎤", vector: [1, 0, 0] },
      { label: "TO YOUR FAVOURITE NOOK IN THE LOCAL BOOKSTORE", emoji: "📚☕", vector: [0, 1, 0] },
      { label: "TO THE MOUNTAINS OR THE BEACH, FOR THE ADVENTURE", emoji: "🏔️🏖️", vector: [0, 0, 1] },
    ],
  },
  {
    id: 2,
    question: "PICK A CHAOS PET.",
    choices: [
      { label: "A CHEEKY PIGEON THAT GOSSIPS", emoji: "🕊️💬", vector: [1, 0, 0] },
      { label: "A COY CAT THAT JUDGES EVERYONE SLIGHTLY", emoji: "🐱😼", vector: [0, 1, 0] },
      { label: "A SNEAKY FOX THAT STEALS SHINY THINGS", emoji: "🦊✨", vector: [0, 0, 1] },
    ],
  },
  {
    id: 3,
    question: "YOU WAKE UP IN A VIDEO-GAME WORLD. WHAT'S YOUR FIRST MOVE?",
    choices: [
      { label: "FIND OTHER PLAYERS TO TEAM UP", emoji: "🤝🎮", vector: [1, 0, 0] },
      { label: "EXPLORE THE MAP ALONE, THERE'S NO RUSH", emoji: "🗺️🚶‍♂️", vector: [0, 1, 0] },
      { label: "SPEED-RUN ALL THE QUESTS AND BREAK THE GAME", emoji: "⚡🏃‍♀️💥", vector: [0, 0, 1] },
    ],
  },
  {
    id: 4,
    question: "PICK A RANDOM SIDE QUEST.",
    choices: [
      { label: "HOST A PICNIC FOR STRANGERS", emoji: "🥪🌳", vector: [1, 0, 0] },
      { label: "ADOPT A ROCK AND NAME IT", emoji: "🪨💖", vector: [0, 1, 0] },
      { label: "BUILD SOMETHING NEW AT 2AM", emoji: "🏗️🌙", vector: [0, 0, 1] },
    ],
  },
  {
    id: 5,
    question: "WHAT DOES THE SOUNDTRACK OF YOUR INDIE FILM SOUND LIKE?",
    choices: [
      { label: "CHILL R&B AND POST-PUNK", emoji: "🎧🖤", vector: [1, 0, 0] },
      { label: "AMBIENT PIANO MUSIC", emoji: "🎹🌌", vector: [0, 1, 0] },
      { label: "UPBEAT INDIE POP AND GARAGE ROCK", emoji: "🎸🎶", vector: [0, 0, 1] },
    ],
  },
];

export function calculatePersonality(
  answers: [number, number, number][]
): { type: string; vector: [number, number, number] } {
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
  if (warmth === max) type = "SUNFLOWER";
  else if (calm === max) type = "WILLOW";
  else type = "CACTUS";

  // Handle ties
  if (warmth === calm && warmth > bold) type = "MARIGOLD";
  else if (calm === bold && calm > warmth) type = "LAVENDER";
  else if (warmth === bold && warmth > calm) type = "PROTEA";

  return { type, vector: normalized };
}
