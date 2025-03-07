#!/usr/bin/env node

import chalk from "chalk";
import stripAnsi from "strip-ansi";
import { execSync } from "child_process";
import { handleFlags } from "./flags.js";
import { select, text, confirm } from "@clack/prompts";

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

// Function to select a song
async function getUserSelectedSong() {
  return await select({
    message: "🎵 Choose a song to attach to your commit:",
    options: fakeSongs.map((song) => ({ value: song, label: song })),
  });
}

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

// Ask user if they want to add a song
const addSong = await confirm({ message: "Do you want to add a song?" });

let selectedSong = "";

if (addSong) {
  const songChoice = await select({
    message: "🎵 How do you want to add a song?",
    options: [
      { value: "choose", label: "Select from list" },
      { value: "manual", label: "Type a song manually" },
      { value: "none", label: "Skip" },
    ],
  });

  if (songChoice === "choose") {
    selectedSong = await getUserSelectedSong();
  } else if (songChoice === "manual") {
    selectedSong = await text({ message: "Type your song:" });
  }
}

// If the commit message contains {{ADD MUSIC}}, replace it
if (commitMessage.includes("{{ADD MUSIC}}") && selectedSong) {
  commitMessage = commitMessage.replace(
    "{{ADD MUSIC}}",
    chalk.green(selectedSong)
  );
} else if (selectedSong) {
  console.log(
    chalk.yellow.bold(
      "⚠️ No {{ADD MUSIC}} found! Adding a song automatically..."
    )
  );
  commitMessage += ` ${chalk.green(selectedSong)}`;
}

// **Strip ANSI colors before committing**
const cleanCommitMessage = stripAnsi(commitMessage);

// Show final commit preview
console.log(chalk.blue.bold("\n📝 Final Commit Message:"));
console.log(chalk.cyan(`"${cleanCommitMessage}"\n`));

// Run git commit with the new message
try {
  execSync(`git commit -m "${cleanCommitMessage}"`, { stdio: "inherit" });
} catch (error) {
  console.error(
    chalk.red.bold("❌ Error running git commit.") +
      " Are you inside a Git repo?"
  );
  process.exit(1);
}
