var validate = require('./validate'),

    argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('backup', 'Backup your files.')
    .example('$0 backup -c config.json', 'Backup your files using a configuration.')
    .check(validate.args)

    .demand('c')
    .alias('c', 'config')
    .default('c', process.env.HOME + '/.backup/config.json')
    .describe('c', 'Path to configuration file.')

    .help('h')
    .alias('h', 'help')

    .argv;

module.exports = argv;