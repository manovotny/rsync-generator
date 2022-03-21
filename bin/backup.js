#!/usr/bin/env node
import path from 'node:path';
import process from 'node:process';

import fs from 'fs-extra';
import {pathExists} from 'path-exists';

import run from './run.js';
import {getExcludes} from './utils.js';
import write from './write.js';

(async () => {
    const verbose = process.argv.includes('--verbose');
    const configPath = path.join(process.env.HOME, '.backup', 'config.json');
    const exists = await pathExists(configPath);

    if (!exists) {
        throw new Error('Configuration file required at `~/.backup/config.json`.');
    }

    const {destination, exclude, output, sources} = await fs.readJson(configPath);
    const excludes = getExcludes(exclude);

    if (!destination) {
        throw new Error('Configuration file requires a `destination` property.');
    }

    if (!sources) {
        throw new Error('Configuration file requires a `sources` property.');
    }

    await (output
        ? write({
              destination,
              excludes,
              output,
              sources,
          })
        : run({
              destination,
              excludes,
              sources,
              verbose,
          }));

    /*
     * var backupProcesses = shell.exec('ps -ef | grep "node /usr/local/bin/backup" | grep -v grep  | wc -l', {silent: true}).output;
     * if (parseInt(backupProcesses.trim()) > 1) {
     *     console.log('The backup script is already running.');
     *     shell.exit(0);
     * }
     */
})();
