'use strict';

var moment = require('moment'),
    humanizeDuration = require("humanize-duration"),
    shell = require('shelljs'),

    startDate;

function getCurrentDateAndTime() {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}

function begin() {
    console.log('Backup stated at ' + getCurrentDateAndTime());
    startDate = new Date();
}

function end() {
    var elapsedTime = humanizeDuration(new Date() - startDate);

    console.log('');
    console.log('Backup completed at ' + getCurrentDateAndTime());
    console.log('Total elapsed time:  ' + elapsedTime);
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