'use strict';

var Rsync = require('rsync'),

    config = require('./config');

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
        .exclude(config.exclude)
        .source(data.source)
        .destination(data.destination)
        .command();
}

module.exports = {
    generateCommand: generateCommand
};