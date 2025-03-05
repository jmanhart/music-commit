#!/usr/bin/env node

const { execSync } = require("child_process");

// Sample List of Fake Songs
const fakeSongs = [
  "🎵 Daft Punk - Harder, Better, Faster, Stronger",
  "🎵 The Beatles - Hey Jude",
  "🎵 Radiohead - Creep",
  "🎵 Queen - Bohemian Rhapsody",
  "🎵 Taylor Swift - Shake It Off",
  "🎵 Kendrick Lamar - HUMBLE.",
  "🎵 Nirvana - Smells Like Teen Spirit",
  "🎵 OutKast - Hey Ya!",
  "🎵 Billie Eilish - Bad Guy",
  "🎵 The Rolling Stones - Paint It Black",
];

// Function to pick a random song
const getRandomSong = () =>
  fakeSongs[Math.floor(Math.random() * fakeSongs.length)];

const args = process.argv.slice(2);
if (!args.length) {
  console.error("Usage: music-commit 'Your commit message {{ADD MUSIC}}'");
  process.exit(1);
}

// Extract commit message from arguments
let commitMessage = args.join(" ");

// Get Random Song
const randomSong = getRandomSong();

// Check if the commit message contains {{ADD MUSIC}}
if (commitMessage.includes("{{ADD MUSIC}}")) {
  commitMessage = commitMessage.replace("{{ADD MUSIC}}", randomSong);
} else {
  console.log("⚠️ No {{ADD MUSIC}} found. Adding music automatically...");
  commitMessage += ` ${randomSong}`;
}

// Run git commit
try {
  execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });
} catch (error) {
  console.error("❌ Error running git commit. Are you inside a Git repo?");
  process.exit(1);
}
