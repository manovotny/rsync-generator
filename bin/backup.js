#! /usr/bin/env node

'use strict';

var _ = require('lodash'),
    shell = require('shelljs'),

    process = require('./process'),
    rsync = require('./rsync'),
    sources = require('./sources');

if (process.running()) {
    console.log('The backup script is already running.');
    shell.exit(0);
}

process.begin();

_.each(sources, function(source){
    rsync.exec({
        source: source,
        destination: '8058@usw-s008.rsync.net:manovotny-rmbp/',
        message: 'Backing up: ' + source
    });
});

process.end();