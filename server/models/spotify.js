
import fetch from "node-fetch"; // if node <18, install node-fetch

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let _token = null;
let _tokenExpiry = 0;

async function getToken() {
  const now = Date.now();
  if (_token && now < _tokenExpiry) return _token;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  _token = data.access_token;
  _tokenExpiry = now + (data.expires_in - 30) * 1000;
  return _token;
}

export function extractSpotifyTrackId(url) {
  try {
    // handle typical Spotify share links and open.spotify.com
    const r = url.match(/track\/([A-Za-z0-9]+)/);
    if (r && r[1]) return r[1];
    const q = url.match(/spotify:track:([A-Za-z0-9]+)/);
    if (q && q[1]) return q[1];
    return "";
  } catch (e) {
    return "";
  }
}

export async function fetchAudioFeatures(trackId) {
  if (!trackId) return null;
  const token = await getToken();
  const res = await fetch(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) return null;
  const features = await res.json();

  // Build a vector. Normalize tempo (divided by 200), etc. Choose fields you like.
  const vec = [
    features.danceability ?? 0,
    features.energy ?? 0,
    features.valence ?? 0,
    features.acousticness ?? 0,
    features.instrumentalness ?? 0,
    features.liveness ?? 0,
    (features.tempo ?? 0) / 200,
  ];

  return vec;
}
