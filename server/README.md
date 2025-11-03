# Living Garden Backend

Simple Express.js backend for the Living Garden app using JSON file storage.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Start the server:
```bash
npm start
```

Or use watch mode for development:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### GET /api/plants
Returns all plants from the garden.

**Response:**
```json
[
  {
    "id": "1234567890",
    "personalityType": "Sunflower",
    "personalityVector": [1, 0, 0],
    "songUrl": "https://open.spotify.com/track/...",
    "messageTo": "You",
    "messageFrom": "Me",
    "message": "A beautiful message",
    "createdAt": "2025-11-03T12:00:00.000Z"
  }
]
```

### POST /api/plants
Add a new plant to the garden.

**Request Body:**
```json
{
  "personalityType": "Sunflower",
  "personalityVector": [1, 0, 0],
  "songUrl": "https://open.spotify.com/track/...",
  "messageTo": "You",
  "messageFrom": "Me",
  "message": "A beautiful message"
}
```

**Response:**
```json
{
  "id": "1234567890",
  "personalityType": "Sunflower",
  "personalityVector": [1, 0, 0],
  "songUrl": "https://open.spotify.com/track/...",
  "messageTo": "You",
  "messageFrom": "Me",
  "message": "A beautiful message",
  "createdAt": "2025-11-03T12:00:00.000Z"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Living Garden API is running"
}
```

## Data Storage

Plants are stored in `plants.json` file in the server directory. This file is automatically created on first run.

## Environment Variables

- `PORT` - Server port (default: 3001)

## CORS

CORS is enabled for all origins to allow the frontend to communicate with the backend.
