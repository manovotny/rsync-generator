'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    shell = require('shelljs'),

    config = require('./config'),
    rsync = require('./rsync'),

    file = config.write;

function createFile() {
    fs.closeSync(fs.openSync(file, 'w'));
}

function addClearCommand() {
    fs.appendFile(file, 'clear' + '\n');
}

function addmessage(source) {
    fs.appendFile(file, 'echo ""' + '\n');
    fs.appendFile(file, 'echo "Backing up: ' + source + '"' + '\n');
    fs.appendFile(file, 'echo ""' + '\n');
}

function addRsyncCommand(source) {
    var command = rsync.generateCommand({
        source: source,
        destination: config.destination
    });

    fs.appendFile(file, command + '\n');
}

function addCommandsForSources() {
    _.each(config.sources, function (source) {
        addmessage(source);
        addRsyncCommand(source);
    });
}

function makeFileExecutable() {
    shell.exec('chmod 777 ' + file);
}

function exec() {
    createFile();
    addClearCommand();
    addCommandsForSources();
    makeFileExecutable();
}

module.exports = {
    exec: exec
};