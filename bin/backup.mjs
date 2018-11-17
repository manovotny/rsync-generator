import path from 'path';

import fs from 'fs-extra';
import pathExists from 'path-exists';

import run from './run';
import {getExcludes} from './utils';
import write from './write';

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

    if (output) {
        await write({
            destination,
            excludes,
            output,
            sources
        });
    } else {
        await run({
            destination,
            excludes,
            sources,
            verbose
        });
    }

    /*
     * var backupProcesses = shell.exec('ps -ef | grep "node /usr/local/bin/backup" | grep -v grep  | wc -l', {silent: true}).output;
     * if (parseInt(backupProcesses.trim()) > 1) {
     *     console.log('The backup script is already running.');
     *     shell.exit(0);
     * }
     */
})();
