import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

async function getSpotifyAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
          "base64"
        ),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const data = await response.json();

  if (data.error) {
    console.error("❌ Failed to get access token:", data.error_description);
    process.exit(1);
  }

  return data.access_token;
}

async function getRecentlyPlayedTracks() {
  const accessToken = await getSpotifyAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=5",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  if (!data.items) {
    console.error("❌ Failed to fetch recently played tracks.");
    process.exit(1);
  }

  return data.items.map((item) => ({
    name: item.track.name,
    artist: item.track.artists.map((artist) => artist.name).join(", "),
  }));
}

export { getRecentlyPlayedTracks };
