#!/usr/bin/env node
import path from 'node:path';
import process from 'node:process';
import os from 'node:os';

import fs from 'fs-extra';
import {pathExists} from 'path-exists';

import run from './run.js';
import {getExcludes} from './utils.js';
import write from './write.js';

(async () => {
    const verbose = process.argv.includes('--verbose');
    const configPath = path.join(process.env.HOME, '.config', 'backup', 'settings.json');
    const exists = await pathExists(configPath);

    if (!exists) {
        throw new Error('Configuration file required at `~/.config/backup/settings.json`.');
    }

    const {destination, exclude, output, sources} = await fs.readJson(configPath);
    const excludes = getExcludes(exclude);

    if (!destination) {
        throw new Error('Configuration file requires a `destination` property.');
    }

    if (!sources) {
        throw new Error('Configuration file requires a `sources` property.');
    }

    const computerName = os.hostname().replace('.local', '');
    const destinationWithComputerName = path.join(destination, computerName);

    await (output
        ? write({
              destination: destinationWithComputerName,
              excludes,
              output,
              sources,
          })
        : run({
              destination: destinationWithComputerName,
              excludes,
              sources,
              verbose,
          }));
})();
