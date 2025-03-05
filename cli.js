#!/usr/bin/env node

const { execSync } = require("child_process");

const args = process.argv.slice(2);
if (!args.length) {
  console.error("Usage: music-commit 'Your commit message {{ADD MUSIC}}'");
  process.exit(1);
}

// Extract commit message from arguments
const commitMessage = args.join(" ");

// Fake music data for now
const fakeSong = "🎵 Placeholder Artist - Placeholder Song";

// Replace {{ADD MUSIC}} with actual music info
const finalMessage = commitMessage.replace("{{ADD MUSIC}}", fakeSong);

// Run git commit
try {
  execSync(`git commit -m "${finalMessage}"`, { stdio: "inherit" });
} catch (error) {
  console.error("❌ Error running git commit. Are you inside a Git repo?");
  process.exit(1);
}

// const args = process.argv.slice(2);
// if (!args.length) {
//   console.log("Usage: music-commit 'Your commit message {{ADD MUSIC}}'");
//   process.exit(1);
// }

// const commitMessage = args.join(" ");
// const fakeSong = "🎵 Placeholder Artist - Placeholder Song"; // Static text for now
// const finalMessage = commitMessage.replace("{{ADD MUSIC}}", fakeSong);

// console.log(`Final Commit Message: "${finalMessage}"`);
