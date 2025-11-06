# Bloom: The Living Garden

Hi! I'm Saanvi. For my DSA project, we were tasked to create a web application that displayed a unique use of basic DSA concepts. So, after consideration and many (tireless) nights spent debating whether creating an ACTUAL physics-based universe was worth it, I settled on bloom. bloom is a beautiful full-stack app where users anonymously plant their personality and music in a shared garden.

## Tech Stack

**Frontend:**
- React + Vite + TypeScript
- Tailwind CSS (Polaroid/Scrapbook aesthetic)
- React Router
- TanStack Query

**Backend:**
- Node.js + Express
- JSON file storage (no database required)
- CORS enabled

**Features:**
- 5-question personality quiz
- Plant clustering by similarity (cosine similarity)
- Spotify song embedding
- Anonymous messaging

## File Structure

```
living-garden/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── garden/
│   │   │   ├── PlantCard.tsx
│   │   │   ├── GardenGrid.tsx
│   │   │   └── PlantModal.tsx
│   │   ├── quiz/
│   │   │   ├── PersonalityQuiz.tsx
│   │   │   ├── QuizQuestion.tsx
│   │   │   └── SongInput.tsx
│   │   └── ui/ (shadcn components)
│   ├── pages/
│   │   ├── Index.tsx (Landing)
│   │   ├── Garden.tsx (Garden view)
│   │   └── Submit.tsx (Plant submission)
│   ├── lib/
│   │   ├── types.ts
│   │   ├── api.ts
│   │   ├── clustering.ts (DSA component)
│   │   └── quizData.ts
│   └── index.css (Design system)
├── server/
│   ├── server.js (Express API)
│   ├── plants.json (Database)
│   ├── package.json
│   └── README.md
└── README.md
```

## Local Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 3. Create Environment File

```bash
cp .env.example .env
```

The default backend URL is `http://localhost:3001/api`

### 4. Start Backend Server

```bash
cd server
npm start
```

Server runs on `http://localhost:3001`

### 5. Start Frontend (in a new terminal)

```bash
npm run dev
```

Frontend runs on `http://localhost:8080`

## Usage

1. Visit `http://localhost:8080`
2. Click "Plant Something" to take the quiz
3. Answer 5 personality questions
4. Add a Spotify song link (optional)
5. Add a message (optional)
6. Submit to add your plant to the garden
7. Browse the garden and click plants to see details

## Personality Types

Based on quiz answers, plants are classified as:
- 🌻 **Sunflower** - Warm & welcoming
- 🌿 **Willow** - Calm & peaceful
- 🌵 **Cactus** - Bold & adventurous
- 🌼 **Marigold** - Warm + Calm hybrid
- 💜 **Lavender** - Calm + Bold hybrid
- 🌺 **Protea** - Warm + Bold hybrid

## DSA Component

The app uses **cosine similarity** to cluster plants by personality:
- Each plant has a 3D personality vector: [warmth, calm, bold]
- Similar plants (similarity > 0.7) are grouped together
- When viewing a plant, the app suggests similar plants

See `src/lib/clustering.ts` for implementation.

## Design System

Colors (Polaroid + Scrapbook aesthetic):
- Cream paper background
- Muted blue accents  
- Pastel olive for headers
- Terracotta and dust rose for warmth
- Leaf green for nature
- Soft brown for text


