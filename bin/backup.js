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

const getExcludes = (excludes) => {
    if (excludes) {
        return excludes.map((item) => `--exclude=${item}`).join(' ');
    }

    return [];
};

const generateRsyncCommand = ({destination, excludes, source}) =>
    `rsync --compress --delete --links --progress --recursive --relative --stats --times --verbose --rsh=ssh ${excludes} "${source}" "${destination}"`;

const run = async ({destination, excludes, sources, verbose}) => {
    const commands = [];
    const notFound = [];

    await Promise.all(
        sources.map(async (source) => {
            const exists = await pathExists(source);

            if (exists) {
                const command = generateRsyncCommand({destination, excludes, source});

                commands.push({
                    task: () => execa.shell(command),
                    title: source
                });
            } else {
                notFound.push(source);
            }
        })
    );

    const tasks = new Listr(commands, {
        renderer: verbose ? 'verbose' : 'default'
    });

    console.log(`Backing up...`);

    tasks
        .run()
        .then(() => {
            console.log('Backup complete! 🎉');

            if (notFound.length) {
                console.log('Sources not found:', notFound);
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

const write = async ({destination, excludes, output, sources}) => {
    const commands = ['clear'];
    const notFound = [];

    await Promise.all(
        sources.map(async (source) => {
            const exists = await pathExists(source);

            if (exists) {
                commands.push(
                    ...[
                        'echo ""',
                        `echo "Backing up: ${source}"`,
                        'echo ""',
                        generateRsyncCommand({destination, excludes, source})
                    ]
                );
            } else {
                notFound.push(source);
            }
        })
    );

    await writeFile(output, commands.join('\n'));
    await execa('chmod', ['777', output]);

    if (notFound.length) {
        console.log('Sources not found:', notFound);
    }
};

(async () => {
    const verbose = process.argv.includes('--verbose');
    const configPath = join(process.env.HOME, '.backup', 'config.json');
    const exists = await pathExists(configPath);

    if (!exists) {
        throwError('Configuration file required at `~/.backup/config.json`.');
    }

    const {destination, exclude, output, sources} = await readJson(configPath);
    const excludes = getExcludes(exclude);

    if (!destination) {
        throwError('Configuration file requires a `destination` property.');
    }

    if (!sources) {
        throwError('Configuration file requires a `sources` property.');
    }

    if (output) {
        await write({destination, excludes, output, sources});
    } else {
        await run({destination, excludes, sources, verbose});
    }

    /*
     * var backupProcesses = shell.exec('ps -ef | grep "node /usr/local/bin/backup" | grep -v grep  | wc -l', {silent: true}).output;
     * if (parseInt(backupProcesses.trim()) > 1) {
     *     console.log('The backup script is already running.');
     *     shell.exit(0);
     * }
     */
})();
