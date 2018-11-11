#!/usr/bin/env node

const {join} = require('path');

const execa = require('execa');
const {readJson, writeFile} = require('fs-extra');
const Listr = require('listr');
const pathExists = require('path-exists');

const throwError = (message) => {
    console.log(message);
    process.exit(1);
};

(async () => {
    const verbose = process.argv.includes('--verbose');
    const configPath = join(process.env.HOME, '.backup', 'config.json');
    const exists = await pathExists(configPath);

    if (!exists) {
        throwError('Configuration file required at `~/.backup/config.json`.');
    }

    const {destination, exclude, sources, write} = await readJson(configPath);
    const commands = [];

    let excludes = '';

    if (!destination) {
        throwError('Configuration file requires a `destination` property.');
    }

    if (!sources) {
        throwError('Configuration file requires a `sources` property.');
    }

    if (exclude) {
        excludes = exclude.map((item) => `--exclude=${item}`).join(' ');
    }

    if (write) {
        commands.push('clear');

        sources.forEach((source) => {
            commands.push(
                ...[
                    'echo ""',
                    `echo "Backing up: ${source}"`,
                    'echo ""',
                    `rsync --compress --delete --links --progress --recursive --relative --stats --times --verbose --rsh=ssh ${excludes} "${source}" "${destination}"`
                ]
            );
        });

        await writeFile(write, commands.join('\n'));
        await execa('chmod', ['777', write]);
    } else {
        sources.forEach((source) => {
            const command = `rsync --compress --delete --links --progress --recursive --relative --stats --times --verbose --rsh=ssh ${excludes} "${source}" "${destination}"`;

            commands.push({
                task: () => execa.shell(command),
                title: source
            });
        });

        const tasks = new Listr(commands, {
            renderer: verbose ? 'verbose' : 'default'
        });

        console.log(`Backing up...`);

        tasks
            .run()
            .then(() => console.log('Backup complete! 🎉'))
            .catch((error) => {
                console.error(error);
            });

        /*
         * var backupProcesses = shell.exec('ps -ef | grep "node /usr/local/bin/backup" | grep -v grep  | wc -l', {silent: true}).output;
         * if (parseInt(backupProcesses.trim()) > 1) {
         *     console.log('The backup script is already running.');
         *     shell.exit(0);
         * }
         */
    }
})();
