import {execa} from 'execa';
import fs from 'fs-extra';
import {pathExists} from 'path-exists';

import {generateRsyncCommand} from './utils.js';

export default async ({destination, excludes, output, sources}) => {
    const commands = ['clear', `echo "Backup started: $(date +'%m/%d/%Y %H:%M:%S')"`];
    const notFound = [];

    await Promise.all(
        sources.map(async (source) => {
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
                    })
                );
            } else {
                notFound.push(source);
            }
        })
    );

    await fs.writeFile(output, commands.join('\n'));
    await execa('chmod', ['777', output]);

    if (notFound.length) {
        console.log('Sources not found:', notFound);
    }

    console.log(`Backup script successfully created at \`${output}\`.`);
};
