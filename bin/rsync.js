'use strict';

var Rsync = require('rsync'),

    fs = require('fs'),
    shell = require('shelljs');

function generateCommand(data) {
    return new Rsync()
        .set('compress')
        .set('bwlimit', 1000)
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

function write(data) {
    var command = generateCommand(data);

    if (data.message) {
        fs.appendFile(data.file, 'echo ""' + '\n');
        fs.appendFile(data.file, 'echo "' + data.message + '"' + '\n');
        fs.appendFile(data.file, 'echo ""' + '\n');
    }

    fs.appendFile(data.file, command + '\n');
}

module.exports = {
    exec: exec,
    write: write
};