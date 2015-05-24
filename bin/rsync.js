#! /usr/bin/env node

'use strict';

var Rsync = require('rsync'),

    moment = require('moment'),
    shell = require('shelljs');

function getCurrentDateAndTime() {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}

function begin() {
    console.log('Backup stated at ' + getCurrentDateAndTime());
}

function exec(source, destination, message) {
    var command = generateCommand(
            source,
            destination
        );

    if (message) {
        console.log('');
        console.log(message);
        console.log('');
    }

    shell.exec(command);
}

function end() {
    console.log('');
    console.log('Backup completed at ' + getCurrentDateAndTime());
    console.log('');
}

function generateCommand(source, destination) {
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
        .source(source)
        .destination(destination)
        .command();
}

function isRunning() {
    var backupProcesses = shell.exec('ps -ef | grep "node /usr/local/bin/backup" | grep -v grep  | wc -l', {silent: true}).output;

    return parseInt(backupProcesses.trim()) > 1;
}

module.exports = {
    begin: begin,
    end: end,
    exec: exec,
    isRunning: isRunning
};