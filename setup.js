#!/usr/bin/env node

import { intro, select, confirm, text, outro } from "@clack/prompts";
import chalk from "chalk";
import open from "open";
import fs from "fs";
import dotenv from "dotenv";
import fetch from "node-fetch";

// Load environment variables
dotenv.config();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "";
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "";
const REDIRECT_URI =
  process.env.SPOTIFY_REDIRECT_URI || "http://localhost:8888/";

async function getSpotifyRefreshToken(authCode) {
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
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await response.json();

  if (data.error) {
    console.error(
      chalk.red("❌ Failed to exchange auth code for token:"),
      data.error_description
    );
    process.exit(1);
  }

  return data.refresh_token;
}

async function runSetup() {
  console.clear();
  intro(chalk.blue.bold("🎵 Welcome to Music Commit Setup! 🎵"));
  console.log(
    "This setup will guide you through configuring your music commit experience.\n"
  );

  // Step 1: Select Music Provider
  const musicProvider = await select({
    message: "Which music provider do you want to use?",
    options: [
      { value: "spotify", label: "Spotify" },
      { value: "none", label: "Skip for now" },
    ],
  });

  console.log(chalk.gray(`You selected: ${musicProvider}\n`));

  // Step 2: Handle Spotify Authentication
  let spotifyAuthSuccess = false;
  let spotifyAuthCode = "";

  if (musicProvider === "spotify") {
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
      console.log(
        chalk.red.bold("\n❌ Spotify Client ID or Secret is missing.")
      );
      console.log(
        "Please update your `.env` file with your SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.\n"
      );
      outro(
        "Setup failed. Run `music-commit setup` again after updating `.env`."
      );
      process.exit(1);
    }

    console.log(
      chalk.yellow("\n🔗 Starting Spotify authentication process...")
    );

    // Generate the Spotify auth URL
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=user-read-recently-played`;

    console.log(chalk.green.bold("\n👉 Open this link to authorize Spotify:"));
    console.log(chalk.blue.underline(authUrl));

    // Automatically open the URL in the default browser
    await open(authUrl);

    // Ask user to enter the auth code manually
    spotifyAuthCode = await text({
      message:
        "Paste the authorization code from Spotify (or press Enter to skip):",
    });

    if (spotifyAuthCode.trim()) {
      // Exchange the auth code for a refresh token
      const refreshToken = await getSpotifyRefreshToken(spotifyAuthCode);

      // Save refresh token to .env
      fs.appendFileSync(".env", `\nSPOTIFY_REFRESH_TOKEN=${refreshToken}\n`);

      spotifyAuthSuccess = true;
    }
  }

  // Step 3: Confirmation
  const confirmSetup = await confirm({
    message: "Everything look good?",
  });

  if (confirmSetup) {
    // Save setup info to config.json
    const config = {
      musicProvider,
      spotifyAuthSuccess,
    };

    fs.writeFileSync("config.json", JSON.stringify(config, null, 2));

    outro(
      chalk.green.bold("✅ Setup complete! You’re ready to use music-commit.")
    );
  } else {
    outro(
      chalk.red.bold(
        "❌ Setup failed or canceled. Run `music-commit setup` again."
      )
    );
    process.exit(1);
  }
}

// Run setup when this file is executed
runSetup();
