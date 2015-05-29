'use strict';

var _ = require('lodash'),

    process = require('./process'),
    rsync = require('./rsync');

function exec(config) {
    process.begin();

    _.each(config.sources, function(source){
        rsync.exec({
            source: source,
            destination: config.destination,
            message: 'Backing up: ' + source
        });
    });

    process.end();
}

module.exports = {
    exec: exec
};