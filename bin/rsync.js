'use strict';

var Rsync = require('rsync');

function generateCommand(data) {
    return new Rsync()
        .set('compress')
        .set('delete')
        .set('links')
        .set('progress')
        .set('recursive')
        .set('relative')
        .set('stats')
        .set('times')
        .set('verbose')
        .shell('ssh')
        .exclude([
            '.DS_Store',
            '.localized',
            'bower_components',
            'node_modules',
            'vendor'
        ])
        .source(data.source)
        .destination(data.destination)
        .command();
}

module.exports = {
    generateCommand: generateCommand
};