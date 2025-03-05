#!/usr/bin/env node

const { execSync } = require("child_process");

const args = process.argv.slice(2);
if (!args.length) {
  console.error("Usage: music-commit 'Your commit message {{ADD MUSIC}}'");
  process.exit(1);
}

// Extract commit message from arguments
let commitMessage = args.join(" "); // Changed from `const` to `let`

// Fake music data for now (this will be replaced with real music fetching)
const fakeSong = "🎵 The Rolling Stones - Jumpin Jack Flash";

// Check if the commit message contains {{ADD MUSIC}}
if (commitMessage.includes("{{ADD MUSIC}}")) {
  commitMessage = commitMessage.replace("{{ADD MUSIC}}", fakeSong);
} else {
  console.log("⚠️ No {{ADD MUSIC}} found. Adding music automatically...");
  commitMessage += ` ${fakeSong}`;
}

// Run git commit
try {
  execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });
} catch (error) {
  console.error("❌ Error running git commit. Are you inside a Git repo?");
  process.exit(1);
}
