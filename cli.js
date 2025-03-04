#!/usr/bin/env node

const args = process.argv.slice(2);
if (!args.length) {
  console.log("Usage: music-commit 'Your commit message {{ADD MUSIC}}'");
  process.exit(1);
}

const commitMessage = args.join(" ");
const fakeSong = "🎵 Placeholder Artist - Placeholder Song"; // Static text for now
const finalMessage = commitMessage.replace("{{ADD MUSIC}}", fakeSong);

console.log(`Final Commit Message: "${finalMessage}"`);
