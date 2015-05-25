'use strict';

var moment = require('moment'),
    shell = require('shelljs');

function getCurrentDateAndTime() {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}

function begin() {
    console.log('Backup stated at ' + getCurrentDateAndTime());
}

function end() {
    console.log('');
    console.log('Backup completed at ' + getCurrentDateAndTime());
    console.log('');
}

function running() {
    var backupProcesses = shell.exec('ps -ef | grep "node /usr/local/bin/backup" | grep -v grep  | wc -l', {silent: true}).output;

    return parseInt(backupProcesses.trim()) > 1;
}

module.exports = {
    begin: begin,
    end: end,
    running: running
};