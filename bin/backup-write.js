'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    shell = require('shelljs'),

    rsync = require('./rsync');

function exec(config) {
    fs.closeSync(fs.openSync(config.write, 'w'));

    fs.appendFile(config.write, 'clear' + '\n');

    _.each(config.sources, function (source) {
        rsync.write({
            destination: config.destination,
            file: config.write,
            message: 'Backing up: ' + source,
            source: source
        });
    });

    shell.exec('chmod 777 ' + config.write);
}

module.exports = {
    exec: exec
};