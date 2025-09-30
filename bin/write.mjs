import { writeFile } from "node:fs/promises";
import { execa } from "execa";
import { pathExists } from "path-exists";
import { generateDefaultCommends, generateRsyncCommand } from "./utils.mjs";

export default async ({ destination, excludes, output, sources }) => {
  const commands = generateDefaultCommends(destination);
  const notFound = [];

  for (const source of sources) {
    const exists = await pathExists(source);

    if (exists) {
      commands.push(
        'echo ""',
        `echo "Backing up: ${source}"`,
        'echo ""',
        generateRsyncCommand({
          destination,
          excludes,
          source,
        }),
      );
    } else {
      notFound.push(source);
    }
  }

  await writeFile(output, commands.join("\n"));
  await execa`chmod 777 ${output}`;

  if (notFound.length) {
    console.log("Sources not found:", notFound);
  }

  console.log(`Backup script successfully created at \`${output}\`.`);
};
