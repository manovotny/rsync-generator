#!/usr/bin/env node
import path from "node:path";
import process, { argv, stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import fs from "fs-extra";
import { pathExists } from "path-exists";
import run from "./run.mjs";
import { generateExcludes, getComputerName } from "./utils.mjs";
import write from "./write.mjs";

const verbose = process.argv.includes("--verbose");
const configPath = path.join(
  process.env.HOME,
  ".config",
  "backup",
  "settings.json",
);
const exists = await pathExists(configPath);

if (!exists) {
  throw new Error(
    "Configuration file required at `~/.config/backup/settings.json`.",
  );
}

const { destination, exclude, output, sources } = await fs.readJson(configPath);
const excludes = generateExcludes(exclude);

if (!destination) {
  throw new Error("Configuration file requires a `destination` property.");
}

if (!sources) {
  throw new Error("Configuration file requires a `sources` property.");
}

const computerName = await getComputerName();
const destinationWithComputerName = path.join(destination, computerName);

// Warn if destination already exists
if (await pathExists(destinationWithComputerName)) {
  const rl = await createInterface({ input: stdin, output: stdout });

  try {
    const answer = await rl.question(
      `Destination \`${destinationWithComputerName}\` already exists. Continue? (Y/n) `,
    );

    if (answer.toLowerCase() !== "y" && answer.toLowerCase() !== "") {
      process.exit(1);
    }
  } finally {
    rl.close();
  }
}

if (!output || argv.includes("--force-run")) {
  await run({
    destination: destinationWithComputerName,
    excludes,
    sources,
    verbose,
  });
} else {
  await write({
    destination: destinationWithComputerName,
    excludes,
    output,
    sources,
  });
}
