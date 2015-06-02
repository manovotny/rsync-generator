'use strict';

var fs = require('fs'),
    shell = require('shelljs');

function args(a) {
    if (!fs.existsSync(a.config)) {
        console.log('Path to configuration file does not exist.');
        shell.exit(0);
    }

    return true;
}

function config(c) {
    if (!c.hasOwnProperty('destination') || c.destination.length === 0) {
        console.log('Configuration file requires `destination` property.');
        shell.exit(0);
    }

    if (!c.hasOwnProperty('sources')) {
        console.log('Configuration file requires `sources` property.');
        shell.exit(0);
    }
}

function running() {
    var backupProcesses = shell.exec('ps -ef | grep "node /usr/local/bin/backup" | grep -v grep  | wc -l', {silent: true}).output;

    if (parseInt(backupProcesses.trim()) > 1) {
        console.log('The backup script is already running.');
        shell.exit(0);
    }
}

module.exports = {
    args: args,
    config: config,
    running: running
};