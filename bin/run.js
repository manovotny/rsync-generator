'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    humanizeDuration = require('humanize-duration'),
    shell = require('shelljs'),

    config = require('./config'),
    rsync = require('./rsync'),

    startDate;

function getCurrentDateAndTime() {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}

function begin() {
    console.log('');
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

function addmessage(source) {
    console.log('');
    console.log('Backing up: ' + source);
    console.log('');
}

function addRsyncCommand(source) {
    var command = rsync.generateCommand({
        source: source,
        destination: config.destination
    });

    shell.exec(command);
}

function executeRsyncCommandsForSources() {
    _.each(config.sources, function (source) {
        addmessage(source);
        addRsyncCommand(source);
    });
}
function exec() {
    begin();
    executeRsyncCommandsForSources();
    end();
}

module.exports = {
    exec: exec
};