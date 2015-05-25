'use strict';

var Rsync = require('rsync'),

    shell = require('shelljs');

function createDirectories(directories) {
    shell.exec('ssh 8058@usw-s008.rsync.net mkdir -p manovotny-rmbp/' + directories);
}

function exec(data) {
    var command = generateCommand(data);

    if (data.message) {
        console.log('');
        console.log(data.message);
        console.log('');
    }

    createDirectories(data.directories);

    shell.exec(command);
}

function generateCommand(data) {
    return new Rsync()
        .set('compress')
        .set('delete')
        .set('dry-run')
        .set('links')
        .set('progress')
        .set('recursive')
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
    exec: exec
};