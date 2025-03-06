#!/usr/bin/env node

import chalk from "chalk";
import stripAnsi from "strip-ansi";
import { execSync } from "child_process";
import { handleFlags } from "./flags.js";

// Sample list of fake songs
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

handleFlags(args);

if (!args.length) {
  console.error(chalk.red.bold("❌ Error:") + " No commit message provided!");
  console.log(
    chalk.gray("Usage: music-commit 'Your commit message {{ADD MUSIC}}'")
  );
  process.exit(1);
}

// Extract commit message from arguments
let commitMessage = args.join(" ");

// Get a random song
const randomSong = getRandomSong();

// Check if the commit message contains {{ADD MUSIC}}
if (commitMessage.includes("{{ADD MUSIC}}")) {
  commitMessage = commitMessage.replace(
    "{{ADD MUSIC}}",
    chalk.green(randomSong)
  );
} else {
  console.log(
    chalk.yellow.bold(
      "⚠️ No {{ADD MUSIC}} found! Adding a random song automatically..."
    )
  );
  commitMessage += ` ${chalk.green(randomSong)}`;
}

// **Strip ANSI colors before committing**
const cleanCommitMessage = stripAnsi(commitMessage);

// Show final commit preview with colors (but commit a clean message)
console.log(chalk.blue.bold("\n📝 Final Commit Message:"));
console.log(chalk.cyan(`"${cleanCommitMessage}"\n`));

// Run git commit with stripped message
try {
  execSync(`git commit -m "${cleanCommitMessage}"`, { stdio: "inherit" });
} catch (error) {
  console.error(
    chalk.red.bold("❌ Error running git commit.") +
      " Are you inside a Git repo?"
  );
  process.exit(1);
}
