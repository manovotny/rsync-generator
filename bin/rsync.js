'use strict';

var Rsync = require('rsync'),

    shell = require('shelljs');

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

function exec(data) {
    var command = generateCommand(data);

    if (data.message) {
        console.log('');
        console.log(data.message);
        console.log('');
    }

    shell.exec(command);
}

module.exports = {
    exec: exec
};