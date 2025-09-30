import { execa, parseCommandString } from "execa";
import { Listr } from "listr2";
import { pathExists } from "path-exists";
import { generateDefaultCommends, generateRsyncCommand } from "./utils.mjs";

export default async ({ destination, excludes, sources, verbose }) => {
  const commands = generateDefaultCommends(destination).map((command) => ({
    task: async () => {
      await execa({ shell: true })`${parseCommandString(command)}`;
    },
    title: `Executing: ${command}`,
  }));
  const notFound = [];

  for (const source of sources) {
    const exists = await pathExists(source);

    if (exists) {
      const command = generateRsyncCommand({
        destination,
        excludes,
        source,
      });

      commands.push({
        task: async () => {
          await execa({ shell: true })`${parseCommandString(command)}`;
        },
        title: `Backing up: ${source}`,
      });
    } else {
      notFound.push(source);
    }
  }

  const tasks = new Listr(commands, {
    renderer: verbose ? "verbose" : "default",
  });

  console.log(`Backing up...`);

  try {
    await tasks.run();
    console.log("result", JSON.stringify(result, null, 2));

    console.log("Backup complete! 🎉");

    if (notFound.length) {
      console.log("Sources not found:", notFound);
    }
  } catch (error) {
    console.error(error);
  }
};
