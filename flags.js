import chalk from "chalk";
import { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Get package.json version
const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
  readFileSync(`${__dirname}/package.json`, "utf-8")
);
const version = packageJson.version;

// Function to handle CLI flags
export function handleFlags(args) {
  if (args.includes("--help")) {
    console.log(chalk.blue.bold("\n🎵 music-commit CLI Help"));
    console.log(chalk.cyan("Usage:"));
    console.log('  music-commit "Your commit message {{ADD MUSIC}}"');
    console.log("\nOptions:");
    console.log("  --help     Show this help message");
    console.log("  --version  Show the version number");
    console.log("\nExample:");
    console.log('  music-commit "Fixed the bug {{ADD MUSIC}}"');
    process.exit(0);
  }

  if (args.includes("--version")) {
    console.log(chalk.green(`music-commit version ${version}`));
    process.exit(0);
  }
}
